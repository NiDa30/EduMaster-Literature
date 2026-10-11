import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Packer } from 'docx';
import JSZip from 'jszip';
import PptxGenJS from 'pptxgenjs';
import { exportDocxExam, exportDocxKHBD, exportDocxMatrix, exportDocxRubric, exportPptxSlides } from '../utils/exportUtils';
import { createExamFixture, createKhbdFixture, createRubricFixture, createSlidesDeckFixture } from './fixtures';

let wordXml = '';
beforeEach(() => {
  vi.spyOn(Packer, 'toBlob').mockImplementation(async document => {
    const buffer = await Packer.toBuffer(document);
    const zip = await JSZip.loadAsync(buffer);
    wordXml = await zip.file('word/document.xml')!.async('string');
    return new Blob([new Uint8Array(buffer)]);
  });
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  vi.stubGlobal('URL', { createObjectURL: () => 'blob:test-export', revokeObjectURL: () => {} });
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

const parseWord = () => new DOMParser().parseFromString(wordXml, 'application/xml');

describe('Real OpenXML export formatting', () => {
  it('preserves multiline Vietnamese passages, separates answer key and does not duplicate exam code/decimal scores', async () => {
    const exam = createExamFixture({ passageRef: 'Dòng thơ thứ nhất\nDòng thơ thứ hai\n\nTrầm Thị Đổi' });
    exam.examHeader.examCode = 'MÃ ĐỀ: 301'; exam.partIV[0].points = 2.5;
    await exportDocxExam(exam, createKhbdFixture());
    const doc = parseWord();
    const passage = [...doc.getElementsByTagName('w:p')].find(p => p.textContent?.startsWith('Dòng thơ thứ nhất'))!;
    expect(passage.getElementsByTagName('w:cr').length).toBe(3);
    expect(wordXml).not.toContain('MÃ ĐỀ: MÃ ĐỀ:');
    expect(wordXml).not.toContain('2.5.0');
    expect(wordXml).toContain('2.5 đ');
    const heading = [...doc.getElementsByTagName('w:p')].find(p => p.textContent?.startsWith('HƯỚNG DẪN CHẤM &'))!;
    expect(heading.getElementsByTagName('w:pageBreakBefore').length).toBe(1);
    expect(wordXml).toContain('w:type="fixed"');
  });

  it('does not write invalid tables with zero cells when question parts are empty', async () => {
    await exportDocxExam(createExamFixture({ partI: [], partIII: [] }), createKhbdFixture());
    for (const row of parseWord().getElementsByTagName('w:tr')) expect(row.getElementsByTagName('w:tc').length).toBeGreaterThan(0);
    expect(wordXml).toContain('Chưa có câu hỏi');
  });

  it('keeps table rows together and repeats table headers in KHBD, matrix and rubric', async () => {
    for (const run of [() => exportDocxKHBD(createKhbdFixture()), () => exportDocxMatrix(createExamFixture(), createKhbdFixture()), () => exportDocxRubric(createRubricFixture({ totalPoints: 3.5 }))]) {
      await run();
      const doc = parseWord();
      expect(doc.getElementsByTagName('w:tblHeader').length).toBeGreaterThan(0);
      for (const row of doc.getElementsByTagName('w:tr')) expect(row.getElementsByTagName('w:cantSplit').length).toBe(1);
      expect(wordXml).not.toContain('3.5.0');
    }
  });

  it('places all default slide shapes inside the real 16:9 canvas and separates bullet paragraphs', async () => {
    let zip: JSZip;
    vi.spyOn(PptxGenJS.prototype, 'writeFile').mockImplementation(async function(this: PptxGenJS) {
      zip = await JSZip.loadAsync(await this.write({ outputType: 'nodebuffer' }) as Buffer);
      return '';
    });
    await exportPptxSlides(createSlidesDeckFixture(), 'Kiểm tra định dạng');
    const presentation = new DOMParser().parseFromString(await zip!.file('ppt/presentation.xml')!.async('string'), 'application/xml');
    const size = presentation.getElementsByTagName('p:sldSz')[0];
    const cx = Number(size.getAttribute('cx')), cy = Number(size.getAttribute('cy'));
    expect(cx / cy).toBeCloseTo(16 / 9, 5);
    expect(cy).toBe(7.5 * 914400);
    for (const name of Object.keys(zip!.files).filter(name => /^ppt\/slides\/slide\d+\.xml$/.test(name))) {
      const xml = await zip!.file(name)!.async('string');
      const doc = new DOMParser().parseFromString(xml, 'application/xml');
      for (const transform of doc.getElementsByTagName('a:xfrm')) {
        const offset = transform.getElementsByTagName('a:off')[0], extent = transform.getElementsByTagName('a:ext')[0];
        if (!offset || !extent) continue;
        expect(Number(offset.getAttribute('x')) + Number(extent.getAttribute('cx'))).toBeLessThanOrEqual(cx);
        expect(Number(offset.getAttribute('y')) + Number(extent.getAttribute('cy'))).toBeLessThanOrEqual(cy);
      }
      for (const paragraph of doc.getElementsByTagName('a:p')) {
        if (paragraph.getElementsByTagName('a:buChar').length) expect(paragraph.getElementsByTagName('a:t').length).toBeLessThanOrEqual(1);
      }
    }
  });
});
