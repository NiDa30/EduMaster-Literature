# Kiểm tra Motion & Interactions — 11/10/2026

Cập nhật sau phản hồi: xem mục retest cuối tài liệu.

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

| Preset | Click | Hover/màu | Panel/tab | Modal/drawer |
| --- | --- | --- | --- | --- |
| Tắt | 0 | 0 | 0 | 0 |
| Nhẹ | 80ms | 100ms | 140ms | 180ms |
| Mượt | 90ms | 120ms | 180ms | 240ms |
| Chậm & êm | 100ms | 320ms | 240ms | 320ms |

Hover của preset Nhẹ ưu tiên màu và độ mờ, không nâng thẻ. Chậm & êm dùng nhịp 240–320ms cho chuyển cảnh, vẫn giữ thao tác click nhanh. Easing thống nhất theo token, lift tối đa 1px; không tạo hiệu ứng bay/bounce hoặc chuyển động liên tục cho Reader/bảng dữ liệu. Shadow nền của không gian làm việc vẫn thuộc cài đặt Kiểu bóng đổ; hover toggle chỉ điều khiển phần thay đổi chiều sâu khi tương tác.

Cuộn mượt áp dụng cho điều hướng có chủ đích (mục lục/tour), tắt khi Off hoặc smooth-scroll=false, và tuân theo Reduced Motion. Thời gian native smooth scroll do trình duyệt quyết định, không lấy milliseconds của preset. Các thao tác đưa editor/inspector vào vùng nhìn vẫn dùng cuộn tức thì để tránh mất vị trí thao tác.

## Kiểm chứng ban đầu (trước phản hồi người dùng)

- TypeScript và production build đạt; còn cảnh báo bundle lớn đã có trước thay đổi.
- Vitest: 25 file, 235 test đạt, gồm kiểm tra timing Slow và override Reduced Motion.
- Playwright: 25 test đạt trên production preview. Bổ sung thao tác bằng UI cho cả bốn preset, so sánh computed animation duration, tải lại ngay để kiểm tra persistence; kiểm tra độc lập hover/click/panel/modal/drawer/scroll/Reduced Motion.
- Review lại 44 tổ hợp route/kích thước (1366×768, 1440×900, 768×1024, 390×844): main không tràn ngang với dữ liệu mẫu. Test responsive trước đó tiếp tục đạt.
- Source scan không còn duration số cố định, transition-all, animate-in hoặc hover transform Tailwind trong component. Skeleton loading vẫn có chu kỳ riêng có chủ đích; Off/Reduced Motion chặn animation đó.

Chưa kiểm tra Safari/iOS hoặc cảm nhận slow motion trên thiết bị thật. Tệp HTML/PowerPoint xuất độc lập có cài đặt trình chiếu riêng; các token này điều khiển không gian làm việc trên website.

## Retest sau phản hồi lỗi tiếng Việt / slow hover / Reduced Motion

Người dùng xác nhận lỗi hiển thị tiếng Việt. Kết luận ban đầu dựa nhiều vào biến CSS và một nhóm nút nên chưa đủ bao phủ hành vi thực tế. Lượt này bổ sung kiểm chứng glyph và animation đang chạy trên Chromium, production build.

### Lỗi tái hiện và sửa

- `document.fonts.load()` trả về **0 font face** cho Inter, Noto Sans, Merriweather và Noto Serif dù cài đặt cho phép chọn chúng. Bổ sung font variable Fontsource 5.3.0 dạng WOFF2, đủ Vietnamese/Latin/Latin Extended, normal/italic và trọng lượng; thêm JetBrains Mono. Lưu giấy phép OFL cùng font. Be Vietnam Pro/Lora tiếp tục dùng tệp hiện có. Loại stylesheet font bên ngoài để tránh phụ thuộc mạng và trùng nguồn font.
- Hover Slow trước đó thực tế 160ms, nên cảm giác chưa chậm theo yêu cầu. Thêm token hover riêng **320ms** cho Slow, áp dụng cho màu/viền/shadow/transform của nút, thẻ, sidebar và các control dùng transition Tailwind. Click giữ 100ms; toolbar chọn văn bản giữ 160ms để không chậm thao tác chú giải. Bảng thời gian phía trên đã cập nhật.
- Off, Reduced Motion và click-feedback=false chưa chặn active transform của btn-secondary/ghost/icon/danger. Bổ sung đủ tám họ button; giữ transform định vị drawer/modal. Khi OS reduce và công tắc tôn trọng=true, không nâng/nén; khi bỏ công tắc này, hiệu ứng theo preset hoạt động trở lại. Off vẫn ưu tiên tắt.
- Bỏ scale khỏi modal và các nút có chữ, thay bằng dịch chuyển 1px khi bấm để không co glyph chữ trong lúc tương tác. Font family/size/weight không thay đổi khi hover.

### Kiểm tra thực tế

1. Chặn Google Fonts trong browser test; tải bảy font web bằng chuỗi gồm `Trầm Thị Đổi`, `Đđ`, `Ăă Ââ Êê Ôô Ơơ Ưư`, dấu thanh và dấu tổ hợp NFD. Chrome DevTools `CSS.getPlatformFontsForNode` xác nhận glyph được vẽ bằng web font đã tải, không dùng fallback hệ thống. Kiểm tra đổi font qua Cài đặt cho UI và Reader. Georgia/System Default là font của thiết bị, không giả định có một font giống nhau ở mọi máy.
2. Dùng `Element.getAnimations()` xác nhận CSS transition transform thực sự chạy **320ms** khi hover nút và thẻ mẫu; kiểm tra kết thúc ở translateY(-1px) và kiểu chữ không đổi. Chuyển OS sang reduce ngay trong phiên, rồi bật/tắt công tắc bằng UI và kiểm tra hover thay đổi tương ứng.
3. Bấm đủ tám họ button dưới bốn chính sách Off, OS reduce được tôn trọng, bỏ tôn trọng OS và tắt click feedback. Kiểm tra transform thực tế trong trạng thái active; không chỉ kiểm tra data attribute.
4. Tạo/lưu/reload câu hỏi tiếng Việt; tải thực tế KHBD, đề thi, ma trận, rubric `.docx` và slide `.pptx`, kiểm tra file ZIP có dữ liệu. Tải JSON, kiểm tra chuỗi tiếng Việt, khôi phục và xác nhận câu hỏi còn nguyên.
5. Chạy toàn bộ Vitest (25 file, 235 test), toàn bộ Playwright (32 test), TypeScript, production build; các kiểm tra layout 4 kích thước vẫn được giữ. Review lại 44 tổ hợp route/viewport; main không tràn ngang với dữ liệu mẫu.

[Ảnh kiểm tra chữ tiếng Việt bằng từng font](../usability/2026-10-11/fonts-vietnamese-retest.png) là bảng chẩn đoán dựng trong trình duyệt, không phải màn hình sản phẩm. Test được lưu ở `tests/smoke/fonts-interactions.spec.ts` và `tests/smoke/build-workflow.spec.ts`.

Giới hạn: kiểm chứng browser dùng Chromium/Linux; chưa xác nhận Safari/iOS hoặc render tài liệu trong ứng dụng Microsoft Office trên máy người dùng. Kiểm tra tải Word/PPTX xác nhận tạo file thành công, không thay thế mở và đọc từng trang trong Office. Không kết luận mọi cấu hình/dữ liệu người dùng đều không lỗi từ các test này.
