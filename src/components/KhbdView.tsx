import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Clock, 
  Sparkles, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Presentation, 
  Layers, 
  BookOpen, 
  Compass, 
  Paperclip,
  Share2
} from 'lucide-react';
import { LessonPlan5512, TeachingActivity, ActiveModule } from '../types';
import { exportWordKHBD } from '../utils/exportUtils';

interface KhbdViewProps {
  khbd: LessonPlan5512;
  setKhbd: React.Dispatch<React.SetStateAction<LessonPlan5512>>;
  setActiveModule?: (m: ActiveModule) => void;
  onAddSlideFromActivity?: (actName: string, content: string) => void;
}

export const KhbdView: React.FC<KhbdViewProps> = ({ 
  khbd, 
  setKhbd, 
  setActiveModule,
  onAddSlideFromActivity
}) => {
  const [viewMode, setViewMode] = useState<'visual_builder' | 'document'>('visual_builder');
  const [expandedActivity, setExpandedActivity] = useState<string | null>(khbd.activities[0]?.id || null);

  const handleUpdateActivity = (actId: string, updated: Partial<TeachingActivity>) => {
    setKhbd({
      ...khbd,
      activities: khbd.activities.map(act => act.id === actId ? { ...act, ...updated } : act)
    });
  };

  const handleAddActivity = () => {
    const newAct: TeachingActivity = {
      id: `act-${Date.now()}`,
      name: `Hoạt động ${khbd.activities.length + 1}: Mở rộng / Chuyên sâu`,
      type: 'practice',
      time: '10 phút',
      objective: 'Củng cố và rèn luyện kỹ năng đọc hiểu văn bản nâng cao.',
      content: 'Học sinh làm việc theo nhóm giải quyết tình huống văn học trên phiếu học tập.',
      product: 'Phiếu học tập hoàn chỉnh có dẫn chứng và lập luận thuyết phục.',
      method: 'Dạy học hợp tác, kỹ thuật khăn trải bàn',
      tools: 'Phiếu học tập số 3, bảng phụ',
      steps: {
        step1: 'Giáo viên giao nhiệm vụ và nêu tiêu chí đánh giá trên Rubric.',
        step2: 'Học sinh nghiên cứu ngữ liệu và thảo luận nhóm.',
        step3: 'Đại diện nhóm báo cáo, các nhóm khác phản biện.',
        step4: 'Giáo viên nhận xét, chuẩn hóa kiến thức và chốt ghi bảng.'
      }
    };
    setKhbd({
      ...khbd,
      activities: [...khbd.activities, newAct]
    });
    setExpandedActivity(newAct.id);
  };

  const handleDeleteActivity = (id: string) => {
    if (khbd.activities.length <= 1) return;
    setKhbd({
      ...khbd,
      activities: khbd.activities.filter(act => act.id !== id)
    });
  };

  const getActivityTypeBadge = (type: TeachingActivity['type']) => {
    switch (type) {
      case 'warmup': return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'knowledge': return 'bg-blue-100 text-blue-900 border-blue-200';
      case 'practice': return 'bg-emerald-100 text-emerald-900 border-emerald-200';
      case 'application': return 'bg-purple-100 text-purple-900 border-purple-200';
    }
  };

  const getActivityTypeLabel = (type: TeachingActivity['type']) => {
    switch (type) {
      case 'warmup': return '01 Khởi động';
      case 'knowledge': return '02 Hình thành kiến thức';
      case 'practice': return '03 Luyện tập';
      case 'application': return '04 Vận dụng';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#7C2D37]/10 text-[#7C2D37] border border-[#7C2D37]/20">
              Công văn 5512/BGDĐT-GDTrH
            </span>
            <span className="text-xs text-stone-500 font-medium">Quy chuẩn Thiết kế KHBD môn Ngữ văn</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-stone-900 mt-1">
            Visual Lesson Builder (Kế hoạch bài dạy 5512)
          </h1>
          <p className="text-sm text-stone-600">
            Hành trình dạy học trực quan: 01 Khởi động → 02 Hình thành kiến thức → 03 Luyện tập → 04 Vận dụng. Đảm bảo đúng 4 bước sư phạm mỗi hoạt động.
          </p>
        </div>

        {/* View Switcher & Action buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <div className="bg-stone-100 p-1 rounded-xl border border-stone-200 flex text-xs font-semibold">
            <button
              onClick={() => setViewMode('visual_builder')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                viewMode === 'visual_builder'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#7C2D37]" />
              <span>Visual Builder</span>
            </button>
            <button
              onClick={() => setViewMode('document')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                viewMode === 'document'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Văn bản in A4</span>
            </button>
          </div>

          <button
            onClick={() => exportWordKHBD(khbd)}
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

      {/* ========================================================================= */}
      {/* 1. VISUAL LESSON BUILDER TIMELINE MODE */}
      {/* ========================================================================= */}
      {viewMode === 'visual_builder' ? (
        <div className="space-y-6">
          {/* Visual Timeline Steps Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { num: '01', title: 'Khởi động', desc: 'Tạo tâm thế & gợi mở', color: 'border-amber-400 bg-amber-50/50 text-amber-900' },
              { num: '02', title: 'Kiến thức mới', desc: 'Đọc hiểu & Khám phá', color: 'border-blue-400 bg-blue-50/50 text-blue-900' },
              { num: '03', title: 'Luyện tập', desc: 'Củng cố & Thực hành', color: 'border-emerald-400 bg-emerald-50/50 text-emerald-900' },
              { num: '04', title: 'Vận dụng', desc: 'Chiêm nghiệm & Sáng tạo', color: 'border-purple-400 bg-purple-50/50 text-purple-900' }
            ].map((step, sIdx) => (
              <div key={sIdx} className={`p-3.5 rounded-2xl border-2 shadow-xs ${step.color}`}>
                <div className="font-mono text-xs font-bold opacity-60">GIAI ĐOẠN {step.num}</div>
                <div className="font-serif font-bold text-sm mt-0.5">{step.title}</div>
                <div className="text-[11px] opacity-80 mt-0.5">{step.desc}</div>
              </div>
            ))}
          </div>

          {/* Lesson Objectives Collapsible Card */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#7C2D37]/10 text-[#7C2D37] flex items-center justify-center text-xs font-bold">I</span>
              Mục tiêu Dạy học & Năng lực cần đạt (YCCĐ)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1">1. Về Kiến thức:</span>
                <ul className="list-disc pl-4 space-y-1 text-stone-700 leading-relaxed">
                  {khbd.objectives.knowledge.map((k, i) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1">2. Năng lực đặc thù Ngữ văn:</span>
                <ul className="list-disc pl-4 space-y-1 text-stone-700 leading-relaxed">
                  {khbd.objectives.specializedCompetencies.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1">3. Phẩm chất chủ yếu:</span>
                <ul className="list-disc pl-4 space-y-1 text-stone-700 leading-relaxed">
                  {khbd.objectives.qualities.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Activities List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#7C2D37]/10 text-[#7C2D37] flex items-center justify-center text-xs font-bold">III</span>
                Tiến trình 4 Hoạt động Dạy học
              </h3>
              <button
                onClick={handleAddActivity}
                className="px-3.5 py-1.5 rounded-xl bg-[#7C2D37] hover:bg-[#68232D] text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm hoạt động</span>
              </button>
            </div>

            {khbd.activities.map((act, index) => {
              const isExpanded = expandedActivity === act.id;
              return (
                <div
                  key={act.id}
                  className={`bg-white rounded-2xl border transition shadow-xs ${
                    isExpanded ? 'border-[#7C2D37] ring-2 ring-[#7C2D37]/10' : 'border-stone-200'
                  }`}
                >
                  {/* Activity Card Header Bar */}
                  <div
                    onClick={() => setExpandedActivity(isExpanded ? null : act.id)}
                    className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center font-mono shrink-0">
                        0{index + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getActivityTypeBadge(act.type)}`}>
                            {getActivityTypeLabel(act.type)}
                          </span>
                          <span className="text-xs text-stone-500 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3" /> {act.time}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-stone-900 mt-0.5">
                          {act.name}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {/* Action shortcut: convert to slide */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onAddSlideFromActivity) {
                            onAddSlideFromActivity(act.name, `${act.objective}\n${act.content}`);
                          }
                          if (setActiveModule) setActiveModule('slides');
                        }}
                        className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-medium flex items-center gap-1 transition"
                        title="Tạo Slide cho hoạt động này"
                      >
                        <Presentation className="w-3.5 h-3.5 text-amber-700" />
                        <span className="hidden sm:inline">Thành Slide</span>
                      </button>

                      {khbd.activities.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteActivity(act.id);
                          }}
                          className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                          title="Xóa hoạt động"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      {isExpanded ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
                    </div>
                  </div>

                  {/* Expanded Content Details */}
                  {isExpanded && (
                    <div className="p-5 border-t border-stone-200 bg-stone-50/50 space-y-4">
                      {/* Sub-toolbar: Method, Tools */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block font-semibold text-stone-700 mb-1">Phương pháp dạy học:</label>
                          <input
                            type="text"
                            value={act.method || 'Dạy học hợp tác, đàm thoại gợi mở, giải quyết vấn đề'}
                            onChange={(e) => handleUpdateActivity(act.id, { method: e.target.value })}
                            className="w-full p-2 bg-white border border-stone-300 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-stone-700 mb-1">Công cụ & Học liệu:</label>
                          <input
                            type="text"
                            value={act.tools || 'Phiếu học tập, máy chiếu, bảng phụ, SGK Ngữ văn'}
                            onChange={(e) => handleUpdateActivity(act.id, { tools: e.target.value })}
                            className="w-full p-2 bg-white border border-stone-300 rounded-xl"
                          />
                        </div>
                      </div>

                      {/* 3 standard 5512 points: objective, content, product */}
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block font-bold text-stone-800 mb-1">a) Mục tiêu:</label>
                          <textarea
                            rows={2}
                            value={act.objective}
                            onChange={(e) => handleUpdateActivity(act.id, { objective: e.target.value })}
                            className="w-full p-2.5 bg-white border border-stone-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-stone-800 mb-1">b) Nội dung:</label>
                          <textarea
                            rows={2}
                            value={act.content}
                            onChange={(e) => handleUpdateActivity(act.id, { content: e.target.value })}
                            className="w-full p-2.5 bg-white border border-stone-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-stone-800 mb-1">c) Sản phẩm:</label>
                          <textarea
                            rows={2}
                            value={act.product}
                            onChange={(e) => handleUpdateActivity(act.id, { product: e.target.value })}
                            className="w-full p-2.5 bg-white border border-stone-300 rounded-xl"
                          />
                        </div>
                      </div>

                      {/* 4 Standard Steps Table */}
                      <div className="pt-2">
                        <label className="block text-xs font-bold text-[#7C2D37] mb-2 uppercase">
                          d) Tổ chức thực hiện (Chuẩn 4 bước Công văn 5512):
                        </label>

                        <div className="space-y-2.5">
                          <div className="p-3 rounded-xl bg-white border border-stone-200">
                            <span className="text-[11px] font-bold text-[#7C2D37] block mb-1">
                              Bước 1: Chuyển giao nhiệm vụ
                            </span>
                            <textarea
                              rows={2}
                              value={act.steps.step1}
                              onChange={(e) => handleUpdateActivity(act.id, { steps: { ...act.steps, step1: e.target.value } })}
                              className="w-full text-xs p-2 border border-stone-200 rounded-lg"
                            />
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-stone-200">
                            <span className="text-[11px] font-bold text-[#7C2D37] block mb-1">
                              Bước 2: Thực hiện nhiệm vụ
                            </span>
                            <textarea
                              rows={2}
                              value={act.steps.step2}
                              onChange={(e) => handleUpdateActivity(act.id, { steps: { ...act.steps, step2: e.target.value } })}
                              className="w-full text-xs p-2 border border-stone-200 rounded-lg"
                            />
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-stone-200">
                            <span className="text-[11px] font-bold text-[#7C2D37] block mb-1">
                              Bước 3: Báo cáo, thảo luận
                            </span>
                            <textarea
                              rows={2}
                              value={act.steps.step3}
                              onChange={(e) => handleUpdateActivity(act.id, { steps: { ...act.steps, step3: e.target.value } })}
                              className="w-full text-xs p-2 border border-stone-200 rounded-lg"
                            />
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-stone-200">
                            <span className="text-[11px] font-bold text-[#7C2D37] block mb-1">
                              Bước 4: Kết luận, nhận định
                            </span>
                            <textarea
                              rows={2}
                              value={act.steps.step4}
                              onChange={(e) => handleUpdateActivity(act.id, { steps: { ...act.steps, step4: e.target.value } })}
                              className="w-full text-xs p-2 border border-stone-200 rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. OFFICIAL A4 DOCUMENT PRINT VIEW */
        /* ========================================================================= */
        <div className="bg-white rounded-2xl border border-stone-300 p-8 md:p-14 shadow-md max-w-4xl mx-auto text-stone-900">
          {/* Header Quốc hiệu */}
          <div className="grid grid-cols-2 gap-4 pb-6 border-b border-stone-300">
            <div className="text-center font-serif text-sm">
              <p className="uppercase text-stone-700">{khbd.info.department}</p>
              <p className="font-bold uppercase text-stone-900">{khbd.info.school}</p>
              <p className="text-xs text-stone-600 mt-1">Tổ: <span className="font-semibold">{khbd.info.subjectGroup}</span></p>
              <p className="text-xs text-stone-600">Giáo viên: <span className="font-semibold">{khbd.info.teacherName}</span></p>
            </div>
            <div className="text-center font-serif text-sm">
              <p className="font-bold text-stone-900">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
              <p className="font-bold text-stone-900 text-xs">Độc lập - Tự do - Hạnh phúc</p>
              <p className="text-xs text-stone-400 mt-1">---------------</p>
              <p className="italic text-xs text-stone-500 mt-1">..., ngày ... tháng ... năm 202...</p>
            </div>
          </div>

          {/* Title KHBD */}
          <div className="text-center my-6">
            <h2 className="text-xl md:text-2xl font-bold font-serif uppercase tracking-tight text-stone-900">
              KẾ HOẠCH BÀI DẠY
            </h2>
            <div className="text-lg font-bold font-serif text-[#7C2D37] uppercase mt-1">
              BÀI: {khbd.info.lessonTitle}
            </div>
            <div className="text-sm italic text-stone-600 mt-1 font-serif">
              Môn học: {khbd.info.subject} - {khbd.info.grade} | Bộ sách: {khbd.info.textbook}
            </div>
            <div className="text-xs italic text-stone-500 mt-0.5">
              Thời lượng thực hiện: {khbd.info.periods} | {khbd.info.academicYear}
            </div>
          </div>

          {/* I. Mục tiêu */}
          <section className="mb-8">
            <h3 className="text-base font-bold font-serif uppercase border-b border-stone-200 pb-1.5 mb-3 text-stone-900">
              I. MỤC TIÊU DẠY HỌC
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-bold text-stone-900 mb-1">1. Về kiến thức:</h4>
                <ul className="list-disc pl-6 space-y-1 text-stone-800 text-xs">
                  {khbd.objectives.knowledge.map((k, idx) => (
                    <li key={idx}>{k}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 mb-1">2. Về năng lực:</h4>
                <div className="pl-4 space-y-1.5 text-xs text-stone-800">
                  <p className="font-semibold text-stone-900">a) Năng lực chung:</p>
                  <ul className="list-disc pl-5 space-y-0.5 text-stone-700">
                    <li><span className="font-medium text-stone-900">Tự chủ & tự học:</span> {khbd.objectives.generalCompetencies.selfControl}</li>
                    <li><span className="font-medium text-stone-900">Giao tiếp & hợp tác:</span> {khbd.objectives.generalCompetencies.communication}</li>
                    <li><span className="font-medium text-stone-900">Giải quyết vấn đề:</span> {khbd.objectives.generalCompetencies.problemSolving}</li>
                  </ul>
                  <p className="font-semibold text-stone-900 pt-1">b) Năng lực đặc thù Ngữ văn:</p>
                  <ul className="list-disc pl-5 space-y-0.5 text-stone-700">
                    {khbd.objectives.specializedCompetencies.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 mb-1">3. Về phẩm chất:</h4>
                <ul className="list-disc pl-6 space-y-1 text-stone-700 text-xs">
                  {khbd.objectives.qualities.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* II. Thiết bị */}
          <section className="mb-8">
            <h3 className="text-base font-bold font-serif uppercase border-b border-stone-200 pb-1.5 mb-3 text-stone-900">
              II. THIẾT BỊ VÀ HỌC LIỆU
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1">1. Giáo viên:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-stone-700">
                  {khbd.equipment.teacher.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1">2. Học sinh:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-stone-700">
                  {khbd.equipment.student.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          </section>

          {/* III. Tiến trình 4 bước */}
          <section className="mb-8">
            <h3 className="text-base font-bold font-serif uppercase border-b border-stone-200 pb-1.5 mb-4 text-stone-900">
              III. TIẾN TRÌNH DẠY HỌC (CHUẨN 4 HOẠT ĐỘNG CÔNG VĂN 5512)
            </h3>
            <div className="space-y-6">
              {khbd.activities.map((act, idx) => (
                <div key={act.id} className="p-4 rounded-xl border border-stone-200 bg-white">
                  <h4 className="font-bold text-sm text-stone-900 mb-2">
                    {act.name} <span className="font-normal italic text-xs text-stone-500">({act.time})</span>
                  </h4>
                  <div className="text-xs space-y-1 mb-3">
                    <p><span className="font-semibold text-stone-800">a) Mục tiêu:</span> {act.objective}</p>
                    <p><span className="font-semibold text-stone-800">b) Nội dung:</span> {act.content}</p>
                    <p><span className="font-semibold text-stone-800">c) Sản phẩm:</span> {act.product}</p>
                  </div>

                  <table className="w-full text-xs border border-stone-300">
                    <thead>
                      <tr className="bg-stone-100 font-bold border-b border-stone-300">
                        <th className="py-1.5 px-3 text-left w-1/4 border-r border-stone-300">Tiến trình</th>
                        <th className="py-1.5 px-3 text-left">Hoạt động của GV & HS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      <tr>
                        <td className="py-2 px-3 font-semibold text-[#7C2D37] border-r border-stone-200 align-top">Bước 1: Chuyển giao</td>
                        <td className="py-2 px-3 text-stone-800">{act.steps.step1}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-[#7C2D37] border-r border-stone-200 align-top">Bước 2: Thực hiện</td>
                        <td className="py-2 px-3 text-stone-800">{act.steps.step2}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-[#7C2D37] border-r border-stone-200 align-top">Bước 3: Báo cáo</td>
                        <td className="py-2 px-3 text-stone-800">{act.steps.step3}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-[#7C2D37] border-r border-stone-200 align-top">Bước 4: Nhận định</td>
                        <td className="py-2 px-3 text-stone-800">{act.steps.step4}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>

          {/* Ký tên */}
          <div className="grid grid-cols-2 gap-4 pt-10 text-center font-serif text-sm">
            <div>
              <p className="font-bold uppercase text-stone-800">TỔ TRƯỞNG CHUYÊN MÔN</p>
              <p className="italic text-xs text-stone-500">(Ký và ghi rõ họ tên)</p>
            </div>
            <div>
              <p className="font-bold uppercase text-stone-800">GIÁO VIÊN SOẠN BÀI</p>
              <p className="italic text-xs text-stone-500">(Ký và ghi rõ họ tên)</p>
              <div className="h-16"></div>
              <p className="font-bold text-stone-900">{khbd.info.teacherName}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
