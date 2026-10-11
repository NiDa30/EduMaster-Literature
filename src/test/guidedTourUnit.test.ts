import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGuidedTour } from '../hooks/useGuidedTour';
import { FULL_TOUR_STEPS } from '../config/tourSteps';
import {
  calculatePopoverPosition,
  loadTourPreferences,
  saveTourPreferences,
  TOUR_STORAGE_KEY,
} from '../utils/tourUtils';
import { ActiveModule } from '../types';

describe('Guided Tour - Unit Tests & Position Engine', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('TOUR-PERSIST-001: Preference Storage Operations', () => {
    it('returns default preferences when localStorage is empty', () => {
      const prefs = loadTourPreferences();
      expect(prefs.hasSeenIntro).toBe(false);
      expect(prefs.completedFullTour).toBe(false);
      expect(prefs.lastStepIndex).toBe(0);
    });

    it('saves and reloads tour preferences accurately', () => {
      saveTourPreferences({
        hasSeenIntro: true,
        lastStepIndex: 5,
        completedFullTour: false,
      });

      const loaded = loadTourPreferences();
      expect(loaded.hasSeenIntro).toBe(true);
      expect(loaded.lastStepIndex).toBe(5);
      expect(loaded.lastSeenAt).toBeDefined();
    });

    it('handles corrupted localStorage JSON gracefully', () => {
      localStorage.setItem(TOUR_STORAGE_KEY, '{invalid_json}');
      const loaded = loadTourPreferences();
      expect(loaded.hasSeenIntro).toBe(false);
      expect(loaded.completedFullTour).toBe(false);
    });
  });

  describe('TOUR-POS-001: Popover Positioning Algorithm', () => {
    it('positions popover in center when target is null or center placement', () => {
      const pos = calculatePopoverPosition(
        null,
        { width: 360, height: 200 },
        'center'
      );
      expect(pos.effectivePlacement).toBe('center');
      expect(pos.x).toBeGreaterThan(0);
      expect(pos.y).toBeGreaterThan(0);
    });

    it('positions popover relative to target rect on bottom by default', () => {
      const fakeRect = {
        top: 100,
        bottom: 140,
        left: 200,
        right: 350,
        width: 150,
        height: 40,
        x: 200,
        y: 100,
        toJSON: () => {},
      } as DOMRect;

      const pos = calculatePopoverPosition(
        fakeRect,
        { width: 300, height: 180 },
        'bottom'
      );
      expect(pos.effectivePlacement).toBe('bottom');
      expect(pos.y).toBeGreaterThanOrEqual(140);
    });

    it('flips to opposite placement when preferred placement exceeds viewport', () => {
      // Target at bottom edge of screen (y = 750 in 800vh window)
      const fakeRect = {
        top: 720,
        bottom: 760,
        left: 200,
        right: 350,
        width: 150,
        height: 40,
        x: 200,
        y: 720,
        toJSON: () => {},
      } as DOMRect;

      const pos = calculatePopoverPosition(
        fakeRect,
        { width: 300, height: 150 },
        'bottom'
      );
      // Not enough room below (800 - 760 = 40px < 150px)
      expect(pos.effectivePlacement).toBe('top');
      expect(pos.y).toBeLessThan(720);
    });

    it('clamps coordinates inside standard desktop viewport (1366x768 and 1440x900)', () => {
      const farRightRect = {
        top: 100,
        bottom: 150,
        left: 1300,
        right: 1350,
        width: 50,
        height: 50,
        x: 1300,
        y: 100,
        toJSON: () => {},
      } as DOMRect;

      const pos = calculatePopoverPosition(
        farRightRect,
        { width: 360, height: 200 },
        'right'
      );
      // Cannot overflow right window bound
      expect(pos.x + 360).toBeLessThanOrEqual(window.innerWidth);
      expect(pos.x).toBeGreaterThanOrEqual(16);
    });
  });

  describe('TOUR-FUNC-001: useGuidedTour State Machine', () => {
    it('initializes in inactive state with first step', () => {
      const setActiveModule = vi.fn();
      const { result } = renderHook(() =>
        useGuidedTour({
          currentModule: 'dashboard',
          setActiveModule,
        })
      );

      expect(result.current.state.isActive).toBe(false);
      expect(result.current.state.currentStepIndex).toBe(0);
      expect(result.current.totalSteps).toBe(FULL_TOUR_STEPS.length);
    });

    it('starts tour at specified step index', () => {
      const setActiveModule = vi.fn();
      const { result } = renderHook(() =>
        useGuidedTour({
          currentModule: 'dashboard',
          setActiveModule,
        })
      );

      act(() => {
        result.current.startTour(2);
      });

      expect(result.current.state.isActive).toBe(true);
      expect(result.current.state.currentStepIndex).toBe(2);
      expect(result.current.currentStep.id).toBe(FULL_TOUR_STEPS[2].id);
    });

    it('navigates nextStep, previousStep and clamps bounds', () => {
      const setActiveModule = vi.fn();
      const { result } = renderHook(() =>
        useGuidedTour({
          currentModule: 'dashboard',
          setActiveModule,
        })
      );

      act(() => {
        result.current.startTour(0);
      });

      // Previous on step 0 does not go below 0
      act(() => {
        result.current.previousStep();
      });
      expect(result.current.state.currentStepIndex).toBe(0);

      // Next advances step
      act(() => {
        result.current.nextStep();
      });
      expect(result.current.state.currentStepIndex).toBe(1);

      // Back returns to step 0
      act(() => {
        result.current.previousStep();
      });
      expect(result.current.state.currentStepIndex).toBe(0);
    });

    it('skipStep skips current step without terminating the tour', () => {
      const setActiveModule = vi.fn();
      const { result } = renderHook(() =>
        useGuidedTour({
          currentModule: 'dashboard',
          setActiveModule,
        })
      );

      act(() => {
        result.current.startTour(1);
      });

      act(() => {
        result.current.skipStep();
      });

      expect(result.current.state.isActive).toBe(true);
      expect(result.current.state.currentStepIndex).toBe(2);
    });

    it('stopTour opens confirmation modal, confirmStopTour deactivates tour and remembers progress', () => {
      const setActiveModule = vi.fn();
      const { result } = renderHook(() =>
        useGuidedTour({
          currentModule: 'dashboard',
          setActiveModule,
        })
      );

      act(() => {
        result.current.startTour(4);
      });

      act(() => {
        result.current.stopTour();
      });

      expect(result.current.state.isConfirmingStop).toBe(true);

      act(() => {
        result.current.confirmStopTour();
      });

      expect(result.current.state.isActive).toBe(false);
      expect(result.current.state.isConfirmingStop).toBe(false);

      const prefs = loadTourPreferences();
      expect(prefs.lastStepIndex).toBe(4);
    });

    it('completeTour marks tour completed and saves completion timestamp', () => {
      const setActiveModule = vi.fn();
      const { result } = renderHook(() =>
        useGuidedTour({
          currentModule: 'dashboard',
          setActiveModule,
        })
      );

      act(() => {
        result.current.startTour(FULL_TOUR_STEPS.length - 1);
      });

      act(() => {
        result.current.nextStep(); // Reaching beyond last step completes
      });

      expect(result.current.state.isActive).toBe(false);
      expect(result.current.state.isCompleted).toBe(true);

      const prefs = loadTourPreferences();
      expect(prefs.completedFullTour).toBe(true);
      expect(prefs.completedAt).toBeDefined();
    });
  });
});
