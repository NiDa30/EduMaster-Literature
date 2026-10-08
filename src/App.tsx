import React, { useState, useEffect } from 'react';
import { 
  ActiveModule, 
  AppState, 
  LessonPlan5512, 
  Exam7991Data, 
  SlideItem, 
  LiteratureLesson, 
  LiteratureQuestionItem, 
  RubricData 
} from './types';
import { initialAppState } from './data/presets';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { TeacherDashboard } from './components/TeacherDashboard';
import { LiteratureReader } from './components/LiteratureWorkspace/LiteratureReader';
import { GenreAnalysisView } from './components/LiteratureWorkspace/GenreAnalysisView';
import { QuestionBuilderView } from './components/LiteratureWorkspace/QuestionBuilderView';
import { RubricBuilderView } from './components/LiteratureWorkspace/RubricBuilderView';
import { KhbdView } from './components/KhbdView';
import { SlidesView } from './components/SlidesView';
import { Exam7991View } from './components/Exam7991View';
import { MatrixView } from './components/MatrixView';
import { ExportHandoverView } from './components/ExportHandoverView';
import { TypographyTestView } from './components/TypographyTestView';
import { normalizeDeepNFC, normalizeVietnamese } from './utils/unicode';
import { X, CheckCircle2 } from 'lucide-react';

export const STORAGE_KEY = 'edumaster_app_state_v3';

const VALID_MODULES: ActiveModule[] = [
  'dashboard', 'workspace', 'genre_analysis', 'khbd', 
  'question_builder', 'rubric', 'slides', 'exam', 
  'matrix', 'export_handover', 'typography_test'
];

export const resolveModuleAlias = (hash: string): ActiveModule | null => {
  const clean = hash.replace(/^#\/?/, '').trim().toLowerCase();
  if (VALID_MODULES.includes(clean as ActiveModule)) return clean as ActiveModule;
  if (clean === 'reader') return 'workspace';
  if (clean === 'genre') return 'genre_analysis';
  if (clean === 'questions') return 'question_builder';
  if (clean === 'export') return 'export_handover';
  if (clean === 'typographytest' || clean === 'typography_test') return 'typography_test';
  return null;
};

const getInitialModule = (): ActiveModule => {
  if (typeof window !== 'undefined') {
    const rawHash = window.location.hash;
    const resolved = resolveModuleAlias(rawHash);
    if (resolved) return resolved;

    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    if (path.includes('typographytest') || search.includes('typography_test')) {
      return 'typography_test';
    }
  }
  return initialAppState.activeModule;
};

const loadInitialState = (): AppState => {
  const initMod = getInitialModule();
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // Merge preset lessons if cached lessons lack bundled packages
        const mergedLessons = (parsed.lessons && Array.isArray(parsed.lessons) ? parsed.lessons : initialAppState.lessons).map((l: LiteratureLesson) => {
          const presetMatch = initialAppState.lessons.find(p => p.id === l.id);
          if (presetMatch) {
            return {
              ...presetMatch,
              ...l,
              khbd: l.khbd || presetMatch.khbd,
              slides: l.slides || presetMatch.slides,
              exam: l.exam || presetMatch.exam,
              questions: l.questions || presetMatch.questions,
              rubric: l.rubric || presetMatch.rubric
            };
          }
          return l;
        });

        return {
          ...initialAppState,
          ...parsed,
          activeModule: initMod,
          lessons: mergedLessons,
          khbd: { ...initialAppState.khbd, ...(parsed.khbd || {}) },
          exam: { ...initialAppState.exam, ...(parsed.exam || {}) },
          rubric: { ...initialAppState.rubric, ...(parsed.rubric || {}) },
          slides: parsed.slides && Array.isArray(parsed.slides) ? parsed.slides : initialAppState.slides,
          questions: parsed.questions && Array.isArray(parsed.questions) ? parsed.questions : initialAppState.questions,
          lastUpdated: parsed.lastUpdated || new Date().toISOString()
        };
      }
    } catch (e) {
      console.warn('Lỗi đọc dữ liệu từ localStorage:', e);
    }
  }
  return {
    ...initialAppState,
    activeModule: initMod
  };
};

export default function App() {
  const [appState, setAppState] = useState<AppState>(loadInitialState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [prefilledPassage, setPrefilledPassage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentLesson = appState.lessons.find(l => l.id === appState.currentLessonId) || appState.lessons[0];

  // Đồng bộ hash URL với activeModule
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentHash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
      if (currentHash !== appState.activeModule) {
        window.location.hash = `#/${appState.activeModule}`;
      }
    }
  }, [appState.activeModule]);

  // Lắng nghe thay đổi hash từ browser (Back/Forward) bao gồm alias
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash;
      const resolved = resolveModuleAlias(rawHash);
      if (resolved) {
        setAppState(prev => {
          if (prev.activeModule === resolved) return prev;
          return { ...prev, activeModule: resolved };
        });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Tự động lưu vào localStorage khi appState thay đổi (debounced 300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
      } catch (err) {
        console.error('Lỗi khi tự động lưu dữ liệu vào localStorage:', err);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [appState]);

  // Updaters
  const setActiveModule = (mod: ActiveModule) => {
    setAppState(prev => ({
      ...prev,
      activeModule: mod,
      lastUpdated: new Date().toISOString()
    }));
  };

  const setKhbd = (value: React.SetStateAction<LessonPlan5512>) => {
    setAppState(prev => ({
      ...prev,
      khbd: typeof value === 'function' ? value(prev.khbd) : value,
      lastUpdated: new Date().toISOString()
    }));
  };

  const setExam = (value: React.SetStateAction<Exam7991Data>) => {
    setAppState(prev => ({
      ...prev,
      exam: typeof value === 'function' ? value(prev.exam) : value,
      lastUpdated: new Date().toISOString()
    }));
  };

  const setSlides = (value: React.SetStateAction<SlideItem[]>) => {
    setAppState(prev => ({
      ...prev,
      slides: typeof value === 'function' ? value(prev.slides) : value,
      lastUpdated: new Date().toISOString()
    }));
  };

  const setQuestions = (value: React.SetStateAction<LiteratureQuestionItem[]>) => {
    setAppState(prev => ({
      ...prev,
      questions: typeof value === 'function' ? value(prev.questions) : value,
      lastUpdated: new Date().toISOString()
    }));
  };

  const setRubric = (value: React.SetStateAction<RubricData>) => {
    setAppState(prev => ({
      ...prev,
      rubric: typeof value === 'function' ? value(prev.rubric) : value,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleUpdateCurrentLesson = (updated: Partial<LiteratureLesson>) => {
    setAppState(prev => ({
      ...prev,
      lessons: prev.lessons.map(l => l.id === prev.currentLessonId ? { ...l, ...updated } : l),
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleSelectLesson = (lessonId: string) => {
    const target = appState.lessons.find(l => l.id === lessonId);
    if (!target) return;

    setAppState(prev => {
      // 1. Lưu lại gói tài liệu hiện tại của bài học trước khi chuyển
      const updatedLessons = prev.lessons.map(l => {
        if (l.id === prev.currentLessonId) {
          return {
            ...l,
            khbd: prev.khbd,
            slides: prev.slides,
            exam: prev.exam,
            questions: prev.questions,
            rubric: prev.rubric
          };
        }
        return l;
      });

      // 2. Tìm bài học mục tiêu từ danh sách đã cập nhật
      const currentTarget = updatedLessons.find(l => l.id === lessonId) || target;

      // 3. Tải các gói tài liệu độc lập của bài học mục tiêu
      const targetKhbd: LessonPlan5512 = currentTarget.khbd || {
        ...prev.khbd,
        info: {
          ...prev.khbd.info,
          lessonTitle: `${currentTarget.title} (${currentTarget.author})`,
          grade: currentTarget.grade || prev.khbd.info.grade,
          textbook: currentTarget.textbook || prev.khbd.info.textbook
        }
      };
      const targetSlides: SlideItem[] = currentTarget.slides || prev.slides;
      const targetExam: Exam7991Data = currentTarget.exam || prev.exam;
      const targetQuestions: LiteratureQuestionItem[] = currentTarget.questions || prev.questions;
      const targetRubric: RubricData = currentTarget.rubric || prev.rubric;

      return {
        ...prev,
        lessons: updatedLessons,
        currentLessonId: lessonId,
        khbd: targetKhbd,
        slides: targetSlides,
        exam: targetExam,
        questions: targetQuestions,
        rubric: targetRubric,
        lastUpdated: new Date().toISOString()
      };
    });

    setToastMessage(`Đã chuyển sang tác phẩm "${target.title} (${target.author})". Dữ liệu KHBD, Slide và Đề đã được đồng bộ.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateLesson = (newLesson: LiteratureLesson) => {
    setAppState(prev => {
      // Lưu lại bài học hiện tại trước khi tạo mới
      const updatedLessons = prev.lessons.map(l => {
        if (l.id === prev.currentLessonId) {
          return {
            ...l,
            khbd: prev.khbd,
            slides: prev.slides,
            exam: prev.exam,
            questions: prev.questions,
            rubric: prev.rubric
          };
        }
        return l;
      });

      return {
        ...prev,
        lessons: [newLesson, ...updatedLessons],
        currentLessonId: newLesson.id,
        khbd: newLesson.khbd || prev.khbd,
        slides: newLesson.slides || prev.slides,
        exam: newLesson.exam || prev.exam,
        questions: newLesson.questions || prev.questions,
        rubric: newLesson.rubric || prev.rubric,
        activeModule: 'workspace',
        lastUpdated: new Date().toISOString()
      };
    });

    setToastMessage(`Đã khởi tạo thành công bài dạy "${newLesson.title}". Bắt đầu soạn bài.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddToKhbd = (content: string, title?: string) => {
    setKhbd(prev => {
      const activities = [...prev.activities];
      if (activities.length > 1) {
        activities[1] = {
          ...activities[1],
          content: `${activities[1].content}\n\n• ${title ? title + ': ' : ''}${normalizeVietnamese(content)}`
        };
      }
      return {
        ...prev,
        activities
      };
    });
    setToastMessage(`Đã đưa ngữ liệu phân tích vào Hoạt động Khám phá của KHBD 5512.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Cross-module connectors
  const handleAddSlideFromQuote = (quote: string, author: string) => {
    const newSlide: SlideItem = {
      id: `slide-${Date.now()}`,
      title: 'Trích đoạn Khám phá & Thảo luận',
      phaseTag: 'Kiến thức mới',
      layout: 'quote',
      contentLeft: 'Phân tích vẻ đẹp ngôn từ và cảm hứng nghệ thuật trong đoạn trích.',
      quoteText: normalizeVietnamese(quote),
      quoteAuthor: normalizeVietnamese(author),
      discussionQuestion: 'Cảm nhận của em về chi tiết nghệ thuật hoặc hình tượng trong câu thơ/đoạn trích trên?',
      speakerNotes: 'Cho học sinh 2 phút thảo luận nhóm đôi và nhận xét biện pháp tu từ.'
    };
    setSlides(prev => [...prev, newSlide]);
  };

  const handleAddQuestionFromPassage = (passage: string) => {
    setPrefilledPassage(normalizeVietnamese(passage));
    setActiveModule('question_builder');
  };

  const handleSetExamPassage = (passage: string) => {
    setExam(prev => ({
      ...prev,
      passageRef: normalizeVietnamese(passage)
    }));
  };

  const handleRestoreState = (newState: AppState) => {
    const normalized = normalizeDeepNFC(newState);
    setAppState({
      ...normalized,
      lastUpdated: new Date().toISOString()
    });
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#FAF8F5] text-[#292524] antialiased app-shell">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-stone-900/40 backdrop-blur-2xs lg:hidden"
        />
      )}

      {/* 248px Workspace Sidebar (hidden in Focus Mode) */}
      {!isFocusMode && (
        <Sidebar
          activeModule={appState.activeModule}
          setActiveModule={setActiveModule}
          khbd={appState.khbd}
          setKhbd={setKhbd}
          exam={appState.exam}
          setExam={setExam}
          slides={appState.slides}
          setSlides={setSlides}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          onOpenHandover={() => setActiveModule('export_handover')}
          onOpenSettings={() => setIsSettingsOpen(true)}
          lessons={appState.lessons}
          currentLessonId={appState.currentLessonId}
          onSelectLesson={handleSelectLesson}
        />
      )}

      {/* Flexible Literary Workspace Area (calc(100vh - 56px)) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden workspace-viewport">
        {/* Editorial TopBar (56px) */}
        <TopBar
          currentLesson={currentLesson}
          lessons={appState.lessons}
          onSelectLesson={handleSelectLesson}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          isFocusMode={isFocusMode}
          onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
          onPreview={() => window.print()}
          khbd={appState.khbd}
          exam={appState.exam}
          slides={appState.slides}
          onOpenHandover={() => setActiveModule('export_handover')}
          lastUpdated={appState.lastUpdated}
        />

        {/* Workspace Body */}
        <main className="flex-1 min-h-0 overflow-hidden flex flex-col w-full relative">
          {appState.activeModule === 'dashboard' && (
            <TeacherDashboard
              lessons={appState.lessons}
              currentLessonId={appState.currentLessonId}
              onSelectLesson={handleSelectLesson}
              setActiveModule={setActiveModule}
              khbd={appState.khbd}
              onCreateLesson={handleCreateLesson}
            />
          )}

          {appState.activeModule === 'workspace' && (
            <LiteratureReader
              lesson={currentLesson}
              onUpdateLesson={handleUpdateCurrentLesson}
              setActiveModule={setActiveModule}
              onAddSlideFromQuote={handleAddSlideFromQuote}
              onAddQuestionFromPassage={handleAddQuestionFromPassage}
              onSetExamPassage={handleSetExamPassage}
              isFocusMode={isFocusMode}
              onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
            />
          )}

          {appState.activeModule === 'genre_analysis' && (
            <GenreAnalysisView
              lesson={currentLesson}
              onUpdateLesson={handleUpdateCurrentLesson}
              setActiveModule={setActiveModule}
              onAddSlideFromQuote={handleAddSlideFromQuote}
              onAddQuestionFromPassage={handleAddQuestionFromPassage}
              onAddToKhbd={handleAddToKhbd}
            />
          )}

          {appState.activeModule === 'khbd' && (
            <KhbdView
              khbd={appState.khbd}
              setKhbd={setKhbd}
              setActiveModule={setActiveModule}
              onAddSlideFromActivity={(name, content) => handleAddSlideFromQuote(content, name)}
            />
          )}

          {appState.activeModule === 'question_builder' && (
            <QuestionBuilderView
              questions={appState.questions}
              setQuestions={setQuestions}
              exam={appState.exam}
              setExam={setExam}
              setActiveModule={setActiveModule}
              defaultPassage={prefilledPassage}
            />
          )}

          {appState.activeModule === 'rubric' && (
            <RubricBuilderView
              rubric={appState.rubric}
              setRubric={setRubric}
            />
          )}

          {appState.activeModule === 'slides' && (
            <SlidesView
              slides={appState.slides}
              setSlides={setSlides}
              lessonTitle={appState.khbd.info.lessonTitle}
            />
          )}

          {appState.activeModule === 'exam' && (
            <Exam7991View
              exam={appState.exam}
              setExam={setExam}
              khbd={appState.khbd}
            />
          )}

          {appState.activeModule === 'matrix' && (
            <MatrixView
              exam={appState.exam}
              khbd={appState.khbd}
            />
          )}

          {appState.activeModule === 'export_handover' && (
            <ExportHandoverView
              appState={appState}
              onRestoreState={handleRestoreState}
            />
          )}

          {appState.activeModule === 'typography_test' && (
            <TypographyTestView />
          )}
        </main>
      </div>

      {/* Settings Modal (Cài đặt thông tin Giáo viên & Trường) */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E7E5E4] max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <h3 className="text-card-title text-[#292524]">
                Cài đặt & Thông tin Giáo viên
              </h3>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-[#78716C] hover:text-[#292524] p-1.5 rounded-lg transition-colors"
                aria-label="Đóng cài đặt"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="space-y-3 text-meta">
              <div>
                <label className="block font-medium text-[#57534E] mb-1">Sở Giáo dục & Đào tạo</label>
                <input
                  type="text"
                  value={appState.khbd.info.department}
                  onChange={(e) => {
                    const val = normalizeVietnamese(e.target.value);
                    setKhbd(prev => ({
                      ...prev,
                      info: { ...prev.info, department: val }
                    }));
                  }}
                  className="w-full px-3 py-2 border border-[#E7E5E4] rounded-lg text-body-ui text-[#292524] focus:outline-none focus:border-[#7C2D37]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#57534E] mb-1">Trường THPT</label>
                <input
                  type="text"
                  value={appState.khbd.info.school}
                  onChange={(e) => {
                    const val = normalizeVietnamese(e.target.value);
                    setKhbd(prev => ({
                      ...prev,
                      info: { ...prev.info, school: val }
                    }));
                  }}
                  className="w-full px-3 py-2 border border-[#E7E5E4] rounded-lg text-body-ui text-[#292524] focus:outline-none focus:border-[#7C2D37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#57534E] mb-1">Giáo viên phụ trách</label>
                  <input
                    type="text"
                    value={appState.khbd.info.teacherName}
                    onChange={(e) => {
                      const val = normalizeVietnamese(e.target.value);
                      setKhbd(prev => ({
                        ...prev,
                        info: { ...prev.info, teacherName: val }
                      }));
                    }}
                    className="w-full px-3 py-2 border border-[#E7E5E4] rounded-lg text-body-ui text-[#292524] focus:outline-none focus:border-[#7C2D37]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#57534E] mb-1">Tổ chuyên môn</label>
                  <input
                    type="text"
                    value={appState.khbd.info.subjectGroup}
                    onChange={(e) => {
                      const val = normalizeVietnamese(e.target.value);
                      setKhbd(prev => ({
                        ...prev,
                        info: { ...prev.info, subjectGroup: val }
                      }));
                    }}
                    className="w-full px-3 py-2 border border-[#E7E5E4] rounded-lg text-body-ui text-[#292524] focus:outline-none focus:border-[#7C2D37]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="btn-primary"
              >
                Lưu và đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#292524] text-white px-4 py-3 rounded-xl shadow-xl text-body-ui border border-[#44403C] animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
