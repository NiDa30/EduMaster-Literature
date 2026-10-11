Bạn là Senior QA Engineer + Interaction Test Engineer + Frontend Test Automation Engineer.

NHIỆM VỤ:
Thiết kế và triển khai INTERACTION TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Kiểm tra toàn bộ hành vi tương tác của người dùng với giao diện.
- Xác nhận click, hover, focus, keyboard, modal, dropdown, tab, accordion, toolbar, drag/drop và shortcut hoạt động đúng.
- Tập trung vào cách người dùng thao tác với UI, không chỉ kiểm tra business output cuối cùng.
- Không biến Interaction Testing thành Visual Testing.
- Không biến Interaction Testing thành full E2E workflow.
- Không test màu/font/pixel trong phase này.
- Không giả định interaction không tồn tại.

==================================================
1. AUDIT INTERACTIVE COMPONENTS
==================================================

Đọc:

src/
docs/
docs/UI_REFERENCE_AUDIT.md
docs/UI_REFACTOR_PLAN.md
docs/UI_REFACTOR_REPORT.md
docs/testing/04_FUNCTIONAL_TESTING.md

Tìm toàn bộ:

button
input
textarea
select
checkbox
radio
tabs
accordion
modal
dialog
drawer
popover
dropdown
tooltip
menu
toolbar
context menu
slider
drag/drop
sortable
keyboard handler
onClick
onChange
onKeyDown
onMouseEnter
onMouseLeave
onFocus
onBlur
onPointerDown
onPointerUp

Lập inventory vào:

docs/testing/05_INTERACTION_TESTING.md

==================================================
2. PHÂN LOẠI INTERACTION
==================================================

Chia thành:

A. Pointer Interaction
B. Keyboard Interaction
C. Focus Interaction
D. Form Interaction
E. Navigation Interaction
F. Overlay Interaction
G. Selection Interaction
H. Drag & Drop
I. Shortcut
J. Feedback Interaction

==================================================
3. BUTTON TESTING
==================================================

Kiểm tra từng loại button:

Primary
Secondary
Ghost
Outline
Destructive
Icon button

Test:
- click một lần;
- click nhiều lần;
- double click;
- disabled;
- loading;
- keyboard Enter;
- keyboard Space;
- focus-visible;
- icon-only có aria-label nếu cần.

Không để duplicate action khi double click nếu logic cần chống submit nhiều lần.

==================================================
4. LINK / NAVIGATION INTERACTION
==================================================

Test:
- click sidebar item;
- click breadcrumb;
- click quick action;
- click recent lesson;
- back/forward nếu app hỗ trợ route;
- active state cập nhật đúng;
- không điều hướng sai module.

Không test full E2E ở đây.

==================================================
5. SIDEBAR
==================================================

Test:
- click từng module;
- active item đổi đúng;
- focus bằng Tab;
- Enter để mở;
- collapse/expand nếu có;
- Focus Mode ẩn sidebar;
- khôi phục sidebar;
- không mất current lesson.

==================================================
6. TOPBAR
==================================================

Test:
- lesson switcher mở/đóng;
- chọn lesson;
- export menu;
- more menu;
- focus mode;
- click ngoài đóng popover nếu expected;
- Esc đóng overlay;
- keyboard navigation trong menu.

==================================================
7. DROPDOWN
==================================================

Với mọi dropdown:

Test:
- click mở;
- click lại đóng;
- click ngoài đóng;
- Esc đóng;
- chọn item;
- selected item cập nhật;
- keyboard ↑ ↓;
- Enter chọn;
- focus không bị mất sai.

==================================================
8. POPOVER
==================================================

Test:
- open;
- close;
- anchor position hợp lý;
- click outside;
- Esc;
- nội dung tương tác được;
- nested button hoạt động.

Không kiểm pixel position chính xác ở phase này.

==================================================
9. MODAL / DIALOG
==================================================

Test:
- open;
- close bằng X;
- Cancel;
- Confirm;
- Esc;
- click backdrop nếu design cho phép;
- focus trap;
- focus trả về trigger sau khi đóng;
- submit;
- loading;
- validation;
- không submit hai lần.

==================================================
10. DRAWER
==================================================

Nếu có:
- open;
- close;
- overlay;
- Esc;
- swipe không cần test nếu desktop-only;
- focus trap;
- state không mất khi đóng.

==================================================
11. TABS
==================================================

Test tất cả tab systems:

Genre Analysis
Insight Panel
Matrix / Specification
KHBD mode
...

Test:
- click tab;
- active tab;
- content đổi;
- state của tab trước giữ đúng;
- keyboard Arrow Left/Right nếu component hỗ trợ;
- focus không nhảy bất thường.

==================================================
12. ACCORDION
==================================================

Test:

- mở;
- đóng;
- mở nhiều section nếu allowed;
- only-one-open nếu design vậy;
- keyboard;
- content state giữ nguyên;
- nested control không trigger collapse ngoài ý muốn.

Áp dụng đặc biệt cho KHBD.

==================================================
13. FORM FIELD INTERACTION
==================================================

Test:

input
textarea
select
checkbox
radio

Interactions:
- typing;
- paste;
- clear;
- select all;
- backspace;
- focus;
- blur;
- tab navigation;
- validation on blur;
- validation on submit;
- disabled;
- readonly.

==================================================
14. VIETNAMESE INPUT
==================================================

Bắt buộc test typing/paste:

Tây Tiến
Quang Dũng
Người lái đò Sông Đà
Vợ chồng A Phủ
Đất Nước

Kiểm tra:
- input không mất dấu;
- composition event không lỗi;
- paste từ Word/website;
- multiline;
- NFC normalization nếu app có.

==================================================
15. LITERATURE TEXT SELECTION
==================================================

P0.

Test:

- drag select một đoạn văn;
- double click chọn từ nếu browser hỗ trợ;
- toolbar xuất hiện;
- selection thay đổi → toolbar cập nhật;
- click ngoài → toolbar biến mất;
- scroll khi selection còn active;
- selection qua nhiều dòng;
- selection Unicode.

==================================================
16. FLOATING SELECTION TOOLBAR
==================================================

Test:

- xuất hiện đúng lúc;
- Highlight;
- Ghi chú;
- Sang Slide;
- Tạo câu hỏi;
- Đặt làm ngữ liệu đề;
- Esc hoặc click ngoài;
- không che selection quá mức;
- keyboard access nếu component hỗ trợ.

==================================================
17. HIGHLIGHT INTERACTION
==================================================

Test:
- chọn text;
- click Highlight;
- chọn màu nếu có;
- click highlight đã có;
- edit/remove;
- nhiều highlight;
- overlapping interaction.

==================================================
18. NOTE INTERACTION
==================================================

Test:
- select text;
- Add Note;
- modal/popover mở;
- typing;
- save;
- cancel;
- edit;
- delete;
- click note indicator;
- focus vào note đúng.

==================================================
19. BOOKMARK INTERACTION
==================================================

Test:
- add;
- remove;
- click bookmark để scroll;
- active bookmark;
- multiple bookmarks;
- keyboard nếu accessible.

==================================================
20. READER SCROLL / OUTLINE SYNC
==================================================

Test:
- click outline → scroll reader;
- scroll reader → active outline thay đổi nếu có;
- smooth scroll không khóa UI;
- focus mode không phá sync.

==================================================
21. GENRE ANALYSIS INTERACTION
==================================================

Test:
- chuyển tab;
- add luận điểm;
- edit;
- delete;
- expand/collapse;
- click evidence;
- action "Đưa vào KHBD";
- action "Đưa vào Slide";
- action "Tạo câu hỏi".

==================================================
22. ARGUMENT MAP INTERACTION
==================================================

Nếu node interactive:

Test:
- select node;
- add child;
- edit;
- delete;
- drag nếu có;
- context menu nếu có;
- keyboard navigation nếu supported.

Không kiểm graph layout pixel-perfect.

==================================================
23. KHBD BUILDER INTERACTION
==================================================

Test:
- switch Visual Builder / Document View;
- expand activity;
- collapse;
- add activity;
- edit;
- delete;
- reorder nếu có;
- edit 4 organization steps;
- switch activity không mất input.

==================================================
24. QUESTION BANK INTERACTION
==================================================

Test:
- click question;
- editor load đúng;
- filter;
- clear filter;
- search;
- create;
- save;
- delete;
- duplicate;
- switch type;
- change level;
- select YCCĐ.

==================================================
25. MATRIX INTERACTION
==================================================

Test:
- click cell;
- edit;
- tab qua cell;
- Enter save nếu hỗ trợ;
- dropdown level/type;
- summary update;
- scroll table;
- sticky header interaction không lỗi.

==================================================
26. EXAM BUILDER INTERACTION
==================================================

Test 3-column interactions:

Left:
- select section.

Center:
- select question;
- add/remove;
- edit;
- reorder.

Right:
- statistics refresh.

Kiểm tra:
- click section không mất edit;
- question selection rõ;
- remove confirm nếu có;
- reorder không làm sai section.

==================================================
27. RUBRIC INTERACTION
==================================================

Test:
- add criterion;
- edit cell;
- delete;
- add quality level;
- score input;
- keyboard Tab;
- live total update;
- invalid input feedback.

==================================================
28. SLIDES INTERACTION
==================================================

Test:
- click thumbnail;
- add slide;
- duplicate;
- delete;
- reorder;
- edit canvas;
- inspector;
- open presentation;
- close presentation.

==================================================
29. PRESENTATION KEYBOARD SHORTCUT
==================================================

Nếu hỗ trợ:

ArrowRight
ArrowLeft
Space
Esc
F5

Test:
- next slide;
- previous slide;
- first slide boundary;
- last slide boundary;
- Esc exit;
- F5 start nếu implemented.

==================================================
30. DRAG & DROP
==================================================

Nếu project có:
- slide reorder;
- question reorder;
- activity reorder.

Test:
- drag item;
- drop valid target;
- cancel;
- reorder persisted;
- keyboard fallback nếu có.

Nếu không có drag/drop:
ghi N/A.

==================================================
31. HOVER INTERACTION
==================================================

Test các thành phần có action xuất hiện khi hover:

- cards;
- table row actions;
- toolbar;
- thumbnail actions.

Kiểm tra:
- hover hiện đúng;
- mouse leave ẩn;
- không che nội dung;
- không bắt buộc hover cho action thiết yếu nếu accessibility yêu cầu keyboard.

Không kiểm màu chính xác.

==================================================
32. FOCUS INTERACTION
==================================================

Bắt buộc test:

Tab
Shift+Tab

Kiểm tra:
- thứ tự hợp lý;
- focus không bị mất;
- modal focus trap;
- dropdown focus;
- đóng overlay trả focus về trigger.

==================================================
33. KEYBOARD-ONLY FLOW
==================================================

Chọn một số task ngắn và test không dùng mouse:

- mở menu;
- chuyển tab;
- mở modal;
- nhập form;
- save;
- đóng modal.

Không cần full E2E.

==================================================
34. ESCAPE KEY
==================================================

Test Esc với:

- modal;
- drawer;
- popover;
- dropdown;
- presentation;
- floating toolbar nếu applicable.

Không để Esc đóng thứ không nên đóng.

==================================================
35. ENTER / SPACE
==================================================

Test với:
- button;
- menu item;
- accordion;
- tabs nếu semantics hỗ trợ;
- form submit.

==================================================
36. CLICK OUTSIDE
==================================================

Test:
- dropdown;
- popover;
- toolbar;
- modal nếu backdrop-close;
- menu.

Expected behavior phải theo design hiện tại.

Không tự áp dụng click-outside cho mọi overlay.

==================================================
37. REPEATED INTERACTION
==================================================

Test:
- spam click;
- rapid tab switching;
- repeated save;
- repeated modal open/close;
- repeated lesson switch.

Không crash.
Không duplicate state ngoài ý muốn.

==================================================
38. LOADING STATE INTERACTION
==================================================

Nếu có async action:

Test:
- button disabled khi loading nếu cần;
- spinner;
- không submit lặp;
- success feedback;
- failure feedback;
- retry nếu có.

==================================================
39. TOAST / FEEDBACK
==================================================

Test:
- toast xuất hiện;
- đúng message;
- tự đóng;
- manual close nếu có;
- nhiều toast;
- không che control quan trọng.

Không kiểm visual style chính xác.

==================================================
40. CONFIRMATION DIALOG
==================================================

Các action xóa:

lesson
question
activity
slide
rubric criterion

Test:
- Cancel;
- Confirm;
- Esc;
- focus;
- double confirm;
- item thực sự bị xóa khi confirm.

==================================================
41. ERROR INTERACTION
==================================================

Test:
- nhập sai;
- validation hiện;
- sửa lại;
- error biến mất;
- submit lại thành công.

Không để user bị kẹt sau error.

==================================================
42. EMPTY STATE INTERACTION
==================================================

Nếu module rỗng:

Test CTA:

"Tạo bài dạy"
"Tạo câu hỏi"
"Thêm slide"
...

Click phải đưa đúng hành động.

==================================================
43. DISABLED STATE
==================================================

Test:
- disabled button không click;
- không focus nếu semantic yêu cầu;
- disabled field không chỉnh được;
- tooltip reason nếu project có.

==================================================
44. READONLY STATE
==================================================

Nếu có:
- nội dung đọc được;
- không edit;
- copy/select vẫn được nếu hợp lý.

==================================================
45. TOOLTIP
==================================================

Nếu có:
- hover/focus hiện;
- blur/mouseleave ẩn;
- tooltip không bắt focus;
- icon-only action có giải thích.

==================================================
46. RESPONSIVE INTERACTION KHÔNG THUỘC PHASE NÀY
==================================================

Không kiểm layout breakpoint sâu ở đây.

Nhưng nếu interaction thay đổi do viewport:
ghi lại case để chuyển sang:

09_RESPONSIVE_TESTING.md

==================================================
47. AUTOMATION TOOL
==================================================

Ưu tiên:

Playwright

vì cần browser interaction thật.

Có thể dùng React Testing Library cho component isolated.

Không dùng Selenium song song nếu không cần.

==================================================
48. PLAYWRIGHT STRUCTURE
==================================================

tests/
└── interaction/
    ├── sidebar.spec.ts
    ├── topbar.spec.ts
    ├── modal.spec.ts
    ├── dropdown.spec.ts
    ├── tabs.spec.ts
    ├── forms.spec.ts
    ├── reader-selection.spec.ts
    ├── floating-toolbar.spec.ts
    ├── khbd.spec.ts
    ├── question-bank.spec.ts
    ├── exam.spec.ts
    ├── rubric.spec.ts
    └── slides.spec.ts

==================================================
49. SELECTOR STRATEGY
==================================================

Ưu tiên:

getByRole()
getByLabel()
getByText()
data-testid

Không dùng selector brittle kiểu:

div:nth-child(7) > span:nth-child(2)

Thêm data-testid nếu interaction phức tạp và semantic selector không đủ.

==================================================
50. TEST CASE FORMAT
==================================================

Trong:

docs/testing/05_INTERACTION_TESTING.md

mỗi case:

ID:
Module:
Interaction:
Priority:
Precondition:
Action:
Expected UI Behavior:
Expected State Change:
Keyboard:
Automated:
Result:
Evidence:

Ví dụ:

INT-READER-001

Interaction:
Chọn văn bản

Action:
Drag select một câu thơ

Expected:
Floating toolbar xuất hiện và gắn với selection hiện tại.

==================================================
51. PRIORITY
==================================================

P0:
- Sidebar navigation;
- lesson switcher;
- modal;
- form;
- Reader selection;
- Floating Toolbar;
- Question editor;
- Exam interactions;
- Save/delete.

P1:
- KHBD accordion;
- Matrix cell;
- Rubric;
- Slides;
- Popovers.

P2:
- Tooltip;
- minor hover;
- secondary controls.

==================================================
52. KHÔNG TEST
==================================================

Không test:
- pixel alignment;
- exact RGB;
- font size;
- screenshot diff;
- load time;
- server concurrency.

Đó thuộc phase khác.

==================================================
53. BUG REPORT
==================================================

Format:

INT-BUG-001

Module:
Interaction:
Input Device:
Steps:
Expected:
Actual:
Severity:
Evidence:
Root Cause:
Fix:
Retest:

==================================================
54. REPORT
==================================================

Cập nhật:

docs/testing/05_INTERACTION_TESTING.md

Bao gồm:

# Interaction Testing Report

## 1. Scope
## 2. Interaction Inventory
## 3. Pointer Tests
## 4. Keyboard Tests
## 5. Focus Tests
## 6. Overlay Tests
## 7. Reader Selection Tests
## 8. Builder Interaction Tests
## 9. Automated Tests
## 10. Results
## 11. Bugs
## 12. Deferred Cases
## 13. Risks
## 14. Recommendations

==================================================
55. EXECUTION
==================================================

Nếu dùng Playwright:

npx playwright test tests/interaction

Sau đó chạy:

npm run build

Nếu có:
npm run lint

Fix mọi lỗi do implementation/test changes gây ra.

==================================================
56. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

- Tổng interactive components.
- Tổng test cases.
- Automated.
- Passed.
- Failed.
- Blocked.
- Keyboard issues.
- Focus issues.
- Overlay issues.
- Critical interactions chưa cover.

QUAN TRỌNG:

Interaction Testing phải trả lời:

"Người dùng thao tác X
→ UI phản hồi Y đúng cách
→ state cần thiết thay đổi đúng
→ không tạo interaction bug."

AUDIT
→ INVENTORY
→ DESIGN
→ IMPLEMENT
→ RUN
→ FIX
→ RETEST
→ REPORT