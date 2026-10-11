import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Exam7991View } from '../../components/Exam7991View';
import { createExamFixture, createKhbdFixture } from '../fixtures';
import { Exam7991Data } from '../../types';

describe('Functional: Exam 7991 Builder & Scoring Simulator', () => {
  let mockExam: Exam7991Data;
  let mockKhbd: any;
  let setExam: any;

  beforeEach(() => {
    mockExam = createExamFixture();
    mockKhbd = createKhbdFixture();
    setExam = vi.fn();
  });

  describe('Exam Presentation & Ribbon Summary', () => {
    it('renders exam header, duration and grand total score balance ribbon', () => {
      render(
        <Exam7991View
          exam={mockExam}
          setExam={setExam}
          khbd={mockKhbd}
        />
      );

      expect(screen.getAllByText(/Đề kiểm tra Định kỳ/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/10.0 \/ 10.0 đ/i)).toBeInTheDocument();
      expect(screen.getByText(/Công văn 7991\/BGDĐT-GDTrH/i)).toBeInTheDocument();
    });

    it('switches view mode between "Đề thi" and "Đáp án & Barem"', () => {
      render(
        <Exam7991View
          exam={mockExam}
          setExam={setExam}
          khbd={mockKhbd}
        />
      );

      const markingGuideBtn = screen.getByRole('button', { name: /Đáp án & Barem/i });
      fireEvent.click(markingGuideBtn);

      // In marking guide mode, explanations and rubrics should be prominently displayed
      expect(screen.getAllByText(/Giải thích đáp án:/i).length).toBeGreaterThan(0);
    });

    it('filters exam questions by parts (Phần I, Phần II, Phần III, Phần IV)', () => {
      render(
        <Exam7991View
          exam={mockExam}
          setExam={setExam}
          khbd={mockKhbd}
        />
      );

      // Click Phần I filter
      const partIFilterBtn = screen.getByRole('button', { name: /Phần I: TN Nhiều lựa chọn/i });
      fireEvent.click(partIFilterBtn);

      // Only Part I should be visible
      expect(screen.getByText(/PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN/i)).toBeInTheDocument();
      expect(screen.queryByText(/PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG \/ SAI/i)).not.toBeInTheDocument();
    });
  });

  describe('Part II True/False Official Scoring Simulation (CV 7991)', () => {
    it('renders statements for every Part II question', () => {
      render(
        <Exam7991View
          exam={mockExam}
          setExam={setExam}
          khbd={mockKhbd}
        />
      );

      const partIIQuestions = mockExam.partII;
      expect(partIIQuestions.length).toBeGreaterThan(0);

      partIIQuestions.forEach(q => {
        expect(screen.getByText(new RegExp(q.stem.slice(0, 30), 'i'))).toBeInTheDocument();
      });
    });
  });

  describe('Question Addition to Specific Parts', () => {
    it('appends a new question to Part I when clicking "Thêm câu" in Part I', () => {
      render(
        <Exam7991View
          exam={mockExam}
          setExam={setExam}
          khbd={mockKhbd}
        />
      );

      const addPartIBtn = screen.getAllByRole('button', { name: /Thêm câu/i })[0];
      fireEvent.click(addPartIBtn);

      expect(setExam).toHaveBeenCalledTimes(1);
    });

    it('appends a new question to Part II when clicking "Thêm câu" in Part II', () => {
      render(
        <Exam7991View
          exam={mockExam}
          setExam={setExam}
          khbd={mockKhbd}
        />
      );

      const addPartIIBtn = screen.getAllByRole('button', { name: /Thêm câu/i })[1];
      fireEvent.click(addPartIIBtn);

      expect(setExam).toHaveBeenCalledTimes(1);
    });
  });
});
