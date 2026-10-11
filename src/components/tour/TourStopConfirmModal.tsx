import React from 'react';
import { HelpCircle } from 'lucide-react';

interface TourStopConfirmModalProps {
  isOpen: boolean;
  onContinue: () => void;
  onConfirmStop: () => void;
}

export const TourStopConfirmModal: React.FC<TourStopConfirmModalProps> = ({
  isOpen,
  onContinue,
  onConfirmStop,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-2xs anim-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-stop-title"
    >
      <div className="bg-white rounded-2xl border border-[#E5E0DA] max-w-sm w-full p-5 shadow-xl space-y-3 modal-motion-enter">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FAF9F7] text-[#706A65] border border-[#E5E0DA] flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 id="tour-stop-title" className="font-semibold text-[15px] text-[#211E1C]">
              Dừng hướng dẫn?
            </h3>
            <p className="text-xs text-[#706A65] mt-0.5">
              Bạn có thể mở lại hướng dẫn bất kỳ lúc nào từ mục Trợ giúp hoặc thanh trên cùng.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EEEAE5]">
          <button
            onClick={onConfirmStop}
            className="px-3 py-1.5 text-xs font-medium text-[#706A65] hover:text-[#211E1C] hover:bg-[#FAF9F7] rounded-xl transition-colors"
          >
            Dừng
          </button>
          <button
            onClick={onContinue}
            className="px-3.5 py-1.5 text-xs font-semibold bg-[#7A2938] hover:bg-[#68222E] text-white rounded-xl shadow-xs transition-colors"
          >
            Tiếp tục hướng dẫn
          </button>
        </div>
      </div>
    </div>
  );
};
