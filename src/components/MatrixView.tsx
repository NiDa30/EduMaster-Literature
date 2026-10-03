import React from 'react';
import { 
  Grid3X3, 
  Printer, 
  FileSpreadsheet, 
  BookOpen, 
  Sparkles,
  Award
} from 'lucide-react';
import { Exam7991Data, LessonPlan5512 } from '../types';

interface MatrixViewProps {
  exam: Exam7991Data;
  khbd: LessonPlan5512;
}

export const MatrixView: React.FC<MatrixViewProps> = ({ exam, khbd }) => {
  const [activeMatrixTab, setActiveMatrixTab] = React.useState<'matrix_table' | 'spec_table'>('matrix_table');

  return (
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6 space-y-3 overflow-hidden">
      {/* Top Banner (shrink-0) */}
      <div className="bg-white p-3.5 md:p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
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
        <div className="flex items-center gap-2 shrink-0">
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
            onClick={() => window.print()}
            className="btn-secondary min-h-[36px] px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-metadata font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">In A4</span>
          </button>
        </div>
      </div>

      {/* Visual Percentage Distribution Ribbon (shrink-0) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
        <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-metadata font-semibold text-stone-700">Mức 1: Nhận biết</span>
            <span className="text-metadata font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded tabular-nums">40% (4.0 đ)</span>
          </div>
          <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-1.5">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '40%' }}></div>
          </div>
          <p className="text-xs text-stone-600 leading-snug line-clamp-1 font-serif">
            Nhận diện thể thơ, tác giả, phương thức biểu đạt, từ ngữ, hình ảnh và tu từ.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-metadata font-semibold text-stone-700">Mức 2: Thông hiểu</span>
            <span className="text-metadata font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded tabular-nums">30% (3.0 đ)</span>
          </div>
          <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-1.5">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: '30%' }}></div>
          </div>
          <p className="text-xs text-stone-600 leading-snug line-clamp-1 font-serif">
            Giải thích ý nghĩa từ ngữ, phân tích tác dụng biện pháp nghệ thuật, chọn Đúng/Sai.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-metadata font-semibold text-stone-700">Mức 3: Vận dụng</span>
            <span className="text-metadata font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded tabular-nums">30% (3.0 đ)</span>
          </div>
          <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-1.5">
            <div className="bg-amber-600 h-full rounded-full" style={{ width: '30%' }}></div>
          </div>
          <p className="text-xs text-stone-600 leading-snug line-clamp-1 font-serif">
            Cảm thụ vẻ đẹp hình tượng, viết đoạn văn nghị luận kết nối đời sống thực tiễn.
          </p>
        </div>
      </div>

      {/* Tabbed Table Container (Rule 29.12) */}
      <div className="flex-1 min-h-0 bg-white rounded-2xl border border-stone-200 p-4 shadow-xs overflow-auto table-scroll">
        {activeMatrixTab === 'matrix_table' ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-card-title text-stone-900 flex items-center gap-2">
                <Grid3X3 className="w-4 h-4 text-purple-700" />
                Khung Ma trận Đề kiểm tra Định kỳ môn Ngữ văn (CV 7991)
              </h3>
              <span className="text-metadata tabular-nums font-semibold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-lg">
                Tổng: 10.0 đ · Tỉ lệ 4:3:3
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
                    Nhận biết (40%)
                  </th>
                  <th colSpan={3} className="py-2 px-3 text-center border-r border-stone-300 bg-emerald-50/80 text-emerald-950 sticky top-0 z-10">
                    Thông hiểu (30%)
                  </th>
                  <th colSpan={3} className="py-2 px-3 text-center border-r border-stone-300 bg-amber-50/80 text-amber-950 sticky top-0 z-10">
                    Vận dụng (30%)
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
                    Đọc hiểu Thơ / Văn xuôi ({khbd.info.lessonTitle})
                  </td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums">8 câu (2.0 đ)</td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums text-stone-400">-</td>
                  <td className="py-3 px-2 text-center border-r border-stone-300 tabular-nums text-stone-400">-</td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums">4 câu (1.0 đ)</td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums">1 câu (1.0 đ)</td>
                  <td className="py-3 px-2 text-center border-r border-stone-300 tabular-nums">2 câu (1.0 đ)</td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums">1 câu (1.0 đ)</td>
                  <td className="py-3 px-2 text-center border-r border-stone-200 tabular-nums">2 câu (1.0 đ)</td>
                  <td className="py-3 px-2 text-center border-r border-stone-300 tabular-nums font-semibold text-amber-800">1 câu (3.0 đ)</td>
                  <td className="py-3 px-3 text-center font-semibold border-r border-stone-200 tabular-nums">19 câu</td>
                  <td className="py-3 px-3 text-center font-semibold text-[#7C2D37] border-r border-stone-200 tabular-nums">10.0 đ</td>
                  <td className="py-3 px-3 text-center font-semibold text-emerald-700 tabular-nums">100%</td>
                </tr>
                <tr className="bg-stone-100 font-semibold text-stone-900">
                  <td colSpan={2} className="py-3 px-4 text-right border-r border-stone-300">
                    Tổng hợp theo mức độ
                  </td>
                  <td colSpan={3} className="py-3 px-3 text-center border-r border-stone-300 text-blue-700 tabular-nums">
                    4.0 điểm (40%)
                  </td>
                  <td colSpan={3} className="py-3 px-3 text-center border-r border-stone-300 text-emerald-700 tabular-nums">
                    3.0 điểm (30%)
                  </td>
                  <td colSpan={3} className="py-3 px-3 text-center border-r border-stone-300 text-amber-700 tabular-nums">
                    3.0 điểm (30%)
                  </td>
                  <td className="py-3 px-3 text-center border-r border-stone-300 tabular-nums">19 câu</td>
                  <td className="py-3 px-3 text-center text-[#7C2D37] border-r border-stone-300 tabular-nums">10.0 điểm</td>
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
                    Đọc hiểu Thơ trữ tình
                  </td>
                  <td className="py-3 px-4 border-r border-stone-200 leading-relaxed font-serif text-body-ui">
                    <p><strong>Nhận biết:</strong> Xác định thể thơ, hình ảnh, từ ngữ, nhân hóa trong câu "súng ngửi trời".</p>
                    <p className="mt-1"><strong>Thông hiểu:</strong> Giải thích ý nghĩa hình ảnh "dáng kiều thơm", phân tích cảm hứng bi tráng.</p>
                    <p className="mt-1"><strong>Vận dụng:</strong> Rút ra thông điệp về lý tưởng sống hiến dâng của thanh niên.</p>
                  </td>
                  <td className="py-3 px-3 text-center tabular-nums">
                    Phần I (Câu 1 - 12)<br/>
                    Phần II (Câu 1, 2)<br/>
                    Phần III (Câu 1 - 4)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 text-center font-semibold border-r border-stone-200 tabular-nums">2</td>
                  <td className="py-3 px-4 font-medium text-stone-900 border-r border-stone-200 font-serif">
                    Viết Nghị luận Văn học
                  </td>
                  <td className="py-3 px-4 border-r border-stone-200 leading-relaxed font-serif text-body-ui">
                    <p><strong>Vận dụng:</strong> Cảm nhận vẻ đẹp bi tráng của bức tượng đài người lính Tây Tiến qua 8 câu thơ; nhận xét thái độ tác giả Quang Dũng đối với đồng đội.</p>
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-amber-800 tabular-nums">
                    Phần IV (Câu 1 Tự luận - 3.0 đ)
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
