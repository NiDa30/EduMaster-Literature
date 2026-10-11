Bạn là Senior QA Automation Engineer + Backend/API Test Engineer.

NHIỆM VỤ:
Thiết kế và triển khai toàn bộ chiến lược API TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Xác định project có API/backend hay không.
- Nếu có API: kiểm tra request/response, status code, payload, validation, error handling, schema và dữ liệu trả về.
- Nếu project hiện tại chỉ chạy frontend/localStorage và chưa có backend thật, phải xác định rõ:
  "API Testing hiện chưa áp dụng đầy đủ"
  và chỉ test các service abstraction / fetch wrapper / external request nếu tồn tại.
- Không bịa ra API không có trong project.
- Không thêm backend chỉ để có cái để test.
- Không biến API Testing thành E2E UI Testing.

==================================================
1. AUDIT PROJECT TRƯỚC KHI TEST
==================================================

Đọc:

package.json
src/
vite.config.*
.env*
README*
docs/

Tìm các dấu hiệu có API:

fetch(
axios
ky
graphql
urql
apollo
/api/
services/
client/
http/
request/
response/
baseURL
VITE_API_URL
NEXT_PUBLIC_
localhost:
http://
https://

Tìm backend nếu có:

server/
backend/
api/
controllers/
routes/
services/
repositories/

Xác định rõ kiến trúc:

A. Frontend-only
B. Frontend + REST API
C. Frontend + GraphQL
D. Frontend + mock API
E. Frontend + serverless functions
F. External third-party APIs

Ghi kết quả audit vào:

docs/testing/02_API_TESTING.md

==================================================
2. XÁC ĐỊNH API INVENTORY
==================================================

Nếu có API thật, tạo bảng inventory:

| ID | Method | Endpoint | Mục đích | Auth | Request | Response | Priority |
|----|--------|----------|----------|------|---------|----------|----------|

Ví dụ:

GET    /api/lessons
GET    /api/lessons/:id
POST   /api/lessons
PUT    /api/lessons/:id
DELETE /api/lessons/:id

POST   /api/questions
GET    /api/questions

POST   /api/exams
GET    /api/exams/:id

POST   /api/export
POST   /api/backup
POST   /api/restore

NHƯNG:
Chỉ ghi endpoint thực sự tồn tại trong source code.

==================================================
3. CHỌN TOOL TEST
==================================================

Ưu tiên theo stack hiện tại.

Nếu Node/TypeScript:

Vitest
+
supertest nếu có Express backend

hoặc:

Vitest
+
fetch/axios client tests

Nếu API độc lập:
có thể dùng:

Postman/Newman
hoặc
Bruno
hoặc
Playwright APIRequestContext

Nếu project đang dùng Playwright:
ưu tiên tận dụng:

request.newContext()

Không cài quá nhiều tool trùng chức năng.

==================================================
4. TEST HTTP METHOD
==================================================

Với mỗi endpoint, test đúng method.

Ví dụ:

GET đúng
POST đúng
PUT/PATCH đúng
DELETE đúng

Sai method phải trả lỗi phù hợp:

405
hoặc
404 tùy implementation.

Không mặc định status code nếu source implementation khác.

==================================================
5. TEST STATUS CODE
==================================================

Kiểm tra:

200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
500 Internal Server Error

Chỉ áp dụng status code phù hợp với API thật.

Test cả:
- success;
- validation failure;
- resource missing;
- malformed request;
- server failure nếu mock được.

==================================================
6. TEST RESPONSE SCHEMA
==================================================

Kiểm tra response:

- đúng object/array;
- đúng field;
- đúng type;
- required field tồn tại;
- nullable field;
- optional field;
- nested object;
- list item schema.

Ví dụ Lesson:

{
  id,
  title,
  author,
  grade,
  genre,
  objectives
}

Không assert field không tồn tại trong API thực tế.

==================================================
7. TEST REQUEST VALIDATION
==================================================

Với POST/PUT/PATCH:

Test:
- body hợp lệ;
- missing required field;
- empty string;
- null;
- wrong type;
- invalid enum;
- invalid ID;
- malformed JSON;
- quá dài nếu có giới hạn;
- Unicode tiếng Việt;
- duplicate data nếu có unique constraint.

==================================================
8. TEST QUERY PARAMS
==================================================

Nếu endpoint có:

?page=
?limit=
?search=
?genre=
?grade=
?level=
?type=

Test:

- valid;
- missing;
- empty;
- invalid;
- negative;
- boundary;
- Unicode search;
- multiple filters.

==================================================
9. TEST PATH PARAMS
==================================================

Ví dụ:

/api/lessons/:id

Test:

- ID hợp lệ;
- ID không tồn tại;
- ID rỗng;
- ID sai format;
- special character;
- very long ID.

==================================================
10. TEST CRUD
==================================================

Nếu API có CRUD:

CREATE
READ
UPDATE
DELETE

Test độc lập từng thao tác.

Ví dụ flow API-level:

POST lesson
→ nhận ID

GET lesson/:id
→ dữ liệu đúng

PUT lesson/:id
→ field thay đổi

DELETE lesson/:id
→ resource bị xóa

GET lại
→ not found

Đây là API integration flow,
không phải UI E2E.

==================================================
11. TEST ERROR RESPONSE
==================================================

Error response phải:

- có status phù hợp;
- message rõ;
- không leak stack trace;
- không leak internal path;
- không leak secrets;
- không trả HTML bất ngờ nếu API dùng JSON;
- schema error nhất quán nếu hệ thống có chuẩn.

Ví dụ:

{
  "error": "...",
  "message": "..."
}

Chỉ assert structure thật của project.

==================================================
12. AUTHENTICATION / AUTHORIZATION
==================================================

EduMaster-Literature hiện có thể không có login/auth.

Nếu source xác nhận không auth:
ghi rõ:

"Authentication API testing: Not Applicable"

KHÔNG tự tạo auth test.

Nếu có auth thật, test:

- no token;
- invalid token;
- expired token;
- valid token;
- role permission;
- unauthorized resource access.

==================================================
13. CONTENT-TYPE
==================================================

Kiểm tra:

Content-Type

Ví dụ:

application/json

Nếu download:
application/vnd...
application/octet-stream
...

Test request gửi sai Content-Type nếu API có validation.

==================================================
14. CORS
==================================================

Nếu frontend và backend khác origin, kiểm tra:

Access-Control-Allow-Origin

Allowed methods
Allowed headers
Preflight OPTIONS

Chỉ áp dụng nếu backend/API tồn tại.

==================================================
15. API SECURITY BASIC TEST
==================================================

Không cần penetration testing sâu ở phase này.

Test cơ bản:

- unexpected fields;
- HTML/script input;
- SQL-like strings;
- oversized payload;
- invalid JSON;
- path traversal-like strings nếu có file path input;
- sensitive data exposure.

Ví dụ text:

<script>alert(1)</script>

phải được xử lý an toàn khi storage/render downstream.

Không thực hiện destructive security attack vào hệ thống production.

==================================================
16. UNICODE / VIETNAMESE API TEST
==================================================

Đây là P0 cho EduMaster Văn.

Test payload:

"Tây Tiến"
"Quang Dũng"
"Người lái đò Sông Đà"
"Vợ chồng A Phủ"
"Đất Nước"

Test:

- request giữ đúng Unicode;
- response giữ đúng Unicode;
- NFC normalization nếu API có xử lý;
- không mojibake;
- newline;
- dấu ngoặc kép;
- em dash;
- ký tự đặc biệt.

==================================================
17. LESSON API
==================================================

Nếu có API bài dạy, test:

- create lesson;
- get lessons;
- get lesson by id;
- update lesson;
- delete lesson;
- current lesson;
- duplicate title nếu được phép;
- empty lesson;
- lesson metadata.

Fields có thể gồm:

title
author
grade
genre
book
periods
objectives
text
references

Chỉ dùng fields tồn tại trong source.

==================================================
18. ANNOTATION / READER API
==================================================

Nếu có:

highlight
note
bookmark
evidence

test:

- create annotation;
- update;
- delete;
- paragraph anchor;
- selected text;
- Unicode;
- invalid target;
- orphan annotation.

==================================================
19. QUESTION BANK API
==================================================

Nếu có:

test question types:

Multiple Choice
True/False
Short Answer
Essay

Test:

- create;
- update;
- delete;
- filter;
- type;
- cognitive level;
- YCCĐ;
- source material;
- answer;
- marking guide;
- score.

==================================================
20. MATRIX / SPECIFICATION API
==================================================

Nếu backend có lưu matrix:

test:

- create/update;
- structure;
- topics;
- cognitive levels;
- question types;
- score;
- percentage;
- specification mapping.

Không hard-code tỷ lệ ngoài logic thực tế.

==================================================
21. EXAM API
==================================================

Nếu có:

- create exam;
- update;
- add/remove question;
- order;
- score;
- metadata;
- validation;
- retrieve;
- delete.

Test floating point:

0.1
0.25
0.5
1
2.5

Nếu project không thực sự áp dụng barem đó thì không hard-code.

==================================================
22. RUBRIC API
==================================================

Test:

- criteria;
- max score;
- quality levels;
- total;
- update;
- delete;
- invalid score;
- decimal precision.

==================================================
23. EXPORT API
==================================================

Nếu export đi qua API:

test:

POST /export/...

Kiểm tra:

- status;
- file trả về;
- MIME type;
- filename;
- file không rỗng;
- lỗi khi dữ liệu invalid.

Không cần mở file bằng UI ở API test.

Nếu export client-side:
ghi N/A cho API.

==================================================
24. BACKUP / RESTORE API
==================================================

Nếu backup/restore có API:

Test backup:
- valid state;
- response complete;
- Unicode.

Test restore:
- valid JSON;
- malformed JSON;
- schema mismatch;
- old schema;
- missing fields;
- wrong types.

Nếu chạy hoàn toàn localStorage:
ghi rõ không thuộc API Testing.

==================================================
25. PAGINATION
==================================================

Nếu API có pagination:

test:

page=1
page=last
page=0
page=-1
limit=1
limit=max
limit vượt max

Kiểm tra:

items
total
page
limit
hasNext
...

theo schema thật.

==================================================
26. SORTING
==================================================

Nếu hỗ trợ sort:

title
createdAt
updatedAt
score

Test ASC/DESC.

Test invalid sort key.

==================================================
27. FILTERING
==================================================

Nếu có filters:

grade
genre
type
level
status

test:
- single filter;
- combined filter;
- no result;
- invalid filter.

==================================================
28. SEARCH
==================================================

Test search:

"Tây Tiến"
"Quang Dũng"
"tây tiến"
"   Tây Tiến   "
Unicode NFC/NFD nếu relevant.

Kiểm tra case-sensitivity theo behavior thật.

==================================================
29. API PERFORMANCE BASIC CHECK
==================================================

Không thay thế Performance Testing riêng.

Chỉ ghi nhận basic latency:

GET endpoint đơn giản
POST endpoint đơn giản

Nếu response quá chậm bất thường:
report.

Không đặt threshold tùy tiện nếu requirement không có.

==================================================
30. MOCKING STRATEGY
==================================================

Không mock endpoint đang cần test end-to-end ở API layer.

Có thể mock:

external third-party API
email
file storage
external AI provider
external export service

Nếu cần.

Không mock repository khi mục tiêu là integration API + database.

==================================================
31. TEST DATA
==================================================

Tạo fixtures riêng:

tests/api/fixtures/

Ví dụ:

lesson.fixture.ts
question.fixture.ts
exam.fixture.ts
rubric.fixture.ts

Không dùng dữ liệu production thật.

Dùng dữ liệu môn Văn thực tế, ví dụ:

Tây Tiến
Quang Dũng
Ngữ văn 12

nhưng tránh copy nguyên tác phẩm có bản quyền vào fixture dài.

==================================================
32. TEST ISOLATION
==================================================

Mỗi test phải:

- độc lập;
- không phụ thuộc thứ tự;
- cleanup dữ liệu sau test;
- không dùng resource cố định dễ conflict;
- tạo ID riêng nếu cần.

Không để:

test B chỉ pass nếu test A chạy trước.

==================================================
33. PRIORITY
==================================================

P0:

- API availability
- request validation
- response schema
- CRUD core
- question/exam data
- backup/restore nếu API
- Unicode

P1:

- filter
- search
- sort
- pagination
- annotation
- rubric

P2:

- uncommon edge endpoints
- optional metadata

==================================================
34. TEST CASE FORMAT
==================================================

Mỗi test case trong tài liệu:

ID
Module
Endpoint
Method
Precondition
Request
Expected Status
Expected Response
Priority
Automated?
Result

Ví dụ:

API-LESSON-001
POST /api/lessons
Valid payload
Expected 201
Response chứa lesson ID

==================================================
35. AUTOMATION STRUCTURE
==================================================

Nếu dùng Vitest:

tests/
└── api/
    ├── lessons.api.test.ts
    ├── questions.api.test.ts
    ├── exams.api.test.ts
    ├── rubric.api.test.ts
    ├── export.api.test.ts
    ├── backup.api.test.ts
    ├── fixtures/
    └── helpers/

Nếu dùng Playwright:

tests/
└── api/
    ├── lessons.spec.ts
    ├── questions.spec.ts
    └── ...

Chọn một kiến trúc chính, không trộn lung tung.

==================================================
36. NẾU PROJECT KHÔNG CÓ API
==================================================

Đây là yêu cầu rất quan trọng.

Nếu audit xác nhận project hiện tại:
- frontend-only;
- localStorage;
- không backend;
- không REST/GraphQL endpoint;

THÌ:

KHÔNG tạo API giả chỉ để chạy test.

Thay vào đó:

1. Ghi:
   API Testing Status: NOT APPLICABLE / DEFERRED

2. Nêu lý do.

3. Liệt kê:
   - business logic đã thuộc Unit Testing;
   - localStorage thuộc Unit/Integration;
   - UI flow thuộc Functional/E2E;
   - export client-side thuộc Unit/Functional.

4. Giữ file:
   docs/testing/02_API_TESTING.md

5. Đưa ra điều kiện để kích hoạt API Testing trong tương lai:
   "Khi project bổ sung backend REST/GraphQL."

==================================================
37. REPORT
==================================================

Cập nhật:

docs/testing/02_API_TESTING.md

Phải có:

# API Testing Report

## 1. Scope
## 2. Architecture Detected
## 3. API Inventory
## 4. Tools
## 5. Test Cases
## 6. Automated Tests
## 7. Results
## 8. Bugs Found
## 9. Coverage
## 10. N/A Areas
## 11. Risks
## 12. Recommendations

==================================================
38. BUG REPORT
==================================================

Nếu phát hiện bug:

API-BUG-001

Endpoint:
Method:
Payload:
Expected:
Actual:
Status:
Severity:
Evidence:
Root Cause nếu xác định được:
Fix:
Retest:

Không sửa test để che bug.

==================================================
39. VERIFY
==================================================

Nếu API tests được triển khai:

chạy toàn bộ API tests.

Sau đó chạy:

npm run build

Nếu có:

npm run lint

Không kết thúc nếu test/build bị lỗi do thay đổi của bạn.

==================================================
40. FINAL OUTPUT
==================================================

Cuối cùng báo cáo:

- Project có API hay không.
- Số endpoint phát hiện.
- Số API test case.
- Số automated.
- Passed.
- Failed.
- Bugs.
- Endpoint chưa test.
- API Testing áp dụng được bao nhiêu %.

QUAN TRỌNG:

Không giả định backend tồn tại.

AUDIT
→ DETECT API
→ DESIGN TESTS
→ IMPLEMENT
→ RUN
→ FIX/REPORT

Nếu không có API:

AUDIT
→ CONFIRM N/A
→ DOCUMENT
→ STOP API IMPLEMENTATION

Không tạo code thừa.


==================================================
==================================================
# API Testing Report
==================================================
==================================================

**Project:** EduMaster-Literature  
**Auditor / QA Lead:** Senior QA Automation Engineer + Backend/API Test Engineer  
**Audit Date:** Tháng 10/2026  
**Status:** **NOT APPLICABLE / DEFERRED**  

---

## 1. Scope
- **Phạm vi kiểm tra:** Toàn bộ mã nguồn dự án EduMaster-Literature gồm:
  - Cấu hình dự án: `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `vercel.json`, `.env.example`.
  - Mã nguồn ứng dụng: toàn bộ thư mục `src/` (`App.tsx`, `components/`, `data/`, `theme/`, `types/`, `utils/`, `test/`).
  - Lịch sử Git commits và cấu hình môi trường khởi chạy (`run.bat`, `run.ps1`).
- **Mục tiêu:** Phát hiện bất kỳ REST API, GraphQL, tRPC, Serverless Function, fetch/axios client wrapper, hoặc external API call nào đang hoạt động.

---

## 2. Architecture Detected
- **Kiến trúc phát hiện:** **A. Frontend-only (Client-Side Single Page Application - SPA)**.
- **Chi tiết kỹ thuật:**
  1. **Không có Backend Server:** Không có bất kỳ HTTP server process, Express router, Fastify, NestJS, Next.js API route hay Serverless functions nào được kích hoạt.
  2. **Quản lý dữ liệu (State & Persistence):** Toàn bộ dữ liệu bài học (`LiteratureLesson`), kế hoạch bài dạy 5512 (`LessonPlan5512`), đề thi ma trận 7991 (`Exam7991Data`), rubric và ngân hàng câu hỏi được quản lý in-memory qua React 19 State và đồng bộ cục bộ vào trình duyệt qua `localStorage` (`STORAGE_KEY = 'edumaster_app_state_v3'`).
  3. **Xử lý tệp xuất khẩu (Client-Side Document Generation):** Các chức năng xuất Word (`.docx`), PowerPoint (`.pptx`), HTML Slides và sao lưu JSON chạy 100% trên tiến trình trình duyệt thông qua các thư viện `docx`, `pptxgenjs` và `URL.createObjectURL(blob)`. Không gửi bất kỳ dữ liệu nhạy cảm nào ra máy chủ bên ngoài.
  4. **Cấu hình Vercel:** File `vercel.json` cấu hình rewrite toàn bộ traffic `/(.*)` trỏ về `/index.html` của SPA, khẳng định không có backend proxy hay serverless function.
  5. **Các thư viện không dùng đến:** `package.json` có khai báo `express` và `@google/genai`, tuy nhiên kiểm tra tĩnh (AST & grep) cho thấy không có bất kỳ dòng code nào trong `src/` import hay sử dụng chúng.

---

## 3. API Inventory
- **Số lượng endpoint phát hiện:** **0 endpoints**.

| ID | Method | Endpoint | Mục đích | Auth | Request Schema | Response Schema | Trạng thái |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| — | — | — | *Không có endpoint HTTP/REST nào tồn tại trong codebase hiện tại* | — | — | — | **N/A** |

---

## 4. Tools
- **Công cụ kiểm tra & Audit:**
  - PowerShell Regex Static Code Analysis (`Select-String`, AST parsing).
  - Vitest v5.0.3 Test Runner & v8 Coverage Analysis.
  - jsdom DOM Mock Environment.
- **Đề xuất công cụ cho tương lai (Khi có backend thật):**
  - Vitest + `supertest` (nếu xây dựng Express/Node backend).
  - Playwright `APIRequestContext` (kiểm thử end-to-end API độc lập).

---

## 5. Test Cases
- **Số lượng Test Cases hiện tại:** **0** (Theo quy tắc Section 36 & 40: Không bịa ra endpoint không có trong source code).
- **Thiết kế khung Test Case dự phòng (Khi phát triển Backend API):**
  - `API-LESSON-001`: `GET /api/v1/lessons` — Lấy danh mục bài dạy (200 OK, schema array).
  - `API-LESSON-002`: `POST /api/v1/lessons` — Tạo mới bài học Ngữ văn (201 Created, validation Unicode NFC).
  - `API-EXAM-001`: `POST /api/v1/exams/calculate-score` — Tính điểm chuẩn 7991 (200 OK, Part II 4 ý Đúng/Sai).
  - `API-KHBD-001`: `PUT /api/v1/khbd/:id` — Cập nhật tiến trình 4 bước 5512 (200 OK, validation step1-step4).

---

## 6. Automated Tests
- **Số lượng Automated API Tests:** **0** (Tuân thủ nguyên tắc: Không tạo mock API hoặc backend giả chỉ để chạy test).
- **Bảo chứng chất lượng thay thế:** Toàn bộ nghiệp vụ tính toán, validation, và chuyển đổi trạng thái đã được bảo vệ bằng **101 Unit Tests** độc lập tại [`01_UNIT_TESTING.md`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/docs/testing/01_UNIT_TESTING.md).

---

## 7. Results
- **Trạng thái:** **NOT APPLICABLE / DEFERRED**
- **Passed:** 0
- **Failed:** 0
- **Bugs API:** 0

---

## 8. Bugs Found
- **Không phát hiện lỗi API** (Do hệ thống không có tầng mạng/backend HTTP).

---

## 9. Coverage
- **Độ phủ API Testing:** **0% (Not Applicable)**
- **Độ phủ Unit Testing thực tế của Core Logic:** **100% Lines / Stmts** trên các module lõi (`unicode.ts`, `components/common`, `presets.ts`, `matrixCalculation`, `rubricCalculation`).

---

## 10. N/A Areas (Phân định phạm vi kiểm thử)
Để tránh nhầm lẫn vai trò kiểm thử trong hệ thống giáo dục EduMaster-Literature:
- **Business Logic & Calculations:** Thuộc phạm vi **Unit Testing** (Đã hoàn thành 100%).
- **Lưu trữ dữ liệu `localStorage`:** Thuộc phạm vi **Unit / Storage Integration Testing** (Đã test tại `autosave.test.ts`).
- **Luồng giao diện giáo viên & Thao tác tương tác:** Thuộc phạm vi **Functional & E2E Testing** ([`04_FUNCTIONAL_TESTING.md`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/docs/testing/04_FUNCTIONAL_TESTING.md), [`12_E2E_TESTING.md`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/docs/testing/12_E2E_TESTING.md)).
- **Xuất tệp Word / PowerPoint / JSON:** Thuộc phạm vi **Client-side Export Testing** (Đã test tại `exportPreparation.test.ts`).
- **Authentication & Authorization:** **N/A** (Hệ thống không yêu cầu tài khoản/mật khẩu, chạy offline-first).

---

## 11. Risks
1. **Dữ liệu cục bộ (Single Point of Failure):** Dữ liệu lưu trong `localStorage` có nguy cơ bị mất nếu người dùng xóa dữ liệu trình duyệt hoặc đổi thiết bị mà không sao lưu JSON.
2. **Thiếu API đồng bộ:** Giáo viên không thể tự động đồng bộ bài giảng giữa máy tính ở trường và máy tính cá nhân ở nhà nếu không có Backend API.

---

## 12. Recommendations & Kế hoạch kích hoạt
1. **Điều kiện kích hoạt API Testing:** Kích hoạt ngay khi EduMaster-Literature phát triển backend REST/GraphQL/Supabase để lưu trữ bài giảng tập trung trên đám mây.
2. **Chuẩn hóa OpenAPI/Swagger trước khi viết code backend:** Sử dụng các TypeScript interfaces có sẵn trong `src/types/index.ts` làm chuẩn dữ liệu (Contract-First Design).
3. **Giữ nguyên trạng thái Frontend hiện tại:** Không chèn mã mock/stub network vào runtime để giữ ứng dụng nhẹ, ổn định và chạy mượt mà trên môi trường desktop của giáo viên.