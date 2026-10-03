import React, { useState } from 'react';
import { 
  CheckSquare, 
  Download, 
  Printer, 
  Award, 
  Calculator, 
  FileText, 
  Info, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Exam7991Data, LessonPlan5512 } from '../types';
import { exportWordExam7991 } from '../utils/exportUtils';

interface Exam7991ViewProps {
  exam: Exam7991Data;
  setExam: React.Dispatch<React.SetStateAction<Exam7991Data>>;
  khbd: LessonPlan5512;
}

export const Exam7991View: React.FC<Exam7991ViewProps> = ({ exam, setExam, khbd }) => {
  const [viewMode, setViewMode] = useState<'exam_paper' | 'marking_guide'>('exam_paper');
  const [selectedPart, setSelectedPart] = useState<'all' | 'partI' | 'partII' | 'partIII' | 'partIV'>('all');

  // Simulated answers state for Part II scoring simulator
  const [simulatedAnswers, setSimulatedAnswers] = useState<{
    [qId: string]: { a: boolean; b: boolean; c: boolean; d: boolean };
  }>({
    'lp2-1': { a: true, b: false, c: false, d: true },
    'lp2-2': { a: false, b: true, c: false, d: true }
  });

  const calculatePartIIScore = (qIndex: number) => {
    const q = exam.partII[qIndex];
    if (!q) return 0;
    const userAns = simulatedAnswers[q.id] || { a: false, b: false, c: false, d: false };
    
    let correctCount = 0;
    if (userAns.a === q.statements[0].isCorrect) correctCount++;
    if (userAns.b === q.statements[1].isCorrect) correctCount++;
    if (userAns.c === q.statements[2].isCorrect) correctCount++;
    if (userAns.d === q.statements[3].isCorrect) correctCount++;

    if (correctCount === 1) return 0.1;
    if (correctCount === 2) return 0.25;
    if (correctCount === 3) return 0.5;
    if (correctCount === 4) return 1.0;
    return 0.0;
  };

  const totalPartIPoints = exam.partI.reduce((sum, q) => sum + q.points, 0);
  const totalPartIIPoints = exam.partII.reduce((sum, q) => sum + q.points, 0);
  const totalPartIIIPoints = exam.partIII.reduce((sum, q) => sum + q.points, 0);
  const totalPartIVPoints = exam.partIV.reduce((sum, q) => sum + q.points, 0);
  const grandTotal = totalPartIPoints + totalPartIIPoints + totalPartIIIPoints + totalPartIVPoints;

  return (
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6 space-y-3 overflow-hidden">
      {/* Top Banner & Control Bar (shrink-0) */}
      <div className="bg-white p-3.5 md:p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
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

          <button
            onClick={() => exportWordExam7991(exam, khbd)}
            className="btn-primary min-h-[36px] px-3 py-1.5 bg-[#7C2D37] hover:bg-[#68232D] text-white rounded-xl text-metadata font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Xuất Word (.doc)</span>
          </button>
          <button
            onClick={() => window.print()}
            className="btn-secondary min-h-[36px] px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 rounded-xl text-metadata font-semibold flex items-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">In A4</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Workspace (Rule 29.15) */}
      <div className="flex-1 min-h-0 flex gap-4 overflow-hidden">
        {/* Left Column: 4 Parts Navigation & Matrix Summary (260-280px, shrink-0) */}
        <div className="w-64 xl:w-72 shrink-0 flex flex-col gap-3 overflow-hidden">
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
                  10.0 đ
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

          {/* Matrix Ratio Card & Part II Scoring Info (Scrollable if needed) */}
          <div className="flex-1 min-h-0 overflow-y-auto panel-scroll space-y-3 pr-0.5">
            {/* Matrix 40-30-30 breakdown */}
            <div className="card-surface p-3.5 space-y-2">
              <span className="text-metadata font-semibold text-stone-800 block">
                Ma trận đề chuẩn (CV 7991)
              </span>
              <div className="space-y-1.5 text-metadata">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Nhận biết (40%)</span>
                  <span className="font-semibold text-blue-700 tabular-nums">4.0 đ</span>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '40%' }}></div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-stone-600">Thông hiểu (30%)</span>
                  <span className="font-semibold text-emerald-700 tabular-nums">3.0 đ</span>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '30%' }}></div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-stone-600">Vận dụng (30%)</span>
                  <span className="font-semibold text-amber-700 tabular-nums">3.0 đ</span>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>

            {/* Part II scoring rules recap */}
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-metadata text-stone-700 space-y-1">
              <span className="font-semibold text-emerald-950 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                Quy tắc tính điểm Phần II:
              </span>
              <div className="text-xs leading-relaxed text-stone-600 pt-0.5 space-y-0.5 tabular-nums">
                <div>• Đúng 1 ý: <strong>0.10 đ</strong></div>
                <div>• Đúng 2 ý: <strong>0.25 đ</strong></div>
                <div>• Đúng 3 ý: <strong>0.50 đ</strong></div>
                <div>• Đúng cả 4 ý: <strong>1.00 đ</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Scrollable Exam Paper Document (Rule 29.15) */}
        <div className="flex-1 min-h-0 overflow-y-auto panel-scroll pr-1">

      {/* Main Exam Document */}
      <div className="bg-white rounded-2xl border border-stone-300 p-8 md:p-14 shadow-md max-w-4xl mx-auto text-stone-900">
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

        {/* Ngữ liệu đề thi */}
        {exam.passageRef && (
          <div className="my-6 p-4 rounded-xl bg-[#FAF8F5] border-l-4 border-l-[#7C2D37] border border-stone-200 font-serif text-body-ui leading-[1.8] text-stone-900 whitespace-pre-line max-w-[760px]">
            <strong className="font-sans font-semibold text-stone-700 block mb-1 text-metadata">Ngữ liệu đọc hiểu:</strong>
            {exam.passageRef}
          </div>
        )}

        {/* Selected Part Filter Indicator when not showing all */}
        {selectedPart !== 'all' && (
          <div className="mb-4 p-2.5 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-between text-metadata">
            <span className="text-stone-600 font-medium">
              Chế độ hiển thị: <strong className="text-stone-900">{
                selectedPart === 'partI' ? 'Phần I (Trắc nghiệm nhiều lựa chọn)' :
                selectedPart === 'partII' ? 'Phần II (Trắc nghiệm Đúng / Sai)' :
                selectedPart === 'partIII' ? 'Phần III (Trắc nghiệm trả lời ngắn)' :
                'Phần IV (Tự luận nghị luận)'
              }</strong>
            </span>
            <button
              onClick={() => setSelectedPart('all')}
              className="text-[#7C2D37] hover:underline font-semibold"
            >
              ← Xem toàn bộ đề thi
            </button>
          </div>
        )}

        {/* ----------------- PHẦN I ----------------- */}
        {(selectedPart === 'all' || selectedPart === 'partI') && (
          <section className="mt-4 mb-8">
            <div className="bg-stone-100 p-3 rounded-xl border border-stone-200 mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-card-title text-stone-900 uppercase font-serif tracking-normal">
                PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3.0 ĐIỂM)
              </h2>
              <span className="text-metadata font-medium px-2.5 py-0.5 bg-blue-100 text-blue-900 rounded tabular-nums">
                12 câu · 0.25 đ
              </span>
            </div>
            <p className="text-metadata italic text-stone-600 mb-4">
              Thí sinh trả lời từ câu 1 đến câu 12. Mỗi câu đúng được 0.25 điểm.
            </p>

            <div className="space-y-4">
              {exam.partI.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-xl bg-stone-50/60 border border-stone-200">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-body-ui text-stone-900 font-medium">
                      <span className="font-semibold text-[#7C2D37] tabular-nums">{q.code || `Câu ${idx + 1}`}: </span>
                      {q.question}
                    </p>
                    <span className="text-metadata font-medium px-2 py-0.5 rounded bg-stone-200 text-stone-700 shrink-0">
                      {q.level === 'NB' ? 'Nhận biết' : 'Thông hiểu'}
                    </span>
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
                          <span className="font-semibold">{key}.</span>
                          <span>{q.options[key]}</span>
                        </div>
                      );
                    })}
                  </div>

                  {viewMode === 'marking_guide' && (
                    <div className="mt-2.5 pt-2 border-t border-stone-200 text-metadata text-stone-600 flex items-start gap-1.5 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong className="text-emerald-800 font-semibold">Đáp án {q.correctAnswer}:</strong> {q.explanation}</span>
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
              <h2 className="font-semibold text-card-title text-emerald-950 uppercase font-serif tracking-normal flex items-center gap-2">
                <span>PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG / SAI (2.0 ĐIỂM)</span>
                <span className="text-metadata px-2 py-0.5 bg-emerald-700 text-white rounded-full">CV 7991 ĐẶC TRƯNG</span>
              </h2>
              <span className="text-metadata font-medium px-2.5 py-0.5 bg-emerald-200 text-emerald-900 rounded tabular-nums">
                2 câu · 1.0 đ
              </span>
            </div>

            <div className="space-y-6">
              {exam.partII.map((q, qIdx) => (
                <div key={q.id} className="p-5 rounded-2xl bg-white border-2 border-emerald-100 shadow-xs">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <p className="text-body-ui font-medium text-stone-900">
                      <span className="font-semibold text-emerald-900 tabular-nums">{q.code || `Câu ${qIdx + 1}`}: </span>
                      {q.stem}
                    </p>
                    <span className="text-metadata font-medium px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0 tabular-nums">
                      1.0 điểm
                    </span>
                  </div>

                  {/* 4 statements table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-metadata border border-stone-200 rounded-xl overflow-hidden">
                      <thead>
                        <tr className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
                          <th className="py-2.5 px-3 text-center w-12 border-r border-stone-200">Ý</th>
                          <th className="py-2.5 px-4 text-left">Phát biểu khẳng định (4 lệnh chuẩn a-b-c-d)</th>
                          <th className="py-2.5 px-3 text-center w-24 border-l border-stone-200">
                            {viewMode === 'marking_guide' ? 'Đáp án' : 'Chọn'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {q.statements.map((st) => (
                          <tr key={st.subId} className="hover:bg-stone-50/50 transition">
                            <td className="py-2.5 px-3 text-center font-semibold text-emerald-900 border-r border-stone-200 bg-stone-50/50">
                              {st.subId})
                            </td>
                            <td className="py-2.5 px-4 text-stone-800 leading-relaxed font-serif text-body-ui">
                              <div>{st.text}</div>
                              {viewMode === 'marking_guide' && (
                                <div className="text-metadata text-stone-500 italic mt-1 font-sans">
                                  Giải thích: {st.explanation}
                                </div>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-center border-l border-stone-200">
                              {viewMode === 'marking_guide' ? (
                                <span className={`px-2.5 py-1 rounded-md font-semibold text-metadata inline-block ${
                                  st.isCorrect
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : 'bg-red-100 text-red-800 border border-red-300'
                                }`}>
                                  {st.isCorrect ? 'ĐÚNG' : 'SAI'}
                                </span>
                              ) : (
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    onClick={() => {
                                      setSimulatedAnswers({
                                        ...simulatedAnswers,
                                        [q.id]: { ...simulatedAnswers[q.id], [st.subId]: true }
                                      });
                                    }}
                                    className={`min-h-[32px] min-w-[32px] px-2 py-1 rounded text-metadata font-semibold transition ${
                                      simulatedAnswers[q.id]?.[st.subId] === true
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                    }`}
                                  >
                                    Đ
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSimulatedAnswers({
                                        ...simulatedAnswers,
                                        [q.id]: { ...simulatedAnswers[q.id], [st.subId]: false }
                                      });
                                    }}
                                    className={`min-h-[32px] min-w-[32px] px-2 py-1 rounded text-metadata font-semibold transition ${
                                      simulatedAnswers[q.id]?.[st.subId] === false
                                        ? 'bg-red-600 text-white'
                                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                    }`}
                                  >
                                    S
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Live Scoring Calculator for this Part II question */}
                  {viewMode === 'exam_paper' && (
                    <div className="mt-3 p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-metadata">
                      <span className="text-stone-600 flex items-center gap-1.5 font-medium">
                        <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                        Mô phỏng chấm CV 7991:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-stone-500">Điểm đạt:</span>
                        <span className="font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded tabular-nums">
                          +{calculatePartIIScore(qIdx)} / 1.00 đ
                        </span>
                      </div>
                    </div>
                  )}
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
                PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (2.0 ĐIỂM)
              </h2>
              <span className="text-metadata font-medium px-2.5 py-0.5 bg-purple-200 text-purple-900 rounded tabular-nums">
                4 câu · 0.5 đ
              </span>
            </div>

            <div className="space-y-4">
              {exam.partIII.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-xl bg-purple-50/30 border border-purple-100">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-body-ui font-medium text-stone-900">
                      <span className="font-semibold text-purple-900 tabular-nums">{q.code || `Câu ${idx + 1}`}: </span>
                      {q.question}
                    </p>
                    <span className="text-metadata font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-800 tabular-nums">
                      0.5 đ
                    </span>
                  </div>

                  {viewMode === 'marking_guide' ? (
                    <div className="mt-2 p-2.5 bg-white rounded-lg border border-purple-200 text-metadata">
                      <div className="font-semibold text-purple-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-600" />
                        <span>Đáp án chuẩn: <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-serif">{q.correctAnswer}</span></span>
                      </div>
                      <p className="text-stone-600 mt-1 leading-relaxed">{q.explanation}</p>
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
                PHẦN IV. TỰ LUẬN NGHỊ LUẬN VĂN HỌC (3.0 ĐIỂM)
              </h2>
              <span className="text-metadata font-medium px-2.5 py-0.5 bg-amber-200 text-amber-900 rounded tabular-nums">
                1 câu · 3.0 đ
              </span>
            </div>

            <div className="space-y-4">
              {exam.partIV.map((q, idx) => (
                <div key={q.id} className="p-5 rounded-2xl bg-amber-50/30 border border-amber-200">
                  <p className="text-body-ui font-medium text-stone-900 leading-[1.8] font-serif">
                    <span className="font-semibold text-amber-900 tabular-nums">{q.code || `Câu ${idx + 1}`}: </span>
                    {q.question}
                  </p>

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
</div>
  );
};
