import React, { useState, useEffect } from 'react';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  Download, 
  Plus, 
  Trash2, 
  CheckCircle, 
  HelpCircle, 
  Lightbulb, 
  Sparkles, 
  Quote, 
  Feather, 
  Heart, 
  Compass, 
  BookOpen 
} from 'lucide-react';
import { SlideItem } from '../types';
import { exportHtmlSlides } from '../utils/exportUtils';

interface SlidesViewProps {
  slides: SlideItem[];
  setSlides: React.Dispatch<React.SetStateAction<SlideItem[]>>;
  lessonTitle: string;
}

export const SlidesView: React.FC<SlidesViewProps> = ({ slides, setSlides, lessonTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentSlide = slides[currentIndex] || slides[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        setCurrentIndex(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, isFullscreen]);

  useEffect(() => {
    setSelectedQuizOption(null);
    setShowExplanation(false);
  }, [currentIndex]);

  const handleAddSlide = () => {
    const newSlide: SlideItem = {
      id: `slide-${Date.now()}`,
      title: 'TRÍCH ĐOẠN KHÁM PHÁ & THẢO LUẬN',
      phaseTag: 'Kiến thức mới',
      layout: 'quote',
      contentLeft: 'Đoạn trích tiêu biểu phục vụ gợi mở câu hỏi phân tích.',
      quoteText: 'Chiến trường đi chẳng tiếc đời xanh,\nÁo bào thay chiếu, anh về đất,\nSông Mã gầm lên khúc độc hành.',
      quoteAuthor: 'Quang Dũng - Tây Tiến',
      discussionQuestion: 'Hình ảnh "áo bào thay chiếu" và hành động "về đất" thể hiện vẻ đẹp bi tráng của người lính như thế nào?',
      speakerNotes: 'GV gợi ý học sinh thảo luận cặp đôi trong 2 phút.'
    };
    setSlides([...slides, newSlide]);
    setCurrentIndex(slides.length);
  };

  const handleDeleteSlide = (idx: number) => {
    if (slides.length <= 1) return;
    const nextSlides = slides.filter((_, i) => i !== idx);
    setSlides(nextSlides);
    setCurrentIndex(prev => Math.min(prev, nextSlides.length - 1));
  };

  const getTagColor = (tag: SlideItem['phaseTag']) => {
    switch (tag) {
      case 'Khởi động': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Kiến thức mới': return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'Luyện tập': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Vận dụng': return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default: return 'bg-stone-500/20 text-stone-300 border-stone-500/40';
    }
  };

  const renderSlideCanvas = (isFullscreenMode: boolean) => (
    <>
      {/* Slide Top Status */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className={`px-2.5 py-0.5 rounded-full text-metadata font-semibold border tracking-normal ${getTagColor(currentSlide.phaseTag)}`}>
            {currentSlide.phaseTag}
          </span>
          <span className="text-metadata text-stone-400 font-serif hidden sm:inline">
            Bài học: {lessonTitle}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-metadata tabular-nums px-2 py-0.5 rounded-lg bg-stone-800 text-stone-300 border border-stone-700">
            Slide {currentIndex + 1} / {slides.length}
          </span>
          {isFullscreenMode && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg min-h-[32px] min-w-[32px] flex items-center justify-center transition"
              title="Thoát toàn màn hình (Esc)"
            >
              <Minimize className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Slide Title */}
      <div className="mb-4 shrink-0">
        <h2 className="text-xl md:text-3xl font-serif font-semibold text-white leading-normal">
          {currentSlide.title}
        </h2>
      </div>

      {/* Slide Body by Layout */}
      <div className="flex-1 min-h-0 overflow-y-auto panel-scroll my-auto py-2">
        {/* LAYOUT 1: QUOTE SLIDE (ĐẶC TRƯNG NGỮ VĂN) */}
        {currentSlide.layout === 'quote' && currentSlide.quoteText ? (
          <div className="max-w-[760px] mx-auto p-6 md:p-8 rounded-2xl bg-stone-900/90 border border-amber-900/40 text-center shadow-xl space-y-4">
            <Quote className="w-8 h-8 text-amber-500/40 mx-auto" />
            <p className="text-lg md:text-xl font-serif italic text-amber-100 leading-[1.8] whitespace-pre-line">
              "{currentSlide.quoteText}"
            </p>
            <div className="text-metadata text-amber-400 font-medium">
              — {currentSlide.quoteAuthor || 'Trích tác phẩm'}
            </div>
            {currentSlide.discussionQuestion && (
              <div className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700 text-body-ui text-stone-300 font-sans text-left leading-relaxed">
                <strong className="text-amber-300 block mb-1 text-metadata font-semibold">Câu hỏi thảo luận & Khám phá:</strong>
                {currentSlide.discussionQuestion}
              </div>
            )}
          </div>
        ) : currentSlide.layout === 'visual_map' ? (
          /* LAYOUT 2: VISUAL ANALYSIS MAP SLIDE */
          <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-metadata font-semibold text-rose-400">
              <Heart className="w-4 h-4" />
              Sơ đồ Mạch cảm xúc & Cảm hứng sử thi
            </div>
            <p className="text-body-ui text-stone-200 font-serif leading-[1.8]">
              {currentSlide.contentLeft}
            </p>
            {currentSlide.bullets && (
              <div className="space-y-2.5 pt-1">
                {currentSlide.bullets.map((b, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 flex items-center gap-3 text-body-ui text-stone-200">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-semibold text-metadata shrink-0 tabular-nums">
                      {i + 1}
                    </span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : currentSlide.layout === 'split' ? (
          /* LAYOUT 3: SPLIT COMPARISON */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 shadow-inner">
              <p className="text-body-ui text-stone-200 leading-[1.8] mb-3 font-serif">
                {currentSlide.contentLeft}
              </p>
              {currentSlide.bullets && (
                <ul className="space-y-2 text-body-ui text-stone-300">
                  {currentSlide.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 font-semibold">✦</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 shadow-inner">
              <p className="text-body-ui text-stone-200 whitespace-pre-line leading-[1.8] font-serif">
                {currentSlide.contentRight}
              </p>
            </div>
          </div>
        ) : currentSlide.layout === 'cards' && currentSlide.cards ? (
          /* LAYOUT 4: THREE CHARACTER / VALUE CARDS */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentSlide.cards.map((c, i) => (
              <div key={i} className="bg-stone-900/90 p-5 rounded-2xl border border-stone-800 hover:border-amber-500/50 transition flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold mb-2.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-semibold text-card-title text-amber-200 mb-1.5">{c.title}</h3>
                  <p className="text-body-ui text-stone-300 leading-relaxed font-serif text-metadata">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : currentSlide.layout === 'quiz' && currentSlide.quizQuestion ? (
          /* LAYOUT 5: INTERACTIVE LITERARY QUIZ */
          <div className="max-w-2xl mx-auto bg-stone-900/90 p-6 rounded-2xl border border-stone-800 shadow-xl">
            <div className="flex items-center gap-2 text-metadata font-semibold text-amber-400 mb-2.5">
              <HelpCircle className="w-4 h-4" />
              Câu hỏi Tương tác Đọc hiểu
            </div>
            <p className="text-body-ui md:text-card-title font-serif font-medium text-white mb-4 leading-normal">
              {currentSlide.quizQuestion.question}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
              {currentSlide.quizQuestion.options.map((opt, i) => {
                const isSelected = selectedQuizOption === i;
                const isCorrect = i === currentSlide.quizQuestion?.correctIndex;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedQuizOption(i);
                      setShowExplanation(true);
                    }}
                    className={`p-3 min-h-[40px] rounded-xl border text-left text-metadata font-medium transition flex items-center justify-between ${
                      showExplanation && isCorrect
                        ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                        : showExplanation && isSelected && !isCorrect
                        ? 'bg-red-950/50 border-red-500 text-red-200'
                        : isSelected
                        ? 'bg-[#7C2D37]/50 border-[#7C2D37] text-white'
                        : 'bg-stone-950/70 border-stone-800 text-stone-200 hover:bg-stone-800'
                    }`}
                  >
                    <span>{opt}</span>
                    {showExplanation && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
            {showExplanation && (
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-metadata text-amber-200 leading-relaxed font-serif">
                <span className="font-semibold font-sans text-amber-400">Giải thích thi pháp: </span>
                {currentSlide.quizQuestion.explanation}
              </div>
            )}
          </div>
        ) : (
          /* DEFAULT SINGLE TEXT */
          <div className="max-w-2xl mx-auto bg-stone-900/80 p-6 rounded-2xl border border-stone-800">
            <p className="text-body-ui text-stone-200 leading-[1.8] font-serif mb-4">
              {currentSlide.contentLeft}
            </p>
            {currentSlide.bullets && (
              <ul className="space-y-2 text-body-ui text-stone-300">
                {currentSlide.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-amber-400 font-semibold">✦</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Slide Bottom Bar with Navigation Controls & Speaker Notes */}
      <div className="pt-3 mt-3 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 text-metadata text-stone-400 max-w-xl leading-relaxed">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="line-clamp-1"><strong className="text-stone-300 font-semibold">Ghi chú sư phạm:</strong> {currentSlide.speakerNotes}</span>
        </div>
        <div className="flex items-center gap-2 self-end">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
            disabled={currentIndex === 0}
            className="min-h-[36px] px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-white transition flex items-center gap-1 text-metadata font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Trước</span>
          </button>
          <button
            onClick={() => setCurrentIndex(prev => Math.min(prev + 1, slides.length - 1))}
            disabled={currentIndex === slides.length - 1}
            className="min-h-[36px] px-3 py-1.5 rounded-xl bg-[#7C2D37] hover:bg-[#68232D] disabled:opacity-30 disabled:cursor-not-allowed text-white transition flex items-center gap-1 text-metadata font-semibold"
          >
            <span>Tiếp</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#171413] p-6 overflow-hidden flex flex-col justify-between">
        {renderSlideCanvas(true)}
      </div>
    );
  }

  return (
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6 space-y-3 overflow-hidden">
      {/* Top Banner (shrink-0) */}
      <div className="bg-white p-3.5 md:p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-metadata font-semibold bg-amber-100 text-amber-900 border border-amber-200">
              Storytelling Presentation
            </span>
            <span className="text-metadata text-stone-500 font-medium hidden sm:inline">Slide Bài giảng Ngữ văn Nghệ thuật</span>
          </div>
          <h1 className="text-section md:text-page-title font-semibold text-stone-900 mt-1 leading-[1.3]">
            Slide Trình chiếu & Trích đoạn Văn học
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsFullscreen(true)}
            className="btn-secondary min-h-[36px] px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-metadata font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Maximize className="w-3.5 h-3.5" />
            <span>Trình chiếu F5</span>
          </button>
          <button
            onClick={() => exportHtmlSlides(slides, lessonTitle)}
            className="btn-primary min-h-[36px] px-3 py-1.5 bg-[#7C2D37] hover:bg-[#68232D] text-white rounded-xl text-metadata font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất PowerPoint</span>
          </button>
        </div>
      </div>

      {/* Main Workspace (Rule 29.16) */}
      <div className="flex-1 min-h-0 flex gap-4 overflow-hidden">
        {/* Left Thumbnails Column (160-180px, shrink-0) */}
        <div className="w-44 xl:w-52 shrink-0 card-surface p-2.5 flex flex-col gap-2 overflow-hidden">
          <div className="flex items-center justify-between pb-1 border-b border-stone-100 shrink-0">
            <span className="text-metadata font-semibold text-stone-800 flex items-center gap-1">
              <Presentation className="w-3.5 h-3.5 text-[#7C2D37]" />
              <span>Slides ({slides.length})</span>
            </span>
            <button
              onClick={handleAddSlide}
              className="p-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold flex items-center gap-0.5 transition"
              title="Thêm Slide mới"
            >
              <Plus className="w-3 h-3" />
              <span>Thêm</span>
            </button>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto space-y-2 panel-scroll pr-0.5">
            {slides.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => setCurrentIndex(idx)}
                className={`p-2 rounded-xl border cursor-pointer transition relative group ${
                  idx === currentIndex
                    ? 'border-[#7C2D37] ring-2 ring-[#7C2D37]/20 bg-rose-50/50'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-stone-700 tabular-nums">#{idx + 1}</span>
                  <span className="font-medium px-1 rounded bg-stone-100 text-stone-600 text-[10px]">
                    {s.phaseTag}
                  </span>
                </div>
                <div className="text-metadata font-serif font-medium text-stone-900 line-clamp-2 leading-snug">
                  {s.title}
                </div>
                {slides.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSlide(idx);
                    }}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 p-0.5 text-stone-400 hover:text-red-600 rounded bg-white shadow-xs transition"
                    title="Xóa slide"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center Main Slide Canvas */}
        <div className="flex-1 min-h-0 bg-[#1C1817] rounded-2xl p-4 md:p-6 border border-stone-800 text-stone-100 flex flex-col justify-between overflow-hidden shadow-xl">
          {renderSlideCanvas(false)}
        </div>
      </div>
    </div>
  );
};
