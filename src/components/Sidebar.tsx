import React, { useState } from 'react';
import { 
  Home,
  BookOpen, 
  Feather, 
  FileText, 
  Presentation, 
  CheckSquare, 
  Grid3X3, 
  Share2, 
  Download, 
  Printer, 
  Sparkles, 
  GraduationCap, 
  ChevronRight, 
  School, 
  CheckCircle2, 
  FileCode2, 
  Compass, 
  HelpCircle,
  BookMarked
} from 'lucide-react';
import { ActiveModule, LessonPlan5512, Exam7991Data, SlideItem, LiteratureLesson } from '../types';
import { exportWordKHBD, exportWordExam7991, exportHtmlSlides } from '../utils/exportUtils';

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
  lessons: LiteratureLesson[];
  currentLessonId: string;
  onSelectLesson: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  setActiveModule,
  khbd,
  setKhbd,
  exam,
  setExam,
  slides,
  setSlides,
  isSidebarOpen,
  setIsSidebarOpen,
  onOpenHandover,
  lessons,
  currentLessonId,
  onSelectLesson
}) => {
  const [showAdminEdit, setShowAdminEdit] = useState(false);

  const currentLesson = lessons.find(l => l.id === currentLessonId) || lessons[0];

  const modules = [
    {
      id: 'dashboard' as ActiveModule,
      name: 'Bàn làm việc Giáo viên',
      standard: 'Teacher Workspace',
      badge: 'Tổng quan',
      icon: Home,
      color: 'text-stone-700',
      activeBg: 'bg-stone-100 border-[#7C2D37] text-stone-900'
    },
    {
      id: 'workspace' as ActiveModule,
      name: 'Không gian Đọc & Chú giải',
      standard: 'Literature Reader 3-Panel',
      badge: `${currentLesson?.annotations?.length || 5} ghi chú`,
      icon: BookOpen,
      color: 'text-[#7C2D37]',
      activeBg: 'bg-rose-50 border-[#7C2D37] text-[#7C2D37]'
    },
    {
      id: 'genre_analysis' as ActiveModule,
      name: 'Phân tích Thể loại',
      standard: 'Thơ / Truyện / Argument Map',
      badge: currentLesson?.genre === 'poetry' ? 'Thơ' : currentLesson?.genre === 'story' ? 'Truyện' : 'Nghị luận',
      icon: Compass,
      color: 'text-amber-700',
      activeBg: 'bg-amber-50 border-amber-700 text-amber-900'
    },
    {
      id: 'khbd' as ActiveModule,
      name: 'Kế hoạch bài dạy (KHBD)',
      standard: 'Visual Builder CV 5512',
      badge: '4 Hoạt động',
      icon: FileText,
      color: 'text-blue-700',
      activeBg: 'bg-blue-50 border-blue-700 text-blue-900'
    },
    {
      id: 'question_builder' as ActiveModule,
      name: 'Question Builder',
      standard: 'Ngữ liệu → Câu hỏi → Đáp án',
      badge: 'Ngân hàng',
      icon: HelpCircle,
      color: 'text-emerald-700',
      activeBg: 'bg-emerald-50 border-emerald-700 text-emerald-900'
    },
    {
      id: 'rubric' as ActiveModule,
      name: 'Rubric Chấm Tự luận',
      standard: 'Biểu điểm nghị luận GDPT 2018',
      badge: '10.0 đ',
      icon: GraduationCap,
      color: 'text-purple-700',
      activeBg: 'bg-purple-50 border-purple-700 text-purple-900'
    },
    {
      id: 'slides' as ActiveModule,
      name: 'Slide Storytelling',
      standard: 'Quote Slide & Trình chiếu',
      badge: `${slides.length} slides`,
      icon: Presentation,
      color: 'text-amber-700',
      activeBg: 'bg-amber-50 border-amber-700 text-amber-900'
    },
    {
      id: 'exam' as ActiveModule,
      name: 'Đề kiểm tra 4 phần',
      standard: 'Chuẩn Công văn 7991',
      badge: 'Barem 10.0',
      icon: CheckSquare,
      color: 'text-emerald-700',
      activeBg: 'bg-emerald-50 border-emerald-700 text-emerald-900'
    },
    {
      id: 'matrix' as ActiveModule,
      name: 'Ma trận & Bản đặc tả',
      standard: 'Tỉ lệ 40 - 30 - 30',
      badge: 'NB-TH-VD',
      icon: Grid3X3,
      color: 'text-purple-700',
      activeBg: 'bg-purple-50 border-purple-700 text-purple-900'
    },
    {
      id: 'export_handover' as ActiveModule,
      name: 'Xuất bản & JSON State',
      standard: 'Office Suite & Bàn giao',
      badge: 'Handover',
      icon: Share2,
      color: 'text-stone-700',
      activeBg: 'bg-stone-100 border-stone-800 text-stone-900'
    }
  ];

  return (
    <aside 
      className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-[360px] bg-white border-r border-stone-200 flex flex-col transition-transform duration-300 shadow-xl lg:shadow-none ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-stone-800 bg-[#1C1817] text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#7C2D37] flex items-center justify-center text-white shadow-md">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-base tracking-tight text-white">EduMaster Văn</span>
                <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded">
                  THPT
                </span>
              </div>
              <p className="text-[11px] text-stone-400">Teaching Workspace Ngữ văn</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
          >
            ✕
          </button>
        </div>

        {/* Current Lesson Indicator */}
        <div className="mt-3 p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-xs">
          <div className="text-stone-400 text-[10px] flex items-center justify-between uppercase">
            <span>TÁC PHẨM ĐANG SOẠN</span>
            <span className="text-amber-400 font-mono">{currentLesson.grade}</span>
          </div>
          <div className="font-serif font-bold text-stone-100 truncate mt-0.5">{currentLesson.title}</div>
          <div className="text-[11px] text-stone-300 mt-1 flex items-center gap-2">
            <span className="text-amber-300">Tác giả: {currentLesson.author}</span>
            <span>· {currentLesson.progress}%</span>
          </div>
        </div>
      </div>

      {/* Preset Lesson Quick Switcher */}
      <div className="p-3 bg-[#FAF8F5] border-b border-stone-200 text-xs">
        <div className="flex items-center justify-between mb-1.5 text-stone-700 font-medium">
          <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider">
            <BookMarked className="w-3.5 h-3.5 text-[#7C2D37]" />
            Chuyển tác phẩm mẫu:
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {lessons.map((l) => (
            <button
              key={l.id}
              onClick={() => onSelectLesson(l.id)}
              className={`px-2 py-1.5 rounded-lg border text-left transition truncate ${
                l.id === currentLessonId
                  ? 'bg-rose-50 border-[#7C2D37] text-[#7C2D37] font-bold'
                  : 'bg-white border-stone-200 hover:bg-stone-100 text-stone-700 font-medium'
              }`}
              title={`${l.title} (${l.genre === 'poetry' ? 'Thơ' : l.genre === 'story' ? 'Truyện' : 'Nghị luận'})`}
            >
              <div className="truncate text-[11px]">{l.title}</div>
              <div className="text-[9px] text-stone-400 font-sans">
                {l.genre === 'poetry' ? 'Thơ' : l.genre === 'story' ? 'Truyện' : 'Nghị luận'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Modules */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="px-2 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider font-sans">
          Chức năng Dạy học & Khảo thí
        </div>
        {modules.map((m) => {
          const Icon = m.icon;
          const isActive = activeModule === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                setActiveModule(m.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between group ${
                isActive 
                  ? `${m.activeBg} border-l-4 shadow-2xs` 
                  : 'bg-white hover:bg-stone-50 border-transparent text-stone-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white shadow-2xs' : 'bg-stone-100'} ${m.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-xs leading-tight text-stone-900 group-hover:text-[#7C2D37] transition">
                    {m.name}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">{m.standard}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-white text-stone-800 border border-stone-200' : 'bg-stone-100 text-stone-600'
                }`}>
                  {m.badge}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 transition ${isActive ? 'text-[#7C2D37] translate-x-0.5' : 'text-stone-300'}`} />
              </div>
            </button>
          );
        })}

        {/* Administrative Details Accordion */}
        <div className="pt-2">
          <button
            onClick={() => setShowAdminEdit(!showAdminEdit)}
            className="w-full px-3 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 rounded-xl flex items-center justify-between transition"
          >
            <span className="flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-stone-500" />
              Thông tin Giáo viên & Trường
            </span>
            <span className="text-[10px] text-[#7C2D37] font-semibold">{showAdminEdit ? 'Thu gọn' : 'Chỉnh sửa'}</span>
          </button>
          {showAdminEdit && (
            <div className="mt-2 p-3 bg-white border border-stone-200 rounded-xl space-y-2 text-xs shadow-xs">
              <div>
                <label className="text-[10px] font-semibold text-stone-600">Sở GD&ĐT</label>
                <input
                  type="text"
                  value={khbd.info.department}
                  onChange={(e) => setKhbd({ ...khbd, info: { ...khbd.info, department: e.target.value } })}
                  className="w-full mt-0.5 px-2 py-1 border border-stone-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-stone-600">Trường THPT</label>
                <input
                  type="text"
                  value={khbd.info.school}
                  onChange={(e) => setKhbd({ ...khbd, info: { ...khbd.info, school: e.target.value } })}
                  className="w-full mt-0.5 px-2 py-1 border border-stone-300 rounded text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-semibold text-stone-600">Giáo viên</label>
                  <input
                    type="text"
                    value={khbd.info.teacherName}
                    onChange={(e) => setKhbd({ ...khbd, info: { ...khbd.info, teacherName: e.target.value } })}
                    className="w-full mt-0.5 px-2 py-1 border border-stone-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-stone-600">Lớp phụ trách</label>
                  <input
                    type="text"
                    value={(khbd.info.assignedClasses || []).join(', ')}
                    onChange={(e) => setKhbd({ ...khbd, info: { ...khbd.info, assignedClasses: e.target.value.split(',').map(s => s.trim()) } })}
                    className="w-full mt-0.5 px-2 py-1 border border-stone-300 rounded text-xs"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fast Action Footer */}
      <div className="p-3 border-t border-stone-200 bg-white grid grid-cols-2 gap-2">
        <button
          onClick={() => exportWordKHBD(khbd)}
          className="px-2.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition border border-stone-200"
          title="Xuất kế hoạch bài dạy sang Microsoft Word (.doc)"
        >
          <Download className="w-3.5 h-3.5 text-[#7C2D37]" />
          <span>Word KHBD</span>
        </button>
        <button
          onClick={() => exportWordExam7991(exam, khbd)}
          className="px-2.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition border border-stone-200"
          title="Xuất đề thi chuẩ 7991 sang Microsoft Word (.doc)"
        >
          <Download className="w-3.5 h-3.5 text-emerald-700" />
          <span>Word Đề 7991</span>
        </button>
        <button
          onClick={() => window.print()}
          className="px-2.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
          title="In tài liệu định dạng chuẩn A4"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>In A4 / PDF</span>
        </button>
        <button
          onClick={onOpenHandover}
          className="px-2.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
          title="Mở khối JSON State bàn giao phiên"
        >
          <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
          <span>JSON State</span>
        </button>
      </div>
    </aside>
  );
};
