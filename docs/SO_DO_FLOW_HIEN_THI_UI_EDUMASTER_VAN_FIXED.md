# TÀI LIỆU SƠ ĐỒ FLOW HIỂN THỊ UI TOÀN BỘ HỆ THỐNG EDUMASTER VĂN

> **Hệ thống:** EduMaster Văn — Literature Teaching Workspace  
> **Đối tượng chính:** Giáo viên Ngữ văn THPT  
> **Mô hình:** SPA Viewport-First, không yêu cầu đăng nhập/xác thực

---

# 1. GLOBAL SCREEN FLOW

```mermaid
flowchart TD
    Start(["Mở EduMaster Văn"]) --> Init["Load / Restore AppState"]
    Init --> Shell["App Shell"]

    Shell --> Dashboard["Dashboard"]
    Shell --> Lesson["Tạo / Chọn bài dạy"]
    Shell --> Reader["Literature Workspace"]
    Shell --> Genre["Genre Analysis"]
    Shell --> KHBD["KHBD"]
    Shell --> Slides["Slides Studio"]
    Shell --> Matrix["Matrix & Specification"]
    Shell --> Questions["Question Bank"]
    Shell --> Exam["Exam Builder"]
    Shell --> Rubric["Rubric / Marking Guide"]
    Shell --> Export["Export Center"]

    Dashboard --> Lesson
    Dashboard --> Reader
    Reader --> Genre
    Reader --> KHBD
    Reader --> Slides
    Reader --> Questions
    Genre --> KHBD
    Genre --> Slides
    KHBD --> Slides
    Matrix --> Questions
    Questions --> Exam
    Exam --> Matrix
    Exam --> Rubric
```

---

# 2. APP SHELL

```text
┌───────────────┬─────────────────────────────────────────┐
│ Sidebar       │ TopBar                                  │
│               ├─────────────────────────────────────────┤
│               │ Active View                             │
└───────────────┴─────────────────────────────────────────┘
```

Sidebar:
```text
Bàn làm việc
Tác phẩm
Phân tích thể loại
KHBD
Câu hỏi
Ma trận & Đặc tả
Đề kiểm tra
Rubric
Slide
Xuất bản
```

TopBar:
```text
Ngữ văn 12 / Tây Tiến — Quang Dũng
Đã lưu · HH:mm
Xem trước
Xuất
•••
```

---

# 3. DASHBOARD UI FLOW

```mermaid
flowchart TD
    D["Dashboard"] --> G["Greeting"]
    D --> R["Resume Card"]
    D --> Q["Quick Actions"]
    D --> L["Recent Lessons"]

    R --> C["Tiếp tục"]
    C --> W["Literature Workspace"]

    Q --> Q1["Tạo/Chọn bài"]
    Q --> Q2["Phân tích văn bản"]
    Q --> Q3["Soạn KHBD"]
    Q --> Q4["Tạo câu hỏi"]
    Q --> Q5["Tạo đề"]
```

---

# 4. CREATE LESSON UI

```mermaid
flowchart TD
    A["Create Lesson"] --> B["Khối/Lớp"]
    A --> C["Tên tác phẩm"]
    A --> D["Tác giả"]
    A --> E["Thể loại"]
    A --> F["Bộ sách"]
    A --> G["Số tiết"]
    A --> H["YCCĐ"]
    A --> I["Trọng tâm kiến thức"]
    A --> J["Ngữ liệu"]
    A --> K["Tài liệu tham khảo"]

    A --> L["Tạo bài dạy"]
    L --> M{"Hợp lệ?"}
    M -->|Không| N["Inline Validation"]
    M -->|Có| O["Literature Workspace"]
```

---

# 5. LITERATURE WORKSPACE UI

```text
┌──────────────┬────────────────────────────┬──────────────────┐
│ OUTLINE      │ READER                     │ INSIGHT PANEL    │
│ 220–240px    │ flexible                   │ 300–340px        │
└──────────────┴────────────────────────────┴──────────────────┘
```

```mermaid
flowchart TD
    W["Literature Workspace"] --> O["Outline / Annotations"]
    W --> R["Reader Pane"]
    W --> I["Insight Panel"]

    R --> S["Text Selection"]
    S --> T["Floating Toolbar"]

    T --> H["Highlight"]
    T --> N["Ghi chú"]
    T --> SL["Sang Slide"]
    T --> Q["Tạo câu hỏi"]
    T --> E["Đặt làm ngữ liệu đề"]

    I --> P["Thi pháp"]
    I --> F["Hình tượng"]
    I --> EV["Dẫn chứng"]
```

Focus mode:
```text
Reader full width
+ ẩn/thu gọn side panels
```

---

# 6. GENRE ANALYSIS UI

```mermaid
flowchart TD
    G["Genre Analysis"] --> Tabs["Tabs"]
    Tabs --> T1["Tổng quan"]
    Tabs --> T2["Thi pháp / Nghệ thuật"]
    Tabs --> T3["Hình tượng / Nhân vật"]
    Tabs --> T4["Argument Map"]
    Tabs --> T5["Dẫn chứng"]

    T4 --> A["Add Claim"]
    T4 --> B["Add Reason"]
    T4 --> C["Attach Quote"]
```

---

# 7. KHBD UI

```mermaid
flowchart TD
    K["KHBD"] --> Mode["Visual / Document"]
    Mode -->|Visual| V["Visual Builder"]
    Mode -->|Document| D["A4 Document View"]

    V --> O["Mục tiêu"]
    V --> E["Thiết bị/Học liệu"]
    V --> A["Activities"]

    A --> A1["Khởi động"]
    A --> A2["Khám phá/Hình thành kiến thức"]
    A --> A3["Luyện tập"]
    A --> A4["Vận dụng"]

    A1 --> Detail["Activity Detail"]
    A2 --> Detail
    A3 --> Detail
    A4 --> Detail

    Detail --> S["Tổ chức thực hiện"]
    S --> S1["1. Chuyển giao"]
    S --> S2["2. Thực hiện"]
    S --> S3["3. Báo cáo/Thảo luận"]
    S --> S4["4. Kết luận/Nhận định"]

    Detail --> Slide["Đưa vào Slide"]
```

---

# 8. SLIDES UI

```text
Thumbnails | 16:9 Canvas | Inspector
```

```mermaid
flowchart TD
    S["Slides Studio"] --> T["Thumbnails"]
    S --> C["Canvas"]
    S --> I["Inspector"]

    C --> Q["Quote"]
    C --> SP["Split"]
    C --> CA["Cards"]
    C --> AM["Argument Map"]
    C --> QUIZ["Quiz"]
    C --> SUM["Summary"]

    S --> P["Fullscreen"]
    S --> X["PPTX"]
```

---

# 9. PRESENTATION

```mermaid
flowchart TD
    P["Fullscreen"] --> N["← / → / Space / Esc"]
    P --> Type{"Slide type?"}
    Type -->|Normal| D["Hiển thị nội dung"]
    Type -->|Quiz| Q["Quiz"]
    Q --> S["Học sinh trả lời ngoài hệ thống"]
    S --> T["Giáo viên chọn đáp án"]
    T --> F["Feedback"]
```

---

# 10. MATRIX & SPEC

```text
Header + Summary
Tabs: Matrix | Specification
Main Table | Live Summary
```

```mermaid
flowchart TD
    R["Matrix & Specification"] --> M["Matrix"]
    R --> S["Specification"]
    M --> A["Chủ đề/Đơn vị kiến thức"]
    M --> B["Mức độ"]
    M --> C["Dạng câu"]
    M --> D["Điểm/Tỷ lệ"]
    S --> E["YCCĐ"]
    S --> F["Question Count"]
```

---

# 11. QUESTION BANK UI

```text
Filters + Question List | Question Editor
```

Editor:
```text
Ngữ liệu
Câu hỏi
Đáp án
Hướng dẫn chấm
Metadata
```

Filters:
```text
Khối
Tác phẩm / Chủ đề
YCCĐ
Mức độ
Dạng câu
```

---

# 12. EXAM BUILDER UI

```text
Sections | Questions | Statistics
```

Sections:
```text
Multiple Choice
True/False
Short Answer
Essay
```

Statistics:
```text
Tổng câu
Tổng điểm
Thời lượng
Mức độ
Phân bố dạng
Matrix match
```

---

# 13. RUBRIC UI

```text
Rubric Builder

Criterion List
│
├── Tên tiêu chí
├── Điểm tối đa
├── Trọng số
└── Mô tả mức chất lượng

Live Total
```

Các tiêu chí gợi ý:
```text
Nội dung
Lập luận
Dẫn chứng
Diễn đạt
Chính tả / trình bày
Sáng tạo
```

---

# 14. EXPORT UI

```mermaid
flowchart TD
    E["Export Center"] --> O["Office / Print"]
    O --> K["KHBD DOCX"]
    O --> S["Slides PPTX"]
    O --> X["Exam DOCX"]
    O --> M["Matrix / Spec"]
    O --> R["Rubric / Marking"]

    E --> B["Backup JSON"]
    E --> RS["Restore JSON"]
```

---

# 15. AUTOSAVE UI

```text
Đang lưu…
Đã lưu · 13:14
Lỗi lưu
```

```mermaid
flowchart LR
    Edit["Edit"] --> State["AppState"] --> Debounce["Debounce"] --> LS["LocalStorage"] --> Status["TopBar Status"]
```

---

# 16. RESPONSIVE

Desktop:
```text
Reader: Outline | Reader | Insight
Slides: Thumbnails | Canvas | Inspector
Exam: Sections | Questions | Statistics
```

Tablet:
```text
Content
+ Sidebar Drawer
+ Inspector Drawer
```

Mobile:
```text
Single column
+ Bottom Sheet tools
```

---

# 17. UI TRANSITION MATRIX

| Nguồn | Trigger | Đích |
|---|---|---|
| Dashboard | Tiếp tục | Literature Workspace |
| Dashboard | Tạo bài | Create Lesson |
| Reader | Phân tích | Genre Analysis |
| Reader | Sang Slide | Slides |
| Reader | Tạo câu hỏi | Question Bank |
| Reader | Đặt ngữ liệu đề | Exam |
| Genre | Đưa vào KHBD | KHBD |
| KHBD | Đưa hoạt động sang Slide | Slides |
| Matrix | Tạo/tìm câu | Question Bank |
| Question Bank | Đưa vào đề | Exam |
| Exam | Xem Rubric | Rubric |
| Export | Restore JSON | Dashboard |
| Bất kỳ edit | State change | Autosave |

---

# 18. ROUTES ĐỀ XUẤT

```text
#/dashboard
#/lesson/new
#/reader
#/genre
#/khbd
#/slides
#/matrix
#/questions
#/exam
#/rubric
#/export
```

Không có:
```text
#/login
#/profile
#/admin
#/student
```

---

# 19. DEMO FLOW

```mermaid
flowchart LR
    A["Dashboard"] --> B["Mở Tây Tiến"]
    B --> C["Literature Workspace"]
    C --> D["Highlight + Note"]
    D --> E["Genre Analysis"]
    E --> F["KHBD"]
    F --> G["Slides"]
    D --> H["Matrix"]
    H --> I["Specification"]
    I --> J["Question Bank"]
    J --> K["Exam"]
    K --> L["Rubric / Marking"]
    L --> M["Export"]
```

---

# 20. CHECKLIST

- [ ] Không có text/module Toán trong production UI
- [ ] Literature Reader hoạt động
- [ ] Genre Analysis hoạt động
- [ ] Highlight/Annotation hoạt động
- [ ] Reader → Slide/Question/Exam
- [ ] KHBD đúng cấu trúc
- [ ] Slide quote/split/cards/quiz
- [ ] Matrix & Specification
- [ ] Question Bank
- [ ] Exam
- [ ] Rubric
- [ ] Export
- [ ] Autosave
- [ ] JSON Backup/Restore
- [ ] Responsive