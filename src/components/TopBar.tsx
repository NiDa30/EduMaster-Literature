import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  ChevronDown, 
  Download, 
  Printer, 
  FileText, 
  Presentation, 
  Check, 
  Maximize2,
  Minimize2,
  Share2,
  FileSpreadsheet,
  HelpCircle
} from 'lucide-react';
import { LiteratureLesson, LessonPlan5512, Exam7991Data, SlideItem } from '../types';
import { 
  exportDocxKHBD, 
  exportDocxExam, 
  exportPptxSlides, 
  exportDocxMatrix 
} from '../utils/exportUtils';

interface TopBarProps {
  currentLesson: LiteratureLesson;
  lessons: LiteratureLesson[];
  onSelectLesson: (id: string) => void;
  onOpenSidebar: () => void;
  isFocusMode?: boolean;
  onToggleFocusMode?: () => void;
  onPreview?: () => void;
  khbd: LessonPlan5512;
  exam: Exam7991Data;
  slides: SlideItem[];
  onOpenHandover: () => void;
  onOpenTour?: () => void;
  lastUpdated?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentLesson,
  lessons,
  onSelectLesson,
  onOpenSidebar,
  isFocusMode = false,
  onToggleFocusMode,
  onPreview,
  khbd,
  exam,
  slides,
  onOpenHandover,
  onOpenTour,
  lastUpdated
}) => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isLessonSwitcherOpen, setIsLessonSwitcherOpen] = useState(false);

  const exportRef = useRef<HTMLDivElement>(null);
  const lessonSwitcherRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setIsExportOpen(false);
      }
      if (lessonSwitcherRef.current && !lessonSwitcherRef.current.contains(event.target as Node)) {
        setIsLessonSwitcherOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatSavedTime = (iso?: string) => {
    if (!iso) return 'Vừa xong';
    try {
      const d = new Date(iso);
      return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Vừa xong';
    }
  };

  return (
    <header className="h-14 bg-white border-b border-[#E5E0DA] px-4 md:px-5 flex items-center justify-between sticky top-0 z-30 select-none shrink-0 no-print">
      {/* Left: Breadcrumb & Lesson Switcher */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-1.5 rounded-lg text-[#706A65] hover:text-[#211E1C] hover:bg-[#FAF9F7] transition-colors"
          aria-label="Mở menu điều hướng"
        >
          <Menu className="w-5 h-5" strokeWidth={1.75} />
        </button>

        {/* Lesson Switcher Dropdown */}
        <div className="relative" ref={lessonSwitcherRef} data-tour-id="lesson-switcher">
          <button
            onClick={() => setIsLessonSwitcherOpen(!isLessonSwitcherOpen)}
            className="flex items-center gap-1.5 py-1 px-2.5 -ml-1 rounded-lg hover:bg-[#FAF9F7] transition-colors text-left group"
            title="Nhấp để đổi tác phẩm giảng dạy"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-[#99918A] shrink-0">
              {currentLesson.grade || 'Ngữ văn 12'}
            </span>
            <span className="text-[#D6D0C8]">/</span>
            <span className="font-serif font-bold text-[#211E1C] text-sm md:text-[15px] group-hover:text-[#7A2938] transition-colors truncate max-w-[180px] sm:max-w-[260px] md:max-w-none">
              {currentLesson.title}
            </span>
            <span className="text-[#706A65] font-serif italic text-xs hidden sm:inline">
              — {currentLesson.author}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#99918A] ml-0.5 shrink-0 transition-transform group-hover:text-[#706A65]" strokeWidth={1.75} />
          </button>

          {isLessonSwitcherOpen && (
            <div className="absolute left-0 mt-1.5 w-72 bg-white border border-[#E5E0DA] rounded-xl shadow-[var(--shadow-md)] py-1.5 z-50 anim-dropdown">
              <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#99918A] border-b border-[#EEEAE5] mb-1">
                Tác phẩm giảng dạy ({lessons.length})
              </div>
              <div className="max-h-72 overflow-y-auto">
                {lessons.map((l) => {
                  const isSelected = l.id === currentLesson.id;
                  return (
                    <button
                      key={l.id}
                      onClick={() => {
                        onSelectLesson(l.id);
                        setIsLessonSwitcherOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-body-ui flex items-center justify-between hover:bg-[#FAF9F7] transition-colors ${
                        isSelected ? 'bg-[#FCF3F4] text-[#7A2938] font-medium' : 'text-[#211E1C]'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-serif font-semibold text-sm truncate">{l.title}</div>
                        <div className="text-[12px] text-[#706A65] truncate">{l.author} · {l.grade}</div>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#7A2938] shrink-0" strokeWidth={2} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Autosave status & Compact actions */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {/* Autosave Status: Minimal semantic dot (Rule XI) */}
        <div 
          data-tour-id="autosave-status"
          className="hidden sm:inline-flex items-center gap-1.5 text-[12px] text-[#706A65]"
          title={`Tự động đồng bộ và lưu cục bộ lúc ${formatSavedTime(lastUpdated)}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
          <span>Đã lưu · <span className="tabular-nums font-medium text-[#302C29]">{formatSavedTime(lastUpdated)}</span></span>
        </div>

        <div className="h-4 w-px bg-[#EEEAE5] hidden sm:block" />

        {/* Toggle Focus Mode */}
        {onToggleFocusMode && (
          <button
            data-tour-id="focus-mode"
            onClick={onToggleFocusMode}
            className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isFocusMode 
                ? 'bg-[#FCF3F4] text-[#7A2938] border border-[#ECC2C9]' 
                : 'text-[#706A65] hover:text-[#211E1C] hover:bg-[#FAF9F7]'
            }`}
            title={isFocusMode ? "Thoát chế độ tập trung" : "Chế độ tập trung (ẩn sidebar)"}
          >
            {isFocusMode ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Thoát</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Tập trung</span>
              </>
            )}
          </button>
        )}

        {/* Guided Tour button */}
        {onOpenTour && (
          <button
            onClick={onOpenTour}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#706A65] hover:text-[#7A2938] hover:bg-[#FCF3F4] transition-colors"
            title="Hướng dẫn sử dụng toàn hệ thống"
            aria-label="Hướng dẫn sử dụng"
          >
            <HelpCircle className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span className="hidden md:inline">Hướng dẫn</span>
          </button>
        )}

        {/* Print Preview Button */}
        {onPreview && (
          <button
            onClick={onPreview}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#706A65] hover:text-[#211E1C] hover:bg-[#FAF9F7] transition-colors"
            title="In hoặc Xem trước trang in A4"
          >
            <Printer className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>In / Xem trước</span>
          </button>
        )}

        {/* Export Dropdown */}
        <div className="relative" ref={exportRef}>
          <button
            onClick={() => setIsExportOpen(!isExportOpen)}
            className="btn-secondary btn-compact gap-1.5"
            title="Tải về tài liệu"
          >
            <Download className="w-3.5 h-3.5 text-[#706A65]" strokeWidth={1.75} />
            <span className="hidden sm:inline">Xuất file</span>
            <ChevronDown className="w-3 h-3 text-[#99918A]" strokeWidth={1.75} />
          </button>

          {isExportOpen && (
            <div className="absolute right-0 mt-1.5 w-60 bg-white border border-[#E5E0DA] rounded-xl shadow-[var(--shadow-md)] py-1.5 z-50 anim-dropdown text-left">
              <div className="px-3 py-1 text-[11px] font-semibold text-[#99918A] uppercase tracking-wider">
                Giáo án & Trình chiếu
              </div>
              <button
                onClick={() => {
                  exportDocxKHBD(khbd);
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-[#302C29] hover:bg-[#FAF9F7] flex items-center gap-2.5 transition-colors"
              >
                <FileText className="w-4 h-4 text-[#1E40AF] shrink-0" strokeWidth={1.75} />
                <span>Giáo án KHBD 5512 (DOCX)</span>
              </button>
              <button
                onClick={() => {
                  exportPptxSlides(slides, khbd.info.lessonTitle);
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-[#302C29] hover:bg-[#FAF9F7] flex items-center gap-2.5 transition-colors"
              >
                <Presentation className="w-4 h-4 text-[#92400E] shrink-0" strokeWidth={1.75} />
                <span>Bài giảng điện tử (PPTX)</span>
              </button>

              <div className="h-px bg-[#EEEAE5] my-1" />
              <div className="px-3 py-1 text-[11px] font-semibold text-[#99918A] uppercase tracking-wider">
                Khảo thí & Đánh giá
              </div>
              <button
                onClick={() => {
                  exportDocxExam(exam, khbd);
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-[#302C29] hover:bg-[#FAF9F7] flex items-center gap-2.5 transition-colors"
              >
                <FileText className="w-4 h-4 text-[#7A2938] shrink-0" strokeWidth={1.75} />
                <span>Đề thi & Hướng dẫn (DOCX)</span>
              </button>
              <button
                onClick={() => {
                  exportDocxMatrix(exam, khbd);
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-[#302C29] hover:bg-[#FAF9F7] flex items-center gap-2.5 transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#166534] shrink-0" strokeWidth={1.75} />
                <span>Ma trận & Bản đặc tả (DOCX)</span>
              </button>
            </div>
          )}
        </div>

        {/* Handover / Xuất bản Center button */}
        <button
          onClick={onOpenHandover}
          className="btn-primary btn-compact gap-1.5"
          title="Mở Trung tâm Xuất bản & Chuyển giao"
        >
          <Share2 className="w-3.5 h-3.5" strokeWidth={1.75} />
          <span className="hidden sm:inline">Xuất bản</span>
        </button>
      </div>
    </header>
  );
};
