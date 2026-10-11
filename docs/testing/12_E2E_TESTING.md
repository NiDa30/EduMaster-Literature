Bạn là Senior QA Automation Engineer + E2E Test Architect + Frontend/Workflow Test Engineer.

NHIỆM VỤ:
Thiết kế và triển khai END-TO-END TESTING (E2E) cho project EduMaster-Literature.

MỤC TIÊU:
- Kiểm tra các flow nghiệp vụ hoàn chỉnh từ đầu đến cuối.
- Xác nhận nhiều module phối hợp đúng với nhau.
- Kiểm tra dữ liệu đi xuyên qua nhiều màn hình mà không bị mất/sai.
- Mô phỏng hành vi người dùng thực trong browser thật.
- Không biến E2E thành hàng trăm test chi tiết nhỏ.
- Không duplicate toàn bộ Unit/Functional/Interaction test.
- Chỉ chọn các flow nghiệp vụ quan trọng, có giá trị cao và dễ phát hiện regression.

==================================================
1. ĐỌC PROJECT VÀ CÁC REPORT TRƯỚC
==================================================

Đọc:

README*
package.json
vite.config.*
src/
docs/

Đọc các report:

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

Đọc thêm:

docs/UI_REFERENCE_AUDIT.md
docs/UI_REFACTOR_REPORT.md

==================================================
2. XÁC ĐỊNH BUSINESS FLOWS THẬT
==================================================

Audit source để xác nhận flow thực tế.

Core flow dự kiến:

FLOW A:
Dashboard
→ Chọn/Tạo bài dạy
→ Literature Workspace
→ Genre Analysis
→ KHBD
→ Slides

FLOW B:
YCCĐ
→ Matrix
→ Specification
→ Question Bank
→ Exam
→ Validation
→ Rubric

FLOW C:
Edit
→ Autosave
→ Reload
→ Backup JSON
→ Restore JSON

CHỈ dùng những module/flow thực sự tồn tại.

==================================================
3. TOOL
==================================================

Ưu tiên:

Playwright

Lý do:
- browser thật;
- auto-wait;
- multi-page flow;
- download;
- upload;
- localStorage;
- screenshot/trace;
- keyboard;
- file chooser.

Nếu project đã dùng Playwright:
tận dụng config hiện tại.

Không thêm Selenium song song nếu không cần.

==================================================
4. E2E KHÁC FUNCTIONAL TEST NHƯ THẾ NÀO
==================================================

Functional:
test từng chức năng riêng.

E2E:
test flow xuyên nhiều module.

Ví dụ:

Functional:
"Tạo câu hỏi hoạt động."

E2E:
"Chọn ngữ liệu từ Reader
→ tạo câu hỏi
→ câu hỏi xuất hiện trong Question Bank
→ thêm vào Exam
→ điểm/validation cập nhật."

==================================================
5. E2E TEST DATA
==================================================

Dùng fixture ổn định.

Ví dụ:

Tác phẩm:
Tây Tiến

Tác giả:
Quang Dũng

Lớp:
12

Yêu cầu:
- dữ liệu đủ để đi xuyên flow;
- không quá lớn;
- không phụ thuộc production state;
- Unicode chuẩn.

Tạo:

tests/e2e/fixtures/

==================================================
6. E2E ENVIRONMENT
==================================================

Mỗi run phải biết initial state.

Có thể chọn:

A. clean state
B. seeded state
C. restore fixture JSON

Ưu tiên cách nhanh và deterministic.

Nếu localStorage:
có thể inject state trước khi page load.

Nếu backend:
seed test DB.

==================================================
7. FLOW E2E-01 — CREATE LESSON TO READER
==================================================

Scenario:

Dashboard
→ Tạo bài dạy mới
→ nhập dữ liệu
→ submit
→ lesson trở thành current lesson
→ mở Literature Workspace

Kiểm tra:
- title;
- author;
- class;
- text;
- current lesson;
- Reader render.

Không chỉ assert URL;
phải kiểm dữ liệu đúng.

==================================================
8. FLOW E2E-02 — READER TO QUESTION BANK
==================================================

Scenario:

Mở lesson
→ Literature Reader
→ chọn đoạn văn
→ Floating Toolbar
→ Tạo câu hỏi
→ Question Builder

Kiểm tra:
- selected text được truyền đúng;
- question source/ngữ liệu đúng;
- editor mở;
- save được;
- question xuất hiện trong list.

==================================================
9. FLOW E2E-03 — QUESTION BANK TO EXAM
==================================================

Scenario:

Question Bank
→ chọn/tạo question
→ đưa vào Exam
→ mở Exam Builder

Kiểm tra:
- question đúng;
- không duplicate;
- section đúng;
- score/statistics cập nhật nếu relevant.

==================================================
10. FLOW E2E-04 — MATRIX TO EXAM
==================================================

Scenario:

Matrix
→ cấu hình nhu cầu
→ Specification
→ Question Bank
→ Exam
→ Validation

Kiểm tra:
- matrix data được sử dụng;
- specification liên kết đúng;
- exam statistics phản ánh dữ liệu;
- mismatch warning nếu có.

Không hard-code requirement không tồn tại.

==================================================
11. FLOW E2E-05 — READER TO GENRE TO KHBD
==================================================

Scenario:

Reader
→ Genre Analysis
→ thêm luận điểm/dẫn chứng
→ Đưa vào KHBD
→ mở KHBD

Kiểm tra:
- nội dung đúng lesson;
- luận điểm/dẫn chứng được truyền;
- KHBD có dữ liệu;
- không overwrite nội dung khác ngoài ý muốn.

==================================================
12. FLOW E2E-06 — KHBD TO SLIDES
==================================================

Scenario:

KHBD
→ edit activity
→ tạo/chuyển activity thành slide
→ mở Slides Studio

Kiểm tra:
- slide được tạo;
- title/content đúng;
- slide nằm đúng lesson;
- thumbnail xuất hiện.

==================================================
13. FLOW E2E-07 — READER TO SLIDE
==================================================

Scenario:

Reader
→ chọn trích đoạn
→ Sang Slide
→ Slides Studio

Kiểm tra:
- quote được giữ nguyên;
- Unicode không lỗi;
- slide type đúng nếu logic có mapping;
- không mất dấu xuống dòng quan trọng.

==================================================
14. FLOW E2E-08 — READER TO EXAM MATERIAL
==================================================

Scenario:

Reader
→ chọn đoạn
→ Đặt làm ngữ liệu đề
→ Exam Builder

Kiểm tra:
- selected text đúng;
- exam material đúng;
- current lesson đúng.

==================================================
15. FLOW E2E-09 — CREATE EXAM TO RUBRIC
==================================================

Scenario:

Question Bank
→ build exam
→ thêm essay
→ tạo/gắn rubric
→ Rubric Builder

Kiểm tra:
- rubric đúng câu tự luận;
- score cập nhật;
- total hợp lệ;
- data không bị mất khi chuyển module.

==================================================
16. FLOW E2E-10 — FULL TEACHING WORKFLOW
==================================================

High-value flow:

Dashboard
→ Create Lesson
→ Reader
→ Genre Analysis
→ KHBD
→ Slides
→ Export

Đây là một flow dài nhưng giá trị cao.

Không cần đi sâu mọi field.

Kiểm tra checkpoints quan trọng.

==================================================
17. FLOW E2E-11 — FULL ASSESSMENT WORKFLOW
==================================================

Scenario:

Lesson
→ YCCĐ
→ Matrix
→ Specification
→ Question Bank
→ Exam
→ Validation
→ Rubric
→ Export

Kiểm tra:
- dữ liệu nối xuyên;
- không stale state;
- không lẫn lesson;
- total/validation hợp lý.

==================================================
18. FLOW E2E-12 — AUTOSAVE AND RELOAD
==================================================

Scenario:

Mở lesson
→ edit dữ liệu
→ chờ autosave
→ reload browser
→ quay lại module

Expected:
dữ liệu vẫn còn.

Test representative data:
- lesson metadata;
hoặc
- KHBD/question.

==================================================
19. FLOW E2E-13 — LESSON SWITCHING
==================================================

Scenario:

Lesson A
→ edit data
→ switch Lesson B
→ edit
→ switch lại A

Kiểm tra:
- A giữ data A;
- B giữ data B;
- không cross-contamination;
- current lesson đúng.

==================================================
20. FLOW E2E-14 — BACKUP / CLEAR / RESTORE
==================================================

P0.

Scenario:

Seed/create state
→ Backup JSON
→ lưu file
→ clear/reset state nếu có cách an toàn
→ Restore JSON
→ mở lại modules

Kiểm tra:
- lesson;
- KHBD;
- questions;
- exam;
- rubric;
- slides;
- annotations;
- current lesson.

Không cần assert mọi field nếu state rất lớn,
nhưng kiểm representative critical fields.

==================================================
21. FLOW E2E-15 — EXPORT DOCUMENT
==================================================

Scenario:

Chuẩn bị lesson
→ Export Center
→ export KHBD/Exam/PPTX hoặc file trọng yếu

Kiểm tra:
- download xảy ra;
- extension đúng;
- file > 0 bytes;
- filename hợp lý.

Nếu có thể:
inspect basic file validity,
nhưng không cần full document parsing ở E2E.

==================================================
22. FLOW E2E-16 — DELETE WITH CONFIRMATION
==================================================

Scenario representative:

Create Question
→ Delete
→ Confirm
→ question biến mất

Sau reload:
question vẫn không quay lại.

Có thể dùng lesson/slide nếu delete question không phù hợp.

==================================================
23. FLOW E2E-17 — CANCEL PROTECTION
==================================================

Scenario:

Open create/edit modal
→ nhập data
→ Cancel

Expected:
- không tạo/save ngoài ý muốn;
- previous state không đổi.

==================================================
24. FLOW E2E-18 — INVALID DATA RECOVERY
==================================================

Scenario:

Restore invalid JSON
hoặc submit invalid form
→ error
→ sửa data
→ thao tác lại

Expected:
- app không crash;
- user có thể tiếp tục làm việc.

==================================================
25. CROSS-MODULE STATE CONSISTENCY
==================================================

P0.

Ở mọi flow:
assert current lesson identity.

Ví dụ:
data tạo trong Tây Tiến
không xuất hiện trong Vợ chồng A Phủ.

==================================================
26. AUTOSAVE TIMING
==================================================

Không dùng sleep dài.

Ưu tiên:
- chờ status "Đã lưu";
- hoặc poll localStorage;
- hoặc waitForFunction.

Không:

await page.waitForTimeout(5000)

nếu có thể tránh.

==================================================
27. DOWNLOAD TEST
==================================================

Dùng:

const downloadPromise =
  page.waitForEvent("download");

await trigger.click();

const download =
  await downloadPromise;

Kiểm tra:
suggestedFilename()
file path/size.

==================================================
28. FILE UPLOAD TEST
==================================================

Restore JSON:

dùng:

setInputFiles()

hoặc file chooser.

Không thao tác OS dialog thủ công.

==================================================
29. LOCALSTORAGE ASSERTION
==================================================

Nếu app client-side:

có thể kiểm:

page.evaluate(() =>
  localStorage.getItem(...)
)

Nhưng:
đừng assert internal state quá nhiều nếu UI outcome đủ.

E2E ưu tiên observable behavior.

==================================================
30. PAGE OBJECT MODEL
==================================================

Với suite E2E dài:
dùng Page Object Model vừa phải.

Ví dụ:

tests/e2e/pages/
  DashboardPage.ts
  ReaderPage.ts
  KhbdPage.ts
  QuestionBankPage.ts
  ExamPage.ts
  SlidesPage.ts
  ExportPage.ts

Không tạo abstraction quá phức tạp.

==================================================
31. SHARED HELPERS
==================================================

Tạo:

tests/e2e/helpers/

Ví dụ:
- seedState()
- clearState()
- createLesson()
- waitForAutosave()
- openModule()
- restoreFixture()

==================================================
32. SELECTOR STRATEGY
==================================================

Ưu tiên:

getByRole
getByLabel
getByText

Sau đó:
data-testid

Không dùng:
CSS nth-child brittle.

E2E phải sống được sau minor UI refactor.

==================================================
33. DATA-TESTID POLICY
==================================================

Chỉ thêm data-testid cho:
- component khó locate;
- stable domain element;
- complex editor.

Ví dụ:
data-testid="literature-reader"
data-testid="question-editor"
data-testid="exam-statistics"

Không thêm testid vào mọi div.

==================================================
34. E2E TEST STRUCTURE
==================================================

Tạo:

tests/
└── e2e/
    ├── lesson-to-reader.spec.ts
    ├── reader-to-question.spec.ts
    ├── question-to-exam.spec.ts
    ├── genre-to-khbd.spec.ts
    ├── khbd-to-slides.spec.ts
    ├── assessment-workflow.spec.ts
    ├── teaching-workflow.spec.ts
    ├── autosave-reload.spec.ts
    ├── lesson-switching.spec.ts
    ├── backup-restore.spec.ts
    ├── export.spec.ts
    ├── error-recovery.spec.ts
    ├── pages/
    ├── fixtures/
    └── helpers/

==================================================
35. TEST ISOLATION
==================================================

Mỗi E2E test phải có state rõ.

Không phụ thuộc test order.

Không:
test B cần test A tạo dữ liệu trước.

Nếu flow dài cần seed:
seed trong beforeEach/fixture.

==================================================
36. PARALLELIZATION
==================================================

Nếu tests share localStorage/browser context:
mỗi test/context phải isolated.

Nếu backend test DB shared:
cẩn thận khi parallel.

Không bật full parallel nếu gây conflict data.

==================================================
37. RETRIES
==================================================

Local:
0 retries.

CI:
tối đa 1 retry nếu cần.

Nếu test flaky:
fix root cause.

Không dùng retry=3 để che instability.

==================================================
38. TRACE
==================================================

Cấu hình:

trace: "retain-on-failure"

Screenshot:
"only-on-failure"

Video:
optional retain-on-failure.

E2E failure phải dễ debug.

==================================================
39. TEST TIMEOUT
==================================================

Flow dài có thể cần timeout lớn hơn smoke.

Nhưng không dùng arbitrary 2–5 phút cho mọi test.

Tối ưu:
- seed nhanh;
- auto-wait;
- không sleep.

==================================================
40. BROWSER MATRIX
==================================================

Primary E2E:
Chromium.

Sau khi suite ổn:
một số P0 E2E có thể chạy Firefox/WebKit.

Cross-browser coverage sâu thuộc Compatibility Testing.

==================================================
41. PRIORITY
==================================================

P0 E2E:

- Create Lesson → Reader
- Reader → Question
- Question → Exam
- Autosave → Reload
- Lesson Switching
- Backup → Restore
- Export core

P1:
- Genre → KHBD
- KHBD → Slides
- Matrix → Exam
- Exam → Rubric

P2:
- secondary workflows.

==================================================
42. KHÔNG TEST TẤT CẢ COMBINATION
==================================================

Không viết E2E cho:

4 question types
×
3 levels
×
10 lessons
×
5 browsers

Đó là combinatorial explosion.

Phân phối coverage:

Unit/Functional test chi tiết.
E2E test representative critical paths.

==================================================
43. CHECKPOINT ASSERTIONS
==================================================

Flow dài phải assert ở các checkpoint.

Ví dụ:

Create lesson
→ assert title

Reader
→ assert lesson title

Create question
→ assert question

Exam
→ assert question present

Nếu chỉ assert cuối flow:
khó debug.

==================================================
44. NEGATIVE E2E
==================================================

Chỉ chọn vài negative flow giá trị cao:

- invalid restore;
- invalid create lesson;
- export failure nếu có mock;
- delete cancel.

Không cần đưa mọi invalid field vào E2E.

==================================================
45. ERROR LOGGING
==================================================

Capture:

pageerror
console.error

Một E2E có thể visually pass nhưng console fatal error.

Log vào report nếu relevant.

==================================================
46. PERFORMANCE KHÔNG THUỘC E2E
==================================================

Không đặt threshold performance sâu ở E2E.

Có thể report flow quá chậm rõ ràng,
nhưng Performance Testing ở #16.

==================================================
47. VISUAL KHÔNG THUỘC E2E
==================================================

Không assert:
pixel
exact color
shadow

Chỉ assert:
visible
enabled
text/data
workflow result.

==================================================
48. ACCESSIBILITY KHÔNG DUPLICATE
==================================================

Có thể dùng semantic selectors,
nhưng không rerun full axe suite trong mọi E2E.

Accessibility đã có phase riêng.

==================================================
49. E2E CASE FORMAT
==================================================

Cập nhật:

docs/testing/12_E2E_TESTING.md

Mỗi case:

ID:
Business Flow:
Priority:
Initial State:
Test Data:
Steps:
Checkpoints:
Expected Final State:
Persistence:
Automated:
Result:
Evidence:

Ví dụ:

E2E-002

Flow:
Reader → Question Bank

Steps:
1. Open Tây Tiến
2. Select text
3. Click Tạo câu hỏi
4. Enter question
5. Save

Expected:
Question xuất hiện trong Question Bank của Tây Tiến.

==================================================
50. BUG FORMAT
==================================================

E2E-BUG-001

Flow:
Failed Step:
Precondition:
Steps:
Expected:
Actual:
Severity:
Console:
Trace:
Screenshot:
Root Cause:
Fix:
Retest:

==================================================
51. SEVERITY
==================================================

Critical:
- data loss;
- backup/restore fail;
- app crash;
- cannot complete core workflow.

High:
- Reader→Question fail;
- Question→Exam fail;
- Autosave/reload fail;
- lesson data contamination.

Medium:
- secondary workflow fails.

Low:
- minor flow inconvenience.

==================================================
52. REPORT
==================================================

Cập nhật:

docs/testing/12_E2E_TESTING.md

Bao gồm:

# End-to-End Testing Report

## 1. Objective
## 2. Environment
## 3. Business Flows
## 4. Test Data
## 5. Test Architecture
## 6. Automated Scenarios
## 7. Teaching Workflow
## 8. Assessment Workflow
## 9. Persistence Workflow
## 10. Export Workflow
## 11. Results
## 12. Bugs
## 13. Flaky Tests
## 14. Fixes
## 15. Untested Flows
## 16. Risks
## 17. Recommendations

==================================================
53. EXECUTION
==================================================

Chạy:

npx playwright test tests/e2e --project=chromium

Sau khi ổn:

có thể chạy selected P0 trên:
Firefox
WebKit

Sau đó:

npm run build

Nếu có:
npm run lint
npm run test:run

==================================================
54. RETEST SAU FIX
==================================================

Sau bug fix:

1. chạy test case fail;
2. chạy flow liên quan;
3. chạy smoke suite;
4. nếu shared state/component thay đổi, chạy regression liên quan.

==================================================
55. ACCEPTANCE CRITERIA
==================================================

E2E PASS khi:

- tất cả P0 core flows pass;
- không data loss;
- không cross-lesson contamination;
- autosave/reload hoạt động;
- backup/restore hoạt động;
- teaching workflow hoàn thành;
- assessment workflow chính hoàn thành;
- export core hoạt động;
- không Critical bug còn mở.

==================================================
56. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

Business flows:
N

Automated E2E:
N

Passed:
N

Failed:
N

Blocked:
N

Critical:
N

High:
N

Medium:
N

Flaky:
N

Core teaching workflow:
PASS/FAIL

Core assessment workflow:
PASS/FAIL

Persistence workflow:
PASS/FAIL

Backup/Restore:
PASS/FAIL

Export:
PASS/FAIL

Overall E2E:
PASS / FAIL / BLOCKED

QUAN TRỌNG:

E2E Testing phải trả lời:

"Một giáo viên bắt đầu một công việc thực tế trong EduMaster Văn và đi qua nhiều phân hệ thì có hoàn thành được mục tiêu cuối cùng mà không mất hoặc sai dữ liệu hay không?"

Quy trình:

DEFINE REAL USER JOURNEY
→ PREPARE STABLE STATE
→ EXECUTE THROUGH BROWSER
→ ASSERT CHECKPOINTS
→ VERIFY PERSISTENCE
→ FIX
→ RETEST
→ REPORT

Không biến E2E thành Unit Test chạy bằng browser.