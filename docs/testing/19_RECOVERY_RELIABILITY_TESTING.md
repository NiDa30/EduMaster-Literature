Bạn là Senior QA Engineer + Reliability Test Engineer + Recovery Testing Specialist.

NHIỆM VỤ:
Thiết kế và triển khai RECOVERY / RELIABILITY TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Kiểm tra hệ thống có giữ được dữ liệu và phục hồi an toàn sau lỗi, reload, crash, storage lỗi, import sai, export fail hoặc gián đoạn bất thường hay không.
- Xác nhận ứng dụng không dễ rơi vào trạng thái corrupted.
- Kiểm tra khả năng phục hồi sau sự cố, không chỉ khả năng “không crash”.
- Đánh giá reliability trong các phiên sử dụng dài và nhiều thao tác lặp.
- Không biến Recovery Testing thành Stress Testing.
- Không invent backend/server failure nếu project thực tế không có backend.
- Ưu tiên dữ liệu người dùng: bài dạy, ghi chú, KHBD, câu hỏi, ma trận, đề, rubric, slides, backup.

==================================================
1. ĐỌC KIẾN TRÚC VÀ REPORT TRƯỚC
==================================================

Đọc:

README*
package.json
src/
docs/

Đọc bắt buộc:

docs/testing/03_DATABASE_TESTING.md
docs/testing/04_FUNCTIONAL_TESTING.md
docs/testing/06_SMOKE_TESTING.md
docs/testing/12_E2E_TESTING.md
docs/testing/14_REGRESSION_TESTING.md
docs/testing/16_PERFORMANCE_TESTING.md
docs/testing/17_LOAD_TESTING.md
docs/testing/18_STRESS_TESTING.md

Audit:

- state nằm ở đâu;
- LocalStorage?
- IndexedDB?
- backend?
- autosave?
- backup/restore?
- schema version?
- error boundary?
- recovery flow?
- retry logic?

==================================================
2. PHÂN BIỆT RECOVERY VÀ RELIABILITY
==================================================

Recovery Testing hỏi:

"Khi xảy ra lỗi hoặc gián đoạn, hệ thống có phục hồi được không?"

Reliability Testing hỏi:

"Hệ thống có tiếp tục hoạt động ổn định trong thời gian dài và qua nhiều thao tác không?"

Ví dụ:

Recovery:
edit
→ browser reload bất ngờ
→ data còn?

Reliability:
edit/save/switch lesson hàng trăm lần
→ state vẫn đúng?

==================================================
3. PRIORITY DATA
==================================================

P0 data cần bảo vệ:

- Lesson metadata
- Literature annotations
- Notes
- KHBD
- Question Bank
- Matrix
- Specification
- Exam
- Rubric
- Slides
- Backup state
- Current lesson

Bất kỳ lỗi nào gây mất dữ liệu P0:
Critical hoặc High tùy mức độ.

==================================================
4. RELIABILITY BASELINE
==================================================

Trước test:

chạy:
- build;
- smoke;
- representative functional flow.

Nếu build đã không ổn:
không thể đánh giá recovery đáng tin cậy.

==================================================
5. RELOAD RECOVERY
==================================================

P0.

Scenario:

1. Open lesson.
2. Edit data.
3. Wait autosave nếu cần.
4. Reload page.

Expected:
- app khởi động lại;
- current lesson hợp lệ;
- data còn;
- không blank page;
- không corrupted state.

Test trên nhiều module đại diện.

==================================================
6. HARD RELOAD
==================================================

Test:

Ctrl+Shift+R
hoặc browser hard reload nếu automation hỗ trợ tương đương.

Expected:
storage-backed data vẫn tồn tại.

Không phụ thuộc memory-only state nếu requirement cần persistence.

==================================================
7. RELOAD DURING EDIT
==================================================

Scenario:

typing
→ reload ngay trước autosave hoàn tất.

Xác định behavior thực tế.

Có thể:
- mất phần chưa autosave;
- warning;
- recovery draft.

Không tự coi mất unsaved changes là bug nếu app chưa cam kết draft protection.

Nhưng phải document rõ.

==================================================
8. RELOAD DURING AUTOSAVE
==================================================

Scenario:

edit
→ autosave starts
→ reload giữa lúc save.

Expected:
- không corrupt storage;
- app recover;
- state cuối cùng hợp lệ.

Nếu localStorage synchronous:
scenario có thể N/A.

==================================================
9. TAB CLOSE / REOPEN
==================================================

Scenario:

edit + autosave
→ close tab
→ reopen app.

Expected:
saved data còn.

Nếu app có beforeunload warning:
test behavior đúng giới hạn browser.

==================================================
10. BROWSER CRASH SIMULATION
==================================================

Nếu automation trực tiếp không dễ:
mô phỏng bằng đóng browser/context đột ngột sau save.

Mở session mới.

Expected:
persistent state còn.

Không cần cố crash hệ điều hành.

==================================================
11. APP CRASH / ERROR BOUNDARY
==================================================

Nếu app có Error Boundary:

test component error có kiểm soát.

Expected:
- fallback UI;
- không white screen toàn app nếu có boundary;
- data đã lưu không mất;
- user có thể reload/recover.

Nếu không có Error Boundary:
document risk.

==================================================
12. INVALID STORAGE DATA
==================================================

P0.

Inject LocalStorage corrupted:

"{invalid"

hoặc malformed JSON.

Reload app.

Expected:
- không infinite crash;
- không blank screen;
- fallback/reset/recovery hợp lý;
- user được thông báo nếu cần.

Không silently overwrite dữ liệu trước khi xác định recovery policy.

==================================================
13. PARTIALLY VALID STATE
==================================================

Test state:
- missing currentLessonId;
- missing array;
- missing field;
- unknown module data;
- null unexpected.

Expected:
graceful handling.

==================================================
14. OLD SCHEMA RECOVERY
==================================================

Nếu state có schema version:

test:
old version
→ new app.

Expected:
- migration;
hoặc
- explicit unsupported warning.

Không âm thầm phá dữ liệu.

==================================================
15. FUTURE / UNKNOWN FIELDS
==================================================

Nếu restore JSON có extra fields:

test:
- ignore safely;
hoặc
- preserve nếu schema designed vậy.

Không crash chỉ vì unknown optional field.

==================================================
16. BACKUP RELIABILITY
==================================================

P0.

Lặp:

modify
→ backup
→ parse JSON.

Kiểm tra:
- file hợp lệ;
- state đầy đủ;
- Unicode;
- không truncated.

==================================================
17. RESTORE RELIABILITY
==================================================

Test:

backup A
→ modify app thành B
→ restore A.

Expected:
state trở về A theo policy.

Verify representative modules.

==================================================
18. RESTORE INVALID JSON
==================================================

Test:

empty
malformed
wrong root type
missing fields
oversized reasonable JSON

Expected:
- reject an toàn;
- current state không bị xóa trước khi validation pass;
- error rõ.

==================================================
19. RESTORE TRANSACTION SAFETY
==================================================

P0 concept.

Restore nên:

VALIDATE
→ PREPARE
→ APPLY

Không:

CLEAR CURRENT STATE
→ parse file
→ fail
→ data lost.

Audit code cho nguy cơ này.

==================================================
20. RESTORE CANCEL
==================================================

Scenario:

open restore
→ select/cancel hoặc cancel confirmation.

Expected:
current state không đổi.

==================================================
21. RESTORE SAME BACKUP MULTIPLE TIMES
==================================================

Test idempotency tương đối.

Restore A
→ restore A again.

Không được:
- duplicate lessons;
- duplicate questions;
- duplicate slides

nếu restore semantics là replace.

Nếu semantics là merge:
test theo implementation thực tế.

==================================================
22. BACKUP → CLEAR → RESTORE
==================================================

P0 recovery drill.

Flow:

1. Seed realistic state.
2. Backup.
3. Clear/reset test state.
4. Verify app empty.
5. Restore.
6. Verify state.

Đây là recovery test quan trọng nhất.

==================================================
23. CURRENT LESSON RECOVERY
==================================================

Sau restore/reload:

currentLessonId:
- tồn tại;
- trỏ đúng lesson.

Nếu ID invalid:
app phải fallback hợp lý.

==================================================
24. LESSON DATA ISOLATION
==================================================

Scenario:

A có Question A
B có Question B

reload/restore.

Expected:
không swap/cross data.

==================================================
25. AUTOSAVE RELIABILITY
==================================================

Test nhiều vòng:

edit
→ autosave
→ edit
→ autosave
→ switch module
→ return.

Lặp 20–50 lần nếu automation nhanh.

Expected:
- không bỏ save;
- không duplicate;
- không stale overwrite.

==================================================
26. RAPID EDIT RELIABILITY
==================================================

Scenario:

gõ nhiều thay đổi nhanh.

Kiểm tra debounce:
latest state phải được lưu.

Không để:
old debounce save chạy sau new state và overwrite dữ liệu mới.

==================================================
27. RAPID LESSON SWITCHING
==================================================

Scenario:

A → B → C → A
trong thời gian ngắn.

Kiểm tra:
- current lesson;
- pending autosave;
- no cross-save.

Đây là risk cao nếu autosave async.

==================================================
28. SAVE ORDERING
==================================================

Nếu save async/backend:

request A
request B

B mới hơn A.

Nếu A trả về sau B:
không được overwrite state mới nếu architecture có race risk.

Test out-of-order responses nếu có thể mock.

==================================================
29. NETWORK INTERRUPTION
==================================================

CHỈ nếu app có backend.

Scenario:

edit
→ network offline
→ save attempt
→ network online.

Expected theo implementation:
- retry;
- error;
- unsaved state indicator;
- manual retry.

Không invent offline sync nếu chưa có.

==================================================
30. NETWORK FLAP
==================================================

Nếu backend:

online
→ offline
→ online
→ offline

test vài vòng.

Expected:
không crash;
không duplicate write;
state rõ ràng.

==================================================
31. API 500 RECOVERY
==================================================

Nếu backend:
mock representative API 500.

Expected:
- user-safe error;
- current local state không mất;
- retry possible nếu thiết kế.

==================================================
32. API TIMEOUT
==================================================

Nếu backend:
simulate slow/no response.

Kiểm tra:
- timeout behavior;
- loading state;
- retry;
- duplicate request.

==================================================
33. LOCALSTORAGE QUOTA FAILURE
==================================================

Nếu LocalStorage là persistence chính:

đánh giá behavior khi storage write fail.

Có thể mock:

Storage.prototype.setItem

throw QuotaExceededError.

Expected:
- app không crash;
- user biết save failed nếu relevant;
- in-memory state không tự biến mất.

==================================================
34. STORAGE UNAVAILABLE
==================================================

Mock:
setItem/getItem fail.

Expected:
graceful fallback theo architecture.

Nếu app không support:
document risk.

==================================================
35. JSON.stringify FAILURE
==================================================

Nếu state có nguy cơ circular reference:
audit để chắc không xảy ra.

Nếu schema pure JSON:
ghi low risk.

==================================================
36. EXPORT FAILURE RECOVERY
==================================================

Scenario:

export generation throw error.

Expected:
- app không crash;
- lesson/state không mất;
- button usable lại;
- loading state reset;
- error feedback.

==================================================
37. EXPORT REPEATEDLY
==================================================

Test 10–20 exports representative.

Expected:
- no memory runaway;
- no stuck loading;
- no stale filename.

==================================================
38. OBJECT URL CLEANUP
==================================================

Nếu export dùng Blob URLs:

audit cleanup.

Repeated export không được leak object URLs vô hạn.

==================================================
39. PPTX/DOCX GENERATION INTERRUPTION
==================================================

Nếu generation async:
simulate failure mid-process nếu practical.

Expected:
state editor không bị ảnh hưởng.

==================================================
40. SLIDES SESSION RELIABILITY
==================================================

Scenario:

edit many slides
→ reorder
→ duplicate
→ presentation
→ exit
→ reload.

Expected:
slides đúng order và content.

==================================================
41. QUESTION BANK RELIABILITY
==================================================

Scenario:

create/edit/delete/search nhiều lần.

Expected:
- list nhất quán;
- selected question hợp lệ;
- không ghost item.

==================================================
42. EXAM RELIABILITY
==================================================

Scenario:

add/remove/reorder questions nhiều lần.

Verify:
- total;
- section;
- stats;
- persistence.

Không để derived state drift theo thời gian.

==================================================
43. MATRIX RELIABILITY
==================================================

Repeated edits:
cell values
→ summary recalculation.

Sau nhiều lần:
summary phải vẫn derive đúng current state.

==================================================
44. RUBRIC RELIABILITY
==================================================

Repeated criterion edits.

Kiểm tra total score không drift vì stale calculation.

==================================================
45. KHBD RELIABILITY
==================================================

Repeated:
edit activity
→ switch view
→ switch module
→ return.

Không:
- mất content;
- duplicate activities;
- stale Document View.

==================================================
46. LONG SESSION TEST
==================================================

Mô phỏng một phiên sử dụng dài:

60–120 representative actions.

Ví dụ:
- switch lessons;
- edit Reader note;
- KHBD;
- questions;
- exam;
- slides;
- exports.

Không cần chạy 8 giờ nếu không cần.

Mục tiêu:
phát hiện state drift/leak.

==================================================
47. REPETITION TEST
==================================================

Lặp một action nhiều lần.

Ví dụ:

open/close modal ×50
switch tab ×100
switch lesson ×50

Expected:
- no crash;
- no duplicate listeners;
- no state corruption.

==================================================
48. MEMORY RELIABILITY
==================================================

Kết hợp findings #16.

Sau repeated actions:
memory nên ổn định hoặc quay về vùng hợp lý.

Tìm:
- listener leaks;
- timers;
- object URLs;
- detached DOM.

==================================================
49. TIMER RELIABILITY
==================================================

Audit autosave/toast timers.

Repeated mount/unmount không được tạo nhiều interval/timer song song ngoài ý muốn.

==================================================
50. EVENT LISTENER RELIABILITY
==================================================

Reader có thể dùng:
selectionchange
scroll
keydown

Verify cleanup khi module unmount.

Nếu không:
switch Reader nhiều lần có thể action chạy nhiều lần.

==================================================
51. DUPLICATE ACTION DETECTION
==================================================

Sau long session:
click một button.

Expected:
action chạy một lần.

Nếu chạy 2–5 lần:
có thể listener leak.

==================================================
52. DERIVED STATE RECOVERY
==================================================

Nếu summary/statistics derived từ source data:

sau restore:
recalculate đúng.

Không cần backup stale derived values nếu chúng có thể tính lại, tùy architecture.

==================================================
53. MISSING DEPENDENCY STATE
==================================================

Ví dụ:
Exam reference question đã bị delete.

App phải:
- handle gracefully;
- show missing item/fallback;
- không crash.

Test nếu architecture cho phép tình trạng này.

==================================================
54. DELETE CURRENT LESSON
==================================================

Nếu feature có delete lesson:

delete current lesson.

Expected:
- chọn lesson khác;
hoặc
- empty state.

Không để currentLessonId dangling gây crash.

==================================================
55. EMPTY STATE RECOVERY
==================================================

Clear state hoàn toàn.

Reload.

Expected:
app boot vào valid empty state.

Không cần user manually sửa storage.

==================================================
56. MALFORMED ANNOTATION RECOVERY
==================================================

Inject một annotation invalid.

Reader phải:
- skip/fallback;
- không crash toàn lesson nếu possible.

==================================================
57. UNICODE RECOVERY
==================================================

P0.

Backup/reload/restore:

Tây Tiến
Quang Dũng
Người lái đò Sông Đà
Vợ chồng A Phủ
Đất Nước

Expected:
text byte/character meaning preserved.

==================================================
58. SPECIAL CHARACTERS
==================================================

Test:
"
'
<
>
&
emoji nếu allowed
newline
tab

đặc biệt trong:
notes/questions.

Không cần support mọi arbitrary binary character.

==================================================
59. FAILURE ATOMICITY
==================================================

Các operation quan trọng:

Restore
Delete
Bulk update
Import

nên không để hệ thống ở trạng thái half-applied nếu fail.

Test atomicity phù hợp với implementation.

==================================================
60. IDEMPOTENCY
==================================================

Đánh giá các action đáng lẽ chỉ xảy ra một lần:

save
restore
delete
export trigger

Repeated user action không được gây corruption.

==================================================
61. RELIABILITY TEST STRUCTURE
==================================================

Có thể tạo:

tests/
└── reliability/
    ├── reload.reliability.spec.ts
    ├── autosave.reliability.spec.ts
    ├── lesson-switch.reliability.spec.ts
    ├── storage-corruption.spec.ts
    ├── backup-restore.spec.ts
    ├── export-failure.spec.ts
    ├── long-session.spec.ts
    └── repeated-actions.spec.ts

==================================================
62. USE EXISTING TESTS
==================================================

Reuse:
- E2E;
- persistence;
- backup restore;
- performance helpers.

Không duplicate test vô ích.

==================================================
63. FAILURE INJECTION
==================================================

Có thể inject lỗi bằng:

- monkey patch storage;
- Playwright route interception;
- invalid fixture;
- mock service rejection.

Không sửa production logic chỉ để tạo lỗi.

Nếu cần:
chỉ expose test seam nhỏ, an toàn.

==================================================
64. TEST CASE FORMAT
==================================================

Cập nhật:

docs/testing/19_RECOVERY_RELIABILITY_TESTING.md

Mỗi case:

ID:
Category:
Failure/Condition:
Initial State:
Action:
Failure Injection:
Expected Recovery:
Data Integrity:
Recovery Time:
Result:
Automated:
Evidence:

Ví dụ:

REL-RESTORE-001

Failure:
Malformed backup JSON

Expected:
Restore bị từ chối và current state không đổi.

==================================================
65. RELIABILITY BUG FORMAT
==================================================

REL-BUG-001

Category:
Scenario:
Initial State:
Failure:
Expected Recovery:
Actual:
Data Lost?:
Corruption?:
Recovery Possible?:
Severity:
Evidence:
Root Cause:
Fix:
Retest:

==================================================
66. SEVERITY
==================================================

Critical:
- permanent data loss;
- backup restore destroys current state;
- unrecoverable corrupted state.

High:
- autosave loss;
- lesson contamination;
- reload crash;
- repeated action causes corruption.

Medium:
- recoverable malfunction;
- memory/listener leak after extended session.

Low:
- minor recovery UX issue.

==================================================
67. RECOVERY TIME
==================================================

Nếu backend/system service có downtime:
đo Recovery Time.

Nếu client-side:
recovery time có thể là:
reload → usable state.

Không invent RTO chính thức nếu requirement không có.

==================================================
68. RECOVERY POINT
==================================================

Đánh giá lượng data có thể mất:

- last autosave?
- last manual save?
- entire session?

Gọi đây là observed recovery point.

Không gọi RPO chính thức nếu chưa có requirement.

==================================================
69. RELIABILITY PASS CRITERIA
==================================================

PASS khi:

- reload không mất saved data;
- autosave ổn định;
- backup/restore an toàn;
- invalid backup không phá current state;
- long session không gây corruption;
- repeated interactions không duplicate;
- app recover từ lỗi representative;
- không Critical reliability bug.

==================================================
70. FAIL CRITERIA
==================================================

FAIL nếu:

- saved data biến mất;
- restore phá dữ liệu hiện tại;
- state corrupt làm app không boot;
- cross-lesson contamination;
- persistent memory/event leak nghiêm trọng;
- backend recovery không thành công nếu backend applicable.

==================================================
71. RECOVERY DRILL
==================================================

Bắt buộc thực hiện một drill hoàn chỉnh:

SEED REALISTIC STATE
→ BACKUP
→ SIMULATE LOSS/CLEAR TEST STATE
→ RESTORE
→ RELOAD
→ VERIFY ALL CRITICAL MODULES

Verify:

Lesson
Reader annotations
KHBD
Question Bank
Matrix
Exam
Rubric
Slides

Đây là P0.

==================================================
72. REPORT
==================================================

Cập nhật:

docs/testing/19_RECOVERY_RELIABILITY_TESTING.md

Bao gồm:

# Recovery / Reliability Testing Report

## 1. Objective
## 2. Architecture
## 3. Persistence Model
## 4. Critical Data Inventory
## 5. Recovery Scenarios
## 6. Reload Recovery
## 7. Autosave Reliability
## 8. Storage Failure
## 9. Corrupted State
## 10. Backup Reliability
## 11. Restore Reliability
## 12. Recovery Drill
## 13. Long Session Reliability
## 14. Repeated Action Testing
## 15. Memory/Listener Findings
## 16. Data Integrity
## 17. Bugs
## 18. Fixes
## 19. Retest
## 20. Remaining Risks
## 21. Recovery Recommendation

==================================================
73. EXECUTION
==================================================

Chạy:

npx playwright test tests/reliability

Sau đó:

npm run build

Nếu có:
npm run lint
npm run test:run

Sau reliability-related fix:
chạy thêm:

npx playwright test tests/smoke
npx playwright test tests/e2e

và relevant regression tests.

==================================================
74. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

Recovery scenarios:
N

Reliability scenarios:
N

Passed:
N

Failed:
N

Blocked:
N

Data loss incidents:
N

State corruption incidents:
N

Cross-lesson contamination:
N

Autosave reliability:
PASS/FAIL

Reload recovery:
PASS/FAIL

Backup:
PASS/FAIL

Restore:
PASS/FAIL

Recovery Drill:
PASS/FAIL

Long-session reliability:
PASS/FAIL

Critical:
N

High:
N

Medium:
N

Observed recovery point:
...

Observed recovery time:
...

Overall:
PASS / PASS WITH RISKS / FAIL

QUAN TRỌNG:

Recovery / Reliability Testing phải trả lời:

"Nếu người giáo viên đang làm việc và có sự cố xảy ra, dữ liệu có còn an toàn không, app có quay lại trạng thái sử dụng được không, và việc sử dụng lâu dài có làm state dần sai đi không?"

Quy trình:

IDENTIFY CRITICAL DATA
→ CREATE KNOWN STATE
→ INJECT FAILURE
→ RECOVER
→ VERIFY DATA
→ REPEAT OPERATIONS
→ CHECK LONG-SESSION STABILITY
→ FIX
→ RETEST
→ REPORT