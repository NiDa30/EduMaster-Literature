import React from 'react';
import { Feather, Sparkles, X } from 'lucide-react';

interface TourIntroModalProps {
  isOpen: boolean;
  onStart: () => void;
  onDismiss: () => void;
}

export const TourIntroModal: React.FC<TourIntroModalProps> = ({ isOpen, onStart, onDismiss }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-2xs anim-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-intro-title"
    >
      <div className="bg-white rounded-2xl border border-[#E5E0DA] max-w-md w-full p-6 shadow-xl space-y-4 modal-motion-enter">
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FCF3F4] text-[#7A2938] border border-[#7A2938]/15 flex items-center justify-center shrink-0">
            <Feather className="w-5 h-5" strokeWidth={2} />
          </div>
          <button
            onClick={onDismiss}
            className="text-[#99918A] hover:text-[#211E1C] p-1 rounded-lg transition-colors"
            aria-label="Để sau"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#7A2938] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EduMaster Văn</span>
          </div>
          <h2 id="tour-intro-title" className="font-serif font-bold text-xl text-[#211E1C] leading-snug">
            Chào mừng đến với EduMaster Văn
          </h2>
          <p className="text-body-ui text-[#706A65] mt-2 leading-relaxed">
            Bạn có muốn xem nhanh cách sử dụng các chức năng chính không? Hướng dẫn sẽ giới thiệu từng khu vực làm việc và liên kết giữa các phân hệ.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            onClick={onDismiss}
            className="px-4 py-2 text-xs font-semibold text-[#706A65] hover:text-[#211E1C] hover:bg-[#FAF9F7] rounded-xl transition-colors border border-transparent hover:border-[#E5E0DA]"
          >
            Để sau
          </button>
          <button
            onClick={onStart}
            className="px-4 py-2 text-xs font-semibold bg-[#7A2938] hover:bg-[#68222E] text-white rounded-xl shadow-xs transition-colors"
          >
            Bắt đầu hướng dẫn
          </button>
        </div>
      </div>
    </div>
  );
};
