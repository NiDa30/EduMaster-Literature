import React from 'react';
import { History, Play, RotateCcw, X } from 'lucide-react';

interface TourResumeModalProps {
  isOpen: boolean;
  savedStepIndex: number;
  totalSteps: number;
  onResume: () => void;
  onRestart: () => void;
  onClose: () => void;
}

export const TourResumeModal: React.FC<TourResumeModalProps> = ({
  isOpen,
  savedStepIndex,
  totalSteps,
  onResume,
  onRestart,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-2xs anim-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-resume-title"
    >
      <div className="bg-white rounded-2xl border border-[#E5E0DA] max-w-sm w-full p-5 shadow-xl space-y-3 modal-motion-enter">
        <div className="flex items-start justify-between gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FCF3F4] text-[#7A2938] border border-[#7A2938]/15 flex items-center justify-center shrink-0">
            <History className="w-5 h-5" />
          </div>
          <button
            onClick={onClose}
            className="text-[#99918A] hover:text-[#211E1C] p-1 rounded-lg transition-colors"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <h3 id="tour-resume-title" className="font-semibold text-[15px] text-[#211E1C]">
            Tiếp tục hướng dẫn?
          </h3>
          <p className="text-xs text-[#706A65] mt-1 leading-relaxed">
            Bạn đã xem đến <span className="font-semibold text-[#211E1C]">Bước {savedStepIndex + 1} / {totalSteps}</span> trong lần trước. Bạn muốn tiếp tục từ bước này hay bắt đầu lại từ đầu?
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EEEAE5]">
          <button
            onClick={onRestart}
            className="px-3 py-1.5 text-xs font-medium text-[#706A65] hover:text-[#211E1C] hover:bg-[#FAF9F7] border border-[#E5E0DA] rounded-xl transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Bắt đầu lại</span>
          </button>
          <button
            onClick={onResume}
            className="px-3.5 py-1.5 text-xs font-semibold bg-[#7A2938] hover:bg-[#68222E] text-white rounded-xl shadow-xs transition-colors flex items-center gap-1"
          >
            <Play className="w-3 h-3" />
            <span>Tiếp tục</span>
          </button>
        </div>
      </div>
    </div>
  );
};
