import React, { useState } from 'react';
import { 
  GraduationCap, 
  Plus, 
  Trash2, 
  Download, 
  Calculator, 
  FileText, 
  CheckCircle2, 
  Edit3, 
  Sparkles,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { RubricData, RubricCriterion } from '../../types';
import { exportDocxRubric, exportRubricDoc } from '../../utils/exportUtils';
import { normalizeVietnamese } from '../../utils/unicode';

interface RubricBuilderViewProps {
  rubric: RubricData;
  setRubric: React.Dispatch<React.SetStateAction<RubricData>>;
}

export const RubricBuilderView: React.FC<RubricBuilderViewProps> = ({ rubric, setRubric }) => {
  const [editingCriterionId, setEditingCriterionId] = useState<string | null>(null);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

  // Auto calculate total points
  const calculatedTotal = rubric.criteria.reduce((sum, c) => sum + (c.maxPoints || 0), 0);

  const handleUpdateCriterion = (id: string, updated: Partial<RubricCriterion>) => {
    const sanitizedUpdated = { ...updated };
    if (sanitizedUpdated.name) sanitizedUpdated.name = normalizeVietnamese(sanitizedUpdated.name);
    if (sanitizedUpdated.description) sanitizedUpdated.description = normalizeVietnamese(sanitizedUpdated.description);

    setRubric({
      ...rubric,
      criteria: rubric.criteria.map(c => c.id === id ? { ...c, ...sanitizedUpdated } : c)
    });
  };

  const handleAddCriterion = () => {
    const newCrit: RubricCriterion = {
      id: `crit-${Date.now()}`,
      name: `Tiêu chí mới ${rubric.criteria.length + 1}`,
      weight: 10,
      maxPoints: 1.0,
      description: 'Mô tả yêu cầu cần đạt của học sinh...',
      levels: [
        { label: 'Xuất sắc', score: 1.0, descriptor: 'Đạt yêu cầu ở mức độ toàn diện, sáng tạo vượt trội.' },
        { label: 'Đạt', score: 0.75, descriptor: 'Đạt yêu cầu cơ bản, diễn đạt rõ ràng.' },
        { label: 'Cần cố gắng', score: 0.25, descriptor: 'Chưa đáp ứng đầy đủ yêu cầu hoặc mắc nhiều lỗi.' }
      ]
    };

    setRubric({
      ...rubric,
      criteria: [...rubric.criteria, newCrit]
    });
    setEditingCriterionId(newCrit.id);
  };

  const handleDeleteCriterion = (id: string) => {
    if (rubric.criteria.length <= 1) return;
    setRubric({
      ...rubric,
      criteria: rubric.criteria.filter(c => c.id !== id)
    });
  };

  return (
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6 space-y-3 overflow-hidden">
      {/* Header Bar (shrink-0) */}
      <div className="bg-white p-3.5 md:p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-metadata font-semibold bg-[#7C2D37]/10 text-[#7C2D37] border border-[#7C2D37]/20 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              Rubric Đánh giá Năng lực Ngữ văn
            </span>
            <span className="text-metadata text-stone-500 font-medium hidden sm:inline">Chuẩn GDPT 2018</span>
          </div>
          <h1 className="text-section md:text-page-title font-semibold text-stone-900 mt-1 leading-[1.3]">
            Rubric Builder Chấm Câu hỏi Tự luận & Bài viết
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAddCriterion}
            className="btn-primary min-h-[36px] px-3 py-1.5 bg-[#7C2D37] hover:bg-[#68232D] text-white rounded-xl text-metadata font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm tiêu chí</span>
          </button>
          <div className="relative">
            <button
              onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
              className="btn-secondary min-h-[36px] px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-metadata font-semibold flex items-center gap-1.5 border border-stone-300 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Rubric (.docx)</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isExportDropdownOpen && (
              <div className="absolute right-0 mt-1 w-60 bg-white border border-stone-200 rounded-xl shadow-lg py-1 z-50">
                <button
                  onClick={() => {
                    exportDocxRubric(rubric);
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-body-ui text-stone-900 hover:bg-stone-50 flex items-center gap-2 font-medium"
                >
                  <FileText className="w-4 h-4 text-[#7C2D37]" />
                  <div>
                    <div>Xuất Rubric (.docx) — Chuẩn</div>
                    <div className="text-[11px] text-stone-500">Chuẩn OpenXML Barem đánh giá A4</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    exportRubricDoc(rubric);
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-body-ui text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-stone-400" />
                  <div>
                    <div>Xuất Rubric (.doc cũ)</div>
                    <div className="text-[11px] text-stone-500">Định dạng HTML Blob tương thích cũ</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auto Total Score Calculator Ribbon (shrink-0) */}
      <div className="p-3 md:p-3.5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-800 to-[#3C1D25] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
            <Calculator className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-metadata text-stone-400">Tổng điểm Rubric:</span>
            <span className="text-lg md:text-xl font-bold text-amber-400 tabular-nums">
              {calculatedTotal.toFixed(1)} / 10.0 điểm
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-metadata text-stone-300">
          <span className="px-2 py-0.5 rounded-lg bg-white/10 border border-white/20 tabular-nums">
            {rubric.criteria.length} Tiêu chí
          </span>
          <span className="text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Tự động cân bằng biểu điểm
          </span>
        </div>
      </div>

      {/* Editable Rubric Table (Rule 29.17) */}
      <div className="flex-1 min-h-0 bg-white rounded-2xl border border-stone-200 shadow-xs overflow-auto table-scroll">
        <table className="w-full text-metadata border-collapse">
          <thead>
            <tr className="bg-stone-100 text-stone-800 font-semibold border-b border-stone-200">
              <th className="py-2.5 px-4 text-left w-1/4 sticky top-0 bg-stone-100 z-10 shadow-xs">Tiêu chí đánh giá</th>
              <th className="py-2.5 px-3 text-center w-20 sticky top-0 bg-stone-100 z-10 shadow-xs">Trọng số</th>
              <th className="py-2.5 px-3 text-center w-24 sticky top-0 bg-stone-100 z-10 shadow-xs">Điểm tối đa</th>
              <th className="py-2.5 px-4 text-left sticky top-0 bg-stone-100 z-10 shadow-xs">Mô tả mức độ đạt được (Levels of Achievement)</th>
              <th className="py-2.5 px-3 text-center w-16 sticky top-0 bg-stone-100 z-10 shadow-xs">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 text-stone-700">
            {rubric.criteria.map((c) => {
              const isEditing = editingCriterionId === c.id;
              return (
                <tr key={c.id} className="hover:bg-stone-50/50 transition">
                  <td className="py-3 px-4 align-top">
                    {isEditing ? (
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          value={c.name}
                          onChange={(e) => handleUpdateCriterion(c.id, { name: e.target.value })}
                          className="w-full p-2 min-h-[36px] font-semibold text-card-title border border-stone-300 rounded-md"
                        />
                        <textarea
                          rows={2}
                          value={c.description}
                          onChange={(e) => handleUpdateCriterion(c.id, { description: e.target.value })}
                          className="w-full p-2 text-metadata border border-stone-300 rounded-md"
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="font-semibold text-card-title text-stone-900">{c.name}</div>
                        <p className="text-metadata text-stone-500 mt-0.5 leading-relaxed">{c.description}</p>
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-3 text-center align-top">
                    {isEditing ? (
                      <input
                        type="number"
                        value={c.weight}
                        onChange={(e) => handleUpdateCriterion(c.id, { weight: Number(e.target.value) })}
                        className="w-14 p-1 min-h-[34px] text-center tabular-nums text-metadata border border-stone-300 rounded"
                      />
                    ) : (
                      <span className="tabular-nums font-medium text-stone-600 text-metadata">{c.weight}%</span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-center align-top">
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.25"
                        value={c.maxPoints}
                        onChange={(e) => handleUpdateCriterion(c.id, { maxPoints: parseFloat(e.target.value) || 0 })}
                        className="w-16 p-1 min-h-[34px] text-center tabular-nums font-semibold text-[#7C2D37] border border-stone-300 rounded text-metadata"
                      />
                    ) : (
                      <span className="tabular-nums font-semibold text-[#7C2D37] text-body-ui">{c.maxPoints} đ</span>
                    )}
                  </td>

                  <td className="py-3 px-4 align-top">
                    <div className="space-y-2">
                      {c.levels.map((lvl, lIdx) => (
                        <div key={lIdx} className="text-metadata">
                          <span className="font-semibold text-stone-900 bg-stone-100 px-2 py-0.5 rounded text-metadata mr-1.5 tabular-nums">
                            {lvl.label} ({lvl.score} đ)
                          </span>
                          <span className="text-stone-700">{lvl.descriptor}</span>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="py-3 px-3 text-center align-top">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setEditingCriterionId(isEditing ? null : c.id)}
                        className="p-1.5 min-h-[32px] min-w-[32px] flex items-center justify-center text-stone-400 hover:text-stone-700 rounded hover:bg-stone-100 transition"
                        title={isEditing ? 'Lưu' : 'Sửa'}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      {rubric.criteria.length > 1 && (
                        <button
                          onClick={() => handleDeleteCriterion(c.id)}
                          className="p-1.5 min-h-[32px] min-w-[32px] flex items-center justify-center text-stone-400 hover:text-red-600 rounded hover:bg-red-50 transition"
                          title="Xóa tiêu chí"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
