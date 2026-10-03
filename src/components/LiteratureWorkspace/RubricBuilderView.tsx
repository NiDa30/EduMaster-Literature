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
  HelpCircle
} from 'lucide-react';
import { RubricData, RubricCriterion } from '../../types';
import { exportRubricDoc } from '../../utils/exportUtils';

interface RubricBuilderViewProps {
  rubric: RubricData;
  setRubric: React.Dispatch<React.SetStateAction<RubricData>>;
}

export const RubricBuilderView: React.FC<RubricBuilderViewProps> = ({ rubric, setRubric }) => {
  const [editingCriterionId, setEditingCriterionId] = useState<string | null>(null);

  // Auto calculate total points
  const calculatedTotal = rubric.criteria.reduce((sum, c) => sum + (c.maxPoints || 0), 0);

  const handleUpdateCriterion = (id: string, updated: Partial<RubricCriterion>) => {
    setRubric({
      ...rubric,
      criteria: rubric.criteria.map(c => c.id === id ? { ...c, ...updated } : c)
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
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#7C2D37]/10 text-[#7C2D37] border border-[#7C2D37]/20 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              Rubric Đánh giá Năng lực Ngữ văn
            </span>
            <span className="text-xs text-stone-500 font-medium">Chuẩn GDPT 2018</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-stone-900 mt-1">
            Rubric Builder Chấm Câu hỏi Tự luận & Bài viết
          </h1>
          <p className="text-sm text-stone-600">
            Minh bạch hóa tiêu chí chấm: Xác định vấn đề, Bố cục, Luận điểm, Dẫn chứng, Phân tích nghệ thuật, Diễn đạt và Sáng tạo.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleAddCriterion}
            className="px-3.5 py-2 bg-[#7C2D37] hover:bg-[#68232D] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm tiêu chí</span>
          </button>
          <button
            onClick={() => exportRubricDoc(rubric)}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-stone-300 transition"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Rubric (.doc)</span>
          </button>
        </div>
      </div>

      {/* Auto Total Score Calculator Ribbon */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-800 to-[#3C1D25] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-stone-400 font-mono">TỔNG ĐIỂM RUBRIC ĐÃ THIẾT KẾ:</div>
            <div className="text-xl md:text-2xl font-black text-amber-400">
              {calculatedTotal.toFixed(1)} / 10.0 điểm
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-stone-300">
          <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/20">
            {rubric.criteria.length} Tiêu chí cốt lõi
          </span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Tự động cân bằng biểu điểm
          </span>
        </div>
      </div>

      {/* Editable Rubric Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                <th className="py-3 px-4 text-left w-1/4">Tiêu chí đánh giá</th>
                <th className="py-3 px-3 text-center w-20">Trọng số</th>
                <th className="py-3 px-3 text-center w-24">Điểm tối đa</th>
                <th className="py-3 px-4 text-left">Mô tả mức độ đạt được (Levels of Achievement)</th>
                <th className="py-3 px-3 text-center w-16">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-700">
              {rubric.criteria.map((c, idx) => {
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
                            className="w-full p-1.5 font-bold text-xs border border-stone-300 rounded-md"
                          />
                          <textarea
                            rows={2}
                            value={c.description}
                            onChange={(e) => handleUpdateCriterion(c.id, { description: e.target.value })}
                            className="w-full p-1.5 text-[11px] border border-stone-300 rounded-md"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="font-bold text-sm text-stone-900">{c.name}</div>
                          <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{c.description}</p>
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-3 text-center align-top">
                      {isEditing ? (
                        <input
                          type="number"
                          value={c.weight}
                          onChange={(e) => handleUpdateCriterion(c.id, { weight: Number(e.target.value) })}
                          className="w-14 p-1 text-center font-mono border border-stone-300 rounded"
                        />
                      ) : (
                        <span className="font-mono font-semibold text-stone-600">{c.weight}%</span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-center align-top">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.25"
                          value={c.maxPoints}
                          onChange={(e) => handleUpdateCriterion(c.id, { maxPoints: parseFloat(e.target.value) || 0 })}
                          className="w-16 p-1 text-center font-mono font-bold text-[#7C2D37] border border-stone-300 rounded"
                        />
                      ) : (
                        <span className="font-mono font-bold text-[#7C2D37] text-sm">{c.maxPoints} đ</span>
                      )}
                    </td>

                    <td className="py-3 px-4 align-top">
                      <div className="space-y-2">
                        {c.levels.map((lvl, lIdx) => (
                          <div key={lIdx} className="text-xs">
                            <span className="font-semibold text-stone-900 bg-stone-100 px-1.5 py-0.5 rounded text-[10px] mr-1.5">
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
                          className="p-1 text-stone-400 hover:text-stone-700 rounded hover:bg-stone-100"
                          title={isEditing ? 'Lưu' : 'Sửa'}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        {rubric.criteria.length > 1 && (
                          <button
                            onClick={() => handleDeleteCriterion(c.id)}
                            className="p-1 text-stone-400 hover:text-red-600 rounded hover:bg-red-50"
                            title="Xóa tiêu chí"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
    </div>
  );
};
