import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { STORAGE_KEY } from '../App';
import { createAppStateFixture } from './fixtures';
import { AppState } from '../types';

describe('Autosave & Storage Engine', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // Simulated debounce autosave engine matching App.tsx implementation:
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     try {
  //       localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  //     } catch (err) {
  //       console.error('Lỗi khi tự động lưu dữ liệu vào localStorage:', err);
  //     }
  //   }, 300);
  //   return () => clearTimeout(timer);
  // }, [appState]);
  function createAutosaveManager(delay = 300) {
    let timer: any = null;

    return {
      triggerSave: (state: AppState) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          } catch (err) {
            console.error('Lỗi khi tự động lưu dữ liệu vào localStorage:', err);
          }
        }, delay);
      },
      flush: () => {
        if (timer) clearTimeout(timer);
      }
    };
  }

  it('debounces rapid state changes and saves only once after 300ms', () => {
    vi.useFakeTimers();
    const setItemSpy = vi.spyOn(localStorage, 'setItem');
    const autosave = createAutosaveManager(300);
    const state = createAppStateFixture();

    // Rapid state mutations
    autosave.triggerSave({ ...state, currentLessonId: 'lesson-1' });
    vi.advanceTimersByTime(100);
    autosave.triggerSave({ ...state, currentLessonId: 'lesson-2' });
    vi.advanceTimersByTime(100);
    autosave.triggerSave({ ...state, currentLessonId: 'lesson-3' });

    // After 200ms total, setItem should not have been called yet
    expect(setItemSpy).not.toHaveBeenCalled();

    // Advance 300ms from the last call
    vi.advanceTimersByTime(300);

    // Only 1 save should occur with the latest state
    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(setItemSpy).toHaveBeenCalledWith(
      STORAGE_KEY,
      expect.stringContaining('"currentLessonId":"lesson-3"')
    );

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    expect(saved.currentLessonId).toBe('lesson-3');
  });

  it('handles quota exceeded or storage error gracefully without crashing', () => {
    vi.useFakeTimers();
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const autosave = createAutosaveManager(300);
    const state = createAppStateFixture();

    // Mock setItem to throw QuotaExceededError
    vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => {
      throw new Error('QuotaExceededError: DOM Exception 22');
    });

    expect(() => {
      autosave.triggerSave(state);
      vi.advanceTimersByTime(300);
    }).not.toThrow();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Lỗi khi tự động lưu'),
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it('preserves serialized JSON structure across save and reload', () => {
    const state = createAppStateFixture();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    const retrievedRaw = localStorage.getItem(STORAGE_KEY);
    expect(retrievedRaw).toBeTruthy();

    const parsed: AppState = JSON.parse(retrievedRaw!);
    expect(parsed.version).toBe(state.version);
    expect(parsed.lessons).toHaveLength(state.lessons.length);
    expect(parsed.khbd.activities).toHaveLength(state.khbd.activities.length);
    expect(parsed.exam.partI).toHaveLength(state.exam.partI.length);
    expect(parsed.exam.partII).toHaveLength(state.exam.partII.length);
    expect(parsed.rubric.criteria).toHaveLength(state.rubric.criteria.length);
  });
});
