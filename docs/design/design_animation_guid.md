Có. Và nên thêm theo kiểu **“slow motion nhẹ” = transition chậm vừa phải, êm, có chiều sâu**, chứ không phải animation chậm khiến app có cảm giác lag.

Với EduMaster, tôi khuyên bổ sung hẳn một **Motion Style Preset** trong Settings để người dùng chọn mức chuyển động yêu thích. Điều này cũng phù hợp với hướng Guided Tour hiện tại vốn đã xác định phong cách motion là calm, non-intrusive và không flashy. Pasted text

## 1. Thêm setting “Phong cách chuyển động”

Trong:

```text
⚙ Cài đặt
→ Giao diện
→ Chuyển động
```

thiết kế thành:

```text
Chuyển động giao diện

○ Tắt
○ Nhẹ
● Mượt
○ Chậm & êm

[✓] Hiệu ứng hover mềm mại
[✓] Chuyển cảnh giữa panel
[✓] Animation khi mở modal
[✓] Smooth scroll
[✓] Hiệu ứng nút khi tương tác
```

### Các preset

**Tắt**
- gần như không animation;
- phù hợp máy yếu hoặc người dùng nhạy với chuyển động.

**Nhẹ**
- 100–140ms;
- chủ yếu đổi màu, opacity.

**Mượt**
- 160–220ms;
- preset mặc định;
- fade + translate nhỏ.

**Chậm & êm**
- 240–320ms;
- dùng easing mềm;
- vẫn không được gây cảm giác trễ.

---

# 2. Motion token mới

Nên chuẩn hóa:

```css
:root {
  --motion-instant: 90ms;
  --motion-fast: 130ms;
  --motion-normal: 180ms;
  --motion-smooth: 240ms;
  --motion-slow: 300ms;

  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-enter: cubic-bezier(0, 0, 0.2, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

Preset:

```text
Nhẹ
→ fast

Mượt
→ normal / smooth

Chậm & êm
→ smooth / slow
```

---

# 3. Hover cho button

Không nên chỉ đổi màu đột ngột.

Ví dụ:

```css
.button {
  transition:
    background-color var(--motion-normal) var(--ease-standard),
    border-color var(--motion-normal) var(--ease-standard),
    color var(--motion-normal) var(--ease-standard),
    box-shadow var(--motion-normal) var(--ease-standard),
    transform var(--motion-fast) var(--ease-standard);
}

.button:hover {
  transform: translateY(-1px);
}

.button:active {
  transform: translateY(0) scale(0.985);
}
```

Cảm giác:

```text
Default
↓
Hover
nổi nhẹ 1px
+
đổi màu mềm
+
shadow tăng rất nhẹ

↓
Click
nén nhẹ
```

Không dùng:

```text
scale(1.1)
```

---

# 4. Hover cho card

Card có thể:

```text
Default
border neutral

Hover
border → accent soft
shadow ↑ nhẹ
translateY(-2px)
```

Ví dụ:

```css
.card-interactive {
  transition:
    transform 240ms var(--ease-smooth),
    box-shadow 240ms var(--ease-smooth),
    border-color 180ms var(--ease-standard);
}

.card-interactive:hover {
  transform: translateY(-2px);
}
```

Đặc biệt phù hợp:

- Dashboard Resume Card
- Quick Actions
- Template cards
- Theme cards
- Export cards

Không áp dụng cho mọi card tĩnh.

---

# 5. Hover Sidebar

Sidebar item:

```text
Default
transparent

Hover
background → accent soft
icon → accent
text → darker

Active
accent soft + indicator
```

Transition:

```text
180ms
```

Nếu bật **Chậm & êm**:

```text
240ms
```

Indicator có thể trượt nhẹ:

```text
opacity 0 → 1
translateX(-2px) → 0
```

---

# 6. Hover cho icon button

Ví dụ:

```text
⚙
❔
⋮
✎
🗑
```

Animation:

```text
background fade
+
icon color
+
scale 1 → 1.03
```

Pressed:

```text
scale 0.96
```

Duration:

```text
120–160ms
```

Không rotate icon Settings mỗi lần hover.

---

# 7. Hover cho thumbnail Slides

Rất phù hợp với Slides.

```text
Thumbnail default
↓
Hover
translateY(-2px)
border highlight
shadow-xs
action icons fade in
```

Transition:

```text
200–240ms
```

Selected thumbnail:

```text
ring Burgundy soft
background tint
```

Không scale mạnh vì sẽ làm rail rung.

---

# 8. Theme card / Template card

Khi hover:

```text
Preview nâng nhẹ
border từ neutral → accent soft
title đổi accent
```

Nếu có preview image:

```text
image scale 1 → 1.015
```

rất nhẹ.

Không zoom kiểu gallery ảnh.

---

# 9. Modal animation kiểu slow motion nhẹ

Open:

```text
Backdrop
opacity 0 → 1

Modal
opacity 0 → 1
translateY(8px) → 0
scale 0.985 → 1
```

Duration:

```text
Mượt:
220ms

Chậm & êm:
280ms
```

Close:

```text
160–200ms
```

Exit vẫn nhanh hơn enter.

---

# 10. Drawer

Ví dụ:

- Slide Editor
- Notes Panel
- Guided Tour chapter panel

Open:

```text
translateX(16px) → 0
opacity .7 → 1
```

Duration:

```text
240ms
```

Slow preset:

```text
300ms
```

Không slide từ ngoài màn hình quá xa.

---

# 11. Dropdown / Popover

Open:

```text
opacity 0 → 1
translateY(-4px) → 0
```

Duration:

```text
160–200ms
```

Slow preset:

```text
220ms
```

Rất phù hợp:

- lesson switcher;
- font picker;
- theme menu;
- export options;
- color picker.

---

# 12. Tab switching

Tab active indicator có thể trượt mềm:

```text
left / transform
180–220ms
```

Content:

```text
opacity .85 → 1
translateY(3px) → 0
```

Không dùng slide ngang 100%.

Áp dụng:

- Reader tabs;
- Genre Analysis;
- KHBD views;
- Settings sections;
- Slide Editor tabs.

---

# 13. Settings transition

Vì Settings là nơi nhiều người chuyển category liên tục, nên animation phải nhẹ.

Khi chuyển:

```text
Giao diện
→ Soạn giảng
```

content:

```text
opacity 0.92 → 1
translateY(4px) → 0
```

Duration:

```text
180–220ms
```

Không animate toàn sidebar.

---

# 14. Toggle switch

Toggle animation:

```text
track color
+
thumb translate
```

Duration:

```text
160–180ms
```

Slow preset:

```text
220ms
```

Không dùng spring bounce.

---

# 15. Color selection

Khi chọn Accent Color:

```text
color swatch
scale 1 → 1.05
ring fade in
```

Duration:

```text
180ms
```

Sau đó toàn app có thể đổi accent bằng:

```text
color transition
background-color transition
border-color transition
```

nhưng chỉ khoảng:

```text
180–240ms
```

để tạo cảm giác theme chuyển mềm.

---

# 16. Theme switching

Khi đổi:

```text
Academic Burgundy
→ Forest Scholar
```

không nên flash toàn màn hình.

Cho transition:

```css
transition:
  background-color 240ms,
  color 240ms,
  border-color 240ms;
```

Không animate:

- width;
- layout;
- font-size.

Nếu đổi font:
apply gần như instant để tránh text reflow kéo dài.

---

# 17. Reader hover

Reader là khu vực cần hạn chế motion.

Chỉ:

- annotation icon;
- inline action;
- selected text toolbar;
- note highlight.

Ví dụ floating toolbar:

```text
opacity 0 → 1
translateY(4px) → 0
scale .98 → 1
```

Duration:

```text
160–200ms
```

Không animate body text.

---

# 18. Highlight văn bản

Khi tạo highlight:

```text
transparent
→ selected highlight color
```

Duration:

```text
220ms
```

Có thể thêm 1 lần:

```text
opacity .85 → 1
```

Không pulse lặp.

---

# 19. Focus Mode

Đây là nơi “slow motion nhẹ” rất đẹp.

Khi bật:

```text
Sidebar
opacity 1 → 0
width → collapsed

Side panels
fade out

Reader
max-width tăng

Canvas
background transition nhẹ
```

Duration:

```text
260–320ms
```

Easing:

```text
ease-smooth
```

Nên giữ Reader center anchor để không nhảy khó chịu.

---

# 20. Guided Tour

Tour hiện tại đã dùng popover 160–180ms và spotlight 180–220ms. Pasted text

Có thể nâng với preset Motion:

**Normal**

```text
popover 180ms
spotlight 220ms
```

**Smooth**

```text
popover 220ms
spotlight 280ms
```

Khi target chuyển:

```text
spotlight rect
→ glide nhẹ sang target mới
```

Không teleport quá gắt.

Nhưng không animate target DOM.

---

# 21. Smooth scroll

Nên dùng cho:

- Guided Tour;
- Reader outline;
- scroll tới form lỗi;
- chuyển tới section Settings.

Không dùng cho mọi navigation.

Setting:

```text
Cuộn mượt [ON]
```

Nếu reduced motion:
automatically off.

---

# 22. List item add/remove

Ví dụ thêm:

- Question
- Slide
- Activity
- Rubric criterion

Add:

```text
opacity 0 → 1
translateY(6px) → 0
```

Duration:

```text
180–220ms
```

Remove:

```text
opacity 1 → 0
height collapse
```

Duration:

```text
160–200ms
```

---

# 23. Toast

Toast:

```text
opacity 0 → 1
translateY(8px) → 0
```

Duration:

```text
220ms
```

Slow:

```text
280ms
```

Không cần slow hơn nữa.

---

# 24. Autosave feedback

Ví dụ:

```text
Đang lưu…
→ ✓ Đã lưu
```

Dùng crossfade:

```text
120–180ms
```

Không dùng slide/fly.

---

# 25. Progress bar

Nếu Guided Tour hoặc Export:

```text
width transition
240–320ms
```

không nhảy cứng.

---

# 26. Skeleton

Nếu thật sự có loading:

```text
soft shimmer
```

Nhưng animation phải chậm và subtle:

```text
1.4–1.8s
```

Không shimmer sáng mạnh.

---

# 27. Motion preset trong Settings

Tôi khuyên triển khai UI như sau:

```text
CHUYỂN ĐỘNG

Phong cách

○ Tắt
○ Nhẹ
● Mượt
○ Chậm & êm

────────────────────────

Hiệu ứng

[✓] Hover mềm mại
[✓] Panel transition
[✓] Modal animation
[✓] Smooth scroll
[✓] Button feedback

────────────────────────

Tôn trọng Reduced Motion của hệ thống
[ON]

────────────────────────

Xem thử

┌────────────────────────────┐
│      Preview Card          │
│                            │
│      [ Hover thử ]         │
└────────────────────────────┘
```

Người dùng có thể hover ngay trong Settings để cảm nhận preset trước khi áp dụng.

---

# 28. Motion config model

Có thể thiết kế:

```ts
interface MotionPreferences {
  preset:
    | 'off'
    | 'light'
    | 'smooth'
    | 'slow';

  hoverEffects: boolean;
  panelTransitions: boolean;
  modalAnimations: boolean;
  smoothScroll: boolean;
  buttonFeedback: boolean;

  respectReducedMotion: boolean;
}
```

---

# 29. CSS mapping

Ví dụ:

```css
html[data-motion="light"] {
  --motion-fast: 100ms;
  --motion-normal: 140ms;
  --motion-slow: 180ms;
}

html[data-motion="smooth"] {
  --motion-fast: 130ms;
  --motion-normal: 190ms;
  --motion-slow: 240ms;
}

html[data-motion="slow"] {
  --motion-fast: 160ms;
  --motion-normal: 240ms;
  --motion-slow: 300ms;
}
```

Như vậy không phải sửa từng component khi user đổi preset.

---

# 30. Rule cực kỳ quan trọng

“Slow motion” chỉ nên xuất hiện ở:

```text
Modal
Drawer
Focus Mode
Guided Tour
Theme switching
Panel switching
Large state transition
```

Không dùng slow motion cho:

```text
typing
checkbox
table hover
text selection
keyboard navigation
exam interaction
quiz answer
```

Những phần đó phải phản hồi nhanh.

---

# 31. Hover hierarchy

Nên chia hover thành 3 cấp:

### Level 1 — Subtle

```text
text/icon
background color
```

Cho:
- menu item;
- table row;
- text link.

### Level 2 — Interactive

```text
background
border
translateY(-1px)
shadow-xs
```

Cho:
- buttons;
- cards;
- theme/template cards.

### Level 3 — Visual Preview

```text
translateY(-2px)
preview scale 1.01
shadow
```

Cho:
- slide themes;
- template gallery;
- export preview.

Không dùng Level 3 cho mọi nơi.

---

# 32. Anti-pattern cần cấm

Không dùng:

```text
❌ scale 1.1
❌ bounce
❌ elastic
❌ neon glow
❌ infinite floating
❌ hover rotate
❌ card tilt 3D
❌ blur quá mạnh
❌ transition > 400ms cho UI thường
❌ animate mọi property với "transition: all"
```

Đặc biệt tránh:

```css
transition: all 0.4s;
```

Nên chỉ animate property thực sự cần.

---

# 33. Performance rule

Ưu tiên:

```text
transform
opacity
```

Hạn chế:

```text
width
height
left
top
filter
large box-shadow
```

Không để animation gây lag khi:

- Matrix có nhiều row;
- Question Bank dài;
- Exam Builder có nhiều card.

---

# 34. Kết quả mong muốn

Khi user chọn:

```text
Motion:
Chậm & êm

Accent:
Forest

Theme:
Warm Ivory
```

EduMaster sẽ có cảm giác:

```text
hover → mềm
modal → xuất hiện nhẹ
drawer → trượt êm
focus mode → mở rộng chậm vừa đủ
tour spotlight → di chuyển nhẹ
theme → chuyển màu mượt
button → vẫn phản hồi nhanh
```

Đó là sự khác biệt quan trọng:

> **Chậm ở những chuyển động lớn, nhanh ở những tương tác cần phản hồi.**

Nếu áp dụng đúng, UI sẽ có cảm giác **premium và có chiều sâu**, chứ không bị “chậm chạp”.