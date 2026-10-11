# Kiểm tra cài đặt màu sắc — 11/10/2026

## Lỗi đã sửa

Màu nhấn trước đây chỉ cập nhật một phần giao diện. Nhiều chữ, viền, nền chọn và thanh tiến độ vẫn dùng mã đỏ mận cố định. Khi chọn nền tối, màu chữ và một số nền sáng cũng không đổi theo, khiến dashboard và nhãn bảng khó đọc.

- Chuyển các lớp màu nhấn và màu trung tính trong giao diện sang biến màu dùng chung, gồm dashboard, sidebar, thanh công cụ, cài đặt và các phân hệ soạn giảng/khảo thí.
- Đồng bộ nền, chữ, viền và giấy đọc theo bốn kiểu nền. Chọn nền tối áp dụng bộ chữ sáng; trở về nền sáng khôi phục bộ chữ tối.
- Tự chọn chữ trắng/đen trên nút theo màu nền cho trạng thái thường, hover và nhấn. Điều chỉnh sắc độ chữ nhấn để dễ đọc trên bề mặt chính và bề mặt phụ, đồng thời giữ màu nền nhấn người dùng chọn.
- Cập nhật các sắc nền nhạt và nhãn trạng thái xanh/vàng/đỏ khi ở chế độ tối, giữ ý nghĩa màu của trạng thái.
- Chuẩn hóa mã HEX ngắn như `#fff` để đồng bộ màu picker và CSS. Mã không hợp lệ không thay đổi màu đang áp dụng.

## Phạm vi kiểm tra

| Tùy chọn / hành vi | Kiểm tra |
| --- | --- |
| 7 màu nhấn | Bấm từng màu, đo màu nút/chữ thực tế và tải lại trang |
| 6 chủ đề trọn gói | Kiểm tra màu nhấn, kiểu nền và font đọc |
| 4 kiểu nền | Kiểm tra sáng/tối, màu nền và lưu sau reload |
| Màu tùy chỉnh | HEX ngắn, màu trắng, giá trị sai, độ tương phản nút thường/hover |
| Khôi phục mặc định | Khôi phục đỏ mận và nền sáng |
| Chế độ tối | Nền thật và chữ tiêu đề trên 10 phân hệ; đo thêm các ô tiêu đề màu trong ma trận |
| Điện thoại | Đổi chủ đề sáng/tối trong hộp cài đặt ở 390 × 844, giữ lựa chọn sau reload |
| Chức năng hiện có | Khởi động, điều hướng, soạn bài, lưu dữ liệu, xuất file, font và chuyển động |

Độ tương phản 4.5:1 được kiểm tra cho chữ nhấn trên bề mặt chính/phụ và chữ nút ở các trạng thái, với các màu preset cùng màu tùy chỉnh trắng/đen/vàng nhạt. Đây là kiểm tra các thành phần được liệt kê, không phải chứng nhận toàn bộ website đạt WCAG.

## Kết quả

- TypeScript và production build: đạt. Build còn cảnh báo kích thước bundle có sẵn.
- Vitest: 27 file, 244 test đạt.
- Playwright Chromium trên production build: 38 test đạt, gồm 6 test màu sắc mới.
- Đã xem ảnh render dashboard, cài đặt, Reader, đề thi, ma trận và slide ở chế độ tối; lưu thêm ảnh nền sáng xanh rừng và cài đặt trên điện thoại.

Kiểm tra thực hiện trên bản build trong môi trường phát triển bằng Chromium. Việc hiển thị bản sửa trên website Vercel phụ thuộc lần triển khai sau khi push; chưa xác minh bản triển khai đó trong báo cáo này.

## Ảnh kiểm tra

- [Dashboard nền tối](../usability/2026-10-11-colors/dark-dashboard.png)
- [Ma trận nền tối](../usability/2026-10-11-colors/dark-matrix.png)
- [Cài đặt nền tối](../usability/2026-10-11-colors/dark-settings.png)
- [Dashboard xanh rừng](../usability/2026-10-11-colors/forest-dashboard.png)
- [Cài đặt trên điện thoại](../usability/2026-10-11-colors/mobile-settings.png)
