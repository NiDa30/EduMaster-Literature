# BÁO CÁO TRIỂN KHAI PHÂN HỆ BIÊN TẬP THIẾT KẾ SLIDE BÀI GIẢNG (SLIDES DESIGN EDITOR)

**Mã dự án**: EduMaster-Literature  
**Phân hệ**: Slide Trình chiếu Bài giảng (`#/slides`)  
**Tác giả**: Principal Product Designer + Design Systems Engineer + Senior Frontend Engineer  
**Ngày hoàn thành**: 08/10/2026  
**Trạng thái kiểm thử**: 20/20 Test Suites Passed (190/190 Tests Passed)  
**Trạng thái Build**: Production Bundle thành công (Vite v8.3.2)  

---

## 1. TỔNG QUAN VÀ MỤC TIÊU NÂNG CẤP

### 1.1. Bối cảnh
Trước đây, phân hệ Slides View đã có đầy đủ logic hiển thị 5 bố cục sư phạm môn Ngữ văn (`quote`, `split`, `cards`, `quiz`, `single`) và xuất file PowerPoint/HTML. Tuy nhiên, toàn bộ bài giảng bị cố định trong một phong cách hiển thị duy nhất (nền tối đen `Obsidian #171413`). Giáo viên gặp hạn chế khi muốn:
- Thay đổi phông chữ và cỡ chữ cho phù hợp với máy chiếu từng phòng học.
- Chuyển sang phong cách giấy ngà cổ điển (`classic-paper`) cho văn học trung đại hoặc phong cách Burgundy hàn lâm (`academic-burgundy`) cho các tiết học chính khóa.
- Chèn hình ảnh bối cảnh minh họa với lớp phủ tối dịu mắt.
- Tự do tùy biến nhưng không muốn bị sa lầy vào những công cụ quá phức tạp như PowerPoint/Canva.

### 1.2. Triết lý Thiết kế: "Curated Freedom for Literature Educators"
Hệ thống tuân thủ nguyên tắc:
1. **Academic + Editorial + Cinematic + Teacher-friendly**: Tôn vinh vẻ đẹp thi pháp và ngôn từ, loại bỏ hiệu ứng sặc sỡ hoặc chuyển động gây phân tâm.
2. **Chọn mẫu → Tinh chỉnh nhẹ → Giảng dạy ngay**: Giáo viên không cần kiến thức về layer, keyframe hay CSS. Mọi tùy chọn đều được tuyển chọn kỹ lưỡng (curated) theo quy chuẩn đồ họa môn Ngữ văn.
3. **Độ tương phản an toàn lớp học (WCAG AA Guard)**: Cảnh báo thời gian thực nếu màu chữ và nền có độ tương phản dưới 4.5:1, đảm bảo học sinh ngồi cuối lớp nhìn rõ trên máy chiếu.
4. **Bảo toàn 100% logic và tính tương thích ngược**: Không phá vỡ dữ liệu bài giảng cũ, giữ nguyên 5 bố cục nghiệp vụ và toàn bộ quy trình xuất bản.

---

## 2. KIẾN TRÚC DỮ LIỆU & CƠ CHẾ CASCADE RESOLUTION

### 2.1. Cấu trúc Data Model mới
Hệ thống bổ sung các interface chuẩn hóa trong [`src/types/index.ts`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/types/index.ts):

```typescript
export type SlideFontFamily = 
  | 'Lora' | 'Georgia' | 'Merriweather' | 'Noto Serif' 
  | 'Be Vietnam Pro' | 'Arial' | 'Inter' | 'Noto Sans';

export interface SlideBackground {
  type: 'solid' | 'gradient' | 'image' | 'vignette';
  color?: string;
  gradient?: { from: string; to: string; angle?: number };
  vignette?: { name: string; baseColor: string; glowColor: string; cssBackground?: string; fallbackColor?: string };
  imageUrl?: string;
  imageFit?: 'cover' | 'contain';
  imagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  overlay?: { color: string; opacity: number };
}

export interface SlideTextStyle {
  fontFamily?: SlideFontFamily | string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  italic?: boolean;
  align?: 'left' | 'center' | 'right';
  lineHeight?: number;
}

export interface SlideStyle {
  themeId?: string;
  background?: SlideBackground;
  titleStyle?: SlideTextStyle;
  bodyStyle?: SlideTextStyle;
  quoteStyle?: SlideTextStyle;
  accentColor?: string;
}

export interface SlideTheme {
  id: string;
  name: string;
  description?: string;
  background: SlideBackground;
  colors: {
    title: string;
    text: string;
    accent: string;
    secondaryText: string;
    quote?: string;
    cardBackground?: string;
    cardBorder?: string;
  };
  typography: {
    titleFont: SlideFontFamily;
    bodyFont: SlideFontFamily;
    quoteFont: SlideFontFamily;
    titleWeight?: number;
    bodyWeight?: number;
  };
  radius?: number;
  style: 'academic' | 'editorial' | 'cinematic' | 'minimal' | 'classic';
}

export interface SlidesPresentationSettings {
  defaultThemeId: string;
  defaultBackground?: SlideBackground;
}
```

### 2.2. Thứ tự ưu tiên giải quyết kiểu dáng (Style Cascade)
Hàm [`resolveSlideStyle(slide, settings)`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/utils/slideStyleUtils.ts) tính toán kiểu dáng hiển thị cuối cùng theo thứ tự kế thừa 3 cấp:
1. **Cấp 1 (Cao nhất) — Slide Overrides (`slide.styleOverrides`)**: Thiết lập cụ thể trên từng slide (ví dụ: chỉ đổi màu slide trích đoạn thơ).
2. **Cấp 2 — Cài đặt chung toàn bài (`presentationSettings`)**: Chủ đề mặc định hoặc nền chung áp dụng cho toàn bộ bài học.
3. **Cấp 3 — Fallback Hệ thống**: Chủ đề `cinematic-literary` mặc định.

Nhờ đó, một slide cũ không có `styleOverrides` vẫn tự động kế thừa chủ đề chung mà không gây lỗi runtime.

---

## 3. BẢNG MẪU & BỘ CHỦ ĐỀ CHUYÊN BIỆT (CURATED PRESETS)

### 3.1. 8 Bộ Chủ Đề Học Thuật (Curated Themes)
Được cấu hình chi tiết tại [`src/config/slideThemes.ts`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/config/slideThemes.ts):

| STT | Mã Theme | Tên Tiếng Việt | Phong cách | Nền chính | Màu chữ / Điểm nhấn | Phù hợp thể loại / Mục đích |
|---|---|---|---|---|---|---|
| 1 | `cinematic-literary` | **Điện ảnh Văn học** | Cinematic | `#171413` | `#FAF8F5` / `#F59E0B` | Trích đoạn thơ hiện đại, kịch bản văn học |
| 2 | `academic-burgundy` | **Học thuật Burgundy** | Academic | `#7A2938` | `#FFFFFF` / `#FBBF24` | Tiết dạy chính thức, chuyên đề chuyên sâu |
| 3 | `classic-paper` | **Trang sách cổ điển** | Classic | `#F6F0E4` | `#3F2D26` / `#8A5A44` | Văn học trung đại, tiểu sử tác giả, văn xuôi |
| 4 | `light-editorial` | **Biên tập sáng** | Editorial | `#FAF8F5` | `#211E1C` / `#7A2938` | Bài giảng nhiều thông tin, bảng biểu tổng hợp |
| 5 | `forest-academic` | **Học thuật xanh rừng** | Academic | `#18352B` | `#F7F4EC` / `#D6A756` | Thơ ca Tây Bắc, thiên nhiên, kháng chiến |
| 6 | `night-poetry` | **Đêm thi ca** | Cinematic | `#111827` | `#F9FAFB` / `#C4B5FD` | Thơ lãng mạn, chiều sâu nội tâm, đêm trữ tình |
| 7 | `sepia-literature` | **Văn chương Sepia** | Classic | `#EDE0CE` | `#4B3527` / `#9C6746` | Văn học 1930–1945, ký ức chiến tranh |
| 8 | `minimal-bw` | **Tối giản** | Minimal | `#FFFFFF` | `#111111` / `#7A2938` | Sơ đồ tư duy, trắc nghiệm tương tác |

### 3.2. 12 Mẫu Trình Chiếu Sẵn Có (Pre-configured Templates)
Phân loại theo 5 nhóm sư phạm:
1. **Trích dẫn (Quote)**: *Trích thơ Điện ảnh*, *Trích dẫn Giấy dó*, *Khắc sâu ý nghĩa*.
2. **So sánh (Split)**: *Đối chiếu 2 tác phẩm*, *So sánh Nhân vật*.
3. **Kiến thức (Cards)**: *3 Luận điểm học thuật*, *3 Nét đặc sắc nghệ thuật*.
4. **Câu hỏi (Quiz)**: *Quiz tương tác tối*, *Quiz khảo sát sáng*.
5. **Tóm tắt (Single)**: *Tiểu sử & Bối cảnh*, *Tổng kết bài học*.

### 3.3. 6 Khí chất Văn học (Academic Vignettes)
Hiệu ứng Gradient tỏa sáng nghệ thuật tạo chiều sâu không gian:
- *Giấy dó truyền thống*, *Núi rừng Tây Bắc*, *Sông Mã oai linh*, *Phố huyện lúc lên đèn*, *Ánh trăng thi ca*, *Hoàng hôn sông nước*.

---

## 4. BẢNG BIÊN TẬP 4 TABS (EDITORIAL DRAWER)

Giao diện Drawer bên phải được chia làm 4 tab khoa học, không gây rối mắt:

### 4.1. Tab [ Nội dung ]
Giữ trọn vẹn nghiệp vụ sư phạm cốt lõi:
- Lựa chọn pha sư phạm (`Khởi động`, `Kiến thức mới`, `Luyện tập`, `Vận dụng`, `Tổng kết`).
- Tiêu đề slide.
- Lựa chọn 5 bố cục (`quote`, `split`, `cards`, `quiz`, `single`).
- Trình soạn thảo văn bản, đoạn trích, câu hỏi thảo luận, các phương án trắc nghiệm, và speaker notes sư phạm.

### 4.2. Tab [ Thiết kế ]
- Duyệt và xem trước 8 chủ đề với mẫu màu trực quan.
- Bộ lọc 12 Template theo danh mục với thumbnail 16:9.
- Thao tác: **"Áp dụng slide này"**, **"Áp dụng toàn bộ bài giảng"**, **"Đặt lại slide về mặc định"**, **"Đặt lại toàn bộ về mặc định"**.

### 4.3. Tab [ Nền ]
- **Đơn sắc**: 8 mã màu chuẩn + Bộ chọn màu tương tác + Nhập mã `#HEX`.
- **Chuyển sắc**: 5 dải màu hoàng hôn, rừng núi, giấy ấm với góc xoay 90°, 135°, 180°.
- **Hình ảnh**: Tải ảnh trực tiếp từ máy tính. Tích hợp giải thuật nén ảnh tự động client-side xuống max 1920x1080 JPEG (~300KB) để bảo vệ bộ nhớ LocalStorage. Hỗ trợ tùy chỉnh `Cover/Contain`, vị trí căn, và thanh trượt làm tối nền (Overlay 0–80%) chống lóa mắt.
- **Khí chất văn học**: 6 hiệu ứng vignette nghệ thuật.

### 4.4. Tab [ Kiểu chữ ]
- Bộ chuyển đổi đối tượng: `Tiêu đề` | `Nội dung` | `Trích dẫn`.
- Bộ phông chữ:
  - *Serif*: Lora (khuyên dùng), Georgia, Merriweather, Noto Serif.
  - *Sans-serif*: Be Vietnam Pro (khuyên dùng), Inter, Arial, Noto Sans.
- Cỡ chữ với thanh trượt và nút bấm tăng/giảm (+ / -).
- Trọng số nét chữ (400, 500, 600, 700) và bật/tắt in nghiêng.
- Căn lề trái / giữa / phải.
- **Thuật toán kiểm định tương phản WCAG AA**:
  - Tự động đo đạc tỷ lệ tương phản giữa màu chữ được chọn và nền thực tế.
  - Hiển thị huy hiệu xanh `✓ Đạt chuẩn WCAG AA (9.4:1)` hoặc cảnh báo vàng `⚠ Độ tương phản thấp (2.8:1 < 4.5:1). Có thể khó đọc trên máy chiếu lớp học.`

---

## 5. ĐỒNG BỘ XUẤT BẢN POWERPOINT (.PPTX) VÀ HTML

Cả hai chức năng xuất bản trong [`src/utils/exportUtils.ts`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/utils/exportUtils.ts) đều được nâng cấp để giữ nguyên vẹn thiết kế:

### 5.1. Xuất PowerPoint 16:9 (`PptxGenJS`)
- **Tương thích phông chữ lớp học**: Tự động chuyển đổi phông chữ web thành phông chữ hệ thống tiêu chuẩn (`Lora/Merriweather` → `Georgia`; `Be Vietnam Pro/Inter` → `Arial`) để giáo viên mang USB sang máy tính phòng học mở slide không bị lỗi font tiếng Việt.
- **Màu sắc & Hình khối**: Đồng bộ màu nền, màu chữ, điểm nhấn, độ đậm/nhạt, căn lề và màu sắc các khung thẻ cards/quiz/quote.
- **Hình ảnh nền & Lớp phủ**: Tự động nhúng dữ liệu ảnh nền kèm lớp phủ bán trong suốt tương ứng.

### 5.2. Xuất Trình Chiếu HTML Tự Hành
- Nhúng sẵn Google Fonts tiếng Việt chuẩn Unicode.
- Xuất toàn bộ 5 layout kèm theo CSS Inline chính xác 100% với canvas xem trực tiếp trên trình duyệt.
- Hỗ trợ chế độ in ấn sạch sẽ (`@media print`) cho giáo viên phát tài liệu bài giảng cho học sinh.

---

## 6. KẾT QUẢ KIỂM THỬ & ĐỘ ỔN ĐỊNH

### 6.1. Kiểm thử Đơn vị & Tích hợp (Automated Vitest)
Bộ kiểm thử mới tại [`src/test/slideStyle.test.ts`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/test/slideStyle.test.ts) bao gồm 23 bài kiểm tra chuyên sâu:
- Kế thừa kiểu dáng theo thứ tự ưu tiên (Cascade resolution).
- Độ chính xác của thuật toán tính tương phản WCAG 2.1 AA.
- Kiểm tra tính hợp lệ và chuẩn hóa mã màu Hex.
- Ánh xạ phông chữ Web sang PPTX.
- Kiểm tra tính toàn vẹn của 8 themes, 12 templates, 8 màu nền, 5 gradients, 6 vignettes.
- Khả năng tương thích ngược hoàn hảo với dữ liệu slide cũ.

**Kết quả tổng thể toàn bộ dự án:**
```bash
Test Files  20 passed (20)
Tests       190 passed (190)
Duration    16.20s
```

### 6.2. Kiểm tra Production Build
```bash
npm run build
vite v8.3.2 building client environment for production...
✓ 1698 modules transformed.
dist/index.html                     1.99 kB
dist/assets/index-DYEFsmJB.css     90.71 kB
dist/assets/index-DH9gadpY.js    1,591.38 kB
✓ built in 2.48s
```
Không phát sinh bất kỳ lỗi TypeScript, CSS hoặc cú pháp Vite nào.

---

## 7. HƯỚNG DẪN SỬ DỤNG NHANH CHO GIÁO VIÊN

1. **Thay đổi Chủ đề toàn bộ bài giảng**:
   - Nhấn **"Thiết kế & Biên tập"** (nút màu đỏ mận trên thanh công cụ).
   - Chọn tab **[ Thiết kế ]** → Chọn một trong 8 chủ đề (ví dụ: *Trang sách cổ điển*).
   - Nhấn **"Toàn bộ"** → Toàn bộ bài giảng lập tức chuyển sang tông màu giấy ngà hoài niệm.
2. **Tùy biến Slide trích thơ**:
   - Chuyển sang slide trích đoạn thơ.
   - Chọn tab **[ Nền ]** → Chọn **Khí chất** → Nhấp chọn *Ánh trăng thi ca*.
   - Chuyển sang tab **[ Kiểu chữ ]** → Chọn *Trích dẫn* → Tăng cỡ chữ lên `26px`, bật *In nghiêng*.
   - Quan sát huy hiệu tương phản bên dưới: nếu hiện màu xanh, an tâm trình chiếu trên lớp.
3. **Trình chiếu trên lớp**:
   - Nhấn phím `F5` hoặc nút **"Trình chiếu F5"**.
   - Dùng phím `Mũi tên phải` hoặc `Phím cách (Space)` để lật trang. Nhấn `Esc` để thoát.
4. **Xuất file giảng dạy**:
   - Nhấn **"Xuất PowerPoint (.pptx)"** để lấy file trình chiếu cho máy chiếu lớp học.
   - Nhấn **"Xuất Trình chiếu (.html)"** để gửi file đọc trước cho học sinh xem offline tại nhà.
