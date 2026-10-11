import { describe, it, expect } from 'vitest';
import { sanitizeFilename } from '../utils/exportUtils';
import { createKhbdFixture, createExamFixture, createRubricFixture } from './fixtures';

describe('Export Preparation & Sanitization Engine', () => {
  describe('sanitizeFilename', () => {
    it('strips Vietnamese diacritics and replaces spaces/special characters with underscores', () => {
      const input = 'Bài giảng Tây Tiến - Quang Dũng';
      const sanitized = sanitizeFilename(input);

      // Should be ASCII safe, no accents, no spaces
      expect(sanitized).toMatch(/^[a-zA-Z0-9_-]+$/);
      expect(sanitized).toContain('Tay_Tien');
    });

    it('truncates filename to a maximum of 40 characters', () => {
      const longInput = 'Kế hoạch bài dạy chuyên sâu môn Ngữ văn lớp 12 bài Tây Tiến rất dài vượt quá độ dài quy định';
      const sanitized = sanitizeFilename(longInput);

      expect(sanitized.length).toBeLessThanOrEqual(40);
    });

    it('handles filenames with special characters (colons, slashes, punctuation)', () => {
      const specialInput = 'Đề KTĐK 7991: Đọc hiểu & Nghị luận (12A1) [Học kỳ I]';
      const sanitized = sanitizeFilename(specialInput);

      expect(sanitized).not.toContain(':');
      expect(sanitized).not.toContain('&');
      expect(sanitized).not.toContain('(');
      expect(sanitized).not.toContain('[');
      expect(sanitized).toMatch(/^[a-zA-Z0-9_-]+$/);
    });

    it('handles empty string or symbols-only gracefully', () => {
      expect(sanitizeFilename('')).toBe('');
      const symbolsOnly = '***$$$###';
      const sanitized = sanitizeFilename(symbolsOnly);
      expect(sanitized).toBe('_________');
    });
  });

  describe('Document Data Models Readiness for Export', () => {
    it('ensures KHBD 5512 model meets complete OpenXML export requirements', () => {
      const khbd = createKhbdFixture();

      expect(khbd.info.school).toBeTruthy();
      expect(khbd.info.teacherName).toBeTruthy();
      expect(khbd.info.lessonTitle).toBeTruthy();
      expect(khbd.objectives.knowledge.length).toBeGreaterThan(0);
      expect(khbd.activities.length).toBeGreaterThan(0);

      khbd.activities.forEach(act => {
        expect(act.name).toBeTruthy();
        expect(act.steps.step1).toBeTruthy();
        expect(act.steps.step2).toBeTruthy();
        expect(act.steps.step3).toBeTruthy();
        expect(act.steps.step4).toBeTruthy();
      });
    });

    it('ensures Exam 7991 model meets complete OpenXML export requirements', () => {
      const exam = createExamFixture();

      expect(exam.examHeader.title).toBeTruthy();
      expect(exam.examHeader.duration).toBeTruthy();
      expect(exam.partI.length).toBeGreaterThan(0);
      expect(exam.partII.length).toBeGreaterThan(0);
      expect(exam.partIII.length).toBeGreaterThan(0);
      expect(exam.partIV.length).toBeGreaterThan(0);

      exam.partII.forEach(tf => {
        expect(tf.statements).toHaveLength(4);
        expect(tf.statements.map(s => s.subId)).toEqual(['a', 'b', 'c', 'd']);
      });
    });

    it('ensures Rubric model meets complete OpenXML export requirements', () => {
      const rubric = createRubricFixture();

      expect(rubric.title).toBeTruthy();
      expect(rubric.criteria.length).toBeGreaterThan(0);

      rubric.criteria.forEach(crit => {
        expect(crit.name).toBeTruthy();
        expect(crit.maxPoints).toBeGreaterThan(0);
        expect(crit.levels.length).toBeGreaterThanOrEqual(3);
      });
    });
  });
});
