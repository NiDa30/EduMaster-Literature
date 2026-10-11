Bạn là Senior QA Engineer + Accessibility Specialist + Frontend Quality Engineer.

NHIỆM VỤ:
Thiết kế và triển khai ACCESSIBILITY TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Xác nhận ứng dụng có thể sử dụng được bằng bàn phím, screen reader và các công cụ hỗ trợ cơ bản.
- Kiểm tra semantic HTML, focus, contrast, ARIA, form labels, modal/dialog, keyboard flow và reduced motion.
- Ưu tiên WCAG 2.2 AA ở mức thực tế phù hợp cho project.
- Không biến Accessibility Testing thành Visual Testing.
- Không chỉ chạy axe rồi kết luận.
- Phải kết hợp automation + manual keyboard audit + semantic review.
- Không thay đổi business logic nếu không cần.

==================================================
1. ĐỌC PROJECT VÀ CÁC REPORT TRƯỚC
==================================================

Đọc:

docs/UI_REFERENCE_AUDIT.md
docs/UI_REFACTOR_PLAN.md
docs/UI_REFACTOR_REPORT.md
docs/VISUAL_POLISH_REPORT.md nếu có

Đọc các report đã có:

docs/testing/04_FUNCTIONAL_TESTING.md
docs/testing/05_INTERACTION_TESTING.md
docs/testing/06_SMOKE_TESTING.md
docs/testing/07_VISUAL_TESTING.md
docs/testing/08_CONSISTENCY_TESTING.md
docs/testing/09_RESPONSIVE_TESTING.md

Đọc source:

src/App.tsx
src/index.css
src/theme/tokens.ts
src/components/common/
src/components/

Tìm:
- button
- a
- input
- textarea
- select
- label
- dialog
- role=
- aria-
- tabIndex
- onKeyDown
- focus
- sr-only
- visually-hidden
- icon-only button
- tooltip
- modal
- drawer
- tabs
- accordion

==================================================
2. ACCESSIBILITY BASELINE
==================================================

Mục tiêu chính:

WCAG 2.2 AA

Ưu tiên các nguyên tắc:

Perceivable
Operable
Understandable
Robust

Không cần claim "WCAG compliant" tuyệt đối nếu chưa có audit đầy đủ bởi chuyên gia.

Report nên dùng wording:

"Accessibility tested against WCAG 2.2 AA criteria relevant to this application."

==================================================
3. TOOLING
==================================================

Ưu tiên:

Playwright
+
@axe-core/playwright

Nếu chưa có:

npm install -D @axe-core/playwright

Có thể dùng:
axe-core

Không cần cài nhiều tool trùng chức năng.

==================================================
4. AUTOMATED AXE TEST
==================================================

Tạo accessibility scan cho các màn hình chính:

Dashboard
Literature Workspace
Genre Analysis
KHBD
Question Bank
Matrix
Exam
Rubric
Slides
Export

Ví dụ:

const results = await new AxeBuilder({ page }).analyze();

expect(results.violations).toEqual([]);

Nhưng:

Không được chỉ dựa vào axe.

Một số lỗi keyboard/focus/usability phải test manual hoặc bằng interaction automation.

==================================================
5. DOCUMENT STRUCTURE
==================================================

Kiểm tra:

- <html lang="vi">
- title hợp lý;
- heading hierarchy;
- landmark;
- main;
- nav;
- aside;
- header;
- footer khi phù hợp.

Không dùng div cho tất cả mọi thứ nếu semantic HTML tốt hơn.

==================================================
6. HEADING HIERARCHY
==================================================

Kiểm tra:

h1
h2
h3
...

Không:
h1 → h4 vô lý

Mỗi screen nên có heading structure hợp lý.

Page title nên là heading chính.

Card title không nhất thiết phải là heading nếu không có semantic hierarchy.

==================================================
7. LANDMARKS
==================================================

Kiểm tra:

Sidebar:
nav

Main content:
main

TopBar:
header nếu phù hợp

Reader outline:
nav/aside nếu semantic phù hợp

Insight:
aside nếu hợp lý

Không lạm dụng role.

==================================================
8. KEYBOARD NAVIGATION
==================================================

P0.

Chạy toàn app chỉ bằng:

Tab
Shift+Tab
Enter
Space
Arrow keys
Esc

Kiểm tra:

- không bị mắc focus;
- không mất focus;
- không cần chuột cho action quan trọng;
- tab order hợp lý;
- focus không nhảy bất thường.

==================================================
9. TAB ORDER
==================================================

Audit thứ tự focus:

Sidebar
→ TopBar
→ Main controls
→ Content actions

Không để focus đi tới:
- hidden element;
- offscreen button;
- duplicate control;
- decorative item.

==================================================
10. FOCUS VISIBLE
==================================================

Mọi interactive element phải có focus-visible rõ.

Test:

button
link
input
select
textarea
tab
menu item
accordion trigger
icon button

Không được:

outline: none

mà không có replacement.

==================================================
11. FOCUS RING
==================================================

Focus ring phải đủ contrast.

Theo design system:

brand/burgundy subtle ring
2–3px

Không dùng focus state quá nhẹ đến mức khó thấy.

==================================================
12. MODAL FOCUS MANAGEMENT
==================================================

P0.

Khi mở modal:

- focus chuyển vào modal;
- focus bị trap trong modal;
- Tab không ra background;
- Esc đóng nếu expected;
- đóng modal → focus trả về trigger.

Test:
- Confirm;
- Cancel;
- close icon.

==================================================
13. DRAWER FOCUS
==================================================

Nếu tablet/mobile dùng Drawer:

test tương tự modal:
- focus trap;
- close;
- return focus;
- background không interactive nếu overlay active.

==================================================
14. DROPDOWN / MENU
==================================================

Kiểm tra:
- trigger bằng Enter/Space;
- keyboard navigation;
- Arrow keys nếu component hỗ trợ;
- Esc đóng;
- selected state được announce nếu relevant.

==================================================
15. TABS ACCESSIBILITY
==================================================

Nếu dùng tabs:

Kiểm tra:
- role="tablist"
- role="tab"
- role="tabpanel"
- aria-selected
- aria-controls
- keyboard ArrowLeft/ArrowRight nếu component đúng pattern.

Không chỉ dùng button visual tab mà thiếu semantics.

==================================================
16. ACCORDION ACCESSIBILITY
==================================================

Kiểm tra:
- trigger là button;
- aria-expanded;
- aria-controls;
- Enter/Space;
- collapsed content không focus được nếu hidden.

==================================================
17. BUTTON SEMANTICS
==================================================

Kiểm tra:

- action dùng <button>;
- navigation dùng <a> khi phù hợp;
- không dùng div onClick cho button semantics.

Nếu bắt buộc div:
phải có role/tabIndex/keyboard handling,
nhưng ưu tiên button thật.

==================================================
18. ICON-ONLY BUTTON
==================================================

P0.

Các icon button như:
- Close
- More
- Export
- Focus
- Delete
- Edit

phải có accessible name.

Dùng:
aria-label
hoặc visible tooltip không phải nguồn duy nhất.

Ví dụ:
aria-label="Đóng hộp thoại"

==================================================
19. IMAGE ALT TEXT
==================================================

Nếu có ảnh:

- informative image → alt mô tả;
- decorative image → alt="";
- không nhét filename vào alt.

Nếu không có ảnh đáng kể:
ghi N/A.

==================================================
20. FORM LABELS
==================================================

Mọi input phải có label.

Kiểm tra:
- label for;
- id;
- aria-label;
- aria-labelledby.

Placeholder không thay thế label.

==================================================
21. REQUIRED FIELDS
==================================================

Nếu required:

- semantic required;
- visual marker;
- screen reader hiểu được.

Không chỉ dùng dấu * đỏ mà không có semantics.

==================================================
22. ERROR MESSAGE ACCESSIBILITY
==================================================

Khi validation fail:

- message phải liên kết với field;
- aria-describedby nếu phù hợp;
- aria-invalid;
- focus/announce hợp lý.

Không chỉ đổi border đỏ.

==================================================
23. FORM ERROR SUMMARY
==================================================

Nếu form lớn như KHBD hoặc Create Lesson:

cân nhắc summary khi nhiều lỗi.

Nếu project chưa có:
không bắt buộc tạo phức tạp nếu không cần,
nhưng report limitation.

==================================================
24. COLOR CONTRAST
==================================================

Kiểm tra contrast cho:

Text primary
Text secondary
Buttons
Links
Badges
Input placeholder
Focus indicator
Error text

Target:
WCAG AA relevant.

Thông thường:
4.5:1 cho text thường
3:1 cho large text/UI component tùy criterion.

Không đoán bằng mắt.

==================================================
25. COLOR-ONLY MEANING
==================================================

Không truyền meaning chỉ bằng màu.

Ví dụ:

Exam score:
green/red

phải kèm:
- icon;
- text;
- label.

Status:
"Đạt"
"Cảnh báo"
"Lỗi"

không chỉ dot màu.

==================================================
26. TEXT RESIZE
==================================================

Test browser zoom:

200%

Kiểm tra:
- nội dung không mất;
- controls usable;
- text không bị clipping;
- modal usable;
- no critical overlap.

Nếu full desktop editor có limitation:
report cụ thể.

==================================================
27. REFLOW
==================================================

Ở zoom/high text scale:

- nội dung phải reflow hợp lý;
- không mất chức năng;
- không cần scroll hai chiều ngoài component đặc thù như table.

Có liên quan Responsive Testing nhưng ở đây tập trung accessibility zoom/reflow.

==================================================
28. TOUCH TARGET
==================================================

Kiểm tra các icon-only action nhỏ.

Ưu tiên target đủ lớn và có spacing.

Không cần tất cả phải visual 44px nếu clickable area lớn hơn,
nhưng phải dễ tương tác.

==================================================
29. READER ACCESSIBILITY
==================================================

P0 riêng cho EduMaster Văn.

Kiểm tra:

- text selectable;
- text readable;
- semantic paragraph;
- heading/section hợp lý;
- quote nếu có dùng blockquote khi phù hợp;
- outline navigation có accessible names;
- annotation controls keyboard accessible.

Không phá trải nghiệm đọc bằng quá nhiều focus target không cần thiết.

==================================================
30. TEXT SELECTION TOOLBAR
==================================================

Đây là component khó.

Kiểm tra:

- có thể thao tác bằng keyboard hay không;
- accessible name cho từng action;
- toolbar không lấy focus vô lý;
- nếu toolbar chỉ xuất hiện khi mouse selection thì phải xem có alternative keyboard path hay không.

Nếu chưa có:
report accessibility gap.

==================================================
31. HIGHLIGHT ACCESSIBILITY
==================================================

Highlight không được chỉ khác màu.

Nếu highlight mang meaning:
cân nhắc metadata/label/annotation accessible.

Không cần screen reader đọc màu highlight.

==================================================
32. ANNOTATION / NOTE
==================================================

Kiểm tra:
- note trigger accessible;
- note content đọc được;
- edit/delete bằng keyboard;
- focus management.

==================================================
33. QUESTION BANK ACCESSIBILITY
==================================================

Kiểm tra:

- filter labels;
- list selection;
- selected question state;
- editor form;
- validation;
- delete confirmation.

Master-detail phải có structure dễ hiểu.

==================================================
34. MATRIX TABLE ACCESSIBILITY
==================================================

P0 cho data table.

Kiểm tra:

- table semantics;
- th;
- scope;
- headers;
- caption nếu phù hợp;
- editable cell có accessible name;
- keyboard navigation khả thi.

Không dùng div grid nếu table semantic phù hợp hơn.

==================================================
35. EXAM BUILDER ACCESSIBILITY
==================================================

Kiểm tra:

- sections navigation;
- question list;
- selected question;
- score/status;
- controls;
- 3-column reading order.

DOM order phải hợp lý,
không chỉ visual order.

==================================================
36. RUBRIC TABLE
==================================================

Kiểm tra:
- headers;
- row/column association;
- editable score fields;
- criterion names;
- total score announcement nếu dynamic và cần.

==================================================
37. SLIDES STUDIO ACCESSIBILITY
==================================================

Kiểm tra:

- thumbnail accessible name;
- selected slide;
- add/delete;
- editor controls;
- inspector controls;
- presentation mode.

Nếu canvas content không screen-reader friendly:
report limitation và alternative nếu có.

==================================================
38. PRESENTATION MODE
==================================================

Keyboard:
ArrowRight
ArrowLeft
Space
Esc

Kiểm tra:
- controls accessible;
- current slide identifiable;
- no keyboard trap.

==================================================
39. STATUS ANNOUNCEMENT
==================================================

Dynamic states như:

"Đã lưu"
"Đang lưu"
"Xuất thành công"
"Lỗi"

nếu quan trọng có thể dùng:

aria-live

Nhưng không làm screen reader spam liên tục.

==================================================
40. TOAST ACCESSIBILITY
==================================================

Toast success/info:
role=status hoặc appropriate live region.

Error:
role=alert nếu urgent.

Không dùng role=alert cho mọi toast.

==================================================
41. LOADING STATE
==================================================

Nếu loading:

- aria-busy;
- accessible status nếu cần;
- loading spinner có accessible name hoặc decorative đúng.

==================================================
42. TOOLTIP ACCESSIBILITY
==================================================

Tooltip:
- không chỉ mouse hover;
- keyboard focus cũng hiển thị nếu cần;
- không chứa action bắt buộc;
- aria-describedby nếu phù hợp.

==================================================
43. SCREEN READER BASIC TEST
==================================================

Nếu môi trường cho phép manual test:

Windows:
NVDA + Chrome/Firefox

Kiểm tra một số flow đại diện:

Dashboard
→ mở lesson
→ Reader
→ Question Builder
→ modal

Không cần kiểm mọi màn hình bằng screen reader ở vòng đầu.

==================================================
44. WINDOWS HIGH CONTRAST
==================================================

Nếu feasible:
kiểm tra Windows High Contrast/Forced Colors.

Focus, button, input không được biến mất hoàn toàn.

Nếu chưa support:
ghi limitation.

==================================================
45. REDUCED MOTION
==================================================

Test:

prefers-reduced-motion: reduce

Kiểm tra:
- modal;
- toolbar;
- dropdown;
- transitions;
- smooth scroll.

Motion không thiết yếu phải giảm/tắt.

==================================================
46. LANGUAGE ATTRIBUTE
==================================================

App tiếng Việt:

<html lang="vi">

Nếu có đoạn English dài riêng biệt:
lang attribute có thể dùng nếu thực sự cần.

==================================================
47. PAGE TITLE
==================================================

Kiểm tra document title có ý nghĩa.

Ví dụ:
EduMaster Văn

Nếu app cập nhật theo module:
càng tốt, nhưng không bắt buộc nếu scope hiện tại không có.

==================================================
48. SKIP LINK
==================================================

Với app shell sidebar dài:

đánh giá nhu cầu:

"Bỏ qua điều hướng"
→ main content

Nếu keyboard user phải tab qua nhiều menu mỗi lần,
nên cân nhắc skip link.

Nếu implement:
chỉ visible on focus.

==================================================
49. ARIA AUDIT
==================================================

Search:

aria-hidden
aria-label
aria-labelledby
aria-describedby
aria-expanded
aria-selected
aria-controls
role

Kiểm tra:
- không duplicate;
- không invalid;
- không aria-hidden trên focusable child;
- không dùng ARIA thay semantic HTML khi không cần.

Nguyên tắc:

No ARIA is better than bad ARIA.

==================================================
50. DUPLICATE ID
==================================================

Kiểm tra DOM không có duplicate id,
đặc biệt:
- form;
- modal;
- tabs.

==================================================
51. ACCESSIBLE NAME DUPLICATION
==================================================

Kiểm tra nhiều icon button cùng accessible name mơ hồ:

"Edit"
"Edit"
"Edit"

Nếu context không đủ:
dùng:
"Chỉnh sửa câu hỏi 3"
hoặc accessible relation phù hợp.

==================================================
52. AUTOMATED TEST STRUCTURE
==================================================

Tạo:

tests/
└── accessibility/
    ├── dashboard.a11y.spec.ts
    ├── reader.a11y.spec.ts
    ├── genre.a11y.spec.ts
    ├── khbd.a11y.spec.ts
    ├── question.a11y.spec.ts
    ├── matrix.a11y.spec.ts
    ├── exam.a11y.spec.ts
    ├── rubric.a11y.spec.ts
    ├── slides.a11y.spec.ts
    ├── export.a11y.spec.ts
    └── keyboard.a11y.spec.ts

==================================================
53. SAMPLE AXE TEST
==================================================

Ví dụ:

import AxeBuilder from "@axe-core/playwright";

test("dashboard has no serious accessibility violations", async ({ page }) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page })
    .analyze();

  expect(
    results.violations.filter(v =>
      ["critical", "serious"].includes(v.impact ?? "")
    )
  ).toEqual([]);
});

Không nhất thiết fail CI ngay cho minor violations ở vòng đầu.

==================================================
54. KEYBOARD AUTOMATION
==================================================

Ví dụ:

await page.keyboard.press("Tab");

Kiểm tra:

await expect(locator).toBeFocused();

Viết representative keyboard flows.

Không cần automate mọi tab stop nếu quá brittle.

==================================================
55. MANUAL CHECKLIST
==================================================

Tạo manual checklist gồm:

- Keyboard-only
- Screen reader basic
- Zoom 200%
- Reduced motion
- Contrast
- Touch targets
- Focus management

Automation không thay thế hoàn toàn manual accessibility testing.

==================================================
56. ACCESSIBILITY TEST CASE FORMAT
==================================================

Trong:

docs/testing/10_ACCESSIBILITY_TESTING.md

Mỗi case:

ID:
WCAG Area:
Screen/Component:
Priority:
Precondition:
Steps:
Expected:
Tool:
Automated/Manual:
Result:
Evidence:

Ví dụ:

A11Y-MODAL-001

Area:
Keyboard / Focus

Expected:
Focus nằm trong dialog và trả về trigger khi đóng.

==================================================
57. SEVERITY
==================================================

Critical:
- không thể sử dụng chức năng chính bằng keyboard;
- screen reader không tiếp cận được core content;
- focus trap không thoát được.

High:
- control không có accessible name;
- modal focus lỗi;
- serious contrast issue;
- form thiếu label ở field chính.

Medium:
- heading hierarchy;
- minor contrast;
- unclear status.

Low:
- non-critical semantic improvement.

==================================================
58. PRIORITY
==================================================

P0:
- Keyboard navigation
- Focus
- Modal/Dialog
- Form labels
- Reader
- Question Builder
- Exam
- Matrix
- Contrast critical

P1:
- Tabs
- Accordion
- Toast
- Slides
- Rubric
- Export

P2:
- Tooltips
- decorative semantics
- minor structural improvements.

==================================================
59. ACCESSIBILITY BUG FORMAT
==================================================

A11Y-BUG-001

WCAG criterion:
Screen:
Component:
Assistive Technology:
Steps:
Expected:
Actual:
Impact:
Severity:
Evidence:
Fix:
Retest:

==================================================
60. FIX STRATEGY
==================================================

Ưu tiên:

semantic HTML
→ native behavior
→ ARIA nếu thật sự cần.

Ví dụ:

div onClick
→ button

Không sửa bằng hàng loạt aria-label để che semantic HTML sai.

==================================================
61. DO NOT OVER-ARIA
==================================================

Không thêm:
role="button"
vào button.

Không thêm:
aria-label
nếu visible label đã đủ accessible name.

Không thêm:
aria-live
cho mọi state.

ARIA phải có lý do.

==================================================
62. REGRESSION
==================================================

Sau khi fix accessibility:

chạy lại:

Interaction tests
Responsive tests
Visual tests relevant

Vì semantic/component refactor có thể ảnh hưởng UI.

==================================================
63. REPORT
==================================================

Cập nhật:

docs/testing/10_ACCESSIBILITY_TESTING.md

Bao gồm:

# Accessibility Testing Report

## 1. Scope
## 2. Standard
## 3. Tools
## 4. Automated Scan
## 5. Keyboard Testing
## 6. Focus Testing
## 7. Semantic HTML
## 8. Forms
## 9. Color Contrast
## 10. Reader Accessibility
## 11. Tables
## 12. Dialogs/Overlays
## 13. Screen Reader Findings
## 14. Zoom/Reflow
## 15. Reduced Motion
## 16. Violations
## 17. Fixes
## 18. Remaining Limitations
## 19. Recommendations

==================================================
64. EXECUTION
==================================================

Chạy:

npx playwright test tests/accessibility

Sau đó:

npm run build

Nếu có:
npm run lint
npm run test:run

Nếu sửa interaction:
chạy:

npx playwright test tests/interaction

==================================================
65. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

Screens audited:
N

Axe violations:
N

Critical:
N

Serious/High:
N

Medium:
N

Low:
N

Keyboard blockers:
N

Focus issues:
N

Contrast issues:
N

Form label issues:
N

Fixed:
N

Remaining:
N

Accessibility status:
PASS / PASS WITH ISSUES / FAIL

QUAN TRỌNG:

Accessibility Testing không chỉ là:

"axe báo 0 lỗi"

mà phải xác nhận:

"Người dùng không dùng chuột, người dùng screen reader hoặc người dùng cần zoom/reduced motion vẫn có thể hoàn thành các tác vụ chính."

Quy trình:

AUDIT SEMANTICS
→ AUTOMATED SCAN
→ KEYBOARD TEST
→ FOCUS TEST
→ CONTRAST
→ SCREEN READER BASIC
→ FIX
→ RETEST
→ REPORT