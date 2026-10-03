import React from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  CheckSquare, 
  Compass, 
  ArrowRight,
  Clock
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

  // 4 Quick Actions as specified
  const quickActions = [
    {
      id: 'workspace',
      title: 'Soạn bài',
      desc: 'Đọc và chú giải văn bản tác phẩm',
      icon: BookOpen,
      action: () => setActiveModule('workspace')
    },
    {
      id: 'genre_analysis',
      title: 'Phân tích văn bản',
      desc: 'Thi pháp Thơ, Truyện & Nghị luận',
      icon: Compass,
      action: () => setActiveModule('genre_analysis')
    },
    {
      id: 'question_builder',
      title: 'Tạo câu hỏi',
      desc: 'Ngữ liệu, câu hỏi & đáp án đọc hiểu',
      icon: HelpCircle,
      action: () => setActiveModule('question_builder')
    },
    {
      id: 'exam',
      title: 'Tạo đề',
      desc: 'Cấu trúc 4 phần chuẩn CV 7991',
      icon: CheckSquare,
      action: () => setActiveModule('exam')
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2">
      {/* Editorial Page Greeting */}
      <div>
        <h1 className="text-page-title">
          Bàn làm việc
        </h1>
        <p className="text-[14px] text-[#78716C] mt-1">
          Không gian giảng dạy và khảo thí Ngữ văn · {khbd.info.teacherName || 'Cô Lê Thị Lan Anh'}
        </p>
      </div>

      {/* KHU VỰC 1: TIẾP TỤC CÔNG VIỆC (1 card lớn duy nhất + ONE Primary Button) */}
      <section aria-labelledby="resume-heading">
        <div className="card-highlight p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[12px] font-medium text-[#7C2D37] tracking-wider uppercase">
                Tiếp tục công việc
              </span>

              <div>
                <h2 id="resume-heading" className="font-serif text-[24px] font-semibold text-[#292524] tracking-tight">
                  {currentLesson.title}
                </h2>
                <p className="text-[14px] text-[#57534E] mt-0.5">
                  {currentLesson.author} · Đang soạn KHBD 5512
                </p>
              </div>

              {/* Progress: 72% */}
              <div className="pt-2 flex items-center gap-3 max-w-md">
                <div className="flex-1 bg-[#E7E5E4] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#7C2D37] h-full rounded-full transition-all duration-300"
                    style={{ width: `${currentLesson.progress || 72}%` }}
                  />
                </div>
                <span className="text-[12px] font-medium text-[#57534E]">
                  {currentLesson.progress || 72}%
                </span>
              </div>
            </div>

            {/* The ONE Primary Action on the Dashboard */}
            <div>
              <button
                onClick={() => setActiveModule('workspace')}
                className="btn-primary text-[14px] py-2.5 px-5 shadow-2xs whitespace-nowrap"
              >
                <span>Tiếp tục</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* KHU VỰC 2: TẠO MỚI (4 Quick Actions) */}
      <section aria-labelledby="quick-actions-heading">
        <h2 id="quick-actions-heading" className="text-section-title mb-3">
          Tạo mới
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((qa) => {
            const Icon = qa.icon;
            return (
              <button
                key={qa.id}
                onClick={qa.action}
                className="card-interactive p-4 text-left group flex flex-col justify-between h-32"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-[#FBF4F5] text-[#57534E] group-hover:text-[#7C2D37] flex items-center justify-center transition-colors mb-2.5">
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-card-title group-hover:text-[#7C2D37] transition-colors">
                    {qa.title}
                  </h3>
                </div>
                <p className="text-[12px] text-[#78716C] line-clamp-1">
                  {qa.desc}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* KHU VỰC 3: BÀI HỌC GẦN ĐÂY (List / Row format, no grid card) */}
      <section aria-labelledby="recent-lessons-heading">
        <h2 id="recent-lessons-heading" className="text-section-title mb-3">
          Bài học gần đây
        </h2>

        <div className="card-surface divide-y divide-[#E7E5E4] overflow-hidden">
          {lessons.map((lesson) => {
            const isSelected = lesson.id === currentLessonId;
            return (
              <div
                key={lesson.id}
                onClick={() => {
                  onSelectLesson(lesson.id);
                  setActiveModule('workspace');
                }}
                className={`px-5 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50 transition-colors ${
                  isSelected ? 'bg-[#FBF4F5]/60' : ''
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-[16px] font-medium text-[#292524] truncate">
                      {lesson.title}
                    </h3>
                    {isSelected && (
                      <span className="text-[11px] font-medium text-[#7C2D37] bg-[#7C2D37]/10 px-2 py-0.5 rounded">
                        Đang chọn
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-[#78716C] mt-0.5">
                    {lesson.author} · {lesson.grade} ({lesson.textbook})
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[13px] text-[#57534E] shrink-0">
                  <Clock className="w-3.5 h-3.5 text-[#78716C]" strokeWidth={1.75} />
                  <span>{lesson.lastModified || 'Chỉnh sửa gần đây'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
