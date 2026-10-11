Bạn là Senior QA Engineer + Visual Regression Specialist + Frontend Regression Test Engineer.

NHIỆM VỤ:
Thiết kế và triển khai REGRESSION UI TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Phát hiện các lỗi giao diện xuất hiện sau khi sửa code, refactor component, đổi design token hoặc thêm tính năng.
- Xác nhận UI cũ không bị vỡ sau thay đổi mới.
- Tập trung vào visual regression, layout regression và interaction state regression.
- Không biến Regression UI Testing thành Functional Regression tổng quát.
- Không chỉ chụp screenshot rồi update baseline.
- Mọi visual diff phải được review để phân biệt:
  intentional change
  vs
  unintended regression.

==================================================
1. ĐỌC TOÀN BỘ REPORT TRƯỚC
==================================================

Đọc:

docs/UI_REFERENCE_AUDIT.md
docs/UI_REFACTOR_PLAN.md
docs/UI_REFACTOR_REPORT.md
docs/VISUAL_POLISH_REPORT.md nếu có

Đọc các test report:

docs/testing/04_FUNCTIONAL_TESTING.md
docs/testing/05_INTERACTION_TESTING.md
docs/testing/06_SMOKE_TESTING.md
docs/testing/07_VISUAL_TESTING.md
docs/testing/08_CONSISTENCY_TESTING.md
docs/testing/09_RESPONSIVE_TESTING.md
docs/testing/10_ACCESSIBILITY_TESTING.md
docs/testing/11_COMPATIBILITY_TESTING.md
docs/testing/12_E2E_TESTING.md

Regression UI phải tận dụng:
- visual baselines;
- stable fixtures;
- existing Playwright setup;
- existing screenshot strategy.

==================================================
2. REGRESSION UI KHÁC VISUAL TESTING NHƯ THẾ NÀO
==================================================

Visual Testing:
xác nhận giao diện hiện tại đạt chuẩn.

Regression UI Testing:
xác nhận thay đổi mới KHÔNG làm hỏng giao diện đã được chấp nhận trước đó.

Ví dụ:

Visual:
"Dashboard hiện tại có đúng không?"

Regression UI:
"Sau khi sửa Exam Builder, Dashboard có bị thay đổi ngoài ý muốn không?"

==================================================
3. XÁC ĐỊNH REGRESSION BASELINE
==================================================

Baseline phải lấy từ UI đã được:
- review;
- chấp nhận;
- build pass;
- smoke pass.

Không dùng screenshot đang lỗi làm baseline.

Baseline nên gắn với:
- commit;
- release;
- milestone;
hoặc
- known-good state.

Ghi baseline reference vào:

docs/testing/13_REGRESSION_UI_TESTING.md

==================================================
4. CHANGE IMPACT ANALYSIS
==================================================

Trước mỗi regression run:

xác định file/component vừa thay đổi.

Ví dụ:

src/components/common/Button.tsx

Impact có thể tới:
- Dashboard
- KHBD
- Exam
- Export
- Modal

Nếu sửa:

src/theme/tokens.ts

Impact:
gần như toàn bộ hệ thống.

Tạo bảng:

Changed File
→ Shared Component
→ Screens Potentially Affected
→ Regression Priority

==================================================
5. RISK-BASED REGRESSION
==================================================

Không cần chạy mọi screenshot sau mọi thay đổi nhỏ.

Chia:

LOW IMPACT
→ component/screen liên quan

MEDIUM IMPACT
→ module + shared components

HIGH IMPACT
→ toàn visual regression suite

High impact examples:
- tokens.ts
- index.css
- AppShell
- Sidebar
- TopBar
- Button
- typography
- global spacing
- modal
- layout primitives

==================================================
6. P0 REGRESSION SCREENS
==================================================

Luôn ưu tiên:

1. App Shell
2. Dashboard
3. Literature Workspace
4. KHBD
5. Question Bank
6. Matrix
7. Exam Builder
8. Slides Studio

Đây là core visual screens.

==================================================
7. P1 REGRESSION SCREENS
==================================================

- Genre Analysis
- Rubric
- Export
- Modals
- Empty States
- Common components

==================================================
8. P2 REGRESSION
==================================================

- Tooltip
- secondary popovers
- low-use screens
- cosmetic variants

Chỉ chạy khi relevant hoặc trước release.

==================================================
9. APP SHELL REGRESSION
==================================================

Test:

Sidebar
TopBar
Main content
100vh
overflow
focus mode

Phát hiện:
- Sidebar width đổi;
- topbar height đổi;
- main content bị đẩy;
- body scroll xuất hiện;
- panel height sai.

==================================================
10. DASHBOARD REGRESSION
==================================================

Kiểm tra:

- Resume Card;
- Quick Actions;
- Recent Lessons;
- progress;
- spacing;
- CTA;
- title wrapping.

Sau shared component changes:
Dashboard là screen phải retest sớm.

==================================================
11. READER REGRESSION
==================================================

P0.

Kiểm tra:

- 3-column layout;
- outline width;
- reader width;
- insight width;
- Lora;
- paragraph spacing;
- toolbar;
- highlight;
- panel scroll.

Regression thường gặp:
- flex/min-width thay đổi;
- font đổi làm text wrap;
- insight đẩy reader;
- toolbar clipping.

==================================================
12. KHBD REGRESSION
==================================================

Kiểm tra:

- Visual Builder;
- accordion;
- form;
- 4 steps;
- Document View.

Regression:
- activity card spacing;
- accordion height;
- textarea overflow;
- preview A4 clipping.

==================================================
13. QUESTION BANK REGRESSION
==================================================

Kiểm tra:

Master
|
Detail

Regression:
- list width thay đổi;
- editor tràn;
- selected state mất;
- filter bar lệch;
- form spacing sai.

==================================================
14. MATRIX REGRESSION
==================================================

Kiểm tra:

- table width;
- sticky header;
- score cells;
- badges;
- summary;
- horizontal scroll.

Regression:
- column collapse;
- text clipping;
- header mismatch;
- selected cell styling.

==================================================
15. EXAM REGRESSION
==================================================

P0.

Kiểm tra 3 cột:

Sections
Questions
Statistics

Regression:
- statistics bị đẩy xuống;
- question panel hẹp;
- score meter lệch;
- section nav overflow;
- selected card style mất.

==================================================
16. RUBRIC REGRESSION
==================================================

Kiểm tra:
- table;
- criterion;
- quality level;
- score;
- total.

Regression:
- table overflow;
- inputs lệch;
- long text phá row height.

==================================================
17. SLIDES REGRESSION
==================================================

Kiểm tra:

Thumbnail
|
Canvas
|
Inspector

Regression:
- canvas không còn 16:9;
- selected thumbnail style mất;
- inspector overflow;
- slide scale sai.

==================================================
18. EXPORT REGRESSION
==================================================

Kiểm tra:
- document cards;
- buttons;
- JSON area;
- backup/restore panel.

Regression:
- cards height lệch;
- button wrap;
- textarea overflow.

==================================================
19. MODAL REGRESSION
==================================================

Chụp representative modals:

- Create Lesson
- Confirm Delete
- Restore
- Slide Edit nếu có

Kiểm tra:
- width;
- header;
- footer;
- overlay;
- close;
- long content.

==================================================
20. COMMON COMPONENT REGRESSION
==================================================

Regression suite nên có component showcase hoặc representative snapshots cho:

- Button
- Badge
- Tabs
- Input
- Modal
- Card
- EmptyState
- Toast

Nếu shared component đổi:
chạy component snapshot trước khi chạy full screens.

==================================================
21. STATE-BASED REGRESSION
==================================================

UI không chỉ có default state.

Baseline một số state quan trọng:

- default
- selected
- hover representative
- focus
- error
- disabled
- empty
- loading
- warning

Không cần snapshot mọi permutation.

==================================================
22. RESPONSIVE REGRESSION
==================================================

P0 viewports:

1366×768
1440×900

Nếu change liên quan responsive/global layout:
chạy thêm:

768×1024
390×844

Không chạy full device matrix cho mọi minor UI change.

==================================================
23. TYPOGRAPHY REGRESSION
==================================================

Nếu thay:
- font;
- line-height;
- weight;
- token;

bắt buộc retest:

Dashboard
Reader
Matrix
Exam
Modal

Font change thường gây layout regression lan rộng.

==================================================
24. COLOR TOKEN REGRESSION
==================================================

Nếu thay design tokens:
check:

- active states;
- semantic status;
- error;
- warning;
- success;
- badge;
- button.

Không chỉ xem primary color.

==================================================
25. SPACING TOKEN REGRESSION
==================================================

Nếu sửa gap/padding token:
chạy suite rộng.

Có thể ảnh hưởng:
- card;
- form;
- table;
- modal;
- sidebar;
- dashboard.

==================================================
26. BORDER / RADIUS REGRESSION
==================================================

Nếu shared border/radius thay đổi:
chạy representative components.

Không nhất thiết full suite nếu impact nhỏ.

==================================================
27. SHADOW REGRESSION
==================================================

Kiểm tra:
- modal;
- popover;
- floating toolbar;
- cards;
- slide canvas.

Shadow nhỏ có thể gây screenshot noise.

Dùng threshold kiểm soát,
không mở threshold quá rộng.

==================================================
28. SCREENSHOT STABILITY
==================================================

Trước screenshot:

- freeze time;
- freeze random;
- stable fixture;
- wait fonts;
- disable animations;
- hide caret;
- close transient toast không relevant.

Không chụp UI đang loading ngẫu nhiên.

==================================================
29. DYNAMIC CONTENT
==================================================

Mask hoặc stabilize:

- autosave timestamp;
- generated IDs;
- current date;
- random content.

Không mask vùng lớn chứa UI quan trọng.

==================================================
30. PLAYWRIGHT TOOLING
==================================================

Ưu tiên:

expect(page).toHaveScreenshot()

và:

expect(locator).toHaveScreenshot()

Dùng existing visual baseline nếu đã có.

Không tạo hệ snapshot thứ hai không cần thiết.

==================================================
31. TEST STRUCTURE
==================================================

Tạo:

tests/
└── regression-ui/
    ├── shell.regression.spec.ts
    ├── dashboard.regression.spec.ts
    ├── reader.regression.spec.ts
    ├── khbd.regression.spec.ts
    ├── question.regression.spec.ts
    ├── matrix.regression.spec.ts
    ├── exam.regression.spec.ts
    ├── rubric.regression.spec.ts
    ├── slides.regression.spec.ts
    ├── export.regression.spec.ts
    └── common.regression.spec.ts

Có thể reuse helper của tests/visual.

==================================================
32. KHÔNG DUPLICATE BASELINE KHÔNG CẦN THIẾT
==================================================

Nếu Visual Testing đã có snapshot:

reuse hoặc import test setup.

Không lưu:

visual/dashboard.png

và:

regression/dashboard-copy.png

một cách vô nghĩa.

Regression suite có thể dùng cùng approved snapshot baseline nếu architecture phù hợp.

==================================================
33. CHANGE-SPECIFIC REGRESSION
==================================================

Khi biết change:

Ví dụ:
"Refactor Button component"

Run:

common button
Dashboard
KHBD
Exam
Export

Không cần chạy Reader text snapshot nếu Reader không dùng button ở vùng ảnh tương ứng và impact thấp.

==================================================
34. FULL REGRESSION RUN
==================================================

Trước release hoặc sau high-impact change:

chạy toàn bộ:

tests/regression-ui

ở:

1366×768
1440×900

==================================================
35. DIFF REVIEW POLICY
==================================================

Mỗi fail phải phân loại:

A. EXPECTED CHANGE
B. TRUE REGRESSION
C. FLAKY/ENVIRONMENT
D. BASELINE OUTDATED
E. TEST DATA INSTABILITY

Không được ngay lập tức update snapshot.

==================================================
36. EXPECTED CHANGE
==================================================

Nếu thay đổi có chủ đích:

1. review screenshot;
2. xác nhận đúng design;
3. document change;
4. update baseline;
5. rerun suite.

==================================================
37. TRUE REGRESSION
==================================================

Nếu không chủ đích:

Không update baseline.

Phải:
- xác định source change;
- fix UI;
- rerun;
- baseline giữ nguyên.

==================================================
38. FLAKY VISUAL TEST
==================================================

Nếu diff do:

font load
timestamp
animation
scrollbar
caret
async render

phải stabilize test.

Không tăng diff threshold để che flakiness.

==================================================
39. PIXEL THRESHOLD
==================================================

Dùng threshold nhỏ và nhất quán.

Nếu project đã có threshold:
giữ existing value trừ khi có evidence.

Không đặt threshold quá lớn như:
20% màn hình.

==================================================
40. OVERFLOW REGRESSION
==================================================

Ngoài screenshot:
assert body overflow.

Ví dụ:

scrollWidth <= clientWidth

đối với screens không cho body horizontal scroll.

==================================================
41. BOUNDING BOX REGRESSION
==================================================

Với layout critical:

Sidebar width
TopBar height
Reader panels

có thể assert khoảng tolerance.

Ví dụ:
Sidebar ~248px

Không assert từng pixel cho mọi component.

==================================================
42. ELEMENT VISIBILITY REGRESSION
==================================================

P0 actions phải còn visible:

- Tiếp tục
- Tạo bài
- Save
- Export
- question action
- presentation action

Regression UI có thể làm button bị che dù functional logic vẫn tồn tại.

==================================================
43. TEXT CLIPPING REGRESSION
==================================================

Dùng representative Vietnamese long text.

Kiểm tra:
- scrollWidth/clientWidth;
- bounding boxes;
- screenshot.

Đặc biệt:
breadcrumb
button
badge
tabs
tables.

==================================================
44. Z-INDEX REGRESSION
==================================================

Test:
- modal;
- dropdown;
- toolbar;
- tooltip;
- sidebar drawer.

Không để overlay xuất hiện dưới panel khác sau CSS refactor.

==================================================
45. STICKY/FIXED REGRESSION
==================================================

Kiểm tra:
- TopBar;
- table header;
- sidebar;
- floating toolbar;
- presentation controls.

==================================================
46. SCROLL REGRESSION
==================================================

Sau layout change:
verify:

- body;
- panels;
- modal;
- Reader;
- Matrix.

Không xuất hiện nested scroll ngoài ý muốn.

==================================================
47. BASELINE VERSIONING
==================================================

Không cần lưu binary screenshot vào report text,
nhưng phải biết baseline thuộc version nào.

Ghi:

Baseline Version:
commit/tag/date

nếu có thể.

==================================================
48. CI INTEGRATION
==================================================

Có thể chạy:

PR:
risk-based P0

Main:
P0 + P1

Release:
full regression UI

Không nhất thiết chạy full screenshot suite ở mọi save local.

==================================================
49. FAILURE ARTIFACTS
==================================================

Giữ:

Expected
Actual
Diff
Trace nếu cần

Không chỉ log:
"Screenshot mismatch".

==================================================
50. REGRESSION TEST CASE FORMAT
==================================================

Cập nhật:

docs/testing/13_REGRESSION_UI_TESTING.md

Mỗi case:

ID:
Screen/Component:
Baseline:
Triggering Change:
Viewport:
Priority:
Expected:
Actual:
Diff Classification:
Status:
Evidence:
Fixed:
Baseline Updated:

==================================================
51. BUG FORMAT
==================================================

REGUI-BUG-001

Changed Area:
Affected Screen:
Viewport:
Baseline:
Expected:
Actual:
Visual Diff:
Severity:
Root Cause:
Fix:
Retest:
Baseline Changed?:

==================================================
52. SEVERITY
==================================================

Critical:
- screen unusable;
- content/control bị che hoàn toàn.

High:
- major layout break;
- Reader/Exam 3-column vỡ;
- navigation inaccessible.

Medium:
- significant alignment/overflow;
- typography wrap gây khó dùng.

Low:
- small spacing/shadow difference.

==================================================
53. PRIORITY
==================================================

P0:
- Shell
- Dashboard
- Reader
- KHBD
- Question Bank
- Matrix
- Exam
- Slides

P1:
- Rubric
- Genre
- Export
- Modal
- common components

P2:
minor secondary UI.

==================================================
54. FIX POLICY
==================================================

Fix root cause.

Ưu tiên:
- shared token;
- shared component;
- correct layout constraint.

Không dùng one-off CSS patch nếu vấn đề đến từ global component.

==================================================
55. REGRESSION AFTER FIX
==================================================

Sau fix:

1. chạy test case fail;
2. chạy screen liên quan;
3. chạy shared-component impact screens;
4. smoke test nếu layout/global component bị sửa.

==================================================
56. COMMANDS
==================================================

Chạy:

npx playwright test tests/regression-ui

Nếu dùng cùng visual tests:

npx playwright test tests/visual

Không update snapshots tự động trừ khi intentional change đã review.

Sau đó:

npm run build

Nếu có:
npm run lint

==================================================
57. REPORT
==================================================

Cập nhật:

docs/testing/13_REGRESSION_UI_TESTING.md

Bao gồm:

# Regression UI Testing Report

## 1. Objective
## 2. Approved Baseline
## 3. Change Impact Analysis
## 4. Screens Covered
## 5. Components Covered
## 6. Viewports
## 7. Regression Cases
## 8. Unexpected Visual Diffs
## 9. Expected Changes
## 10. Flaky Diffs
## 11. Bugs Found
## 12. Fixes
## 13. Baselines Updated
## 14. Remaining Risks
## 15. Regression Decision

==================================================
58. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

Baseline version:
...

Screens checked:
N

Snapshots checked:
N

Unexpected diffs:
N

True regressions:
N

Expected changes:
N

Flaky diffs:
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

Baselines updated:
N

Overall:
PASS / FAIL / BLOCKED

QUAN TRỌNG:

Regression UI Testing phải trả lời:

"Sau thay đổi mới, giao diện đã được chấp nhận trước đó có bị hỏng ngoài ý muốn hay không?"

Quy trình:

IDENTIFY CHANGE
→ MAP IMPACT
→ RUN RELEVANT BASELINES
→ REVIEW DIFF
→ CLASSIFY
→ FIX OR APPROVE
→ RETEST
→ REPORT

Không được dùng:
--update-snapshots

như một cách để làm test pass.