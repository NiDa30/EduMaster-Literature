Bạn là Senior QA Engineer + Sanity Test Engineer + Test Automation Engineer.

NHIỆM VỤ:
Thiết kế và triển khai SANITY TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Kiểm tra nhanh, tập trung đúng vào vùng vừa được sửa hoặc vừa thay đổi.
- Xác nhận bug fix / feature change mới có hoạt động đúng không trước khi chạy regression rộng.
- Không chạy toàn bộ hệ thống nếu thay đổi chỉ nằm ở một khu vực nhỏ.
- Không biến Sanity Testing thành Smoke Testing.
- Không biến Sanity Testing thành Regression Testing toàn phần.
- Phải dựa trên change set thực tế: file nào đổi, chức năng nào bị ảnh hưởng trực tiếp, chức năng nào có liên quan gần.
- Nếu sanity fail, phải dừng trước khi mở rộng regression.

==================================================
1. PHÂN BIỆT SANITY VỚI SMOKE VÀ REGRESSION
==================================================

Smoke Testing hỏi:

"Build này có đủ khỏe để bắt đầu test không?"

Sanity Testing hỏi:

"Phần vừa sửa có thực sự hoạt động đúng không?"

Regression Testing hỏi:

"Thay đổi này có làm hỏng các chức năng cũ khác không?"

Ví dụ:

Bug:
Autosave không lưu khi đổi lesson.

Sau khi dev sửa:
Sanity chỉ tập trung:

edit Lesson A
→ autosave
→ switch B
→ quay lại A
→ reload

Nếu sanity pass,
sau đó mới chạy regression rộng hơn.

==================================================
2. ĐỌC CHANGE SET TRƯỚC
==================================================

Trước khi tạo sanity cases:

đọc:

git status
git diff
git diff --name-only

nếu repo có Git.

Nếu không có Git:
đọc issue/bug report hoặc xác định file vừa được thay đổi.

Không chạy sanity chung chung.

==================================================
3. ĐỌC CÁC REPORT LIÊN QUAN
==================================================

Đọc:

docs/testing/04_FUNCTIONAL_TESTING.md
docs/testing/05_INTERACTION_TESTING.md
docs/testing/06_SMOKE_TESTING.md
docs/testing/12_E2E_TESTING.md
docs/testing/14_REGRESSION_TESTING.md

Và report test đúng module đang sửa.

Ví dụ:
nếu sửa UI:
đọc thêm:
docs/testing/13_REGRESSION_UI_TESTING.md

==================================================
4. SANITY INPUT
==================================================

Xác định:

Change:
Bug/Feature:
Changed Files:
Affected Module:
Expected Fix:
Risk:
Dependencies:

Ví dụ:

Bug:
Question không giữ ngữ liệu khi tạo từ Reader.

Changed:
LiteratureReader.tsx
QuestionBuilderView.tsx

Affected:
Reader
Question Bank

Risk:
Medium

==================================================
5. DEFINE SANITY SCOPE
==================================================

Scope chỉ gồm:

A. chức năng vừa sửa
B. 1–2 chức năng trực tiếp trước/sau nó
C. persistence nếu fix liên quan data
D. basic error path nếu bug liên quan validation

Không chạy:
toàn Dashboard
toàn Slides
toàn Export

nếu không liên quan.

==================================================
6. DIRECT FIX VALIDATION
==================================================

Test chính phải tái hiện bug cũ.

Pattern:

1. Reproduce bug scenario.
2. Thực hiện trên build mới.
3. Expected:
   bug không còn.
4. Xác nhận không có workaround đặc biệt.

Nếu không thể reproduce bug cũ:
ghi rõ limitation.

==================================================
7. NEARBY FUNCTION TEST
==================================================

Sau khi fix scenario chính,
test 1–3 chức năng gần nhất.

Ví dụ:

Fix:
Question creation from Reader

Sanity:
- Reader selection
- Create Question
- Question save
- Question reopen

Không cần:
Rubric
Slides
Export

==================================================
8. POSITIVE PATH
==================================================

Bắt buộc có ít nhất một happy path.

Ví dụ:

valid input
→ action
→ expected result.

==================================================
9. NEGATIVE PATH
==================================================

Nếu fix liên quan validation/error:
test ít nhất một negative path.

Ví dụ:

invalid JSON
→ error
→ state vẫn an toàn.

Nếu fix không liên quan error handling:
negative path có thể không cần.

==================================================
10. BOUNDARY CHECK
==================================================

Nếu bug là boundary bug:
test:
- trước boundary
- đúng boundary
- sau boundary

Ví dụ:
score = 0
score = max
score > max

Không test toàn range.

==================================================
11. STATE CHECK
==================================================

Nếu chức năng có state:
verify:
- state đổi đúng;
- không đổi ngoài ý muốn;
- không ảnh hưởng lesson khác.

==================================================
12. PERSISTENCE CHECK
==================================================

Nếu thay đổi liên quan save:

test:
edit
→ save/autosave
→ reload
→ verify.

Nếu không liên quan persistence:
không cần thêm.

==================================================
13. CROSS-MODULE CHECK
==================================================

Chỉ test direct integration.

Ví dụ:

Reader
→ Question

Matrix
→ Exam

KHBD
→ Slide

Không đi cả full E2E workflow.

==================================================
14. EXAMPLES OF SANITY SCOPE
==================================================

CASE A:
Fix Reader selection toolbar.

Test:
- select text;
- toolbar appears;
- click create question.

CASE B:
Fix Exam total score.

Test:
- add question;
- total updates;
- remove question;
- total updates again.

CASE C:
Fix Backup Restore.

Test:
- backup;
- restore;
- verify representative lesson;
- reload.

CASE D:
Fix modal close.

Test:
- open;
- close X;
- Esc;
- reopen.

==================================================
15. DASHBOARD SANITY
==================================================

Chỉ chạy nếu Dashboard vừa sửa.

Possible checks:
- Resume Card;
- create lesson CTA;
- recent lesson click;
- progress update.

==================================================
16. READER SANITY
==================================================

Chỉ chạy nếu Reader vừa sửa.

Checks có thể gồm:
- text render;
- select;
- highlight;
- note;
- toolbar action;
- Unicode.

==================================================
17. GENRE SANITY
==================================================

Nếu sửa Genre Analysis:
- tab;
- add/edit argument;
- transfer action;
- persistence.

==================================================
18. KHBD SANITY
==================================================

Nếu sửa KHBD:
- activity edit;
- 4-step content;
- Visual ↔ Document;
- save.

==================================================
19. QUESTION BANK SANITY
==================================================

Nếu sửa Question:
- create;
- save;
- reopen;
- filter/search nếu đúng vùng fix.

==================================================
20. MATRIX SANITY
==================================================

Nếu sửa Matrix:
- edit one cell;
- recalc summary;
- reload;
- exam link nếu related.

==================================================
21. EXAM SANITY
==================================================

Nếu sửa Exam:
- add/remove question;
- total;
- validation;
- correct section.

==================================================
22. RUBRIC SANITY
==================================================

Nếu sửa Rubric:
- criterion edit;
- score;
- total;
- reload.

==================================================
23. SLIDES SANITY
==================================================

Nếu sửa Slides:
- create;
- select;
- edit;
- presentation if related;
- export if related.

==================================================
24. EXPORT SANITY
==================================================

Nếu sửa Export:
test đúng output vừa sửa.

Ví dụ:
DOCX fix
→ chỉ cần DOCX + one related state check.

Không cần test PPTX nếu không liên quan.

==================================================
25. AUTOSAVE SANITY
==================================================

Nếu sửa autosave:

edit
→ wait save
→ reload
→ verify.

Test thêm:
rapid second edit

nếu bug liên quan debounce.

==================================================
26. LESSON SWITCHING SANITY
==================================================

Nếu sửa state switching:

A
→ edit
→ B
→ A

Expected:
data đúng lesson.

==================================================
27. BACKUP/RESTORE SANITY
==================================================

Nếu sửa restore:

valid backup
→ restore
→ representative modules valid.

Nếu bug invalid JSON:
test invalid input cụ thể.

==================================================
28. UNICODE SANITY
==================================================

Nếu change chạm text/state/export:

dùng:

Tây Tiến
Người lái đò Sông Đà
Vợ chồng A Phủ

Không cần full Unicode suite,
chỉ representative case.

==================================================
29. AUTOMATION STRATEGY
==================================================

Ưu tiên reuse test hiện có.

Không tạo duplicate test nếu Functional/E2E test đã cover bug fix.

Có thể chạy test theo grep/tag.

Ví dụ:

npx playwright test --grep "autosave"

hoặc chạy file liên quan.

==================================================
30. DEDICATED SANITY TESTS
==================================================

Nếu bug dễ tái phát và có giá trị lâu dài:

tạo test:

tests/sanity/

Nhưng nếu test đã tồn tại trong functional suite:
reuse.

Không copy test chỉ đổi tên.

==================================================
31. TEST STRUCTURE NẾU CẦN
==================================================

tests/
└── sanity/
    ├── reader.sanity.spec.ts
    ├── khbd.sanity.spec.ts
    ├── question.sanity.spec.ts
    ├── exam.sanity.spec.ts
    ├── persistence.sanity.spec.ts
    └── export.sanity.spec.ts

Chỉ tạo file thật sự cần.

==================================================
32. BUG FIX TEST PATTERN
==================================================

Một sanity bug-fix case tốt phải chứa:

Original Bug:
Fix Expected:
Reproduction Steps:
Result Before Fix:
Result After Fix:
Nearby Check:
Status:

==================================================
33. TEST CASE FORMAT
==================================================

Cập nhật:

docs/testing/15_SANITY_TESTING.md

Mỗi case:

ID:
Change/Bug:
Changed Files:
Affected Module:
Priority:
Precondition:
Steps:
Expected:
Actual:
Status:
Automated:
Evidence:

Ví dụ:

SANITY-EXAM-001

Bug:
Total score không cập nhật sau khi xóa câu hỏi.

Steps:
1. Open exam
2. Add 2 questions
3. Remove 1
4. Observe total

Expected:
Total giảm tương ứng ngay.

==================================================
34. PRIORITY
==================================================

P0:
- bug fix core;
- data loss;
- autosave;
- lesson switching;
- exam;
- backup/restore.

P1:
- module-local feature fix.

P2:
- minor interaction/cosmetic functional fix.

==================================================
35. STOP CONDITION
==================================================

Nếu direct fix validation FAIL:

SANITY = FAIL

Không cần chạy regression rộng.

Trả code về dev/fix trước.

Nếu direct fix pass nhưng nearby check fail:
SANITY = FAIL

vì fix đã tạo side effect gần.

==================================================
36. PASS CONDITION
==================================================

PASS khi:

- bug cũ không còn;
- happy path pass;
- nearby dependent actions pass;
- không có Critical/High issue mới;
- persistence pass nếu relevant.

==================================================
37. BLOCKED CONDITION
==================================================

BLOCKED nếu:
- environment lỗi;
- data fixture thiếu;
- không reproduce được scenario vì dependency ngoài;
- feature chưa được deploy/build.

Không đánh dấu PASS khi chưa test được.

==================================================
38. SANITY DURATION
==================================================

Sanity phải ngắn.

Mục tiêu:
vài phút đến khoảng 15–30 phút tùy change.

Không chạy suite vài giờ.

Nếu cần vài giờ:
đó là regression/full testing.

==================================================
39. NO FULL BROWSER MATRIX
==================================================

Sanity mặc định:
Chromium/primary browser.

Nếu bug browser-specific:
chạy browser đó.

Không chạy Chrome + Firefox + WebKit cho mọi sanity fix.

==================================================
40. NO FULL RESPONSIVE MATRIX
==================================================

Nếu bug desktop:
test viewport chính.

Nếu bug responsive:
test breakpoint bị lỗi + một adjacent breakpoint.

Không chạy toàn bộ matrix.

==================================================
41. NO FULL VISUAL SUITE
==================================================

Nếu fix không liên quan UI:
không chạy Regression UI.

Nếu fix shared component:
chạy relevant visual snapshots.

==================================================
42. CHANGE-SPECIFIC COMMANDS
==================================================

Ví dụ:

Fix Exam:

npx playwright test tests/functional/exam.spec.ts

Fix Reader toolbar:

npx playwright test tests/interaction/reader-selection.spec.ts

Fix backup:

npx playwright test tests/e2e/backup-restore.spec.ts

Không dùng full-suite command mặc định nếu không cần.

==================================================
43. UNIT SANITY
==================================================

Nếu bug nằm ở pure function:

chạy test unit trực tiếp.

Ví dụ:

npm run test:run -- unicode

hoặc command thực tế.

Sau unit pass:
run one functional verification.

==================================================
44. TEST EVIDENCE
==================================================

Khi fail:
giữ:
- screenshot;
- trace;
- console;
- exact data.

Khi pass:
không cần hàng chục screenshot nếu automation log đủ.

==================================================
45. CONSOLE ERROR
==================================================

Trong sanity browser tests:
capture pageerror/console.error liên quan vùng vừa sửa.

Không fail vì warning legacy không liên quan,
nhưng ghi nếu mới xuất hiện sau fix.

==================================================
46. BUG FORMAT
==================================================

SANITY-BUG-001

Original Change:
Affected Module:
Steps:
Expected:
Actual:
Severity:
New Regression?:
Evidence:
Root Cause:
Fix:
Retest:

==================================================
47. REGRESSION ESCALATION
==================================================

Nếu sanity PASS:
đánh giá risk.

Low risk:
có thể chỉ cần selected regression.

High risk:
chạy full relevant regression.

Critical change:
full regression + E2E.

==================================================
48. SANITY → REGRESSION FLOW
==================================================

Quy trình đúng:

Developer Fix
→ Build
→ Sanity
→ PASS
→ Regression
→ Release decision

Không nên:

Developer Fix
→ full regression ngay
→ phát hiện direct fix vẫn fail sau 2 giờ.

==================================================
49. REPORT
==================================================

Cập nhật:

docs/testing/15_SANITY_TESTING.md

Bao gồm:

# Sanity Testing Report

## 1. Change Summary
## 2. Changed Files
## 3. Bug/Feature Being Verified
## 4. Sanity Scope
## 5. Excluded Scope
## 6. Direct Fix Validation
## 7. Nearby Dependency Checks
## 8. Persistence Checks
## 9. Test Results
## 10. Bugs Found
## 11. New Regressions
## 12. Retest
## 13. Regression Recommendation
## 14. Final Decision

==================================================
50. FINAL DECISION
==================================================

Cuối report ghi rõ một trong:

SANITY PASSED
→ READY FOR REGRESSION

SANITY FAILED
→ RETURN TO DEVELOPMENT

SANITY BLOCKED
→ ENVIRONMENT / DATA ISSUE

==================================================
51. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

Change:
...

Changed files:
N

Sanity cases:
N

Passed:
N

Failed:
N

Blocked:
N

Original bug:
FIXED / NOT FIXED / BLOCKED

New regressions:
N

Critical:
N

High:
N

Recommended next step:
SELECTED REGRESSION / FULL REGRESSION / RETURN TO DEV

QUAN TRỌNG:

Sanity Testing phải trả lời đúng một câu:

"Phần vừa sửa có thực sự ổn để đáng chạy regression tiếp hay chưa?"

Quy trình:

IDENTIFY CHANGE
→ REPRODUCE ORIGINAL SCENARIO
→ VERIFY FIX
→ CHECK NEARBY FUNCTIONS
→ PASS/FAIL
→ DECIDE REGRESSION SCOPE

Không biến Sanity Testing thành:
"chạy lại toàn bộ hệ thống cho chắc".