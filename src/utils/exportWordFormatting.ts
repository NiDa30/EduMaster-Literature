import {
  Paragraph as DocxParagraph, TextRun as DocxTextRun, Table as DocxTable,
  TableLayoutType, CarriageReturn, TableRow as DocxTableRow,
  type IParagraphOptions, type IRunOptions, type ITableOptions, type ITableRowOptions,
} from 'docx';

/** Word ignores literal newlines in w:t; emit actual line-break elements. */
export class TextRun extends DocxTextRun {
  constructor(input: string | IRunOptions) {
    const options = typeof input === 'string' ? { text: input } : input;
    const text = options.text?.normalize('NFC').replace(/\r\n?/g, '\n');
    if (text?.includes('\n')) {
      const { text: ignored, ...properties } = options;
      super({ ...properties, children: text.split('\n').flatMap((line, i) => i ? [new CarriageReturn(), line] : [line]) });
    } else {
      super({ ...options, ...(text !== undefined ? { text } : {}) });
    }
  }
}

export class Paragraph extends DocxParagraph {
  constructor(input: string | IParagraphOptions) {
    const options = typeof input === 'string' ? { text: input } : input;
    super({ ...options, widowControl: true, spacing: { line: 276, after: 80, ...options.spacing } });
  }
}

export class TableRow extends DocxTableRow {
  constructor(options: ITableRowOptions) {
    super({ cantSplit: true, ...options });
  }
}

export class Table extends DocxTable {
  constructor(options: ITableOptions) {
    super({
      layout: TableLayoutType.FIXED,
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      ...options,
    });
  }
}

export function formatExportPoints(points: number): string {
  return Number.isFinite(points) ? String(Number(points.toFixed(2))) : '0';
}

export function formatExamCode(code: string): string {
  return `MÃ ĐỀ: ${code.replace(/^\s*MÃ\s*ĐỀ\s*:\s*/i, '').trim()}`;
}
