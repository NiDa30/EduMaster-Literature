import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  ChevronDown, 
  Download, 
  Printer, 
  FileText, 
  Presentation, 
  FileCode2, 
  Maximize2,
  Minimize2,
  MoreHorizontal,
  Check
} from 'lucide-react';
import { LiteratureLesson, LessonPlan5512, Exam7991Data, SlideItem } from '../types';
import { 
  exportDocxKHBD, 
  exportDocxExam, 
  exportPptxSlides, 
  exportWordKHBD, 
  exportWordExam7991, 
  exportHtmlSlides 
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
  lastUpdated
}) => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isLessonSwitcherOpen, setIsLessonSwitcherOpen] = useState(false);

  const exportRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const lessonSwitcherRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setIsExportOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
      if (lessonSwitcherRef.current && !lessonSwitcherRef.current.contains(event.target as Node)) {
        setIsLessonSwitcherOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatSavedTime = (iso?: string) => {
    if (!iso) return '14:30';
    try {
      const d = new Date(iso);
      return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '14:30';
    }
  };

    return (
      <header className="h-14 bg-white border-b border-[#E7E5E4] px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 select-none no-print">
        {/* Left: Breadcrumbs & Current Text Context */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-1.5 rounded-lg text-[#57534E] hover:text-[#292524] hover:bg-stone-100 transition-colors"
            aria-label="Mở menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.75} />
          </button>

          {/* Lesson Switcher Dropdown */}
          <div className="relative" ref={lessonSwitcherRef}>
            <button
              onClick={() => setIsLessonSwitcherOpen(!isLessonSwitcherOpen)}
              className="flex items-center gap-2 py-1 px-2 -ml-2 rounded-lg hover:bg-stone-50 transition-colors text-left group"
              title="Đổi tác phẩm giảng dạy"
            >
              <span className="font-serif font-literary-inline font-semibold text-card-title text-[#292524] group-hover:text-[#7C2D37] transition-colors">
                {currentLesson.title}
              </span>
              <span className="text-[#78716C] text-body-ui">/</span>
              <span className="text-body-ui text-[#57534E]">
                {currentLesson.author}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#78716C] ml-0.5" strokeWidth={1.75} />
            </button>

            {isLessonSwitcherOpen && (
              <div className="absolute left-0 mt-1 w-64 bg-white border border-[#E7E5E4] rounded-xl shadow-lg py-1 z-50">
                <div className="px-3 py-1.5 text-metadata font-medium text-[#78716C]">
                  Chọn tác phẩm mẫu
                </div>
                {lessons.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      onSelectLesson(l.id);
                      setIsLessonSwitcherOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-body-ui flex items-center justify-between hover:bg-stone-50 transition-colors ${
                      l.id === currentLesson.id ? 'bg-[#FBF4F5] text-[#7C2D37] font-medium' : 'text-[#292524]'
                    }`}
                  >
                    <div>
                      <div className="font-serif font-literary-inline">{l.title}</div>
                      <div className="text-metadata text-[#78716C]">{l.author} · {l.grade}</div>
                    </div>
                    {l.id === currentLesson.id && (
                      <Check className="w-4 h-4 text-[#7C2D37]" strokeWidth={2} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Autosave status, Preview, Export Menu, More */}
        <div className="flex items-center gap-3">
          {/* Autosave Indicator: Real lastUpdated timestamp */}
          <span className="hidden sm:inline-block text-metadata text-[#78716C]">
            Đã lưu · <span className="tabular-nums">{formatSavedTime(lastUpdated)}</span>
          </span>

        {/* Secondary: Xem trước */}
        <button
          onClick={onPreview}
          className="btn-secondary btn-compact hidden sm:inline-flex"
        >
          Xem trước
        </button>

        {/* Xuất Menu Dropdown */}
        <div className="relative" ref={exportRef}>
          <button
            onClick={() => setIsExportOpen(!isExportOpen)}
            className="btn-secondary btn-compact flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#57534E]" strokeWidth={1.75} />
            <span>Xuất</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#78716C]" strokeWidth={1.75} />
          </button>

          {isExportOpen && (
            <div className="absolute right-0 mt-1 w-56 bg-white border border-[#E7E5E4] rounded-xl shadow-lg py-1 z-50">
              <div className="px-3 py-1.5 text-metadata font-medium text-[#78716C]">
                Xuất tài liệu giảng dạy
              </div>
              <button
                onClick={() => {
                  exportDocxKHBD(khbd);
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-body-ui text-[#292524] hover:bg-stone-50 transition-colors flex items-center gap-2.5 min-h-[38px]"
              >
                <FileText className="w-4 h-4 text-[#7C2D37]" strokeWidth={1.75} />
                <div>
                  <div className="font-medium">Word KHBD 5512 (.docx)</div>
                  <div className="text-[11px] text-stone-500">Chuẩn OpenXML A4</div>
                </div>
              </button>
              <button
                onClick={() => {
                  exportDocxExam(exam, khbd);
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-body-ui text-[#292524] hover:bg-stone-50 transition-colors flex items-center gap-2.5 min-h-[38px]"
              >
                <FileText className="w-4 h-4 text-[#15803D]" strokeWidth={1.75} />
                <div>
                  <div className="font-medium">Word Đề kiểm tra (.docx)</div>
                  <div className="text-[11px] text-stone-500">Chuẩn CV 7991 & Barem</div>
                </div>
              </button>
              <button
                onClick={() => {
                  exportPptxSlides(slides, currentLesson.title);
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-body-ui text-[#292524] hover:bg-stone-50 transition-colors flex items-center gap-2.5 min-h-[38px]"
              >
                <Presentation className="w-4 h-4 text-[#D97706]" strokeWidth={1.75} />
                <div>
                  <div className="font-medium">PowerPoint Slide (.pptx)</div>
                  <div className="text-[11px] text-stone-500">Chuẩn 16:9 Nghệ thuật</div>
                </div>
              </button>
              <button
                onClick={() => {
                  window.print();
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-body-ui text-[#292524] hover:bg-stone-50 transition-colors flex items-center gap-2.5 min-h-[38px]"
              >
                <Printer className="w-4 h-4 text-[#57534E]" strokeWidth={1.75} />
                <span>In A4 / Lưu PDF</span>
              </button>
              <button
                onClick={() => {
                  exportHtmlSlides(slides, currentLesson.title);
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-body-ui text-[#292524] hover:bg-stone-50 transition-colors flex items-center gap-2.5 min-h-[38px]"
              >
                <FileCode2 className="w-4 h-4 text-[#B45309]" strokeWidth={1.75} />
                <span>Xuất Slide HTML Offline</span>
              </button>
              <div className="my-1 border-t border-[#E7E5E4]" />
              <button
                onClick={() => {
                  onOpenHandover();
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-body-ui text-[#292524] hover:bg-stone-50 transition-colors flex items-center gap-2.5 min-h-[38px]"
              >
                <FileCode2 className="w-4 h-4 text-[#57534E]" strokeWidth={1.75} />
                <span>JSON State Bàn giao</span>
              </button>
            </div>
          )}
        </div>

        {/* More Actions Dropdown (•••) */}
        <div className="relative" ref={moreRef}>
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className="p-2 text-[#57534E] hover:text-[#292524] hover:bg-stone-100 rounded-lg transition-colors"
            title="Thao tác khác"
            aria-label="Thao tác khác"
          >
            <MoreHorizontal className="w-4 h-4" strokeWidth={1.75} />
          </button>

          {isMoreOpen && (
            <div className="absolute right-0 mt-1 w-52 bg-white border border-[#E7E5E4] rounded-xl shadow-lg py-1 z-50">
              {onToggleFocusMode && (
                <button
                  onClick={() => {
                    onToggleFocusMode();
                    setIsMoreOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-body-ui text-[#292524] hover:bg-stone-50 transition-colors flex items-center gap-2.5 min-h-[38px]"
                >
                  {isFocusMode ? (
                    <>
                      <Minimize2 className="w-4 h-4 text-[#78716C]" strokeWidth={1.75} />
                      <span>Thoát Focus Mode</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-4 h-4 text-[#78716C]" strokeWidth={1.75} />
                      <span>Bật Focus Mode</span>
                    </>
                  )}
                </button>
              )}
              <button
                onClick={() => {
                  onOpenHandover();
                  setIsMoreOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-body-ui text-[#292524] hover:bg-stone-50 transition-colors flex items-center gap-2.5 min-h-[38px]"
              >
                <FileCode2 className="w-4 h-4 text-[#78716C]" strokeWidth={1.75} />
                <span>Xem dữ liệu phiên (JSON)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
