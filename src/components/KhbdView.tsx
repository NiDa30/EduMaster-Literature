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
import { exportDocxKHBD, exportWordKHBD } from '../utils/exportUtils';
import { normalizeVietnamese } from '../utils/unicode';

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
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

  const handleUpdateActivity = (actId: string, updated: Partial<TeachingActivity>) => {
    const sanitizedUpdated = { ...updated };
    if (sanitizedUpdated.name) sanitizedUpdated.name = normalizeVietnamese(sanitizedUpdated.name);
    if (sanitizedUpdated.objective) sanitizedUpdated.objective = normalizeVietnamese(sanitizedUpdated.objective);
    if (sanitizedUpdated.content) sanitizedUpdated.content = normalizeVietnamese(sanitizedUpdated.content);
    if (sanitizedUpdated.product) sanitizedUpdated.product = normalizeVietnamese(sanitizedUpdated.product);
    if (sanitizedUpdated.method) sanitizedUpdated.method = normalizeVietnamese(sanitizedUpdated.method);
    if (sanitizedUpdated.tools) sanitizedUpdated.tools = normalizeVietnamese(sanitizedUpdated.tools);

    setKhbd({
      ...khbd,
      activities: khbd.activities.map(act => act.id === actId ? { ...act, ...sanitizedUpdated } : act)
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
      case 'warmup': return 'bg-amber-50 text-amber-900 border-amber-200/60';
      case 'knowledge': return 'bg-sky-50 text-sky-900 border-sky-200/60';
      case 'practice': return 'bg-emerald-50 text-emerald-900 border-emerald-200/60';
      case 'application': return 'bg-[#FCF3F4] text-[#7A2938] border-[#7A2938]/20';
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
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6 space-y-3 overflow-hidden">
      {/* Top Banner & Control Bar (shrink-0) */}
      <div className="bg-white p-3.5 md:p-4 rounded-2xl border border-[#E5E0DA] shadow-[var(--shadow-xs)] flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0 no-print">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-metadata font-semibold bg-[#FCF3F4] text-[#7A2938] border border-[#7A2938]/15 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              Công văn 5512/BGDĐT-GDTrH
            </span>
            <span className="text-metadata text-[#706A65] font-medium hidden sm:inline">Quy chuẩn Thiết kế KHBD môn Ngữ văn</span>
          </div>
          <h1 className="text-section md:text-page-title font-semibold text-[#211E1C] mt-1 leading-[1.3]">
            Visual Lesson Builder (Kế hoạch bài dạy 5512)
          </h1>
        </div>

        {/* View Switcher & Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-[#F5F3F0] p-1 rounded-xl border border-[#E5E0DA] flex text-metadata font-semibold">
            <button
              onClick={() => setViewMode('visual_builder')}
              className={`min-h-[36px] px-3.5 py-1 rounded-lg flex items-center gap-1.5 motion-surface ${
                viewMode === 'visual_builder'
                  ? 'bg-white text-[#211E1C] shadow-[var(--shadow-xs)]'
                  : 'text-[#706A65] hover:text-[#211E1C]'
              }`}
            >
              <Layers className={`w-3.5 h-3.5 ${viewMode === 'visual_builder' ? 'text-[#7A2938]' : 'text-[#706A65]'}`} />
              <span>Visual Builder</span>
            </button>
            <button
              data-tour-id="khbd-document-view"
              onClick={() => setViewMode('document')}
              className={`min-h-[36px] px-3.5 py-1 rounded-lg flex items-center gap-1.5 motion-surface ${
                viewMode === 'document'
                  ? 'bg-white text-[#211E1C] shadow-[var(--shadow-xs)]'
                  : 'text-[#706A65] hover:text-[#211E1C]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Văn bản in A4</span>
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
              className="btn-primary min-h-[36px] px-3.5 py-1.5 rounded-xl text-metadata font-semibold flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Word (.docx)</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {isExportDropdownOpen && (
              <div className="absolute right-0 mt-1 w-60 bg-white border border-[#E5E0DA] rounded-xl shadow-[var(--shadow-md)] py-1 z-50 anim-dropdown">
                <button
                  onClick={() => {
                    exportDocxKHBD(khbd);
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-body-ui text-[#211E1C] hover:bg-[#FAF9F7] flex items-center gap-2 font-medium transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#7A2938]" />
                  <div>
                    <div>Xuất Word (.docx) — Chuẩn</div>
                    <div className="text-[11px] text-[#706A65]">Chuẩn OpenXML 5512, căn lề A4</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    exportWordKHBD(khbd);
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-body-ui text-[#706A65] hover:bg-[#FAF9F7] flex items-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#99918A]" />
                  <div>
                    <div>Xuất Word (.doc cũ)</div>
                    <div className="text-[11px] text-[#99918A]">Định dạng HTML Blob tương thích cũ</div>
                  </div>
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => window.print()}
            className="btn-secondary min-h-[36px] px-3.5 py-1.5 rounded-xl text-metadata font-semibold flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-[#706A65]" />
            <span className="hidden sm:inline">In A4</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. VISUAL LESSON BUILDER TIMELINE MODE */}
      {/* ========================================================================= */}
      {viewMode === 'visual_builder' ? (
        <div data-tour-id="khbd-builder" className="flex-1 min-h-0 flex flex-col space-y-3 overflow-hidden anim-tab-content">
          {/* Visual Timeline Steps Ribbon (shrink-0) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 shrink-0">
            {[
              { num: '01', title: 'Khởi động', desc: 'Tạo tâm thế & gợi mở', borderClass: 'border-l-4 border-l-amber-500' },
              { num: '02', title: 'Kiến thức mới', desc: 'Đọc hiểu & Khám phá', borderClass: 'border-l-4 border-l-sky-600' },
              { num: '03', title: 'Luyện tập', desc: 'Củng cố & Thực hành', borderClass: 'border-l-4 border-l-emerald-600' },
              { num: '04', title: 'Vận dụng', desc: 'Chiêm nghiệm & Sáng tạo', borderClass: 'border-l-4 border-l-[#7A2938]' }
            ].map((step, sIdx) => (
              <div key={sIdx} className={`p-3 rounded-xl bg-white border border-[#E5E0DA] shadow-[var(--shadow-xs)] ${step.borderClass}`}>
                <div className="tabular-nums text-xs font-semibold text-[#706A65]">Giai đoạn {step.num}</div>
                <div className="font-semibold text-card-title text-[#211E1C] mt-0.5">{step.title}</div>
                <div className="text-xs text-[#706A65] mt-0.5 line-clamp-1">{step.desc}</div>
              </div>
            ))}
          </div>

          {/* Scrollable Lesson Builder Body */}
          <div className="flex-1 min-h-0 overflow-y-auto panel-scroll space-y-3 pr-1">

          {/* Lesson Objectives Collapsible Card */}
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-[#E5E0DA] shadow-[var(--shadow-xs)] space-y-4">
            <h3 className="font-semibold text-card-title text-[#211E1C] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#FCF3F4] text-[#7A2938] border border-[#7A2938]/15 flex items-center justify-center text-metadata font-bold">I</span>
              Mục tiêu Dạy học & Năng lực cần đạt (YCCĐ)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-metadata">
              <div className="p-3.5 rounded-xl bg-[#FAF9F7] border border-[#E5E0DA]">
                <span className="font-semibold text-[#211E1C] block mb-1">1. Về Kiến thức:</span>
                <ul className="list-disc pl-4 space-y-1 text-[#302C29] leading-relaxed">
                  {khbd.objectives.knowledge.map((k, i) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F7] border border-[#E5E0DA]">
                <span className="font-semibold text-[#211E1C] block mb-1">2. Năng lực đặc thù Ngữ văn:</span>
                <ul className="list-disc pl-4 space-y-1 text-[#302C29] leading-relaxed">
                  {khbd.objectives.specializedCompetencies.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F7] border border-[#E5E0DA]">
                <span className="font-semibold text-[#211E1C] block mb-1">3. Phẩm chất chủ yếu:</span>
                <ul className="list-disc pl-4 space-y-1 text-[#302C29] leading-relaxed">
                  {khbd.objectives.qualities.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Activities List */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-semibold text-card-title text-[#211E1C] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FCF3F4] text-[#7A2938] border border-[#7A2938]/15 flex items-center justify-center text-metadata font-bold">III</span>
                Tiến trình 4 Hoạt động Dạy học
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExpandedActivity(null)}
                  className="btn-secondary min-h-[32px] px-2.5 py-1 text-metadata font-medium rounded-lg"
                >
                  Thu gọn tất cả
                </button>
                <button
                  onClick={() => setExpandedActivity(khbd.activities[0]?.id || null)}
                  className="btn-secondary min-h-[32px] px-2.5 py-1 text-metadata font-medium rounded-lg"
                >
                  Mở hoạt động đầu
                </button>
                <button
                  onClick={handleAddActivity}
                  className="btn-primary min-h-[32px] px-3 py-1 rounded-xl font-semibold text-metadata flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm hoạt động</span>
                </button>
              </div>
            </div>

            {khbd.activities.map((act, index) => {
              const isExpanded = expandedActivity === act.id;
              return (
                <div
                  key={act.id}
                  className={`bg-white rounded-2xl border motion-surface ${
                    isExpanded ? 'border-[#7A2938]/60 shadow-[var(--shadow-sm)]' : 'border-[#E5E0DA] shadow-[var(--shadow-xs)] hover:border-[#D6D0C8]'
                  }`}
                >
                  {/* Activity Card Header Bar */}
                  <div
                    onClick={() => setExpandedActivity(isExpanded ? null : act.id)}
                    className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-xl font-semibold text-metadata flex items-center justify-center tabular-nums shrink-0 transition-colors ${
                        isExpanded ? 'bg-[#7A2938] text-white shadow-xs' : 'bg-[#F5F3F0] text-[#302C29]'
                      }`}>
                        0{index + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-metadata font-medium px-2.5 py-0.5 rounded-full border ${getActivityTypeBadge(act.type)}`}>
                            {getActivityTypeLabel(act.type)}
                          </span>
                          <span className="text-metadata text-[#706A65] flex items-center gap-1 tabular-nums">
                            <Clock className="w-3 h-3" /> {act.time}
                          </span>
                        </div>
                        <h4 className="font-semibold text-card-title text-[#211E1C] mt-0.5">
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
                        className="min-h-[32px] px-2.5 py-1 bg-amber-50/70 hover:bg-amber-100/80 text-amber-900 border border-amber-200/60 rounded-lg text-metadata font-medium flex items-center gap-1 transition-colors"
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
                          className="p-1.5 text-[#706A65] hover:text-[#B91C1C] rounded-lg hover:bg-rose-50 transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center"
                          title="Xóa hoạt động"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      <ChevronDown className={`w-5 h-5 text-[#706A65] anim-accordion-chevron ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
                    </div>
                  </div>

                  {/* Expanded Content Details */}
                  {isExpanded && (
                    <div className="p-5 border-t border-[#E5E0DA] bg-[#FAF9F7] space-y-4 anim-tab-content">
                      {/* Sub-toolbar: Method, Tools */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-metadata">
                        <div>
                          <label className="block font-medium text-[#302C29] mb-1">Phương pháp dạy học:</label>
                          <input
                            type="text"
                            value={act.method || 'Dạy học hợp tác, đàm thoại gợi mở, giải quyết vấn đề'}
                            onChange={(e) => handleUpdateActivity(act.id, { method: e.target.value })}
                            className="w-full p-2.5 min-h-[40px] bg-white border border-[#E5E0DA] rounded-xl text-body-ui focus:border-[#7A2938] focus:ring-2 focus:ring-[#7A2938]/15"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-[#302C29] mb-1">Công cụ & Học liệu:</label>
                          <input
                            type="text"
                            value={act.tools || 'Phiếu học tập, máy chiếu, bảng phụ, SGK Ngữ văn'}
                            onChange={(e) => handleUpdateActivity(act.id, { tools: e.target.value })}
                            className="w-full p-2.5 min-h-[40px] bg-white border border-[#E5E0DA] rounded-xl text-body-ui focus:border-[#7A2938] focus:ring-2 focus:ring-[#7A2938]/15"
                          />
                        </div>
                      </div>

                      {/* 3 standard 5512 points: objective, content, product */}
                      <div className="space-y-3 text-metadata">
                        <div>
                          <label className="block font-semibold text-[#211E1C] mb-1">a) Mục tiêu:</label>
                          <textarea
                            rows={2}
                            value={act.objective}
                            onChange={(e) => handleUpdateActivity(act.id, { objective: e.target.value })}
                            className="w-full p-2.5 bg-white border border-[#E5E0DA] rounded-xl text-body-ui leading-relaxed focus:border-[#7A2938] focus:ring-2 focus:ring-[#7A2938]/15"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-[#211E1C] mb-1">b) Nội dung:</label>
                          <textarea
                            rows={2}
                            value={act.content}
                            onChange={(e) => handleUpdateActivity(act.id, { content: e.target.value })}
                            className="w-full p-2.5 bg-white border border-[#E5E0DA] rounded-xl text-body-ui leading-relaxed focus:border-[#7A2938] focus:ring-2 focus:ring-[#7A2938]/15"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-[#211E1C] mb-1">c) Sản phẩm:</label>
                          <textarea
                            rows={2}
                            value={act.product}
                            onChange={(e) => handleUpdateActivity(act.id, { product: e.target.value })}
                            className="w-full p-2.5 bg-white border border-[#E5E0DA] rounded-xl text-body-ui leading-relaxed focus:border-[#7A2938] focus:ring-2 focus:ring-[#7A2938]/15"
                          />
                        </div>
                      </div>

                      {/* 4 Standard Steps Table */}
                      <div className="pt-2">
                        <label className="block text-metadata font-semibold text-[#7A2938] mb-2">
                          d) Tổ chức thực hiện (Chuẩn 4 bước Công văn 5512):
                        </label>

                        <div className="space-y-2.5">
                          <div className="p-3 rounded-xl bg-white border border-[#E5E0DA] shadow-[var(--shadow-xs)]">
                            <span className="text-metadata font-semibold text-[#7A2938] block mb-1">
                              Bước 1: Chuyển giao nhiệm vụ
                            </span>
                            <textarea
                              rows={2}
                              value={act.steps.step1}
                              onChange={(e) => handleUpdateActivity(act.id, { steps: { ...act.steps, step1: e.target.value } })}
                              className="w-full text-body-ui p-2.5 border border-[#E5E0DA] rounded-lg leading-relaxed focus:border-[#7A2938] focus:ring-2 focus:ring-[#7A2938]/15"
                            />
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-[#E5E0DA] shadow-[var(--shadow-xs)]">
                            <span className="text-metadata font-semibold text-[#7A2938] block mb-1">
                              Bước 2: Thực hiện nhiệm vụ
                            </span>
                            <textarea
                              rows={2}
                              value={act.steps.step2}
                              onChange={(e) => handleUpdateActivity(act.id, { steps: { ...act.steps, step2: e.target.value } })}
                              className="w-full text-body-ui p-2.5 border border-[#E5E0DA] rounded-lg leading-relaxed focus:border-[#7A2938] focus:ring-2 focus:ring-[#7A2938]/15"
                            />
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-[#E5E0DA] shadow-[var(--shadow-xs)]">
                            <span className="text-metadata font-semibold text-[#7A2938] block mb-1">
                              Bước 3: Báo cáo, thảo luận
                            </span>
                            <textarea
                              rows={2}
                              value={act.steps.step3}
                              onChange={(e) => handleUpdateActivity(act.id, { steps: { ...act.steps, step3: e.target.value } })}
                              className="w-full text-body-ui p-2.5 border border-[#E5E0DA] rounded-lg leading-relaxed focus:border-[#7A2938] focus:ring-2 focus:ring-[#7A2938]/15"
                            />
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-[#E5E0DA] shadow-[var(--shadow-xs)]">
                            <span className="text-metadata font-semibold text-[#7A2938] block mb-1">
                              Bước 4: Kết luận, nhận định
                            </span>
                            <textarea
                              rows={2}
                              value={act.steps.step4}
                              onChange={(e) => handleUpdateActivity(act.id, { steps: { ...act.steps, step4: e.target.value } })}
                              className="w-full text-body-ui p-2.5 border border-[#E5E0DA] rounded-lg leading-relaxed focus:border-[#7A2938] focus:ring-2 focus:ring-[#7A2938]/15"
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
      </div>
      ) : (
        /* ========================================================================= */
        /* 2. OFFICIAL A4 DOCUMENT PRINT VIEW */
        /* ========================================================================= */
        <div className="flex-1 min-h-0 overflow-y-auto panel-scroll p-4 md:p-8 flex justify-center bg-[#F7F6F3] anim-tab-content">
          <div className="bg-white rounded-2xl border border-[#E5E0DA] p-8 md:p-14 shadow-[var(--shadow-paper)] max-w-4xl w-full text-[#211E1C]">
          {/* Header Quốc hiệu */}
          <div className="grid grid-cols-2 gap-4 pb-6 border-b border-[#E5E0DA]">
            <div className="text-center font-serif text-metadata">
              <p className="uppercase text-[#706A65] tracking-normal">{khbd.info.department}</p>
              <p className="font-semibold uppercase text-[#211E1C] tracking-normal">{khbd.info.school}</p>
              <p className="text-metadata text-[#706A65] mt-1">Tổ: <span className="font-semibold">{khbd.info.subjectGroup}</span></p>
              <p className="text-metadata text-[#706A65]">Giáo viên: <span className="font-semibold">{khbd.info.teacherName}</span></p>
            </div>
            <div className="text-center font-serif text-metadata">
              <p className="font-semibold text-[#211E1C] tracking-normal">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
              <p className="font-semibold text-[#211E1C] text-metadata tracking-normal">Độc lập - Tự do - Hạnh phúc</p>
              <p className="text-metadata text-[#99918A] mt-1">---------------</p>
              <p className="italic text-metadata text-[#706A65] mt-1">..., ngày ... tháng ... năm 202...</p>
            </div>
          </div>

          {/* Title KHBD */}
          <div className="text-center my-6">
            <h2 className="text-xl md:text-2xl font-semibold font-serif uppercase tracking-normal text-[#211E1C]">
              KẾ HOẠCH BÀI DẠY
            </h2>
            <div className="text-lg font-semibold font-serif text-[#7A2938] mt-1 tracking-normal">
              BÀI: {khbd.info.lessonTitle}
            </div>
            <div className="text-body-ui italic text-[#706A65] mt-1 font-serif">
              Môn học: {khbd.info.subject} - {khbd.info.grade} | Bộ sách: {khbd.info.textbook}
            </div>
            <div className="text-metadata italic text-[#99918A] mt-0.5 tabular-nums">
              Thời lượng thực hiện: {khbd.info.periods} | {khbd.info.academicYear}
            </div>
          </div>

          {/* I. Mục tiêu */}
          <section className="mb-8">
            <h3 className="text-card-title font-semibold font-serif uppercase tracking-normal border-b border-[#E5E0DA] pb-1.5 mb-3 text-[#211E1C]">
              I. MỤC TIÊU DẠY HỌC
            </h3>
            <div className="space-y-3 text-body-ui">
              <div>
                <h4 className="font-semibold text-stone-900 mb-1 text-body-ui">1. Về kiến thức:</h4>
                <ul className="list-disc pl-6 space-y-1 text-stone-800 text-metadata leading-relaxed">
                  {khbd.objectives.knowledge.map((k, idx) => (
                    <li key={idx}>{k}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-stone-900 mb-1 text-body-ui">2. Về năng lực:</h4>
                <div className="pl-4 space-y-1.5 text-metadata text-stone-800">
                  <p className="font-semibold text-stone-900">a) Năng lực chung:</p>
                  <ul className="list-disc pl-5 space-y-0.5 text-stone-700 leading-relaxed">
                    <li><span className="font-medium text-stone-900">Tự chủ & tự học:</span> {khbd.objectives.generalCompetencies.selfControl}</li>
                    <li><span className="font-medium text-stone-900">Giao tiếp & hợp tác:</span> {khbd.objectives.generalCompetencies.communication}</li>
                    <li><span className="font-medium text-stone-900">Giải quyết vấn đề:</span> {khbd.objectives.generalCompetencies.problemSolving}</li>
                  </ul>
                  <p className="font-semibold text-stone-900 pt-1">b) Năng lực đặc thù Ngữ văn:</p>
                  <ul className="list-disc pl-5 space-y-0.5 text-stone-700 leading-relaxed">
                    {khbd.objectives.specializedCompetencies.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-stone-900 mb-1 text-body-ui">3. Về phẩm chất:</h4>
                <ul className="list-disc pl-6 space-y-1 text-stone-700 text-metadata leading-relaxed">
                  {khbd.objectives.qualities.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* II. Thiết bị */}
          <section className="mb-8">
            <h3 className="text-card-title font-semibold font-serif uppercase tracking-normal border-b border-stone-200 pb-1.5 mb-3 text-stone-900">
              II. THIẾT BỊ VÀ HỌC LIỆU
            </h3>
            <div className="grid grid-cols-2 gap-4 text-metadata">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-semibold text-stone-900 block mb-1">1. Giáo viên:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-stone-700 leading-relaxed">
                  {khbd.equipment.teacher.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-semibold text-stone-900 block mb-1">2. Học sinh:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-stone-700 leading-relaxed">
                  {khbd.equipment.student.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          </section>

          {/* III. Tiến trình 4 bước */}
          <section className="mb-8">
            <h3 className="text-card-title font-semibold font-serif uppercase tracking-normal border-b border-stone-200 pb-1.5 mb-4 text-stone-900">
              III. TIẾN TRÌNH DẠY HỌC (CHUẨN 4 HOẠT ĐỘNG CÔNG VĂN 5512)
            </h3>
            <div className="space-y-6">
              {khbd.activities.map((act) => (
                <div key={act.id} className="p-4 rounded-xl border border-stone-200 bg-white">
                  <h4 className="font-semibold text-card-title text-stone-900 mb-2">
                    {act.name} <span className="font-normal italic text-metadata text-stone-500 tabular-nums">({act.time})</span>
                  </h4>
                  <div className="text-metadata space-y-1 mb-3 leading-relaxed">
                    <p><span className="font-semibold text-stone-800">a) Mục tiêu:</span> {act.objective}</p>
                    <p><span className="font-semibold text-stone-800">b) Nội dung:</span> {act.content}</p>
                    <p><span className="font-semibold text-stone-800">c) Sản phẩm:</span> {act.product}</p>
                  </div>

                  <table className="w-full text-metadata border border-stone-300">
                    <thead>
                      <tr className="bg-stone-100 font-semibold border-b border-stone-300">
                        <th className="py-2 px-3 text-left w-1/4 border-r border-stone-300">Tiến trình</th>
                        <th className="py-2 px-3 text-left">Hoạt động của GV & HS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      <tr>
                        <td className="py-2 px-3 font-semibold text-[#7A2938] border-r border-stone-200 align-top">Bước 1: Chuyển giao</td>
                        <td className="py-2 px-3 text-stone-800 leading-relaxed">{act.steps.step1}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-[#7A2938] border-r border-stone-200 align-top">Bước 2: Thực hiện</td>
                        <td className="py-2 px-3 text-stone-800 leading-relaxed">{act.steps.step2}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-[#7A2938] border-r border-stone-200 align-top">Bước 3: Báo cáo</td>
                        <td className="py-2 px-3 text-stone-800 leading-relaxed">{act.steps.step3}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-[#7A2938] border-r border-stone-200 align-top">Bước 4: Nhận định</td>
                        <td className="py-2 px-3 text-stone-800 leading-relaxed">{act.steps.step4}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>

          {/* Ký tên */}
          <div className="grid grid-cols-2 gap-4 pt-10 text-center font-serif text-metadata">
            <div>
              <p className="font-semibold uppercase text-stone-800 tracking-normal">TỔ TRƯỞNG CHUYÊN MÔN</p>
              <p className="italic text-metadata text-stone-500">(Ký và ghi rõ họ tên)</p>
            </div>
            <div>
              <p className="font-semibold uppercase text-stone-800 tracking-normal">GIÁO VIÊN SOẠN BÀI</p>
              <p className="italic text-metadata text-stone-500">(Ký và ghi rõ họ tên)</p>
              <div className="h-16"></div>
              <p className="font-semibold text-stone-900">{khbd.info.teacherName}</p>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
