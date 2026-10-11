import { useState, useEffect, useCallback, useRef } from 'react';
import { ActiveModule } from '../types';
import { TourStep, TourPreferences, TourState } from '../types/tour';
import { FULL_TOUR_STEPS } from '../config/tourSteps';
import {
  loadTourPreferences,
  saveTourPreferences,
  waitForTourTarget,
  scrollTargetIntoView,
  getPrefersReducedMotion,
} from '../utils/tourUtils';

interface UseGuidedTourProps {
  currentModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;
  steps?: TourStep[];
}

export function useGuidedTour({
  currentModule,
  setActiveModule,
  steps = FULL_TOUR_STEPS,
}: UseGuidedTourProps) {
  const [tourPrefs, setTourPrefs] = useState<TourPreferences>(loadTourPreferences);
  const [state, setState] = useState<TourState>({
    isActive: false,
    currentStepIndex: 0,
    mode: 'full',
    isConfirmingStop: false,
    isCompleted: false,
    isTargetMissing: false,
    isWaitingTarget: false,
  });

  const [showIntroModal, setShowIntroModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState('');

  const currentStep = steps[state.currentStepIndex] || steps[0];
  const totalSteps = steps.length;
  const isNavigatingRef = useRef(false);

  // Check first-time intro on initial load
  useEffect(() => {
    const prefs = loadTourPreferences();
    setTourPrefs(prefs);
    if (!prefs.hasSeenIntro && !prefs.dismissedIntro) {
      // Show gentle intro prompt after a brief settle delay (800ms)
      const timer = setTimeout(() => {
        setShowIntroModal(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Update target element when step or module changes
  useEffect(() => {
    if (!state.isActive || state.isCompleted) {
      setTargetElement(null);
      return;
    }

    let isMounted = true;
    const step = steps[state.currentStepIndex];
    if (!step) return;

    // Center step doesn't need DOM lookup
    if (!step.target || step.target === 'center') {
      setTargetElement(null);
      setState(prev => ({
        ...prev,
        isWaitingTarget: false,
        isTargetMissing: false,
      }));
      setScreenReaderAnnouncement(`Bước ${state.currentStepIndex + 1} trên ${totalSteps}. ${step.title}. ${step.description}`);
      return;
    }

    setState(prev => ({
      ...prev,
      isWaitingTarget: true,
      isTargetMissing: false,
    }));

    const resolveTarget = async () => {
      // Wait for element up to 2500ms
      const el = await waitForTourTarget(step.target!, 2500);
      if (!isMounted) return;

      if (el) {
        setTargetElement(el);
        const reduced = getPrefersReducedMotion();
        scrollTargetIntoView(el, reduced);
        setState(prev => ({
          ...prev,
          isWaitingTarget: false,
          isTargetMissing: false,
        }));
        setScreenReaderAnnouncement(`Bước ${state.currentStepIndex + 1} trên ${totalSteps}. ${step.title}. ${step.description}`);
      } else {
        setTargetElement(null);
        setState(prev => ({
          ...prev,
          isWaitingTarget: false,
          isTargetMissing: true,
        }));
      }
    };

    resolveTarget();

    return () => {
      isMounted = false;
    };
  }, [state.isActive, state.currentStepIndex, steps, totalSteps]);

  // Navigate to step helper with cross-module support
  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= steps.length) return;
    const targetStep = steps[stepIndex];
    if (!targetStep) return;

    // Save step progress in preferences
    saveTourPreferences({ lastStepIndex: stepIndex });

    // Execute afterLeave of previous step if exists
    const prevStep = steps[state.currentStepIndex];
    if (prevStep && prevStep.afterLeave) {
      try {
        prevStep.afterLeave();
      } catch (err) {
        console.warn('Lỗi sau khi rời bước tour:', err);
      }
    }

    // Execute beforeEnter of target step if exists
    if (targetStep.beforeEnter) {
      try {
        targetStep.beforeEnter();
      } catch (err) {
        console.warn('Lỗi trước khi vào bước tour:', err);
      }
    }

    // Check if target step requires route / module change
    if (targetStep.module && targetStep.module !== currentModule) {
      setActiveModule(targetStep.module);
    }

    setState(prev => ({
      ...prev,
      currentStepIndex: stepIndex,
      isTargetMissing: false,
      isWaitingTarget: targetStep.target !== 'center',
    }));
  }, [steps, state.currentStepIndex, currentModule, setActiveModule]);

  // Controls
  const nextStep = useCallback(() => {
    if (state.currentStepIndex < steps.length - 1) {
      goToStep(state.currentStepIndex + 1);
    } else {
      // Reached final step
      completeTour();
    }
  }, [state.currentStepIndex, steps.length, goToStep]);

  const previousStep = useCallback(() => {
    if (state.currentStepIndex > 0) {
      goToStep(state.currentStepIndex - 1);
    }
  }, [state.currentStepIndex, goToStep]);

  const skipStep = useCallback(() => {
    // Skip only current step, move to next
    if (state.currentStepIndex < steps.length - 1) {
      goToStep(state.currentStepIndex + 1);
    } else {
      completeTour();
    }
  }, [state.currentStepIndex, steps.length, goToStep]);

  const startTour = useCallback((startIndex: number = 0) => {
    setShowIntroModal(false);
    setShowResumeModal(false);
    saveTourPreferences({
      hasSeenIntro: true,
      lastStepIndex: startIndex,
    });
    setTourPrefs(loadTourPreferences());

    const targetStep = steps[startIndex] || steps[0];
    if (targetStep.module && targetStep.module !== currentModule) {
      setActiveModule(targetStep.module);
    }

    setState({
      isActive: true,
      currentStepIndex: startIndex,
      mode: 'full',
      isConfirmingStop: false,
      isCompleted: false,
      isTargetMissing: false,
      isWaitingTarget: targetStep.target !== 'center',
    });
  }, [steps, currentModule, setActiveModule]);

  const stopTour = useCallback(() => {
    setState(prev => ({ ...prev, isConfirmingStop: true }));
  }, []);

  const confirmStopTour = useCallback(() => {
    saveTourPreferences({
      lastStepIndex: state.currentStepIndex,
    });
    setState(prev => ({
      ...prev,
      isActive: false,
      isConfirmingStop: false,
    }));
    setTargetElement(null);
  }, [state.currentStepIndex]);

  const cancelStopTour = useCallback(() => {
    setState(prev => ({ ...prev, isConfirmingStop: false }));
  }, []);

  const completeTour = useCallback(() => {
    saveTourPreferences({
      completedFullTour: true,
      completedAt: new Date().toISOString(),
      lastStepIndex: steps.length - 1,
    });
    setTourPrefs(loadTourPreferences());
    setState(prev => ({
      ...prev,
      isCompleted: true,
      isActive: false,
    }));
    setTargetElement(null);
  }, [steps.length]);

  const finishTour = useCallback(() => {
    setState(prev => ({
      ...prev,
      isCompleted: false,
    }));
  }, []);

  const restartTour = useCallback(() => {
    startTour(0);
  }, [startTour]);

  const resumeTour = useCallback(() => {
    const prefs = loadTourPreferences();
    const lastStep = prefs.lastStepIndex || 0;
    startTour(lastStep);
  }, [startTour]);

  // Handle entry point click (e.g. Help button on TopBar)
  const openTourFromUserAction = useCallback(() => {
    const prefs = loadTourPreferences();
    if (
      prefs.lastStepIndex !== undefined &&
      prefs.lastStepIndex > 0 &&
      prefs.lastStepIndex < steps.length - 1
    ) {
      setShowResumeModal(true);
    } else {
      startTour(0);
    }
  }, [steps.length, startTour]);

  const dismissIntroModal = useCallback(() => {
    setShowIntroModal(false);
    saveTourPreferences({
      hasSeenIntro: true,
      dismissedIntro: true,
    });
    setTourPrefs(loadTourPreferences());
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!state.isActive || state.isConfirmingStop) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in input, textarea or contenteditable
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousStep();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        stopTour();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isActive, state.isConfirmingStop, nextStep, previousStep, stopTour]);

  return {
    state,
    currentStep,
    totalSteps,
    targetElement,
    tourPrefs,
    showIntroModal,
    showResumeModal,
    screenReaderAnnouncement,
    // Actions
    startTour,
    stopTour,
    confirmStopTour,
    cancelStopTour,
    nextStep,
    previousStep,
    skipStep,
    restartTour,
    resumeTour,
    completeTour,
    finishTour,
    openTourFromUserAction,
    dismissIntroModal,
    setShowResumeModal,
  };
}
