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
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Công văn 7991/BGDĐT-GDTrH (17/12/2024)
            </span>
            <span className="text-xs text-stone-500 font-medium">Cấu trúc 4 phần · Barem 10.0 điểm</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-stone-900 mt-1">
            Đề kiểm tra Định kỳ Ngữ văn & Hướng dẫn Chấm
          </h1>
          <p className="text-sm text-stone-600">
            Tuân thủ tuyệt đối quy định mới nhất của Bộ GD&ĐT: Tỉ lệ 40% Nhận biết - 30% Thông hiểu - 30% Vận dụng.
          </p>
        </div>

        {/* View Switcher & Action buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <div className="bg-stone-100 p-1 rounded-xl border border-stone-200 flex text-xs font-semibold">
            <button
              onClick={() => setViewMode('exam_paper')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                viewMode === 'exam_paper'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Đề thi chính thức</span>
            </button>
            <button
              onClick={() => setViewMode('marking_guide')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                viewMode === 'marking_guide'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Đáp án & Barem chấm</span>
            </button>
          </div>

          <button
            onClick={() => exportWordExam7991(exam, khbd)}
            className="px-3.5 py-2 bg-[#7C2D37] hover:bg-[#68232D] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Word (.doc)</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Printer className="w-4 h-4" />
            <span>In A4</span>
          </button>
        </div>
      </div>

      {/* 4-Part Structure & Points Tracker Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="text-[11px] font-bold text-stone-500 uppercase">Phần I: TN Nhiều lựa chọn</div>
          <div className="text-lg font-bold text-blue-600 mt-0.5">{totalPartIPoints.toFixed(1)} đ</div>
          <div className="text-[11px] text-stone-500">{exam.partI.length} câu (0.25 đ/câu)</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-emerald-300 bg-emerald-50/30 shadow-xs">
          <div className="text-[11px] font-bold text-emerald-800 uppercase flex items-center gap-1">
            <span>Phần II: Đúng / Sai</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <div className="text-lg font-bold text-emerald-700 mt-0.5">{totalPartIIPoints.toFixed(1)} đ</div>
          <div className="text-[11px] text-emerald-900">{exam.partII.length} câu (4 lệnh a-b-c-d)</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="text-[11px] font-bold text-stone-500 uppercase">Phần III: Trả lời ngắn</div>
          <div className="text-lg font-bold text-purple-600 mt-0.5">{totalPartIIIPoints.toFixed(1)} đ</div>
          <div className="text-[11px] text-stone-500">{exam.partIII.length} câu (0.5 đ/câu)</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="text-[11px] font-bold text-stone-500 uppercase">Phần IV: Tự luận</div>
          <div className="text-lg font-bold text-amber-600 mt-0.5">{totalPartIVPoints.toFixed(1)} đ</div>
          <div className="text-[11px] text-stone-500">{exam.partIV.length} câu nghị luận văn học</div>
        </div>

        <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-stone-900 text-white shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-bold text-stone-400 uppercase">Tổng điểm toàn đề</div>
          <div className="text-xl font-black text-amber-400">{grandTotal.toFixed(1)} / 10.0</div>
          <div className="text-[10px] text-stone-300">Ma trận chuẩn 40-30-30</div>
        </div>
      </div>

      {/* Part II Focus Explanatory Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200 text-xs text-stone-800 flex items-start gap-3 shadow-xs">
        <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-emerald-950 text-sm">
            Quy tắc chấm Phần II (Trắc nghiệm Đúng/Sai 4 lệnh) theo Công văn 7991:
          </span>
          <p className="mt-1 text-stone-700 leading-relaxed">
            Mỗi câu có 4 ý a), b), c), d). Thí sinh chọn Đúng hoặc Sai. 
            <strong> Đúng 1 ý: 0.10 đ</strong>; 
            <strong> Đúng 2 ý: 0.25 đ</strong>; 
            <strong> Đúng 3 ý: 0.50 đ</strong>; 
            <strong> Đúng cả 4 ý: 1.00 đ</strong>.
          </p>
        </div>
      </div>

      {/* Main Exam Document */}
      <div className="bg-white rounded-2xl border border-stone-300 p-8 md:p-14 shadow-md max-w-4xl mx-auto text-stone-900">
        {/* Exam Header */}
        <div className="grid grid-cols-2 gap-4 pb-6 border-b border-stone-300">
          <div className="text-center font-serif text-sm">
            <p className="uppercase text-stone-700">{khbd.info.department}</p>
            <p className="font-bold uppercase text-stone-900">{khbd.info.school}</p>
            <p className="font-bold text-[#7C2D37] mt-1">{exam.examHeader.examCode}</p>
          </div>
          <div className="text-center font-serif text-sm">
            <p className="font-bold uppercase text-stone-900">{exam.examHeader.title}</p>
            <p className="font-semibold text-stone-800 font-serif">Môn: {khbd.info.subject} - {khbd.info.grade}</p>
            <p className="italic text-xs text-stone-500 mt-1">Thời gian làm bài: {exam.examHeader.duration}</p>
          </div>
        </div>

        {/* Ngữ liệu đề thi */}
        {exam.passageRef && (
          <div className="my-6 p-4 rounded-xl bg-[#FAF8F5] border-l-4 border-l-[#7C2D37] border border-stone-200 font-serif text-xs leading-relaxed text-stone-900 whitespace-pre-line">
            <strong className="font-sans font-bold text-stone-700 block mb-1">NGỮ LIỆU ĐỌC HIỂU:</strong>
            {exam.passageRef}
          </div>
        )}

        {/* ----------------- PHẦN I ----------------- */}
        <section className="mt-6 mb-10">
          <div className="bg-stone-100 p-3 rounded-xl border border-stone-200 mb-4 flex items-center justify-between">
            <h2 className="font-bold text-sm md:text-base text-stone-900 uppercase font-serif">
              PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3.0 ĐIỂM)
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-900 rounded font-mono">
              12 câu · 0.25 đ
            </span>
          </div>
          <p className="text-xs italic text-stone-600 mb-4">
            Thí sinh trả lời từ câu 1 đến câu 12. Mỗi câu đúng được 0.25 điểm.
          </p>

          <div className="space-y-4">
            {exam.partI.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl bg-stone-50/60 border border-stone-200">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm text-stone-900 font-medium">
                    <span className="font-bold text-[#7C2D37]">{q.code || `Câu ${idx + 1}`}: </span>
                    {q.question}
                  </p>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-stone-200 text-stone-700 shrink-0">
                    {q.level === 'NB' ? 'Nhận biết' : 'Thông hiểu'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs pt-1">
                  {(['A', 'B', 'C', 'D'] as const).map((key) => {
                    const isCorrectAnswer = q.correctAnswer === key;
                    const showKeyAnswer = viewMode === 'marking_guide';
                    return (
                      <div
                        key={key}
                        className={`p-2 rounded-lg border flex items-start gap-1.5 ${
                          showKeyAnswer && isCorrectAnswer
                            ? 'bg-emerald-100 border-emerald-500 font-bold text-emerald-900'
                            : 'bg-white border-stone-200 text-stone-800'
                        }`}
                      >
                        <span className="font-bold">{key}.</span>
                        <span>{q.options[key]}</span>
                      </div>
                    );
                  })}
                </div>

                {viewMode === 'marking_guide' && (
                  <div className="mt-2.5 pt-2 border-t border-stone-200 text-xs text-stone-600 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-emerald-800">Đáp án {q.correctAnswer}:</strong> {q.explanation}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ----------------- PHẦN II ----------------- */}
        <section className="mb-10">
          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 mb-4 flex items-center justify-between">
            <h2 className="font-bold text-sm md:text-base text-emerald-950 uppercase font-serif flex items-center gap-2">
              <span>PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG / SAI (2.0 ĐIỂM)</span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-700 text-white rounded-full">CV 7991 ĐẶC TRƯNG</span>
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded font-mono">
              2 câu · 1.0 đ
            </span>
          </div>

          <div className="space-y-6">
            {exam.partII.map((q, qIdx) => (
              <div key={q.id} className="p-5 rounded-2xl bg-white border-2 border-emerald-100 shadow-xs">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <p className="text-sm font-medium text-stone-900">
                    <span className="font-bold text-emerald-900">{q.code || `Câu ${qIdx + 1}`}: </span>
                    {q.stem}
                  </p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
                    1.0 điểm
                  </span>
                </div>

                {/* 4 statements table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border border-stone-200 rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                        <th className="py-2.5 px-3 text-center w-12 border-r border-stone-200">Ý</th>
                        <th className="py-2.5 px-4 text-left">Phát biểu khẳng định (4 lệnh chuẩn a-b-c-d)</th>
                        <th className="py-2.5 px-3 text-center w-24 border-l border-stone-200">
                          {viewMode === 'marking_guide' ? 'Đáp án' : 'Chọn'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {q.statements.map((st) => (
                        <tr key={st.subId} className="hover:bg-stone-50/50">
                          <td className="py-2.5 px-3 text-center font-bold text-emerald-900 border-r border-stone-200 bg-stone-50/50">
                            {st.subId})
                          </td>
                          <td className="py-2.5 px-4 text-stone-800 leading-relaxed font-serif">
                            <div>{st.text}</div>
                            {viewMode === 'marking_guide' && (
                              <div className="text-[11px] text-stone-500 italic mt-1 font-sans">
                                Giải thích: {st.explanation}
                              </div>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-center border-l border-stone-200">
                            {viewMode === 'marking_guide' ? (
                              <span className={`px-2.5 py-1 rounded-md font-bold text-xs inline-block ${
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
                                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
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
                                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
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
                  <div className="mt-3 p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                    <span className="text-stone-600 flex items-center gap-1.5">
                      <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                      Mô phỏng chấm CV 7991:
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-stone-500">Điểm đạt:</span>
                      <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-mono">
                        +{calculatePartIIScore(qIdx)} / 1.00 đ
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ----------------- PHẦN III ----------------- */}
        <section className="mb-10">
          <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 mb-4 flex items-center justify-between">
            <h2 className="font-bold text-sm md:text-base text-purple-950 uppercase font-serif">
              PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (2.0 ĐIỂM)
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 bg-purple-200 text-purple-900 rounded font-mono">
              4 câu · 0.5 đ
            </span>
          </div>

          <div className="space-y-4">
            {exam.partIII.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl bg-purple-50/30 border border-purple-100">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-medium text-stone-900">
                    <span className="font-bold text-purple-900">{q.code || `Câu ${idx + 1}`}: </span>
                    {q.question}
                  </p>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                    0.5 đ
                  </span>
                </div>

                {viewMode === 'marking_guide' ? (
                  <div className="mt-2 p-2.5 bg-white rounded-lg border border-purple-200 text-xs">
                    <div className="font-bold text-purple-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                      <span>Đáp án chuẩn: <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-serif">{q.correctAnswer}</span></span>
                    </div>
                    <p className="text-stone-600 mt-1 leading-relaxed">{q.explanation}</p>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-stone-500 font-medium">Trả lời:</span>
                    <input
                      type="text"
                      placeholder="Ghi câu trả lời ngắn..."
                      className="px-3 py-1 bg-white border border-stone-300 rounded-lg text-xs w-60 font-serif"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ----------------- PHẦN IV ----------------- */}
        <section className="mb-6">
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 mb-4 flex items-center justify-between">
            <h2 className="font-bold text-sm md:text-base text-amber-950 uppercase font-serif">
              PHẦN IV. TỰ LUẬN NGHỊ LUẬN VĂN HỌC (3.0 ĐIỂM)
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 bg-amber-200 text-amber-900 rounded font-mono">
              1 câu · 3.0 đ
            </span>
          </div>

          <div className="space-y-4">
            {exam.partIV.map((q, idx) => (
              <div key={q.id} className="p-5 rounded-2xl bg-amber-50/30 border border-amber-200">
                <p className="text-sm font-medium text-stone-900 leading-relaxed font-serif">
                  <span className="font-bold text-amber-900">{q.code || `Câu ${idx + 1}`}: </span>
                  {q.question}
                </p>

                {viewMode === 'marking_guide' && (
                  <div className="mt-4 pt-3 border-t border-amber-200">
                    <h4 className="text-xs font-bold text-amber-900 uppercase mb-2">
                      Hướng dẫn chấm & Barem điểm chi tiết:
                    </h4>
                    <table className="w-full text-xs border border-stone-300 rounded-lg overflow-hidden bg-white">
                      <thead>
                        <tr className="bg-amber-100/60 font-bold border-b border-stone-300">
                          <th className="py-2 px-3 text-left w-4/5">Tiêu chí phân tích</th>
                          <th className="py-2 px-3 text-center w-1/5">Điểm</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {q.rubric.map((r, rIdx) => (
                          <tr key={rIdx}>
                            <td className="py-2 px-3 text-stone-800 leading-relaxed font-serif">{r.step}</td>
                            <td className="py-2 px-3 text-center font-bold text-amber-800">{r.points} đ</td>
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

        {/* Footer */}
        <div className="text-center pt-8 border-t border-stone-200">
          <p className="font-bold text-stone-800 text-sm">---------- HẾT ----------</p>
          <p className="text-xs italic text-stone-500 mt-1">Cán bộ coi thi không giải thích gì thêm.</p>
        </div>
      </div>
    </div>
  );
};
