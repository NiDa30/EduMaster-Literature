import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Feather, 
  Highlighter, 
  MessageSquarePlus, 
  HelpCircle, 
  Presentation, 
  CheckSquare, 
  Maximize2, 
  Minimize2, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Sparkles, 
  Trash2, 
  Plus, 
  Eye, 
  Share2, 
  Tag, 
  Heart, 
  Compass, 
  Quote,
  Lightbulb,
  FileText,
  X
} from 'lucide-react';
import { 
  LiteratureLesson, 
  TextAnnotation, 
  ActiveModule, 
  SlideItem, 
  LiteratureQuestionItem 
} from '../../types';

interface LiteratureReaderProps {
  lesson: LiteratureLesson;
  onUpdateLesson: (updated: Partial<LiteratureLesson>) => void;
  setActiveModule: (m: ActiveModule) => void;
  onAddSlideFromQuote: (quote: string, author: string) => void;
  onAddQuestionFromPassage: (passage: string) => void;
  onSetExamPassage: (passage: string) => void;
}

export const LiteratureReader: React.FC<LiteratureReaderProps> = ({
  lesson,
  onUpdateLesson,
  setActiveModule,
  onAddSlideFromQuote,
  onAddQuestionFromPassage,
  onSetExamPassage
}) => {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [activeOutlineSection, setActiveOutlineSection] = useState<string>('text');
  const [activeRightTab, setActiveRightTab] = useState<'content' | 'art' | 'imagery' | 'keywords' | 'emotion' | 'connection' | 'questions'>('content');
  
  // Text selection state & floating toolbar
  const [selectedText, setSelectedText] = useState('');
  const [floatingPos, setFloatingPos] = useState<{ x: number; y: number } | null>(null);
  const [showAnnotationModal, setShowAnnotationModal] = useState(false);
  const [annotationNote, setAnnotationNote] = useState('');
  const [annotationColor, setAnnotationColor] = useState<'amber' | 'emerald' | 'blue' | 'purple' | 'rose'>('amber');
  const [annotationType, setAnnotationType] = useState<TextAnnotation['type']>('highlight');
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const readerContainerRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 2500);
  };

  // Handle mouseup for text selection
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.toString().trim()) {
      setFloatingPos(null);
      setSelectedText('');
      return;
    }

    const text = selection.toString().trim();
    if (text.length > 2) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(text);
      setFloatingPos({
        x: Math.max(10, rect.left + rect.width / 2 - 160),
        y: Math.max(10, rect.top - 55)
      });
    }
  };

  // Add annotation / highlight
  const handleSaveAnnotation = (type: TextAnnotation['type'], defaultNote = '') => {
    if (!selectedText) return;
    const newAnno: TextAnnotation = {
      id: `anno-${Date.now()}`,
      textSnippet: selectedText,
      type: type,
      note: annotationNote || defaultNote || `Đoạn trích: "${selectedText.slice(0, 30)}..."`,
      color: annotationColor,
      timestamp: 'Vừa xong'
    };

    onUpdateLesson({
      annotations: [newAnno, ...lesson.annotations]
    });

    setFloatingPos(null);
    setShowAnnotationModal(false);
    setAnnotationNote('');
    showToast(`Đã thêm ghi chú cho: "${selectedText.slice(0, 25)}..."`);
  };

  const handleDeleteAnnotation = (id: string) => {
    onUpdateLesson({
      annotations: lesson.annotations.filter(a => a.id !== id)
    });
    showToast('Đã xóa ghi chú');
  };

  // Outline Sections
  const outlineItems = [
    { id: 'author', label: '1. Tác giả & Bối cảnh', icon: Feather },
    { id: 'text', label: '2. Toàn văn Tác phẩm', icon: BookOpen },
    { id: 'doc_hieu', label: '3. Đọc hiểu chi tiết', icon: Sparkles },
    { id: 'phan_tich', label: '4. Phân tích thi pháp', icon: Compass },
    { id: 'tong_ket', label: '5. Tổng kết giá trị', icon: Bookmark },
    { id: 'luyen_tap', label: '6. Luyện tập & Vận dụng', icon: CheckSquare }
  ];

  return (
    <div className={`space-y-4 ${isFocusMode ? 'fixed inset-0 z-50 bg-[#FAF8F5] p-6 md:p-12 overflow-y-auto' : ''}`}>
      {/* Top Bar Controls */}
      <div className="bg-white p-4 md:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#7C2D37]/10 text-[#7C2D37] flex items-center justify-center font-bold">
            <Feather className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                {lesson.genre === 'poetry' ? 'Thơ trữ tình' : lesson.genre === 'story' ? 'Truyện ngắn' : 'Văn nghị luận'}
              </span>
              <span className="text-xs text-stone-400">·</span>
              <span className="text-xs text-stone-600">{lesson.grade} ({lesson.textbook})</span>
            </div>
            <h1 className="text-xl font-bold font-serif text-stone-900 tracking-tight">
              {lesson.title} — {lesson.author}
            </h1>
          </div>
        </div>

        {/* View Controls & Action buttons */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              isFocusMode 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300'
            }`}
            title="Chế độ Đọc sách tập trung (ẩn thanh công cụ)"
          >
            {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFocusMode ? 'Thoát Focus Mode' : 'Reading Focus Mode'}</span>
          </button>

          <button
            onClick={() => setActiveModule('genre_analysis')}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-stone-300 transition"
          >
            <Compass className="w-3.5 h-3.5 text-[#7C2D37]" />
            <span>Phân tích thể loại</span>
          </button>

          <button
            onClick={() => setActiveModule('khbd')}
            className="px-3.5 py-2 bg-[#7C2D37] hover:bg-[#68232D] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Chuyển sang KHBD 5512</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-medium flex items-center gap-2 animate-fade-in border border-stone-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* 3-COLUMN DESKTOP WORKSPACE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* LEFT PANEL: OUTLINE BÀI HỌC (COL 1-3) */}
        {/* ========================================================================= */}
        {!isFocusMode && (
          <div className={`${leftCollapsed ? 'lg:col-span-1' : 'lg:col-span-3'} transition-all duration-200`}>
            <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs sticky top-20">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
                <span className="text-xs font-bold font-serif text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-[#7C2D37]" />
                  {!leftCollapsed && 'Cấu trúc bài học'}
                </span>
                <button
                  onClick={() => setLeftCollapsed(!leftCollapsed)}
                  className="p-1 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100"
                  title={leftCollapsed ? 'Mở rộng dàn ý' : 'Thu gọn dàn ý'}
                >
                  {leftCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
              </div>

              {!leftCollapsed ? (
                <div className="space-y-1 text-xs">
                  {outlineItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeOutlineSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveOutlineSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center gap-2.5 font-medium ${
                          isActive
                            ? 'bg-[#7C2D37]/10 text-[#7C2D37] font-semibold border-l-2 border-[#7C2D37]'
                            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}

                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
                      Ghi chú đã tạo ({lesson.annotations.length})
                    </div>
                    <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                      {lesson.annotations.length === 0 ? (
                        <p className="text-[11px] text-stone-400 italic">Bôi đen văn bản để thêm chú thích hoặc highlight.</p>
                      ) : (
                        lesson.annotations.map((a) => (
                          <div
                            key={a.id}
                            className="p-2 rounded-lg bg-stone-50 border border-stone-200 text-[11px] hover:border-amber-300 transition flex items-start justify-between gap-1 group"
                          >
                            <div>
                              <div className="font-semibold text-stone-800 line-clamp-1">"{a.textSnippet}"</div>
                              <div className="text-stone-500 line-clamp-1 mt-0.5">{a.note}</div>
                            </div>
                            <button
                              onClick={() => handleDeleteAnnotation(a.id)}
                              className="text-stone-300 hover:text-red-600 opacity-0 group-hover:opacity-100 transition p-0.5"
                              title="Xóa ghi chú"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-2">
                  {outlineItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setLeftCollapsed(false);
                          setActiveOutlineSection(item.id);
                        }}
                        className="p-2 text-stone-600 hover:text-[#7C2D37] hover:bg-stone-100 rounded-lg transition"
                        title={item.label}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CENTER PANEL: DOCUMENT READER / EDITOR (COL 4-8 or FULL IN FOCUS MODE) */}
        {/* ========================================================================= */}
        <div 
          className={`transition-all duration-200 ${
            isFocusMode 
              ? 'max-w-3xl mx-auto w-full' 
              : leftCollapsed && rightCollapsed
              ? 'lg:col-span-10'
              : leftCollapsed || rightCollapsed
              ? 'lg:col-span-8'
              : 'lg:col-span-6'
          }`}
        >
          {/* Reader Document Container */}
          <div 
            ref={readerContainerRef}
            onMouseUp={handleTextSelection}
            className="bg-[#FAF8F5] rounded-3xl border border-stone-200 p-8 md:p-12 shadow-sm text-stone-900 relative selection:bg-amber-200 selection:text-stone-900"
          >
            {/* Author & Historical Context Box (Only in non-text sections or toggled) */}
            {activeOutlineSection === 'author' && (
              <div className="mb-8 p-6 rounded-2xl bg-white border border-stone-200 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#7C2D37] uppercase">
                  <Feather className="w-4 h-4" />
                  Tiểu sử tác giả & Hoàn cảnh sáng tác
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-stone-900">{lesson.author}</h3>
                  <p className="text-sm text-stone-700 leading-relaxed mt-1 font-serif">{lesson.authorBio}</p>
                </div>
                <div className="pt-3 border-t border-stone-100">
                  <h4 className="text-xs font-bold text-stone-800 uppercase">Hoàn cảnh ra đời tác phẩm:</h4>
                  <p className="text-xs text-stone-600 leading-relaxed mt-1">{lesson.historicalContext}</p>
                </div>
              </div>
            )}

            {/* Document Header */}
            <div className="text-center pb-8 mb-8 border-b border-stone-200">
              <span className="text-xs uppercase tracking-widest text-[#7C2D37] font-semibold">
                VĂN BẢN ĐỌC HIỂU
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-stone-900 tracking-tight mt-1.5">
                {lesson.title}
              </h2>
              <p className="text-sm italic font-serif text-stone-600 mt-1">
                Tác giả: {lesson.author}
              </p>
              <p className="text-xs text-stone-400 mt-2 font-mono">
                Bôi đen từ hoặc câu thơ để kích hoạt thanh công cụ phân tích và chú giải ngữ văn
              </p>
            </div>

            {/* Document Body with rich typography */}
            <div className="space-y-8 font-serif text-base md:text-lg leading-loose text-stone-800">
              {lesson.textSections.map((sec, sIdx) => (
                <div key={sec.id} className="relative group">
                  <div className="text-xs font-sans font-semibold text-stone-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>{sec.title}</span>
                    <button
                      onClick={() => onAddQuestionFromPassage(sec.content)}
                      className="opacity-0 group-hover:opacity-100 transition text-[11px] text-[#7C2D37] hover:underline flex items-center gap-1 font-sans"
                    >
                      <HelpCircle className="w-3 h-3" /> Tạo câu hỏi đoạn này
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl transition hover:bg-stone-100/50">
                    <p className="whitespace-pre-line text-stone-900 font-serif leading-relaxed">
                      {sec.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Citation & Metadata */}
            <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-sans gap-2">
              <span>Nguồn: SGK Ngữ văn {lesson.grade} ({lesson.textbook})</span>
              <span className="flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-amber-600" />
                {lesson.annotations.length} chú thích đang hoạt động
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT PANEL: CONTEXTUAL ANALYSIS PANEL (COL 9-12) */}
        {/* ========================================================================= */}
        {!isFocusMode && (
          <div className={`${rightCollapsed ? 'lg:col-span-1' : 'lg:col-span-3'} transition-all duration-200`}>
            <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs sticky top-20 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-xs font-bold font-serif text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  {!rightCollapsed && 'Bảng phân tích ngữ cảnh'}
                </span>
                <button
                  onClick={() => setRightCollapsed(!rightCollapsed)}
                  className="p-1 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100"
                  title={rightCollapsed ? 'Mở rộng phân tích' : 'Thu gọn phân tích'}
                >
                  {rightCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>

              {!rightCollapsed && (
                <>
                  {/* Analysis Tabs */}
                  <div className="flex flex-wrap gap-1 p-1 bg-stone-100 rounded-xl text-[11px] font-medium">
                    {[
                      { id: 'content', label: 'Nội dung' },
                      { id: 'art', label: 'Nghệ thuật' },
                      { id: 'imagery', label: 'Hình ảnh' },
                      { id: 'keywords', label: 'Từ khóa' },
                      { id: 'emotion', label: 'Cảm xúc' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveRightTab(tab.id as any)}
                        className={`px-2.5 py-1 rounded-lg transition ${
                          activeRightTab === tab.id
                            ? 'bg-white text-stone-900 font-semibold shadow-2xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Body Content */}
                  <div className="text-xs space-y-3 pt-1">
                    {activeRightTab === 'content' && (
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60">
                          <h4 className="font-bold text-amber-900 mb-1 flex items-center gap-1">
                            <Bookmark className="w-3.5 h-3.5" /> Chủ đề cốt lõi:
                          </h4>
                          <p className="text-stone-700 leading-relaxed">
                            {lesson.poetryAnalysis?.theme || lesson.storyAnalysis?.message || 'Cảm hứng nhân văn và lý tưởng sống cao đẹp của con người Việt Nam.'}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                          <h4 className="font-bold text-stone-800 mb-1">Giá trị nội dung:</h4>
                          <p className="text-stone-600 leading-relaxed">
                            {lesson.poetryAnalysis?.contentValue || 'Tái hiện chân thực bức tranh lịch sử và vẻ đẹp tâm hồn con người thời kháng chiến.'}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeRightTab === 'art' && (
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-200/60">
                          <h4 className="font-bold text-purple-900 mb-1">Biện pháp tu từ nổi bật:</h4>
                          <ul className="list-disc pl-4 space-y-1 text-stone-700 leading-relaxed">
                            {(lesson.poetryAnalysis?.rhetoricalDevices || [
                              'Nhân hóa giàu tính biểu cảm',
                              'Nói giảm nói tránh bất tử hóa cái chết',
                              'Nghệ thuật tương phản đối lập'
                            ]).map((dev, i) => (
                              <li key={i}>{dev}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                          <h4 className="font-bold text-stone-800 mb-1">Nhịp điệu & Giọng điệu:</h4>
                          <p className="text-stone-600 leading-relaxed">
                            {lesson.poetryAnalysis?.tone || 'Hào hùng, bi tráng, tha thiết hoài niệm.'}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeRightTab === 'imagery' && (
                      <div className="space-y-2">
                        <h4 className="font-bold text-stone-800">Hệ thống hình tượng trung tâm:</h4>
                        <div className="space-y-2">
                          {(lesson.poetryAnalysis?.imagery || [
                            'Dòng Sông Mã oai linh',
                            'Đỉnh đèo súng ngửi trời',
                            'Đêm hội đuốc hoa'
                          ]).map((img, i) => (
                            <div key={i} className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-stone-800 font-serif">
                              ✦ {img}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeRightTab === 'keywords' && (
                      <div className="space-y-2">
                        <h4 className="font-bold text-stone-800">Từ khóa thi pháp học:</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {(lesson.poetryAnalysis?.keywords || ['Sông Mã', 'nhớ chơi vơi', 'súng ngửi trời', 'áo bào']).map((kw, i) => (
                            <span 
                              key={i} 
                              className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-serif text-xs border border-amber-200"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeRightTab === 'emotion' && (
                      <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200 text-stone-800 space-y-2">
                        <h4 className="font-bold text-rose-950 flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5 text-rose-600" />
                          Mạch cảm xúc bài học:
                        </h4>
                        <p className="text-stone-700 leading-relaxed">
                          {lesson.poetryAnalysis?.emotionalFlow || 'Vận động từ nỗi nhớ da diết đến hào hùng bi tráng và lời thề tâm linh.'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Fast Action Connectors */}
                  <div className="pt-3 border-t border-stone-100 space-y-1.5">
                    <button
                      onClick={() => {
                        onSetExamPassage(lesson.fullText.slice(0, 400));
                        setActiveModule('exam');
                      }}
                      className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition border border-stone-200"
                    >
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Đưa tác phẩm vào Đề 7991</span>
                    </button>
                    <button
                      onClick={() => {
                        onAddSlideFromQuote(lesson.textSections[0]?.content.slice(0, 160) || '', lesson.author);
                        setActiveModule('slides');
                      }}
                      className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition border border-stone-200"
                    >
                      <Presentation className="w-3.5 h-3.5 text-amber-700" />
                      <span>Tạo Quote Slide trình chiếu</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* FLOATING CONTEXTUAL TOOLBAR WHEN TEXT IS SELECTED */}
      {/* ========================================================================= */}
      {floatingPos && selectedText && (
        <div 
          style={{ top: `${floatingPos.y}px`, left: `${floatingPos.x}px` }}
          className="fixed z-50 bg-[#1C1917] text-white px-2 py-1.5 rounded-2xl shadow-2xl border border-stone-700 flex items-center gap-1 animate-fade-in text-xs backdrop-blur-md"
        >
          {/* Highlight quick button */}
          <button
            onClick={() => handleSaveAnnotation('highlight', 'Đã đánh dấu đoạn văn')}
            className="p-1.5 hover:bg-stone-800 text-amber-300 rounded-lg flex items-center gap-1 transition"
            title="Đánh dấu highlight"
          >
            <Highlighter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Highlight</span>
          </button>

          {/* Add annotation button */}
          <button
            onClick={() => setShowAnnotationModal(true)}
            className="p-1.5 hover:bg-stone-800 text-rose-300 rounded-lg flex items-center gap-1 transition"
            title="Thêm chú thích chi tiết"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chú thích</span>
          </button>

          {/* Biện pháp nghệ thuật */}
          <button
            onClick={() => handleSaveAnnotation('device', 'Biện pháp nghệ thuật đặc sắc')}
            className="p-1.5 hover:bg-stone-800 text-purple-300 rounded-lg flex items-center gap-1 transition"
            title="Đánh dấu Biện pháp nghệ thuật"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nghệ thuật</span>
          </button>

          <span className="w-px h-4 bg-stone-700 mx-1"></span>

          {/* Tạo câu hỏi */}
          <button
            onClick={() => {
              onAddQuestionFromPassage(selectedText);
              setFloatingPos(null);
              setActiveModule('question_builder');
            }}
            className="p-1.5 hover:bg-stone-800 text-blue-300 rounded-lg flex items-center gap-1 transition"
            title="Tạo câu hỏi đọc hiểu từ đoạn này"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tạo câu hỏi</span>
          </button>

          {/* Đưa vào Slide */}
          <button
            onClick={() => {
              onAddSlideFromQuote(selectedText, lesson.author);
              setFloatingPos(null);
              setActiveModule('slides');
            }}
            className="p-1.5 hover:bg-stone-800 text-amber-300 rounded-lg flex items-center gap-1 transition"
            title="Tạo Quote Slide cho đoạn này"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Vào Slide</span>
          </button>

          {/* Đưa vào đề kiểm tra */}
          <button
            onClick={() => {
              onSetExamPassage(selectedText);
              setFloatingPos(null);
              setActiveModule('exam');
            }}
            className="p-1.5 hover:bg-stone-800 text-emerald-300 rounded-lg flex items-center gap-1 transition"
            title="Đưa vào đề thi làm ngữ liệu"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Vào Đề</span>
          </button>

          <button
            onClick={() => setFloatingPos(null)}
            className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white rounded-lg ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Annotation Input Modal */}
      {showAnnotationModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <MessageSquarePlus className="w-4 h-4 text-[#7C2D37]" />
                Thêm chú thích sư phạm
              </h3>
              <button 
                onClick={() => setShowAnnotationModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs font-serif italic text-stone-700 max-h-24 overflow-y-auto">
              "{selectedText}"
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Nội dung chú giải / Hướng dẫn phân tích:
              </label>
              <textarea
                rows={3}
                placeholder="Nhập cảm thụ văn học, ý nghĩa hình ảnh hoặc câu hỏi định hướng..."
                value={annotationNote}
                onChange={(e) => setAnnotationNote(e.target.value)}
                className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#7C2D37] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Màu sắc ghi chú:
              </label>
              <div className="flex gap-2">
                {(['amber', 'emerald', 'blue', 'purple', 'rose'] as const).map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setAnnotationColor(color)}
                    className={`w-7 h-7 rounded-full border-2 transition ${
                      annotationColor === color ? 'border-stone-900 scale-110' : 'border-transparent'
                    } ${
                      color === 'amber' ? 'bg-amber-300' :
                      color === 'emerald' ? 'bg-emerald-300' :
                      color === 'blue' ? 'bg-blue-300' :
                      color === 'purple' ? 'bg-purple-300' : 'bg-rose-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAnnotationModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={() => handleSaveAnnotation('annotation')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#7C2D37] hover:bg-[#68232D] text-white shadow"
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
