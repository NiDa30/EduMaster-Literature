# BÁO CÁO TRIỂN KHAI THIẾT KẾ MỚI: COLOR SYSTEM & MOTION DESIGN
**Dự án**: EduMaster-Literature  
**Tài liệu tham chiếu**:  
- [`docs/design/design_coler.md`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/docs/design/design_coler.md)
- [`docs/design/design_animation.md`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/docs/design/design_animation.md)  
**Ngày hoàn thành**: 08/10/2026  
**Trạng thái**: Hoàn tất 100% · Toàn bộ 167/167 tests đạt chuẩn PASS · Production Build thành công  

---

## 1. TỔNG QUAN TRIỂN KHAI

Hệ thống UI/UX của **EduMaster Văn** đã được chuyển hóa toàn diện theo ngôn ngữ thiết kế:
> **"Academic + Editorial + Premium + Calm + Warm + Professional"**

Loại bỏ hoàn toàn cảm giác "Tailwind mặc định" và phong cách "SaaS Dashboard doanh nghiệp khô cứng", thay vào đó là không gian soạn bài giảng và khảo thí học thuật dành riêng cho giáo viên Ngữ văn THPT.

---

## 2. HỆ THỐNG MÀU SẮC (COLOR SYSTEM V4.0)

### 2.1. Thang Tonal Burgundy Học Thuật (Brand Scale)
| Tên Token | Hex Code | Ứng Dụng |
|---|---|---|
| `burgundy-25` | `#FCF3F4` | Active navigation background, selection highlight, reader tint |
| `burgundy-50` | `#F8EAEB` | Hover background trên các phần tử active |
| `burgundy-100` | `#F0D0D5` | Border rất nhẹ cho alert & tag mềm |
| `burgundy-200` | `#ECC2C9` | Avatar border, badge border |
| `burgundy-300` | `#DC98A4` | Secondary decoration, subtle icons |
| `burgundy-400` | `#B84D60` | Accent text nhẹ |
| `burgundy-500` | `#993345` | Hover của secondary elements |
| **`burgundy-600` (Brand Primary)** | **`#7A2938`** | **Nút bấm chính (`btn-primary`), Brand logo, Active tab border, Selected state** |
| **`burgundy-700` (Primary Hover)** | **`#68232F`** | **Hover state của `btn-primary`** |
| **`burgundy-800` (Primary Pressed)** | **`#541C26`** | **Active/Pressed state của `btn-primary`** |
| `burgundy-900` | `#3D141C` | Deep contrast text, header chuyên sâu |

### 2.2. Nền Trung Tính Ấm Áp (Warm Neutral Foundation)
- **Canvas (`#F7F6F3`)**: Nền ứng dụng chính, ấm áp tự nhiên thay cho xám lạnh `#F8FAFC`.
- **Canvas Elevated (`#FBFAF8`)**: Nền phân tách không gian làm việc.
- **Surface (`#FFFFFF`)**: Bề mặt panel, card nội dung.
- **Surface Subtle (`#FAF9F7`)**: Nền phụ bên trong card, bảng biểu (table header).
- **Surface Muted (`#F5F3F0`)**: Nền filter switcher, thanh công cụ lồng ghép.
- **Surface Paper (`#FFFEFC`)**: Bề mặt trang đọc văn bản & bản in A4 (phối cùng font Lora 18px / line-height 1.85).

### 2.3. Đường Viền & Văn Bản (Borders & Typography Contrast)
- **Border Subtle (`#EEEAE5`)**: Đường kẻ phân cách nội bộ (divider).
- **Border Default (`#E5E0DA`)**: Viền card, input, table, panel chuẩn.
- **Border Strong (`#D6D0C8`)**: Viền nhấn, active border khi focus.
- **Text Strong (`#211E1C`)**: Tiêu đề trang, tiêu đề tác phẩm (tương phản cao nhưng êm mắt).
- **Text Primary (`#302C29`)**: Nội dung chính của bài giảng, đề thi.
- **Text Secondary (`#706A65`)**: Nhãn metadata, mô tả phụ, hướng dẫn.
- **Text Muted (`#99918A`)**: Placeholder, icon phụ.

### 2.4. Màu Ngữ Nghĩa Dịu Nhẹ (Semantic Soft Tints)
- **Emerald** (`#166534` / nền `#F0FDF4`): Hoàn thành bài soạn, cân bằng ma trận 10.0đ, tiêu chí xuất sắc.
- **Amber** (`#B45309` / nền `#FFFBEB`): Cảnh báo, cần chú ý, chưa cân đối điểm.
- **Rose** (`#B91C1C` / nền `#FFF1F2`): Lỗi dữ liệu, hành động xóa.
- **Blue / Slate** (`#1E40AF` / nền `#EFF6FF`): Thông tin hệ thống, loại câu hỏi đọc hiểu.

---

## 3. HỆ THỐNG CHUYỂN ĐỘNG & VI TƯƠNG TÁC (MOTION DESIGN)

### 3.1. Motion Tokens
- `--motion-instant: 90ms`: Hover màu, active click, tooltip.
- `--motion-fast: 120ms`: Chuyển tab, đóng mở dropdown, chevron xoay.
- `--motion-normal: 180ms`: Modal xuất hiện, panel đóng mở, drawer trượt.
- `--motion-emphasis: 240ms`: Toast notification vào/ra, hoàn tất lưu bài.
- **Easings**:
  - `--ease-standard: cubic-bezier(0.2, 0, 0, 1)` (chuyển động tự nhiên).
  - `--ease-enter: cubic-bezier(0, 0, 0.2, 1)` (vào khung nhìn nhanh rồi hãm phanh êm).
  - `--ease-exit: cubic-bezier(0.4, 0, 1, 1)` (ra khỏi khung nhìn dứt khoát).

### 3.2. Micro-interactions Chi Tiết
1. **Nút Bấm (`.btn-primary`, `.btn-secondary`, `.btn-ghost`)**:
   - Trạng thái `:active`: `transform: scale(0.985)` phản hồi bấm vật lý chân thực.
   - Nút icon (`.btn-icon`): `transform: scale(0.96)`.
2. **Card Tương Tác (`.card-interactive`)**:
   - Hover nâng nhẹ: `transform: translateY(-1px)`, bóng đổ từ `var(--shadow-xs)` lên `var(--shadow-md)`.
3. **Modal Dialogs**:
   - Backdrop: `anim-modal-backdrop` (fade-in 180ms).
   - Dialog box: `anim-modal-dialog` (từ `scale(0.98) translateY(4px)` mượt mà tới `scale(1) translateY(0)`).
4. **Dropdown Menus**:
   - Dropdown Lesson Switcher & Xuất bản: `anim-dropdown` (từ `translateY(-4px)` với easing enter).
5. **Floating Selection Toolbar**:
   - Toolbar bôi đen văn bản phân tích: `anim-selection-toolbar`.
6. **Accordion Chevrons**:
   - Mũi tên thu gọn tiến trình hoạt động KHBD xoay mượt `180deg` với `--motion-fast`.
7. **Accessibility (Trợ Năng)**:
   - Tích hợp `@media (prefers-reduced-motion: reduce)` tự động vô hiệu hóa toàn bộ chuyển động nếu người dùng kích hoạt cài đặt giảm chuyển động trong hệ điều hành.

---

## 4. DANH SÁCH TỆP ĐÃ ĐƯỢC CHUẨN HÓA

- [`src/theme/tokens.ts`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/theme/tokens.ts): Hệ thống token v4.0 (Colors, Surface, Elevation, Typography, Motion, Badges).
- [`src/index.css`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/index.css): Biến CSS motion, keyframes modal/dropdown/toast, button active states, reduced-motion rules.
- [`src/components/TeacherDashboard.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/TeacherDashboard.tsx): Modal tạo bài dạy có `anim-modal-backdrop` & `anim-modal-dialog`.
- [`src/components/TopBar.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/TopBar.tsx): Dropdown bài học & menu xuất file với `anim-dropdown`.
- [`src/components/LiteratureWorkspace/LiteratureReader.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/LiteratureWorkspace/LiteratureReader.tsx): Thanh công cụ chọn từ ngữ `anim-selection-toolbar`, toast `anim-toast`, modal chú thích.
- [`src/components/LiteratureWorkspace/GenreAnalysisView.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/LiteratureWorkspace/GenreAnalysisView.tsx): Toast `anim-toast` và hệ thống màu luận điểm.
- [`src/components/KhbdView.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/KhbdView.tsx): Dropdown xuất file, chevron accordion xoay mượt, các bước tiến trình chuẩn burgundy `#7A2938`.
- [`src/components/Exam7991View.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/Exam7991View.tsx): Dropdown xuất tệp, modal sửa câu hỏi, mã đề và trích đoạn chuẩn màu học thuật.
- [`src/components/SlidesView.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/SlidesView.tsx): Toast notification, panel sửa slide, focus border `#7A2938`.
- [`src/components/LiteratureWorkspace/QuestionBuilderView.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/LiteratureWorkspace/QuestionBuilderView.tsx): Header, form thêm câu hỏi, toast lưu trữ chuẩn hóa.
- [`src/components/LiteratureWorkspace/RubricBuilderView.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/LiteratureWorkspace/RubricBuilderView.tsx): Dropdown xuất Rubric với `anim-dropdown`.
- [`src/components/MatrixView.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/MatrixView.tsx): Bảng ma trận 2 chiều, ribbon phân bổ tỷ lệ nhận biết/thông hiểu/vận dụng.
- [`src/components/Sidebar.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/Sidebar.tsx): Dải chỉ báo active, avatar giáo viên, hiệu ứng chuyển tab mượt mà.
- [`src/components/TypographyTestView.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/TypographyTestView.tsx): Kiểm thử toàn bộ thang typography và kiểm tra diacritics tiếng Việt.
- [`src/utils/exportUtils.ts`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/utils/exportUtils.ts): Nút in ấn và màu thương hiệu HTML trình chiếu offline.

---

## 5. KẾT QUẢ KIỂM THỬ & BUILD

### Kiểm Thử Tự Động (Vitest)
```bash
Test Files  19 passed (19)
     Tests  167 passed (167)
  Duration  13.39s
```
- **100% Pass rate**: Cả 19 tệp kiểm thử (Unit test, API adapter test, Functional test, Autosave test, Export test, Persistence test) đều vượt qua xuất sắc.
- Không phát sinh bất kỳ xung đột nào đối với dữ liệu người dùng, cấu trúc đề thi 7991, KHBD 5512 hay các chức năng xuất Word (.docx/.doc) và trình chiếu (.pptx/.html).

### Biên Dịch Sản Phẩm (Vite Build)
```bash
vite v8.3.2 building client environment for production...
✓ 1683 modules transformed.
dist/index.html                                      1.99 kB │ gzip:   0.88 kB
dist/assets/index-Cx-X9DkP.css                      89.87 kB │ gzip:  15.69 kB
dist/assets/index-DHiANTtn.js                    1,492.19 kB │ gzip: 423.64 kB
✓ built in 882ms
```
Hoàn toàn không có lỗi cú pháp, linting hay type error.
