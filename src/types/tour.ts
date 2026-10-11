import { ActiveModule } from './index';

export type TourPlacement = 'top' | 'bottom' | 'left' | 'right' | 'center';

export interface TourStep {
  id: string;
  chapter: string;
  chapterTitle?: string;
  module: ActiveModule;
  target?: string; // e.g. '[data-tour-id="sidebar"]' or 'center'
  title: string;
  description: string;
  placement?: TourPlacement;
  route?: string; // e.g. '#/workspace'
  actionHint?: string;
  allowSkip?: boolean;
  beforeEnter?: () => void;
  afterLeave?: () => void;
}

export interface TourPreferences {
  hasSeenIntro: boolean;
  dismissedIntro: boolean;
  completedFullTour: boolean;
  lastStepIndex?: number;
  completedAt?: string;
  lastSeenAt?: string;
}

export interface TourState {
  isActive: boolean;
  currentStepIndex: number;
  mode: 'full' | 'module';
  isConfirmingStop: boolean;
  isCompleted: boolean;
  isTargetMissing: boolean;
  isWaitingTarget: boolean;
}
