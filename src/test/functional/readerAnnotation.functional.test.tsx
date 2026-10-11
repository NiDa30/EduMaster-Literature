import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LiteratureReader } from '../../components/LiteratureWorkspace/LiteratureReader';
import { createLessonFixture } from '../fixtures';
import { LiteratureLesson } from '../../types';

describe('Functional: Literature Reader & Annotation Workspace', () => {
  let mockLesson: LiteratureLesson;
  let onUpdateLesson: any;
  let setActiveModule: any;
  let onAddSlideFromQuote: any;
  let onAddQuestionFromPassage: any;
  let onSetExamPassage: any;
  let onToggleFocusMode: any;

  beforeEach(() => {
    mockLesson = createLessonFixture({
      title: 'Tây Tiến',
      author: 'Quang Dũng',
      fullText: 'Sông Mã xa rồi Tây Tiến ơi!\nNhớ về rừng núi nhớ chơi vơi.\nSài Khao sương lấp đoàn quân mỏi,\nMường Lát hoa về trong đêm hơi.',
      annotations: [
        {
          id: 'anno-1',
          textSnippet: 'Sông Mã xa rồi Tây Tiến ơi!',
          type: 'highlight',
          note: 'Tiếng gọi thiết tha hoài niệm',
          color: 'amber',
          timestamp: 'Hôm qua'
        }
      ]
    });

    onUpdateLesson = vi.fn();
    setActiveModule = vi.fn();
    onAddSlideFromQuote = vi.fn();
    onAddQuestionFromPassage = vi.fn();
    onSetExamPassage = vi.fn();
    onToggleFocusMode = vi.fn();
  });

  it('renders literature title, author context and reader body paragraphs', () => {
    render(
      <LiteratureReader
        lesson={mockLesson}
        onUpdateLesson={onUpdateLesson}
        setActiveModule={setActiveModule}
        onAddSlideFromQuote={onAddSlideFromQuote}
        onAddQuestionFromPassage={onAddQuestionFromPassage}
        onSetExamPassage={onSetExamPassage}
        isFocusMode={false}
        onToggleFocusMode={onToggleFocusMode}
      />
    );

    expect(screen.getByText('Tây Tiến')).toBeInTheDocument();
    expect(screen.getAllByText(/Quang Dũng/)[0]).toBeInTheDocument();
    expect(screen.getByText(/Sông Mã xa rồi Tây Tiến ơi!/)).toBeInTheDocument();
  });

  it('switches left sidebar between "Cấu trúc" and "Chú thích" tabs', () => {
    render(
      <LiteratureReader
        lesson={mockLesson}
        onUpdateLesson={onUpdateLesson}
        setActiveModule={setActiveModule}
        onAddSlideFromQuote={onAddSlideFromQuote}
        onAddQuestionFromPassage={onAddQuestionFromPassage}
        onSetExamPassage={onSetExamPassage}
        isFocusMode={false}
      />
    );

    // Initial tab: Cấu trúc
    expect(screen.getByText('Tác giả & Bối cảnh lịch sử')).toBeInTheDocument();

    // Click tab Chú thích
    const annotationsTab = screen.getByRole('button', { name: /Chú thích/i });
    fireEvent.click(annotationsTab);

    // Should display existing annotation
    expect(screen.getByText('Tiếng gọi thiết tha hoài niệm')).toBeInTheDocument();
  });

  it('deletes an annotation when clicking trash icon in annotations panel', () => {
    render(
      <LiteratureReader
        lesson={mockLesson}
        onUpdateLesson={onUpdateLesson}
        setActiveModule={setActiveModule}
        onAddSlideFromQuote={onAddSlideFromQuote}
        onAddQuestionFromPassage={onAddQuestionFromPassage}
        onSetExamPassage={onSetExamPassage}
        isFocusMode={false}
      />
    );

    // Switch to annotations tab
    fireEvent.click(screen.getByRole('button', { name: /Chú thích/i }));

    // Find delete button with title "Xóa chú thích"
    const deleteBtn = screen.getByTitle('Xóa chú thích');
    fireEvent.click(deleteBtn);

    expect(onUpdateLesson).toHaveBeenCalledWith({
      annotations: []
    });
  });

  it('switches right panel analysis tabs (Thi pháp, Dẫn chứng)', () => {
    render(
      <LiteratureReader
        lesson={mockLesson}
        onUpdateLesson={onUpdateLesson}
        setActiveModule={setActiveModule}
        onAddSlideFromQuote={onAddSlideFromQuote}
        onAddQuestionFromPassage={onAddQuestionFromPassage}
        onSetExamPassage={onSetExamPassage}
        isFocusMode={false}
      />
    );

    // Default right panel: Thi pháp
    expect(screen.getByText(/Chủ đề & Cảm hứng/i)).toBeInTheDocument();

    // Click Dẫn chứng tab in right panel
    const evidenceTab = screen.getByRole('button', { name: 'Dẫn chứng' });
    fireEvent.click(evidenceTab);

    expect(screen.getByText(/Dẫn chứng then chốt phục vụ giảng dạy/i)).toBeInTheDocument();
  });

  it('triggers focus mode toggle when clicking exit focus button', () => {
    render(
      <LiteratureReader
        lesson={mockLesson}
        onUpdateLesson={onUpdateLesson}
        setActiveModule={setActiveModule}
        onAddSlideFromQuote={onAddSlideFromQuote}
        onAddQuestionFromPassage={onAddQuestionFromPassage}
        onSetExamPassage={onSetExamPassage}
        isFocusMode={true}
        onToggleFocusMode={onToggleFocusMode}
      />
    );

    const focusExitBtn = screen.getByTitle('Thoát chế độ tập trung');
    fireEvent.click(focusExitBtn);

    expect(onToggleFocusMode).toHaveBeenCalledTimes(1);
  });
});
