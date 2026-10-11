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
    <header className="h-14 bg-[var(--color-surface)] border-b border-[var(--color-border-default)] px-4 md:px-5 flex items-center justify-between sticky top-0 z-30 select-none shrink-0 no-print">
      {/* Left: Breadcrumb & Lesson Switcher */}
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-strong)] hover:bg-[var(--color-surface-subtle)] transition-colors"
          aria-label="Mở menu điều hướng"
        >
          <Menu className="w-5 h-5" strokeWidth={1.75} />
        </button>

        {/* Lesson Switcher Dropdown */}
        <div className="relative min-w-0 flex-1 max-w-[480px]" ref={lessonSwitcherRef} data-tour-id="lesson-switcher">
          <button
            onClick={() => setIsLessonSwitcherOpen(!isLessonSwitcherOpen)}
            className="flex w-full min-w-0 items-center gap-1.5 py-1 px-2.5 -ml-1 rounded-lg hover:bg-[var(--color-surface-subtle)] transition-colors text-left group"
            title="Nhấp để đổi tác phẩm giảng dạy"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] shrink-0">
              {currentLesson.grade || 'Ngữ văn 12'}
            </span>
            <span className="text-[var(--color-border-strong)]">/</span>
            <span className="font-serif font-bold text-[var(--color-text-strong)] text-sm md:text-[15px] group-hover:text-[var(--color-brand-text)] transition-colors truncate min-w-0 flex-1">
              {currentLesson.title}
            </span>
            <span className="text-[var(--color-text-secondary)] font-serif italic text-xs whitespace-nowrap shrink-0 hidden xl:inline">
              — {currentLesson.author}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-muted)] ml-0.5 shrink-0 transition-transform group-hover:text-[var(--color-text-secondary)]" strokeWidth={1.75} />
          </button>

          {isLessonSwitcherOpen && (
            <div className="absolute left-0 mt-1.5 w-72 bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-xl shadow-[var(--shadow-md)] py-1.5 z-50 anim-dropdown">
              <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-[var(--color-text-muted)] border-b border-[var(--color-border-subtle)] mb-1">
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
                      className={`w-full text-left px-3 py-2 text-body-ui flex items-center justify-between hover:bg-[var(--color-surface-subtle)] transition-colors ${
                        isSelected ? 'bg-[var(--color-brand-soft)] text-[var(--color-brand-text)] font-medium' : 'text-[var(--color-text-strong)]'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-serif font-semibold text-sm truncate">{l.title}</div>
                        <div className="text-[12px] text-[var(--color-text-secondary)] truncate">{l.author} · {l.grade}</div>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[var(--color-brand-text)] shrink-0" strokeWidth={2} />
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
          className="hidden xl:inline-flex items-center gap-1.5 text-[12px] text-[var(--color-text-secondary)]"
          title={`Tự động đồng bộ và lưu cục bộ lúc ${formatSavedTime(lastUpdated)}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
          <span>Đã lưu · <span className="tabular-nums font-medium text-[var(--color-text-primary)]">{formatSavedTime(lastUpdated)}</span></span>
        </div>

        <div className="h-4 w-px bg-[var(--color-border-subtle)] hidden xl:block" />

        {/* Toggle Focus Mode */}
        {onToggleFocusMode && (
          <button
            data-tour-id="focus-mode"
            onClick={onToggleFocusMode}
            className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isFocusMode 
                ? 'bg-[var(--color-brand-soft)] text-[var(--color-brand-text)] border border-[var(--color-brand-200)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-strong)] hover:bg-[var(--color-surface-subtle)]'
            }`}
            aria-label={isFocusMode ? "Thoát chế độ tập trung" : "Chế độ tập trung"}
            title={isFocusMode ? "Thoát chế độ tập trung" : "Chế độ tập trung (ẩn sidebar)"}
          >
            {isFocusMode ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span className="hidden xl:inline">Thoát</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span className="hidden xl:inline">Tập trung</span>
              </>
            )}
          </button>
        )}

        {/* Guided Tour button */}
        {onOpenTour && (
          <button
            onClick={onOpenTour}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand-text)] hover:bg-[var(--color-brand-soft)] transition-colors"
            title="Hướng dẫn sử dụng toàn hệ thống"
            aria-label="Hướng dẫn sử dụng"
          >
            <HelpCircle className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span className="hidden xl:inline">Hướng dẫn</span>
          </button>
        )}

        {/* Print Preview Button */}
        {onPreview && (
          <button
            onClick={onPreview}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-strong)] hover:bg-[var(--color-surface-subtle)] transition-colors"
            title="In hoặc Xem trước trang in A4"
            aria-label="In / Xem trước"
          >
            <Printer className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span className="hidden xl:inline">In / Xem trước</span>
          </button>
        )}

        {/* Export Dropdown */}
        <div className="relative" ref={exportRef}>
          <button
            onClick={() => setIsExportOpen(!isExportOpen)}
            className="btn-secondary btn-compact gap-1.5"
            title="Tải về tài liệu"
          >
            <Download className="w-3.5 h-3.5 text-[var(--color-text-secondary)]" strokeWidth={1.75} />
            <span className="hidden xl:inline">Xuất file</span>
            <ChevronDown className="w-3 h-3 text-[var(--color-text-muted)]" strokeWidth={1.75} />
          </button>

          {isExportOpen && (
            <div className="absolute right-0 mt-1.5 w-60 bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-xl shadow-[var(--shadow-md)] py-1.5 z-50 anim-dropdown text-left">
              <div className="px-3 py-1 text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Giáo án & Trình chiếu
              </div>
              <button
                onClick={() => {
                  exportDocxKHBD(khbd);
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] flex items-center gap-2.5 transition-colors"
              >
                <FileText className="w-4 h-4 text-[#1E40AF] shrink-0" strokeWidth={1.75} />
                <span>Giáo án KHBD 5512 (DOCX)</span>
              </button>
              <button
                onClick={() => {
                  exportPptxSlides(slides, khbd.info.lessonTitle);
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] flex items-center gap-2.5 transition-colors"
              >
                <Presentation className="w-4 h-4 text-[#92400E] shrink-0" strokeWidth={1.75} />
                <span>Bài giảng điện tử (PPTX)</span>
              </button>

              <div className="h-px bg-[var(--color-border-subtle)] my-1" />
              <div className="px-3 py-1 text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Khảo thí & Đánh giá
              </div>
              <button
                onClick={() => {
                  exportDocxExam(exam, khbd);
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] flex items-center gap-2.5 transition-colors"
              >
                <FileText className="w-4 h-4 text-[var(--color-brand-text)] shrink-0" strokeWidth={1.75} />
                <span>Đề thi & Hướng dẫn (DOCX)</span>
              </button>
              <button
                onClick={() => {
                  exportDocxMatrix(exam, khbd);
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] flex items-center gap-2.5 transition-colors"
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
