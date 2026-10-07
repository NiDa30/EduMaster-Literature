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
  Copy,
  Edit3,
  CheckCircle2, 
  Lightbulb, 
  Quote, 
  BookOpen,
  X,
  FileCode2,
  Layers
} from 'lucide-react';
import { SlideItem } from '../types';
import { exportHtmlSlides, exportPptxSlides } from '../utils/exportUtils';
import { normalizeVietnamese } from '../utils/unicode';

interface SlidesViewProps {
  slides: SlideItem[];
  setSlides: React.Dispatch<React.SetStateAction<SlideItem[]>>;
  lessonTitle: string;
}

export const SlidesView: React.FC<SlidesViewProps> = ({ slides, setSlides, lessonTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isExportingPptx, setIsExportingPptx] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const currentSlide = slides[currentIndex] || slides[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept arrows if user is focused inside input / textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
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

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

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
    showToast('Đã thêm slide mới thành công!');
  };

  const handleDuplicateSlide = (idx: number) => {
    const target = slides[idx];
    if (!target) return;
    const duplicated: SlideItem = {
      ...JSON.parse(JSON.stringify(target)),
      id: `slide-${Date.now()}`,
      title: `${target.title} (Bản sao)`
    };
    const nextSlides = [...slides];
    nextSlides.splice(idx + 1, 0, duplicated);
    setSlides(nextSlides);
    setCurrentIndex(idx + 1);
    showToast('Đã nhân bản slide thành công!');
  };

  const handleDeleteSlide = (idx: number) => {
    if (slides.length <= 1) {
      showToast('Bộ slide cần có ít nhất 1 slide.');
      return;
    }
    const nextSlides = slides.filter((_, i) => i !== idx);
    setSlides(nextSlides);
    setCurrentIndex(prev => Math.min(prev, nextSlides.length - 1));
    showToast('Đã xóa slide.');
  };

  const handleUpdateSlide = (patch: Partial<SlideItem>) => {
    setSlides(prev => prev.map((s, idx) => idx === currentIndex ? { ...s, ...patch } : s));
  };

  const handleExportPptx = async () => {
    try {
      setIsExportingPptx(true);
      await exportPptxSlides(slides, lessonTitle);
      showToast('Đã tạo và tải file PowerPoint (.pptx) thành công!');
    } catch (err) {
      console.error('Lỗi khi xuất PowerPoint:', err);
      showToast('Không thể tạo file PowerPoint. Vui lòng thử lại.');
    } finally {
      setIsExportingPptx(false);
    }
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
      <div className="mb-4 text-center shrink-0">
        <h2 className="text-section md:text-page-title font-serif font-semibold text-stone-100 tracking-wide uppercase">
          {currentSlide.title}
        </h2>
      </div>

      {/* Main Slide Content Canvas (Rule 29.16) */}
      <div className="flex-1 min-h-0 flex flex-col justify-center overflow-y-auto px-2 panel-scroll">
        {currentSlide.layout === 'quote' ? (
          /* QUOTE FOCUS LAYOUT */
          <div className="max-w-2xl mx-auto w-full text-center space-y-4">
            <div className="relative inline-block">
              <Quote className="w-8 h-8 text-amber-500/30 absolute -top-4 -left-6" />
              <blockquote className="font-serif italic text-quote-highlight md:text-2xl text-amber-100 leading-[1.8] whitespace-pre-line px-4">
                "{currentSlide.quoteText}"
              </blockquote>
            </div>

            {currentSlide.quoteAuthor && (
              <p className="text-meta text-amber-400/90 font-medium">
                — {currentSlide.quoteAuthor} —
              </p>
            )}

            {currentSlide.discussionQuestion && (
              <div className="mt-4 p-4 rounded-xl bg-stone-900/90 border border-amber-900/40 text-left">
                <span className="text-meta font-semibold text-amber-300 block mb-1">
                  ✦ Câu hỏi gợi mở / Thảo luận:
                </span>
                <p className="text-body-ui text-stone-200 leading-relaxed font-sans">
                  {currentSlide.discussionQuestion}
                </p>
              </div>
            )}
          </div>
        ) : currentSlide.layout === 'split' ? (
          /* SPLIT 2 COLUMNS */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full">
            <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800">
              <p className="text-body-ui text-stone-200 leading-[1.8] font-serif mb-3">
                {currentSlide.contentLeft}
              </p>
              {currentSlide.bullets && (
                <ul className="space-y-1.5 text-meta text-stone-300">
                  {currentSlide.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400">✦</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 font-serif text-stone-200 leading-[1.8] whitespace-pre-line text-body-ui">
              {currentSlide.contentRight}
            </div>
          </div>
        ) : currentSlide.layout === 'cards' && currentSlide.cards ? (
          /* 3 CARDS LAYOUT */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto w-full">
            {currentSlide.cards.map((card, i) => (
              <div key={i} className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-card-title text-amber-300 font-serif mb-1.5">{card.title}</h4>
                  <p className="text-meta text-stone-300 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : currentSlide.layout === 'quiz' && currentSlide.quizQuestion ? (
          /* INTERACTIVE QUIZ SLIDE */
          <div className="max-w-2xl mx-auto w-full bg-stone-900/90 p-5 rounded-2xl border border-stone-800 space-y-4">
            <p className="text-section font-serif text-stone-100 leading-relaxed font-semibold">
              {currentSlide.quizQuestion.question}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentSlide.quizQuestion.options.map((opt, i) => {
                const isSelected = selectedQuizOption === i;
                const isCorrect = i === currentSlide.quizQuestion?.correctIndex;
                let btnStyle = "bg-stone-800/80 border-stone-700 text-stone-200 hover:bg-stone-700/80";
                if (showExplanation) {
                  if (isCorrect) btnStyle = "bg-emerald-950/80 border-emerald-500/60 text-emerald-200 ring-1 ring-emerald-500/50";
                  else if (isSelected && !isCorrect) btnStyle = "bg-rose-950/80 border-rose-500/60 text-rose-200 ring-1 ring-rose-500/50";
                } else if (isSelected) {
                  btnStyle = "bg-amber-950/80 border-amber-500/60 text-amber-200";
                }
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedQuizOption(i);
                      setShowExplanation(true);
                    }}
                    className={`p-3 text-left rounded-xl border text-body-ui font-medium transition flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {showExplanation && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
            {showExplanation && (
              <div className="p-3 bg-stone-950/80 border border-stone-800 rounded-xl text-meta text-stone-300 leading-relaxed">
                <span className="font-semibold text-amber-400">Giải thích: </span>
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
          <span className="line-clamp-1"><strong className="text-stone-300 font-semibold">Ghi chú sư phạm:</strong> {currentSlide.speakerNotes || 'Chưa có ghi chú.'}</span>
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
      {/* Top Banner */}
      <div className="bg-white p-3.5 md:p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3 shrink-0 no-print">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-metadata font-semibold bg-amber-100 text-amber-900 border border-amber-200">
              Storytelling Presentation
            </span>
            <span className="text-metadata text-stone-500 font-medium hidden sm:inline">Chuẩn 16:9 Nghệ thuật Văn học</span>
          </div>
          <h1 className="text-section md:text-page-title font-semibold text-stone-900 mt-1 leading-[1.3]">
            Slide Trình chiếu & Trích đoạn Văn học
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setIsFullscreen(true)}
            className="btn-secondary min-h-[36px] px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-metadata font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Maximize className="w-3.5 h-3.5" />
            <span>Trình chiếu F5</span>
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`min-h-[36px] px-3 py-1.5 rounded-xl text-metadata font-semibold flex items-center gap-1.5 transition border ${
              isEditing 
                ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs' 
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Đóng chỉnh sửa' : 'Chỉnh sửa slide'}</span>
          </button>

          <button
            onClick={handleExportPptx}
            disabled={isExportingPptx}
            className="btn-primary min-h-[36px] px-3.5 py-1.5 bg-[#7C2D37] hover:bg-[#68232D] text-white rounded-xl text-metadata font-semibold flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
            title="Tải xuống tệp trình chiếu PowerPoint chuẩn 16:9"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExportingPptx ? 'Đang xuất .pptx...' : 'Xuất PowerPoint (.pptx)'}</span>
          </button>

          <button
            onClick={() => exportHtmlSlides(slides, lessonTitle)}
            className="btn-secondary min-h-[36px] px-3 py-1.5 border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-xl text-metadata font-semibold flex items-center gap-1.5 transition"
            title="Xuất file HTML xem offline và in ấn"
          >
            <FileCode2 className="w-3.5 h-3.5 text-stone-500" />
            <span>Xuất Trình chiếu (.html)</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 min-h-0 flex gap-4 overflow-hidden">
        {/* Left Thumbnails Column (shrink-0) */}
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
                <div className="absolute top-1 right-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDuplicateSlide(idx);
                    }}
                    className="p-0.5 text-stone-400 hover:text-stone-700 rounded bg-white shadow-xs transition"
                    title="Nhân bản slide"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  {slides.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSlide(idx);
                      }}
                      className="p-0.5 text-stone-400 hover:text-red-600 rounded bg-white shadow-xs transition"
                      title="Xóa slide"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Main Slide Canvas */}
        <div className="flex-1 min-h-0 bg-[#1C1817] rounded-2xl p-4 md:p-6 border border-stone-800 text-stone-100 flex flex-col justify-between overflow-hidden shadow-xl">
          {renderSlideCanvas(false)}
        </div>

        {/* Right Editorial Slide Edit Panel (Rule 29.16) */}
        {isEditing && (
          <div className="w-80 xl:w-96 shrink-0 card-surface p-4 flex flex-col gap-3 overflow-hidden border-l border-stone-200 shadow-md">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200 shrink-0">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#7C2D37]" />
                <h3 className="text-card-title text-stone-900">
                  Sửa Slide #{currentIndex + 1}
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleDuplicateSlide(currentIndex)}
                  className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition"
                  title="Nhân bản slide này"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                {slides.length > 1 && (
                  <button
                    onClick={() => handleDeleteSlide(currentIndex)}
                    className="p-1.5 text-stone-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                    title="Xóa slide này"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto space-y-3 panel-scroll pr-1 text-meta">
              {/* Phase Tag */}
              <div>
                <label className="block font-medium text-stone-700 mb-1">Pha sư phạm</label>
                <select
                  value={currentSlide.phaseTag}
                  onChange={(e) => handleUpdateSlide({ phaseTag: e.target.value as SlideItem['phaseTag'] })}
                  className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7C2D37]"
                >
                  <option value="Khởi động">Khởi động</option>
                  <option value="Kiến thức mới">Kiến thức mới</option>
                  <option value="Luyện tập">Luyện tập</option>
                  <option value="Vận dụng">Vận dụng</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block font-medium text-stone-700 mb-1">Tiêu đề Slide</label>
                <input
                  type="text"
                  value={currentSlide.title}
                  onChange={(e) => handleUpdateSlide({ title: normalizeVietnamese(e.target.value) })}
                  className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7C2D37]"
                />
              </div>

              {/* Layout Selector */}
              <div>
                <label className="block font-medium text-stone-700 mb-1">Bố cục hiển thị</label>
                <select
                  value={currentSlide.layout}
                  onChange={(e) => handleUpdateSlide({ layout: e.target.value as SlideItem['layout'] })}
                  className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7C2D37]"
                >
                  <option value="quote">Trích đoạn nghệ thuật (Quote Focus)</option>
                  <option value="split">Song song 2 cột (Split)</option>
                  <option value="cards">Thẻ kiến thức 3 cột (Cards)</option>
                  <option value="quiz">Câu hỏi tương tác (Quiz)</option>
                  <option value="single">Văn bản chuẩn (Single Text)</option>
                </select>
              </div>

              {/* Fields for Quote */}
              {currentSlide.layout === 'quote' && (
                <>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Đoạn trích thơ / văn</label>
                    <textarea
                      rows={4}
                      value={currentSlide.quoteText || ''}
                      onChange={(e) => handleUpdateSlide({ quoteText: normalizeVietnamese(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7C2D37] font-serif"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Tác giả / Nguồn trích</label>
                    <input
                      type="text"
                      value={currentSlide.quoteAuthor || ''}
                      onChange={(e) => handleUpdateSlide({ quoteAuthor: normalizeVietnamese(e.target.value) })}
                      className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7C2D37]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Câu hỏi khám phá / thảo luận</label>
                    <textarea
                      rows={2}
                      value={currentSlide.discussionQuestion || ''}
                      onChange={(e) => handleUpdateSlide({ discussionQuestion: normalizeVietnamese(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7C2D37]"
                    />
                  </div>
                </>
              )}

              {/* Fields for Split */}
              {currentSlide.layout === 'split' && (
                <>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Nội dung cột trái</label>
                    <textarea
                      rows={3}
                      value={currentSlide.contentLeft || ''}
                      onChange={(e) => handleUpdateSlide({ contentLeft: normalizeVietnamese(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7C2D37]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Nội dung cột phải</label>
                    <textarea
                      rows={3}
                      value={currentSlide.contentRight || ''}
                      onChange={(e) => handleUpdateSlide({ contentRight: normalizeVietnamese(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7C2D37] font-serif"
                    />
                  </div>
                </>
              )}

              {/* Content for Single Text */}
              {currentSlide.layout === 'single' && (
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Nội dung chính</label>
                  <textarea
                    rows={4}
                    value={currentSlide.contentLeft || ''}
                    onChange={(e) => handleUpdateSlide({ contentLeft: normalizeVietnamese(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7C2D37]"
                  />
                </div>
              )}

              {/* Speaker Notes */}
              <div>
                <label className="block font-medium text-stone-700 mb-1">Ghi chú sư phạm (Speaker Notes)</label>
                <textarea
                  rows={2}
                  value={currentSlide.speakerNotes || ''}
                  onChange={(e) => handleUpdateSlide({ speakerNotes: normalizeVietnamese(e.target.value) })}
                  placeholder="Gợi ý phương pháp, định hướng thời gian thảo luận..."
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7C2D37]"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-xs text-stone-500">
              <span>Tự động lưu vào phiên làm việc</span>
              <button
                onClick={() => setIsEditing(false)}
                className="btn-primary py-1 px-3 text-xs"
              >
                Xong
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl text-body-ui border border-stone-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
