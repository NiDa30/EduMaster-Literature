import React from 'react';
import { ActiveModule } from '../../types';
import { TourStep } from '../../types/tour';
import { FULL_TOUR_STEPS } from '../../config/tourSteps';
import { useGuidedTour } from '../../hooks/useGuidedTour';
import { GuidedTourContext } from './GuidedTourContext';
import { TourOverlay } from './TourOverlay';
import { TourPopover } from './TourPopover';
import { TourIntroModal } from './TourIntroModal';
import { TourResumeModal } from './TourResumeModal';
import { TourStopConfirmModal } from './TourStopConfirmModal';
import { TourCompletionModal } from './TourCompletionModal';
import { TourMissingTarget } from './TourMissingTarget';

interface GuidedTourProviderProps {
  currentModule: ActiveModule;
  setActiveModule: (m: ActiveModule) => void;
  steps?: TourStep[];
  children: React.ReactNode;
}

export const GuidedTourProvider: React.FC<GuidedTourProviderProps> = ({
  currentModule,
  setActiveModule,
  steps = FULL_TOUR_STEPS,
  children,
}) => {
  const {
    state,
    currentStep,
    totalSteps,
    targetElement,
    tourPrefs,
    showIntroModal,
    showResumeModal,
    screenReaderAnnouncement,
    startTour,
    stopTour,
    confirmStopTour,
    cancelStopTour,
    nextStep,
    previousStep,
    skipStep,
    restartTour,
    resumeTour,
    finishTour,
    openTourFromUserAction,
    dismissIntroModal,
    setShowResumeModal,
  } = useGuidedTour({
    currentModule,
    setActiveModule,
    steps,
  });

  const contextValue = {
    openTour: openTourFromUserAction,
    restartTour,
    startTour,
    stopTour,
    isActive: state.isActive,
    currentStepIndex: state.currentStepIndex,
  };

  return (
    <GuidedTourContext.Provider value={contextValue}>
      {children}

      {/* Screen reader live announcement */}
      <div 
        className="sr-only" 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {screenReaderAnnouncement}
      </div>

      {/* 1. Onboarding Intro Modal */}
      <TourIntroModal
        isOpen={showIntroModal}
        onStart={() => startTour(0)}
        onDismiss={dismissIntroModal}
      />

      {/* 2. Resume Previous Tour Modal */}
      <TourResumeModal
        isOpen={showResumeModal}
        savedStepIndex={tourPrefs.lastStepIndex || 0}
        totalSteps={totalSteps}
        onResume={resumeTour}
        onRestart={restartTour}
        onClose={() => setShowResumeModal(false)}
      />

      {/* 3. Confirm Stop Tour Modal */}
      <TourStopConfirmModal
        isOpen={state.isConfirmingStop}
        onContinue={cancelStopTour}
        onConfirmStop={confirmStopTour}
      />

      {/* 4. Completion Celebration Modal */}
      <TourCompletionModal
        isOpen={state.isCompleted}
        onFinish={finishTour}
      />

      {/* 5. Active Tour Presentation: Overlay + Popover */}
      {state.isActive && (
        <>
          <TourOverlay
            targetElement={targetElement}
            isCenter={currentStep.target === 'center'}
          />

          {/* Missing target fallback */}
          {state.isTargetMissing ? (
            <TourMissingTarget
              step={currentStep}
              currentStepIndex={state.currentStepIndex}
              totalSteps={totalSteps}
              onSkip={skipStep}
              onStop={stopTour}
            />
          ) : !state.isWaitingTarget ? (
            <TourPopover
              step={currentStep}
              currentStepIndex={state.currentStepIndex}
              totalSteps={totalSteps}
              targetElement={targetElement}
              onNext={nextStep}
              onBack={previousStep}
              onSkip={skipStep}
              onStop={stopTour}
            />
          ) : null}
        </>
      )}
    </GuidedTourContext.Provider>
  );
};
