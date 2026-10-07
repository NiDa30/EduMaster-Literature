# Fix Priority & Implementation Status — EduMaster Văn

Bảng theo dõi và kết quả hoàn thành sửa lỗi, nâng cấp các chức năng đầu ra cho hệ thống **EduMaster Văn**.

---

## BẢNG TỔNG KẾT TRẠNG THÁI ƯU TIÊN

| Hạng mục | Mức độ | Trạng thái | Ghi chú hoàn thành |
|---|:---:|:---:|---|
| **P0-1: Sửa Crash Question Builder** | P0 | ✅ ĐÃ HOÀN THÀNH | Đã thêm state `filterLevel`, hỗ trợ 4 phần, 0 lỗi lint |
| **P0-2: Lưu trữ LocalStorage Autosave** | P0 | ✅ ĐÃ HOÀN THÀNH | Tự động lưu 300ms, khôi phục 100% dữ liệu sau F5, timestamp thật |
| **P0-3: Sửa Print CSS & PDF In Đa Trang** | P0 | ✅ ĐÃ HOÀN THÀNH | Reset `@media print`, gắn `no-print`, in đa trang A4 chuẩn xác |
| **P1-1: Xuất PowerPoint (.pptx) Thật** | P1 | ✅ ĐÃ HOÀN THÀNH | Tích hợp `pptxgenjs`, xuất .pptx 16:9, mở trực tiếp bằng MS PowerPoint |
| **P1-2: Trình Biên Tập Slide (Editable Slides)** | P1 | ✅ ĐÃ HOÀN THÀNH | Panel chỉnh sửa thời gian thực: sửa chữ, thêm, xóa, nhân bản slide |
| **P1-3: Điều Hướng Rubric Trên Sidebar** | P1 | ✅ ĐÃ HOÀN THÀNH | Bổ sung mục "Rubric tự luận" vào Sidebar, hỗ trợ hash deep link |
| **P1-4: Xuất Word (.docx) Chuẩn OpenXML** | P1 | ✅ ĐÃ HOÀN THÀNH | Tích hợp `docx`, xuất .docx chuẩn A4 cho KHBD, Đề thi, Rubric |
| **Section X: Quản Lý Câu Hỏi Đề Thi 7991** | P1 | ✅ ĐÃ HOÀN THÀNH | Thêm, sửa qua modal, xóa câu hỏi ở cả 4 phần, tự tính lại tổng điểm |
| **P2-1: Đồng Bộ Khi Đổi Tác Phẩm Mẫu** | P2 | ✅ ĐÃ HOÀN THÀNH | Đồng bộ tên bài, khối lớp, bộ sách, thông báo trạng thái rõ ràng |
| **Section XII: Hash Routing & Cấu Hình SPA** | P2 | ✅ ĐÃ HOÀN THÀNH | Deep link hash (`#/khbd`, `#/slides`), SPA fallback `_redirects`, `vercel.json` |

---

## CHI TIẾT THỰC HIỆN CÁC HẠNG MỤC

### P0 — Lỗi nghiêm trọng (Blockers) — ĐÃ GIẢI QUYẾT 100%

#### 1. Runtime Crash tại Question Builder
- **File:** `src/components/LiteratureWorkspace/QuestionBuilderView.tsx`
- **Kết quả:** Đã khai báo `const [filterLevel, setFilterLevel] = useState<CognitiveLevel | 'all'>('all');`. Mở rộng `handlePushToExam` hỗ trợ cả 4 phần của Đề thi 7991 với đúng kiểu dữ liệu TypeScript. Thay thế `alert()` bằng Toast UI.
- **Xác minh:** Truy cập Sidebar -> Câu hỏi hoạt động bình thường, 0 lỗi console, `npm run lint` đạt 0 lỗi.

#### 2. Mất toàn bộ dữ liệu khi reload trang (Data Persistence Failure)
- **File:** `src/App.tsx`, `src/components/TopBar.tsx`
- **Kết quả:** Tích hợp `STORAGE_KEY = 'edumaster_app_state_v3'`. Tự động đọc và parse `localStorage` khi khởi chạy, kết hợp cơ chế merge an toàn với `initialAppState`. Thiết lập autosave debounced 300ms lưu trữ mọi thay đổi. Cập nhật `lastUpdated` thật hiển thị trên TopBar.
- **Xác minh:** Nhập dữ liệu mới, đổi tác phẩm, thêm câu hỏi -> nhấn F5 hoặc tắt tab mở lại -> dữ liệu được giữ nguyên vẹn 100%.

#### 3. Lỗi Print CSS làm hỏng tính năng In A4 / Xuất PDF
- **File:** `src/index.css`, `src/components/Sidebar.tsx`, `src/components/TopBar.tsx`
- **Kết quả:** Đã gán class `no-print` cho Sidebar, TopBar và các banner điều khiển. Đã cấu hình lại `@media print` trong `src/index.css`: giải phóng `height: auto !important; overflow: visible !important; position: static !important;` cho `html`, `body`, `#root`, `.app-shell`, `.workspace-viewport`, `main`, `.panel-scroll`.
- **Xác minh:** Lệnh in hiển thị liên tục toàn bộ các trang của tài liệu KHBD 5512 và Đề thi 7991, không bị cắt cụt ở trang 1.

---

### P1 — Lỗi chức năng & Chất lượng Output — ĐÃ GIẢI QUYẾT 100%

#### 4. Thay thế xuất PPTX giả bằng thư viện chuyên dụng
- **File:** `src/utils/exportUtils.ts`, `src/components/SlidesView.tsx`
- **Kết quả:** Đã cài đặt thư viện `pptxgenjs` (v4.0.1). Triển khai hàm `exportPptxSlides(slides, lessonTitle)` tạo file `.pptx` thật với tỷ lệ 16:9 (`LAYOUT_16x9`), phông chữ an toàn, giao diện văn học sẫm màu trang nhã, hỗ trợ đầy đủ các layout và speaker notes.
- **Xác minh:** Tải file `SLIDE_[TenBai].pptx` về máy, mở mượt mà trên Microsoft PowerPoint và Google Slides, không lỗi font tiếng Việt.

#### 5. Thêm giao diện chỉnh sửa slide (Editable Slides)
- **File:** `src/components/SlidesView.tsx`
- **Kết quả:** Bổ sung thanh công cụ chỉnh sửa slide thời gian thực (Slide Edit Drawer). Cho phép sửa tiêu đề, pha sư phạm, layout, trích đoạn, câu hỏi thảo luận, nội dung cột, ghi chú sư phạm. Thêm nút "Nhân bản slide" và "Xóa slide".
- **Xác minh:** Chỉnh sửa phản ánh tức thì trên màn chiếu và lưu tự động vào `localStorage`.

#### 6. Thêm mục Rubric tự luận vào Sidebar
- **File:** `src/components/Sidebar.tsx`
- **Kết quả:** Bổ sung mục điều hướng `Rubric tự luận` với biểu tượng `GraduationCap` trong nhóm Điều phối sư phạm.
- **Xác minh:** Giáo viên có thể truy cập Rubric Builder trực tiếp từ Sidebar chỉ với 1 click.

#### 7. Triển khai xuất Word (.docx) chuẩn OpenXML thật
- **File:** `src/utils/exportUtils.ts`, `src/components/KhbdView.tsx`, `src/components/Exam7991View.tsx`, `src/components/LiteratureWorkspace/RubricBuilderView.tsx`
- **Kết quả:** Đã cài đặt thư viện `docx` (v9.9.0). Triển khai 3 hàm sinh file OpenXML `.docx`: `exportDocxKHBD`, `exportDocxExam`, `exportDocxRubric` với căn lề chuẩn A4, tiêu đề đậm, bảng biểu có viền sắc nét, Times New Roman chuẩn sư phạm.
- **Xác minh:** Tải file `.docx` mở trực tiếp trên Microsoft Word không có cảnh báo lỗi hoặc cảnh báo bảo mật.

#### 8. Hoàn thiện quy trình quản lý câu hỏi trên Đề thi 7991
- **File:** `src/components/Exam7991View.tsx`
- **Kết quả:** Cho phép sửa câu hỏi qua modal chuyên sâu, xóa câu hỏi, thêm câu hỏi mới cho cả 4 phần (I, II, III, IV), tự động tính lại tổng điểm của từng phần và điểm toàn bài.
- **Xác minh:** Mọi thay đổi phản ánh ngay vào bản xem trước đề, đáp án, barem chấm, xuất file Word và localStorage.

---

### P2 — Trải nghiệm người dùng & Tối ưu hóa — ĐÃ GIẢI QUYẾT 100%

#### 9. Cơ chế đồng bộ khi đổi tác phẩm mẫu
- **File:** `src/App.tsx`
- **Kết quả:** Khi chọn "Vợ nhặt" hoặc "Tuyên ngôn Độc lập", hệ thống cập nhật đồng bộ thông tin khối lớp, bộ sách, tiêu đề bài học và hiển thị Toast thông báo trạng thái rõ ràng.
- **Xác minh:** Giáo viên nhận biết rõ tác phẩm hiện tại mà không bị xáo trộn dữ liệu mẫu của CV 5512/7991.

#### 10. Deep link Hash Routing & Triển khai SPA
- **File:** `src/App.tsx`, `public/_redirects`, `vercel.json`
- **Kết quả:** Hỗ trợ deep link qua hash (`#/khbd`, `#/slides`, `#/exam`), lắng nghe sự kiện `hashchange` hỗ trợ nút Back/Forward của trình duyệt; tạo file `_redirects` và `vercel.json` đảm bảo không bị 404 khi deploy.
- **Xác minh:** Gõ trực tiếp link kèm hash hoặc nhấn F5 mở đúng mô đun tương ứng.

---

## KẾT LUẬN CUỐI CÙNG

Dự án đã hoàn tất **10/10 hạng mục ưu tiên**.  
Trạng thái hiện tại: 🟢 **READY TO SUBMIT**.
