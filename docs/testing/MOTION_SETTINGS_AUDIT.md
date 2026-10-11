# Kiểm tra Motion & Interactions — 11/10/2026

Phạm vi: cài đặt Tùy biến Giao diện & Màu sắc, bốn preset, sáu công tắc, lưu cấu hình, và các nơi sử dụng chuyển động trong shell/module/tour. Đánh giá kỹ thuật nội bộ trên Chromium/Linux, bản production build; không phải đánh giá mức hài lòng với giáo viên.

## Lỗi được sửa

- Component có duration cố định nên không đổi nhịp theo preset. Chuyển sang token runtime; loại `transition-all` để không vô tình animate kích thước, font hoặc bố cục tài liệu.
- Các lớp `animate-in` không có định nghĩa animation tương ứng trong project. Toast và inspector dùng animation đã định nghĩa.
- Modal toggle chưa điều khiển transition drawer, dropdown và thanh công cụ nổi. Bổ sung phạm vi, giữ transform định vị drawer khi tắt motion.
- Hover toggle cũ có thể vô hiệu cả click feedback. Tách hover khỏi trạng thái active; tắt nâng/shadow khi hover, vẫn giữ màu và focus để nhận biết nút.
- Respect Reduced Motion được lưu nhưng CSS/JavaScript luôn áp dụng giảm chuyển động. CSS, Reader navigation và guided tour nay cùng tuân theo công tắc; mặc định vẫn tôn trọng hệ điều hành. Off luôn tắt motion kể cả khi bỏ công tắc này.
- Preview tab không phát lại khi đổi nội dung. Remount vùng preview theo tab và thêm fade chuyển module/tab cài đặt bằng opacity, không dịch chuyển chữ đang đọc.
- Cài đặt có thể mất nếu reload trước debounce autosave 300ms. Lưu cấu hình ngay khi thay đổi; test reload không chèn chờ tùy ý.
- Preset dùng thẻ div không thao tác được bằng bàn phím. Chuyển sang button có tên truy cập và aria-pressed.

## Thời gian thực tế

| Preset | Click | Hover/màu/toolbar | Panel/tab | Modal/drawer |
| --- | --- | --- | --- | --- |
| Tắt | 0 | 0 | 0 | 0 |
| Nhẹ | 80ms | 100ms | 140ms | 180ms |
| Mượt | 90ms | 120ms | 180ms | 240ms |
| Chậm & êm | 100ms | 160ms | 240ms | 320ms |

Hover của preset Nhẹ ưu tiên màu và độ mờ, không nâng thẻ. Chậm & êm dùng nhịp 240–320ms cho chuyển cảnh, vẫn giữ thao tác click nhanh. Easing thống nhất theo token, lift tối đa 1px; không tạo hiệu ứng bay/bounce hoặc chuyển động liên tục cho Reader/bảng dữ liệu. Shadow nền của không gian làm việc vẫn thuộc cài đặt Kiểu bóng đổ; hover toggle chỉ điều khiển phần thay đổi chiều sâu khi tương tác.

Cuộn mượt áp dụng cho điều hướng có chủ đích (mục lục/tour), tắt khi Off hoặc smooth-scroll=false, và tuân theo Reduced Motion. Thời gian native smooth scroll do trình duyệt quyết định, không lấy milliseconds của preset. Các thao tác đưa editor/inspector vào vùng nhìn vẫn dùng cuộn tức thì để tránh mất vị trí thao tác.

## Kiểm chứng

- TypeScript và production build đạt; còn cảnh báo bundle lớn đã có trước thay đổi.
- Vitest: 25 file, 235 test đạt, gồm kiểm tra timing Slow và override Reduced Motion.
- Playwright: 25 test đạt trên production preview. Bổ sung thao tác bằng UI cho cả bốn preset, so sánh computed animation duration, tải lại ngay để kiểm tra persistence; kiểm tra độc lập hover/click/panel/modal/drawer/scroll/Reduced Motion.
- Review lại 44 tổ hợp route/kích thước (1366×768, 1440×900, 768×1024, 390×844): main không tràn ngang với dữ liệu mẫu. Test responsive trước đó tiếp tục đạt.
- Source scan không còn duration số cố định, transition-all, animate-in hoặc hover transform Tailwind trong component. Skeleton loading vẫn có chu kỳ riêng có chủ đích; Off/Reduced Motion chặn animation đó.

Chưa kiểm tra Safari/iOS hoặc cảm nhận slow motion trên thiết bị thật. Tệp HTML/PowerPoint xuất độc lập có cài đặt trình chiếu riêng; các token này điều khiển không gian làm việc trên website.
