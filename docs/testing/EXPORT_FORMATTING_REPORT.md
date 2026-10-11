# Kiểm tra định dạng xuất Word và PowerPoint — 11/10/2026

Đã xuất trực tiếp từ giao diện với dữ liệu mẫu, mở bốn tài liệu DOCX và bộ slide PPTX bằng LibreOffice, chuyển thành PDF và kiểm tra bố cục. Các file mẫu bên dưới giúp đối chiếu kết quả sau sửa.

## Word (.docx)

- Giữ xuống dòng thật trong nội dung (đặc biệt thơ và ngữ liệu), chuẩn hóa Unicode NFC cho tiếng Việt.
- Cố định bố cục bảng, thêm khoảng cách trong ô, giữ hàng cùng nhau và lặp tiêu đề bảng khi sang trang. Rubric mẫu dài hai trang: hàng cuối được giữ nguyên trên trang hai, có tiêu đề bảng lặp lại.
- Giữ tiêu đề với nội dung kế tiếp, điều chỉnh giãn dòng và tránh dòng đơn lẻ khi ngắt trang.
- Mỗi lựa chọn A/B/C/D nằm trên dòng riêng để nội dung dài không bị ép vào bốn cột hẹp.
- Đáp án bắt đầu trên trang mới. Với đề mẫu, trang 4 kết thúc đề và trang 5 bắt đầu hướng dẫn chấm.
- Sửa nhãn mã đề bị lặp và điểm bị nối thêm `.0` (ví dụ `2.5.0`). Không tạo hàng không có ô khi phần câu hỏi trống.
- Giữ khổ A4 hiện có: kế hoạch/đề/rubric dọc, ma trận ngang.

## PowerPoint (.pptx)

- Khổ slide cũ là 10 × 5.625 inch nhưng tọa độ nội dung dùng khoảng 13.33 × 7.5 inch, gây cắt chữ bên phải. Đã định nghĩa canvas 13.333333 × 7.5 inch, đúng tỷ lệ 16:9 và hệ tọa độ nội dung.
- Tách mỗi bullet thành đoạn riêng thay vì nối các bullet vào cùng dòng.
- Phân biệt ảnh nền dạng data URL với URL đường dẫn khi truyền cho PptxGenJS.
- Bộ slide mẫu sau xuất hiển thị đủ nội dung, hai cột và các bullet riêng dòng.

## Kết quả kiểm tra

- `npm run lint`: đạt.
- `npm run build`: đạt; còn cảnh báo kích thước bundle đã có trước.
- `npm run test:run`: 26 file, 239 test đạt.
- Playwright trên bản production: 32 test đạt.
- Test mới kiểm tra OpenXML thực của DOCX/PPTX: xuống dòng tiếng Việt, điểm thập phân, mã đề, trang đáp án, bảng trống, tiêu đề/hàng bảng, khổ slide, tọa độ và đoạn bullet.
- LibreOffice mở và chuyển PDF thành công: kế hoạch bài dạy, đề thi, ma trận, rubric và slide. Đã kiểm tra ảnh render phần đáp án, rubric sang trang và slide hai cột.

Đây là kiểm tra với dữ liệu mẫu và LibreOffice trên Linux; chưa kiểm tra trực tiếp Microsoft Office trên Windows hoặc mọi độ dài nội dung tùy nhập. Phạm vi sửa chính là DOCX/PPTX; chưa rà soát đầy đủ định dạng HTML và DOC cũ.

## File mẫu và ảnh đối chiếu

- [Kế hoạch bài dạy](../export-review/2026-10-11/khbd.docx)
- [Đề thi](../export-review/2026-10-11/exam.docx)
- [Ma trận](../export-review/2026-10-11/matrix.docx)
- [Rubric](../export-review/2026-10-11/rubric.docx)
- [PowerPoint](../export-review/2026-10-11/slides.pptx)
- [Trang đáp án](../export-review/2026-10-11/exam-page5.png)
- [Rubric trang hai](../export-review/2026-10-11/rubric-page2.png)
- [Slide hai cột](../export-review/2026-10-11/slides-page3.png)
