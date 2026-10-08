import React, { useState } from 'react';
import { 
  Compass, 
  Feather, 
  BookOpen, 
  Share2, 
  Plus, 
  Trash2, 
  Sparkles, 
  Heart, 
  Shield, 
  Flame, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  CheckCircle2, 
  Edit3,
  Layers,
  Network,
  HelpCircle,
  Presentation,
  FileCheck2,
  Quote,
  Eye,
  Info
} from 'lucide-react';
import { 
  LiteratureLesson, 
  LiteratureGenre, 
  PoetryAnalysis, 
  StoryAnalysis, 
  ArgumentMap, 
  ActiveModule 
} from '../../types';
import { normalizeVietnamese } from '../../utils/unicode';

interface GenreAnalysisViewProps {
  lesson: LiteratureLesson;
  onUpdateLesson: (updated: Partial<LiteratureLesson>) => void;
  setActiveModule: (m: ActiveModule) => void;
  onAddSlideFromQuote?: (quote: string, author: string) => void;
  onAddQuestionFromPassage?: (passage: string) => void;
  onAddToKhbd?: (content: string, title?: string) => void;
}

export type GenreAnalysisTab = 'overview' | 'art' | 'characters' | 'argument_map' | 'evidence';

export const GenreAnalysisView: React.FC<GenreAnalysisViewProps> = ({
  lesson,
  onUpdateLesson,
  setActiveModule,
  onAddSlideFromQuote,
  onAddQuestionFromPassage,
  onAddToKhbd
}) => {
  const [selectedGenre, setSelectedGenre] = useState<LiteratureGenre>(lesson.genre);
  const [activeTab, setActiveTab] = useState<GenreAnalysisTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Argument Map state management
  const argumentMap: ArgumentMap = lesson.argumentMap || {
    thesis: lesson.genre === 'argumentative' 
      ? 'Khẳng định quyền tự do độc lập thiêng liêng bất khả xâm phạm của dân tộc Việt Nam.'
      : lesson.genre === 'poetry'
      ? 'Khắc họa bức tượng đài bi tráng, hào hoa về người lính Tây Tiến.'
      : 'Khát vọng sống, khát vọng hạnh phúc mãnh liệt của con người ngay bên bờ vực cái chết.',
    claims: [
      {
        id: 'c-1',
        title: 'Luận điểm 1: Cơ sở lý luận & Bối cảnh tiếp cận',
        reasons: [
          {
            id: 'r-1',
            text: 'Dẫn chứng xác thực từ hiện thực đời sống và phong cách sáng tác của tác giả',
            evidences: [
              {
                id: 'e-1',
                text: 'Chi tiết nghệ thuật mở đầu định hình cảm hứng',
                quote: lesson.fullText.slice(0, 140) + '...'
              }
            ]
          }
        ]
      },
      {
        id: 'c-2',
        title: 'Luận điểm 2: Chiều sâu tư tưởng và giá trị thẩm mỹ',
        reasons: [
          {
            id: 'r-2',
            text: 'Nghệ thuật xây dựng hình tượng độc đáo kết tinh tư tưởng tác phẩm',
            evidences: [
              {
                id: 'e-2',
                text: 'Hình tượng nhân vật và biện pháp nghệ thuật trọng tâm',
                quote: lesson.fullText.slice(150, 290) + '...'
              }
            ]
          }
        ]
      }
    ],
    conclusion: 'Toàn thể tác phẩm kết tinh tình cảm nhân đạo sâu sắc và tài năng nghệ thuật bậc thầy.'
  };

  const handleAddClaim = () => {
    const newClaim = {
      id: `c-${Date.now()}`,
      title: `Luận điểm ${argumentMap.claims.length + 1}: Bổ sung góc nhìn phân tích`,
      reasons: [
        {
          id: `r-${Date.now()}`,
          text: 'Lý lẽ phân tích sắc sảo làm sáng tỏ nội dung tác phẩm',
          evidences: [
            {
              id: `e-${Date.now()}`,
              text: 'Dẫn chứng minh họa đắt giá',
              quote: 'Ngữ liệu trích dẫn từ văn bản...'
            }
          ]
        }
      ]
    };

    const updated = {
      ...argumentMap,
      claims: [...argumentMap.claims, newClaim]
    };

    onUpdateLesson({ argumentMap: updated });
    showToast('Đã thêm Luận điểm mới vào Argument Map.');
  };

  const handleDeleteClaim = (cIdx: number) => {
    if (argumentMap.claims.length <= 1) return;
    const updated = {
      ...argumentMap,
      claims: argumentMap.claims.filter((_, i) => i !== cIdx)
    };
    onUpdateLesson({ argumentMap: updated });
    showToast('Đã xóa Luận điểm.');
  };

  const handleAddReason = (cIdx: number) => {
    const updated = { ...argumentMap };
    const claim = updated.claims[cIdx];
    if (!claim) return;
    claim.reasons.push({
      id: `r-${Date.now()}`,
      text: 'Lý lẽ sắc bén bổ sung cho luận điểm',
      evidences: [
        {
          id: `e-${Date.now()}`,
          text: 'Dẫn chứng cụ thể từ tác phẩm',
          quote: 'Trích dẫn câu văn / chi tiết đắt giá...'
        }
      ]
    });
    onUpdateLesson({ argumentMap: updated });
    showToast('Đã thêm Lý lẽ vào luận điểm.');
  };

  // Cross-module action helpers
  const handlePushToKhbd = (content: string, title?: string) => {
    if (onAddToKhbd) {
      onAddToKhbd(content, title || 'Phân tích thi pháp');
    } else {
      showToast('Đã gửi nội dung phân tích vào KHBD 5512.');
    }
  };

  const handlePushToSlide = (quote: string, author?: string) => {
    if (onAddSlideFromQuote) {
      onAddSlideFromQuote(quote, author || `${lesson.title} - ${lesson.author}`);
    } else {
      showToast('Đã tạo Slide mới từ trích dẫn.');
    }
  };

  const handlePushToQuestion = (passage: string) => {
    if (onAddQuestionFromPassage) {
      onAddQuestionFromPassage(passage);
    } else {
      showToast('Đã chuyển ngữ liệu sang Ngân hàng câu hỏi.');
    }
  };

  return (
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6 space-y-3 overflow-hidden max-w-6xl w-full mx-auto relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-metadata flex items-center gap-2 border border-stone-700 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#7C2D37]/10 text-[#7C2D37] border border-[#7C2D37]/20">
              Thi pháp học theo Thể loại
            </span>
            <span className="text-metadata text-stone-500 font-medium">
              Chương trình Ngữ văn GDPT 2018 · {lesson.grade}
            </span>
          </div>
          <h1 className="text-card-title md:text-section-title font-bold font-serif text-stone-900 mt-1">
            Phân tích Thể loại: {lesson.title} ({lesson.author})
          </h1>
        </div>

        {/* Thể loại selector buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 self-start md:self-auto shrink-0">
          <button
            onClick={() => {
              setSelectedGenre('poetry');
              onUpdateLesson({ genre: 'poetry' });
            }}
            className={`px-3 py-1.5 min-h-[34px] rounded-lg text-metadata font-medium transition flex items-center gap-1.5 ${
              selectedGenre === 'poetry'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Feather className="w-3.5 h-3.5 text-purple-600" />
            <span>Thơ trữ tình</span>
          </button>

          <button
            onClick={() => {
              setSelectedGenre('story');
              onUpdateLesson({ genre: 'story' });
            }}
            className={`px-3 py-1.5 min-h-[34px] rounded-lg text-metadata font-medium transition flex items-center gap-1.5 ${
              selectedGenre === 'story'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Truyện & Kí</span>
          </button>

          <button
            onClick={() => {
              setSelectedGenre('argumentative');
              onUpdateLesson({ genre: 'argumentative' });
            }}
            className={`px-3 py-1.5 min-h-[34px] rounded-lg text-metadata font-medium transition flex items-center gap-1.5 ${
              selectedGenre === 'argumentative'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Network className="w-3.5 h-3.5 text-amber-600" />
            <span>Văn nghị luận</span>
          </button>
        </div>
      </div>

      {/* Top 5 Primary Tabs & Cross-module Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#E7E5E4] pb-2 shrink-0 bg-stone-50/50 p-2 rounded-xl">
        {/* 5 Primary Tabs (UI Spec Section 6) */}
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-metadata font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'overview'
                ? 'bg-white text-[#7C2D37] shadow-xs border border-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1. Tổng quan</span>
          </button>

          <button
            onClick={() => setActiveTab('art')}
            className={`px-3 py-1.5 rounded-lg text-metadata font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'art'
                ? 'bg-white text-[#7C2D37] shadow-xs border border-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>2. Thi pháp & Nghệ thuật</span>
          </button>

          <button
            onClick={() => setActiveTab('characters')}
            className={`px-3 py-1.5 rounded-lg text-metadata font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'characters'
                ? 'bg-white text-[#7C2D37] shadow-xs border border-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>3. Hình tượng & Nhân vật</span>
          </button>

          <button
            onClick={() => setActiveTab('argument_map')}
            className={`px-3 py-1.5 rounded-lg text-metadata font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'argument_map'
                ? 'bg-white text-[#7C2D37] shadow-xs border border-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>4. Argument Map</span>
          </button>

          <button
            onClick={() => setActiveTab('evidence')}
            className={`px-3 py-1.5 rounded-lg text-metadata font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'evidence'
                ? 'bg-white text-[#7C2D37] shadow-xs border border-stone-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Quote className="w-3.5 h-3.5" />
            <span>5. Dẫn chứng & Ngữ liệu</span>
          </button>
        </div>

        {/* 3 Cross-module Action Buttons (Flow Section 7) */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
          <button
            onClick={() => {
              const content = `${lesson.title} (${lesson.author}): ${
                selectedGenre === 'poetry' ? lesson.poetryAnalysis?.theme :
                selectedGenre === 'story' ? lesson.storyAnalysis?.storySituation : argumentMap.thesis
              }`;
              handlePushToKhbd(content, 'Tri thức thể loại');
              setActiveModule('khbd');
            }}
            className="px-2.5 py-1.5 rounded-lg text-[12px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition flex items-center gap-1"
            title="Đưa kiến thức thi pháp này vào Kế hoạch bài dạy 5512"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Đưa vào KHBD</span>
          </button>

          <button
            onClick={() => {
              const quote = lesson.fullText.slice(0, 220);
              handlePushToSlide(quote, `${lesson.title} - ${lesson.author}`);
              setActiveModule('slides');
            }}
            className="px-2.5 py-1.5 rounded-lg text-[12px] font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition flex items-center gap-1"
            title="Tạo slide giảng dạy từ trích đoạn phân tích này"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Đưa vào Slide</span>
          </button>

          <button
            onClick={() => {
              const passage = lesson.fullText.slice(0, 300);
              handlePushToQuestion(passage);
              setActiveModule('question_builder');
            }}
            className="px-2.5 py-1.5 rounded-lg text-[12px] font-semibold bg-[#7C2D37]/10 text-[#7C2D37] hover:bg-[#7C2D37]/20 border border-[#7C2D37]/30 transition flex items-center gap-1"
            title="Sử dụng ngữ liệu này để xây dựng câu hỏi đọc hiểu"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tạo câu hỏi</span>
          </button>
        </div>
      </div>

      {/* Main Content Area with internal scrolling */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1">
        {/* TAB 1: TỔNG QUAN THỂ LOẠI */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="card-surface p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <h3 className="font-serif font-bold text-card-title text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#7C2D37]" />
                Đề tài, Chủ đề & Cảm hứng chủ đạo
              </h3>
              <p className="text-body-ui text-stone-700 leading-relaxed font-sans bg-stone-50 p-4 rounded-xl border border-stone-200">
                {selectedGenre === 'poetry' && (lesson.poetryAnalysis?.theme || 'Cảm hứng lãng mạn và tinh thần bi tráng ca ngợi người lính.')}
                {selectedGenre === 'story' && (lesson.storyAnalysis?.message || 'Khát vọng sống, khát vọng hạnh phúc mãnh liệt của con người ngay bên bờ vực cái chết.')}
                {selectedGenre === 'argumentative' && (argumentMap.thesis || 'Khẳng định quyền tự do độc lập thiêng liêng của dân tộc Việt Nam.')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-metadata font-bold text-stone-800 block mb-1">
                    Bối cảnh lịch sử & Hoàn cảnh sáng tác:
                  </span>
                  <p className="text-body-ui text-stone-600 text-[13px] leading-relaxed">
                    {lesson.historicalContext || 'Sáng tác trong bối cảnh lịch sử đặc biệt của cuộc kháng chiến bảo vệ Tổ quốc.'}
                  </p>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-metadata font-bold text-stone-800 block mb-1">
                    Tác giả & Phong cách nghệ thuật:
                  </span>
                  <p className="text-body-ui text-stone-600 text-[13px] leading-relaxed">
                    {lesson.authorBio || `${lesson.author} là gương mặt tiêu biểu của nền văn học Việt Nam hiện đại.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Giá trị nội dung & nghệ thuật */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card-surface p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
                <h4 className="font-serif font-bold text-[16px] text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Giá trị nội dung & Tư tưởng nhân văn
                </h4>
                <p className="text-body-ui text-stone-700 text-[13px] leading-relaxed">
                  {selectedGenre === 'poetry' && (lesson.poetryAnalysis?.contentValue || 'Tượng đài bất tử về người lính vệ quốc thời đầu chống Pháp.')}
                  {selectedGenre === 'story' && (lesson.storyAnalysis?.themes?.join(' · ') || 'Hiện thực nạn đói 1945 và sức sống mãnh liệt của người nông dân.')}
                  {selectedGenre === 'argumentative' && 'Văn kiện lập quốc vĩ đại, khẳng định quyền con người và quyền độc lập tự quyết của dân tộc.'}
                </p>
              </div>

              <div className="card-surface p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
                <h4 className="font-serif font-bold text-[16px] text-blue-800 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  Giá trị nghệ thuật & Phong cách thể loại
                </h4>
                <p className="text-body-ui text-stone-700 text-[13px] leading-relaxed">
                  {selectedGenre === 'poetry' && (lesson.poetryAnalysis?.artisticValue || 'Bút pháp lãng mạn kết hợp bi tráng, ngôn ngữ tạo hình giàu nhạc điệu.')}
                  {selectedGenre === 'story' && 'Nghệ thuật xây dựng tình huống éo le, miêu tả tâm lý bậc thầy, ngôn ngữ mộc mạc đậm chất dân dã.'}
                  {selectedGenre === 'argumentative' && 'Mẫu mực tuyệt đỉnh của văn chính luận: lập luận chặt chẽ, lý lẽ đanh thép, dẫn chứng xác thực.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: THI PHÁP & NGHỆ THUẬT */}
        {activeTab === 'art' && (
          <div className="space-y-4">
            {selectedGenre === 'poetry' && (
              <div className="space-y-4">
                <div className="card-surface p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <h3 className="font-serif font-bold text-card-title text-stone-900 flex items-center gap-2">
                    <Feather className="w-4 h-4 text-purple-600" />
                    Biện pháp tu từ & Đặc sắc ngôn từ
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(lesson.poetryAnalysis?.rhetoricalDevices || [
                      'Nhân hóa: "súng ngửi trời", "Sông Mã gầm lên khúc độc hành"',
                      'Nói giảm nói tránh: "anh về đất", "không bước nữa"',
                      'Tương phản đối lập: Ngoại hình tiều tụy >< Khí phách lẫm liệt',
                      'Từ láy tượng hình, tượng thanh: khúc khuỷu, thăm thẳm, heo hút'
                    ]).map((dev, idx) => (
                      <div key={idx} className="p-3 bg-purple-50/50 border border-purple-200/60 rounded-xl text-body-ui text-purple-950 text-[13px]">
                        {dev}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-surface p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <h3 className="font-serif font-bold text-card-title text-stone-900">
                    Vần điệu, Nhịp thơ & Nghệ thuật phối thanh
                  </h3>
                  <p className="text-body-ui text-stone-700 bg-stone-50 p-4 rounded-xl border border-stone-200">
                    {lesson.poetryAnalysis?.rhythmAndRhyme || 'Nhịp thơ linh hoạt 4/3, 2/2/3; phối thanh bổng - trầm độc đáo (câu nhiều thanh trắc gồ ghề xen lẫn câu toàn thanh bằng êm ả mênh mang).'}
                  </p>
                </div>
              </div>
            )}

            {selectedGenre === 'story' && (
              <div className="space-y-4">
                <div className="card-surface p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <h3 className="font-serif font-bold text-card-title text-stone-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Tình huống truyện & Điểm nhìn trần thuật
                  </h3>
                  <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2">
                    <span className="text-metadata font-bold text-blue-900">Tình huống truyện độc đáo:</span>
                    <p className="text-body-ui text-blue-950 text-[13px]">
                      {lesson.storyAnalysis?.storySituation || 'Nhặt vợ giữa nạn đói - lúc mà cái chết cận kề, nuôi thân không nổi lại đèo bòng lấy vợ.'}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="text-metadata font-bold text-stone-800 block mb-1">Điểm nhìn trần thuật:</span>
                      <p className="text-body-ui text-stone-600 text-[13px]">
                        {lesson.storyAnalysis?.pointOfView || 'Ngôi kể thứ ba toàn tri kết hợp điểm nhìn bên trong của các nhân vật.'}
                      </p>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="text-metadata font-bold text-stone-800 block mb-1">Lời người kể & Lời nhân vật:</span>
                      <p className="text-body-ui text-stone-600 text-[13px]">
                        Ngôn ngữ đối thoại tự nhiên, hòa quyện với dòng độc thoại nội tâm tha thiết.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-surface p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <h3 className="font-serif font-bold text-card-title text-stone-900">
                    Chi tiết nghệ thuật đắt giá
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(lesson.storyAnalysis?.artisticDetails || [
                      'Bốn bát bánh đúc ngày đói',
                      'Giọt nước mắt rỉ xuống của bà cụ Tứ',
                      'Nồi cháo cám chát xít ngày cưới',
                      'Lá cờ đỏ sao vàng bay phấp phới'
                    ]).map((det, idx) => (
                      <div key={idx} className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl text-body-ui text-amber-950 text-[13px] font-medium flex items-center justify-between">
                        <span>• {det}</span>
                        <button
                          onClick={() => handlePushToSlide(det, `${lesson.title} - ${lesson.author}`)}
                          className="text-[11px] text-blue-700 hover:underline shrink-0"
                        >
                          Lên slide
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedGenre === 'argumentative' && (
              <div className="card-surface p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <h3 className="font-serif font-bold text-card-title text-stone-900 flex items-center gap-2">
                  <Network className="w-4 h-4 text-amber-600" />
                  Nghệ thuật lập luận & Ngôn ngữ chính luận
                </h3>
                <p className="text-body-ui text-stone-700 bg-stone-50 p-4 rounded-xl border border-stone-200 leading-relaxed">
                  Lập luận vòng tròn khép kín và tiến công không ngừng: Mượn lời đối phương để khóa miệng đối phương; 
                  dẫn chứng lịch sử chân thực, điệp từ trùng điệp tạo âm hưởng đanh thép, hùng hồn như lời thề non nước.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: HÌNH TƯỢNG & NHÂN VẬT */}
        {activeTab === 'characters' && (
          <div className="space-y-4">
            {selectedGenre === 'poetry' && (
              <div className="card-surface p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <h3 className="font-serif font-bold text-card-title text-stone-900 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#7C2D37]" />
                  Bức tượng đài bi tráng về người lính
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-metadata font-bold text-stone-800">Ngoại hình gân guốc:</span>
                    <p className="text-body-ui text-stone-600 text-[13px]">
                      "Không mọc tóc", "quân xanh màu lá" - hiện thực tàn khốc của sốt rét rừng nhưng vẫn "dữ oai hùm".
                    </p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-metadata font-bold text-stone-800">Tâm hồn hào hoa:</span>
                    <p className="text-body-ui text-stone-600 text-[13px]">
                      "Mắt trừng gửi mộng", "đêm mơ Hà Nội dáng kiều thơm" - chất lãng mạn của tuổi trẻ Thủ đô.
                    </p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-metadata font-bold text-stone-800">Lý tưởng xả thân:</span>
                    <p className="text-body-ui text-stone-600 text-[13px]">
                      "Chiến trường đi chẳng tiếc đời xanh", "áo bào thay chiếu anh về đất" - sự hy sinh thanh thản, bất tử.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedGenre === 'story' && (
              <div className="space-y-3">
                {(lesson.storyAnalysis?.characters || [
                  {
                    name: 'Tràng',
                    role: 'Gã trai ngụ cư nghèo kéo xe bò thuê',
                    traits: ['Thô kệch, tốt bụng', 'Biết chăm lo mái ấm', 'Ý thức trách nhiệm'],
                    psychologicalShift: 'Từ vô tư lự trở thành người đàn ông chín chắn, yêu thương vợ con.',
                    quote: 'Hắn thấy hắn có bổn phận phải lo lắng cho vợ con sau này.'
                  },
                  {
                    name: 'Người vợ nhặt (Thị)',
                    role: 'Nạn nhân bị nạn đói xô đẩy',
                    traits: ['Chao chát ngày đói', 'Hiền thục khi làm dâu'],
                    psychologicalShift: 'Khát vọng sống phục sinh thiên tính nữ dịu dàng.',
                    quote: 'Thị cắp cái thúng con, nón rách che khuất nửa mặt, ngượng nghịu bước đi.'
                  },
                  {
                    name: 'Bà cụ Tứ',
                    role: 'Người mẹ già nông dân Việt Nam đôn hậu',
                    traits: ['Thương con vô hạn', 'Bao dung vị tha', 'Lạc quan tin vào ngày mai'],
                    psychologicalShift: 'Từ ngạc nhiên, tủi cực sang nhen nhóm niềm hy vọng tương lai.',
                    quote: 'Ai giàu ba họ, ai khó ba đời... Cốt làm sao chúng mày hòa thuận là u mừng.'
                  }
                ]).map((char, cIdx) => (
                  <div key={cIdx} className="card-surface p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-[#7C2D37]/10 text-[#7C2D37] font-bold text-xs flex items-center justify-center">
                          {cIdx + 1}
                        </span>
                        <h4 className="font-serif font-bold text-[16px] text-stone-900">
                          {char.name}
                        </h4>
                        <span className="text-metadata text-stone-500">({char.role})</span>
                      </div>
                      <button
                        onClick={() => handlePushToQuestion(`Phân tích nhân vật ${char.name} trong tác phẩm ${lesson.title}`)}
                        className="text-[11px] text-[#7C2D37] hover:underline font-medium"
                      >
                        Tạo đề về nhân vật
                      </button>
                    </div>

                    <p className="text-body-ui text-stone-700 text-[13px]">
                      <span className="font-semibold text-stone-900">Diễn biến tâm lý: </span>
                      {char.psychologicalShift}
                    </p>

                    <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/80 text-metadata italic text-stone-600 font-serif">
                      "{char.quote}"
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedGenre === 'argumentative' && (
              <div className="card-surface p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <h3 className="font-serif font-bold text-card-title text-stone-900 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-600" />
                  Hình tượng Chủ tịch Hồ Chí Minh & Khí phách dân tộc
                </h3>
                <p className="text-body-ui text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200">
                  Người phát ngôn thay cho toàn thể non sông gấm vóc, kết tinh tinh thần độc lập tự do và ý chí quyết tử của hàng triệu người dân Việt Nam.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ARGUMENT MAP (CÂY SƠ ĐỒ LẬP LUẬN) */}
        {activeTab === 'argument_map' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-stone-100 p-3 rounded-xl border border-stone-200">
              <div className="flex items-center gap-2 text-metadata text-stone-700">
                <Network className="w-4 h-4 text-amber-600" />
                <span>Sơ đồ cây lập luận (Argument Map) giúp chuẩn hóa hệ thống ý cho KHBD và Đề thi</span>
              </div>
              <button
                onClick={handleAddClaim}
                className="btn-primary py-1.5 px-3 text-metadata flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm Luận điểm</span>
              </button>
            </div>

            {/* Visual Diagram Tree */}
            <div className="p-6 md:p-8 rounded-3xl bg-stone-900 text-white shadow-xl space-y-6">
              {/* 1. THESIS NODE */}
              <div className="max-w-2xl mx-auto text-center p-5 rounded-2xl bg-amber-500/20 border-2 border-amber-400 text-white shadow-lg">
                <span className="text-metadata font-medium text-amber-300 block mb-1">
                  Luận đề trung tâm (Thesis)
                </span>
                <p className="text-base md:text-lg font-serif font-semibold leading-relaxed text-amber-100">
                  "{argumentMap.thesis}"
                </p>
              </div>

              {/* Connecting lines */}
              <div className="flex justify-center">
                <div className="w-px h-6 bg-stone-700"></div>
              </div>

              {/* 2. CLAIMS NODES */}
              <div className="space-y-5">
                {argumentMap.claims.map((claim, cIdx) => (
                  <div key={claim.id} className="p-5 rounded-2xl bg-stone-800/90 border border-stone-700 shadow-md">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-700">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center tabular-nums">
                          {cIdx + 1}
                        </span>
                        <h4 className="font-serif font-semibold text-card-title text-amber-200">
                          {claim.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAddReason(cIdx)}
                          className="px-2.5 py-1 min-h-[30px] bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-lg text-metadata font-medium flex items-center gap-1 transition"
                        >
                          <Plus className="w-3 h-3" /> Thêm Lý lẽ
                        </button>
                        {argumentMap.claims.length > 1 && (
                          <button
                            onClick={() => handleDeleteClaim(cIdx)}
                            className="p-1.5 text-stone-400 hover:text-red-400 rounded-lg"
                            title="Xóa luận điểm này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Reasons & Evidences */}
                    <div className="space-y-3 pl-4 border-l-2 border-amber-500/30">
                      {claim.reasons.map((reason, rIdx) => (
                        <div key={reason.id} className="p-3 rounded-xl bg-stone-900/80 border border-stone-700/80 space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="text-metadata font-semibold text-blue-400 shrink-0">Lý lẽ {rIdx + 1}:</span>
                            <p className="text-body-ui text-stone-200 leading-relaxed font-sans">{reason.text}</p>
                          </div>

                          {/* Evidences */}
                          <div className="space-y-1.5 pl-3 pt-1">
                            {reason.evidences.map((ev, eIdx) => (
                              <div key={ev.id} className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-metadata text-stone-300">
                                <span className="font-semibold text-emerald-400">Dẫn chứng & Ngữ liệu: </span>
                                <span>{ev.text}</span>
                                <div className="text-amber-200/80 italic font-serif mt-1">
                                  "{ev.quote}"
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Connecting lines */}
              <div className="flex justify-center">
                <div className="w-px h-6 bg-stone-700"></div>
              </div>

              {/* 3. CONCLUSION NODE */}
              <div className="max-w-2xl mx-auto text-center p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-white">
                <span className="text-metadata font-medium text-emerald-300 block mb-1">
                  Kết luận & Thông điệp tổng thể
                </span>
                <p className="text-body-ui font-serif leading-relaxed text-emerald-100">
                  "{argumentMap.conclusion}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DẪN CHỨNG & NGỮ LIỆU */}
        {activeTab === 'evidence' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-serif font-bold text-card-title text-stone-900 flex items-center gap-2">
                <Quote className="w-4 h-4 text-[#7C2D37]" />
                Kho Dẫn chứng & Ngữ liệu trọng tâm
              </h3>
              <span className="text-metadata text-stone-500">
                Click nhanh để xuất sang Slide, KHBD hoặc Đề thi
              </span>
            </div>

            <div className="space-y-3">
              {lesson.textSections.map((sec, sIdx) => (
                <div key={sec.id} className="card-surface p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <span className="font-serif font-bold text-[14px] text-[#7C2D37]">
                      {sec.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePushToSlide(sec.content, `${lesson.title} - ${sec.title}`)}
                        className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[11px] font-semibold transition"
                      >
                        Đưa vào Slide
                      </button>
                      <button
                        onClick={() => handlePushToQuestion(sec.content)}
                        className="px-2 py-1 bg-[#7C2D37]/10 hover:bg-[#7C2D37]/20 text-[#7C2D37] rounded-lg text-[11px] font-semibold transition"
                      >
                        Tạo câu hỏi
                      </button>
                    </div>
                  </div>

                  <p className="font-serif text-stone-800 leading-relaxed text-body-reading whitespace-pre-line bg-stone-50/70 p-3.5 rounded-xl border border-stone-200/60">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
