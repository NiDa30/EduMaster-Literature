Bạn là Senior UX Researcher + Senior QA Engineer + Usability Test Specialist.

NHIỆM VỤ:
Thiết kế và triển khai USABILITY TESTING cho project EduMaster-Literature.

MỤC TIÊU:
- Đánh giá giáo viên Ngữ văn có thể sử dụng hệ thống dễ dàng, nhanh và ít nhầm lẫn hay không.
- Đo mức độ dễ học, dễ hiểu, dễ hoàn thành task và mức độ hài lòng.
- Phát hiện các vấn đề về luồng thao tác, terminology, cognitive load, information architecture và feedback.
- Không biến Usability Testing thành Functional Testing.
- Không chỉ hỏi "giao diện có đẹp không".
- Không thay requirement chính thức bằng ý kiến cá nhân.
- Phải ưu tiên người dùng mục tiêu thực tế của sản phẩm: giáo viên Ngữ văn THPT.
- Không coi student là direct software user nếu current scope không có student-facing UI.

==================================================
1. ĐỌC TOÀN BỘ PROJECT CONTEXT TRƯỚC
==================================================

Đọc:

README*
docs/
src/

Đọc các tài liệu UX/UI:

docs/UI_REFERENCE_AUDIT.md
docs/UI_REFACTOR_PLAN.md
docs/UI_REFACTOR_REPORT.md
docs/VISUAL_POLISH_REPORT.md nếu có

Đọc toàn bộ các report trước:

docs/testing/01_UNIT_TESTING.md
docs/testing/02_API_TESTING.md
docs/testing/03_DATABASE_TESTING.md
docs/testing/04_FUNCTIONAL_TESTING.md
docs/testing/05_INTERACTION_TESTING.md
docs/testing/06_SMOKE_TESTING.md
docs/testing/07_VISUAL_TESTING.md
docs/testing/08_CONSISTENCY_TESTING.md
docs/testing/09_RESPONSIVE_TESTING.md
docs/testing/10_ACCESSIBILITY_TESTING.md
docs/testing/11_COMPATIBILITY_TESTING.md
docs/testing/12_E2E_TESTING.md
docs/testing/13_REGRESSION_UI_TESTING.md
docs/testing/14_REGRESSION_TESTING.md
docs/testing/15_SANITY_TESTING.md
docs/testing/16_PERFORMANCE_TESTING.md
docs/testing/17_LOAD_TESTING.md
docs/testing/18_STRESS_TESTING.md
docs/testing/19_RECOVERY_RELIABILITY_TESTING.md

Mục tiêu:
không lặp lại bug kỹ thuật đã biết,
mà tập trung vào trải nghiệm con người.

==================================================
2. XÁC ĐỊNH USER PERSONA
==================================================

Primary persona:

GIÁO VIÊN NGỮ VĂN THPT

Có thể có các đặc điểm:

- dạy theo chương trình GDPT 2018;
- soạn KHBD;
- phân tích tác phẩm;
- xây dựng câu hỏi;
- lập ma trận / bản đặc tả;
- tạo đề kiểm tra;
- xây rubric;
- làm slide;
- xuất tài liệu Word/PPTX;
- không nhất thiết thành thạo công nghệ;
- cần thao tác nhanh trong công việc thật.

Không assume:
- họ biết thuật ngữ kỹ thuật;
- họ hiểu JSON;
- họ hiểu database/state.

==================================================
3. SECONDARY PERSONA
==================================================

Nếu phù hợp:

- tổ trưởng chuyên môn;
- giáo viên trẻ;
- giáo viên ít dùng công nghệ;
- giáo viên có kinh nghiệm lâu năm.

Có thể dùng để kiểm tra khác biệt về learnability.

Không mở rộng sang:
Admin
Student
Parent

nếu product không phục vụ trực tiếp.

==================================================
4. USABILITY DIMENSIONS
==================================================

Đánh giá ít nhất:

A. Learnability
B. Efficiency
C. Effectiveness
D. Error Prevention
E. Recoverability
F. Memorability
G. Satisfaction
H. Cognitive Load
I. Navigation Clarity
J. Terminology Clarity

==================================================
5. KHÔNG HỎI USER THEO KIỂU DẪN DẮT
==================================================

Không hỏi:

"Anh/chị thấy nút này dễ dùng đúng không?"

Thay bằng:

"Anh/chị sẽ làm gì tiếp theo?"

"Anh/chị nghĩ nút này dùng để làm gì?"

"Anh/chị tìm chức năng tạo đề ở đâu?"

Không gợi ý vị trí câu trả lời.

==================================================
6. THINK-ALOUD METHOD
==================================================

Khuyến nghị dùng:

Think Aloud Protocol

Yêu cầu participant nói ra:

- họ đang tìm gì;
- họ nghĩ nút nào có tác dụng gì;
- điều gì khiến họ bối rối;
- vì sao họ chọn thao tác đó.

Không can thiệp trừ khi participant bị kẹt quá lâu.

==================================================
7. TEST SESSION FORMAT
==================================================

Một session có thể khoảng:

30–60 phút.

Cấu trúc:

1. Introduction
2. Background questions
3. Task scenarios
4. Think aloud
5. Post-task questions
6. SUS / satisfaction
7. Debrief

Không cần kéo dài nếu participant đã mệt.

==================================================
8. SAMPLE SIZE
==================================================

Nếu usability formative:

5–8 giáo viên có thể đủ để tìm nhiều vấn đề lớn.

Nếu không có user thật:
có thể làm heuristic/internal usability review,
nhưng phải ghi rõ:

"No real-user validation performed."

Không giả vờ internal QA là user research.

==================================================
9. PARTICIPANT PROFILE
==================================================

Thu thập tối thiểu:

- số năm dạy;
- khối đang dạy;
- mức độ dùng máy tính;
- có thường dùng Word/PowerPoint không;
- có dùng phần mềm soạn bài khác không;
- có quen ma trận/đặc tả/rubric không.

Không thu thập thông tin cá nhân không cần thiết.

==================================================
10. TASK DESIGN PRINCIPLE
==================================================

Task phải là goal thực tế.

Không viết:

"Click Sidebar > KHBD > Add Activity."

Viết:

"Anh/chị cần soạn kế hoạch bài dạy cho bài Tây Tiến. Hãy bắt đầu và hoàn thành phần hoạt động dạy học."

Không chỉ đường thao tác.

==================================================
11. TASK #1 — FIND/CREATE LESSON
==================================================

Scenario:

"Anh/chị chuẩn bị dạy bài Tây Tiến của Quang Dũng cho lớp 12. Hãy tạo hoặc mở bài dạy này."

Quan sát:

- có tìm được Create Lesson không;
- hiểu lesson là gì không;
- field nào gây bối rối;
- có biết bắt đầu ở đâu không.

Metrics:

Success
Time
Errors
Assistance

==================================================
12. TASK #2 — READ & ANNOTATE
==================================================

Scenario:

"Hãy đọc một đoạn trong Tây Tiến và đánh dấu một chi tiết mà anh/chị muốn sử dụng khi giảng bài."

Quan sát:
- có hiểu text selection không;
- có phát hiện floating toolbar;
- có phân biệt Highlight/Note không.

==================================================
13. TASK #3 — CREATE NOTE
==================================================

Scenario:

"Anh/chị muốn ghi lại nhận xét về một đoạn thơ để dùng khi giảng. Hãy lưu ghi chú."

Quan sát:
- discoverability;
- save feedback;
- confidence.

==================================================
14. TASK #4 — ANALYZE WORK
==================================================

Scenario:

"Hãy ghi lại một luận điểm hoặc dẫn chứng quan trọng về tác phẩm để sử dụng cho bài giảng."

Quan sát:
- Genre Analysis có dễ hiểu không;
- terminology;
- tabs;
- Argument Map.

==================================================
15. TASK #5 — BUILD KHBD
==================================================

P0.

Scenario:

"Anh/chị cần xây dựng kế hoạch bài dạy từ những nội dung vừa chuẩn bị."

Quan sát:

- tìm được KHBD;
- hiểu Visual Builder;
- hiểu activity;
- hiểu các bước tổ chức;
- có bị quá tải form không.

==================================================
16. TASK #6 — SWITCH DOCUMENT VIEW
==================================================

Scenario:

"Anh/chị muốn xem kế hoạch bài dạy dưới dạng tài liệu hoàn chỉnh."

Quan sát:
- discoverability của Document View;
- người dùng có hiểu đây là preview không;
- quay lại edit có dễ không.

==================================================
17. TASK #7 — CREATE QUESTION
==================================================

P0.

Scenario:

"Từ đoạn ngữ liệu đang đọc, hãy tạo một câu hỏi kiểm tra."

Quan sát:

Reader
→ toolbar
→ Question Bank

Kiểm tra mental model:
người dùng có hiểu dữ liệu được chuyển đi đâu không?

==================================================
18. TASK #8 — FIND QUESTION AGAIN
==================================================

Scenario:

"Anh/chị vừa tạo một câu hỏi. Hãy tìm lại câu hỏi đó để chỉnh sửa."

Quan sát:
- search/filter;
- list;
- selected item;
- save.

==================================================
19. TASK #9 — BUILD MATRIX
==================================================

Scenario:

"Anh/chị chuẩn bị xây dựng một bài kiểm tra. Hãy lập cấu trúc/ma trận cho bài kiểm tra."

Quan sát:
- tìm module;
- table hiểu được không;
- terminology;
- cognitive load.

Không hỏi participant về requirement mà UI chưa xác nhận.

==================================================
20. TASK #10 — BUILD SPECIFICATION
==================================================

Scenario:

"Từ ma trận vừa lập, hãy xem hoặc chỉnh bản đặc tả."

Quan sát:
- mối quan hệ Matrix ↔ Specification có rõ không;
- người dùng có nghĩ chúng là một hay hai bước.

==================================================
21. TASK #11 — BUILD EXAM
==================================================

P0.

Scenario:

"Anh/chị cần tạo đề kiểm tra dựa trên câu hỏi đã có."

Quan sát:
- Section navigation;
- Question Bank;
- Add question;
- Statistics;
- Validation.

Đặc biệt:
người dùng có hiểu 3 cột không?

==================================================
22. TASK #12 — VALIDATE EXAM
==================================================

Scenario:

"Hãy kiểm tra xem đề đã sẵn sàng để sử dụng chưa."

Quan sát:
- user tìm validation ở đâu;
- warnings có hiểu được không;
- biết cách sửa lỗi không.

==================================================
23. TASK #13 — BUILD RUBRIC
==================================================

Scenario:

"Anh/chị cần tạo hướng dẫn đánh giá cho câu tự luận."

Quan sát:
- criterion;
- quality level;
- score;
- total.

==================================================
24. TASK #14 — CREATE SLIDES
==================================================

Scenario:

"Anh/chị muốn tạo slide từ nội dung bài dạy hiện tại."

Quan sát:
- hiểu cách thêm slide;
- hiểu thumbnail/editor/inspector;
- biết cách chuyển nội dung KHBD/Reader sang Slide.

==================================================
25. TASK #15 — PRESENTATION MODE
==================================================

Scenario:

"Giả sử anh/chị đang lên lớp. Hãy bắt đầu trình chiếu."

Quan sát:
- tìm Presentation;
- next/previous;
- exit.

==================================================
26. TASK #16 — EXPORT KHBD
==================================================

P0.

Scenario:

"Anh/chị cần gửi kế hoạch bài dạy cho tổ chuyên môn dưới dạng Word."

Quan sát:
- tìm Export;
- chọn đúng loại;
- hiểu filename;
- biết khi export thành công.

==================================================
27. TASK #17 — EXPORT SLIDES
==================================================

Scenario:

"Anh/chị muốn tải slide PowerPoint để dạy trên máy khác."

Quan sát:
- discoverability;
- confidence.

==================================================
28. TASK #18 — BACKUP
==================================================

Scenario:

"Anh/chị muốn lưu một bản dự phòng để tránh mất toàn bộ công việc."

Quan sát:
- người dùng có hiểu "Backup" không;
- JSON có làm họ sợ/confused không;
- copy/download options có rõ không.

==================================================
29. TASK #19 — RESTORE
==================================================

Scenario:

"Anh/chị chuyển sang máy khác và cần khôi phục bài dạy từ bản sao lưu."

Quan sát:
- Restore có dễ tìm;
- user hiểu file nào cần chọn;
- warning có rõ.

==================================================
30. TASK #20 — RESUME WORK NEXT DAY
==================================================

Scenario:

"Ngày hôm sau anh/chị mở lại ứng dụng và muốn tiếp tục bài đang soạn."

Quan sát:
- Dashboard Resume Card;
- Recent Lessons;
- current lesson.

==================================================
31. TASK SUCCESS CLASSIFICATION
==================================================

Cho từng task:

SUCCESS
PARTIAL SUCCESS
FAIL

SUCCESS:
hoàn thành không trợ giúp.

PARTIAL:
hoàn thành nhưng cần hint nhỏ hoặc vòng vo.

FAIL:
không hoàn thành / sai mục tiêu / cần hướng dẫn trực tiếp.

==================================================
32. TIME ON TASK
==================================================

Đo:
Start
→ Completion

Không dùng thời gian duy nhất để kết luận usability.

Một giáo viên cẩn thận có thể chậm nhưng không gặp vấn đề.

Kết hợp qualitative observation.

==================================================
33. ERROR COUNT
==================================================

Ghi:

Misclick
Wrong module
Wrong interpretation
Backtrack
Invalid input
Dead end

Phân biệt:
user error
vs
design-induced error.

==================================================
34. ASSISTANCE COUNT
==================================================

Ghi số lần moderator phải hỗ trợ.

0:
ideal

1:
minor issue

nhiều:
strong usability problem.

==================================================
35. DISCOVERABILITY
==================================================

Đặc biệt đánh giá:

- Create Lesson
- Focus Mode
- Reader selection actions
- KHBD Document View
- Matrix
- Validation
- Rubric
- Slides presentation
- Export
- Backup/Restore

==================================================
36. INFORMATION ARCHITECTURE
==================================================

Hỏi:

"Anh/chị mong tìm chức năng X ở đâu?"

So với vị trí thật.

Tìm vấn đề:
- sai nhóm;
- tên module khó hiểu;
- sidebar quá nhiều lựa chọn.

==================================================
37. TERMINOLOGY TESTING
==================================================

Đánh giá:

- Bài dạy
- Tác phẩm
- Phân tích thể loại
- KHBD
- Ma trận
- Bản đặc tả
- Ngân hàng câu hỏi
- Rubric
- Xuất bản
- Backup/Restore

Hỏi participant:

"Anh/chị nghĩ mục này làm gì?"

Nếu nhiều người hiểu sai:
đây là terminology problem.

==================================================
38. DOMAIN TERMINOLOGY VS SOFTWARE TERMINOLOGY
==================================================

Ưu tiên ngôn ngữ giáo viên.

Ví dụ:
"Khôi phục bản sao"
có thể dễ hiểu hơn "Restore".

"Xuất tài liệu"
có thể rõ hơn "Publish"
nếu project không thực sự publish lên platform.

Không tự đổi ngay;
ghi evidence trước.

==================================================
39. COGNITIVE LOAD
==================================================

Quan sát:
- quá nhiều buttons;
- nhiều panel cùng lúc;
- quá nhiều field;
- nhiều status/badge;
- nhiều thông tin không cần ngay.

Đặc biệt:
KHBD
Matrix
Exam
Slides

==================================================
40. PROGRESSIVE DISCLOSURE
==================================================

Đánh giá:
thông tin nâng cao có nên ẩn cho đến khi cần không.

Ví dụ:
Advanced settings
Metadata
Secondary filters

Không giấu action chính.

==================================================
41. PRIMARY ACTION CLARITY
==================================================

Ở mỗi màn hình hỏi:

"Người dùng có biết bước tiếp theo quan trọng nhất là gì không?"

Nếu có 5 CTA ngang nhau:
report hierarchy issue.

==================================================
42. NAVIGATION CLARITY
==================================================

Kiểm tra:
- Sidebar labels;
- active location;
- breadcrumb;
- back behavior;
- lesson context.

User không nên tự hỏi:
"Tôi đang sửa bài nào?"

==================================================
43. CURRENT LESSON CONTEXT
==================================================

P0 usability.

Quan sát:
người dùng có luôn biết:
- bài hiện tại là gì;
- tác phẩm nào;
- đang chỉnh module nào.

Nếu switch lesson gây nhầm:
High usability risk.

==================================================
44. SYSTEM FEEDBACK
==================================================

Sau action:
- Save
- Delete
- Export
- Restore
- Create Question

người dùng phải biết:
- action đã xảy ra chưa;
- thành công hay lỗi.

Không cần popup cho mọi click.

==================================================
45. AUTOSAVE COMPREHENSION
==================================================

Hỏi:

"Anh/chị nghĩ dữ liệu đã được lưu chưa?"

Quan sát autosave status có đủ rõ không.

Nếu user liên tục tìm Save button:
mental model có thể chưa khớp.

==================================================
46. ERROR MESSAGE USABILITY
==================================================

Cho một invalid input representative.

Quan sát:
- user hiểu lỗi không;
- biết sửa gì không;
- message có dùng thuật ngữ kỹ thuật không.

Bad:
"Validation failed"

Better:
"Vui lòng nhập tên tác phẩm."

Đánh giá theo implementation thực tế.

==================================================
47. DELETE CONFIRMATION
==================================================

Quan sát:
- user có hiểu sẽ xóa gì;
- Cancel/Confirm rõ;
- destructive button hierarchy đúng.

==================================================
48. EMPTY STATE USABILITY
==================================================

Test app/module chưa có dữ liệu.

Hỏi:
"Anh/chị sẽ làm gì tiếp?"

Empty state tốt phải hướng user tới next action.

==================================================
49. HELP / GUIDANCE
==================================================

Đánh giá:
- placeholder;
- helper text;
- tooltip;
- onboarding.

Không thêm tooltip cho mọi thứ.

Nếu terminology domain đã rõ:
không cần giải thích quá nhiều.

==================================================
50. FIRST-TIME USER TEST
==================================================

Cho participant chưa dùng app.

Không hướng dẫn trước.

Quan sát:
- onboarding tự nhiên;
- first-click;
- first task success.

==================================================
51. RETURNING USER TEST
==================================================

Cho participant quay lại sau một khoảng thời gian.

Đánh giá Memorability:

- có nhớ module nằm đâu;
- có tìm resume dễ không;
- có nhớ export.

==================================================
52. EXPERT USER EFFICIENCY
==================================================

Với giáo viên đã quen app:
đánh giá:
- số click;
- shortcut;
- repeated tasks;
- workflow speed.

Usability không chỉ cho beginner.

==================================================
53. CLICK COUNT
==================================================

Ghi click count cho core tasks.

Không tối ưu chỉ để giảm click.

3 click rõ ràng tốt hơn 1 click khó đoán.

==================================================
54. WORKFLOW CONTINUITY
==================================================

Quan sát các chuyển tiếp:

Reader → Genre
Genre → KHBD
KHBD → Slides

và:

Matrix → Specification → Question → Exam → Rubric

Người dùng có cảm giác flow liên tục không,
hay mỗi module như app riêng?

==================================================
55. ASSESSMENT FLOW CLARITY
==================================================

Đặc biệt kiểm tra:

Matrix
→ Specification
→ Question Bank
→ Exam
→ Validation
→ Rubric

Hỏi participant:
"Anh/chị nghĩ bước tiếp theo là gì?"

Nếu flow không đoán được:
có problem.

==================================================
56. OFFICIAL REQUIREMENT CAUTION
==================================================

Khi đánh giá terminology/flow liên quan quy định:

PHẢI phân biệt:

REQUIREMENT TỪ VĂN BẢN CHÍNH THỨC
≠
LOGIC HIỆN TẠI CỦA PROJECT
≠
ĐỀ XUẤT UX

Không được nói:
"Đây là quy định bắt buộc của Bộ"

nếu source hiện tại không xác nhận.

Nếu requirement chưa rõ:
ghi:

"Không được xác nhận từ tài liệu nguồn hiện tại."

==================================================
57. CV 7991 CAUTION
==================================================

Không hard-code usability flow dựa trên giả định:

12 + 2 + 4 + 1 câu
hoặc
scoring T/F 0.10 / 0.25 / 0.50 / 1.00

nếu project/source chính thức chưa xác nhận đó là rule bắt buộc.

Usability test phải đánh giá current implementation,
nhưng không biến project convention thành official requirement.

==================================================
58. CV 5512 CAUTION
==================================================

KHBD có thể hiện tại dùng:
- 4 activities;
- 4 organization steps.

Đánh giá usability của implementation này.

Nhưng không tự ghi:
"bắt buộc Bộ GDĐT yêu cầu mọi KHBD đúng 4 activity"

nếu source hiện tại không xác nhận như vậy.

==================================================
59. VISUAL DENSITY
==================================================

Đánh giá:

- whitespace;
- dense tables;
- form length;
- side panels.

Không hỏi chỉ:
"đẹp không?"

Hỏi:
"Anh/chị có dễ tìm thông tin cần thiết không?"

==================================================
60. READER USABILITY
==================================================

Đây là màn hình quan trọng.

Đánh giá:

- đọc lâu có mệt không;
- line length;
- panel distraction;
- selection actions;
- notes;
- Focus Mode.

==================================================
61. FOCUS MODE USABILITY
==================================================

Task:
"Anh/chị muốn chỉ tập trung đọc văn bản."

Quan sát:
- có tìm được Focus Mode;
- mode có thực sự giảm distraction;
- biết cách thoát.

==================================================
62. MATRIX USABILITY
==================================================

Matrix là màn data-heavy.

Quan sát:
- user hiểu row/column không;
- biết edit đâu;
- biết total ở đâu;
- có bị quá tải bởi nhiều badge/color không.

==================================================
63. EXAM BUILDER USABILITY
==================================================

3 cột có thể hiệu quả với expert nhưng nặng với beginner.

Đánh giá:
- Sections;
- Questions;
- Statistics.

Hỏi:
"Anh/chị đang nhìn vùng nào để làm việc chính?"

==================================================
64. RUBRIC USABILITY
==================================================

Quan sát:
- criterion vs level;
- score;
- total;
- edit pattern.

Nếu user phải giải mã bảng:
report.

==================================================
65. SLIDES USABILITY
==================================================

Đánh giá:
- thumbnail;
- canvas;
- inspector.

Người dùng quen PowerPoint có hiểu mental model không?

==================================================
66. EXPORT USABILITY
==================================================

P0.

Người dùng phải hiểu:
- xuất cái gì;
- format gì;
- file nằm đâu;
- khi nào hoàn tất.

Nếu có quá nhiều export cards:
đánh giá grouping.

==================================================
67. BACKUP / RESTORE LANGUAGE
==================================================

JSON là implementation detail.

User không nhất thiết cần hiểu JSON.

Đánh giá wording:

"Backup JSON"
vs
"Sao lưu dữ liệu"

Có thể technical detail nhỏ hơn ở subtitle.

==================================================
68. SATISFACTION QUESTION
==================================================

Sau mỗi task có thể hỏi:

"Task này dễ hay khó?"

Scale:
1–5 hoặc 1–7.

Không hỏi quá nhiều sau mỗi click.

==================================================
69. SINGLE EASE QUESTION
==================================================

Có thể dùng SEQ:

"Nhìn chung, task này khó hay dễ?"

1 = Rất khó
7 = Rất dễ

Ghi score cho task chính.

==================================================
70. SYSTEM USABILITY SCALE
==================================================

Sau session có thể dùng SUS 10 câu.

Nếu dùng:
tính score 0–100 đúng phương pháp.

Không diễn giải:
SUS 80 = 80% usable.

SUS là score chuẩn hóa, không phải phần trăm.

==================================================
71. QUALITATIVE QUESTIONS
==================================================

Cuối session hỏi:

- Điều gì khó nhất?
- Điều gì dễ nhất?
- Có chỗ nào anh/chị không hiểu tên chức năng?
- Chức năng nào anh/chị mong đợi nhưng không tìm thấy?
- Nếu dùng hằng ngày, phần nào khiến anh/chị mất thời gian?
- Có bước nào anh/chị thấy thừa không?

==================================================
72. DO NOT ASK FEATURE-WISHLIST TOO EARLY
==================================================

Trước hết quan sát current usability.

Không để session biến thành:
"Anh/chị muốn thêm gì?"

Feature request là input phụ,
không thay usability evidence.

==================================================
73. OBSERVATION NOTES
==================================================

Mỗi issue ghi:

Observed behavior:
Participant quote:
Task:
Frequency:
Impact:
Possible cause:

Không chỉ ghi:
"UI confusing."

==================================================
74. USABILITY ISSUE FORMAT
==================================================

USAB-001

Task:
Observed Behavior:
Expected User Understanding:
Actual User Understanding:
Frequency:
Impact:
Severity:
Evidence:
Likely Cause:
Recommendation:
Validated?:

==================================================
75. SEVERITY SCALE
==================================================

Critical:
user không thể hoàn thành core task và không recover.

High:
nhiều user fail hoặc hiểu sai core concept.

Medium:
hoàn thành được nhưng vòng vo/chậm/confused.

Low:
minor friction/cosmetic usability.

==================================================
76. FREQUENCY × IMPACT
==================================================

Ưu tiên issue không chỉ theo cảm giác.

Có thể dùng:

Priority =
Frequency × Impact

Ví dụ:
5/5 user gặp
+
core task
=
High priority.

==================================================
77. FIRST CLICK ANALYSIS
==================================================

Cho task rồi ghi first click.

Nếu nhiều user click sai cùng chỗ:
information architecture/label có vấn đề.

==================================================
78. PATH ANALYSIS
==================================================

So sánh:

Ideal path
vs
Actual path.

Ví dụ:

Ideal:
Dashboard → KHBD

Actual:
Dashboard → Reader → Genre → Sidebar → KHBD

Không tự kết luận đường dài là xấu;
xem user có bị lạc hay không.

==================================================
79. COMPLETION RATE
==================================================

Tính:

Successful tasks / Total attempted tasks × 100%

Tách:
unassisted
vs
assisted.

==================================================
80. ERROR RATE
==================================================

Có thể tính:

Errors / Task attempts

Nhưng qualitative evidence vẫn rất quan trọng.

==================================================
81. USER CONFIDENCE
==================================================

Sau core task hỏi:

"Anh/chị tự tin mức nào rằng thao tác vừa rồi đã hoàn tất đúng?"

1–5.

Đặc biệt:
- autosave;
- export;
- restore;
- exam validation.

==================================================
82. DEVICE
==================================================

Primary usability:
Desktop/Laptop.

Ưu tiên:
1366×768
1440×900

Đúng với use case soạn giảng.

Mobile usability có thể secondary.

Không ép teacher authoring workflow phải mobile-first nếu product không định hướng như vậy.

==================================================
83. TEST ENVIRONMENT
==================================================

Test trên:
- production-like build;
- stable test data;
- browser phổ biến.

Không usability test trên build đang lỗi kỹ thuật nghiêm trọng.

==================================================
84. TEST DATA
==================================================

Chuẩn bị một lesson representative:

Tây Tiến
— Quang Dũng

Có:
- văn bản;
- annotations;
- vài questions;
- KHBD;
- matrix;
- exam;
- slides.

Nhưng một số task phải bắt đầu empty để test discoverability.

==================================================
85. SESSION RECORDING
==================================================

Nếu participant đồng ý:
record screen + audio.

Nếu không:
moderator notes.

Không lưu dữ liệu cá nhân không cần thiết.

==================================================
86. MODERATOR BEHAVIOR
==================================================

Moderator:
- không dạy app;
- không nói "bấm nút đỏ";
- không sửa participant;
- không giải thích feature trước task.

Nếu participant hỏi:
"Tôi bấm cái này phải không?"

trả lời trung lập:

"Anh/chị hãy làm theo cách anh/chị thấy hợp lý."

==================================================
87. WHEN TO HELP
==================================================

Nếu participant kẹt quá lâu:

ghi task fail/assistance,
sau đó đưa hint tối thiểu để session tiếp tục.

Không để họ mắc 10 phút ở một chỗ.

==================================================
88. HEURISTIC REVIEW
==================================================

Ngoài user testing,
thực hiện heuristic review theo Nielsen:

1. Visibility of system status
2. Match between system and real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency
8. Aesthetic/minimalist design
9. Error recovery
10. Help/documentation

==================================================
89. HEURISTIC #1 — SYSTEM STATUS
==================================================

Audit:
- autosave;
- export;
- selected lesson;
- selected question;
- loading;
- success/error.

User có biết hệ thống đang làm gì không?

==================================================
90. HEURISTIC #2 — REAL WORLD MATCH
==================================================

UI phải nói ngôn ngữ giáo viên.

Không ép:
JSON
state
schema
component
API

ra UI nếu không cần.

==================================================
91. HEURISTIC #3 — USER CONTROL
==================================================

Kiểm tra:
- Cancel;
- Back;
- Delete confirmation;
- Undo nếu có;
- close modal;
- exit Focus/Presentation.

==================================================
92. HEURISTIC #4 — CONSISTENCY
==================================================

Tận dụng findings #8.

Nhưng ở đây hỏi:
inconsistency có làm user nhầm không?

==================================================
93. HEURISTIC #5 — ERROR PREVENTION
==================================================

Ví dụ:
- disable invalid export;
- warning trước destructive action;
- score validation;
- restore validation.

==================================================
94. HEURISTIC #6 — RECOGNITION
==================================================

User không nên phải nhớ:
question nằm đâu;
current lesson là gì;
bước trước đã làm gì.

UI nên cung cấp context.

==================================================
95. HEURISTIC #7 — FLEXIBILITY
==================================================

Expert user có:
- shortcuts;
- quick actions;
- Resume Card;
- direct transfer Reader → Question/Slide.

Đánh giá nhưng không bắt buộc shortcut cho mọi feature.

==================================================
96. HEURISTIC #8 — MINIMALISM
==================================================

Không có nghĩa:
xóa hết thông tin.

Mà là:
chỉ hiển thị thứ hữu ích tại đúng thời điểm.

==================================================
97. HEURISTIC #9 — ERROR RECOVERY
==================================================

Error phải nói:
- chuyện gì xảy ra;
- cần làm gì tiếp;
- data có an toàn không.

==================================================
98. HEURISTIC #10 — HELP
==================================================

Nếu app cần hướng dẫn:
đánh giá:
- tooltip;
- empty-state hints;
- contextual instructions.

Không cần manual dài nếu UI self-explanatory.

==================================================
99. HEURISTIC SCORING
==================================================

Có thể dùng severity:

0 = no issue
1 = cosmetic
2 = minor
3 = major
4 = usability catastrophe

Không dùng score như sự thật tuyệt đối;
phải kèm evidence.

==================================================
100. USER FLOW SCORECARD
==================================================

Tạo bảng:

| Task | Success | Time | Errors | Assistance | SEQ | Notes |
|---|---|---:|---:|---:|---:|---|

==================================================
101. MODULE SCORECARD
==================================================

Có thể đánh giá:

Dashboard
Reader
Genre
KHBD
Question Bank
Matrix
Exam
Rubric
Slides
Export

Theo:

Learnability
Efficiency
Clarity
Confidence

Scale 1–5.

Chỉ dùng khi có methodology rõ.

==================================================
102. AUTOMATION LIMIT
==================================================

Usability Testing không thể automation hoàn toàn.

Playwright chỉ hỗ trợ:

- click counts;
- timing;
- path;
- instrumentation;
- test setup.

Không dùng automation để kết luận:
"người dùng thấy dễ".

==================================================
103. INTERNAL USABILITY AUDIT MODE
==================================================

Nếu chưa có participant thật:

thực hiện:

1. Expert heuristic review
2. Cognitive walkthrough
3. Existing UX issue analysis
4. Task path inspection

Ghi rõ:

Status:
INTERNAL USABILITY REVIEW

không gọi là:
"Real-user usability validated."

==================================================
104. COGNITIVE WALKTHROUGH
==================================================

Với mỗi task hỏi:

1. User có biết mục tiêu tiếp theo không?
2. User có nhìn thấy control cần thiết không?
3. Label có liên hệ với mục tiêu không?
4. Sau click, feedback có cho biết họ đi đúng hướng không?

==================================================
105. EXAMPLE COGNITIVE WALKTHROUGH
==================================================

Goal:
Xuất KHBD Word.

Questions:

- User có nghĩ cần vào "Xuất bản" không?
- Có nhận ra KHBD DOCX không?
- Có biết button nào để tải?
- Sau click có biết file đã được tạo không?

==================================================
106. PRIORITY TASKS
==================================================

P0 usability:

- Create/Open Lesson
- Resume Work
- Reader annotation
- KHBD
- Create Question
- Build Exam
- Export
- Backup/Restore

P1:
- Genre Analysis
- Matrix/Specification
- Rubric
- Slides

P2:
secondary settings.

==================================================
107. TARGET OUTCOME
==================================================

Không đặt target trước khi có baseline nếu không có business requirement.

Sau round 1 có thể đề xuất:

- task completion;
- assistance rate;
- SEQ;
- SUS.

Không invent official acceptance thresholds.

==================================================
108. DESIGN RECOMMENDATION FORMAT
==================================================

Mỗi recommendation phải nối trực tiếp với evidence.

Bad:

"Make UI prettier."

Good:

"4/5 participants looked for Export in TopBar before finding Sidebar → cân nhắc đưa Quick Export rõ hơn hoặc đổi label."

==================================================
109. DO NOT OVER-REDESIGN
==================================================

Không refactor toàn bộ app vì một participant thích kiểu khác.

Ưu tiên:
- repeated observation;
- core task impact;
- severe confusion.

==================================================
110. QUICK WIN VS STRUCTURAL ISSUE
==================================================

Phân loại:

Quick Win:
- label;
- helper text;
- button hierarchy.

Medium:
- grouping;
- modal layout.

Structural:
- module architecture;
- workflow order;
- navigation.

==================================================
111. APPLY FIXES
==================================================

Nếu evidence đủ mạnh:

có thể sửa:
- wording;
- CTA hierarchy;
- grouping;
- navigation cues;
- helper text;
- feedback.

Không sửa nghiệp vụ chính thức dựa chỉ trên usability preference.

==================================================
112. VALIDATE FIX
==================================================

Sau UX fix:

retest task đã gặp vấn đề.

Nếu có participant mới:
ưu tiên participant mới để tránh learning bias.

==================================================
113. REGRESSION AFTER UX FIX
==================================================

Sau sửa UI:

run:
Interaction Testing
Visual/Regression UI nếu relevant
Accessibility
Smoke

Nếu thay đổi flow:
run relevant E2E.

==================================================
114. USABILITY TEST CASE FORMAT
==================================================

Cập nhật:

docs/testing/20_USABILITY_TESTING.md

Mỗi task:

ID:
Persona:
Scenario:
Goal:
Starting State:
Success Criteria:
Observed Path:
Success:
Time:
Errors:
Assistance:
SEQ:
Confidence:
Observations:
Quotes:
Issues:
Recommendations:

==================================================
115. USABILITY ISSUE FORMAT
==================================================

USAB-BUG-001

Module:
Task:
Persona:
Observation:
Frequency:
Impact:
User Quote:
Expected Mental Model:
Actual Mental Model:
Severity:
Recommendation:
Implemented:
Retest:

==================================================
116. REPORT
==================================================

Cập nhật:

docs/testing/20_USABILITY_TESTING.md

Bao gồm:

# Usability Testing Report

## 1. Objective
## 2. Product Scope
## 3. Target Users
## 4. Methodology
## 5. Participants
## 6. Environment
## 7. Task Scenarios
## 8. Task Success Results
## 9. Time on Task
## 10. Errors & Assistance
## 11. SEQ Results
## 12. SUS Results
## 13. First Click Analysis
## 14. Navigation Findings
## 15. Terminology Findings
## 16. Cognitive Load
## 17. Workflow Findings
## 18. Heuristic Evaluation
## 19. Usability Issues
## 20. Severity/Priority
## 21. Recommendations
## 22. Fixes Applied
## 23. Retest Results
## 24. Remaining Risks
## 25. Product UX Recommendation

==================================================
117. IF NO REAL PARTICIPANTS
==================================================

Nếu hiện tại không thể recruit người dùng:

KHÔNG fabricate:
- SUS score;
- participant count;
- quotes;
- task completion rate.

Thay vào đó:

ghi:

Real-user test:
NOT YET CONDUCTED

Sau đó hoàn thành:
- heuristic evaluation;
- cognitive walkthrough;
- task design;
- recruitment plan;
- test script;
- observation sheet.

==================================================
118. DELIVERABLES
==================================================

Ngoài report,
nếu hữu ích tạo:

docs/usability/
├── MODERATOR_GUIDE.md
├── PARTICIPANT_TASKS.md
├── OBSERVATION_SHEET.md
├── SUS_FORM.md
└── FINDINGS_TEMPLATE.md

Chỉ tạo nếu giúp thực hiện usability test thật.

==================================================
119. FINAL SUMMARY
==================================================

Cuối cùng báo cáo:

Testing mode:
REAL USER / INTERNAL REVIEW

Participants:
N

Tasks:
N

Task completion:
...

Unassisted completion:
...

Average/Median SEQ:
...

SUS:
...
hoặc NOT MEASURED

Critical usability issues:
N

High:
N

Medium:
N

Low:
N

Top 5 friction points:
1.
2.
3.
4.
5.

Top recommendations:
...

Overall usability:
GOOD / ACCEPTABLE WITH ISSUES / NEEDS IMPROVEMENT / NOT VALIDATED WITH REAL USERS

QUAN TRỌNG:

Usability Testing phải trả lời:

"Giáo viên Ngữ văn thật sự có hiểu hệ thống, tìm được chức năng, hoàn thành công việc và cảm thấy tự tin khi sử dụng EduMaster-Literature hay không?"

Không chỉ:

"UI có đẹp không?"

Quy trình chuẩn:

DEFINE REAL USER
→ DEFINE REAL TASKS
→ OBSERVE WITHOUT LEADING
→ MEASURE
→ IDENTIFY FRICTION
→ PRIORITIZE BY FREQUENCY × IMPACT
→ IMPROVE
→ RETEST
→ REPORT