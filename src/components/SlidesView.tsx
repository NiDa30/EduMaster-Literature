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

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-[#171413] p-6 overflow-hidden flex flex-col justify-between' : ''}`}>
      {/* Header bar (only if not fullscreen) */}
      {!isFullscreen && (
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
                Storytelling Presentation
              </span>
              <span className="text-xs text-stone-500 font-medium">Slide Bài giảng Ngữ văn Nghệ thuật</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold font-serif text-stone-900 mt-1">
              Slide Trình chiếu & Trích đoạn Văn học
            </h1>
            <p className="text-sm text-stone-600">
              Thiết kế theo dòng kể chuyện: Hook khởi động → Tác giả & Bối cảnh → Quote trích đoạn đẹp → Phân tích sâu → Thảo luận & Chiêm nghiệm.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsFullscreen(true)}
              className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
            >
              <Maximize className="w-4 h-4" />
              <span>Trình chiếu toàn màn hình</span>
            </button>
            <button
              onClick={() => exportHtmlSlides(slides, lessonTitle)}
              className="px-3.5 py-2 bg-[#7C2D37] hover:bg-[#68232D] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
            >
              <Download className="w-4 h-4" />
              <span>Xuất PowerPoint (.html / .pptx)</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Slide Viewer Canvas */}
      <div className={`relative transition-all ${
        isFullscreen 
          ? 'flex-1 flex flex-col justify-center' 
          : 'bg-[#1C1817] rounded-3xl p-6 md:p-12 shadow-2xl border border-stone-800 text-stone-100 min-h-[540px] flex flex-col justify-between'
      }`}>
        {/* Slide Top Status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getTagColor(currentSlide.phaseTag)}`}>
              {currentSlide.phaseTag}
            </span>
            <span className="text-xs text-stone-400 font-serif hidden sm:inline">
              Bài học: {lessonTitle}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 border border-stone-700">
              Slide {currentIndex + 1} / {slides.length}
            </span>
            {isFullscreen && (
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg"
                title="Thoát toàn màn hình (Esc)"
              >
                <Minimize className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Slide Title */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-4xl font-serif font-bold tracking-tight text-white leading-tight">
            {currentSlide.title}
          </h2>
        </div>

        {/* Slide Body by Layout */}
        <div className="my-auto py-2">
          {/* LAYOUT 1: QUOTE SLIDE (ĐẶC TRƯNG NGỮ VĂN) */}
          {currentSlide.layout === 'quote' && currentSlide.quoteText ? (
            <div className="max-w-3xl mx-auto p-8 md:p-10 rounded-3xl bg-stone-900/90 border border-amber-900/40 text-center shadow-xl space-y-6">
              <Quote className="w-10 h-10 text-amber-500/40 mx-auto" />
              <p className="text-xl md:text-2xl font-serif italic text-amber-100 leading-relaxed whitespace-pre-line">
                "{currentSlide.quoteText}"
              </p>
              <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                — {currentSlide.quoteAuthor || 'Trích tác phẩm'}
              </div>
              {currentSlide.discussionQuestion && (
                <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 text-xs md:text-sm text-stone-300 font-sans text-left">
                  <strong className="text-amber-300 block mb-1">Câu hỏi thảo luận & Khám phá:</strong>
                  {currentSlide.discussionQuestion}
                </div>
              )}
            </div>
          ) : currentSlide.layout === 'visual_map' ? (
            /* LAYOUT 2: VISUAL ANALYSIS MAP SLIDE */
            <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-stone-900/80 border border-stone-800 shadow-xl space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase">
                <Heart className="w-4 h-4" />
                Sơ đồ Mạch cảm xúc & Cảm hứng sử thi
              </div>
              <p className="text-base text-stone-200 font-serif leading-relaxed">
                {currentSlide.contentLeft}
              </p>
              {currentSlide.bullets && (
                <div className="space-y-3 pt-2">
                  {currentSlide.bullets.map((b, i) => (
                    <div key={i} className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 flex items-center gap-3 text-xs md:text-sm text-stone-200">
                      <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="bg-stone-900/80 p-6 md:p-8 rounded-2xl border border-stone-800 shadow-inner">
                <p className="text-sm md:text-base text-stone-200 leading-relaxed mb-4 font-serif">
                  {currentSlide.contentLeft}
                </p>
                {currentSlide.bullets && (
                  <ul className="space-y-2 text-xs md:text-sm text-stone-300">
                    {currentSlide.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">✦</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="bg-stone-900/80 p-6 md:p-8 rounded-2xl border border-stone-800 shadow-inner">
                <p className="text-sm md:text-base text-stone-200 whitespace-pre-line leading-relaxed font-serif">
                  {currentSlide.contentRight}
                </p>
              </div>
            </div>
          ) : currentSlide.layout === 'cards' && currentSlide.cards ? (
            /* LAYOUT 4: THREE CHARACTER / VALUE CARDS */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {currentSlide.cards.map((c, i) => (
                <div key={i} className="bg-stone-900/90 p-6 rounded-2xl border border-stone-800 hover:border-amber-500/50 transition flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold mb-3">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif font-bold text-base text-amber-200 mb-2">{c.title}</h3>
                    <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-serif">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : currentSlide.layout === 'quiz' && currentSlide.quizQuestion ? (
            /* LAYOUT 5: INTERACTIVE LITERARY QUIZ */
            <div className="max-w-3xl mx-auto bg-stone-900/90 p-6 md:p-8 rounded-2xl border border-stone-800 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-3 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                Câu hỏi Tương tác Đọc hiểu
              </div>
              <p className="text-base md:text-lg font-serif font-medium text-white mb-6 leading-relaxed">
                {currentSlide.quizQuestion.question}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
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
                      className={`p-3.5 rounded-xl border text-left text-xs md:text-sm font-medium transition flex items-center justify-between ${
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
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 leading-relaxed font-serif">
                  <span className="font-bold font-sans text-amber-400">Giải thích thi pháp: </span>
                  {currentSlide.quizQuestion.explanation}
                </div>
              )}
            </div>
          ) : (
            /* DEFAULT SINGLE TEXT */
            <div className="max-w-3xl mx-auto bg-stone-900/80 p-8 rounded-2xl border border-stone-800">
              <p className="text-lg md:text-xl text-stone-200 leading-relaxed font-serif mb-6">
                {currentSlide.contentLeft}
              </p>
              {currentSlide.bullets && (
                <ul className="space-y-3 text-sm md:text-base text-stone-300">
                  {currentSlide.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold">✦</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Slide Bottom Bar with Navigation Controls & Speaker Notes */}
        <div className="pt-6 mt-6 border-t border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-stone-400 max-w-xl">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong className="text-stone-300">Ghi chú sư phạm:</strong> {currentSlide.speakerNotes}</span>
          </div>
          <div className="flex items-center gap-2 self-end">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-white transition flex items-center gap-1 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Trước</span>
            </button>
            <button
              onClick={() => setCurrentIndex(prev => Math.min(prev + 1, slides.length - 1))}
              disabled={currentIndex === slides.length - 1}
              className="p-2 rounded-xl bg-[#7C2D37] hover:bg-[#68232D] disabled:opacity-30 disabled:cursor-not-allowed text-white transition flex items-center gap-1 text-xs font-semibold"
            >
              <span>Tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnails strip & Slide management (only if not fullscreen) */}
      {!isFullscreen && (
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2 font-serif">
              <Presentation className="w-4 h-4 text-[#7C2D37]" />
              Danh sách Slide trong giáo án ({slides.length} trang)
            </h3>
            <button
              onClick={handleAddSlide}
              className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold text-xs flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm Slide mới</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {slides.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => setCurrentIndex(idx)}
                className={`p-3 rounded-xl border cursor-pointer transition relative group ${
                  idx === currentIndex
                    ? 'border-[#7C2D37] ring-2 ring-[#7C2D37]/20 bg-rose-50/40'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="font-bold text-stone-700">Slide {idx + 1}</span>
                  <span className="text-[9px] font-semibold px-1 rounded bg-stone-100 text-stone-600">
                    {s.phaseTag}
                  </span>
                </div>
                <div className="text-xs font-serif font-semibold text-stone-900 line-clamp-2 h-8">
                  {s.title}
                </div>
                {slides.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSlide(idx);
                    }}
                    className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 p-1 text-stone-400 hover:text-red-600 rounded bg-white shadow-xs transition"
                    title="Xóa slide"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
