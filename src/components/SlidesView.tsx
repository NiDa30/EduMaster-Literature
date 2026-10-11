import React, { useState, useEffect, useRef } from 'react';
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
  X,
  FileCode2,
  Palette,
  Image as ImageIcon,
  Type,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Upload,
  Check,
  Layers,
  Wand2
} from 'lucide-react';
import { 
  SlideItem, 
  SlidesPresentationSettings, 
  SlideStyle, 
  SlideTheme, 
  SlideBackground, 
  SlideTextStyle, 
  SlideFontFamily,
  SlideTemplate 
} from '../types';
import { 
  SLIDE_THEMES, 
  THEME_LIST, 
  DEFAULT_THEME_ID, 
  SOLID_COLOR_PRESETS, 
  GRADIENT_PRESETS, 
  ACADEMIC_VIGNETTES, 
  CURATED_FONTS, 
  SLIDE_TEMPLATES, 
  TEMPLATE_CATEGORIES 
} from '../config/slideThemes';
import { 
  resolveSlideStyle, 
  getSlideCssBackground, 
  getSlideCssFontFamily, 
  validateHexColor, 
  normalizeHex, 
  getContrastRatio, 
  getContrastWarning, 
  getEffectiveBackgroundHex, 
  compressImageBase64,
  ResolvedSlideStyle
} from '../utils/slideStyleUtils';
import { exportHtmlSlides, exportPptxSlides } from '../utils/exportUtils';
import { normalizeVietnamese } from '../utils/unicode';

interface SlidesViewProps {
  slides: SlideItem[];
  setSlides: React.Dispatch<React.SetStateAction<SlideItem[]>>;
  lessonTitle: string;
  presentationSettings?: SlidesPresentationSettings;
  onUpdatePresentationSettings?: (settings: SlidesPresentationSettings) => void;
}

type EditTab = 'content' | 'theme' | 'background' | 'typography';
type TypographyTarget = 'title' | 'body' | 'quote';
type BackgroundMode = 'solid' | 'gradient' | 'image' | 'vignette';

export const SlidesView: React.FC<SlidesViewProps> = ({ 
  slides, 
  setSlides, 
  lessonTitle,
  presentationSettings,
  onUpdatePresentationSettings
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeEditTab, setActiveEditTab] = useState<EditTab>('content');
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isExportingPptx, setIsExportingPptx] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Background tab sub-mode
  const [bgMode, setBgMode] = useState<BackgroundMode>('solid');
  const [customSolidHex, setCustomSolidHex] = useState('#171413');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Typography tab sub-mode
  const [typoTarget, setTypoTarget] = useState<TypographyTarget>('title');
  const [customTypoHex, setCustomTypoHex] = useState('#FAF8F5');

  // Templates category filter
  const [selectedTemplateCat, setSelectedTemplateCat] = useState<string>('all');

  const currentSlide = slides[currentIndex] || slides[0];
  const effectiveSettings: SlidesPresentationSettings = presentationSettings || {
    defaultThemeId: DEFAULT_THEME_ID
  };
  const resolvedStyle = resolveSlideStyle(currentSlide, effectiveSettings);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept arrows or space if user is focused inside input / textarea / select
      const activeTag = (document.activeElement as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag)) {
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

  // Keep color input synced when slide changes
  useEffect(() => {
    if (resolvedStyle.background.type === 'solid' && resolvedStyle.background.color) {
      setCustomSolidHex(resolvedStyle.background.color);
    }
    const currentTargetColor = typoTarget === 'title' 
      ? resolvedStyle.titleStyle.color 
      : typoTarget === 'body' 
        ? resolvedStyle.bodyStyle.color 
        : resolvedStyle.quoteStyle.color;
    setCustomTypoHex(currentTargetColor);
  }, [currentIndex, typoTarget, resolvedStyle.themeId]);

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

  const handleUpdateStyleOverrides = (patch: Partial<SlideStyle>) => {
    setSlides(prev => prev.map((s, idx) => {
      if (idx !== currentIndex) return s;
      const currentOverrides = s.styleOverrides || {};
      return {
        ...s,
        styleOverrides: {
          ...currentOverrides,
          ...patch
        }
      };
    }));
  };

  // Apply Theme handlers
  const handleApplyThemeToCurrentSlide = (themeId: string) => {
    const theme = SLIDE_THEMES[themeId];
    if (!theme) return;
    handleUpdateStyleOverrides({
      themeId,
      background: theme.background
    });
    showToast(`Đã áp dụng chủ đề "${theme.name}" cho slide này.`);
  };

  const handleApplyThemeToAllSlides = (themeId: string) => {
    const theme = SLIDE_THEMES[themeId];
    if (!theme) return;
    const newSettings: SlidesPresentationSettings = {
      ...effectiveSettings,
      defaultThemeId: themeId,
      defaultBackground: theme.background
    };
    onUpdatePresentationSettings?.(newSettings);
    setSlides(prev => prev.map(s => ({
      ...s,
      styleOverrides: {
        ...(s.styleOverrides || {}),
        themeId,
        background: theme.background
      }
    })));
    showToast(`Đã áp dụng chủ đề "${theme.name}" cho toàn bộ bài giảng!`);
  };

  // Apply Template handler
  const handleApplyTemplate = (tmpl: SlideTemplate) => {
    const theme = SLIDE_THEMES[tmpl.themeId] || SLIDE_THEMES[DEFAULT_THEME_ID];
    const patch: Partial<SlideItem> = {
      layout: tmpl.suggestedLayout,
      styleOverrides: {
        themeId: tmpl.themeId,
        background: theme.background,
        ...(tmpl.styleOverrides || {})
      }
    };
    if (tmpl.suggestedLayout === 'quote' && !currentSlide.quoteText) {
      patch.quoteText = tmpl.previewSnippet.quote || 'Trích đoạn nghệ thuật trọng tâm...';
      patch.quoteAuthor = tmpl.previewSnippet.author || lessonTitle;
    }
    if (tmpl.suggestedLayout === 'cards' && (!currentSlide.cards || currentSlide.cards.length === 0)) {
      patch.cards = [
        { title: 'Luận điểm 1', desc: 'Phân tích chi tiết hình tượng nghệ thuật.' },
        { title: 'Luận điểm 2', desc: 'Bút pháp miêu tả và cảm xúc chủ đạo.' },
        { title: 'Luận điểm 3', desc: 'Giá trị nhân văn và thông điệp tư tưởng.' }
      ];
    }
    handleUpdateSlide(patch);
    showToast(`Đã áp dụng mẫu "${tmpl.name}".`);
  };

  // Background handlers
  const handleApplyBackground = (bg: SlideBackground, applyAll = false) => {
    if (applyAll) {
      onUpdatePresentationSettings?.({
        ...effectiveSettings,
        defaultBackground: bg
      });
      setSlides(prev => prev.map(s => ({
        ...s,
        styleOverrides: {
          ...(s.styleOverrides || {}),
          background: bg
        }
      })));
      showToast('Đã áp dụng hình nền cho toàn bộ bài giảng!');
    } else {
      handleUpdateStyleOverrides({ background: bg });
      showToast('Đã cập nhật hình nền cho slide này.');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingImage(true);
      const base64 = await compressImageBase64(file);
      const newBg: SlideBackground = {
        type: 'image',
        imageUrl: base64,
        imageFit: 'cover',
        imagePosition: 'center',
        overlay: {
          color: '#000000',
          opacity: 0.5
        }
      };
      handleApplyBackground(newBg, false);
      showToast('Đã tải và tối ưu hóa hình ảnh nền thành công!');
    } catch (err: any) {
      console.error('Lỗi khi nén ảnh nền:', err);
      showToast(err?.message || 'Không thể tải ảnh. Vui lòng chọn tệp ảnh hợp lệ.');
    } finally {
      setIsUploadingImage(false);
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  };

  // Typography handlers
  const handleUpdateTypography = (
    target: TypographyTarget, 
    patch: Partial<SlideTextStyle>, 
    applyAll = false
  ) => {
    const propKey = target === 'title' 
      ? 'titleStyle' 
      : target === 'body' 
        ? 'bodyStyle' 
        : 'quoteStyle';

    if (applyAll) {
      setSlides(prev => prev.map(s => {
        const existingTarget = s.styleOverrides?.[propKey] || {};
        return {
          ...s,
          styleOverrides: {
            ...(s.styleOverrides || {}),
            [propKey]: {
              ...existingTarget,
              ...patch
            }
          }
        };
      }));
      showToast(`Đã áp dụng kiểu chữ cho toàn bộ bài giảng!`);
    } else {
      const currentTarget = currentSlide.styleOverrides?.[propKey] || {};
      handleUpdateStyleOverrides({
        [propKey]: {
          ...currentTarget,
          ...patch
        }
      });
    }
  };

  // Reset Handlers
  const handleResetCurrentSlideStyle = () => {
    handleUpdateSlide({ styleOverrides: undefined });
    showToast('Đã khôi phục slide này về thiết kế mặc định.');
  };

  const handleResetAllSlidesToDefault = () => {
    onUpdatePresentationSettings?.({ defaultThemeId: DEFAULT_THEME_ID });
    setSlides(prev => prev.map(s => ({ ...s, styleOverrides: undefined })));
    showToast('Đã khôi phục toàn bộ bài giảng về chủ đề Điện ảnh Văn học mặc định.');
  };

  const handleExportPptx = async () => {
    try {
      setIsExportingPptx(true);
      await exportPptxSlides(slides, lessonTitle, effectiveSettings);
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

  // Contrast warning state for typography inspector
  const activeTypoStyle = typoTarget === 'title' 
    ? resolvedStyle.titleStyle 
    : typoTarget === 'body' 
      ? resolvedStyle.bodyStyle 
      : resolvedStyle.quoteStyle;

  const currentContrastWarning = getContrastWarning(
    activeTypoStyle.color,
    resolvedStyle.background,
    activeTypoStyle.fontSize,
    activeTypoStyle.fontWeight >= 600
  );
  const currentRatio = getContrastRatio(
    activeTypoStyle.color,
    getEffectiveBackgroundHex(resolvedStyle.background)
  );

  // Render Canvas with resolved styling
  const renderSlideCanvas = (isFullscreenMode: boolean, style: ResolvedSlideStyle) => {
    const isQuoteLayout = currentSlide.layout === 'quote';
    const isSplitLayout = currentSlide.layout === 'split';
    const isCardsLayout = currentSlide.layout === 'cards';
    const isQuizLayout = currentSlide.layout === 'quiz';

    return (
      <div className="flex flex-col h-full justify-between select-text">
        {/* Slide Top Status */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <span 
              className={`px-2.5 py-0.5 rounded-full text-metadata font-semibold border tracking-normal ${getTagColor(currentSlide.phaseTag)}`}
            >
              {currentSlide.phaseTag}
            </span>
            <span 
              className="text-metadata font-serif hidden sm:inline"
              style={{ color: style.secondaryTextColor }}
            >
              Bài học: {lessonTitle}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span 
              className="text-metadata tabular-nums px-2 py-0.5 rounded-lg border font-mono"
              style={{ 
                backgroundColor: style.cardBackground, 
                borderColor: style.cardBorder,
                color: style.secondaryTextColor
              }}
            >
              Slide {currentIndex + 1} / {slides.length}
            </span>
            {isFullscreenMode && (
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-1.5 rounded-lg min-h-[32px] min-w-[32px] flex items-center justify-center transition hover:opacity-80"
                style={{ backgroundColor: style.cardBackground, color: style.titleStyle.color }}
                title="Thoát toàn màn hình (Esc)"
              >
                <Minimize className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Slide Title */}
        <div className="mb-4 shrink-0" style={{ textAlign: style.titleStyle.align }}>
          <h2 
            className="tracking-wide uppercase transition-colors"
            style={{
              fontFamily: getSlideCssFontFamily(style.titleStyle.fontFamily),
              fontSize: `${Math.min(style.titleStyle.fontSize, isFullscreenMode ? 44 : 32)}px`,
              fontWeight: style.titleStyle.fontWeight,
              fontStyle: style.titleStyle.italic ? 'italic' : 'normal',
              color: style.titleStyle.color,
              lineHeight: 1.3
            }}
          >
            {currentSlide.title}
          </h2>
        </div>

        {/* Main Slide Content Canvas */}
        <div className="flex-1 min-h-0 flex flex-col justify-center overflow-y-auto px-2 panel-scroll">
          {isQuoteLayout ? (
            /* QUOTE FOCUS LAYOUT */
            <div className="max-w-3xl mx-auto w-full space-y-5" style={{ textAlign: style.quoteStyle.align }}>
              <div 
                className="p-6 md:p-8 rounded-2xl relative shadow-lg transition-all"
                style={{ 
                  backgroundColor: style.cardBackground, 
                  borderColor: style.cardBorder,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderRadius: `${style.radius}px`
                }}
              >
                <Quote 
                  className="w-10 h-10 absolute -top-5 left-4 opacity-25"
                  style={{ color: style.accentColor }}
                />
                <blockquote 
                  className="leading-[1.8] whitespace-pre-line px-2 transition-all"
                  style={{
                    fontFamily: getSlideCssFontFamily(style.quoteStyle.fontFamily),
                    fontSize: `${Math.min(style.quoteStyle.fontSize, isFullscreenMode ? 28 : 22)}px`,
                    fontWeight: style.quoteStyle.fontWeight,
                    fontStyle: style.quoteStyle.italic ? 'italic' : 'normal',
                    color: style.quoteStyle.color
                  }}
                >
                  "{currentSlide.quoteText}"
                </blockquote>

                {currentSlide.quoteAuthor && (
                  <p 
                    className="mt-4 font-semibold text-meta tracking-wide"
                    style={{ color: style.accentColor }}
                  >
                    — {currentSlide.quoteAuthor} —
                  </p>
                )}
              </div>

              {currentSlide.discussionQuestion && (
                <div 
                  className="p-4 rounded-xl text-left shadow-sm"
                  style={{ 
                    backgroundColor: style.cardBackground, 
                    borderColor: style.cardBorder,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderRadius: `${Math.max(style.radius - 4, 8)}px`
                  }}
                >
                  <span 
                    className="text-meta font-bold block mb-1.5"
                    style={{ color: style.accentColor }}
                  >
                    ✦ Câu hỏi gợi mở / Thảo luận:
                  </span>
                  <p 
                    className="leading-relaxed"
                    style={{
                      fontFamily: getSlideCssFontFamily(style.bodyStyle.fontFamily),
                      fontSize: `${Math.min(style.bodyStyle.fontSize, 18)}px`,
                      color: style.bodyStyle.color
                    }}
                  >
                    {currentSlide.discussionQuestion}
                  </p>
                </div>
              )}
            </div>
          ) : isSplitLayout ? (
            /* SPLIT 2 COLUMNS */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto w-full">
              <div 
                className="p-5 md:p-6 rounded-2xl shadow-md"
                style={{ 
                  backgroundColor: style.cardBackground, 
                  borderColor: style.cardBorder,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderRadius: `${style.radius}px`,
                  textAlign: style.bodyStyle.align
                }}
              >
                <p 
                  className="leading-[1.8] mb-3"
                  style={{
                    fontFamily: getSlideCssFontFamily(style.bodyStyle.fontFamily),
                    fontSize: `${Math.min(style.bodyStyle.fontSize, 18)}px`,
                    fontWeight: style.bodyStyle.fontWeight,
                    fontStyle: style.bodyStyle.italic ? 'italic' : 'normal',
                    color: style.bodyStyle.color
                  }}
                >
                  {currentSlide.contentLeft}
                </p>
                {currentSlide.bullets && (
                  <ul className="space-y-2 mt-4 text-meta">
                    {currentSlide.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span style={{ color: style.accentColor }}>✦</span>
                        <span style={{ color: style.bodyStyle.color }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div 
                className="p-5 md:p-6 rounded-2xl shadow-md whitespace-pre-line leading-[1.8]"
                style={{ 
                  backgroundColor: style.cardBackground, 
                  borderColor: style.cardBorder,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderRadius: `${style.radius}px`,
                  fontFamily: getSlideCssFontFamily(style.quoteStyle.fontFamily),
                  fontSize: `${Math.min(style.bodyStyle.fontSize, 18)}px`,
                  color: style.bodyStyle.color,
                  textAlign: style.bodyStyle.align
                }}
              >
                {currentSlide.contentRight}
              </div>
            </div>
          ) : isCardsLayout && currentSlide.cards ? (
            /* 3 CARDS LAYOUT */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto w-full">
              {currentSlide.cards.map((card, i) => (
                <div 
                  key={i} 
                  className="p-5 rounded-2xl flex flex-col justify-between shadow-md transition-all hover:translate-y-[-1px]"
                  style={{ 
                    backgroundColor: style.cardBackground, 
                    borderColor: style.cardBorder,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderRadius: `${style.radius}px`
                  }}
                >
                  <div>
                    <h4 
                      className="font-bold mb-2 font-serif text-lg"
                      style={{ 
                        color: style.accentColor,
                        fontFamily: getSlideCssFontFamily(style.titleStyle.fontFamily)
                      }}
                    >
                      {card.title}
                    </h4>
                    <p 
                      className="leading-relaxed text-meta"
                      style={{ 
                        color: style.bodyStyle.color,
                        fontFamily: getSlideCssFontFamily(style.bodyStyle.fontFamily),
                        textAlign: style.bodyStyle.align
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : isQuizLayout && currentSlide.quizQuestion ? (
            /* INTERACTIVE QUIZ SLIDE */
            <div 
              className="max-w-3xl mx-auto w-full p-6 md:p-8 rounded-2xl space-y-5 shadow-lg"
              style={{ 
                backgroundColor: style.cardBackground, 
                borderColor: style.cardBorder,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: `${style.radius}px`
              }}
            >
              <p 
                className="font-semibold leading-relaxed"
                style={{
                  fontFamily: getSlideCssFontFamily(style.titleStyle.fontFamily),
                  fontSize: `${Math.min(style.titleStyle.fontSize, 24)}px`,
                  color: style.titleStyle.color
                }}
              >
                {currentSlide.quizQuestion.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentSlide.quizQuestion.options.map((opt, i) => {
                  const isSelected = selectedQuizOption === i;
                  const isCorrect = i === currentSlide.quizQuestion?.correctIndex;
                  let bgBtn = 'rgba(0,0,0,0.2)';
                  let borderBtn = style.cardBorder;
                  let textBtn = style.bodyStyle.color;

                  if (showExplanation) {
                    if (isCorrect) {
                      bgBtn = 'rgba(16, 185, 129, 0.25)';
                      borderBtn = '#10B981';
                      textBtn = '#A7F3D0';
                    } else if (isSelected && !isCorrect) {
                      bgBtn = 'rgba(244, 63, 94, 0.25)';
                      borderBtn = '#F43F5E';
                      textBtn = '#FECDD3';
                    }
                  } else if (isSelected) {
                    bgBtn = `${style.accentColor}30`;
                    borderBtn = style.accentColor;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedQuizOption(i);
                        setShowExplanation(true);
                      }}
                      className="p-3.5 text-left rounded-xl border text-body-ui font-medium transition flex items-center justify-between cursor-pointer"
                      style={{ 
                        backgroundColor: bgBtn, 
                        borderColor: borderBtn, 
                        color: textBtn,
                        fontFamily: getSlideCssFontFamily(style.bodyStyle.fontFamily)
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ backgroundColor: `${style.accentColor}40`, color: style.accentColor }}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {showExplanation && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
              {showExplanation && (
                <div 
                  className="p-4 rounded-xl text-meta leading-relaxed"
                  style={{ 
                    backgroundColor: 'rgba(0,0,0,0.3)', 
                    borderColor: style.cardBorder,
                    borderWidth: '1px',
                    color: style.bodyStyle.color 
                  }}
                >
                  <span className="font-bold mr-1.5" style={{ color: style.accentColor }}>
                    Giải thích:
                  </span>
                  {currentSlide.quizQuestion.explanation}
                </div>
              )}
            </div>
          ) : (
            /* DEFAULT SINGLE TEXT */
            <div 
              className="max-w-3xl mx-auto w-full p-6 md:p-8 rounded-2xl shadow-lg"
              style={{ 
                backgroundColor: style.cardBackground, 
                borderColor: style.cardBorder,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: `${style.radius}px`,
                textAlign: style.bodyStyle.align
              }}
            >
              <p 
                className="leading-[1.8] mb-4"
                style={{
                  fontFamily: getSlideCssFontFamily(style.bodyStyle.fontFamily),
                  fontSize: `${Math.min(style.bodyStyle.fontSize, 20)}px`,
                  fontWeight: style.bodyStyle.fontWeight,
                  fontStyle: style.bodyStyle.italic ? 'italic' : 'normal',
                  color: style.bodyStyle.color
                }}
              >
                {currentSlide.contentLeft}
              </p>
              {currentSlide.bullets && (
                <ul className="space-y-2.5 mt-4 text-body-ui">
                  {currentSlide.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span style={{ color: style.accentColor }}>✦</span>
                      <span style={{ color: style.bodyStyle.color }}>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Slide Bottom Bar with Navigation Controls & Speaker Notes */}
        <div 
          className="pt-3 mt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0"
          style={{ borderColor: style.cardBorder }}
        >
          <div className="flex items-center gap-2 text-metadata max-w-xl leading-relaxed">
            <Lightbulb className="w-4 h-4 shrink-0" style={{ color: style.accentColor }} />
            <span className="line-clamp-1" style={{ color: style.secondaryTextColor }}>
              <strong style={{ color: style.titleStyle.color }}>Ghi chú sư phạm:</strong> {currentSlide.speakerNotes || 'Chưa có ghi chú.'}
            </span>
          </div>
          <div className="flex items-center gap-2 self-end">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              className="min-h-[36px] px-3 py-1.5 rounded-xl border disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1 text-metadata font-semibold cursor-pointer"
              style={{ 
                backgroundColor: style.cardBackground, 
                borderColor: style.cardBorder,
                color: style.titleStyle.color 
              }}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Trước</span>
            </button>
            <button
              onClick={() => setCurrentIndex(prev => Math.min(prev + 1, slides.length - 1))}
              disabled={currentIndex === slides.length - 1}
              className="min-h-[36px] px-3.5 py-1.5 rounded-xl border disabled:opacity-30 disabled:cursor-not-allowed text-white transition flex items-center gap-1 text-metadata font-semibold cursor-pointer shadow-sm"
              style={{ 
                backgroundColor: style.accentColor,
                borderColor: style.accentColor
              }}
            >
              <span>Tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (isFullscreen) {
    return (
      <div 
        className="fixed inset-0 z-50 p-6 md:p-10 overflow-hidden flex flex-col justify-between"
        style={getSlideCssBackground(resolvedStyle.background)}
      >
        {resolvedStyle.background.type === 'image' && resolvedStyle.background.overlay && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundColor: resolvedStyle.background.overlay.color,
              opacity: resolvedStyle.background.overlay.opacity
            }}
          />
        )}
        <div key={currentSlide.id} className="relative z-1 h-full flex flex-col anim-slide-switch">
          {renderSlideCanvas(true, resolvedStyle)}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6 space-y-3 overflow-hidden bg-[#FAF9F7]">
      {/* Top Banner */}
      <div className="bg-white p-3.5 md:p-4 rounded-2xl border border-[#E5E0DA] shadow-[var(--shadow-xs)] flex flex-col lg:flex-row lg:items-center justify-between gap-3 shrink-0 no-print">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-metadata font-semibold bg-[#FCF3F4] text-[#7A2938] border border-[#7A2938]/15 flex items-center gap-1">
              <Presentation className="w-3.5 h-3.5" />
              Storytelling Presentation
            </span>
            <span className="text-metadata text-[#706A65] font-medium hidden sm:inline">
              Chuẩn 16:9 Nghệ thuật Văn học • {resolvedStyle.theme.name}
            </span>
          </div>
          <h1 className="text-section md:text-page-title font-semibold text-[#211E1C] mt-1 leading-[1.3]">
            Slide Trình chiếu & Trích đoạn Văn học
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            data-tour-id="slides-presentation-button"
            onClick={() => setIsFullscreen(true)}
            className="btn-secondary min-h-[36px] px-3.5 py-1.5 rounded-xl text-metadata font-semibold flex items-center gap-1.5 cursor-pointer"
            title="Trình chiếu toàn màn hình (F5 / Phím mũi tên / Space)"
          >
            <Maximize className="w-3.5 h-3.5 text-[#706A65]" />
            <span>Trình chiếu F5</span>
          </button>

          <button
            data-tour-id="slides-editor"
            onClick={() => setIsEditing(!isEditing)}
            className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-metadata font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${
              isEditing 
                ? 'bg-[#7A2938] text-white border-[#7A2938] shadow-[var(--shadow-xs)]' 
                : 'bg-white hover:bg-[#FAF9F7] text-[#302C29] border-[#E5E0DA]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Đóng bảng thiết kế' : 'Thiết kế & Biên tập'}</span>
          </button>

          <button
            onClick={handleExportPptx}
            disabled={isExportingPptx}
            className="btn-primary min-h-[36px] px-3.5 py-1.5 rounded-xl text-metadata font-semibold flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            title="Tải xuống tệp trình chiếu PowerPoint chuẩn 16:9 đồng bộ thiết kế"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExportingPptx ? 'Đang xuất .pptx...' : 'Xuất PowerPoint (.pptx)'}</span>
          </button>

          <button
            onClick={() => exportHtmlSlides(slides, lessonTitle, effectiveSettings)}
            className="btn-secondary min-h-[36px] px-3 py-1.5 rounded-xl text-metadata font-semibold flex items-center gap-1.5 cursor-pointer"
            title="Xuất file HTML xem offline với định dạng font chữ và nền giữ nguyên"
          >
            <FileCode2 className="w-3.5 h-3.5 text-[#706A65]" />
            <span>Xuất Trình chiếu (.html)</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 min-h-0 flex gap-4 overflow-hidden">
        {/* Left Thumbnails Column */}
        <div 
          data-tour-id="slides-thumbnails" 
          className="w-48 xl:w-56 shrink-0 bg-white rounded-2xl border border-[#E5E0DA] shadow-[var(--shadow-xs)] p-2.5 flex flex-col gap-2 overflow-hidden"
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-[#EEEAE5] shrink-0">
            <span className="text-metadata font-semibold text-[#211E1C] flex items-center gap-1">
              <Presentation className="w-3.5 h-3.5 text-[#7A2938]" />
              <span>Slides ({slides.length})</span>
            </span>
            <button
              onClick={handleAddSlide}
              className="p-1 rounded-md bg-[#FCF3F4] hover:bg-[#F8EAEB] text-[#7A2938] border border-[#7A2938]/20 text-xs font-semibold flex items-center gap-0.5 transition cursor-pointer"
              title="Thêm Slide mới"
            >
              <Plus className="w-3 h-3" />
              <span>Thêm</span>
            </button>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto space-y-2 panel-scroll pr-0.5">
            {slides.map((s, idx) => {
              const thumbStyle = resolveSlideStyle(s, effectiveSettings);
              const isActive = idx === currentIndex;

              return (
                <div
                  key={s.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`p-2 rounded-xl border cursor-pointer transition-all relative group ${
                    isActive
                      ? 'border-[#7A2938] ring-2 ring-[#7A2938]/20 bg-[#FCF3F4]/60 shadow-xs'
                      : 'border-[#E5E0DA] hover:border-[#D6D0C8] bg-white'
                  }`}
                >
                  {/* Visual 16:9 mini preview card */}
                  <div 
                    className="w-full h-16 rounded-lg mb-1.5 overflow-hidden border border-black/10 flex flex-col justify-between p-1.5 text-[9px] relative transition shadow-xs"
                    style={getSlideCssBackground(thumbStyle.background)}
                  >
                    {thumbStyle.background.type === 'image' && thumbStyle.background.overlay && (
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundColor: thumbStyle.background.overlay.color,
                          opacity: thumbStyle.background.overlay.opacity
                        }}
                      />
                    )}
                    <div className="relative z-1 flex justify-between items-center text-[8px]">
                      <span 
                        className="font-bold uppercase tracking-wider truncate max-w-[65px]"
                        style={{ color: thumbStyle.accentColor }}
                      >
                        {s.phaseTag}
                      </span>
                      <span style={{ color: thumbStyle.secondaryTextColor }}>#{idx + 1}</span>
                    </div>
                    <div 
                      className="relative z-1 line-clamp-1 font-semibold text-[10px]"
                      style={{ 
                        color: thumbStyle.titleStyle.color,
                        fontFamily: getSlideCssFontFamily(thumbStyle.titleStyle.fontFamily)
                      }}
                    >
                      {s.title}
                    </div>
                  </div>

                  <div className="text-[11px] font-medium text-[#211E1C] line-clamp-1 leading-snug">
                    {s.title}
                  </div>

                  {/* Duplicate / Delete on hover */}
                  <div className="absolute top-1.5 right-1.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition z-10 bg-white/90 p-0.5 rounded shadow-xs">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicateSlide(idx);
                      }}
                      className="p-1 text-stone-500 hover:text-stone-800 rounded transition"
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
                        className="p-1 text-stone-500 hover:text-red-600 rounded transition"
                        title="Xóa slide"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Main Slide Canvas */}
        <div 
          data-tour-id="slides-stage" 
          className="flex-1 min-h-0 rounded-2xl p-4 md:p-6 border border-stone-800 text-stone-100 flex flex-col justify-between overflow-hidden shadow-xl relative transition-all duration-300"
          style={getSlideCssBackground(resolvedStyle.background)}
        >
          {resolvedStyle.background.type === 'image' && resolvedStyle.background.overlay && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundColor: resolvedStyle.background.overlay.color,
                opacity: resolvedStyle.background.overlay.opacity
              }}
            />
          )}
          <div key={currentSlide.id} className="relative z-1 h-full flex flex-col anim-slide-switch">
            {renderSlideCanvas(false, resolvedStyle)}
          </div>
        </div>

        {/* Right Curated Editorial & Design Drawer */}
        {isEditing && (
          <div className="w-88 xl:w-96 shrink-0 bg-white rounded-2xl p-4 flex flex-col gap-3 overflow-hidden border border-[#E5E0DA] shadow-lg animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#EEEAE5] shrink-0">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#7A2938]" />
                <h3 className="text-card-title text-[#211E1C] font-semibold">
                  Biên tập Slide #{currentIndex + 1}
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleDuplicateSlide(currentIndex)}
                  className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition cursor-pointer"
                  title="Nhân bản slide này"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                {slides.length > 1 && (
                  <button
                    onClick={() => handleDeleteSlide(currentIndex)}
                    className="p-1.5 text-stone-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition cursor-pointer"
                    title="Xóa slide này"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg transition cursor-pointer"
                  title="Đóng bảng biên tập"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Editorial Drawer 4 Tabs Header */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-[#F5F3F0] rounded-xl text-metadata shrink-0 font-medium">
              <button
                onClick={() => setActiveEditTab('content')}
                className={`py-1.5 px-1 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                  activeEditTab === 'content'
                    ? 'bg-white text-[#7A2938] shadow-xs font-semibold'
                    : 'text-[#706A65] hover:text-[#211E1C]'
                }`}
              >
                <Edit3 className="w-3 h-3" />
                <span>Nội dung</span>
              </button>
              <button
                onClick={() => setActiveEditTab('theme')}
                className={`py-1.5 px-1 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                  activeEditTab === 'theme'
                    ? 'bg-white text-[#7A2938] shadow-xs font-semibold'
                    : 'text-[#706A65] hover:text-[#211E1C]'
                }`}
              >
                <Palette className="w-3 h-3" />
                <span>Thiết kế</span>
              </button>
              <button
                onClick={() => setActiveEditTab('background')}
                className={`py-1.5 px-1 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                  activeEditTab === 'background'
                    ? 'bg-white text-[#7A2938] shadow-xs font-semibold'
                    : 'text-[#706A65] hover:text-[#211E1C]'
                }`}
              >
                <ImageIcon className="w-3 h-3" />
                <span>Nền</span>
              </button>
              <button
                onClick={() => setActiveEditTab('typography')}
                className={`py-1.5 px-1 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                  activeEditTab === 'typography'
                    ? 'bg-white text-[#7A2938] shadow-xs font-semibold'
                    : 'text-[#706A65] hover:text-[#211E1C]'
                }`}
              >
                <Type className="w-3 h-3" />
                <span>Kiểu chữ</span>
              </button>
            </div>

            {/* TAB BODY */}
            <div className="flex-1 min-h-0 overflow-y-auto space-y-3 panel-scroll pr-1 text-meta">
              {/* ======================================================== */}
              {/* TAB 1: NỘI DUNG                                          */}
              {/* ======================================================== */}
              {activeEditTab === 'content' && (
                <div className="space-y-3">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Pha sư phạm</label>
                    <select
                      value={currentSlide.phaseTag}
                      onChange={(e) => handleUpdateSlide({ phaseTag: e.target.value as SlideItem['phaseTag'] })}
                      className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7A2938]"
                    >
                      <option value="Khởi động">Khởi động</option>
                      <option value="Kiến thức mới">Kiến thức mới</option>
                      <option value="Luyện tập">Luyện tập</option>
                      <option value="Vận dụng">Vận dụng</option>
                      <option value="Tổng kết">Tổng kết</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Tiêu đề Slide</label>
                    <input
                      type="text"
                      value={currentSlide.title}
                      onChange={(e) => handleUpdateSlide({ title: normalizeVietnamese(e.target.value) })}
                      className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7A2938]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Bố cục hiển thị</label>
                    <select
                      value={currentSlide.layout}
                      onChange={(e) => handleUpdateSlide({ layout: e.target.value as SlideItem['layout'] })}
                      className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7A2938]"
                    >
                      <option value="quote">Trích đoạn nghệ thuật (Quote Focus)</option>
                      <option value="split">Song song 2 cột (Split)</option>
                      <option value="cards">Thẻ kiến thức 3 cột (Cards)</option>
                      <option value="quiz">Câu hỏi tương tác (Quiz)</option>
                      <option value="single">Văn bản chuẩn (Single Text)</option>
                    </select>
                  </div>

                  {currentSlide.layout === 'quote' && (
                    <>
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Đoạn trích thơ / văn</label>
                        <textarea
                          rows={4}
                          value={currentSlide.quoteText || ''}
                          onChange={(e) => handleUpdateSlide({ quoteText: normalizeVietnamese(e.target.value) })}
                          className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7A2938] font-serif"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Tác giả / Nguồn trích</label>
                        <input
                          type="text"
                          value={currentSlide.quoteAuthor || ''}
                          onChange={(e) => handleUpdateSlide({ quoteAuthor: normalizeVietnamese(e.target.value) })}
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7A2938]"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Câu hỏi khám phá / thảo luận</label>
                        <textarea
                          rows={2}
                          value={currentSlide.discussionQuestion || ''}
                          onChange={(e) => handleUpdateSlide({ discussionQuestion: normalizeVietnamese(e.target.value) })}
                          className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7A2938]"
                        />
                      </div>
                    </>
                  )}

                  {currentSlide.layout === 'split' && (
                    <>
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Nội dung cột trái</label>
                        <textarea
                          rows={3}
                          value={currentSlide.contentLeft || ''}
                          onChange={(e) => handleUpdateSlide({ contentLeft: normalizeVietnamese(e.target.value) })}
                          className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7A2938]"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Nội dung cột phải</label>
                        <textarea
                          rows={3}
                          value={currentSlide.contentRight || ''}
                          onChange={(e) => handleUpdateSlide({ contentRight: normalizeVietnamese(e.target.value) })}
                          className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7A2938] font-serif"
                        />
                      </div>
                    </>
                  )}

                  {currentSlide.layout === 'cards' && currentSlide.cards && (
                    <div className="space-y-2">
                      <label className="block font-medium text-stone-700">3 Thẻ luận điểm</label>
                      {currentSlide.cards.map((c, ci) => (
                        <div key={ci} className="p-2 border border-stone-200 rounded-xl bg-[#FAF9F7] space-y-1">
                          <input
                            type="text"
                            value={c.title}
                            placeholder={`Tiêu đề thẻ ${ci + 1}`}
                            onChange={(e) => {
                              const next = [...(currentSlide.cards || [])];
                              next[ci] = { ...next[ci], title: normalizeVietnamese(e.target.value) };
                              handleUpdateSlide({ cards: next });
                            }}
                            className="w-full px-2 py-1 text-xs border border-stone-300 rounded-lg bg-white"
                          />
                          <textarea
                            rows={2}
                            value={c.desc}
                            placeholder={`Nội dung thẻ ${ci + 1}`}
                            onChange={(e) => {
                              const next = [...(currentSlide.cards || [])];
                              next[ci] = { ...next[ci], desc: normalizeVietnamese(e.target.value) };
                              handleUpdateSlide({ cards: next });
                            }}
                            className="w-full px-2 py-1 text-xs border border-stone-300 rounded-lg bg-white"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {currentSlide.layout === 'single' && (
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Nội dung chính</label>
                      <textarea
                        rows={4}
                        value={currentSlide.contentLeft || ''}
                        onChange={(e) => handleUpdateSlide({ contentLeft: normalizeVietnamese(e.target.value) })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7A2938]"
                      />
                    </div>
                  )}

                  {currentSlide.layout === 'quiz' && currentSlide.quizQuestion && (
                    <div className="space-y-2">
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Câu hỏi trắc nghiệm</label>
                        <textarea
                          rows={2}
                          value={currentSlide.quizQuestion.question}
                          onChange={(e) => handleUpdateSlide({ 
                            quizQuestion: { ...currentSlide.quizQuestion!, question: normalizeVietnamese(e.target.value) } 
                          })}
                          className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block font-medium text-stone-700">4 Phương án (chọn đáp án đúng)</label>
                        {currentSlide.quizQuestion.options.map((opt, oi) => (
                          <div key={oi} className="flex items-center gap-1.5">
                            <input
                              type="radio"
                              name="quiz-correct"
                              checked={currentSlide.quizQuestion?.correctIndex === oi}
                              onChange={() => handleUpdateSlide({
                                quizQuestion: { ...currentSlide.quizQuestion!, correctIndex: oi }
                              })}
                              className="accent-[#7A2938]"
                            />
                            <span className="w-5 font-bold text-stone-600">{String.fromCharCode(65 + oi)}.</span>
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const nextOpts = [...(currentSlide.quizQuestion?.options || [])];
                                nextOpts[oi] = normalizeVietnamese(e.target.value);
                                handleUpdateSlide({
                                  quizQuestion: { ...currentSlide.quizQuestion!, options: nextOpts }
                                });
                              }}
                              className="flex-1 px-2 py-1 text-xs border border-stone-300 rounded-lg bg-white"
                            />
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Giải thích đáp án</label>
                        <textarea
                          rows={2}
                          value={currentSlide.quizQuestion.explanation}
                          onChange={(e) => handleUpdateSlide({
                            quizQuestion: { ...currentSlide.quizQuestion!, explanation: normalizeVietnamese(e.target.value) }
                          })}
                          className="w-full px-2 py-1 text-xs border border-stone-300 rounded-xl bg-white"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Ghi chú sư phạm (Speaker Notes)</label>
                    <textarea
                      rows={2}
                      value={currentSlide.speakerNotes || ''}
                      onChange={(e) => handleUpdateSlide({ speakerNotes: normalizeVietnamese(e.target.value) })}
                      placeholder="Gợi ý phương pháp, định hướng thời gian thảo luận..."
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white text-body-ui text-stone-900 focus:outline-none focus:border-[#7A2938]"
                    />
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 2: THIẾT KẾ (THEMES & TEMPLATES)                     */}
              {/* ======================================================== */}
              {activeEditTab === 'theme' && (
                <div className="space-y-4">
                  {/* Theme Presets List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-stone-900 text-metadata flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        8 CHỦ ĐỀ HỌC THUẬT CHUYÊN SÂU
                      </span>
                    </div>

                    <div className="space-y-2">
                      {THEME_LIST.map((theme) => {
                        const isCurrentTheme = resolvedStyle.themeId === theme.id;
                        const bgPreviewHex = getEffectiveBackgroundHex(theme.background);

                        return (
                          <div
                            key={theme.id}
                            className={`p-2.5 rounded-xl border transition-all ${
                              isCurrentTheme
                                ? 'border-[#7A2938] ring-2 ring-[#7A2938]/15 bg-[#FCF3F4]/50'
                                : 'border-stone-200 hover:border-stone-300 bg-white'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-2">
                                {/* Theme Swatch Circles */}
                                <div className="flex items-center -space-x-1 shrink-0">
                                  <span 
                                    className="w-4 h-4 rounded-full border border-black/20 shadow-xs" 
                                    style={{ backgroundColor: bgPreviewHex }} 
                                    title="Màu nền"
                                  />
                                  <span 
                                    className="w-4 h-4 rounded-full border border-black/20 shadow-xs" 
                                    style={{ backgroundColor: theme.colors.title }} 
                                    title="Màu tiêu đề"
                                  />
                                  <span 
                                    className="w-4 h-4 rounded-full border border-black/20 shadow-xs" 
                                    style={{ backgroundColor: theme.colors.accent }} 
                                    title="Màu điểm nhấn"
                                  />
                                </div>
                                <div className="font-semibold text-stone-900 text-body-ui">
                                  {theme.name}
                                </div>
                              </div>
                              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                                {theme.style}
                              </span>
                            </div>

                            <p className="text-xs text-stone-500 mb-2 leading-relaxed">
                              {theme.description}
                            </p>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleApplyThemeToCurrentSlide(theme.id)}
                                className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                                  isCurrentTheme
                                    ? 'bg-[#7A2938] text-white border-[#7A2938]'
                                    : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-300'
                                }`}
                              >
                                {isCurrentTheme ? '✓ Đang dùng slide này' : 'Áp dụng slide này'}
                              </button>
                              <button
                                onClick={() => handleApplyThemeToAllSlides(theme.id)}
                                className="py-1 px-2.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                                title="Áp dụng chủ đề này cho tất cả slide trong bài học"
                              >
                                Toàn bộ
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Curated Templates Section */}
                  <div className="pt-2 border-t border-stone-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-stone-900 text-metadata flex items-center gap-1.5">
                        <Wand2 className="w-3.5 h-3.5 text-[#7A2938]" />
                        12 MẪU TRÌNH BÀY BÀI GIẢNG SẴN
                      </span>
                    </div>

                    {/* Filter Category Tabs */}
                    <div className="flex flex-wrap gap-1 mb-2.5">
                      {TEMPLATE_CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedTemplateCat(cat.id)}
                          className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition cursor-pointer ${
                            selectedTemplateCat === cat.id
                              ? 'bg-[#7A2938] text-white'
                              : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Template Cards Grid */}
                    <div className="space-y-2">
                      {SLIDE_TEMPLATES
                        .filter(t => selectedTemplateCat === 'all' || t.category === selectedTemplateCat)
                        .map(tmpl => {
                          const tmplTheme = SLIDE_THEMES[tmpl.themeId] || SLIDE_THEMES[DEFAULT_THEME_ID];
                          const tmplBg = getEffectiveBackgroundHex(tmplTheme.background);

                          return (
                            <div 
                              key={tmpl.id}
                              className="p-2 rounded-xl border border-stone-200 hover:border-stone-300 bg-white flex flex-col gap-1.5"
                            >
                              <div className="flex items-start gap-2">
                                {/* 16:9 Thumbnail preview snippet */}
                                <div 
                                  className="w-20 h-12 rounded-lg shrink-0 p-1 flex flex-col justify-between overflow-hidden shadow-xs border border-black/10"
                                  style={{ backgroundColor: tmplBg }}
                                >
                                  <div 
                                    className="text-[7px] font-bold line-clamp-1"
                                    style={{ color: tmplTheme.colors.title }}
                                  >
                                    {tmpl.previewSnippet.title}
                                  </div>
                                  <div 
                                    className="text-[6px] line-clamp-1 italic"
                                    style={{ color: tmplTheme.colors.accent }}
                                  >
                                    {tmpl.categoryLabel}
                                  </div>
                                </div>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between">
                                    <h5 className="font-semibold text-stone-900 text-xs truncate">
                                      {tmpl.name}
                                    </h5>
                                    <span className="text-[10px] text-stone-500">
                                      {tmpl.suggestedLayout}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">
                                    {tmpl.description}
                                  </p>
                                </div>
                              </div>

                              <button
                                onClick={() => handleApplyTemplate(tmpl)}
                                className="w-full py-1 rounded-lg text-xs font-semibold bg-[#FCF3F4] hover:bg-[#F8EAEB] text-[#7A2938] border border-[#7A2938]/20 transition cursor-pointer"
                              >
                                Áp dụng mẫu này
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Reset Options */}
                  <div className="pt-2 border-t border-stone-200 space-y-1.5">
                    <button
                      onClick={handleResetCurrentSlideStyle}
                      className="w-full py-1.5 px-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                      <span>Đặt lại slide này về mặc định</span>
                    </button>
                    <button
                      onClick={handleResetAllSlidesToDefault}
                      className="w-full py-1.5 px-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                      <span>Đặt lại toàn bộ bài giảng về mặc định</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 3: NỀN (BACKGROUND)                                  */}
              {/* ======================================================== */}
              {activeEditTab === 'background' && (
                <div className="space-y-4">
                  {/* Segmented control for BG modes */}
                  <div className="grid grid-cols-4 gap-1 p-1 bg-stone-100 rounded-xl text-metadata shrink-0">
                    <button
                      onClick={() => setBgMode('solid')}
                      className={`py-1 rounded-lg font-medium transition cursor-pointer ${
                        bgMode === 'solid' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600'
                      }`}
                    >
                      Màu sắc
                    </button>
                    <button
                      onClick={() => setBgMode('gradient')}
                      className={`py-1 rounded-lg font-medium transition cursor-pointer ${
                        bgMode === 'gradient' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600'
                      }`}
                    >
                      Chuyển sắc
                    </button>
                    <button
                      onClick={() => setBgMode('image')}
                      className={`py-1 rounded-lg font-medium transition cursor-pointer ${
                        bgMode === 'image' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600'
                      }`}
                    >
                      Hình ảnh
                    </button>
                    <button
                      onClick={() => setBgMode('vignette')}
                      className={`py-1 rounded-lg font-medium transition cursor-pointer ${
                        bgMode === 'vignette' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600'
                      }`}
                    >
                      Khí chất
                    </button>
                  </div>

                  {/* Mode: SOLID */}
                  {bgMode === 'solid' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block font-semibold text-stone-800 text-xs mb-1.5">
                          8 BẢNG MÀU ĐƠN SẮC CHUẨN
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {SOLID_COLOR_PRESETS.map(preset => {
                            const isSelected = resolvedStyle.background.type === 'solid' && resolvedStyle.background.color === preset.hex;
                            return (
                              <button
                                key={preset.id}
                                onClick={() => handleApplyBackground({ type: 'solid', color: preset.hex }, false)}
                                className={`p-2 rounded-xl border flex items-center gap-2 text-left transition cursor-pointer ${
                                  isSelected
                                    ? 'border-[#7A2938] ring-2 ring-[#7A2938]/15 bg-[#FCF3F4]/60'
                                    : 'border-stone-200 hover:border-stone-300 bg-white'
                                }`}
                              >
                                <span 
                                  className="w-4 h-4 rounded-full border border-black/20 shrink-0 shadow-xs"
                                  style={{ backgroundColor: preset.hex }}
                                />
                                <span className="text-xs font-medium text-stone-800 truncate">
                                  {preset.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Custom Hex Color Picker */}
                      <div>
                        <label className="block font-medium text-stone-700 text-xs mb-1">
                          Mã màu tùy chỉnh (#HEX)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={normalizeHex(customSolidHex, '#171413')}
                            onChange={(e) => {
                              setCustomSolidHex(e.target.value);
                              handleApplyBackground({ type: 'solid', color: e.target.value }, false);
                            }}
                            className="w-10 h-9 p-0.5 rounded-lg border border-stone-300 bg-white cursor-pointer shrink-0"
                          />
                          <input
                            type="text"
                            value={customSolidHex}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCustomSolidHex(val);
                              if (validateHexColor(val)) {
                                handleApplyBackground({ type: 'solid', color: val }, false);
                              }
                            }}
                            placeholder="#171413"
                            className="flex-1 px-3 py-1.5 border border-stone-300 rounded-xl bg-white text-xs font-mono text-stone-900"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mode: GRADIENT */}
                  {bgMode === 'gradient' && (
                    <div className="space-y-3">
                      <label className="block font-semibold text-stone-800 text-xs">
                        5 BẢNG CHUYỂN SẮC TRẦM ẤM
                      </label>
                      <div className="space-y-2">
                        {GRADIENT_PRESETS.map(preset => {
                          const gradCss = `linear-gradient(${preset.angle}deg, ${preset.from}, ${preset.to})`;
                          const isSelected = resolvedStyle.background.type === 'gradient' && 
                            resolvedStyle.background.gradient?.from === preset.from &&
                            resolvedStyle.background.gradient?.to === preset.to;

                          return (
                            <button
                              key={preset.id}
                              onClick={() => handleApplyBackground({
                                type: 'gradient',
                                gradient: {
                                  from: preset.from,
                                  to: preset.to,
                                  angle: preset.angle
                                }
                              }, false)}
                              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition cursor-pointer ${
                                isSelected 
                                  ? 'border-[#7A2938] ring-2 ring-[#7A2938]/15 bg-white' 
                                  : 'border-stone-200 hover:border-stone-300 bg-white'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span 
                                  className="w-7 h-7 rounded-lg border border-black/20 shadow-xs shrink-0"
                                  style={{ background: gradCss }}
                                />
                                <div>
                                  <div className="text-xs font-semibold text-stone-900">{preset.name}</div>
                                  <div className="text-[10px] text-stone-500 font-mono">{preset.from} → {preset.to}</div>
                                </div>
                              </div>
                              {isSelected && <Check className="w-4 h-4 text-[#7A2938]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Mode: IMAGE */}
                  {bgMode === 'image' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block font-semibold text-stone-800 text-xs mb-1.5">
                          HÌNH ẢNH MINH HỌA NỀN (TỰ ĐỘNG NÉN)
                        </label>
                        <input
                          type="file"
                          ref={imageInputRef}
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <button
                          onClick={() => imageInputRef.current?.click()}
                          disabled={isUploadingImage}
                          className="w-full py-2.5 px-3 rounded-xl border border-dashed border-stone-300 hover:border-[#7A2938] bg-stone-50 hover:bg-[#FCF3F4]/50 text-stone-700 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                        >
                          <Upload className="w-4 h-4 text-stone-500" />
                          <span>{isUploadingImage ? 'Đang nén ảnh...' : 'Tải lên ảnh từ máy tính (JPEG / PNG)'}</span>
                        </button>
                      </div>

                      {/* If Current Slide has Image */}
                      {resolvedStyle.background.type === 'image' && resolvedStyle.background.imageUrl && (
                        <div className="space-y-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-stone-700">Ảnh đang dùng:</span>
                            <button
                              onClick={() => handleApplyBackground({ type: 'solid', color: '#171413' }, false)}
                              className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
                            >
                              Gỡ bỏ ảnh
                            </button>
                          </div>

                          <div className="h-20 w-full rounded-lg overflow-hidden border border-stone-300 relative">
                            <img 
                              src={resolvedStyle.background.imageUrl} 
                              alt="Slide preview" 
                              className="w-full h-full object-cover"
                            />
                            {resolvedStyle.background.overlay && (
                              <div 
                                className="absolute inset-0"
                                style={{
                                  backgroundColor: resolvedStyle.background.overlay.color,
                                  opacity: resolvedStyle.background.overlay.opacity
                                }}
                              />
                            )}
                          </div>

                          {/* Fit & Position */}
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <label className="block text-stone-600 mb-1">Cách vừa khung</label>
                              <select
                                value={resolvedStyle.background.imageFit || 'cover'}
                                onChange={(e) => handleApplyBackground({
                                  ...resolvedStyle.background,
                                  imageFit: e.target.value as any
                                }, false)}
                                className="w-full px-2 py-1 border border-stone-300 rounded-lg bg-white"
                              >
                                <option value="cover">Phủ kín (Cover)</option>
                                <option value="contain">Vừa vặn (Contain)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-stone-600 mb-1">Vị trí căn</label>
                              <select
                                value={resolvedStyle.background.imagePosition || 'center'}
                                onChange={(e) => handleApplyBackground({
                                  ...resolvedStyle.background,
                                  imagePosition: e.target.value as any
                                }, false)}
                                className="w-full px-2 py-1 border border-stone-300 rounded-lg bg-white"
                              >
                                <option value="center">Chính giữa</option>
                                <option value="top">Phía trên</option>
                                <option value="bottom">Phía dưới</option>
                              </select>
                            </div>
                          </div>

                          {/* Overlay Opacity Slider */}
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-stone-700 font-medium">Lớp phủ tối tương phản:</span>
                              <span className="font-mono text-stone-600">
                                {Math.round((resolvedStyle.background.overlay?.opacity || 0.5) * 100)}%
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="0.8"
                              step="0.05"
                              value={resolvedStyle.background.overlay?.opacity ?? 0.5}
                              onChange={(e) => handleApplyBackground({
                                ...resolvedStyle.background,
                                overlay: {
                                  color: resolvedStyle.background.overlay?.color || '#000000',
                                  opacity: parseFloat(e.target.value)
                                }
                              }, false)}
                              className="w-full accent-[#7A2938] cursor-pointer"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mode: VIGNETTE */}
                  {bgMode === 'vignette' && (
                    <div className="space-y-3">
                      <label className="block font-semibold text-stone-800 text-xs">
                        6 KHÍ CHẤT VĂN HỌC (ACADEMIC VIGNETTES)
                      </label>
                      <div className="space-y-2">
                        {ACADEMIC_VIGNETTES.map(vig => {
                          const isSelected = resolvedStyle.background.type === 'vignette' && 
                            resolvedStyle.background.vignette?.name === vig.name;

                          return (
                            <button
                              key={vig.id}
                              onClick={() => handleApplyBackground({
                                type: 'vignette',
                                vignette: {
                                  name: vig.name,
                                  baseColor: vig.fallbackColor,
                                  glowColor: 'rgba(245, 158, 11, 0.12)',
                                  cssBackground: vig.cssBackground,
                                  fallbackColor: vig.fallbackColor
                                }
                              }, false)}
                              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition cursor-pointer ${
                                isSelected 
                                  ? 'border-[#7A2938] ring-2 ring-[#7A2938]/15 bg-white' 
                                  : 'border-stone-200 hover:border-stone-300 bg-white'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span 
                                  className="w-7 h-7 rounded-lg border border-black/20 shadow-xs shrink-0"
                                  style={{
                                    background: vig.cssBackground
                                  }}
                                />
                                <div>
                                  <div className="text-xs font-semibold text-stone-900">{vig.name}</div>
                                  <div className="text-[10px] text-stone-500">{vig.category}</div>
                                </div>
                              </div>
                              {isSelected && <Check className="w-4 h-4 text-[#7A2938]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Scope Actions for Background */}
                  <div className="pt-2 border-t border-stone-200 flex items-center gap-2">
                    <button
                      onClick={() => handleApplyBackground(resolvedStyle.background, true)}
                      className="flex-1 py-1.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition cursor-pointer"
                    >
                      Áp dụng nền cho toàn bộ bài
                    </button>
                    <button
                      onClick={() => {
                        handleUpdateStyleOverrides({ background: undefined });
                        showToast('Đã khôi phục nền theo chủ đề.');
                      }}
                      className="py-1.5 px-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition cursor-pointer"
                    >
                      Mặc định
                    </button>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 4: KIỂU CHỮ (TYPOGRAPHY)                             */}
              {/* ======================================================== */}
              {activeEditTab === 'typography' && (
                <div className="space-y-4">
                  {/* Typography Target Switcher */}
                  <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-xl text-metadata shrink-0">
                    <button
                      onClick={() => setTypoTarget('title')}
                      className={`py-1.5 rounded-lg font-medium transition cursor-pointer ${
                        typoTarget === 'title' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600'
                      }`}
                    >
                      Tiêu đề
                    </button>
                    <button
                      onClick={() => setTypoTarget('body')}
                      className={`py-1.5 rounded-lg font-medium transition cursor-pointer ${
                        typoTarget === 'body' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600'
                      }`}
                    >
                      Nội dung
                    </button>
                    <button
                      onClick={() => setTypoTarget('quote')}
                      className={`py-1.5 rounded-lg font-medium transition cursor-pointer ${
                        typoTarget === 'quote' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600'
                      }`}
                    >
                      Trích dẫn
                    </button>
                  </div>

                  {/* Font Family Dropdown */}
                  <div>
                    <label className="block font-medium text-stone-700 text-xs mb-1">
                      Phông chữ (Font Family)
                    </label>
                    <select
                      value={activeTypoStyle.fontFamily}
                      onChange={(e) => handleUpdateTypography(typoTarget, { fontFamily: e.target.value as SlideFontFamily })}
                      className="w-full px-3 py-1.5 border border-stone-300 rounded-xl bg-white text-xs text-stone-900"
                    >
                      <optgroup label="Serif — Học thuật & Thi ca">
                        <option value="Lora">Lora (Khuyên dùng cho Văn học)</option>
                        <option value="Georgia">Georgia (Cổ điển, rõ nét)</option>
                        <option value="Merriweather">Merriweather (Dày dặn, trang trọng)</option>
                        <option value="Noto Serif">Noto Serif (Chuẩn Unicode tiếng Việt)</option>
                      </optgroup>
                      <optgroup label="Sans-serif — Hiện đại & Rõ ràng">
                        <option value="Be Vietnam Pro">Be Vietnam Pro (Tối ưu hóa tiếng Việt)</option>
                        <option value="Inter">Inter (Tinh tế, hiện đại)</option>
                        <option value="Arial">Arial (Tương thích cao lớp học)</option>
                        <option value="Noto Sans">Noto Sans (Chuẩn mực)</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Font Size Stepper */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-stone-700">Cỡ chữ (Font Size):</span>
                      <span className="font-mono text-stone-800 font-bold">{activeTypoStyle.fontSize}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateTypography(typoTarget, { 
                          fontSize: Math.max(activeTypoStyle.fontSize - 2, typoTarget === 'title' ? 20 : typoTarget === 'body' ? 14 : 18) 
                        })}
                        className="w-8 h-8 rounded-lg border border-stone-300 hover:bg-stone-100 flex items-center justify-center font-bold text-stone-700 cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="range"
                        min={typoTarget === 'title' ? 20 : typoTarget === 'body' ? 14 : 18}
                        max={typoTarget === 'title' ? 64 : typoTarget === 'body' ? 40 : 52}
                        value={activeTypoStyle.fontSize}
                        onChange={(e) => handleUpdateTypography(typoTarget, { fontSize: parseInt(e.target.value) })}
                        className="flex-1 accent-[#7A2938] cursor-pointer"
                      />
                      <button
                        onClick={() => handleUpdateTypography(typoTarget, { 
                          fontSize: Math.min(activeTypoStyle.fontSize + 2, typoTarget === 'title' ? 64 : typoTarget === 'body' ? 40 : 52) 
                        })}
                        className="w-8 h-8 rounded-lg border border-stone-300 hover:bg-stone-100 flex items-center justify-center font-bold text-stone-700 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Font Weight & Italic & Alignment */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Độ đậm (Weight)</label>
                      <select
                        value={activeTypoStyle.fontWeight}
                        onChange={(e) => handleUpdateTypography(typoTarget, { fontWeight: parseInt(e.target.value) })}
                        className="w-full px-2 py-1.5 border border-stone-300 rounded-xl bg-white text-stone-900"
                      >
                        <option value={400}>400 - Thường</option>
                        <option value={500}>500 - Vừa</option>
                        <option value={600}>600 - Bán đậm</option>
                        <option value={700}>700 - Đậm</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Căn lề (Align)</label>
                      <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-xl border border-stone-200">
                        <button
                          onClick={() => handleUpdateTypography(typoTarget, { align: 'left' })}
                          className={`flex-1 py-1 rounded-lg flex items-center justify-center cursor-pointer ${
                            activeTypoStyle.align === 'left' ? 'bg-white shadow-xs text-stone-900 font-bold' : 'text-stone-500'
                          }`}
                          title="Căn trái"
                        >
                          <AlignLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleUpdateTypography(typoTarget, { align: 'center' })}
                          className={`flex-1 py-1 rounded-lg flex items-center justify-center cursor-pointer ${
                            activeTypoStyle.align === 'center' ? 'bg-white shadow-xs text-stone-900 font-bold' : 'text-stone-500'
                          }`}
                          title="Căn giữa"
                        >
                          <AlignCenter className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleUpdateTypography(typoTarget, { align: 'right' })}
                          className={`flex-1 py-1 rounded-lg flex items-center justify-center cursor-pointer ${
                            activeTypoStyle.align === 'right' ? 'bg-white shadow-xs text-stone-900 font-bold' : 'text-stone-500'
                          }`}
                          title="Căn phải"
                        >
                          <AlignRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Italic toggle button */}
                  <div>
                    <button
                      onClick={() => handleUpdateTypography(typoTarget, { italic: !activeTypoStyle.italic })}
                      className={`w-full py-1.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition cursor-pointer ${
                        activeTypoStyle.italic
                          ? 'bg-amber-50 text-amber-900 border-amber-300'
                          : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-300'
                      }`}
                    >
                      <Italic className="w-3.5 h-3.5" />
                      <span>{activeTypoStyle.italic ? 'Đang in nghiêng (Italic)' : 'Bật in nghiêng (Italic)'}</span>
                    </button>
                  </div>

                  {/* Text Color & WCAG AA Contrast Guard */}
                  <div>
                    <label className="block font-medium text-stone-700 text-xs mb-1">
                      Màu chữ & Độ tương phản
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="color"
                        value={normalizeHex(activeTypoStyle.color, '#FAF8F5')}
                        onChange={(e) => {
                          setCustomTypoHex(e.target.value);
                          handleUpdateTypography(typoTarget, { color: e.target.value });
                        }}
                        className="w-10 h-9 p-0.5 rounded-lg border border-stone-300 bg-white cursor-pointer shrink-0"
                      />
                      <input
                        type="text"
                        value={customTypoHex}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomTypoHex(val);
                          if (validateHexColor(val)) {
                            handleUpdateTypography(typoTarget, { color: val });
                          }
                        }}
                        placeholder="#FAF8F5"
                        className="flex-1 px-3 py-1.5 border border-stone-300 rounded-xl bg-white text-xs font-mono text-stone-900"
                      />
                    </div>

                    {/* WCAG AA Contrast Evaluation Pill */}
                    {currentContrastWarning ? (
                      <div className="p-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-[11px] leading-relaxed flex items-start gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>{currentContrastWarning}</strong>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-[11px] leading-relaxed flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>
                          Độ tương phản tốt ({currentRatio}:1). Đạt chuẩn trình chiếu WCAG AA.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Scope Buttons for Typography */}
                  <div className="pt-2 border-t border-stone-200 flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateTypography(typoTarget, activeTypoStyle, true)}
                      className="flex-1 py-1.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition cursor-pointer"
                    >
                      Áp dụng cho toàn bộ bài
                    </button>
                    <button
                      onClick={() => {
                        const propKey = typoTarget === 'title' ? 'titleStyle' : typoTarget === 'body' ? 'bodyStyle' : 'quoteStyle';
                        handleUpdateStyleOverrides({ [propKey]: undefined });
                        showToast(`Đã khôi phục kiểu chữ ${typoTarget} về mặc định.`);
                      }}
                      className="py-1.5 px-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition cursor-pointer"
                    >
                      Mặc định
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer Status */}
            <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-xs text-stone-500 shrink-0">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                Tự động lưu vào phiên làm việc
              </span>
              <button
                onClick={() => setIsEditing(false)}
                className="btn-primary py-1 px-3 text-xs cursor-pointer"
              >
                Hoàn tất
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#211E1C] text-white px-4 py-3 rounded-xl shadow-[var(--shadow-lg)] text-body-ui border border-stone-800 anim-toast">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
