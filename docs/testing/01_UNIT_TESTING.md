Bạn là Senior QA Automation Engineer + Senior Frontend Engineer chuyên React, TypeScript và Unit Testing.

NHIỆM VỤ:
Thiết kế và triển khai toàn bộ chiến lược UNIT TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Kiểm tra các đơn vị logic nhỏ nhất một cách độc lập.
- Ưu tiên test business logic, utility, state transformation, validation, calculation, data mapping.
- Test component ở mức unit/component khi phù hợp.
- Không biến Unit Test thành E2E Test.
- Không test implementation detail không cần thiết.
- Test phải dễ đọc, ổn định và dễ bảo trì.
- Không sửa business logic chỉ để làm test pass.
- Nếu phát hiện logic sai, ghi nhận rõ và fix hợp lý nếu phạm vi cho phép.

==================================================
1. ĐỌC PROJECT TRƯỚC KHI VIẾT TEST
==================================================

Trước tiên audit toàn bộ project.

Đọc:

package.json
tsconfig.json
vite.config.*
src/
docs/

Đặc biệt tìm:

src/utils/
src/services/
src/store/
src/state/
src/hooks/
src/context/
src/components/
src/theme/

Tìm các phần liên quan:

- AppState
- autosave
- localStorage
- backup / restore
- schema validation
- Unicode NFC normalization
- lesson switching
- literature annotations
- KHBD logic
- question builder
- matrix calculation
- exam score calculation
- rubric calculation
- slide generation mapping
- export preparation logic

Không viết test trước khi hiểu dependency và data flow.

==================================================
2. XÁC ĐỊNH TEST FRAMEWORK
==================================================

Kiểm tra project đang dùng gì.

Nếu chưa có framework Unit Test, ưu tiên:

Vitest
+
React Testing Library
+
@testing-library/user-event
+
jsdom

Nếu cần mocking:

vi.mock()

Không thêm Jest nếu project đã dùng Vite/Vitest.

Nếu chưa cài:

npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event

Cập nhật package.json:

"test": "vitest"
"test:run": "vitest run"
"test:coverage": "vitest run --coverage"

Nếu cần coverage:

npm install -D @vitest/coverage-v8

==================================================
3. CẤU TRÚC TEST
==================================================

Ưu tiên colocated tests:

src/
  utils/
    unicode.ts
    unicode.test.ts

hoặc:

src/
  __tests__/

Tuy nhiên phải nhất quán toàn project.

Đề xuất:

src/
├── utils/
│   ├── unicode.ts
│   └── unicode.test.ts
│
├── services/
│   ├── exportService.ts
│   └── exportService.test.ts
│
├── state/
│   ├── appState.ts
│   └── appState.test.ts
│
├── components/
│   └── ...
│
└── test/
    ├── setup.ts
    ├── fixtures/
    └── helpers/

==================================================
4. TEST PYRAMID CHO UNIT TEST
==================================================

Ưu tiên theo thứ tự:

1. Pure functions
2. Validation logic
3. Calculation logic
4. Mapping / transformation
5. State reducer/actions
6. Custom hooks
7. Reusable components
8. Complex components ở mức isolated component test

Không dùng Unit Test cho:
- full workflow;
- nhiều page;
- browser navigation;
- export download thực;
- E2E interaction dài.

Những phần đó để cho Integration/E2E.

==================================================
5. TEST UTILITY FUNCTIONS
==================================================

Tìm toàn bộ pure utility functions.

Ví dụ:

normalizeVietnamese()
normalizeDeepNFC()

Test:

- chuỗi NFC giữ nguyên;
- chuỗi NFD được normalize;
- nested object;
- array;
- null;
- undefined;
- number;
- boolean;
- string có dấu tiếng Việt;
- empty string.

Ví dụ test style:

describe("normalizeVietnamese", () => {
  it("normalizes NFD Vietnamese text to NFC", () => {
    ...
  });

  it("keeps NFC text unchanged", () => {
    ...
  });

  it("handles empty string", () => {
    ...
  });
});

==================================================
6. TEST APP STATE
==================================================

Tìm toàn bộ logic liên quan:

AppState
Current Lesson
Lesson collection
selected lesson
update lesson
delete lesson
create lesson

Test:

- tạo lesson mới;
- set current lesson;
- update đúng lesson;
- không update lesson khác;
- delete lesson;
- fallback current lesson;
- duplicate ID handling nếu có;
- empty state;
- malformed state.

Không test UI ở bước này.

==================================================
7. TEST AUTOSAVE
==================================================

Test logic:

Edit
→ debounce
→ serialize
→ localStorage

Dùng fake timers nếu cần:

vi.useFakeTimers()

Test:

- không save ngay lập tức nếu có debounce;
- save sau đúng interval;
- nhiều edit liên tiếp chỉ save lần cuối;
- serialize đúng;
- localStorage.setItem được gọi đúng;
- lỗi localStorage không crash app nếu code có xử lý;
- state không thay đổi thì không save thừa nếu logic hỗ trợ.

==================================================
8. TEST BACKUP / RESTORE
==================================================

Đây là phần quan trọng.

Test:

backup:
- serialize AppState đúng;
- JSON hợp lệ;
- đầy đủ lesson data;
- đầy đủ annotations;
- đầy đủ KHBD;
- đầy đủ questions;
- đầy đủ exam;
- đầy đủ rubric;
- slides được giữ nguyên.

restore:
- JSON hợp lệ;
- JSON invalid;
- missing field;
- wrong type;
- old schema;
- unknown field;
- Unicode text;
- empty state.

Nếu có migrate:

schema v1
→ migrate
→ current schema

phải test riêng.

==================================================
9. TEST LITERATURE DATA
==================================================

Test các model/domain liên quan:

LiteratureLesson
Author
Genre
Text segments
Annotations
Highlights
Notes
Evidence

Test mapping:

selection
→ annotation

selection
→ question source

selection
→ slide quote

selection
→ exam material

Không cần click UI ở đây.

Test logic transformation.

==================================================
10. TEST KHBD LOGIC
==================================================

Test:

Activity creation
Activity update
Activity remove
Activity reorder nếu có

Mỗi activity:

- name
- duration
- objective
- content
- product
- learning material
- method
- organization steps

Kiểm tra:

4 organization steps giữ đúng thứ tự:

1. Chuyển giao nhiệm vụ
2. Thực hiện nhiệm vụ
3. Báo cáo / Thảo luận
4. Kết luận / Nhận định

Test:
- missing step;
- empty content;
- duration invalid;
- clone activity;
- total duration nếu project có tính.

==================================================
11. TEST KHBD → SLIDE MAPPING
==================================================

Nếu project có mapping:

Khởi động
→ Hook / Quote / Question

Khám phá văn bản
→ Quote / Split

Phân tích
→ Cards / Argument

Luyện tập
→ Quiz

Vận dụng
→ Writing/Application

Test mapping function độc lập.

Test:
- từng activity type;
- unknown activity type;
- empty content;
- custom title;
- evidence preservation.

==================================================
12. TEST QUESTION BUILDER
==================================================

Test domain logic:

Question:
- Multiple Choice
- True/False
- Short Answer
- Essay

Test:

- create;
- update;
- delete;
- duplicate;
- metadata;
- YCCĐ;
- cognitive level;
- answer;
- marking guide;
- source material.

Test validation:

- question text empty;
- missing answer;
- invalid type;
- score < 0;
- score NaN;
- unsupported metadata.

==================================================
13. TEST MATRIX LOGIC
==================================================

Tìm toàn bộ calculation:

- số câu;
- điểm;
- tỷ lệ;
- distribution;
- topic;
- cognitive level;
- question type.

Test:

- tổng điểm;
- tổng số câu;
- phân bố theo mức độ;
- phân bố theo dạng câu;
- matrix match;
- thiếu câu;
- thừa câu;
- điểm không đủ;
- zero question;
- floating point.

LƯU Ý:
Không hard-code assumption nghiệp vụ không tồn tại trong source code.

Test theo logic project hiện tại.

==================================================
14. TEST EXAM LOGIC
==================================================

Test:

- add question;
- remove;
- reorder;
- change section;
- score aggregation;
- total question count;
- total duration nếu có;
- validation;
- matrix match.

Boundary:

0 điểm
10 điểm
>10 điểm
negative
decimal score

Nếu project có score warning:

< target
= target
> target

test cả 3.

==================================================
15. TEST RUBRIC
==================================================

Test:

- add criterion;
- edit criterion;
- delete criterion;
- total max score;
- weight sum;
- empty level description;
- invalid max score;
- duplicate criterion;
- floating-point rounding.

Ví dụ:

2.5 + 2 + 1.5 + 2 + 2
→ 10

Không để lỗi:

9.999999999

nếu UI hiển thị 10.0.

==================================================
16. TEST SLIDE DOMAIN LOGIC
==================================================

Test:

- create slide;
- duplicate;
- remove;
- reorder;
- update slide;
- slide type mapping;
- speaker note nếu có.

Slide types:

Cover
Objectives
Quote
Split
Cards
Timeline
Argument Map
Character
Theme
Quiz
Writing Prompt
Summary

Test invalid slide type nếu schema có validation.

==================================================
17. TEST EXPORT PREPARATION LOGIC
==================================================

Không test Word/PPT rendering bằng pixel.

Unit Test chỉ test:

input
→ export model

Ví dụ:

KHBD
→ DOCX document model

Exam
→ export sections

Rubric
→ export table data

Slides
→ presentation model

Test:

- title;
- author;
- lesson info;
- Unicode;
- questions;
- answers;
- scores;
- empty state.

Mock filesystem/browser download nếu cần.

==================================================
18. TEST COMMON COMPONENTS
==================================================

Test component nhỏ:

Badge
Button
Tabs
Modal
Drawer
EmptyState
StatCard
Accordion

Test observable behavior.

Ví dụ Button:

- renders label;
- fires onClick;
- disabled không click;
- keyboard Enter;
- aria attribute nếu có.

Không test internal class name trừ khi thật cần.

==================================================
19. TEST SIDEBAR / TOPBAR
==================================================

Chỉ test logic đơn vị.

Sidebar:
- render đúng module;
- active item;
- click gọi navigation callback;
- hidden in focus mode nếu logic component phụ trách.

TopBar:
- current lesson;
- autosave status;
- lesson switcher;
- export menu callback.

Không test toàn flow navigation.

==================================================
20. TEST HOOKS
==================================================

Nếu có custom hooks:

useAutosave
useAppState
useLesson
useLocalStorage
useExport
...

test:

- initial state;
- updates;
- cleanup;
- dependency changes;
- errors;
- unmount.

==================================================
21. MOCK STRATEGY
==================================================

Mock chỉ dependency bên ngoài.

Có thể mock:

localStorage
Date
crypto.randomUUID
File API
URL.createObjectURL
download
browser APIs
export library

Không mock pure business function đang cần test.

Không overmock.

==================================================
22. FIXTURES
==================================================

Tạo reusable fixtures:

src/test/fixtures/

Ví dụ:

lesson.fixture.ts
question.fixture.ts
exam.fixture.ts
khbd.fixture.ts
rubric.fixture.ts
slide.fixture.ts
appState.fixture.ts

Không copy object 50 dòng trong mỗi test.

Ví dụ:

createLessonFixture({
  title: "Tây Tiến"
})

==================================================
23. NAMING CONVENTION
==================================================

Dùng:

describe("Exam score calculation", () => {
  it("returns 10 when all sections sum to 10", () => {});
});

Không dùng tên:

test1
test2
works
should work

Tên phải mô tả behavior.

==================================================
24. ARRANGE — ACT — ASSERT
==================================================

Mọi test phải dễ đọc:

// Arrange

// Act

// Assert

Không bắt buộc comment nếu code đã rõ,
nhưng cấu trúc phải tuân theo pattern này.

==================================================
25. TEST CASE DESIGN TECHNIQUES
==================================================

Khi thiết kế Unit Test, áp dụng:

Equivalence Partitioning

Boundary Value Analysis

Decision Table nếu logic nhiều điều kiện

State Transition nếu liên quan state

Happy Path

Negative Path

Edge Cases

Null / Undefined

Empty Data

Invalid Data

==================================================
26. TEST EDGE CASES
==================================================

Bắt buộc tìm:

null
undefined
empty string
empty array
empty object
NaN
negative numbers
large numbers
duplicate IDs
invalid JSON
very long Vietnamese text
special characters
Unicode normalization
line breaks
emoji nếu field cho phép

==================================================
27. COVERAGE TARGET
==================================================

Không chạy theo 100% coverage mù quáng.

Target đề xuất:

Utilities:
90%+

Business Logic:
85%+

State:
80%+

Services:
80%+

Reusable Components:
70%+

Complex page components:
không cần ép coverage cao bằng Unit Test.

Ưu tiên branch coverage cho:

validation
calculation
migration
restore
score logic

==================================================
28. KHÔNG TEST
==================================================

Không viết Unit Test cho:

- Tailwind class tồn tại hay không;
- màu chính xác;
- pixel layout;
- responsive visual;
- screenshot;
- browser routing dài;
- full lesson workflow;
- Selenium behavior.

Những phần này thuộc:

Visual
Integration
E2E
Responsive testing.

==================================================
29. ƯU TIÊN P0 / P1 / P2
==================================================

P0:

Unicode normalization
AppState
Backup / Restore
Exam score
Matrix calculation
Rubric total
Question validation
Autosave core logic

P1:

KHBD
Slides
lesson switching
annotations
mapping functions

P2:

common UI components
minor formatting helpers

Làm P0 trước.

==================================================
30. TEST REPORT
==================================================

Sau khi audit, tạo:

docs/UNIT_TEST_PLAN.md

Bao gồm:

- Scope
- Unit test strategy
- Modules
- Risk
- Priority
- Test files
- Coverage goal

Sau khi implement, tạo:

docs/UNIT_TEST_REPORT.md

Bao gồm:

1. Framework
2. Test environment
3. Files tested
4. Number of test suites
5. Number of test cases
6. Passed
7. Failed
8. Coverage
9. Bugs found
10. Fixes made
11. Untested areas
12. Remaining risks

==================================================
31. CHẠY TEST
==================================================

Sau khi implement:

npm run test:run

Sau đó:

npm run test:coverage

Sau đó:

npm run build

Nếu có lint:

npm run lint

Không kết thúc khi test còn failed.

==================================================
32. QUY TẮC FIX BUG
==================================================

Nếu test phát hiện bug thật:

1. Xác nhận behavior mong muốn từ source hiện tại.
2. Không sửa test để che bug.
3. Fix implementation.
4. Chạy lại test.
5. Ghi bug vào UNIT_TEST_REPORT.md.

Nếu behavior không rõ:
không tự suy diễn nghiệp vụ.

Ghi:
"Requirement unclear — test deferred"

==================================================
33. KẾT QUẢ CUỐI
==================================================

Khi hoàn thành, output phải có:

- Unit test framework hoạt động.
- Test setup hoàn chỉnh.
- Fixtures.
- Test helpers.
- Test P0 đầy đủ.
- Test P1 quan trọng.
- Coverage report.
- Build pass.
- UNIT_TEST_PLAN.md.
- UNIT_TEST_REPORT.md.

Không chỉ viết test plan.

Hãy trực tiếp:
AUDIT
→ IMPLEMENT
→ RUN
→ FIX
→ REPORT

BẮT ĐẦU TỪ BUSINESS LOGIC VÀ PURE FUNCTIONS.
KHÔNG BẮT ĐẦU TỪ UI SCREENSHOT.