import React, { useState, useRef, useEffect } from 'react';
import { 
  Highlighter, 
  MessageSquarePlus, 
  HelpCircle, 
  MoreHorizontal, 
  Maximize2, 
  Minimize2, 
  ChevronRight, 
  ChevronDown,
  Trash2, 
  Bookmark, 
  Compass, 
  Heart, 
  Tag, 
  Sparkles, 
  FileText, 
  Presentation, 
  CheckSquare, 
  X,
  Share2,
  BookOpen
} from 'lucide-react';
import { 
  LiteratureLesson, 
  TextAnnotation, 
  ActiveModule 
} from '../../types';

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
  const [selectedOutlineSection, setSelectedOutlineSection] = useState<string>('text');

  // Right Column tab: 'analysis' | 'notes' | 'links'
  const [activeRightTab, setActiveRightTab] = useState<'analysis' | 'notes' | 'links'>('analysis');

  // Analysis sub-sections accordion state
  const [openAnalysisSection, setOpenAnalysisSection] = useState<'content' | 'art' | 'imagery' | 'keywords' | 'emotion'>('content');

  // Text Selection & Floating Contextual Toolbar state
  const [selectedText, setSelectedText] = useState('');
  const [toolbarPos, setToolbarPos] = useState<{ x: number; y: number } | null>(null);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [showAnnotationModal, setShowAnnotationModal] = useState(false);
  const [annotationInputNote, setAnnotationInputNote] = useState('');
  const [annotationColor, setAnnotationColor] = useState<'amber' | 'emerald' | 'blue' | 'purple' | 'rose'>('amber');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const documentContainerRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  // Text selection handler
  const handleSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.toString().trim()) {
      setToolbarPos(null);
      setSelectedText('');
      setIsMoreMenuOpen(false);
      return;
    }

    const text = selection.toString().trim();
    if (text.length >= 2) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(text);
      setToolbarPos({
        x: Math.max(16, rect.left + rect.width / 2 - 130),
        y: Math.max(16, rect.top - 48)
      });
      setIsMoreMenuOpen(false);
    }
  };

  // Save annotation or highlight
  const handleSaveAnnotation = (type: TextAnnotation['type'], defaultNote = '') => {
    if (!selectedText) return;
    const newAnnotation: TextAnnotation = {
      id: `anno-${Date.now()}`,
      textSnippet: selectedText,
      type: type,
      note: annotationInputNote || defaultNote || `Đoạn trích: "${selectedText.slice(0, 30)}..."`,
      color: annotationColor,
      timestamp: 'Vừa xong'
    };

    onUpdateLesson({
      annotations: [newAnnotation, ...lesson.annotations]
    });

    setToolbarPos(null);
    setShowAnnotationModal(false);
    setAnnotationInputNote('');
    showToast(`Đã lưu chú thích cho: "${selectedText.slice(0, 24)}..."`);
  };

  const handleDeleteAnnotation = (id: string) => {
    onUpdateLesson({
      annotations: lesson.annotations.filter(a => a.id !== id)
    });
    showToast('Đã xóa ghi chú');
  };

  // Outline Sections
  const outlineList = [
    { id: 'author', label: 'Tác giả & Hoàn cảnh ra đời' },
    { id: 'text', label: 'Văn bản tác phẩm' },
    { id: 'doc_hieu', label: 'Đọc hiểu chi tiết' },
    { id: 'phan_tich', label: 'Phân tích thi pháp' },
    { id: 'tong_ket', label: 'Tổng kết giá trị' }
  ];

  return (
    <div className={`relative min-h-[calc(100vh-56px)] flex flex-col ${isFocusMode ? 'bg-[#FAF8F5]' : ''}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#292524] text-white text-[13px] px-3.5 py-2 rounded-lg shadow-lg flex items-center gap-2 border border-stone-700 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.75} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Toolbar when Focus Mode is active */}
      {isFocusMode && (
        <div className="fixed top-4 right-6 z-40 bg-white/90 backdrop-blur-xs border border-[#E7E5E4] rounded-full px-3 py-1.5 shadow-xs flex items-center gap-2 text-[13px]">
          <span className="text-[#78716C] font-serif italic text-[12px]">Focus Mode</span>
          <button
            onClick={toggleFocusMode}
            className="btn-ghost py-1 px-2 text-[12px] h-auto flex items-center gap-1"
            title="Thoát chế độ tập trung"
          >
            <Minimize2 className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Thoát</span>
          </button>
        </div>
      )}

      {/* Main Workspace Body */}
      <div className="flex-1 flex gap-6 items-start py-4">
        {/* ========================================================================= */}
        {/* CỘT 1: OUTLINE (240px) */}
        {/* ========================================================================= */}
        {!isFocusMode && (
          <aside 
            className={`w-[240px] shrink-0 transition-all duration-200 ${
              isOutlineOpen ? 'block' : 'hidden'
            } hidden xl:block`}
          >
            <div className="card-surface p-3 sticky top-20 text-[13px]">
              {/* Outline / Annotations Tab Selector */}
              <div className="flex p-0.5 bg-stone-100 rounded-lg mb-3">
                <button
                  onClick={() => setOutlineTab('outline')}
                  className={`flex-1 py-1 rounded-md text-[12px] font-medium transition-colors ${
                    outlineTab === 'outline' ? 'bg-white text-[#292524] shadow-2xs' : 'text-[#78716C]'
                  }`}
                >
                  Cấu trúc
                </button>
                <button
                  onClick={() => setOutlineTab('annotations')}
                  className={`flex-1 py-1 rounded-md text-[12px] font-medium transition-colors ${
                    outlineTab === 'annotations' ? 'bg-white text-[#7C2D37] shadow-2xs' : 'text-[#78716C]'
                  }`}
                >
                  Chú thích ({lesson.annotations.length})
                </button>
              </div>

              {outlineTab === 'outline' ? (
                <div className="space-y-1">
                  {outlineList.map((item, index) => {
                    const isActive = selectedOutlineSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedOutlineSection(item.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-2 ${
                          isActive
                            ? 'bg-[#FBF4F5] text-[#7C2D37] font-medium'
                            : 'text-[#57534E] hover:text-[#292524] hover:bg-stone-50'
                        }`}
                      >
                        <span className="text-[11px] text-[#78716C] w-4">{index + 1}.</span>
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {lesson.annotations.length === 0 ? (
                    <p className="text-[12px] text-[#78716C] italic p-2">
                      Chưa có chú thích. Bôi đen văn bản để thêm ghi chú.
                    </p>
                  ) : (
                    lesson.annotations.map((anno) => (
                      <div
                        key={anno.id}
                        className="p-2.5 rounded-lg border border-[#E7E5E4] bg-stone-50/70 hover:bg-white text-[12px] group transition-colors"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className="font-serif font-medium text-[#292524] line-clamp-1">
                            "{anno.textSnippet}"
                          </span>
                          <button
                            onClick={() => handleDeleteAnnotation(anno.id)}
                            className="text-stone-400 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                            title="Xóa chú thích"
                          >
                            <Trash2 className="w-3 h-3" strokeWidth={1.75} />
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
        {/* CỘT 2: DOCUMENT AREA (TRANG SÁCH CHÍNH - 760–820px, LORA 18px / 1.8) */}
        {/* ========================================================================= */}
        <main className="flex-1 flex justify-center min-w-0">
          <article 
            ref={documentContainerRef}
            onMouseUp={handleSelection}
            className={`w-full max-w-[800px] bg-white border border-[#E7E5E4] rounded-2xl p-8 md:p-14 transition-all duration-200 select-text ${
              isFocusMode ? 'max-w-[760px] shadow-sm' : ''
            }`}
          >
            {/* Outline: Context Box when "Tác giả" is selected */}
            {selectedOutlineSection === 'author' && !isFocusMode && (
              <div className="card-highlight p-5 mb-8 text-[14px]">
                <h3 className="font-medium text-[#7C2D37] text-[13px] uppercase tracking-wider mb-1">
                  Tác giả & Bối cảnh lịch sử
                </h3>
                <p className="text-[#292524] leading-relaxed">
                  {lesson.authorBio}
                </p>
                <div className="mt-2 pt-2 border-t border-[#E7E5E4] text-[13px] text-[#57534E]">
                  <strong>Hoàn cảnh ra đời:</strong> {lesson.historicalContext}
                </div>
              </div>
            )}

            {/* Document Book Header */}
            <header className="text-center pb-8 mb-8 border-b border-[#E7E5E4]">
              <div className="text-[12px] text-[#78716C] uppercase tracking-widest font-medium mb-1">
                {lesson.genre === 'poetry' ? 'Văn bản thơ' : lesson.genre === 'story' ? 'Văn bản truyện' : 'Văn bản nghị luận'} · {lesson.grade} ({lesson.textbook})
              </div>
              <h1 className="font-serif text-[30px] font-semibold text-[#292524] tracking-tight">
                {lesson.title}
              </h1>
              <p className="font-serif italic text-[16px] text-[#57534E] mt-1">
                {lesson.author}
              </p>
            </header>

            {/* Document Body: Pure, serene reading experience */}
            <div className="text-document space-y-7">
              {lesson.textSections && lesson.textSections.length > 0 ? (
                lesson.textSections.map((sec) => (
                  <section key={sec.id} className="relative">
                    <p className="whitespace-pre-line text-[#292524]">
                      {sec.content}
                    </p>
                  </section>
                ))
              ) : (
                <p className="whitespace-pre-line text-[#292524]">
                  {lesson.fullText}
                </p>
              )}
            </div>

            {/* Book Page Footer / Source */}
            <footer className="mt-12 pt-6 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#78716C] gap-2">
              <span>Theo SGK Ngữ văn {lesson.grade}, {lesson.textbook}</span>
              <span>{lesson.annotations.length} chú thích đang lưu</span>
            </footer>
          </article>
        </main>

        {/* ========================================================================= */}
        {/* CỘT 3: ANALYSIS PANEL (320px - 3 TABS: PHÂN TÍCH | GHI CHÚ | LIÊN KẾT) */}
        {/* ========================================================================= */}
        {!isFocusMode && (
          <aside 
            className={`w-[320px] shrink-0 transition-all duration-200 ${
              isAnalysisOpen ? 'block' : 'hidden'
            } hidden lg:block`}
          >
            <div className="card-surface p-4 sticky top-20 text-[13px] space-y-4">
              {/* Header with ONE Primary Action: "Chú thích" */}
              <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E4]">
                <span className="font-medium text-[14px] text-[#292524]">
                  Không gian nghiên cứu
                </span>
                <button
                  onClick={() => setShowAnnotationModal(true)}
                  className="btn-primary py-1 px-2.5 text-[12px] h-7"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Chú thích</span>
                </button>
              </div>

              {/* 3 Tabs: Phân tích · Ghi chú · Liên kết */}
              <div className="flex p-0.5 bg-stone-100 rounded-lg">
                {[
                  { id: 'analysis' as const, label: 'Phân tích' },
                  { id: 'notes' as const, label: 'Ghi chú' },
                  { id: 'links' as const, label: 'Liên kết' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveRightTab(tab.id)}
                    className={`flex-1 py-1 rounded-md text-[12px] font-medium transition-colors ${
                      activeRightTab === tab.id
                        ? 'bg-white text-[#292524] shadow-2xs font-semibold'
                        : 'text-[#78716C] hover:text-[#292524]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: PHÂN TÍCH (Nội dung, Nghệ thuật, Hình ảnh, Từ khóa, Mạch cảm xúc) */}
              {activeRightTab === 'analysis' && (
                <div className="space-y-3">
                  {/* Sub-section buttons */}
                  <div className="flex flex-wrap gap-1">
                    {[
                      { id: 'content' as const, label: 'Nội dung' },
                      { id: 'art' as const, label: 'Nghệ thuật' },
                      { id: 'imagery' as const, label: 'Hình ảnh' },
                      { id: 'keywords' as const, label: 'Từ khóa' },
                      { id: 'emotion' as const, label: 'Mạch cảm xúc' }
                    ].map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => setOpenAnalysisSection(sec.id)}
                        className={`px-2 py-1 rounded text-[12px] transition-colors ${
                          openAnalysisSection === sec.id
                            ? 'bg-[#FBF4F5] text-[#7C2D37] font-medium border border-[#7C2D37]/30'
                            : 'bg-stone-50 text-[#57534E] hover:text-[#292524] border border-[#E7E5E4]'
                        }`}
                      >
                        {sec.label}
                      </button>
                    ))}
                  </div>

                  {/* Section Content */}
                  <div className="pt-2">
                    {openAnalysisSection === 'content' && (
                      <div className="space-y-2.5">
                        <div className="p-3 bg-stone-50 rounded-lg border border-[#E7E5E4]">
                          <span className="text-[11px] font-medium text-[#78716C] uppercase tracking-wider block mb-1">
                            Chủ đề cốt lõi
                          </span>
                          <p className="text-[#292524] leading-relaxed">
                            {lesson.poetryAnalysis?.theme || lesson.storyAnalysis?.themes?.join(', ') || 'Vẻ đẹp hào hoa, bi tráng của người lính trong kháng chiến.'}
                          </p>
                        </div>
                        <div className="p-3 bg-stone-50 rounded-lg border border-[#E7E5E4]">
                          <span className="text-[11px] font-medium text-[#78716C] uppercase tracking-wider block mb-1">
                            Giá trị nội dung
                          </span>
                          <p className="text-[#57534E] leading-relaxed">
                            {lesson.poetryAnalysis?.contentValue || lesson.storyAnalysis?.message || 'Bức tượng đài bất tử về thế hệ trẻ sẵn sàng hy sinh vì độc lập Tổ quốc.'}
                          </p>
                        </div>
                      </div>
                    )}

                    {openAnalysisSection === 'art' && (
                      <div className="space-y-2.5">
                        <div className="p-3 bg-stone-50 rounded-lg border border-[#E7E5E4]">
                          <span className="text-[11px] font-medium text-[#78716C] uppercase tracking-wider block mb-1">
                            Biện pháp tu từ đặc sắc
                          </span>
                          <ul className="space-y-1 text-[#292524]">
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
                        <div className="p-3 bg-stone-50 rounded-lg border border-[#E7E5E4]">
                          <span className="text-[11px] font-medium text-[#78716C] uppercase tracking-wider block mb-1">
                            Nhịp điệu & Giọng điệu
                          </span>
                          <p className="text-[#57534E] leading-relaxed">
                            {lesson.poetryAnalysis?.tone || 'Hào hùng, bi tráng, hoài niệm thiết tha.'}
                          </p>
                        </div>
                      </div>
                    )}

                    {openAnalysisSection === 'imagery' && (
                      <div className="space-y-2">
                        <span className="text-[11px] font-medium text-[#78716C] uppercase tracking-wider block">
                          Hình tượng nghệ thuật trung tâm
                        </span>
                        <div className="space-y-1.5">
                          {(lesson.poetryAnalysis?.imagery || [
                            'Dòng sông Mã gầm thét oai linh',
                            'Đỉnh đèo heo hút cồn mây, súng ngửi trời',
                            'Đêm hội đuốc hoa ấm tình quân dân',
                            'Hình tượng người lính Tây Tiến bi tráng'
                          ]).map((img, i) => (
                            <div key={i} className="p-2 bg-stone-50 rounded-lg border border-[#E7E5E4] text-[#292524] font-serif">
                              ✦ {img}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {openAnalysisSection === 'keywords' && (
                      <div className="space-y-2">
                        <span className="text-[11px] font-medium text-[#78716C] uppercase tracking-wider block">
                          Từ khóa thi pháp học
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(lesson.poetryAnalysis?.keywords || [
                            'Sông Mã', 'nhớ chơi vơi', 'súng ngửi trời', 'hội đuốc hoa', 'dáng kiều thơm', 'áo bào', 'độc hành'
                          ]).map((kw, i) => (
                            <span 
                              key={i} 
                              className="px-2.5 py-1 rounded bg-[#FBF4F5] text-[#7C2D37] font-serif text-[12px] border border-[#7C2D37]/20"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {openAnalysisSection === 'emotion' && (
                      <div className="p-3 bg-stone-50 rounded-lg border border-[#E7E5E4]">
                        <span className="text-[11px] font-medium text-[#78716C] uppercase tracking-wider block mb-1">
                          Vận động mạch cảm xúc
                        </span>
                        <p className="text-[#292524] leading-relaxed">
                          {lesson.poetryAnalysis?.emotionalFlow || 'Khởi nguồn từ nỗi nhớ da diết chơi vơi → Hành quân gian lao → Đêm hội tình quân dân → Bức tượng đài bi tráng → Khúc vĩ thanh son sắt.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: GHI CHÚ */}
              {activeRightTab === 'notes' && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[12px] text-[#78716C]">
                    <span>Tổng số: {lesson.annotations.length} ghi chú</span>
                    <button
                      onClick={() => setShowAnnotationModal(true)}
                      className="text-[#7C2D37] hover:underline font-medium"
                    >
                      + Thêm mới
                    </button>
                  </div>
                  <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                    {lesson.annotations.map((a) => (
                      <div key={a.id} className="p-2.5 rounded-lg border border-[#E7E5E4] bg-stone-50/50 hover:bg-white text-[12px] group">
                        <div className="flex items-start justify-between">
                          <span className="font-serif font-medium text-[#292524]">
                            "{a.textSnippet}"
                          </span>
                          <button
                            onClick={() => handleDeleteAnnotation(a.id)}
                            className="text-stone-400 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-[#57534E] mt-1">{a.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: LIÊN KẾT */}
              {activeRightTab === 'links' && (
                <div className="space-y-2">
                  <span className="text-[11px] font-medium text-[#78716C] uppercase tracking-wider block mb-1">
                    Liên kết học liệu & Bài dạy
                  </span>

                  <button
                    onClick={() => setActiveModule('khbd')}
                    className="w-full text-left p-3 rounded-lg border border-[#E7E5E4] hover:border-stone-400 bg-stone-50/60 hover:bg-white transition-colors"
                  >
                    <div className="flex items-center gap-2 font-medium text-[#292524]">
                      <FileText className="w-4 h-4 text-[#7C2D37]" strokeWidth={1.75} />
                      <span>Kế hoạch bài dạy (5512)</span>
                    </div>
                    <p className="text-[12px] text-[#78716C] mt-1">
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
                    <div className="flex items-center gap-2 font-medium text-[#292524]">
                      <Presentation className="w-4 h-4 text-[#B45309]" strokeWidth={1.75} />
                      <span>Slide bài giảng</span>
                    </div>
                    <p className="text-[12px] text-[#78716C] mt-1">
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
                    <div className="flex items-center gap-2 font-medium text-[#292524]">
                      <CheckSquare className="w-4 h-4 text-[#15803D]" strokeWidth={1.75} />
                      <span>Đề kiểm tra (7991)</span>
                    </div>
                    <p className="text-[12px] text-[#78716C] mt-1">
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
      {/* FLOATING CONTEXTUAL TOOLBAR (TỐI ĐA 4 HÀNH ĐỘNG KHI BÔI ĐEN VĂN BẢN) */}
      {/* 1. Highlight · 2. Chú thích · 3. Tạo câu hỏi · 4. ••• */}
      {/* ========================================================================= */}
      {toolbarPos && selectedText && (
        <div 
          style={{ top: `${toolbarPos.y}px`, left: `${toolbarPos.x}px` }}
          className="fixed z-50 bg-[#292524] text-white px-1.5 py-1 rounded-xl shadow-lg border border-stone-700 flex items-center gap-0.5 text-[12px] select-none animate-fade-in"
        >
          {/* Action 1: Highlight */}
          <button
            onClick={() => handleSaveAnnotation('highlight', 'Đoạn highlight trọng tâm')}
            className="px-2.5 py-1 hover:bg-stone-800 text-amber-300 rounded-lg flex items-center gap-1.5 transition-colors"
            title="Đánh dấu đoạn văn"
          >
            <Highlighter className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Highlight</span>
          </button>

          {/* Action 2: Chú thích */}
          <button
            onClick={() => setShowAnnotationModal(true)}
            className="px-2.5 py-1 hover:bg-stone-800 text-rose-300 rounded-lg flex items-center gap-1.5 transition-colors"
            title="Thêm chú thích sư phạm"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Chú thích</span>
          </button>

          {/* Action 3: Tạo câu hỏi */}
          <button
            onClick={() => {
              onAddQuestionFromPassage(selectedText);
              setToolbarPos(null);
              setActiveModule('question_builder');
            }}
            className="px-2.5 py-1 hover:bg-stone-800 text-stone-200 rounded-lg flex items-center gap-1.5 transition-colors"
            title="Tạo câu hỏi từ ngữ liệu này"
          >
            <HelpCircle className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Tạo câu hỏi</span>
          </button>

          <div className="w-px h-3.5 bg-stone-700 mx-0.5" />

          {/* Action 4: ••• Menu (Phân tích nghệ thuật, Vào slide, Vào đề, Liên kết hoạt động) */}
          <div className="relative">
            <button
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className="p-1.5 hover:bg-stone-800 text-stone-300 hover:text-white rounded-lg transition-colors"
              title="Thao tác nâng cao"
            >
              <MoreHorizontal className="w-3.5 h-3.5" strokeWidth={1.75} />
            </button>

            {isMoreMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-white text-[#292524] border border-[#E7E5E4] rounded-xl shadow-xl py-1 z-50">
                <button
                  onClick={() => {
                    handleSaveAnnotation('device', 'Phân tích nghệ thuật đặc sắc');
                    setIsMoreMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-stone-50 text-[12px] flex items-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5 text-[#7C2D37]" strokeWidth={1.75} />
                  <span>Phân tích nghệ thuật</span>
                </button>
                <button
                  onClick={() => {
                    onAddSlideFromQuote(selectedText, lesson.author);
                    setToolbarPos(null);
                    setActiveModule('slides');
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-stone-50 text-[12px] flex items-center gap-2"
                >
                  <Presentation className="w-3.5 h-3.5 text-[#B45309]" strokeWidth={1.75} />
                  <span>Đưa vào Slide</span>
                </button>
                <button
                  onClick={() => {
                    onSetExamPassage(selectedText);
                    setToolbarPos(null);
                    setActiveModule('exam');
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-stone-50 text-[12px] flex items-center gap-2"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-[#15803D]" strokeWidth={1.75} />
                  <span>Đưa vào Đề kiểm tra</span>
                </button>
                <button
                  onClick={() => {
                    setToolbarPos(null);
                    setActiveModule('khbd');
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-stone-50 text-[12px] flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-[#2563EB]" strokeWidth={1.75} />
                  <span>Liên kết hoạt động</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ANNOTATION MODAL (PROGRESSIVE DISCLOSURE - CHỈ MỞ KHI CẦN) */}
      {/* ========================================================================= */}
      {showAnnotationModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E7E5E4] max-w-md w-full p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E4]">
              <h3 className="font-medium text-[15px] text-[#292524]">
                Thêm chú thích học thuật
              </h3>
              <button
                onClick={() => setShowAnnotationModal(false)}
                className="text-[#78716C] hover:text-[#292524] p-1"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            {selectedText && (
              <div className="p-3 bg-stone-50 rounded-lg border border-[#E7E5E4] font-serif text-[13px] text-[#292524] italic max-h-24 overflow-y-auto">
                "{selectedText}"
              </div>
            )}

            <div>
              <label className="block text-[12px] font-medium text-[#57534E] mb-1">
                Nội dung chú giải / Cảm thụ / Định hướng phân tích:
              </label>
              <textarea
                rows={3}
                placeholder="Nhập cảm thụ ngôn từ, thi pháp hoặc câu hỏi dẫn dắt học sinh..."
                value={annotationInputNote}
                onChange={(e) => setAnnotationInputNote(e.target.value)}
                className="w-full text-[13px] p-2.5 border border-[#E7E5E4] rounded-lg focus:outline-none focus:border-[#7C2D37] text-[#292524]"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAnnotationModal(false)}
                className="btn-secondary text-[13px] py-1.5 px-3"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => handleSaveAnnotation('annotation')}
                className="btn-primary text-[13px] py-1.5 px-3"
              >
                Lưu chú thích
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
