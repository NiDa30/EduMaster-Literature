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
  Network
} from 'lucide-react';
import { 
  LiteratureLesson, 
  LiteratureGenre, 
  PoetryAnalysis, 
  StoryAnalysis, 
  ArgumentMap, 
  ActiveModule 
} from '../../types';

interface GenreAnalysisViewProps {
  lesson: LiteratureLesson;
  onUpdateLesson: (updated: Partial<LiteratureLesson>) => void;
  setActiveModule: (m: ActiveModule) => void;
}

export const GenreAnalysisView: React.FC<GenreAnalysisViewProps> = ({
  lesson,
  onUpdateLesson,
  setActiveModule
}) => {
  const [selectedGenre, setSelectedGenre] = useState<LiteratureGenre>(lesson.genre);
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'argument_map'>('overview');

  // Argument Map state management
  const argumentMap: ArgumentMap = lesson.argumentMap || {
    thesis: 'Quyền độc lập tự do thiêng liêng bất khả xâm phạm của dân tộc Việt Nam.',
    claims: [
      {
        id: 'c-1',
        title: 'Luận điểm 1: Cơ sở pháp lý và chính nghĩa quốc tế',
        reasons: [
          {
            id: 'r-1',
            text: 'Dẫn lời bất hủ trong Tuyên ngôn Độc lập Mỹ (1776) và Tuyên ngôn Nhân quyền Pháp (1791)',
            evidences: [
              {
                id: 'e-1',
                text: 'Dùng chân lý của chính kẻ xâm lược để khẳng định quyền bình đẳng các dân tộc',
                quote: 'Tất cả mọi người đều sinh ra có quyền bình đẳng...'
              }
            ]
          }
        ]
      }
    ],
    conclusion: 'Toàn thể dân tộc quyết tâm đem tất cả tinh thần và lực lượng giữ vững nền tự do, độc lập ấy.'
  };

  const handleAddClaim = () => {
    const newClaim = {
      id: `c-${Date.now()}`,
      title: `Luận điểm ${argumentMap.claims.length + 1}: Bổ sung lập luận thực tiễn`,
      reasons: [
        {
          id: `r-${Date.now()}`,
          text: 'Lý lẽ chứng minh và phân tích bản chất hiện thực',
          evidences: [
            {
              id: `e-${Date.now()}`,
              text: 'Dẫn chứng cụ thể xác đáng từ tác phẩm',
              quote: 'Trích dẫn câu văn / sự kiện lịch sử'
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
  };

  const handleDeleteClaim = (cIdx: number) => {
    if (argumentMap.claims.length <= 1) return;
    const updated = {
      ...argumentMap,
      claims: argumentMap.claims.filter((_, i) => i !== cIdx)
    };
    onUpdateLesson({ argumentMap: updated });
  };

  const handleAddReason = (cIdx: number) => {
    const updated = { ...argumentMap };
    const claim = updated.claims[cIdx];
    if (!claim) return;
    claim.reasons.push({
      id: `r-${Date.now()}`,
      text: 'Lý lẽ sắc sảo làm sáng tỏ luận điểm',
      evidences: [
        {
          id: `e-${Date.now()}`,
          text: 'Dẫn chứng thực tiễn minh chứng',
          quote: 'Ngữ liệu trích dẫn...'
        }
      ]
    });
    onUpdateLesson({ argumentMap: updated });
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#7C2D37]/10 text-[#7C2D37] border border-[#7C2D37]/20">
              Thi pháp học theo Thể loại
            </span>
            <span className="text-xs text-stone-500 font-medium">Chương trình Ngữ văn GDPT 2018</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-stone-900 mt-1">
            Không gian Phân tích Thể loại Văn học
          </h1>
          <p className="text-sm text-stone-600">
            Mỗi thể loại văn học sở hữu mã nghệ thuật riêng: Thơ ca giàu hình ảnh & nhạc điệu; Truyện khám phá nhân vật & tình huống; Nghị luận lập bản đồ luận đề logic.
          </p>
        </div>

        {/* Thể loại selector buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 self-start md:self-auto">
          <button
            onClick={() => {
              setSelectedGenre('poetry');
              onUpdateLesson({ genre: 'poetry' });
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              selectedGenre === 'poetry'
                ? 'bg-white text-stone-900 shadow-xs'
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
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              selectedGenre === 'story'
                ? 'bg-white text-stone-900 shadow-xs'
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
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              selectedGenre === 'argumentative'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Network className="w-3.5 h-3.5 text-amber-600" />
            <span>Văn nghị luận</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. KHI CHỌN THỂ LOẠI THƠ (POETRY ANALYSIS WORKSPACE) */}
      {/* ========================================================================= */}
      {selectedGenre === 'poetry' && (
        <div className="space-y-6">
          {/* Top 3 Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-900 uppercase mb-2">
                <Heart className="w-4 h-4 text-purple-600" />
                Mạch cảm xúc & Cảm hứng chủ đạo
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-serif">
                {lesson.poetryAnalysis?.emotionalFlow || 'Vận động từ nỗi nhớ da diết về thiên nhiên và đồng đội đến tượng đài bi tráng và lời thề bất tử.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase mb-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Nhịp điệu, Vần & Giọng điệu
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-serif">
                {lesson.poetryAnalysis?.rhythmAndRhyme || 'Nhịp 4/3, 2/2/3 linh hoạt; phối thanh bổng trầm trắc bằng gắt gao; giọng thơ hào hùng bi tráng.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase mb-2">
                <Compass className="w-4 h-4 text-blue-600" />
                Chủ đề & Tư tưởng tác phẩm
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-serif">
                {lesson.poetryAnalysis?.theme || 'Ca ngợi vẻ đẹp hào hùng, lãng mạn và sự hy sinh quên mình của thế hệ thanh niên kháng chiến.'}
              </p>
            </div>
          </div>

          {/* Poetry Deep Dives */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Biện pháp tu từ & Câu thơ trọng tâm */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <Feather className="w-4 h-4 text-[#7C2D37]" />
                Hệ thống Biện pháp tu từ đặc sắc
              </h3>

              <div className="space-y-2.5">
                {(lesson.poetryAnalysis?.rhetoricalDevices || [
                  'Nhân hóa: "súng ngửi trời", "Sông Mã gầm lên khúc độc hành"',
                  'Nói giảm nói tránh: "anh về đất", "không bước nữa"',
                  'Tương phản đối lập: "quân xanh màu lá" >< "dữ oai hùm"',
                  'Điệp từ, điệp cấu trúc nhịp điệu dồn dập'
                ]).map((dev, i) => (
                  <div key={i} className="p-3 rounded-xl bg-purple-50/40 border border-purple-100 text-xs text-stone-800 leading-relaxed">
                    <span className="font-semibold text-purple-900">✦ </span>
                    {dev}
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-100">
                <h4 className="font-serif font-bold text-sm text-stone-900 mb-2">
                  Các câu thơ "nhãn tự" / Trọng tâm:
                </h4>
                <div className="space-y-1.5 font-serif text-xs italic text-stone-800">
                  {(lesson.poetryAnalysis?.keyVerses || [
                    'Heo hút cồn mây, súng ngửi trời',
                    'Chiến trường đi chẳng tiếc đời xanh',
                    'Áo bào thay chiếu, anh về đất'
                  ]).map((verse, i) => (
                    <div key={i} className="p-2 rounded-lg bg-stone-50 border border-stone-200">
                      "{verse}"
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Hệ thống hình ảnh & Từ khóa */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Hệ thống Hình tượng & Từ khóa cốt lõi
              </h3>

              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase">Hình ảnh trung tâm:</label>
                <div className="space-y-2">
                  {(lesson.poetryAnalysis?.imagery || [
                    'Sông Mã gầm lên khúc độc hành',
                    'Đoàn binh không mọc tóc',
                    'Đêm hội đuốc hoa'
                  ]).map((img, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-amber-50/40 border border-amber-200/60 text-xs text-stone-800 font-serif">
                      • {img}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="text-xs font-bold text-stone-700 uppercase mb-1.5 block">Từ khóa thi pháp:</label>
                <div className="flex flex-wrap gap-2">
                  {(lesson.poetryAnalysis?.keywords || ['nhớ chơi vơi', 'súng ngửi trời', 'áo bào', 'độc hành']).map((kw, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 font-serif text-xs">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="font-bold text-stone-800 block mb-1">Giá trị nội dung:</span>
                  <p className="text-stone-600 leading-relaxed font-serif line-clamp-3">
                    {lesson.poetryAnalysis?.contentValue || 'Tái hiện sinh động bức tượng đài người lính vệ quốc hào hoa và bi tráng.'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="font-bold text-stone-800 block mb-1">Giá trị nghệ thuật:</span>
                  <p className="text-stone-600 leading-relaxed font-serif line-clamp-3">
                    {lesson.poetryAnalysis?.artisticValue || 'Bút pháp lãng mạn hòa cùng cảm hứng sử thi bi tráng, ngôn ngữ tạo hình tài hoa.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. KHI CHỌN THỂ LOẠI TRUYỆN (STORY ANALYSIS WORKSPACE) */}
      {/* ========================================================================= */}
      {selectedGenre === 'story' && (
        <div className="space-y-6">
          {/* Situation & Narrator Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs md:col-span-2">
              <h3 className="text-xs font-bold text-blue-900 uppercase mb-1.5 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-blue-600" />
                Tình huống truyện độc đáo (Story Situation):
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed font-serif">
                {lesson.storyAnalysis?.storySituation || 'Tình huống "nhặt vợ" éo le, lạ lùng giữa nạn đói khủng khiếp năm 1945: người ta lo thân không nổi lại đèo bòng lấy vợ; một bên là cái chết rình rập, một bên là mầm sống và niềm hy vọng được nhen nhóm.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
              <h3 className="text-xs font-bold text-stone-800 uppercase mb-1.5">
                Điểm nhìn & Người kể chuyện:
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {lesson.storyAnalysis?.pointOfView || 'Ngôi kể thứ ba khách quan luân chuyển linh hoạt sang điểm nhìn nội tâm của Tràng và bà cụ Tứ, tạo chiều sâu cảm xúc.'}
              </p>
            </div>
          </div>

          {/* Character Cards */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#7C2D37]" />
                Hệ thống Nhân vật & Diễn biến tâm lý
              </h3>
              <span className="text-xs text-stone-500">Phân tích hành vi, phẩm chất và bước ngoặt nội tâm</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(lesson.storyAnalysis?.characters || [
                {
                  name: 'Tràng',
                  role: 'Gã kéo xe bò nghèo xóm ngụ cư',
                  traits: ['Tốt bụng, nhân hậu', 'Ý thức trách nhiệm mái ấm'],
                  psychologicalShift: 'Từ vô tâm chuyển sang hạnh phúc, nhận thức trách nhiệm gìn giữ tổ ấm.',
                  quote: 'Tràng thấy hắn có bổn phận phải lo lắng cho vợ con sau này.'
                },
                {
                  name: 'Thị (Vợ nhặt)',
                  role: 'Nạn nhân bị nạn đói xô đẩy',
                  traits: ['Chao chát ngày đói', 'Dịu dàng khi có tổ ấm'],
                  psychologicalShift: 'Cái đói làm méo mó nhân hình nhưng lòng khao khát sống và thiên tính nữ đã phục sinh kỳ diệu.',
                  quote: 'Thị ngoan ngoãn, ngượng nghịu bước đi bên Tràng.'
                },
                {
                  name: 'Bà cụ Tứ',
                  role: 'Người mẹ già nhân từ đôn hậu',
                  traits: ['Thương con vô hạn', 'Lạc quan, hướng về sự sống'],
                  psychologicalShift: 'Ngạc nhiên -> Tủi cực, khóc thương con -> Mừng lòng và thắp lên hy vọng đổi đời.',
                  quote: 'U thương chúng mày quá... Ai giàu ba họ, ai khó ba đời.'
                }
              ]).map((char, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-serif font-bold text-base text-stone-900">{char.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-medium">{char.role}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 my-2">
                      {char.traits.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-100">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs text-stone-600 leading-relaxed mt-2">
                      <strong className="text-stone-800 block mb-0.5">Biến chuyển tâm lý:</strong>
                      {char.psychologicalShift}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs italic font-serif text-stone-700">
                    "{char.quote}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Artistic Details & Message */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
              <h4 className="font-serif font-bold text-sm text-stone-900 mb-2">
                Chi tiết nghệ thuật đắt giá:
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-700 leading-relaxed">
                {(lesson.storyAnalysis?.artisticDetails || [
                  'Bát bánh đúc ngày đói cứu vớt một mạng người',
                  'Giọt nước mắt rỉ xuống trong kẽ mắt kèm nhèm của bà cụ Tứ',
                  'Nồi cháo cám chát xít trong bữa cơm đón dâu đầu tiên',
                  'Lá cờ đỏ sao vàng bay phấp phới báo hiệu cách mạng đổi đời'
                ]).map((det, i) => (
                  <li key={i}>{det}</li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
              <h4 className="font-serif font-bold text-sm text-stone-900 mb-2">
                Thông điệp & Giá trị nhân đạo:
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed font-serif">
                {lesson.storyAnalysis?.message || 'Ở bờ vực của cái chết, con người không nghĩ đến cái chết mà luôn hướng về sự sống, khao khát hạnh phúc tổ ấm và đùm bọc cưu mang lẫn nhau.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. KHI CHỌN VĂN NGHỊ LUẬN (VISUAL ARGUMENT MAP) */}
      {/* ========================================================================= */}
      {selectedGenre === 'argumentative' && (
        <div className="space-y-6">
          {/* Argument Map Controls */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                <Network className="w-5 h-5 text-amber-600" />
                Visual Argument Map (Bản đồ Cấu trúc Luận điểm)
              </h3>
              <p className="text-xs text-stone-500">
                Mô hình hóa logic: Luận đề → Hệ thống Luận điểm → Lý lẽ sắc bén → Dẫn chứng thực tiễn → Kết luận
              </p>
            </div>
            <button
              onClick={handleAddClaim}
              className="px-3.5 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Luận điểm mới</span>
            </button>
          </div>

          {/* Visual Diagram Tree */}
          <div className="p-6 md:p-8 rounded-3xl bg-stone-900 text-white shadow-xl space-y-8">
            {/* 1. THESIS NODE (LUẬN ĐỀ TRUNG TÂM) */}
            <div className="max-w-2xl mx-auto text-center p-6 rounded-2xl bg-amber-500/20 border-2 border-amber-400 text-white shadow-lg">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block mb-1">
                LUẬN ĐỀ TRUNG TÂM (THESIS)
              </span>
              <p className="text-base md:text-lg font-serif font-semibold leading-relaxed text-amber-100">
                "{argumentMap.thesis}"
              </p>
            </div>

            {/* Connecting lines */}
            <div className="flex justify-center">
              <div className="w-px h-8 bg-stone-700"></div>
            </div>

            {/* 2. CLAIMS NODES (HỆ THỐNG LUẬN ĐIỂM) */}
            <div className="space-y-6">
              {argumentMap.claims.map((claim, cIdx) => (
                <div key={claim.id} className="p-5 rounded-2xl bg-stone-800/90 border border-stone-700 shadow-md">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-700">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">
                        {cIdx + 1}
                      </span>
                      <h4 className="font-serif font-bold text-base text-amber-200">
                        {claim.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAddReason(cIdx)}
                        className="px-2.5 py-1 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-lg text-[11px] font-medium flex items-center gap-1 transition"
                      >
                        <Plus className="w-3 h-3" /> Thêm Lý lẽ
                      </button>
                      {argumentMap.claims.length > 1 && (
                        <button
                          onClick={() => handleDeleteClaim(cIdx)}
                          className="p-1 text-stone-400 hover:text-red-400 rounded-lg"
                          title="Xóa luận điểm này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Reasons & Evidences */}
                  <div className="space-y-4 pl-4 border-l-2 border-amber-500/30">
                    {claim.reasons.map((reason, rIdx) => (
                      <div key={reason.id} className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-700/80 space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-bold text-blue-400">Lý lẽ {rIdx + 1}:</span>
                          <p className="text-xs text-stone-200 leading-relaxed font-sans">{reason.text}</p>
                        </div>

                        {/* Evidences */}
                        <div className="space-y-1.5 pl-3 pt-1">
                          {reason.evidences.map((ev, eIdx) => (
                            <div key={ev.id} className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-[11px] text-stone-300">
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
              <div className="w-px h-8 bg-stone-700"></div>
            </div>

            {/* 3. CONCLUSION NODE */}
            <div className="max-w-2xl mx-auto text-center p-5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 block mb-1">
                KẾT LUẬN & THÔNG ĐIỆP TỔNG THỂ
              </span>
              <p className="text-sm font-serif leading-relaxed text-emerald-100">
                "{argumentMap.conclusion}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
