# EduMaster-Literature — Functional Testing Plan (Kế hoạch Kiểm thử Tính năng)

**Dự án**: EduMaster-Literature — Hệ thống Thiết kế Bài dạy & Khảo thí Ngữ văn THPT  
**Phiên bản**: 3.0.0  
**Tài liệu tham chiếu**: `docs/testing/04_FUNCTIONAL_TESTING.md`, Công văn 5512/BGDĐT-GDTrH, Công văn 7991/BGDĐT-GDTrH  
**Trạng thái**: Đã phê duyệt & Đã thực thi hoàn tất (100% Passed)

---

## 1. Mục tiêu Kiểm thử (Objectives)
Kế hoạch Functional Testing được thiết kế nhằm kiểm chứng tính năng toàn diện của ứng dụng theo tiêu chuẩn:
> **"Người dùng thực hiện hành động input X → Hệ thống xử lý nghiệp vụ → Cho ra kết quả hiển thị / dữ liệu output Y chính xác tuyệt đối."**

Không dừng lại ở việc kiểm thử hàm đơn lẻ (Unit Test) hay giao diện thuần túy (Visual Test), Functional Testing xác nhận toàn bộ luồng nghiệp vụ tương tác của giáo viên Ngữ văn THPT:
1. Khởi tạo bài học mới với bộ dữ liệu sinh tự động chuẩn mực (KHBD 5512, Slide, Đề 7991, Rubric).
2. Tương tác đọc hiểu, chú giải, bôi đen trích dẫn văn bản tác phẩm.
3. Phân tích thi pháp học theo 3 thể loại (Thơ trữ tình, Truyện ngắn, Văn nghị luận) và xây dựng Cây sơ đồ lập luận (Argument Map).
4. Thiết kế Kế hoạch bài dạy (KHBD) theo quy chuẩn Công văn 5512 với tiến trình 4 hoạt động và cấu trúc 4 bước tổ chức dạy học.
5. Soạn thảo và mô phỏng đề kiểm tra định kỳ theo quy chuẩn Công văn 7991, đặc biệt là cấu trúc Phần II Đúng/Sai 4 lệnh (a-b-c-d) với barem tính điểm chính thức.
6. Đồng bộ liên phân hệ (Cross-module flow) và bảo toàn tính toàn vẹn dữ liệu AppState khi sao lưu, tải về và phục hồi JSON.

---

## 2. Phạm vi Kiểm thử (Scope)

### 2.1. In-Scope (Các phân hệ chức năng cốt lõi)
| STT | Phân hệ (Subsystem) | Chức năng kiểm thử chính |
| :--- | :--- | :--- |
| 1 | **TeacherDashboard** | Thẻ tiếp tục bài học (Resume Card), Bộ chỉ số hoàn thiện, Tìm kiếm bài học (Tiếng Việt có dấu), Lọc thể loại, Chuyển đổi bài học, 6 phím tắt nghiệp vụ sư phạm |
| 2 | **Tạo bài dạy (Create Lesson)** | Hộp thoại khởi tạo bài học, Validation lỗi bắt buộc (Tên bài, Tác giả, YCCĐ, Ngữ liệu), Khởi tạo tự động đồng bộ bundle 4 phân hệ con |
| 3 | **LiteratureReader & Annotation** | Xem văn bản tác phẩm (Typography Lora), Chuyển tab Bố cục / Chú thích, Xóa ghi chú/highlight, Chuyển các tab phân tích (Thi pháp, Dẫn chứng), Chế độ đọc tập trung (Focus Mode) |
| 4 | **GenreAnalysisView** | Chọn thể loại (Thơ / Truyện / Nghị luận), Cây sơ đồ lập luận (Argument Map: Luận đề, Luận điểm, Lý lẽ, Dẫn chứng), Thêm luận điểm, Chuyển ngữ liệu sang KHBD / Slide / Câu hỏi |
| 5 | **KHBD 5512 Builder** | Chuyển đổi chế độ (Visual Builder ↔ Văn bản in A4), Hiển thị thông tin hành chính & mục tiêu YCCĐ, Quản lý tiến trình 4 hoạt động, Thêm hoạt động, Chặn xóa hoạt động cuối, Chuyển hoạt động thành Slide |
| 6 | **Exam 7991 Builder** | Chuyển chế độ Đề thi ↔ Đáp án & Barem, Lọc xem theo từng phần (Phần I, II, III, IV), Mô phỏng chấm điểm Phần II Đúng/Sai (0.1đ - 0.25đ - 0.50đ - 1.00đ), Thêm câu hỏi cho từng phần, Kiểm soát cân đối tổng điểm 10.0 |
| 7 | **Export & Handover** | Sao chép JSON State vào Clipboard, Tải file sao lưu `.json`, Form phục hồi phiên làm việc, Validation lỗi cú pháp JSON và lỗi thiếu phân hệ cốt lõi |

### 2.2. Out-of-Scope (Thuộc các phase kiểm thử khác)
- Kiểm thử tải / Performance stress testing với 1000 user (ứng dụng chạy Client-Side SPA).
- Đánh giá thị giác chi tiết (màu sắc, viền, bóng, transition micro-interactions - đã thực hiện ở UI Polish Audit).
- Đo lường chỉ số Google Lighthouse / SEO (thuộc phase Non-functional / Performance testing).

---

## 3. Chiến lược & Công cụ Thực thi (Test Strategy & Tooling)

### 3.1. Phân tầng kiểm thử chức năng
EduMaster-Literature là ứng dụng thuần Client-side Single Page Application (100% Frontend React + Vite + LocalStorage, không có Backend Server phụ thuộc). Do đó, chiến lược Functional Testing được triển khai qua phương pháp:
- **Level 1 Functional Testing (Component & State Behavior)**: Sử dụng **Vitest + React Testing Library + `@testing-library/jest-dom` + `jsdom`** để mô phỏng chính xác hành vi người dùng (click, gõ phím, chọn dropdown, submit form, copy clipboard, download blob).
- Kiểm tra tính xác thực của DOM Output và State Transition sau mỗi tương tác người dùng.

### 3.2. Môi trường kiểm thử
- **Node.js**: v20+ / Windows 11
- **Test Runner**: Vitest v5.0.3
- **Testing Library**: `@testing-library/react` v16, `@testing-library/jest-dom` v6
- **Test Setup File**: `src/test/setup.ts` (Mock localStorage, ResizeObserver, URL.createObjectURL, matchMedia)
- **Fixtures chuẩn hóa**: `src/test/fixtures.ts` (Dữ liệu tác phẩm văn học thật: *Tây Tiến*, *Vợ nhặt*, *Tuyên ngôn Độc lập*, *Sóng* chuẩn Unicode NFC)

---

## 4. Danh mục Kịch bản Test Suites (Functional Test Suites Inventory)

| Test Suite | Đường dẫn File | Số Test Cases | Nội dung kiểm thử |
| :--- | :--- | :---: | :--- |
| **Dashboard & Lesson Lifecycle** | `src/test/functional/dashboard.functional.test.tsx` | 10 | Resume Card, Tiến độ %, Chuyển bài học, Tìm kiếm, Lọc thể loại, Hộp thoại tạo bài mới, Bắt lỗi form, Tự động khởi tạo Bundle |
| **Reader & Annotation Workspace** | `src/test/functional/readerAnnotation.functional.test.tsx` | 5 | Trình đọc tác phẩm Lora, Tab Cấu trúc / Chú thích, Xóa chú thích, Tab Dẫn chứng then chốt, Thoát Focus Mode |
| **Genre Analysis & Argument Map** | `src/test/functional/genreAnalysis.functional.test.tsx` | 4 | Header thi pháp, Chuyển tab Tổng quan / Argument Map, Luận đề trung tâm, Thêm luận điểm, Chuyển nội dung sang KHBD |
| **KHBD 5512 Builder & Document** | `src/test/functional/khbdBuilder.functional.test.tsx` | 6 | Chuyển chế độ Visual Builder ↔ Văn bản A4, Mục tiêu YCCĐ, Quản lý 4 hoạt động, Thêm hoạt động, Chặn xóa hoạt động cuối, Chuyển thành Slide |
| **Exam 7991 Builder & Scoring** | `src/test/functional/examBuilder.functional.test.tsx` | 6 | Ribbon cân đối 10.0 điểm, Chuyển Đề thi ↔ Đáp án & Barem, Lọc 4 phần, 4 phát biểu câu Đúng/Sai, Thêm câu Phần I & II |
| **Export Handover & State Restore** | `src/test/functional/exportHandover.functional.test.tsx` | 6 | Checklist tiêu chuẩn, Sao chép JSON State, Tải tệp JSON, Nạp lại State thành công, Bắt lỗi JSON sai cú pháp, Bắt lỗi thiếu phân hệ |

**Tổng số test cases kiểm thử tính năng (Level 1 Functional)**: **37 test cases**  
**Tổng số test cases toàn bộ dự án (Unit + Functional)**: **167 test cases** across **19 test files**.

---

## 5. Quy chuẩn Đánh giá Đạt/Không đạt (Acceptance Criteria)
1. **100% Test Cases PASS**: Toàn bộ 19 test files (167 tests) phải chạy thành công với Exit Code 0 trên Vitest.
2. **0 Lỗi Biên dịch (Build Pass)**: Lệnh `npm run build` phải biên dịch thành công 100% không phát sinh lỗi TypeScript hay bundling.
3. **Bảo toàn tiếng Việt có dấu**: Tất cả các thao tác dữ liệu phải chuẩn hóa qua Unicode NFC, không phát sinh hiện tượng bể phông hay sai lệch dấu tiếng Việt.
4. **Không can thiệp phá vỡ Logic nghiệp vụ**: Các kiểm thử phải đối chiếu chính xác với giao diện và logic hiện hữu của EduMaster-Literature mà không làm thay đổi các chức năng xuất bản (DOCX, PPTX, JSON).
