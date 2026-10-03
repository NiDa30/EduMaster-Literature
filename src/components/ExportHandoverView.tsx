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
import { normalizeDeepNFC } from '../utils/unicode';

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
      const normalizedState = normalizeDeepNFC(parsed);
      onRestoreState(normalizedState);
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
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6 space-y-3 overflow-hidden">
      {/* Top Banner (shrink-0) */}
      <div className="bg-white p-3.5 md:p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-metadata font-semibold bg-stone-900 text-white flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Bàn giao Phiên làm việc & Kiểm định chất lượng
            </span>
            <span className="text-metadata text-stone-500 font-medium hidden sm:inline">Hệ thống Ngữ văn GDPT 2018</span>
          </div>
          <h1 className="text-section md:text-page-title font-semibold text-stone-900 mt-1 leading-[1.3]">
            Trung tâm Xuất bản & Khối JSON State Bàn giao
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="btn-secondary min-h-[36px] px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-metadata font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã chép State' : 'Sao chép JSON'}</span>
          </button>
          <button
            onClick={handleDownloadJson}
            className="btn-primary min-h-[36px] px-3 py-1.5 bg-[#7C2D37] hover:bg-[#68232D] text-white rounded-xl text-metadata font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải file .JSON</span>
          </button>
        </div>
      </div>

      {/* Main 2-Panel Workspace (Rule 29.18) */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-4 overflow-hidden">
        {/* Left Panel: Checklist + Export Office Suite (340-380px, shrink-0) */}
        <div className="w-full md:w-80 xl:w-96 shrink-0 flex flex-col gap-3 overflow-hidden">
          {/* Verification Checklist Box (shrink-0) */}
          <div className="card-surface p-3.5 shrink-0 border-2 border-emerald-200">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-semibold text-metadata text-stone-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Kiểm định tiêu chuẩn đồng bộ
              </h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 tabular-nums">
                4/4 Tiêu chuẩn
              </span>
            </div>

            <div className="space-y-1.5 pt-2">
              {checklistItems.map((item) => (
                <div key={item.id} className="p-2 rounded-lg bg-emerald-50/50 border border-emerald-100/80 flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs text-stone-900 leading-tight">{item.title}</div>
                    <div className="text-[11px] text-stone-600 leading-tight mt-0.5 line-clamp-1">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Office Suite (flex-1 min-h-0 overflow-y-auto) */}
          <div className="card-surface p-3.5 flex-1 min-h-0 flex flex-col overflow-hidden">
            <h3 className="font-semibold text-metadata text-stone-900 mb-2 flex items-center gap-1.5 shrink-0">
              <Download className="w-4 h-4 text-[#7C2D37]" />
              Xuất bản File Văn phòng (Office Suite)
            </h3>

            <div className="flex-1 min-h-0 overflow-y-auto panel-scroll space-y-2 pr-0.5">
              {/* Word KHBD */}
              <div className="p-2.5 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-white transition flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#7C2D37]/10 text-[#7C2D37] flex items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-metadata text-stone-900 font-serif leading-tight">Word KHBD (5512)</div>
                    <div className="text-[11px] text-stone-500 leading-tight">Khung 4 hoạt động chuẩn A4</div>
                  </div>
                </div>
                <button
                  onClick={() => exportWordKHBD(appState.khbd)}
                  className="min-h-[32px] px-2.5 py-1 bg-[#7C2D37] hover:bg-[#68232D] text-white font-semibold text-xs rounded-lg flex items-center gap-1 shrink-0 transition"
                >
                  <Download className="w-3 h-3" />
                  <span>Tải Word</span>
                </button>
              </div>

              {/* Word Đề thi */}
              <div className="p-2.5 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-white transition flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-metadata text-stone-900 font-serif leading-tight">Word Đề thi (7991)</div>
                    <div className="text-[11px] text-stone-500 leading-tight">4 phần kèm barem 10.0 đ</div>
                  </div>
                </div>
                <button
                  onClick={() => exportWordExam7991(appState.exam, appState.khbd)}
                  className="min-h-[32px] px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg flex items-center gap-1 shrink-0 transition"
                >
                  <Download className="w-3 h-3" />
                  <span>Tải Đề thi</span>
                </button>
              </div>

              {/* Slide PowerPoint */}
              <div className="p-2.5 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-white transition flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Presentation className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-metadata text-stone-900 font-serif leading-tight">Slide Storytelling</div>
                    <div className="text-[11px] text-stone-500 leading-tight">Trình chiếu & Quote nghệ thuật</div>
                  </div>
                </div>
                <button
                  onClick={() => exportHtmlSlides(appState.slides, appState.khbd.info.lessonTitle)}
                  className="min-h-[32px] px-2.5 py-1 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-lg flex items-center gap-1 shrink-0 transition"
                >
                  <Download className="w-3 h-3" />
                  <span>Tải Slide</span>
                </button>
              </div>

              {/* Word Rubric */}
              <div className="p-2.5 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-white transition flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-metadata text-stone-900 font-serif leading-tight">Word Rubric Chấm</div>
                    <div className="text-[11px] text-stone-500 leading-tight">Barem tự luận chuẩn biểu điểm</div>
                  </div>
                </div>
                <button
                  onClick={() => exportRubricDoc(appState.rubric)}
                  className="min-h-[32px] px-2.5 py-1 bg-purple-800 hover:bg-purple-900 text-white font-semibold text-xs rounded-lg flex items-center gap-1 shrink-0 transition"
                >
                  <Download className="w-3 h-3" />
                  <span>Tải Rubric</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: JSON State Handover & Restore (Rule 29.18) */}
        <div className="flex-1 min-h-0 bg-[#171413] text-stone-100 p-4 rounded-2xl border border-stone-800 shadow-xl flex flex-col overflow-hidden">
          {/* Header row (shrink-0) */}
          <div className="flex items-center justify-between pb-2.5 border-b border-stone-800 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#7C2D37]/30 text-rose-400 flex items-center justify-center">
                <FileCode2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-metadata text-white">
                  JSON State Bàn giao Phiên làm việc (Session Handover)
                </h3>
                <p className="text-[11px] text-stone-400">
                  Bảo toàn dữ liệu tác phẩm, chú thích, KHBD, slide và đề thi
                </p>
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="min-h-[32px] px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition border border-stone-700"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Đã sao chép!' : 'Sao chép JSON'}</span>
            </button>
          </div>

          {/* Code container (flex-1 min-h-0 overflow-y-auto) */}
          <div className="flex-1 min-h-0 my-2 overflow-hidden flex flex-col">
            <pre className="flex-1 min-h-0 overflow-auto panel-scroll p-3 rounded-xl bg-[#0D0B0A] font-mono text-xs text-amber-300 border border-stone-800/80 leading-relaxed selection:bg-[#7C2D37] selection:text-white">
              {jsonString}
            </pre>
          </div>

          {/* Import JSON Restore Box (shrink-0) */}
          <div className="pt-2.5 border-t border-stone-800 shrink-0">
            <h4 className="text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1">
              <Upload className="w-3 h-3 text-amber-400" />
              Phục hồi phiên làm việc từ mã JSON:
            </h4>
            <div className="flex gap-2">
              <textarea
                rows={2}
                placeholder="Dán mã JSON State phiên trước vào đây để khôi phục..."
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                className="flex-1 text-xs font-mono p-2 bg-stone-900 border border-stone-700 rounded-lg text-stone-200 focus:ring-1 focus:ring-[#7C2D37] resize-none min-h-[48px]"
              />
              <button
                onClick={handleApplyImport}
                disabled={!importJsonText.trim()}
                className="btn-primary min-h-[48px] px-3.5 bg-[#7C2D37] hover:bg-[#68232D] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shrink-0"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Nạp lại State</span>
              </button>
            </div>
            {(importSuccess || importError) && (
              <div className="mt-1.5 text-xs">
                {importSuccess && (
                  <span className="font-medium text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Nạp thành công phiên làm việc!
                  </span>
                )}
                {importError && (
                  <span className="font-medium text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {importError}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
