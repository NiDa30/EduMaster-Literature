import { describe, it, expect } from 'vitest';
import { createExamFixture } from './fixtures';
import { Exam7991Data, PartIITrueFalseQuestion } from '../types';

/**
 * CV 7991 Scoring Engine Helper
 * Calculates score for Part II 4-statement True/False questions according to official MOET rules:
 * - 1 statement correct = 0.10 pts
 * - 2 statements correct = 0.25 pts
 * - 3 statements correct = 0.50 pts
 * - 4 statements correct = 1.00 pts
 * - 0 statements correct = 0.00 pts
 */
export function calculatePartIIScore(q: any, studentAnswers: Record<'a' | 'b' | 'c' | 'd', boolean>): number {
  let correctCount = 0;
  const statements = q.statements;
  if (Array.isArray(statements)) {
    statements.forEach((st: any) => {
      const subId = st.subId as 'a' | 'b' | 'c' | 'd';
      if (studentAnswers[subId] === (st.isCorrect ?? st.correctAnswer)) correctCount++;
    });
  } else if (statements) {
    if (studentAnswers.a === statements.a?.correctAnswer) correctCount++;
    if (studentAnswers.b === statements.b?.correctAnswer) correctCount++;
    if (studentAnswers.c === statements.c?.correctAnswer) correctCount++;
    if (studentAnswers.d === statements.d?.correctAnswer) correctCount++;
  }

  switch (correctCount) {
    case 1: return 0.1;
    case 2: return 0.25;
    case 3: return 0.5;
    case 4: return 1.0;
    default: return 0.0;
  }
}

/**
 * Total exam points calculation
 */
export function calculateExamGrandTotal(exam: Exam7991Data): {
  partIPts: number;
  partIIPts: number;
  partIIIPts: number;
  partIVPts: number;
  grandTotal: number;
  isStandardMatched: boolean;
  totalQuestions: number;
} {
  const partIPts = exam.partI.reduce((sum, q) => sum + (q.points || 0.25), 0);
  const partIIPts = exam.partII.reduce((sum, q) => sum + (q.points || 1.0), 0);
  const partIIIPts = exam.partIII.reduce((sum, q) => sum + (q.points || 0.5), 0);
  const partIVPts = exam.partIV.reduce((sum, q) => sum + (q.points || 3.0), 0);
  
  const grandTotal = parseFloat((partIPts + partIIPts + partIIIPts + partIVPts).toFixed(2));
  const isStandardMatched = Math.abs(grandTotal - 10.0) < 0.05;
  const totalQuestions = exam.partI.length + exam.partII.length + exam.partIII.length + exam.partIV.length;

  return {
    partIPts,
    partIIPts,
    partIIIPts,
    partIVPts,
    grandTotal,
    isStandardMatched,
    totalQuestions,
  };
}

describe('Exam 7991 Scoring and Evaluation Logic', () => {
  describe('Part II (True/False 4-Statements) Official Scoring Table', () => {
    const samplePartIIQuestion: any = {
      id: 'p2-1',
      code: 'Câu 1 (Đ/S)',
      prompt: 'Xét tính đúng/sai của các nhận định về bài thơ Tây Tiến:',
      statements: {
        a: { text: 'Tây Tiến là đơn vị quân đội thành lập năm 1947.', correctAnswer: true, level: 'NB' },
        b: { text: 'Nhà thơ Quang Dũng xuất thân từ tầng lớp quý tộc phong kiến.', correctAnswer: false, level: 'NB' },
        c: { text: 'Hình tượng người lính mang vẻ đẹp bi tráng và hào hoa.', correctAnswer: true, level: 'TH' },
        d: { text: 'Bài thơ sử dụng hoàn toàn bút pháp hiện thực trần trụi.', correctAnswer: false, level: 'VD' },
      },
      points: 1.0,
      cognitiveDistribution: '2 NB · 1 TH · 1 VD',
    };

    it('awards 0.00 points when 0 statements are correct', () => {
      const studentAnswers = { a: false, b: true, c: false, d: true }; // All wrong
      const score = calculatePartIIScore(samplePartIIQuestion, studentAnswers);
      expect(score).toBe(0.0);
    });

    it('awards exactly 0.10 points when 1 statement is correct', () => {
      const studentAnswers = { a: true, b: true, c: false, d: true }; // Only 'a' is correct
      const score = calculatePartIIScore(samplePartIIQuestion, studentAnswers);
      expect(score).toBe(0.1);
    });

    it('awards exactly 0.25 points when 2 statements are correct', () => {
      const studentAnswers = { a: true, b: false, c: false, d: true }; // 'a' and 'b' are correct
      const score = calculatePartIIScore(samplePartIIQuestion, studentAnswers);
      expect(score).toBe(0.25);
    });

    it('awards exactly 0.50 points when 3 statements are correct', () => {
      const studentAnswers = { a: true, b: false, c: true, d: true }; // 'a', 'b', 'c' are correct
      const score = calculatePartIIScore(samplePartIIQuestion, studentAnswers);
      expect(score).toBe(0.5);
    });

    it('awards full 1.00 points when all 4 statements are correct', () => {
      const studentAnswers = { a: true, b: false, c: true, d: false }; // All 4 match correctAnswer
      const score = calculatePartIIScore(samplePartIIQuestion, studentAnswers);
      expect(score).toBe(1.0);
    });
  });

  describe('Grand Total Score and 10.0 Boundary Validation', () => {
    it('accurately calculates 10.0 total points on preset exam', () => {
      const exam = createExamFixture();
      const result = calculateExamGrandTotal(exam);

      expect(result.grandTotal).toBe(10.0);
      expect(result.isStandardMatched).toBe(true);
      expect(result.totalQuestions).toBeGreaterThan(0);
    });

    it('detects under-score deficiency when total < 10.0', () => {
      const exam = createExamFixture();
      exam.partIV = []; // Remove essay (3.0 pts)
      const result = calculateExamGrandTotal(exam);

      expect(result.grandTotal).toBe(7.0);
      expect(result.isStandardMatched).toBe(false);
    });

    it('detects over-score excess when total > 10.0', () => {
      const exam = createExamFixture();
      exam.partIV[0].points = 4.5; // Increase essay to 4.5 (total = 11.5)
      const result = calculateExamGrandTotal(exam);

      expect(result.grandTotal).toBe(11.5);
      expect(result.isStandardMatched).toBe(false);
    });

    it('handles empty exam with 0 points gracefully', () => {
      const emptyExam: any = {
        title: 'Đề trống',
        duration: '90 phút',
        partI: [],
        partII: [],
        partIII: [],
        partIV: [],
      };
      const result = calculateExamGrandTotal(emptyExam);

      expect(result.grandTotal).toBe(0.0);
      expect(result.isStandardMatched).toBe(false);
      expect(result.totalQuestions).toBe(0);
    });

    it('avoids floating point drift on decimal additions', () => {
      const exam: any = {
        title: 'Test Floating Point',
        duration: '90 phút',
        partI: [
          { id: '1', question: 'q1', options: ['A','B','C','D'], correctIndex: 0, points: 0.25, level: 'NB' },
          { id: '2', question: 'q2', options: ['A','B','C','D'], correctIndex: 0, points: 0.25, level: 'NB' },
          { id: '3', question: 'q3', options: ['A','B','C','D'], correctIndex: 0, points: 0.25, level: 'NB' },
        ],
        partII: [],
        partIII: [
          { id: '4', question: 'q4', answer: 'a', points: 0.5, level: 'TH' }
        ],
        partIV: [
          { id: '5', prompt: 'p', rubric: [], points: 3.75 }
        ],
      };

      // 0.25 * 3 + 0.5 + 3.75 = 0.75 + 0.5 + 3.75 = 5.0
      const result = calculateExamGrandTotal(exam);
      expect(result.grandTotal).toBe(5.0);
    });
  });
});
