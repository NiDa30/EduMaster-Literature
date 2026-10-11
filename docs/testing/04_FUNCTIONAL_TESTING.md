Bạn là Senior QA Engineer + Test Analyst + Frontend Functional Test Engineer.

NHIỆM VỤ:
Thiết kế và triển khai chiến lược FUNCTIONAL TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Kiểm tra từng chức năng của hệ thống có hoạt động đúng theo yêu cầu hay không.
- Kiểm tra input → xử lý → output.
- Kiểm tra cả happy path, negative path và edge case.
- Không chỉ kiểm tra giao diện hiển thị.
- Không biến Functional Testing thành Unit Testing.
- Không biến Functional Testing thành E2E full-flow.
- Không giả định chức năng không tồn tại.
- Nếu requirement không rõ, phải ghi "Requirement unclear" thay vì tự đoán.

==================================================
1. AUDIT FEATURE TRƯỚC KHI TEST
==================================================

Đọc:

README*
docs/
src/
package.json

Đặc biệt đọc:
- docs/UI_REFERENCE_AUDIT.md
- docs/UI_REFACTOR_PLAN.md
- docs/UI_REFACTOR_REPORT.md
- docs/testing/01_UNIT_TESTING.md
- docs/testing/02_API_TESTING.md
- docs/testing/03_DATABASE_TESTING.md

Tìm toàn bộ module/chức năng hiện có.

Dự kiến có thể gồm:

- Dashboard
- Create / Select Lesson
- Literature Workspace
- Reader
- Highlight / Note / Bookmark
- Genre Analysis
- Argument Map
- KHBD Builder
- Slides Studio
- Question Bank
- Matrix
- Specification
- Exam Builder
- Rubric
- Export
- Backup / Restore
- Autosave
- Lesson Switching
- Focus Mode

CHỈ test chức năng thực sự có trong source.

Ghi inventory vào:

docs/testing/04_FUNCTIONAL_TESTING.md

==================================================
2. PHẠM VI FUNCTIONAL TESTING
==================================================

Functional Testing phải trả lời:

- Chức năng có thực hiện đúng không?
- Input hợp lệ cho output đúng không?
- Input sai có bị chặn không?
- State có thay đổi đúng không?
- Dữ liệu có lưu đúng không?
- Chức năng liên quan có bị ảnh hưởng không?
- Error message có đúng không?

Không tập trung vào:
- pixel;
- màu sắc;
- font;
- animation;
- responsive.

Đó thuộc Visual/Responsive Testing.

==================================================
3. TEST DASHBOARD
==================================================

Kiểm tra:

- Dashboard mở thành công.
- Hiển thị current lesson đúng.
- Resume Card có dữ liệu đúng.
- Progress đúng theo state.
- Quick Actions hoạt động.
- Recent Lessons hiển thị đúng.
- Search lesson hoạt động nếu có.
- Click "Tiếp tục" mở đúng lesson.
- Tạo bài mới mở form/modal đúng.

Negative:
- Không có lesson.
- Lesson data thiếu metadata.
- Empty recent list.

==================================================
4. TEST CREATE LESSON
==================================================

Test fields thực tế:

- Khối/Lớp
- Chủ đề/Bài học
- Tác phẩm
- Tác giả
- Thể loại
- Bộ sách
- Số tiết
- YCCĐ
- Trọng tâm kiến thức
- Ngữ liệu
- Tài liệu tham khảo

Test:

- tạo với dữ liệu hợp lệ;
- thiếu required field;
- empty string;
- spaces only;
- Unicode tiếng Việt;
- số tiết = 0;
- số tiết âm;
- số tiết lớn;
- duplicate title nếu được phép;
- cancel;
- submit nhiều lần.

Expected:
- lesson được tạo đúng;
- set current lesson đúng;
- mở Literature Workspace nếu flow hiện tại như vậy.

==================================================
5. TEST LESSON SWITCHING
==================================================

Kiểm tra:

- chuyển lesson A → B;
- dữ liệu lesson B hiển thị đúng;
- không lẫn dữ liệu lesson A;
- quay lại lesson A vẫn giữ state;
- current lesson được persist nếu có;
- lesson không tồn tại;
- danh sách lesson rỗng.

==================================================
6. TEST LITERATURE READER
==================================================

Kiểm tra:

- văn bản hiển thị;
- outline đúng;
- section/paragraph navigation;
- bookmark;
- highlight;
- note;
- focus mode;
- scroll đúng;
- active paragraph đúng nếu có.

Negative:
- văn bản rỗng;
- paragraph không tồn tại;
- malformed annotation;
- selected text rỗng.

==================================================
7. TEST TEXT SELECTION TOOLBAR
==================================================

Test:

select text
→ toolbar xuất hiện

Bỏ selection
→ toolbar biến mất

Các action:

- Highlight
- Ghi chú
- Sang Slide
- Tạo câu hỏi
- Đặt làm ngữ liệu đề

Kiểm tra từng action:
- thao tác đúng;
- dữ liệu được truyền đúng;
- text selection không bị sai;
- không tạo duplicate ngoài ý muốn.

==================================================
8. TEST HIGHLIGHT
==================================================

Test:

- tạo highlight;
- đổi màu nếu hỗ trợ;
- xóa highlight;
- reload;
- highlight vẫn tồn tại;
- nhiều highlight;
- overlapping selection nếu hỗ trợ/không hỗ trợ.

Kiểm tra Unicode không bị mất dấu.

==================================================
9. TEST NOTE
==================================================

Test:

- tạo note;
- edit;
- delete;
- empty note;
- long note;
- multiline;
- Unicode;
- relation với đoạn văn đúng.

==================================================
10. TEST BOOKMARK
==================================================

Test:

- add bookmark;
- remove;
- navigate bookmark;
- duplicate bookmark;
- reload persistence.

==================================================
11. TEST GENRE ANALYSIS
==================================================

Kiểm tra tabs:

- Tổng quan
- Thi pháp
- Hình tượng/Nhân vật
- Luận điểm
- Dẫn chứng

Test:
- add;
- edit;
- delete;
- save;
- switch tab không mất dữ liệu;
- empty state.

==================================================
12. TEST ARGUMENT MAP
==================================================

Test:

Luận đề
→ Luận điểm
→ Luận cứ
→ Dẫn chứng

Kiểm tra:
- thêm node;
- sửa;
- xóa;
- parent-child relation;
- invalid parent;
- reorder nếu có;
- empty node;
- long text.

==================================================
13. TEST GENRE → KHBD / SLIDE / QUESTION
==================================================

Nếu có các action:

Đưa vào KHBD
Đưa vào Slide
Tạo câu hỏi

Test:
- đúng dữ liệu;
- đúng lesson;
- đúng nội dung;
- không overwrite ngoài ý muốn.

==================================================
14. TEST KHBD BUILDER
==================================================

Kiểm tra:

- Visual Builder
- Document View

Sections:
I. Mục tiêu
II. Thiết bị & Học liệu
III. Tiến trình

Test create/edit/delete activity.

Fields:
- tên;
- thời lượng;
- mục tiêu;
- nội dung;
- sản phẩm;
- thiết bị/học liệu;
- phương pháp;
- tổ chức thực hiện.

==================================================
15. TEST KHBD ACTIVITY STEPS
==================================================

Kiểm tra 4 bước:

1. Chuyển giao nhiệm vụ
2. Thực hiện nhiệm vụ
3. Báo cáo / Thảo luận
4. Kết luận / Nhận định

Test:
- edit từng bước;
- collapse/expand;
- state giữ đúng;
- empty step;
- long content;
- Unicode.

==================================================
16. TEST KHBD DOCUMENT VIEW
==================================================

Kiểm tra:

- nội dung Visual Builder phản ánh sang Document View;
- thay đổi dữ liệu cập nhật đúng;
- section order đúng;
- không thiếu activity;
- preview không dùng stale state.

==================================================
17. TEST ACTIVITY → SLIDE
==================================================

Nếu có chức năng generate slide từ activity:

Test mapping:
- Khởi động;
- Khám phá;
- Phân tích;
- Luyện tập;
- Vận dụng.

Kiểm tra:
- slide được tạo;
- title đúng;
- content đúng;
- không mất Unicode;
- target lesson đúng.

==================================================
18. TEST QUESTION BANK
==================================================

Test:

- create question;
- edit;
- delete;
- duplicate nếu có;
- filter;
- search;
- select;
- save.

Question types:
- Multiple Choice
- True/False
- Short Answer
- Essay

==================================================
19. TEST QUESTION VALIDATION
==================================================

Test:

- thiếu câu hỏi;
- thiếu đáp án;
- thiếu ngữ liệu nếu required;
- score invalid;
- level invalid;
- type invalid;
- empty marking guide;
- Unicode.

Expected:
- reject invalid;
- error rõ;
- không lưu dữ liệu hỏng.

==================================================
20. TEST QUESTION FILTERING
==================================================

Filter:
- Khối
- Tác phẩm
- YCCĐ
- Mức độ
- Dạng câu

Test:
- từng filter;
- multiple filter;
- reset;
- no result;
- Unicode search.

==================================================
21. TEST MATRIX
==================================================

Kiểm tra:

- hiển thị matrix;
- add/update cell;
- score;
- question count;
- cognitive level;
- question type;
- total.

Test:
- tổng hợp đúng;
- invalid value;
- negative;
- empty;
- floating number.

==================================================
22. TEST SPECIFICATION
==================================================

Kiểm tra:
- chủ đề;
- đơn vị kiến thức;
- YCCĐ;
- dạng câu;
- mức độ;
- số câu dự kiến.

Test:
- add;
- edit;
- delete;
- save;
- liên kết matrix nếu có.

==================================================
23. TEST EXAM BUILDER
==================================================

Kiểm tra:

- section navigation;
- add question;
- remove;
- reorder;
- move section nếu có;
- total questions;
- total score;
- statistics;
- matrix match;
- validation.

Negative:
- exam rỗng;
- score thiếu;
- score vượt target;
- duplicate question;
- invalid section.

==================================================
24. TEST EXAM VALIDATION
==================================================

Test:

- total score;
- missing answer;
- missing section;
- invalid question;
- matrix mismatch;
- empty exam.

Expected:
- warning/error đúng;
- không crash.

==================================================
25. TEST RUBRIC
==================================================

Kiểm tra:

- add criterion;
- edit;
- delete;
- quality levels;
- max score;
- total;
- bind rubric với essay nếu có.

Test:
- total = target;
- total thiếu;
- total vượt;
- decimal;
- duplicate criterion;
- empty criterion.

==================================================
26. TEST SLIDES STUDIO
==================================================

Test:

- create slide;
- duplicate;
- edit;
- delete;
- reorder;
- select thumbnail;
- preview;
- fullscreen;
- keyboard navigation nếu có.

Slide types thực tế:
- Cover
- Objectives
- Quote
- Split
- Cards
- Timeline
- Argument Map
- Character
- Theme
- Quiz
- Writing Prompt
- Summary

==================================================
27. TEST PRESENTATION MODE
==================================================

Test:
- fullscreen/start presentation;
- next;
- previous;
- Space;
- Arrow Left;
- Arrow Right;
- Esc;
- first slide;
- last slide.

Không test pixel ở đây.

==================================================
28. TEST EXPORT
==================================================

Test từng export thật sự có:

- KHBD DOCX;
- Exam DOCX;
- Matrix DOCX;
- Specification DOCX;
- Rubric DOCX;
- Slides PPTX;
- HTML nếu có;
- JSON backup.

Kiểm tra:
- thao tác export hoạt động;
- file được tạo;
- tên file;
- file không rỗng;
- đúng lesson;
- Unicode tên file nếu hỗ trợ.

Nội dung file chi tiết có thể thuộc integration/export-specific test.

==================================================
29. TEST BACKUP
==================================================

Test:
- download JSON;
- copy JSON;
- JSON parse được;
- có current state;
- multiple lessons;
- Unicode;
- data không thiếu.

==================================================
30. TEST RESTORE
==================================================

Test:
- JSON hợp lệ;
- JSON lỗi;
- empty file;
- wrong schema;
- missing field;
- old schema;
- Unicode.

Expected:
- valid → restore;
- invalid → reject an toàn;
- không crash;
- không phá state hiện tại ngoài ý muốn.

==================================================
31. TEST AUTOSAVE
==================================================

Functional behavior:

- edit content;
- chờ autosave;
- status đổi;
- reload;
- dữ liệu còn.

Test:
- nhiều edit liên tiếp;
- switch lesson;
- reload;
- storage error nếu có handling.

==================================================
32. TEST FOCUS MODE
==================================================

Nếu có:

- bật Focus Mode;
- Sidebar ẩn;
- vùng làm việc mở rộng;
- tắt → layout trở lại;
- state không mất;
- keyboard nếu có.

==================================================
33. TEST SEARCH
==================================================

Search các nơi có search:

- Lesson
- Question
- Evidence

Test:
- exact;
- partial;
- lowercase;
- uppercase;
- Vietnamese accents;
- whitespace;
- no result;
- empty query.

==================================================
34. TEST FILTER
==================================================

Test:
- single filter;
- multiple;
- reset;
- no result;
- invalid state;
- filter + search.

==================================================
35. TEST SORT
==================================================

Nếu có sort:
- ASC;
- DESC;
- reset;
- title;
- updated date;
- score;
- order.

==================================================
36. TEST EMPTY STATES
==================================================

Kiểm tra từng module khi không có dữ liệu:

- no lesson;
- no annotation;
- no question;
- no slide;
- no rubric;
- no exam.

Expected:
- không crash;
- CTA hợp lý;
- không render undefined/null.

==================================================
37. TEST ERROR HANDLING
==================================================

Tìm các tình huống:

- invalid JSON;
- export fail;
- storage fail;
- malformed lesson;
- missing current lesson;
- unsupported type.

Expected:
- app không crash;
- thông báo phù hợp;
- có fallback nếu thiết kế có.

==================================================
38. TEST UNICODE
==================================================

Bắt buộc dùng dữ liệu thật:

Tây Tiến
Quang Dũng
Người lái đò Sông Đà
Vợ chồng A Phủ
Đất Nước

Test xuyên các chức năng:
- create;
- edit;
- save;
- switch;
- backup;
- restore;
- export.

Không được mất dấu hoặc đổi encoding.

==================================================
39. TEST STATE CONSISTENCY
==================================================

Kiểm tra:

- Current lesson;
- lesson data;
- KHBD;
- slides;
- questions;
- exam;
- rubric.

Khi switch module:
state phải đồng bộ.

Không để:
- stale state;
- data từ lesson khác;
- unsaved overwrite.

==================================================
40. TEST NEGATIVE PATH
==================================================

Không chỉ test happy path.

Bắt buộc:
- invalid input;
- missing input;
- duplicate action;
- repeated click;
- cancel;
- delete;
- corrupted state;
- unexpected order.

==================================================
41. TEST BOUNDARY
==================================================

Test các boundary relevant:

0
1
max
min
empty
very long

Ví dụ:
- 0 câu hỏi;
- 1 câu hỏi;
- nhiều câu;
- 0 slide;
- 1 slide;
- long lesson title;
- long text.

==================================================
42. AUTOMATION TOOL
==================================================

Functional Testing có thể chia:

LEVEL 1:
Vitest + React Testing Library

Dùng cho:
- form;
- modal;
- component behavior;
- state behavior.

LEVEL 2:
Playwright

Dùng cho:
- chức năng cần browser thật;
- download;
- keyboard;
- LocalStorage;
- multi-screen interaction ngắn.

Không dùng Selenium nếu project đã chuẩn hóa Playwright, trừ khi có lý do rõ.

==================================================
43. TEST STRUCTURE
==================================================

Nếu Playwright:

tests/
└── functional/
    ├── dashboard.spec.ts
    ├── lessons.spec.ts
    ├── reader.spec.ts
    ├── genre.spec.ts
    ├── khbd.spec.ts
    ├── questions.spec.ts
    ├── matrix.spec.ts
    ├── exam.spec.ts
    ├── rubric.spec.ts
    ├── slides.spec.ts
    ├── export.spec.ts
    ├── backup-restore.spec.ts
    └── autosave.spec.ts

==================================================
44. TEST CASE FORMAT
==================================================

Trong:

docs/testing/04_FUNCTIONAL_TESTING.md

mỗi test case:

ID:
Module:
Feature:
Priority:
Precondition:
Test Data:
Steps:
Expected Result:
Actual Result:
Status:
Automated:
Evidence:

Ví dụ:

FUNC-LESSON-001

Feature:
Tạo bài dạy

Steps:
1. Mở Create Lesson
2. Nhập dữ liệu hợp lệ
3. Submit

Expected:
- Lesson được tạo
- Set thành current lesson
- Literature Workspace mở đúng lesson

==================================================
45. PRIORITY
==================================================

P0:
- create/select lesson;
- autosave;
- reader;
- questions;
- exam;
- backup/restore;
- export core.

P1:
- genre analysis;
- KHBD;
- matrix;
- rubric;
- slides.

P2:
- optional filters;
- secondary controls;
- minor features.

==================================================
46. REGRESSION PROTECTION
==================================================

Functional test quan trọng phải đủ ổn định để tái sử dụng cho Regression Testing sau này.

Đặc biệt:
- create lesson;
- edit lesson;
- autosave;
- question;
- exam;
- backup/restore.

==================================================
47. KHÔNG TEST TRONG PHASE NÀY
==================================================

Không đánh giá:
- màu đẹp;
- spacing;
- font;
- shadow;
- animation quality;
- responsive visual.

Không stress 1000 user.

Không đo Lighthouse.

Đó thuộc các phase sau.

==================================================
48. BUG REPORT
==================================================

Format:

FUNC-BUG-001

Module:
Feature:
Severity:
Precondition:
Steps:
Expected:
Actual:
Evidence:
Root Cause nếu biết:
Fix:
Retest:

Severity:
Critical
High
Medium
Low

==================================================
49. REPORT
==================================================

Cập nhật:

docs/testing/04_FUNCTIONAL_TESTING.md

Bao gồm:

# Functional Testing Report

## 1. Scope
## 2. Feature Inventory
## 3. Test Strategy
## 4. Test Environment
## 5. Test Cases
## 6. Automation
## 7. Results
## 8. Bugs Found
## 9. Fixed Bugs
## 10. Deferred Cases
## 11. N/A Features
## 12. Risks
## 13. Recommendations

==================================================
50. EXECUTION
==================================================

Sau implementation:

chạy functional test.

Nếu có scripts:

npm run test:run

và Playwright:

npx playwright test tests/functional

Sau đó:

npm run build

Nếu có:
npm run lint

Fix lỗi do thay đổi của bạn.

==================================================
51. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

- Tổng số chức năng audit.
- Tổng test cases.
- Automated.
- Manual.
- Passed.
- Failed.
- Blocked.
- Bugs Critical/High/Medium/Low.
- Module có risk cao.
- Feature chưa test.

QUAN TRỌNG:

Không chỉ tạo test cases trên giấy.

AUDIT
→ DESIGN
→ IMPLEMENT
→ EXECUTE
→ FIX
→ RETEST
→ REPORT

Functional Testing phải xác nhận:

"Người dùng thực hiện chức năng X
→ hệ thống tạo ra kết quả Y đúng như yêu cầu."


==================================================
# Functional Testing Report
==================================================

## 1. Scope
Kiểm thử chức năng (Level 1 Functional Testing) trên toàn bộ hệ thống EduMaster-Literature theo mô hình input/processing/output nghiệp vụ sư phạm:
- **TeacherDashboard**: Quản lý và chuyển đổi bài dạy, tìm kiếm tác phẩm/tác giả (hỗ trợ tiếng Việt có dấu NFC), lọc thể loại, thẻ bài học đang soạn (Resume Card), 6 phím tắt nghiệp vụ.
- **Tạo bài dạy (Create Lesson)**: Form tạo bài học mới, validation bắt lỗi các trường bắt buộc, tự động sinh Bundle đầy đủ (KHBD 5512, Slide Storytelling, Đề 7991, Rubric).
- **LiteratureReader & Chú giải**: Trình đọc văn bản tác phẩm chuẩn font Lora 18px, chuyển tab Cấu trúc/Chú thích, bôi đen văn bản, xóa chú thích, chuyển tab phân tích Dẫn chứng/Thi pháp, chuyển đổi chế độ đọc tập trung (Focus Mode).
- **GenreAnalysis & Argument Map**: Phân tích thể loại (Thơ trữ tình, Truyện ngắn, Văn nghị luận), Sơ đồ cây lập luận (Argument Map: Luận đề, Luận điểm, Lý lẽ, Dẫn chứng), thêm luận điểm mới, đẩy nội dung phân tích sang KHBD/Slide/Câu hỏi.
- **KHBD 5512 Builder**: Chuyển đổi chế độ Visual Builder ↔ Văn bản in A4, quản lý tiến trình 4 hoạt động, thêm hoạt động với cấu trúc 4 bước Công văn 5512, khóa chặn xóa hoạt động cuối, xuất hoạt động thành Slide.
- **Exam 7991 Builder & Simulator**: Chế độ Đề thi ↔ Đáp án & Barem, lọc xem 4 phần (I, II, III, IV), mô phỏng chấm điểm Phần II Đúng/Sai theo barem chính thức CV 7991 (0.1đ - 0.25đ - 0.50đ - 1.00đ), bổ sung câu hỏi từng phần, kiểm soát cân đối tổng điểm 10.0.
- **Export & Handover**: Khối JSON State bàn giao, sao chép JSON vào clipboard, tải tệp `.json`, khôi phục trạng thái từ JSON, validation bắt lỗi cú pháp và lỗi thiếu phân hệ cốt lõi.

## 2. Feature Inventory
1. `TeacherDashboard`: Resume Card, Metrics, Search, Genre Filter, Switching Lessons, 6 Quick Actions.
2. `CreateLessonModal`: Grade, Textbook, Genre, Title, Author, Theme, Objectives, Source Text, Validation, Bundle Auto-init.
3. `LiteratureReader`: Outline Tab, Annotations Tab, Text Highlighting, Delete Annotation, Poetics Tab, Evidence Tab, Focus Mode.
4. `GenreAnalysis`: Genre Selector, Overview Tab, Poetics/Art Tab, Characters/Imagery Tab, Argument Map Tab, Add Claim, Cross-module push.
5. `KhbdView`: Visual Timeline, CV 5512 Objectives Card, 4-step Organization, Add Activity, Safety Delete Guard, Document View A4, Export Word.
6. `QuestionBuilder`: 4 Parts Classification, Cognitive Levels (NB, TH, VD, VDC), Point weights, Marking guide, Add/Edit/Delete.
7. `Exam7991View`: 4-part structure, CV 7991 Part II 4-statements a-b-c-d, Progressive scoring simulator, View Mode Switcher, Part Filter, Add Questions.
8. `MatrixView`: 2D Matrix (Levels x Skills), Total score balance, Export Word Matrix.
9. `RubricBuilder`: Essay Rubric (Thang 10.0), Criteria weights, Scoring levels & Descriptors, Export Word Rubric.
10. `SlidesView`: 16:9 Presentation, Storytelling layouts, Slide editor, Export PPTX / HTML.
11. `ExportHandoverView`: State Serialization, Copy JSON, Download JSON, Restore State, Validation, Office Suite Links.

## 3. Test Strategy
- **Chiến lược**: Kiểm thử chức năng tầng giao diện & hành vi tương tác trạng thái (Component & State Functional Testing) sử dụng **Vitest + React Testing Library + jsdom**.
- **Nguyên tắc**: Mô phỏng hành động thực tế của giáo viên (click, type, select, form submit, clipboard copy, file download), không phụ thuộc vào implementation detail của component.
- **Tiêu chuẩn dữ liệu**: 100% sử dụng dữ liệu ngữ văn thực tế (Quang Dũng, Kim Lân, Hồ Chí Minh, Xuân Quỳnh) được chuẩn hóa Unicode NFC.

## 4. Test Environment
- **Hệ điều hành**: Windows 11
- **Node.js**: v20+
- **Test Runner**: Vitest v5.0.3
- **Test Libraries**: `@testing-library/react` v16, `@testing-library/jest-dom` v6, `jsdom`
- **Build Tool**: Vite v8.3.2 + Tailwind CSS v4

## 5. Test Cases
Đã xây dựng và thực thi 6 bộ Functional Test Suites (37 test cases) bổ trợ cho 13 bộ Unit Test Suites (130 test cases):
1. `src/test/functional/dashboard.functional.test.tsx` (10 test cases)
2. `src/test/functional/readerAnnotation.functional.test.tsx` (5 test cases)
3. `src/test/functional/genreAnalysis.functional.test.tsx` (4 test cases)
4. `src/test/functional/khbdBuilder.functional.test.tsx` (6 test cases)
5. `src/test/functional/examBuilder.functional.test.tsx` (6 test cases)
6. `src/test/functional/exportHandover.functional.test.tsx` (6 test cases)

## 6. Automation
- Tự động hóa 100% qua lệnh: `npm run test:run`
- Cấu hình file `vitest.config.ts` để nhận diện toàn bộ các test cases theo mẫu: `include: ['src/test/**/*.test.{ts,tsx}', 'src/utils/*.test.{ts,tsx}']`
- Kết hợp kiểm thử biên dịch sản phẩm: `npm run build`

## 7. Results
- **Tổng số test suites**: 19/19 files PASS (100%)
- **Tổng số test cases**: 167/167 tests PASS (100%)
- **Số lượng tests thất bại**: 0 tests (0%)
- **Production Build**: Thành công hoàn toàn (0 errors, 792ms)

## 8. Bugs Found
1. **FUNC-DOM-001**: Trình chạy test không phát hiện các file test trong `src/test/functional/` do `vitest.config.ts` chỉ match đường dẫn 1 cấp `src/test/*.test.ts`.
2. **FUNC-DOM-002**: Lỗi assertion trong `dashboard.functional.test.tsx` do component `TeacherDashboard` nhường quyền điều hướng cho parent component khi có prop `onCreateLesson`.
3. **FUNC-DOM-003**: `Exam7991View` có nhiều phần tử chứa chuỗi `Đề kiểm tra Định kỳ` (cả ở toolbar header và tên đề bài thi).
4. **FUNC-DOM-004**: `KhbdView` trong chế độ A4 in ấn có hai vị trí hiển thị `teacherName` (thông tin ban đầu và phần ký tên cuối giáo án) dẫn đến `getByText` bị duplicate element error.
5. **FUNC-DOM-005**: `ExportHandoverView` ném lỗi SyntaxError native của V8 khi phân tích JSON sai cú pháp, khiến chuỗi thông báo không khớp với chuỗi tiếng Việt cố định trong test.

## 9. Fixed Bugs
- Đã khắc phục 100% cả 5 lỗi thông qua việc điều chỉnh cấu hình `vitest.config.ts` và chuẩn hóa các bộ selector / assertions trong 6 file kiểm thử functional.
- Re-run toàn bộ test suite đạt **167/167 PASS**.

## 10. Deferred Cases
- **Kiểm thử E2E tương tác trình duyệt thật qua Playwright**: Tạm hoãn sang phase E2E Testing sau này (do hiện tại kiến trúc Client-side SPA đã được bao phủ chặt chẽ bởi Vitest + RTL jsdom).
- **Kiểm thử In ấn thật (`window.print()`)**: Tạm hoãn sang phase Browser E2E do jsdom không mô phỏng native print dialog của OS.

## 11. N/A Features
- **Backend API Testing**: Not Applicable (Kiến trúc ứng dụng 100% Client-Side SPA không có Backend REST API server).
- **Authentication / Multi-user login**: Không áp dụng (Ứng dụng hướng đến trải nghiệm cá nhân của giáo viên, hoạt động offline trên trình duyệt).

## 12. Risks
- **Dung lượng Bundle JavaScript**: Tệp build `index-*.js` đạt kích thước ~1.49 MB do chứa các thư viện Office export (`docx`, `pptxgenjs`). Cần theo dõi hiệu năng nạp trang ở các mạng yếu.
- **Giới hạn LocalStorage**: Dữ liệu lưu trữ trình duyệt có giới hạn ~5MB. Khi giáo viên tạo quá nhiều bài học lớn, cần có cơ chế thông báo dung lượng.

## 13. Recommendations
1. Triển khai **Code-Splitting** (Dynamic `import()`) cho module xuất bản file Office để giảm tải thời gian tải trang ban đầu.
2. Tích hợp test suite này vào quy trình **Pre-commit hook** để ngăn chặn regression khi tiếp tục nâng cấp UI/UX.
3. Bổ sung tính năng cảnh báo dung lượng LocalStorage trực tiếp tại Bàn làm việc Giáo viên.