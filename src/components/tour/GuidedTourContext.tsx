import React, { createContext, useContext } from 'react';

export interface GuidedTourContextValue {
  openTour: () => void;
  restartTour: () => void;
  startTour: (stepIndex?: number) => void;
  stopTour: () => void;
  isActive: boolean;
  currentStepIndex: number;
}

export const GuidedTourContext = createContext<GuidedTourContextValue | null>(null);

export function useTour(): GuidedTourContextValue {
  const context = useContext(GuidedTourContext);
  if (!context) {
    throw new Error('useTour must be used within a GuidedTourProvider');
  }
  return context;
}
