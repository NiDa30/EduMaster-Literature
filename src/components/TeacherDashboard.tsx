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
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6 max-w-6xl w-full mx-auto space-y-4 overflow-hidden">
      {/* Editorial Page Greeting with Semester/Grade indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div>
          <h1 className="text-page-title text-[24px] md:text-[28px]">
            Bàn làm việc
          </h1>
          <p className="text-body-ui text-[#78716C] mt-0.5">
            Không gian giảng dạy và khảo thí Ngữ văn · {khbd.info.teacherName || 'Cô Lê Thị Lan Anh'}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1 rounded-full text-metadata font-medium bg-stone-100 text-[#57534E] border border-stone-200">
            Học kỳ II · Lớp 10, 11, 12
          </span>
          <span className="px-2.5 py-1 rounded-full text-metadata font-semibold bg-[#7C2D37]/10 text-[#7C2D37] border border-[#7C2D37]/20">
            GDPT 2018
          </span>
        </div>
      </div>

      {/* Row 1: 2-Column Split (Tiếp tục công việc + 4 Quick Actions in 2x2) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 shrink-0">
        {/* KHU VỰC 1: TIẾP TỤC CÔNG VIỆC (Col 7 / 12) */}
        <section aria-labelledby="resume-heading" className="lg:col-span-7">
          <div className="card-highlight p-5 md:p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-metadata font-medium text-[#7C2D37]">
                  Tiếp tục công việc
                </span>
                <span className="text-metadata text-[#78716C]">
                  {currentLesson.grade} ({currentLesson.textbook})
                </span>
              </div>

              <div>
                <h2 id="resume-heading" className="font-serif text-[22px] md:text-[24px] font-semibold text-[#292524] tracking-normal">
                  {currentLesson.title}
                </h2>
                <p className="text-body-ui text-[#57534E] mt-0.5">
                  {currentLesson.author} · Đang soạn KHBD 5512
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
              {/* Progress bar */}
              <div className="flex-1 flex items-center gap-3">
                <div className="flex-1 bg-[#E7E5E4] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#7C2D37] h-full rounded-full transition-all duration-300"
                    style={{ width: `${currentLesson.progress || 72}%` }}
                  />
                </div>
                <span className="text-metadata font-medium text-[#57534E] tabular-nums">
                  {currentLesson.progress || 72}%
                </span>
              </div>

              {/* The ONE Primary Action on the Dashboard */}
              <button
                onClick={() => setActiveModule('workspace')}
                className="btn-primary py-2 px-4 whitespace-nowrap self-end sm:self-auto shrink-0"
              >
                <span>Tiếp tục</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </section>

        {/* KHU VỰC 2: TẠO MỚI (Col 5 / 12, 2x2 compact grid) */}
        <section aria-labelledby="quick-actions-heading" className="lg:col-span-5 flex flex-col">
          <div className="grid grid-cols-2 gap-2.5 h-full">
            {quickActions.map((qa) => {
              const Icon = qa.icon;
              return (
                <button
                  key={qa.id}
                  onClick={qa.action}
                  className="card-interactive p-3 text-left group flex flex-col justify-between min-h-[78px]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-stone-100 group-hover:bg-[#FBF4F5] text-[#57534E] group-hover:text-[#7C2D37] flex items-center justify-center transition-colors shrink-0">
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-card-title text-[14px] font-medium group-hover:text-[#7C2D37] transition-colors line-clamp-1">
                      {qa.title}
                    </h3>
                  </div>
                  <p className="text-metadata text-[12px] text-[#78716C] line-clamp-1 mt-1">
                    {qa.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Row 2: BÀI HỌC GẦN ĐÂY (Compact rows table with local scroll) */}
      <section aria-labelledby="recent-lessons-heading" className="flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between mb-2 shrink-0">
          <h2 id="recent-lessons-heading" className="text-card-title font-semibold text-[#292524]">
            Bài học gần đây
          </h2>
          <span className="text-metadata text-[#78716C]">
            {lessons.length} bài trong danh mục
          </span>
        </div>

        <div className="card-surface divide-y divide-[#E7E5E4] rounded-2xl flex-1 min-h-0 overflow-y-auto">
          {lessons.map((lesson) => {
            const isSelected = lesson.id === currentLessonId;
            return (
              <div
                key={lesson.id}
                onClick={() => {
                  onSelectLesson(lesson.id);
                  setActiveModule('workspace');
                }}
                className={`px-4 py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50 transition-colors ${
                  isSelected ? 'bg-[#FBF4F5]/60' : ''
                }`}
              >
                <div className="min-w-0 flex items-center gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-card-title font-medium text-[#292524] truncate-safe">
                        {lesson.title}
                      </h3>
                      {isSelected && (
                        <span className="text-metadata text-[11px] font-medium text-[#7C2D37] bg-[#7C2D37]/10 px-1.5 py-0.5 rounded">
                          Đang chọn
                        </span>
                      )}
                    </div>
                    <p className="text-metadata text-[12px] text-[#78716C] mt-0.5">
                      {lesson.author} · {lesson.grade} ({lesson.textbook})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-metadata text-[#57534E] shrink-0">
                  <div className="hidden sm:flex items-center gap-1.5 text-metadata text-[#78716C]">
                    <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span className="tabular-nums">{lesson.lastModified || 'Chỉnh sửa gần đây'}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#A8A29E] hover:text-[#7C2D37] transition-colors" strokeWidth={1.5} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
