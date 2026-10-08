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
  BookOpen
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
        <div className="fixed bottom-6 right-6 z-50 bg-[#292524] text-white text-[13px] px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-stone-700 animate-in fade-in slide-in-from-bottom-2">
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
        <section className="flex-1 h-full min-h-0 overflow-y-auto flex justify-center px-1 md:px-2 panel-scroll">
          <article 
            ref={documentContainerRef}
            onMouseUp={handleSelection}
            className={`w-full max-w-[800px] bg-white border border-[#E7E5E4] rounded-2xl p-6 md:p-10 transition-all duration-200 select-text my-auto md:my-0 shadow-xs ${
              isFocusMode ? 'max-w-[760px] shadow-sm' : ''
            }`}
          >
            {/* Outline: Context Box for Author & Historical Background */}
            <div id="author-context" className="card-highlight p-5 mb-8 text-body-ui scroll-mt-6">
              <h3 className="text-metadata font-semibold text-[#7C2D37] mb-1 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Tác giả & Bối cảnh lịch sử</span>
              </h3>
              <p className="text-[#292524] text-body-ui font-serif leading-relaxed">
                {lesson.authorBio}
              </p>
              <div className="mt-2.5 pt-2 border-t border-[#E7E5E4] text-metadata text-[#57534E] font-sans">
                <strong>Hoàn cảnh sáng tác:</strong> {lesson.historicalContext}
              </div>
            </div>

            {/* Document Book Header */}
            <header className="text-center pb-8 mb-8 border-b border-[#E7E5E4]">
              <div className="text-metadata text-[#78716C] font-medium mb-1">
                {lesson.genre === 'poetry' ? 'Văn bản thơ' : lesson.genre === 'story' ? 'Văn bản truyện' : 'Văn bản nghị luận'} · {lesson.grade} ({lesson.textbook})
              </div>
              <h1 className="text-page-title font-serif text-[#292524]">
                {lesson.title}
              </h1>
              <p className="font-serif italic text-card-title text-[#57534E] mt-1">
                {lesson.author}
              </p>
            </header>

            {/* Document Body */}
            <div className="text-document space-y-8 font-serif leading-[1.85]">
              {lesson.textSections && lesson.textSections.length > 0 ? (
                lesson.textSections.map((sec, idx) => (
                  <section key={sec.id} id={sec.id} className="relative scroll-mt-6 pt-2">
                    {sec.title && (
                      <h3 className="font-serif font-semibold text-card-title text-[#7C2D37] mb-2.5 border-b border-stone-200 pb-1.5 flex items-center justify-between">
                        <span>{sec.title}</span>
                        <span className="text-[11px] font-sans text-stone-400 font-normal">#{idx + 1}</span>
                      </h3>
                    )}
                    <p className="whitespace-pre-line text-[#292524] leading-[1.85]">
                      {sec.content}
                    </p>
                  </section>
                ))
              ) : (
                <p id="full-text" className="whitespace-pre-line text-[#292524] leading-[1.85]">
                  {lesson.fullText}
                </p>
              )}
            </div>

            {/* Book Page Footer / Source */}
            <footer id="lesson-footer" className="mt-12 pt-6 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between text-metadata text-[#78716C] gap-2 scroll-mt-6">
              <span>Theo SGK Ngữ văn {lesson.grade}, {lesson.textbook}</span>
              <span><span className="tabular-nums font-semibold">{lesson.annotations.length}</span> chú thích đang lưu</span>
            </footer>
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

            {/* 3 Tabs: Phân tích · Ghi chú · Liên kết */}
            <div className="flex p-0.5 bg-stone-100 rounded-lg shrink-0 my-3">
              {[
                { id: 'analysis' as const, label: 'Thi pháp' },
                { id: 'notes' as const, label: 'Ghi chú' },
                { id: 'links' as const, label: 'Liên kết' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveRightTab(tab.id)}
                  className={`flex-1 py-1.5 min-h-[34px] rounded-md text-metadata font-medium transition-colors ${
                    activeRightTab === tab.id
                      ? 'bg-white text-[#292524] shadow-2xs font-semibold'
                      : 'text-[#78716C] hover:text-[#292524]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content area with local scroll */}
            <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1 panel-scroll">
              {/* TAB 1: THI PHÁP / PHÂN TÍCH */}
              {activeRightTab === 'analysis' && (
                <div className="space-y-3">
                  {/* TRUYỆN NGẮN (Story) */}
                  {lesson.genre === 'story' && lesson.storyAnalysis && (
                    <div className="space-y-2.5">
                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="text-metadata font-semibold text-[#7C2D37] block mb-1">
                          ✦ Tình huống truyện éo le
                        </span>
                        <p className="text-body-ui text-[#292524] leading-relaxed">
                          {lesson.storyAnalysis.storySituation}
                        </p>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="text-metadata font-semibold text-[#7C2D37] block mb-1">
                          ✦ Điểm nhìn & Ngôi kể
                        </span>
                        <p className="text-body-ui text-[#292524] leading-relaxed">
                          <strong>Điểm nhìn:</strong> {lesson.storyAnalysis.pointOfView}
                        </p>
                        <p className="text-metadata text-[#57534E] mt-1">
                          <strong>Người kể chuyện:</strong> {lesson.storyAnalysis.narrator}
                        </p>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="text-metadata font-semibold text-[#7C2D37] block mb-1">
                          ✦ Diễn biến tâm lý nhân vật
                        </span>
                        <p className="text-body-ui text-[#292524] leading-relaxed">
                          {lesson.storyAnalysis.psychologicalShift}
                        </p>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="text-metadata font-semibold text-[#7C2D37] block mb-1">
                          ✦ Chi tiết nghệ thuật đắt giá
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {lesson.storyAnalysis.artisticDetails?.map((det, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-md bg-[#FBF4F5] text-[#7C2D37] border border-[#7C2D37]/20 text-xs font-serif">
                              {det}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="text-metadata font-semibold text-[#7C2D37] block mb-1">
                          ✦ Thông điệp tư tưởng
                        </span>
                        <p className="text-body-ui text-[#57534E] leading-relaxed">
                          {lesson.storyAnalysis.message}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* NGHỊ LUẬN (Argumentative) */}
                  {lesson.genre === 'argumentative' && lesson.argumentMap && (
                    <div className="space-y-2.5">
                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="text-metadata font-semibold text-[#7C2D37] block mb-1">
                          ✦ Luận đề chính
                        </span>
                        <p className="text-body-ui text-[#292524] font-medium leading-relaxed">
                          {lesson.argumentMap.thesis}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-metadata font-semibold text-stone-700 block">
                          ✦ Hệ thống Luận điểm:
                        </span>
                        {lesson.argumentMap.claims.map((c, i) => (
                          <div key={c.id || i} className="p-2.5 bg-white rounded-lg border border-[#E7E5E4] text-metadata">
                            <span className="font-semibold text-[#7C2D37]">{c.title}</span>
                            <ul className="mt-1 space-y-1 text-[#57534E]">
                              {c.reasons?.map((r, rIdx) => (
                                <li key={r.id || rIdx} className="flex items-start gap-1">
                                  <span className="text-[#7C2D37]">•</span>
                                  <span>{r.text}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="text-metadata font-semibold text-[#7C2D37] block mb-1">
                          ✦ Kết luận & Ý nghĩa
                        </span>
                        <p className="text-body-ui text-[#57534E] leading-relaxed">
                          {lesson.argumentMap.conclusion}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* THƠ (Poetry) */}
                  {lesson.genre === 'poetry' && (
                    <div className="space-y-2.5">
                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="text-metadata font-semibold text-[#7C2D37] block mb-1">
                          Chủ đề cốt lõi
                        </span>
                        <p className="text-body-ui text-[#292524]">
                          {lesson.poetryAnalysis?.theme || 'Vẻ đẹp hào hoa, bi tráng của người lính trong kháng chiến.'}
                        </p>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="text-metadata font-semibold text-[#7C2D37] block mb-1">
                          Biện pháp tu từ đặc sắc
                        </span>
                        <ul className="space-y-1 text-body-ui text-[#292524]">
                          {(lesson.poetryAnalysis?.rhetoricalDevices || [
                            'Nhân hóa: súng ngửi trời, thác gầm thét',
                            'Nói giảm nói tránh: anh về đất, không bước nữa',
                            'Tương phản đối lập: rải rác biên cương >< chẳng tiếc đời xanh'
                          ]).map((dev, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#7C2D37] mt-0.5">•</span>
                              <span>{dev}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="text-metadata font-semibold text-[#7C2D37] block mb-1">
                          Hình tượng nghệ thuật trung tâm
                        </span>
                        <div className="space-y-1 mt-1">
                          {(lesson.poetryAnalysis?.imagery || [
                            'Dòng sông Mã gầm thét oai linh',
                            'Đỉnh đèo heo hút cồn mây, súng ngửi trời',
                            'Đêm hội đuốc hoa ấm tình quân dân',
                            'Hình tượng người lính Tây Tiến bi tráng'
                          ]).map((img, i) => (
                            <div key={i} className="p-1.5 bg-white rounded border border-[#E7E5E4] text-[#292524] font-serif text-metadata">
                              ✦ {img}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-[#E7E5E4]">
                        <span className="text-metadata font-semibold text-[#7C2D37] block mb-1">
                          Mạch cảm xúc trữ tình
                        </span>
                        <p className="text-body-ui text-[#57534E]">
                          {lesson.poetryAnalysis?.emotionalFlow || 'Nỗi nhớ da diết chơi vơi → Hành quân gian lao → Đêm hội quân dân → Bức tượng đài bi tráng → Lời thề son sắt.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: GHI CHÚ */}
              {activeRightTab === 'notes' && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-metadata text-[#78716C]">
                    <span>Tổng số: <span className="tabular-nums font-semibold">{lesson.annotations.length}</span> ghi chú</span>
                    <button
                      onClick={() => setShowAnnotationModal(true)}
                      className="text-[#7C2D37] hover:underline font-medium"
                    >
                      + Thêm mới
                    </button>
                  </div>
                  <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                    {lesson.annotations.map((a) => (
                      <div key={a.id} className="p-2.5 rounded-lg border border-[#E7E5E4] bg-stone-50/50 hover:bg-white text-metadata group">
                        <div className="flex items-start justify-between">
                          <span className={`font-serif font-medium ${
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
                        <p className="text-[#57534E] mt-1">{a.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: LIÊN KẾT HỌC LIỆU */}
              {activeRightTab === 'links' && (
                <div className="space-y-2">
                  <span className="text-metadata font-medium text-[#7C2D37] block mb-1">
                    Liên kết học liệu & Bài dạy
                  </span>

                  <button
                    onClick={() => setActiveModule('genre_analysis')}
                    className="w-full text-left p-3 rounded-lg border border-[#E7E5E4] hover:border-stone-400 bg-stone-50/60 hover:bg-white transition-colors"
                  >
                    <div className="flex items-center gap-2 font-medium text-[#292524] text-body-ui">
                      <Compass className="w-4 h-4 text-[#7C2D37]" strokeWidth={1.75} />
                      <span>Phân tích thể loại</span>
                    </div>
                    <p className="text-metadata text-[#78716C] mt-1">
                      Mở sâu sơ đồ lập luận & đặc trưng thi pháp
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveModule('khbd')}
                    className="w-full text-left p-3 rounded-lg border border-[#E7E5E4] hover:border-stone-400 bg-stone-50/60 hover:bg-white transition-colors"
                  >
                    <div className="flex items-center gap-2 font-medium text-[#292524] text-body-ui">
                      <FileText className="w-4 h-4 text-[#2563EB]" strokeWidth={1.75} />
                      <span>Kế hoạch bài dạy (5512)</span>
                    </div>
                    <p className="text-metadata text-[#78716C] mt-1">
                      Chuyển sang soạn 4 hoạt động dạy học
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      onAddSlideFromQuote(lesson.textSections[0]?.content.slice(0, 150) || '', lesson.author);
                      setActiveModule('slides');
                    }}
                    className="w-full text-left p-3 rounded-lg border border-[#E7E5E4] hover:border-stone-400 bg-stone-50/60 hover:bg-white transition-colors"
                  >
                    <div className="flex items-center gap-2 font-medium text-[#292524] text-body-ui">
                      <Presentation className="w-4 h-4 text-[#B45309]" strokeWidth={1.75} />
                      <span>Slide bài giảng</span>
                    </div>
                    <p className="text-metadata text-[#78716C] mt-1">
                      Tạo Quote Slide khám phá từ đoạn trích
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      onSetExamPassage(lesson.fullText.slice(0, 400));
                      setActiveModule('exam');
                    }}
                    className="w-full text-left p-3 rounded-lg border border-[#E7E5E4] hover:border-stone-400 bg-stone-50/60 hover:bg-white transition-colors"
                  >
                    <div className="flex items-center gap-2 font-medium text-[#292524] text-body-ui">
                      <CheckSquare className="w-4 h-4 text-[#15803D]" strokeWidth={1.75} />
                      <span>Đề kiểm tra (7991)</span>
                    </div>
                    <p className="text-metadata text-[#78716C] mt-1">
                      Đưa đoạn trích vào ma trận & đề thi
                    </p>
                  </button>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* ========================================================================= */}
      {/* FLOATING CONTEXTUAL TOOLBAR (Tối ưu 5 hành động chuẩn UI/UX) */}
      {/* 1. Highlight (5 màu) · 2. Ghi chú · 3. Sang Slide · 4. Tạo câu hỏi · 5. Ngữ liệu đề */}
      {/* ========================================================================= */}
      {toolbarPos && selectedText && (
        <div 
          style={{ top: `${toolbarPos.y}px`, left: `${toolbarPos.x}px` }}
          className="fixed z-50 bg-[#292524] text-white px-2.5 py-1.5 rounded-xl shadow-2xl border border-stone-700 flex items-center gap-1.5 text-metadata select-none animate-in fade-in"
        >
          {/* Action 1: 5 Highlight Color Dots */}
          <div className="flex items-center gap-1 px-1">
            <span className="text-[11px] text-stone-400 mr-0.5">Màu:</span>
            {[
              { id: 'amber' as const, bg: 'bg-amber-400', label: 'Vàng' },
              { id: 'emerald' as const, bg: 'bg-emerald-400', label: 'Xanh lá' },
              { id: 'blue' as const, bg: 'bg-blue-400', label: 'Xanh dương' },
              { id: 'purple' as const, bg: 'bg-purple-400', label: 'Tím' },
              { id: 'rose' as const, bg: 'bg-rose-400', label: 'Hồng' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => handleSaveAnnotation('highlight', `Đánh dấu (${c.label})`, c.id)}
                className={`w-4 h-4 rounded-full ${c.bg} hover:scale-125 transition-transform ring-1 ring-white/30`}
                title={`Đánh dấu màu ${c.label}`}
              />
            ))}
          </div>

          <div className="w-px h-3.5 bg-stone-700 mx-0.5" />

          {/* Action 2: Ghi chú */}
          <button
            onClick={() => setShowAnnotationModal(true)}
            className="px-2 py-1 min-h-[30px] hover:bg-stone-800 text-stone-200 rounded-lg flex items-center gap-1 transition-colors"
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
            className="px-2 py-1 min-h-[30px] hover:bg-stone-800 text-stone-200 rounded-lg flex items-center gap-1 transition-colors"
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
            className="px-2 py-1 min-h-[30px] hover:bg-stone-800 text-stone-200 rounded-lg flex items-center gap-1 transition-colors"
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
            className="px-2 py-1 min-h-[30px] hover:bg-stone-800 text-stone-200 rounded-lg flex items-center gap-1 transition-colors"
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
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E7E5E4] max-w-md w-full p-5 shadow-xl space-y-4">
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
                    className={`w-4 h-4 rounded-full ${c.bg} transition-transform ${annotationColor === c.id ? 'scale-125 ring-2 ring-stone-900' : 'opacity-70'}`}
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
