# TÀI LIỆU THIẾT KẾ BỐ CỤC UI/UX TOÀN HỆ THỐNG

# EDUMASTER VĂN — LITERATURE TEACHING WORKSPACE

> **Phiên bản:** v4.1 — Literature Redesign  
> **Hệ thống:** EduMaster Văn — Literature Teaching & Assessment Workspace  
> **Đối tượng chính:** Giáo viên Ngữ văn THPT  
> **Phạm vi:** Ứng dụng chủ yếu phục vụ giáo viên; truy cập thẳng, không yêu cầu đăng nhập/xác thực  
> **Mục tiêu:** Đọc & phân tích văn bản → KHBD → Slide → Ma trận/Bản đặc tả → Câu hỏi → Đề kiểm tra → Rubric/Hướng dẫn chấm → Xuất bản

---

# 1. ĐỊNH VỊ SẢN PHẨM

EduMaster Văn là không gian làm việc số tích hợp cho giáo viên Ngữ văn, hỗ trợ toàn bộ chu trình chuyên môn:

```text
Chọn / tạo bài dạy
→ Đọc & chú giải văn bản
→ Phân tích thể loại / thi pháp / luận điểm
→ KHBD
→ Slide
→ Yêu cầu cần đạt
→ Ma trận
→ Bản đặc tả
→ Ngân hàng câu hỏi
→ Đề kiểm tra
→ Rubric / Hướng dẫn chấm
→ Xuất bản
```

Không dùng các khái niệm đặc thù Toán như:
- Math Workspace
- Formula Editor
- Graph / Geometry
- Example / Solution Steps
- KaTeX / MathJax

Trung tâm của hệ thống là **văn bản, ngữ liệu, chú giải, thi pháp, dẫn chứng, luận điểm và hoạt động dạy học Ngữ văn**.

---

# 2. TRIẾT LÝ THIẾT KẾ

## 2.1. Literary Clarity
Ưu tiên:
- văn bản dễ đọc;
- typography tiếng Việt tốt;
- giữ nhịp đọc;
- không gian trắng;
- chú giải không che nội dung;
- dẫn chứng dễ truy xuất.

## 2.2. Pedagogical Workflow

```text
Literature Workspace
→ Genre Analysis
→ KHBD
→ Slides
```

```text
YCCĐ
→ Matrix
→ Specification
→ Question Bank
→ Exam
→ Validation
→ Rubric / Marking Guide
```

## 2.3. Single Source of Truth

Không nhập lại:
- tên tác phẩm;
- tác giả;
- lớp;
- YCCĐ;
- ngữ liệu;
- câu hỏi;
- đáp án;
- điểm;
- dẫn chứng.

## 2.4. Viewport-First

Tối ưu:
```text
1366×768
1440×900
1920×1080
```

App shell:
```text
height: 100vh
overflow: hidden
```

Panel nội bộ:
```text
min-height: 0
overflow-y: auto
```

---

# 3. DESIGN SYSTEM

## 3.1. Visual Direction

**Modern Academic Workspace + Literary Reading Environment**

Phong cách:
- học thuật;
- ấm;
- nhẹ;
- hiện đại;
- không quá giống dashboard doanh nghiệp.

## 3.2. Màu sắc

| Token | Gợi ý | Vai trò |
|---|---|---|
| canvas | `#FAF8F5` / `#F8FAFC` | nền |
| surface | `#FFFFFF` | card/panel |
| text-primary | `#1F2937` | nội dung chính |
| text-secondary | `#6B7280` | metadata |
| border | `#E5E7EB` | viền |
| primary | `#7C2D12` hoặc `#7F1D1D` | CTA/active |
| primary-subtle | `#FFF7ED` | active background |
| success | `#15803D` | hoàn thành |
| warning | `#B45309` | cảnh báo |
| danger | `#B91C1C` | lỗi/xóa |

## 3.3. Typography

### UI
Dùng **Be Vietnam Pro**.

### Vùng đọc văn bản
Có thể dùng **Lora** hoặc serif hỗ trợ tiếng Việt tốt.

Gợi ý:
```text
Page Title      24–28px / 600
Section Title   18–20px / 600
Body UI         14–15px
Reader Text     17–19px / line-height 1.75–1.9
Metadata        12–13px
```

---

# 4. GLOBAL APP SHELL

```text
┌───────────────┬────────────────────────────────────────────┐
│ Sidebar       │ TopBar                                     │
│ 240–248px     ├────────────────────────────────────────────┤
│               │ Active View                                │
└───────────────┴────────────────────────────────────────────┘
```

## Sidebar

```text
Bàn làm việc
Tác phẩm
Phân tích thể loại
Kế hoạch bài dạy
Câu hỏi
Ma trận & Đặc tả
Đề kiểm tra
Rubric
Slide
Xuất bản
```

Không có:
- Login
- Profile page
- Admin portal

## TopBar

Cụm trái:
```text
Ngữ văn 12 / Tây Tiến — Quang Dũng
```

Cụm phải:
```text
Đã lưu · HH:mm
Xem trước
Xuất
•••
```

---

# 5. DASHBOARD

Dashboard trả lời nhanh:
- đang làm bài nào;
- tiến độ KHBD/Slide/Đề;
- bài gần đây;
- thao tác tiếp theo.

Quick actions:
```text
Tạo / chọn bài dạy
Phân tích văn bản
Soạn KHBD
Tạo câu hỏi
Tạo đề
```

Resume Card:
```text
Tây Tiến
Quang Dũng
Ngữ văn 12
KHBD 80%
Slide 60%
Đề 40%
[Tiếp tục]
```

---

# 6. CREATE / SELECT LESSON

Fields:
```text
Khối/Lớp
Chủ đề / Bài học
Tên tác phẩm
Tác giả
Thể loại
Bộ sách
Số tiết
Yêu cầu cần đạt
Trọng tâm kiến thức
Ngữ liệu / văn bản
Tài liệu tham khảo
```

CTA:
```text
Tạo bài dạy
```

Sau khi tạo:
```text
LiteratureLesson
→ set current lesson
→ mở Literature Workspace
```

---

# 7. LITERATURE WORKSPACE

## 7.1. Layout 3 cột

```text
┌──────────────┬──────────────────────────────┬────────────────────┐
│ OUTLINE      │ READER                       │ INSIGHT PANEL      │
│ 220–240px    │ flexible                     │ 300–340px          │
├──────────────┼──────────────────────────────┼────────────────────┤
│ Mục lục      │ Văn bản tác phẩm             │ Thi pháp           │
│ Đánh dấu     │ Highlight / selection        │ Hình tượng         │
│ Ghi chú      │ Paragraph anchors            │ Từ khóa / dẫn chứng│
└──────────────┴──────────────────────────────┴────────────────────┘
```

## 7.2. Reader
Hỗ trợ:
- outline;
- smooth scroll;
- focus/zen mode;
- highlight nhiều màu;
- note;
- tag;
- bookmark;
- trích dẫn sang Slide;
- chuyển sang Question Builder;
- đặt làm ngữ liệu Exam.

## 7.3. Floating Contextual Toolbar

Khi chọn văn bản:

```text
[Highlight] [Ghi chú] [Sang Slide] [Tạo câu hỏi] [Đặt làm ngữ liệu đề]
```

---

# 8. GENRE ANALYSIS & ARGUMENT MAP

Tabs:
```text
Tổng quan
Thi pháp / Nghệ thuật
Hình tượng
Luận điểm
Dẫn chứng
```

Theo thể loại:

### Thơ
- hình ảnh;
- nhịp điệu;
- ngôn ngữ;
- biện pháp tu từ;
- cái tôi trữ tình.

### Truyện
- tình huống;
- nhân vật;
- điểm nhìn;
- chi tiết nghệ thuật;
- ngôi kể.

### Nghị luận
- luận đề;
- luận điểm;
- luận cứ;
- dẫn chứng;
- thao tác lập luận.

Argument Map:
```text
Luận đề
├── Luận điểm 1
│   ├── Luận cứ
│   └── Dẫn chứng
└── Luận điểm 2
    ├── Luận cứ
    └── Dẫn chứng
```

Actions:
```text
Đưa vào KHBD
Đưa vào Slide
Tạo câu hỏi
```

---

# 9. KHBD BUILDER

Hai mode:
```text
Visual Builder
Document View
```

Cấu trúc:
```text
I. Mục tiêu
II. Thiết bị & Học liệu
III. Tiến trình dạy học
```

Mỗi Activity:
```text
Tên hoạt động
Thời lượng
Mục tiêu
Nội dung
Sản phẩm
Thiết bị/Học liệu
Phương pháp/Hình thức
Tổ chức thực hiện
```

Bên trong **Tổ chức thực hiện**:
```text
1. Chuyển giao nhiệm vụ
2. Thực hiện nhiệm vụ
3. Báo cáo / Thảo luận
4. Kết luận / Nhận định
```

Không nhầm:
```text
Mục tiêu / Nội dung / Sản phẩm / Tổ chức thực hiện
```
với 4 bước.

Activity → Slide:
- Khởi động → Hook/Quote/Question
- Khám phá văn bản → Quote/Split
- Phân tích → Cards/Argument
- Luyện tập → Quiz
- Vận dụng → Writing/Application

---

# 10. SLIDES STUDIO

Layout:
```text
Thumbnails | 16:9 Canvas | Inspector
```

Slide types:
```text
Cover
Objectives
Quote
Split
Cards
Timeline
Argument Map
Character
Theme
Quiz
Writing Prompt
Summary
```

Presentation:
- fullscreen 16:9;
- ← / → / Space / Esc;
- Quiz do giáo viên điều khiển;
- học sinh trả lời ngoài hệ thống.

Export:
```text
PPTX
```

---

# 11. ASSESSMENT WORKSPACE

Flow chuẩn:

```text
Yêu cầu cần đạt
→ Ma trận
→ Bản đặc tả
→ Ngân hàng câu hỏi
→ Đề kiểm tra
→ Validation
→ Đáp án / Hướng dẫn chấm / Rubric
```

Ma trận vừa là:
- công cụ thiết kế;
- công cụ đối chiếu sau khi ráp đề.

---

# 12. MATRIX & SPECIFICATION

Matrix:
```text
Chủ đề / đơn vị kiến thức
×
Mức độ nhận thức
×
Dạng câu hỏi
```

Specification:
```text
Chủ đề
Đơn vị kiến thức
YCCĐ
Dạng câu
Mức độ
Số câu dự kiến
```

Không hard-code tỷ lệ nhận thức nếu không được tài liệu nguồn xác nhận.

---

# 13. QUESTION BANK

Layout Master–Detail:

```text
Filters + Question List | Question Editor
```

Filters:
```text
Khối
Tác phẩm / Chủ đề
YCCĐ
Mức độ
Dạng câu
```

Editor:
```text
Ngữ liệu
Câu hỏi
Đáp án
Hướng dẫn chấm
Metadata
```

Question types:
- Multiple Choice
- True/False
- Short Answer
- Essay

---

# 14. EXAM BUILDER

Layout:
```text
Sections | Questions | Statistics
```

Sections theo cấu hình đề:
```text
Multiple Choice
True/False
Short Answer
Essay
```

Không hard-code số câu như quy định bắt buộc nếu nguồn hiện tại không xác nhận.

Statistics:
- tổng câu;
- tổng điểm;
- thời lượng;
- mức độ;
- dạng câu;
- matrix match.

---

# 15. RUBRIC & MARKING GUIDE

Đối với môn Văn, **Rubric vẫn là module hợp lệ**.

Rubric hỗ trợ:
```text
Tiêu chí
Trọng số / điểm tối đa
Mô tả mức chất lượng
Tổng điểm
```

Ví dụ:
```text
Nội dung
Lập luận
Dẫn chứng
Diễn đạt
Chính tả / trình bày
Sáng tạo
```

Rubric có thể gắn với câu tự luận / bài viết.

---

# 16. EXPORT CENTER

```text
KHBD → DOCX / Print
Slides → PPTX
Exam → DOCX / Print
Matrix → DOCX / Print
Specification → DOCX / Print
Rubric / Marking Guide → DOCX / Print
Backup → JSON
Restore → JSON
```

Mọi module gọi chung `ExportService`.

---

# 17. AUTOSAVE / BACKUP / RESTORE

Autosave:
```text
Edit
→ AppState
→ Debounce
→ LocalStorage
```

Backup:
```text
Download JSON
Copy JSON
```

Restore:
```text
Parse
→ Validate Schema
→ Migrate nếu cần
→ Apply
→ Persist
→ Refresh UI
```

Autosave khác Backup.

---

# 18. RESPONSIVE

Desktop:
- Reader 3 cột;
- Slides 3 cột;
- Exam 3 cột.

Tablet:
- Sidebar Drawer;
- Insight panel/Inspector → Drawer.

Mobile:
- Reader một cột;
- tools → Bottom Sheet;
- không ép layout desktop xuống mobile.

---

# 19. ACCESSIBILITY & TYPOGRAPHY

- keyboard navigation;
- focus-visible;
- aria-label cho icon-only button;
- contrast AA;
- kiểm tra dấu tiếng Việt;
- không clipping;
- Reader line-height 1.75–1.9;
- touch target đủ lớn.

---

# 20. FOOTER / TEACHER IDENTITY

Không có Profile Page.

Full footer chỉ ở:
- Dashboard;
- Export Center;
- Landing nếu có.

Thông tin giáo viên nên lấy từ config/state, không hard-code nhiều nơi.

---

# 21. COMPONENT MAP

```text
AppShell
TopBar
Sidebar
TeacherFooter
Toast
Modal
Drawer

TeacherDashboard
CreateLessonForm

LiteratureWorkspace
LiteratureOutline
ReaderPane
InsightPanel
FloatingSelectionToolbar
AnnotationPanel

GenreAnalysis
ArgumentMap

KhbdBuilder
KhbdDocumentView
ActivityCard
ActivityStepEditor

QuestionBank
QuestionEditor

MatrixTable
SpecificationTable

ExamBuilder
ExamStatistics
ValidationPanel

RubricBuilder
MarkingGuide

SlidesStudio
SlideThumbnailList
LiteratureSlideCanvas
SlideInspector
PresentationMode

ExportCenter
BackupPanel
RestorePanel
```

---

# 22. ACCEPTANCE CHECKLIST

## Global
- [ ] Không có Login/Profile/Admin Portal
- [ ] Sidebar đúng domain Ngữ văn
- [ ] Autosave hoạt động
- [ ] Không body scroll ở editor chính

## Literature Workspace
- [ ] 3-column desktop
- [ ] outline
- [ ] focus mode
- [ ] highlight
- [ ] note
- [ ] floating toolbar
- [ ] Reader → Slide/Question/Exam

## Genre Analysis
- [ ] thể loại
- [ ] thi pháp
- [ ] argument map
- [ ] dẫn chứng

## KHBD
- [ ] Visual Builder
- [ ] Document View
- [ ] 4 bước đúng tầng
- [ ] Activity → Slide

## Slides
- [ ] Quote/Split/Cards/Quiz
- [ ] fullscreen
- [ ] PPTX

## Assessment
- [ ] Matrix
- [ ] Specification
- [ ] Question Bank
- [ ] Exam
- [ ] Validation
- [ ] Rubric / Marking Guide

## Export
- [ ] DOCX
- [ ] PPTX
- [ ] Print/PDF
- [ ] JSON Backup
- [ ] JSON Restore

---

# 23. KẾT LUẬN

Trung tâm của EduMaster Văn là:

```text
VĂN BẢN
+
NGỮ LIỆU
+
CHÚ GIẢI
+
THI PHÁP
+
LUẬN ĐIỂM
+
DẪN CHỨNG
```

Dữ liệu này được tái sử dụng xuyên:

```text
KHBD
SLIDES
QUESTIONS
MATRIX
EXAM
RUBRIC
EXPORT
```

Kết quả cuối cùng là một **Literature Teaching Workspace** phục vụ trực tiếp công việc soạn giảng và kiểm tra đánh giá của giáo viên Ngữ văn.