Bạn là Senior QA Engineer + Design System QA Specialist + Frontend Consistency Auditor.

NHIỆM VỤ:
Thiết kế và triển khai CONSISTENCY TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Kiểm tra toàn bộ hệ thống có dùng UI pattern, component, spacing, typography, màu sắc, trạng thái và interaction một cách nhất quán hay không.
- Phát hiện tình trạng "mỗi màn hình một kiểu".
- Kiểm tra sự nhất quán giữa design tokens, shared components và implementation thực tế.
- Không biến Consistency Testing thành Visual Regression Testing.
- Không chỉ chụp screenshot rồi so ảnh.
- Phải audit theo rule/design system và xác định nơi phá vỡ pattern chung.
- Không thay đổi business logic.

==================================================
1. ĐỌC DESIGN SYSTEM TRƯỚC KHI TEST
==================================================

Đọc:

docs/UI_REFERENCE_AUDIT.md
docs/UI_REFACTOR_PLAN.md
docs/UI_REFACTOR_REPORT.md
docs/VISUAL_POLISH_REPORT.md nếu có

Đọc:

src/theme/tokens.ts
src/index.css
src/components/common/
src/components/Sidebar.tsx
src/components/TopBar.tsx

Đọc các test report trước:

docs/testing/04_FUNCTIONAL_TESTING.md
docs/testing/05_INTERACTION_TESTING.md
docs/testing/06_SMOKE_TESTING.md
docs/testing/07_VISUAL_TESTING.md

Từ source hiện tại, xác định design rules thực tế.

Không dùng assumption bên ngoài project nếu design system hiện tại đã có rule rõ.

==================================================
2. TẠO CONSISTENCY INVENTORY
==================================================

Lập inventory các component/pattern:

- App Shell
- Sidebar
- TopBar
- Page Header
- Section Header
- Buttons
- Inputs
- Select
- Textarea
- Tabs
- Accordion
- Modal
- Drawer
- Dropdown
- Popover
- Tooltip
- Badge
- Status Badge
- Card
- Table
- Filter Bar
- Empty State
- Toast
- Stat Card
- Progress Bar
- Icon Button
- Form Label
- Error Message

Và các module:

- Dashboard
- Literature Workspace
- Genre Analysis
- KHBD
- Question Bank
- Matrix
- Specification
- Exam
- Rubric
- Slides
- Export

Ghi vào:

docs/testing/08_CONSISTENCY_TESTING.md

==================================================
3. MỤC TIÊU CONSISTENCY TEST
==================================================

Consistency Testing phải trả lời:

"Cùng một loại đối tượng hoặc trạng thái trong toàn hệ thống có được thể hiện theo cùng một quy luật không?"

Ví dụ:

Primary Button ở Dashboard
phải cùng language với
Primary Button trong KHBD
và Exam.

Không nhất thiết pixel giống tuyệt đối,
nhưng phải cùng design token, hierarchy và behavior.

==================================================
4. COLOR CONSISTENCY
==================================================

Audit toàn bộ màu trong project.

Kiểm tra:
- brand color;
- semantic colors;
- text;
- border;
- background;
- focus ring;
- status.

Design direction hiện tại:

Brand:
Burgundy

Semantic:
Success → Emerald
Warning → Amber
Danger → Red/Rose
Info → Blue/Slate

Kiểm tra:
- không component tự invent accent color;
- không module dùng màu riêng vô lý;
- không có purple/teal/random color chỉ để trang trí;
- active state dùng cùng brand logic.

==================================================
5. HARD-CODED COLOR AUDIT
==================================================

Search toàn source:

#
rgb(
rgba(
hsl(
bg-[
text-[
border-[

Xác định những màu hard-code ngoài token system.

Phân loại:

A. hợp lệ có lý do
B. legacy
C. inconsistency
D. cần chuyển về token

Không tự sửa tất cả nếu màu đặc thù có chủ đích.

==================================================
6. TYPOGRAPHY CONSISTENCY
==================================================

Kiểm tra:

UI:
Be Vietnam Pro

Reader:
Lora / serif approved

Audit hierarchy:

Page Title
Section Title
Card Title
Body
Metadata
Caption

Kiểm tra:
- cùng page title có cùng size/weight;
- cùng metadata không màn 12px màn 14px vô lý;
- Reader không dùng UI font nếu không có lý do;
- button typography nhất quán.

==================================================
7. SPACING CONSISTENCY
==================================================

Xác định spacing scale thực tế.

Ví dụ:
4
8
12
16
20
24
32

Audit:
- page padding;
- card padding;
- gap;
- form spacing;
- section spacing;
- toolbar spacing.

Tìm các giá trị lẻ bất thường:

13px
17px
23px
29px

Nếu không có lý do,
report inconsistency.

Không bắt mọi spacing phải giống nhau;
phải cùng scale.

==================================================
8. BORDER RADIUS CONSISTENCY
==================================================

Audit:

Button
Input
Card
Panel
Modal
Badge
Popover
Toolbar

Ví dụ expected system:
- button/input: 8–10px
- card: 10–12px
- modal: 14–16px
- badge: pill hoặc small radius

Kiểm tra:
không có màn hình dùng radius 4px,
màn khác 24px
cho cùng loại component.

==================================================
9. BORDER CONSISTENCY
==================================================

Audit:
- thickness;
- color;
- selected state;
- divider;
- error border.

Expected:
mostly 1px subtle warm-neutral.

Không để:
- border đen;
- border quá đậm;
- module tự có style riêng.

==================================================
10. SHADOW CONSISTENCY
==================================================

Audit:
- cards;
- dropdown;
- modal;
- floating toolbar;
- slide canvas.

Expected elevation hierarchy:

Level 0
Level 1
Level 2
Level 3

Kiểm tra:
- card thường không shadow nặng;
- modal có shadow mạnh hơn card;
- dropdown không nhẹ hơn page card nếu design system ngược logic;
- không random shadow.

==================================================
11. BUTTON CONSISTENCY
==================================================

Audit variants:

Primary
Secondary
Ghost
Outline
Destructive
Icon

Kiểm tra:
- height;
- padding;
- radius;
- font;
- icon gap;
- hover;
- focus;
- disabled;
- loading.

Không để cùng Primary Button mà:

Dashboard:
burgundy filled

Exam:
blue gradient

Export:
black filled

trừ khi có semantic reason.

==================================================
12. CTA HIERARCHY
==================================================

Mỗi màn hình phải có hierarchy hợp lý:

1 primary action
secondary actions
tertiary/ghost actions

Kiểm tra:
- không có 5 primary buttons cùng lúc;
- destructive không ngang visual priority với primary;
- secondary action không nổi hơn main task.

==================================================
13. ICON CONSISTENCY
==================================================

Audit icon library.

Ưu tiên cùng một library, ví dụ Lucide.

Kiểm tra:
- stroke width;
- size;
- alignment;
- icon-only button;
- filled vs outline;
- random emoji/icon mixing.

Không để:
- Sidebar dùng Lucide
- Dashboard dùng Font Awesome
- Exam dùng emoji

nếu không có lý do.

==================================================
14. ICON SIZE SYSTEM
==================================================

Ví dụ:

small:
14–16px

normal:
16–18px

action:
18–20px

large decorative:
24–32px

Kiểm tra cùng context có cùng scale.

==================================================
15. BADGE CONSISTENCY
==================================================

Audit:
- status;
- level;
- type;
- completion;
- warning.

Kiểm tra:
- height;
- padding;
- font;
- color semantic;
- border;
- radius.

Không dùng badge cho metadata bình thường nếu không cần.

==================================================
16. STATUS LANGUAGE CONSISTENCY
==================================================

Ví dụ:

"Hoàn thành"
"Đã hoàn thành"
"Complete"
"Done"

Nếu cùng meaning,
phải dùng terminology nhất quán.

Audit toàn bộ wording.

Đặc biệt:
- Autosave
- Status
- Error
- Empty state
- Validation

==================================================
17. TERMINOLOGY CONSISTENCY
==================================================

P0 cho domain.

Kiểm tra thuật ngữ:

"Bài dạy"
"Tác phẩm"
"Ngữ liệu"
"Yêu cầu cần đạt"
"Ma trận"
"Bản đặc tả"
"Ngân hàng câu hỏi"
"Đề kiểm tra"
"Rubric"
"Hướng dẫn chấm"
"Slide bài giảng"

Không để cùng entity bị gọi nhiều tên khác nhau ngoài ý muốn.

Ví dụ:
"Question Bank"
ở màn này,
"Kho câu hỏi"
ở màn khác,
"Questions"
ở menu.

Chọn terminology chính theo project hiện tại.

==================================================
18. LANGUAGE CONSISTENCY
==================================================

UI tiếng Việt phải nhất quán.

Không mix:

Save
Lưu
Submit
Xác nhận

trừ khi thuật ngữ kỹ thuật có chủ đích.

Audit:
- button;
- tab;
- modal;
- toast;
- validation;
- tooltip.

==================================================
19. PAGE HEADER CONSISTENCY
==================================================

Mỗi module nên có pattern chung:

Title
Description/Context
Actions

Kiểm tra:
- alignment;
- height;
- spacing;
- CTA placement;
- breadcrumb.

Không để mỗi page tự invent header.

==================================================
20. SECTION HEADER CONSISTENCY
==================================================

Audit:
- heading;
- metadata;
- action button;
- divider;
- spacing.

==================================================
21. CARD CONSISTENCY
==================================================

Audit:

- radius;
- border;
- padding;
- title placement;
- action placement;
- hover;
- selected state.

Phân biệt:

Static card
Interactive card
Metric card
Document card

Nhưng mỗi variant phải nhất quán.

==================================================
22. TABLE CONSISTENCY
==================================================

Audit:

Recent Lessons
Matrix
Specification
Rubric
Question lists nếu table

Kiểm tra:
- header height;
- row height;
- alignment;
- hover;
- selected;
- divider;
- empty state;
- pagination nếu có.

Không để mỗi table một style khác.

==================================================
23. FORM CONSISTENCY
==================================================

Audit:

Label
Input
Textarea
Select
Checkbox
Radio
Help text
Error

Kiểm tra:
- label position;
- required marker;
- placeholder;
- field height;
- focus ring;
- validation location.

==================================================
24. VALIDATION CONSISTENCY
==================================================

Kiểm tra error state:

- màu;
- icon;
- border;
- text;
- placement.

Không để:
- form A error dưới field
- form B alert trên cùng
- form C toast
cho cùng loại validation nếu không có lý do.

==================================================
25. TABS CONSISTENCY
==================================================

Chỉ cho phép số variants hợp lý, ví dụ:

A. Underline Tabs
B. Segmented Tabs

Audit:
- Genre
- Insight
- Matrix/Specification
- KHBD mode

Không để 5 kiểu tab khác nhau.

==================================================
26. ACCORDION CONSISTENCY
==================================================

Audit:
- KHBD;
- secondary collapsible panels.

Kiểm tra:
- chevron;
- title;
- spacing;
- expanded state;
- animation.

==================================================
27. MODAL CONSISTENCY
==================================================

Audit mọi modal:

- width;
- radius;
- backdrop;
- title;
- close button;
- footer;
- button order.

Ví dụ:
Cancel bên trái/right?
Primary bên phải?

Chọn một convention.

==================================================
28. DROPDOWN / POPOVER CONSISTENCY
==================================================

Audit:
- border;
- radius;
- shadow;
- padding;
- item height;
- selected item;
- hover.

==================================================
29. TOOLTIP CONSISTENCY
==================================================

Kiểm tra:
- style;
- delay;
- placement;
- typography.

Không để tooltip mỗi component một màu.

==================================================
30. EMPTY STATE CONSISTENCY
==================================================

Audit empty states:

No lesson
No question
No slide
No evidence
No rubric

Expected pattern:

Icon
Title
Description
Action

Không để mỗi module tự dựng layout khác hoàn toàn.

==================================================
31. TOAST CONSISTENCY
==================================================

Audit:
- success;
- warning;
- error;
- info.

Kiểm tra:
- location;
- duration;
- icon;
- close;
- semantic color;
- copy style.

==================================================
32. FOCUS CONSISTENCY
==================================================

Mọi interactive component cần cùng focus language.

Expected:
brand focus ring.

Audit:
- button;
- input;
- select;
- tab;
- menu;
- icon button.

Không để browser blue outline xen lẫn custom burgundy ring ngoài ý muốn.

==================================================
33. HOVER CONSISTENCY
==================================================

Audit:

Button
Card
Table row
Menu item
Icon Button

Hover phải:
- subtle;
- predictable;
- cùng motion timing.

Không để có component scale 1.1 trong khi component khác translate 1px.

==================================================
34. MOTION CONSISTENCY
==================================================

Audit transition duration:

120ms
180ms
240ms
hoặc tokens hiện tại.

Kiểm tra:
- dropdown;
- modal;
- accordion;
- hover;
- toolbar.

Không để:
button 700ms
modal 100ms
dropdown 500ms

nếu không có chủ đích.

==================================================
35. DISABLED STATE CONSISTENCY
==================================================

Audit:
- opacity;
- cursor;
- background;
- text;
- focus behavior.

==================================================
36. SELECTED STATE CONSISTENCY
==================================================

Selected:

lesson
question
slide
table row
sidebar item
outline paragraph

Phải có cùng conceptual language:

brand subtle background
+
brand accent/border

Không cần cùng exact component style.

==================================================
37. ACTIVE VS SELECTED VS FOCUS
==================================================

Phải phân biệt:

Hover
Focus
Active/Pressed
Selected
Current Navigation

Audit để tránh tất cả dùng cùng một background.

==================================================
38. LOADING STATE CONSISTENCY
==================================================

Nếu có loading:

- spinner;
- skeleton;
- disabled button;
- loading label.

Không để màn dùng spinner,
màn khác "Loading..."
màn khác blank
cho cùng pattern.

==================================================
39. SCROLLBAR CONSISTENCY
==================================================

App có nhiều internal panels.

Audit:
- width;
- thumb;
- hover;
- track.

Không để Reader scrollbar khác hẳn Exam nếu dùng shared style.

==================================================
40. SIDEBAR CONSISTENCY
==================================================

Kiểm tra:
- item height;
- icon size;
- active state;
- text alignment;
- group spacing;
- bottom identity.

==================================================
41. TOPBAR CONSISTENCY
==================================================

Kiểm tra:
- height;
- button size;
- breadcrumb;
- dropdown;
- autosave status;
- vertical alignment.

==================================================
42. DASHBOARD CONSISTENCY
==================================================

Kiểm tra Quick Actions có tuân cùng card/component language với app.

Không biến Dashboard thành một design system riêng.

==================================================
43. READER CONSISTENCY
==================================================

Reader được phép khác dashboard về typography và surface.

NHƯNG các controls:
- tabs;
- buttons;
- menus;
- toolbar;
- form

vẫn phải cùng system.

Phân biệt:

Content presentation
vs
UI control design.

==================================================
44. KHBD CONSISTENCY
==================================================

Audit:
- Activity cards;
- accordion;
- form controls;
- step markers;
- document mode controls.

==================================================
45. ASSESSMENT CONSISTENCY
==================================================

Question Bank
Matrix
Exam
Rubric

phải có:
- cùng filter language;
- cùng badge levels;
- cùng score formatting;
- cùng input behavior.

==================================================
46. SCORE FORMAT CONSISTENCY
==================================================

Audit:

10
10.0
10.00
10 điểm

Chọn format phù hợp theo context.

Không để cùng metric hiển thị ngẫu nhiên nhiều format.

==================================================
47. DATE/TIME FORMAT CONSISTENCY
==================================================

Audit:

08/10/2026
8/10/26
2026-10-08

Nếu UI có date/time:
dùng format nhất quán theo locale VN.

Autosave time có thể:
HH:mm

==================================================
48. NUMBER FORMAT CONSISTENCY
==================================================

Kiểm tra:
- duration;
- percentages;
- scores;
- counts.

Ví dụ:
40%
không lúc "40 %".

==================================================
49. RESPONSIVE CONSISTENCY
==================================================

Không test breakpoint sâu ở phase này.

Nhưng kiểm tra:
cùng loại responsive pattern có nhất quán không.

Ví dụ:
Inspector → Drawer trên tablet.

Không để module A dùng drawer,
module B overlay khác
cho cùng pattern nếu không có lý do.

Chi tiết thuộc #9 Responsive Testing.

==================================================
50. IMPLEMENTATION AUDIT
==================================================

Search code duplication:

<button className="...">

nhiều nơi tự dựng giống nhau.

Xác định component có thể dùng shared:

Button
Badge
Panel
Tabs
PageHeader
Modal
EmptyState

Nếu inconsistency do duplication:
đề xuất/refactor shared component.

Không refactor business logic.

==================================================
51. TOKEN USAGE AUDIT
==================================================

Kiểm tra component có dùng:

src/theme/tokens.ts

hoặc CSS variables/design utilities.

Report:
- token used correctly;
- bypassed token;
- duplicated values;
- legacy value.

==================================================
52. AUTOMATION STRATEGY
==================================================

Consistency Testing không thể automation 100%.

Kết hợp:

A. Static source audit
B. Playwright DOM/style inspection
C. Visual screenshots
D. Manual design review

Có thể viết script scan:
- hardcoded colors;
- radius;
- font-size;
- shadow;
- component duplication.

==================================================
53. OPTIONAL STATIC CHECK SCRIPT
==================================================

Nếu hữu ích, tạo:

scripts/audit-ui-consistency.mjs

Script scan:
src/**/*.{tsx,ts,css}

Tìm:
- arbitrary color;
- arbitrary radius;
- inline style;
- non-token shadow;
- inconsistent classes.

Không fail build chỉ vì false-positive.

Xuất report machine-readable nếu cần.

==================================================
54. CONSISTENCY TEST CASE FORMAT
==================================================

Trong:

docs/testing/08_CONSISTENCY_TESTING.md

dùng:

ID:
Category:
Components/Screens:
Expected Standard:
Actual:
Status:
Severity:
Evidence:
Recommendation:
Fixed?:

Ví dụ:

CON-BUTTON-001

Category:
Primary Button

Screens:
Dashboard, KHBD, Exam

Expected:
Cùng brand color, radius, typography, hover/focus.

Actual:
...

==================================================
55. SEVERITY
==================================================

High:
- cùng semantic nhưng khác meaning;
- destructive action trông như primary;
- terminology gây hiểu sai;
- controls cùng loại behavior khác nhau nghiêm trọng.

Medium:
- button/card/form style không nhất quán rõ;
- spacing/hierarchy khác biệt;
- token bypass đáng kể.

Low:
- minor radius;
- minor spacing;
- cosmetic difference.

==================================================
56. PRIORITY
==================================================

P0:
- terminology;
- primary/secondary/destructive action;
- form controls;
- navigation;
- score/status semantics.

P1:
- cards;
- tables;
- tabs;
- modal;
- badges;
- empty state.

P2:
- minor spacing;
- tooltip;
- decorative details.

==================================================
57. FIX POLICY
==================================================

Nếu inconsistency rõ và không ảnh hưởng business logic:

ưu tiên fix bằng:
- token;
- shared component;
- utility class;
- variant.

Không copy-paste style mới vào từng screen.

Nếu difference có chủ đích:
document exception.

==================================================
58. EXCEPTION DOCUMENTATION
==================================================

Ví dụ hợp lệ:

Reader dùng Lora
trong khi UI dùng Be Vietnam Pro.

Slides canvas có surface khác.

Presentation mode khác editor.

Những khác biệt có chủ đích:
không tính là inconsistency.

Ghi rõ trong report.

==================================================
59. REPORT
==================================================

Cập nhật:

docs/testing/08_CONSISTENCY_TESTING.md

Bao gồm:

# Consistency Testing Report

## 1. Scope
## 2. Design System Baseline
## 3. Component Inventory
## 4. Color Consistency
## 5. Typography
## 6. Spacing
## 7. Radius / Border / Shadow
## 8. Buttons
## 9. Forms
## 10. Tabs / Accordion
## 11. Modals / Overlays
## 12. Tables
## 13. Badges / Status
## 14. Terminology
## 15. Interaction States
## 16. Token Usage
## 17. Inconsistencies Found
## 18. Approved Exceptions
## 19. Fixes Applied
## 20. Remaining Risks

==================================================
60. VERIFY SAU KHI FIX
==================================================

Sau khi sửa inconsistency:

npm run build

Nếu có:
npm run lint
npm run test:run

Sau đó chạy relevant:

npx playwright test tests/visual
npx playwright test tests/interaction

Không update visual snapshot mù quáng.

Review diff trước.

==================================================
61. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

Components audited:
N

Screens audited:
N

Consistency issues:
N

High:
N

Medium:
N

Low:
N

Fixed:
N

Approved exceptions:
N

Hardcoded style violations:
N

Remaining:
N

Consistency Score:
có thể tính % nếu có methodology rõ ràng.

QUAN TRỌNG:

Consistency Testing không hỏi:

"Trang này có đẹp không?"

Mà hỏi:

"Trang này có nói cùng một ngôn ngữ thiết kế với toàn bộ hệ thống không?"

Quy trình:

AUDIT DESIGN SYSTEM
→ INVENTORY
→ COMPARE SAME-TYPE COMPONENTS
→ IDENTIFY OUTLIERS
→ FIX VIA TOKENS/SHARED COMPONENTS
→ VERIFY
→ REPORT