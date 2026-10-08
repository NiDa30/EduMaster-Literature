import { LessonPlan5512, Exam7991Data, SlideItem, RubricData } from '../types';
import PptxGenJS from 'pptxgenjs';
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  AlignmentType, 
  BorderStyle,
  PageOrientation 
} from 'docx';

function sanitizeFilename(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .substring(0, 40);
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadLegacyBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob(['\ufeff' + content], { type: `${mimeType};charset=utf-8` });
  saveBlob(blob, filename);
}

// =========================================================================
// 1. POWERPOINT EXPORT (.pptx) - VIA PPTXGENJS (REAL 16:9 PRESENTATION)
// =========================================================================
export async function exportPptxSlides(slides: SlideItem[], title: string): Promise<void> {
  const pres = new PptxGenJS();
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'EduMaster Văn';
  pres.company = 'EduMaster';
  pres.title = title || 'Bài giảng Ngữ văn';

  slides.forEach((s, idx) => {
    const slide = pres.addSlide();
    slide.background = { color: '1C1817' };

    // Phase tag & counter
    slide.addText(
      [
        { text: (s.phaseTag || 'BÀI HỌC').toUpperCase(), options: { bold: true, color: 'D97706', fontSize: 10 } },
        { text: `  |  Slide ${idx + 1}/${slides.length}`, options: { color: 'A8A29E', fontSize: 10 } }
      ],
      { x: 0.8, y: 0.4, w: 10.0, h: 0.35, fontFace: 'Arial' }
    );

    // Slide Title
    slide.addText(s.title || 'Tiêu đề Slide', {
      x: 0.8,
      y: 0.8,
      w: 11.7,
      h: 0.9,
      fontFace: 'Arial',
      fontSize: 22,
      color: 'FFFFFF',
      bold: true,
      wrap: true
    });

    // Body content by layout
    if (s.layout === 'quote' && s.quoteText) {
      slide.addShape(pres.ShapeType.roundRect, {
        x: 1.0,
        y: 1.8,
        w: 11.3,
        h: 4.4,
        fill: { color: '272221' },
        line: { color: 'B45309', width: 1.5 },
        rectRadius: 0.2
      });

      slide.addText(`“${s.quoteText}”`, {
        x: 1.4,
        y: 2.1,
        w: 10.5,
        h: 2.0,
        fontFace: 'Georgia',
        fontSize: 18,
        color: 'FEF3C7',
        italic: true,
        align: 'center',
        wrap: true
      });

      if (s.quoteAuthor) {
        slide.addText(`— ${s.quoteAuthor}`, {
          x: 1.4,
          y: 4.2,
          w: 10.5,
          h: 0.4,
          fontFace: 'Arial',
          fontSize: 14,
          color: 'F59E0B',
          bold: true,
          align: 'center'
        });
      }

      if (s.discussionQuestion) {
        slide.addText(
          [
            { text: 'Câu hỏi khám phá: ', options: { bold: true, color: 'FBBF24', fontSize: 13 } },
            { text: s.discussionQuestion, options: { color: 'E7E5E4', fontSize: 13 } }
          ],
          { x: 1.4, y: 4.8, w: 10.5, h: 1.1, fontFace: 'Arial', wrap: true }
        );
      }
    } else if (s.layout === 'split') {
      // Left box
      slide.addShape(pres.ShapeType.roundRect, {
        x: 0.8,
        y: 1.9,
        w: 5.6,
        h: 4.3,
        fill: { color: '272221' },
        line: { color: '44403C', width: 1 },
        rectRadius: 0.15
      });
      slide.addText(s.contentLeft || '', {
        x: 1.0,
        y: 2.1,
        w: 5.2,
        h: 1.4,
        fontFace: 'Arial',
        fontSize: 14,
        color: 'F5F5F4',
        wrap: true
      });
      if (s.bullets && s.bullets.length > 0) {
        const bulletRuns = s.bullets.map(b => ({
          text: b,
          options: { bullet: true, color: 'D6D3D1', fontSize: 13 }
        }));
        slide.addText(bulletRuns, {
          x: 1.0,
          y: 3.6,
          w: 5.2,
          h: 2.4,
          fontFace: 'Arial',
          wrap: true
        });
      }

      // Right box
      slide.addShape(pres.ShapeType.roundRect, {
        x: 6.8,
        y: 1.9,
        w: 5.6,
        h: 4.3,
        fill: { color: '272221' },
        line: { color: '44403C', width: 1 },
        rectRadius: 0.15
      });
      slide.addText(s.contentRight || '', {
        x: 7.0,
        y: 2.1,
        w: 5.2,
        h: 3.9,
        fontFace: 'Georgia',
        fontSize: 14,
        color: 'FAFAF9',
        wrap: true
      });
    } else if (s.layout === 'cards' && s.cards) {
      const cardW = 3.6;
      const gap = 0.35;
      const startX = 0.8;
      s.cards.forEach((card, ci) => {
        const cx = startX + ci * (cardW + gap);
        slide.addShape(pres.ShapeType.roundRect, {
          x: cx,
          y: 2.0,
          w: cardW,
          h: 4.2,
          fill: { color: '272221' },
          line: { color: 'B45309', width: 1 },
          rectRadius: 0.15
        });
        slide.addText(card.title, {
          x: cx + 0.2,
          y: 2.2,
          w: cardW - 0.4,
          h: 0.6,
          fontFace: 'Georgia',
          fontSize: 15,
          color: 'FBBF24',
          bold: true,
          wrap: true
        });
        slide.addText(card.desc, {
          x: cx + 0.2,
          y: 2.9,
          w: cardW - 0.4,
          h: 3.1,
          fontFace: 'Arial',
          fontSize: 13,
          color: 'E7E5E4',
          wrap: true
        });
      });
    } else if (s.layout === 'quiz' && s.quizQuestion) {
      slide.addShape(pres.ShapeType.roundRect, {
        x: 1.0,
        y: 1.9,
        w: 11.3,
        h: 4.4,
        fill: { color: '272221' },
        line: { color: '7C2D37', width: 1.5 },
        rectRadius: 0.2
      });
      slide.addText(s.quizQuestion.question, {
        x: 1.3,
        y: 2.1,
        w: 10.7,
        h: 1.2,
        fontFace: 'Georgia',
        fontSize: 16,
        color: 'FFFFFF',
        bold: true,
        wrap: true
      });
      const optW = 5.1;
      const optH = 0.95;
      s.quizQuestion.options.forEach((opt, oi) => {
        const row = Math.floor(oi / 2);
        const col = oi % 2;
        const ox = 1.3 + col * 5.6;
        const oy = 3.5 + row * 1.2;
        const isCorrect = oi === s.quizQuestion?.correctIndex;
        slide.addShape(pres.ShapeType.roundRect, {
          x: ox,
          y: oy,
          w: optW,
          h: optH,
          fill: { color: isCorrect ? '064E3B' : '1C1917' },
          line: { color: isCorrect ? '10B981' : '57534E', width: 1 },
          rectRadius: 0.1
        });
        slide.addText(opt, {
          x: ox + 0.2,
          y: oy + 0.1,
          w: optW - 0.4,
          h: optH - 0.2,
          fontFace: 'Arial',
          fontSize: 12,
          color: isCorrect ? 'A7F3D0' : 'E7E5E4',
          wrap: true
        });
      });
    } else {
      slide.addShape(pres.ShapeType.roundRect, {
        x: 1.2,
        y: 1.9,
        w: 10.9,
        h: 4.3,
        fill: { color: '272221' },
        line: { color: '44403C', width: 1 },
        rectRadius: 0.2
      });
      slide.addText(s.contentLeft || '', {
        x: 1.6,
        y: 2.2,
        w: 10.1,
        h: 1.4,
        fontFace: 'Georgia',
        fontSize: 16,
        color: 'F5F5F4',
        wrap: true
      });
      if (s.bullets && s.bullets.length > 0) {
        const bulletRuns = s.bullets.map(b => ({
          text: b,
          options: { bullet: true, color: 'D6D3D1', fontSize: 14 }
        }));
        slide.addText(bulletRuns, {
          x: 1.6,
          y: 3.7,
          w: 10.1,
          h: 2.2,
          fontFace: 'Arial',
          wrap: true
        });
      }
    }

    if (s.speakerNotes) {
      slide.addNotes(s.speakerNotes);
      slide.addText(`Ghi chú sư phạm: ${s.speakerNotes}`, {
        x: 0.8,
        y: 6.7,
        w: 11.7,
        h: 0.4,
        fontFace: 'Arial',
        fontSize: 10,
        color: 'A8A29E',
        italic: true,
        wrap: true
      });
    }
  });

  const filename = `SLIDE_${sanitizeFilename(title || 'BaiGiang')}.pptx`;
  await pres.writeFile({ fileName: filename });
}

// =========================================================================
// 2. REAL OPENXML DOCX EXPORT - VIA DOCX LIBRARY
// =========================================================================

export async function exportDocxKHBD(khbd: LessonPlan5512): Promise<void> {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134, // ~2.0cm
              bottom: 1134,
              left: 1418, // ~2.5cm
              right: 1134,
            },
          },
        },
        children: [
          // Header Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: khbd.info.department.toUpperCase(), font: 'Times New Roman', size: 24 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: khbd.info.school.toUpperCase(), bold: true, font: 'Times New Roman', size: 24 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Tổ: ${khbd.info.subjectGroup} | GV: ${khbd.info.teacherName}`, font: 'Times New Roman', size: 22 })] }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', bold: true, font: 'Times New Roman', size: 24 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Độc lập - Tự do - Hạnh phúc', bold: true, font: 'Times New Roman', size: 24 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '-------------------', font: 'Times New Roman', size: 22 })] }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({ text: '', spacing: { after: 200 } }),
          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: 'KẾ HOẠCH BÀI DẠY', bold: true, font: 'Times New Roman', size: 30 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: `BÀI: ${khbd.info.lessonTitle.toUpperCase()}`, bold: true, font: 'Times New Roman', size: 26, color: '7C2D37' }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: `Môn học: ${khbd.info.subject} - ${khbd.info.grade} | Bộ sách: ${khbd.info.textbook}`, italics: true, font: 'Times New Roman', size: 24 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: `Thời lượng: ${khbd.info.periods} | ${khbd.info.academicYear}`, italics: true, font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: '(Xây dựng theo đúng quy chuẩn Công văn 5512/BGDĐT-GDTrH của Bộ GD&ĐT)', italics: true, font: 'Times New Roman', size: 20, color: '666666' }),
            ],
            spacing: { after: 300 },
          }),

          // I. Mục tiêu
          new Paragraph({
            children: [new TextRun({ text: 'I. MỤC TIÊU DẠY HỌC', bold: true, font: 'Times New Roman', size: 26 })],
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            children: [new TextRun({ text: '1. Về kiến thức:', bold: true, font: 'Times New Roman', size: 24 })],
            spacing: { before: 100, after: 80 },
          }),
          ...khbd.objectives.knowledge.map(k => new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun({ text: k, font: 'Times New Roman', size: 24 })],
            spacing: { after: 60 },
          })),

          new Paragraph({
            children: [new TextRun({ text: '2. Về năng lực:', bold: true, font: 'Times New Roman', size: 24 })],
            spacing: { before: 100, after: 80 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'a) Năng lực chung:', bold: true, italics: true, font: 'Times New Roman', size: 24 }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Tự chủ và tự học: ', bold: true, font: 'Times New Roman', size: 24 }),
              new TextRun({ text: khbd.objectives.generalCompetencies.selfControl, font: 'Times New Roman', size: 24 }),
            ],
            spacing: { after: 60 },
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Giao tiếp và hợp tác: ', bold: true, font: 'Times New Roman', size: 24 }),
              new TextRun({ text: khbd.objectives.generalCompetencies.communication, font: 'Times New Roman', size: 24 }),
            ],
            spacing: { after: 60 },
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Giải quyết vấn đề và sáng tạo: ', bold: true, font: 'Times New Roman', size: 24 }),
              new TextRun({ text: khbd.objectives.generalCompetencies.problemSolving, font: 'Times New Roman', size: 24 }),
            ],
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'b) Năng lực đặc thù môn Ngữ văn:', bold: true, italics: true, font: 'Times New Roman', size: 24 }),
            ],
            spacing: { before: 80, after: 60 },
          }),
          ...khbd.objectives.specializedCompetencies.map(sc => new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun({ text: sc, font: 'Times New Roman', size: 24 })],
            spacing: { after: 60 },
          })),

          new Paragraph({
            children: [new TextRun({ text: '3. Về phẩm chất:', bold: true, font: 'Times New Roman', size: 24 })],
            spacing: { before: 100, after: 80 },
          }),
          ...khbd.objectives.qualities.map(q => new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun({ text: q, font: 'Times New Roman', size: 24 })],
            spacing: { after: 60 },
          })),

          // II. Thiết bị dạy học và học liệu
          new Paragraph({
            children: [new TextRun({ text: 'II. THIẾT BỊ VÀ HỌC LIỆU', bold: true, font: 'Times New Roman', size: 26 })],
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            children: [new TextRun({ text: '1. Đối với giáo viên:', bold: true, font: 'Times New Roman', size: 24 })],
          }),
          ...khbd.equipment.teacher.map(t => new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun({ text: t, font: 'Times New Roman', size: 24 })],
            spacing: { after: 60 },
          })),
          new Paragraph({
            children: [new TextRun({ text: '2. Đối với học sinh:', bold: true, font: 'Times New Roman', size: 24 })],
            spacing: { before: 80 },
          }),
          ...khbd.equipment.student.map(s => new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun({ text: s, font: 'Times New Roman', size: 24 })],
            spacing: { after: 60 },
          })),

          // III. Tiến trình dạy học
          new Paragraph({
            children: [new TextRun({ text: 'III. TIẾN TRÌNH DẠY HỌC (CHUẨN 4 HOẠT ĐỘNG CÔNG VĂN 5512)', bold: true, font: 'Times New Roman', size: 26 })],
            spacing: { before: 250, after: 120 },
          }),
          ...khbd.activities.flatMap((act, idx) => [
            new Paragraph({
              children: [
                new TextRun({ text: `Hoạt động ${idx + 1}: ${act.name} `, bold: true, font: 'Times New Roman', size: 24, color: '1E3A8A' }),
                new TextRun({ text: `(${act.time})`, italics: true, font: 'Times New Roman', size: 22 }),
              ],
              spacing: { before: 180, after: 80 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'a) Mục tiêu: ', bold: true, font: 'Times New Roman', size: 24 }),
                new TextRun({ text: act.objective, font: 'Times New Roman', size: 24 }),
              ],
              spacing: { after: 60 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'b) Nội dung: ', bold: true, font: 'Times New Roman', size: 24 }),
                new TextRun({ text: act.content, font: 'Times New Roman', size: 24 }),
              ],
              spacing: { after: 60 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'c) Sản phẩm: ', bold: true, font: 'Times New Roman', size: 24 }),
                new TextRun({ text: act.product, font: 'Times New Roman', size: 24 }),
              ],
              spacing: { after: 60 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'd) Tổ chức thực hiện:', bold: true, font: 'Times New Roman', size: 24 }),
              ],
              spacing: { after: 80 },
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 30, type: WidthType.PERCENTAGE },
                      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Tiến trình các bước', bold: true, font: 'Times New Roman', size: 22 })] })],
                    }),
                    new TableCell({
                      width: { size: 70, type: WidthType.PERCENTAGE },
                      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Hoạt động của Giáo viên và Học sinh', bold: true, font: 'Times New Roman', size: 22 })] })],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Bước 1: Chuyển giao nhiệm vụ', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: act.steps.step1, font: 'Times New Roman', size: 22 })] })] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Bước 2: Thực hiện nhiệm vụ', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: act.steps.step2, font: 'Times New Roman', size: 22 })] })] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Bước 3: Báo cáo, thảo luận', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: act.steps.step3, font: 'Times New Roman', size: 22 })] })] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Bước 4: Kết luận, nhận định', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: act.steps.step4, font: 'Times New Roman', size: 22 })] })] }),
                  ],
                }),
              ],
            }),
            new Paragraph({ text: '', spacing: { after: 120 } }),
          ]),

          // Signatures
          new Paragraph({ text: '', spacing: { before: 300, after: 100 } }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'TỔ TRƯỞNG CHUYÊN MÔN', bold: true, font: 'Times New Roman', size: 24 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '(Ký và ghi rõ họ tên)', italics: true, font: 'Times New Roman', size: 22 })] }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'GIÁO VIÊN SOẠN BÀI', bold: true, font: 'Times New Roman', size: 24 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '(Ký và ghi rõ họ tên)', italics: true, font: 'Times New Roman', size: 22 })] }),
                      new Paragraph({ text: '', spacing: { after: 500 } }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: khbd.info.teacherName, bold: true, font: 'Times New Roman', size: 24 })] }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveBlob(blob, `KHBD_5512_${sanitizeFilename(khbd.info.lessonTitle)}.docx`);
}

export async function exportDocxExam(exam: Exam7991Data, khbd: LessonPlan5512): Promise<void> {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134,
              bottom: 1134,
              left: 1418,
              right: 1134,
            },
          },
        },
        children: [
          // Header Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: khbd.info.department.toUpperCase(), font: 'Times New Roman', size: 22 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: khbd.info.school.toUpperCase(), bold: true, font: 'Times New Roman', size: 24 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `MÃ ĐỀ: ${exam.examHeader.examCode}`, bold: true, font: 'Times New Roman', size: 22 })] }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: exam.examHeader.title.toUpperCase(), bold: true, font: 'Times New Roman', size: 24 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Môn: ${khbd.info.subject} - ${khbd.info.grade}`, font: 'Times New Roman', size: 22 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Thời gian làm bài: ${exam.examHeader.duration}`, italics: true, font: 'Times New Roman', size: 22 })] }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({ text: '', spacing: { after: 150 } }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: '(Đề thi cấu trúc 04 phần theo định dạng Công văn 7991/BGDĐT-GDTrH của Bộ GD&ĐT)', italics: true, font: 'Times New Roman', size: 20, color: '555555' }),
            ],
            spacing: { after: 200 },
          }),

          // Reading Passage
          ...(exam.passageRef ? [
            new Paragraph({
              children: [new TextRun({ text: 'NGỮ LIỆU ĐỌC HIỂU:', bold: true, font: 'Times New Roman', size: 24, color: '7C2D37' })],
              spacing: { before: 100, after: 60 },
            }),
            new Paragraph({
              children: [new TextRun({ text: exam.passageRef, italics: true, font: 'Times New Roman', size: 22 })],
              spacing: { after: 200 },
            }),
          ] : []),

          // Part I
          new Paragraph({
            children: [new TextRun({ text: 'PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3.0 ĐIỂM)', bold: true, font: 'Times New Roman', size: 24, color: '1E3A8A' })],
            spacing: { before: 150, after: 60 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Thí sinh trả lời từ câu 1 đến câu 12. Mỗi câu đúng được 0.25 điểm.', italics: true, font: 'Times New Roman', size: 20, color: '555555' })],
            spacing: { after: 100 },
          }),
          ...exam.partI.flatMap((q, idx) => [
            new Paragraph({
              children: [
                new TextRun({ text: `${q.code || `Câu ${idx + 1}`}: `, bold: true, font: 'Times New Roman', size: 24 }),
                new TextRun({ text: q.question, font: 'Times New Roman', size: 24 }),
                new TextRun({ text: ` [${q.level}]`, italics: true, font: 'Times New Roman', size: 20, color: '888888' }),
              ],
              spacing: { before: 80, after: 40 },
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'A. ', bold: true, font: 'Times New Roman', size: 22 }), new TextRun({ text: q.options.A, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'B. ', bold: true, font: 'Times New Roman', size: 22 }), new TextRun({ text: q.options.B, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'C. ', bold: true, font: 'Times New Roman', size: 22 }), new TextRun({ text: q.options.C, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'D. ', bold: true, font: 'Times New Roman', size: 22 }), new TextRun({ text: q.options.D, font: 'Times New Roman', size: 22 })] })] }),
                  ],
                }),
              ],
            }),
          ]),

          // Part II
          new Paragraph({
            children: [new TextRun({ text: 'PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG / SAI (2.0 ĐIỂM)', bold: true, font: 'Times New Roman', size: 24, color: '1E3A8A' })],
            spacing: { before: 200, after: 60 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Thí sinh trả lời các câu. Trong mỗi ý a), b), c), d), thí sinh chọn Đúng hoặc Sai. (Đúng 1 ý: 0.1đ; 2 ý: 0.25đ; 3 ý: 0.5đ; 4 ý: 1.0đ)', italics: true, font: 'Times New Roman', size: 20, color: '555555' })],
            spacing: { after: 100 },
          }),
          ...exam.partII.flatMap((q, idx) => [
            new Paragraph({
              children: [
                new TextRun({ text: `${q.code || `Câu ${idx + 1}`}: `, bold: true, font: 'Times New Roman', size: 24 }),
                new TextRun({ text: q.stem, font: 'Times New Roman', size: 24 }),
                new TextRun({ text: ` [${q.level} - 1.0 điểm]`, italics: true, font: 'Times New Roman', size: 20, color: '888888' }),
              ],
              spacing: { before: 80, after: 60 },
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({ width: { size: 10, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Lệnh', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ width: { size: 70, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Phát biểu khẳng định', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ width: { size: 10, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Đúng', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ width: { size: 10, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Sai', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  ],
                }),
                ...q.statements.map(st => new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${st.subId})`, bold: true, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: st.text, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ children: [new Paragraph({ text: '' })] }),
                    new TableCell({ children: [new Paragraph({ text: '' })] }),
                  ],
                })),
              ],
            }),
          ]),

          // Part III
          new Paragraph({
            children: [new TextRun({ text: 'PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (2.0 ĐIỂM)', bold: true, font: 'Times New Roman', size: 24, color: '1E3A8A' })],
            spacing: { before: 200, after: 60 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Thí sinh trả lời ngắn gọn (mỗi câu 0.5 điểm).', italics: true, font: 'Times New Roman', size: 20, color: '555555' })],
            spacing: { after: 100 },
          }),
          ...exam.partIII.flatMap((q, idx) => [
            new Paragraph({
              children: [
                new TextRun({ text: `${q.code || `Câu ${idx + 1}`}: `, bold: true, font: 'Times New Roman', size: 24 }),
                new TextRun({ text: q.question, font: 'Times New Roman', size: 24 }),
                new TextRun({ text: ` [${q.level} - 0.5 điểm]`, italics: true, font: 'Times New Roman', size: 20, color: '888888' }),
              ],
              spacing: { before: 60, after: 40 },
            }),
            new Paragraph({
              children: [new TextRun({ text: 'Trả lời: ........................................................................................................', italics: true, font: 'Times New Roman', size: 22 })],
              spacing: { after: 80 },
            }),
          ]),

          // Part IV
          new Paragraph({
            children: [new TextRun({ text: 'PHẦN IV. TỰ LUẬN NGHỊ LUẬN (3.0 ĐIỂM)', bold: true, font: 'Times New Roman', size: 24, color: '1E3A8A' })],
            spacing: { before: 200, after: 60 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Thí sinh trình bày bài viết nghị luận hoàn chỉnh, kết cấu rõ ràng.', italics: true, font: 'Times New Roman', size: 20, color: '555555' })],
            spacing: { after: 100 },
          }),
          ...exam.partIV.map((q, idx) => new Paragraph({
            children: [
              new TextRun({ text: `${q.code || `Câu ${idx + 1}`}: `, bold: true, font: 'Times New Roman', size: 24 }),
              new TextRun({ text: q.question, font: 'Times New Roman', size: 24 }),
              new TextRun({ text: ` [${q.level} - ${q.points} điểm]`, italics: true, font: 'Times New Roman', size: 20, color: '888888' }),
            ],
            spacing: { before: 60, after: 120 },
          })),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: '---------- HẾT ĐỀ THI ----------', bold: true, font: 'Times New Roman', size: 24 })],
            spacing: { before: 250, after: 300 },
          }),

          // Page Break for Answer Key
          new Paragraph({
            children: [new TextRun({ text: 'HƯỚNG DẪN CHẤM & ĐÁP ÁN CHI TIẾT (10.0 ĐIỂM)', bold: true, font: 'Times New Roman', size: 26, color: '7C2D37' })],
            spacing: { before: 200, after: 100 },
          }),

          // Part I Answer Table
          new Paragraph({
            children: [new TextRun({ text: 'ĐÁP ÁN PHẦN I (3.0 ĐIỂM):', bold: true, font: 'Times New Roman', size: 24 })],
            spacing: { before: 100, after: 60 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: exam.partI.map((_, i) => new TableCell({
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `C${i+1}`, bold: true, font: 'Times New Roman', size: 20 })] })],
                })),
              }),
              new TableRow({
                children: exam.partI.map(q => new TableCell({
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: q.correctAnswer, bold: true, font: 'Times New Roman', size: 22, color: '1E3A8A' })] })],
                })),
              }),
            ],
          }),

          // Part II Answer Table
          new Paragraph({
            children: [new TextRun({ text: 'ĐÁP ÁN PHẦN II (2.0 ĐIỂM):', bold: true, font: 'Times New Roman', size: 24 })],
            spacing: { before: 150, after: 60 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Câu', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Ý a', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Ý b', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Ý c', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Ý d', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Quy tắc chấm', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                ],
              }),
              ...exam.partII.map((q, idx) => new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: q.code || `Câu ${idx + 1}`, bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: q.statements[0].isCorrect ? 'ĐÚNG' : 'SAI', bold: true, font: 'Times New Roman', size: 22, color: q.statements[0].isCorrect ? '059669' : 'DC2626' })] })] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: q.statements[1].isCorrect ? 'ĐÚNG' : 'SAI', bold: true, font: 'Times New Roman', size: 22, color: q.statements[1].isCorrect ? '059669' : 'DC2626' })] })] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: q.statements[2].isCorrect ? 'ĐÚNG' : 'SAI', bold: true, font: 'Times New Roman', size: 22, color: q.statements[2].isCorrect ? '059669' : 'DC2626' })] })] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: q.statements[3].isCorrect ? 'ĐÚNG' : 'SAI', bold: true, font: 'Times New Roman', size: 22, color: q.statements[3].isCorrect ? '059669' : 'DC2626' })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Đúng 1: 0.1đ; 2: 0.25đ; 3: 0.5đ; 4: 1.0đ', font: 'Times New Roman', size: 20 })] })] }),
                ],
              })),
            ],
          }),

          // Part III Answer Table
          new Paragraph({
            children: [new TextRun({ text: 'ĐÁP ÁN PHẦN III (2.0 ĐIỂM):', bold: true, font: 'Times New Roman', size: 24 })],
            spacing: { before: 150, after: 60 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: exam.partIII.map((_, i) => new TableCell({
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `C${i+1}`, bold: true, font: 'Times New Roman', size: 20 })] })],
                })),
              }),
              new TableRow({
                children: exam.partIII.map(q => new TableCell({
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: q.correctAnswer, bold: true, font: 'Times New Roman', size: 22, color: '059669' })] })],
                })),
              }),
            ],
          }),

          // Part IV Rubric
          new Paragraph({
            children: [new TextRun({ text: 'HƯỚNG DẪN CHẤM PHẦN IV TỰ LUẬN (3.0 ĐIỂM):', bold: true, font: 'Times New Roman', size: 24 })],
            spacing: { before: 150, after: 60 },
          }),
          ...exam.partIV.flatMap(q => [
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({ width: { size: 80, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Tiêu chí và nội dung phân tích', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Điểm', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  ],
                }),
                ...q.rubric.map(r => new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: r.step, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${r.points} đ`, bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  ],
                })),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'TỔNG ĐIỂM CÂU TỰ LUẬN', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${q.points}.0 đ`, bold: true, font: 'Times New Roman', size: 22, color: '7C2D37' })] })] }),
                  ],
                }),
              ],
            }),
            new Paragraph({ text: '', spacing: { after: 100 } }),
          ]),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveBlob(blob, `DE_THI_7991_${sanitizeFilename(exam.examHeader.title)}.docx`);
}

export async function exportDocxRubric(rubric: RubricData): Promise<void> {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134,
              bottom: 1134,
              left: 1418,
              right: 1134,
            },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: rubric.title.toUpperCase(), bold: true, font: 'Times New Roman', size: 28, color: '7C2D37' }),
            ],
            spacing: { before: 100, after: 60 },
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: `Tổng điểm tối đa: ${rubric.totalPoints}.0 điểm`, italics: true, font: 'Times New Roman', size: 24 }),
            ],
            spacing: { after: 200 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 22, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Tiêu chí đánh giá', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ width: { size: 10, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Trọng số', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ width: { size: 12, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Điểm tối đa', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ width: { size: 56, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Mô tả chi tiết các mức đạt được', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                ],
              }),
              ...rubric.criteria.map(c => new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun({ text: c.name, bold: true, font: 'Times New Roman', size: 22 })] }),
                      new Paragraph({ children: [new TextRun({ text: c.description, font: 'Times New Roman', size: 20, color: '555555' })] }),
                    ],
                  }),
                  new TableCell({
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${c.weight}%`, font: 'Times New Roman', size: 22 })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${c.maxPoints} đ`, bold: true, font: 'Times New Roman', size: 22 })] })],
                  }),
                  new TableCell({
                    children: c.levels.map(l => new Paragraph({
                      children: [
                        new TextRun({ text: `• ${l.label} (${l.score} đ): `, bold: true, font: 'Times New Roman', size: 20 }),
                        new TextRun({ text: l.descriptor, font: 'Times New Roman', size: 20 }),
                      ],
                      spacing: { after: 40 },
                    })),
                  }),
                ],
              })),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveBlob(blob, `RUBRIC_DANH_GIA_${sanitizeFilename(rubric.title)}.docx`);
}

export async function exportDocxMatrix(exam: Exam7991Data, khbd: LessonPlan5512): Promise<void> {
  const partINB = exam.partI.filter(q => q.level === 'NB');
  const partITH = exam.partI.filter(q => q.level === 'TH');
  const partIVD = exam.partI.filter(q => q.level === 'VD');

  const partIINB = exam.partII.filter(q => q.level === 'NB');
  const partIITH = exam.partII.filter(q => q.level === 'TH');
  const partIIVD = exam.partII.filter(q => q.level === 'VD');

  const partIIITH = exam.partIII.filter(q => q.level === 'TH');
  const partIIIVD = exam.partIII.filter(q => q.level === 'VD');

  const totalPartIPts = exam.partI.reduce((s, q) => s + (q.points || 0.25), 0);
  const totalPartIIPts = exam.partII.reduce((s, q) => s + (q.points || 1.0), 0);
  const totalPartIIIPts = exam.partIII.reduce((s, q) => s + (q.points || 0.5), 0);
  const totalPartIVPts = exam.partIV.reduce((s, q) => s + (q.points || 3.0), 0);
  const grandTotalPts = totalPartIPts + totalPartIIPts + totalPartIIIPts + totalPartIVPts;
  const totalQuestions = exam.partI.length + exam.partII.length + exam.partIII.length + exam.partIV.length;

  const nbPts = (partINB.length * 0.25) + (partIINB.length * 1.0);
  const thPts = (partITH.length * 0.25) + (partIITH.length * 1.0) + (partIIITH.length * 0.5);
  const vdPts = (partIVD.length * 0.25) + (partIIVD.length * 1.0) + (partIIIVD.length * 0.5) + totalPartIVPts;

  const nbPercent = grandTotalPts > 0 ? Math.round((nbPts / grandTotalPts) * 100) : 40;
  const thPercent = grandTotalPts > 0 ? Math.round((thPts / grandTotalPts) * 100) : 30;
  const vdPercent = grandTotalPts > 0 ? (100 - nbPercent - thPercent) : 30;

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              orientation: PageOrientation.LANDSCAPE,
            },
            margin: {
              top: 1134,
              bottom: 1134,
              left: 1134,
              right: 1134,
            },
          },
        },
        children: [
          // Header Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: khbd.info.department.toUpperCase(), font: 'Times New Roman', size: 22 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: khbd.info.school.toUpperCase(), bold: true, font: 'Times New Roman', size: 24 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `TỔ: ${khbd.info.subjectGroup.toUpperCase()}`, font: 'Times New Roman', size: 22 })] }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'BẢNG MA TRẬN VÀ BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KỲ', bold: true, font: 'Times New Roman', size: 24, color: '7C2D37' })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `MÔN: NGỮ VĂN - ${khbd.info.grade.toUpperCase()} (${khbd.info.textbook})`, bold: true, font: 'Times New Roman', size: 22 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Bài học: ${khbd.info.lessonTitle}`, italics: true, font: 'Times New Roman', size: 20 })] }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({ text: '', spacing: { after: 150 } }),

          // Part A: KHUNG MA TRẬN
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: 'I. KHUNG MA TRẬN ĐỀ KIỂM TRA ĐỊNH KỲ (CHUẨN CÔNG VĂN 7991/BGDĐT-GDTrH)', bold: true, font: 'Times New Roman', size: 26, color: '1E3A8A' }),
            ],
            spacing: { before: 100, after: 100 },
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: `Tổng điểm: ${grandTotalPts.toFixed(1)} điểm  ·  Tỷ lệ nhận thức: Nhận biết ${nbPercent}% - Thông hiểu ${thPercent}% - Vận dụng ${vdPercent}%`, italics: true, font: 'Times New Roman', size: 22 }),
            ],
            spacing: { after: 150 },
          }),

          // Matrix Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 5, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'TT', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ width: { size: 23, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Kỹ năng & Đơn vị kiến thức', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ width: { size: 21, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Nhận biết (${nbPercent}%)`, bold: true, font: 'Times New Roman', size: 20, color: '1E3A8A' })] })] }),
                  new TableCell({ width: { size: 21, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Thông hiểu (${thPercent}%)`, bold: true, font: 'Times New Roman', size: 20, color: '065F46' })] })] }),
                  new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Vận dụng (${vdPercent}%)`, bold: true, font: 'Times New Roman', size: 20, color: '92400E' })] })] }),
                  new TableCell({ width: { size: 10, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Tổng', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '1', font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun({ text: `Đọc hiểu văn bản & Tiếng Việt (${khbd.info.lessonTitle})`, bold: true, font: 'Times New Roman', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: 'Phần I (MCQ), Phần II (Đúng/Sai), Phần III (Trả lời ngắn)', font: 'Times New Roman', size: 18, color: '666666' })] }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun({ text: `• Phần I: ${partINB.length} câu (${(partINB.length * 0.25).toFixed(2)} đ)`, font: 'Times New Roman', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: `• Phần II: ${partIINB.length} câu (${(partIINB.length * 1.0).toFixed(1)} đ)`, font: 'Times New Roman', size: 20 })] }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun({ text: `• Phần I: ${partITH.length} câu (${(partITH.length * 0.25).toFixed(2)} đ)`, font: 'Times New Roman', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: `• Phần II: ${partIITH.length} câu (${(partIITH.length * 1.0).toFixed(1)} đ)`, font: 'Times New Roman', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: `• Phần III: ${partIIITH.length} câu (${(partIIITH.length * 0.5).toFixed(1)} đ)`, font: 'Times New Roman', size: 20 })] }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun({ text: `• Phần I: ${partIVD.length} câu (${(partIVD.length * 0.25).toFixed(2)} đ)`, font: 'Times New Roman', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: `• Phần II: ${partIIVD.length} câu (${(partIIVD.length * 1.0).toFixed(1)} đ)`, font: 'Times New Roman', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: `• Phần III: ${partIIIVD.length} câu (${(partIIIVD.length * 0.5).toFixed(1)} đ)`, font: 'Times New Roman', size: 20 })] }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${exam.partI.length + exam.partII.length + exam.partIII.length} câu`, bold: true, font: 'Times New Roman', size: 20 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${(totalPartIPts + totalPartIIPts + totalPartIIIPts).toFixed(1)} đ`, bold: true, font: 'Times New Roman', size: 20, color: '1E3A8A' })] }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '2', font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun({ text: 'Viết bài văn nghị luận (Phần IV Tự luận)', bold: true, font: 'Times New Roman', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: 'Nghị luận văn học / Nghị luận xã hội kết hợp đọc hiểu', font: 'Times New Roman', size: 18, color: '666666' })] }),
                    ],
                  }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '-', font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '-', font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun({ text: `• Phần IV: ${exam.partIV.length} câu tự luận`, bold: true, font: 'Times New Roman', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: `• Điểm số: ${totalPartIVPts.toFixed(1)} điểm`, font: 'Times New Roman', size: 20 })] }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${exam.partIV.length} câu`, bold: true, font: 'Times New Roman', size: 20 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${totalPartIVPts.toFixed(1)} đ`, bold: true, font: 'Times New Roman', size: 20, color: '92400E' })] }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '', font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'TỔNG CỘNG THEO MỨC ĐỘ', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${nbPts.toFixed(1)} đ (${nbPercent}%)`, bold: true, font: 'Times New Roman', size: 20, color: '1E3A8A' })] })] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${thPts.toFixed(1)} đ (${thPercent}%)`, bold: true, font: 'Times New Roman', size: 20, color: '065F46' })] })] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${vdPts.toFixed(1)} đ (${vdPercent}%)`, bold: true, font: 'Times New Roman', size: 20, color: '92400E' })] })] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${totalQuestions} câu · ${grandTotalPts.toFixed(1)} đ`, bold: true, font: 'Times New Roman', size: 20, color: '7C2D37' })] })] }),
                ],
              }),
            ],
          }),
          new Paragraph({ text: '', spacing: { after: 200 } }),

          // Part B: BẢN ĐẶC TẢ
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: 'II. BẢN ĐẶC TẢ MA TRẬN ĐỀ KIỂM TRA ĐỊNH KỲ (CV 7991)', bold: true, font: 'Times New Roman', size: 26, color: '1E3A8A' }),
            ],
            spacing: { before: 150, after: 120 },
          }),

          // Specification Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 5, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'TT', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ width: { size: 22, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Đơn vị kiến thức', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ width: { size: 45, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Yêu cầu cần đạt (YCCĐ)', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ width: { size: 16, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Vị trí trong đề', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ width: { size: 12, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Mức độ', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '1', font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `Đọc hiểu: ${khbd.info.lessonTitle}`, bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun({ text: '• Nhận biết: Nhận diện thể loại, hoàn cảnh sáng tác, từ ngữ, hình ảnh, ngôi kể, điểm nhìn.', font: 'Times New Roman', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: '• Thông hiểu: Phân tích ý nghĩa chi tiết nghệ thuật, cảm xúc và thông điệp tư tưởng.', font: 'Times New Roman', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: '• Vận dụng: Đánh giá tư tưởng, rút ra bài học nhận thức và liên hệ thực tế.', font: 'Times New Roman', size: 20 })] }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Phần I (12 câu)\nPhần II (2 câu)\nPhần III (4 câu)`, font: 'Times New Roman', size: 20 })] }),
                    ],
                  }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'NB, TH, VD', font: 'Times New Roman', size: 20 })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '2', font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Viết bài văn nghị luận', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun({ text: '• Vận dụng: Viết bài văn nghị luận phân tích, đánh giá tác phẩm hoặc vấn đề xã hội đặt ra trong tác phẩm; lập luận chặt chẽ, dẫn chứng xác đáng, diễn đạt truyền cảm.', font: 'Times New Roman', size: 20 })] }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Phần IV (Câu 1 - ${totalPartIVPts} đ)`, bold: true, font: 'Times New Roman', size: 20 })] }),
                    ],
                  }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Vận dụng', bold: true, font: 'Times New Roman', size: 20, color: '92400E' })] })] }),
                ],
              }),
            ],
          }),
          new Paragraph({ text: '', spacing: { after: 250 } }),

          // Signatures
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
              insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'BAN GIÁM HIỆU DUYỆT', bold: true, font: 'Times New Roman', size: 22 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '(Ký và ghi rõ họ tên)', italics: true, font: 'Times New Roman', size: 20, color: '777777' })] }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'TỔ TRƯỞNG CHUYÊN MÔN', bold: true, font: 'Times New Roman', size: 22 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '(Ký và ghi rõ họ tên)', italics: true, font: 'Times New Roman', size: 20, color: '777777' })] }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 34, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'GIÁO VIÊN BIÊN SOẠN', bold: true, font: 'Times New Roman', size: 22 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: khbd.info.teacherName || 'Giáo viên Ngữ văn', font: 'Times New Roman', size: 22 })] }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveBlob(blob, `MA_TRAN_DAC_TA_7991_${sanitizeFilename(khbd.info.lessonTitle)}.docx`);
}

// =========================================================================
// 3. COMPATIBILITY EXPORTS (.doc HTML-in-Blob & .html Presentation)
// =========================================================================

export function exportWordKHBD(khbd: LessonPlan5512) {
  const content = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>${khbd.info.lessonTitle} - KHBD 5512</title>
<style>
  @page { size: 21.0cm 29.7cm; margin: 2.0cm 1.5cm 2.0cm 2.5cm; }
  body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.45; }
  table { width: 100%; border-collapse: collapse; margin: 12px 0; }
  th, td { border: 1px solid #000; padding: 6px 8px; vertical-align: top; }
  .center { text-align: center; }
  .bold { font-weight: bold; }
  .italic { font-style: italic; }
  .uppercase { text-transform: uppercase; }
  h1 { font-size: 15pt; font-weight: bold; text-align: center; margin: 15px 0 5px 0; text-transform: uppercase; }
  h2 { font-size: 13.5pt; font-weight: bold; margin: 12px 0 4px 0; }
  h3 { font-size: 13pt; font-weight: bold; margin: 8px 0 4px 0; }
  p { margin: 4px 0; text-align: justify; }
</style>
</head>
<body>
  <h1>KẾ HOẠCH BÀI DẠY (CV 5512)</h1>
  <p class="center bold uppercase">BÀI: ${khbd.info.lessonTitle}</p>
  <p class="center italic">Môn: ${khbd.info.subject} - ${khbd.info.grade} | ${khbd.info.school}</p>
  <p class="center italic">GV: ${khbd.info.teacherName}</p>
  <h2>I. MỤC TIÊU DẠY HỌC</h2>
  <ul>${khbd.objectives.knowledge.map(k => `<li>${k}</li>`).join('')}</ul>
  <h2>II. THIẾT BỊ VÀ HỌC LIỆU</h2>
  <ul>${khbd.equipment.teacher.map(t => `<li>${t}</li>`).join('')}</ul>
  <h2>III. TIẾN TRÌNH DẠY HỌC</h2>
  ${khbd.activities.map(a => `<h3>${a.name} (${a.time})</h3><p><b>Mục tiêu:</b> ${a.objective}</p><p><b>Nội dung:</b> ${a.content}</p>`).join('')}
</body>
</html>`;
  downloadLegacyBlob(content, `KHBD_5512_${sanitizeFilename(khbd.info.lessonTitle)}.doc`, 'application/msword');
}

export function exportWordExam7991(exam: Exam7991Data, khbd: LessonPlan5512) {
  const content = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>${exam.examHeader.title} - Chuẩn CV 7991</title>
<style>
  body { font-family: 'Times New Roman', serif; font-size: 12.5pt; line-height: 1.4; }
  table { width: 100%; border-collapse: collapse; margin: 10px 0; }
  th, td { border: 1px solid #000; padding: 5px 7px; vertical-align: top; }
  .center { text-align: center; }
  .bold { font-weight: bold; }
  .italic { font-style: italic; }
  h1 { font-size: 14pt; font-weight: bold; text-align: center; text-transform: uppercase; }
  h2 { font-size: 13pt; font-weight: bold; margin: 12px 0 4px 0; background: #F1F5F9; padding: 4px; }
</style>
</head>
<body>
  <h1>${exam.examHeader.title}</h1>
  <p class="center italic">Mã đề: ${exam.examHeader.examCode} | Thời gian: ${exam.examHeader.duration}</p>
  <h2>PHẦN I. TRẮC NGHIỆM NHIỀU LỰA CHỌN (3.0 ĐIỂM)</h2>
  ${exam.partI.map((q, i) => `<p><b>${q.code || `Câu ${i+1}`}:</b> ${q.question}<br/>A. ${q.options.A} | B. ${q.options.B} | C. ${q.options.C} | D. ${q.options.D}</p>`).join('')}
  <h2>PHẦN II. TRẮC NGHIỆM ĐÚNG / SAI (2.0 ĐIỂM)</h2>
  ${exam.partII.map((q, i) => `<p><b>${q.code || `Câu ${i+1}`}:</b> ${q.stem}</p><ul>${q.statements.map(s => `<li>${s.subId}) ${s.text}</li>`).join('')}</ul>`).join('')}
  <h2>PHẦN III. TRẢ LỜI NGẮN (2.0 ĐIỂM)</h2>
  ${exam.partIII.map((q, i) => `<p><b>${q.code || `Câu ${i+1}`}:</b> ${q.question}</p>`).join('')}
  <h2>PHẦN IV. TỰ LUẬN (3.0 ĐIỂM)</h2>
  ${exam.partIV.map((q, i) => `<p><b>${q.code || `Câu ${i+1}`}:</b> ${q.question} (${q.points} điểm)</p>`).join('')}
</body>
</html>`;
  downloadLegacyBlob(content, `DE_THI_7991_${sanitizeFilename(exam.examHeader.title)}.doc`, 'application/msword');
}

export function exportHtmlSlides(slides: SlideItem[], title: string) {
  const content = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Slide Bài Giảng: ${title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Be+Vietnam+Pro:wght@400;500;600;700&subset=vietnamese&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Be Vietnam Pro', sans-serif; background-color: #1A1615; color: #FAF8F5; margin: 0; }
    .font-serif { font-family: 'Lora', Georgia, serif; }
    .slide-page { min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; padding: 3rem; border-bottom: 4px solid #2D2422; box-sizing: border-box; }
  </style>
</head>
<body class="bg-[#171413] text-stone-100">
  <div class="fixed top-4 right-4 z-50 bg-stone-900/95 px-4 py-2 rounded-xl text-sm border border-stone-800 shadow-xl flex gap-3 items-center">
    <span class="text-amber-400 font-semibold font-serif">EduMaster Văn</span>
    <button onclick="window.print()" class="bg-[#7C2D37] hover:bg-[#993A46] text-white px-3 py-1 rounded text-xs font-medium">In ấn / Xuất PDF</button>
  </div>
  ${slides.map((s, idx) => `
    <section class="slide-page">
      <div>
        <div class="flex items-center justify-between mb-4">
          <span class="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">${s.phaseTag}</span>
          <span class="text-sm font-mono text-stone-400">Slide ${idx + 1} / ${slides.length}</span>
        </div>
        <h1 class="text-3xl font-semibold font-serif text-white mb-6">${s.title}</h1>
      </div>
      <div class="my-auto py-6">
        ${s.layout === 'quote' && s.quoteText ? `
          <div class="max-w-[760px] mx-auto p-10 rounded-2xl bg-stone-900/80 border border-amber-900/40 text-center">
            <p class="text-2xl font-serif italic text-amber-100 mb-4 whitespace-pre-line">"${s.quoteText}"</p>
            <div class="text-sm text-amber-400 font-medium mb-4">— ${s.quoteAuthor || ''}</div>
            ${s.discussionQuestion ? `<div class="p-4 rounded-xl bg-stone-800/80 border border-stone-700 text-sm text-stone-300 text-left"><strong class="text-amber-300 block mb-1">Câu hỏi thảo luận:</strong> ${s.discussionQuestion}</div>` : ''}
          </div>
        ` : `
          <div class="bg-stone-900/70 p-8 rounded-2xl border border-stone-800 max-w-4xl mx-auto">
            <p class="text-xl text-stone-200 leading-[1.8] mb-4 font-serif">${s.contentLeft || ''}</p>
            ${s.bullets ? `<ul class="space-y-2 text-stone-300">${s.bullets.map(b => `<li>✦ ${b}</li>`).join('')}</ul>` : ''}
          </div>
        `}
      </div>
      <div class="pt-4 border-t border-stone-800 flex justify-between items-center text-xs text-stone-400">
        <div><span class="font-semibold text-stone-300">Ghi chú sư phạm:</span> ${s.speakerNotes || ''}</div>
        <div>EduMaster Văn THPT</div>
      </div>
    </section>
  `).join('')}
</body>
</html>`;
  downloadLegacyBlob(content, `SLIDE_NGU_VAN_${sanitizeFilename(title)}.html`, 'text/html');
}

export function exportRubricDoc(rubric: RubricData) {
  const content = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>${rubric.title}</title>
<style>
  body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.4; }
  table { width: 100%; border-collapse: collapse; margin-top: 15px; }
  th, td { border: 1px solid #000; padding: 6px; vertical-align: top; }
  th { background-color: #F1F5F9; font-weight: bold; }
  .center { text-align: center; }
</style>
</head>
<body>
  <h2 class="center">${rubric.title}</h2>
  <p class="center italic">Tổng điểm tối đa: ${rubric.totalPoints}.0 điểm</p>
  <table>
    <tr>
      <th width="25%">Tiêu chí</th>
      <th width="15%" class="center">Trọng số / Điểm</th>
      <th width="60%">Mô tả mức đạt</th>
    </tr>
    ${rubric.criteria.map(c => `
      <tr>
        <td><b>${c.name}</b><br/>${c.description}</td>
        <td class="center">${c.weight}% (${c.maxPoints} đ)</td>
        <td>${c.levels.map(l => `<p><b>${l.label} (${l.score} đ):</b> ${l.descriptor}</p>`).join('')}</td>
      </tr>
    `).join('')}
  </table>
</body>
</html>`;
  downloadLegacyBlob(content, `RUBRIC_${sanitizeFilename(rubric.title)}.doc`, 'application/msword');
}
