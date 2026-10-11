import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { KhbdView } from '../../components/KhbdView';
import { createKhbdFixture } from '../fixtures';
import { LessonPlan5512 } from '../../types';

describe('Functional: KHBD 5512 Builder & Document Viewer', () => {
  let mockKhbd: LessonPlan5512;
  let setKhbd: any;
  let setActiveModule: any;
  let onAddSlideFromActivity: any;

  beforeEach(() => {
    mockKhbd = createKhbdFixture();
    setKhbd = vi.fn();
    setActiveModule = vi.fn();
    onAddSlideFromActivity = vi.fn();
  });

  describe('View Mode Switching & Administrative Headers', () => {
    it('renders administrative info and objectives in visual builder mode', () => {
      render(
        <KhbdView
          khbd={mockKhbd}
          setKhbd={setKhbd}
          setActiveModule={setActiveModule}
          onAddSlideFromActivity={onAddSlideFromActivity}
        />
      );

      expect(screen.getByText(/Visual Lesson Builder \(Kế hoạch bài dạy 5512\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Công văn 5512\/BGDĐT-GDTrH/i)).toBeInTheDocument();
      expect(screen.getByText(/Mục tiêu Dạy học & Năng lực cần đạt/i)).toBeInTheDocument();
    });

    it('switches between Visual Builder and Document View', () => {
      render(
        <KhbdView
          khbd={mockKhbd}
          setKhbd={setKhbd}
          setActiveModule={setActiveModule}
          onAddSlideFromActivity={onAddSlideFromActivity}
        />
      );

      // Default: Visual Builder
      expect(screen.getByRole('button', { name: /Visual Builder/i })).toBeInTheDocument();

      // Click Văn bản in A4 (Document View)
      const docViewBtn = screen.getByRole('button', { name: /Văn bản in A4/i });
      fireEvent.click(docViewBtn);

      // In Document View, administrative headers should be displayed in formal text document layout
      expect(screen.getAllByText(/KẾ HOẠCH BÀI DẠY/i)[0]).toBeInTheDocument();
      expect(screen.getByText(mockKhbd.info.school)).toBeInTheDocument();
      expect(screen.getAllByText(mockKhbd.info.teacherName).length).toBeGreaterThan(0);
    });
  });

  describe('Teaching Activities & 4-Step Organization Management', () => {
    it('renders all teaching activities with standard badges', () => {
      render(
        <KhbdView
          khbd={mockKhbd}
          setKhbd={setKhbd}
          setActiveModule={setActiveModule}
          onAddSlideFromActivity={onAddSlideFromActivity}
        />
      );

      mockKhbd.activities.forEach(act => {
        expect(screen.getByText(act.name)).toBeInTheDocument();
      });
    });

    it('adds a new teaching activity when clicking "Thêm hoạt động"', () => {
      render(
        <KhbdView
          khbd={mockKhbd}
          setKhbd={setKhbd}
          setActiveModule={setActiveModule}
          onAddSlideFromActivity={onAddSlideFromActivity}
        />
      );

      const addBtn = screen.getByRole('button', { name: /Thêm hoạt động/i });
      fireEvent.click(addBtn);

      expect(setKhbd).toHaveBeenCalledTimes(1);
      const updatedPlan: LessonPlan5512 = setKhbd.mock.calls[0][0];
      expect(updatedPlan.activities.length).toBe(mockKhbd.activities.length + 1);

      const newAct = updatedPlan.activities[updatedPlan.activities.length - 1];
      expect(newAct.steps.step1).toBeTruthy();
      expect(newAct.steps.step2).toBeTruthy();
      expect(newAct.steps.step3).toBeTruthy();
      expect(newAct.steps.step4).toBeTruthy();
    });

    it('prevents deleting the last remaining activity', () => {
      const singleActKhbd: LessonPlan5512 = {
        ...mockKhbd,
        activities: [mockKhbd.activities[0]]
      };

      render(
        <KhbdView
          khbd={singleActKhbd}
          setKhbd={setKhbd}
          setActiveModule={setActiveModule}
          onAddSlideFromActivity={onAddSlideFromActivity}
        />
      );

      const deleteBtn = screen.queryByTitle('Xóa hoạt động');
      // When only 1 activity exists, delete button is hidden
      expect(deleteBtn).not.toBeInTheDocument();
      expect(setKhbd).not.toHaveBeenCalled();
    });

    it('triggers slide generation from activity when clicking "Thành Slide"', () => {
      render(
        <KhbdView
          khbd={mockKhbd}
          setKhbd={setKhbd}
          setActiveModule={setActiveModule}
          onAddSlideFromActivity={onAddSlideFromActivity}
        />
      );

      const slideFromActBtn = screen.getAllByTitle('Tạo Slide cho hoạt động này')[0];
      expect(slideFromActBtn).toBeInTheDocument();
      fireEvent.click(slideFromActBtn);

      expect(onAddSlideFromActivity).toHaveBeenCalledTimes(1);
      expect(setActiveModule).toHaveBeenCalledWith('slides');
    });
  });
});
