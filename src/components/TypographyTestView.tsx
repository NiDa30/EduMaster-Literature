import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Type, 
  Layers, 
  Smartphone, 
  Monitor, 
  Sliders, 
  FileText,
  AlertCircle
} from 'lucide-react';

export const TypographyTestView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'controls' | 'strings' | 'mobile'>('hierarchy');
  const [inputVal, setInputVal] = useState('Sông Mã xa rồi Tây Tiến ơi! Nhớ về rừng núi, nhớ chơi vơi.');
  const [textareaVal, setTextareaVal] = useState(
    'Chiến trường đi chẳng tiếc đời xanh,\nÁo bào thay chiếu, anh về đất,\nSông Mã gầm lên khúc độc hành.'
  );
  const [selectVal, setSelectVal] = useState('tay_tien');

  const testStrings = {
    test1: 'Sông Mã xa rồi Tây Tiến ơi! Nhớ về rừng núi, nhớ chơi vơi.',
    test2: 'ẮẰẲẴẶ ẤẦẨẪẬ ẾỀỂỄỆ ỐỒỔỖỘ ỚỜỞỠỢ ỨỪỬỮỰ ỲÝỶỸỴ ĐĂÂÊÔƠƯ',
    test3: 'ắằẳẵặ ấầẩẫậ ếềểễệ ốồổỗộ ớờởỡợ ứừửữự ỳýỷỹỵ đăâêôơư',
    test4: 'Tuyên ngôn Độc lập · Vợ nhặt · Kim Lân · Lớp 12 · Tổng: 10.0 · 18:42',
    extra1: 'Nguyễn Minh Châu — Chiếc thuyền ngoài xa',
    extra2: 'Khởi động · Hình thành kiến thức · Luyện tập · Vận dụng',
    extra3: 'Đã lưu tự động · 72% · 45 phút · 10.0 điểm'
  };

  return (
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6 space-y-3 overflow-hidden">
      {/* Page Header (shrink-0) */}
      <div className="bg-white p-3.5 md:p-4 rounded-2xl border border-[#E7E5E4] shadow-xs shrink-0 max-w-5xl w-full mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#7C2D37]/10 text-[#7C2D37] border border-[#7C2D37]/20 flex items-center gap-1">
                <Type className="w-3.5 h-3.5" />
                Typography Verification Suite
              </span>
              <span className="text-metadata text-[#57534E] hidden sm:inline">Chuẩn tiếng Việt · Không cắt dấu</span>
            </div>
            <h1 className="text-section md:text-page-title font-semibold text-stone-900 mt-1">
              Phòng Kiểm Thử Typography
            </h1>
          </div>

          {/* Quick Sub-navigation */}
          <div className="flex p-1 bg-stone-100 rounded-xl border border-[#E7E5E4] text-meta shrink-0 overflow-x-auto">
            {[
              { id: 'hierarchy', label: 'Cấp bậc Hierarchy' },
              { id: 'controls', label: 'Controls & Table' },
              { id: 'strings', label: 'Chuỗi kiểm thử diacritics' },
              { id: 'mobile', label: 'Mobile (Min sizes)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-[#292524] shadow-xs'
                    : 'text-[#78716C] hover:text-[#292524]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 min-h-0 overflow-y-auto panel-scroll space-y-6 max-w-5xl w-full mx-auto pr-1">

      {/* 1. HIERARCHY TEST */}
      {(activeTab === 'hierarchy' || activeTab === 'strings') && (
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-[#E7E5E4] shadow-xs space-y-6">
          <div className="border-b border-[#E7E5E4] pb-3">
            <h2 className="text-section-title">
              1. Cấp bậc Typography (Hierarchy Tokens)
            </h2>
            <p className="text-meta text-[#78716C] mt-0.5">
              Quy chuẩn: Page Title 28px/1.3 · Section Title 20px/1.4 · Card Title 16px/1.4 · Body UI 15px/1.55 · Metadata 13px/1.5 · Document 18px/1.8
            </p>
          </div>

          <div className="space-y-6">
            {/* Page Title */}
            <div className="p-4 rounded-xl bg-stone-50/60 border border-[#E7E5E4] space-y-1">
              <div className="text-meta text-[#78716C] font-mono">
                token: --text-page-title (28px / 600 / line-height: 1.3)
              </div>
              <h1 className="text-page-title">
                {testStrings.test1}
              </h1>
              <h1 className="text-page-title font-serif text-[#7C2D37]">
                Tác phẩm: {testStrings.extra1}
              </h1>
            </div>

            {/* Section Title */}
            <div className="p-4 rounded-xl bg-stone-50/60 border border-[#E7E5E4] space-y-1">
              <div className="text-meta text-[#78716C] font-mono">
                token: --text-section (20px / 600 / line-height: 1.4)
              </div>
              <h2 className="text-section-title">
                {testStrings.test1}
              </h2>
              <h2 className="text-section-title font-serif">
                {testStrings.extra2}
              </h2>
            </div>

            {/* Card Title */}
            <div className="p-4 rounded-xl bg-stone-50/60 border border-[#E7E5E4] space-y-1">
              <div className="text-meta text-[#78716C] font-mono">
                token: --text-card-title (16px / 500 / line-height: 1.4)
              </div>
              <h3 className="text-card-title">
                {testStrings.test4}
              </h3>
              <h3 className="text-card-title font-serif">
                {testStrings.extra1}
              </h3>
            </div>

            {/* Body UI */}
            <div className="p-4 rounded-xl bg-stone-50/60 border border-[#E7E5E4] space-y-1">
              <div className="text-meta text-[#78716C] font-mono">
                token: --text-body (15px / 400 / line-height: 1.55)
              </div>
              <p className="text-body-ui">
                {testStrings.test1} — Một trong những bài thơ xuất sắc nhất của nền thi ca kháng chiến chống Pháp, khắc họa bức tượng đài bi tráng về người lính vệ quốc đoàn với vẻ đẹp hào hoa, lãng mạn mà kiên cường bất khuất.
              </p>
            </div>

            {/* Metadata */}
            <div className="p-4 rounded-xl bg-stone-50/60 border border-[#E7E5E4] space-y-1">
              <div className="text-meta text-[#78716C] font-mono">
                token: --text-meta (13px / 400 / line-height: 1.5)
              </div>
              <p className="text-metadata">
                {testStrings.extra3} · GDPT 2018 · Công văn 5512/BGDĐT-GDTrH & Công văn 7991/BGDĐT-GDTrH
              </p>
            </div>

            {/* Document (Lora 18px / 1.8 / max-w: 760px) */}
            <div className="p-6 rounded-xl bg-white border-2 border-stone-200 space-y-3">
              <div className="text-meta text-[#78716C] font-mono">
                token: --text-document (Lora 18px / 400 / line-height: 1.8 / max-width: 760px)
              </div>
              <div className="text-document space-y-4">
                <p className="font-serif italic text-stone-600 text-[16px]">
                  (Trích đoạn kiểm thử thơ và văn xuôi tiếng Việt)
                </p>
                <p className="whitespace-pre-line">
                  {testStrings.test1}
                  {'\n'}Sài Khao sương lấp đoàn quân mỏi,
                  {'\n'}Mường Lát hoa về trong đêm hơi.
                  {'\n'}Dốc lên khúc khuỷu dốc thăm thẳm,
                  {'\n'}Heo hút cồn mây, súng ngửi trời.
                </p>
              </div>
            </div>

            {/* Inline Mixed Font Test */}
            <div className="p-4 rounded-xl bg-stone-50/60 border border-[#E7E5E4] space-y-2">
              <div className="text-meta text-[#78716C] font-mono">
                Mixed Inline Font (Be Vietnam Pro + Lora cân đối thị giác)
              </div>
              <div className="text-body-ui">
                <span className="font-medium text-[#7C2D37]">Bài giảng trực tuyến: </span>
                <span className="font-serif font-literary-inline font-medium text-[#292524]">
                  {testStrings.extra1}
                </span>
                <span className="text-stone-500"> (Ngữ văn 12 - Bộ sách Kết nối tri thức)</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. CHUỖI KIỂM THỬ DẤU TIẾNG VIỆT TOÀN DIỆN */}
      {(activeTab === 'strings' || activeTab === 'hierarchy') && (
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-[#E7E5E4] shadow-xs space-y-6">
          <div className="border-b border-[#E7E5E4] pb-3">
            <h2 className="text-section-title">
              2. Chuỗi Kiểm Thử Diacritics (Dấu Phức Tạp, Chồng Dấu & Hoa Dấu)
            </h2>
            <p className="text-meta text-[#78716C] mt-0.5">
              Xác thực không có bất kỳ dấu nào bị cắt, chạm dòng trên, hoặc fallback sai font ở cả 2 font Be Vietnam Pro và Lora.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Chữ hoa đầy đủ dấu - Be Vietnam Pro */}
            <div className="p-4 rounded-xl border border-[#E7E5E4] bg-stone-50/40">
              <span className="text-meta text-[#7C2D37] font-medium block mb-2">
                UI Font: Be Vietnam Pro (Chữ hoa toàn bộ dấu phức tạp)
              </span>
              <p className="text-[17px] font-semibold leading-relaxed tracking-normal text-[#292524]">
                {testStrings.test2}
              </p>
            </div>

            {/* Chữ hoa đầy đủ dấu - Lora */}
            <div className="p-4 rounded-xl border border-[#E7E5E4] bg-stone-50/40">
              <span className="text-meta text-[#7C2D37] font-medium block mb-2">
                Literary Font: Lora (Chữ hoa toàn bộ dấu phức tạp)
              </span>
              <p className="font-serif text-[17px] font-semibold leading-relaxed tracking-normal text-[#292524]">
                {testStrings.test2}
              </p>
            </div>

            {/* Chữ thường đầy đủ dấu - Be Vietnam Pro */}
            <div className="p-4 rounded-xl border border-[#E7E5E4] bg-stone-50/40">
              <span className="text-meta text-[#7C2D37] font-medium block mb-2">
                UI Font: Be Vietnam Pro (Chữ thường ệ, ễ, ặ, ừ, ỡ, ự, ỳ, ỹ...)
              </span>
              <p className="text-[18px] leading-relaxed tracking-normal text-[#292524]">
                {testStrings.test3}
              </p>
            </div>

            {/* Chữ thường đầy đủ dấu - Lora */}
            <div className="p-4 rounded-xl border border-[#E7E5E4] bg-stone-50/40">
              <span className="text-meta text-[#7C2D37] font-medium block mb-2">
                Literary Font: Lora (Chữ thường ệ, ễ, ặ, ừ, ỡ, ự, ỳ, ỹ...)
              </span>
              <p className="font-serif text-[18px] leading-relaxed tracking-normal text-[#292524]">
                {testStrings.test3}
              </p>
            </div>
          </div>

          {/* True Italic vs SemiBold on Lora */}
          <div className="p-4 rounded-xl border border-[#E7E5E4] bg-stone-50/40 space-y-3">
            <span className="text-meta text-[#7C2D37] font-medium block">
              Kiểm tra Lora: True Italic (400) & SemiBold (600) — Không synthetic bold/italic
            </span>
            <div className="space-y-2">
              <p className="font-serif italic text-[17px] text-[#292524] leading-relaxed">
                Lora 400 Italic Thật: “{testStrings.test1}”
              </p>
              <p className="font-serif font-semibold text-[17px] text-[#292524] leading-relaxed">
                Lora 600 SemiBold Thật: “{testStrings.extra1}”
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 3. CONTROLS, BUTTONS, INPUTS, TABS & TABLES */}
      {(activeTab === 'controls' || activeTab === 'hierarchy') && (
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-[#E7E5E4] shadow-xs space-y-6">
          <div className="border-b border-[#E7E5E4] pb-3">
            <h2 className="text-section-title">
              3. Interactive Text Controls, Inputs, Truncate & Tables
            </h2>
            <p className="text-meta text-[#78716C] mt-0.5">
              Đảm bảo không sử dụng fixed height làm cắt dấu, kế thừa font chính xác, truncate có padding-block an toàn.
            </p>
          </div>

          {/* Button States */}
          <div className="space-y-2">
            <label className="text-meta font-medium text-[#57534E] block">
              Buttons (min-height: 40px, padding-block: 8px, line-height: 1.4):
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <button className="btn-primary">
                <span>{testStrings.extra2.split(' · ')[0]} (Bắt đầu)</span>
              </button>
              <button className="btn-secondary">
                <span>{testStrings.extra2.split(' · ')[1]}</span>
              </button>
              <button className="btn-ghost">
                <span>{testStrings.extra2.split(' · ')[2]}</span>
              </button>
              <button className="btn-danger">
                <span>Xóa dữ liệu</span>
              </button>
              <button className="btn-secondary btn-compact">
                <span>Nút nhỏ gọn (36px)</span>
              </button>
            </div>
          </div>

          {/* Form Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-meta font-medium text-[#57534E] mb-1">
                Input Text (kế thừa font, min-height 40px, padding-block 8px):
              </label>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full px-3 py-2 border border-[#E7E5E4] rounded-lg text-body-ui text-[#292524] focus:outline-none focus:border-[#7C2D37]"
              />
            </div>

            <div>
              <label className="block text-meta font-medium text-[#57534E] mb-1">
                Select Option (kế thừa font, line-height an toàn):
              </label>
              <select
                value={selectVal}
                onChange={(e) => setSelectVal(e.target.value)}
                className="w-full px-3 py-2 border border-[#E7E5E4] rounded-lg text-body-ui text-[#292524] focus:outline-none focus:border-[#7C2D37]"
              >
                <option value="tay_tien">Tây Tiến — Quang Dũng</option>
                <option value="tuyen_ngon">Tuyên ngôn Độc lập — Hồ Chí Minh</option>
                <option value="vo_nhat">Vợ nhặt — Kim Lân</option>
                <option value="chiec_thuyen">Chiếc thuyền ngoài xa — Nguyễn Minh Châu</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-meta font-medium text-[#57534E] mb-1">
                Textarea (kế thừa font, line-height: 1.55):
              </label>
              <textarea
                rows={3}
                value={textareaVal}
                onChange={(e) => setTextareaVal(e.target.value)}
                className="w-full px-3 py-2 border border-[#E7E5E4] rounded-lg text-body-ui text-[#292524] focus:outline-none focus:border-[#7C2D37]"
              />
            </div>
          </div>

          {/* Safe Truncation Test */}
          <div className="space-y-2">
            <label className="text-meta font-medium text-[#57534E] block">
              Safe Text Truncation (padding-block: 2px, line-height: 1.4):
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-stone-50 rounded-lg border border-[#E7E5E4]">
                <span className="text-[12px] text-stone-500 block mb-1">Khung hẹp (200px):</span>
                <div className="w-[200px] truncate-safe font-medium text-body-ui text-[#292524] bg-white px-2 py-0.5 border border-stone-200 rounded">
                  {testStrings.test1}
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-[#E7E5E4]">
                <span className="text-[12px] text-stone-500 block mb-1">Chữ có dấu hoa (220px):</span>
                <div className="w-[220px] truncate-safe font-medium text-body-ui text-[#292524] bg-white px-2 py-0.5 border border-stone-200 rounded">
                  {testStrings.test2}
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-[#E7E5E4]">
                <span className="text-[12px] text-stone-500 block mb-1">Thơ Lora truncate:</span>
                <div className="w-[200px] truncate-safe font-serif text-body-ui text-[#292524] bg-white px-2 py-0.5 border border-stone-200 rounded">
                  {testStrings.test1}
                </div>
              </div>
            </div>
          </div>

          {/* Numeric Typography Table (Tabular Nums) */}
          <div className="space-y-2">
            <label className="text-meta font-medium text-[#57534E] block">
              Bảng Dữ liệu Điểm số & Thời gian (font-variant-numeric: tabular-nums):
            </label>
            <div className="overflow-x-auto border border-[#E7E5E4] rounded-xl">
              <table className="w-full text-meta divide-y divide-[#E7E5E4]">
                <thead className="bg-stone-50 text-[#57534E] text-left">
                  <tr>
                    <th className="py-2.5 px-4 font-medium">Nội dung đánh giá</th>
                    <th className="py-2.5 px-3 font-medium text-right">Tỉ lệ (%)</th>
                    <th className="py-2.5 px-3 font-medium text-right">Thời gian</th>
                    <th className="py-2.5 px-3 font-medium text-right">Điểm tối đa</th>
                    <th className="py-2.5 px-3 font-medium text-right">Giờ lưu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E5E4] bg-white text-[#292524]">
                  {[
                    { name: 'Phần I: Trắc nghiệm khách quan', pct: '40%', time: '15 phút', score: '4.00', saved: '18:40' },
                    { name: 'Phần II: Câu hỏi Đúng/Sai (CV 7991)', pct: '20%', time: '15 phút', score: '2.00', saved: '18:41' },
                    { name: 'Phần III: Câu hỏi Trả lời ngắn', pct: '10%', time: '10 phút', score: '1.00', saved: '18:42' },
                    { name: 'Phần IV: Viết đoạn văn Nghị luận', pct: '30%', time: '50 phút', score: '3.00', saved: '18:43' },
                    { name: 'TỔNG CỘNG BÀI KIỂM TRA', pct: '100%', time: '90 phút', score: '10.00', saved: '18:44' }
                  ].map((row, idx) => (
                    <tr key={idx} className={idx === 4 ? 'bg-[#FBF4F5] font-semibold text-[#7C2D37]' : ''}>
                      <td className="py-2.5 px-4">{row.name}</td>
                      <td className="py-2.5 px-3 text-right tabular-nums">{row.pct}</td>
                      <td className="py-2.5 px-3 text-right tabular-nums">{row.time}</td>
                      <td className="py-2.5 px-3 text-right tabular-nums">{row.score}</td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-stone-500">{row.saved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 4. MOBILE RESPONSIVE VERIFICATION */}
      {(activeTab === 'mobile' || activeTab === 'hierarchy') && (
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-[#E7E5E4] shadow-xs space-y-6">
          <div className="border-b border-[#E7E5E4] pb-3">
            <h2 className="text-section-title flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#7C2D37]" />
              4. Responsive Typography (Ngưỡng tối thiểu trên Mobile)
            </h2>
            <p className="text-meta text-[#78716C] mt-0.5">
              Quy tắc Section 23: Không giảm body UI dưới 14px, document dưới 16px, metadata dưới 12px. Tuyệt đối không dùng 10–11px để nhồi nhét.
            </p>
          </div>

          <div className="max-w-sm mx-auto border-4 border-stone-700 rounded-3xl p-5 bg-[#FAF8F5] shadow-lg space-y-4">
            <div className="text-center pb-2 border-b border-[#E7E5E4]">
              <span className="text-[12px] font-medium text-[#7C2D37] uppercase">
                Mô phỏng Màn hình Mobile (375px)
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-[22px] font-semibold text-[#292524] leading-snug">
                  {testStrings.test1.slice(0, 30)}...
                </h3>
                <p className="text-[12px] text-[#78716C] mt-0.5">
                  Quang Dũng · Ngữ văn 12 · 45 phút
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E7E5E4] text-[14px] leading-relaxed text-[#292524]">
                <strong>Body UI mobile (14px):</strong> Giáo viên hoàn thành soạn thảo KHBD 5512 với tiến độ <span className="tabular-nums font-medium">85%</span>.
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E7E5E4] font-serif text-[16px] leading-[1.7] text-[#292524]">
                <strong>Document mobile (16px):</strong>
                <p className="mt-1">
                  “Sông Mã xa rồi Tây Tiến ơi! Nhớ về rừng núi, nhớ chơi vơi.”
                </p>
              </div>

              <div className="flex items-center justify-between text-[12px] text-[#78716C] pt-2 border-t border-[#E7E5E4]">
                <span>Tối thiểu Metadata: 12px</span>
                <span className="tabular-nums font-medium text-[#7C2D37]">18:42</span>
              </div>
            </div>
          </div>
        </section>
      )}
      </div>
    </div>
  );
};
