import React from 'react';
import { AlertCircle, ChevronRight, X } from 'lucide-react';
import { TourStep } from '../../types/tour';

interface TourMissingTargetProps {
  step: TourStep;
  currentStepIndex: number;
  totalSteps: number;
  onSkip: () => void;
  onStop: () => void;
}

export const TourMissingTarget: React.FC<TourMissingTargetProps> = ({
  step,
  currentStepIndex,
  totalSteps,
  onSkip,
  onStop,
}) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="missing-target-title"
      className="fixed z-[9996] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] max-w-[calc(100vw-32px)] bg-white border border-amber-200 rounded-2xl p-5 shadow-2xl space-y-3"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/60 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-semibold text-[#706A65] uppercase tracking-wider">
            Bước {currentStepIndex + 1} / {totalSteps} · {step.title}
          </div>
          <h3 id="missing-target-title" className="font-semibold text-[15px] text-[#211E1C] mt-0.5">
            Không tìm thấy khu vực cần hướng dẫn ở trạng thái hiện tại.
          </h3>
          <p className="text-xs text-[#706A65] mt-1 leading-relaxed">
            Giao diện có thể đang được thu gọn hoặc chưa tải xong. Bạn có thể bỏ qua bước này để tiếp tục khám phá các phần khác.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EEEAE5]">
        <button
          onClick={onStop}
          className="px-3 py-1.5 text-xs font-medium text-[#706A65] hover:text-[#211E1C] hover:bg-[#FAF9F7] rounded-xl transition-colors"
        >
          Dừng hướng dẫn
        </button>
        <button
          onClick={onSkip}
          className="px-3.5 py-1.5 text-xs font-semibold bg-[#7A2938] hover:bg-[#68222E] text-white rounded-xl shadow-xs transition-colors flex items-center gap-1"
        >
          <span>Bỏ qua bước</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
