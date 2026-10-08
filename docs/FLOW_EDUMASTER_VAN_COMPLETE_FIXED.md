# EDUMASTER VĂN — TÀI LIỆU FLOW NGHIỆP VỤ TOÀN HỆ THỐNG

> **Hệ thống:** EduMaster Văn — Literature Teaching Workspace  
> **Đối tượng chính:** Giáo viên Ngữ văn THPT  
> **Phạm vi:** Truy cập thẳng, không yêu cầu đăng nhập/xác thực  
> **Nguyên tắc:** Một nguồn dữ liệu xuyên Reader, KHBD, Slides, Questions, Matrix, Exam và Rubric

---

# 1. ACTOR

## Giáo viên Ngữ văn
Actor phần mềm chính:
- chọn/tạo bài dạy;
- đọc/chú giải văn bản;
- phân tích thể loại/thi pháp;
- xây KHBD;
- tạo slide;
- xây ma trận/bản đặc tả;
- tạo câu hỏi;
- ráp đề;
- xây rubric/hướng dẫn chấm;
- export.

## Học sinh
Trong scope hiện tại chưa phải software actor trực tiếp.
- xem slide trên lớp;
- trả lời quiz ngoài hệ thống;
- làm đề được giáo viên xuất.

## Tổ trưởng/BGH
External stakeholder:
```text
Giáo viên
→ Export hồ sơ
→ Gửi file
→ Tổ trưởng/BGH thẩm định bên ngoài hệ thống
```

## System Engine
- AppState;
- autosave;
- restore;
- validation;
- export;
- schema migration.

---

# 2. FLOW TỔNG THỂ

```mermaid
flowchart LR
    T["👤 Giáo viên Ngữ văn"]

    subgraph S["EDUMASTER VĂN — LITERATURE TEACHING WORKSPACE"]
        A["Mở ứng dụng"]
        B["Dashboard"]
        C["Chọn / Tạo bài dạy"]
        D["Literature Workspace"]
        E["Genre Analysis"]
        F["KHBD"]
        G["Slides"]
        H["Matrix & Specification"]
        I["Question Bank"]
        J["Exam Builder"]
        K["Rubric / Marking Guide"]
        L["Export Center"]
    end

    T --> A --> B --> C --> D
    D --> E
    D --> F
    D --> G
    D --> I
    D --> J
    E --> F
    E --> G
    F --> G
    H --> I
    I --> J
    J --> H
    J --> K
    F --> L
    G --> L
    H --> L
    J --> L
    K --> L
```

---

# 3. STARTUP

```mermaid
sequenceDiagram
    actor T as Giáo viên
    participant App as EduMaster Văn
    participant Storage as LocalStorage
    participant State as AppState
    participant Dash as Dashboard

    T->>App: Truy cập URL
    App->>Storage: Đọc dữ liệu
    alt Có dữ liệu
        Storage-->>App: saved state
        App->>State: Validate + migrate
    else Không có dữ liệu
        App->>State: Initial state
    end
    App->>Dash: Render Dashboard
```

Không có:
- Login
- Register
- Token
- Session

---

# 4. DASHBOARD

```mermaid
flowchart TD
    A["Dashboard"] --> B{"Giáo viên muốn làm gì?"}
    B -->|Tiếp tục| C["Current Lesson"]
    B -->|Tạo bài mới| D["Create Lesson"]
    B -->|Mở bài gần đây| E["Recent Lesson"]
    B -->|Phân tích văn bản| F["Literature Workspace"]
    B -->|Soạn KHBD| G["KHBD"]
    B -->|Tạo câu hỏi| H["Question Bank"]
    B -->|Tạo đề| I["Assessment Workspace"]

    C --> F
    D --> F
    E --> F
```

---

# 5. CREATE LESSON

Input:
```text
Khối/Lớp
Chủ đề/Bài học
Tên tác phẩm
Tác giả
Thể loại
Bộ sách
Số tiết
YCCĐ
Trọng tâm kiến thức
Ngữ liệu
Tài liệu tham khảo
```

Output:
```text
LiteratureLesson
├── metadata
├── sourceText
├── annotations
├── genreAnalysis
├── argumentMap
├── khbd
├── slides
├── questions
├── assessmentPlan
├── exam
└── rubric
```

---

# 6. LITERATURE WORKSPACE

```mermaid
flowchart TD
    A["Literature Workspace"] --> B["Outline"]
    A --> C["Reader"]
    A --> D["Insight Panel"]

    C --> E["Chọn đoạn văn"]
    E --> F["Floating Toolbar"]

    F --> G["Highlight"]
    F --> H["Ghi chú"]
    F --> I["Đưa vào Slide"]
    F --> J["Tạo câu hỏi"]
    F --> K["Đặt làm ngữ liệu đề"]

    D --> L["Thi pháp"]
    D --> M["Hình tượng"]
    D --> N["Dẫn chứng"]
```

---

# 7. GENRE ANALYSIS

```mermaid
flowchart TD
    A["Genre Analysis"] --> B{"Thể loại"}
    B --> C["Thơ"]
    B --> D["Truyện"]
    B --> E["Nghị luận"]

    C --> F["Hình ảnh / Nhịp / Tu từ"]
    D --> G["Nhân vật / Tình huống / Điểm nhìn"]
    E --> H["Luận đề / Luận điểm / Luận cứ"]

    F --> I["Argument / Evidence Map"]
    G --> I
    H --> I

    I --> J["Đưa vào KHBD"]
    I --> K["Đưa vào Slide"]
    I --> L["Tạo câu hỏi"]
```

---

# 8. KHBD

```text
Activity
├── Tên hoạt động
├── Thời lượng
├── Mục tiêu
├── Nội dung
├── Sản phẩm
├── Thiết bị/Học liệu
├── Phương pháp/Hình thức
└── Tổ chức thực hiện
    ├── 1. Chuyển giao nhiệm vụ
    ├── 2. Thực hiện nhiệm vụ
    ├── 3. Báo cáo/Thảo luận
    └── 4. Kết luận/Nhận định
```

```mermaid
flowchart TD
    A["KHBD"] --> B["Mục tiêu"]
    B --> C["Thiết bị/Học liệu"]
    C --> D["Tiến trình"]
    D --> E["Khởi động"]
    D --> F["Khám phá / Hình thành kiến thức"]
    D --> G["Luyện tập"]
    D --> H["Vận dụng"]
    E --> I["Activity Editor"]
    F --> I
    G --> I
    H --> I
    I --> J["Document View"]
    J --> K["Word / Print"]
```

---

# 9. KHBD → SLIDE

```mermaid
flowchart TD
    A["Activity"] --> B["Đưa vào Slide"]
    B --> C{"Loại nội dung"}
    C -->|Khởi động| D["Hook/Question Slide"]
    C -->|Trích dẫn| E["Quote Slide"]
    C -->|Phân tích| F["Split/Cards Slide"]
    C -->|Luận điểm| G["Argument Map Slide"]
    C -->|Luyện tập| H["Quiz Slide"]
    C -->|Vận dụng| I["Writing Prompt Slide"]
```

---

# 10. SLIDES

```mermaid
flowchart TD
    A["Slides Studio"] --> B["Thumbnail"]
    A --> C["16:9 Canvas"]
    A --> D["Inspector"]

    C --> E["Quote"]
    C --> F["Split"]
    C --> G["Cards"]
    C --> H["Argument Map"]
    C --> I["Quiz"]
    C --> J["Summary"]

    A --> K["Fullscreen"]
    A --> L["PPTX Export"]
```

---

# 11. ASSESSMENT — MATRIX FIRST

```mermaid
flowchart TD
    A["YCCĐ"] --> B["Ma trận"]
    B --> C["Bản đặc tả"]
    C --> D["Xác định ô cần câu hỏi"]
    D --> E["Question Bank"]
    E --> F["Chọn / tạo câu"]
    F --> G["Exam"]
    G --> H["Recalculate Matrix"]
    H --> I{"Khớp?"}
    I -->|Không| D
    I -->|Có| J["Rubric / Marking Guide"]
```

---

# 12. QUESTION BANK

```mermaid
flowchart TD
    A["Question Bank"] --> B["Ngữ liệu"]
    B --> C["Chọn dạng"]
    C --> D["Multiple Choice"]
    C --> E["True/False"]
    C --> F["Short Answer"]
    C --> G["Essay"]

    D --> H["Câu hỏi + Đáp án"]
    E --> H
    F --> H
    G --> H

    H --> I["Hướng dẫn chấm"]
    I --> J["Metadata"]
    J --> K["YCCĐ / Mức độ / Điểm"]
```

---

# 13. EXAM

```mermaid
flowchart TD
    A["Exam Builder"] --> B["Load câu hỏi"]
    B --> C["Phân nhóm theo dạng"]
    C --> D["Tính tổng điểm"]
    D --> E["Validate"]
    E --> F{"Đạt?"}
    F -->|Không| G["Hiển thị lỗi/chênh lệch"]
    F -->|Có| H["Preview đề"]
    H --> I["Marking Guide"]
```

Không hard-code số câu nếu nguồn yêu cầu không bắt buộc.

---

# 14. RUBRIC

```mermaid
flowchart TD
    A["Câu tự luận / bài viết"] --> B["Rubric"]
    B --> C["Tiêu chí"]
    C --> D["Trọng số/điểm"]
    D --> E["Mức chất lượng"]
    E --> F["Tổng điểm"]
    F --> G["Marking Guide"]
```

---

# 15. EXPORT

```mermaid
flowchart TD
    A["Export Center"] --> B{"Tài liệu"}
    B --> C["KHBD"]
    B --> D["Slides"]
    B --> E["Exam"]
    B --> F["Matrix"]
    B --> G["Specification"]
    B --> H["Rubric/Marking Guide"]
    B --> I["JSON Backup"]

    C --> J["DOCX / Print"]
    D --> K["PPTX"]
    E --> J
    F --> J
    G --> J
    H --> J
    I --> L["JSON"]
```

---

# 16. AUTOSAVE

```mermaid
sequenceDiagram
    participant View as Active View
    participant State as AppState
    participant Timer as Debounce
    participant Storage as LocalStorage
    participant Top as Save Indicator

    View->>State: Update
    State->>Timer: Restart
    Timer->>Storage: Persist
    Storage-->>Top: Đã lưu · HH:mm
```

---

# 17. RESTORE JSON

```mermaid
flowchart TD
    A["Chọn/Dán JSON"] --> B["Parse"]
    B --> C{"Hợp lệ?"}
    C -->|Không| D["Báo lỗi"]
    C -->|Có| E["Validate Schema"]
    E --> F{"Đúng version?"}
    F -->|Không| G["Migrate"]
    F -->|Có| H["Apply"]
    G --> H
    H --> I["Persist"]
    I --> J["Refresh UI"]
```

---

# 18. END-TO-END

```mermaid
flowchart TD
    A["Mở EduMaster Văn"] --> B["Dashboard"]
    B --> C["Chọn/Tạo bài"]
    C --> D["Literature Workspace"]
    D --> E["Highlight / Note / Evidence"]
    E --> F["Genre Analysis"]
    F --> G["KHBD"]
    G --> H["Slides"]

    E --> I["YCCĐ"]
    I --> J["Matrix"]
    J --> K["Specification"]
    K --> L["Question Bank"]
    L --> M["Exam"]
    M --> N["Rubric / Marking Guide"]

    G --> O["Export"]
    H --> O
    J --> O
    K --> O
    M --> O
    N --> O
```

---

# 19. NGUYÊN TẮC TRIỂN KHAI

1. Giáo viên Ngữ văn là actor chính.
2. Không có authentication trong scope hiện tại.
3. Học sinh chưa phải app user.
4. BGH/Tổ trưởng là external stakeholder.
5. Literature Workspace là trung tâm nội dung.
6. Genre Analysis hỗ trợ KHBD, Slide, Question.
7. Matrix/Specification đứng trước Question/Exam khi thiết kế đánh giá.
8. Exam cập nhật ngược Matrix để validate.
9. Rubric dùng cho tự luận/bài viết.
10. Autosave độc lập Export.
11. Backup độc lập LocalStorage.
12. Dữ liệu dùng chung qua AppState.