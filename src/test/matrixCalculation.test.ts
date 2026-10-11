import { describe, it, expect } from 'vitest';
import { calculateMatrixDistribution } from '../components/MatrixView';
import { createExamFixture } from './fixtures';
import { Exam7991Data } from '../types';

describe('Matrix Calculation Engine (Công văn 7991)', () => {
  it('correctly calculates points and percentage distribution for standard 10.0-point exam', () => {
    const exam = createExamFixture();
    const result = calculateMatrixDistribution(exam);

    expect(result.grandTotalPts).toBeCloseTo(10.0, 2);
    expect(result.isMatched).toBe(true);

    // Verify percentages sum up to 100%
    const sumPercent = result.nbPercent + result.thPercent + result.vdPercent;
    expect(sumPercent).toBe(100);

    // Verify point sum matches grand total
    const sumPts = result.nbPts + result.thPts + result.vdPts;
    expect(sumPts).toBeCloseTo(result.grandTotalPts, 2);
  });

  it('correctly filters questions by cognitive levels (NB, TH, VD) across all parts', () => {
    const exam: Exam7991Data = {
      examHeader: { title: 'Đề test ma trận', duration: '90 phút', examCode: 'MT-01' },
      partI: [
        { id: '1', code: 'C1', level: 'NB', question: 'Q1', options: { A: '1', B: '2', C: '3', D: '4' }, correctAnswer: 'A', points: 0.25, explanation: '' },
        { id: '2', code: 'C2', level: 'TH', question: 'Q2', options: { A: '1', B: '2', C: '3', D: '4' }, correctAnswer: 'B', points: 0.25, explanation: '' },
        { id: '3', code: 'C3', level: 'VD', question: 'Q3', options: { A: '1', B: '2', C: '3', D: '4' }, correctAnswer: 'C', points: 0.25, explanation: '' }
      ],
      partII: [
        {
          id: '4',
          code: 'C4',
          level: 'NB',
          stem: 'Stem',
          statements: [
            { subId: 'a', text: 'a', isCorrect: true, explanation: '' },
            { subId: 'b', text: 'b', isCorrect: false, explanation: '' },
            { subId: 'c', text: 'c', isCorrect: true, explanation: '' },
            { subId: 'd', text: 'd', isCorrect: false, explanation: '' }
          ],
          points: 1.0
        }
      ],
      partIII: [
        { id: '5', code: 'C5', level: 'TH', question: 'Q5', correctAnswer: 'A', points: 0.5, explanation: '' }
      ],
      partIV: [
        { id: '6', code: 'C6', level: 'VD', question: 'Q6', rubric: [], points: 4.0 }
      ]
    };

    const result = calculateMatrixDistribution(exam);

    expect(result.partINB).toHaveLength(1);
    expect(result.partITH).toHaveLength(1);
    expect(result.partIVD).toHaveLength(1);
    expect(result.partIINB).toHaveLength(1);
    expect(result.partIIITH).toHaveLength(1);
    expect(result.totalQuestions).toBe(6);

    // nbPts = 1 * 0.25 + 1 * 1.0 = 1.25
    expect(result.nbPts).toBe(1.25);
    // thPts = 1 * 0.25 + 0 * 1.0 + 1 * 0.5 = 0.75
    expect(result.thPts).toBe(0.75);
    // vdPts = 1 * 0.25 + 0 + 0 + 4.0 = 4.25
    expect(result.vdPts).toBe(4.25);

    expect(result.grandTotalPts).toBe(0.75 + 1.0 + 0.5 + 4.0); // 6.25
    expect(result.isMatched).toBe(false); // 6.25 != 10.0
  });

  it('handles default fallback points when question point field is missing or 0', () => {
    const exam: Exam7991Data = {
      examHeader: { title: 'Đề thiếu điểm', duration: '90 phút', examCode: 'MT-02' },
      partI: [
        { id: '1', code: 'C1', level: 'NB', question: 'Q1', options: { A: '1', B: '2', C: '3', D: '4' }, correctAnswer: 'A', points: 0, explanation: '' }
      ],
      partII: [
        {
          id: '2',
          code: 'C2',
          level: 'TH',
          stem: 'Stem',
          statements: [
            { subId: 'a', text: 'a', isCorrect: true, explanation: '' },
            { subId: 'b', text: 'b', isCorrect: false, explanation: '' },
            { subId: 'c', text: 'c', isCorrect: true, explanation: '' },
            { subId: 'd', text: 'd', isCorrect: false, explanation: '' }
          ],
          points: 0
        }
      ],
      partIII: [
        { id: '3', code: 'C3', level: 'TH', question: 'Q3', correctAnswer: 'Ans', points: 0, explanation: '' }
      ],
      partIV: [
        { id: '4', code: 'C4', level: 'VD', question: 'Q4', rubric: [], points: 0 }
      ]
    };

    const result = calculateMatrixDistribution(exam);
    // When points is 0 or undefined, fallback applies: 0.25 for partI, 1.0 for partII, 0.5 for partIII, 3.0 for partIV
    expect(result.totalPartIPts).toBe(0.25);
    expect(result.totalPartIIPts).toBe(1.0);
    expect(result.totalPartIIIPts).toBe(0.5);
    expect(result.totalPartIVPts).toBe(3.0);
    expect(result.grandTotalPts).toBe(4.75);
  });

  it('handles completely empty exam without division by zero or NaN', () => {
    const emptyExam: Exam7991Data = {
      examHeader: { title: 'Đề rỗng', duration: '90 phút', examCode: 'MT-EMPTY' },
      partI: [],
      partII: [],
      partIII: [],
      partIV: []
    };

    const result = calculateMatrixDistribution(emptyExam);

    expect(result.grandTotalPts).toBe(0);
    expect(result.totalQuestions).toBe(0);
    expect(result.nbPts).toBe(0);
    expect(result.thPts).toBe(0);
    expect(result.vdPts).toBe(0);
    // Fallback percentages when grandTotalPts is 0: 40%, 30%, 30%
    expect(result.nbPercent).toBe(40);
    expect(result.thPercent).toBe(30);
    expect(result.vdPercent).toBe(30);
    expect(result.nbPercent + result.thPercent + result.vdPercent).toBe(100);
    expect(result.isMatched).toBe(false);
  });

  it('validates isMatched boundary: within 0.05 tolerance of 10.0', () => {
    const baseExam = createExamFixture();

    // 9.96 -> diff 0.04 < 0.05 -> true
    const exam996 = {
      ...baseExam,
      partI: baseExam.partI.map((q, i) => i === 0 ? { ...q, points: 0.21 } : q)
    };
    const res996 = calculateMatrixDistribution(exam996);
    expect(res996.isMatched).toBe(true);

    // 9.90 -> diff 0.10 >= 0.05 -> false
    const exam990 = {
      ...baseExam,
      partI: baseExam.partI.map((q, i) => i === 0 ? { ...q, points: 0.15 } : q)
    };
    const res990 = calculateMatrixDistribution(exam990);
    expect(res990.isMatched).toBe(false);
  });
});
