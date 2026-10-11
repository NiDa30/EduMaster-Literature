# BÁO CÁO TRIỂN KHAI TÍNH NĂNG HƯỚNG DẪN SỬ DỤNG TOÀN HỆ THỐNG (GUIDED TOUR ENGINE)

**Mã dự án**: EduMaster-Literature  
**Phân hệ**: Toàn bộ ứng dụng (Global Onboarding & Guided Tour)  
**Tác giả**: Senior Product Engineer + Senior Frontend Engineer + UX Designer  
**Ngày hoàn thành**: 08/10/2026  
**Trạng thái kiểm thử**: 22/22 Test Suites Passed (210/210 Tests Passed)  
**Trạng thái Build**: Production Bundle thành công (Vite v8.3.2 - 796ms)  

---

## 1. TỔNG QUAN VÀ MỤC TIÊU DỰ ÁN

Hệ thống **Hướng dẫn sử dụng toàn hệ thống (Guided Tour)** cho EduMaster-Literature được thiết kế và triển khai nhằm mục tiêu giải quyết bài toán onboarding cho giáo viên Ngữ văn THPT khi lần đầu tiếp cận phần mềm hoặc cần ôn lại quy trình soạn giảng tích hợp.

Hệ thống đã đạt được các tiêu chí cốt lõi:
1. **Bao phủ toàn diện 10 phân hệ nghiệp vụ**: Từ Bảng điều khiển, Không gian đọc & chú thích văn bản, Phân tích thể loại, Soạn KHBD 5512, Ngân hàng câu hỏi, Ma trận đề, Soạn đề thi 7991, Xây dựng Rubric, Thiết kế slide bài giảng cho đến Xuất bản & Sao lưu hồ sơ.
2. **Khả năng tự động điều hướng liên phân hệ (Cross-route Auto-navigation)**: Tự động đổi module khi bước tiếp theo nằm ở màn hình khác, tự động cuộn màn hình và bắt tiêu điểm mượt mà.
3. **An toàn dữ liệu tuyệt đối (Zero-mutation Safety)**: Không tạo mock data giả, không can thiệp hay làm biến đổi bất kỳ cấu trúc dữ liệu bài giảng nào của người dùng.
4. **Không cưỡng bức (Non-intrusive & Flexible)**: Tách bạch rõ hành vi "Bỏ qua bước" (chỉ qua bước tiếp theo) và "Dừng hướng dẫn" (xác nhận nhẹ và lưu tiến độ); hỗ trợ tiếp tục (Resume) hoặc bắt đầu lại bất kỳ khi nào.

---

## 2. DANH SÁCH TỆP TIN THÊM MỚI VÀ THAY ĐỔI

### 2.1. Tệp tin tạo mới (12 files)
1. [`src/types/tour.ts`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/types/tour.ts): Định nghĩa kiểu dữ liệu `TourStep`, `TourState`, `TourPreferences`, `TourPlacement`.
2. [`src/config/tourSteps.ts`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/config/tourSteps.ts): Định nghĩa chi tiết 25 bước hướng dẫn chuẩn mực theo ngôn ngữ sư phạm môn Văn.
3. [`src/utils/tourUtils.ts`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/utils/tourUtils.ts): Các tiện ích tính toán toạ độ popover, cuộn màn hình, timeout observer và lưu trữ preferences.
4. [`src/hooks/useGuidedTour.ts`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/hooks/useGuidedTour.ts): Custom hook quản trị vòng đời tour, điều hướng đa phân hệ, xử lý phím tắt và A11y live announcements.
5. [`src/components/tour/GuidedTourContext.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/tour/GuidedTourContext.tsx): React context chia sẻ API điều khiển tour cho Sidebar/TopBar.
6. [`src/components/tour/GuidedTour.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/tour/GuidedTour.tsx): Provider và bộ điều phối giao diện tour toàn cục.
7. [`src/components/tour/TourOverlay.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/tour/TourOverlay.tsx): SVG mask cutout tạo hiệu ứng spotlight tập trung với đường viền Burgundy Bordeaux.
8. [`src/components/tour/TourPopover.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/tour/TourPopover.tsx): Popover hiển thị nội dung hướng dẫn với định vị tự động 4 hướng và bộ nút bấm tương tác.
9. [`src/components/tour/TourIntroModal.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/tour/TourIntroModal.tsx): Modal chào mừng nhẹ nhàng dành cho người dùng lần đầu mở app.
10. [`src/components/tour/TourResumeModal.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/tour/TourResumeModal.tsx): Modal hỏi tiếp tục từ bước dở dang hay bắt đầu lại.
11. [`src/components/tour/TourStopConfirmModal.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/tour/TourStopConfirmModal.tsx): Hộp thoại xác nhận khi bấm dừng hướng dẫn.
12. [`src/components/tour/TourCompletionModal.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/tour/TourCompletionModal.tsx): Modal chúc mừng khi hoàn thành 25 bước.
13. [`src/components/tour/TourMissingTarget.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/tour/TourMissingTarget.tsx): Thẻ fallback xử lý an toàn khi không tìm thấy target trong DOM.
14. [`src/components/tour/index.ts`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/tour/index.ts): Barrel export cho các thành phần tour.
15. [`src/test/guidedTourUnit.test.ts`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/test/guidedTourUnit.test.ts): 13 Unit tests kiểm thử vị trí, cuộn màn hình, nhận diện môi trường và lưu trữ.
16. [`src/test/guidedTourInteraction.test.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/test/guidedTourInteraction.test.tsx): 7 Integration tests kiểm thử hành vi Next/Back, Skip, Stop confirm, Route chuyển đổi, A11y và Zero-mutation.

### 2.2. Tệp tin tích hợp và gắn `data-tour-id` (13 files)
1. [`src/App.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/App.tsx): Bọc toàn bộ ứng dụng trong `GuidedTourProvider` và liên kết với `onOpenTour`.
2. [`src/components/Sidebar.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/Sidebar.tsx): Gắn `data-tour-id="sidebar"`, bổ sung nút "Hướng dẫn sử dụng" vào menu điều hướng.
3. [`src/components/TopBar.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/TopBar.tsx): Gắn `data-tour-id="lesson-switcher"`, `autosave-status`, `focus-mode`, bổ sung nút "Hướng dẫn" tiện ích.
4. [`src/components/TeacherDashboard.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/TeacherDashboard.tsx): Gắn `data-tour-id="dashboard-resume"`.
5. [`src/components/LiteratureWorkspace/LiteratureReader.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/LiteratureWorkspace/LiteratureReader.tsx): Gắn `data-tour-id="reader-tools"`, `reader-content`.
6. [`src/components/GenreAnalysis/GenreAnalysisView.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/GenreAnalysis/GenreAnalysisView.tsx): Gắn `data-tour-id="genre-tabs"`.
7. [`src/components/Khbd/KhbdView.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/Khbd/KhbdView.tsx): Gắn `data-tour-id="khbd-builder"`, `khbd-document-view`.
8. [`src/components/QuestionBank/QuestionBuilderView.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/QuestionBank/QuestionBuilderView.tsx): Gắn `data-tour-id="question-bank"`, `question-editor`.
9. [`src/components/Matrix/MatrixView.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/Matrix/MatrixView.tsx): Gắn `data-tour-id="matrix-grid"`, `matrix-summary`.
10. [`src/components/Exam/Exam7991View.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/Exam/Exam7991View.tsx): Gắn `data-tour-id="exam-builder"`, `exam-validation`.
11. [`src/components/Rubric/RubricBuilderView.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/Rubric/RubricBuilderView.tsx): Gắn `data-tour-id="rubric-builder"`.
12. [`src/components/Slides/SlidesView.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/Slides/SlidesView.tsx): Gắn `data-tour-id="slides-thumbnails"`, `slides-stage`, `slides-editor`, `slides-presentation-button`.
13. [`src/components/ExportHandover/ExportHandoverView.tsx`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/components/ExportHandover/ExportHandoverView.tsx): Gắn `data-tour-id="export-panel"`, `backup-restore`.

---

## 3. THIẾT KẾ SPOTLIGHT & POPOVER

### 3.1. Lớp phủ & Tiêu điểm (Spotlight Overlay)
- Sử dụng thẻ `<svg>` toàn màn hình (`pointer-events-none`) kết hợp thẻ `<mask id="tour-spotlight-mask">` để khoét lỗ trong suốt đúng kích thước và toạ độ phần tử thực tế.
- Đường viền tiêu điểm bo tròn linh hoạt theo `getComputedStyle(target).borderRadius` của component.
- Màu nhấn Bordeaux học thuật:
  - Vòng viền: `2px rgba(122, 41, 56, 0.35)`
  - Vùng tỏa mờ ngoài: `0 0 0 4px rgba(122, 41, 56, 0.08)`
  - Không sử dụng hiệu ứng neon lòe loẹt, tạo cảm giác tĩnh tại, tập trung.

### 3.2. Popover giải thích
- Nền trắng tinh khiết `#FFFFFF`, viền `#E5E0DA`, đổ bóng `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)`.
- Chiều rộng 360px cố định, khoảng cách đệm 20px với lề màn hình.
- Tự động hoán đổi vị trí (Flip Placement): Nếu đặt `bottom` bị tràn màn hình dưới, popover tự động chuyển lên `top`; nếu đặt `right` bị tràn mép phải, tự động chuyển sang `left`.
- Huy hiệu chương học thuật (Academic Chapter Pill): Thể hiện rõ thứ tự phân hệ (ví dụ: `4. Soạn KHBD 5512`).
- Bộ đếm bước thanh lịch: `Bước X / 25`.

---

## 4. XỬ LÝ ĐIỀU HƯỚNG LIÊN PHÂN HỆ VÀ TÍNH ỔN ĐỊNH

Khi chuyển từ phân hệ này sang phân hệ khác:
1. `useGuidedTour` kích hoạt `setActiveModule(targetModule)`.
2. Bật cờ trạng thái `isWaitingTarget = true`.
3. Hàm `waitForTourTarget` khởi tạo `MutationObserver` chờ phần tử render xong với cơ chế timeout 2.500ms.
4. Khi phần tử xuất hiện:
   - Tự động cuộn màn hình mượt mà nếu phần tử nằm ngoài viewport bằng `scrollTargetIntoView`.
   - Tính toán lại toạ độ tiêu điểm.
5. Nếu quá thời gian chờ (phần tử vắng mặt):
   - Kích hoạt giao diện dự phòng `TourMissingTarget`.
   - Giữ nguyên luồng hướng dẫn, cho phép giáo viên bấm "Bỏ qua bước này" để tiếp tục hành trình mà không bị treo hệ thống.

---

## 5. KHẢ NĂNG TIẾP CẬN (ACCESSIBILITY & A11Y)

1. **Tuân thủ chuẩn WAI-ARIA**:
   - `role="dialog"`, `aria-modal="true"`.
   - Live region ẩn (`role="status"`, `aria-live="polite"`, `aria-atomic="true"`) phát âm thông báo khi chuyển bước cho Screen Reader.
2. **Hỗ trợ phím tắt**:
   - `ArrowRight`: Chuyển sang bước tiếp theo.
   - `ArrowLeft`: Quay lại bước trước.
   - `Escape`: Mở hộp thoại xác nhận dừng tour nhẹ nhàng.
3. **Giảm chuyển động (Reduced Motion Guard)**:
   - Tự động nhận diện thiết lập `@media (prefers-reduced-motion: reduce)` của hệ điều hành.
   - Tắt hoàn toàn hiệu ứng di chuyển và smooth scroll.

---

## 6. KẾT QUẢ KIỂM THỬ (TEST VERIFICATION)

Hệ thống được kiểm thử toàn diện với 2 bộ test chuyên biệt:

```
Test Files  22 passed (22)
Tests       210 passed (210)
Duration    15.87s
```

### Chi tiết các ca kiểm thử Tour:
1. `TOUR-STORE-001`: Đọc/ghi cấu hình preferences vào `localStorage`.
2. `TOUR-STORE-002`: Xử lý an toàn khi `localStorage` bị lỗi hoặc dữ liệu JSON bị hỏng.
3. `TOUR-POS-001`: Tính toán vị trí Popover chính xác theo 4 hướng (`top`, `bottom`, `left`, `right`).
4. `TOUR-POS-002`: Tự động lật hướng (flip) khi Popover vượt mép màn hình.
5. `TOUR-POS-003`: Định vị trung tâm màn hình (`center`) khi không có target cụ thể.
6. `TOUR-SCROLL-001`: Tự động cuộn viewport nếu target nằm ngoài vùng nhìn.
7. `TOUR-MOTION-001`: Nhận diện chuẩn xác tuỳ chọn Reduced Motion của hệ điều hành.
8. `TOUR-ENV-001`: Nhận diện chuẩn xác phần tử trong DOM thực tế và môi trường kiểm thử jsdom.
9. `TOUR-FUNC-001`: Khởi động tour từ TopBar, hiển thị popover, chuyển bước Next/Back.
10. `TOUR-INT-001`: Nút "Bỏ qua" chuyển sang bước tiếp theo mà không tắt tour.
11. `TOUR-INT-002`: Nút "Dừng hướng dẫn" kích hoạt hộp thoại xác nhận nhẹ; chọn tiếp tục thì resume, chọn dừng thì thoát tour.
12. `TOUR-ROUTE-001`: Tự động chuyển đổi `activeModule` khi bước tiếp theo nằm ở route khác.
13. `TOUR-PERSIST-001`: Mở lại tour với tiến độ cũ hiển thị modal cho phép Resume hoặc Bắt đầu lại.
14. `TOUR-A11Y-001`: Tuân thủ chuẩn WAI-ARIA, phím tắt `ArrowRight`, `ArrowLeft`, `Escape`.
15. `TOUR-DATA-001`: Đảm bảo 100% dữ liệu bài giảng của người dùng không bị biến đổi trong suốt hành trình tour.

---

## 7. ĐÁNH GIÁ VÀ HƯỚNG PHÁT TRIỂN TƯƠNG LAI

### 7.1. Hạn chế hiện tại
- Tour hiện áp dụng một lộ trình tuyến tính 25 bước chung cho toàn bộ ứng dụng. Chưa phân chia thành các "Mini-tours" chuyên sâu riêng cho từng phân hệ (ví dụ: tour riêng chỉ 5 bước cho Giáo viên chỉ muốn soạn ma trận - đề thi).

### 7.2. Hướng phát triển tiếp theo
- Bổ sung menu "Chọn chủ đề hướng dẫn": Cho phép giáo viên lựa chọn học nhanh một nghiệp vụ cụ thể (vd: "Hướng dẫn 3 phút: Soạn KHBD 5512", "Hướng dẫn 2 phút: Thiết kế Slide trình chiếu").
- Thêm tooltip tương tác có điều kiện (Interactive Quests): Khuyến khích giáo viên thử click trực tiếp vào một nút bấm cụ thể để mở rộng kiến thức thực hành.
