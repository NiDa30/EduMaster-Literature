import React, { useState } from 'react';
import { 
  HelpCircle, 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  CheckSquare, 
  Grid3X3, 
  FileText, 
  ArrowRight, 
  Bookmark, 
  Download,
  Filter,
  Eye,
  Edit3
} from 'lucide-react';
import { 
  LiteratureQuestionItem, 
  QuestionType, 
  CognitiveLevel, 
  SkillType, 
  Exam7991Data, 
  ActiveModule 
} from '../../types';
import { normalizeVietnamese } from '../../utils/unicode';

interface QuestionBuilderViewProps {
  questions: LiteratureQuestionItem[];
  setQuestions: React.Dispatch<React.SetStateAction<LiteratureQuestionItem[]>>;
  exam: Exam7991Data;
  setExam: React.Dispatch<React.SetStateAction<Exam7991Data>>;
  setActiveModule: (m: ActiveModule) => void;
  defaultPassage?: string;
}

export const QuestionBuilderView: React.FC<QuestionBuilderViewProps> = ({
  questions,
  setQuestions,
  exam,
  setExam,
  setActiveModule,
  defaultPassage = ''
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(questions[0]?.id || null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const selectedQuestion = questions.find(q => q.id === selectedQuestionId) || questions[0];

  const handleStartCreate = () => {
    setIsCreatingNew(true);
    setNewQuestion('');
    setNewAnswer('');
    setNewGuide('');
    setNewPassage(defaultPassage || '');
  };

  // New question form state
  const [newType, setNewType] = useState<QuestionType>('doc_hieu');
  const [newLevel, setNewLevel] = useState<CognitiveLevel>('NB');
  const [newSkill, setNewSkill] = useState<SkillType>('Nhận diện');
  const [newPassage, setNewPassage] = useState(defaultPassage || '');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newGuide, setNewGuide] = useState('');
  const [newPoints, setNewPoints] = useState<number>(0.5);
  const [linkedPart, setLinkedPart] = useState<'partI' | 'partII' | 'partIII' | 'partIV'>('partI');

  const filteredQuestions = questions.filter(q => {
    if (filterType !== 'all' && q.type !== filterType) return false;
    if (filterLevel !== 'all' && q.level !== filterLevel) return false;
    return true;
  });

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const item: LiteratureQuestionItem = {
      id: `q-${Date.now()}`,
      code: `Câu ${questions.length + 1}`,
      type: newType,
      level: newLevel,
      skill: newSkill,
      passageSnippet: normalizeVietnamese(newPassage),
      question: normalizeVietnamese(newQuestion),
      answer: normalizeVietnamese(newAnswer),
      guide: normalizeVietnamese(newGuide),
      points: Number(newPoints),
      linkedPart: linkedPart
    };

    setQuestions([item, ...questions]);
    setIsCreatingNew(false);
    setSelectedQuestionId(item.id);
    setNewQuestion('');
    setNewAnswer('');
    setNewGuide('');
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handlePushToExam = (q: LiteratureQuestionItem) => {
    if (q.linkedPart === 'partI' || q.type === 'doc_hieu') {
      const newPartI = {
        id: `p1-${Date.now()}`,
        code: `Câu ${exam.partI.length + 1}`,
        level: q.level,
        question: q.question,
        options: {
          A: q.answer || 'Phương án A (Chính xác)',
          B: 'Phương án B (Phương án nhiễu 1)',
          C: 'Phương án C (Phương án nhiễu 2)',
          D: 'Phương án D (Phương án nhiễu 3)'
        },
        correctAnswer: 'A' as const,
        points: 0.25,
        explanation: q.guide || 'Căn cứ vào ngữ liệu đọc hiểu bài học.'
      };
      setExam({ ...exam, partI: [...exam.partI, newPartI] });
      alert('Đã chuyển câu hỏi vào Phần I (Trắc nghiệm nhiều lựa chọn) của Đề 7991!');
    } else if (q.linkedPart === 'partIV' || q.type === 'nl_van_hoc' || q.type === 'nl_xa_hoi') {
      const newPartIV = {
        id: `p4-${Date.now()}`,
        code: `Câu ${exam.partIV.length + 1} (Tự luận)`,
        level: 'VD' as const,
        question: q.question,
        rubric: [
          { step: 'Đảm bảo cấu trúc bài văn nghị luận, xác định đúng vấn đề', points: 0.5 },
          { step: q.answer ? `Phân tích luận điểm cốt lõi: ${q.answer.slice(0, 100)}` : 'Triển khai hệ thống luận điểm sáng rõ', points: 1.5 },
          { step: 'Chính tả, ngữ pháp và sáng tạo liên hệ', points: 1.0 }
        ],
        points: q.points || 3.0
      };
      setExam({ ...exam, partIV: [...exam.partIV, newPartIV] });
      alert('Đã chuyển câu hỏi vào Phần IV (Tự luận) của Đề 7991!');
    }
  };

  const getTypeBadge = (type: QuestionType) => {
    switch (type) {
      case 'doc_hieu': return 'bg-blue-100 text-blue-900 border-blue-200';
      case 'tieng_viet': return 'bg-purple-100 text-purple-900 border-purple-200';
      case 'nl_xa_hoi': return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'nl_van_hoc': return 'bg-rose-100 text-rose-900 border-rose-200';
    }
  };

  const getTypeLabel = (type: QuestionType) => {
    switch (type) {
      case 'doc_hieu': return 'Đọc hiểu';
      case 'tieng_viet': return 'Tiếng Việt';
      case 'nl_xa_hoi': return 'Nghị luận xã hội';
      case 'nl_van_hoc': return 'Nghị luận văn học';
    }
  };

  const getLevelBadge = (level: CognitiveLevel) => {
    switch (level) {
      case 'NB': return 'bg-stone-200 text-stone-800';
      case 'TH': return 'bg-blue-100 text-blue-800';
      case 'VD': return 'bg-emerald-100 text-emerald-800';
    }
  };

  const getLevelLabel = (level: CognitiveLevel) => {
    switch (level) {
      case 'NB': return 'Nhận biết';
      case 'TH': return 'Thông hiểu';
      case 'VD': return 'Vận dụng';
    }
  };

  return (
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6 space-y-3 overflow-hidden max-w-7xl w-full mx-auto">
      {/* Header Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Ngân hàng Câu hỏi Ngữ văn
            </span>
            <span className="text-metadata text-stone-500 font-medium">Theo chuẩn Ma trận Đánh giá Năng lực</span>
          </div>
          <h1 className="text-card-title md:text-section-title font-semibold text-stone-900 mt-1">
            Question Builder Chuyên sâu: Ngữ liệu · Câu hỏi · Barem
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleStartCreate}
            className="btn-primary min-h-[38px] px-3.5 py-1.5 bg-[#7C2D37] hover:bg-[#68232D] text-white rounded-xl text-metadata font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo câu hỏi</span>
          </button>
          <button
            onClick={() => setActiveModule('matrix')}
            className="btn-secondary min-h-[38px] px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-metadata font-semibold flex items-center gap-1.5 border border-stone-300 transition"
          >
            <Grid3X3 className="w-4 h-4 text-purple-700" />
            <span>Xem Ma trận</span>
          </button>
        </div>
      </div>

      {/* 2-Column Split Workspace (Rule 29.14) */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 overflow-hidden">
        {/* LEFT COLUMN: Questions List + Search/Filter */}
        <aside className="w-full lg:w-[380px] xl:w-[420px] shrink-0 h-full min-h-0 flex flex-col card-surface p-3 overflow-hidden">
          {/* Filters Bar */}
          <div className="space-y-2 pb-3 border-b border-[#E7E5E4] shrink-0">
            <div className="flex items-center justify-between text-metadata">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-stone-400" />
                Danh sách ({filteredQuestions.length})
              </span>
              <button
                onClick={handleStartCreate}
                className="text-[#7C2D37] hover:underline font-medium text-[12px]"
              >
                + Thêm mới
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-metadata">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="min-h-[34px] px-2 py-1 bg-stone-50 border border-stone-300 rounded-lg text-[12px]"
              >
                <option value="all">Tất cả dạng</option>
                <option value="doc_hieu">Đọc hiểu</option>
                <option value="tieng_viet">Tiếng Việt</option>
                <option value="nl_xa_hoi">NL Xã hội</option>
                <option value="nl_van_hoc">NL Văn học</option>
              </select>

              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="min-h-[34px] px-2 py-1 bg-stone-50 border border-stone-300 rounded-lg text-[12px]"
              >
                <option value="all">Tất cả mức</option>
                <option value="NB">Nhận biết</option>
                <option value="TH">Thông hiểu</option>
                <option value="VD">Vận dụng</option>
              </select>
            </div>
          </div>

          {/* Questions Scrollable List */}
          <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pt-2 pr-1">
            {filteredQuestions.length === 0 ? (
              <p className="text-metadata text-stone-400 text-center py-6">
                Không tìm thấy câu hỏi phù hợp bộ lọc.
              </p>
            ) : (
              filteredQuestions.map((q, idx) => {
                const isSelected = !isCreatingNew && (q.id === selectedQuestionId || (!selectedQuestionId && idx === 0));
                return (
                  <div
                    key={q.id}
                    onClick={() => {
                      setSelectedQuestionId(q.id);
                      setIsCreatingNew(false);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#FBF4F5] border-[#7C2D37] shadow-xs'
                        : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-metadata text-stone-900 bg-stone-100 px-2 py-0.5 rounded text-[11px] tabular-nums">
                          {q.code || `Câu ${idx + 1}`}
                        </span>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${getTypeBadge(q.type)}`}>
                          {getTypeLabel(q.type)}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#7C2D37] tabular-nums">
                        {q.points}đ
                      </span>
                    </div>

                    <p className="text-metadata text-stone-800 line-clamp-2 leading-snug">
                      {q.question}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 pt-1 border-t border-stone-100">
                      <span>{getLevelLabel(q.level)} · {q.skill}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* RIGHT COLUMN: Question Editor or Detailed Preview */}
        <section className="flex-1 h-full min-h-0 flex flex-col card-surface p-5 overflow-hidden">
          {isCreatingNew ? (
            /* CREATE FORM */
            <form onSubmit={handleCreateQuestion} className="h-full min-h-0 flex flex-col space-y-3 overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E4] shrink-0">
                <div>
                  <h3 className="font-semibold text-card-title text-stone-900 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#7C2D37]" />
                    Soạn câu hỏi mới
                  </h3>
                  <span className="text-metadata text-stone-500">Quy trình chuẩn hóa 4 bước Ngữ văn</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  className="text-metadata text-stone-500 hover:text-stone-800 px-2 py-1"
                >
                  Đóng
                </button>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1 text-metadata">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Dạng câu hỏi:</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as QuestionType)}
                      className="w-full p-2 min-h-[38px] bg-stone-50 border border-stone-300 rounded-xl text-metadata"
                    >
                      <option value="doc_hieu">Đọc hiểu</option>
                      <option value="tieng_viet">Tiếng Việt</option>
                      <option value="nl_xa_hoi">NL Xã hội</option>
                      <option value="nl_van_hoc">NL Văn học</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Mức độ nhận thức:</label>
                    <select
                      value={newLevel}
                      onChange={(e) => setNewLevel(e.target.value as CognitiveLevel)}
                      className="w-full p-2 min-h-[38px] bg-stone-50 border border-stone-300 rounded-xl text-metadata"
                    >
                      <option value="NB">Nhận biết (NB)</option>
                      <option value="TH">Thông hiểu (TH)</option>
                      <option value="VD">Vận dụng (VD)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Kỹ năng đặc thù:</label>
                    <select
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value as SkillType)}
                      className="w-full p-2 min-h-[38px] bg-stone-50 border border-stone-300 rounded-xl text-metadata"
                    >
                      <option value="Nhận diện">Nhận diện</option>
                      <option value="Giải thích">Giải thích</option>
                      <option value="Phân tích">Phân tích</option>
                      <option value="So sánh">So sánh</option>
                      <option value="Đánh giá">Đánh giá</option>
                      <option value="Liên hệ">Liên hệ</option>
                      <option value="Sáng tạo">Sáng tạo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Thang điểm:</label>
                    <input
                      type="number"
                      step="0.25"
                      min="0.25"
                      max="10"
                      value={newPoints}
                      onChange={(e) => setNewPoints(parseFloat(e.target.value) || 0.5)}
                      className="w-full p-2 min-h-[38px] bg-stone-50 border border-stone-300 rounded-xl text-metadata tabular-nums font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">1. Ngữ liệu trích dẫn (Passage):</label>
                  <textarea
                    rows={2}
                    placeholder="Đoạn thơ/văn tham chiếu..."
                    value={newPassage}
                    onChange={(e) => setNewPassage(e.target.value)}
                    className="w-full text-body-ui font-serif p-2.5 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">2. Lệnh hỏi / Yêu cầu câu hỏi:</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Nội dung câu hỏi..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="w-full text-body-ui p-2.5 border border-stone-300 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">3. Đáp án gợi ý:</label>
                    <textarea
                      rows={2}
                      placeholder="Ý trả lời chuẩn..."
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      className="w-full text-body-ui p-2.5 border border-stone-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">4. Hướng dẫn chấm & Barem:</label>
                    <textarea
                      rows={2}
                      placeholder="Biểu điểm..."
                      value={newGuide}
                      onChange={(e) => setNewGuide(e.target.value)}
                      className="w-full text-body-ui p-2.5 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E7E5E4] shrink-0">
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  className="min-h-[38px] px-4 py-1.5 text-metadata font-medium text-stone-600 hover:bg-stone-100 rounded-xl transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn-primary min-h-[38px] px-5 py-1.5 bg-[#7C2D37] hover:bg-[#68232D] text-white font-medium text-metadata rounded-xl shadow transition"
                >
                  Lưu vào Ngân hàng
                </button>
              </div>
            </form>
          ) : selectedQuestion ? (
            /* DETAILED VIEW / EDIT OF SELECTED QUESTION */
            <div className="h-full min-h-0 flex flex-col space-y-4 overflow-hidden">
              {/* Header with badges and Action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E7E5E4] shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-card-title text-stone-900 bg-stone-100 px-3 py-1 rounded-lg tabular-nums">
                    {selectedQuestion.code}
                  </span>
                  <span className={`text-metadata font-medium px-2.5 py-1 rounded-full border ${getTypeBadge(selectedQuestion.type)}`}>
                    {getTypeLabel(selectedQuestion.type)}
                  </span>
                  <span className={`text-metadata font-medium px-2.5 py-1 rounded ${getLevelBadge(selectedQuestion.level)}`}>
                    {getLevelLabel(selectedQuestion.level)}
                  </span>
                  <span className="text-metadata font-medium px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    Kỹ năng: {selectedQuestion.skill}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-metadata tabular-nums font-semibold text-[#7C2D37] bg-rose-50 px-2.5 py-1 rounded border border-rose-100">
                    {selectedQuestion.points} điểm
                  </span>
                  <button
                    onClick={() => handlePushToExam(selectedQuestion)}
                    className="min-h-[36px] px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-metadata font-medium flex items-center gap-1 transition"
                    title="Chuyển câu hỏi này sang Đề 7991"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>Vào Đề 7991</span>
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(selectedQuestion.id)}
                    className="p-2 text-stone-400 hover:text-red-600 rounded-lg transition"
                    title="Xóa câu hỏi này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Body with local scroll */}
              <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1">
                {/* Passage Snippet */}
                {selectedQuestion.passageSnippet && (
                  <div className="p-4 bg-[#FAF8F5] rounded-xl border border-stone-200 text-body-ui font-serif italic text-stone-800 whitespace-pre-line border-l-4 border-l-[#7C2D37] leading-[1.8]">
                    <strong className="font-sans not-italic text-stone-600 block mb-1 text-metadata font-semibold">
                      Ngữ liệu tham chiếu:
                    </strong>
                    {selectedQuestion.passageSnippet}
                  </div>
                )}

                {/* Question */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="font-semibold text-stone-700 text-metadata block mb-1">
                    Lệnh hỏi:
                  </span>
                  <p className="text-body-ui font-medium text-stone-900 leading-normal">
                    {selectedQuestion.question}
                  </p>
                </div>

                {/* Answer & Guide */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
                    <span className="font-semibold text-stone-800 block mb-1 text-metadata">
                      Đáp án gợi ý:
                    </span>
                    <p className="text-stone-700 whitespace-pre-line leading-relaxed text-body-ui">
                      {selectedQuestion.answer || 'Chưa cập nhật'}
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
                    <span className="font-semibold text-stone-800 block mb-1 text-metadata">
                      Hướng dẫn chấm & Barem:
                    </span>
                    <p className="text-stone-600 whitespace-pre-line leading-relaxed text-body-ui">
                      {selectedQuestion.guide || 'Chấm theo barem chính xác.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-stone-400 text-metadata">
              Chọn câu hỏi từ danh sách bên trái hoặc nhấn "+ Tạo câu hỏi"
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
