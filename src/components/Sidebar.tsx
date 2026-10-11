import React from 'react';
import { ownerProfile } from '../config/ownerProfile';
import { 
  Home,
  BookOpen, 
  FileText, 
  Presentation, 
  CheckSquare, 
  Grid3X3, 
  Share2, 
  Settings,
  HelpCircle,
  X,
  Feather,
  GraduationCap,
  Compass
} from 'lucide-react';
import { ActiveModule, LessonPlan5512, Exam7991Data, SlideItem, LiteratureLesson } from '../types';

interface SidebarProps {
  activeModule: ActiveModule;
  setActiveModule: (m: ActiveModule) => void;
  khbd: LessonPlan5512;
  setKhbd: React.Dispatch<React.SetStateAction<LessonPlan5512>>;
  exam: Exam7991Data;
  setExam: React.Dispatch<React.SetStateAction<Exam7991Data>>;
  slides: SlideItem[];
  setSlides: React.Dispatch<React.SetStateAction<SlideItem[]>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (o: boolean) => void;
  onOpenHandover: () => void;
  onOpenSettings?: () => void;
  onOpenTour?: () => void;
  lessons: LiteratureLesson[];
  currentLessonId: string;
  onSelectLesson: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  setActiveModule,
  isSidebarOpen,
  setIsSidebarOpen,
  onOpenHandover,
  onOpenSettings,
  onOpenTour
}) => {
  // 10 danh mục chuẩn nghiệp vụ giáo viên Ngữ văn THPT
  const mainNavItems = [
    { id: 'dashboard' as ActiveModule, label: 'Bàn làm việc', icon: Home },
    { id: 'workspace' as ActiveModule, label: 'Tác phẩm', icon: BookOpen },
    { id: 'genre_analysis' as ActiveModule, label: 'Phân tích thể loại', icon: Compass },
    { id: 'khbd' as ActiveModule, label: 'Kế hoạch bài dạy', icon: FileText },
    { id: 'question_builder' as ActiveModule, label: 'Câu hỏi', icon: HelpCircle },
    { id: 'matrix' as ActiveModule, label: 'Ma trận & Đặc tả', icon: Grid3X3 },
    { id: 'exam' as ActiveModule, label: 'Đề kiểm tra', icon: CheckSquare },
    { id: 'rubric' as ActiveModule, label: 'Rubric', icon: GraduationCap },
    { id: 'slides' as ActiveModule, label: 'Slide', icon: Presentation },
    { id: 'export_handover' as ActiveModule, label: 'Xuất bản', icon: Share2 },
  ];


  return (
    <aside 
      data-tour-id="sidebar"
      className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-[248px] bg-white border-r border-[#E5E0DA] flex flex-col transition-transform duration-[240ms] ease-[cubic-bezier(0.2,0,0,1)] no-print select-none ${
        isSidebarOpen ? 'translate-x-0 shadow-lg lg:shadow-none' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Header */}
      <div className="h-14 px-4 border-b border-[#E5E0DA] flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#7A2938] flex items-center justify-center text-white shrink-0 shadow-xs">
            <Feather className="w-4 h-4" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <span className="font-serif font-bold text-[15px] tracking-tight text-[#211E1C] block truncate">
              EduMaster Văn
            </span>
            <span className="text-[11px] text-[#706A65] block truncate leading-none mt-0.5">
              Hệ thống Bài dạy & Khảo thí
            </span>
          </div>
        </div>

        {/* Mobile close button */}
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden p-1.5 text-[#706A65] hover:text-[#211E1C] rounded-md transition-colors"
          aria-label="Đóng thanh điều hướng"
        >
          <X className="w-4 h-4" strokeWidth={1.75} />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        <div className="px-2.5 pb-1.5 pt-0.5 text-[11px] font-semibold tracking-wider text-[#99918A] uppercase">
          Nghiệp vụ Sư phạm
        </div>

        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'export_handover') {
                  onOpenHandover();
                } else {
                  setActiveModule(item.id);
                }
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-body-ui min-h-[38px] transition-all duration-150 flex items-center gap-3 relative ${
                isActive
                  ? 'bg-[#FCF3F4] text-[#7A2938] font-semibold shadow-[inset_0_1px_0_rgba(122,41,56,0.08)]'
                  : 'text-[#706A65] hover:text-[#211E1C] hover:bg-[#FAF9F7] font-normal'
              }`}
            >
              {/* Left Active Indicator Strip */}
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-[#7A2938]" />
              )}
              <Icon 
                className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#7A2938]' : 'text-[#99918A]'}`} 
                strokeWidth={isActive ? 2 : 1.75} 
              />
              <span className="truncate-safe text-[13.5px]">{item.label}</span>
            </button>
          );
        })}

        {/* Secondary Navigation Divider */}
        <div className="pt-3 pb-2 px-2">
          <div className="h-px bg-[#EEEAE5] w-full" />
        </div>

        <div className="px-2.5 pb-1 text-[11px] font-semibold tracking-wider text-[#99918A] uppercase">
          Hệ thống
        </div>

        <button
          onClick={() => {
            if (onOpenSettings) onOpenSettings();
            setIsSidebarOpen(false);
          }}
          className="w-full text-left px-3 py-2 rounded-lg text-body-ui min-h-[38px] text-[#706A65] hover:text-[#211E1C] hover:bg-[#FAF9F7] transition-colors duration-150 flex items-center gap-3 font-normal"
        >
          <Settings className="w-4 h-4 text-[#99918A] shrink-0" strokeWidth={1.75} />
          <span className="truncate-safe text-[13.5px]">Cài đặt sư phạm</span>
        </button>

        {onOpenTour && (
          <button
            onClick={() => {
              onOpenTour();
              setIsSidebarOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-body-ui min-h-[38px] text-[#706A65] hover:text-[#7A2938] hover:bg-[#FCF3F4] transition-colors duration-150 flex items-center gap-3 font-normal"
          >
            <HelpCircle className="w-4 h-4 text-[#7A2938] shrink-0" strokeWidth={1.75} />
            <span className="truncate-safe text-[13.5px]">Hướng dẫn sử dụng</span>
          </button>
        )}

        <button
          onClick={() => {
            setActiveModule('typography_test');
            setIsSidebarOpen(false);
          }}
          className={`w-full text-left px-3 py-2 rounded-lg text-body-ui min-h-[38px] transition-colors duration-150 flex items-center gap-3 relative ${
            activeModule === 'typography_test'
              ? 'bg-[#FCF3F4] text-[#7A2938] font-semibold'
              : 'text-[#706A65] hover:text-[#211E1C] hover:bg-[#FAF9F7] font-normal'
          }`}
          title="Kiểm thử Typography hệ thống"
        >
          {activeModule === 'typography_test' && (
            <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-[#7A2938]" />
          )}
          <HelpCircle className="w-4 h-4 text-[#99918A] shrink-0" strokeWidth={1.75} />
          <span className="truncate-safe text-[13.5px]">Typography Test</span>
        </button>
      </nav>

      {/* Global owner identity; lesson-specific teacher data stays in the lesson. */}
      <div className="p-3 border-t border-[var(--color-border-default)] bg-[var(--color-surface-subtle)] shrink-0">
        <a
          href="#/about"
          onClick={() => setIsSidebarOpen(false)}
          aria-label={`Chủ sở hữu & quản lý: ${ownerProfile.fullName}. Xem thông tin chủ sở hữu`}
          className="block rounded-lg p-1 text-[var(--color-text-primary)] hover:bg-[var(--color-brand-50)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-700)]"
        >
          <span className="block text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)] mb-2">Chủ sở hữu &amp; quản lý</span>
          <span className="flex items-start gap-2.5">
            <span aria-hidden="true" className="w-8 h-8 rounded-full bg-[var(--color-brand-50)] border border-[var(--color-brand-200)] flex items-center justify-center text-[var(--color-brand-700)] shrink-0 font-serif font-bold text-xs">TĐ</span>
            <span className="min-w-0">
              <span className="text-[13px] font-semibold block">{ownerProfile.fullName}</span>
              <span className="text-[11px] text-[var(--color-text-secondary)] block mt-0.5">{ownerProfile.role}</span>
              <span className="text-[11px] text-[var(--color-text-secondary)] block mt-1 leading-relaxed">{ownerProfile.institution}</span>
              <span className="text-[11px] text-[var(--color-text-secondary)] block mt-1 leading-relaxed">{ownerProfile.address}</span>
              <span className="text-[11px] text-[var(--color-brand-700)] block mt-2">Xem thông tin chủ sở hữu →</span>
            </span>
          </span>
        </a>
      </div>
    </aside>
  );
};
