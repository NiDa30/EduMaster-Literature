import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, Sparkles, Check } from 'lucide-react';
import { TourStep } from '../../types/tour';
import { calculatePopoverPosition, getPrefersReducedMotion } from '../../utils/tourUtils';

interface TourPopoverProps {
  step: TourStep;
  currentStepIndex: number;
  totalSteps: number;
  targetElement: HTMLElement | null;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onStop: () => void;
}

export const TourPopover: React.FC<TourPopoverProps> = ({
  step,
  currentStepIndex,
  totalSteps,
  targetElement,
  onNext,
  onBack,
  onSkip,
  onStop,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [dimensions, setDimensions] = useState({ width: 360, height: 230 });
  const reducedMotion = getPrefersReducedMotion();

  // Measure popover dimensions on mount & step change
  useEffect(() => {
    if (popoverRef.current) {
      const rect = popoverRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({ width: rect.width, height: rect.height });
      }
    }
  }, [step]);

  // Focus primary next button when step opens for accessibility
  useEffect(() => {
    const timer = setTimeout(() => {
      nextButtonRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, [currentStepIndex]);

  const targetRect = step.target === 'center' || !targetElement
    ? null
    : targetElement.getBoundingClientRect();

  const { x, y } = calculatePopoverPosition(
    targetRect,
    dimensions,
    step.placement || 'bottom'
  );

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  return (
    <div
      ref={popoverRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-popover-title"
      aria-describedby="tour-popover-description"
      className="fixed z-[9995] w-[360px] max-w-[calc(100vw-32px)] bg-white border border-[#E5E0DA] rounded-2xl p-4 sm:p-5 shadow-[0_16px_40px_rgba(41,37,36,0.12),0_4px_12px_rgba(41,37,36,0.06)] text-[#302C29] select-none motion-surface"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        opacity: 1,
        transform: reducedMotion ? 'none' : 'translateY(0)',
        transition: reducedMotion ? 'none' : 'top var(--motion-normal, 180ms) var(--ease-standard, ease), left var(--motion-normal, 180ms) var(--ease-standard, ease), opacity var(--motion-fast, 160ms) var(--ease-standard, ease), transform var(--motion-fast, 160ms) var(--ease-standard, ease)',
      }}
    >
      {/* Popover Header: Chapter, Step counter & Close/Stop */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EEEAE5] gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FCF3F4] text-[#7A2938] border border-[#7A2938]/15 truncate">
            {step.chapterTitle || step.chapter}
          </span>
          <span className="text-[12px] font-medium text-[#706A65] shrink-0 tabular-nums">
            Bước {currentStepIndex + 1} / {totalSteps}
          </span>
        </div>

        <button
          onClick={onStop}
          className="p-1 text-[#99918A] hover:text-[#211E1C] hover:bg-[#FAF9F7] rounded-lg transition-colors shrink-0"
          title="Dừng hướng dẫn"
          aria-label="Dừng hướng dẫn"
        >
          <X className="w-4 h-4" strokeWidth={1.75} />
        </button>
      </div>

      {/* Popover Content */}
      <div className="space-y-1.5 mb-4">
        <h3
          id="tour-popover-title"
          className="font-sans font-semibold text-[16px] text-[#211E1C] leading-snug"
        >
          {step.title}
        </h3>
        <p
          id="tour-popover-description"
          className="text-[14px] text-[#302C29] leading-[1.6]"
        >
          {step.description}
        </p>
      </div>

      {/* Popover Action Buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-[#EEEAE5] gap-2">
        {/* Left: Ghost Skip step */}
        <div>
          {!isLastStep && (
            <button
              onClick={onSkip}
              className="text-xs font-medium text-[#706A65] hover:text-[#211E1C] hover:bg-[#FAF9F7] px-2 py-1.5 rounded-lg transition-colors"
              title="Bỏ qua bước này và đi tiếp bước sau"
            >
              Bỏ qua
            </button>
          )}
        </div>

        {/* Right: Back & Next */}
        <div className="flex items-center gap-2">
          {!isFirstStep && (
            <button
              onClick={onBack}
              className="px-3 py-1.5 text-xs font-semibold text-[#706A65] hover:text-[#211E1C] hover:bg-[#FAF9F7] border border-[#E5E0DA] rounded-xl transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Quay lại</span>
            </button>
          )}

          <button
            ref={nextButtonRef}
            onClick={onNext}
            className="px-3.5 py-1.5 text-xs font-semibold bg-[#7A2938] hover:bg-[#68222E] text-white rounded-xl shadow-xs transition-colors flex items-center gap-1"
          >
            {isLastStep ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Hoàn thành</span>
              </>
            ) : (
              <>
                <span>Tiếp theo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
