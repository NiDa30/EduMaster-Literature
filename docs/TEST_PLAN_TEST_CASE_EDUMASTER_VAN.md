# EDUMASTER VĂN — KẾ HOẠCH & BỘ TEST CASE KIỂM THỬ TOÀN DIỆN HỆ THỐNG

> **Hệ thống:** EduMaster VN (EduMaster Văn) — Không gian Thiết kế Dạy học & Khảo thí Ngữ văn THPT  
> **Chương trình áp dụng:** Chương trình Giáo dục Phổ thông 2018 (GDPT 2018)  
> **Văn bản quy phạm:** Công văn 5512/BGDĐT-GDTrH (Kế hoạch bài dạy) & Công văn 7991/BGDĐT-GDTrH (Đề kiểm tra, Ma trận & Bản đặc tả)  
> **Tài liệu căn cứ:** `FLOW_EDUMASTER_VAN_COMPLETE_FIXED.md`, `SO_DO_FLOW_HIEN_THI_UI_EDUMASTER_VAN_FIXED.md`, `SO_DO_CHUC_NANG_USECASE_EDUMASTER_VAN_FIXED.md`, `THIET_KE_BO_CUC_UI_UX_DESIGN_EDUMASTER_VAN_FIXED.md`, giáo án thực tế `cauchuyenvadiemnhitrongtruyenke.md`  
> **Phiên bản tài liệu:** 3.0.0-PROD-TESTING  
> **Ngày cập nhật:** 2026-10-08  

---

# PHẦN A — KẾ HOẠCH KIỂM THỬ (TEST PLAN)

## 1. Mục tiêu kiểm thử (Test Objectives)

Kế hoạch kiểm thử nhằm đảm bảo chất lượng kỹ thuật, tính ổn định giao diện và sự chuẩn mực sư phạm của hệ thống **EduMaster Văn** theo định hướng phát triển phẩm chất, năng lực môn Ngữ văn cấp THPT:

1. **Chuẩn hóa nghiệp vụ môn Ngữ văn:**
   - 100% không gian làm việc chuyên biệt cho giáo viên Văn: không chứa thành phần toán học, công thức LaTeX/KaTeX, hoặc cấu trúc trắc nghiệm cơ học thuần túy.
   - Thể hiện trung thực bản chất thẩm mỹ và thi pháp học theo 3 thể loại trụ cột: **Thơ trữ tình**, **Truyện & Kí**, **Văn nghị luận**.
   - Tuân thủ cấu trúc Kế hoạch bài dạy 4 hoạt động theo Công văn 5512/BGDĐT-GDTrH và định dạng đề kiểm tra 4 phần cùng Ma trận & Bản đặc tả theo Công văn 7991/BGDĐT-GDTrH.
2. **Thông suốt luồng dữ liệu xuyên suốt (End-to-End Pipeline):**
   - Đọc & Chú giải tác phẩm (Reader) $\rightarrow$ Phân tích thể loại (Genre Analysis) $\rightarrow$ Soạn giáo án (KHBD 5512) $\rightarrow$ Trình chiếu bài giảng (Slides Studio).
   - Trích xuất ngữ liệu (Passage) $\rightarrow$ Ngân hàng câu hỏi (Question Builder) $\rightarrow$ Lắp ráp đề thi (Exam 7991) $\rightarrow$ Khung Ma trận & Bản đặc tả (Matrix/Spec) $\rightarrow$ Tiêu chí chấm (Rubric tự luận).
   - Đóng gói xuất bản: Xuất Word (.docx OpenXML), PowerPoint (.pptx), In ấn chuẩn A4/Landscape, Sao lưu & Phục hồi JSON nguyên trạng.
3. **Cô lập dữ liệu tuyệt đối giữa các bài học (Data Isolation):**
   - Mỗi tác phẩm duy trì độc lập trọn bộ tài liệu riêng biệt (`khbd`, `slides`, `exam`, `questions`, `rubric`). Chuyển đổi giữa các bài học không làm thất thoát hay trộn lẫn dữ liệu.
4. **Trải nghiệm người dùng (UX/UI & Viewport-First):**
   - Bố cục màn hình kiểm soát 100vh trên độ phân giải từ 1366×768 đến 1920×1080; sử dụng cuộn nội bộ, thanh cuộn mỏng (thin scrollbar), không bị vỡ bố cục hoặc tràn trang ngoài ý muốn.
   - Chuẩn hóa Unicode tiếng Việt chuẩn dựng sẵn NFC (`normalizeDeepNFC`), font chữ có chân Serif sang trọng cho văn bản đọc và Sans-serif sắc nét cho công cụ điều khiển.

---

## 2. Phạm vi kiểm thử (Scope)

### 2.1. Trong phạm vi kiểm thử (In-Scope)
- **App Shell & Global Router:** Điều hướng mô-đun, đồng bộ URL Hash (`#dashboard`, `#workspace`, `#genre_analysis`, `#khbd`, `#question_builder`, `#matrix`, `#exam`, `#rubric`, `#slides`, `#export_handover`), hỗ trợ URL Aliases (`#reader`, `#genre`, `#questions`, `#export`).
- **Dashboard & Lesson Management:** Chào đầu biên tập, Resume Card với ruy-băng tiến độ từng phân hệ (KHBD, Slide, Đề), 6 Quick Actions, Danh mục bài học gần đây, Modal "Tạo bài dạy mới" 11 trường với Inline Validation và tự động tạo starter package.
- **Literature Workspace (Reader & Annotations):** Bố cục 3 cột (Outline, Reader, Insight Panel), thanh Outline neo cuộn mượt theo phân đoạn, Floating Contextual Toolbar với 5 màu highlight (`amber`, `emerald`, `blue`, `purple`, `rose`), thêm ghi chú, đẩy đoạn văn sang Slide / Câu hỏi / Ngữ liệu đề thi, chế độ Tập trung (Focus/Zen Mode).
- **Genre Analysis & Argument Map:** 5 tab chính (Tổng quan, Thi pháp/Nghệ thuật, Hình tượng/Nhân vật, Argument Map, Dẫn chứng), cây lập luận tương tác đa tầng (Thesis $\rightarrow$ Claims $\rightarrow$ Reasons $\rightarrow$ Evidences), 3 nút tác vụ xuyên module ("Đưa vào KHBD", "Đưa vào Slide", "Tạo câu hỏi").
- **KHBD 5512 Builder & Document View:** Chế độ trực quan (Visual) và chế độ trang văn bản (Document A4), 4 hoạt động dạy học, 4 bước tổ chức thực hiện, đẩy hoạt động sang Slide, xuất Word .docx.
- **Question Builder:** 4 dạng câu hỏi (Đọc hiểu, Tiếng Việt, Nghị luận xã hội, Nghị luận văn học), phân loại 3 mức độ nhận thức (NB, TH, VD), liên kết phần thi đề 7991, bộ lọc và tìm kiếm trực tiếp.
- **Exam 7991:** Đề kiểm tra chuẩn 4 phần (Phần I: 12 MCQ, Phần II: Đúng/Sai 4 phát biểu, Phần III: Trả lời ngắn, Phần IV: Tự luận), chế độ Đề thi (Exam Paper) và Hướng dẫn chấm (Marking Guide), mô phỏng chấm điểm (Scoring Simulator), xuất Word .docx riêng biệt cho học sinh và giáo viên.
- **Matrix & Specification:** Ma trận 2 tầng và Bản đặc tả câu hỏi đồng bộ động từ `exam`, ruy-băng % phân bố mức độ nhận thức, huy hiệu kiểm định tổng điểm 10.0, xuất Word .docx khổ ngang (Landscape A4).
- **Rubric Builder:** Khung đánh giá tự luận thang 10.0 điểm, 6 tiêu chí chuẩn mực, 3 mức chất lượng (Xuất sắc, Đạt, Cần cố gắng), tính điểm thời gian thực.
- **Slides Studio:** Tỷ lệ khung hình chuẩn 16:9, các mẫu bố cục sư phạm (Single, Split, Quote, Cards, Visual Map, Quiz), Speaker Notes, trình chiếu toàn màn hình (Fullscreen) với phím mũi tên, câu hỏi Quiz kiểm tra nhận thức tương tác.
- **Export Center & Handover:** Xuất Word KHBD, Word Đề 7991, Word Ma trận & Đặc tả, PowerPoint PPTX, In ấn A4, Tải file sao lưu JSON, Kéo thả phục hồi dữ liệu JSON.
- **Data Persistence:** Tự động lưu LocalStorage (Debounce 300ms), khôi phục dữ liệu sau F5/Reload.

### 2.2. Ngoài phạm vi kiểm thử (Out-of-Scope)
- Quản lý phiên đăng nhập nhiều tài khoản, phân quyền quản trị máy chủ từ xa (Cloud Multi-tenancy).
- Cổng nộp bài trực tuyến dành riêng cho học sinh (Student LMS Portal).

---

## 3. Chiến lược kiểm thử (Testing Strategy)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CHIẾN LƯỢC KIỂM THỬ                               │
├──────────────────┬──────────────────┬──────────────────┬────────────────────┤
│ 1. FUNCTIONAL    │ 2. INTEGRATION   │ 3. PERSISTENCE   │ 4. NON-FUNCTIONAL  │
│ - Từng module UI │ - Cross-module   │ - LocalStorage   │ - Viewport 100vh   │
│ - Validate Form  │ - Lesson Switch  │ - Backup JSON    │ - Unicode NFC      │
│ - Thao tác CRUD  │ - Sync Exam-Spec │ - Restore JSON   │ - No Math Residue  │
│ - Export .docx   │ - Push to Slide  │ - Data Isolation │ - Build Production │
└──────────────────┴──────────────────┴──────────────────┴────────────────────┘
```

1. **Kiểm thử chức năng (Functional Testing):**
   - Xác minh toàn bộ 12 mô-đun nghiệp vụ hoạt động chính xác theo đúng use case và đặc tả giao diện.
2. **Kiểm thử tích hợp & Luồng dữ liệu (Integration & Data Flow Testing):**
   - Kiểm tra các cầu nối xuyên mô-đun: Reader $\rightarrow$ Slide, Reader $\rightarrow$ Question, Reader $\rightarrow$ Exam, Genre $\rightarrow$ KHBD, KHBD $\rightarrow$ Slide, Question $\rightarrow$ Exam, Exam $\leftrightarrow$ Matrix/Spec.
3. **Kiểm thử cô lập & Tính toàn vẹn dữ liệu (Data Isolation & Integrity):**
   - Chuyển đổi qua lại giữa *Tây Tiến*, *Vợ nhặt*, *Tuyên ngôn Độc lập* và bài tạo mới; xác nhận mỗi bài giữ nguyên vẹn gói tài liệu riêng không bị ghi đè.
4. **Kiểm thử xuất bản (Export & Interoperability Testing):**
   - Mở file `.docx` và `.pptx` sinh ra trên Microsoft Office Word/PowerPoint và LibreOffice; kiểm tra bảng biểu, định dạng in ấn và căn lề.
5. **Kiểm thử phi chức năng & Thể hiện giao diện (Non-functional & UI/UX):**
   - Độ phân giải: 1366×768 (laptop phổ thông), 1440×900, 1920×1080 (FHD).
   - Tốc độ tải và phản hồi: Thao tác chuyển tab < 100ms; không giật lag khi cuộn tác phẩm dài.
   - Font chữ và dấu thanh tiếng Việt: Không lỗi font, hiển thị chuẩn dấu câu tiếng Việt.

---

## 4. Môi trường & Bộ dữ liệu kiểm thử chuẩn (Golden Test Data)

### 4.1. Môi trường kiểm thử
- **Hệ điều hành:** Windows 10 / Windows 11 (64-bit).
- **Trình duyệt kiểm thử:** Google Chrome (v120+), Microsoft Edge (v120+), Mozilla Firefox (v120+).
- **Độ phân giải hiển thị:** 1366×768, 1440×900, 1920×1080.
- **Node Environment:** Node.js v18+ / v20+, Vite v8+.

### 4.2. Bộ dữ liệu chuẩn (Golden Datasets)
- **Bộ dữ liệu 1 (Thơ trữ tình):** *Tây Tiến* — Quang Dũng (Ngữ văn 12, Kết nối tri thức).
- **Bộ dữ liệu 2 (Truyện ngắn hiện đại):** *Vợ nhặt* — Kim Lân (Ngữ văn 12, Kết nối tri thức) — Trích xuất từ giáo án thực tế `cauchuyenvadiemnhitrongtruyenke.md`.
- **Bộ dữ liệu 3 (Văn chính luận):** *Tuyên ngôn Độc lập* — Hồ Chí Minh (Ngữ văn 12, Kết nối tri thức).
- **Bộ dữ liệu 4 (Bài học tạo mới):** *Chí Phèo* — Nam Cao (Ngữ văn 11/12).

---

## 5. Tiêu chuẩn đánh giá mức độ nghiêm trọng & Mức độ ưu tiên

| Mức độ ưu tiên (Priority) | Định nghĩa | Tiêu chuẩn phát hành |
|---|---|---|
| **P0 (Blocker/Critical)** | Lỗi chặn luồng chính, crash ứng dụng, mất dữ liệu bài học, sai định dạng CV 7991/5512 | Phải đạt 100% Pass |
| **P1 (High)** | Lỗi chức năng quan trọng có cách khắc phục tạm thời (workaround) | Phải đạt $\ge$ 98% Pass |
| **P2 (Medium)** | Lỗi giao diện, căn lề, hiệu ứng chuyển cảnh, thông báo phản hồi | Phải đạt $\ge$ 95% Pass |
| **P3 (Low)** | Các tinh chỉnh thẩm mỹ vi mô không ảnh hưởng thao tác giảng dạy | Khắc phục trong bản cập nhật kế tiếp |

---

# PHẦN B — BỘ TEST CASE CHI TIẾT (TEST SUITE)

## MÔ-ĐUN 1: APP SHELL, TOPBAR, SIDEBAR & URL ROUTER

### TC-SHELL-001 — Khởi động ứng dụng & Bố cục Viewport 100vh
- **Mô-đun:** App Shell
- **Mức độ:** P0 (Critical)
- **Điều kiện tiên quyết:** Mở trình duyệt, truy cập URL gốc của hệ thống.
- **Dữ liệu kiểm thử:** URL `http://localhost:3000/#/dashboard`
- **Các bước thực hiện:**
  1. Mở ứng dụng trên trình duyệt ở độ phân giải 1366×768.
  2. Quan sát khung giao diện tổng thể (App Shell).
  3. Kiểm tra thanh cuộn dọc của cửa sổ chính trình duyệt (`window.scrollY`).
- **Kết quả mong đợi:**
  - Ứng dụng tải thành công không có lỗi console.
  - Hiển thị đầy đủ 3 thành phần: Sidebar bên trái (248px), TopBar bên trên (56px) và Workspace Body ở trung tâm.
  - Không xuất hiện thanh cuộn dọc ngoài khung ứng dụng; toàn bộ chiều cao đúng bằng `100vh`.

---

### TC-SHELL-002 — Điều hướng Sidebar & Active State
- **Mô-đun:** Sidebar
- **Mức độ:** P0 (High)
- **Điều kiện tiên quyết:** Ứng dụng đang ở màn hình Dashboard.
- **Các bước thực hiện:**
  1. Click lần lượt các mục trên Sidebar: *Tác phẩm*, *Phân tích thể loại*, *Kế hoạch bài dạy*, *Câu hỏi*, *Ma trận & Đặc tả*, *Đề kiểm tra*, *Rubric*, *Slide*, *Xuất bản*.
  2. Quan sát trạng thái hiển thị của từng nút trên Sidebar.
- **Kết quả mong đợi:**
  - Màn hình chính chuyển đúng sang giao diện mô-đun tương ứng.
  - Nút đang chọn có màu nền nổi bật (`bg-[#FBF4F5]`), chữ màu đỏ mận (`text-[#7C2D37]`), icon đỏ mận và viền chỉ báo bên trái.
  - Tại một thời điểm chỉ có duy nhất một mục Sidebar ở trạng thái Active.

---

### TC-SHELL-003 — URL Hash Router & Xử lý Alias đường dẫn
- **Mô-đun:** Global Router
- **Mức độ:** P1 (Medium)
- **Các bước thực hiện:**
  1. Nhập vào thanh địa chỉ trình duyệt: `#reader` $\rightarrow$ Nhấn Enter.
  2. Nhập `#genre` $\rightarrow$ Nhấn Enter.
  3. Nhập `#questions` $\rightarrow$ Nhấn Enter.
  4. Nhập `#export` $\rightarrow$ Nhấn Enter.
  5. Dùng nút Back / Forward trên trình duyệt.
- **Kết quả mong đợi:**
  - `#reader` tự động chuyển sang mô-đun *Tác phẩm* (`workspace`).
  - `#genre` tự động chuyển sang mô-đun *Phân tích thể loại* (`genre_analysis`).
  - `#questions` tự động chuyển sang mô-đun *Ngân hàng câu hỏi* (`question_builder`).
  - `#export` tự động chuyển sang *Trung tâm xuất bản* (`export_handover`).
  - Back/Forward chuyển đổi chính xác giữa các màn hình mà không crash.

---

### TC-SHELL-004 — TopBar Lesson Switcher & Hiển thị thông tin
- **Mô-đun:** TopBar
- **Mức độ:** P0 (Critical)
- **Điều kiện tiên quyết:** Đang ở bất kỳ màn hình nào.
- **Các bước thực hiện:**
  1. Quan sát tiêu đề trên TopBar.
  2. Click vào dropdown chuyển đổi tác phẩm trên TopBar.
  3. Chọn tác phẩm *Vợ nhặt* (Kim Lân).
- **Kết quả mong đợi:**
  - Dropdown mở danh sách các bài học hiện có.
  - Sau khi chọn *Vợ nhặt*, TopBar cập nhật ngay: `Ngữ văn 12 / Vợ nhặt — Kim Lân`.
  - Hiển thị badge trạng thái lưu: `Đã lưu · [Thời gian hiện tại]`.
  - Toast thông báo: *"Đã chuyển sang tác phẩm Vợ nhặt (Kim Lân). Dữ liệu KHBD, Slide và Đề đã được đồng bộ."*

---

### TC-SHELL-005 — Chế độ toàn màn hình Focus / Zen Mode
- **Mô-đun:** TopBar & Shell
- **Mức độ:** P1 (Medium)
- **Các bước thực hiện:**
  1. Điều hướng vào mô-đun *Tác phẩm* (`workspace`).
  2. Click nút biểu tượng **Focus Mode** trên TopBar.
  3. Quan sát bố cục màn hình.
  4. Click lại nút Focus Mode để thoát.
- **Kết quả mong đợi:**
  - Khi bật: Sidebar bên trái tự động thu gọn/ẩn đi; không gian đọc và soạn bài mở rộng tối đa ra toàn màn hình.
  - Khi tắt: Sidebar hiển thị lại bình thường ở vị trí cũ mà không làm dịch chuyển vị trí con trỏ đọc.

---

## MÔ-ĐUN 2: BÀN LÀM VIỆC & QUẢN LÝ BÀI HỌC (DASHBOARD)

### TC-DASH-001 — Hiển thị Bàn làm việc & Resume Card tiến độ
- **Mô-đun:** Dashboard
- **Mức độ:** P0 (High)
- **Các bước thực hiện:**
  1. Vào màn hình Dashboard (`#/dashboard`).
  2. Kiểm tra thông tin lời chào giáo viên và thẻ Tiếp tục công việc (Resume Card).
- **Kết quả mong đợi:**
  - Lời chào: *Không gian giảng dạy và khảo thí Ngữ văn · [Tên Giáo viên]*.
  - Huy hiệu: *Học kỳ II · Lớp 10, 11, 12* và *GDPT 2018*.
  - Resume Card hiển thị: Tên bài đang chọn, Tác giả, Khối lớp, Bộ sách, Thanh tiến độ %.
  - Hiển thị 3 badge trạng thái phân hệ: KHBD 5512 (Hoàn tất/Đang soạn), Slide bài giảng (Sẵn sàng/Bản thảo), Đề 7991 (Chuẩn hóa/Chưa tạo).

---

### TC-DASH-002 — Thao tác nút Tiếp tục công việc
- **Mô-đun:** Dashboard
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Tại Resume Card, click nút **Mở không gian soạn** (hoặc **Tiếp tục**).
- **Kết quả mong đợi:**
  - Chuyển ngay sang mô-đun *Tác phẩm* (`workspace`).
  - Văn bản hiển thị chính xác là bài học đang được chọn ở Resume Card.

---

### TC-DASH-003 — Hệ thống 6 Quick Actions
- **Mô-đun:** Dashboard
- **Mức độ:** P1 (High)
- **Các bước thực hiện:**
  1. Click lần lượt 6 thẻ tác vụ nhanh trên Dashboard:
     - Thẻ 1: *Tạo bài dạy mới*
     - Thẻ 2: *Soạn bài & Đọc văn*
     - Thẻ 3: *Phân tích thể loại*
     - Thẻ 4: *Soạn KHBD 5512*
     - Thẻ 5: *Tạo câu hỏi*
     - Thẻ 6: *Đề kiểm tra 7991*
- **Kết quả mong đợi:**
  - Thẻ 1: Mở popup Modal "Tạo bài dạy Ngữ văn mới".
  - Thẻ 2: Điều hướng vào `workspace`.
  - Thẻ 3: Điều hướng vào `genre_analysis`.
  - Thẻ 4: Điều hướng vào `khbd`.
  - Thẻ 5: Điều hướng vào `question_builder`.
  - Thẻ 6: Điều hướng vào `exam`.

---

### TC-DASH-004 — Modal Tạo bài dạy mới: Kiểm tra Inline Validation
- **Mô-đun:** Dashboard (Create Lesson Modal)
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Click nút **+ Tạo bài mới** trên đầu trang hoặc thẻ Quick Action.
  2. Bỏ trống toàn bộ các trường nhập liệu.
  3. Click nút **Tạo bài dạy & Soạn bài**.
- **Kết quả mong đợi:**
  - Modal không đóng, form không submit.
  - Hiển thị thông báo lỗi viền đỏ trực quan dưới từng trường bắt buộc:
    - *Tên tác phẩm / Bài dạy:* "Vui lòng nhập tên tác phẩm / bài học."
    - *Tác giả:* "Vui lòng nhập tên tác giả."
    - *Yêu cầu cần đạt (YCCĐ):* "Vui lòng nhập Yêu cầu cần đạt (YCCĐ)."
    - *Ngữ liệu tác phẩm:* "Vui lòng nhập ngữ liệu trích đoạn tác phẩm."

---

### TC-DASH-005 — Tạo thành công bài dạy mới & Tự động tạo Starter Package
- **Mô-đun:** Dashboard (Create Lesson Modal)
- **Mức độ:** P0 (Critical)
- **Dữ liệu kiểm thử:**
  - Khối/Lớp: `Lớp 11`
  - Bộ sách: `Cánh diều`
  - Thể loại: `Truyện & Kí`
  - Thời lượng: `3 tiết`
  - Tên tác phẩm: `Chí Phèo`
  - Tác giả: `Nam Cao`
  - Chủ đề: `Bi kịch tha hóa và niềm khao khát lương thiện`
  - YCCĐ: `Phân tích được quá trình tha hóa và khát vọng hoàn lương của Chí Phèo qua nghệ thuật miêu tả tâm lý bậc thầy.`
  - Ngữ liệu: `Hắn vừa đi vừa chửi. Bao giờ cũng thế, cứ rượu xong là hắn chửi. Bắt đầu chửi trời, có hề gì? Trời có của riêng nhà nào? Rồi hắn chửi đời...`
- **Các bước thực hiện:**
  1. Nhập đầy đủ thông tin trên vào Modal.
  2. Click **Tạo bài dạy & Soạn bài**.
- **Kết quả mong đợi:**
  - Modal đóng thành công.
  - Bài học *Chí Phèo* được thêm vào danh mục bài học và tự động trở thành `currentLesson`.
  - Tự động sinh trọn gói: KHBD 5512 (tiến trình 4 bước chuẩn 5512), 3 Slide storytelling khởi đầu, 3 câu hỏi đọc hiểu ban đầu, Đề kiểm tra 7991 ban đầu và Rubric chấm tự luận.
  - Chuyển thẳng vào màn hình *Tác phẩm* (`workspace`) với nội dung ngữ liệu vừa dán.
  - Toast thông báo: *"Đã khởi tạo thành công bài dạy Chí Phèo. Bắt đầu soạn bài."*

---

### TC-DASH-006 — Danh mục bài học gần đây & Chuyển đổi bài học
- **Mô-đun:** Dashboard (Recent Lessons)
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Tại bảng *Danh mục bài học* ở hàng 2 Dashboard, click vào dòng bài học *Tây Tiến*.
  2. Quan sát phản ứng hệ thống.
  3. Quay lại Dashboard, click vào dòng bài học *Vợ nhặt*.
- **Kết quả mong đợi:**
  - Khi click vào dòng bài học: Tác phẩm đó trở thành bài đang chọn (có badge "Đang chọn").
  - Màn hình tự động chuyển sang không gian đọc của bài học vừa chọn.
  - Dữ liệu của bài học được nạp đầy đủ và chính xác.

---

## MÔ-ĐUN 3: KHÔNG GIAN ĐỌC TÁC PHẨM (LITERATURE READER)

### TC-READER-001 — Bố cục 3 cột chuẩn biên tập
- **Mô-đun:** Literature Workspace
- **Mức độ:** P0 (High)
- **Các bước thực hiện:**
  1. Mở mô-đun *Tác phẩm* (`#/workspace`).
  2. Quan sát cấu trúc 3 cột trên màn hình.
- **Kết quả mong đợi:**
  - **Cột trái (240px - Outline/Annotations):** Hiển thị mục lục phân đoạn tác phẩm và danh sách ghi chú/highlight đã tạo.
  - **Cột giữa (Flexible - Reading Pane):** Vùng đọc tác phẩm với font có chân Serif, căn dòng thoáng đãng, lề trang trang nhã chuẩn sách văn học.
  - **Cột phải (320px - Insight Panel):** Bảng phân tích thi pháp, hình tượng và dẫn chứng tương ứng với thể loại của bài.

---

### TC-READER-002 — Điều hướng phân đoạn Outline & Cuộn mượt (Anchor Scroll)
- **Mô-đun:** Literature Reader (Outline)
- **Mức độ:** P1 (High)
- **Điều kiện tiên quyết:** Đang mở bài học *Tây Tiến*.
- **Các bước thực hiện:**
  1. Nhìn vào cột Outline bên trái.
  2. Click vào mục *Đoạn 3: Bức tượng đài bi tráng về người lính Tây Tiến*.
- **Kết quả mong đợi:**
  - Vùng đọc ở cột giữa tự động cuộn mượt (smooth scroll) đến đúng phân đoạn 3 (`sec-3`).
  - Tiêu đề đoạn 3 xuất hiện ở tầm nhìn trên cùng của Reading Pane.

---

### TC-READER-003 — Chuyển đổi mô hình Insight Panel theo thể loại
- **Mô-đun:** Insight Panel
- **Mức độ:** P0 (High)
- **Các bước thực hiện:**
  1. Chọn bài *Tây Tiến* (Thể loại: Thơ) $\rightarrow$ Xem cột Insight Panel bên phải.
  2. Chuyển sang bài *Vợ nhặt* (Thể loại: Truyện) $\rightarrow$ Xem cột Insight Panel.
  3. Chuyển sang bài *Tuyên ngôn Độc lập* (Thể loại: Nghị luận) $\rightarrow$ Xem cột Insight Panel.
- **Kết quả mong đợi:**
  - *Tây Tiến:* Hiển thị cấu trúc Thi pháp Thơ (Mạch cảm xúc, Vần & Nhịp, Biện pháp tu từ, Từ khóa thi pháp).
  - *Vợ nhặt:* Hiển thị cấu trúc Thi pháp Truyện (Tình huống truyện, Điểm nhìn & Ngôi kể, Chi tiết nghệ thuật, Nhân vật).
  - *Tuyên ngôn Độc lập:* Hiển thị cấu trúc Thi pháp Nghị luận (Luận đề trung tâm, Hệ thống luận điểm, Nghệ thuật lập luận).

---

## MÔ-ĐUN 4: CÔNG CỤ NGỮ CẢNH (FLOATING CONTEXTUAL TOOLBAR)

### TC-FLOAT-001 — Kích hoạt Floating Toolbar khi bôi đen văn bản
- **Mô-đun:** Floating Toolbar
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Dùng chuột bôi đen cụm từ `"Sông Mã xa rồi Tây Tiến ơi!"`.
  2. Thả chuột.
- **Kết quả mong đợi:**
  - Thanh công cụ nổi (Floating Contextual Toolbar) lập tức xuất hiện ngay phía trên vùng văn bản được chọn.
  - Hiển thị đầy đủ: 5 nút chấm màu Highlight, nút *Ghi chú*, nút *Sang Slide*, nút *Tạo câu hỏi*, nút *Ngữ liệu đề*.

---

### TC-FLOAT-002 — Highlight văn bản với 5 màu sắc
- **Mô-đun:** Floating Toolbar (Highlight)
- **Mức độ:** P1 (Medium)
- **Các bước thực hiện:**
  1. Bôi đen dòng 1 $\rightarrow$ Click nút màu vàng (`amber`).
  2. Bôi đen dòng 2 $\rightarrow$ Click nút màu xanh lá (`emerald`).
  3. Bôi đen dòng 3 $\rightarrow$ Click nút màu xanh dương (`blue`).
  4. Bôi đen dòng 4 $\rightarrow$ Click nút màu tím (`purple`).
  5. Bôi đen dòng 5 $\rightarrow$ Click nút màu hồng (`rose`).
- **Kết quả mong đợi:**
  - Các đoạn văn bản đổi màu nền tương ứng chính xác.
  - Chữ bên trong giữ nguyên, không bị mất ký tự.
  - Mục Chú giải ở cột trái cập nhật danh sách các đoạn vừa highlight.

---

### TC-FLOAT-003 — Thêm ghi chú sư phạm (Annotation Note)
- **Mô-đun:** Floating Toolbar (Note)
- **Mức độ:** P1 (High)
- **Các bước thực hiện:**
  1. Bôi đen cụm từ `"súng ngửi trời"`.
  2. Click nút **Ghi chú** trên Floating Toolbar.
  3. Nhập nội dung: `"Biện pháp nhân hóa thể hiện độ cao của dốc núi và nét hóm hỉnh của người lính trẻ"`.
  4. Nhấn Enter hoặc nút Lưu.
- **Kết quả mong đợi:**
  - Đoạn văn bản được gắn dấu chú thích.
  - Tab *Chú giải* bên cột trái xuất hiện thẻ ghi chú mới với nội dung vừa nhập.
  - Dữ liệu ghi chú được tự động lưu vào state bài học.

---

### TC-FLOAT-004 — Đẩy trích đoạn sang Slide bài giảng (Reader $\rightarrow$ Slide)
- **Mô-đun:** Cross-module (Reader $\rightarrow$ Slide)
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Bôi đen đoạn 4 câu thơ:
     ```text
     Doanh trại bừng lên hội đuốc hoa,
     Kìa em xiêm áo tự bao giờ.
     Khèn lên man điệu nàng e ấp,
     Nhạc về Viên Chăn xây hồn thơ.
     ```
  2. Click nút **Sang Slide** trên Floating Toolbar.
  3. Mở sang mô-đun *Slide* (`#/slides`).
- **Kết quả mong đợi:**
  - Danh sách Slide có thêm một Slide mới định dạng bố cục Trích dẫn (Quote Layout).
  - Nội dung Slide chứa chính xác 4 câu thơ vừa bôi đen.
  - Tên tác giả hiển thị đúng: `Quang Dũng - Tây Tiến`.
  - Toast thông báo: *"Đã tạo slide mới từ trích đoạn."*

---

### TC-FLOAT-005 — Đẩy trích đoạn sang Ngân hàng câu hỏi (Reader $\rightarrow$ Question)
- **Mô-đun:** Cross-module (Reader $\rightarrow$ Question)
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Bôi đen trích đoạn văn bản trong bài *Vợ nhặt*: `"Cái đói đã tràn đến xóm này tự lúc nào... Người chết như ngả rạ."`.
  2. Click nút **Tạo câu hỏi** trên Floating Toolbar.
- **Kết quả mong đợi:**
  - Hệ thống tự động chuyển ngay sang mô-đun *Ngân hàng câu hỏi* (`#/question_builder`).
  - Ô nhập Ngữ liệu trích dẫn (Passage Snippet) của khung soạn câu hỏi đã được điền sẵn chính xác đoạn văn vừa chọn.

---

### TC-FLOAT-006 — Đặt trích đoạn làm ngữ liệu đề kiểm tra (Reader $\rightarrow$ Exam)
- **Mô-đun:** Cross-module (Reader $\rightarrow$ Exam)
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Bôi đen đoạn văn 8 câu trong bài thơ hoặc truyện.
  2. Click nút **Ngữ liệu đề** trên Floating Toolbar.
  3. Mở sang mô-đun *Đề kiểm tra* (`#/exam`).
- **Kết quả mong đợi:**
  - Khung Đọc ngữ liệu của Đề kiểm tra (`passageRef`) được cập nhật ngay bằng đoạn văn vừa chọn.
  - Toast thông báo: *"Đã đặt đoạn trích làm ngữ liệu đọc hiểu của đề kiểm tra."*

---

## MÔ-ĐUN 5: PHÂN TÍCH THỂ LOẠI & SƠ ĐỒ LẬP LUẬN (GENRE ANALYSIS)

### TC-GENRE-001 — Kiểm tra đầy đủ 5 Tabs chính theo thiết kế
- **Mô-đun:** Genre Analysis
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Mở mô-đun *Phân tích thể loại* (`#/genre_analysis`).
  2. Kiểm tra hàng thanh tab phía trên.
- **Kết quả mong đợi:**
  - Xuất hiện đầy đủ 5 tab độc lập:
    - `1. Tổng quan`
    - `2. Thi pháp & Nghệ thuật`
    - `3. Hình tượng & Nhân vật`
    - `4. Argument Map`
    - `5. Dẫn chứng & Ngữ liệu`
  - Click vào từng tab chuyển đổi nội dung mượt mà, không giật lag.

---

### TC-GENRE-002 — Bộ chọn Thể loại (Thơ, Truyện, Nghị luận)
- **Mô-đun:** Genre Analysis
- **Mức độ:** P0 (High)
- **Các bước thực hiện:**
  1. Tại thanh điều khiển trên cùng, click nút **Thơ trữ tình**.
  2. Chuyển sang click nút **Truyện & Kí**.
  3. Chuyển sang click nút **Văn nghị luận**.
- **Kết quả mong đợi:**
  - Nút được click chuyển sang nền trắng, chữ đậm và có bóng mờ (active).
  - Nội dung phân tích trong các tab tự động chuyển đổi sang hệ khái niệm tương ứng (Thơ: vần/nhịp/hình ảnh; Truyện: tình huống/nhân vật/điểm nhìn; Nghị luận: luận đề/luận điểm/dẫn chứng).

---

### TC-GENRE-003 — Thao tác Argument Map: Thêm / Xóa Luận điểm & Lý lẽ
- **Mô-đun:** Genre Analysis (Tab 4: Argument Map)
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Chuyển sang Tab `4. Argument Map`.
  2. Quan sát cây sơ đồ lập luận trực quan trên nền tối sang trọng.
  3. Click nút **+ Thêm Luận điểm**.
  4. Tại Luận điểm mới tạo, click nút **+ Thêm Lý lẽ**.
  5. Click nút biểu tượng Thùng rác để xóa thử một Luận điểm.
- **Kết quả mong đợi:**
  - Cây lập luận hiển thị rõ 3 tầng: Luận đề trung tâm (Thesis) $\rightarrow$ Luận điểm (Claims) $\rightarrow$ Lý lẽ & Bằng chứng (Reasons & Evidences).
  - Khi thêm Luận điểm: Nhánh luận điểm mới xuất hiện ngay với số thứ tự tự tăng.
  - Khi thêm Lý lẽ: Một khối lý lẽ và dẫn chứng mới xuất hiện bên dưới luận điểm tương ứng.
  - Khi xóa: Luận điểm biến mất, cây sơ đồ tự động co giãn đẹp mắt; toast thông báo thành công.

---

### TC-GENRE-004 — Tác vụ xuyên mô-đun: Đưa vào KHBD
- **Mô-đun:** Cross-module (Genre $\rightarrow$ KHBD)
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Tại thanh công cụ tác vụ của Genre Analysis, click nút **Đưa vào KHBD**.
  2. Mở sang mô-đun *Kế hoạch bài dạy* (`#/khbd`).
  3. Kiểm tra Hoạt động 2: Hình thành kiến thức mới.
- **Kết quả mong đợi:**
  - Nội dung phân tích thi pháp được tự động ghép nối vào nội dung hoạt động khám phá kiến thức của KHBD.
  - Toast thông báo: *"Đã đưa ngữ liệu phân tích vào Hoạt động Khám phá của KHBD 5512."*

---

### TC-GENRE-005 — Tác vụ xuyên mô-đun: Đưa vào Slide & Tạo câu hỏi
- **Mô-đun:** Cross-module (Genre $\rightarrow$ Slide & Question)
- **Mức độ:** P0 (High)
- **Các bước thực hiện:**
  1. Tại Tab `5. Dẫn chứng & Ngữ liệu`, chọn một trích đoạn tác phẩm.
  2. Click nút **Đưa vào Slide**.
  3. Click nút **Tạo câu hỏi**.
- **Kết quả mong đợi:**
  - Click *Đưa vào Slide*: Sinh ngay 1 Slide bài giảng mới chứa trích đoạn đó và chuyển đến mô-đun Slide.
  - Click *Tạo câu hỏi*: Đưa ngữ liệu trích đoạn vào ô soạn thảo câu hỏi mới của Question Builder.

---

## MÔ-ĐUN 6: KẾ HOẠCH BÀI DẠY (KHBD 5512)

### TC-KHBD-001 — Chuyển đổi linh hoạt Visual Builder $\leftrightarrow$ Document View (A4)
- **Mô-đun:** KHBD
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Mở mô-đun *Kế hoạch bài dạy* (`#/khbd`).
  2. Quan sát nút gạt chế độ hiển thị trên góc phải.
  3. Click chuyển sang **Bản in A4 / Văn bản** (Document View).
  4. Click chuyển lại sang **Trực quan** (Visual Builder).
- **Kết quả mong đợi:**
  - Chế độ Trực quan: Hiển thị các khối thẻ tương tác trực quan, chỉnh sửa từng phần nhanh chóng.
  - Chế độ Văn bản: Hiển thị giao diện trang giấy A4 màu trắng mô phỏng chính xác văn bản hành chính theo quy định Công văn 5512, có đầy đủ Quốc hiệu, Tiêu ngữ, Tên trường, Tên bài dạy.
  - Dữ liệu giữa 2 chế độ đồng bộ 100%, không mất dữ liệu khi chuyển qua lại.

---

### TC-KHBD-002 — Cấu trúc 4 hoạt động dạy học chuẩn Công văn 5512
- **Mô-đun:** KHBD (Activities)
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Kiểm tra danh sách tiến trình dạy học trong KHBD.
- **Kết quả mong đợi:**
  - Hiển thị đầy đủ 4 hoạt động sư phạm chuẩn mực:
    1. *Hoạt động 1: Mở đầu / Khởi động*
    2. *Hoạt động 2: Hình thành kiến thức mới*
    3. *Hoạt động 3: Luyện tập*
    4. *Hoạt động 4: Vận dụng*
  - Mỗi hoạt động đều có thời lượng dự kiến (phút), phương pháp và thiết bị dạy học.

---

### TC-KHBD-003 — Cấu trúc 4 bước trong "Tổ chức thực hiện"
- **Mô-đun:** KHBD (Activity Steps)
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Mở chi tiết một hoạt động bất kỳ trong KHBD.
  2. Kiểm tra mục "Tổ chức thực hiện".
- **Kết quả mong đợi:**
  - Bắt buộc có đầy đủ 4 bước sư phạm tuần tự:
    - *Bước 1: Chuyển giao nhiệm vụ học tập* (GV giao việc)
    - *Bước 2: Thực hiện nhiệm vụ học tập* (HS nghiên cứu/thảo luận)
    - *Bước 3: Báo cáo kết quả và thảo luận* (Đại diện trình bày, phản biện)
    - *Bước 4: Kết luận, nhận định* (GV chốt chuẩn kiến thức)

---

### TC-KHBD-004 — Thêm, Sửa, Xóa Hoạt động dạy học
- **Mô-đun:** KHBD Builder
- **Mức độ:** P1 (High)
- **Các bước thực hiện:**
  1. Click nút **+ Thêm hoạt động**.
  2. Nhập tên: `"Hoạt động 2.4: Mở rộng đọc hiểu văn bản cùng đề tài"`.
  3. Chỉnh sửa thời lượng thành `"15 phút"`.
  4. Click nút Xóa hoạt động vừa tạo.
- **Kết quả mong đợi:**
  - Hoạt động mới được thêm vào danh sách tiến trình bài dạy.
  - Chỉnh sửa nội dung cập nhật tức thời (live update).
  - Thao tác xóa loại bỏ đúng hoạt động đã chọn mà không làm ảnh hưởng các hoạt động còn lại.

---

### TC-KHBD-005 — Đẩy hoạt động KHBD sang Slide bài giảng (KHBD $\rightarrow$ Slide)
- **Mô-đun:** Cross-module (KHBD $\rightarrow$ Slide)
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Tại thẻ Hoạt động 1 (Khởi động), click nút **Đưa sang Slide**.
  2. Mở mô-đun *Slide* (`#/slides`).
- **Kết quả mong đợi:**
  - Hệ thống tự động tạo 1 Slide mới mang tiêu đề Hoạt động 1.
  - Nội dung nhiệm vụ học tập và câu hỏi khởi động được chuyển thành các bullet points rõ ràng trên slide.
  - Toast thông báo thành công.

---

### TC-KHBD-006 — Xuất Kế hoạch bài dạy ra file Word (.docx)
- **Mô-đun:** Export KHBD Word
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Tại màn hình KHBD, click nút **Xuất Word (.docx)**.
  2. Chờ file tải về máy tính.
  3. Mở file `.docx` bằng Microsoft Word hoặc LibreOffice.
- **Kết quả mong đợi:**
  - File tải về thành công với tên chuẩn: `KHBD_5512_[TenBaiDay].docx`.
  - Văn bản có cấu trúc chuẩn văn bản hành chính giáo dục: Quốc hiệu tiêu ngữ, bảng biểu thông tin tiết dạy, mục tiêu 3 phần (Kiến thức, Năng lực, Phẩm chất), thiết bị dạy học và bảng tiến trình 4 hoạt động.
  - Tiếng Việt hiển thị chuẩn Unicode, không lỗi font.

---

## MÔ-ĐUN 7: NGÂN HÀNG CÂU HỎI (QUESTION BUILDER)

### TC-Q-001 — Hỗ trợ đầy đủ 4 dạng câu hỏi đánh giá năng lực
- **Mô-đun:** Question Builder
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Mở mô-đun *Ngân hàng câu hỏi* (`#/question_builder`).
  2. Kiểm tra bộ lọc phân loại câu hỏi.
- **Kết quả mong đợi:**
  - Hỗ trợ đầy đủ 4 dạng câu hỏi đặc thù môn Ngữ văn:
    1. *Câu hỏi Đọc hiểu*
    2. *Câu hỏi Tiếng Việt*
    3. *Nghị luận xã hội (Đoạn văn 200 chữ)*
    4. *Nghị luận văn học (Bài văn nghị luận)*

---

### TC-Q-002 — Phân cấp 3 mức độ nhận thức (NB, TH, VD)
- **Mô-đun:** Question Builder
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Xem danh sách câu hỏi hiện có.
  2. Lọc theo từng mức độ: **Nhận biết (NB)**, **Thông hiểu (TH)**, **Vận dụng (VD)**.
- **Kết quả mong đợi:**
  - Danh sách câu hỏi hiển thị huy hiệu mức độ nhận thức rõ ràng với màu sắc riêng biệt.
  - Khi click lọc theo mức độ nào thì danh sách chỉ hiển thị các câu hỏi thuộc mức độ đó.

---

### TC-Q-003 — Tạo mới câu hỏi Trắc nghiệm nhiều lựa chọn (MCQ)
- **Mô-đun:** Question Builder
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Click nút **+ Thêm câu hỏi mới**.
  2. Chọn dạng câu: *Đọc hiểu*, mức độ: *Nhận biết*.
  3. Nhập câu hỏi: `"Xác định phương thức biểu đạt chính của đoạn trích."`.
  4. Nhập 4 phương án A, B, C, D. Chọn đáp án đúng: A.
  5. Nhập giải thích đáp án và điểm số: `0.25`.
  6. Click **Lưu câu hỏi**.
- **Kết quả mong đợi:**
  - Câu hỏi mới được thêm vào danh sách câu hỏi của bài học.
  - Dữ liệu được lưu trữ an toàn trong state và LocalStorage.

---

### TC-Q-004 — Tạo mới câu hỏi Đúng/Sai (True/False 4 ý)
- **Mô-đun:** Question Builder
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Tạo câu hỏi định dạng Đúng/Sai (chuẩn Phần II CV 7991).
  2. Nhập lệnh hỏi và 4 phát biểu a, b, c, d.
  3. Đánh dấu tính Đúng/Sai cho từng phát biểu kèm giải thích.
  4. Lưu câu hỏi.
- **Kết quả mong đợi:**
  - Câu hỏi hiển thị đầy đủ 4 phát biểu con, mỗi phát biểu có lựa chọn Đúng/Sai độc lập.
  - Tổng điểm toàn câu được gán mặc định là 1.0 điểm.

---

### TC-Q-005 — Đẩy câu hỏi vào Đề kiểm tra 7991 (Question $\rightarrow$ Exam)
- **Mô-đun:** Cross-module (Question $\rightarrow$ Exam)
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Chọn một câu hỏi trong danh sách.
  2. Chọn phần thi muốn gán: *Phần I*, *Phần II*, *Phần III* hoặc *Phần IV*.
  3. Click nút **Gán vào Đề kiểm tra**.
  4. Mở sang mô-đun *Đề kiểm tra* (`#/exam`).
- **Kết quả mong đợi:**
  - Câu hỏi xuất hiện ngay tại phần thi tương ứng trong Đề kiểm tra 7991.
  - Điểm số của phần thi và tổng điểm đề thi được tự động tính toán lại.

---

## MÔ-ĐUN 8: ĐỀ KIỂM TRA CHUẨN CÔNG VĂN 7991 (EXAM 7991)

### TC-EXAM-001 — Cấu trúc 4 phần thi chuẩn Công văn 7991/BGDĐT-GDTrH
- **Mô-đun:** Exam 7991
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Mở mô-đun *Đề kiểm tra* (`#/exam`).
  2. Kiểm tra toàn bộ cấu trúc các phần trong đề.
- **Kết quả mong đợi:**
  - Cấu trúc đề thi tuân thủ 100% hướng dẫn Công văn 7991:
    - **Phần I: Câu trắc nghiệm nhiều lựa chọn** (12 câu $\times$ 0.25đ = 3.0 điểm)
    - **Phần II: Câu trắc nghiệm Đúng/Sai** (2 câu $\times$ 1.0đ = 2.0 điểm, mỗi câu gồm 4 ý a,b,c,d)
    - **Phần III: Câu trắc nghiệm trả lời ngắn** (4 câu $\times$ 0.5đ = 2.0 điểm)
    - **Phần IV: Câu tự luận viết bài/đoạn văn** (1 câu = 3.0 điểm)
  - Tổng điểm toàn đề đạt đúng chuẩn: **10.0 điểm**.

---

### TC-EXAM-002 — Chuyển đổi Đề thi học sinh $\leftrightarrow$ Hướng dẫn chấm giáo viên
- **Mô-đun:** Exam 7991 (View Modes)
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Quan sát nút chuyển chế độ trên thanh công cụ của Exam.
  2. Bật chế độ **Đề thi học sinh (Exam Paper)**.
  3. Bật chế độ **Hướng dẫn chấm (Marking Guide)**.
- **Kết quả mong đợi:**
  - Chế độ *Đề thi học sinh:* Chỉ hiển thị ngữ liệu, câu hỏi và các phương án lựa chọn; tuyệt đối **không hiển thị** đáp án đúng, giải thích hay bảng điểm chi tiết.
  - Chế độ *Hướng dẫn chấm:* Hiển thị rõ ràng đáp án đúng bằng màu xanh lá nổi bật, lời giải thích chi tiết, thang điểm từng bước và ma trận chấm điểm tự luận.

---

### TC-EXAM-003 — Chỉnh sửa câu hỏi trực tiếp (Live Edit Modal)
- **Mô-đun:** Exam 7991
- **Mức độ:** P1 (High)
- **Các bước thực hiện:**
  1. Click nút **Chỉnh sửa** tại Câu 1 của Phần I.
  2. Sửa lại nội dung câu hỏi và đổi đáp án đúng từ A sang B.
  3. Click **Lưu thay đổi**.
- **Kết quả mong đợi:**
  - Nội dung câu hỏi và đáp án cập nhật ngay tức thì trên giao diện Đề kiểm tra.
  - Dữ liệu được đồng bộ sang Ma trận đề và được tự động lưu.

---

### TC-EXAM-004 — Bộ mô phỏng chấm điểm tương tác (Scoring Simulator)
- **Mô-đun:** Exam 7991 (Scoring Simulator)
- **Mức độ:** P1 (High)
- **Các bước thực hiện:**
  1. Tại Phần II (Đúng/Sai), thử đánh dấu đúng 1 ý $\rightarrow$ Xem điểm.
  2. Đánh dấu đúng 2 ý $\rightarrow$ Xem điểm.
  3. Đánh dấu đúng 3 ý $\rightarrow$ Xem điểm.
  4. Đánh dấu đúng 4 ý $\rightarrow$ Xem điểm.
- **Kết quả mong đợi:**
  - Điểm số tự động tính theo quy tắc chuẩn CV 7991 cho câu hỏi Đúng/Sai:
    - Đúng 1 ý: `0.10 điểm`
    - Đúng 2 ý: `0.25 điểm`
    - Đúng 3 ý: `0.50 điểm`
    - Đúng cả 4 ý: `1.00 điểm`

---

### TC-EXAM-005 — Xuất Đề kiểm tra ra Word (.docx) chuẩn quy cách
- **Mô-đun:** Export Exam Word
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Click nút **Xuất Word (.docx)** tại màn hình Đề kiểm tra.
  2. Mở file `.docx` đã tải về.
- **Kết quả mong đợi:**
  - Tải về file `.docx` có cấu trúc hoàn chỉnh gồm 2 phần riêng biệt:
    1. Trang Đề kiểm tra dành cho học sinh (có khung tên trường, họ tên thí sinh, số báo danh).
    2. Trang Đáp án & Hướng dẫn chấm chi tiết dành cho giáo viên.
  - Bảng biểu Phần I, II, III ngay ngắn, không bị xô lệch lề trang.

---

## MÔ-ĐUN 9: KHUNG MA TRẬN & BẢN ĐẶC TẢ ĐỀ THI (MATRIX & SPECIFICATION)

### TC-MATRIX-001 — Đồng bộ điểm số & số câu tự động từ Đề kiểm tra
- **Mô-đun:** Matrix & Specification
- **Mức độ:** P0 (Critical)
- **Điều kiện tiên quyết:** Đề kiểm tra đang có đầy đủ 12 câu Phần I, 2 câu Phần II, 4 câu Phần III, 1 câu Phần IV.
- **Các bước thực hiện:**
  1. Mở mô-đun *Ma trận & Đặc tả* (`#/matrix`).
  2. Quan sát bảng số liệu ma trận 2 tầng.
- **Kết quả mong đợi:**
  - Khung Ma trận tự động hiển thị chính xác số lượng câu hỏi và tổng điểm của từng phần thi.
  - Không có hiện tượng số liệu bị lệch hoặc cố định cứng (hardcoded); mọi số liệu đều phản ánh đúng trạng thái thực tế của đề thi.

---

### TC-MATRIX-002 — Ruy-băng phân bố tỷ lệ % mức độ nhận thức
- **Mô-đun:** Matrix View
- **Mức độ:** P0 (High)
- **Các bước thực hiện:**
  1. Quan sát dải thanh ruy-băng phần trăm tỷ lệ nhận thức ở đầu trang Ma trận.
- **Kết quả mong đợi:**
  - Hiển thị tỷ lệ trực quan phân bổ theo 3 mức độ:
    - Nhận biết (NB): khoảng 40%
    - Thông hiểu (TH): khoảng 30%
    - Vận dụng (VD): khoảng 30%
  - Tổng 3 tỷ lệ cộng lại đạt đúng **100%**.

---

### TC-MATRIX-003 — Huy hiệu kiểm định tổng điểm 10.0 (Validation Match Badge)
- **Mô-đun:** Matrix View
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Kiểm tra huy hiệu trạng thái ở góc trên bảng Ma trận.
  2. Thử giảm điểm một câu hỏi trong Exam xuống 0.25 để tổng điểm còn 9.75 điểm.
  3. Quay lại Ma trận quan sát huy hiệu.
- **Kết quả mong đợi:**
  - Khi tổng điểm = 10.0: Huy hiệu màu xanh lá hiển thị *"Tổng điểm hợp lệ: 10.0/10.0 điểm — Khớp chuẩn CV 7991"*.
  - Khi tổng điểm $\ne$ 10.0: Huy hiệu đổi sang màu đỏ cảnh báo *"Lệch điểm: [Tổng điểm]/10.0 điểm — Vui lòng cân đối lại"*.

---

### TC-MATRIX-004 — Bản đặc tả đề thi chi tiết (Specification Table)
- **Mô-đun:** Matrix & Specification
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Cuộn xuống phần *Bản đặc tả đề kiểm tra* (Specification).
  2. Kiểm tra các cột trong bảng đặc tả.
- **Kết quả mong đợi:**
  - Bảng đặc tả hiển thị đầy đủ các cột chuẩn:
    - *STT*
    - *Kỹ năng / Đơn vị kiến thức* (Đọc hiểu ngữ liệu / Viết đoạn / Viết bài)
    - *Đơn vị kiến thức / Kỹ năng*
    - *Mức độ đánh giá (YCCĐ)*
    - *Số câu hỏi theo mức độ (NB, TH, VD)*
    - *Tỷ lệ % điểm số*

---

### TC-MATRIX-005 — Xuất Word Khung Ma trận & Bản đặc tả xoay ngang khổ A4 (Landscape)
- **Mô-đun:** Export Matrix Word
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Click nút **Xuất Word Ma trận & Đặc tả (.docx)** tại màn hình Ma trận hoặc Export Center.
  2. Mở file `.docx` đã tải về bằng Microsoft Word.
- **Kết quả mong đợi:**
  - File Word mở lên ở hướng giấy **Xoay ngang (Landscape A4)** đúng chuẩn hành chính cho bảng ma trận nhiều cột.
  - Chứa cả 2 bảng: Khung Ma trận ở trang 1 và Bản đặc tả câu hỏi ở các trang tiếp theo.
  - Bảng có đường kẻ viền rõ ràng, tiêu đề in đậm căn giữa, không bị cắt xén (clipping) cột nào.

---

## MÔ-ĐUN 10: TIÊU CHÍ CHẤM TỰ LUẬN (RUBRIC BUILDER)

### TC-RUBRIC-001 — Khung Rubric chuẩn thang điểm 10.0
- **Mô-đun:** Rubric Builder
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Mở mô-đun *Rubric* (`#/rubric`).
  2. Quan sát bảng tiêu chí chấm bài văn nghị luận.
- **Kết quả mong đợi:**
  - Tiêu đề: *Rubric Chấm Điểm Bài Viết Nghị Luận Văn Học (Thang Điểm 10.0)*.
  - Danh sách 6 tiêu chí chuẩn mực:
    1. *Xác định vấn đề nghị luận* (1.0 điểm)
    2. *Bố cục & Cấu trúc bài viết* (1.0 điểm)
    3. *Luận điểm & Lập luận* (2.5 điểm)
    4. *Dẫn chứng & Phân tích nghệ thuật* (2.5 điểm)
    5. *Diễn đạt, Dùng từ & Ngữ pháp* (1.5 điểm)
    6. *Sáng tạo & Đánh giá mở rộng* (1.5 điểm)
  - Tổng điểm tối đa của tất cả tiêu chí đạt chính xác **10.0 điểm**.

---

### TC-RUBRIC-002 — Hiển thị 3 mức độ chất lượng cho mỗi tiêu chí
- **Mô-đun:** Rubric Builder
- **Mức độ:** P1 (High)
- **Các bước thực hiện:**
  1. Xem chi tiết từng tiêu chí trong bảng Rubric.
- **Kết quả mong đợi:**
  - Mỗi tiêu chí đều có 3 cột mức độ chất lượng rõ ràng:
    - **Xuất sắc:** Điểm tối đa, mô tả tiêu chuẩn hoàn hảo.
    - **Đạt:** Khoảng 70% số điểm, mô tả mức độ cơ bản.
    - **Cần cố gắng:** Điểm tối thiểu, chỉ ra các lỗi thiếu sót.

---

### TC-RUBRIC-003 — Thêm, Sửa, Xóa Tiêu chí & Tự động tính lại tổng điểm
- **Mô-đun:** Rubric Builder
- **Mức độ:** P1 (High)
- **Các bước thực hiện:**
  1. Click **+ Thêm tiêu chí mới**.
  2. Nhập tên tiêu chí: `"Quy cách trình bày và chữ viết"`, điểm tối đa: `0.5đ`.
  3. Quan sát tổng điểm trên tiêu đề.
  4. Xóa tiêu chí vừa tạo.
- **Kết quả mong đợi:**
  - Tiêu chí mới được thêm vào bảng.
  - Tổng điểm toàn rubric tự động cộng thêm 0.5 thành 10.5 điểm.
  - Sau khi xóa, tổng điểm tự động trừ về đúng 10.0 điểm ban đầu.

---

## MÔ-ĐUN 11: THIẾT KẾ & TRÌNH CHIẾU BÀI GIẢNG (SLIDES STUDIO)

### TC-SLIDE-001 — Giao diện biên tập Slide chuẩn tỷ lệ 16:9
- **Mô-đun:** Slides Studio
- **Mức độ:** P0 (High)
- **Các bước thực hiện:**
  1. Mở mô-đun *Slide* (`#/slides`).
  2. Quan sát khu vực biên tập slide.
- **Kết quả mong đợi:**
  - Cột trái hiển thị danh sách slide thu nhỏ (Thumbnails).
  - Vùng trung tâm hiển thị khung Canvas tỷ lệ chuẩn **16:9** sắc nét.
  - Phía dưới khung canvas có vùng ghi chú giảng dạy (Speaker Notes).

---

### TC-SLIDE-002 — Thao tác danh sách Slide (Thêm, Xóa, Đổi thứ tự)
- **Mô-đun:** Slides Studio
- **Mức độ:** P1 (High)
- **Các bước thực hiện:**
  1. Click nút **+ Thêm slide mới**.
  2. Chọn bố cục cho slide mới: *Mẫu 2 cột (Split)*.
  3. Nhập tiêu đề và nội dung.
  4. Click nút Xóa slide.
- **Kết quả mong đợi:**
  - Slide mới được chèn vào danh sách và tự động được chọn để chỉnh sửa.
  - Thumbnail bên trái cập nhật ảnh đại diện tức thời.
  - Xóa slide hoạt động chuẩn xác, không làm lỗi các slide khác.

---

### TC-SLIDE-003 — Trình chiếu toàn màn hình (Fullscreen Presentation Mode)
- **Mô-đun:** Slides Studio
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Click nút **Trình chiếu (Fullscreen)**.
  2. Nhấn phím mũi tên Phải ($\rightarrow$) hoặc phím Cách (Space) để sang slide tiếp theo.
  3. Nhấn phím mũi tên Trái ($\leftarrow$) để lùi slide.
  4. Nhấn phím `Esc` để thoát chế độ trình chiếu.
- **Kết quả mong đợi:**
  - Trình chiếu bung toàn màn hình không viền (borderless), ẩn hoàn toàn Sidebar và TopBar.
  - Phím mũi tên chuyển đổi slide mượt mà.
  - Phím `Esc` thoát an toàn về lại giao diện Slides Studio.

---

### TC-SLIDE-004 — Tương tác câu hỏi trắc nghiệm trên Slide (Quiz Slide)
- **Mô-đun:** Slides Studio (Quiz Interaction)
- **Mức độ:** P0 (High)
- **Các bước thực hiện:**
  1. Mở slide định dạng Quiz (Ví dụ: Slide câu hỏi đọc hiểu Tây Tiến hoặc Vợ nhặt).
  2. Bấm chọn phương án đúng.
  3. Bấm chọn phương án sai.
- **Kết quả mong đợi:**
  - Khi chọn phương án đúng: Lựa chọn đổi sang màu xanh lá kèm lời giải thích chi tiết.
  - Khi chọn phương án sai: Lựa chọn đổi sang màu đỏ cảnh báo và hiển thị gợi ý.
  - Hoạt động mượt mà cả trong chế độ soạn thảo lẫn khi trình chiếu toàn màn hình.

---

### TC-SLIDE-005 — Xuất file bài giảng PowerPoint (.pptx)
- **Mô-đun:** Export Slide PPTX
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Tại màn hình Slides Studio, click nút **Xuất PowerPoint (.pptx)**.
  2. Mở file `.pptx` đã tải về bằng phần mềm Microsoft PowerPoint.
- **Kết quả mong đợi:**
  - Tải về file `.pptx` định dạng chuẩn 16:9.
  - Các slide giữ nguyên định dạng: Tiêu đề, chữ, trích dẫn, màu sắc bài giảng.
  - Có thể chỉnh sửa nội dung văn bản trực tiếp trên PowerPoint mà không bị vỡ bố cục.

---

## MÔ-ĐUN 12: TRUNG TÂM XUẤT BẢN & BÀN GIAO (EXPORT CENTER)

### TC-EXPORT-001 — Kiểm tra đầy đủ các thẻ xuất bản
- **Mô-đun:** Export Center
- **Mức độ:** P0 (High)
- **Các bước thực hiện:**
  1. Mở mô-đun *Xuất bản* (`#/export_handover`).
  2. Kiểm tra các thẻ xuất bản có sẵn.
- **Kết quả mong đợi:**
  - Hiển thị đầy đủ các thẻ tài liệu:
    1. *Word Kế hoạch bài dạy (.docx chuẩn CV 5512)*
    2. *Word Đề kiểm tra & Đáp án (.docx chuẩn CV 7991)*
    3. *Word Ma trận & Bản đặc tả (.docx khổ ngang A4)*
    4. *PowerPoint Bài giảng (.pptx tỷ lệ 16:9)*
    5. *Bản in chuẩn A4 (Trình duyệt Print)*
    6. *Sao lưu dữ liệu toàn hệ thống (.json)*

---

### TC-EXPORT-002 — Sao lưu toàn bộ hệ thống ra file JSON Backup
- **Mô-đun:** Backup State
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Tại Export Center, click nút **Tải file sao lưu JSON**.
  2. Quan sát file tải về.
- **Kết quả mong đợi:**
  - Tải về file có định dạng: `edumaster_backup_[timestamp].json`.
  - Mở file kiểm tra: Chứa đầy đủ cấu trúc AppState gồm `lessons`, `currentLessonId`, `khbd`, `slides`, `exam`, `questions`, `rubric`.
  - Toàn bộ ký tự tiếng Việt được chuẩn hóa dạng Unicode NFC nguyên vẹn.

---

### TC-EXPORT-003 — Phục hồi dữ liệu từ file JSON (Restore State)
- **Mô-đun:** Restore State
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Thay đổi tên trường học hoặc chỉnh sửa một vài câu hỏi trong đề.
  2. Vào Export Center, tại khu vực *Phục hồi dữ liệu (Restore)*, kéo thả hoặc chọn file JSON vừa sao lưu ở TC-EXPORT-002.
  3. Click nút **Phục hồi dữ liệu ngay**.
- **Kết quả mong đợi:**
  - Hệ thống tải lại trạng thái từ file JSON.
  - Toàn bộ bài học, giáo án, câu hỏi và đề thi trở về đúng trạng thái lúc sao lưu.
  - Toast thông báo: *"Khôi phục dữ liệu hệ thống thành công!"*

---

## MÔ-ĐUN 13: ĐỒNG BỘ DỮ LIỆU & TÍNH ĐỘC LẬP TỪNG BÀI DẠY (DATA INTEGRITY)

### TC-DATA-001 — Độc lập dữ liệu khi chuyển đổi giữa các bài học (Multi-Lesson Isolation)
- **Mô-đun:** Data Engine
- **Mức độ:** P0 (Critical)
- **Điều kiện tiên quyết:** Đang mở bài học *Tây Tiến*.
- **Các bước thực hiện:**
  1. Tại bài *Tây Tiến*, vào KHBD chỉnh sửa tên giáo viên thành `"Cô Mai Thị Hoa"`.
  2. Vào Đề kiểm tra kiểm tra: Câu 1 hỏi về *Quang Dũng*.
  3. Dùng TopBar chuyển sang bài học *Vợ nhặt* (Kim Lân).
  4. Mở KHBD của bài *Vợ nhặt* kiểm tra tiêu đề bài học và tiến trình dạy.
  5. Mở Đề kiểm tra của bài *Vợ nhặt* kiểm tra câu hỏi.
  6. Mở Slide của bài *Vợ nhặt* kiểm tra các slide.
  7. Dùng TopBar chuyển lại về bài *Tây Tiến*.
  8. Kiểm tra lại KHBD và Đề kiểm tra của *Tây Tiến*.
- **Kết quả mong đợi:**
  - Khi ở bài *Vợ nhặt*: KHBD hiển thị giáo án 3 tiết bài *Vợ nhặt*, Đề kiểm tra hỏi về nhân vật Tràng và bà cụ Tứ, Slide hiển thị tranh ảnh nạn đói 1945 và 4 bát bánh đúc. Tuyệt đối **không lẫn** câu thơ hay nội dung của *Tây Tiến*.
  - Khi quay lại bài *Tây Tiến*: Tên giáo viên `"Cô Mai Thị Hoa"` vừa sửa vẫn còn nguyên vẹn; toàn bộ đề thi và slide của *Tây Tiến* được bảo tồn độc lập.

---

### TC-DATA-002 — Tự động lưu LocalStorage & Phục hồi sau F5 (Autosave & Persistence)
- **Mô-đun:** Persistence
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Thêm một câu hỏi mới vào Ngân hàng câu hỏi.
  2. Chỉnh sửa một slide trong Slides Studio.
  3. Chờ 1 giây để trigger debounced autosave (300ms).
  4. Nhấn `F5` hoặc `Ctrl+R` để reload toàn bộ trình duyệt.
  5. Kiểm tra lại câu hỏi vừa thêm và slide vừa sửa.
- **Kết quả mong đợi:**
  - Dữ liệu vừa chỉnh sửa không bị mất.
  - Vị trí bài học hiện tại và mô-đun đang mở được khôi phục chính xác.

---

## MÔ-ĐUN 14: PHI CHỨC NĂNG, TƯƠNG THÍCH & ĐỘ TIN CẬY (NON-FUNCTIONAL)

### TC-NFR-001 — Kiểm tra Responsive trên màn hình 1366×768 (Laptop HD)
- **Mô-đun:** UI/UX Responsive
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Đặt kích thước viewport trình duyệt về **1366×768 px**.
  2. Duyệt qua tất cả các màn hình: Dashboard, Workspace, Genre Analysis, KHBD, Question Builder, Exam, Matrix, Rubric, Slides, Export.
- **Kết quả mong đợi:**
  - Không xuất hiện thanh cuộn ngang của trang (No horizontal scrollbar).
  - Không bị che khuất nút thao tác hay chữ bị đè lên nhau.
  - Các bảng biểu và vùng đọc tự kích hoạt cuộn nội bộ mượt mà.

---

### TC-NFR-002 — Kiểm tra chuẩn hóa Unicode tiếng Việt (NFC Normalization)
- **Mô-đun:** Unicode Engine
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Nhập các từ ngữ có dấu thanh phức tạp: `"khúc khuỷu"`, `"thăm thẳm"`, `"nghẹn bứ"`, `"rạng rỡ"`.
  2. Xuất file Word và mở trang Typography Test (`#/typography_test`).
- **Kết quả mong đợi:**
  - Chữ hiển thị liền mạch, dấu thanh đặt đúng trên nguyên âm chính.
  - Không xuất hiện hiện tượng lỗi font, ô vuông `[?]` hay dấu hỏi ngược.

---

### TC-NFR-003 — Xác minh loại bỏ triệt để tàn dư môn Toán học (Zero Math Residue)
- **Mô-đun:** Codebase & Domain Integrity
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Kiểm tra mã nguồn và giao diện người dùng.
  2. Tìm kiếm các từ khóa: `FormulaEditor`, `KaTeX`, `MathJax`, `Toán`, `EduMath`.
- **Kết quả mong đợi:**
  - 100% không tìm thấy bất kỳ thành phần hay công thức toán học nào trong giao diện và gói cài đặt của EduMaster Văn.

---

### TC-NFR-004 — Kiểm tra Build Production & TypeScript Compile
- **Mô-đun:** Build & Compilation
- **Mức độ:** P0 (Critical)
- **Các bước thực hiện:**
  1. Mở terminal, chạy lệnh: `npm run lint` (`tsc --noEmit`).
  2. Chạy lệnh: `npm run build` (`vite build`).
- **Kết quả mong đợi:**
  - `tsc --noEmit` thoát với mã **exit code 0** (0 lỗi cú pháp TypeScript).
  - `vite build` đóng gói thành công toàn bộ module vào thư mục `dist/` với mã **exit code 0**.

---

# PHẦN C — MA TRẬN TRUY XUẤT YÊU CẦU (TRACEABILITY MATRIX)

| Văn bản quy phạm / Nghiệp vụ | Mô-đun phần mềm | Yêu cầu nghiệp vụ | Mã Test Case kiểm thử |
|---|---|---|---|
| **Thông tư 32/2018 (GDPT 2018)** | App Shell & Reader | Không gian đọc & chú giải văn bản theo đặc trưng thể loại | `SHELL-001` $\rightarrow$ `005`, `READER-001` $\rightarrow$ `003` |
| **Công văn 5512/BGDĐT-GDTrH** | KHBD Builder | Cấu trúc 4 hoạt động & 4 bước tổ chức thực hiện, xuất Word chuẩn | `KHBD-001` $\rightarrow$ `006`, `EXPORT-001` |
| **Công văn 7991/BGDĐT-GDTrH** | Exam 7991 | Đề thi 4 phần (MCQ 12 câu, Đúng/Sai 4 ý, Trả lời ngắn, Tự luận) | `EXAM-001` $\rightarrow$ `005`, `Q-001` $\rightarrow$ `005` |
| **Công văn 7991/BGDĐT-GDTrH** | Matrix & Spec | Khung Ma trận & Bản đặc tả đồng bộ động, kiểm định 10.0đ, xuất Word Landscape | `MATRIX-001` $\rightarrow$ `005`, `EXPORT-001` |
| **Đánh giá năng lực Viết** | Rubric Builder | Khung rubric tự luận 6 tiêu chí, 3 mức chất lượng, thang 10.0 điểm | `RUBRIC-001` $\rightarrow$ `003` |
| **Phương pháp Storytelling** | Slides Studio | Slide bài giảng 16:9, sơ đồ tư duy, trắc nghiệm tương tác, xuất PPTX | `SLIDE-001` $\rightarrow$ `005` |
| **Đặc tả Section 5 UI Flow** | Dashboard | Modal tạo bài dạy mới 11 trường, inline validation, tạo starter package | `DASH-004`, `DASH-005` |
| **Tính độc lập bài học** | Data Engine | Chuyển đổi tác phẩm không trộn lẫn KHBD, Slide, Đề, Câu hỏi | `DATA-001`, `DATA-002` |

---

# PHẦN D — QUY TRÌNH SMOKE TEST RÚT GỌN (5 PHÚT TRƯỚC DEMO)

Trước khi thuyết trình hoặc nộp sản phẩm, kiểm thử viên hoặc lập trình viên thực hiện tuần tự **10 bước Smoke Test** tối giản sau:

1. **Bước 1:** Mở URL gốc $\rightarrow$ Xác nhận Dashboard hiện đúng tên GV và Resume Card (`SHELL-001`).
2. **Bước 2:** Click **Mở không gian soạn** $\rightarrow$ Vào Reader, bôi đen 1 câu thơ $\rightarrow$ Hiện Floating Toolbar (`FLOAT-001`).
3. **Bước 3:** Click **Sang Slide** $\rightarrow$ Slide mới được tạo chứa câu thơ (`FLOAT-004`).
4. **Bước 4:** Vào **Phân tích thể loại** $\rightarrow$ Kiểm tra đủ 5 tab và cây Argument Map (`GENRE-001`, `GENRE-003`).
5. **Bước 5:** Vào **Kế hoạch bài dạy** $\rightarrow$ Kiểm tra đủ 4 hoạt động 5512 $\rightarrow$ Bật thử bản in A4 (`KHBD-001`, `KHBD-002`).
6. **Bước 6:** Vào **Đề kiểm tra** $\rightarrow$ Kiểm tra 4 phần thi $\rightarrow$ Gạt xem Hướng dẫn chấm (`EXAM-001`, `EXAM-002`).
7. **Bước 7:** Vào **Ma trận & Đặc tả** $\rightarrow$ Kiểm tra huy hiệu màu xanh *"Khớp chuẩn CV 7991"* (`MATRIX-003`).
8. **Bước 8:** TopBar: Chuyển sang bài *Vợ nhặt* $\rightarrow$ Xác nhận dữ liệu đổi hoàn toàn sang *Vợ nhặt*, không dính *Tây Tiến* (`DATA-001`).
9. **Bước 9:** Vào **Xuất bản** $\rightarrow$ Click **Tải file sao lưu JSON** $\rightarrow$ File `.json` tải về máy (`EXPORT-002`).
10. **Bước 10:** Xuất thử 1 file Word KHBD hoặc Ma trận $\rightarrow$ File mở được ngay ngắn trên Office (`EXPORT-001`).

---

# PHẦN E — CHECKLIST NGHIỆM THU CHẤT LƯỢNG (RELEASE CHECKLIST)

- [ ] Toàn bộ **39 Test Cases** trong tài liệu này đạt kết quả **PASS**.
- [ ] Không có lỗi console đỏ (Red Console Errors) trong suốt quá trình thao tác.
- [ ] Lệnh `npm run lint` (`tsc --noEmit`) đạt **Exit code 0**.
- [ ] Lệnh `npm run build` tạo thành công thư mục `dist/` đạt **Exit code 0**.
- [ ] Không có bất kỳ thành phần toán học (`KaTeX`, `FormulaEditor`) nào trong source code.
- [ ] Giao diện co giãn chuẩn mực trên màn hình laptop 1366×768 không bị thanh cuộn ngoài `window.scrollY`.
- [ ] File Word xuất ra mở được trên Word 2016/2019/365 và LibreOffice không bị báo lỗi XML ("unreadable content").
- [ ] Dữ liệu chuyển đổi giữa các bài học độc lập 100%.

---

# PHẦN F — BIỂU MẪU BÁO CÁO LỖI CHUẨN (BUG REPORT TEMPLATE)

```markdown
### [BUG-ID] Tiêu đề ngắn gọn mô tả lỗi

- **Mô-đun:** [Dashboard / Reader / Genre / KHBD / Question / Exam / Matrix / Rubric / Slide / Export]
- **Mức độ nghiêm trọng (Severity):** [Critical / High / Medium / Low]
- **Mức độ ưu tiên (Priority):** [P0 / P1 / P2 / P3]
- **Môi trường:** Chrome 124 / Windows 11 / Độ phân giải 1366×768

#### 1. Điều kiện tiên quyết (Preconditions)
- Đang mở bài học: [Tây Tiến / Vợ nhặt / ...]

#### 2. Các bước tái hiện (Steps to Reproduce)
1. Bước 1...
2. Bước 2...
3. Bước 3...

#### 3. Kết quả thực tế (Actual Result)
- Mô tả điều gì xảy ra sai (ví dụ: giao diện bị tràn, số điểm không cập nhật, console báo lỗi...).

#### 4. Kết quả mong đợi (Expected Result)
- Mô tả điều đúng đắn cần phải diễn ra theo đặc tả test case.

#### 5. Ảnh chụp màn hình / Log Console
- [Dán ảnh chụp hoặc log lỗi nếu có]
```

---

# PHẦN G — KẾT LUẬN & CAM KẾT CHẤT LƯỢNG

Tài liệu **Kế hoạch & Bộ Test Case Kiểm thử Toàn diện Hệ thống EduMaster Văn** phiên bản 3.0.0 này là căn cứ chuẩn mực cao nhất để thẩm định, nghiệm thu và đánh giá chất lượng phần mềm trước khi triển khai thực tế cho giáo viên Ngữ văn THPT trên toàn quốc. 

Mọi chức năng trong hệ thống đã được thiết kế đồng bộ với hệ thống văn bản của Bộ Giáo dục & Đào tạo, bảo đảm tính học thuật, tính sư phạm và độ tin cậy phần mềm tuyệt đối.