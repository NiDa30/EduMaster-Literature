import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { TeacherDashboard } from '../../components/TeacherDashboard';
import { createLessonFixture, createKhbdFixture } from '../fixtures';
import { LiteratureLesson } from '../../types';

describe('Functional: TeacherDashboard & Lesson Lifecycle', () => {
  const baseLesson1 = createLessonFixture({
    id: 'lesson-tay-tien',
    title: 'Tây Tiến',
    author: 'Quang Dũng',
    grade: 'Lớp 12',
    genre: 'poetry',
    progress: 85
  });

  const baseLesson2 = createLessonFixture({
    id: 'lesson-vo-nhat',
    title: 'Vợ nhặt',
    author: 'Kim Lân',
    grade: 'Lớp 12',
    genre: 'story',
    progress: 60
  });

  const baseLesson3 = createLessonFixture({
    id: 'lesson-tuyen-ngon',
    title: 'Tuyên ngôn Độc lập',
    author: 'Hồ Chí Minh',
    grade: 'Lớp 12',
    genre: 'argumentative',
    progress: 40
  });

  const mockLessons: LiteratureLesson[] = [baseLesson1, baseLesson2, baseLesson3];
  const mockKhbd = createKhbdFixture();

  let onSelectLesson: any;
  let setActiveModule: any;
  let onCreateLesson: any;

  beforeEach(() => {
    onSelectLesson = vi.fn();
    setActiveModule = vi.fn();
    onCreateLesson = vi.fn();
  });

  describe('Dashboard Overview & Resume Card', () => {
    it('renders current lesson title, author, and progress metrics correctly', () => {
      render(
        <TeacherDashboard
          lessons={mockLessons}
          currentLessonId="lesson-tay-tien"
          onSelectLesson={onSelectLesson}
          setActiveModule={setActiveModule}
          khbd={mockKhbd}
          onCreateLesson={onCreateLesson}
        />
      );

      // Verify current lesson presentation in resume card
      expect(screen.getAllByText('Tây Tiến')[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Quang Dũng/)[0]).toBeInTheDocument();
      expect(screen.getByText(/85% hoàn thiện/i)).toBeInTheDocument();
    });

    it('navigates to literature workspace when clicking "Mở không gian soạn"', () => {
      render(
        <TeacherDashboard
          lessons={mockLessons}
          currentLessonId="lesson-tay-tien"
          onSelectLesson={onSelectLesson}
          setActiveModule={setActiveModule}
          khbd={mockKhbd}
          onCreateLesson={onCreateLesson}
        />
      );

      const continueBtn = screen.getByRole('button', { name: /Mở không gian soạn/i });
      fireEvent.click(continueBtn);

      expect(setActiveModule).toHaveBeenCalledWith('workspace');
    });

    it('navigates to respective subsystems when clicking quick action cards', () => {
      render(
        <TeacherDashboard
          lessons={mockLessons}
          currentLessonId="lesson-tay-tien"
          onSelectLesson={onSelectLesson}
          setActiveModule={setActiveModule}
          khbd={mockKhbd}
          onCreateLesson={onCreateLesson}
        />
      );

      // Quick action cards
      const khbdAction = screen.getByText('Soạn KHBD 5512').closest('button');
      if (khbdAction) {
        fireEvent.click(khbdAction);
        expect(setActiveModule).toHaveBeenCalledWith('khbd');
      }

      const workspaceAction = screen.getByText('Đọc & Soạn văn').closest('button');
      if (workspaceAction) {
        fireEvent.click(workspaceAction);
        expect(setActiveModule).toHaveBeenCalledWith('workspace');
      }

      const examAction = screen.getByText('Đề kiểm tra 7991').closest('button');
      if (examAction) {
        fireEvent.click(examAction);
        expect(setActiveModule).toHaveBeenCalledWith('exam');
      }
    });
  });

  describe('Recent Lessons Table Filtering & Switching', () => {
    it('filters lessons by text search query', () => {
      render(
        <TeacherDashboard
          lessons={mockLessons}
          currentLessonId="lesson-tay-tien"
          onSelectLesson={onSelectLesson}
          setActiveModule={setActiveModule}
          khbd={mockKhbd}
          onCreateLesson={onCreateLesson}
        />
      );

      const searchInput = screen.getByPlaceholderText(/Tìm tác phẩm, tác giả.../i);
      fireEvent.change(searchInput, { target: { value: 'Kim Lân' } });

      expect(screen.getByText('Vợ nhặt')).toBeInTheDocument();
      expect(screen.queryByText('Tuyên ngôn Độc lập')).not.toBeInTheDocument();
    });

    it('filters lessons by genre dropdown filter', () => {
      render(
        <TeacherDashboard
          lessons={mockLessons}
          currentLessonId="lesson-tay-tien"
          onSelectLesson={onSelectLesson}
          setActiveModule={setActiveModule}
          khbd={mockKhbd}
          onCreateLesson={onCreateLesson}
        />
      );

      const genreSelect = screen.getByRole('combobox');
      fireEvent.change(genreSelect, { target: { value: 'poetry' } });

      expect(screen.getAllByText('Tây Tiến').length).toBeGreaterThan(0);
      expect(screen.queryByText('Vợ nhặt')).not.toBeInTheDocument();
      expect(screen.queryByText('Tuyên ngôn Độc lập')).not.toBeInTheDocument();
    });

    it('triggers onSelectLesson and navigates when clicking a lesson in recent list', () => {
      render(
        <TeacherDashboard
          lessons={mockLessons}
          currentLessonId="lesson-tay-tien"
          onSelectLesson={onSelectLesson}
          setActiveModule={setActiveModule}
          khbd={mockKhbd}
          onCreateLesson={onCreateLesson}
        />
      );

      const voNhatItem = screen.getByText('Vợ nhặt');
      expect(voNhatItem).toBeInTheDocument();

      fireEvent.click(voNhatItem);

      expect(onSelectLesson).toHaveBeenCalledWith('lesson-vo-nhat');
      expect(setActiveModule).toHaveBeenCalledWith('workspace');
    });
  });

  describe('Create Lesson Modal & Validation Flow', () => {
    it('opens create lesson modal on clicking "Tạo bài dạy"', () => {
      render(
        <TeacherDashboard
          lessons={mockLessons}
          currentLessonId="lesson-tay-tien"
          onSelectLesson={onSelectLesson}
          setActiveModule={setActiveModule}
          khbd={mockKhbd}
          onCreateLesson={onCreateLesson}
        />
      );

      const createBtn = screen.getAllByRole('button', { name: /Tạo bài dạy/i })[0];
      fireEvent.click(createBtn);

      expect(screen.getByText('Thiết lập Bài dạy Ngữ văn mới')).toBeInTheDocument();
    });

    it('shows validation errors when required fields are empty', () => {
      render(
        <TeacherDashboard
          lessons={mockLessons}
          currentLessonId="lesson-tay-tien"
          onSelectLesson={onSelectLesson}
          setActiveModule={setActiveModule}
          khbd={mockKhbd}
          onCreateLesson={onCreateLesson}
        />
      );

      // Open modal
      fireEvent.click(screen.getAllByRole('button', { name: /Tạo bài dạy/i })[0]);

      // Submit without entering data
      const submitBtn = screen.getByRole('button', { name: /Khởi tạo và Soạn bài ngay/i });
      fireEvent.click(submitBtn);

      // Validation messages
      expect(screen.getByText('Vui lòng nhập tên tác phẩm / bài học.')).toBeInTheDocument();
      expect(screen.getByText('Vui lòng nhập tên tác giả.')).toBeInTheDocument();
      expect(screen.getByText('Vui lòng nhập Yêu cầu cần đạt (YCCĐ).')).toBeInTheDocument();
      expect(screen.getByText('Vui lòng nhập ngữ liệu trích đoạn tác phẩm.')).toBeInTheDocument();

      expect(onCreateLesson).not.toHaveBeenCalled();
    });

    it('submits successfully when form is filled with valid data and initializes bundle', () => {
      render(
        <TeacherDashboard
          lessons={mockLessons}
          currentLessonId="lesson-tay-tien"
          onSelectLesson={onSelectLesson}
          setActiveModule={setActiveModule}
          khbd={mockKhbd}
          onCreateLesson={onCreateLesson}
        />
      );

      // Open modal
      fireEvent.click(screen.getAllByRole('button', { name: /Tạo bài dạy/i })[0]);

      // Fill in required fields
      const titleInput = screen.getByPlaceholderText(/VD: Tây Tiến, Vợ nhặt, Tuyên ngôn Độc lập.../i);
      fireEvent.change(titleInput, { target: { value: 'Sóng' } });

      const authorInput = screen.getByPlaceholderText(/VD: Quang Dũng, Kim Lân.../i);
      fireEvent.change(authorInput, { target: { value: 'Xuân Quỳnh' } });

      const objectivesInput = screen.getByPlaceholderText(/Học sinh nhận biết và phân tích được đặc trưng thể loại/i);
      fireEvent.change(objectivesInput, { target: { value: 'Cảm nhận khát vọng tình yêu muôn thuở của người phụ nữ.' } });

      const sourceTextInput = screen.getByPlaceholderText(/Dán toàn văn bài thơ hoặc đoạn trích/i);
      fireEvent.change(sourceTextInput, {
        target: {
          value: 'Dữ dội và dịu êm\nỒn ào và lặng lẽ\nSông không hiểu nổi mình\nSóng tìm ra tận bể.'
        }
      });

      // Submit
      const submitBtn = screen.getByRole('button', { name: /Khởi tạo và Soạn bài ngay/i });
      fireEvent.click(submitBtn);

      // Verify onCreateLesson called with complete bundle
      expect(onCreateLesson).toHaveBeenCalledTimes(1);
      const createdLesson: LiteratureLesson = onCreateLesson.mock.calls[0][0];

      expect(createdLesson.title).toBe('Sóng');
      expect(createdLesson.author).toBe('Xuân Quỳnh');
      expect(createdLesson.khbd).toBeDefined();
      expect(createdLesson.khbd?.activities).toHaveLength(4);
      expect(createdLesson.slides).toBeDefined();
      expect(createdLesson.slides?.length).toBeGreaterThan(0);
      expect(createdLesson.exam).toBeDefined();
      expect(createdLesson.rubric).toBeDefined();
    });

    it('closes modal when clicking close (Hủy bỏ) button without saving', () => {
      render(
        <TeacherDashboard
          lessons={mockLessons}
          currentLessonId="lesson-tay-tien"
          onSelectLesson={onSelectLesson}
          setActiveModule={setActiveModule}
          khbd={mockKhbd}
          onCreateLesson={onCreateLesson}
        />
      );

      // Open modal
      fireEvent.click(screen.getAllByRole('button', { name: /Tạo bài dạy/i })[0]);
      expect(screen.getByText('Thiết lập Bài dạy Ngữ văn mới')).toBeInTheDocument();

      // Click cancel button
      const cancelBtn = screen.getByRole('button', { name: /Hủy bỏ/i });
      fireEvent.click(cancelBtn);

      expect(screen.queryByText('Thiết lập Bài dạy Ngữ văn mới')).not.toBeInTheDocument();
      expect(onCreateLesson).not.toHaveBeenCalled();
    });
  });
});
