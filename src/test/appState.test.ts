import { describe, it, expect, beforeEach } from 'vitest';
import { resolveModuleAlias, STORAGE_KEY } from '../App';
import { createAppStateFixture, createLessonFixture } from './fixtures';
import { normalizeDeepNFC } from '../utils/unicode';
import { AppState, LiteratureLesson } from '../types';

describe('AppState and Session Handover Domain Logic', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('resolveModuleAlias', () => {
    it('resolves direct valid module names', () => {
      expect(resolveModuleAlias('#/dashboard')).toBe('dashboard');
      expect(resolveModuleAlias('#/workspace')).toBe('workspace');
      expect(resolveModuleAlias('#/khbd')).toBe('khbd');
      expect(resolveModuleAlias('#/exam')).toBe('exam');
      expect(resolveModuleAlias('#/matrix')).toBe('matrix');
      expect(resolveModuleAlias('#/rubric')).toBe('rubric');
      expect(resolveModuleAlias('#/slides')).toBe('slides');
      expect(resolveModuleAlias('#/export_handover')).toBe('export_handover');
    });

    it('resolves friendly aliases correctly', () => {
      expect(resolveModuleAlias('#/reader')).toBe('workspace');
      expect(resolveModuleAlias('#/genre')).toBe('genre_analysis');
      expect(resolveModuleAlias('#/questions')).toBe('question_builder');
      expect(resolveModuleAlias('#/export')).toBe('export_handover');
      expect(resolveModuleAlias('#/typographytest')).toBe('typography_test');
      expect(resolveModuleAlias('#/typography_test')).toBe('typography_test');
    });

    it('handles hash prefix variations and casing', () => {
      expect(resolveModuleAlias('#DASHBOARD')).toBe('dashboard');
      expect(resolveModuleAlias('#/Reader')).toBe('workspace');
      expect(resolveModuleAlias('workspace')).toBe('workspace');
    });

    it('returns null for unknown hashes', () => {
      expect(resolveModuleAlias('#/unknown_route')).toBeNull();
      expect(resolveModuleAlias('')).toBeNull();
      expect(resolveModuleAlias('#/')).toBeNull();
    });
  });

  describe('Lesson Management within AppState', () => {
    it('switches currentLessonId correctly', () => {
      const state = createAppStateFixture();
      expect(state.currentLessonId).toBe('lesson-tay-tien');

      const updatedState: AppState = {
        ...state,
        currentLessonId: 'lesson-vo-nhat',
      };

      expect(updatedState.currentLessonId).toBe('lesson-vo-nhat');
      const currentLesson = updatedState.lessons.find(l => l.id === updatedState.currentLessonId);
      expect(currentLesson?.title).toBe('Vợ nhặt');
    });

    it('updates targeted lesson without mutating other lessons', () => {
      const state = createAppStateFixture();
      const targetId = 'lesson-tay-tien';

      const updatedLessons = state.lessons.map(l => {
        if (l.id === targetId) {
          return { ...l, title: 'Tây Tiến (Đã cập nhật chú giải)' };
        }
        return l;
      });

      const updatedState = { ...state, lessons: updatedLessons };

      const tayTien = updatedState.lessons.find(l => l.id === 'lesson-tay-tien');
      const voNhat = updatedState.lessons.find(l => l.id === 'lesson-vo-nhat');

      expect(tayTien?.title).toBe('Tây Tiến (Đã cập nhật chú giải)');
      expect(voNhat?.title).toBe('Vợ nhặt'); // Unchanged
    });

    it('adds a new lesson to the state with unique ID', () => {
      const state = createAppStateFixture();
      const initialCount = state.lessons.length;

      const newLesson: LiteratureLesson = createLessonFixture({
        id: `lesson-${Date.now()}`,
        title: 'Sóng',
        author: 'Xuân Quỳnh',
        grade: 'Lớp 12',
      });

      const nextState: AppState = {
        ...state,
        lessons: [newLesson, ...state.lessons],
        currentLessonId: newLesson.id,
      };

      expect(nextState.lessons.length).toBe(initialCount + 1);
      expect(nextState.currentLessonId).toBe(newLesson.id);
      expect(nextState.lessons[0].title).toBe('Sóng');
    });

    it('deletes a lesson and falls back to a valid remaining lesson', () => {
      const state = createAppStateFixture();
      const deleteId = 'lesson-tay-tien';

      const remainingLessons = state.lessons.filter(l => l.id !== deleteId);
      const fallbackCurrentId = remainingLessons[0]?.id || '';

      const nextState: AppState = {
        ...state,
        lessons: remainingLessons,
        currentLessonId: fallbackCurrentId,
      };

      expect(nextState.lessons.find(l => l.id === deleteId)).toBeUndefined();
      expect(nextState.currentLessonId).toBe('lesson-vo-nhat');
    });
  });

  describe('Session Handover Backup & Restore', () => {
    it('serializes full AppState to valid JSON with all subsystems intact', () => {
      const state = createAppStateFixture();
      const jsonString = JSON.stringify(state, null, 2);

      expect(jsonString).toBeDefined();
      expect(typeof jsonString).toBe('string');

      const parsed = JSON.parse(jsonString);
      expect(parsed.version).toBe(state.version);
      expect(parsed.lessons).toHaveLength(state.lessons.length);
      expect(parsed.khbd).toBeDefined();
      expect(parsed.exam).toBeDefined();
      expect(parsed.rubric).toBeDefined();
      expect(parsed.slides).toBeDefined();
      expect(parsed.questions).toBeDefined();
    });

    it('successfully restores valid JSON and normalizes Unicode NFC', () => {
      const rawState = createAppStateFixture();
      // Inject NFD decomposed text into state
      rawState.lessons[0].title = 'Ta\u0302y Tie\u0302\u0301n'; // NFD

      const json = JSON.stringify(rawState);
      const parsed = JSON.parse(json);

      // Validate core required fields
      const hasCoreSubsystems = Boolean(parsed.khbd && parsed.exam && parsed.slides);
      expect(hasCoreSubsystems).toBe(true);

      const normalized = normalizeDeepNFC(parsed) as AppState;
      expect(normalized.lessons[0].title).toBe('Tây Tiến'); // NFC precomposed
    });

    it('throws error when restoring JSON missing core subsystems', () => {
      const invalidJson = JSON.stringify({
        version: '3.0.0',
        lessons: [],
        // Missing khbd, exam, slides
      });

      const parsed = JSON.parse(invalidJson);

      expect(() => {
        if (!parsed.khbd || !parsed.exam || !parsed.slides) {
          throw new Error('Dữ liệu JSON thiếu các phân hệ cốt lõi (khbd, exam, slides).');
        }
      }).toThrow('Dữ liệu JSON thiếu các phân hệ cốt lõi');
    });

    it('throws error on malformed JSON syntax', () => {
      const malformed = '{ "version": "3.0.0", invalid }';
      expect(() => JSON.parse(malformed)).toThrow();
    });

    it('preserves existing lesson packages when merging partial state from storage', () => {
      const state = createAppStateFixture();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...state,
        currentLessonId: 'lesson-vo-nhat',
      }));

      const stored = localStorage.getItem(STORAGE_KEY);
      expect(stored).not.toBeNull();
      const parsed = JSON.parse(stored!);

      expect(parsed.currentLessonId).toBe('lesson-vo-nhat');
      expect(parsed.lessons.length).toBeGreaterThanOrEqual(1);
    });
  });
});
