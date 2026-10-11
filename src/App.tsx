import React, { useState, useEffect } from 'react';
import { 
  ActiveModule, 
  AppState, 
  LessonPlan5512, 
  Exam7991Data, 
  SlideItem, 
  LiteratureLesson, 
  LiteratureQuestionItem, 
  RubricData,
  WorkspaceSettings 
} from './types';
import { initialAppState } from './data/presets';
import { AboutPage } from './components/about/AboutPage';
import { ownerProfile, systemInfo } from './config/ownerProfile';
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
import { GuidedTourProvider, useTour } from './components/tour';
import { PersonalWorkspaceCenter } from './components/PersonalWorkspaceCenter';
import { DEFAULT_WORKSPACE_SETTINGS } from './config/defaultSettings';
import { applyWorkspaceSettingsToDom } from './utils/themeManager';
import { normalizeDeepNFC, normalizeVietnamese } from './utils/unicode';
import { CheckCircle2 } from 'lucide-react';

export const STORAGE_KEY = 'edumaster_app_state_v3';

const VALID_MODULES: ActiveModule[] = [
  'dashboard', 'workspace', 'genre_analysis', 'khbd', 
  'question_builder', 'rubric', 'slides', 'exam', 
  'matrix', 'export_handover', 'typography_test', 'about'
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
          workspaceSettings: parsed.workspaceSettings || DEFAULT_WORKSPACE_SETTINGS,
          lastUpdated: parsed.lastUpdated || new Date().toISOString()
        };
      }
    } catch (e) {
      console.warn('Lỗi đọc dữ liệu từ localStorage:', e);
    }
  }
  return {
    ...initialAppState,
    workspaceSettings: DEFAULT_WORKSPACE_SETTINGS,
    activeModule: initMod
  };
};

function TourConsumerShell({
  children,
}: {
  children: (openTour: () => void) => React.ReactNode;
}) {
  const { openTour } = useTour();
  return <>{children(openTour)}</>;
}

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

  // Áp dụng cài đặt giao diện ra DOM realtime
  useEffect(() => {
    applyWorkspaceSettingsToDom(appState.workspaceSettings || DEFAULT_WORKSPACE_SETTINGS);
  }, [appState.workspaceSettings]);

  // Updaters
  const handleUpdateWorkspaceSettings = (settings: WorkspaceSettings) => {
    setAppState(prev => ({
      ...prev,
      workspaceSettings: settings,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleUpdateKhbdInfo = (patch: Partial<LessonPlan5512['info']>) => {
    setKhbd(prev => ({
      ...prev,
      info: {
        ...prev.info,
        ...patch
      }
    }));
  };

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
    <GuidedTourProvider
      currentModule={appState.activeModule}
      setActiveModule={setActiveModule}
    >
      <TourConsumerShell>
        {(openTour) => (
          <div className="h-screen w-screen overflow-hidden flex bg-[#FAF8F5] text-[#292524] antialiased app-shell">
            {/* Mobile Backdrop */}
            {isSidebarOpen && (
              <div 
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 z-30 bg-stone-900/40 backdrop-blur-2xs lg:hidden anim-modal-backdrop"
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
                onOpenTour={openTour}
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
                onOpenTour={openTour}
                lastUpdated={appState.lastUpdated}
              />

        {/* Workspace Body */}
        <main className="flex-1 min-h-0 overflow-hidden flex flex-col w-full relative">
          {appState.activeModule === 'about' && <AboutPage />}
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
              presentationSettings={appState.slidePresentationSettings}
              onUpdatePresentationSettings={(settings) => {
                setAppState(prev => ({
                  ...prev,
                  slidePresentationSettings: settings,
                  lastUpdated: new Date().toISOString()
                }));
              }}
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
        <footer className="app-owner-footer">
          <span>{systemInfo.name} · {ownerProfile.fullName}</span>
          <a href="#/about">Giới thiệu &amp; Chủ sở hữu</a>
        </footer>
      </div>

      {/* Trung tâm Không gian Làm việc Cá nhân (Settings Hub) */}
      <PersonalWorkspaceCenter
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        appState={appState}
        onUpdateSettings={handleUpdateWorkspaceSettings}
        onUpdateKhbdInfo={handleUpdateKhbdInfo}
        onTriggerTour={openTour}
        onOpenAbout={() => { setIsSettingsOpen(false); window.location.hash = '#/about'; }}
      />

      {/* Toast Notification (Mục 46 design_animation.md) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#292524] text-white px-4 py-3 rounded-xl shadow-xl text-body-ui border border-[#44403C] anim-toast">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 anim-success-check" />
          <span>{toastMessage}</span>
        </div>
      )}
          </div>
        )}
      </TourConsumerShell>
    </GuidedTourProvider>
  );
}
