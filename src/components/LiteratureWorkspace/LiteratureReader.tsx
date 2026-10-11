import React, { useState, useRef } from 'react';
import { 
  Highlighter, 
  MessageSquarePlus, 
  HelpCircle, 
  Minimize2, 
  Trash2, 
  Sparkles, 
  FileText, 
  Presentation, 
  CheckSquare, 
  X,
  Compass,
  Layers,
  BookOpen,
  Edit3,
  Check,
  Plus
} from 'lucide-react';
import { 
  LiteratureLesson, 
  TextAnnotation, 
  ActiveModule 
} from '../../types';
import { normalizeVietnamese } from '../../utils/unicode';

interface LiteratureReaderProps {
  lesson: LiteratureLesson;
  onUpdateLesson: (updated: Partial<LiteratureLesson>) => void;
  setActiveModule: (m: ActiveModule) => void;
  onAddSlideFromQuote: (quote: string, author: string) => void;
  onAddQuestionFromPassage: (passage: string) => void;
  onSetExamPassage: (passage: string) => void;
  isFocusMode?: boolean;
  onToggleFocusMode?: () => void;
}

export const LiteratureReader: React.FC<LiteratureReaderProps> = ({
  lesson,
  onUpdateLesson,
  setActiveModule,
  onAddSlideFromQuote,
  onAddQuestionFromPassage,
  onSetExamPassage,
  isFocusMode: externalFocusMode,
  onToggleFocusMode: externalToggleFocusMode
}) => {
  // Local Focus Mode fallback if not controlled from parent
  const [internalFocusMode, setInternalFocusMode] = useState(false);
  const isFocusMode = externalFocusMode !== undefined ? externalFocusMode : internalFocusMode;
  const toggleFocusMode = externalToggleFocusMode || (() => setInternalFocusMode(!internalFocusMode));

  // Document Edit Mode toggle
  const [isEditingDoc, setIsEditingDoc] = useState(false);

  // Layout panels toggle (on desktop)
  const [isOutlineOpen, setIsOutlineOpen] = useState(true);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(true);

  // Left Column tab: 'outline' | 'annotations'
  const [outlineTab, setOutlineTab] = useState<'outline' | 'annotations'>('outline');
  const [selectedOutlineSection, setSelectedOutlineSection] = useState<string>('author');

  // Right Column tab: 'analysis' | 'notes' | 'links'
  const [activeRightTab, setActiveRightTab] = useState<'analysis' | 'notes' | 'links'>('analysis');

  // Analysis sub-sections state
  const [openAnalysisSection, setOpenAnalysisSection] = useState<string>('sec-1');

  // Text Selection & Floating Contextual Toolbar state
  const [selectedText, setSelectedText] = useState('');
  const [toolbarPos, setToolbarPos] = useState<{ x: number; y: number } | null>(null);
  const [showAnnotationModal, setShowAnnotationModal] = useState(false);
  const [annotationInputNote, setAnnotationInputNote] = useState('');
  const [annotationColor, setAnnotationColor] = useState<'amber' | 'emerald' | 'blue' | 'purple' | 'rose'>('amber');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const documentContainerRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Text selection handler (Rule: length >= 2)
  const handleSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.toString().trim()) {
      setToolbarPos(null);
      setSelectedText('');
      return;
    }

    const text = selection.toString().trim();
    if (text.length >= 2) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(text);
      setToolbarPos({
        x: Math.max(16, rect.left + rect.width / 2 - 180),
        y: Math.max(16, rect.top - 52)
      });
    }
  };

  // Save annotation or highlight with specific color
  const handleSaveAnnotation = (
    type: TextAnnotation['type'], 
    defaultNote = '', 
    chosenColor?: TextAnnotation['color']
  ) => {
    if (!selectedText) return;
    const finalColor = chosenColor || annotationColor;
    const newAnnotation: TextAnnotation = {
      id: `anno-${Date.now()}`,
      textSnippet: selectedText,
      type: type,
      note: annotationInputNote || defaultNote || `Đoạn trích: "${selectedText.slice(0, 30)}..."`,
      color: finalColor,
      timestamp: 'Vừa xong'
    };

    onUpdateLesson({
      annotations: [newAnnotation, ...lesson.annotations]
    });

    setToolbarPos(null);
    setShowAnnotationModal(false);
    setAnnotationInputNote('');
    showToast(`Đã lưu ${type === 'highlight' ? 'đánh dấu' : 'chú thích'} (${finalColor}): "${selectedText.slice(0, 24)}..."`);
  };

  const handleDeleteAnnotation = (id: string) => {
    onUpdateLesson({
      annotations: lesson.annotations.filter(a => a.id !== id)
    });
    showToast('Đã xóa ghi chú');
  };

  // Dynamic Outline List from current lesson sections
  const outlineList = [
    { id: 'author-context', label: 'Tác giả & Bối cảnh' },
    ...(lesson.textSections && lesson.textSections.length > 0 
      ? lesson.textSections.map((s, idx) => ({ id: s.id, label: s.title || `Đoạn ${idx + 1}` }))
      : [{ id: 'full-text', label: 'Văn bản toàn phần' }]
    ),
    { id: 'lesson-footer', label: 'Tổng kết & Ý nghĩa' }
  ];

  const handleSelectOutline = (id: string) => {
    setSelectedOutlineSection(id);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`relative min-h-[calc(100vh-56px)] flex flex-col ${isFocusMode ? 'bg-[#FAF8F5]' : ''}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#292524] text-white text-[13px] px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-stone-700 anim-toast">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={1.75} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Toolbar when Focus Mode is active */}
      {isFocusMode && (
        <div className="fixed top-4 right-6 z-40 bg-white/95 backdrop-blur-xs border border-[#E7E5E4] rounded-full px-4 py-1.5 shadow-md flex items-center gap-2 text-[13px]">
          <span className="text-[#78716C] font-serif italic text-[12px]">Focus Mode</span>
          <button
            onClick={toggleFocusMode}
            className="btn-ghost py-1 px-2.5 text-[12px] h-auto flex items-center gap-1 font-medium text-[#7C2D37]"
            title="Thoát chế độ tập trung"
          >
            <Minimize2 className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Thoát</span>
          </button>
        </div>
      )}

      {/* Main Workspace Body - 3 Viewport-First Local Scroll Panels */}
      <div className="h-full min-h-0 flex gap-4 xl:gap-6 p-4 md:p-6 overflow-hidden max-w-7xl w-full mx-auto">
        {/* ========================================================================= */}
        {/* CỘT 1: OUTLINE (240px - Scroll riêng) */}
        {/* ========================================================================= */}
        {!isFocusMode && (
          <aside 
            className={`w-[240px] shrink-0 h-full min-h-0 flex flex-col card-surface p-3 overflow-hidden transition-all duration-200 ${
              isOutlineOpen ? 'flex' : 'hidden'
            } hidden xl:flex`}
          >
            {/* Outline / Annotations Tab Selector */}
            <div className="flex p-0.5 bg-stone-100 rounded-lg mb-3 shrink-0">
              <button
                onClick={() => setOutlineTab('outline')}
                className={`flex-1 py-1 rounded-md text-[12px] font-medium transition-colors ${
                  outlineTab === 'outline' ? 'bg-white text-[#292524] shadow-2xs font-semibold' : 'text-[#78716C]'
                }`}
              >
                Cấu trúc ({outlineList.length})
              </button>
              <button
                onClick={() => setOutlineTab('annotations')}
                className={`flex-1 py-1 rounded-md text-[12px] font-medium transition-colors ${
                  outlineTab === 'annotations' ? 'bg-white text-[#7C2D37] shadow-2xs font-semibold' : 'text-[#78716C]'
                }`}
              >
                Chú thích ({lesson.annotations.length})
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto pr-1">
              {outlineTab === 'outline' ? (
                <div className="space-y-1">
                  {outlineList.map((item, index) => {
                    const isActive = selectedOutlineSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectOutline(item.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-2 text-metadata ${
                          isActive
                            ? 'bg-[#FBF4F5] text-[#7C2D37] font-semibold border-l-2 border-[#7C2D37]'
                            : 'text-[#57534E] hover:text-[#292524] hover:bg-stone-50 font-normal'
                        }`}
                        title={item.label}
                      >
                        <span className="text-[11px] text-[#78716C] w-4 shrink-0 tabular-nums">{index + 1}.</span>
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  {lesson.annotations.length === 0 ? (
                    <p className="text-[12px] text-[#78716C] italic p-2 text-center">
                      Chưa có chú thích. Bôi đen văn bản để thêm ghi chú hoặc highlight.
                    </p>
                  ) : (
                    lesson.annotations.map((anno) => (
                      <div
                        key={anno.id}
                        className="p-2.5 rounded-lg border border-[#E7E5E4] bg-stone-50/70 hover:bg-white text-[12px] group transition-colors"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className={`font-serif font-medium line-clamp-1 ${
                            anno.color === 'amber' ? 'text-amber-800' :
                            anno.color === 'emerald' ? 'text-emerald-800' :
                            anno.color === 'blue' ? 'text-blue-800' :
                            anno.color === 'rose' ? 'text-rose-800' : 'text-purple-800'
                          }`}>
                            "{anno.textSnippet}"
                          </span>
                          <button
                            onClick={() => handleDeleteAnnotation(anno.id)}
                            className="text-stone-400 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                            title="Xóa chú thích"
                          >
                            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                          </button>
                        </div>
                        <p className="text-[#57534E] mt-1 line-clamp-2">
                          {anno.note}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </aside>
        )}

        {/* ========================================================================= */}
        {/* CỘT 2: DOCUMENT AREA (Văn bản tác phẩm chuẩn Lora 18px / 1.85 - Scroll riêng) */}
        {/* ========================================================================= */}
        <section className="flex-1 h-full min-h-0 overflow-y-auto flex flex-col items-center px-1 md:px-2 panel-scroll">
          {/* Action Bar: Read / Edit Mode Toggle */}
          <div data-tour-id="reader-tools" className="w-full max-w-[760px] flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-[#E5E0DA] shadow-[var(--shadow-xs)] mb-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                isEditingDoc 
                  ? 'bg-amber-50 text-amber-900 border border-amber-300' 
                  : 'bg-[#FCF3F4] text-[#7A2938] border border-[#7A2938]/15'
              }`}>
                {isEditingDoc ? <Edit3 className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                <span>{isEditingDoc ? 'Chế độ Chỉnh sửa Văn bản' : 'Chế độ Đọc & Chú giải'}</span>
              </span>
              <span className="text-xs text-[#706A65] hidden sm:inline">
                {isEditingDoc 
                  ? 'Sửa tiêu đề, bối cảnh, câu chữ và các đoạn trích' 
                  : 'Bôi đen văn bản để đánh dấu màu hoặc tạo chú thích'}
              </span>
            </div>

            <button
              onClick={() => {
                setIsEditingDoc(!isEditingDoc);
                if (isEditingDoc) {
                  showToast('Đã lưu các thay đổi vào bài dạy!');
                }
              }}
              className={`min-h-[34px] px-3.5 py-1.5 rounded-lg text-metadata font-semibold flex items-center gap-1.5 transition-all ${
                isEditingDoc
                  ? 'btn-primary text-white shadow-xs'
                  : 'btn-secondary text-[#302C29]'
              }`}
              title={isEditingDoc ? 'Lưu và chuyển về chế độ đọc' : 'Nhập hoặc sửa trực tiếp nội dung tác phẩm'}
            >
              {isEditingDoc ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Lưu & Đóng</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5 text-[#7A2938]" />
                  <span>Chỉnh sửa văn bản</span>
                </>
              )}
            </button>
          </div>

          <article 
            ref={documentContainerRef}
            data-tour-id="reader-content"
            onMouseUp={handleSelection}
            className={`w-full max-w-[760px] bg-[#FFFEFC] border border-[#EEEAE5] rounded-2xl p-6 md:p-10 transition-all duration-200 select-text my-auto md:my-0 shadow-[var(--shadow-paper)] ${
              isFocusMode ? 'shadow-md' : ''
            }`}
          >
            {isEditingDoc ? (
              /* EDIT MODE */
              <div className="space-y-6 text-metadata">
                {/* Author context edit */}
                <div className="card-highlight p-5 space-y-3">
                  <h4 className="font-semibold text-metadata text-[#7A2938] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>Tác giả & Bối cảnh lịch sử</span>
                  </h4>
                  <div>
                    <label className="block text-xs font-semibold text-[#706A65] mb-1">Tiểu sử tác giả & phong cách:</label>
                    <textarea
                      rows={3}
                      value={lesson.authorBio || ''}
                      onChange={(e) => onUpdateLesson({ authorBio: normalizeVietnamese(e.target.value) })}
                      className="w-full p-2.5 bg-white border border-[#E5E0DA] rounded-lg text-body-ui text-[#211E1C] focus:border-[#7A2938] focus:outline-none"
                      placeholder="Nhập tiểu sử tác giả..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#706A65] mb-1">Hoàn cảnh sáng tác:</label>
                    <textarea
                      rows={2}
                      value={lesson.historicalContext || ''}
                      onChange={(e) => onUpdateLesson({ historicalContext: normalizeVietnamese(e.target.value) })}
                      className="w-full p-2.5 bg-white border border-[#E5E0DA] rounded-lg text-body-ui text-[#211E1C] focus:border-[#7A2938] focus:outline-none"
                      placeholder="Nhập hoàn cảnh ra đời tác phẩm..."
                    />
                  </div>
                </div>

                {/* Header Edit */}
                <div className="space-y-3 p-4 rounded-xl border border-[#E5E0DA] bg-[#FAF9F7]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#706A65] mb-1">Tên tác phẩm / Bài dạy:</label>
                      <input
                        type="text"
                        value={lesson.title || ''}
                        onChange={(e) => onUpdateLesson({ title: normalizeVietnamese(e.target.value) })}
                        className="w-full p-2 bg-white border border-[#E5E0DA] rounded-lg font-serif font-bold text-[#211E1C] focus:border-[#7A2938] focus:outline-none text-card-title"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#706A65] mb-1">Tác giả:</label>
                      <input
                        type="text"
                        value={lesson.author || ''}
                        onChange={(e) => onUpdateLesson({ author: normalizeVietnamese(e.target.value) })}
                        className="w-full p-2 bg-white border border-[#E5E0DA] rounded-lg text-body-ui text-[#211E1C] focus:border-[#7A2938] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Sections or Full Text Edit */}
                {lesson.textSections && lesson.textSections.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-metadata text-[#211E1C]">Các đoạn văn bản ({lesson.textSections.length})</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newSec = {
                            id: `sec-${Date.now()}`,
                            title: `Đoạn ${lesson.textSections!.length + 1}`,
                            content: ''
                          };
                          onUpdateLesson({
                            textSections: [...lesson.textSections!, newSec]
                          });
                        }}
                        className="btn-secondary px-2.5 py-1 text-xs font-semibold flex items-center gap-1 text-[#7A2938]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Thêm đoạn mới</span>
                      </button>
                    </div>

                    {lesson.textSections.map((sec, sIdx) => (
                      <div key={sec.id} className="p-4 rounded-xl border border-[#E5E0DA] bg-white space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={sec.title || ''}
                            onChange={(e) => {
                              const updatedSecs = lesson.textSections!.map((s, idx) => 
                                idx === sIdx ? { ...s, title: normalizeVietnamese(e.target.value) } : s
                              );
                              onUpdateLesson({ textSections: updatedSecs });
                            }}
                            className="font-serif font-semibold text-metadata text-[#7A2938] border-b border-transparent hover:border-[#E5E0DA] focus:border-[#7A2938] bg-transparent outline-none px-1"
                            placeholder="Tiêu đề đoạn..."
                          />
                          {lesson.textSections!.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                onUpdateLesson({
                                  textSections: lesson.textSections!.filter((_, idx) => idx !== sIdx)
                                });
                              }}
                              className="p-1 text-[#99918A] hover:text-red-600 rounded transition"
                              title="Xóa đoạn này"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <textarea
                          rows={6}
                          value={sec.content}
                          onChange={(e) => {
                            const updatedSecs = lesson.textSections!.map((s, idx) => 
                              idx === sIdx ? { ...s, content: normalizeVietnamese(e.target.value) } : s
                            );
                            onUpdateLesson({ textSections: updatedSecs });
                          }}
                          className="w-full p-3 font-serif text-body-ui text-[#302C29] leading-[1.85] border border-[#E5E0DA] rounded-lg focus:border-[#7A2938] focus:outline-none"
                          placeholder="Dán hoặc gõ nội dung thơ / văn bản đoạn này..."
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#706A65]">Nội dung toàn văn tác phẩm:</label>
                    <textarea
                      rows={14}
                      value={lesson.fullText || ''}
                      onChange={(e) => onUpdateLesson({ fullText: normalizeVietnamese(e.target.value) })}
                      className="w-full p-3 font-serif text-body-ui text-[#302C29] leading-[1.85] border border-[#E5E0DA] rounded-lg focus:border-[#7A2938] focus:outline-none"
                      placeholder="Dán hoặc gõ nội dung toàn văn bài học..."
                    />
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingDoc(false);
                      showToast('Đã lưu văn bản tác phẩm!');
                    }}
                    className="btn-primary min-h-[36px] px-4 py-1.5 rounded-xl font-semibold text-metadata flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Hoàn tất chỉnh sửa</span>
                  </button>
                </div>
              </div>
            ) : (
              /* READ MODE (ORIGINAL) */
              <>
                {/* Outline: Context Box for Author & Historical Background */}
                <div id="author-context" className="card-highlight p-5 mb-8 text-body-ui scroll-mt-6">
                  <h3 className="text-metadata font-semibold text-[#7A2938] mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>Tác giả & Bối cảnh lịch sử</span>
                  </h3>
                  <p className="text-[#211E1C] text-body-ui font-serif leading-relaxed">
                    {lesson.authorBio}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-[#EEEAE5] text-metadata text-[#706A65] font-sans">
                    <strong>Hoàn cảnh sáng tác:</strong> {lesson.historicalContext}
                  </div>
                </div>

                {/* Document Book Header */}
                <header className="text-center pb-8 mb-8 border-b border-[#EEEAE5]">
                  <div className="text-metadata text-[#706A65] font-medium mb-1">
                    {lesson.genre === 'poetry' ? 'Văn bản thơ' : lesson.genre === 'story' ? 'Văn bản truyện' : 'Văn bản nghị luận'} · {lesson.grade} ({lesson.textbook})
                  </div>
                  <h1 className="text-page-title font-serif text-[#211E1C]">
                    {lesson.title}
                  </h1>
                  <p className="font-serif italic text-card-title text-[#706A65] mt-1">
                    {lesson.author}
                  </p>
                </header>

                {/* Document Body */}
                <div className="text-document space-y-8 font-serif leading-[1.85] text-[#302C29]">
                  {lesson.textSections && lesson.textSections.length > 0 ? (
                    lesson.textSections.map((sec, idx) => (
                      <section key={sec.id} id={sec.id} className="relative scroll-mt-6 pt-2">
                        {sec.title && (
                          <h3 className="font-serif font-semibold text-card-title text-[#7A2938] mb-2.5 border-b border-[#EEEAE5] pb-1.5 flex items-center justify-between">
                            <span>{sec.title}</span>
                            <span className="text-[11px] font-sans text-[#99918A] font-normal">#{idx + 1}</span>
                          </h3>
                        )}
                        <p className="whitespace-pre-line text-[#302C29] leading-[1.85]">
                          {sec.content}
                        </p>
                      </section>
                    ))
                  ) : (
                    <p id="full-text" className="whitespace-pre-line text-[#302C29] leading-[1.85]">
                      {lesson.fullText}
                    </p>
                  )}
                </div>

                {/* Book Page Footer / Source */}
                <footer id="lesson-footer" className="mt-12 pt-6 border-t border-[#EEEAE5] flex flex-col sm:flex-row items-center justify-between text-metadata text-[#706A65] gap-2 scroll-mt-6">
                  <span>Theo SGK Ngữ văn {lesson.grade}, {lesson.textbook}</span>
                  <span><span className="tabular-nums font-semibold">{lesson.annotations.length}</span> chú thích đang lưu</span>
                </footer>
              </>
            )}
          </article>
        </section>

        {/* ========================================================================= */}
        {/* CỘT 3: INSIGHT PANEL (320px - HỖ TRỢ THƠ / TRUYỆN / NGHỊ LUẬN - Scroll riêng) */}
        {/* ========================================================================= */}
        {!isFocusMode && (
          <aside 
            className={`w-[320px] shrink-0 h-full min-h-0 flex flex-col card-surface p-4 overflow-hidden transition-all duration-200 ${
              isAnalysisOpen ? 'flex' : 'hidden'
            } hidden lg:flex`}
          >
            {/* Header with ONE Primary Action: "Chú thích" */}
            <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E4] shrink-0">
              <span className="font-semibold text-card-title text-[#292524] flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#7C2D37]" />
                <span>Nghiên cứu văn bản</span>
              </span>
              <button
                onClick={() => setShowAnnotationModal(true)}
                className="btn-primary btn-compact text-metadata"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Ghi chú</span>
              </button>
            </div>

            {/* 5 Tabs Sư phạm: Thi pháp · Hình tượng · Từ khóa · Dẫn chứng · Ghi chú */}
            <div className="flex p-0.5 bg-stone-100 rounded-lg shrink-0 my-2.5 overflow-x-auto">
              {[
                { id: 'poetics' as const, label: 'Thi pháp' },
                { id: 'imagery' as const, label: 'Hình tượng' },
                { id: 'keywords' as const, label: 'Từ khóa' },
                { id: 'evidence' as const, label: 'Dẫn chứng' },
                { id: 'notes' as const, label: 'Ghi chú' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveRightTab(tab.id as any)}
                  className={`flex-1 min-w-[54px] py-1.5 px-1 min-h-[32px] rounded-md text-[11.5px] font-medium transition-colors text-center whitespace-nowrap ${
                    (activeRightTab as string) === tab.id
                      ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content area with local scroll */}
            <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1 panel-scroll">
              {/* TAB 1: THI PHÁP */}
              {((activeRightTab as string) === 'poetics' || (activeRightTab as string) === 'analysis') && (
                <div className="space-y-2.5 text-xs">
                  {/* TRUYỆN NGẮN */}
                  {lesson.genre === 'story' && lesson.storyAnalysis && (
                    <div className="space-y-2.5">
                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="font-semibold text-[#7C2D37] block mb-1">
                          ✦ Tình huống truyện éo le
                        </span>
                        <p className="text-stone-800 leading-relaxed">
                          {lesson.storyAnalysis.storySituation}
                        </p>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="font-semibold text-[#7C2D37] block mb-1">
                          ✦ Điểm nhìn & Ngôi kể
                        </span>
                        <p className="text-stone-800 leading-relaxed">
                          <strong>Điểm nhìn:</strong> {lesson.storyAnalysis.pointOfView}
                        </p>
                        <p className="text-stone-600 mt-1">
                          <strong>Người kể chuyện:</strong> {lesson.storyAnalysis.narrator}
                        </p>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="font-semibold text-[#7C2D37] block mb-1">
                          ✦ Thông điệp nhân văn
                        </span>
                        <p className="text-stone-600 leading-relaxed">
                          {lesson.storyAnalysis.message}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* THƠ TRỮ TÌNH */}
                  {lesson.genre === 'poetry' && (
                    <div className="space-y-2.5">
                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="font-semibold text-[#7C2D37] block mb-1">
                          ✦ Chủ đề & Cảm hứng
                        </span>
                        <p className="text-stone-800 leading-relaxed">
                          {lesson.poetryAnalysis?.theme || 'Vẻ đẹp hào hoa, bi tráng của người lính trong kháng chiến.'}
                        </p>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="font-semibold text-[#7C2D37] block mb-1">
                          ✦ Bút pháp & Biện pháp tu từ
                        </span>
                        <ul className="space-y-1 text-stone-700">
                          {(lesson.poetryAnalysis?.rhetoricalDevices || [
                            'Nhân hóa: súng ngửi trời, thác gầm thét',
                            'Nói giảm nói tránh: anh về đất, không bước nữa',
                            'Tương phản: rải rác biên cương >< chẳng tiếc đời xanh'
                          ]).map((dev, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#7C2D37]">•</span>
                              <span>{dev}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="font-semibold text-[#7C2D37] block mb-1">
                          ✦ Nhịp điệu & Mạch cảm xúc
                        </span>
                        <p className="text-stone-600 leading-relaxed">
                          {lesson.poetryAnalysis?.emotionalFlow || 'Nỗi nhớ da diết chơi vơi → Hành quân gian lao → Đêm hội quân dân → Bức tượng đài bi tráng.'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* NGHỊ LUẬN */}
                  {lesson.genre === 'argumentative' && lesson.argumentMap && (
                    <div className="space-y-2.5">
                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="font-semibold text-[#7C2D37] block mb-1">
                          ✦ Luận đề chính
                        </span>
                        <p className="text-stone-800 font-medium leading-relaxed">
                          {lesson.argumentMap.thesis}
                        </p>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="font-semibold text-[#7C2D37] block mb-1">
                          ✦ Kết luận & Ý nghĩa
                        </span>
                        <p className="text-stone-600 leading-relaxed">
                          {lesson.argumentMap.conclusion}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: HÌNH TƯỢNG */}
              {(activeRightTab as string) === 'imagery' && (
                <div className="space-y-2.5 text-xs">
                  {lesson.genre === 'story' && lesson.storyAnalysis ? (
                    <div className="space-y-2">
                      <span className="font-semibold text-stone-700 block">
                        ✦ Nhân vật & Số phận:
                      </span>
                      {lesson.storyAnalysis.characters.map((c, i) => (
                        <div key={i} className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4] space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-stone-900 text-sm">{c.name}</span>
                            <span className="text-[11px] text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">{c.role}</span>
                          </div>
                          <p className="text-stone-600 leading-relaxed">{c.psychologicalShift}</p>
                          {c.quote && (
                            <div className="p-2 bg-white rounded border border-stone-200 text-stone-700 font-serif italic text-[11px]">
                              "{c.quote}"
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : lesson.genre === 'poetry' ? (
                    <div className="space-y-2">
                      <span className="font-semibold text-stone-700 block">
                        ✦ Hệ thống Hình tượng nghệ thuật:
                      </span>
                      {(lesson.poetryAnalysis?.imagery || [
                        'Dòng sông Mã gầm thét oai linh',
                        'Đỉnh đèo heo hút cồn mây, súng ngửi trời',
                        'Đêm hội đuốc hoa ấm tình quân dân',
                        'Hình tượng người lính Tây Tiến bi tráng'
                      ]).map((img, i) => (
                        <div key={i} className="p-2.5 bg-stone-50 rounded-xl border border-[#E7E5E4] text-stone-800 font-serif leading-relaxed">
                          ✦ {img}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <span className="font-semibold text-stone-700 block">
                        ✦ Hệ thống Luận điểm:
                      </span>
                      {lesson.argumentMap?.claims.map((c, i) => (
                        <div key={i} className="p-2.5 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                          <span className="font-semibold text-[#7C2D37]">{c.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: TỪ KHÓA */}
              {(activeRightTab as string) === 'keywords' && (
                <div className="space-y-3 text-xs">
                  <span className="font-semibold text-stone-700 block">
                    ✦ Từ khóa thẩm mỹ & Khái niệm then chốt:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(lesson.poetryAnalysis?.keywords || [
                      lesson.title,
                      lesson.author,
                      'Bi tráng',
                      'Lãng mạn',
                      'Hào hoa',
                      'Tây Bắc',
                      'Sông Mã',
                      'Tình quân dân'
                    ]).map((kw, i) => (
                      <span 
                        key={i} 
                        className="px-2.5 py-1 rounded-full bg-[#FBF4F5] text-[#7C2D37] border border-[#7C2D37]/20 font-medium text-[11px]"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-stone-200">
                    <span className="font-semibold text-stone-700 block mb-1.5">
                      ✦ Chi tiết nghệ thuật tiêu biểu:
                    </span>
                    <div className="space-y-1.5">
                      {(lesson.storyAnalysis?.artisticDetails || [
                        'Ngôn từ tạo hình gân guốc',
                        'Âm điệu hùng tráng của sông Mã',
                        'Nhịp thơ biến hóa linh hoạt'
                      ]).map((item, i) => (
                        <div key={i} className="p-2 bg-stone-50 rounded-lg border border-stone-200 text-stone-700 text-[11px]">
                          • {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: DẪN CHỨNG */}
              {(activeRightTab as string) === 'evidence' && (
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-stone-500 text-[11px]">
                    <span>Dẫn chứng then chốt phục vụ giảng dạy & ra đề</span>
                  </div>

                  <div className="space-y-2">
                    {(lesson.poetryAnalysis?.keyVerses || [
                      'Sông Mã xa rồi Tây Tiến ơi!\nNhớ về rừng núi nhớ chơi vơi...',
                      'Heo hút cồn mây súng ngửi trời\nNgàn thước lên cao, ngàn thước xuống',
                      'Chiến trường đi chẳng tiếc đời xanh\nÁo bào thay chiếu anh về đất\nSông Mã gầm lên khúc độc hành'
                    ]).map((verse, i) => (
                      <div key={i} className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4] space-y-2">
                        <p className="font-serif italic text-stone-800 whitespace-pre-line leading-relaxed text-[12px]">
                          "{verse}"
                        </p>
                        <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-stone-200/60">
                          <button
                            onClick={() => {
                              onAddSlideFromQuote(verse, lesson.author);
                              setActiveModule('slides');
                            }}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors"
                            title="Tạo Quote Slide từ dẫn chứng này"
                          >
                            Sang Slide
                          </button>
                          <button
                            onClick={() => {
                              onAddQuestionFromPassage(verse);
                              setActiveModule('question_builder');
                            }}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                            title="Tạo câu hỏi đọc hiểu từ dẫn chứng này"
                          >
                            Tạo câu hỏi
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: GHI CHÚ */}
              {(activeRightTab as string) === 'notes' && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>Tổng số: <span className="tabular-nums font-semibold text-stone-800">{lesson.annotations.length}</span> ghi chú</span>
                    <button
                      onClick={() => setShowAnnotationModal(true)}
                      className="text-[#7C2D37] hover:underline font-semibold"
                    >
                      + Thêm mới
                    </button>
                  </div>
                  <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                    {lesson.annotations.map((a) => (
                      <div key={a.id} className="p-2.5 rounded-xl border border-[#E7E5E4] bg-stone-50/70 hover:bg-white text-xs group transition-colors">
                        <div className="flex items-start justify-between">
                          <span className={`font-serif font-medium line-clamp-1 ${
                            a.color === 'amber' ? 'text-amber-800' :
                            a.color === 'emerald' ? 'text-emerald-800' :
                            a.color === 'blue' ? 'text-blue-800' :
                            a.color === 'rose' ? 'text-rose-800' : 'text-purple-800'
                          }`}>
                            "{a.textSnippet}"
                          </span>
                          <button
                            onClick={() => handleDeleteAnnotation(a.id)}
                            className="text-stone-400 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-stone-600 mt-1 leading-relaxed">{a.note}</p>
                      </div>
                    ))}
                    {lesson.annotations.length === 0 && (
                      <p className="text-center text-xs text-stone-400 py-6 italic">
                        Chưa có ghi chú nào. Bôi đen văn bản để thêm ghi chú mới.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* ========================================================================= */}
      {/* FLOATING CONTEXTUAL TOOLBAR (Dark Warm Elevated Surface) */}
      {/* ========================================================================= */}
      {toolbarPos && selectedText && (
        <div 
          style={{ top: `${toolbarPos.y}px`, left: `${toolbarPos.x}px` }}
          className="fixed z-50 bg-[#211E1C] text-white px-2.5 py-1.5 rounded-xl shadow-[var(--shadow-lg)] border border-[rgba(255,255,255,0.12)] flex items-center gap-1.5 text-metadata select-none anim-selection-toolbar"
        >
          {/* Action 1: 5 Highlight Color Dots (Soft Non-fluorescent Tints) */}
          <div className="flex items-center gap-1 px-1">
            <span className="text-[11px] text-[#99918A] mr-0.5 font-medium">Màu:</span>
            {[
              { id: 'amber' as const, bg: 'bg-[#FDE68A]', border: 'border-[#F59E0B]/40', label: 'Vàng ấm' },
              { id: 'emerald' as const, bg: 'bg-[#BBF7D0]', border: 'border-[#10B981]/40', label: 'Xanh êm' },
              { id: 'blue' as const, bg: 'bg-[#BFDBFE]', border: 'border-[#3B82F6]/40', label: 'Xanh dịu' },
              { id: 'rose' as const, bg: 'bg-[#FECDD3]', border: 'border-[#F43F5E]/40', label: 'Hồng nhạt' },
              { id: 'stone' as const, bg: 'bg-[#E7E5E4]', border: 'border-[#A8A29E]/40', label: 'Xám nhẹ' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => handleSaveAnnotation('highlight', `Đánh dấu (${c.label})`, c.id as any)}
                className={`w-4 h-4 rounded-full ${c.bg} border ${c.border} hover:scale-110 transition-transform duration-120`}
                title={`Đánh dấu màu ${c.label}`}
              />
            ))}
          </div>

          <div className="w-px h-3.5 bg-white/15 mx-0.5" />

          {/* Action 2: Ghi chú */}
          <button
            onClick={() => setShowAnnotationModal(true)}
            className="px-2 py-1 min-h-[30px] hover:bg-white/8 active:bg-white/12 text-[#FAF9F7] rounded-lg flex items-center gap-1.5 transition-colors duration-120"
            title="Thêm ghi chú sư phạm"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-rose-300" strokeWidth={1.75} />
            <span>Ghi chú</span>
          </button>

          {/* Action 3: Đưa vào Slide */}
          <button
            onClick={() => {
              onAddSlideFromQuote(selectedText, lesson.author);
              setToolbarPos(null);
              showToast('Đã tạo Slide trích đoạn từ ngữ liệu!');
            }}
            className="px-2 py-1 min-h-[30px] hover:bg-white/8 active:bg-white/12 text-[#FAF9F7] rounded-lg flex items-center gap-1.5 transition-colors duration-120"
            title="Tạo Slide trích đoạn khám phá"
          >
            <Presentation className="w-3.5 h-3.5 text-amber-300" strokeWidth={1.75} />
            <span>Sang Slide</span>
          </button>

          {/* Action 4: Tạo câu hỏi */}
          <button
            onClick={() => {
              onAddQuestionFromPassage(selectedText);
              setToolbarPos(null);
            }}
            className="px-2 py-1 min-h-[30px] hover:bg-white/8 active:bg-white/12 text-[#FAF9F7] rounded-lg flex items-center gap-1.5 transition-colors duration-120"
            title="Tạo câu hỏi từ ngữ liệu này"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-300" strokeWidth={1.75} />
            <span>Tạo câu hỏi</span>
          </button>

          {/* Action 5: Đặt làm ngữ liệu đề */}
          <button
            onClick={() => {
              onSetExamPassage(selectedText);
              setToolbarPos(null);
              showToast('Đã đặt đoạn trích làm ngữ liệu Đề kiểm tra!');
            }}
            className="px-2 py-1 min-h-[30px] hover:bg-white/8 active:bg-white/12 text-[#FAF9F7] rounded-lg flex items-center gap-1.5 transition-colors duration-120"
            title="Đặt làm ngữ liệu Đề 7991"
          >
            <CheckSquare className="w-3.5 h-3.5 text-emerald-300" strokeWidth={1.75} />
            <span>Ngữ liệu đề</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ANNOTATION MODAL */}
      {/* ========================================================================= */}
      {showAnnotationModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-2xs flex items-center justify-center p-4 anim-modal-backdrop">
          <div className="bg-white rounded-2xl border border-[#E7E5E4] max-w-md w-full p-5 shadow-xl space-y-4 anim-modal-dialog">
            <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E4]">
              <h3 className="text-card-title text-[#292524] font-semibold">
                Thêm chú thích học thuật
              </h3>
              <button
                onClick={() => setShowAnnotationModal(false)}
                className="text-[#78716C] hover:text-[#292524] p-1.5 rounded-lg transition-colors"
                aria-label="Đóng modal"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            {selectedText && (
              <div className="p-3 bg-stone-50 rounded-lg border border-[#E7E5E4] font-serif text-metadata text-[#292524] italic max-h-24 overflow-y-auto">
                "{selectedText}"
              </div>
            )}

            <div>
              <label className="block text-metadata font-medium text-[#57534E] mb-1">
                Nội dung chú giải / Cảm thụ / Định hướng phân tích:
              </label>
              <textarea
                rows={3}
                placeholder="Nhập cảm thụ ngôn từ, thi pháp hoặc câu hỏi dẫn dắt học sinh..."
                value={annotationInputNote}
                onChange={(e) => setAnnotationInputNote(normalizeVietnamese(e.target.value))}
                className="w-full text-body-ui p-2.5 border border-[#E7E5E4] rounded-lg focus:outline-none focus:border-[#7C2D37] text-[#292524]"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-stone-500">Màu gán:</span>
                {[
                  { id: 'amber' as const, bg: 'bg-amber-400' },
                  { id: 'emerald' as const, bg: 'bg-emerald-400' },
                  { id: 'blue' as const, bg: 'bg-blue-400' },
                  { id: 'purple' as const, bg: 'bg-purple-400' },
                  { id: 'rose' as const, bg: 'bg-rose-400' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setAnnotationColor(c.id)}
                    className={`w-4 h-4 rounded-full ${c.bg} transition-transform ${annotationColor === c.id ? 'scale-110 ring-2 ring-stone-900' : 'opacity-70'}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAnnotationModal(false)}
                  className="btn-secondary btn-compact"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveAnnotation('annotation')}
                  className="btn-primary btn-compact"
                >
                  Lưu chú thích
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
