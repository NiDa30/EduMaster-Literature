Bạn là Senior QA Engineer + Regression Test Architect + Test Automation Engineer.

NHIỆM VỤ:
Thiết kế và triển khai REGRESSION TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Xác nhận các chức năng đã hoạt động trước đó vẫn tiếp tục hoạt động đúng sau khi sửa code, refactor, thêm tính năng hoặc thay đổi dữ liệu.
- Tập trung vào functional regression, state regression, data regression và cross-module regression.
- Không giới hạn ở UI.
- Không duplicate toàn bộ Functional Testing.
- Phải chạy theo risk-based strategy: thay đổi ở đâu thì xác định khu vực có khả năng bị ảnh hưởng.
- Không update test để che bug.
- Không sửa business logic nếu chưa xác nhận requirement.

==================================================
1. ĐỌC TOÀN BỘ TEST REPORT TRƯỚC
==================================================

Đọc:

docs/testing/01_UNIT_TESTING.md
docs/testing/02_API_TESTING.md
docs/testing/03_DATABASE_TESTING.md
docs/testing/04_FUNCTIONAL_TESTING.md
docs/testing/05_INTERACTION_TESTING.md
docs/testing/06_SMOKE_TESTING.md
docs/testing/07_VISUAL_TESTING.md
docs/testing/08_CONSISTENCY_TESTING.md
docs/testing/09_RESPONSIVE_TESTING.md
docs/testing/10_ACCESSIBILITY_TESTING.md
docs/testing/11_COMPATIBILITY_TESTING.md
docs/testing/12_E2E_TESTING.md
docs/testing/13_REGRESSION_UI_TESTING.md

Đọc thêm:

docs/UI_REFACTOR_REPORT.md
docs/UI_REFERENCE_AUDIT.md

==================================================
2. REGRESSION TESTING LÀ GÌ TRONG PROJECT NÀY
==================================================

Regression Testing phải trả lời:

"Sau khi thay đổi code mới, những chức năng đã từng hoạt động đúng có còn hoạt động đúng không?"

Không chỉ kiểm tra UI.

Phạm vi gồm:

- Unit regression
- Functional regression
- Data regression
- State regression
- Integration regression
- Cross-module regression
- Persistence regression
- Export regression
- Workflow regression

==================================================
3. CHANGE IMPACT ANALYSIS
==================================================

Trước mỗi regression run:

xác định file/component/service vừa thay đổi.

Tạo bảng:

Changed File
→ Directly Affected Module
→ Indirectly Affected Module
→ Risk Level
→ Regression Scope

Ví dụ:

src/theme/tokens.ts
→ UI only
→ Regression UI rộng

src/state/appState.ts
→ toàn bộ state
→ High Risk

src/utils/unicode.ts
→ Reader / Question / KHBD / Export
→ High Risk

src/components/Exam7991View.tsx
→ Exam
→ Matrix / Question / Rubric
→ Medium/High

==================================================
4. RISK CLASSIFICATION
==================================================

LOW:
- isolated cosmetic component;
- text label;
- minor helper.

MEDIUM:
- module-local logic;
- form;
- filter;
- component state.

HIGH:
- AppState;
- persistence;
- autosave;
- shared service;
- export service;
- lesson switching;
- matrix/exam calculation;
- backup/restore.

CRITICAL:
- data migration;
- storage schema;
- destructive changes;
- backup/restore;
- core exam score logic.

==================================================
5. REGRESSION SUITE LAYERS
==================================================

Layer 1:
Unit Regression

Layer 2:
Functional Regression

Layer 3:
Integration Regression

Layer 4:
E2E Regression

Layer 5:
UI Regression

Không cần luôn chạy tất cả layer cho mọi change.

==================================================
6. UNIT REGRESSION
==================================================

Sau thay đổi utility/business logic:

chạy:

npm run test:run

Ưu tiên:
- Unicode
- state
- autosave
- validation
- score
- matrix
- rubric
- mapping
- backup/restore

Nếu Unit fail:
không tiếp tục deep regression trước khi phân tích.

==================================================
7. FUNCTIONAL REGRESSION
==================================================

Các chức năng core phải được kiểm tra lại:

- Create Lesson
- Select Lesson
- Edit Lesson
- Reader
- Highlight
- Note
- KHBD
- Question Bank
- Matrix
- Exam
- Rubric
- Slides
- Export
- Backup
- Restore
- Autosave

Không cần mọi edge case mỗi lần.

==================================================
8. STATE REGRESSION
==================================================

P0.

Kiểm tra:

Lesson A
→ data A

Lesson B
→ data B

Switch A ↔ B

Expected:
- không cross-contamination;
- current lesson đúng;
- unsaved state không ghi nhầm lesson.

==================================================
9. AUTOSAVE REGRESSION
==================================================

Test:

edit
→ autosave
→ reload

Kiểm tra:
- data vẫn còn;
- save không sai lesson;
- repeated edit không mất data;
- debounce vẫn hoạt động.

==================================================
10. LOCALSTORAGE / PERSISTENCE REGRESSION
==================================================

Nếu app dùng LocalStorage:

test:
- save;
- reload;
- existing old state;
- current lesson;
- multi-lesson;
- corrupted data handling.

Nếu storage schema đổi:
bắt buộc test migration/compatibility.

==================================================
11. UNICODE REGRESSION
==================================================

P0 cho project Ngữ văn.

Test xuyên:

- Reader
- KHBD
- Questions
- Exam
- Slides
- Export
- Backup/Restore

Dữ liệu mẫu:

Tây Tiến
Quang Dũng
Người lái đò Sông Đà
Vợ chồng A Phủ
Đất Nước

Không được:
- mất dấu;
- mojibake;
- NFD/NFC inconsistency gây duplicate/search fail.

==================================================
12. LESSON CREATION REGRESSION
==================================================

Test:

Create Lesson
→ current lesson
→ Reader
→ reload

Kiểm tra:
- lesson tồn tại;
- metadata đúng;
- state đúng.

==================================================
13. LESSON SWITCHING REGRESSION
==================================================

Test:

A → B → A

Kiểm tra:
- reader;
- KHBD;
- questions;
- exam;
- slides.

Không được lẫn dữ liệu.

==================================================
14. READER REGRESSION
==================================================

Test:
- text render;
- outline;
- selection;
- highlight;
- note;
- bookmark;
- Reader → Question;
- Reader → Slide;
- Reader → Exam material.

==================================================
15. ANNOTATION REGRESSION
==================================================

Test:
- create highlight;
- save note;
- reload;
- switch lesson;
- return.

Annotations phải:
- còn đúng;
- đúng đoạn;
- đúng lesson.

==================================================
16. GENRE ANALYSIS REGRESSION
==================================================

Test:
- add luận điểm;
- add dẫn chứng;
- edit;
- delete;
- chuyển sang KHBD/Slide/Question nếu feature có.

==================================================
17. KHBD REGRESSION
==================================================

Test:
- edit activity;
- 4 bước;
- switch view;
- reload;
- export.

Không để refactor KHBD làm:
- mất activity;
- sai order;
- Document View stale.

==================================================
18. KHBD → SLIDES REGRESSION
==================================================

Test mapping representative.

Nếu activity mapping logic thay đổi:
chạy toàn bộ mapping unit + one E2E flow.

==================================================
19. QUESTION BANK REGRESSION
==================================================

Test:
- create;
- edit;
- delete;
- filter;
- search;
- save;
- source material;
- question type.

==================================================
20. QUESTION → EXAM REGRESSION
==================================================

P0.

Test:
- add question to exam;
- question đúng;
- section đúng;
- không duplicate;
- score/stats update.

==================================================
21. MATRIX REGRESSION
==================================================

Test:
- edit matrix;
- counts;
- scores;
- levels;
- specification;
- exam match.

==================================================
22. EXAM REGRESSION
==================================================

P0.

Test:
- sections;
- questions;
- reorder;
- total score;
- statistics;
- validation;
- matrix match.

Boundary:
- score thấp;
- đúng target;
- vượt target.

==================================================
23. RUBRIC REGRESSION
==================================================

Test:
- add criterion;
- edit;
- delete;
- total;
- decimal;
- essay mapping;
- export.

==================================================
24. SLIDES REGRESSION
==================================================

Test:
- create;
- edit;
- duplicate;
- delete;
- reorder;
- presentation;
- export.

==================================================
25. EXPORT REGRESSION
==================================================

P0/P1 tùy output.

Test:
- KHBD DOCX;
- Exam DOCX;
- Matrix DOCX;
- Rubric DOCX;
- Slides PPTX;
- JSON.

Kiểm tra:
- file download;
- size > 0;
- correct lesson;
- Unicode filename/content representative.

==================================================
26. BACKUP REGRESSION
==================================================

P0.

Test:
- backup JSON;
- JSON parse;
- state representative đầy đủ.

==================================================
27. RESTORE REGRESSION
==================================================

P0.

Test:
- backup current state;
- restore;
- module data;
- current lesson;
- Unicode.

Nếu restore logic thay đổi:
chạy full persistence regression.

==================================================
28. OLD DATA REGRESSION
==================================================

Nếu có state cũ/schema cũ:

Test:
old state
→ current app

Kiểm tra:
- không crash;
- migrate nếu supported;
- data quan trọng không mất.

==================================================
29. SEARCH REGRESSION
==================================================

Nếu sửa filter/search logic:

test:
- exact;
- partial;
- Unicode;
- empty;
- multiple filters.

==================================================
30. SORT REGRESSION
==================================================

Nếu relevant:
- ASC;
- DESC;
- reset;
- stable order.

==================================================
31. FILTER REGRESSION
==================================================

Test:
- one filter;
- multi-filter;
- clear;
- no result.

==================================================
32. DELETE REGRESSION
==================================================

Representative destructive flows:

Question delete
Slide delete
Lesson delete nếu có

Kiểm tra:
- confirmation;
- persistence;
- related state;
- no ghost item after reload.

==================================================
33. ERROR HANDLING REGRESSION
==================================================

Test representative:

- invalid JSON;
- invalid form;
- export fail nếu mock được;
- malformed storage.

App không được crash.

==================================================
34. EMPTY STATE REGRESSION
==================================================

Kiểm tra:
- no lesson;
- no question;
- no slide;
- no rubric.

Sau refactor data logic,
empty state vẫn phải hoạt động.

==================================================
35. CROSS-MODULE REGRESSION
==================================================

High-value mappings:

Reader
→ Question

Reader
→ Slide

Reader
→ Exam

Genre
→ KHBD

KHBD
→ Slides

Matrix
→ Exam

Exam
→ Rubric

==================================================
36. E2E REGRESSION
==================================================

Sau High Risk change:

chạy core E2E:

Create Lesson
→ Reader

Reader
→ Question
→ Exam

Autosave
→ Reload

Backup
→ Restore

Không nhất thiết chạy toàn bộ E2E suite nếu change isolated.

==================================================
37. SMOKE BEFORE REGRESSION
==================================================

Trước full regression:

chạy Smoke.

Nếu P0 smoke fail:
report blocker.

Không lãng phí full regression khi build cơ bản đã hỏng.

==================================================
38. REGRESSION SELECTION MATRIX
==================================================

Tạo mapping trong report.

Ví dụ:

Change:
Button component

Run:
- Interaction
- UI Regression
- Smoke

Change:
AppState

Run:
- Unit
- Functional
- Persistence
- E2E
- Smoke

Change:
ExportService

Run:
- Unit
- Functional export
- E2E export

==================================================
39. AUTOMATION STRATEGY
==================================================

Reuse existing suites.

Không tạo duplicate regression tests nếu test hiện tại đã phù hợp.

Ví dụ:

Regression suite có thể gọi/tag:

@regression
@p0
@p1

Thay vì copy test.

==================================================
40. TAGGING
==================================================

Nếu framework hỗ trợ:

@smoke
@regression
@p0
@p1

Ví dụ:

test.describe("@regression Exam", ...)

Không bắt buộc nếu architecture hiện tại không dùng tags.

==================================================
41. TEST STRUCTURE
==================================================

Nếu cần dedicated regression suite:

tests/
└── regression/
    ├── state.regression.spec.ts
    ├── lesson.regression.spec.ts
    ├── reader.regression.spec.ts
    ├── khbd.regression.spec.ts
    ├── question.regression.spec.ts
    ├── exam.regression.spec.ts
    ├── export.regression.spec.ts
    ├── persistence.regression.spec.ts
    └── backup-restore.regression.spec.ts

Nhưng ưu tiên reuse existing functional/E2E suites.

==================================================
42. NO TEST DUPLICATION
==================================================

Không copy:

functional/question.spec.ts

thành:

regression/question-copy.spec.ts

chỉ để đổi tên.

Regression strategy nên chọn và chạy lại test có sẵn.

==================================================
43. TEST DATA
==================================================

Dùng fixture ổn định.

Không phụ thuộc dữ liệu người dùng local thật.

Có thể dùng:
- clean state;
- known fixture state;
- backup fixture.

==================================================
44. TEST ISOLATION
==================================================

Mỗi regression test:
- independent;
- reproducible;
- reset state phù hợp;
- không phụ thuộc thứ tự.

==================================================
45. CHANGE-AWARE RUN
==================================================

Nếu có Git:

xem:

git diff
git status
git diff --name-only

Dựa vào changed files để xác định regression scope.

Không cần chạy full suite nếu change rõ ràng low risk.

==================================================
46. FULL REGRESSION TRIGGER
==================================================

Chạy full regression khi:

- release candidate;
- major refactor;
- AppState change;
- persistence change;
- schema migration;
- shared service refactor;
- large merge;
- nhiều module thay đổi.

==================================================
47. PARTIAL REGRESSION TRIGGER
==================================================

Chạy partial khi:

- module-local fix;
- minor UI logic;
- isolated component behavior.

==================================================
48. REGRESSION BUG FORMAT
==================================================

REG-BUG-001

Change:
Affected Feature:
Previous Behavior:
Expected:
Actual:
Regression?:
Severity:
Steps:
Evidence:
Root Cause:
Fix:
Retest:

==================================================
49. SEVERITY
==================================================

Critical:
- data loss;
- app crash;
- backup/restore fail;
- core workflow không hoàn thành.

High:
- autosave;
- lesson switching;
- exam;
- question;
- export core fail.

Medium:
- secondary feature fail.

Low:
- minor functional regression.

==================================================
50. TEST CASE FORMAT
==================================================

Trong:

docs/testing/14_REGRESSION_TESTING.md

Mỗi case:

ID:
Feature:
Previous Known-Good Behavior:
Change Trigger:
Risk:
Precondition:
Steps:
Expected:
Actual:
Status:
Automated:
Source Test:
Evidence:

==================================================
51. REPORT
==================================================

Cập nhật:

docs/testing/14_REGRESSION_TESTING.md

Bao gồm:

# Regression Testing Report

## 1. Objective
## 2. Change Set
## 3. Impact Analysis
## 4. Risk Classification
## 5. Regression Scope
## 6. Existing Tests Reused
## 7. New Regression Tests
## 8. Unit Regression
## 9. Functional Regression
## 10. State/Persistence Regression
## 11. Cross-Module Regression
## 12. E2E Regression
## 13. Results
## 14. Regression Bugs
## 15. Fixes
## 16. Retest Results
## 17. Remaining Risks
## 18. Release Recommendation

==================================================
52. EXECUTION ORDER
==================================================

Khuyến nghị:

1. npm run build
2. Unit
3. Smoke
4. Selected Functional Regression
5. Selected E2E Regression
6. UI Regression nếu relevant

Không bắt buộc đúng command nếu package.json khác.

==================================================
53. SAMPLE COMMAND FLOW
==================================================

Ví dụ:

npm run test:run

npx playwright test tests/smoke

npx playwright test tests/functional

npx playwright test tests/e2e

npx playwright test tests/regression-ui

Chỉ chạy suite relevant theo impact.

==================================================
54. RETEST
==================================================

Sau khi fix regression:

1. chạy failing test;
2. chạy related module;
3. chạy upstream/downstream flows;
4. smoke;
5. nếu shared component/service → mở rộng regression.

==================================================
55. RELEASE DECISION
==================================================

PASS:
- tất cả P0 regression pass;
- không Critical;
- High đã fix/accepted.

FAIL:
- core regression còn mở.

BLOCKED:
- environment/test data không cho phép xác minh.

==================================================
56. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

Changed files:
N

Affected modules:
N

Regression cases executed:
N

Existing tests reused:
N

New tests:
N

Passed:
N

Failed:
N

Blocked:
N

Regression bugs:
N

Critical:
N

High:
N

Medium:
N

Low:
N

Fixed:
N

Release status:
READY / NOT READY / BLOCKED

QUAN TRỌNG:

Regression Testing không phải:

"chạy lại mọi test một cách mù quáng."

Mà phải là:

CHANGE
→ IMPACT ANALYSIS
→ RISK
→ SELECT RELEVANT TESTS
→ EXECUTE
→ IDENTIFY REGRESSION
→ FIX
→ RETEST
→ RELEASE DECISION

Mục tiêu cuối cùng:

"Tính năng mới hoặc bug fix mới không được làm hỏng những thứ đã hoạt động đúng trước đó."