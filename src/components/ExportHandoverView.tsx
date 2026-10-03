import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  Download, 
  Upload, 
  CheckCircle2, 
  FileCode2, 
  Printer, 
  Sparkles, 
  FileText, 
  Presentation, 
  ShieldCheck, 
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { AppState, LessonPlan5512, Exam7991Data, SlideItem } from '../types';
import { exportWordKHBD, exportWordExam7991, exportHtmlSlides, exportRubricDoc } from '../utils/exportUtils';

interface ExportHandoverViewProps {
  appState: AppState;
  onRestoreState: (state: AppState) => void;
}

export const ExportHandoverView: React.FC<ExportHandoverViewProps> = ({ appState, onRestoreState }) => {
  const [copied, setCopied] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const jsonString = JSON.stringify(appState, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EduMaster_Literature_Handover_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleApplyImport = () => {
    setImportError(null);
    setImportSuccess(false);
    try {
      const parsed = JSON.parse(importJsonText);
      if (!parsed.khbd || !parsed.exam || !parsed.slides) {
        throw new Error('Dữ liệu JSON thiếu các phân hệ cốt lõi (khbd, exam, slides).');
      }
      onRestoreState(parsed);
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 3000);
    } catch (err: any) {
      setImportError(err.message || 'Cú pháp JSON không hợp lệ.');
    }
  };

  const checklistItems = [
    {
      id: 1,
      title: 'Đầy đủ hệ sinh thái Ngữ văn THPT',
      desc: 'Hệ thống tích hợp toàn diện: Đọc hiểu tác phẩm, Phân tích thể loại (Thơ/Truyện/Nghị luận), KHBD 5512, Slide Storytelling, Đề thi & Ma trận 7991, Rubric tự luận.',
      status: true
    },
    {
      id: 2,
      title: 'Đề thi chuẩn Phần II Đúng/Sai 4 lệnh a-b-c-d',
      desc: 'Mỗi câu Phần II gồm đúng 4 phát biểu kèm barem tính điểm chuẩn Công văn 7991/BGDĐT-GDTrH (0.1đ - 0.25đ - 0.50đ - 1.00đ).',
      status: true
    },
    {
      id: 3,
      title: 'Tích hợp bộ công cụ Xuất file Văn phòng',
      desc: 'Xuất Microsoft Word (.doc) KHBD 5512, Đề thi 7991, Rubric chấm bài, Slide trình chiếu (.html / .pptx) và In ấn chuẩn A4.',
      status: true
    },
    {
      id: 4,
      title: 'Khối JSON State bàn giao phiên làm việc',
      desc: 'Lưu trữ trạng thái toàn phần AppState, hỗ trợ sao chép, tải về và phục hồi phiên làm việc bất cứ lúc nào.',
      status: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-900 text-white flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Bàn giao Phiên làm việc & Kiểm định chất lượng
            </span>
            <span className="text-xs text-stone-500 font-medium">Hệ thống Ngữ văn GDPT 2018</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-stone-900 mt-1">
            Trung tâm Xuất bản & Khối JSON State Bàn giao
          </h1>
          <p className="text-sm text-stone-600">
            Xuất dữ liệu sang các định dạng văn phòng chuẩn mực hoặc lưu trữ State để các phiên làm việc sau tiếp nối.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã chép State' : 'Sao chép JSON'}</span>
          </button>
          <button
            onClick={handleDownloadJson}
            className="px-3.5 py-2 bg-[#7C2D37] hover:bg-[#68232D] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Download className="w-4 h-4" />
            <span>Tải file .JSON</span>
          </button>
        </div>
      </div>

      {/* 4-Item Verification Checklist Box */}
      <div className="bg-white p-6 rounded-2xl border-2 border-emerald-200 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200">
          <div>
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              BẢNG KIỂM ĐỊNH TIÊU CHUẨN ĐỒNG BỘ (VERIFICATION CHECKLIST)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Đảm bảo 100% tiêu chí quy chuẩn kỹ thuật và nghiệp vụ sư phạm Ngữ văn
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono">
            4 / 4 TIÊU CHUẨN
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checklistItems.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-sm text-stone-900 leading-snug">{item.title}</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Office Suite */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <h3 className="font-serif font-bold text-base text-stone-900 mb-4 flex items-center gap-2">
          <Download className="w-4 h-4 text-[#7C2D37]" />
          Khu vực Xuất bản File Văn phòng (Office Export Suite)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-white hover:border-[#7C2D37] transition flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#7C2D37]/10 text-[#7C2D37] flex items-center justify-center mb-3">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-stone-900 font-serif">Word KHBD (5512)</h4>
              <p className="text-xs text-stone-500 mt-1">Định dạng .doc có khung biểu 4 hoạt động, chuẩn in A4.</p>
            </div>
            <button
              onClick={() => exportWordKHBD(appState.khbd)}
              className="mt-4 w-full py-2 bg-[#7C2D37] hover:bg-[#68232D] text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải Word KHBD</span>
            </button>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-white hover:border-emerald-400 transition flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-stone-900 font-serif">Word Đề thi (7991)</h4>
              <p className="text-xs text-stone-500 mt-1">Đề thi 4 phần kèm barem hướng dẫn chấm 10.0 đ.</p>
            </div>
            <button
              onClick={() => exportWordExam7991(appState.exam, appState.khbd)}
              className="mt-4 w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải Word Đề thi</span>
            </button>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-white hover:border-amber-400 transition flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <Presentation className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-stone-900 font-serif">Slide Storytelling</h4>
              <p className="text-xs text-stone-500 mt-1">Trình chiếu tương tác, Quote Slide văn học chuẩn nghệ thuật.</p>
            </div>
            <button
              onClick={() => exportHtmlSlides(appState.slides, appState.khbd.info.lessonTitle)}
              className="mt-4 w-full py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải Slide Bài giảng</span>
            </button>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-white hover:border-purple-400 transition flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-stone-900 font-serif">Word Rubric Chấm</h4>
              <p className="text-xs text-stone-500 mt-1">Bảng Rubric chấm tự luận nghị luận chuẩn biểu điểm.</p>
            </div>
            <button
              onClick={() => exportRubricDoc(appState.rubric)}
              className="mt-4 w-full py-2 bg-purple-800 hover:bg-purple-900 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải Rubric Word</span>
            </button>
          </div>
        </div>
      </div>

      {/* JSON State Handover Block */}
      <div className="bg-[#171413] text-stone-100 p-6 rounded-2xl border border-stone-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#7C2D37]/30 text-rose-400 flex items-center justify-center">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">
                KHỐI JSON STATE BÀN GIAO PHIÊN LÀM VIỆC (SESSION HANDOVER)
              </h3>
              <p className="text-xs text-stone-400">
                Toàn bộ dữ liệu tác phẩm, chú thích, KHBD, slide và đề thi được bảo toàn trọn vẹn
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition border border-stone-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã sao chép!' : 'Sao chép toàn bộ JSON'}</span>
            </button>
          </div>
        </div>

        {/* Code container */}
        <div className="relative">
          <pre className="p-4 rounded-xl bg-[#0D0B0A] font-mono text-[11px] text-amber-300 overflow-x-auto max-h-96 border border-stone-800/80 leading-relaxed selection:bg-[#7C2D37] selection:text-white">
            {jsonString}
          </pre>
        </div>

        {/* Import JSON Restore Box */}
        <div className="mt-6 pt-5 border-t border-stone-800">
          <h4 className="text-xs font-bold text-stone-300 uppercase mb-2 flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            Phục hồi phiên làm việc từ JSON trước:
          </h4>
          <textarea
            rows={3}
            placeholder="Dán mã JSON State phiên trước vào đây để khôi phục..."
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            className="w-full text-xs font-mono p-3 bg-stone-900 border border-stone-700 rounded-xl text-stone-200 focus:ring-2 focus:ring-[#7C2D37] mb-2"
          />
          <div className="flex items-center justify-between">
            <button
              onClick={handleApplyImport}
              disabled={!importJsonText.trim()}
              className="px-4 py-2 bg-[#7C2D37] hover:bg-[#68232D] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Nạp lại trạng thái (Restore Session)</span>
            </button>
            {importSuccess && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Nạp thành công phiên làm việc!
              </span>
            )}
            {importError && (
              <span className="text-xs font-semibold text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {importError}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
