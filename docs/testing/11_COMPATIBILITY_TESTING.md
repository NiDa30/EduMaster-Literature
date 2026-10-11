Bạn là Senior QA Engineer + Cross-Browser Testing Specialist + Frontend Compatibility Engineer.

NHIỆM VỤ:
Thiết kế và triển khai COMPATIBILITY TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Xác nhận ứng dụng hoạt động ổn định trên các browser, engine và môi trường phổ biến.
- Phát hiện lỗi khác biệt về layout, CSS, typography, event handling, download, clipboard, fullscreen, LocalStorage, file export và browser API.
- Không biến Compatibility Testing thành Responsive Testing.
- Không test mọi browser/version trên thế giới.
- Ưu tiên các browser thực tế giáo viên có khả năng sử dụng.
- Không thay đổi business logic nếu không cần.

==================================================
1. ĐỌC PROJECT VÀ REPORT TRƯỚC
==================================================

Đọc:

package.json
vite.config.*
src/
docs/

Đọc:

docs/UI_REFERENCE_AUDIT.md
docs/UI_REFACTOR_REPORT.md
docs/VISUAL_POLISH_REPORT.md nếu có

Đọc các report:

docs/testing/04_FUNCTIONAL_TESTING.md
docs/testing/05_INTERACTION_TESTING.md
docs/testing/06_SMOKE_TESTING.md
docs/testing/07_VISUAL_TESTING.md
docs/testing/08_CONSISTENCY_TESTING.md
docs/testing/09_RESPONSIVE_TESTING.md
docs/testing/10_ACCESSIBILITY_TESTING.md

Xác định:
- framework;
- browser API đang sử dụng;
- CSS features;
- storage;
- export;
- clipboard;
- fullscreen;
- downloads.

==================================================
2. COMPATIBILITY TARGET MATRIX
==================================================

Ưu tiên:

P0:
- Google Chrome latest
- Microsoft Edge latest

P1:
- Firefox latest

P2:
- Safari/WebKit nếu product có khả năng dùng trên macOS/iPad

Không test Internet Explorer.

Không support browser đã obsolete nếu không có requirement.

==================================================
3. PLAYWRIGHT BROWSERS
==================================================

Nếu dùng Playwright:

Chromium
Firefox
WebKit

Cấu hình:

projects: [
  {
    name: "chromium",
    use: { browserName: "chromium" }
  },
  {
    name: "firefox",
    use: { browserName: "firefox" }
  },
  {
    name: "webkit",
    use: { browserName: "webkit" }
  }
]

Lưu ý:

Chromium đại diện tốt cho:
Chrome + Edge

nhưng nếu có bug đặc thù Edge:
test Edge channel thật nếu feasible.

==================================================
4. BASE VIEWPORT
==================================================

Để phân biệt compatibility với responsive:

dùng cùng viewport chính:

1440×900

và có thể thêm:
1366×768

Không chạy toàn bộ matrix mobile x 3 browser nếu không cần.

Responsive Testing đã xử lý breakpoint.

==================================================
5. STARTUP COMPATIBILITY
==================================================

Trên từng browser:

- app mở được;
- root render;
- không blank screen;
- không fatal console error;
- CSS load;
- fonts load;
- navigation hoạt động.

==================================================
6. APP SHELL
==================================================

Kiểm tra:

- Sidebar;
- TopBar;
- viewport height;
- internal scroll;
- zero-body-scroll;
- flex/grid.

Đặc biệt tìm khác biệt giữa:
Chromium / Firefox / WebKit.

==================================================
7. CSS GRID / FLEX
==================================================

Audit các layout:

- Reader 3 cột;
- Exam 3 cột;
- Slides Studio;
- Question Master–Detail;
- KHBD.

Kiểm tra:
- min-width;
- min-height;
- flex shrink;
- grid overflow.

Firefox thường có thể khác về flex/min-content behavior.

==================================================
8. FONT COMPATIBILITY
==================================================

Kiểm tra:

Be Vietnam Pro
Lora

Trên từng browser:

- font load;
- fallback;
- Vietnamese glyph;
- line-height;
- wrapping;
- weight.

Không để Safari/WebKit rơi về Times New Roman ngoài ý muốn.

==================================================
9. TYPOGRAPHY WRAPPING
==================================================

Dùng:

"Tây Tiến — Quang Dũng"
"Người lái đò Sông Đà"
"Kế hoạch bài dạy Ngữ văn lớp 12"

Kiểm tra:
- title wrap;
- breadcrumb;
- button;
- tab;
- badge;
- table.

==================================================
10. LITERATURE READER
==================================================

P0.

Kiểm tra:

- line-height;
- paragraph width;
- selection;
- highlight;
- annotation;
- scroll;
- outline navigation.

Browser text selection có thể khác nhau.

Test từng engine.

==================================================
11. TEXT SELECTION
==================================================

Kiểm tra:

mouse drag selection
double click
multi-line selection

Sau selection:
floating toolbar phải xuất hiện nếu feature hỗ trợ.

Đặc biệt test:
Firefox
WebKit

vì Selection API có thể khác.

==================================================
12. RANGE / SELECTION API
==================================================

Nếu code dùng:

window.getSelection()
Range
getBoundingClientRect()

test:

- selection rect đúng;
- toolbar không xuất hiện sai vị trí;
- selection không null ngoài ý muốn.

==================================================
13. HIGHLIGHT
==================================================

Nếu highlight dựa trên DOM Range:

test:
- create;
- restore;
- reload;
- Unicode;
- multiple paragraphs.

Không assume cùng DOM Range behavior trên mọi browser.

==================================================
14. LOCALSTORAGE
==================================================

Kiểm tra trên từng browser:

- write;
- read;
- reload;
- lesson switching;
- autosave;
- restore.

Không dùng private mode cho baseline compatibility trừ khi cần.

==================================================
15. INDEXEDDB
==================================================

Nếu project dùng:
test CRUD cơ bản từng browser.

Nếu không:
N/A.

==================================================
16. CLIPBOARD API
==================================================

Nếu app có:

Copy JSON
Copy text
Copy citation

test:

navigator.clipboard.writeText()

Trên browser khác nhau:
permission/security context có thể khác.

Expected:
- success khi supported;
- graceful fallback/error khi blocked.

==================================================
17. DOWNLOAD COMPATIBILITY
==================================================

P0 nếu export là chức năng chính.

Test:

DOCX
PPTX
JSON
HTML

Kiểm tra:
- download trigger;
- filename;
- extension;
- file size > 0;
- browser không chặn bất thường.

==================================================
18. BLOB / OBJECT URL
==================================================

Nếu export client-side dùng:

Blob
URL.createObjectURL()
URL.revokeObjectURL()

test trên:
Chromium
Firefox
WebKit.

==================================================
19. FILE UPLOAD / RESTORE
==================================================

Nếu Restore JSON dùng:

<input type="file">

test:
- chọn file;
- đọc file;
- invalid JSON;
- valid restore.

FileReader behavior phải ổn.

==================================================
20. FULLSCREEN API
==================================================

Nếu Slides Presentation dùng fullscreen:

test:

document.documentElement.requestFullscreen()
hoặc API tương đương.

Browser support có thể khác.

Nếu WebKit cần behavior khác:
implement graceful fallback.

==================================================
21. KEYBOARD SHORTCUT
==================================================

Test:

ArrowLeft
ArrowRight
Space
Esc
F5

Browser có thể bắt F5 reload.

Nếu app dùng F5 để presentation:
xác minh behavior thật.

Nếu conflict browser:
report và cân nhắc shortcut khác.

Không giả định preventDefault luôn đủ.

==================================================
22. MODAL / DIALOG
==================================================

Nếu dùng native:

<dialog>

test trên:
Chromium
Firefox
WebKit.

Nếu custom:
test:
- backdrop;
- focus;
- scroll;
- close.

==================================================
23. POPOVER API
==================================================

Nếu app dùng native Popover API:

kiểm tra browser support.

Nếu compatibility chưa tốt:
fallback phải tồn tại hoặc document limitation.

==================================================
24. CSS FEATURES
==================================================

Audit:

backdrop-filter
position: sticky
aspect-ratio
clamp()
min()
max()
color-mix()
CSS variables
container queries
:has()

Xác định feature nào có risk compatibility.

Không thay feature chỉ vì cũ nếu target browsers đều support.

==================================================
25. BACKDROP FILTER
==================================================

Nếu dùng:
backdrop-filter

test WebKit.

Nếu effect không hoạt động:
UI vẫn phải usable.

Đây nên là progressive enhancement.

==================================================
26. STICKY POSITION
==================================================

Test:
- Matrix header;
- sidebar sections;
- toolbar nếu sticky.

Firefox/WebKit có thể khác khi parent overflow.

==================================================
27. SCROLLBAR
==================================================

Custom scrollbar có thể khác:

Chromium/WebKit
vs
Firefox

Kiểm tra:
- không làm mất scroll;
- scrollbar usable.

Không yêu cầu scrollbar pixel-identical.

==================================================
28. FORM CONTROL COMPATIBILITY
==================================================

Test:

input
textarea
select
checkbox
radio

Browser native rendering khác nhau là chấp nhận được nếu:
- usable;
- accessible;
- không phá layout.

==================================================
29. DATE/TIME INPUT
==================================================

Nếu có input date/time:
browser UI có thể khác.

Test behavior,
không pixel.

Nếu không có:
N/A.

==================================================
30. NUMBER INPUT
==================================================

Nếu score dùng input number:

test:
- decimal;
- step;
- comma/dot behavior;
- arrow controls.

Đặc biệt locale behavior.

Không dựa hoàn toàn vào browser native validation.

==================================================
31. FILE NAME UNICODE
==================================================

Test download filename:

KHBD_Tây_Tiến.docx

Nếu Unicode filename không ổn:
cân nhắc safe filename normalization.

Không được làm mất khả năng xác định file.

==================================================
32. UNICODE TEXT
==================================================

Bắt buộc trên cả browsers.

Test:

Tây Tiến
Vợ chồng A Phủ
Người lái đò Sông Đà
Đất Nước

Kiểm tra:
- rendering;
- input;
- copy;
- save;
- export.

==================================================
33. COMPOSITION / IME
==================================================

Nếu có thể:

test Vietnamese IME typing.

Đảm bảo:
- React input handler không phá composition event;
- không normalize giữa lúc đang gõ gây mất dấu.

Đặc biệt nếu code tự normalize onChange.

==================================================
34. PRINT COMPATIBILITY
==================================================

Nếu có print:

window.print()
print CSS

test ít nhất Chromium.

Nếu Firefox/WebKit support quan trọng:
kiểm thêm.

Kiểm tra:
- Sidebar ẩn;
- document content xuất hiện;
- page breaks.

==================================================
35. DOCX/PPTX GENERATION
==================================================

Nếu export client-side:
browser engine không được ảnh hưởng output.

Test ít nhất:
- generate;
- download.

Không cần byte-identical nếu library tạo metadata khác.

==================================================
36. IMAGE / CANVAS
==================================================

Nếu Slides có canvas/SVG:

test:
- render;
- text;
- scaling;
- export nếu relevant.

Nếu không:
N/A.

==================================================
37. SVG ICONS
==================================================

Lucide/SVG:

kiểm tra:
- stroke;
- sizing;
- currentColor;
- clipping.

==================================================
38. CSS 100VH
==================================================

App sử dụng h-screen/100vh.

Test:
- desktop browsers;
- WebKit.

Mobile viewport quirks thuộc Responsive Testing,
nhưng compatibility issue nếu 100vh behavior khác cần note.

==================================================
39. DEVICE PIXEL RATIO
==================================================

Không cần test mọi DPR.

Nhưng visual critical elements không được phụ thuộc pixel rounding quá chặt.

Đặc biệt:
- 1px border;
- canvas;
- SVG.

==================================================
40. BROWSER ZOOM
==================================================

Một basic check 125%/150% có thể thực hiện.

Không cần full matrix.

Nếu bug chỉ xảy ra browser cụ thể:
report compatibility issue.

==================================================
41. HISTORY / ROUTING
==================================================

Nếu SPA routing:

test:
- navigation;
- refresh route;
- back;
- forward.

Trên từng engine.

Nếu app state-based không URL route:
test behavior tương ứng.

==================================================
42. BEFOREUNLOAD
==================================================

Nếu có warning unsaved changes:
test browser support/limitations.

Browser thường không cho custom message.

Không assert custom text nếu platform không support.

==================================================
43. CONSOLE WARNINGS
==================================================

Capture:

console.error
pageerror

Trên từng browser.

Một feature có thể chạy ở Chromium nhưng throw ở WebKit.

==================================================
44. UNSUPPORTED API DETECTION
==================================================

Search source:

navigator.
window.
document.
requestFullscreen
clipboard
FileReader
Blob
URL.
ResizeObserver
IntersectionObserver
MutationObserver

Lập browser API risk inventory.

==================================================
45. FEATURE DETECTION
==================================================

Nếu API không universal:

code nên dùng:

if ("clipboard" in navigator)

hoặc equivalent.

Không dựa vào user-agent sniff nếu không cần.

==================================================
46. GRACEFUL DEGRADATION
==================================================

Nếu browser không hỗ trợ visual effect:

app vẫn usable.

Ví dụ:
backdrop-filter không có
→ surface opaque vẫn đọc được.

Nếu fullscreen không có
→ presentation vẫn chạy trong viewport.

==================================================
47. PLAYWRIGHT TEST STRUCTURE
==================================================

Tạo:

tests/
└── compatibility/
    ├── startup.compat.spec.ts
    ├── shell.compat.spec.ts
    ├── reader.compat.spec.ts
    ├── storage.compat.spec.ts
    ├── clipboard.compat.spec.ts
    ├── export.compat.spec.ts
    ├── fullscreen.compat.spec.ts
    ├── forms.compat.spec.ts
    └── routing.compat.spec.ts

==================================================
48. KHÔNG DUPLICATE TOÀN BỘ E2E
==================================================

Compatibility suite không cần chạy toàn bộ business suite trên 3 browsers.

Chọn representative critical flows.

Ví dụ:

1.
Startup
→ Dashboard
→ Reader

2.
Create/Edit
→ Autosave
→ Reload

3.
Question Bank
→ save

4.
Export JSON/DOCX

5.
Slides Presentation

==================================================
49. CORE BROWSER MATRIX
==================================================

Đề xuất:

P0 scenarios:
Chromium + Firefox + WebKit

Secondary scenarios:
Chromium only

Nếu WebKit feature không phù hợp environment hiện tại:
document rõ.

==================================================
50. TEST CASE FORMAT
==================================================

Trong:

docs/testing/11_COMPATIBILITY_TESTING.md

Mỗi case:

ID:
Feature:
Browser:
Engine:
Version:
OS:
Viewport:
Precondition:
Steps:
Expected:
Actual:
Status:
Evidence:

Ví dụ:

COMP-READER-001

Feature:
Literature Reader selection

Browser:
Firefox

Expected:
Text selection hoạt động và Floating Toolbar xuất hiện.

==================================================
51. COMPATIBILITY MATRIX
==================================================

Tạo bảng:

| Feature | Chrome | Edge | Firefox | Safari/WebKit |
|---|---|---|---|---|
| Startup | | | | |
| Reader | | | | |
| Selection | | | | |
| Autosave | | | | |
| Clipboard | | | | |
| Export DOCX | | | | |
| Export PPTX | | | | |
| Restore JSON | | | | |
| Fullscreen | | | | |

Status:

PASS
FAIL
PARTIAL
N/A
NOT TESTED

==================================================
52. OS COMPATIBILITY
==================================================

Nếu môi trường cho phép:

Primary:
Windows 10/11

Optional:
macOS

Không claim macOS support nếu chỉ dùng WebKit emulation.

Phân biệt:

Browser engine test
vs
real-device/OS test.

==================================================
53. EDGE REAL BROWSER
==================================================

Nếu cần test Microsoft Edge thật:

Playwright có thể dùng channel:
msedge

Chỉ làm nếu Edge là target quan trọng và máy test có Edge.

Không bắt buộc nếu Chromium coverage đã đủ giai đoạn này.

==================================================
54. SAFARI LIMITATION
==================================================

Playwright WebKit:

không hoàn toàn tương đương Safari thực trên macOS/iOS.

Report phải nói rõ:

"WebKit compatibility tested via Playwright; real Safari validation remains separate if required."

==================================================
55. SCREENSHOT EVIDENCE
==================================================

Chụp screenshot khi:
- browser-specific bug;
- layout khác;
- feature fail.

Không cần tạo full visual baseline cho mọi browser.

Đó là Visual Testing.

==================================================
56. SEVERITY
==================================================

Critical:
- app không start trên target browser;
- data loss;
- core feature unusable.

High:
- Reader/Exam/KHBD unusable;
- export fail;
- storage fail.

Medium:
- browser-specific interaction issue;
- layout significant issue.

Low:
- minor cosmetic difference.

==================================================
57. BUG FORMAT
==================================================

COMP-BUG-001

Browser:
Engine:
Version:
OS:
Feature:
Steps:
Expected:
Actual:
Works On:
Fails On:
Severity:
Evidence:
Root Cause:
Fix:
Retest:

==================================================
58. FIX STRATEGY
==================================================

Ưu tiên:

1. standards-based implementation
2. feature detection
3. graceful fallback
4. CSS fallback

Không ưu tiên:
user-agent sniffing
trừ trường hợp thật sự cần.

==================================================
59. TEST PRIORITY
==================================================

P0:
- startup
- Reader
- autosave/localStorage
- lesson switching
- Question Bank
- Exam
- export/download
- restore

P1:
- clipboard
- fullscreen
- KHBD
- Matrix
- Rubric
- Slides

P2:
- minor CSS effect
- cosmetic browser differences.

==================================================
60. REPORT
==================================================

Cập nhật:

docs/testing/11_COMPATIBILITY_TESTING.md

Bao gồm:

# Compatibility Testing Report

## 1. Scope
## 2. Target Browsers
## 3. Browser/Engine Matrix
## 4. Environment
## 5. Browser API Inventory
## 6. Core Compatibility Tests
## 7. CSS Compatibility
## 8. Typography
## 9. Storage
## 10. Clipboard
## 11. Export/Download
## 12. Fullscreen
## 13. File Restore
## 14. Browser-Specific Bugs
## 15. Fixes
## 16. Limitations
## 17. Compatibility Matrix
## 18. Recommendations

==================================================
61. EXECUTION
==================================================

Cài browsers nếu cần:

npx playwright install

Chạy:

npx playwright test tests/compatibility --project=chromium

npx playwright test tests/compatibility --project=firefox

npx playwright test tests/compatibility --project=webkit

Sau đó:

npm run build

Nếu có:
npm run lint

==================================================
62. RETEST
==================================================

Sau bug fix:

chạy lại browser đã fail.

Sau đó chạy Chromium để chắc fix không gây regression.

Nếu fix ở shared component:
chạy thêm Smoke / Interaction tests liên quan.

==================================================
63. ACCEPTANCE CRITERIA
==================================================

Compatibility PASS khi:

- Chrome/Chromium P0 pass;
- Edge target không có blocker;
- Firefox P0 pass hoặc limitation rõ và chấp nhận được;
- WebKit core flows hoạt động nếu nằm trong support scope;
- không data loss browser-specific;
- export/storage core không bị lỗi;
- graceful degradation hoạt động.

==================================================
64. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

Browsers tested:
N

Engines:
N

Compatibility cases:
N

Passed:
N

Failed:
N

Partial:
N

Critical browser-specific bugs:
N

High:
N

Medium:
N

Fixed:
N

Known limitations:
N

Support recommendation:

Chrome:
SUPPORTED

Edge:
SUPPORTED

Firefox:
SUPPORTED / PARTIAL

Safari/WebKit:
SUPPORTED / PARTIAL / NOT VERIFIED ON REAL SAFARI

QUAN TRỌNG:

Compatibility Testing phải trả lời:

"Cùng một EduMaster-Literature, khi giáo viên mở bằng browser khác, các chức năng cốt lõi có tiếp tục hoạt động đúng và dữ liệu có được bảo toàn hay không?"

Quy trình:

AUDIT BROWSER APIs
→ DEFINE SUPPORT MATRIX
→ RUN CORE FLOWS ACROSS ENGINES
→ FIND DIFFERENCES
→ FIX/FALLBACK
→ RETEST
→ REPORT