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
      <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border-default)] max-w-sm w-full p-5 shadow-xl space-y-3 modal-motion-enter">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border-default)] flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 id="tour-stop-title" className="font-semibold text-[15px] text-[var(--color-text-strong)]">
              Dừng hướng dẫn?
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Bạn có thể mở lại hướng dẫn bất kỳ lúc nào từ mục Trợ giúp hoặc thanh trên cùng.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--color-border-subtle)]">
          <button
            onClick={onConfirmStop}
            className="px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-strong)] hover:bg-[var(--color-surface-subtle)] rounded-xl transition-colors"
          >
            Dừng
          </button>
          <button
            onClick={onContinue}
            className="px-3.5 py-1.5 text-xs font-semibold bg-[var(--color-brand-700)] hover:bg-[var(--color-brand-800)] text-white rounded-xl shadow-xs transition-colors"
          >
            Tiếp tục hướng dẫn
          </button>
        </div>
      </div>
    </div>
  );
};
