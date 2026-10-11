Bạn là Senior QA Performance Engineer + Frontend Performance Specialist + Test Automation Engineer.

NHIỆM VỤ:
Thiết kế và triển khai PERFORMANCE TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Đo và đánh giá tốc độ load, render, interaction, autosave, chuyển module, xử lý dữ liệu và export của ứng dụng.
- Xác định bottleneck thực tế thay vì chỉ cảm nhận “app chậm”.
- Thiết lập baseline performance để phát hiện suy giảm sau này.
- Phân biệt rõ:
  Performance Testing
  ≠ Load Testing
  ≠ Stress Testing.
- Không tạo benchmark vô nghĩa.
- Không tối ưu sớm trước khi có số liệu.
- Chỉ sửa sau khi đã đo được bottleneck hoặc regression có ý nghĩa.

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

Đọc test reports:

docs/testing/04_FUNCTIONAL_TESTING.md
docs/testing/06_SMOKE_TESTING.md
docs/testing/07_VISUAL_TESTING.md
docs/testing/09_RESPONSIVE_TESTING.md
docs/testing/12_E2E_TESTING.md
docs/testing/14_REGRESSION_TESTING.md
docs/testing/15_SANITY_TESTING.md

Xác định:
- app SPA hay có backend;
- state storage;
- export libraries;
- component lớn;
- dataset lớn;
- expensive render;
- document generation.

==================================================
2. PHÂN BIỆT CÁC LOẠI TEST
==================================================

Performance Testing:
"Một user sử dụng app thì các thao tác có đủ nhanh không?"

Load Testing:
"Nhiều user/request đồng thời thì hệ thống chịu được không?"

Stress Testing:
"Khi vượt giới hạn thì hệ thống gãy ở đâu?"

Phase này chỉ tập trung Performance Testing.

Load = #17
Stress = #18

==================================================
3. PERFORMANCE AREAS
==================================================

Chia thành:

A. Initial Load Performance
B. Rendering Performance
C. Navigation Performance
D. Interaction Responsiveness
E. Data Processing Performance
F. Autosave Performance
G. Persistence Performance
H. Search/Filter Performance
I. Large Dataset Performance
J. Export Performance
K. Memory Performance
L. Bundle Performance

==================================================
4. ENVIRONMENT BASELINE
==================================================

Ghi rõ môi trường:

OS:
Browser:
Browser version:
CPU:
RAM:
Node version:
Build mode:
Viewport:

Ưu tiên đo production build:

npm run build
npm run preview

Không dùng dev mode để làm benchmark chính vì:
- HMR;
- dev transforms;
- source maps;
- React dev overhead.

==================================================
5. MEASURE PRODUCTION BUILD
==================================================

Performance benchmark chính phải chạy trên:

npm run build
npm run preview

Hoặc production server tương ứng.

Nếu chỉ đo localhost dev:
phải ghi rõ đó không phải production baseline.

==================================================
6. COLD LOAD VS WARM LOAD
==================================================

Phân biệt:

Cold Load:
cache rỗng.

Warm Load:
assets đã cache.

Đo ít nhất một cold load baseline.

Không trộn số liệu cold và warm.

==================================================
7. CORE WEB VITALS
==================================================

Nếu phù hợp với app:

đo:

LCP
INP
CLS

Có thể theo dõi thêm:

FCP
TTFB

Không coi Lighthouse score là toàn bộ Performance Testing.

==================================================
8. INITIAL PAGE LOAD
==================================================

Đo:

Navigation start
→ app usable

Không chỉ:
DOMContentLoaded.

Quan tâm:
- Dashboard đã render;
- Sidebar interactive;
- current lesson load xong.

Có thể dùng Playwright Performance API.

==================================================
9. PAGE LOAD TARGET
==================================================

Không hard-code target tùy tiện.

Sau khi có baseline:
đặt budget hợp lý.

Ví dụ initial budget tham khảo:

Cold local production:
LCP < 2.5s

Nhưng:
phải xem hardware/environment thực tế.

Nếu app hoàn toàn local:
target có thể nhanh hơn đáng kể.

==================================================
10. JAVASCRIPT BUNDLE
==================================================

Sau build:
audit output bundle.

Kiểm tra:

dist/assets/

Ghi:
- JS total;
- largest chunks;
- CSS;
- font;
- image assets.

Tìm:
- package quá lớn;
- duplicate dependency;
- unused library;
- export library load upfront.

==================================================
11. CODE SPLITTING
==================================================

Đánh giá:

Exam
Slides
Export

có cần lazy load không.

Đặc biệt export libraries như:
DOCX/PPTX

nếu rất lớn:
không nên nhất thiết đưa vào initial bundle nếu chỉ dùng khi export.

Chỉ refactor nếu bundle analysis chứng minh lợi ích.

==================================================
12. BUNDLE ANALYSIS
==================================================

Nếu project chưa có tool,
có thể dùng plugin phù hợp hoặc đọc build output.

Không thêm dependency nặng chỉ để tạo report.

Mục tiêu:
xác định top contributors.

==================================================
13. DASHBOARD RENDER PERFORMANCE
==================================================

Đo:

open app
→ Dashboard ready.

Với:
- vài lesson;
- nhiều lesson.

Quan sát:
- render time;
- unnecessary rerenders;
- long tasks.

==================================================
14. MODULE NAVIGATION PERFORMANCE
==================================================

Đo thời gian:

Dashboard → Reader
Reader → KHBD
KHBD → Matrix
Matrix → Exam
Exam → Slides

Từ click
→ target content ready.

Không bao gồm deliberate animation nếu có thể phân biệt.

==================================================
15. READER PERFORMANCE
==================================================

P0.

Test:
- text vừa;
- text dài;
- nhiều paragraphs;
- many annotations.

Đo:
- initial render;
- scroll responsiveness;
- text selection;
- toolbar appearance;
- highlight creation.

==================================================
16. LARGE LITERATURE TEXT
==================================================

Tạo fixture lớn nhưng realistic.

Ví dụ:
- 100 paragraphs
- 300 paragraphs
- nhiều trích dẫn

Không cần 100MB text vô lý.

Quan sát:
- initial render;
- scroll;
- memory;
- selection latency.

==================================================
17. ANNOTATION PERFORMANCE
==================================================

Test với:

0
10
50
100+
highlights/notes

Đo:
- Reader render;
- add highlight;
- remove;
- reload.

Nếu DOM Range processing tăng theo O(n²):
report.

==================================================
18. GENRE ANALYSIS PERFORMANCE
==================================================

Test:
- nhiều luận điểm;
- nhiều dẫn chứng;
- argument map lớn.

Quan sát:
- tab switch;
- node update;
- map render.

==================================================
19. KHBD PERFORMANCE
==================================================

Test:
- 4 activities;
- nhiều content;
- long textarea;
- Document View.

Đo:
Visual Builder → Document View.

Tìm:
- recompute toàn document mỗi keystroke;
- expensive transformation.

==================================================
20. QUESTION BANK PERFORMANCE
==================================================

Test dataset:

10 questions
100 questions
500 questions
1000 questions nếu architecture có thể gặp.

Đo:
- render list;
- search;
- filter;
- select question;
- edit/save.

Không cần 100k nếu product không bao giờ có.

==================================================
21. SEARCH PERFORMANCE
==================================================

Đo:

typing query
→ results updated.

Quan sát:
- mỗi keystroke;
- debounce;
- normalization;
- Unicode search.

Nếu search 1000 items:
interaction vẫn phải responsive.

==================================================
22. FILTER PERFORMANCE
==================================================

Test:
- one filter;
- multiple filters;
- clear.

Đo:
click/change
→ updated result list.

==================================================
23. MATRIX PERFORMANCE
==================================================

Test matrix lớn hợp lý.

Đo:
- initial render;
- cell edit;
- recalculation;
- statistics update.

Tìm:
- full-table rerender mỗi keypress;
- expensive nested loops.

==================================================
24. EXAM BUILDER PERFORMANCE
==================================================

P0.

Test:

10 questions
30 questions
50 questions
100 questions nếu hợp lý.

Đo:
- load;
- select question;
- add/remove;
- reorder;
- recalculation;
- statistics.

==================================================
25. RUBRIC PERFORMANCE
==================================================

Test:
- few criteria;
- many criteria/levels.

Đo:
- input update;
- total recalculation;
- table render.

==================================================
26. SLIDES PERFORMANCE
==================================================

Test:

5 slides
20 slides
50 slides
100 slides nếu realistic.

Đo:
- editor load;
- thumbnail render;
- slide switching;
- duplicate;
- reorder;
- presentation start.

==================================================
27. AUTOSAVE PERFORMANCE
==================================================

P0.

Đo:

user edit
→ autosave starts
→ autosave completed

Kiểm tra:
- debounce;
- typing không lag;
- repeated changes;
- storage write frequency.

Không để localStorage.setItem serialize toàn state mỗi keystroke nếu state lớn và gây lag.

==================================================
28. LOCALSTORAGE SERIALIZATION
==================================================

Nếu state lớn:

đo:

JSON.stringify(AppState)
localStorage.setItem(...)
JSON.parse(...)

với:
- small dataset;
- medium;
- realistic-large.

Ghi time.

==================================================
29. RESTORE PERFORMANCE
==================================================

Test backup JSON:

small
medium
large realistic.

Đo:

upload/select
→ parse
→ validate
→ restore
→ app ready.

==================================================
30. BACKUP PERFORMANCE
==================================================

Đo:
state
→ serialization
→ blob/download ready.

==================================================
31. EXPORT PERFORMANCE
==================================================

P0/P1.

Đo riêng:

KHBD DOCX
Exam DOCX
Matrix DOCX
Rubric DOCX
Slides PPTX
Offline HTML
JSON

Ghi:
- generation duration;
- file size;
- UI responsiveness trong lúc generate.

==================================================
32. EXPORT LARGE DATASET
==================================================

Tạo realistic-large document:

- long KHBD;
- exam nhiều questions;
- slides ~30–50.

Đo export.

Không cần extreme dataset ở Performance Test;
Stress Test xử lý extreme.

==================================================
33. MAIN THREAD BLOCKING
==================================================

Tìm long tasks.

Nếu export mất 3s và block UI hoàn toàn:
đó là performance UX issue dù kết quả đúng.

Có thể cân nhắc:
- async chunking;
- Web Worker;
- lazy generation.

Chỉ đề xuất sau profiling.

==================================================
34. INTERACTION LATENCY
==================================================

Đo các action user cảm nhận trực tiếp:

- button click;
- modal open;
- tab switch;
- accordion;
- question selection;
- slide selection.

Mục tiêu:
response gần như tức thì cho local state operations.

Nếu > vài trăm ms:
investigate.

==================================================
35. REACT RERENDER AUDIT
==================================================

Dùng React Profiler nếu cần.

Tìm:
- toàn App rerender khi nhập một field;
- list hàng trăm item rerender;
- unstable callbacks;
- large context update.

Không memoize mọi thứ vô tội vạ.

==================================================
36. REACT PROFILER
==================================================

Nếu bottleneck render:

dùng React DevTools Profiler hoặc programmatic profiling nếu feasible.

Ghi:
- component;
- render count;
- duration;
- trigger.

==================================================
37. MEMORY USAGE
==================================================

Test representative long session:

- open lesson;
- switch modules;
- edit;
- open/close modal;
- switch lessons;
- open slides.

Quan sát:
memory có tăng liên tục không.

Tìm:
- event listener leak;
- object URL leak;
- timers;
- stale references.

==================================================
38. OBJECT URL LEAK
==================================================

Nếu dùng:

URL.createObjectURL()

phải:
URL.revokeObjectURL()

khi phù hợp.

Đặc biệt export/download.

==================================================
39. EVENT LISTENER LEAK
==================================================

Kiểm tra component:
- selection;
- keyboard;
- resize;
- scroll.

Khi mount/unmount:
listeners phải cleanup.

==================================================
40. TIMER CLEANUP
==================================================

Audit:

setTimeout
setInterval

đặc biệt:
autosave
toast
debounce.

Cleanup khi component unmount nếu cần.

==================================================
41. PERFORMANCE OBSERVER
==================================================

Nếu hữu ích,
có thể dùng Performance API:

performance.mark()
performance.measure()

cho:
- restore;
- export;
- expensive transformations.

Không rải instrumentation khắp app nếu không cần.

==================================================
42. PLAYWRIGHT PERFORMANCE TESTS
==================================================

Có thể tạo:

tests/
└── performance/
    ├── startup.perf.spec.ts
    ├── navigation.perf.spec.ts
    ├── reader.perf.spec.ts
    ├── question-bank.perf.spec.ts
    ├── exam.perf.spec.ts
    ├── slides.perf.spec.ts
    ├── persistence.perf.spec.ts
    └── export.perf.spec.ts

==================================================
43. PLAYWRIGHT TIMING
==================================================

Có thể đo:

const start = performance.now();

action

await expectedState;

const duration = performance.now() - start;

Nhưng:
performance.now của Node và browser khác context.

Dùng measurement nhất quán.

==================================================
44. AVOID BRITTLE PERFORMANCE ASSERTIONS
==================================================

Không assert:

duration < 100ms

trên CI shared hardware nếu không ổn định.

Dùng:
- generous budget;
- median;
- percentile;
- regression percentage.

==================================================
45. MULTIPLE RUNS
==================================================

Performance test nên chạy nhiều lần.

Ví dụ:
5–10 runs.

Loại:
warm-up run nếu relevant.

Ghi:
- median;
- min;
- max;
- p95 nếu đủ samples.

==================================================
46. PERFORMANCE BASELINE
==================================================

Sau khi đo:
tạo baseline.

Ví dụ:

Dashboard ready:
median 420ms

Reader open:
median 180ms

Exam 50Q load:
median 260ms

Không lấy ví dụ này làm requirement;
phải đo project thật.

==================================================
47. REGRESSION THRESHOLD
==================================================

Sau baseline:
có thể flag nếu chậm hơn:

20–30%

hoặc vượt budget rõ ràng.

Threshold phải dựa trên variance thực tế.

==================================================
48. LIGHTHOUSE
==================================================

Nếu phù hợp:
chạy Lighthouse cho initial application load.

Quan tâm:
- Performance
- JS execution
- unused JS
- main-thread work

Nhưng app desktop productivity tool không nên tối ưu chỉ để lấy 100 Lighthouse.

==================================================
49. LIGHTHOUSE MODE
==================================================

Dùng production build.

Không kết luận dựa vào một run duy nhất.

==================================================
50. NETWORK THROTTLING
==================================================

Nếu app cần network/backend:

test:
- normal connection;
- slower network representative.

Nếu app gần như local/offline:
network throttling không phải trọng tâm.

==================================================
51. CPU THROTTLING
==================================================

Có thể dùng để phát hiện render nặng trên máy giáo viên cấu hình trung bình.

Không dùng mức throttle cực đoan làm baseline chính.

==================================================
52. OFFLINE / LOCAL APP
==================================================

Nếu functionality chạy local:
performance phải tốt hơn network-heavy SaaS.

Đặc biệt:
- switching;
- input;
- save;
- search

không nên có latency dài.

==================================================
53. TEST DATA SIZES
==================================================

Định nghĩa:

SMALL
MEDIUM
LARGE-REALISTIC

Ví dụ Question Bank:

Small:
10

Medium:
100

Large realistic:
500–1000

Nhưng phải điều chỉnh theo product thực tế.

==================================================
54. PERFORMANCE TEST CASE FORMAT
==================================================

Cập nhật:

docs/testing/16_PERFORMANCE_TESTING.md

Mỗi case:

ID:
Area:
Scenario:
Dataset:
Environment:
Runs:
Metric:
Baseline:
Budget:
Median:
P95:
Result:
Evidence:
Bottleneck:

Ví dụ:

PERF-EXAM-001

Scenario:
Open Exam containing 50 questions

Metric:
Time to interactive

Runs:
10

Result:
...

==================================================
55. PERFORMANCE BUG FORMAT
==================================================

PERF-BUG-001

Area:
Scenario:
Dataset:
Environment:
Baseline:
Actual:
Regression:
User Impact:
Severity:
Profiler Evidence:
Root Cause:
Fix:
Retest:

==================================================
56. SEVERITY
==================================================

Critical:
- app freezes/crashes;
- operation cannot complete.

High:
- typing/interactions block seconds;
- export freezes app severely;
- Reader unusable.

Medium:
- noticeable delay;
- unnecessary rerender;
- large bundle issue.

Low:
- optimization opportunity with limited user impact.

==================================================
57. PERFORMANCE BUDGET
==================================================

Sau khi có baseline:
đề xuất budget thực tế cho:

- initial load;
- Dashboard ready;
- Reader open;
- Question search;
- Exam load;
- autosave;
- export.

Không tự tạo target nếu chưa đo.

==================================================
58. OPTIMIZATION POLICY
==================================================

Không optimization theater.

Thứ tự:

MEASURE
→ PROFILE
→ IDENTIFY BOTTLENECK
→ FIX
→ MEASURE AGAIN

Không:
- thêm useMemo khắp nơi;
- thêm virtualization khi list chỉ 20 item;
- lazy load mọi component nhỏ.

==================================================
59. POSSIBLE OPTIMIZATIONS
==================================================

Chỉ áp dụng khi evidence support:

- React.memo
- useMemo/useCallback
- list virtualization
- debounced search
- lazy module loading
- dynamic import export libraries
- Web Worker
- smaller state subscriptions
- chunked processing
- optimized serialization

==================================================
60. VALIDATE AFTER OPTIMIZATION
==================================================

Sau mỗi optimization:

1. run performance test;
2. compare before/after;
3. run functional tests;
4. run regression;
5. confirm no behavior change.

==================================================
61. PERFORMANCE REPORT
==================================================

Cập nhật:

docs/testing/16_PERFORMANCE_TESTING.md

Bao gồm:

# Performance Testing Report

## 1. Objective
## 2. Environment
## 3. Production Build
## 4. Performance Baseline
## 5. Initial Load
## 6. Bundle Analysis
## 7. Dashboard
## 8. Reader
## 9. KHBD
## 10. Question Bank
## 11. Matrix
## 12. Exam
## 13. Rubric
## 14. Slides
## 15. Autosave/Persistence
## 16. Backup/Restore
## 17. Export
## 18. Memory Findings
## 19. Bottlenecks
## 20. Optimizations Applied
## 21. Before/After Results
## 22. Performance Budgets
## 23. Remaining Risks

==================================================
62. EXECUTION
==================================================

Chạy production build:

npm run build
npm run preview

Sau đó chạy performance tests:

npx playwright test tests/performance

Nếu có Lighthouse:
chạy trên production preview URL.

Nếu sửa code:
chạy lại:

npm run test:run
npx playwright test tests/smoke

==================================================
63. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

Environment:
...

Bundle size:
...

Initial load:
...

Dashboard ready:
...

Reader open:
...

Question search:
...

Exam load:
...

Autosave:
...

Backup:
...

Restore:
...

DOCX export:
...

PPTX export:
...

Memory issues:
N

Performance bugs:
N

Critical:
N

High:
N

Medium:
N

Optimizations applied:
N

Measured improvement:
...

Overall:
PASS / PASS WITH RISKS / FAIL

QUAN TRỌNG:

Performance Testing phải trả lời:

"Một giáo viên sử dụng EduMaster-Literature với lượng dữ liệu thực tế có cảm thấy ứng dụng phản hồi nhanh và ổn định không?"

Không chỉ:

"Lighthouse được bao nhiêu điểm?"

Quy trình chuẩn:

DEFINE REALISTIC DATA
→ BUILD PRODUCTION
→ MEASURE BASELINE
→ PROFILE
→ IDENTIFY BOTTLENECK
→ OPTIMIZE IF NEEDED
→ MEASURE AGAIN
→ REGRESSION CHECK
→ REPORT