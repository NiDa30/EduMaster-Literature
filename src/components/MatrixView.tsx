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
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-900 border border-purple-200">
              Công văn 7991/BGDĐT-GDTrH
            </span>
            <span className="text-xs text-stone-500 font-medium">Bảng Ma trận & Bản đặc tả môn Ngữ văn</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-stone-900 mt-1">
            Ma trận Đề kiểm tra Định kỳ 2 Chiều
          </h1>
          <p className="text-sm text-stone-600">
            Tỉ lệ chuẩn hóa: 40% Nhận biết (4.0 đ) - 30% Thông hiểu (3.0 đ) - 30% Vận dụng (3.0 đ).
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
        >
          <Printer className="w-4 h-4" />
          <span>In Ma trận A4</span>
        </button>
      </div>

      {/* Visual Percentage Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-600 uppercase">Mức 1: Nhận biết</span>
            <span className="text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono">40% (4.0 đ)</span>
          </div>
          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-3">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '40%' }}></div>
          </div>
          <p className="text-xs text-stone-500 leading-relaxed font-serif">
            Nhận diện thể thơ, tác giả, phương thức biểu đạt, từ ngữ, hình ảnh và biện pháp tu từ bề mặt.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-600 uppercase">Mức 2: Thông hiểu</span>
            <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">30% (3.0 đ)</span>
          </div>
          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-3">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: '30%' }}></div>
          </div>
          <p className="text-xs text-stone-500 leading-relaxed font-serif">
            Giải thích ý nghĩa từ ngữ, phân tích tác dụng biện pháp nghệ thuật, xác định Đúng/Sai theo lệnh.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-600 uppercase">Mức 3: Vận dụng</span>
            <span className="text-sm font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono">30% (3.0 đ)</span>
          </div>
          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-3">
            <div className="bg-amber-600 h-full rounded-full" style={{ width: '30%' }}></div>
          </div>
          <p className="text-xs text-stone-500 leading-relaxed font-serif">
            Cảm thụ vẻ đẹp hình tượng, viết đoạn văn nghị luận xã hội / văn học kết nối đời sống thực tiễn.
          </p>
        </div>
      </div>

      {/* Official 2-Dimensional Matrix Table */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
            <Grid3X3 className="w-4 h-4 text-purple-700" />
            KHUNG MA TRẬN ĐỀ KIỂM TRA ĐỊNH KỲ MÔN NGỮ VĂN (CV 7991)
          </h3>
          <span className="text-xs font-mono font-semibold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-lg">
            Tổng: 10.0 đ · Tỉ lệ 4:3:3
          </span>
        </div>

        <table className="w-full text-xs border border-stone-300 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-stone-100 text-stone-800 font-bold border-b border-stone-300">
              <th rowSpan={2} className="py-2.5 px-3 text-center border-r border-stone-300 w-12">TT</th>
              <th rowSpan={2} className="py-2.5 px-4 text-left border-r border-stone-300 min-w-[180px]">
                Kỹ năng & Ngữ liệu
              </th>
              <th colSpan={3} className="py-2 px-3 text-center border-r border-stone-300 bg-blue-50/60 text-blue-950">
                Nhận biết (40%)
              </th>
              <th colSpan={3} className="py-2 px-3 text-center border-r border-stone-300 bg-emerald-50/60 text-emerald-950">
                Thông hiểu (30%)
              </th>
              <th colSpan={3} className="py-2 px-3 text-center border-r border-stone-300 bg-amber-50/60 text-amber-950">
                Vận dụng (30%)
              </th>
              <th rowSpan={2} className="py-2.5 px-3 text-center border-r border-stone-300 w-16">Tổng câu</th>
              <th rowSpan={2} className="py-2.5 px-3 text-center border-r border-stone-300 w-16">Tổng điểm</th>
              <th rowSpan={2} className="py-2.5 px-3 text-center w-16">Tỉ lệ</th>
            </tr>
            <tr className="bg-stone-50 text-[11px] font-semibold text-stone-600 border-b border-stone-300">
              <th className="py-1.5 px-2 text-center border-r border-stone-200">Phần I</th>
              <th className="py-1.5 px-2 text-center border-r border-stone-200">Phần II</th>
              <th className="py-1.5 px-2 text-center border-r border-stone-300">Phần III</th>
              <th className="py-1.5 px-2 text-center border-r border-stone-200">Phần I</th>
              <th className="py-1.5 px-2 text-center border-r border-stone-200">Phần II</th>
              <th className="py-1.5 px-2 text-center border-r border-stone-300">Phần III</th>
              <th className="py-1.5 px-2 text-center border-r border-stone-200">Phần II</th>
              <th className="py-1.5 px-2 text-center border-r border-stone-200">Phần III</th>
              <th className="py-1.5 px-2 text-center border-r border-stone-300">Phần IV (TL)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 text-stone-700">
            <tr>
              <td className="py-3 px-3 text-center font-bold border-r border-stone-200">1</td>
              <td className="py-3 px-4 font-semibold text-stone-900 border-r border-stone-200 font-serif">
                Đọc hiểu Thơ / Văn xuôi ({khbd.info.lessonTitle})
              </td>
              <td className="py-3 px-2 text-center border-r border-stone-200 font-mono">8 câu (2.0 đ)</td>
              <td className="py-3 px-2 text-center border-r border-stone-200 font-mono text-stone-300">-</td>
              <td className="py-3 px-2 text-center border-r border-stone-300 font-mono text-stone-300">-</td>
              <td className="py-3 px-2 text-center border-r border-stone-200 font-mono">4 câu (1.0 đ)</td>
              <td className="py-3 px-2 text-center border-r border-stone-200 font-mono">1 câu (1.0 đ)</td>
              <td className="py-3 px-2 text-center border-r border-stone-300 font-mono">2 câu (1.0 đ)</td>
              <td className="py-3 px-2 text-center border-r border-stone-200 font-mono">1 câu (1.0 đ)</td>
              <td className="py-3 px-2 text-center border-r border-stone-200 font-mono">2 câu (1.0 đ)</td>
              <td className="py-3 px-2 text-center border-r border-stone-300 font-mono font-bold text-amber-800">1 câu (3.0 đ)</td>
              <td className="py-3 px-3 text-center font-bold border-r border-stone-200">19 câu</td>
              <td className="py-3 px-3 text-center font-bold text-[#7C2D37] border-r border-stone-200">10.0 đ</td>
              <td className="py-3 px-3 text-center font-bold text-emerald-700">100%</td>
            </tr>
            <tr className="bg-stone-100 font-bold text-stone-900">
              <td colSpan={2} className="py-3 px-4 text-right border-r border-stone-300">
                TỔNG HỢP THEO MỨC ĐỘ
              </td>
              <td colSpan={3} className="py-3 px-3 text-center border-r border-stone-300 text-blue-700 font-mono">
                4.0 điểm (40%)
              </td>
              <td colSpan={3} className="py-3 px-3 text-center border-r border-stone-300 text-emerald-700 font-mono">
                3.0 điểm (30%)
              </td>
              <td colSpan={3} className="py-3 px-3 text-center border-r border-stone-300 text-amber-700 font-mono">
                3.0 điểm (30%)
              </td>
              <td className="py-3 px-3 text-center border-r border-stone-300">19 câu</td>
              <td className="py-3 px-3 text-center text-[#7C2D37] border-r border-stone-300 font-mono">10.0 điểm</td>
              <td className="py-3 px-3 text-center text-emerald-700">100%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Specifications Table (Bản đặc tả) */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs overflow-x-auto">
        <h3 className="font-serif font-bold text-base text-stone-900 mb-4 flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-blue-700" />
          BẢN ĐẶC TẢ MA TRẬN ĐỀ KIỂM TRA ĐỊNH KỲ MÔN NGỮ VĂN
        </h3>
        <table className="w-full text-xs border border-stone-300 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-stone-100 text-stone-800 font-bold border-b border-stone-300">
              <th className="py-2.5 px-3 text-center w-12 border-r border-stone-300">TT</th>
              <th className="py-2.5 px-4 text-left border-r border-stone-300 w-1/4">Đơn vị kiến thức</th>
              <th className="py-2.5 px-4 text-left border-r border-stone-300 w-1/2">Yêu cầu cần đạt (YCCĐ)</th>
              <th className="py-2.5 px-3 text-center w-1/4">Vị trí trong đề</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 text-stone-700">
            <tr>
              <td className="py-3 px-3 text-center font-bold border-r border-stone-200">1</td>
              <td className="py-3 px-4 font-semibold text-stone-900 border-r border-stone-200 font-serif">
                Đọc hiểu Thơ trữ tình
              </td>
              <td className="py-3 px-4 border-r border-stone-200 leading-relaxed font-serif">
                <p><strong>Nhận biết:</strong> Xác định thể thơ, hình ảnh, từ ngữ, nhân hóa trong câu "súng ngửi trời".</p>
                <p className="mt-1"><strong>Thông hiểu:</strong> Giải thích ý nghĩa hình ảnh "dáng kiều thơm", phân tích cảm hứng bi tráng.</p>
                <p className="mt-1"><strong>Vận dụng:</strong> Rút ra thông điệp về lý tưởng sống hiến dâng của thanh niên.</p>
              </td>
              <td className="py-3 px-3 text-center">
                Phần I (Câu 1 - 12)<br/>
                Phần II (Câu 1, 2)<br/>
                Phần III (Câu 1 - 4)
              </td>
            </tr>
            <tr>
              <td className="py-3 px-3 text-center font-bold border-r border-stone-200">2</td>
              <td className="py-3 px-4 font-semibold text-stone-900 border-r border-stone-200 font-serif">
                Viết Nghị luận Văn học
              </td>
              <td className="py-3 px-4 border-r border-stone-200 leading-relaxed font-serif">
                <p><strong>Vận dụng cao:</strong> Cảm nhận vẻ đẹp bi tráng của bức tượng đài người lính Tây Tiến qua 8 câu thơ; nhận xét thái độ tác giả Quang Dũng đối với đồng đội.</p>
              </td>
              <td className="py-3 px-3 text-center font-bold text-amber-800">
                Phần IV (Câu 1 Tự luận - 3.0 đ)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
