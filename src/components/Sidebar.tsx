import React from 'react';
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
  Feather
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
  onOpenSettings
}) => {
  // 7 core teaching & assessment navigation items
  const mainNavItems = [
    { id: 'dashboard' as ActiveModule, label: 'Bàn làm việc', icon: Home },
    { id: 'workspace' as ActiveModule, label: 'Tác phẩm', icon: BookOpen },
    { id: 'khbd' as ActiveModule, label: 'Kế hoạch bài dạy', icon: FileText },
    { id: 'question_builder' as ActiveModule, label: 'Câu hỏi', icon: HelpCircle },
    { id: 'exam' as ActiveModule, label: 'Đề kiểm tra', icon: CheckSquare },
    { id: 'matrix' as ActiveModule, label: 'Ma trận', icon: Grid3X3 },
    { id: 'slides' as ActiveModule, label: 'Slide', icon: Presentation },
  ];

  return (
    <aside 
      className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-[248px] bg-white border-r border-[#E7E5E4] flex flex-col transition-transform duration-200 ease-in-out ${
        isSidebarOpen ? 'translate-x-0 shadow-lg lg:shadow-none' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Workspace Header */}
      <div className="h-14 px-5 border-b border-[#E7E5E4] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[#7C2D37] flex items-center justify-center text-white">
            <Feather className="w-4 h-4" strokeWidth={1.75} />
          </div>
          <div>
            <span className="font-semibold text-[15px] tracking-normal text-[#292524]">
              EduMaster Văn
            </span>
          </div>
        </div>

        {/* Mobile close button */}
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden p-1.5 text-[#78716C] hover:text-[#292524] rounded-md transition-colors"
          aria-label="Đóng thanh điều hướng"
        >
          <X className="w-4 h-4" strokeWidth={1.75} />
        </button>
      </div>

      {/* Main Navigation (7 items) */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveModule(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-body-ui min-h-[40px] transition-colors flex items-center gap-3 ${
                isActive
                  ? 'bg-[#FBF4F5] text-[#7C2D37] font-medium border-l-[3px] border-[#7C2D37] pl-[9px]'
                  : 'text-[#57534E] hover:text-[#292524] hover:bg-stone-50 font-normal'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#7C2D37]' : 'text-[#78716C]'}`} strokeWidth={1.75} />
              <span className="truncate-safe">{item.label}</span>
            </button>
          );
        })}

        {/* Quiet divider */}
        <div className="pt-3 pb-2 px-2">
          <div className="h-px bg-[#E7E5E4] w-full" />
        </div>

        {/* Secondary Navigation */}
        <button
          onClick={() => {
            onOpenHandover();
            setIsSidebarOpen(false);
          }}
          className={`w-full text-left px-3 py-2 rounded-lg text-body-ui min-h-[40px] transition-colors flex items-center gap-3 ${
            activeModule === 'export_handover'
              ? 'bg-[#FBF4F5] text-[#7C2D37] font-medium border-l-[3px] border-[#7C2D37] pl-[9px]'
              : 'text-[#57534E] hover:text-[#292524] hover:bg-stone-50 font-normal'
          }`}
        >
          <Share2 className="w-4 h-4 text-[#78716C] shrink-0" strokeWidth={1.75} />
          <span className="truncate-safe">Xuất bản</span>
        </button>

        <button
          onClick={() => {
            if (onOpenSettings) onOpenSettings();
            setIsSidebarOpen(false);
          }}
          className="w-full text-left px-3 py-2 rounded-lg text-body-ui min-h-[40px] text-[#57534E] hover:text-[#292524] hover:bg-stone-50 transition-colors flex items-center gap-3 font-normal"
        >
          <Settings className="w-4 h-4 text-[#78716C] shrink-0" strokeWidth={1.75} />
          <span className="truncate-safe">Cài đặt</span>
        </button>

        <button
          onClick={() => {
            setActiveModule('typography_test');
            setIsSidebarOpen(false);
          }}
          className={`w-full text-left px-3 py-2 rounded-lg text-body-ui min-h-[40px] transition-colors flex items-center gap-3 ${
            activeModule === 'typography_test'
              ? 'bg-[#FBF4F5] text-[#7C2D37] font-medium border-l-[3px] border-[#7C2D37] pl-[9px]'
              : 'text-[#57534E] hover:text-[#292524] hover:bg-stone-50 font-normal'
          }`}
          title="Màn hình kiểm thử Typography"
        >
          <HelpCircle className="w-4 h-4 text-[#78716C] shrink-0" strokeWidth={1.75} />
          <span className="truncate-safe">Typography Test</span>
        </button>
      </nav>

      {/* Subtle Bottom Status */}
      <div className="p-3 border-t border-[#E7E5E4] text-metadata flex items-center justify-between">
        <span>THPT · GDPT 2018</span>
        <span className="text-[#57534E] tabular-nums">5512 & 7991</span>
      </div>
    </aside>
  );
};
