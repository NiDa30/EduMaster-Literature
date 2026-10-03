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
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

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
      passageSnippet: newPassage,
      question: newQuestion,
      answer: newAnswer,
      guide: newGuide,
      points: Number(newPoints),
      linkedPart: linkedPart
    };

    setQuestions([item, ...questions]);
    setShowAddForm(false);
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
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Ngân hàng Câu hỏi Ngữ văn
            </span>
            <span className="text-xs text-stone-500 font-medium">Theo chuẩn Ma trận Đánh giá Năng lực</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-stone-900 mt-1">
            Question Builder Chuyên sâu cho Ngữ văn
          </h1>
          <p className="text-sm text-stone-600">
            Quy trình chuẩn hóa: NGỮ LIỆU → CÂU HỎI → ĐÁP ÁN → HƯỚNG DẪN CHẤM, liên kết trực tiếp với Ma trận và Đề thi 7991.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-[#7C2D37] hover:bg-[#68232D] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo câu hỏi mới</span>
          </button>
          <button
            onClick={() => setActiveModule('matrix')}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-stone-300 transition"
          >
            <Grid3X3 className="w-4 h-4 text-purple-700" />
            <span>Xem Ma trận</span>
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-stone-400" />
          <span className="font-semibold text-stone-700">Bộ lọc:</span>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
          >
            <option value="all">Tất cả dạng câu hỏi</option>
            <option value="doc_hieu">Đọc hiểu</option>
            <option value="tieng_viet">Tiếng Việt</option>
            <option value="nl_xa_hoi">Nghị luận xã hội</option>
            <option value="nl_van_hoc">Nghị luận văn học</option>
          </select>

          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
          >
            <option value="all">Tất cả mức độ nhận thức</option>
            <option value="NB">Nhận biết</option>
            <option value="TH">Thông hiểu</option>
            <option value="VD">Vận dụng</option>
          </select>
        </div>

        <div className="text-stone-500 font-mono">
          Hiển thị: <strong>{filteredQuestions.length}</strong> / {questions.length} câu hỏi
        </div>
      </div>

      {/* CREATE NEW QUESTION FORM */}
      {showAddForm && (
        <form onSubmit={handleCreateQuestion} className="bg-white p-6 rounded-3xl border-2 border-[#7C2D37]/30 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#7C2D37]" />
              Thêm câu hỏi mới vào ngân hàng
            </h3>
            <span className="text-xs text-stone-500">Chuẩn hóa cấu trúc 4 bước Ngữ văn</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Dạng câu hỏi:</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as QuestionType)}
                className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl"
              >
                <option value="doc_hieu">Đọc hiểu</option>
                <option value="tieng_viet">Tiếng Việt / Tu từ</option>
                <option value="nl_xa_hoi">Nghị luận xã hội</option>
                <option value="nl_van_hoc">Nghị luận văn học</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Mức độ nhận thức:</label>
              <select
                value={newLevel}
                onChange={(e) => setNewLevel(e.target.value as CognitiveLevel)}
                className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl"
              >
                <option value="NB">Nhận biết (NB)</option>
                <option value="TH">Thông hiểu (TH)</option>
                <option value="VD">Vận dụng (VD)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Kỹ năng đặc thù:</label>
              <select
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value as SkillType)}
                className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl"
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
              <label className="block font-semibold text-stone-700 mb-1">Liên kết Phần Đề thi 7991:</label>
              <select
                value={linkedPart}
                onChange={(e) => setLinkedPart(e.target.value as any)}
                className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl font-medium text-emerald-800"
              >
                <option value="partI">Phần I (Trắc nghiệm nhiều lựa chọn)</option>
                <option value="partII">Phần II (Trắc nghiệm Đúng/Sai)</option>
                <option value="partIII">Phần III (Trả lời ngắn)</option>
                <option value="partIV">Phần IV (Tự luận nghị luận)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              1. NGỮ LIỆU ĐỌC HIỂU (Trích đoạn tác phẩm / thơ):
            </label>
            <textarea
              rows={2}
              placeholder="Dán hoặc nhập đoạn văn bản làm ngữ liệu..."
              value={newPassage}
              onChange={(e) => setNewPassage(e.target.value)}
              className="w-full text-xs font-serif p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              2. LỆNH CÂU HỎI:
            </label>
            <textarea
              rows={2}
              required
              placeholder="Nhập câu hỏi đọc hiểu hoặc yêu cầu bài viết nghị luận..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="w-full text-xs p-2.5 border border-stone-300 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                3. ĐÁP ÁN GỢI Ý / Ý TRẢ LỜI:
              </label>
              <textarea
                rows={3}
                placeholder="Nội dung câu trả lời chuẩn..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="w-full text-xs p-2.5 border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                4. HƯỚNG DẪN CHẤM & BIỂU ĐIỂM:
              </label>
              <textarea
                rows={3}
                placeholder="Quy tắc cho điểm từng ý (vd: ý 1: 0.25đ, ý 2: 0.5đ)..."
                value={newGuide}
                onChange={(e) => setNewGuide(e.target.value)}
                className="w-full text-xs p-2.5 border border-stone-300 rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-600">Thang điểm:</span>
              <input
                type="number"
                step="0.25"
                min="0.25"
                max="10"
                value={newPoints}
                onChange={(e) => setNewPoints(parseFloat(e.target.value) || 0.5)}
                className="w-20 px-2 py-1 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono font-bold"
              />
              <span className="text-xs text-stone-500">điểm</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#7C2D37] hover:bg-[#68232D] text-white font-semibold text-xs rounded-xl shadow"
              >
                Lưu vào Ngân hàng
              </button>
            </div>
          </div>
        </form>
      )}

      {/* QUESTIONS LIST */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => (
          <div key={q.id} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
            {/* Header with badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-stone-900 bg-stone-100 px-2 py-0.5 rounded">
                  {q.code || `Câu ${idx + 1}`}
                </span>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getTypeBadge(q.type)}`}>
                  {getTypeLabel(q.type)}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${getLevelBadge(q.level)}`}>
                  {getLevelLabel(q.level)}
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  Kỹ năng: {q.skill}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#7C2D37] bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                  {q.points} điểm
                </span>
                <button
                  onClick={() => handlePushToExam(q)}
                  className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                  title="Chuyển câu hỏi này sang Đề 7991"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Vào Đề 7991</span>
                </button>
                <button
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="p-1 text-stone-400 hover:text-red-600 rounded-md transition"
                  title="Xóa câu hỏi"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Passage Snippet */}
            {q.passageSnippet && (
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 text-xs font-serif italic text-stone-800 whitespace-pre-line border-l-4 border-l-[#7C2D37]">
                <strong className="font-sans not-italic text-stone-600 block mb-0.5 text-[10px] uppercase">Ngữ liệu tham chiếu:</strong>
                {q.passageSnippet}
              </div>
            )}

            {/* Question */}
            <p className="text-sm font-medium text-stone-900 leading-relaxed">
              {q.question}
            </p>

            {/* Answer & Guide (collapsible/visible) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-800 block mb-1">Đáp án gợi ý:</span>
                <p className="text-stone-700 whitespace-pre-line leading-relaxed">{q.answer || 'Chưa cập nhật'}</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-800 block mb-1">Hướng dẫn chấm:</span>
                <p className="text-stone-600 whitespace-pre-line leading-relaxed">{q.guide || 'Chấm theo barem chính xác.'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
