import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface TourCompletionModalProps {
  isOpen: boolean;
  onFinish: () => void;
}

export const TourCompletionModal: React.FC<TourCompletionModalProps> = ({ isOpen, onFinish }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-2xs anim-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-complete-title"
    >
      <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border-default)] max-w-md w-full p-6 shadow-xl space-y-4 modal-motion-enter text-center">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div>
          <h2 id="tour-complete-title" className="font-serif font-bold text-xl text-[var(--color-text-strong)]">
            Bạn đã hoàn thành hướng dẫn EduMaster Văn
          </h2>
          <p className="text-body-ui text-[var(--color-text-secondary)] mt-2 leading-relaxed">
            Hệ thống đã sẵn sàng cho công tác soạn giảng và khảo thí. Bạn có thể mở lại hướng dẫn bất kỳ lúc nào từ thanh công cụ trên cùng.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onFinish}
            className="w-full py-2.5 px-4 text-xs font-semibold bg-[var(--color-brand-700)] hover:bg-[var(--color-brand-800)] text-white rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Bắt đầu làm việc</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
