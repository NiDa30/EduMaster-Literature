Bạn là Senior QA Performance Engineer + Load Test Architect + Backend/Frontend Performance Engineer.

NHIỆM VỤ:
Thiết kế và triển khai LOAD TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Xác định hệ thống hoạt động như thế nào khi có nhiều user/request đồng thời.
- Đo throughput, latency, error rate và resource usage dưới tải thực tế.
- Xác định mức tải hệ thống chịu được trong điều kiện sử dụng bình thường đến cao.
- Phân biệt rõ:
  Performance Testing
  ≠ Load Testing
  ≠ Stress Testing.
- Không tạo hàng nghìn request giả nếu project hiện tại là frontend-only/localStorage.
- Chỉ Load Test các thành phần thực sự có shared backend/API/database/server.
- Nếu project hiện tại hoàn toàn client-side/localStorage thì phải ghi rõ phần nào N/A thay vì tự dựng backend giả.

==================================================
1. ĐỌC KIẾN TRÚC THỰC TẾ TRƯỚC
==================================================

Đọc:

README*
package.json
vite.config.*
src/
docs/

Đọc:

docs/testing/02_API_TESTING.md
docs/testing/03_DATABASE_TESTING.md
docs/testing/06_SMOKE_TESTING.md
docs/testing/12_E2E_TESTING.md
docs/testing/16_PERFORMANCE_TESTING.md

Kiểm tra project có:

- REST API?
- GraphQL?
- backend server?
- database server?
- cloud functions?
- Supabase/Firebase?
- authentication?
- file storage?
- external AI API?
- export server-side?
- telemetry/MQTT?

KHÔNG GIẢ ĐỊNH BACKEND TỒN TẠI.

==================================================
2. QUYẾT ĐỊNH LOAD TEST CÓ ÁP DỤNG KHÔNG
==================================================

Sau audit, phân loại:

MODE A — FULL LOAD TESTING

Có backend/API/database dùng chung.

MODE B — PARTIAL LOAD TESTING

Chỉ một số service dùng server:
ví dụ AI generation / export API / sync.

MODE C — NOT APPLICABLE TO CURRENT ARCHITECTURE

App chạy client-side:
- React/Vite
- LocalStorage/IndexedDB
- export local
- không shared API/backend

Nếu Mode C:
KHÔNG tạo fake API chỉ để có Load Test.

Thay vào đó:
ghi:
"Server-side Load Testing: N/A"

và có thể giữ performance-large-dataset ở phase #16.

==================================================
3. PHÂN BIỆT LOAD TEST VS PERFORMANCE
==================================================

Performance #16 hỏi:

"Một user dùng app có nhanh không?"

Load Testing hỏi:

"100/500/1000 user hoặc request đồng thời thì hệ thống có còn đáp ứng được không?"

Stress #18 hỏi:

"Khi tăng tải vượt ngưỡng bình thường thì hệ thống gãy ở đâu?"

==================================================
4. XÁC ĐỊNH LOAD TARGET
==================================================

Nếu có backend:

Không tự đặt:

10,000 users

mà không có căn cứ.

Xác định từ:
- expected user base;
- target deployment;
- classroom/school use;
- actual architecture;
- server capacity.

Nếu chưa có business requirement:
tạo các mức kỹ thuật có kiểm soát và ghi rõ là test assumptions.

Ví dụ:

Baseline:
1 VU

Normal:
10 VUs

Expected peak:
25–50 VUs

High load:
100 VUs

Chỉ là ví dụ.
Phải điều chỉnh theo hệ thống thật.

==================================================
5. TOOL SELECTION
==================================================

Ưu tiên một tool duy nhất.

Có thể dùng:

k6

hoặc nếu project đã có:
JMeter
Artillery
Locust

Ưu tiên k6 cho REST/API load test đơn giản.

Không cài 3 công cụ khác nhau cho cùng mục tiêu.

==================================================
6. K6 SETUP
==================================================

Nếu chọn k6:

không cần nhúng vào frontend dependencies nếu không cần.

Có thể tạo:

tests/
└── load/
    ├── smoke-load.js
    ├── normal-load.js
    ├── peak-load.js
    ├── endpoints/
    ├── scenarios/
    └── data/

Nếu repo ưu tiên TS/JS:
giữ cấu trúc nhất quán.

==================================================
7. ENVIRONMENT
==================================================

KHÔNG chạy load test mạnh vào production thật nếu chưa được phép.

Ưu tiên:

staging
load-test environment
local backend representative

Ghi:

Host:
Server specs:
DB specs:
Region:
Build version:
Dataset:
Network:
Test time:

==================================================
8. BASELINE TEST
==================================================

Trước concurrent load:

1 VU
hoặc
1 request stream.

Mục tiêu:
xác định baseline latency.

Metrics:

p50
p90
p95
p99
error rate
throughput

==================================================
9. LOAD SCENARIOS
==================================================

Nếu có backend,
xác định các scenario thực.

Ví dụ:

A. Read-heavy

- get lessons
- get question bank
- load exam

B. Write-heavy

- save lesson
- save question
- autosave

C. Mixed

80% read
20% write

Tỷ lệ phải dựa trên behavior thật nếu có dữ liệu.

==================================================
10. USER JOURNEY LOAD
==================================================

Không chỉ spam một endpoint.

Mô phỏng session đại diện:

Login nếu có
→ Get Lessons
→ Open Lesson
→ Fetch Reader/State
→ Save Changes
→ Fetch Questions
→ Save Question

Chỉ nếu API thật có các endpoint đó.

==================================================
11. AUTHENTICATION
==================================================

Nếu hệ thống có auth:

test:
- token reuse phù hợp;
- nhiều user identities;
- token expiration nếu relevant.

Không dùng cùng một test account cho mọi concurrent write nếu điều đó không phản ánh thực tế và gây lock giả.

Nếu không có auth:
N/A.

==================================================
12. READ ENDPOINT LOAD
==================================================

Ví dụ nếu có API:

GET /lessons
GET /lessons/:id
GET /questions
GET /exam/:id

Đo:
- response time;
- status;
- payload;
- errors.

==================================================
13. WRITE ENDPOINT LOAD
==================================================

Ví dụ:

POST /lessons
PUT /lessons/:id
POST /questions
PUT /exam/:id

Kiểm tra:
- latency;
- failures;
- duplicate write;
- data integrity.

==================================================
14. AUTOSAVE LOAD
==================================================

Nếu autosave gửi server request:

P0.

Mô phỏng nhiều users editing cùng lúc.

Ví dụ:
mỗi user save theo debounce thực tế.

Không spam autosave 10 lần/giây nếu app thật debounce 1–2 giây.

Mục tiêu:
mô phỏng production behavior.

==================================================
15. SEARCH LOAD
==================================================

Nếu search server-side:

test:
- search query;
- filter;
- pagination.

Đặc biệt:
Unicode Vietnamese.

Ví dụ:
"Tây Tiến"

Đo:
p95 latency.

==================================================
16. QUESTION BANK LOAD
==================================================

Nếu server-side:

scenario:
- fetch 100/500 questions;
- filter;
- save question.

Kiểm tra:
- query time;
- pagination;
- indexes.

==================================================
17. MATRIX / EXAM LOAD
==================================================

Nếu calculation server-side:

test concurrent:
- get matrix;
- save matrix;
- validate exam.

Nếu calculation client-side:
N/A cho load.

==================================================
18. EXPORT LOAD
==================================================

Nếu DOCX/PPTX export server-side:

đây là endpoint nặng.

Load Test riêng:

1
5
10
20 concurrent export jobs

Không dùng cùng concurrency với lightweight GET request.

Đo:
- completion time;
- memory;
- CPU;
- queue;
- failures.

==================================================
19. AI API LOAD
==================================================

Nếu EduMaster gọi:
- OpenAI;
- Gemini;
- Claude;
- internal AI API

KHÔNG load test trực tiếp third-party API vô hạn.

Thay vào đó:
- mock provider;
- load test internal gateway/service;
- respect provider rate limits.

Nếu third-party is direct frontend integration:
ghi limitation.

==================================================
20. RATE LIMIT
==================================================

Nếu server có rate limit:

test:
- dưới limit;
- sát limit;
- vượt limit.

Expected:
429 hoặc behavior documented.

Không xem 429 đúng thiết kế là server failure.

==================================================
21. DATABASE CONNECTION POOL
==================================================

Nếu backend + DB:

monitor:
- active connections;
- waiting connections;
- pool saturation;
- connection timeout.

Load có thể fail không phải do API logic mà vì pool.

==================================================
22. DATABASE QUERY PERFORMANCE
==================================================

Dưới concurrent load:

tìm:
- slow queries;
- sequential scans;
- N+1;
- lock waits;
- missing indexes.

Không chỉ xem HTTP response time.

==================================================
23. CACHE
==================================================

Nếu có cache:

phân biệt:
Cold cache
Warm cache

Kiểm tra:
- hit rate;
- invalidation;
- stale data.

==================================================
24. CONCURRENCY
==================================================

Load Test phải test concurrent behavior.

Ví dụ:
20 users cùng save lesson khác nhau.

Sau đó:
20 users cùng read shared dataset.

Nếu collaboration cùng một lesson không được product support:
không giả lập concurrent editing cùng record trừ khi muốn test safety.

==================================================
25. DATA COLLISION
==================================================

Nếu nhiều test user write:

dùng unique IDs.

Ví dụ:

lesson-load-${__VU}-${__ITER}

Không để load test fail vì tất cả cùng tạo record có unique key giống nhau.

==================================================
26. TEST DATA CLEANUP
==================================================

Sau load:

xóa test records nếu cần.

Không để DB chứa hàng chục nghìn fake lessons/questions.

Có thể:
- test tenant riêng;
- prefix;
- cleanup script.

==================================================
27. RAMP-UP
==================================================

Không từ:
0 → 1000 user ngay lập tức
trong Load Testing bình thường.

Dùng ramp:

0
→ 10
→ 25
→ 50
→ hold
→ down

Stress Testing mới cố tình đẩy mạnh tới failure.

==================================================
28. SOAK KHÔNG PHẢI TRỌNG TÂM
==================================================

Load phase này tập trung tải trong khoảng thời gian vừa đủ.

Nếu muốn giữ tải nhiều giờ để tìm leak:
đưa vào Reliability/Recovery #19 hoặc extended load scenario.

==================================================
29. METRICS
==================================================

Bắt buộc thu:

http_req_duration
http_req_failed
http_reqs
iterations
vus
vus_max

Quan tâm:

p50
p90
p95
p99

Nếu backend:
CPU
RAM
DB
connections

==================================================
30. PERCENTILE > AVERAGE
==================================================

Không chỉ báo:

Average response = 200ms

Phải có:
p95
p99

Average có thể che requests rất chậm.

==================================================
31. ERROR RATE
==================================================

Phân loại:

expected:
400 validation
401/403 permission
429 rate limit

unexpected:
500
502
503
timeout
connection reset

Không cộng tất cả status != 200 thành system failure một cách mù quáng.

==================================================
32. THRESHOLDS
==================================================

Chỉ đặt threshold sau khi biết requirement/baseline.

Ví dụ concept:

http_req_failed < 1%

p95 < 500ms

Không coi các số này là requirement chính thức.

Nếu chưa có SLA:
ghi:
"Provisional engineering threshold."

==================================================
33. SERVICE LEVEL OBJECTIVES
==================================================

Nếu project chưa có SLO:
đề xuất từ số liệu.

Ví dụ:

Read API:
p95 <= X

Write:
p95 <= Y

Export:
95% complete <= Z

Nhưng không invent như requirement chính thức.

==================================================
34. FRONTEND STATIC HOST LOAD
==================================================

Nếu chỉ deploy static Vite bundle:

load testing app server thường ít giá trị nếu dùng CDN.

Có thể test:
- static asset delivery;
- CDN;
- TTFB

nhưng chỉ nếu deployment architecture đã tồn tại.

Nếu local-only:
N/A.

==================================================
35. LOCALSTORAGE MODE
==================================================

Nếu toàn project:
React
+ LocalStorage

thì không tồn tại concept:
100 concurrent users tác động cùng storage.

Mỗi browser có storage riêng.

Không được giả lập "100 LocalStorage users".

Kết luận:
server load N/A.

==================================================
36. API INVENTORY TABLE
==================================================

Nếu API tồn tại, lập bảng:

| Endpoint | Method | Category | Weight | Expected Frequency | Load Priority |
|---|---|---|---|---|---|

Ví dụ:
Lessons read
Questions search
Autosave
Export

==================================================
37. WORKLOAD MODEL
==================================================

Tạo workload mix thực tế.

Ví dụ giả định:

60% read lesson/question
25% autosave/write
10% search/filter
5% export

Nếu không có analytics:
ghi rõ đây là:
"engineering assumption"

không phải production statistic.

==================================================
38. THINK TIME
==================================================

User thật không click liên tục như bot.

Giữa operations:
sleep representative.

Ví dụ:
1–5 sec

Nhưng giữ test thời lượng hợp lý.

Không tạo synthetic traffic quá khác user behavior.

==================================================
39. SPIKE KHÔNG PHẢI PHASE CHÍNH
==================================================

Sudden:
10 → 500 VU

đó gần Stress/Spike testing.

Trong Load Testing:
có thể test modest peak,
không cố gây failure.

==================================================
40. RESOURCE MONITORING
==================================================

Nếu kiểm soát backend:

monitor:

CPU
RAM
GC
event loop
thread pool
network
disk I/O
DB connections

Nếu cloud:
có thể dùng metrics của platform.

==================================================
41. NODE BACKEND
==================================================

Nếu backend Node.js:
quan tâm:
- event loop delay;
- memory;
- CPU;
- open handles.

==================================================
42. JAVA BACKEND
==================================================

Nếu backend Spring Boot:
quan tâm:
- JVM heap;
- GC;
- threads;
- HikariCP;
- DB;
- HTTP executor.

Chỉ áp dụng nếu project thực tế dùng Java backend.

==================================================
43. RESPONSE VALIDATION
==================================================

Load test không chỉ đo speed.

Check:
- status đúng;
- body tối thiểu hợp lệ;
- ID tồn tại;
- data không corruption.

Không parse body cực nặng nếu làm load generator thành bottleneck.

==================================================
44. LOAD GENERATOR BOTTLENECK
==================================================

Đảm bảo máy chạy k6 không phải điểm nghẽn trước server.

Monitor:
CPU/RAM của load-generator.

Nếu generator 100% CPU:
kết quả không đáng tin.

==================================================
45. MULTIPLE RUNS
==================================================

Không kết luận từ 1 lần.

Chạy ít nhất:
- baseline;
- normal load;
- peak load.

Nếu kết quả bất thường:
retest.

==================================================
46. SAMPLE K6 STRUCTURE
==================================================

Ví dụ concept:

export const options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "2m", target: 10 },
    { duration: "30s", target: 25 },
    { duration: "2m", target: 25 },
    { duration: "30s", target: 0 },
  ],
};

Các số chỉ là template.

Phải điều chỉnh sau audit.

==================================================
47. LOAD TEST PHASES
==================================================

Phase A:
Baseline

Phase B:
Normal load

Phase C:
Expected peak

Phase D:
Recovery to zero

Stress beyond peak để #18 xử lý.

==================================================
48. LOAD TEST CASE FORMAT
==================================================

Cập nhật:

docs/testing/17_LOAD_TESTING.md

Mỗi scenario:

ID:
Service/API:
Workload:
VU/Concurrency:
Duration:
Ramp:
Dataset:
Environment:
Expected:
Threshold:
p50:
p95:
p99:
Throughput:
Error Rate:
Resource Usage:
Result:
Evidence:

==================================================
49. EXAMPLE CASE
==================================================

LOAD-AUTOSAVE-001

Scenario:
Concurrent lesson autosave

Users:
25

Behavior:
Mỗi VU cập nhật lesson của riêng mình với cadence tương tự UI thật.

Metrics:
p95 latency
error rate
DB connection usage

Expected:
Không data loss / unexpected server error.

==================================================
50. DATA INTEGRITY UNDER LOAD
==================================================

Sau write load:

sample records và kiểm tra:
- đúng owner/user;
- đúng lesson;
- không missing field;
- không duplicate ngoài ý muốn;
- timestamps hợp lệ.

Performance tốt nhưng data sai = FAIL.

==================================================
51. CONCURRENT UPDATE
==================================================

Nếu hệ thống cho phép nhiều session update cùng object:

test:
- optimistic locking;
- last-write-wins;
- conflict handling

chỉ theo behavior thực tế.

Không tự đặt collaborative editing requirement nếu không tồn tại.

==================================================
52. FAILURE BEHAVIOR
==================================================

Nếu một request fail dưới tải:

kiểm tra:
- retry tự động?
- duplicate write?
- user-safe error?
- server recovery?

Deep recovery ở #19.

==================================================
53. LOAD BUG FORMAT
==================================================

LOAD-BUG-001

Scenario:
Load:
Duration:
Environment:
Expected:
Actual:
p95:
p99:
Error Rate:
Throughput:
Resource Evidence:
Severity:
Root Cause:
Fix:
Retest:

==================================================
54. SEVERITY
==================================================

Critical:
- data corruption;
- server crash;
- uncontrolled data loss.

High:
- error rate lớn ở expected load;
- core API timeout;
- autosave failures.

Medium:
- degraded latency;
- pool saturation near peak.

Low:
- optimization opportunity.

==================================================
55. BOTTLENECK ANALYSIS
==================================================

Nếu latency tăng:
không kết luận ngay "server yếu".

Kiểm tra:

API
→ app code
→ DB
→ connection pool
→ network
→ third-party
→ queue
→ CPU/RAM

==================================================
56. OPTIMIZATION
==================================================

Chỉ tối ưu sau evidence.

Có thể gồm:
- DB index;
- query optimization;
- pagination;
- cache;
- connection pool;
- batch writes;
- async processing;
- rate limit;
- export queue.

Không tăng server size ngay nếu query sai.

==================================================
57. RETEST
==================================================

Sau fix:
chạy cùng:
- environment;
- dataset;
- workload;
- duration.

Nếu thay điều kiện test:
không so sánh trực tiếp trước/sau.

==================================================
58. REGRESSION AFTER PERFORMANCE FIX
==================================================

Sau backend/performance change:

chạy:
- API tests
- Database tests
- Smoke
- relevant E2E
- regression

để chắc optimization không phá logic.

==================================================
59. LOAD TEST REPORT
==================================================

Cập nhật:

docs/testing/17_LOAD_TESTING.md

Bao gồm:

# Load Testing Report

## 1. Applicability Assessment
## 2. Architecture
## 3. Target Services
## 4. Environment
## 5. Workload Model
## 6. Load Levels
## 7. Test Data
## 8. Baseline Results
## 9. Normal Load Results
## 10. Peak Load Results
## 11. Latency
## 12. Throughput
## 13. Error Rate
## 14. Server Resources
## 15. Database Findings
## 16. Data Integrity
## 17. Bottlenecks
## 18. Bugs
## 19. Optimizations
## 20. Retest Results
## 21. Capacity Recommendation
## 22. Limitations

==================================================
60. N/A REPORT MODE
==================================================

Nếu project hiện tại không có backend/shared service:

VẪN cập nhật:

docs/testing/17_LOAD_TESTING.md

Ghi rõ:

Status:
NOT APPLICABLE TO CURRENT CLIENT-SIDE ARCHITECTURE

Reason:
- Vite/React client-side
- browser-local persistence
- no shared API/database discovered

Không tự thêm server chỉ để hoàn thành checklist.

Liệt kê:
những thành phần nào trong tương lai sẽ cần Load Testing nếu backend được thêm.

==================================================
61. ACCEPTANCE CRITERIA
==================================================

Nếu applicable:

PASS khi:
- expected normal load ổn;
- peak load trong accepted limits;
- không data corruption;
- unexpected error rate trong threshold;
- p95/p99 chấp nhận được;
- resource usage không saturation nguy hiểm.

FAIL khi:
- expected load làm core service fail;
- data sai;
- server crash;
- error/latency vượt accepted threshold rõ ràng.

==================================================
62. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

Load Testing Applicability:
FULL / PARTIAL / N/A

Target services:
...

Baseline:
...

Normal load:
... VUs

Peak load:
... VUs

p50:
...

p95:
...

p99:
...

Throughput:
...

Error rate:
...

CPU peak:
...

RAM peak:
...

DB connection peak:
...

Data integrity:
PASS/FAIL

Load bugs:
N

Critical:
N

High:
N

Capacity recommendation:
...

Overall:
PASS / PASS WITH RISKS / FAIL / N/A

QUAN TRỌNG:

Load Testing không phải:

"Gửi càng nhiều request càng tốt."

Mà phải trả lời:

"Ở mức tải dự kiến trong thực tế, backend/service của EduMaster-Literature có còn phản hồi ổn định, chính xác và không mất dữ liệu hay không?"

Quy trình:

AUDIT ARCHITECTURE
→ DETERMINE APPLICABILITY
→ DEFINE WORKLOAD
→ BASELINE
→ NORMAL LOAD
→ EXPECTED PEAK
→ MEASURE
→ ANALYZE BOTTLENECK
→ FIX
→ RETEST
→ REPORT