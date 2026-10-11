Bạn là Senior QA Performance Engineer + Stress Test Architect + Reliability Engineer.

NHIỆM VỤ:
Thiết kế và triển khai STRESS TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Xác định giới hạn chịu tải của hệ thống.
- Tìm điểm hệ thống bắt đầu suy giảm, timeout, lỗi, mất ổn định hoặc crash.
- Quan sát hệ thống phản ứng như thế nào khi tải vượt mức bình thường.
- Xác định hệ thống có phục hồi được sau khi tải giảm hay không.
- Không nhầm Stress Testing với Load Testing.
- Không cố tình phá production thật.
- Không stress những thành phần không có shared backend/service.
- Nếu kiến trúc hiện tại chỉ frontend/localStorage, phải ghi rõ phần stress server là N/A thay vì dựng backend giả.

==================================================
1. ĐỌC KIẾN TRÚC VÀ LOAD TEST REPORT TRƯỚC
==================================================

Đọc:

README*
package.json
vite.config.*
src/
docs/

Đọc bắt buộc:

docs/testing/02_API_TESTING.md
docs/testing/03_DATABASE_TESTING.md
docs/testing/16_PERFORMANCE_TESTING.md
docs/testing/17_LOAD_TESTING.md

Đọc thêm nếu cần:

docs/testing/12_E2E_TESTING.md
docs/testing/14_REGRESSION_TESTING.md
docs/testing/15_SANITY_TESTING.md

Mục tiêu đầu tiên:

Xác định Stress Testing có thực sự áp dụng được cho kiến trúc hiện tại không.

==================================================
2. PHÂN BIỆT STRESS TEST VỚI LOAD TEST
==================================================

Load Testing hỏi:

"Ở tải dự kiến, hệ thống có hoạt động ổn định không?"

Stress Testing hỏi:

"Nếu tiếp tục tăng tải vượt ngưỡng dự kiến, hệ thống bắt đầu hỏng ở đâu và hỏng như thế nào?"

Ví dụ:

Load:
50 concurrent users là expected peak.

Stress:
50
→ 100
→ 200
→ 400
→ tăng tiếp cho đến khi xuất hiện degradation/failure có kiểm soát.

Mục tiêu không phải tạo số user lớn cho đẹp.

Mục tiêu là tìm BREAKING POINT.

==================================================
3. APPLICABILITY ASSESSMENT
==================================================

Sau audit, phân loại:

MODE A — FULL STRESS TESTING
Có backend/API/database/server dùng chung.

MODE B — PARTIAL STRESS TESTING
Chỉ một số service dùng server:
- AI
- export
- sync
- cloud storage

MODE C — NOT APPLICABLE
App chỉ dùng:
- React/Vite
- LocalStorage/IndexedDB
- local export
- không shared backend.

Nếu Mode C:

Không tạo synthetic server.

Ghi:

Server-side Stress Testing:
N/A

Sau đó chỉ ghi các giới hạn client-side có liên quan nếu đã được Performance Testing phát hiện.

==================================================
4. ENVIRONMENT SAFETY
==================================================

KHÔNG stress:

production thật

trừ khi có approval rõ ràng.

Ưu tiên:

- dedicated stress environment;
- staging isolated;
- local controlled environment.

Trước test phải biết:

Host:
Server specs:
DB specs:
Resource limits:
Autoscaling:
Rate limits:
External dependencies:
Test dataset:

==================================================
5. TOOL
==================================================

Nếu #17 đã dùng k6:
tiếp tục dùng k6.

Không đổi sang JMeter chỉ vì đây là Stress Test.

Reuse:

tests/load/

hoặc tạo:

tests/stress/

Ví dụ:

tests/
└── stress/
    ├── api.stress.js
    ├── autosave.stress.js
    ├── search.stress.js
    ├── export.stress.js
    ├── recovery.stress.js
    └── scenarios/

==================================================
6. INPUT TỪ LOAD TESTING
==================================================

Stress Test phải bắt đầu từ kết quả #17.

Ví dụ:

Load Test xác nhận:
50 VUs = stable.

Stress Test có thể bắt đầu:

50
→ 75
→ 100
→ 150
→ 200
...

Không bắt đầu từ 1 nếu baseline đã biết.

==================================================
7. ĐỊNH NGHĨA BREAKING POINT
==================================================

Breaking point không nhất thiết là server crash.

Có thể là:

- p95 tăng mạnh;
- error rate vượt giới hạn;
- 5xx xuất hiện;
- timeout tăng;
- DB connection pool đầy;
- CPU 100%;
- memory tăng không hồi;
- queue tăng liên tục;
- autosave không hoàn thành;
- data inconsistency;
- export queue tắc.

Phải định nghĩa trước khi chạy.

==================================================
8. STRESS LEVELS
==================================================

Thiết kế theo từng level.

Ví dụ concept:

Stage 1:
Known safe load

Stage 2:
1.5× expected peak

Stage 3:
2× expected peak

Stage 4:
3× expected peak

Stage 5:
tiếp tục tăng cho đến degradation/failure hoặc safety limit.

Không dùng con số này như requirement cố định.

Điều chỉnh từ kết quả Load Test thật.

==================================================
9. SAFETY LIMIT
==================================================

Phải có hard stop.

Ví dụ stop nếu:

- error rate > 30%;
- CPU > 95% kéo dài;
- memory gần OOM;
- DB unavailable;
- service crash;
- test environment ảnh hưởng service khác.

Không tiếp tục gửi traffic khi đã biết hệ thống đang hỏng nghiêm trọng.

==================================================
10. RAMP STRATEGY
==================================================

Stress load nên tăng từng bước.

Ví dụ:

50
→ hold
→ 100
→ hold
→ 150
→ hold
→ 200

Mục tiêu:
xác định vùng chuyển từ stable → degraded → failure.

Không chỉ spike ngay lên 1000.

==================================================
11. BASELINE BEFORE STRESS
==================================================

Trước stress run:

chạy một normal-load stage.

Xác nhận:
- service healthy;
- baseline latency bình thường;
- DB clean;
- resources bình thường.

Nếu environment đã degraded từ đầu:
test không đáng tin.

==================================================
12. READ STRESS
==================================================

Nếu API có read endpoints:

stress:
- lessons;
- questions;
- exam;
- matrix.

Quan sát:
- cache;
- DB reads;
- latency;
- throughput plateau.

==================================================
13. WRITE STRESS
==================================================

Nếu có server-side write:

stress:
- save lesson;
- autosave;
- save question;
- save exam.

Đặc biệt kiểm tra:
- duplicate;
- lost writes;
- transaction failures;
- lock waits.

==================================================
14. AUTOSAVE STRESS
==================================================

P0 nếu autosave server-side.

Scenario:

nhiều user đang chỉnh sửa
→ autosave theo cadence thực tế.

Tăng số VUs đến khi:

- latency tăng;
- request queue;
- write errors;
- data mismatch.

Không spam save vô lý nhanh hơn UI thật.

==================================================
15. SEARCH STRESS
==================================================

Nếu server search:

stress query:
- common query;
- rare query;
- Unicode Vietnamese.

Quan sát:
- index usage;
- DB CPU;
- p95;
- p99.

==================================================
16. EXPORT STRESS
==================================================

Nếu export server-side:

đây có thể là resource-heavy flow.

Test riêng.

Ví dụ:

1 export
→ 5
→ 10
→ 20 concurrent export jobs.

Quan sát:

CPU
RAM
queue
completion time
failure rate

Không trộn 200 export jobs với lightweight endpoint rồi kết luận chung.

==================================================
17. AI SERVICE STRESS
==================================================

Nếu có internal AI gateway:

stress internal gateway,
KHÔNG spam trực tiếp OpenAI/Gemini/Claude vượt provider policy/rate limit.

Có thể mock provider latency.

Quan sát:
- queue;
- retry;
- timeout;
- circuit breaker;
- rate limit behavior.

==================================================
18. RATE LIMIT STRESS
==================================================

Nếu server có rate limit:

tăng request vượt threshold.

Expected:
- controlled 429;
- server vẫn sống;
- không 500 hàng loạt;
- retry headers nếu implemented.

429 đúng thiết kế không phải stress failure.

==================================================
19. DATABASE STRESS
==================================================

Nếu backend dùng DB:

monitor:

- active connections;
- waits;
- lock time;
- deadlocks;
- CPU;
- disk;
- query duration;
- connection pool exhaustion.

Breaking point thường có thể nằm ở DB thay vì HTTP server.

==================================================
20. CONNECTION POOL EXHAUSTION
==================================================

Stress đến gần capacity.

Quan sát:
- waiting threads;
- timeout;
- pool usage.

Expected:
degradation có kiểm soát.

Không được:
data corruption.

==================================================
21. MEMORY STRESS
==================================================

Quan sát:

RAM
heap
GC
memory after load drops

Nếu memory:
500 MB
→ 1 GB
→ 2 GB
và không giảm sau traffic

có thể có leak.

==================================================
22. CPU SATURATION
==================================================

Xác định load tại đó:

CPU ~80%
CPU ~90%
CPU ~100%

Quan sát:
latency tăng thế nào.

Thông thường throughput sẽ plateau trước khi crash.

Ghi rõ.

==================================================
23. THROUGHPUT SATURATION
==================================================

Tạo graph/bảng:

VUs
→ requests/sec
→ p95
→ error rate

Tìm điểm:

tăng VUs nhưng throughput không tăng nữa.

Đây là saturation point.

==================================================
24. LATENCY CLIFF
==================================================

Tìm điểm:

50 users:
p95 250ms

100:
350ms

150:
500ms

200:
3s

Đây là latency cliff.

Không dùng ví dụ làm số liệu thật.

==================================================
25. ERROR CLIFF
==================================================

Tìm mức load mà:

5xx
timeouts
connection errors

bắt đầu tăng mạnh.

Ghi:
First failure point
Sustained failure point.

==================================================
26. DATA INTEGRITY UNDER STRESS
==================================================

P0.

Sau write stress:

sample records.

Kiểm tra:
- missing writes;
- duplicate writes;
- malformed records;
- wrong ownership;
- wrong lesson association.

Stress Test PASS không thể dựa chỉ vào HTTP 200.

==================================================
27. CONCURRENT SAME-RECORD UPDATE
==================================================

Chỉ test nếu hệ thống thực sự cho phép hoặc có nguy cơ.

Ví dụ:
2 sessions cùng sửa lesson.

Kiểm tra behavior:
- last-write-wins;
- version conflict;
- optimistic lock;
- overwrite.

Không tự yêu cầu collaborative editing nếu product không có.

==================================================
28. QUEUE SATURATION
==================================================

Nếu có queue/job system:

stress:
- export jobs;
- AI jobs;
- file processing.

Quan sát:
queue depth.

Nếu queue tăng nhanh hơn consume:
ghi capacity.

==================================================
29. EXTERNAL DEPENDENCY FAILURE
==================================================

Có thể simulate:
- slow AI provider;
- storage delay;
- database latency.

Không gây sự cố external service thật.

Expected:
- timeout;
- fallback;
- clear failure;
- server không collapse.

==================================================
30. NETWORK FAILURE SIMULATION
==================================================

Nếu infrastructure hỗ trợ:
simulate latency/packet loss nội bộ.

Chỉ khi có giá trị.

Không phải bắt buộc cho client-only project.

==================================================
31. SPIKE STRESS
==================================================

Sau gradual stress,
có thể có một spike representative:

expected load
→ sudden 2–3x.

Quan sát:
- autoscaling;
- queue;
- errors.

Không bắt buộc nếu infrastructure đơn giản.

==================================================
32. RECOVERY STAGE
==================================================

Rất quan trọng.

Sau high stress:

giảm về:
normal load
hoặc 0.

Quan sát:

- latency trở về baseline?
- error rate về 0?
- connections release?
- CPU giảm?
- RAM giảm?
- queue drain?
- service vẫn healthy?

Nếu không phục hồi:
đây là reliability issue.

Deep recovery sẽ tiếp tục ở #19.

==================================================
33. POST-STRESS HEALTH CHECK
==================================================

Sau traffic:

chạy:

Smoke API
hoặc
Smoke UI.

Ví dụ:
- mở Dashboard;
- load lesson;
- save question;
- export representative.

Expected:
app vẫn usable.

==================================================
34. CRASH BEHAVIOR
==================================================

Nếu server crash:

ghi chính xác:
- load level;
- resource state;
- last successful throughput;
- recovery behavior;
- restart requirement.

Không tiếp tục hammer server vô ích.

==================================================
35. OOM BEHAVIOR
==================================================

Nếu gần Out Of Memory:

dừng test nếu environment có nguy cơ mất ổn định.

Report:
- peak RAM;
- heap;
- operation gây memory spike.

==================================================
36. TIMEOUT BEHAVIOR
==================================================

Nếu request timeout:

phân biệt:

client timeout
reverse proxy timeout
server timeout
DB timeout
external API timeout.

Không ghi chung "timeout".

==================================================
37. RETRY STORM
==================================================

Nếu client/backend auto-retry:

stress có thể tạo retry storm.

Kiểm tra:
- exponential backoff;
- retry cap;
- duplicate write.

Nếu retry làm traffic tăng gấp nhiều lần:
report High/Critical tùy impact.

==================================================
38. CIRCUIT BREAKER
==================================================

Nếu backend có circuit breaker:

stress/fail dependency.

Expected:
- circuit opens;
- service degrade gracefully;
- recovers later.

Nếu không có feature:
N/A.

==================================================
39. AUTOSCALING
==================================================

Nếu deploy cloud có autoscaling:

ghi:
- scale trigger;
- scale-up delay;
- instance count;
- scale-down.

Không coi autoscaling là requirement nếu architecture chưa có.

==================================================
40. K6 STRESS STRUCTURE
==================================================

Ví dụ concept:

export const options = {
  stages: [
    { duration: "1m", target: 50 },
    { duration: "2m", target: 50 },

    { duration: "1m", target: 100 },
    { duration: "2m", target: 100 },

    { duration: "1m", target: 200 },
    { duration: "2m", target: 200 },

    { duration: "1m", target: 0 },
  ],
};

KHÔNG copy số này blindly.

Phải dựa trên #17 Load Testing.

==================================================
41. DYNAMIC STOP
==================================================

Nếu tooling/environment cho phép:
dừng thủ công hoặc tự động khi vượt safety threshold.

Không cố hoàn thành script bằng mọi giá.

==================================================
42. TEST DATA
==================================================

Write stress cần unique data.

Ví dụ:

stress-user-${VU}
stress-lesson-${VU}-${ITER}

Không để:
unique constraint tạo false failure.

==================================================
43. CLEANUP
==================================================

Sau test:

- remove generated records;
- clear files;
- clear temporary export jobs;
- reset test environment nếu cần.

Không cleanup trước khi lấy forensic evidence khi có lỗi.

==================================================
44. METRICS
==================================================

Bắt buộc:

VUs
Requests/sec
p50
p90
p95
p99
Error rate

Nếu backend control được:

CPU
RAM
GC
DB connections
Query latency
Queue depth
Disk/Network

==================================================
45. STRESS CURVE
==================================================

Tạo bảng:

| VUs | Throughput | p95 | p99 | Errors | CPU | RAM | Status |
|---:|---:|---:|---:|---:|---:|---:|---|

Xác định:

Safe Zone
Degraded Zone
Failure Zone

==================================================
46. CAPACITY TERMS
==================================================

Report ít nhất:

Normal Capacity
Recommended Maximum
Degradation Point
Breaking Point

Ví dụ:

Recommended Maximum ≠ Breaking Point.

Không vận hành production sát Breaking Point.

==================================================
47. SAFETY MARGIN
==================================================

Capacity recommendation nên có headroom.

Ví dụ concept:
nếu failure ở 200 VUs,
không khuyến nghị production max = 199.

Headroom phải dựa trên variance và architecture.

==================================================
48. MULTIPLE RUNS
==================================================

Nếu breaking point bất ngờ:

retest ít nhất một lần.

Không kết luận từ transient infrastructure issue.

==================================================
49. STRESS TEST CASE FORMAT
==================================================

Cập nhật:

docs/testing/18_STRESS_TESTING.md

Mỗi scenario:

ID:
Service:
Starting Load:
Ramp Pattern:
Maximum Load:
Safety Stop:
Dataset:
Duration:
Environment:
Expected Behavior:
Degradation Point:
Breaking Point:
Recovery:
Data Integrity:
Result:
Evidence:

==================================================
50. EXAMPLE
==================================================

STRESS-AUTOSAVE-001

Scenario:
Concurrent autosave stress

Starting Load:
Known stable load from #17

Ramp:
Increase step-by-step

Stop:
When error rate/resource safety threshold exceeded

Measure:
p95
p99
writes/sec
DB pool
CPU
RAM

After:
Reduce to baseline and verify recovery.

==================================================
51. STRESS BUG FORMAT
==================================================

STRESS-BUG-001

Scenario:
Load Level:
Environment:
First Failure:
Failure Type:
Expected:
Actual:
p95:
p99:
Error Rate:
CPU:
RAM:
DB:
Data Integrity:
Recovery:
Severity:
Root Cause:
Fix:
Retest:

==================================================
52. SEVERITY
==================================================

Critical:
- data corruption;
- unrecoverable crash;
- DB corruption;
- service remains unavailable after stress.

High:
- failure below expected peak;
- autosave loss;
- repeated 5xx;
- memory not recovering.

Medium:
- degradation before desired headroom;
- queue/pool bottleneck.

Low:
- optimization opportunity beyond realistic capacity.

==================================================
53. FAILURE BELOW NORMAL LOAD
==================================================

Nếu hệ thống fail trước expected load từ #17:

Đây không còn chỉ là "stress limitation".

Đây là release risk.

Report High/Critical tùy impact.

==================================================
54. FAILURE ABOVE EXPECTED CAPACITY
==================================================

Nếu failure chỉ xảy ra rất xa expected load:

có thể là acceptable limitation.

Nhưng vẫn document:
breaking point
recovery behavior
capacity recommendation.

==================================================
55. OPTIMIZATION STRATEGY
==================================================

Chỉ sau profiling.

Có thể:

- DB index;
- pagination;
- queue;
- worker;
- caching;
- rate limiting;
- connection pool;
- backpressure;
- batch writes;
- autoscaling;
- async export.

Không sửa bằng hardware scaling trước khi tìm bottleneck logic.

==================================================
56. BACKPRESSURE
==================================================

Đánh giá hệ thống có cơ chế từ chối/queue hợp lý không.

Tốt:
controlled 429/503 + retry guidance.

Xấu:
server nhận mọi request rồi OOM/crash.

==================================================
57. RETEST AFTER FIX
==================================================

Dùng chính stress profile cũ.

So sánh:

Before
vs
After

- breaking point;
- p95;
- throughput;
- error rate;
- recovery.

==================================================
58. FUNCTIONAL REGRESSION SAU OPTIMIZATION
==================================================

Sau performance/infrastructure fix:

chạy:

API Tests
Database Tests
Smoke
Core E2E
Regression

Không chấp nhận server nhanh hơn nhưng sai dữ liệu.

==================================================
59. N/A MODE
==================================================

Nếu không có shared backend:

Cập nhật:

docs/testing/18_STRESS_TESTING.md

với:

Status:
NOT APPLICABLE TO CURRENT ARCHITECTURE

Giải thích:

- persistence là browser-local;
- export chạy client-side;
- không có shared server discovered;
- concurrent user stress không có target.

Có thể ghi:

Client-side extreme-data limits đã được xử lý ở Performance Testing #16.

Không invent server.

==================================================
60. REPORT
==================================================

Cập nhật:

docs/testing/18_STRESS_TESTING.md

Bao gồm:

# Stress Testing Report

## 1. Applicability
## 2. Architecture
## 3. Stress Targets
## 4. Environment
## 5. Known Stable Load
## 6. Stress Strategy
## 7. Safety Limits
## 8. Ramp Results
## 9. Latency Curve
## 10. Throughput Curve
## 11. Error Curve
## 12. Resource Usage
## 13. Database Behavior
## 14. Data Integrity
## 15. Degradation Point
## 16. Breaking Point
## 17. Recovery Behavior
## 18. Bugs
## 19. Optimizations
## 20. Retest
## 21. Recommended Capacity
## 22. Limitations

==================================================
61. ACCEPTANCE
==================================================

Stress Testing không nhất thiết phải "PASS vì hệ thống không bao giờ gãy".

Mọi hệ thống đều có giới hạn.

PASS khi:

- breaking point được xác định;
- breaking point cao hơn normal/expected peak một khoảng an toàn;
- degradation có kiểm soát;
- không data corruption;
- hệ thống phục hồi;
- capacity recommendation rõ.

FAIL khi:

- fail trong expected load;
- data corruption;
- unrecoverable crash;
- service không recover;
- resource leak nghiêm trọng.

==================================================
62. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

Stress Applicability:
FULL / PARTIAL / N/A

Known stable load:
...

Expected peak:
...

Degradation point:
...

Breaking point:
...

Max throughput:
...

p95 at safe load:
...

p95 at degradation:
...

Peak CPU:
...

Peak RAM:
...

Data integrity:
PASS/FAIL

Recovery:
PASS/FAIL

Critical bugs:
N

High bugs:
N

Recommended operational maximum:
...

Safety headroom:
...

Overall:
PASS / PASS WITH LIMITATIONS / FAIL / N/A

QUAN TRỌNG:

Stress Testing không phải:

"Làm server crash càng nhanh càng tốt."

Mà phải trả lời:

"Hệ thống bắt đầu suy giảm ở đâu, gãy ở đâu, có mất dữ liệu không, và sau khi bỏ tải thì có tự phục hồi được không?"

Quy trình:

USE LOAD BASELINE
→ DEFINE SAFETY LIMITS
→ RAMP BEYOND EXPECTED LOAD
→ FIND DEGRADATION
→ FIND BREAKING POINT
→ REDUCE LOAD
→ VERIFY RECOVERY
→ ANALYZE
→ FIX
→ RETEST
→ REPORT