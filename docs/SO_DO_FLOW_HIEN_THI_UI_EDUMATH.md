# TÀI LIỆU SƠ ĐỒ FLOW HIỂN THỊ UI TOÀN BỘ HỆ THỐNG EDUMATH

## KIẾN TRÚC ĐIỀU HƯỚNG, CHUYỂN CẢNH MÀN HÌNH & TRẠNG THÁI GIAO DIỆN

> **Hệ thống:** EduMath — Mathematics Teaching Workspace  
> **Đối tượng chính:** Giáo viên Toán THCS  
> **Mô hình ứng dụng:** SPA Viewport-First, không yêu cầu đăng nhập/xác thực trong phạm vi hiện tại  
> **Ngôn ngữ mô hình hóa:** Mermaid Flowchart (`flowchart TD`, `flowchart LR`)  
> **Tài liệu tham chiếu:**  
> - `SO_DO_FLOW_HIEN_THI_UI.md` — flow UI hệ thống EduMaster Văn trước khi chuyển đổi  
> - `FLOW_EDUMATH_COMPLETE.md` — flow nghiệp vụ EduMath đã chuẩn hóa  
> **Ngày cập nhật:** 08/10/2026  

---

# 1. MỤC TIÊU TÀI LIỆU

Tài liệu này mô tả **toàn bộ flow hiển thị giao diện của EduMath**, bao gồm:

- màn hình chính;
- module nghiệp vụ;
- overlay/modal/drawer;
- điều hướng xuyên module;
- chế độ hiển thị đặc biệt;
- responsive;
- trạng thái autosave;
- import/export;
- validation UI;
- luồng dữ liệu liên thông giữa bài dạy, KHBD, Slide, Matrix, Question Bank, Exam và Scoring Guide.

Tài liệu không mô hình hóa các chức năng chưa có trong phạm vi hiện tại như:

- đăng nhập;
- đăng ký;
- phân quyền;
- student portal;
- admin approval portal;
- cloud collaboration.

---

# 2. NGUYÊN TẮC UI CỐT LÕI

## 2.1. Viewport-First

EduMath ưu tiên giao diện desktop:

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

Mục tiêu:
- hạn chế scroll toàn body;
- ưu tiên scroll từng panel;
- luôn giữ được navigation + context + primary action.

## 2.2. Một nguồn dữ liệu

Mọi màn hình phải đọc từ cùng `AppState`.

```text
MathLesson
├── Lesson Content
├── KHBD
├── Slides
├── Questions
├── Assessment Plan
├── Matrix / Specification
├── Exam
└── Scoring Guide
```

## 2.3. Progressive Disclosure

Không hiển thị mọi công cụ cùng lúc.

Ví dụ:
- chưa chọn Formula → không hiện Formula Toolbar;
- chưa chọn Graph → không hiện Graph Inspector;
- Activity đóng → không render form chi tiết;
- chưa chọn Question → không hiện metadata editor.

## 2.4. Một Primary Action mỗi màn hình

Ví dụ:

```text
Dashboard       → Tạo bài dạy
Math Workspace  → Thêm nội dung
KHBD            → Thêm hoạt động
Question Bank   → Tạo câu hỏi
Matrix          → Thêm dòng kế hoạch
Exam            → Thêm câu hỏi
Slides          → Thêm slide
Export Center   → Xuất tài liệu
```

---

# 3. KIẾN TRÚC ĐIỀU HƯỚNG UI TỔNG THỂ

```mermaid
flowchart LR
    URL["URL / Deep Link"] --> Router["Router / Initial View Resolver"]
    Storage["LocalStorage"] --> Init["State Init + Schema Migration"]
    Init --> AppState["Central AppState"]
    Router --> AppShell["App Shell"]

    AppShell --> Sidebar["Sidebar"]
    AppShell --> TopBar["TopBar"]
    AppShell --> ActiveView["Active Viewport"]
    AppShell --> Toast["Toast Overlay"]

    AppState --> ActiveView
    AppState --> TopBar
    AppState --> Sidebar
```

### Không có Authentication Layer

Flow truy cập:

```mermaid
flowchart LR
    A["Mở EduMath"] --> B["Đọc LocalStorage"]
    B --> C{"Có dữ liệu?"}
    C -->|Có| D["Validate + Migrate"]
    C -->|Không| E["Initial State"]
    D --> F["Dashboard"]
    E --> F
```

---

# 4. GLOBAL SCREEN FLOW

```mermaid
flowchart TD
    Start(["Mở EduMath"]) --> Init["Load / Restore AppState"]
    Init --> Shell["App Shell"]

    Shell --> Dashboard["1. Dashboard"]
    Shell --> CreateLesson["2. Tạo bài dạy"]
    Shell --> MathWorkspace["3. Math Workspace"]
    Shell --> KHBD["4. KHBD"]
    Shell --> Slides["5. Slides Studio"]
    Shell --> Matrix["6. Matrix & Specification"]
    Shell --> Questions["7. Question Bank"]
    Shell --> Exam["8. Exam Builder"]
    Shell --> Scoring["9. Answer / Scoring Guide"]
    Shell --> Export["10. Export Center"]

    Dashboard --> CreateLesson
    Dashboard --> MathWorkspace
    Dashboard --> KHBD
    Dashboard --> Slides
    Dashboard --> Matrix
    Dashboard --> Questions
    Dashboard --> Exam

    CreateLesson --> MathWorkspace

    MathWorkspace --> KHBD
    MathWorkspace --> Slides
    MathWorkspace --> Questions
    MathWorkspace --> Matrix

    KHBD --> Slides

    Matrix --> Questions
    Questions --> Exam
    Exam --> Matrix
    Exam --> Scoring

    KHBD --> Export
    Slides --> Export
    Matrix --> Export
    Exam --> Export
    Scoring --> Export
```

---

# 5. UI FLOW 01 — APP SHELL

## Cấu trúc

```mermaid
flowchart TD
    AppShell["App Shell"]

    AppShell --> Sidebar["Sidebar 240–248px"]
    AppShell --> Main["Main Area"]
    Main --> TopBar["TopBar 52–56px"]
    Main --> Viewport["Active Module View"]
    AppShell --> Toast["Toast Layer"]
    AppShell --> Modal["Global Modal Layer"]
```

## Desktop

```text
┌───────────────┬─────────────────────────────────────────┐
│ Sidebar       │ TopBar                                  │
│               ├─────────────────────────────────────────┤
│               │ Active View                             │
│               │                                         │
└───────────────┴─────────────────────────────────────────┘
```

## Mobile / Tablet

```text
TopBar
├── Hamburger
└── Context

Drawer Sidebar
+
Backdrop

Main View
```

---

# 6. UI FLOW 02 — TOPBAR

```mermaid
flowchart TD
    Top["TopBar"]

    Top --> Left["Cụm trái"]
    Left --> MobileMenu["Hamburger < 1024px"]
    Left --> Context["Toán · Khối/Lớp · Tên bài"]

    Top --> Right["Cụm phải"]
    Right --> Save["Đã lưu · HH:mm"]
    Right --> Preview["Xem trước"]
    Right --> ExportQuick["Xuất"]
    Right --> More["•••"]

    ExportQuick --> ExportMenu["Menu xuất nhanh"]
    ExportMenu --> KDoc["KHBD Word / Print"]
    ExportMenu --> EPaper["Đề Word / Print"]
    ExportMenu --> PPT["Slide PPTX"]
```

TopBar không chứa:
- profile page;
- login/logout;
- quá nhiều nút export.

---

# 7. UI FLOW 03 — SIDEBAR

```mermaid
flowchart TD
    Side["Sidebar"]

    Side --> Brand["EduMath"]
    Side --> Nav["Main Navigation"]

    Nav --> N1["Bàn làm việc"]
    Nav --> N2["Bài dạy"]
    Nav --> N3["KHBD"]
    Nav --> N4["Slide"]
    Nav --> N5["Ma trận & Đặc tả"]
    Nav --> N6["Câu hỏi"]
    Nav --> N7["Đề kiểm tra"]
    Nav --> N8["Xuất bản"]

    Side --> Divider["Divider"]
    Side --> Identity["Kiên Kim Cương<br/>Giáo viên Toán<br/>THCS Ngũ Lạc · Vĩnh Long"]
```

### Active State

```text
background nhẹ
primary text
border-left 3px
icon cùng màu primary
```

### Mobile

```mermaid
flowchart LR
    Breakpoint{"< 1024px?"}
    Breakpoint -->|Không| Fixed["Sidebar Fixed"]
    Breakpoint -->|Có| Drawer["Sidebar Drawer"]
    Drawer --> Backdrop["Backdrop"]
```

---

# 8. UI FLOW 04 — DASHBOARD

```mermaid
flowchart TD
    Dash["Dashboard"]

    Dash --> Greeting["Header giáo viên"]
    Dash --> Resume["Công việc đang làm"]
    Dash --> Quick["Quick Actions"]
    Dash --> Recent["Bài gần đây"]

    Resume --> Continue["Tiếp tục"]
    Continue --> Workspace["Math Workspace"]

    Quick --> Q1["Tạo bài dạy"]
    Quick --> Q2["Soạn KHBD"]
    Quick --> Q3["Tạo Slide"]
    Quick --> Q4["Tạo đề"]

    Q1 --> Create["Create Lesson"]
    Q2 --> KHBD["KHBD"]
    Q3 --> Slide["Slides"]
    Q4 --> Matrix["Assessment Workspace"]
```

### Resume Card

Hiển thị:
- tên bài;
- khối;
- số tiết;
- % KHBD;
- % Slides;
- % Assessment;
- lần lưu cuối.

---

# 9. UI FLOW 05 — CREATE LESSON

```mermaid
flowchart TD
    Root["Create Lesson"]

    Root --> General["Thông tin chung"]
    General --> Grade["Khối/Lớp"]
    General --> Chapter["Chương"]
    General --> Title["Tên bài"]
    General --> Textbook["Bộ sách"]
    General --> Periods["Số tiết / Thời lượng"]

    Root --> Outcomes["Yêu cầu cần đạt"]
    Root --> Core["Kiến thức trọng tâm"]
    Root --> Types["Dạng bài trọng tâm"]
    Root --> Sources["Tài liệu tham khảo"]
    Root --> Extra["Yêu cầu bổ sung"]

    Root --> Outputs["Chọn output"]
    Outputs --> O1["KHBD"]
    Outputs --> O2["Slides"]
    Outputs --> O3["Question Bank"]
    Outputs --> O4["Exam"]
    Outputs --> O5["Answer / Scoring"]

    Root --> CreateBtn["Tạo bài dạy"]
    CreateBtn --> Validate{"Hợp lệ?"}
    Validate -->|Không| Errors["Inline Validation"]
    Validate -->|Có| Workspace["Math Workspace"]
```

---

# 10. UI FLOW 06 — MATH WORKSPACE

## Layout 3 cột

```text
┌──────────────┬────────────────────────────┬──────────────────┐
│ Outline      │ Math Content               │ Inspector        │
│ 220–240px    │ flexible                   │ 300–340px        │
└──────────────┴────────────────────────────┴──────────────────┘
```

```mermaid
flowchart TD
    Root["Math Workspace"]

    Root --> Outline["Outline"]
    Root --> Canvas["Content Canvas"]
    Root --> Inspector["Inspector"]

    Outline --> Sec1["Mục tiêu"]
    Outline --> Sec2["Khởi động"]
    Outline --> Sec3["Kiến thức"]
    Outline --> Sec4["Luyện tập"]
    Outline --> Sec5["Vận dụng"]
    Outline --> Sec6["Tổng kết"]

    Canvas --> Toolbar["Add Block"]
    Toolbar --> B1["Concept"]
    Toolbar --> B2["Definition"]
    Toolbar --> B3["Theorem"]
    Toolbar --> B4["Formula"]
    Toolbar --> B5["Example"]
    Toolbar --> B6["Solution"]
    Toolbar --> B7["Exercise"]
    Toolbar --> B8["Graph"]
    Toolbar --> B9["Geometry"]
    Toolbar --> B10["Table"]
    Toolbar --> B11["Application"]

    Canvas --> Selected["Selected Block"]
    Selected --> Inspector
```

---

# 11. UI FLOW 07 — FORMULA EDITOR

```mermaid
flowchart TD
    Select["Chọn Formula Block"] --> Open["Mở Formula Inspector"]
    Open --> Input["Input LaTeX / Friendly Input"]
    Open --> Toolbar["Formula Toolbar"]
    Toolbar --> Fraction["a/b"]
    Toolbar --> Root["√"]
    Toolbar --> Power["xⁿ"]
    Toolbar --> Log["log"]
    Toolbar --> Trig["sin/cos"]
    Toolbar --> Sum["Σ"]
    Toolbar --> Integral["∫"]
    Toolbar --> System["System"]
    Toolbar --> Matrix["Matrix"]

    Input --> Preview["Live Preview KaTeX/MathJax"]
    Preview --> Valid{"Render hợp lệ?"}
    Valid -->|Không| Error["Inline Syntax Error"]
    Valid -->|Có| Save["Lưu Formula Block"]
```

---

# 12. UI FLOW 08 — EXAMPLE & SOLUTION

```mermaid
flowchart TD
    Example["Example Block"]

    Example --> Problem["Đề bài"]
    Example --> Analysis["Phân tích"]
    Example --> Method["Phương pháp"]
    Example --> Solution["Lời giải"]
    Example --> Conclusion["Kết luận"]

    Solution --> Steps["Step-by-step Editor"]
    Steps --> S1["Bước 1"]
    Steps --> S2["Bước 2"]
    Steps --> S3["..."]
    Steps --> Final["Kết luận"]

    Example --> Actions["Context Actions"]
    Actions --> ToSlide["Đưa vào Slide"]
    Actions --> Similar["Tạo bài tương tự"]
    Actions --> ToQuestion["Đưa vào Question Bank"]
```

---

# 13. UI FLOW 09 — GRAPH / GEOMETRY / TABLE

```mermaid
flowchart TD
    Block{"Selected visual block"}

    Block --> Graph["Graph"]
    Block --> Geo["Geometry"]
    Block --> Table["Table"]

    Graph --> GInput["Nhập y=f(x) / miền"]
    GInput --> GPreview["Preview"]
    GPreview --> GExport["SVG/PNG"]

    Geo --> GSource["Create / Upload"]
    GSource --> GAnnotate["Label / Annotation"]
    GAnnotate --> GOut["Reusable Figure"]

    Table --> TType["Data / Value / Sign / Variation"]
    TType --> TEdit["Table Editor"]
    TEdit --> TOut["Reusable Table"]
```

---

# 14. UI FLOW 10 — KHBD BUILDER

## Layout

```text
Header
Mode Switcher: Visual Builder | Document View
---------------------------------------------
Objectives
Equipment
Activities Accordion
```

```mermaid
flowchart TD
    Root["KHBD"]

    Root --> Mode["Visual Builder / Document View"]

    Mode -->|Visual| Visual["KHBD Visual Builder"]
    Visual --> Objectives["Mục tiêu"]
    Visual --> Equipment["Thiết bị & Học liệu"]
    Visual --> Activities["Tiến trình"]

    Activities --> A1["Khởi động"]
    Activities --> A2["Hình thành kiến thức"]
    Activities --> A3["Luyện tập"]
    Activities --> A4["Vận dụng"]

    A1 --> Detail["Activity Detail"]
    A2 --> Detail
    A3 --> Detail
    A4 --> Detail

    Detail --> Goal["Mục tiêu"]
    Detail --> Content["Nội dung"]
    Detail --> Product["Sản phẩm"]
    Detail --> Method["Phương pháp / Hình thức"]
    Detail --> Steps["Tổ chức thực hiện"]

    Steps --> Step1["1. Chuyển giao"]
    Steps --> Step2["2. Thực hiện"]
    Steps --> Step3["3. Báo cáo / Thảo luận"]
    Steps --> Step4["4. Kết luận / Nhận định"]

    Detail --> SlideAction["Đưa vào Slide"]

    Mode -->|Document| Doc["Document View A4"]
    Doc --> Print["Print / Word"]
```

---

# 15. UI FLOW 11 — KHBD → SLIDE

```mermaid
flowchart TD
    Activity["Activity Card"] --> Push["Đưa vào Slide"]
    Push --> Analyze{"Loại nội dung"}

    Analyze -->|Khởi động| Hook["Hook Slide"]
    Analyze -->|Khái niệm| Concept["Concept Slide"]
    Analyze -->|Công thức| Formula["Formula Slide"]
    Analyze -->|Ví dụ| Example["Example Slide"]
    Analyze -->|Lời giải| Solution["Solution Slide"]
    Analyze -->|Luyện tập| Exercise["Exercise Slide"]
    Analyze -->|Vận dụng| App["Application Slide"]

    Hook --> Draft["Slide Draft"]
    Concept --> Draft
    Formula --> Draft
    Example --> Draft
    Solution --> Draft
    Exercise --> Draft
    App --> Draft

    Draft --> Slides["Slides Studio"]
```

---

# 16. UI FLOW 12 — SLIDES STUDIO

## Layout

```text
┌──────────────┬────────────────────────────┬─────────────────┐
│ Thumbnails   │ Slide Canvas               │ Slide Inspector │
└──────────────┴────────────────────────────┴─────────────────┘
```

```mermaid
flowchart TD
    Root["Slides Studio"]

    Root --> Thumbs["Thumbnail List"]
    Root --> Canvas["16:9 Canvas"]
    Root --> Inspector["Inspector"]

    Thumbs --> Add["Thêm Slide"]
    Thumbs --> Duplicate["Nhân bản"]
    Thumbs --> Delete["Xóa"]
    Thumbs --> Reorder["Sắp xếp"]

    Canvas --> Types["Slide Types"]
    Types --> Cover["Cover"]
    Types --> Objective["Objective"]
    Types --> Concept["Concept"]
    Types --> Formula["Formula"]
    Types --> Theorem["Theorem"]
    Types --> Example["Example"]
    Types --> Solution["Solution"]
    Types --> Graph["Graph"]
    Types --> Geometry["Geometry"]
    Types --> Exercise["Exercise"]
    Types --> Quiz["Quiz"]
    Types --> Summary["Summary"]

    Root --> Present["Trình chiếu"]
    Present --> Fullscreen["Fullscreen 16:9"]

    Root --> Pptx["Xuất PPTX"]
```

---

# 17. UI FLOW 13 — PRESENTATION MODE

```mermaid
flowchart TD
    Full["Fullscreen Presentation"]

    Full --> Navigation["← / → / Space / Esc"]
    Full --> Current{"Slide type?"}

    Current -->|Normal| Display["Hiển thị nội dung"]
    Current -->|Quiz| Quiz["Quiz UI"]

    Quiz --> Student["Học sinh trả lời bên ngoài hệ thống"]
    Student --> Teacher["Giáo viên chọn đáp án trên màn hình"]
    Teacher --> Evaluate{"Đúng?"}

    Evaluate -->|Đúng| Correct["Feedback xanh"]
    Evaluate -->|Sai| Wrong["Feedback đỏ + đáp án đúng"]
```

---

# 18. UI FLOW 14 — ASSESSMENT WORKSPACE

Assessment không bắt đầu bằng Exam.

Flow chuẩn:

```text
YCCĐ
→ Matrix
→ Specification
→ Question Bank
→ Exam
→ Validation
→ Scoring Guide
```

```mermaid
flowchart LR
    Y["YCCĐ"] --> M["Matrix"]
    M --> S["Specification"]
    S --> Q["Question Bank"]
    Q --> E["Exam Builder"]
    E --> V["Validation"]
    V --> A["Answer / Scoring"]
    V --> M
```

---

# 19. UI FLOW 15 — MATRIX & SPECIFICATION

## Layout đề xuất

```text
Header + Assessment Summary
Tabs: Matrix | Specification
------------------------------------
Main Table
Right Summary / Validation
```

```mermaid
flowchart TD
    Root["Matrix & Specification"]

    Root --> Tabs["Tabs"]
    Tabs --> Matrix["Matrix"]
    Tabs --> Spec["Specification"]

    Matrix --> Topic["Chủ đề / Chương"]
    Matrix --> Unit["Đơn vị kiến thức"]
    Matrix --> Levels["Biết / Hiểu / Vận dụng"]
    Matrix --> Types["MCQ / Đ-S / Short / Essay"]
    Matrix --> Points["Điểm / Tỷ lệ"]

    Spec --> YCCĐ["YCCĐ"]
    Spec --> Map["Map YCCĐ ↔ Level ↔ Type ↔ Question Count"]

    Root --> Summary["Live Summary"]
    Summary --> Count["Số câu"]
    Summary --> Score["Điểm"]
    Summary --> Ratio["Tỷ lệ"]
```

---

# 20. UI FLOW 16 — QUESTION BANK

## Layout Master–Detail

```text
┌─────────────────────┬──────────────────────────────────┐
│ Filters + Questions │ Question Editor                  │
└─────────────────────┴──────────────────────────────────┘
```

```mermaid
flowchart TD
    Root["Question Bank"]

    Root --> Left["Master"]
    Left --> FilterType["Lọc dạng"]
    Left --> FilterLevel["Lọc mức độ"]
    Left --> FilterTopic["Lọc chủ đề"]
    Left --> New["Tạo câu hỏi"]
    Left --> List["Question List"]

    Root --> Right["Detail Editor"]
    Right --> Prompt["Đề bài"]
    Right --> Answer["Đáp án"]
    Right --> Solution["Lời giải"]
    Right --> Meta["Metadata"]

    Meta --> Grade["Khối"]
    Meta --> Topic["Chủ đề"]
    Meta --> Outcome["YCCĐ"]
    Meta --> Level["Mức độ"]
    Meta --> Type["Dạng câu"]
    Meta --> Skill["Kỹ năng"]
    Meta --> Points["Điểm"]
    Meta --> Time["Thời gian"]

    Right --> Push["Đưa vào đề"]
```

---

# 21. UI FLOW 17 — QUESTION EDITOR THEO DẠNG

```mermaid
flowchart TD
    Type{"Question Type"}

    Type --> MC["Multiple Choice"]
    MC --> MCOpt["A / B / C / D + correct option"]

    Type --> TF["True / False"]
    TF --> TFLead["Phần dẫn"]
    TFLead --> TF4["a / b / c / d"]
    TF4 --> Truth["Đúng / Sai từng ý"]

    Type --> Short["Short Answer"]
    Short --> Expected["Expected Answer"]

    Type --> Essay["Essay"]
    Essay --> Steps["Solution Steps + Points"]

    MC --> Save["Save"]
    TF --> Save
    Short --> Save
    Essay --> Save
```

---

# 22. UI FLOW 18 — PUSH QUESTION TO EXAM

```mermaid
flowchart TD
    Q["Question Detail"] --> Push["Đưa vào đề"]
    Push --> Validate{"Metadata đầy đủ?"}

    Validate -->|Không| Missing["Highlight field thiếu"]
    Validate -->|Có| Exam["Add to Exam"]

    Exam --> Recalc["Recalculate"]
    Recalc --> Matrix["Update Matrix"]
    Matrix --> Toast["Toast thành công"]
```

---

# 23. UI FLOW 19 — EXAM BUILDER

## Layout 3 cột

```text
┌──────────────┬────────────────────────────┬──────────────────┐
│ Sections     │ Questions                  │ Statistics       │
│ ~220px       │ flexible                   │ ~280px           │
└──────────────┴────────────────────────────┴──────────────────┘
```

```mermaid
flowchart TD
    Root["Exam Builder"]

    Root --> Left["Sections"]
    Left --> P1["Multiple Choice"]
    Left --> P2["True / False"]
    Left --> P3["Short Answer"]
    Left --> P4["Essay"]

    Root --> Center["Question List / Editor"]
    Center --> Edit["Edit"]
    Center --> Add["Add"]
    Center --> Remove["Remove"]
    Center --> Reorder["Reorder"]

    Root --> Right["Statistics"]
    Right --> TotalQ["Tổng câu"]
    Right --> TotalScore["Tổng điểm"]
    Right --> LevelDist["Biết / Hiểu / Vận dụng"]
    Right --> TypeDist["Phân bố dạng"]
    Right --> Duration["Thời lượng"]

    Root --> Preview["Preview đề"]
    Root --> Guide["Đáp án / Hướng dẫn chấm"]
```

Không hard-code số câu cố định trong UI.

---

# 24. UI FLOW 20 — EXAM VALIDATION

```mermaid
flowchart TD
    Exam["Exam"] --> Validate["Validate"]

    Validate --> Score["Tổng điểm"]
    Validate --> Matrix["Khớp Matrix"]
    Validate --> Meta["Metadata"]
    Validate --> Answer["Có đáp án"]
    Validate --> Solution["Có lời giải khi cần"]

    Score --> Result["Validation Panel"]
    Matrix --> Result
    Meta --> Result
    Answer --> Result
    Solution --> Result

    Result --> Ready{"Ready?"}
    Ready -->|Không| Errors["Danh sách lỗi + link tới câu"]
    Ready -->|Có| Final["Exam Ready"]
```

---

# 25. UI FLOW 21 — ANSWER / SCORING GUIDE

```mermaid
flowchart TD
    Root["Answer / Scoring Guide"]

    Root --> Questions["Questions"]
    Questions --> MC["MCQ → Correct option"]
    Questions --> TF["T/F → 4 truth values"]
    Questions --> Short["Short → Expected answer"]
    Questions --> Essay["Essay → Solution steps"]

    Essay --> Score["Điểm từng bước"]
    Root --> Preview["Teacher Preview"]
    Root --> Export["Word / Print"]
```

Không tạo Rubric độc lập cho Toán nếu cùng dữ liệu đã nằm trong `scoringGuide`.

---

# 26. UI FLOW 22 — EXPORT CENTER

```mermaid
flowchart TD
    Root["Export Center"]

    Root --> Docs["Office / Print"]
    Docs --> KHBD["KHBD → DOCX / Print"]
    Docs --> Slide["Slides → PPTX"]
    Docs --> Exam["Exam → DOCX / Print"]
    Docs --> Matrix["Matrix → DOCX / Print"]
    Docs --> Spec["Specification → DOCX / Print"]
    Docs --> Score["Answer / Scoring → DOCX / Print"]

    Root --> Backup["Backup"]
    Backup --> Download["Download JSON"]
    Backup --> Copy["Copy JSON"]

    Root --> Restore["Restore"]
    Restore --> Input["Paste / Upload JSON"]
    Input --> Parse{"Parse?"}
    Parse -->|Fail| Err["Error UI"]
    Parse -->|OK| Schema{"Schema hợp lệ?"}
    Schema -->|Không| Migrate{"Có migration?"}
    Migrate -->|Không| Reject["Từ chối restore"]
    Migrate -->|Có| Apply["Migrate + Apply"]
    Schema -->|Có| Apply
    Apply --> Dashboard["Về Dashboard"]
```

---

# 27. UI FLOW 23 — AUTOSAVE INDICATOR

```mermaid
flowchart LR
    Edit["Bất kỳ thay đổi"] --> State["Update AppState"]
    State --> Debounce["Debounce"]
    Debounce --> Save["LocalStorage"]
    Save --> Status["TopBar: Đã lưu · HH:mm"]
```

Trạng thái có thể hiển thị:

```text
Đang lưu…
Đã lưu · 13:14
Lỗi lưu
```

Autosave không phụ thuộc Export Center.

---

# 28. UI FLOW 24 — DELETE WITH DEPENDENCY

```mermaid
flowchart TD
    Delete["Xóa entity"] --> Used{"Đang được tham chiếu?"}

    Used -->|Không| Confirm["Confirm Delete"]
    Confirm --> Done["Xóa"]

    Used -->|Có| Modal["Dependency Modal"]
    Modal --> Cancel["Hủy"]
    Modal --> Detach["Xóa khỏi nguồn, giữ snapshot"]
    Modal --> RemoveAll["Xóa toàn bộ liên kết"]

    RemoveAll --> Recalc["Recalculate dependent data"]
```

Dùng cho:
- Question đang nằm trong Exam;
- Formula/Example đang nằm trong Slide;
- Activity đã sinh Slide.

---

# 29. UI FLOW 25 — VALIDATION & ERROR STATES

```mermaid
flowchart TD
    Input["User Input"] --> Validate{"Valid?"}

    Validate -->|Có| Save["Save / Autosave"]
    Validate -->|Không| Error["Inline Error"]

    Error --> Draft["Giữ draft"]
    Error --> Block{"Critical?"}

    Block -->|Không| Continue["Cho tiếp tục chỉnh"]
    Block -->|Có| Disable["Disable Finalize / Export"]
```

Nguyên tắc:
- không xóa dữ liệu người dùng vì validation fail;
- highlight đúng field;
- lỗi export phải nêu lý do rõ ràng.

---

# 30. UI FLOW 26 — DOCUMENT PREVIEW / PRINT

```mermaid
flowchart TD
    Screen["Screen View"] --> Preview["Document Preview"]

    Preview --> Print["Print Trigger"]
    Print --> Hide["Ẩn Sidebar / TopBar / Controls"]
    Hide --> Expand["Expand content"]
    Expand --> Page["A4 Pagination"]

    Page --> Avoid["break-inside: avoid"]
    Page --> Output["Printer / Save PDF"]
```

Áp dụng cho:
- KHBD;
- Exam;
- Matrix;
- Specification;
- Answer/Scoring.

---

# 31. RESPONSIVE DISPLAY FLOW

```mermaid
flowchart TD
    Width{"Viewport"}

    Width -->|>= 1280px| Desktop["Desktop"]
    Width -->|768–1279px| Tablet["Tablet"]
    Width -->|< 768px| Mobile["Mobile"]

    Desktop --> DSide["Fixed Sidebar"]
    Desktop --> DMulti["2–3 Panels"]

    Tablet --> TDrawer["Sidebar Drawer"]
    Tablet --> TInspector["Inspector Drawer"]

    Mobile --> MSingle["Single Main Column"]
    Mobile --> MBottom["Secondary tools → Bottom Sheet"]
```

### Math Workspace responsive

Desktop:

```text
Outline | Content | Inspector
```

Tablet:

```text
Content
+ Outline Drawer
+ Inspector Drawer
```

Mobile:

```text
Content
+ Bottom Sheet tools
```

---

# 32. FOOTER / TEACHER IDENTITY FLOW

Không có Profile Page.

Footer đầy đủ chỉ nên xuất hiện ở:
- Dashboard;
- Export Center;
- Home/Landing nếu có.

Editor chính dùng Sidebar Mini Identity để tiết kiệm chiều cao.

```mermaid
flowchart TD
    Screen{"Loại màn hình"}

    Screen -->|Dashboard / Export| Full["Full Teacher Footer"]
    Screen -->|Workspace / KHBD / Slides / Exam| Mini["Sidebar Mini Identity"]

    Full --> Info["Kiên Kim Cương<br/>Giáo viên Toán<br/>Trường THCS Ngũ Lạc<br/>Vĩnh Long<br/>kienkimcuong@gmail.com"]
    Mini --> Compact["Kiên Kim Cương<br/>THCS Ngũ Lạc · Vĩnh Long"]
```

---

# 33. UI TRANSITION MATRIX

| Màn hình nguồn | Trigger | Đích / trạng thái mới | Ghi chú |
|---|---|---|---|
| Bất kỳ | Chọn Sidebar item | Module tương ứng | SPA, không reload |
| App Start | Có LocalStorage | Dashboard với state cũ | Validate + migrate trước |
| Dashboard | Tiếp tục | Math Workspace | Current Lesson |
| Dashboard | Tạo bài dạy | Create Lesson | Form mới |
| Create Lesson | Tạo bài | Math Workspace | Tạo `MathLesson` |
| Math Workspace | Đưa ví dụ vào Slide | Slides Studio | Tạo Slide Draft |
| Math Workspace | Đưa bài tập vào Question | Question Bank | Tạo Question Draft |
| KHBD | Đưa hoạt động vào Slide | Slides Studio | Map Activity → Slide |
| Matrix | Chọn ô cần câu hỏi | Question Bank | Có thể pre-filter metadata |
| Question Bank | Đưa vào đề | Exam Builder | Validate metadata trước |
| Exam | Chỉnh câu | Exam Editor | Recalculate Matrix |
| Exam | Xem đáp án | Scoring Guide | Cùng Question source |
| Slides | Trình chiếu | Fullscreen | 16:9 |
| Slides | Xuất PPTX | Export Service | Không screenshot toàn UI |
| Export | Restore JSON | Dashboard | Parse → schema → migrate → apply |
| Bất kỳ edit | State change | Autosave | Debounce |
| Document View | In | Print Mode | Ẩn shell |

---

# 34. GLOBAL OVERLAYS

Các overlay được phép xuất hiện xuyên hệ thống:

```text
Toast
Confirm Modal
Dependency Modal
Export Progress
JSON Restore Error
Mobile Sidebar Backdrop
Inspector Drawer
Bottom Sheet
```

Không dùng modal cho thao tác có thể xử lý inline.

---

# 35. ROUTE / MODULE MAP ĐỀ XUẤT

```text
#/dashboard
#/lesson/new
#/workspace
#/khbd
#/slides
#/assessment
#/matrix
#/questions
#/exam
#/scoring
#/export
```

Không có:

```text
#/login
#/profile
#/admin
#/student
```

trong scope hiện tại.

---

# 36. DEMO FLOW UI CHO BAN TỔ CHỨC

```mermaid
flowchart LR
    A["Dashboard"] --> B["Mở bài Toán"]
    B --> C["Math Workspace"]
    C --> D["Công thức + Ví dụ + Lời giải"]
    D --> E["KHBD"]
    E --> F["Slide"]
    D --> G["Matrix"]
    G --> H["Specification"]
    H --> I["Question Bank"]
    I --> J["Exam"]
    J --> K["Answer / Scoring"]
    K --> L["Export"]
```

Đây là flow demo ưu tiên hoàn thiện trước.

---

# 37. CHECKLIST HIỂN THỊ

## App Shell
- [ ] Không body scroll không cần thiết
- [ ] Sidebar cố định desktop
- [ ] Drawer mobile hoạt động
- [ ] TopBar không quá cao
- [ ] Autosave visible

## Dashboard
- [ ] Resume Card rõ
- [ ] Quick Actions ngắn
- [ ] Recent Lessons compact

## Math Workspace
- [ ] 3-panel desktop
- [ ] panel scroll độc lập
- [ ] formula preview
- [ ] block editor
- [ ] inspector contextual

## KHBD
- [ ] phân biệt Activity fields và 4 bước tổ chức
- [ ] Visual / Document Mode
- [ ] push to slide

## Slides
- [ ] thumbnail + canvas + inspector
- [ ] fullscreen
- [ ] quiz teacher-controlled
- [ ] PPTX

## Assessment
- [ ] Matrix-first
- [ ] Specification
- [ ] Question metadata
- [ ] Exam validation
- [ ] Scoring Guide

## Export
- [ ] DOCX
- [ ] PPTX
- [ ] Print/PDF
- [ ] JSON Backup
- [ ] JSON Restore

---

# 38. KẾT LUẬN KIẾN TRÚC UI

EduMath không còn tổ chức giao diện theo logic của EduMaster Văn cũ như:

```text
Literature Reader
→ Genre Analysis
→ Rubric Văn
```

Mà chuyển sang ba trục UI chính:

```text
AUTHORING
Math Workspace
→ KHBD
→ Slides
```

```text
ASSESSMENT
YCCĐ
→ Matrix
→ Specification
→ Question Bank
→ Exam
→ Validation
→ Scoring Guide
```

```text
SYSTEM
AppState
→ Autosave
→ Export
→ Backup
→ Restore
```

Ba trục này liên thông qua cùng `AppState`, giúp UI phản ánh đúng workflow thực tế của giáo viên Toán và giảm việc nhập lại dữ liệu ở nhiều màn hình.

---

*Tài liệu được xây dựng dựa trên flow UI EduMaster Văn hiện có và flow nghiệp vụ EduMath đã chuẩn hóa.*
