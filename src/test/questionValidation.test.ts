import { describe, it, expect } from 'vitest';
import { filterQuestions, pushQuestionToExam } from '../components/LiteratureWorkspace/QuestionBuilderView';
import { createQuestionFixture, createExamFixture } from './fixtures';
import { LiteratureQuestionItem } from '../types';
import { normalizeVietnamese } from '../utils/unicode';

describe('Question Validation & Exam 7991 Mapping Engine', () => {
  const sampleQuestions: LiteratureQuestionItem[] = [
    {
      id: 'q1',
      code: 'Câu 1',
      type: 'doc_hieu',
      level: 'NB',
      skill: 'Nhận diện',
      passageSnippet: 'Đoạn thơ Tây Tiến',
      question: 'Xác định thể thơ của văn bản.',
      answer: 'Thể thơ thất ngôn (7 chữ).',
      guide: 'Nhận diện đúng thể thơ được 0.25 đ.',
      points: 0.25,
      linkedPart: 'partI'
    },
    {
      id: 'q2',
      code: 'Câu 2',
      type: 'tieng_viet',
      level: 'NB', // Should be elevated to TH when pushed to Part III
      skill: 'Giải thích',
      passageSnippet: 'Sông Mã gầm lên',
      question: 'Chỉ ra biện pháp tu từ trong cụm từ "Sông Mã gầm lên".',
      answer: 'Biện pháp nhân hóa.',
      guide: 'Nêu đúng nhân hóa được 0.5 đ.',
      points: 0.5,
      linkedPart: 'partIII'
    },
    {
      id: 'q3',
      code: 'Câu 3',
      type: 'doc_hieu',
      level: 'TH',
      skill: 'Phân tích',
      passageSnippet: 'Nhà ai Pha Luông mưa xa khơi',
      question: 'Phân tích hiệu quả nghệ thuật của thanh bằng trong câu thơ.',
      answer: 'Gợi không gian mênh mông, êm dịu.',
      guide: 'Phân tích đủ 2 ý được 1.0 đ.',
      points: 1.0,
      linkedPart: 'partII'
    },
    {
      id: 'q4',
      code: 'Câu 4',
      type: 'nl_van_hoc',
      level: 'VD',
      skill: 'Đánh giá',
      passageSnippet: 'Toàn bài Tây Tiến',
      question: 'Viết bài văn nghị luận phân tích vẻ đẹp bi tráng của hình tượng người lính.',
      answer: 'Triển khai đủ luận điểm: bi và tráng.',
      guide: 'Theo Rubric chấm bài văn nghị luận.',
      points: 4.0,
      linkedPart: 'partIV'
    }
  ];

  describe('filterQuestions', () => {
    it('returns all questions when filters are "all"', () => {
      const filtered = filterQuestions(sampleQuestions, 'all', 'all');
      expect(filtered).toHaveLength(4);
    });

    it('filters correctly by question type', () => {
      const docHieu = filterQuestions(sampleQuestions, 'doc_hieu', 'all');
      expect(docHieu).toHaveLength(2);
      expect(docHieu.every(q => q.type === 'doc_hieu')).toBe(true);

      const tiengViet = filterQuestions(sampleQuestions, 'tieng_viet', 'all');
      expect(tiengViet).toHaveLength(1);
      expect(tiengViet[0].id).toBe('q2');

      const nlVanHoc = filterQuestions(sampleQuestions, 'nl_van_hoc', 'all');
      expect(nlVanHoc).toHaveLength(1);
      expect(nlVanHoc[0].id).toBe('q4');
    });

    it('filters correctly by cognitive level', () => {
      const nbQuestions = filterQuestions(sampleQuestions, 'all', 'NB');
      expect(nbQuestions).toHaveLength(2);

      const thQuestions = filterQuestions(sampleQuestions, 'all', 'TH');
      expect(thQuestions).toHaveLength(1);
      expect(thQuestions[0].id).toBe('q3');

      const vdQuestions = filterQuestions(sampleQuestions, 'all', 'VD');
      expect(vdQuestions).toHaveLength(1);
      expect(vdQuestions[0].id).toBe('q4');
    });

    it('filters correctly by both type and level simultaneously', () => {
      const docHieuNB = filterQuestions(sampleQuestions, 'doc_hieu', 'NB');
      expect(docHieuNB).toHaveLength(1);
      expect(docHieuNB[0].id).toBe('q1');

      const emptyMatch = filterQuestions(sampleQuestions, 'tieng_viet', 'VD');
      expect(emptyMatch).toHaveLength(0);
    });
  });

  describe('pushQuestionToExam (Mapping to CV 7991 Parts)', () => {
    it('maps to Part I (Multiple Choice 4 options) when linkedPart is partI or type is doc_hieu', () => {
      const exam = createExamFixture();
      const initialPartICount = exam.partI.length;

      const q = sampleQuestions[0]; // linkedPart: 'partI', type: 'doc_hieu'
      const { updatedExam, targetPart, message } = pushQuestionToExam(exam, q, 'test-p1');

      expect(targetPart).toBe('partI');
      expect(updatedExam.partI).toHaveLength(initialPartICount + 1);

      const added = updatedExam.partI[updatedExam.partI.length - 1];
      expect(added.id).toBe('p1-test-p1');
      expect(added.level).toBe('NB');
      expect(added.question).toBe(q.question);
      expect(added.options.A).toBe(q.answer);
      expect(added.options.B).toBeDefined();
      expect(added.options.C).toBeDefined();
      expect(added.options.D).toBeDefined();
      expect(added.correctAnswer).toBe('A');
      expect(added.points).toBe(0.25);
      expect(message).toContain('Phần I');
    });

    it('maps to Part II (True/False 4 statements) when linkedPart is partII', () => {
      const exam = createExamFixture();
      const initialPartIICount = exam.partII.length;

      const q = sampleQuestions[2]; // linkedPart: 'partII'
      const { updatedExam, targetPart, message } = pushQuestionToExam(exam, q, 'test-p2');

      expect(targetPart).toBe('partII');
      expect(updatedExam.partII).toHaveLength(initialPartIICount + 1);

      const added = updatedExam.partII[updatedExam.partII.length - 1];
      expect(added.id).toBe('p2-test-p2');
      expect(added.stem).toBe(q.question);
      expect(added.statements).toHaveLength(4);
      expect(added.statements[0].subId).toBe('a');
      expect(added.statements[1].subId).toBe('b');
      expect(added.statements[2].subId).toBe('c');
      expect(added.statements[3].subId).toBe('d');
      expect(added.points).toBe(1.0);
      expect(message).toContain('Phần II');
    });

    it('maps to Part III (Short Answer) and elevates level from NB to TH (CV 7991 rule)', () => {
      const exam = createExamFixture();
      const initialPartIIICount = exam.partIII.length;

      const q = sampleQuestions[1]; // level: 'NB', linkedPart: 'partIII', type: 'tieng_viet'
      const { updatedExam, targetPart, message } = pushQuestionToExam(exam, q, 'test-p3');

      expect(targetPart).toBe('partIII');
      expect(updatedExam.partIII).toHaveLength(initialPartIIICount + 1);

      const added = updatedExam.partIII[updatedExam.partIII.length - 1];
      expect(added.id).toBe('p3-test-p3');
      // CV 7991: Part III only accepts TH or VD. NB is promoted to TH.
      expect(added.level).toBe('TH');
      expect(added.correctAnswer).toBe(q.answer);
      expect(added.points).toBe(0.5);
      expect(message).toContain('Phần III');
    });

    it('maps to Part IV (Essay) with structured rubric when linkedPart is partIV or essay type', () => {
      const exam = createExamFixture();
      const initialPartIVCount = exam.partIV.length;

      const q = sampleQuestions[3]; // linkedPart: 'partIV', type: 'nl_van_hoc', points: 4.0
      const { updatedExam, targetPart, message } = pushQuestionToExam(exam, q, 'test-p4');

      expect(targetPart).toBe('partIV');
      expect(updatedExam.partIV).toHaveLength(initialPartIVCount + 1);

      const added = updatedExam.partIV[updatedExam.partIV.length - 1];
      expect(added.id).toBe('p4-test-p4');
      expect(added.level).toBe('VD');
      expect(added.rubric).toHaveLength(3);
      expect(added.points).toBe(4.0);
      expect(message).toContain('Phần IV');
    });
  });

  describe('Question input sanitization & NFC enforcement', () => {
    it('normalizes Vietnamese decomposed input (NFD) to precomposed (NFC)', () => {
      const expectedText = 'Phân tích hình tượng người lính';
      const nfdQuestion = expectedText.normalize('NFD');
      expect(nfdQuestion).not.toBe(expectedText);

      const sanitized = normalizeVietnamese(nfdQuestion);
      expect(sanitized).toBe(expectedText);
      expect(sanitized.normalize('NFC')).toBe(sanitized);
    });

    it('prevents creating questions with empty or whitespace-only content', () => {
      const validateQuestion = (text: string) => text.trim().length > 0;

      expect(validateQuestion('')).toBe(false);
      expect(validateQuestion('   \n\t  ')).toBe(false);
      expect(validateQuestion('Câu hỏi hợp lệ')).toBe(true);
    });
  });
});
