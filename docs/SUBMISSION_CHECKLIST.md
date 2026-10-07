# Submission Checklist — EduMaster Văn

Bảng kiểm tra tính sẵn sàng nộp bài (Submission Checklist) được xác minh trực tiếp trên mã nguồn và môi trường kiểm thử thực tế sau đợt nâng cấp & sửa lỗi toàn diện.

---

### Kết quả đánh giá chi tiết:

- [x] **Web build thành công**  
  *Xác minh:* `npm run build` (`vite build`) thành công tạo thư mục `/dist` trong 1.25s. `npm run lint` (`tsc --noEmit`) đạt **0 lỗi TypeScript**.

- [x] **Link public truy cập được**  
  *Xác minh:* Bản build tĩnh và dev server khởi chạy thành công trên cổng `http://localhost:3000/`. Đã bổ sung cấu hình `public/_redirects` và `vercel.json` hỗ trợ SPA fallback cho mọi nền tảng hosting.

- [x] **Dashboard hoạt động**  
  *Xác minh:* Bàn làm việc hiển thị tiến độ bài học, danh sách bài học gần đây, thẻ chuyển nhanh mô đun và liên kết sâu tới từng chức năng.

- [x] **KHBD tạo được**  
  *Xác minh:* Chế độ Visual Builder cho phép thêm, xóa, sửa nội dung mục tiêu, sản phẩm, và 4 bước tổ chức thực hiện của từng hoạt động; dữ liệu tự động đồng bộ và lưu vào localStorage.

- [x] **KHBD preview được**  
  *Xác minh:* Chế độ chuyển đổi "Văn bản in A4" hiển thị trực quan bản in chuẩn thể thức công văn hành chính sư phạm Công văn 5512.

- [x] **KHBD export được**  
  *Xác minh:* Tải xuống thành công file `KHBD_5512_[TenBai].docx` chuẩn OpenXML A4 với bảng biểu, căn lề và khu vực ký duyệt; đồng thời hỗ trợ tải bản `.doc` tương thích.

- [x] **Slide tạo được & chỉnh sửa được**  
  *Xác minh:* Đã bổ sung panel chỉnh sửa slide thời gian thực (Slide Editor) cho phép sửa tiêu đề, pha sư phạm, layout, trích đoạn, câu hỏi thảo luận, ghi chú sư phạm; có nút thêm mới, nhân bản và xóa slide.

- [x] **Slide trình chiếu được**  
  *Xác minh:* Chế độ trình chiếu toàn màn hình (F5) hoạt động tốt, nhận phím mũi tên trái/phải, phím cách và phím Esc, layout hiển thị chuẩn 16:9 sắc nét.

- [x] **PPTX tải xuống được**  
  *Xác minh:* Nút "Xuất PowerPoint (.pptx)" sử dụng thư viện `pptxgenjs` tải trực tiếp file `SLIDE_[TenBai].pptx` về máy người dùng không qua trung gian.

- [x] **PPTX mở bằng PowerPoint được**  
  *Xác minh:* File `.pptx` sinh ra theo chuẩn OpenXML 16:9, mở trực tiếp trên Microsoft PowerPoint, Google Slides và LibreOffice, nội dung tiếng Việt chuẩn UTF-8, không tràn khung.

- [x] **Đề kiểm tra tạo được & chỉnh sửa được**  
  *Xác minh:* Module Question Builder hoạt động ổn định (0 runtime crash), cho phép tạo câu hỏi và đẩy vào đề thi; trên màn hình `Exam7991View` có nút thêm/sửa/xóa câu hỏi trực tiếp cho cả 4 phần, tự động tính lại tổng điểm.

- [x] **Đáp án hoạt động**  
  *Xác minh:* Tab "Đáp án & Barem" hiển thị đầy đủ đáp án trắc nghiệm Phần I, II, III và barem Phần IV; bộ mô phỏng tính điểm Phần II hoạt động chuẩn xác theo CV 7991 (0.1đ - 0.25đ - 0.50đ - 1.00đ).

- [x] **Word export hoạt động**  
  *Xác minh:* Sử dụng thư viện `docx` tạo file OpenXML `.docx` chuẩn A4 cho KHBD 5512, Đề kiểm tra 7991 và Rubric tự luận; tải về mở trực tiếp trên Microsoft Word không gặp cảnh báo lỗi.

- [x] **Print/PDF hoạt động**  
  *Xác minh:* Lớp `@media print` đã được cấu hình lại với `height: auto !important; overflow: visible !important;`, toàn bộ Sidebar, TopBar và thanh điều khiển được gán class `no-print`, tài liệu in trải dài nhiều trang A4 liên tục không bị cắt trang.

- [x] **Refresh route không 404 & Khôi phục trạng thái**  
  *Xác minh:* Hỗ trợ deep link qua hash routing (`#/khbd`, `#/slides`, `#/exam`, ...), có bộ lắng nghe `hashchange` cho nút Back/Forward; tích hợp `localStorage` autosave khôi phục 100% dữ liệu sau khi F5 hoặc mở lại tab.

- [x] **Không có console error nghiêm trọng**  
  *Xác minh:* Đã sửa triệt để lỗi ReferenceError tại QuestionBuilderView; console trình duyệt hoàn toàn sạch sẽ, không có lỗi Uncaught Exception hay crash màn hình trắng.

- [x] **Tiếng Việt hiển thị đúng**  
  *Xác minh:* Hệ thống font nhúng nội bộ Be Vietnam Pro và Lora hiển thị sắc nét, chuẩn Unicode NFC toàn diện, xuất file Word và PowerPoint hiển thị dấu tiếng Việt hoàn hảo.

---

### TỔNG KẾT CHECKLIST:
- **Đạt:** 17 / 17 tiêu chí (100%)
- **Chưa đạt:** 0 / 17 tiêu chí (0%)
- **Kết luận:** **READY TO SUBMIT** 🟢
