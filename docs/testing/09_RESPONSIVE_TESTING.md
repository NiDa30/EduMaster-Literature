Bạn là Senior QA Engineer + Responsive Web Testing Specialist + Frontend Quality Engineer.

NHIỆM VỤ:
Thiết kế và triển khai RESPONSIVE TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Xác nhận toàn bộ giao diện hoạt động tốt trên nhiều kích thước màn hình.
- Phát hiện layout vỡ, tràn ngang, panel chồng nhau, text clipping, button bị mất, table quá rộng, modal vượt viewport, sidebar lỗi và breakpoint sai.
- Kiểm tra cả desktop, tablet và mobile.
- Không biến Responsive Testing thành Visual Testing thuần túy.
- Không chỉ chụp ảnh; phải kiểm tra behavior/layout transformation theo breakpoint.
- Không thay đổi business logic.

==================================================
1. ĐỌC PROJECT TRƯỚC
==================================================

Đọc:

docs/UI_REFERENCE_AUDIT.md
docs/UI_REFACTOR_PLAN.md
docs/UI_REFACTOR_REPORT.md
docs/VISUAL_POLISH_REPORT.md nếu có

Đọc các test report trước:

docs/testing/04_FUNCTIONAL_TESTING.md
docs/testing/05_INTERACTION_TESTING.md
docs/testing/06_SMOKE_TESTING.md
docs/testing/07_VISUAL_TESTING.md
docs/testing/08_CONSISTENCY_TESTING.md

Đọc source:

src/App.tsx
src/index.css
src/theme/tokens.ts
src/components/Sidebar.tsx
src/components/TopBar.tsx
src/components/

Tìm:
- breakpoint;
- media query;
- responsive class;
- hidden/show;
- drawer;
- bottom sheet;
- overflow;
- min-width;
- max-width;
- grid;
- flex.

==================================================
2. RESPONSIVE BASELINE
==================================================

Dựa trên thiết kế hiện tại, ưu tiên test:

Desktop:
- 1366×768
- 1440×900
- 1920×1080

Laptop nhỏ:
- 1280×720

Tablet landscape:
- 1024×768

Tablet portrait:
- 768×1024

Mobile:
- 390×844
- 375×812
- 360×800

Không cần test mọi kích thước ngẫu nhiên.

==================================================
3. MỤC TIÊU RESPONSIVE TEST
==================================================

Responsive Testing phải trả lời:

"Ở mỗi breakpoint, layout có chuyển đổi đúng để người dùng vẫn thao tác được hay không?"

Không chỉ hỏi:

"Ảnh có giống nhau không?"

Phải kiểm tra:

- component reflow;
- hide/show;
- drawer;
- stacking;
- scroll;
- touch usability;
- readable width.

==================================================
4. GLOBAL OVERFLOW TEST
==================================================

P0.

Ở từng viewport:

Kiểm tra:

document.documentElement.scrollWidth
<=
viewport width

Ngoại trừ khu vực cố ý horizontal scroll.

Không được có:
- body horizontal scroll;
- panel tràn khỏi màn hình;
- fixed element vượt viewport.

==================================================
5. APP SHELL RESPONSIVE
==================================================

Desktop:
- Sidebar cố định.
- TopBar hiển thị đầy đủ.
- Main content chiếm phần còn lại.

Tablet:
- Sidebar chuyển Drawer nếu design hiện tại định nghĩa vậy.
- Main content mở rộng.

Mobile:
- không giữ sidebar 248px cố định.
- navigation phải có mobile trigger phù hợp.

==================================================
6. SIDEBAR RESPONSIVE
==================================================

Test:

Desktop:
- visible;
- đúng width;
- không che content.

Tablet:
- drawer/collapsed behavior.

Mobile:
- hidden mặc định;
- mở bằng trigger;
- overlay;
- đóng bằng X/Esc/click outside nếu supported.

Kiểm tra:
- active item;
- scroll nội bộ;
- teacher identity không đẩy menu ra ngoài viewport.

==================================================
7. TOPBAR RESPONSIVE
==================================================

Desktop:
- breadcrumb/context đầy đủ;
- autosave;
- actions.

Tablet:
- giảm spacing;
- action phụ có thể chuyển vào More Menu.

Mobile:
- title không tràn;
- breadcrumb có thể rút gọn;
- chỉ giữ primary actions cần thiết.

Không để:
- 6 button chen nhau;
- text overlap;
- action mất hoàn toàn.

==================================================
8. DASHBOARD RESPONSIVE
==================================================

Test:

Desktop:
- Resume Card + Quick Actions hợp lý.

Tablet:
- grid giảm column.

Mobile:
- card stack 1 cột;
- Quick Actions dễ bấm;
- Recent Lessons chuyển list/card hoặc scroll hợp lý.

Kiểm tra:
- progress bar;
- metadata;
- title dài;
- CTA.

==================================================
9. LITERATURE WORKSPACE RESPONSIVE
==================================================

P0 quan trọng nhất.

Desktop:
3 cột:

Outline | Reader | Insight

Tablet:
- Reader ưu tiên.
- Outline/Insight có thể chuyển Drawer/side panel.

Mobile:
- Reader 1 cột.
- Outline → drawer/bottom sheet.
- Insight → drawer/bottom sheet.
- toolbar không tràn màn hình.

Không ép 3 cột desktop xuống mobile.

==================================================
10. READER RESPONSIVE
==================================================

Kiểm tra:

- text width;
- font size;
- line-height;
- paragraph wrapping;
- poem line breaks;
- quote blocks.

Mobile:
- padding không quá lớn;
- text không sát mép;
- không horizontal scroll.

==================================================
11. FLOATING TOOLBAR RESPONSIVE
==================================================

Desktop:
floating toolbar gần selection.

Mobile:
nếu floating toolbar quá rộng:
phải chuyển thành:
- compact toolbar
hoặc
- bottom sheet
theo design hiện tại.

Kiểm tra:
- không tràn viewport;
- action vẫn bấm được.

==================================================
12. GENRE ANALYSIS RESPONSIVE
==================================================

Desktop:
tabs + content rộng.

Tablet/mobile:
- tabs scroll ngang nếu cần;
- cards stack;
- argument map không overflow vô hạn.

Nếu argument map quá rộng:
cho phép internal horizontal scroll có chủ đích.

Không tạo body horizontal scroll.

==================================================
13. KHBD RESPONSIVE
==================================================

Desktop:
builder rộng.

Tablet:
- form giảm column;
- activity card vẫn dễ thao tác.

Mobile:
- fields stack;
- accordion full width;
- Document View phải fit hoặc cho zoom/scroll hợp lý.

Không để A4 preview phá viewport.

==================================================
14. DOCUMENT VIEW RESPONSIVE
==================================================

Nếu KHBD Document View mô phỏng A4:

Desktop:
giữ page preview.

Tablet/mobile:
- scale down;
hoặc
- horizontal scroll trong riêng preview container.

Không để toàn app horizontal scroll.

==================================================
15. QUESTION BANK RESPONSIVE
==================================================

Desktop:
Master–Detail 2 cột.

Tablet:
- list + editor có thể chuyển split nhỏ hơn hoặc drawer.

Mobile:
- list → chọn item;
- editor mở full width;
hoặc
- route/state chuyển màn.

Không ép 300px list + editor trên 375px.

==================================================
16. MATRIX RESPONSIVE
==================================================

Data table thường rộng.

Test:

Desktop:
full table.

Tablet/mobile:
cho phép:
- horizontal scroll trong table container;
- sticky first column nếu implemented;
- compact density.

Không:
- ép tất cả column xuống đến mức chữ 6px;
- làm vỡ cell.

==================================================
17. SPECIFICATION RESPONSIVE
==================================================

Tương tự Matrix.

Kiểm tra:
- table scroll region;
- filter;
- header;
- action buttons.

==================================================
18. EXAM BUILDER RESPONSIVE
==================================================

Desktop:
3 cột:
Sections | Questions | Statistics

Tablet:
có thể:
- Sections drawer;
- Questions main;
- Statistics drawer/panel.

Mobile:
ưu tiên Questions.
Sections/Statistics phải chuyển:
- tabs;
- drawer;
- bottom sheet;
theo architecture hiện tại.

Không cố giữ 3 cột.

==================================================
19. RUBRIC RESPONSIVE
==================================================

Rubric table có thể rộng.

Test:
- horizontal scroll riêng table;
- sticky criterion column nếu có;
- input vẫn đủ lớn;
- score field dễ nhập.

Mobile:
không được mất quality level columns ngoài khả năng truy cập.

==================================================
20. SLIDES STUDIO RESPONSIVE
==================================================

Desktop:
Thumbnail | Canvas | Inspector

Tablet:
- thumbnails compact;
- inspector drawer.

Mobile:
nếu editor không hỗ trợ mobile đầy đủ:
phải degrade hợp lý.

Ví dụ:
- canvas focus;
- thumbnail bottom strip;
- inspector drawer.

Nếu product intentionally desktop-only cho Slides editing:
ghi rõ limitation,
không tự bịa mobile editor.

==================================================
21. PRESENTATION MODE RESPONSIVE
==================================================

Kiểm tra:
- 16:9 canvas;
- fit viewport;
- không crop;
- controls vẫn truy cập được;
- landscape/portrait.

==================================================
22. EXPORT CENTER RESPONSIVE
==================================================

Desktop:
grid cards.

Tablet/mobile:
stack;
button full-width khi cần;
JSON textarea không tràn;
filename wrap hợp lý.

==================================================
23. MODAL RESPONSIVE
==================================================

Test mọi modal quan trọng.

Desktop:
centered fixed width.

Mobile:
max-width theo viewport;
margin 16px;
content scroll nội bộ;
footer action stack nếu cần.

Không để modal cao hơn viewport mà không scroll.

==================================================
24. DRAWER RESPONSIVE
==================================================

Test:
- width;
- max width;
- overlay;
- content scroll;
- close control.

Mobile drawer không nên vượt 100vw.

==================================================
25. DROPDOWN / POPOVER RESPONSIVE
==================================================

Kiểm tra:
- không vượt cạnh viewport;
- tự flip/reposition nếu library hỗ trợ;
- menu item readable;
- mobile có thể chuyển bottom sheet nếu thiết kế vậy.

==================================================
26. FORM RESPONSIVE
==================================================

Test:
- field widths;
- 2-column → 1-column;
- labels;
- textarea;
- inline action.

Không để label/input bị nén quá mức.

==================================================
27. BUTTON RESPONSIVE
==================================================

Mobile:
touch target đủ lớn.

Khuyến nghị:
>= 44×44 px cho action quan trọng/icon-only nếu phù hợp.

Kiểm tra:
- text wrap;
- full-width CTA khi cần;
- icon không lệch.

==================================================
28. TYPOGRAPHY RESPONSIVE
==================================================

Kiểm tra:

Page title
Section title
Reader
Button
Metadata

Không:
- scale chữ desktop quá lớn xuống mobile;
- dùng clamp vô kiểm soát;
- text clipping.

Reader mobile vẫn phải dễ đọc.

==================================================
29. LONG TEXT RESPONSIVE
==================================================

Dùng:

"Người lái đò Sông Đà"
"Kế hoạch bài dạy Ngữ văn lớp 12"
"Phân tích hình tượng người lính Tây Tiến"

Kiểm tra:
- title wrapping;
- breadcrumb;
- tab;
- button;
- table cell;
- modal.

==================================================
30. VIETNAMESE DIACRITICS
==================================================

Đặc biệt trên mobile:
không clipping dấu trên:
- button;
- line-height thấp;
- badge;
- heading.

==================================================
31. TOUCH INTERACTION
==================================================

Ở mobile/tablet:

Test:
- tap button;
- open drawer;
- tab;
- accordion;
- select;
- modal.

Không phụ thuộc hover cho action quan trọng.

==================================================
32. HOVER DEPENDENCY CHECK
==================================================

Tìm action chỉ xuất hiện bằng:

:hover

Ví dụ:
- delete;
- edit;
- row actions.

Trên mobile:
phải có cách truy cập khác.

Report nếu interaction chỉ dùng hover.

==================================================
33. TABLE RESPONSIVENESS
==================================================

Mỗi table phải chọn strategy rõ:

A. Horizontal scroll
B. Column priority/hide
C. Card conversion
D. Responsive stacked row

Không áp dụng ngẫu nhiên giữa các table cùng loại nếu không cần.

==================================================
34. SCROLL TEST
==================================================

Kiểm tra:

- body scroll;
- panel scroll;
- nested scroll;
- drawer scroll;
- modal scroll;
- table horizontal scroll.

Không để scroll trap.

==================================================
35. VIEWPORT HEIGHT TEST
==================================================

Không chỉ test width.

Test height thấp:
1366×768
1280×720

Kiểm tra:
- footer/sidebar;
- modal;
- editor;
- actions.

Không để button dưới fold mà container không scroll được.

==================================================
36. ORIENTATION TEST
==================================================

Tablet/mobile:

portrait
landscape

Kiểm tra reflow.

Không cần test mọi device.

==================================================
37. ZOOM TEST
==================================================

Nếu feasible:

Browser zoom:
125%
150%

Kiểm tra:
- navigation;
- text;
- form;
- modal;
- no critical overlap.

Đây có liên quan accessibility nhưng useful cho responsive.

==================================================
38. PLAYWRIGHT PROJECTS
==================================================

Có thể cấu hình:

desktop-1366
desktop-1440
desktop-1920
tablet
mobile

Ví dụ concept:

projects: [
  {
    name: "desktop-1366",
    use: {
      viewport: { width: 1366, height: 768 }
    }
  },
  {
    name: "desktop-1440",
    use: {
      viewport: { width: 1440, height: 900 }
    }
  },
  {
    name: "tablet",
    use: {
      viewport: { width: 768, height: 1024 }
    }
  },
  {
    name: "mobile",
    use: {
      viewport: { width: 390, height: 844 }
    }
  }
]

==================================================
39. AUTOMATED ASSERTIONS
==================================================

Không chỉ screenshot.

Có thể assert:

- sidebar visible/hidden;
- drawer exists;
- number of columns;
- element bounding box trong viewport;
- no horizontal page overflow;
- modal dimensions;
- key actions visible;
- text not clipped nếu detect được.

==================================================
40. OVERFLOW HELPER
==================================================

Có thể viết helper kiểm tra:

document.documentElement.scrollWidth >
document.documentElement.clientWidth

Nếu true:
report body horizontal overflow.

Nhưng cho phép component có internal horizontal scroll riêng.

==================================================
41. ELEMENT VIEWPORT CHECK
==================================================

Với CTA quan trọng:

boundingBox phải nằm trong viewport hoặc scroll container hợp lệ.

Không nhất thiết mọi element cùng lúc phải visible.

==================================================
42. SCREENSHOT SUPPORT
==================================================

Có thể chụp screenshot theo viewport để hỗ trợ evidence.

Nhưng:
Responsive Testing ≠ chỉ screenshot.

Dùng screenshot để:
- debug;
- evidence;
- confirm layout transformation.

==================================================
43. TEST STRUCTURE
==================================================

Tạo:

tests/
└── responsive/
    ├── shell.responsive.spec.ts
    ├── dashboard.responsive.spec.ts
    ├── reader.responsive.spec.ts
    ├── genre.responsive.spec.ts
    ├── khbd.responsive.spec.ts
    ├── question.responsive.spec.ts
    ├── matrix.responsive.spec.ts
    ├── exam.responsive.spec.ts
    ├── rubric.responsive.spec.ts
    ├── slides.responsive.spec.ts
    ├── export.responsive.spec.ts
    └── overlays.responsive.spec.ts

==================================================
44. TEST CASE FORMAT
==================================================

Trong:

docs/testing/09_RESPONSIVE_TESTING.md

Mỗi case:

ID:
Screen:
Viewport:
Breakpoint:
Precondition:
Expected Layout:
Expected Behavior:
Overflow:
Result:
Automated:
Evidence:

Ví dụ:

RESP-READER-001

Viewport:
1440×900

Expected:
Outline + Reader + Insight cùng hiển thị.

RESP-READER-002

Viewport:
390×844

Expected:
Reader một cột,
Outline/Insight không chiếm cố định chiều ngang.

==================================================
45. PRIORITY
==================================================

P0:
- App Shell;
- Dashboard;
- Literature Reader;
- KHBD;
- Question Bank;
- Exam;
- Modal;
- Navigation.

P1:
- Matrix;
- Rubric;
- Slides;
- Export;
- Genre Analysis.

P2:
- minor secondary panels.

==================================================
46. BREAKPOINT BUG SEVERITY
==================================================

Critical:
- không thao tác được;
- content biến mất;
- navigation inaccessible;
- app unusable.

High:
- horizontal body scroll nghiêm trọng;
- panel overlap;
- CTA bị che;
- modal không đóng được.

Medium:
- awkward wrapping;
- table khó dùng;
- spacing lỗi rõ.

Low:
- minor alignment;
- cosmetic spacing.

==================================================
47. RESPONSIVE BUG FORMAT
==================================================

RESP-BUG-001

Screen:
Viewport:
Orientation:
Steps:
Expected:
Actual:
Overflow:
Severity:
Screenshot:
Root Cause:
Fix:
Retest:

==================================================
48. FIX STRATEGY
==================================================

Nếu tìm thấy bug:

Ưu tiên sửa bằng:
- responsive layout rule;
- shared breakpoint/token;
- grid/flex;
- min-width: 0;
- overflow strategy;
- drawer;
- stack.

Không fix bằng:
- hard-code theo đúng 1 device;
- absolute positioning bừa;
- font-size cực nhỏ.

==================================================
49. COMMON CSS ISSUES CẦN TÌM
==================================================

Audit:

min-width thiếu
min-height thiếu
w-[fixed]
h-[fixed]
overflow-hidden sai chỗ
absolute positioning
100vw
calc()
white-space: nowrap
grid columns cố định
flex child không min-w-0

Đặc biệt trong:
3-column editors.

==================================================
50. 1366×768 P0
==================================================

Đây là resolution ưu tiên của project.

Bắt buộc verify kỹ:

- Sidebar 248px;
- TopBar;
- Reader 3-column;
- Exam 3-column;
- KHBD;
- Slides.

Không được coi desktop lớn 1920 là đủ.

==================================================
51. MOBILE SUPPORT LEVEL
==================================================

Sau audit, phân loại từng module:

FULL
PARTIAL
VIEW-ONLY
DESKTOP-RECOMMENDED

Ví dụ:
Slides Studio có thể là DESKTOP-RECOMMENDED nếu architecture không phù hợp mobile.

Không báo "responsive hoàn hảo" nếu thực tế chỉ view được.

==================================================
52. REPORT
==================================================

Cập nhật:

docs/testing/09_RESPONSIVE_TESTING.md

Bao gồm:

# Responsive Testing Report

## 1. Scope
## 2. Breakpoint Strategy
## 3. Devices/Viewports
## 4. App Shell
## 5. Dashboard
## 6. Literature Workspace
## 7. Genre Analysis
## 8. KHBD
## 9. Question Bank
## 10. Matrix
## 11. Exam
## 12. Rubric
## 13. Slides
## 14. Export
## 15. Overlay Components
## 16. Overflow Findings
## 17. Touch Findings
## 18. Bugs
## 19. Fixes
## 20. Mobile Support Matrix
## 21. Remaining Limitations

==================================================
53. EXECUTION
==================================================

Chạy:

npx playwright test tests/responsive

Có thể chạy riêng project:

npx playwright test tests/responsive --project=desktop-1366

npx playwright test tests/responsive --project=mobile

Sau khi fix:

npm run build

Nếu có:
npm run lint

Chạy lại smoke nếu layout shell bị sửa:

npx playwright test tests/smoke

==================================================
54. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

Viewports tested:
N

Screens tested:
N

Body overflow issues:
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

Mobile support:
FULL / PARTIAL / DESKTOP-RECOMMENDED
theo từng module.

QUAN TRỌNG:

Responsive Testing phải xác nhận:

"Người dùng vẫn đọc được, hiểu được và thao tác được khi kích thước màn hình thay đổi."

Không chỉ:

"CSS không bị vỡ quá nhiều."

Quy trình:

AUDIT BREAKPOINTS
→ DEFINE VIEWPORTS
→ TEST REFLOW
→ TEST INTERACTION
→ CHECK OVERFLOW
→ FIX
→ RETEST
→ REPORT