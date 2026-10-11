# TÀI LIỆU HỆ THỐNG HƯỚNG DẪN SỬ DỤNG (GUIDED TOUR / ONBOARDING ENGINE)

**Dự án**: EduMaster-Literature  
**Phân hệ**: Toàn hệ thống (Cross-module Guided Tour)  
**Tác giả**: Senior Product Engineer + Senior Frontend Engineer + UX Designer  
**Ngày cập nhật**: 08/10/2026  
**Trạng thái**: Hoàn thiện & Đã kiểm thử 100% (210/210 Tests Passed)  

---

## 1. MỤC TIÊU SẢN PHẨM (OBJECTIVE)

Phân hệ **Hướng dẫn sử dụng toàn hệ thống (Guided Tour)** được thiết kế riêng cho đối tượng giáo viên Ngữ văn THPT, giải quyết bài toán onboarding khi tiếp cận ứng dụng tích hợp chuyên sâu EduMaster-Literature:

1. **Định hướng nhanh không gian làm việc**: Trả lời trọn vẹn 4 câu hỏi cốt lõi của giáo viên:
   - *"Đây là khu vực gì?"*
   - *"Chức năng này dùng để làm gì?"*
   - *"Tôi nên bấm gì tiếp theo?"*
   - *"Các phân hệ liên kết với nhau theo tiến trình sư phạm như thế nào?"*
2. **Liền mạch không ngắt quãng**: Tự động chuyển đổi mượt mà giữa 10 phân hệ nghiệp vụ (`Dashboard`, `Literature Workspace`, `Genre Analysis`, `KHBD 5512`, `Question Bank`, `Matrix`, `Exam 7991`, `Rubric`, `Slides`, `Export / Handover`) mà không làm gián đoạn bài giảng đang soạn thảo.
3. **An toàn dữ liệu tuyệt đối (Zero-mutation Safety)**: Không tạo mock data giả gây nhiễu danh sách bài dạy, không thay đổi hay ghi đè state hiện tại của giáo viên trong suốt tour.
4. **Không cưỡng bức (Non-intrusive & Flexible)**: Giáo viên luôn có quyền bỏ qua từng bước, dừng hướng dẫn có xác nhận nhẹ nhàng, tiếp tục từ bước dở dang (Resume) hoặc khởi động lại bất kỳ lúc nào từ TopBar và Sidebar.

---

## 2. NGUYÊN TẮC UX (UX PRINCIPLES)

```
Academic + Professional + Calm + Helpful + Non-intrusive
```

1. **Ngôn ngữ sư phạm chuẩn mực**: Dùng thuật ngữ giáo dục quen thuộc với giáo viên Ngữ văn (Kế hoạch bài dạy 5512, Đề kiểm tra 7991, Đặc trưng thể loại, Ma trận - Barem, Giấy ngà cổ điển, Khổ thơ, Đoạn trích) thay vì từ ngữ kỹ thuật lập trình.
2. **Popover cô đọng**: Kích thước chuẩn 320–380px, tiêu đề in đậm rõ ràng, giải thích ngắn gọn 2–3 câu, có gợi ý thao tác sư phạm (Action Hint).
3. **Spotlight mềm mại, không neon**:
   - Vùng tối mờ: `rgba(20, 18, 17, 0.42)` nhẹ dịu mắt, không làm mờ đục toàn màn hình.
   - Viền tiêu điểm: Viền kép tông Burgundy Bordeaux (`#7A2938`) bán trong suốt `2px rgba(122, 41, 56, 0.35)` kèm hào quang dịu `0 0 0 4px rgba(122, 41, 56, 0.08)`.
   - Cắt khoét theo đúng bo góc (`border-radius`) của phần tử UI thực tế.
4. **Điều khiển chủ động**:
   - `Tiếp theo →`: Tiến tới bước kế tiếp (hoặc chuyển route tự động).
   - `← Quay lại`: Lùi về bước trước đó (hoặc quay lại route trước).
   - `Bỏ qua`: Bỏ qua bước hiện tại và tiếp tục tiến lên bước sau (không đóng tour).
   - `Dừng hướng dẫn`: Hộp thoại xác nhận nhẹ bảo lưu tiến độ, hướng dẫn mở lại từ menu Trợ giúp.
   - `Hoàn thành`: Modal chúc mừng tổng kết 10 phân hệ kèm nút `Bắt đầu làm việc`.

---

## 3. KIẾN TRÚC HỆ THỐNG (ARCHITECTURE)

Hệ thống Guided Tour được thiết kế theo kiến trúc **Decoupled Engine** hoàn toàn tự xây dựng (Custom Native React Engine), không phụ thuộc thư viện bên ngoài nặng nề nhằm kiểm soát trọn vẹn Design Tokens và luồng điều hướng:

```
src/
├── types/
│   └── tour.ts                      # Data models, interfaces, states, options
├── config/
│   └── tourSteps.ts                 # 25 bước hướng dẫn chuẩn mực cho 10 module
├── utils/
│   └── tourUtils.ts                 # Storage persistence, position calculation, viewport scroll, target wait
├── hooks/
│   └── useGuidedTour.ts             # State machine, auto-route switching, keyboard handlers, a11y announcements
├── components/tour/
│   ├── GuidedTourContext.tsx        # React Context cung cấp API openTour, restartTour, isActive
│   ├── GuidedTour.tsx               # Provider & Orchestrator component
│   ├── TourOverlay.tsx              # SVG cutout mask spotlight with smooth transitions
│   ├── TourPopover.tsx              # Card thông tin nổi với auto-placement & interactive controls
│   ├── TourIntroModal.tsx           # Modal chào mừng người dùng lần đầu
│   ├── TourResumeModal.tsx          # Modal hỏi tiếp tục từ bước dở dang hay bắt đầu lại
│   ├── TourStopConfirmModal.tsx     # Modal xác nhận khi bấm dừng hướng dẫn
│   ├── TourCompletionModal.tsx      # Modal tổng kết hoàn thành toàn bộ tour
│   ├── TourMissingTarget.tsx        # Fallback card dự phòng khi phần tử DOM vắng mặt
│   └── index.ts                     # Barrel export
└── test/
    ├── guidedTourUnit.test.ts       # 13 Unit tests (Storage, Positioning, Scroll, Visibility)
    └── guidedTourInteraction.test.tsx # 7 Integration tests (Flow, Route switch, A11y, Persistence, Zero-mutation)
```

---

## 4. MÔ HÌNH DỮ LIỆU (DATA MODEL)

Định nghĩa tại [`src/types/tour.ts`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/types/tour.ts):

```typescript
export type TourPlacement = 'top' | 'bottom' | 'left' | 'right' | 'center';

export interface TourStep {
  id: string;                     // ID duy nhất của bước (vd: 'khbd-builder')
  module: ActiveModule;           // Phân hệ đích cần điều hướng tới
  chapter: string;                // Tên chương hướng dẫn (vd: '4. Soạn KHBD 5512')
  title: string;                  // Tiêu đề ngắn gọn cho giáo viên
  description: string;            // Nội dung giải thích nghiệp vụ
  target?: string;                // CSS selector (ưu tiên [data-tour-id="..."]) hoặc 'center'
  placement?: TourPlacement;      // Vị trí ưu tiên hiển thị popover
  actionHint?: string;            // Gợi ý thao tác sư phạm
  allowSkip?: boolean;            // Cho phép bỏ qua bước (mặc định: true)
}

export interface TourState {
  isActive: boolean;              // Tour đang diễn ra hay không
  currentStepIndex: number;       // Chỉ số bước hiện tại (0-indexed)
  isWaitingTarget: boolean;       // Đang chờ phần tử DOM xuất hiện sau khi đổi route
  isTargetMissing: boolean;       // Phần tử DOM không tìm thấy sau thời gian chờ
  isConfirmingStop: boolean;      // Đang hiển thị modal xác nhận dừng
  isCompleted: boolean;           // Đã đến bước cuối và hoàn thành
}

export interface TourPreferences {
  hasSeenIntro: boolean;          // Đã thấy modal giới thiệu ban đầu chưa
  dismissedIntro: boolean;        // Người dùng đã bấm "Để sau" chưa
  completedFullTour: boolean;     // Đã từng hoàn thành toàn bộ tour chưa
  completedAt?: string;           // Thời điểm hoàn thành ISO
  lastStepIndex?: number;         // Vị trí bước dừng chân gần nhất để Resume
  lastSeenAt?: string;            // Thời điểm dừng gần nhất
}
```

---

## 5. DANH SÁCH 25 BƯỚC HƯỚNG DẪN (STEP DEFINITIONS)

Hệ thống cấu hình 25 bước bài bản xuyên suốt 10 phân hệ tại [`src/config/tourSteps.ts`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/config/tourSteps.ts):

| Bước | ID | Phân hệ (Route) | Selector Target (`data-tour-id`) | Tiêu đề nghiệp vụ |
| :---: | :--- | :--- | :--- | :--- |
| **1** | `dashboard-intro` | `dashboard` | `[data-tour-id="dashboard-resume"]` | Chào mừng đến với EduMaster Văn |
| **2** | `sidebar-nav` | `dashboard` | `[data-tour-id="sidebar"]` | Thanh điều hướng 10 phân hệ |
| **3** | `lesson-switcher` | `dashboard` | `[data-tour-id="lesson-switcher"]` | Bộ chuyển bài dạy & Tác phẩm |
| **4** | `autosave-status` | `dashboard` | `[data-tour-id="autosave-status"]` | Tự động lưu trữ an toàn |
| **5** | `focus-mode` | `dashboard` | `[data-tour-id="focus-mode"]` | Chế độ Tập trung soạn giảng |
| **6** | `reader-workspace` | `workspace` | `[data-tour-id="reader-tools"]` | Không gian Đọc & Phân tích văn bản |
| **7** | `reader-content` | `workspace` | `[data-tour-id="reader-content"]` | Vùng đọc tác phẩm đa cột |
| **8** | `genre-analysis` | `genre` | `[data-tour-id="genre-tabs"]` | Phân tích đặc trưng thể loại |
| **9** | `khbd-builder` | `khbd` | `[data-tour-id="khbd-builder"]` | Thiết kế Kế hoạch bài dạy (KHBD 5512) |
| **10** | `khbd-document` | `khbd` | `[data-tour-id="khbd-document-view"]` | Xem trước hồ sơ giáo án chuẩn |
| **11** | `question-bank` | `questions` | `[data-tour-id="question-bank"]` | Ngân hàng câu hỏi ngữ liệu |
| **12** | `question-editor` | `questions` | `[data-tour-id="question-editor"]` | Biên tập câu hỏi & Bareme điểm |
| **13** | `matrix-grid` | `matrix` | `[data-tour-id="matrix-grid"]` | Ma trận & Đặc tả đề kiểm tra |
| **14** | `matrix-summary` | `matrix` | `[data-tour-id="matrix-summary"]` | Cân bằng phân phối điểm số |
| **15** | `exam-builder` | `exam` | `[data-tour-id="exam-builder"]` | Xây dựng đề kiểm tra chuẩn 7991 |
| **16** | `exam-validation` | `exam` | `[data-tour-id="exam-validation"]` | Barem điểm & Hướng dẫn chấm |
| **17** | `rubric-builder` | `rubric` | `[data-tour-id="rubric-builder"]` | Bảng tiêu chí đánh giá (Rubric) |
| **18** | `slides-thumbnails` | `slides` | `[data-tour-id="slides-thumbnails"]` | Danh sách trang slide bài giảng |
| **19** | `slides-stage` | `slides` | `[data-tour-id="slides-stage"]` | Sân khấu trình chiếu sư phạm |
| **20** | `slides-editor` | `slides` | `[data-tour-id="slides-editor"]` | Tùy chỉnh thiết kế & Phong cách slide |
| **21** | `slides-present` | `slides` | `[data-tour-id="slides-presentation-button"]` | Chế độ Giảng dạy toàn màn hình |
| **22** | `export-panel` | `export` | `[data-tour-id="export-panel"]` | Xuất giáo án, đề thi & slide đồng bộ |
| **23** | `backup-restore` | `export` | `[data-tour-id="backup-restore"]` | Sao lưu & Khôi phục hồ sơ bài dạy |
| **24** | `help-action` | `dashboard` | `[data-testid="topbar-tour-btn"]` | Mở lại hướng dẫn bất kỳ lúc nào |
| **25** | `tour-conclusion` | `dashboard` | `center` | Hoàn thành làm quen hệ thống |

---

## 6. CƠ CHẾ ĐIỀU HƯỚNG LIÊN PHÂN HỆ (CROSS-ROUTE SWITCHING)

Khi chuyển từ bước ở Module A sang Module B:
1. `useGuidedTour` kiểm tra nếu `step.module !== currentModule`:
   - Kích hoạt `setActiveModule(step.module)`.
   - Bật cờ `isWaitingTarget = true`.
2. Hàm `waitForTourTarget(selector, 2500)` sử dụng `MutationObserver` kết hợp `requestAnimationFrame` chờ React render xong view mới và mount phần tử đích.
3. Khi phần tử xuất hiện:
   - Tắt `isWaitingTarget`.
   - Tính toán toạ độ và cuộn màn hình (`scrollTargetIntoView`).
   - Hiển thị Spotlight và Popover tại vị trí tối ưu (`calculatePopoverPosition`).
4. Nếu sau 2.500ms không tìm thấy phần tử (vd: màn hình đang ở trạng thái rỗng đặc biệt):
   - Không bị sập ứng dụng (Graceful Degradation).
   - Kích hoạt `isTargetMissing = true`.
   - Render `TourMissingTarget` thông báo nhẹ nhàng cho phép giáo viên bấm `Bỏ qua bước này` hoặc `Dừng hướng dẫn`.

---

## 7. LƯU TRỮ VÀ TIẾP TỤC (PERSISTENCE & RESUME)

Toàn bộ tuỳ chọn và tiến trình được lưu trữ tại `localStorage` với key `edumaster_tour_preferences`:
- **Lần đầu mở ứng dụng**: Nếu `!prefs.hasSeenIntro`, hiển thị `TourIntroModal` với 2 lựa chọn:
  - `[Bắt đầu hướng dẫn]`: Bắt đầu ngay từ bước 1.
  - `[Để sau]`: Đóng modal, lưu `dismissedIntro: true`, không làm phiền nữa nhưng không đánh dấu `completedFullTour`.
- **Dừng giữa chừng & Resume**: Khi giáo viên dừng ở bước 8, `lastStepIndex: 7` được ghi nhận. Khi bấm lại nút "Hướng dẫn", hệ thống mở `TourResumeModal`:
  - `[Tiếp tục từ bước 8]`: Đưa giáo viên trở lại ngay phân hệ Thể loại tại bước 8.
  - `[Bắt đầu lại từ đầu]`: Đặt lại chỉ số về 0.

---

## 8. TIÊU CHUẨN TRUY CẬP (ACCESSIBILITY & A11Y)

1. **Tuân thủ chuẩn WAI-ARIA**:
   - Popover có thuộc tính `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`.
   - Live region ẩn (`role="status"`, `aria-live="polite"`, `aria-atomic="true"`) đọc to nội dung bước khi chuyển đổi cho trình đọc màn hình.
2. **Điều hướng bằng bàn phím (Keyboard Shortcuts)**:
   - `ArrowRight`: Chuyển sang bước kế tiếp.
   - `ArrowLeft`: Quay lại bước trước đó.
   - `Escape`: Mở hộp thoại xác nhận dừng hướng dẫn an toàn.
   - Tự động focus vào nút hành động chính (`Tiếp theo` hoặc `Hoàn thành`) sau khi mở bước mới.
3. **Tuân thủ Chế độ giảm chuyển động (Reduced Motion)**:
   - Kiểm tra `window.matchMedia('(prefers-reduced-motion: reduce)')`.
   - Khi bật: Loại bỏ hiệu ứng dịch chuyển `translateY`, tắt smooth scrolling (chuyển sang `behavior: 'auto'`), đặt thời lượng chuyển tiếp bằng 0.

---

## 9. HƯỚNG DẪN MỞ RỘNG (EXTENSION GUIDE)

Khi thêm tính năng mới vào EduMaster-Literature:
1. Gắn attribute `data-tour-id="your-unique-id"` vào thẻ chứa ngoài cùng của component UI mới.
2. Mở file [`src/config/tourSteps.ts`](file:///D:/Workspace/Other/Pj%20AI/EduMaster-Literature/src/config/tourSteps.ts):
   - Thêm một đối tượng `TourStep` mới vào mảng `FULL_TOUR_STEPS`.
   - Khai báo rõ `module`, `chapter`, `title`, `description`, `target: '[data-tour-id="your-unique-id"]'`, và `placement`.
3. Kiểm tra hiển thị bằng bộ test `src/test/guidedTourInteraction.test.tsx`.
