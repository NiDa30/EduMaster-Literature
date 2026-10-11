Bạn là Senior QA Engineer + Visual Regression Test Engineer + Frontend Quality Engineer.

NHIỆM VỤ:
Thiết kế và triển khai VISUAL TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Kiểm tra giao diện có hiển thị đúng và ổn định sau mỗi thay đổi.
- Phát hiện layout shift, lệch spacing, sai font, sai màu, vỡ card, tràn nội dung, clipping, icon lệch, component biến dạng.
- Thiết lập visual regression testing bằng screenshot comparison.
- Không biến Visual Testing thành Functional Testing.
- Không kiểm business logic sâu trong phase này.
- Không dùng screenshot test cho mọi pixel vô nghĩa.
- Chỉ baseline những màn hình/component quan trọng và ổn định.

==================================================
1. ĐỌC TÀI LIỆU VÀ CURRENT UI
==================================================

Đọc:

docs/UI_REFERENCE_AUDIT.md
docs/UI_REFACTOR_PLAN.md
docs/UI_REFACTOR_REPORT.md
docs/VISUAL_POLISH_REPORT.md nếu có

Đọc các test report trước:

docs/testing/01_UNIT_TESTING.md
docs/testing/02_API_TESTING.md
docs/testing/03_DATABASE_TESTING.md
docs/testing/04_FUNCTIONAL_TESTING.md
docs/testing/05_INTERACTION_TESTING.md
docs/testing/06_SMOKE_TESTING.md

Đọc thêm:

src/theme/tokens.ts
src/index.css
src/components/
src/components/common/

Xác định toàn bộ màn hình chính và visual-critical components.

Ghi inventory vào:

docs/testing/07_VISUAL_TESTING.md

==================================================
2. MỤC TIÊU VISUAL TEST
==================================================

Visual Testing phải trả lời:

"Giao diện sau thay đổi có còn giống trạng thái chuẩn đã chấp nhận không?"

Tập trung:

- layout;
- spacing;
- alignment;
- typography;
- colors;
- borders;
- radius;
- shadow;
- icon placement;
- overflow;
- clipping;
- wrapping;
- empty states;
- modal;
- dropdown;
- selected states.

Không tập trung:

- API đúng hay sai;
- calculation;
- database;
- full business flow.

==================================================
3. CHỌN TOOL
==================================================

Ưu tiên:

Playwright

Dùng:

expect(page).toHaveScreenshot()

hoặc:

expect(locator).toHaveScreenshot()

Không dùng Selenium cho screenshot regression nếu Playwright đã có trong project.

Nếu chưa có:

npm install -D @playwright/test

npx playwright install chromium

==================================================
4. BASELINE STRATEGY
==================================================

Không tạo baseline ngay lập tức một cách mù quáng.

Trước khi approve baseline:

- mở màn hình;
- kiểm tra bằng mắt;
- xác nhận UI hiện tại đúng;
- sau đó mới lưu snapshot.

Baseline phải đại diện cho:

"known good state"

Không approve snapshot khi UI đang lỗi.

==================================================
5. VIEWPORT CHUẨN
==================================================

Bắt buộc test:

1366×768
1440×900
1920×1080

Có thể thêm:

1280×720

nếu layout desktop cần.

Responsive/mobile sẽ test sâu ở phase #9.

Visual Test hiện tại ưu tiên desktop.

==================================================
6. BROWSER CHUẨN CHO BASELINE
==================================================

Baseline chính:

Chromium

Lý do:
- ổn định;
- phù hợp Chrome/Edge;
- giảm snapshot noise.

Không tạo baseline cho mọi browser ở phase này.

Cross-browser thuộc Compatibility Testing.

==================================================
7. FONT STABILITY
==================================================

Visual screenshot chỉ chạy sau khi font load xong.

Phải chờ:

document.fonts.ready

Ví dụ:

await page.evaluate(() => document.fonts.ready);

Đảm bảo:

Be Vietnam Pro
Lora

đã load trước screenshot.

Nếu không:
snapshot dễ sai vì fallback font.

==================================================
8. DISABLE ANIMATION
==================================================

Khi chụp snapshot:

- tắt animation;
- tắt transition nếu cần;
- freeze cursor;
- tránh caret blinking.

Playwright có thể dùng:

animations: "disabled"

Mục tiêu:
visual test deterministic.

==================================================
9. FREEZE TIME
==================================================

Nếu UI hiển thị:

"Đã lưu · HH:mm"

thì phải freeze thời gian hoặc mask vùng này.

Không để snapshot fail vì mỗi phút khác nhau.

Có thể:
- mock Date;
- mask timestamp;
- replace dynamic content.

==================================================
10. STABILIZE DYNAMIC DATA
==================================================

Các vùng dynamic cần cố định:

- timestamps;
- random ID;
- progress nếu biến theo state;
- generated content;
- autosave time;
- toast timeout;
- current date.

Dùng fixture/state cố định trước mỗi screenshot.

==================================================
11. TEST APP SHELL
==================================================

Visual test:

- Sidebar;
- TopBar;
- active navigation;
- main content container;
- spacing tổng thể;
- viewport 100vh;
- không body overflow.

Chụp:

VIS-SHELL-001
Default App Shell

VIS-SHELL-002
Focus Mode

==================================================
12. SIDEBAR VISUAL
==================================================

Kiểm tra:

- width;
- icon alignment;
- active item;
- hover nếu cần component screenshot;
- teacher identity;
- bottom spacing;
- không text wrap ngoài ý muốn.

Không cần screenshot từng menu item.

==================================================
13. TOPBAR VISUAL
==================================================

Kiểm tra:

- breadcrumb/context;
- autosave;
- action buttons;
- lesson switcher trigger;
- vertical alignment;
- divider;
- không overflow.

==================================================
14. DASHBOARD VISUAL
==================================================

P0 visual screen.

Chụp full viewport ở state ổn định.

Kiểm tra:

- greeting/header;
- Resume Card;
- Quick Actions;
- Recent Lessons;
- progress bars;
- spacing;
- hierarchy;
- card alignment;
- typography;
- no overflow.

Tạo:

VIS-DASH-001
Dashboard default

VIS-DASH-002
Dashboard empty state nếu quan trọng

==================================================
15. LITERATURE WORKSPACE VISUAL
==================================================

Đây là màn hình P0 quan trọng nhất.

Chụp:

- 3-column layout;
- Reader center;
- Outline;
- Insight Panel;
- scrollbar;
- typography Lora;
- paragraph spacing;
- active outline.

Kiểm tra:
- Reader không quá hẹp;
- line-height đúng;
- panel không chồng nhau;
- không horizontal overflow.

==================================================
16. READER LONG CONTENT
==================================================

Test với văn bản dài.

Kiểm tra:

- paragraph wrapping;
- poem line breaks;
- long quote;
- multi-paragraph content;
- Unicode;
- không clipping.

Không cần full tác phẩm dài nếu snapshot quá lớn.

Ưu tiên viewport screenshot.

==================================================
17. FLOATING TOOLBAR VISUAL
==================================================

Tạo controlled text selection.

Chụp component hoặc region:

VIS-READER-TOOLBAR-001

Kiểm tra:
- toolbar không che text quá mức;
- icon spacing;
- shadow;
- radius;
- position;
- không bị cắt bởi panel.

==================================================
18. HIGHLIGHT VISUAL
==================================================

Test sample:

- yellow highlight;
- rose;
- green;
- blue nếu tồn tại.

Không cần screenshot từng màu nếu chỉ khác token nhỏ.

Ưu tiên một snapshot chứa các variants.

==================================================
19. GENRE ANALYSIS VISUAL
==================================================

Kiểm tra:

- tabs;
- analysis sections;
- Argument Map;
- evidence block;
- hierarchy;
- node alignment;
- card density.

Chụp:

VIS-GENRE-001
Overview

VIS-GENRE-002
Argument Map

==================================================
20. KHBD VISUAL
==================================================

Chụp:

VIS-KHBD-001
Visual Builder

VIS-KHBD-002
Expanded Activity

VIS-KHBD-003
Document View

Kiểm tra:
- accordion;
- step markers;
- form alignment;
- document preview;
- không form dump quá dài trong viewport.

==================================================
21. QUESTION BANK VISUAL
==================================================

Master-detail layout.

Kiểm tra:
- filter/list width;
- editor area;
- selected question;
- form spacing;
- long content;
- no horizontal overflow.

Chụp:

VIS-QUESTION-001

==================================================
22. MATRIX VISUAL
==================================================

P0 data-heavy screen.

Kiểm tra:
- table header;
- column width;
- badges;
- score fields;
- sticky header;
- row alignment;
- summary.

Chụp:

VIS-MATRIX-001

Nếu table dài:
chỉ viewport hoặc locator screenshot vùng matrix.

==================================================
23. SPECIFICATION VISUAL
==================================================

Kiểm tra table/forms tương tự Matrix nhưng không cần duplicate snapshot nếu visual structure gần giống.

Chỉ baseline nếu layout thực sự khác.

==================================================
24. EXAM BUILDER VISUAL
==================================================

P0.

Chụp:

VIS-EXAM-001
Default three-column layout

VIS-EXAM-002
Selected Question

VIS-EXAM-003
Validation warning state

Kiểm tra:
- Sections;
- Questions;
- Statistics;
- selected state;
- score meter;
- warning colors;
- no overlap.

==================================================
25. RUBRIC VISUAL
==================================================

Kiểm tra:

- table;
- criteria;
- score columns;
- quality levels;
- live total;
- long description wrapping.

Chụp:

VIS-RUBRIC-001

==================================================
26. SLIDES STUDIO VISUAL
==================================================

P0.

Chụp:

VIS-SLIDES-001
Editor

VIS-SLIDES-002
Presentation Mode

Kiểm tra:
- thumbnail strip;
- 16:9 canvas;
- inspector;
- selected thumbnail;
- canvas shadow;
- full-screen visual hierarchy.

==================================================
27. EXPORT CENTER VISUAL
==================================================

Kiểm tra:
- sections;
- document cards;
- actions;
- badges;
- backup panel;
- restore panel.

Không để mỗi card một style khác nhau.

==================================================
28. COMMON COMPONENT SNAPSHOTS
==================================================

Chỉ tạo component visual test cho những component dùng rộng:

- Button variants;
- Badge variants;
- Tabs;
- Modal;
- Drawer;
- EmptyState;
- StatCard;
- Toast nếu có;
- Input states.

Không snapshot mọi component nhỏ.

==================================================
29. BUTTON VISUAL STATES
==================================================

Nếu có component showcase/story page hoặc test harness:

chụp:

Primary:
- default
- hover
- focus
- disabled

Secondary:
- default
- hover

Destructive:
- default

Không cần snapshot pressed state nếu khó ổn định.

==================================================
30. INPUT VISUAL STATES
==================================================

Test:

- default;
- focus;
- error;
- disabled;
- textarea;
- select.

Kiểm tra focus ring theo design system.

==================================================
31. MODAL VISUAL
==================================================

Chụp:
- default dialog;
- long content;
- validation state nếu quan trọng.

Kiểm tra:
- backdrop;
- center position;
- width;
- shadow;
- footer alignment.

==================================================
32. EMPTY STATE VISUAL
==================================================

Baseline một số empty states quan trọng:

- No lesson;
- No question;
- No slides.

Nếu cùng component:
chỉ cần representative cases.

==================================================
33. ERROR STATE VISUAL
==================================================

Test representative:

- validation error;
- restore error;
- empty/invalid file state nếu có.

Không cần snapshot tất cả error messages.

==================================================
34. LONG VIETNAMESE TEXT
==================================================

P0.

Dùng dữ liệu:

"Người lái đò Sông Đà"
"Vợ chồng A Phủ"
"Kế hoạch bài dạy Ngữ văn lớp 12"

Test:
- title wrap;
- button text;
- table cell;
- breadcrumb;
- dropdown.

Không để clipping dấu tiếng Việt.

==================================================
35. TEXT OVERFLOW
==================================================

Tạo state có:

- title rất dài;
- author dài;
- metadata dài;
- question dài.

Kiểm tra:
- wrap;
- ellipsis;
- tooltip nếu có;
- không phá layout.

==================================================
36. SCROLL VISUAL
==================================================

Kiểm tra:
- internal panels;
- scrollbar;
- sticky header;
- zero-body-scroll;
- Reader scroll.

Visual test phải xác nhận không xuất hiện:
- double scrollbar ngoài ý muốn;
- body scroll;
- horizontal scrollbar bất thường.

==================================================
37. SCREENSHOT MODE
==================================================

Ưu tiên:

page screenshot
cho toàn màn hình.

locator screenshot
cho component phức tạp.

Không dùng fullPage=true cho editor 100vh nếu không cần.

Vì app dùng zero-body-scroll,
viewport screenshot có ý nghĩa hơn.

==================================================
38. SAMPLE PLAYWRIGHT TEST
==================================================

Ví dụ:

test("dashboard visual", async ({ page }) => {
  await page.goto("/");

  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot(
    "dashboard.png",
    {
      animations: "disabled",
      fullPage: false,
    }
  );
});

Nếu cần component:

await expect(
  page.getByTestId("resume-card")
).toHaveScreenshot("resume-card.png");

==================================================
39. MASK DYNAMIC AREAS
==================================================

Nếu có vùng không thể freeze:

await expect(page).toHaveScreenshot({
  mask: [
    page.getByTestId("autosave-time")
  ]
});

Không mask quá nhiều đến mức snapshot mất ý nghĩa.

==================================================
40. PIXEL DIFFERENCE
==================================================

Không đặt threshold quá rộng để che bug.

Bắt đầu với mặc định hoặc threshold rất nhỏ.

Nếu có anti-aliasing/font noise:
điều chỉnh có kiểm soát.

Không dùng:
maxDiffPixelRatio = 0.2

chỉ để test pass.

==================================================
41. SNAPSHOT UPDATE POLICY
==================================================

Không chạy:

--update-snapshots

một cách tự động sau mọi failure.

Quy trình:

1. Visual test fail.
2. Mở diff.
3. Xác định:
   - intentional change;
   - regression.
4. Nếu intentional và đã review:
   update baseline.
5. Nếu regression:
   fix UI.

==================================================
42. SNAPSHOT DIRECTORY
==================================================

Dùng structure rõ:

tests/
└── visual/
    ├── dashboard.visual.spec.ts
    ├── reader.visual.spec.ts
    ├── genre.visual.spec.ts
    ├── khbd.visual.spec.ts
    ├── question.visual.spec.ts
    ├── matrix.visual.spec.ts
    ├── exam.visual.spec.ts
    ├── rubric.visual.spec.ts
    ├── slides.visual.spec.ts
    └── export.visual.spec.ts

Playwright tự quản snapshot folder nếu phù hợp.

==================================================
43. SCREENSHOT NAMING
==================================================

Dùng tên có nghĩa:

dashboard-1440x900.png
reader-default-1440x900.png
exam-selected-question-1440x900.png

Không dùng:

test1.png
screen2.png

==================================================
44. VISUAL PRIORITY
==================================================

P0:
- App Shell
- Dashboard
- Literature Workspace
- KHBD
- Question Bank
- Matrix
- Exam
- Slides

P1:
- Genre Analysis
- Rubric
- Export
- Modal
- common components

P2:
- uncommon secondary screens.

==================================================
45. COLOR VALIDATION
==================================================

Visual screenshot giúp phát hiện sai màu.

Nhưng ngoài snapshot:
có thể kiểm tra design token tồn tại/được dùng hợp lý.

Không assert hex ở hàng trăm component.

Color source phải tập trung ở:
src/theme/tokens.ts
hoặc CSS variables.

==================================================
46. TYPOGRAPHY VALIDATION
==================================================

Kiểm tra bằng screenshot:

UI:
Be Vietnam Pro

Reader:
Lora

Kiểm tra:
- font fallback;
- font weight;
- Vietnamese glyph;
- line-height;
- title wrap.

==================================================
47. VISUAL CONSISTENCY VS CONSISTENCY TESTING
==================================================

Trong phase này:
phát hiện khác biệt bằng screenshot.

Phase #8 Consistency Testing sẽ đánh giá có hệ thống:
- cùng loại component có dùng giống nhau không.

Không trộn hai scope.

==================================================
48. CI STRATEGY
==================================================

Visual tests nên chạy trong môi trường ổn định:

- cùng OS/container nếu có thể;
- cùng browser version;
- cùng font;
- cùng viewport.

Nếu developer Windows nhưng CI Linux:
snapshot có thể lệch font rendering.

Ưu tiên baseline tạo trong môi trường CI chuẩn nếu dự án dùng CI.

==================================================
49. FAILURE ARTIFACTS
==================================================

Khi fail phải giữ:

- actual screenshot;
- expected screenshot;
- diff screenshot;
- trace nếu cần.

Để developer nhìn được regression ngay.

==================================================
50. VISUAL BUG FORMAT
==================================================

VIS-BUG-001

Screen:
Viewport:
Component:
Severity:
Baseline:
Actual:
Difference:
Expected:
Evidence:
Root Cause:
Fix:
Retest:

Severity:

High:
layout vỡ / content bị che / không sử dụng được

Medium:
alignment / overflow / typography ảnh hưởng rõ

Low:
minor spacing / shadow / cosmetic

==================================================
51. REPORT
==================================================

Cập nhật:

docs/testing/07_VISUAL_TESTING.md

Phải có:

# Visual Testing Report

## 1. Scope
## 2. Baseline Strategy
## 3. Environment
## 4. Viewports
## 5. Screens Covered
## 6. Components Covered
## 7. Dynamic Content Handling
## 8. Snapshot Test Cases
## 9. Execution Results
## 10. Visual Regressions Found
## 11. Intentional Changes Approved
## 12. Bugs Fixed
## 13. Remaining Risks
## 14. Baseline Update Policy

==================================================
52. EXECUTION
==================================================

Chạy:

npx playwright test tests/visual

Nếu cần tạo baseline lần đầu sau khi review UI:

npx playwright test tests/visual --update-snapshots

CHỈ update sau khi xác nhận UI hiện tại đúng.

Sau đó:

npm run build

Nếu có:
npm run lint

==================================================
53. ACCEPTANCE CRITERIA
==================================================

Visual Testing PASS khi:

- không có unexpected visual diff P0;
- không layout overflow nghiêm trọng;
- typography đúng;
- Reader không bị biến dạng;
- 3-column workspace ổn;
- Exam 3-column ổn;
- slide canvas ổn;
- không clipping tiếng Việt;
- approved baselines ổn định.

==================================================
54. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

Visual suite:
PASS / FAIL

Baselines:
N

Screens tested:
N

Viewports:
N

Unexpected diffs:
N

Approved intentional changes:
N

High visual bugs:
N

Medium:
N

Low:
N

Flaky snapshots:
N

QUAN TRỌNG:

Visual Testing phải phát hiện:

"UI trước và sau thay đổi có khác nhau ngoài ý muốn hay không?"

Không đơn giản là:

"chụp thật nhiều screenshot".

Quy trình chuẩn:

AUDIT
→ STABILIZE DATA
→ DEFINE BASELINE
→ CAPTURE
→ COMPARE
→ REVIEW DIFF
→ FIX OR APPROVE
→ REPORT