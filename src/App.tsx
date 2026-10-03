import React, { useState } from 'react';
import { 
  Menu, 
  BookOpen, 
  Feather, 
  Presentation, 
  CheckSquare, 
  Grid3X3, 
  Share2, 
  Download, 
  Printer, 
  Sparkles, 
  GraduationCap, 
  Clock, 
  CheckCircle2,
  FileText,
  Compass,
  HelpCircle,
  Home
} from 'lucide-react';
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
import { exportWordKHBD, exportWordExam7991, exportHtmlSlides } from './utils/exportUtils';

export default function App() {
  const [appState, setAppState] = useState<AppState>(initialAppState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prefilledPassage, setPrefilledPassage] = useState('');

  const currentLesson = appState.lessons.find(l => l.id === appState.currentLessonId) || appState.lessons[0];

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

    setAppState(prev => ({
      ...prev,
      currentLessonId: lessonId,
      khbd: {
        ...prev.khbd,
        info: {
          ...prev.khbd.info,
          lessonTitle: `${target.title.toUpperCase()} (${target.author.toUpperCase()})`
        }
      },
      lastUpdated: new Date().toISOString()
    }));
  };

  // Cross-module connectors
  const handleAddSlideFromQuote = (quote: string, author: string) => {
    const newSlide: SlideItem = {
      id: `slide-${Date.now()}`,
      title: 'TRÍCH ĐOẠN KHÁM PHÁ & THẢO LUẬN',
      phaseTag: 'Kiến thức mới',
      layout: 'quote',
      contentLeft: 'Phân tích vẻ đẹp ngôn từ và cảm hứng nghệ thuật trong đoạn trích.',
      quoteText: quote,
      quoteAuthor: author,
      discussionQuestion: 'Cảm nhận của em về chi tiết nghệ thuật hoặc hình tượng trong câu thơ/đoạn trích trên?',
      speakerNotes: 'Cho học sinh 2 phút thảo luận nhóm đôi và nhận xét biện pháp tu từ.'
    };
    setSlides(prev => [...prev, newSlide]);
  };

  const handleAddQuestionFromPassage = (passage: string) => {
    setPrefilledPassage(passage);
    setActiveModule('question_builder');
  };

  const handleSetExamPassage = (passage: string) => {
    setExam(prev => ({
      ...prev,
      passageRef: passage
    }));
  };

  const handleRestoreState = (newState: AppState) => {
    setAppState({
      ...newState,
      lastUpdated: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen flex bg-[#FAF8F5] text-[#1C1917]">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-stone-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Left Split-Pane: 360px Workspace Sidebar */}
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
        lessons={appState.lessons}
        currentLessonId={appState.currentLessonId}
        onSelectLesson={handleSelectLesson}
      />

      {/* Right Split-Pane: Flexible Literary Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-stone-200 px-4 md:px-8 py-3.5 flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              title="Mở menu điều khiển"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#7C2D37]/10 text-[#7C2D37] border border-[#7C2D37]/20 flex items-center gap-1 font-serif">
                  <Feather className="w-3 h-3" />
                  {appState.khbd.info.subject}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                  {currentLesson.grade}
                </span>
              </div>
              <h2 className="text-sm md:text-base font-bold font-serif text-stone-800 truncate max-w-xs md:max-w-md">
                {currentLesson.title} — {currentLesson.author}
              </h2>
            </div>
          </div>

          {/* Quick Actions & Autosave Indicator */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 text-[11px] text-stone-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Đã lưu tự động</span>
            </div>

            <button
              onClick={() => exportWordKHBD(appState.khbd)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold transition"
              title="Xuất kế hoạch bài dạy chuẩn 5512 sang Word"
            >
              <Download className="w-3.5 h-3.5 text-[#7C2D37]" />
              <span>Word 5512</span>
            </button>

            <button
              onClick={() => exportWordExam7991(appState.exam, appState.khbd)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold transition"
              title="Xuất đề kiểm tra chuẩn 7991 sang Word"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Word 7991</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 rounded-lg text-xs font-semibold transition"
              title="In trang A4"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">In A4</span>
            </button>
          </div>
        </header>

        {/* Workspace Body */}
        <main className="p-4 md:p-8 flex-1 max-w-7xl w-full mx-auto pb-16">
          {appState.activeModule === 'dashboard' && (
            <TeacherDashboard
              lessons={appState.lessons}
              currentLessonId={appState.currentLessonId}
              onSelectLesson={handleSelectLesson}
              setActiveModule={setActiveModule}
              khbd={appState.khbd}
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
            />
          )}

          {appState.activeModule === 'genre_analysis' && (
            <GenreAnalysisView
              lesson={currentLesson}
              onUpdateLesson={handleUpdateCurrentLesson}
              setActiveModule={setActiveModule}
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
        </main>
      </div>
    </div>
  );
}
