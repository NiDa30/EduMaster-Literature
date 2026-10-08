import React, { useState } from 'react';
import { 
  Grid3X3, 
  Printer, 
  FileSpreadsheet, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  FileText
} from 'lucide-react';
import { Exam7991Data, LessonPlan5512 } from '../types';
import { exportDocxMatrix } from '../utils/exportUtils';

interface MatrixViewProps {
  exam: Exam7991Data;
  khbd: LessonPlan5512;
}

export const MatrixView: React.FC<MatrixViewProps> = ({ exam, khbd }) => {
  const [activeMatrixTab, setActiveMatrixTab] = useState<'matrix_table' | 'spec_table'>('matrix_table');
  const [isExporting, setIsExporting] = useState(false);

  // Dynamic calculations based on live exam state
  const partINB = exam.partI.filter(q => q.level === 'NB');
  const partITH = exam.partI.filter(q => q.level === 'TH');
  const partIVD = exam.partI.filter(q => q.level === 'VD');

  const partIINB = exam.partII.filter(q => q.level === 'NB');
  const partIITH = exam.partII.filter(q => q.level === 'TH');
  const partIIVD = exam.partII.filter(q => q.level === 'VD');

  const partIIITH = exam.partIII.filter(q => q.level === 'TH');
  const partIIIVD = exam.partIII.filter(q => q.level === 'VD');

  const totalPartIPts = exam.partI.reduce((s, q) => s + (q.points || 0.25), 0);
  const totalPartIIPts = exam.partII.reduce((s, q) => s + (q.points || 1.0), 0);
  const totalPartIIIPts = exam.partIII.reduce((s, q) => s + (q.points || 0.5), 0);
  const totalPartIVPts = exam.partIV.reduce((s, q) => s + (q.points || 3.0), 0);
  const grandTotalPts = totalPartIPts + totalPartIIPts + totalPartIIIPts + totalPartIVPts;
  const totalQuestions = exam.partI.length + exam.partII.length + exam.partIII.length + exam.partIV.length;

  const nbPts = (partINB.length * 0.25) + (partIINB.length * 1.0);
  const thPts = (partITH.length * 0.25) + (partIITH.length * 1.0) + (partIIITH.length * 0.5);
  const vdPts = (partIVD.length * 0.25) + (partIIVD.length * 1.0) + (partIIIVD.length * 0.5) + totalPartIVPts;

  const nbPercent = grandTotalPts > 0 ? Math.round((nbPts / grandTotalPts) * 100) : 40;
  const thPercent = grandTotalPts > 0 ? Math.round((thPts / grandTotalPts) * 100) : 30;
  const vdPercent = grandTotalPts > 0 ? (100 - nbPercent - thPercent) : 30;

  const isMatched = Math.abs(grandTotalPts - 10.0) < 0.05;

  const handleExportDocx = async () => {
    try {
      setIsExporting(true);
      await exportDocxMatrix(exam, khbd);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6 space-y-3 overflow-hidden">
      {/* Top Banner (shrink-0) */}
      <div className="bg-white p-3.5 md:p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0 no-print">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-metadata font-semibold bg-purple-100 text-purple-900 border border-purple-200">
              Công văn 7991/BGDĐT-GDTrH
            </span>
            <span className="text-metadata text-stone-500 font-medium hidden sm:inline">Bảng Ma trận & Bản đặc tả môn Ngữ văn</span>
          </div>
          <h1 className="text-section md:text-page-title font-semibold text-stone-900 mt-1 leading-[1.3]">
            Ma trận Đề kiểm tra Định kỳ 2 Chiều
          </h1>
        </div>

        {/* Tab Switcher & Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="bg-stone-100 p-1 rounded-xl border border-stone-200 flex text-metadata font-semibold">
            <button
              onClick={() => setActiveMatrixTab('matrix_table')}
              className={`min-h-[36px] px-3 py-1 rounded-lg flex items-center gap-1.5 transition ${
                activeMatrixTab === 'matrix_table'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5 text-purple-700" />
              <span>Khung Ma trận</span>
            </button>
            <button
              onClick={() => setActiveMatrixTab('spec_table')}
              className={`min-h-[36px] px-3 py-1 rounded-lg flex items-center gap-1.5 transition ${
                activeMatrixTab === 'spec_table'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-700" />
              <span>Bản đặc tả YCCĐ</span>
            </button>
          </div>

          <button
            onClick={handleExportDocx}
            disabled={isExporting}
            className="btn-primary min-h-[36px] px-3.5 py-1.5 bg-[#7C2D37] hover:bg-[#68232D] text-white rounded-xl text-metadata font-semibold flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
            title="Xuất tệp Word (.docx) chứa cả Khung Ma trận và Bản đặc tả A4"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Đang xuất...' : 'Xuất Word (.docx)'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="btn-secondary min-h-[36px] px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-metadata font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">In A4</span>
          </button>
        </div>
      </div>

      {/* Visual Percentage Distribution Ribbon (shrink-0) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 shrink-0">
        <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-metadata font-semibold text-stone-700">Mức 1: Nhận biết</span>
            <span className="text-metadata font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded tabular-nums">
              {nbPercent}% ({nbPts.toFixed(1)} đ)
            </span>
          </div>
          <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-1.5">
            <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${Math.min(nbPercent, 100)}%` }}></div>
          </div>
          <p className="text-xs text-stone-600 leading-snug line-clamp-1 font-serif">
            Phần I: {partINB.length} câu · Phần II: {partIINB.length} câu
          </p>
        </div>

        <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-metadata font-semibold text-stone-700">Mức 2: Thông hiểu</span>
            <span className="text-metadata font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded tabular-nums">
              {thPercent}% ({thPts.toFixed(1)} đ)
            </span>
          </div>
          <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-1.5">
            <div className="bg-emerald-600 h-full rounded-full transition-all duration-300" style={{ width: `${Math.min(thPercent, 100)}%` }}></div>
          </div>
          <p className="text-xs text-stone-600 leading-snug line-clamp-1 font-serif">
            Phần I: {partITH.length} câu · Phần II: {partIITH.length} câu · Phần III: {partIIITH.length} câu
          </p>
        </div>

        <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-metadata font-semibold text-stone-700">Mức 3: Vận dụng</span>
            <span className="text-metadata font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded tabular-nums">
              {vdPercent}% ({vdPts.toFixed(1)} đ)
            </span>
          </div>
          <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-1.5">
            <div className="bg-amber-600 h-full rounded-full transition-all duration-300" style={{ width: `${Math.min(vdPercent, 100)}%` }}></div>
          </div>
          <p className="text-xs text-stone-600 leading-snug line-clamp-1 font-serif">
            Phần I/II/III ({partIVD.length + partIIVD.length + partIIIVD.length} câu) · Phần IV: {exam.partIV.length} câu
          </p>
        </div>

        <div className={`p-3 rounded-xl border shadow-xs flex flex-col justify-between ${
          isMatched ? 'bg-emerald-50/60 border-emerald-200' : 'bg-amber-50/60 border-amber-200'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-metadata font-semibold text-stone-800">Chuẩn hóa Ma trận</span>
            {isMatched ? (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Đạt 10.0 đ
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                <AlertCircle className="w-3 h-3" /> {grandTotalPts.toFixed(1)} / 10.0 đ
              </span>
            )}
          </div>
          <div className="text-xs text-stone-600 leading-tight">
            {isMatched 
              ? `Khớp tỉ lệ ${nbPercent}:${thPercent}:${vdPercent} (${totalQuestions} câu hỏi)`
              : `Chưa khớp chuẩn 10.0đ. Hiện có ${totalQuestions} câu (${grandTotalPts.toFixed(1)} đ).`}
          </div>
        </div>
      </div>

      {/* Tabbed Table Container */}
      <div className="flex-1 min-h-0 bg-white rounded-2xl border border-stone-200 p-4 shadow-xs overflow-auto table-scroll">
        {activeMatrixTab === 'matrix_table' ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-card-title text-stone-900 flex items-center gap-2">
                <Grid3X3 className="w-4 h-4 text-purple-700" />
                Khung Ma trận Đề kiểm tra Định kỳ môn Ngữ văn (CV 7991)
              </h3>
              <span className="text-metadata tabular-nums font-semibold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-lg">
                Tổng: {grandTotalPts.toFixed(1)} đ · Tỉ lệ {nbPercent}:{thPercent}:{vdPercent}
              </span>
            </div>

            <table className="w-full text-metadata border border-stone-300 rounded-xl overflow-hidden border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-800 font-semibold border-b border-stone-300">
                  <th rowSpan={2} className="py-2.5 px-3 text-center border-r border-stone-300 w-12 sticky top-0 bg-stone-100 z-10">TT</th>
                  <th rowSpan={2} className="py-2.5 px-4 text-left border-r border-stone-300 min-w-[180px] sticky top-0 bg-stone-100 z-10">
                    Kỹ năng & Ngữ liệu
                  </th>
                  <th colSpan={3} className="py-2 px-3 text-center border-r border-stone-300 bg-blue-50/80 text-blue-950 sticky top-0 z-10">
                    Nhận biết ({nbPercent}%)
                  </th>
                  <th colSpan={3} className="py-2 px-3 text-center border-r border-stone-300 bg-emerald-50/80 text-emerald-950 sticky top-0 z-10">
                    Thông hiểu ({thPercent}%)
                  </th>
                  <th colSpan={3} className="py-2 px-3 text-center border-r border-stone-300 bg-amber-50/80 text-amber-950 sticky top-0 z-10">
                    Vận dụng ({vdPercent}%)
                  </th>
                  <th rowSpan={2} className="py-2.5 px-3 text-center border-r border-stone-300 w-16 sticky top-0 bg-stone-100 z-10">Tổng câu</th>
                  <th rowSpan={2} className="py-2.5 px-3 text-center border-r border-stone-300 w-16 sticky top-0 bg-stone-100 z-10">Tổng điểm</th>
                  <th rowSpan={2} className="py-2.5 px-3 text-center w-16 sticky top-0 bg-stone-100 z-10">Tỉ lệ</th>
                </tr>
                <tr className="bg-stone-50 text-metadata font-medium text-stone-600 border-b border-stone-300">
                  <th className="py-1.5 px-2 text-center border-r border-stone-200 sticky top-[37px] bg-blue-50/90 z-10">Phần I</th>
                  <th className="py-1.5 px-2 text-center border-r border-stone-200 sticky top-[37px] bg-blue-50/90 z-10">Phần II</th>
                  <th className="py-1.5 px-2 text-center border-r border-stone-300 sticky top-[37px] bg-blue-50/90 z-10">Phần III</th>
                  <th className="py-1.5 px-2 text-center border-r border-stone-200 sticky top-[37px] bg-emerald-50/90 z-10">Phần I</th>
                  <th className="py-1.5 px-2 text-center border-r border-stone-200 sticky top-[37px] bg-emerald-50/90 z-10">Phần II</th>
                  <th className="py-1.5 px-2 text-center border-r border-stone-300 sticky top-[37px] bg-emerald-50/90 z-10">Phần III</th>
                  <th className="py-1.5 px-2 text-center border-r border-stone-200 sticky top-[37px] bg-amber-50/90 z-10">Phần II</th>
                  <th className="py-1.5 px-2 text-center border-r border-stone-200 sticky top-[37px] bg-amber-50/90 z-10">Phần III</th>
                  <th className="py-1.5 px-2 text-center border-r border-stone-300 sticky top-[37px] bg-amber-50/90 z-10">Phần IV (TL)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-700">
                <tr>
                  <td className="py-3 px-3 text-center font-semibold border-r border-stone-200 tabular-nums">1</td>
                  <td className="py-3 px-4 font-medium text-stone-900 border-r border-stone-200 font-serif">
                    Đọc hiểu văn bản & Tiếng Việt ({khbd.info.lessonTitle})
                  </td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums">
                    {partINB.length > 0 ? `${partINB.length} câu (${(partINB.length * 0.25).toFixed(2)} đ)` : '-'}
                  </td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums">
                    {partIINB.length > 0 ? `${partIINB.length} câu (${(partIINB.length * 1.0).toFixed(1)} đ)` : '-'}
                  </td>
                  <td className="py-3 px-2 text-center border-r border-stone-300 tabular-nums text-stone-400">-</td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums">
                    {partITH.length > 0 ? `${partITH.length} câu (${(partITH.length * 0.25).toFixed(2)} đ)` : '-'}
                  </td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums">
                    {partIITH.length > 0 ? `${partIITH.length} câu (${(partIITH.length * 1.0).toFixed(1)} đ)` : '-'}
                  </td>
                  <td className="py-3 px-2 text-center border-r border-stone-300 tabular-nums">
                    {partIIITH.length > 0 ? `${partIIITH.length} câu (${(partIIITH.length * 0.5).toFixed(1)} đ)` : '-'}
                  </td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums">
                    {partIIVD.length > 0 ? `${partIIVD.length} câu (${(partIIVD.length * 1.0).toFixed(1)} đ)` : '-'}
                  </td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums">
                    {partIIIVD.length > 0 ? `${partIIIVD.length} câu (${(partIIIVD.length * 0.5).toFixed(1)} đ)` : '-'}
                  </td>
                  <td className="py-3 px-2 text-center border-r border-stone-300 tabular-nums text-stone-400">-</td>
                  <td className="py-3 px-3 text-center font-semibold border-r border-stone-200 tabular-nums">
                    {exam.partI.length + exam.partII.length + exam.partIII.length} câu
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-[#7C2D37] border-r border-stone-200 tabular-nums">
                    {(totalPartIPts + totalPartIIPts + totalPartIIIPts).toFixed(1)} đ
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-emerald-700 tabular-nums">
                    {grandTotalPts > 0 ? Math.round(((totalPartIPts + totalPartIIPts + totalPartIIIPts) / grandTotalPts) * 100) : 70}%
                  </td>
                </tr>

                <tr>
                  <td className="py-3 px-3 text-center font-semibold border-r border-stone-200 tabular-nums">2</td>
                  <td className="py-3 px-4 font-medium text-stone-900 border-r border-stone-200 font-serif">
                    Viết bài văn nghị luận (Phần IV Tự luận)
                  </td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums text-stone-400">-</td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums text-stone-400">-</td>
                  <td className="py-3 px-2 text-center border-r border-stone-300 tabular-nums text-stone-400">-</td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums text-stone-400">-</td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums text-stone-400">-</td>
                  <td className="py-3 px-2 text-center border-r border-stone-300 tabular-nums text-stone-400">-</td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums text-stone-400">-</td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums text-stone-400">-</td>
                  <td className="py-3 px-2 text-center border-r border-stone-300 tabular-nums font-semibold text-amber-800">
                    {exam.partIV.length} câu ({totalPartIVPts.toFixed(1)} đ)
                  </td>
                  <td className="py-3 px-3 text-center font-semibold border-r border-stone-200 tabular-nums">
                    {exam.partIV.length} câu
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-[#7C2D37] border-r border-stone-200 tabular-nums">
                    {totalPartIVPts.toFixed(1)} đ
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-emerald-700 tabular-nums">
                    {grandTotalPts > 0 ? Math.round((totalPartIVPts / grandTotalPts) * 100) : 30}%
                  </td>
                </tr>

                <tr className="bg-stone-100 font-semibold text-stone-900">
                  <td colSpan={2} className="py-3 px-4 text-right border-r border-stone-300">
                    Tổng hợp theo mức độ
                  </td>
                  <td colSpan={3} className="py-3 px-3 text-center border-r border-stone-300 text-blue-700 tabular-nums">
                    {nbPts.toFixed(1)} đ ({nbPercent}%)
                  </td>
                  <td colSpan={3} className="py-3 px-3 text-center border-r border-stone-300 text-emerald-700 tabular-nums">
                    {thPts.toFixed(1)} đ ({thPercent}%)
                  </td>
                  <td colSpan={3} className="py-3 px-3 text-center border-r border-stone-300 text-amber-700 tabular-nums">
                    {vdPts.toFixed(1)} đ ({vdPercent}%)
                  </td>
                  <td className="py-3 px-3 text-center border-r border-stone-300 tabular-nums">
                    {totalQuestions} câu
                  </td>
                  <td className="py-3 px-3 text-center text-[#7C2D37] border-r border-stone-300 tabular-nums">
                    {grandTotalPts.toFixed(1)} đ
                  </td>
                  <td className="py-3 px-3 text-center text-emerald-700 tabular-nums">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h3 className="font-semibold text-card-title text-stone-900 mb-3 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-blue-700" />
              Bản đặc tả Ma trận Đề kiểm tra Định kỳ môn Ngữ văn
            </h3>
            <table className="w-full text-metadata border border-stone-300 rounded-xl overflow-hidden border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-800 font-semibold border-b border-stone-300">
                  <th className="py-2.5 px-3 text-center w-12 border-r border-stone-300 sticky top-0 bg-stone-100 z-10">TT</th>
                  <th className="py-2.5 px-4 text-left border-r border-stone-300 w-1/4 sticky top-0 bg-stone-100 z-10">Đơn vị kiến thức</th>
                  <th className="py-2.5 px-4 text-left border-r border-stone-300 w-1/2 sticky top-0 bg-stone-100 z-10">Yêu cầu cần đạt (YCCĐ)</th>
                  <th className="py-2.5 px-3 text-center w-1/4 sticky top-0 bg-stone-100 z-10">Vị trí trong đề</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-700">
                <tr>
                  <td className="py-3 px-3 text-center font-semibold border-r border-stone-200 tabular-nums">1</td>
                  <td className="py-3 px-4 font-medium text-stone-900 border-r border-stone-200 font-serif">
                    Đọc hiểu văn bản ({khbd.info.lessonTitle})
                  </td>
                  <td className="py-3 px-4 border-r border-stone-200 leading-relaxed font-serif text-body-ui">
                    <p><strong>Nhận biết:</strong> Nhận diện thể loại, hoàn cảnh sáng tác, từ ngữ, hình ảnh, ngôi kể, điểm nhìn trần thuật và biện pháp tu từ.</p>
                    <p className="mt-1"><strong>Thông hiểu:</strong> Giải thích ý nghĩa hình tượng nghệ thuật, mối quan hệ giữa người kể chuyện và nhân vật, cảm hứng tư tưởng.</p>
                    <p className="mt-1"><strong>Vận dụng:</strong> Rút ra bài học nhân sinh, lý giải thông điệp thẩm mỹ và liên hệ thực tiễn đời sống.</p>
                  </td>
                  <td className="py-3 px-3 text-center tabular-nums">
                    Phần I (Câu 1 - {exam.partI.length})<br/>
                    Phần II (Câu 1 - {exam.partII.length})<br/>
                    Phần III (Câu 1 - {exam.partIII.length})
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 text-center font-semibold border-r border-stone-200 tabular-nums">2</td>
                  <td className="py-3 px-4 font-medium text-stone-900 border-r border-stone-200 font-serif">
                    Viết Nghị luận Văn học / Xã hội
                  </td>
                  <td className="py-3 px-4 border-r border-stone-200 leading-relaxed font-serif text-body-ui">
                    <p><strong>Vận dụng:</strong> Viết bài văn nghị luận phân tích một đoạn trích / khía cạnh nội dung nghệ thuật của tác phẩm; kết hợp các thao tác lập luận, dẫn chứng thuyết phục và biểu cảm.</p>
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-amber-800 tabular-nums">
                    Phần IV (Câu 1 Tự luận - {totalPartIVPts.toFixed(1)} đ)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
