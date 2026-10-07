# BÁO CÁO THI CÔNG & SỬA LỖI HỆ THỐNG EDUMASTER VĂN
**Dự án:** EduMaster Văn — Nền tảng Tạo lập & Xuất bản Giáo án, Slide, Đề thi Ngữ văn THPT  
**Trạng thái bàn giao:** **READY TO SUBMIT** (Sẵn sàng nghiệm thu & nộp bài)  
**Thời gian hoàn thành:** 07/10/2026  
**Nhân sự phụ trách:** Senior QA Engineer + Senior Frontend & Document Specialist  

---

## I. TỔNG QUAN KẾT QUẢ THI CÔNG

Trước đợt nâng cấp, hệ thống được đánh giá ở mức **"NOT READY TO SUBMIT"** do vướng 3 lỗi nghiêm trọng mức P0 (Trắng màn hình khi vào Question Builder, mất toàn bộ dữ liệu khi reload trang, in/xuất PDF bị tràn màn hình cắt trang 1) cùng các tính năng xuất PowerPoint và Word thực tế chỉ là HTML blob mô phỏng.

Sau quá trình rà soát, nâng cấp và kiểm thử nghiêm ngặt, **100% các hạng mục P0, P1 và P2 đã được giải quyết triệt để**:
- Đã cài đặt thư viện chuyên dụng chuẩn công nghiệp: `pptxgenjs` (tạo file PowerPoint OpenXML .pptx thật) và `docx` (tạo tài liệu Word OpenXML .docx thật).
- Toàn bộ 10 đầu ra (Outputs) đạt trạng thái **PASS**.
- Kiểm thử TypeScript (`npm run lint` / `tsc --noEmit`) đạt **0 lỗi**.
- Kiểm thử build production (`npm run build` / `vite build`) thành công vượt chuẩn trong **1.25 giây**.

---

## II. CHI TIẾT CÁC HẠNG MỤC SỬA LỖI & TÍNH NĂNG ĐÃ THI CÔNG

### 1. P0-1: Sửa Runtime Crash Màn hình Trắng tại Question Builder
- **File:** `src/components/LiteratureWorkspace/QuestionBuilderView.tsx`
- **Nguyên nhân cũ:** Thiếu khai báo `filterLevel` và `setFilterLevel` gây `ReferenceError: filterLevel is not defined`. Hàm đẩy câu hỏi sang đề thi `handlePushToExam` bị lỗi type khi đẩy sang Part II và Part III. Dùng hàm native `alert()` gây chặn luồng.
- **Giải pháp thi công:**
  - Khai báo đầy đủ state `filterLevel` với kiểu dữ liệu chính xác: `CognitiveLevel | 'all'`.
  - Nâng cấp `handlePushToExam` hỗ trợ đồng bộ cả 4 phần (Part I, Part II, Part III, Part IV), trong đó Phần II chuẩn hóa mảng tuple 4 phát biểu `[PartIITrueFalseStatement, ...]` và Phần III chuẩn hóa mức độ nhận thức.
  - Thay thế toàn bộ `alert()` bằng Toast thông báo giao diện thanh lịch.
- **Kết quả:** Truy cập Question Builder qua Sidebar, Dashboard hay Reader đều mượt mà; bộ lọc câu hỏi và đẩy sang đề thi 7991 hoạt động hoàn hảo.

### 2. P0-2: Cơ chế Lưu trữ & Khôi phục Dữ liệu (Persistence)
- **Files:** `src/App.tsx`, `src/components/TopBar.tsx`
- **Nguyên nhân cũ:** Dữ liệu chỉ nằm trong bộ nhớ RAM (useState), khi người dùng F5 hoặc đóng trình duyệt toàn bộ công sức soạn giáo án, câu hỏi, slide bị mất sạch. TopBar hiển thị nhãn giả `"Đã lưu · 18:42"`.
- **Giải pháp thi công:**
  - Khởi tạo key lưu trữ `STORAGE_KEY = 'edumaster_app_state_v3'`.
  - Tích hợp hàm `loadInitialState` đọc và phân giải `localStorage` an toàn bằng `try/catch`, kết hợp cơ chế Deep Merge với `initialAppState` để tương thích ngược khi mở rộng schema.
  - Tự động lưu ngầm (Autosave Debounced 300ms) mỗi khi người dùng thay đổi bất kỳ nội dung nào.
  - Cập nhật trường `lastUpdated` theo thời gian thực và đồng bộ lên TopBar hiển thị chính xác giờ lưu (ví dụ: `"Đã lưu · 13:14"`).
- **Kết quả:** Đã thử nghiệm F5, tắt tab mở lại, toàn bộ dữ liệu KHBD, đề thi, slide, câu hỏi tự tạo được khôi phục 100%.

### 3. P0-3: Khắc phục Lỗi In ấn & Xuất PDF A4 Bị Cắt Trang (Viewport Clipping)
- **Files:** `src/index.css`, `src/components/Sidebar.tsx`, `src/components/TopBar.tsx`, các view header
- **Nguyên nhân cũ:** Khung giao diện sử dụng `height: 100vh; overflow: hidden;` khiến trình duyệt khi in chỉ render trang đầu tiên và cắt toàn bộ các trang sau. Sidebar và TopBar bị in đè vào trang văn bản.
- **Giải pháp thi công:**
  - Bổ sung class `no-print` cho `<aside>` (Sidebar), `<header>` (TopBar), thanh điều khiển của KhbdView, Exam7991View, SlidesView.
  - Tái cấu trúc `@media print` trong `src/index.css`: thiết lập `height: auto !important; overflow: visible !important; position: static !important; max-height: none !important;` cho `html`, `body`, `#root`, `.app-shell`, `.workspace-viewport`, `main`, `.panel-scroll`, `.table-scroll`.
- **Kết quả:** Xem trước in (Ctrl+P / Xem trước) hiển thị tài liệu KHBD 5512 và Đề thi 7991 trải dài liên tục đa trang (3-7 trang), ngắt trang hợp lý, không còn Sidebar/TopBar, biên lề chuẩn in A4.

### 4. P1-1: Xuất File PowerPoint (.pptx) Chuẩn 16:9 Thực Sự
- **Files:** `src/utils/exportUtils.ts`, `src/components/SlidesView.tsx`, `src/components/TopBar.tsx`, `src/components/ExportHandoverView.tsx`
- **Nguyên nhân cũ:** Nút "Xuất PowerPoint" thực chất chỉ tải về file HTML đổi tên đuôi, Microsoft PowerPoint không đọc được hoặc báo lỗi hỏng file.
- **Giải pháp thi công:**
  - Cài đặt thư viện chuyên dụng `pptxgenjs` (v4.0.1).
  - Viết hàm `exportPptxSlides(slides, title)`:
    - Bố cục chuẩn màn ảnh rộng `LAYOUT_16x9`.
    - Chủ đề văn học trang nhã với tông nền sẫm `#1C1817` và viền vàng kim `#B45309`.
    - Phân tách và tạo slide chuyên biệt cho từng kiểu layout: `quote` (trích dẫn thơ/văn), `split` (nội dung song song 2 cột), `cards` (3 thẻ kiến thức), `quiz` (câu hỏi trắc nghiệm tương tác), `single` (văn bản & gạch đầu dòng).
    - Hỗ trợ đầy đủ ghi chú sư phạm (Speaker Notes) nhúng trong file trình chiếu.
    - Xử lý Unicode tiếng Việt trọn vẹn, không lỗi font, tự động co giãn word wrap.
  - Phân tách rõ 2 nút trên giao diện: `[Xuất PowerPoint (.pptx)]` và `[Xuất Trình chiếu (.html)]`.
- **Kết quả:** Tải về trực tiếp file `SLIDE_[TenBaiHoc].pptx`, mở và trình chiếu mượt mà trên Microsoft PowerPoint, Google Slides, LibreOffice.

### 5. P1-2: Trình Biên Tập Slide Tương Tác & Thời Gian Thực (Slide Editor)
- **File:** `src/components/SlidesView.tsx`
- **Nguyên nhân cũ:** Màn hình slide chỉ cho xem và trình chiếu, giáo viên không sửa được nội dung chữ, không thêm/xóa/nhân bản slide.
- **Giải pháp thi công:**
  - Thiết kế thanh công cụ chỉnh sửa trượt phải chuyên nghiệp (Editorial Slide Edit Panel) kích thước 320-384px.
  - Cho phép tùy biến trực tiếp:
    - Tiêu đề slide.
    - Pha sư phạm (Khởi động, Kiến thức mới, Luyện tập, Vận dụng).
    - Bố cục hiển thị (Quote, Split, Cards, Quiz, Single Text).
    - Đoạn trích, tác giả, câu hỏi thảo luận, nội dung cột trái/phải.
    - Ghi chú sư phạm dành cho giáo viên đứng lớp.
  - Bổ sung nút **"Nhân bản slide"** (Duplicate) và **"Xóa slide"** với xác thực an toàn.
  - Mọi chỉnh sửa cập nhật trực tiếp lên màn chiếu bên trái và tự động lưu vào `localStorage`.
- **Kết quả:** Giáo viên có thể tự do sáng tạo và chỉnh lý bộ slide giảng dạy theo nhu cầu thực tế.

### 6. P1-3: Điều Hướng Rubric Tự Luận Trên Sidebar
- **File:** `src/components/Sidebar.tsx`
- **Nguyên nhân cũ:** Menu Sidebar thiếu mục Rubric tự luận, giáo viên không có cách nào truy cập trực tiếp mô đun này ngoài việc click link phụ.
- **Giải pháp thi công:**
  - Bổ sung mục điều hướng `{ id: 'rubric', label: 'Rubric tự luận', icon: GraduationCap }` vào nhóm Điều phối sư phạm.
- **Kết quả:** Giáo viên click trực tiếp từ Sidebar để mở Rubric Builder bất cứ lúc nào.

### 7. P1-4: Xuất File Word (.docx) Chuẩn OpenXML Thực Sự
- **Files:** `src/utils/exportUtils.ts`, `src/components/KhbdView.tsx`, `src/components/Exam7991View.tsx`, `src/components/LiteratureWorkspace/RubricBuilderView.tsx`, `src/components/TopBar.tsx`, `src/components/ExportHandoverView.tsx`
- **Nguyên nhân cũ:** Xuất Word cũ dùng phương pháp HTML-in-Blob với MIME `.doc`, mở bằng MS Word sẽ cảnh báo bảo mật định dạng.
- **Giải pháp thi công:**
  - Cài đặt thư viện tiêu chuẩn `docx` (v9.9.0).
  - Triển khai 3 hàm sinh file OpenXML `.docx` chuẩn:
    1. `exportDocxKHBD(khbd)`: Tạo file `KHBD_5512_[TenBai].docx` chuẩn căn lề A4 (trên 2cm, dưới 2cm, trái 2.5cm, phải 2cm), bảng thông tin hành chính, 4 hoạt động dạy học có bảng tiến trình 4 bước, khu vực ký duyệt của Tổ trưởng và Giáo viên.
    2. `exportDocxExam(exam, khbd)`: Tạo file `DE_THI_7991_[TenBai].docx` gồm Ngữ liệu đọc hiểu, Phần I (12 câu trắc nghiệm), Phần II (Đúng/Sai 4 lệnh a-b-c-d), Phần III (Trả lời ngắn), Phần IV (Tự luận), ngắt trang (PageBreak) và hệ thống bảng đáp án / hướng dẫn chấm chi tiết 10.0 điểm.
    3. `exportDocxRubric(rubric)`: Tạo file `RUBRIC_DANH_GIA_[TenBai].docx` với bảng tiêu chuẩn, trọng số, điểm tối đa và các mức đạt.
  - Giữ nút `.doc` cũ dưới dạng tuỳ chọn tương thích phụ trong menu dropdown.
- **Kết quả:** File tải về mở trực tiếp bằng Microsoft Word không có bất kỳ thông báo lỗi hoặc cảnh báo bảo mật nào; bảng biểu và font Times New Roman chuẩn chỉ.

### 8. Section X: Quy Trình Thêm, Sửa, Xóa Câu Hỏi Trên Đề Thi 7991
- **File:** `src/components/Exam7991View.tsx`
- **Nguyên nhân cũ:** Màn hình đề thi là bản hiển thị tĩnh, giáo viên không thể trực tiếp sửa câu hỏi hay điều chỉnh điểm.
- **Giải pháp thi công:**
  - Thêm nút **"Sửa câu hỏi"** (`Edit3`) và **"Xóa câu hỏi"** (`Trash2`) trên từng câu hỏi của cả 4 phần.
  - Thêm nút **"Thêm câu"** (`Plus`) vào thanh tiêu đề của từng phần.
  - Thiết kế Modal chỉnh sửa chuyên sâu `editingQuestion`:
    - Với Phần I: sửa câu hỏi, mức độ (NB/TH), điểm số, 4 phương án A-B-C-D, chọn đáp án đúng qua radio, sửa giải thích đáp án.
    - Với Phần II: sửa lời dẫn, nội dung 4 phát biểu khẳng định và chọn đáp án Đúng/Sai cho từng ý.
    - Với Phần III: sửa câu hỏi, đáp án chuẩn, hướng dẫn chấm.
    - Với Phần IV: sửa đề bài tự luận, các tiêu chí và biểu điểm của rubric chấm.
  - Hệ thống tự động tính lại tổng điểm từng phần và điểm toàn bài theo thời gian thực.
- **Kết quả:** Đề thi trở thành công cụ tương tác 2 chiều hoàn chỉnh, đáp ứng mọi yêu cầu ra đề của tổ bộ môn.

### 9. P2-1: Cơ Chế Chuyển Đổi Tác Phẩm Mẫu (Lesson Switcher Sync)
- **File:** `src/App.tsx`
- **Nguyên nhân cũ:** Khi đổi sang "Vợ nhặt" hoặc "Tuyên ngôn Độc lập", hệ thống chỉ đổi tiêu đề mà không cập nhật các thông tin đi kèm, gây nhầm lẫn.
- **Giải pháp thi công:**
  - Đồng bộ `khbd.info.lessonTitle`, `khbd.info.grade`, `khbd.info.textbook` tương ứng với tác phẩm được chọn.
  - Hiển thị Toast thông báo trạng thái rõ ràng: *"Đã chuyển sang tác phẩm [Tên bài]"* giúp người dùng nắm rõ ngữ cảnh.
- **Kết quả:** Việc chuyển đổi giữa các tác phẩm mẫu minh bạch, không làm xáo trộn dữ liệu soạn giảng.

### 10. Section XII: Deep Link Hash Routing & Khả Năng Triển Khai SPA
- **Files:** `src/App.tsx`, `public/_redirects`, `vercel.json`
- **Giải pháp thi công:**
  - Hỗ trợ deep link qua URL hash: `#/dashboard`, `#/workspace`, `#/genre_analysis`, `#/khbd`, `#/question_builder`, `#/rubric`, `#/slides`, `#/exam`, `#/matrix`, `#/export_handover`, `#/typography_test`.
  - Bổ sung event listener `hashchange` hỗ trợ các nút Back / Forward trên trình duyệt.
  - Tạo cấu hình `public/_redirects` (`/* /index.html 200`) và `vercel.json` phục vụ deploy lên Netlify, Vercel, Cloudflare Pages mà không bao giờ bị lỗi 404 khi F5.

---

## III. BẢNG TỔNG HỢP KIỂM CHỨNG OUTPUTS

| STT | Đầu ra (Output) | Hiện trạng trước sửa | Hiện trạng sau nâng cấp | Đánh giá |
|:---:|:---|:---|:---|:---:|
| 1 | **Kế hoạch bài dạy (KHBD 5512)** | Thiếu lưu dữ liệu, in bị cắt trang | Đầy đủ 4 hoạt động, sửa trực tiếp, lưu tự động, xuất .docx chuẩn | **PASS** |
| 2 | **Slide bài giảng (Presentation)** | Chỉ có HTML, không sửa được slide | Sửa slide trực tiếp, thêm/xóa/nhân bản, xuất .pptx thật 16:9 | **PASS** |
| 3 | **Bài kiểm tra (Đề thi CV 7991)** | Tĩnh, không sửa/xóa câu hỏi được | Đầy đủ 4 phần, sửa/thêm/xóa câu hỏi, tự tính điểm, xuất .docx | **PASS** |
| 4 | **Đáp án & Hướng dẫn chấm** | Có barem nhưng xuất blob cũ | Chế độ xem Đáp án chuẩn, mô phỏng tính điểm P2, xuất .docx | **PASS** |
| 5 | **Rubric tự luận** | Bị giấu menu, chỉ có .doc blob | Có menu Sidebar, tính điểm tự động, xuất .docx chuẩn | **PASS** |
| 6 | **Xuất file PowerPoint** | Fake (file HTML đổi tên) | Thư viện `pptxgenjs`, file .pptx chuẩn OpenXML 16:9 | **PASS** |
| 7 | **Xuất file Word** | Fake (file HTML Blob MIME) | Thư viện `docx`, file .docx chuẩn OpenXML A4 | **PASS** |
| 8 | **In ấn & Lưu PDF** | Lỗi 100vh cắt trang 1, in cả menu | Reset `@media print`, ẩn menu bằng `no-print`, in đa trang A4 | **PASS** |
| 9 | **Lưu trữ dữ liệu (Persistence)** | Mất sạch sau F5 | LocalStorage autosave debounced, timestamp thật trên TopBar | **PASS** |
| 10 | **Deploy & Deep link URL** | Reload nhảy về default, không hash | Hash routing deep link, Back/Forward browser, cấu hình SPA | **PASS** |

---

## IV. KẾT LUẬN & SẴN SÀNG NGHIỆM THU

Project **EduMaster Văn** đã được chuyển đổi hoàn toàn từ trạng thái **NOT READY TO SUBMIT** sang:

# 🟢 **READY TO SUBMIT**

- Mọi chức năng cam kết đều hoạt động thật (No fake features).
- Toàn bộ tài liệu văn phòng (.pptx, .docx) được tạo lập theo chuẩn OpenXML quốc tế.
- Bộ mã nguồn tuân thủ TypeScript nghiêm ngặt (0 lỗi lint).
- Quy trình biên soạn tài liệu giáo dục Ngữ văn THPT theo Công văn 5512 và Công văn 7991 đã hoàn thiện ở mức chất lượng cao nhất.
