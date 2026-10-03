import React from 'react';
import { 
  BookOpen, 
  Feather, 
  HelpCircle, 
  CheckSquare, 
  Presentation, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  BookMarked,
  GraduationCap,
  Layers,
  FileText,
  Compass,
  Edit3
} from 'lucide-react';
import { ActiveModule, LiteratureLesson, LessonPlan5512 } from '../types';

interface TeacherDashboardProps {
  lessons: LiteratureLesson[];
  currentLessonId: string;
  onSelectLesson: (id: string) => void;
  setActiveModule: (m: ActiveModule) => void;
  khbd: LessonPlan5512;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  lessons,
  currentLessonId,
  onSelectLesson,
  setActiveModule,
  khbd
}) => {
  const currentLesson = lessons.find(l => l.id === currentLessonId) || lessons[0];

  const quickActions = [
    {
      id: 'workspace',
      title: 'Soạn bài & Đọc hiểu văn bản',
      desc: 'Làm việc trực tiếp trên tác phẩm với công cụ chú giải, highlight và phân tích',
      icon: BookOpen,
      action: () => setActiveModule('workspace'),
      color: 'bg-[#7C2D37] text-white hover:bg-[#68232D]'
    },
    {
      id: 'genre',
      title: 'Phân tích Thể loại & Sơ đồ',
      desc: 'Khám phá đặc trưng Thơ, Truyện và Visual Argument Map cho Văn nghị luận',
      icon: Compass,
      action: () => setActiveModule('genre_analysis'),
      color: 'bg-amber-700 text-white hover:bg-amber-800'
    },
    {
      id: 'khbd',
      title: 'Thiết kế KHBD 5512',
      desc: 'Visual Lesson Builder 4 hoạt động chuẩn Công văn 5512 của Bộ GD&ĐT',
      icon: FileText,
      action: () => setActiveModule('khbd'),
      color: 'bg-blue-800 text-white hover:bg-blue-900'
    },
    {
      id: 'question',
      title: 'Tạo câu hỏi Đọc hiểu & Nghị luận',
      desc: 'Question Builder chuyên sâu theo ma trận nhận thức và kỹ năng đọc hiểu',
      icon: HelpCircle,
      action: () => setActiveModule('question_builder'),
      color: 'bg-emerald-800 text-white hover:bg-emerald-900'
    },
    {
      id: 'exam',
      title: 'Khảo thí & Đề thi 7991',
      desc: 'Cấu trúc 4 phần chuẩn Công văn 7991/BGDĐT-GDTrH mới nhất',
      icon: CheckSquare,
      action: () => setActiveModule('exam'),
      color: 'bg-indigo-800 text-white hover:bg-indigo-900'
    },
    {
      id: 'slides',
      title: 'Tạo bài giảng Slide Storytelling',
      desc: 'Slide trình chiếu nghệ thuật, Quote Slide & Visual Analysis Slide',
      icon: Presentation,
      action: () => setActiveModule('slides'),
      color: 'bg-stone-800 text-white hover:bg-stone-900'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Teacher Workspace Header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-50 via-rose-50 to-transparent -mr-20 -mt-20 rounded-full pointer-events-none opacity-70"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-stone-600 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#7C2D37]/10 text-[#7C2D37] border border-[#7C2D37]/20 flex items-center gap-1.5">
                <Feather className="w-3.5 h-3.5" />
                Môn Ngữ văn THPT
              </span>
              <span className="text-stone-300">·</span>
              <span>{khbd.info.grade}</span>
              <span className="text-stone-300">·</span>
              <span>{khbd.info.semester || 'Học kỳ I'}</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-700">Lớp phụ trách: {(khbd.info.assignedClasses || ['12 Văn', '12A1']).join(', ')}</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-stone-900 tracking-tight">
              Không gian Giảng dạy & Khảo thí Ngữ văn
            </h1>
            <p className="text-sm text-stone-600 mt-1.5 max-w-2xl leading-relaxed">
              Chào mừng cô <span className="font-semibold text-stone-800">{khbd.info.teacherName}</span>. 
              Hệ thống hỗ trợ toàn bộ hành trình sư phạm từ đọc hiểu tác phẩm, phân tích thi pháp, thiết kế KHBD 5512 đến ngân hàng câu hỏi và khảo thí 7991.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveModule('workspace')}
              className="px-4 py-2.5 rounded-xl bg-[#7C2D37] hover:bg-[#68232D] text-white font-medium text-xs flex items-center gap-2 shadow-sm transition"
            >
              <Edit3 className="w-4 h-4" />
              <span>Tiếp tục soạn bài</span>
            </button>
            <button
              onClick={() => setActiveModule('rubric')}
              className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 font-medium text-xs flex items-center gap-2 transition"
            >
              <GraduationCap className="w-4 h-4 text-stone-600" />
              <span>Rubric Chấm văn</span>
            </button>
          </div>
        </div>
      </div>

      {/* "CÔNG VIỆC ĐANG LÀM" (Resume Working Lesson Spotlight) */}
      {currentLesson && (
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-[#3C1D25] rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  ĐANG THỰC HIỆN
                </span>
                <span className="text-xs text-stone-300">
                  {currentLesson.genre === 'poetry' ? 'Thể loại: Thơ trữ tình' : currentLesson.genre === 'story' ? 'Thể loại: Truyện ngắn' : 'Thể loại: Văn nghị luận'}
                </span>
                <span className="text-stone-500">·</span>
                <span className="text-xs text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Chỉnh sửa {currentLesson.lastModified}
                </span>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
                  {currentLesson.title}
                </h2>
                <p className="text-stone-300 text-sm mt-1">
                  Tác giả: <span className="font-semibold text-amber-200">{currentLesson.author}</span> · {currentLesson.grade} ({currentLesson.textbook})
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${currentLesson.khbdStatus === 'ready' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                  <span>KHBD 5512: {currentLesson.khbdStatus === 'ready' ? 'Đã hoàn thiện' : 'Đang soạn'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${currentLesson.slideStatus === 'ready' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                  <span>Slide Bài giảng: {currentLesson.slideStatus === 'ready' ? 'Sẵn sàng' : 'Bản thảo'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${currentLesson.examStatus === 'ready' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                  <span>Đề kiểm tra 7991: {currentLesson.examStatus === 'ready' ? 'Đầy đủ 4 phần' : 'Đang cập nhật'}</span>
                </div>
              </div>
            </div>

            {/* Quick module jumps */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => setActiveModule('workspace')}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs flex items-center justify-center gap-1.5 shadow transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>Mở Workspace tác phẩm</span>
              </button>
              <button
                onClick={() => setActiveModule('genre_analysis')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center justify-center gap-1.5 border border-white/20 transition"
              >
                <Compass className="w-4 h-4" />
                <span>Xem Phân tích thể loại</span>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-4 text-xs text-stone-400">
            <span>Tiến độ bài dạy:</span>
            <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 to-rose-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${currentLesson.progress}%` }}
              ></div>
            </div>
            <span className="font-mono font-semibold text-white">{currentLesson.progress}%</span>
          </div>
        </div>
      )}

      {/* QUICK ACTIONS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Các công cụ dạy học trọng tâm
          </h2>
          <span className="text-xs text-stone-500">6 chức năng tích hợp đồng bộ dữ liệu</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((qa) => {
            const Icon = qa.icon;
            return (
              <div
                key={qa.id}
                onClick={qa.action}
                className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 hover:shadow-sm transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-[#7C2D37]/10 text-stone-700 group-hover:text-[#7C2D37] flex items-center justify-center mb-3 transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-stone-900 group-hover:text-[#7C2D37] transition">
                    {qa.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {qa.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#7C2D37]">
                  <span>Vào chức năng</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECENT LESSONS CARDS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-[#7C2D37]" />
              Kho tác phẩm & Bài giảng gần đây
            </h2>
            <p className="text-xs text-stone-500">Chuyển đổi linh hoạt giữa các tác phẩm mẫu thuộc 3 thể loại chuẩn</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {lessons.map((lesson) => {
            const isSelected = lesson.id === currentLessonId;
            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={`p-6 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50/40 border-[#7C2D37] ring-2 ring-[#7C2D37]/10 shadow-sm'
                    : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-stone-500">{lesson.grade} · {lesson.textbook}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      lesson.genre === 'poetry' 
                        ? 'bg-purple-100 text-purple-800' 
                        : lesson.genre === 'story' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {lesson.genre === 'poetry' ? 'Thơ' : lesson.genre === 'story' ? 'Truyện' : 'Nghị luận'}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-stone-900 mt-1">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-stone-600 italic mt-0.5">
                    Tác giả: {lesson.author}
                  </p>

                  <p className="text-xs text-stone-500 line-clamp-2 mt-2 leading-relaxed">
                    {lesson.authorBio}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100">
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mb-2">
                    <span>Tiến độ soạn:</span>
                    <span className="font-mono font-semibold text-stone-800">{lesson.progress}%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-3">
                    <div className="bg-[#7C2D37] h-full rounded-full" style={{ width: `${lesson.progress}%` }}></div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      {lesson.lastModified}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLesson(lesson.id);
                        setActiveModule('workspace');
                      }}
                      className="font-semibold text-[#7C2D37] hover:underline flex items-center gap-1"
                    >
                      Mở soạn bài <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
