Bạn là Senior QA Engineer + Test Automation Engineer.

NHIỆM VỤ:
Thiết kế và triển khai SMOKE TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Xác nhận nhanh build hiện tại có đủ ổn định để tiếp tục các phase test sâu hơn hay không.
- Chỉ kiểm tra các chức năng sống còn, P0/P1.
- Không cố test chi tiết mọi edge case.
- Smoke Test phải chạy nhanh, ổn định và có thể tái sử dụng sau mỗi build.
- Nếu Smoke Test fail ở chức năng cốt lõi, phải dừng các phase test sâu và report blocker.
- Không biến Smoke Testing thành full Functional Testing hoặc E2E dài.

==================================================
1. ĐỌC PROJECT VÀ CÁC REPORT TRƯỚC
==================================================

Đọc:

README*
package.json
vite.config.*
src/
docs/

Đọc các tài liệu đã có:

docs/testing/01_UNIT_TESTING.md
docs/testing/02_API_TESTING.md
docs/testing/03_DATABASE_TESTING.md
docs/testing/04_FUNCTIONAL_TESTING.md
docs/testing/05_INTERACTION_TESTING.md

Đọc thêm:

docs/UI_REFERENCE_AUDIT.md
docs/UI_REFACTOR_REPORT.md

Xác định:
- app chạy bằng lệnh nào;
- port nào;
- route/module chính;
- browser support;
- state/storage;
- chức năng nào là P0.

==================================================
2. MỤC ĐÍCH CỦA SMOKE TEST
==================================================

Smoke Testing phải trả lời câu hỏi:

"Build này có đủ khỏe để test tiếp không?"

Không trả lời:

"Mọi chức năng có đúng hoàn toàn không?"

Smoke Test chỉ cover:
- startup;
- navigation;
- core data;
- core editing;
- core save;
- core export;
- core restore;
- crash/blocker.

==================================================
3. BUILD SMOKE
==================================================

Đầu tiên chạy:

npm install

nếu dependencies chưa có.

Sau đó:

npm run build

Expected:
- exit code 0;
- không TypeScript error;
- không CSS build error;
- không missing import;
- không build crash.

Nếu build fail:
Smoke Test = FAILED/BLOCKED.

Không tiếp tục automation UI trước khi build ổn nếu lỗi là blocker.

==================================================
4. DEV SERVER SMOKE
==================================================

Chạy app bằng script phù hợp:

npm run dev

hoặc command thực tế trong package.json.

Kiểm tra:
- server start;
- URL truy cập được;
- trang không trắng;
- không infinite loading;
- app render root component.

Nếu dùng Playwright:
có thể cấu hình webServer trong playwright.config.

==================================================
5. CONSOLE ERROR SMOKE
==================================================

Khi mở app:

capture:
pageerror
console.error

Smoke fail nếu có lỗi nghiêm trọng như:
- uncaught exception;
- React render crash;
- undefined access;
- module load fail.

Warning không nghiêm trọng:
ghi nhận riêng,
không nhất thiết fail smoke.

==================================================
6. DASHBOARD SMOKE
==================================================

Kiểm tra:

- Dashboard mở được.
- Sidebar hiển thị.
- TopBar hiển thị.
- Current lesson hoặc empty state hợp lệ.
- Quick Actions render.
- Không có blank screen.

Không kiểm chi tiết visual.

==================================================
7. SIDEBAR NAVIGATION SMOKE
==================================================

Click thử các module cốt lõi:

- Bàn làm việc
- Tác phẩm
- Phân tích thể loại
- Kế hoạch bài dạy
- Câu hỏi
- Ma trận & Đặc tả
- Đề kiểm tra
- Rubric
- Slide
- Xuất bản

Expected:
- navigation hoạt động;
- không crash;
- đúng module được render.

Không cần test sâu từng màn hình.

==================================================
8. LESSON SMOKE
==================================================

Test một flow cực ngắn:

- mở lesson hiện có;
hoặc
- tạo lesson tối thiểu hợp lệ nếu state rỗng.

Ví dụ:
Tác phẩm: Tây Tiến
Tác giả: Quang Dũng
Lớp: 12

Expected:
- lesson được chọn/tạo;
- current lesson được set;
- Literature Workspace mở được.

==================================================
9. LITERATURE WORKSPACE SMOKE
==================================================

Kiểm tra:

- Reader render;
- văn bản/ngữ liệu hiển thị;
- outline render nếu có;
- insight panel render;
- không crash.

Thử một interaction cốt lõi:
- select text;
- floating toolbar xuất hiện.

Không cần test mọi action ở toolbar.

==================================================
10. HIGHLIGHT / NOTE SMOKE
==================================================

Chọn một đoạn text ngắn.

Thử:
- Highlight hoặc
- Add Note.

Expected:
- action hoạt động;
- không crash;
- state cập nhật.

Chỉ cần một action representative nếu cần giữ smoke cực nhanh.

==================================================
11. KHBD SMOKE
==================================================

Mở KHBD.

Kiểm tra:
- Visual Builder render;
- activity list render;
- có thể mở một activity;
- edit một field đơn giản;
- state nhận thay đổi.

Không cần test đủ 4 bước ở smoke.

==================================================
12. QUESTION BANK SMOKE
==================================================

Mở Question Bank.

Kiểm tra:
- list/editor render;
- có thể tạo hoặc chọn một câu hỏi;
- có thể nhập nội dung;
- save hoạt động.

Không test đủ mọi question type.

==================================================
13. MATRIX SMOKE
==================================================

Mở Matrix/Specification.

Kiểm tra:
- bảng render;
- không crash;
- summary/statistics nếu có render;
- có thể edit một field/cell nếu chức năng hỗ trợ.

==================================================
14. EXAM BUILDER SMOKE
==================================================

Mở Exam.

Kiểm tra:
- 3-column layout logic render;
- section list render;
- question area render;
- statistics render;
- có thể chọn section;
- không crash.

Nếu có question sẵn:
test chọn một question.

==================================================
15. RUBRIC SMOKE
==================================================

Mở Rubric.

Kiểm tra:
- criteria render;
- score/total render;
- có thể edit một criterion hoặc score;
- không crash.

==================================================
16. SLIDES SMOKE
==================================================

Mở Slides.

Kiểm tra:
- thumbnail list render;
- slide canvas render;
- chọn slide hoạt động;
- presentation mode có thể mở nếu implemented.

Không cần test keyboard shortcut ở smoke.

==================================================
17. EXPORT SMOKE
==================================================

Mở Export Center.

Test ít nhất một output quan trọng:

ưu tiên:
KHBD DOCX
hoặc
JSON Backup

Expected:
- action không throw error;
- file/download được trigger;
- dữ liệu không rỗng nếu có thể xác nhận nhanh.

Nếu export môi trường test không hỗ trợ:
ghi BLOCKED/DEFERRED có lý do.

==================================================
18. AUTOSAVE SMOKE
==================================================

Edit một field nhỏ.

Chờ khoảng debounce hiện tại.

Kiểm tra:
- trạng thái "Đã lưu" nếu có;
hoặc
- localStorage/state persistence đã cập nhật.

Reload.

Expected:
- dữ liệu vừa sửa còn tồn tại.

==================================================
19. BACKUP / RESTORE SMOKE
==================================================

Nếu feature đã có:

- tạo backup JSON;
- parse JSON;
- restore chính JSON vừa tạo.

Expected:
- restore thành công;
- app không crash;
- current lesson/state vẫn hợp lệ.

Không cần test corrupted JSON ở smoke.

==================================================
20. RELOAD SMOKE
==================================================

Sau khi đã có state:

page.reload()

Expected:
- app khởi động lại;
- không blank screen;
- current lesson/state core còn hợp lệ.

==================================================
21. EMPTY STATE SMOKE
==================================================

Nếu dễ seed/reset state:

kiểm tra tối thiểu một trường hợp không có dữ liệu.

Expected:
- EmptyState render;
- app không crash;
- CTA tồn tại nếu design có.

Không cần test tất cả empty state.

==================================================
22. ERROR BLOCKER CRITERIA
==================================================

Smoke Test phải FAIL nếu gặp:

- app không start;
- build fail;
- blank page;
- root render crash;
- navigation module chính crash;
- không mở được lesson;
- state core không save;
- reload làm mất toàn bộ dữ liệu ngoài dự kiến;
- Question/Exam/KHBD module không mở được;
- export core hoàn toàn hỏng;
- backup/restore core crash app.

==================================================
23. NON-BLOCKER
==================================================

Không fail toàn bộ smoke chỉ vì:
- spacing hơi lệch;
- màu sai;
- typo nhỏ;
- hover chưa đẹp;
- minor console warning;
- icon lệch nhẹ.

Các lỗi đó chuyển sang:
Visual / Consistency / Regression UI.

==================================================
24. SMOKE SUITE NÊN RẤT NHANH
==================================================

Mục tiêu:
toàn smoke suite chạy trong thời gian ngắn.

Không nhét:
- hàng trăm test;
- mọi edge case;
- load test;
- stress test;
- visual regression hàng loạt.

Ưu tiên khoảng:
10–25 smoke scenarios cốt lõi
tùy project thực tế.

==================================================
25. AUTOMATION TOOL
==================================================

Ưu tiên:

Playwright

Vì smoke cần kiểm tra browser thật.

Nếu Unit Smoke riêng:
Vitest có thể chạy trước.

Khuyến nghị pipeline:

npm run test:run
→ npx playwright test tests/smoke
→ npm run build

Hoặc thứ tự thực tế phù hợp CI của project.

==================================================
26. PLAYWRIGHT SETUP
==================================================

Nếu project chưa có Playwright:

kiểm tra dependency trước.

Nếu đã có:
tận dụng config hiện tại.

Nếu chưa có và cần automation:

npm install -D @playwright/test

npx playwright install chromium

Không thêm nhiều browser ở phase đầu nếu chưa cần.

==================================================
27. TEST STRUCTURE
==================================================

Tạo:

tests/
└── smoke/
    ├── app-startup.spec.ts
    ├── navigation.spec.ts
    ├── lesson.spec.ts
    ├── reader.spec.ts
    ├── khbd.spec.ts
    ├── assessment.spec.ts
    ├── slides.spec.ts
    ├── export.spec.ts
    └── persistence.spec.ts

Hoặc gom ít file hơn nếu suite nhỏ.

==================================================
28. SELECTOR STRATEGY
==================================================

Ưu tiên:

getByRole()
getByLabel()
getByText()

Sau đó mới:

data-testid

Không dùng selector brittle như:

div:nth-child(4)

Nếu component chưa có semantic selector:
thêm data-testid hợp lý,
không rải testid khắp toàn app vô nghĩa.

==================================================
29. TEST DATA
==================================================

Dùng dữ liệu tối thiểu ổn định.

Ví dụ:

Tác phẩm:
Tây Tiến

Tác giả:
Quang Dũng

Khối:
12

Không cần seed dataset lớn.

Có thể tạo:

tests/fixtures/smokeLesson.ts

để tái sử dụng.

==================================================
30. TEST ISOLATION
==================================================

Smoke suite phải deterministic.

Mỗi test:
- biết state bắt đầu;
- không phụ thuộc random data;
- không phụ thuộc test chạy trước nếu có thể.

Nếu flow smoke cần reuse state:
có thể dùng setup fixture rõ ràng.

==================================================
31. STORAGE RESET
==================================================

Nếu cần clean run:

localStorage.clear()

trước một số test.

Nhưng không reset nếu đang test reload persistence.

Phân biệt:
- clean smoke;
- persistence smoke.

==================================================
32. SCREENSHOT KHI FAIL
==================================================

Playwright config:

screenshot: "only-on-failure"

trace:
"retain-on-failure"

video:
có thể "retain-on-failure" nếu hữu ích.

Không cần screenshot mọi test khi pass.

==================================================
33. TIMEOUT
==================================================

Không dùng waitForTimeout dài nếu tránh được.

Ưu tiên:
- locator auto-wait;
- expect(...).toBeVisible();
- expect(...).toHaveText();

Không tạo smoke suite chậm do sleep cứng.

==================================================
34. RETRY
==================================================

Local:
retries = 0

CI:
có thể retry 1 lần nếu environment flaky.

Nếu test chỉ pass nhờ retry:
điều tra flakiness.

Không coi retry là fix.

==================================================
35. SMOKE TEST CASE FORMAT
==================================================

Cập nhật:

docs/testing/06_SMOKE_TESTING.md

Mỗi test case:

ID:
Module:
Scenario:
Priority:
Precondition:
Steps:
Expected:
Result:
Automated:
Evidence:
Blocker?:

Ví dụ:

SMOKE-APP-001

Scenario:
Khởi động ứng dụng.

Steps:
1. Start dev server
2. Open root URL

Expected:
Dashboard render và không có fatal error.

Blocker:
Yes

==================================================
36. PRIORITY
==================================================

P0:
- Build
- App startup
- Dashboard
- Navigation
- Lesson
- Reader
- Autosave
- Reload
- Question Bank
- Exam

P1:
- KHBD
- Matrix
- Rubric
- Slides
- Export
- Backup/Restore

P2:
Không nên đưa quá nhiều P2 vào smoke.

==================================================
37. STOP CONDITION
==================================================

Nếu P0 fail nghiêm trọng:

ví dụ:
App startup fail

thì:
- report blocker;
- không lãng phí thời gian chạy toàn bộ deep smoke phụ thuộc app.

Nếu lỗi module độc lập:
có thể tiếp tục các module không phụ thuộc để thu thêm evidence.

==================================================
38. BUG FORMAT
==================================================

SMOKE-BUG-001

Module:
Scenario:
Severity:
Blocker:
Steps:
Expected:
Actual:
Evidence:
Console Error:
Root Cause nếu biết:
Fix:
Retest:

Severity ưu tiên:
Critical
High
Medium
Low

Smoke chủ yếu quan tâm Critical/High.

==================================================
39. PASS CRITERIA
==================================================

Định nghĩa:

PASS:
- tất cả P0 pass;
- không fatal crash;
- P1 critical flow phần lớn pass;
- không blocker.

FAIL:
- bất kỳ P0 blocker nào;
hoặc
- nhiều P1 critical functionality fail.

BLOCKED:
- environment không chạy;
- dependency ngoài không available;
- requirement/test data không thể thiết lập.

==================================================
40. SMOKE REPORT
==================================================

Cập nhật:

docs/testing/06_SMOKE_TESTING.md

Nội dung:

# Smoke Testing Report

## 1. Objective
## 2. Environment
## 3. Build Status
## 4. Smoke Scope
## 5. P0 Cases
## 6. P1 Cases
## 7. Automated Tests
## 8. Execution Results
## 9. Blockers
## 10. Bugs Found
## 11. Console Errors
## 12. Deferred Cases
## 13. Final Build Decision

Cuối report phải có một trong:

BUILD ACCEPTED FOR FURTHER TESTING

hoặc

BUILD REJECTED / BLOCKED

==================================================
41. COMMANDS
==================================================

Sau implementation, chạy command đúng theo package.json.

Ví dụ:

npm run build

npx playwright test tests/smoke

Nếu Unit suite đã tồn tại:

npm run test:run

Nếu lint có sẵn:

npm run lint

Không tự giả định script nếu package.json dùng tên khác.

==================================================
42. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

Build:
PASS/FAIL

Smoke:
PASS/FAIL/BLOCKED

P0:
X/Y Passed

P1:
X/Y Passed

Critical bugs:
N

High bugs:
N

Blockers:
N

Decision:
READY FOR NEXT TEST PHASE
hoặc
NOT READY

QUAN TRỌNG:

Smoke Testing phải cực kỳ thực dụng.

BUILD
→ START
→ OPEN
→ NAVIGATE
→ PERFORM CORE ACTION
→ SAVE
→ RELOAD
→ VERIFY CORE MODULES
→ REPORT

Không biến smoke suite thành 200 test case.

Mục tiêu cuối cùng chỉ là xác nhận:

"Build hiện tại có đủ ổn định để tiếp tục test sâu hay không?"