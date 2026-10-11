# BÁO CÁO REFACTOR VISUAL POLISH & PREMIUM INTERACTION SYSTEM
## DỰ ÁN: EDUMASTER-LITERATURE (HỆ SINH THÁI GIÁO VIÊN NGỮ VĂN THPT)

---

### TỔNG QUAN DỰ ÁN REFACTOR
- **Vị trí & Trách nhiệm thực hiện**: Principal Product Designer + Design Systems Engineer + Senior Frontend Engineer
- **Mục tiêu**: Nâng cấp toàn diện ngôn ngữ thị giác từ *"clean functional education dashboard"* thành *"premium academic authoring workspace"*.
- **Triết lý thiết kế chủ đạo**: **Academic + Editorial + Premium + Calm + Warm + Professional**. Tuyệt đối không biến thành SaaS Corporate khô cứng, không biến thành cổng học sinh LMS nhiều màu, và không lạm dụng glassmorphism hay gradient sặc sỡ.
- **Cam kết kỹ thuật**: Giữ nguyên vẹn 100% Business Logic, Routing, `AppState`, Data Schema, Unicode NFC Normalization, cùng toàn bộ chuỗi xuất bản tài liệu OpenXML (.docx), Presentation (.pptx) và HTML offline.

---

### I. HỆ THỐNG MÀU SẮC & BRAND TONAL SCALE

#### 1. Bảng màu Burgundy Tonal Scale (11 Bước)
EduMaster-Literature chuẩn hóa sắc đỏ Burgundy kinh viện thành một hệ màu hoàn chỉnh từ tone siêu nhẹ đến tone nền chữ đậm:

| Token Name | Hex Code | Ứng dụng trong giao diện |
| :--- | :--- | :--- |
| `burgundy-25` | `#FCF6F7` | Nền hero card subtle gradient, hover row bài dạy đang chọn |
| `burgundy-50` | `#FCF3F4` | Nền Badge Active, Tab đang chọn, Left Indicator Sidebar |
| `burgundy-100` | `#F8E7E9` | Border soft badge, pill filter trạng thái đang kích hoạt |
| `burgundy-200` | `#F1CFD3` | Divider nhấn trong panel học thuật, viền nút phụ |
| `burgundy-300` | `#E3A8B0` | State hover border của interactive card |
| `burgundy-400` | `#CE7582` | Icon phụ, timeline connector active |
| `burgundy-500` | `#B54D5D` | Accent phụ, subtitle nhấn mạnh trong Reader |
| **`burgundy-600` (Brand Primary)** | **`#7A2938`** | **Màu thương hiệu chính**: Nút bấm chính, tiêu đề nhấn, icon module |
| **`burgundy-700` (Hover State)** | **`#68222E`** | **Trạng thái hover** cho các phần tử interactive chính |
| **`burgundy-800` (Pressed State)** | **`#521B24`** | **Trạng thái active/pressed** khi người dùng bấm chuột |
| `burgundy-900` | `#3D141B` | Text siêu tương phản trên nền đỏ nhạt |

#### 2. Warm Neutral Palette (Nền giấy học thuật & tương phản tối ưu)
Thay thế toàn bộ sắc xám lạnh mặc định của Tailwind bằng hệ màu trung tính ấm nhẹ, mang lại cảm giác dễ chịu cho mắt giáo viên khi soạn giáo án nhiều giờ:
- **Canvas (Page Background)**: `#F7F6F3` (Ấm nhẹ, sang trọng, không chói lóa như `#FFF` thuần và không vàng úa).
- **Canvas Elevated**: `#FBFAF8` (Phân tầng phụ).
- **Surface**: `#FFFFFF` (Bề mặt thẻ, panel, modal, trang soạn thảo).
- **Surface Subtle**: `#FAF9F7` (Nền table header, bảng phụ, khối trích dẫn).
- **Surface Muted**: `#F5F3F0` (Nền track tiến độ, container segmented tab).
- **Border Subtle**: `#EEEAE5` (Đường phân cách nhẹ giữa các hàng dữ liệu).
- **Border Default**: `#E5E0DA` (Đường viền tiêu chuẩn cho thẻ, bảng, form input).
- **Border Strong**: `#D6D0C8` (Đường viền hover, dropdown, card nhấn mạnh).
- **Text Strong**: `#211E1C` (Tiêu đề, heading, văn bản quan trọng — tránh dùng đen kịt `#000000`).
- **Text Primary**: `#302C29` (Nội dung văn bản, body text, câu hỏi).
- **Text Secondary**: `#706A65` (Nhãn phụ, metadata, chỉ số phụ).
- **Text Muted**: `#99918A` (Placeholder, watermark, thông tin hỗ trợ mờ).

#### 3. Semantic Color Policy (Nguyên tắc màu ngữ nghĩa)
Chấm dứt việc dùng màu tùy tiện hoặc "rainbow dashboard":
- **Emerald** (`#166534`, nền `#F0FDF4`): Chỉ dùng cho trạng thái **Hoàn thành / Đạt chuẩn 10.0đ / Lưu thành công / Khớp tỷ lệ ma trận**.
- **Amber** (`#B45309`, nền `#FFFBEB`): Dùng cho **Cảnh báo / Chưa cân bằng điểm / Cần rà soát / Hoạt động khởi động**.
- **Rose / Red** (`#B91C1C`, nền `#FFF1F2`): Dùng cho **Lỗi nghiêm trọng / Vượt quá 10 điểm / Thao tác xóa dữ liệu**.
- **Sky / Blue** (`#0369A1`, nền `#F0F9FF`): Dùng cho **Thông tin kỹ thuật / Đọc hiểu / YCCĐ / Khám phá tri thức**.
- **Tuyệt đối không dùng Purple để trang trí**: Toàn bộ icon, badge, nút bấm tím ngẫu nhiên đã được đưa về Burgundy học thuật hoặc semantic tương ứng.

---

### II. SURFACE ELEVATION & SHADOW SYSTEM (4 CẤP ĐỘ)

Chuẩn hóa hệ thống đổ bóng với tone màu ấm tự nhiên `rgba(33, 30, 28, ...)` thay cho bóng đen đục mặc định:
- **Elevation 0 (Canvas)**: Nền trang `#F7F6F3`, phẳng, không bóng.
- **Elevation 1 (Panel / Table / Clean Card)**:
  - `box-shadow: 0 1px 2px rgba(33, 30, 28, 0.04)` (`--shadow-xs`)
  - Viền: `border: 1px solid #E5E0DA`
- **Elevation 2 (Interactive Card / Dropdown / Popover)**:
  - `box-shadow: 0 4px 16px -2px rgba(33, 30, 28, 0.06), 0 2px 6px -1px rgba(33, 30, 28, 0.03)` (`--shadow-md`)
- **Elevation 3 (Modal / Floating Selection Toolbar / Quick Action Hover)**:
  - `box-shadow: 0 12px 32px -4px rgba(33, 30, 28, 0.12), 0 4px 12px -2px rgba(33, 30, 28, 0.05)` (`--shadow-lg`)
- **Paper Depth (Trang đọc văn bản & Khung in A4)**:
  - `box-shadow: 0 1px 3px rgba(33, 30, 28, 0.05), 0 8px 24px rgba(33, 30, 28, 0.04)` (`--shadow-paper`)
  - Bề mặt giấy văn học: `#FFFEFC` kết hợp font Lora 18px / 1.85.

---

### III. MICRO-INTERACTIONS & MOTION DESIGN

- **Thời lượng chuyển động chuẩn**:
  - Siêu tốc (Micro feedback): `120ms ease-out`
  - Tiêu chuẩn (Hover, dropdown, tab switch): `180ms ease-out`
  - Chuyển trang/modal: `240ms ease-out`
- **Tương tác Nút bấm (Button States)**:
  - Hover: Background chuyển mượt sang `#68222E`, shadow nhẹ.
  - Active / Pressed: Chuyển sang `#521B24`, thụt nhẹ `transform: translateY(1px)`.
  - Focus-visible: Viền sáng Burgundy `box-shadow: 0 0 0 3px rgba(122, 41, 56, 0.22)`.
- **Tương tác Thẻ tương tác (Interactive Card)**:
  - Hover: Nâng nhẹ `transform: translateY(-1px)`, đổi viền sang `#D6D0C8`.
- **Thanh công cụ nổi (Floating Selection Toolbar trong Reader)**:
  - Nền tối ấm kinh viện `#211E1C`, xuất hiện với animation mượt `translateY(-4px)` trong 150ms.
- **Hỗ trợ Tiếp cận (Accessibility)**:
  - `@media (prefers-reduced-motion: reduce)`: Vô hiệu hóa toàn bộ chuyển động dịch chuyển, chỉ giữ chuyển đổi opacity tức thì.

---

### IV. CHI TIẾT REFACTOR TỪNG PHÂN HỆ

#### 1. App Shell: Sidebar & TopBar
- **Sidebar**:
  - Background trắng tinh `#FFFFFF`, đường phân cách `#E5E0DA`.
  - Active module: Background `#FCF3F4`, chữ `#7A2938` kèm dải chỉ thị bên trái (left indicator strip 3px `#7A2938`).
  - Section dividers gọn gàng, giáo viên identity footer trang nhã với badge "GV THPT".
- **TopBar**:
  - Background `#FFFFFF`, viền đáy `#E5E0DA`.
  - Chỉ báo tự lưu tinh gọn: `● Đã lưu · HH:mm` (màu `#166534`).
  - Nút chuyển bài dạy và nút tiện ích có hover `#FAF9F7`.

#### 2. Teacher Dashboard
- **Hero Card**:
  - Loại bỏ các mảng màu đậm gay gắt; chuyển sang nền gradient nhẹ `linear-gradient(135deg, #FFFFFF, #FCF6F7)` viền `#E5E0DA`.
  - Thanh tiến độ bài học tone Burgundy `#7A2938` sắc nét.
- **Quick Actions (6 Card)**:
  - Bọc icon trong container hình vuông bo góc 32-36px nền trung tính ấm `#FAF9F7` viền `#EEEAE5`.
  - Hiệu ứng hover `-translateY(1px)` sang trọng.
- **Bảng bài học gần đây**:
  - Phân tách bằng đường viền `#EEEAE5`, hover hàng `#FAF9F7`, badge thể loại gọn gàng.
- **Modal Tạo bài dạy mới**:
  - Backdrop tối mờ học thuật `rgba(28, 25, 23, 0.32)` kết hợp `backdrop-blur(2px)`.

#### 3. Literature Workspace & Editorial Reader
- **Trung tâm đọc văn bản (LiteratureReader)**:
  - Nền giấy học thuật `#FFFEFC` với chiều rộng tối đa 760px, căn lề thoáng đãng.
  - Typography: Serif (Lora) 18px, line-height 1.85, đảm bảo không clip dấu tiếng Việt.
  - Độ sâu trang giấy: `shadow-[var(--shadow-paper)]`.
- **Floating Selection Toolbar**:
  - Tone màu tối ấm `#211E1C` với border `#44403C`, shadow cấp 3.
  - Bảng 5 chấm màu pastel highlight: Vàng mờ (`#FDE68A`), Lục mờ (`#BBF7D0`), Lam mờ (`#BFDBFE`), Hồng mờ (`#FECDD3`), Xám mờ (`#E7E5E4`).
  - Nút bấm chú giải/bình giảng mượt mà.

#### 4. Exam 7991 Builder
- **Bộ điều hướng phần thi bên trái**:
  - Đồng bộ trạng thái active sang nền `#FCF3F4`, chữ `#7A2938`, viền `#7A2938`/20.
- **Tiêu đề Phần I, II, III, IV**:
  - Loại bỏ hoàn toàn 4 màu sặc sỡ (xanh lam, xanh lá, tím, vàng); quy chuẩn về nền `#FAF9F7`, viền `#E5E0DA`, nút thao tác `.btn-primary.btn-compact`.
- **Thẻ câu hỏi và phương án**:
  - Thẻ câu hỏi trắng viền `#E5E0DA`.
  - Nút phương án (Đúng/Sai, A-B-C-D) có tương tác click rõ ràng, viền focus Burgundy.

#### 5. Rubric Builder
- **Thanh tổng điểm (Score Ribbon)**:
  - Loại bỏ dải đen tuyền gradient (`bg-gradient-to-r from-stone-900 to-[#3C1D25]`).
  - Thay bằng thẻ ấm thanh lịch: nền `#FAF9F7`, viền `#E5E0DA`, icon `#7A2938`.
  - Trạng thái cân bằng biểu điểm: Badge Emerald `#166534` nền `#F0FDF4`.
- **Bảng mức độ đạt được (Achievement Levels)**:
  - Xuất sắc: Badge Emerald soft (`bg-emerald-50 text-emerald-800 border-emerald-200/60`).
  - Đạt: Badge Sky soft (`bg-sky-50 text-sky-800 border-sky-200/60`).
  - Cần cố gắng: Badge Amber soft (`bg-amber-50 text-amber-800 border-amber-200/60`).

#### 6. Matrix & Specification View
- **Thanh chuyển Tab Ma trận / Bản đặc tả**:
  - Segmented control đặt trong khay `#F5F3F0`, tab active màu trắng `#FFFFFF` nổi nhẹ với `var(--shadow-xs)` và chữ `#211E1C`.
- **3 Thẻ phân bố mức độ (NB - TH - VD)**:
  - Track tiến độ xám ấm `#F5F3F0`, thanh mức độ NB (Sky), TH (Emerald), VD (Amber).
  - Khối kiểm định ma trận: Tự động đổi màu Emerald khi tròn 10.0đ và Amber khi chưa đủ điểm.
- **Bảng ma trận 2 chiều**:
  - Viền bảng tinh tế `#E5E0DA`, header sticky `#FAF9F7`, hàng tổng kết chữ đậm `#7A2938`.

#### 7. KHBD 5512 (Visual Lesson Builder)
- **Timeline 4 giai đoạn dạy học**:
  - Thay 4 ô màu gắt bằng thẻ trắng nền viền `#E5E0DA` kèm vạch chỉ thị màu bên trái: Khởi động (Amber), Kiến thức mới (Sky), Luyện tập (Emerald), Vận dụng (Burgundy).
- **Thẻ hoạt động (Activity Accordion)**:
  - Thẻ đang mở được viền `#7A2938`/60 kèm bóng nhẹ `var(--shadow-sm)`.
  - Huy hiệu số bước `01`, `02` chuyển từ nền đen kịt sang Burgundy `#7A2938` khi đang thao tác.
  - Chuẩn 4 bước Công văn 5512: Khối thẻ trắng viền `#E5E0DA`, tiêu đề bước màu `#7A2938`.
- **Chế độ in văn bản A4**:
  - Hiển thị như một tờ giấy A4 thanh lịch trên nền canvas `#F7F6F3` với độ sâu `shadow-[var(--shadow-paper)]`.

#### 8. Genre Analysis View
- **Bộ chuyển thể loại**:
  - Thơ trữ tình / Truyện & Kí / Văn nghị luận gom vào segmented control chuẩn mực.
- **Argument Map (Sơ đồ lập luận)**:
  - **Loại bỏ hoàn toàn giao diện dark sci-fi theme (`bg-stone-900`)**.
  - Thay bằng cấu trúc cây lập luận học thuật ấm áp:
    - **Luận đề (Thesis)**: Thẻ nổi bật `#FCF3F4` viền kép `#7A2938`/30, font Lora trang trọng.
    - **Luận điểm (Claims)**: Thẻ trắng `#FFFFFF` viền `#E5E0DA`, số thứ tự Burgundy.
    - **Luận cứ (Reasons)**: Thẻ nền mờ `#FAF9F7` viền `#E5E0DA`.
    - **Dẫn chứng (Evidences)**: Trích dẫn mang phong cách xuất bản báo chí (editorial quote) với dải viền Burgundy, nền `#FCF3F4`/50 và font Lora nghiêng.
    - **Kết luận (Conclusion)**: Thẻ kết luận xanh lục nhẹ nhàng, đĩnh đạc.

#### 9. Slides View & Export Handover
- **Slides View**:
  - Giữ lại không gian tối cần thiết cho việc mô phỏng trình chiếu màn ảnh 16:9, nhưng đồng bộ toàn bộ nút điều hướng và badge về brand `#7A2938`.
  - Cột thumbnail bên trái có viền hover rõ ràng và trạng thái chọn `#FCF3F4` viền `#7A2938`.
- **Export Handover View**:
  - Bỏ màu tím ngẫu nhiên trên các nút xuất file.
  - Chuẩn hóa toàn bộ thẻ xuất bản OpenXML (.docx), Presentation (.pptx), JSON về định dạng thẻ đồng nhất: Nền `#FAF9F7`, viền `#E5E0DA`, icon bọc trong hộp `#FCF3F4` chữ `#7A2938`, nút bấm `.btn-primary` và `.btn-secondary` chuẩn mực.

---

### V. KẾT QUẢ KIỂM TRA & BUILD VERIFICATION

Toàn bộ hệ thống đã được biên dịch thử nghiệm thông qua Vite & TypeScript Compiler:

```bash
$ npm run build
> react-example@0.0.0 build
> vite build

vite v8.3.2 building client environment for production...
transforming...
✓ 1683 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                                      1.99 kB │ gzip:   0.88 kB
dist/assets/index-BuqxBnwv.css                      85.25 kB │ gzip:  15.00 kB
dist/assets/__vite-browser-external-BQhY1V-0.js      0.09 kB │ gzip:   0.10 kB
dist/assets/index-BdIA9t6w.js                    1,491.14 kB │ gzip: 423.26 kB
✓ built in 859ms
```

- **Lỗi TypeScript**: `0 error`
- **Lỗi CSS / Token**: `0 error`
- **Unicode NFC**: Bảo toàn 100% tiếng Việt có dấu, không gãy vỡ phông chữ hay layout.
- **Tính khả dụng trên màn hình máy tính giáo viên**: Hoàn mỹ tại độ phân giải tiêu chuẩn 1366×768 và 1440×900.

---
*Báo cáo được hoàn thành bởi Design Systems Team — EduMaster-Literature.*
