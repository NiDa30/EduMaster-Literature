import React, { useState } from 'react';
import { 
  CheckSquare, 
  Download, 
  Printer, 
  Award, 
  FileText, 
  Info, 
  CheckCircle2, 
  Plus,
  Trash2,
  Edit3,
  X,
  Save,
  ChevronDown
} from 'lucide-react';
import { 
  Exam7991Data, 
  LessonPlan5512, 
  PartIChoiceQuestion, 
  PartIITrueFalseQuestion, 
  PartIIIShortAnswerQuestion, 
  PartIVEssayQuestion 
} from '../types';
import { exportDocxExam, exportWordExam7991 } from '../utils/exportUtils';
import { normalizeVietnamese } from '../utils/unicode';

interface Exam7991ViewProps {
  exam: Exam7991Data;
  setExam: React.Dispatch<React.SetStateAction<Exam7991Data>>;
  khbd: LessonPlan5512;
}

type EditingQuestionState = 
  | { part: 'partI'; data: PartIChoiceQuestion }
  | { part: 'partII'; data: PartIITrueFalseQuestion }
  | { part: 'partIII'; data: PartIIIShortAnswerQuestion }
  | { part: 'partIV'; data: PartIVEssayQuestion }
  | null;

export const Exam7991View: React.FC<Exam7991ViewProps> = ({ exam, setExam, khbd }) => {
  const [viewMode, setViewMode] = useState<'exam_paper' | 'marking_guide'>('exam_paper');
  const [selectedPart, setSelectedPart] = useState<'all' | 'partI' | 'partII' | 'partIII' | 'partIV'>('all');
  const [editingQuestion, setEditingQuestion] = useState<EditingQuestionState>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

  // Simulated answers state for Part II scoring simulator
  const [simulatedAnswers, setSimulatedAnswers] = useState<{
    [qId: string]: { a: boolean; b: boolean; c: boolean; d: boolean };
  }>({
    'lp2-1': { a: true, b: false, c: false, d: true },
    'lp2-2': { a: false, b: true, c: false, d: true }
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const calculatePartIIScore = (qIndex: number) => {
    const q = exam.partII[qIndex];
    if (!q) return 0;
    const userAns = simulatedAnswers[q.id] || { a: false, b: false, c: false, d: false };
    
    let correctCount = 0;
    if (userAns.a === q.statements[0]?.isCorrect) correctCount++;
    if (userAns.b === q.statements[1]?.isCorrect) correctCount++;
    if (userAns.c === q.statements[2]?.isCorrect) correctCount++;
    if (userAns.d === q.statements[3]?.isCorrect) correctCount++;

    if (correctCount === 1) return 0.1;
    if (correctCount === 2) return 0.25;
    if (correctCount === 3) return 0.5;
    if (correctCount === 4) return 1.0;
    return 0.0;
  };

  const totalPartIPoints = exam.partI.reduce((sum, q) => sum + (q.points || 0.25), 0);
  const totalPartIIPoints = exam.partII.reduce((sum, q) => sum + (q.points || 1.0), 0);
  const totalPartIIIPoints = exam.partIII.reduce((sum, q) => sum + (q.points || 0.5), 0);
  const totalPartIVPoints = exam.partIV.reduce((sum, q) => sum + (q.points || 3.0), 0);
  const grandTotal = totalPartIPoints + totalPartIIPoints + totalPartIIIPoints + totalPartIVPoints;

  // Add Question Handlers
  const handleAddPartI = () => {
    const newQ: PartIChoiceQuestion = {
      id: `p1-${Date.now()}`,
      code: `Câu ${exam.partI.length + 1}`,
      question: 'Nhận định nào sau đây là chính xác về hình tượng nghệ thuật trong đoạn trích?',
      options: {
        A: 'Phương án khẳng định A (chính xác)',
        B: 'Phương án gây nhiễu B',
        C: 'Phương án gây nhiễu C',
        D: 'Phương án gây nhiễu D'
      },
      correctAnswer: 'A',
      explanation: 'Dẫn chứng cụ thể từ văn bản đọc hiểu.',
      level: 'NB',
      points: 0.25
    };
    setExam(prev => ({ ...prev, partI: [...prev.partI, newQ] }));
    setEditingQuestion({ part: 'partI', data: newQ });
    showToast('Đã thêm câu hỏi trắc nghiệm mới vào Phần I.');
  };

  const handleAddPartII = () => {
    const newQ: PartIITrueFalseQuestion = {
      id: `p2-${Date.now()}`,
      code: `Câu ${exam.partII.length + 1}`,
      stem: 'Đọc kỹ nhận định sau về giá trị nội dung và nghệ thuật của tác phẩm:',
      statements: [
        { subId: 'a', text: 'Nhận định đúng về mạch cảm xúc trữ tình.', isCorrect: true, explanation: 'Nhận định phù hợp với văn bản.' },
        { subId: 'b', text: 'Nhận định chưa chính xác về bút pháp nghệ thuật.', isCorrect: false, explanation: 'Chưa chính xác với bút pháp của tác giả.' },
        { subId: 'c', text: 'Nhận định đúng về hình tượng nhân vật / không gian.', isCorrect: true, explanation: 'Hình tượng thể hiện rõ nét trong văn bản.' },
        { subId: 'd', text: 'Nhận định chưa đúng về hoàn cảnh sáng tác.', isCorrect: false, explanation: 'Sai lệch về thời gian hoặc hoàn cảnh.' }
      ],
      level: 'TH',
      points: 1.0
    };
    setExam(prev => ({ ...prev, partII: [...prev.partII, newQ] }));
    setEditingQuestion({ part: 'partII', data: newQ });
    showToast('Đã thêm câu hỏi Đúng/Sai mới vào Phần II.');
  };

  const handleAddPartIII = () => {
    const newQ: PartIIIShortAnswerQuestion = {
      id: `p3-${Date.now()}`,
      code: `Câu ${exam.partIII.length + 1}`,
      question: 'Chỉ ra 01 biện pháp tu từ tiêu biểu được sử dụng trong dòng thơ/câu văn trên và nêu ngắn gọn tác dụng.',
      correctAnswer: 'Nhân hóa / Điệp từ',
      explanation: 'Học sinh chỉ đúng tên biện pháp và tác dụng biểu cảm được trọn vẹn điểm.',
      level: 'TH',
      points: 0.5
    };
    setExam(prev => ({ ...prev, partIII: [...prev.partIII, newQ] }));
    setEditingQuestion({ part: 'partIII', data: newQ });
    showToast('Đã thêm câu hỏi trả lời ngắn vào Phần III.');
  };

  const handleAddPartIV = () => {
    const newQ: PartIVEssayQuestion = {
      id: `p4-${Date.now()}`,
      code: `Câu ${exam.partIV.length + 1}`,
      question: 'Viết bài văn nghị luận phân tích vẻ đẹp ngôn từ và cảm hứng nghệ thuật thể hiện trong đoạn trích đã cho.',
      level: 'VD',
      points: 3.0,
      rubric: [
        { step: 'Mở bài: Giới thiệu tác giả, tác phẩm, vấn đề nghị luận', points: 0.5 },
        { step: 'Thân bài: Phân tích luận điểm 1 & luận điểm 2, nghệ thuật đặc sắc', points: 2.0 },
        { step: 'Kết bài: Đánh giá khái quát và liên hệ thực tiễn', points: 0.5 }
      ]
    };
    setExam(prev => ({ ...prev, partIV: [...prev.partIV, newQ] }));
    setEditingQuestion({ part: 'partIV', data: newQ });
    showToast('Đã thêm câu hỏi tự luận vào Phần IV.');
  };

  // Delete Question Handlers
  const handleDeletePartI = (id: string) => {
    setExam(prev => ({ ...prev, partI: prev.partI.filter(q => q.id !== id) }));
    showToast('Đã xóa câu hỏi khỏi Phần I.');
  };

  const handleDeletePartII = (id: string) => {
    setExam(prev => ({ ...prev, partII: prev.partII.filter(q => q.id !== id) }));
    showToast('Đã xóa câu hỏi khỏi Phần II.');
  };

  const handleDeletePartIII = (id: string) => {
    setExam(prev => ({ ...prev, partIII: prev.partIII.filter(q => q.id !== id) }));
    showToast('Đã xóa câu hỏi khỏi Phần III.');
  };

  const handleDeletePartIV = (id: string) => {
    setExam(prev => ({ ...prev, partIV: prev.partIV.filter(q => q.id !== id) }));
    showToast('Đã xóa câu hỏi khỏi Phần IV.');
  };

  // Save Modal Changes
  const handleSaveModal = () => {
    if (!editingQuestion) return;

    if (editingQuestion.part === 'partI') {
      const q = editingQuestion.data;
      setExam(prev => ({
        ...prev,
        partI: prev.partI.map(item => item.id === q.id ? q : item)
      }));
    } else if (editingQuestion.part === 'partII') {
      const q = editingQuestion.data;
      setExam(prev => ({
        ...prev,
        partII: prev.partII.map(item => item.id === q.id ? q : item)
      }));
    } else if (editingQuestion.part === 'partIII') {
      const q = editingQuestion.data;
      setExam(prev => ({
        ...prev,
        partIII: prev.partIII.map(item => item.id === q.id ? q : item)
      }));
    } else if (editingQuestion.part === 'partIV') {
      const q = editingQuestion.data;
      setExam(prev => ({
        ...prev,
        partIV: prev.partIV.map(item => item.id === q.id ? q : item)
      }));
    }

    setEditingQuestion(null);
    showToast('Đã cập nhật câu hỏi thành công.');
  };

  return (
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6 space-y-3 overflow-hidden">
      {/* Top Banner & Control Bar */}
      <div className="bg-white p-3.5 md:p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0 no-print">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-metadata font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Công văn 7991/BGDĐT-GDTrH (17/12/2024)
            </span>
            <span className="text-metadata text-stone-500 font-medium hidden sm:inline">Cấu trúc 4 phần · Barem 10.0 điểm</span>
          </div>
          <h1 className="text-section md:text-page-title font-semibold text-stone-900 mt-1 leading-[1.3]">
            Đề kiểm tra Định kỳ Ngữ văn & Hướng dẫn Chấm
          </h1>
        </div>

        {/* View Switcher & Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-stone-100 p-1 rounded-xl border border-stone-200 flex text-metadata font-semibold">
            <button
              onClick={() => setViewMode('exam_paper')}
              className={`min-h-[36px] px-3 py-1 rounded-lg flex items-center gap-1.5 transition ${
                viewMode === 'exam_paper'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Đề thi</span>
            </button>
            <button
              onClick={() => setViewMode('marking_guide')}
              className={`min-h-[36px] px-3 py-1 rounded-lg flex items-center gap-1.5 transition ${
                viewMode === 'marking_guide'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Đáp án & Barem</span>
            </button>
          </div>

          {/* Export Dropdown (.docx primary & .doc legacy) */}
          <div className="relative">
            <button
              onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
              className="btn-primary min-h-[36px] px-3.5 py-1.5 bg-[#7C2D37] hover:bg-[#68232D] text-white rounded-xl text-metadata font-semibold flex items-center gap-1.5 shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Word (.docx)</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isExportDropdownOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-white border border-stone-200 rounded-xl shadow-lg py-1 z-50">
                <button
                  onClick={() => {
                    exportDocxExam(exam, khbd);
                    setIsExportDropdownOpen(false);
                    showToast('Đang tải file Word (.docx) chuẩn OpenXML...');
                  }}
                  className="w-full text-left px-3 py-2 text-body-ui text-stone-900 hover:bg-stone-50 flex items-center gap-2 font-medium"
                >
                  <FileText className="w-4 h-4 text-[#7C2D37]" />
                  <div>
                    <div>Xuất Word (.docx) — Khuyên dùng</div>
                    <div className="text-[11px] text-stone-500">Chuẩn OpenXML A4, bảng biểu rõ ràng</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    exportWordExam7991(exam, khbd);
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-body-ui text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-stone-400" />
                  <div>
                    <div>Xuất Word (.doc cũ)</div>
                    <div className="text-[11px] text-stone-500">Định dạng HTML Blob tương thích cũ</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => window.print()}
            className="btn-secondary min-h-[36px] px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 rounded-xl text-metadata font-semibold flex items-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">In A4</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Workspace */}
      <div className="flex-1 min-h-0 flex gap-4 overflow-hidden">
        {/* Left Column: 4 Parts Navigation & Matrix Summary */}
        <div className="w-64 xl:w-72 shrink-0 flex flex-col gap-3 overflow-hidden no-print">
          {/* Navigation Card */}
          <div className="card-surface p-3.5 flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between text-metadata font-semibold text-stone-700 pb-1 border-b border-stone-100">
              <span>Cấu trúc đề kiểm tra</span>
              <span className="px-2 py-0.5 rounded bg-stone-900 text-amber-300 font-bold tabular-nums">
                {grandTotal.toFixed(1)} / 10.0 đ
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => setSelectedPart('all')}
                className={`w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between text-metadata ${
                  selectedPart === 'all'
                    ? 'bg-stone-900 text-white border-stone-900 font-semibold shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <span>Tất cả các phần</span>
                <span className={`tabular-nums px-1.5 py-0.5 rounded text-xs ${
                  selectedPart === 'all' ? 'bg-stone-800 text-amber-300' : 'bg-stone-100 text-stone-600'
                }`}>
                  {grandTotal.toFixed(1)} đ
                </span>
              </button>

              <button
                onClick={() => setSelectedPart('partI')}
                className={`w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between text-metadata ${
                  selectedPart === 'partI'
                    ? 'bg-blue-50 border-blue-400 text-blue-950 font-semibold shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div>
                  <div className="font-medium">Phần I: TN Nhiều lựa chọn</div>
                  <div className="text-xs text-stone-500 tabular-nums">{exam.partI.length} câu (0.25 đ/câu)</div>
                </div>
                <span className="tabular-nums font-semibold text-blue-700">{totalPartIPoints.toFixed(1)} đ</span>
              </button>

              <button
                onClick={() => setSelectedPart('partII')}
                className={`w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between text-metadata ${
                  selectedPart === 'partII'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div>
                  <div className="font-medium flex items-center gap-1">
                    <span>Phần II: Đúng / Sai</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="text-xs text-stone-500 tabular-nums">{exam.partII.length} câu (4 lệnh a-b-c-d)</div>
                </div>
                <span className="tabular-nums font-semibold text-emerald-700">{totalPartIIPoints.toFixed(1)} đ</span>
              </button>

              <button
                onClick={() => setSelectedPart('partIII')}
                className={`w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between text-metadata ${
                  selectedPart === 'partIII'
                    ? 'bg-purple-50 border-purple-400 text-purple-950 font-semibold shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div>
                  <div className="font-medium">Phần III: Trả lời ngắn</div>
                  <div className="text-xs text-stone-500 tabular-nums">{exam.partIII.length} câu (0.5 đ/câu)</div>
                </div>
                <span className="tabular-nums font-semibold text-purple-700">{totalPartIIIPoints.toFixed(1)} đ</span>
              </button>

              <button
                onClick={() => setSelectedPart('partIV')}
                className={`w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between text-metadata ${
                  selectedPart === 'partIV'
                    ? 'bg-amber-50 border-amber-400 text-amber-950 font-semibold shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div>
                  <div className="font-medium">Phần IV: Tự luận</div>
                  <div className="text-xs text-stone-500 tabular-nums">{exam.partIV.length} câu nghị luận</div>
                </div>
                <span className="tabular-nums font-semibold text-amber-700">{totalPartIVPoints.toFixed(1)} đ</span>
              </button>
            </div>
          </div>

          {/* Part II Simulator */}
          <div className="card-surface p-3.5 flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto panel-scroll">
            <span className="text-metadata font-semibold text-stone-700">Mô phỏng chấm Phần II:</span>
            {exam.partII.map((q, qIdx) => {
              const currentScore = calculatePartIIScore(qIdx);
              const userAns = simulatedAnswers[q.id] || { a: false, b: false, c: false, d: false };

              return (
                <div key={q.id} className="p-2.5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-stone-800">{q.code || `Câu ${qIdx + 1}`}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold tabular-nums">
                      {currentScore.toFixed(2)} đ
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {(['a', 'b', 'c', 'd'] as const).map((key) => {
                      const isSimTrue = userAns[key];
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setSimulatedAnswers(prev => ({
                              ...prev,
                              [q.id]: {
                                ...userAns,
                                [key]: !isSimTrue
                              }
                            }));
                          }}
                          className={`p-1 rounded text-center font-semibold transition border ${
                            isSimTrue
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {key.toUpperCase()}: {isSimTrue ? 'Đ' : 'S'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Scrollable Exam Paper Document */}
        <div className="flex-1 min-h-0 overflow-y-auto panel-scroll pr-1">
          <div className="bg-white rounded-2xl border border-stone-300 p-8 md:p-12 shadow-md max-w-4xl mx-auto text-stone-900">
            {/* Exam Header */}
            <div className="grid grid-cols-2 gap-4 pb-6 border-b border-stone-300">
              <div className="text-center font-serif text-metadata">
                <p className="uppercase text-stone-700 tracking-normal">{khbd.info.department}</p>
                <p className="font-semibold uppercase text-stone-900 tracking-normal">{khbd.info.school}</p>
                <p className="font-semibold text-[#7C2D37] mt-1 tabular-nums">{exam.examHeader.examCode}</p>
              </div>
              <div className="text-center font-serif text-metadata">
                <p className="font-semibold uppercase text-stone-900 tracking-normal">{exam.examHeader.title}</p>
                <p className="font-semibold text-stone-800 font-serif">Môn: {khbd.info.subject} - {khbd.info.grade}</p>
                <p className="italic text-metadata text-stone-500 mt-1 tabular-nums">Thời gian làm bài: {exam.examHeader.duration}</p>
              </div>
            </div>

            {/* Reading Passage */}
            {exam.passageRef && (
              <div className="my-6 p-4 rounded-xl bg-[#FAF8F5] border-l-4 border-l-[#7C2D37] border border-stone-200 font-serif text-body-ui leading-[1.8] text-stone-900 whitespace-pre-line max-w-[760px]">
                <strong className="font-sans font-semibold text-stone-700 block mb-1 text-metadata">Ngữ liệu đọc hiểu:</strong>
                {exam.passageRef}
              </div>
            )}

            {/* ----------------- PHẦN I ----------------- */}
            {(selectedPart === 'all' || selectedPart === 'partI') && (
              <section className="mt-4 mb-8">
                <div className="bg-stone-100 p-3 rounded-xl border border-stone-200 mb-4 flex items-center justify-between">
                  <h2 className="font-semibold text-card-title text-stone-900 uppercase font-serif tracking-normal">
                    PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN ({totalPartIPoints.toFixed(1)} ĐIỂM)
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-metadata font-medium px-2.5 py-0.5 bg-blue-100 text-blue-900 rounded tabular-nums">
                      {exam.partI.length} câu
                    </span>
                    <button
                      onClick={handleAddPartI}
                      className="p-1 px-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 transition"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Thêm câu</span>
                    </button>
                  </div>
                </div>
                <p className="text-metadata italic text-stone-600 mb-4">
                  Thí sinh trả lời từ câu 1 đến câu {exam.partI.length}. Mỗi câu đúng được 0.25 điểm.
                </p>

                <div className="space-y-4">
                  {exam.partI.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-xl bg-stone-50/60 border border-stone-200 relative group">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-body-ui text-stone-900 font-medium">
                          <span className="font-semibold text-[#7C2D37] tabular-nums">{q.code || `Câu ${idx + 1}`}: </span>
                          {q.question}
                        </p>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-metadata font-medium px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                            {q.level === 'NB' ? 'Nhận biết' : 'Thông hiểu'}
                          </span>
                          <button
                            onClick={() => setEditingQuestion({ part: 'partI', data: { ...q } })}
                            className="p-1 text-stone-400 hover:text-stone-800 rounded hover:bg-stone-200 transition"
                            title="Sửa câu hỏi"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          {exam.partI.length > 1 && (
                            <button
                              onClick={() => handleDeletePartI(q.id)}
                              className="p-1 text-stone-400 hover:text-red-600 rounded hover:bg-red-50 transition"
                              title="Xóa câu hỏi"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-body-ui pt-1">
                        {(['A', 'B', 'C', 'D'] as const).map((key) => {
                          const isCorrectAnswer = q.correctAnswer === key;
                          const showKeyAnswer = viewMode === 'marking_guide';
                          return (
                            <div
                              key={key}
                              className={`p-2.5 min-h-[38px] rounded-lg border flex items-start gap-1.5 ${
                                showKeyAnswer && isCorrectAnswer
                                  ? 'bg-emerald-100 border-emerald-500 font-semibold text-emerald-900'
                                  : 'bg-white border-stone-200 text-stone-800'
                              }`}
                            >
                              <span className="font-semibold text-stone-500 tabular-nums">{key}.</span>
                              <span className="leading-snug">{q.options[key]}</span>
                            </div>
                          );
                        })}
                      </div>

                      {viewMode === 'marking_guide' && q.explanation && (
                        <div className="mt-2.5 pt-2 border-t border-stone-200 text-metadata text-stone-600 flex items-start gap-1.5">
                          <span className="font-semibold text-emerald-800">Giải thích đáp án:</span>
                          <span>{q.explanation}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ----------------- PHẦN II ----------------- */}
            {(selectedPart === 'all' || selectedPart === 'partII') && (
              <section className="mb-8">
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 mb-4 flex items-center justify-between">
                  <h2 className="font-semibold text-card-title text-emerald-950 uppercase font-serif tracking-normal">
                    PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG / SAI ({totalPartIIPoints.toFixed(1)} ĐIỂM)
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-metadata font-medium px-2.5 py-0.5 bg-emerald-200 text-emerald-900 rounded tabular-nums">
                      {exam.partII.length} câu
                    </span>
                    <button
                      onClick={handleAddPartII}
                      className="p-1 px-2 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1 transition"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Thêm câu</span>
                    </button>
                  </div>
                </div>
                <p className="text-metadata italic text-stone-600 mb-4">
                  Thí sinh trả lời từ câu 1 đến câu {exam.partII.length}. Trong mỗi ý a), b), c), d), chọn đúng hoặc sai. (1 ý: 0.1đ | 2 ý: 0.25đ | 3 ý: 0.5đ | 4 ý: 1.0đ)
                </p>

                <div className="space-y-6">
                  {exam.partII.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-xl bg-stone-50/60 border border-stone-200">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-body-ui text-stone-900 font-medium leading-relaxed font-serif">
                          <span className="font-semibold text-emerald-900 tabular-nums">{q.code || `Câu ${idx + 1}`}: </span>
                          {q.stem}
                        </p>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => setEditingQuestion({ part: 'partII', data: { ...q } })}
                            className="p-1 text-stone-400 hover:text-stone-800 rounded hover:bg-stone-200 transition"
                            title="Sửa câu hỏi"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          {exam.partII.length > 1 && (
                            <button
                              onClick={() => handleDeletePartII(q.id)}
                              className="p-1 text-stone-400 hover:text-red-600 rounded hover:bg-red-50 transition"
                              title="Xóa câu hỏi"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-body-ui border border-stone-300 rounded-lg overflow-hidden bg-white">
                          <thead>
                            <tr className="bg-stone-100/70 border-b border-stone-300 text-metadata text-stone-700">
                              <th className="py-2 px-3 text-center w-12">Lệnh</th>
                              <th className="py-2 px-3 text-left">Phát biểu khẳng định</th>
                              <th className="py-2 px-3 text-center w-20">Đúng</th>
                              <th className="py-2 px-3 text-center w-20">Sai</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-200">
                            {q.statements.map((st) => (
                              <tr key={st.subId} className="hover:bg-stone-50/50">
                                <td className="py-2.5 px-3 text-center font-bold text-stone-800 tabular-nums">{st.subId})</td>
                                <td className="py-2.5 px-3 text-stone-800 leading-snug">{st.text}</td>
                                <td className="py-2.5 px-3 text-center">
                                  {viewMode === 'marking_guide' && st.isCorrect && (
                                    <span className="font-bold text-emerald-600">✓ ĐÚNG</span>
                                  )}
                                </td>
                                <td className="py-2.5 px-3 text-center">
                                  {viewMode === 'marking_guide' && !st.isCorrect && (
                                    <span className="font-bold text-rose-600">✗ SAI</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ----------------- PHẦN III ----------------- */}
            {(selectedPart === 'all' || selectedPart === 'partIII') && (
              <section className="mb-8">
                <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 mb-4 flex items-center justify-between">
                  <h2 className="font-semibold text-card-title text-purple-950 uppercase font-serif tracking-normal">
                    PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN ({totalPartIIIPoints.toFixed(1)} ĐIỂM)
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-metadata font-medium px-2.5 py-0.5 bg-purple-200 text-purple-900 rounded tabular-nums">
                      {exam.partIII.length} câu
                    </span>
                    <button
                      onClick={handleAddPartIII}
                      className="p-1 px-2 text-xs font-semibold rounded-lg bg-purple-700 hover:bg-purple-800 text-white flex items-center gap-1 transition"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Thêm câu</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {exam.partIII.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-xl bg-purple-50/30 border border-purple-100">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-body-ui font-medium text-stone-900">
                          <span className="font-semibold text-purple-900 tabular-nums">{q.code || `Câu ${idx + 1}`}: </span>
                          {q.question}
                        </p>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-metadata font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-800 tabular-nums">
                            {q.points || 0.5} đ
                          </span>
                          <button
                            onClick={() => setEditingQuestion({ part: 'partIII', data: { ...q } })}
                            className="p-1 text-stone-400 hover:text-stone-800 rounded hover:bg-stone-200 transition"
                            title="Sửa câu hỏi"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          {exam.partIII.length > 1 && (
                            <button
                              onClick={() => handleDeletePartIII(q.id)}
                              className="p-1 text-stone-400 hover:text-red-600 rounded hover:bg-red-50 transition"
                              title="Xóa câu hỏi"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {viewMode === 'marking_guide' ? (
                        <div className="mt-2 p-2.5 bg-white rounded-lg border border-purple-200 text-metadata">
                          <div className="font-semibold text-purple-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-purple-600" />
                            <span>Đáp án chuẩn: <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-serif">{q.correctAnswer}</span></span>
                          </div>
                          {q.explanation && <p className="text-stone-600 mt-1 leading-relaxed">{q.explanation}</p>}
                        </div>
                      ) : (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-metadata text-stone-500 font-medium">Trả lời:</span>
                          <input
                            type="text"
                            placeholder="Ghi câu trả lời ngắn..."
                            className="min-h-[38px] px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-body-ui w-64 font-serif"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ----------------- PHẦN IV ----------------- */}
            {(selectedPart === 'all' || selectedPart === 'partIV') && (
              <section className="mb-6">
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 mb-4 flex items-center justify-between">
                  <h2 className="font-semibold text-card-title text-amber-950 uppercase font-serif tracking-normal">
                    PHẦN IV. TỰ LUẬN NGHỊ LUẬN VĂN HỌC ({totalPartIVPoints.toFixed(1)} ĐIỂM)
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-metadata font-medium px-2.5 py-0.5 bg-amber-200 text-amber-900 rounded tabular-nums">
                      {exam.partIV.length} câu
                    </span>
                    <button
                      onClick={handleAddPartIV}
                      className="p-1 px-2 text-xs font-semibold rounded-lg bg-amber-700 hover:bg-amber-800 text-white flex items-center gap-1 transition"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Thêm câu</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {exam.partIV.map((q, idx) => (
                    <div key={q.id} className="p-5 rounded-2xl bg-amber-50/30 border border-amber-200">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-body-ui font-medium text-stone-900 leading-[1.8] font-serif">
                          <span className="font-semibold text-amber-900 tabular-nums">{q.code || `Câu ${idx + 1}`}: </span>
                          {q.question}
                        </p>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => setEditingQuestion({ part: 'partIV', data: { ...q } })}
                            className="p-1 text-stone-400 hover:text-stone-800 rounded hover:bg-stone-200 transition"
                            title="Sửa câu hỏi"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          {exam.partIV.length > 1 && (
                            <button
                              onClick={() => handleDeletePartIV(q.id)}
                              className="p-1 text-stone-400 hover:text-red-600 rounded hover:bg-red-50 transition"
                              title="Xóa câu hỏi"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {viewMode === 'marking_guide' && (
                        <div className="mt-4 pt-3 border-t border-amber-200">
                          <h4 className="text-metadata font-semibold text-amber-900 uppercase mb-2 tracking-normal">
                            Hướng dẫn chấm & Barem điểm chi tiết:
                          </h4>
                          <table className="w-full text-metadata border border-stone-300 rounded-lg overflow-hidden bg-white">
                            <thead>
                              <tr className="bg-amber-100/60 font-semibold border-b border-stone-300">
                                <th className="py-2 px-3 text-left w-4/5">Tiêu chí phân tích</th>
                                <th className="py-2 px-3 text-center w-1/5">Điểm</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-200">
                              {q.rubric.map((r, rIdx) => (
                                <tr key={rIdx}>
                                  <td className="py-2 px-3 text-stone-800 leading-relaxed font-serif text-body-ui">{r.step}</td>
                                  <td className="py-2 px-3 text-center font-semibold text-amber-800 tabular-nums">{r.points} đ</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Footer */}
            <div className="text-center pt-8 border-t border-stone-200">
              <p className="font-semibold text-stone-800 text-body-ui">---------- HẾT ----------</p>
              <p className="text-metadata italic text-stone-500 mt-1">Cán bộ coi thi không giải thích gì thêm.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Question Edit Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 shrink-0">
              <h3 className="text-card-title text-stone-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#7C2D37]" />
                <span>
                  Chỉnh sửa câu hỏi — {
                    editingQuestion.part === 'partI' ? 'Phần I (Nhiều lựa chọn)' :
                    editingQuestion.part === 'partII' ? 'Phần II (Đúng / Sai)' :
                    editingQuestion.part === 'partIII' ? 'Phần III (Trả lời ngắn)' :
                    'Phần IV (Tự luận)'
                  }
                </span>
              </h3>
              <button
                onClick={() => setEditingQuestion(null)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto space-y-4 panel-scroll pr-1 text-meta">
              {/* Part I Edit Form */}
              {editingQuestion.part === 'partI' && (
                <>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Mã câu hỏi & Tiêu đề</label>
                    <div className="grid grid-cols-4 gap-2">
                      <input
                        type="text"
                        value={editingQuestion.data.code}
                        onChange={(e) => setEditingQuestion({
                          ...editingQuestion,
                          data: { ...editingQuestion.data, code: e.target.value }
                        })}
                        placeholder="Câu 1"
                        className="px-3 py-1.5 border border-stone-300 rounded-lg text-body-ui"
                      />
                      <select
                        value={editingQuestion.data.level}
                        onChange={(e) => setEditingQuestion({
                          ...editingQuestion,
                          data: { ...editingQuestion.data, level: e.target.value as 'NB' | 'TH' }
                        })}
                        className="col-span-2 px-3 py-1.5 border border-stone-300 rounded-lg text-body-ui"
                      >
                        <option value="NB">Mức độ: Nhận biết (NB)</option>
                        <option value="TH">Mức độ: Thông hiểu (TH)</option>
                      </select>
                      <input
                        type="number"
                        step="0.05"
                        value={editingQuestion.data.points}
                        onChange={(e) => setEditingQuestion({
                          ...editingQuestion,
                          data: { ...editingQuestion.data, points: parseFloat(e.target.value) || 0.25 }
                        })}
                        placeholder="Điểm"
                        className="px-3 py-1.5 border border-stone-300 rounded-lg text-body-ui"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Nội dung câu hỏi</label>
                    <textarea
                      rows={3}
                      value={editingQuestion.data.question}
                      onChange={(e) => setEditingQuestion({
                        ...editingQuestion,
                        data: { ...editingQuestion.data, question: normalizeVietnamese(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-body-ui font-serif"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-medium text-stone-700">Các phương án trả lời & Chọn đáp án đúng</label>
                    {(['A', 'B', 'C', 'D'] as const).map(optKey => (
                      <div key={optKey} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={editingQuestion.data.correctAnswer === optKey}
                          onChange={() => setEditingQuestion({
                            ...editingQuestion,
                            data: { ...editingQuestion.data, correctAnswer: optKey }
                          })}
                          className="accent-[#7C2D37] w-4 h-4 shrink-0"
                        />
                        <span className="font-bold text-stone-700 w-4">{optKey}.</span>
                        <input
                          type="text"
                          value={editingQuestion.data.options[optKey]}
                          onChange={(e) => setEditingQuestion({
                            ...editingQuestion,
                            data: {
                              ...editingQuestion.data,
                              options: {
                                ...editingQuestion.data.options,
                                [optKey]: normalizeVietnamese(e.target.value)
                              }
                            }
                          })}
                          className="flex-1 px-3 py-1.5 border border-stone-300 rounded-lg text-body-ui"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Giải thích đáp án</label>
                    <textarea
                      rows={2}
                      value={editingQuestion.data.explanation || ''}
                      onChange={(e) => setEditingQuestion({
                        ...editingQuestion,
                        data: { ...editingQuestion.data, explanation: normalizeVietnamese(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-body-ui"
                    />
                  </div>
                </>
              )}

              {/* Part II Edit Form */}
              {editingQuestion.part === 'partII' && (
                <>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Mã câu hỏi</label>
                    <input
                      type="text"
                      value={editingQuestion.data.code}
                      onChange={(e) => setEditingQuestion({
                        ...editingQuestion,
                        data: { ...editingQuestion.data, code: e.target.value }
                      })}
                      className="w-32 px-3 py-1.5 border border-stone-300 rounded-lg text-body-ui"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Lời dẫn câu hỏi</label>
                    <textarea
                      rows={3}
                      value={editingQuestion.data.stem}
                      onChange={(e) => setEditingQuestion({
                        ...editingQuestion,
                        data: { ...editingQuestion.data, stem: normalizeVietnamese(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-body-ui font-serif"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block font-medium text-stone-700">4 lệnh khẳng định a), b), c), d) và đáp án</label>
                    {editingQuestion.data.statements.map((st, sIdx) => (
                      <div key={st.subId} className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 border border-stone-200">
                        <span className="font-bold text-stone-800 w-6 text-center">{st.subId})</span>
                        <input
                          type="text"
                          value={st.text}
                          onChange={(e) => {
                            const newStmts = [...editingQuestion.data.statements];
                            newStmts[sIdx] = { ...st, text: normalizeVietnamese(e.target.value) };
                            setEditingQuestion({
                              ...editingQuestion,
                              data: { ...editingQuestion.data, statements: newStmts as any }
                            });
                          }}
                          className="flex-1 px-3 py-1.5 border border-stone-300 rounded-lg text-body-ui bg-white"
                        />
                        <select
                          value={st.isCorrect ? 'true' : 'false'}
                          onChange={(e) => {
                            const newStmts = [...editingQuestion.data.statements];
                            newStmts[sIdx] = { ...st, isCorrect: e.target.value === 'true' };
                            setEditingQuestion({
                              ...editingQuestion,
                              data: { ...editingQuestion.data, statements: newStmts as any }
                            });
                          }}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                            st.isCorrect ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-rose-50 text-rose-800 border-rose-300'
                          }`}
                        >
                          <option value="true">ĐÚNG</option>
                          <option value="false">SAI</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Part III Edit Form */}
              {editingQuestion.part === 'partIII' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Mã câu</label>
                      <input
                        type="text"
                        value={editingQuestion.data.code}
                        onChange={(e) => setEditingQuestion({
                          ...editingQuestion,
                          data: { ...editingQuestion.data, code: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-body-ui"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Điểm số</label>
                      <input
                        type="number"
                        step="0.25"
                        value={editingQuestion.data.points}
                        onChange={(e) => setEditingQuestion({
                          ...editingQuestion,
                          data: { ...editingQuestion.data, points: parseFloat(e.target.value) || 0.5 }
                        })}
                        className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-body-ui"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Nội dung câu hỏi</label>
                    <textarea
                      rows={3}
                      value={editingQuestion.data.question}
                      onChange={(e) => setEditingQuestion({
                        ...editingQuestion,
                        data: { ...editingQuestion.data, question: normalizeVietnamese(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-body-ui font-serif"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Đáp án chuẩn</label>
                    <input
                      type="text"
                      value={editingQuestion.data.correctAnswer}
                      onChange={(e) => setEditingQuestion({
                        ...editingQuestion,
                        data: { ...editingQuestion.data, correctAnswer: normalizeVietnamese(e.target.value) }
                      })}
                      className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-body-ui font-serif"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Hướng dẫn chấm</label>
                    <textarea
                      rows={2}
                      value={editingQuestion.data.explanation || ''}
                      onChange={(e) => setEditingQuestion({
                        ...editingQuestion,
                        data: { ...editingQuestion.data, explanation: normalizeVietnamese(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-body-ui"
                    />
                  </div>
                </>
              )}

              {/* Part IV Edit Form */}
              {editingQuestion.part === 'partIV' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Mã câu</label>
                      <input
                        type="text"
                        value={editingQuestion.data.code}
                        onChange={(e) => setEditingQuestion({
                          ...editingQuestion,
                          data: { ...editingQuestion.data, code: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-body-ui"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Điểm số</label>
                      <input
                        type="number"
                        step="0.5"
                        value={editingQuestion.data.points}
                        onChange={(e) => setEditingQuestion({
                          ...editingQuestion,
                          data: { ...editingQuestion.data, points: parseFloat(e.target.value) || 3.0 }
                        })}
                        className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-body-ui"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Đề bài tự luận</label>
                    <textarea
                      rows={4}
                      value={editingQuestion.data.question}
                      onChange={(e) => setEditingQuestion({
                        ...editingQuestion,
                        data: { ...editingQuestion.data, question: normalizeVietnamese(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-body-ui font-serif"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-medium text-stone-700">Các bước chấm Rubric</label>
                    {editingQuestion.data.rubric.map((r, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={r.step}
                          onChange={(e) => {
                            const newRub = [...editingQuestion.data.rubric];
                            newRub[rIdx] = { ...r, step: normalizeVietnamese(e.target.value) };
                            setEditingQuestion({
                              ...editingQuestion,
                              data: { ...editingQuestion.data, rubric: newRub }
                            });
                          }}
                          className="flex-1 px-3 py-1.5 border border-stone-300 rounded-lg text-body-ui"
                        />
                        <input
                          type="number"
                          step="0.25"
                          value={r.points}
                          onChange={(e) => {
                            const newRub = [...editingQuestion.data.rubric];
                            newRub[rIdx] = { ...r, points: parseFloat(e.target.value) || 0 };
                            setEditingQuestion({
                              ...editingQuestion,
                              data: { ...editingQuestion.data, rubric: newRub }
                            });
                          }}
                          className="w-20 px-2 py-1.5 border border-stone-300 rounded-lg text-body-ui text-center"
                        />
                        <span className="text-xs text-stone-500">đ</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-end gap-2 shrink-0">
              <button
                onClick={() => setEditingQuestion(null)}
                className="btn-secondary"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveModal}
                className="btn-primary"
              >
                <Save className="w-4 h-4 mr-1.5" />
                <span>Lưu thay đổi</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
