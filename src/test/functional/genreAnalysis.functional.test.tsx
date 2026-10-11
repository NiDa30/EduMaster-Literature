import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GenreAnalysisView } from '../../components/LiteratureWorkspace/GenreAnalysisView';
import { createLessonFixture } from '../fixtures';
import { LiteratureLesson } from '../../types';

describe('Functional: Genre Analysis & Argument Map Workspace', () => {
  let mockLesson: LiteratureLesson;
  let onUpdateLesson: any;
  let setActiveModule: any;
  let onAddSlideFromQuote: any;
  let onAddQuestionFromPassage: any;
  let onAddToKhbd: any;

  beforeEach(() => {
    mockLesson = createLessonFixture({
      title: 'Tây Tiến',
      author: 'Quang Dũng',
      genre: 'poetry'
    });

    onUpdateLesson = vi.fn();
    setActiveModule = vi.fn();
    onAddSlideFromQuote = vi.fn();
    onAddQuestionFromPassage = vi.fn();
    onAddToKhbd = vi.fn();
  });

  describe('Genre Analysis Navigation Tabs', () => {
    it('renders genre analysis header with current lesson metadata', () => {
      render(
        <GenreAnalysisView
          lesson={mockLesson}
          onUpdateLesson={onUpdateLesson}
          setActiveModule={setActiveModule}
          onAddSlideFromQuote={onAddSlideFromQuote}
          onAddQuestionFromPassage={onAddQuestionFromPassage}
          onAddToKhbd={onAddToKhbd}
        />
      );

      expect(screen.getByText(/Thi pháp học theo Thể loại/i)).toBeInTheDocument();
      expect(screen.getByText(/Phân tích Thể loại: Tây Tiến/i)).toBeInTheDocument();
    });

    it('switches between tabs: 1. Tổng quan, 4. Argument Map', () => {
      render(
        <GenreAnalysisView
          lesson={mockLesson}
          onUpdateLesson={onUpdateLesson}
          setActiveModule={setActiveModule}
          onAddSlideFromQuote={onAddSlideFromQuote}
          onAddQuestionFromPassage={onAddQuestionFromPassage}
          onAddToKhbd={onAddToKhbd}
        />
      );

      // Default: 1. Tổng quan tab
      expect(screen.getByText(/Giá trị nội dung & Tư tưởng nhân văn/i)).toBeInTheDocument();

      // Click 4. Argument Map tab
      const argumentMapTab = screen.getByRole('button', { name: /4\. Argument Map/i });
      fireEvent.click(argumentMapTab);

      // Should display Argument Map thesis and claim tree
      expect(screen.getByText(/Luận đề trung tâm \(Thesis\)/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Thêm Luận điểm/i })).toBeInTheDocument();
    });
  });

  describe('Argument Map Interactive Operations', () => {
    it('adds a new claim to argument map on clicking "Thêm Luận điểm"', () => {
      render(
        <GenreAnalysisView
          lesson={mockLesson}
          onUpdateLesson={onUpdateLesson}
          setActiveModule={setActiveModule}
          onAddSlideFromQuote={onAddSlideFromQuote}
          onAddQuestionFromPassage={onAddQuestionFromPassage}
          onAddToKhbd={onAddToKhbd}
        />
      );

      // Switch to Argument Map tab
      fireEvent.click(screen.getByRole('button', { name: /4\. Argument Map/i }));

      // Click add claim
      const addClaimBtn = screen.getByRole('button', { name: /Thêm Luận điểm/i });
      fireEvent.click(addClaimBtn);

      expect(onUpdateLesson).toHaveBeenCalledTimes(1);
      const updateCall = onUpdateLesson.mock.calls[0][0];
      expect(updateCall.argumentMap).toBeDefined();
      expect(updateCall.argumentMap.claims.length).toBeGreaterThan(0);
    });

    it('triggers cross-module transfer to KHBD on clicking "Đưa vào KHBD"', () => {
      render(
        <GenreAnalysisView
          lesson={mockLesson}
          onUpdateLesson={onUpdateLesson}
          setActiveModule={setActiveModule}
          onAddSlideFromQuote={onAddSlideFromQuote}
          onAddQuestionFromPassage={onAddQuestionFromPassage}
          onAddToKhbd={onAddToKhbd}
        />
      );

      const pushToKhbdBtn = screen.getByRole('button', { name: /Đưa vào KHBD/i });
      fireEvent.click(pushToKhbdBtn);

      expect(onAddToKhbd).toHaveBeenCalledTimes(1);
    });
  });
});
