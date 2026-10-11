Dưới đây là phần **mô tả design hiệu ứng animation chuyên nghiệp** có thể nối trực tiếp vào tài liệu design system của EduMaster-Literature.

---

# 27. Motion Design & Animation System

Animation trong EduMaster-Literature không dùng để “làm màu”, mà để:

- giải thích sự thay đổi trạng thái;
- dẫn mắt người dùng;
- giảm cảm giác giật khi layout thay đổi;
- tạo cảm giác hệ thống phản hồi nhanh và có chủ đích;
- giữ trải nghiệm học thuật, điềm tĩnh và chuyên nghiệp.

Nguyên tắc cốt lõi:

> **Motion phải phục vụ sự hiểu biết trước, thẩm mỹ sau.**

Không dùng animation theo phong cách:

- bounce mạnh;
- elastic quá mức;
- scale lớn;
- gradient chuyển động;
- glowing;
- floating liên tục;
- parallax không cần thiết;
- hiệu ứng “app marketing”.

Phong cách animation phù hợp với EduMaster là:

> **Subtle, Responsive, Calm, Editorial.**

---

# 28. Motion Personality

Motion của EduMaster cần mang ba tính chất:

### Calm

Chuyển động nhẹ, không làm gián đoạn việc đọc.

### Precise

Mỗi animation phải có điểm bắt đầu và kết thúc rõ ràng.

### Contextual

Hiệu ứng phải thể hiện đúng loại hành vi.

Ví dụ:

- modal xuất hiện → fade + scale nhẹ;
- sidebar drawer → slide;
- tab đổi → content fade/shift nhẹ;
- save thành công → micro-feedback;
- selected card → background transition;
- Reader toolbar → xuất hiện từ selection.

---

# 29. Motion Duration System

Nên chuẩn hóa duration theo 4 cấp:

```text
Instant
80–100ms

Fast
120ms

Normal
180ms

Emphasis
240–280ms
```

Không nên dùng animation trên 300ms cho interaction thường xuyên.

Gợi ý áp dụng:

```text
Hover
120ms

Focus
120ms

Button pressed
80–100ms

Dropdown
150–180ms

Tab switch
160–180ms

Accordion
180–220ms

Modal open
220–240ms

Drawer
240–280ms
```

---

# 30. Easing System

Không dùng một easing cho mọi thứ.

Nên có 3 nhóm chính:

### Standard

Dùng cho hầu hết UI transition:

```css
cubic-bezier(0.2, 0, 0, 1)
```

Cảm giác tự nhiên, nhanh đầu và chậm nhẹ cuối.

### Enter

Dùng khi component xuất hiện:

```css
cubic-bezier(0, 0, 0.2, 1)
```

### Exit

Dùng khi component biến mất:

```css
cubic-bezier(0.4, 0, 1, 1)
```

Có thể định nghĩa token:

```css
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
--ease-enter: cubic-bezier(0, 0, 0.2, 1);
--ease-exit: cubic-bezier(0.4, 0, 1, 1);
```

---

# 31. Hover Effect

Hover của EduMaster phải nhẹ.

Không:

```text
scale(1.08)
rotate(...)
large shadow
```

Ưu tiên:

```text
background-color transition
border-color transition
color transition
shadow rất nhẹ
translateY(-1px) ở card thật sự interactive
```

Ví dụ card:

```css
transition:
  border-color 120ms,
  background-color 120ms,
  box-shadow 120ms,
  transform 120ms;
```

Hover:

```css
transform: translateY(-1px);
```

Tối đa khoảng 1px.

---

# 32. Button Animation

Button không nên “nhảy”.

## Hover

Primary:

```text
Burgundy 700
→ Burgundy 800
```

Có thể tăng shadow nhẹ.

## Pressed

```text
Burgundy 800
→ Burgundy 900

scale:
0.98–0.99
```

Duration rất nhanh:

```text
80–100ms
```

Mục tiêu là tạo cảm giác có lực nhấn, không phải hiệu ứng đồ chơi.

---

# 33. Icon Button

Icon button nên phản hồi bằng:

- background soft;
- icon color;
- subtle scale.

Ví dụ:

```text
default:
transparent

hover:
Burgundy 50

pressed:
Burgundy 100
scale(0.96)
```

Không xoay icon trừ khi semantics yêu cầu.

---

# 34. Focus Animation

Focus không nên fade quá lâu.

Khi keyboard focus:

```text
ring xuất hiện trong 80–120ms
```

Ví dụ:

```css
transition:
  box-shadow 120ms,
  border-color 120ms;
```

Focus phải rõ ngay lập tức vì đây là accessibility feedback.

---

# 35. Sidebar Navigation Animation

Sidebar item khi hover:

```text
background fade
icon color transition
text color transition
```

Active item:

```text
Burgundy soft background
+
left indicator
```

Left indicator có thể animate:

```text
height: 0
→ 60–70% item height

duration:
160ms
```

Nhưng không cần chạy lại mọi lần nếu gây distraction.

---

# 36. Sidebar Collapse / Drawer

Desktop collapse nếu có:

```text
width transition:
220–250ms
```

Không animate text width trực tiếp nếu gây giật.

Nên:

1. collapse container;
2. fade labels;
3. giữ icon ổn định.

Mobile Drawer:

```text
translateX(-100%)
→ translateX(0)
```

Overlay:

```text
opacity 0
→ 1
```

Duration:

```text
240ms
```

---

# 37. TopBar Interaction

Dropdown/lesson switcher:

Trigger click:

```text
menu:
opacity 0 → 1
translateY(-4px) → 0
```

Duration:

```text
150–180ms
```

Không dùng scale lớn.

---

# 38. Modal Animation

Modal là overlay quan trọng.

Open:

```text
Backdrop:
opacity 0 → 1

Dialog:
opacity 0 → 1
scale 0.98 → 1
translateY(4px) → 0
```

Duration:

```text
220ms
```

Close:

```text
160–180ms
```

Exit nên nhanh hơn Enter.

Không:

```text
scale 0.7
bounce
spring mạnh
```

---

# 39. Popover / Dropdown

Popover nên cảm giác gần trigger.

Enter:

```text
opacity 0 → 1
translateY(-4px) → 0
```

Nếu mở lên trên:

```text
translateY(4px) → 0
```

Duration:

```text
140–180ms
```

Không dùng zoom effect rõ.

---

# 40. Tabs Animation

Tabs cần phản hồi nhanh.

Active indicator có thể:

```text
slide horizontal
```

Duration:

```text
160–180ms
```

Content:

```text
opacity 0.85 → 1
translateY(2px) → 0
```

Rất nhẹ.

Không slide toàn content 30–50px.

---

# 41. Accordion Animation

Accordion cần tự nhiên vì KHBD dùng nhiều.

Animate:

```text
height
opacity
```

hoặc grid row technique.

Duration:

```text
180–220ms
```

Chevron:

```text
rotate 0deg → 180deg
```

Không animate lâu hơn nội dung.

---

# 42. Card Selection

Khi card được chọn:

```text
background:
white → burgundy-25/50

border:
neutral → burgundy-200

optional:
shadow nhẹ hơn hoặc giữ nguyên
```

Duration:

```text
120–160ms
```

Không scale card khi selected.

---

# 43. Table Row Interaction

Table hover:

```text
background → warm neutral
```

Selected:

```text
background → Burgundy 25
```

Transition:

```text
100–120ms
```

Không animate height của row khi không cần.

---

# 44. Validation Animation

Error feedback cần rõ nhưng không gây khó chịu.

Khi field invalid:

```text
border-color
background soft
error text fade in
```

Không rung mạnh.

Nếu cần shake:

```text
2–3px
1 cycle
120–160ms
```

chỉ dùng cho lỗi blocking rất rõ.

Thông thường không cần shake.

---

# 45. Success Feedback

Save/Autosave:

Không cần toast lớn mỗi lần autosave.

Ưu tiên:

```text
Đang lưu...
→ Đã lưu
```

Có thể dùng:

```text
icon check opacity/scale nhẹ
```

Ví dụ:

```text
scale 0.9 → 1
opacity 0 → 1
```

Duration:

```text
160ms
```

---

# 46. Toast Animation

Toast enter:

```text
opacity 0 → 1
translateY(8px) → 0
```

hoặc từ phải:

```text
translateX(8px) → 0
```

Duration:

```text
180–220ms
```

Exit:

```text
opacity 1 → 0
translateY(-4px)
```

Không để toast bay quá xa.

---

# 47. Empty State Animation

Empty State không nên có animation loop.

Có thể:

- icon fade in;
- content fade in;
- CTA xuất hiện cùng lúc.

Không dùng:

- bouncing illustration;
- floating icon;
- infinite pulse.

---

# 48. Reader Motion Design

Reader là vùng cần animation ít nhất.

Nguyên tắc:

> **Text phải ổn định. Tools mới được chuyển động.**

Không animate:

- paragraph;
- font;
- line-height;
- body text position.

Có thể animate:

- floating selection toolbar;
- note panel;
- highlight creation;
- outline active state;
- Focus Mode.

---

# 49. Floating Selection Toolbar

Đây là animation quan trọng nhất trong Reader.

Khi chọn text:

```text
opacity 0 → 1
scale 0.97 → 1
translateY(4px) → 0
```

Duration:

```text
140–160ms
```

Toolbar phải cảm giác “xuất hiện từ selection”.

Không dùng fly-in từ xa.

---

# 50. Highlight Animation

Khi tạo highlight:

Không nên flash mạnh.

Có thể:

```text
background-color:
transparent
→ highlight color
```

Duration:

```text
160–220ms
```

Nếu highlight vừa được tạo:

có thể có một lần soft pulse rất nhẹ.

Không dùng pulse lặp.

---

# 51. Note Panel Animation

Nếu note mở bên phải:

```text
translateX(8px) → 0
opacity 0 → 1
```

Duration:

```text
180–220ms
```

Nếu popover:
dùng popover animation chuẩn.

---

# 52. Outline Navigation

Khi active heading thay đổi do scroll:

```text
text color
background
indicator
```

transition:

```text
120–160ms
```

Không scroll outline quá mạnh.

Nếu auto-scroll active item:
dùng smooth scroll nhẹ.

---

# 53. Focus Mode Transition

Khi bật Focus Mode:

Sidebar + secondary panels:

```text
opacity ↓
width ↓
```

Reader:

```text
max-width expand
```

Duration:

```text
220–280ms
```

Quan trọng:

Reader content không được “nhảy” quá mạnh.

Nên giữ center anchor nếu có thể.

---

# 54. KHBD Builder Animation

Activity Accordion:

- expand/collapse;
- active state;
- add activity.

Khi thêm activity:

```text
opacity 0 → 1
translateY(4px) → 0
```

Không scroll mạnh trừ khi cần đưa item mới vào viewport.

---

# 55. Document View Transition

Visual Builder → Document View:

Không cần page transition phức tạp.

Dùng:

```text
crossfade
+
translateY 2–4px
```

Duration:

```text
180ms
```

Giữ continuity.

---

# 56. Question Bank Animation

Master-detail selection:

Khi chọn question:

Left:
selected background transition.

Right:
content fade rất nhẹ.

Không animate toàn editor slide ngang mỗi lần chọn câu hỏi vì user sẽ thao tác rất nhiều.

---

# 57. Matrix Animation

Data-heavy screen nên hạn chế motion.

Dùng animation cho:

- selected cell;
- validation badge;
- updated total.

Không animate toàn table.

Khi total thay đổi:

```text
number transition:
subtle color flash
```

Ví dụ:

```text
neutral → Burgundy/semantic → neutral
```

trong 300–500ms.

Không counter animation dài.

---

# 58. Exam Builder Animation

Khi add question:

Question card:

```text
fade in
translateY(4px)
```

Statistics:

```text
value transition nhẹ
```

Khi remove:

```text
opacity ↓
height collapse
```

nhưng duration ngắn.

Không làm entire list shift chậm.

---

# 59. Rubric Animation

Khi total score đổi:

Nếu hợp lệ:

```text
soft emerald emphasis
```

Nếu vượt:

```text
soft rose emphasis
```

Duration:

```text
200–300ms
```

Chỉ một lần mỗi update.

---

# 60. Slides Studio Animation

Slides Studio có thể dùng motion nhiều hơn một chút.

Thumbnail selected:

```text
border transition
background transition
```

Slide switching:

```text
opacity 0.92 → 1
```

Hoặc very small horizontal shift.

Không animate canvas zoom liên tục.

---

# 61. Drag & Drop Animation

Nếu reorder slide/question/activity:

Item được drag:

```text
scale 1.01
shadow +1 level
opacity ~0.95
```

Drop target:

```text
Burgundy soft line
```

Sau drop:

```text
layout settles 150–200ms
```

Không dùng spring bounce mạnh.

---

# 62. Presentation Mode

Presentation mode có thể dùng transition riêng.

Slide next:

```text
crossfade
```

hoặc:

```text
translateX 8–16px + fade
```

Duration:

```text
220–280ms
```

Không dùng PowerPoint-style flashy transitions như:

- cube;
- flip;
- explode;
- random zoom.

Mục tiêu là dạy học, không phải showcase animation.

---

# 63. Export Feedback

Khi export:

Button:

```text
Xuất Word
→ Đang tạo...
→ Đã tải xuống
```

Spinner subtle.

Không disable toàn bộ app nếu export không cần blocking.

Sau success:

- check icon;
- toast nhỏ.

---

# 64. Skeleton Loading

Nếu có async load thật:

Dùng skeleton rất nhẹ.

Animation:

```text
soft shimmer
```

Nhưng shimmer không được contrast cao.

Nếu dữ liệu local và load <100ms:
không cần skeleton.

Không fake loading để UI trông “xịn”.

---

# 65. Progress Indicators

Nếu process có thời gian xác định:

dùng progress bar.

Nếu không xác định:

spinner hoặc indeterminate progress.

Không animate fake percentage.

---

# 66. Page Transition

Đây là SPA workspace.

Không cần animation full page kiểu website marketing.

Navigation giữa modules:

```text
content fade-in
80–140ms
```

hoặc không animation nếu render tức thì.

Không slide toàn page từ trái sang phải.

---

# 67. Layout Animation

Chỉ animate layout khi user thấy quan hệ trước/sau.

Ví dụ:

- collapse sidebar;
- open inspector;
- reorder item.

Không animate mọi layout change.

Nếu dùng CSS:

```css
transition:
  width 220ms var(--ease-standard),
  opacity 160ms var(--ease-standard);
```

---

# 68. Loading Button

Pattern:

```text
Default
[ Xuất Word ]

Loading
[ spinner  Đang xuất... ]

Success
[ ✓ Đã xuất ]
```

Không thay button width liên tục.

Giữ width ổn định nếu có thể.

---

# 69. Destructive Action Animation

Delete không cần animation đỏ nhấp nháy.

Flow:

```text
Delete
→ Confirm Modal
→ item fade/collapse
```

Item removal:

```text
opacity 1 → 0
height → 0
```

Duration:

```text
160–200ms
```

---

# 70. Unsaved / Saved State

Autosave status:

```text
Đang lưu...
```

có thể có dot/spinner nhẹ.

Sau save:

```text
✓ Đã lưu
```

Transition:

```text
crossfade 120–160ms
```

Không toast mỗi lần.

---

# 71. Tooltip Animation

Tooltip:

```text
delay:
300–500ms

enter:
opacity + translate 2px

duration:
100–120ms
```

Không hiện ngay khi pointer chỉ lướt qua.

---

# 72. Scroll Behavior

Smooth scroll chỉ dùng khi:

- click outline;
- navigate bookmark;
- jump to section.

Duration tự nhiên do browser.

Không force smooth scroll cho mọi programmatic scroll.

---

# 73. Scroll-Linked Animation

Không nên dùng:

- parallax;
- opacity theo scroll;
- scale theo scroll.

Reader cần ổn định.

Scroll chỉ nên cập nhật:

- active outline;
- reading position;
- sticky controls.

---

# 74. Microinteraction Rule

Mỗi microinteraction phải trả lời một trong các câu:

1. Tôi vừa hover vào gì?
2. Tôi vừa chọn gì?
3. Tôi vừa mở gì?
4. Tôi vừa lưu gì?
5. Tôi vừa thay đổi trạng thái gì?
6. Tôi đang chờ gì?

Nếu animation không trả lời câu nào:
có thể bỏ.

---

# 75. Animation Density

Không để nhiều animation chạy cùng lúc.

Ví dụ khi mở modal:

Chỉ:

- backdrop fade;
- dialog enter.

Không đồng thời:

- button pulse;
- background blur animation;
- icon rotate;
- cards fade;
- sidebar shift.

---

# 76. Reduced Motion

Bắt buộc hỗ trợ:

```css
@media (prefers-reduced-motion: reduce)
```

Khi reduced motion:

- remove transforms lớn;
- disable smooth scroll;
- duration ≈ 0–50ms;
- giữ opacity transition nếu cần nhưng rất ngắn.

Ví dụ:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Có thể tinh chỉnh thay vì áp dụng tuyệt đối nếu project cần.

---

# 77. Performance Rule

Ưu tiên animate:

```text
transform
opacity
```

Hạn chế animate:

```text
width
height
top
left
box-shadow lớn
filter blur
```

đặc biệt với component xuất hiện thường xuyên.

Nếu cần collapse:
dùng kỹ thuật phù hợp để tránh layout thrashing.

---

# 78. No Layout Shift

Animation không được tạo CLS hoặc làm content nhảy bất ngờ.

Ví dụ:

Loading button không được:

```text
80px
→ 140px
→ 90px
```

khi text đổi.

Modal open không được đẩy layout phía sau.

---

# 79. Motion Tokens

Nên chuẩn hóa:

```css
:root {
  --motion-instant: 90ms;
  --motion-fast: 120ms;
  --motion-normal: 180ms;
  --motion-emphasis: 240ms;

  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-enter: cubic-bezier(0, 0, 0.2, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

Mọi component ưu tiên token thay vì:

```css
transition: 173ms;
transition: 0.37s;
```

ngẫu nhiên.

---

# 80. Motion Priority Matrix

| Thành phần | Motion | Mức độ |
|---|---|---|
| Button | color + press | Cao |
| Modal | fade + scale nhẹ | Cao |
| Dropdown | fade + shift | Cao |
| Tabs | indicator + subtle fade | Trung bình |
| Sidebar | slide/collapse | Trung bình |
| Reader toolbar | fade + scale | Cao |
| Highlight | background fade | Trung bình |
| Table | background only | Thấp |
| Matrix | minimal | Thấp |
| Exam list | add/remove transition | Trung bình |
| Slides | selection + crossfade | Trung bình |
| Empty state | gần như none | Thấp |

---

# 81. Motion by Product Area

## Dashboard

```text
Moderate motion
```

Cho:
- cards hover;
- quick action;
- resume CTA.

## Reader

```text
Minimal motion
```

Chỉ tools và annotation.

## KHBD

```text
Controlled structural motion
```

Accordion / view switching.

## Assessment

```text
Very low motion
```

Ưu tiên dữ liệu và tính chính xác.

## Slides

```text
Moderate motion
```

Có thể expressive hơn nhưng vẫn restrained.

---

# 82. Animation Anti-Patterns

Không sử dụng:

```text
❌ bounce button
❌ glowing Burgundy CTA
❌ infinite pulse
❌ card float continuously
❌ background animated gradient
❌ particles
❌ heavy glass blur
❌ 3D flip
❌ page wipe
❌ exaggerated spring
❌ icon spinning không có meaning
❌ ripple quá lớn
```

Những hiệu ứng này phá vỡ character:

> Academic + Editorial + Professional.

---

# 83. Motion Design Manifesto

Có thể thêm đoạn này vào design document:

> **Chuyển động trong EduMaster Văn phải yên tĩnh như cách một giáo viên lật trang sách, nhưng chính xác như một công cụ chuyên nghiệp.**
>
> Animation không được cạnh tranh với nội dung.
>
> Button phản hồi nhanh.
>
> Modal xuất hiện có chủ đích.
>
> Panel chuyển đổi mềm mại.
>
> Reader luôn ổn định.
>
> Màu và chuyển động chỉ nổi lên khi người dùng cần biết rằng trạng thái vừa thay đổi.
>
> Không có animation nào tồn tại chỉ để chứng minh rằng giao diện có animation.

---

## 84. Tóm tắt Motion Direction

```text
EDUMASTER MOTION

Fast
+
Subtle
+
Calm
+
Purposeful
+
Predictable

NOT:

Flashy
Bouncy
Gaming-like
Marketing-like
Overanimated
```

