Đúng. Bản trước mới dừng ở mức **“có setting nào”**, chưa đạt mức **“mỗi setting cho phép người dùng cá nhân hóa đến đâu và UI phải được thiết kế thế nào”**.

Với EduMaster, phần ⚙ **Cài đặt** nên được nâng thành một **Personal Workspace Center**: người dùng không chỉ bật/tắt mà còn có thể chọn màu yêu thích, font, mức hiển thị, hành vi mặc định, cấu hình Slides, export, backup và trợ giúp. Dưới đây là bản thiết kế mở rộng hơn.

# ⚙ CÀI ĐẶT — PERSONAL WORKSPACE CENTER

## 1. Triết lý thiết kế

Cài đặt phải cho phép người dùng trả lời 5 câu hỏi:

> Tôi muốn EduMaster **trông như thế nào?**  
> Tôi muốn EduMaster **phản hồi như thế nào?**  
> Tôi muốn **soạn bài theo cách nào?**  
> Tôi muốn **slide và tài liệu đầu ra có phong cách nào?**  
> Tôi muốn **dữ liệu của mình được bảo vệ ra sao?**

Không nên chỉ có Switch `ON/OFF`.

Mỗi setting nên có tối đa 4 tầng:

```text
Preset
↓
Quick customization
↓
Advanced customization
↓
Reset
```

Ví dụ:

```text
Chủ đề giao diện

[ Học thuật ] [ Ngà ấm ] [ Tối ] [ Tùy chỉnh ]

Màu yêu thích
● Burgundy
● Xanh rừng
● Navy
● Amber
● Teal
● Custom +

Preview
┌──────────────────────────┐
│ Sidebar  │ Workspace     │
│          │ Button        │
└──────────────────────────┘
```

---

# I. GIAO DIỆN

# 2. Chủ đề giao diện — mở rộng

Đây nên là setting lớn nhất trong phần Giao diện.

Không chỉ:

```text
Sáng / Tối
```

mà nên có 3 lớp:

```text
Appearance
+
Accent Color
+
Surface Style
```

## 2.1 Chế độ sáng tối

```text
Chế độ

☀ Sáng
◐ Theo hệ thống
☾ Tối
```

Default:

```text
Sáng
```

---

# 3. Màu sắc yêu thích — Accent Color

Đây chính là phần đang thiếu.

Người dùng có thể chọn màu thương hiệu cá nhân cho workspace.

Ví dụ:

```text
Màu nhấn

● Burgundy
● Forest
● Navy
● Teal
● Amber
● Rose
● Violet
● Custom
```

Nhưng màu này **không thay semantic colors**.

Ví dụ người dùng chọn Forest:

```text
Primary Button → Forest
Active Navigation → Forest
Focus Ring → Forest
Selected Card → Forest Soft
Link Accent → Forest
```

Nhưng:

```text
Success → vẫn Emerald
Warning → vẫn Amber
Error → vẫn Rose
```

Không để user chọn màu xanh rồi toàn bộ Error cũng thành xanh.

---

# 4. Custom Accent Color

Nếu chọn:

```text
+ Màu tùy chỉnh
```

mở:

```text
Màu yêu thích

[ Color Picker ]

HEX
[#7A2938]

Preview
```

Cho phép nhập:

```text
#RRGGBB
```

Hệ thống tự sinh:

```text
Primary
Hover
Pressed
Soft Background
Soft Border
Focus Ring
```

Ví dụ:

```text
User chọn:
#325D48

System tạo:

Primary    #325D48
Hover      darker
Pressed    darker++
Soft       very light green
Border     light green
```

Người dùng không cần tự chọn 6 màu.

---

# 5. Theme Presets

Có thể cung cấp khoảng 6 preset.

```text
Academic Burgundy
Warm Ivory
Forest Scholar
Midnight Literature
Sepia Classic
Minimal Neutral
```

Mỗi preset có miniature UI preview.

Ví dụ:

```text
┌───────────────┐
│ ▌             │
│ ▌   Aa        │
│ ▌   ──────    │
│ ▌   [ Button ]│
└───────────────┘
Academic Burgundy
```

---

# 6. Surface Style

Cho người dùng lựa chọn độ “ấm” của workspace.

```text
Nền giao diện

○ Warm Ivory
○ Pure White
○ Soft Gray
○ Dark Neutral
```

Accent và Surface phải độc lập.

Ví dụ:

```text
Accent: Forest
Surface: Warm Ivory
```

vẫn hợp lệ.

---

# 7. Bo góc giao diện

Có thể cho 3 preset:

```text
Bo góc

[ Gọn ] [ Cân bằng ] [ Mềm ]
```

Mapping:

```text
Gọn
6–8px

Cân bằng
10–12px

Mềm
14–16px
```

Không cho slider `0–40px`, vì không cần.

---

# 8. Shadow Style

Có thể tùy chỉnh:

```text
Độ nổi khối

○ Phẳng
● Nhẹ
○ Rõ
```

Ảnh hưởng:

- Card
- Modal
- Dropdown
- Reader Paper

Không cho shadow quá mạnh.

---

# 9. Cỡ chữ giao diện — mở rộng

Không chỉ:

```text
Nhỏ / Vừa / Lớn
```

Nên thêm:

```text
90%
100%
110%
120%
```

với Preview realtime.

Ngoài ra có:

```text
Cỡ chữ vùng đọc

16
17
18
19
20
21
22 px
```

Hai setting này khác nhau.

### UI Font Scale

Ảnh hưởng:

- menu;
- buttons;
- labels;
- tables;
- forms.

### Reader Font Size

Ảnh hưởng riêng Literature Reader.

---

# 10. Font giao diện

Cho phép:

```text
Font giao diện

Be Vietnam Pro
Inter
Noto Sans
System Default
```

Không cho hàng trăm font.

---

# 11. Font vùng đọc

Riêng Reader:

```text
Font đọc tác phẩm

Lora
Merriweather
Noto Serif
Georgia
```

Preview:

```text
Sông Mã xa rồi Tây Tiến ơi
Nhớ về rừng núi nhớ chơi vơi
```

---

# 12. Khoảng cách dòng Reader

```text
Độ thoáng văn bản

Gọn
1.55

Cân bằng
1.75

Thoáng
1.9
```

Giáo viên có thể tùy chỉnh trải nghiệm đọc mà không ảnh hưởng UI chung.

---

# 13. Chiều rộng vùng đọc

```text
Chiều rộng trang đọc

Hẹp
Vừa
Rộng
```

Ví dụ:

```text
Hẹp       680px
Vừa       760px
Rộng       860px
```

Đặc biệt hữu ích trên màn hình lớn.

---

# 14. Mật độ hiển thị — mở rộng

Thay vì chỉ Compact/Comfortable:

```text
Mật độ giao diện

○ Compact
● Balanced
○ Comfortable
```

### Compact

Phù hợp:

- laptop 1366×768;
- Matrix;
- Question Bank.

### Balanced

Default.

### Comfortable

Phù hợp:

- màn hình lớn;
- người dùng thích khoảng trắng.

Có preview trực tiếp.

---

# 15. Sidebar

Thêm setting:

```text
Thanh điều hướng

Khi mở ứng dụng:

○ Luôn mở
● Ghi nhớ trạng thái lần trước
○ Thu gọn
```

Thêm:

```text
Hiển thị tên module                  [ON]

Hiển thị icon                        [ON]
```

Không cho tắt cả hai cùng lúc.

---

# 16. Chuyển động — mở rộng

Không chỉ ON/OFF.

```text
Hiệu ứng giao diện

○ Không
○ Nhẹ
● Tiêu chuẩn
```

### Không

Gần như instant.

### Nhẹ

Chỉ:

- fade;
- state transition.

### Tiêu chuẩn

Có:

- drawer;
- modal;
- tabs;
- spotlight;
- button interaction.

Ngoài ra:

```text
Tôn trọng cài đặt giảm chuyển động của hệ thống [ON]
```

Default ON.

---

# II. SOẠN GIẢNG

# 17. Tự động lưu — mở rộng

Nên có:

```text
Tự động lưu                         [ON]
```

Khi ON:

```text
Thời gian chờ sau khi ngừng nhập

○ 0.5 giây
● 1 giây
○ 2 giây
○ 5 giây
```

Thêm:

```text
Hiển thị trạng thái lưu trên TopBar [ON]
```

Thêm:

```text
Thông báo khi lưu thất bại           [ON]
```

Không toast khi save thành công liên tục.

---

# 18. Snapshot tự động

Một tính năng rất hữu ích.

```text
Tạo phiên bản khôi phục tự động      [ON]
```

Tùy chọn:

```text
Giữ:

○ 3 phiên bản gần nhất
● 5 phiên bản
○ 10 phiên bản
```

Nếu project hiện tại chưa có versioning thì đây có thể để Phase 2.

---

# 19. Focus Mode mặc định — mở rộng

```text
Mở Reader ở Focus Mode              [OFF]
```

Khi ON, có thêm:

```text
Trong Focus Mode:

[✓] Ẩn Sidebar
[✓] Ẩn panel phân tích
[ ] Ẩn TopBar
[✓] Giữ thanh công cụ chọn văn bản
```

Cho phép user xác định Focus Mode thực sự “focus” đến mức nào.

---

# 20. Reader mở lại vị trí cũ

```text
Ghi nhớ vị trí đọc                  [ON]
```

Ví dụ:

người dùng đang ở dòng 245.

Đóng app.

Mở lại:

quay đúng vị trí đó.

Rất hữu ích cho văn bản dài.

---

# 21. Ghi nhớ tab cuối cùng

```text
Ghi nhớ tab đang sử dụng             [ON]
```

Ví dụ Reader đang ở:

```text
Dẫn chứng
```

thì quay lại vẫn mở Dẫn chứng.

---

# 22. Xác nhận trước khi xóa — mở rộng

Không nên chỉ một switch.

```text
Xác nhận trước khi xóa

[✓] Bài dạy
[✓] Câu hỏi
[✓] Slide
[✓] Rubric
[✓] Annotation
```

Nhưng:

```text
Xóa toàn bộ dữ liệu
```

luôn bắt buộc confirmation và không cho tắt.

---

# 23. Undo nhanh

Có thể thêm:

```text
Cho phép hoàn tác thao tác xóa trong 10 giây [ON]
```

Flow:

```text
Đã xóa câu hỏi.

[Hoàn tác]
```

Tốt hơn confirm liên tục cho các thao tác nhỏ.

---

# 24. Bài dạy mặc định khi mở ứng dụng

```text
Khi mở EduMaster

● Tiếp tục bài gần nhất
○ Mở Dashboard
○ Cho tôi chọn bài
```

Đây là setting rất thực tế.

---

# 25. Module mặc định

```text
Sau khi mở bài dạy

● Literature Workspace
○ Dashboard
○ KHBD
○ Module lần trước
```

---

# III. TRÌNH CHIẾU

# 26. Theme slide mặc định — mở rộng

Không chỉ chọn một theme.

Nên có:

```text
Theme mặc định

[ Điện ảnh ]
[ Burgundy ]
[ Trang sách ]
[ Forest ]
[ Tối giản ]
[ Sepia ]
```

Có:

```text
[Xem tất cả]
```

và:

```text
[+ Tạo phong cách riêng]
```

Custom theme có thể chứa:

```text
Background
Accent
Title Font
Body Font
Quote Font
Text Colors
```

---

# 27. Màu chủ đạo Slides

Tương tự UI accent:

```text
Màu nhấn slide

● Theo Theme
○ Burgundy
○ Amber
○ Forest
○ Navy
○ Custom
```

---

# 28. Font mặc định Slides

Chỉnh riêng:

```text
Tiêu đề
[Lora ▼]

Nội dung
[Be Vietnam Pro ▼]

Trích dẫn
[Lora ▼]
```

Có:

```text
Cỡ mặc định
Title 32px
Body 18px
Quote 26px
```

---

# 29. Nền mặc định — mở rộng

```text
Nền slide mặc định

○ Theo theme
○ Màu đơn
○ Gradient
○ Hình ảnh
```

Nếu màu:

```text
[ Color Picker ]
[#171413]
```

Gradient:

```text
[Obsidian]
[Burgundy]
[Forest]
[Paper]
```

Image:

```text
[Chọn hình]
```

Thêm:

```text
Overlay mặc định
40%
```

---

# 30. Transition mặc định

Nên có:

```text
Chuyển slide

○ Không
● Fade
○ Slide nhẹ
```

Không cần:

- cube;
- zoom;
- explode.

Duration:

```text
Nhanh
Tiêu chuẩn
Chậm
```

---

# 31. Quiz trong trình chiếu

```text
Quiz

Reset câu trả lời khi chuyển slide       [ON]

Hiện đáp án đúng sau khi chọn sai        [ON]

Hiện phần giải thích                      [ON]
```

---

# 32. Speaker Notes trong Presenter View

```text
Speaker Notes

Hiển thị trong Presenter View             [ON]

Cỡ chữ:
[ Nhỏ | Vừa | Lớn ]
```

---

# 33. Phím trình chiếu — mở rộng

Có thể hiển thị:

```text
Next              →
Previous          ←
Next              Space
Presentation      F5
Exit              Esc
```

Và thêm:

```text
Sử dụng Space để chuyển slide            [ON]
```

Cho user tắt nếu thường gõ trong Presentation.

Advanced Phase 2:

```text
[Tùy chỉnh phím]
```

---

# 34. Presenter View mặc định

Nếu sau này có Dual Screen:

```text
Khi bắt đầu trình chiếu

○ Trình chiếu đơn
● Presenter View nếu có màn hình thứ hai
```

---

# IV. XUẤT TÀI LIỆU

# 35. Định dạng mặc định — mở rộng

Theo từng artifact:

```text
KHBD             DOCX
Đề kiểm tra      DOCX
Ma trận          DOCX
Rubric            DOCX
Slide             PPTX
Backup            JSON
```

Nếu hỗ trợ nhiều format:

```text
Slide

● PPTX
○ HTML
○ PDF
```

---

# 36. Chất lượng export

Cho:

```text
Chất lượng hình ảnh

○ Tiết kiệm dung lượng
● Cân bằng
○ Chất lượng cao
```

Áp dụng:

- slide background;
- embedded images.

Không áp dụng cho text.

---

# 37. Tên file — mở rộng

Không cần bắt user viết template kỹ thuật.

Cho preset:

```text
● Tên bài + loại tài liệu
○ Tên bài + loại + ngày
○ Tác giả + tên bài + loại
○ Tùy chỉnh
```

Preview:

```text
Tay-Tien_KHBD.docx
```

Nếu chọn Custom:

có thể cung cấp chips:

```text
[Tên bài]
[Tác giả]
[Loại]
[Ngày]
```

User click để ghép:

```text
[Tên bài]_[Loại]_[Ngày]
```

Không cần tự gõ `{lesson}`.

---

# 38. Chuẩn hóa tên file

```text
Loại bỏ ký tự không hợp lệ              [ON]

Thay khoảng trắng bằng

○ Khoảng trắng
● Dấu gạch ngang -
○ Dấu gạch dưới _
```

---

# 39. Speaker Notes khi export

```text
Speaker Notes

Kèm ghi chú nếu định dạng hỗ trợ        [ON]
```

Thêm:

```text
Khi định dạng không hỗ trợ:

● Bỏ qua
○ Xuất notes thành file riêng
```

---

# 40. Export confirmation

```text
Sau khi xuất

● Chỉ thông báo thành công
○ Hiển thị chi tiết file
```

---

# 41. Metadata

Nếu cần:

```text
Metadata tài liệu

Tên giáo viên
Trường
Môn
Năm học
```

Cho phép bật:

```text
Tự động đưa metadata vào tài liệu        [OFF]
```

---

# V. DỮ LIỆU

# 42. Sao lưu — mở rộng

Không chỉ:

```text
[Tạo bản sao]
```

Mà nên có:

```text
Sao lưu

[Tạo bản sao ngay]

Lần gần nhất:
08/10/2026 22:41
```

Thêm:

```text
Nhắc tôi sao lưu

○ Không
○ Mỗi tuần
● Mỗi tháng
```

Nếu không có automation background thật, reminder chỉ xuất hiện khi app mở.

---

# 43. Nội dung backup

Cho user biết backup gồm gì:

```text
Bản sao lưu bao gồm

✓ Bài dạy
✓ Annotation
✓ KHBD
✓ Questions
✓ Matrix
✓ Exam
✓ Rubric
✓ Slides
✓ Settings
```

Không cần user bỏ chọn ở Phase 1.

---

# 44. Khôi phục — mở rộng

Flow nên là:

```text
Chọn file
↓
Kiểm tra file
↓
Preview
↓
Chọn cách restore
↓
Confirm
```

User có thể chọn:

```text
Khôi phục dữ liệu

● Thay thế dữ liệu hiện tại
○ Gộp với dữ liệu hiện tại
```

Nếu Merge chưa được support an toàn:
không hiển thị.

---

# 45. Backup hiện tại trước khi restore

Rất nên có:

```text
Tạo bản sao dữ liệu hiện tại trước khi khôi phục [ON]
```

Default:

```text
ON
```

---

# 46. Xuất dữ liệu

Không chỉ JSON.

Có thể chia:

```text
Dữ liệu hệ thống
[ Xuất JSON ]

Danh sách câu hỏi
[ Xuất CSV ]

Thông tin bài dạy
[ Xuất JSON ]
```

Nhưng chỉ hiện format project thực sự hỗ trợ.

---

# 47. Import dữ liệu

Nếu đã có Restore thì có thể tách rõ:

```text
Khôi phục backup
```

và:

```text
Import dữ liệu
```

Không dùng hai từ này như nhau.

---

# 48. Dung lượng lưu trữ — mở rộng

Hiển thị dashboard mini:

```text
Dung lượng sử dụng

████████████░░░░ 62%

Bài dạy           8 MB
Slide            12 MB
Ảnh              19 MB
Khác              4 MB
```

Nếu Browser Storage API cho phép:
hiển thị quota.

Nếu không:
chỉ hiển thị phần đo được.

---

# 49. Quản lý ảnh

Vì Slide background image có thể tốn nhiều dung lượng:

```text
Ảnh đã lưu

24 ảnh · 19 MB

[Quản lý ảnh]
```

Màn hình quản lý:

```text
Thumbnail
Tên
Dung lượng
Đang dùng bởi slide nào
[Xóa]
```

Không cho xóa asset đang được sử dụng mà không warning.

---

# 50. Dọn dữ liệu tạm

```text
Dữ liệu tạm

Thumbnail cache
Export cache
Temporary files

[ Dọn dữ liệu tạm ]
```

Không xóa lesson.

---

# 51. Storage health

Có thể hiển thị:

```text
Trạng thái lưu trữ

● Bình thường

hoặc

⚠ Sắp đầy
```

Kèm recommendation:

```text
Ảnh nền chiếm 72% dung lượng.
```

---

# VI. TRỢ GIÚP

# 52. Hướng dẫn sử dụng — mở rộng

Không chỉ:

```text
[Bắt đầu hướng dẫn]
```

Nên trở thành Help Hub nhỏ:

```text
Hướng dẫn sử dụng

[ Hướng dẫn toàn hệ thống ]

Hướng dẫn theo chức năng

Dashboard
Reader
KHBD
Question Bank
Matrix
Exam
Rubric
Slides
Export
```

Mỗi module:

```text
[▶ Xem hướng dẫn]
```

---

# 53. Tour Progress

Hiển thị:

```text
Tiến độ hướng dẫn

██████████░░░░ 65%

13 / 20 phần đã xem
```

Có:

```text
[Tiếp tục]
[Học lại từ đầu]
```

---

# 54. Quick Help

Cho phép:

```text
Hiển thị mẹo sử dụng trong giao diện      [ON]
```

Nếu ON:

thỉnh thoảng xuất hiện helper text/context tips.

Không dùng toast spam.

---

# 55. Tooltips

```text
Hiển thị tooltip cho icon                [ON]
```

Có:

```text
Độ trễ tooltip

Nhanh
Tiêu chuẩn
Chậm
```

Có thể là unnecessary nếu muốn scope nhỏ; nhưng architecture nên hỗ trợ.

---

# 56. Phím tắt — mở rộng

Không chỉ danh sách.

Chia:

```text
Chung
Reader
KHBD
Exam
Slides
```

Search:

```text
🔍 Tìm phím tắt
```

Ví dụ:

```text
Slides

→             Slide tiếp theo
←             Slide trước
Space         Slide tiếp theo
F5            Trình chiếu
Esc           Thoát
```

Có switch:

```text
Bật phím tắt toàn hệ thống               [ON]
```

---

# 57. Tránh conflict shortcut

Nếu OFF:
chỉ giữ shortcut browser-native.

Nếu user đang nhập:

```text
input
textarea
select
contenteditable
```

shortcut app phải bị chặn nếu có nguy cơ.

---

# 58. Giới thiệu EduMaster — mở rộng

Không chỉ version.

```text
EduMaster Văn

Trợ lý Soạn giảng & Khảo thí
Ngữ văn THPT

Version 4.0
Build 2026.10.08
```

Các mục:

```text
Có gì mới
Lịch sử phiên bản
Thông tin hệ thống
Kiểm tra cập nhật
```

Chỉ hiện “Kiểm tra cập nhật” nếu app thật sự support.

---

# 59. System Information

Có thể có:

```text
Trình duyệt
Chrome ...

Storage
Local

App version
4.0

Data schema
v2
```

Có button:

```text
[ Sao chép thông tin hệ thống ]
```

Hữu ích khi báo lỗi.

---

# 60. Báo lỗi

Có thể thêm:

```text
Gặp vấn đề?

[ Sao chép thông tin chẩn đoán ]
```

Chỉ copy:

- app version;
- browser;
- module;
- non-sensitive error information.

Không copy lesson content nếu chưa được user đồng ý.

---

# VII. CẤU TRÚC SETTINGS MỚI

Tôi sẽ nâng sidebar từ phiên bản cũ thành:

```text
⚙ Cài đặt

🎨 Giao diện
   Theme & màu sắc
   Typography
   Layout & mật độ
   Motion

✍ Soạn giảng
   Autosave
   Reader
   Focus Mode
   Điều hướng
   An toàn thao tác

🎞 Trình chiếu
   Theme
   Typography
   Background
   Transition
   Quiz
   Presenter

📄 Xuất tài liệu
   Format
   Filename
   Quality
   Metadata
   Speaker Notes

💾 Dữ liệu
   Backup
   Restore
   Export
   Storage
   Media

❔ Trợ giúp
   Guided Tour
   Hướng dẫn từng module
   Phím tắt
   Giới thiệu
   Thông tin hệ thống
```

---

# VIII. MẪU THIẾT KẾ THỰC TẾ CHO “GIAO DIỆN”

Ví dụ khi user mở **Giao diện**:

```text
┌──────────────────────────────────────────────────────────────┐
│ GIAO DIỆN                                                   │
│ Điều chỉnh không gian làm việc theo sở thích của bạn.       │
│                                                              │
│ Chủ đề                                                       │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                 │
│ │ Sáng   │ │ Ngà ấm │ │ Tối    │ │ Custom │                 │
│ └────────┘ └────────┘ └────────┘ └────────┘                 │
│                                                              │
│ Màu nhấn                                                     │
│ ● Burgundy ● Forest ● Navy ● Teal ● Amber ● +                │
│                                                              │
│ Màu tùy chỉnh                                                │
│ [ ■ ] #7A2938                                                │
│                                                              │
│ ──────────────────────────────────────────────────────────── │
│                                                              │
│ Font giao diện                                               │
│ [ Be Vietnam Pro ▼ ]                                         │
│                                                              │
│ Cỡ chữ                                                       │
│ [ 90% ] [ 100% ] [ 110% ] [ 120% ]                         │
│                                                              │
│ ──────────────────────────────────────────────────────────── │
│                                                              │
│ Mật độ                                                       │
│ ○ Compact      ● Balanced      ○ Comfortable                 │
│                                                              │
│ ──────────────────────────────────────────────────────────── │
│                                                              │
│ Chuyển động                                                  │
│ ○ Không        ○ Nhẹ           ● Tiêu chuẩn                 │
│                                                              │
│ ☑ Tôn trọng Reduced Motion của hệ điều hành                 │
│                                                              │
│                                          [Khôi phục mặc định]│
└──────────────────────────────────────────────────────────────┘
```

Đây mới là mức **cá nhân hóa thực sự**, thay vì chỉ một vài switch.

---

# IX. Nguyên tắc quan trọng nhất

Tôi sẽ chia setting thành hai loại:

**Preferences** — người dùng được tự do chỉnh:

```text
Color
Theme
Font
Density
Motion
Default behavior
Slide appearance
Export preference
```

và **Safety/System Rules** — không nên cho user phá:

```text
Restore validation
Data corruption protection
Critical delete confirmation
Unicode normalization
Schema migration
Security behavior
```

Ví dụ người dùng được chọn:

> “Tôi thích màu xanh rừng.”

nhưng không được chọn:

> “Không cần kiểm tra file backup trước khi restore.”

---

# X. Direction cuối cùng

Phần Settings nên tiến từ:

```text
ON / OFF
```

thành:

```text
PRESET
↓
PERSONALIZE
↓
PREVIEW
↓
APPLY IMMEDIATELY
↓
REMEMBER
```

Khi đó ⚙ **Cài đặt** không còn là một menu phụ, mà trở thành **trung tâm cá nhân hóa EduMaster**.

Người dùng có thể biến cùng một EduMaster thành:

```text
Academic Burgundy + Warm Ivory + Lora
```

hoặc:

```text
Forest + Warm Paper + Merriweather
```

hoặc:

```text
Navy + Pure White + Be Vietnam Pro
```

nhưng **cấu trúc UX, accessibility, semantic colors và chất lượng thiết kế vẫn được hệ thống bảo vệ**.

Đó là hướng tốt hơn nhiều so với việc cho người dùng chỉnh tự do mọi CSS, vì nó đạt được hai mục tiêu cùng lúc: **cá nhân hóa mạnh nhưng vẫn giữ EduMaster đẹp và nhất quán**.