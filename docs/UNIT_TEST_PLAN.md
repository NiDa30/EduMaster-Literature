# KẾ HOẠCH UNIT TESTING (UNIT TEST PLAN)
## DỰ ÁN: EDUMASTER-LITERATURE

---

### 1. PHẠM VI KIỂM THỬ (SCOPE)
Kế hoạch Unit Testing này bao phủ toàn bộ các đơn vị logic nghiệp vụ, tính toán, chuẩn hóa dữ liệu, chuyển đổi state, và các component cơ sở của hệ thống **EduMaster-Literature**:
- **Trọng tâm**: Pure functions, Data transformation, State management & restoration, Calculation (Ma trận, Điểm thi CV 7991, Rubric), Validation, Autosave core logic, và Reusable UI components.
- **Không bao gồm**: E2E user journey, render pixel thực của Word/PowerPoint, routing trình duyệt đa trang (dành cho Integration & E2E Testing).

---

### 2. CHIẾN LƯỢC UNIT TEST (TEST STRATEGY)
- **Framework**: Vitest v3.x (tối ưu cho Vite, ESM, hiệu năng cao).
- **DOM Environment**: `jsdom` kết hợp `@testing-library/react` và `@testing-library/jest-dom`.
- **Phương pháp thiết kế Test Case**:
  - Equivalence Partitioning (Phân vùng tương đương).
  - Boundary Value Analysis (Phân tích giá trị biên: 0, 10, <10, >10, số thực, mảng rỗng).
  - Positive / Negative Paths & Error Handling.
  - Unicode NFC Normalization verification cho mọi chuỗi tiếng Việt.
  - AAA Pattern (Arrange - Act - Assert).

---

### 3. DANH MỤC PHÂN HỆ & ĐỘ ƯU TIÊN (PRIORITY)

| Phân hệ (Module) | Nội dung kiểm thử | Mức ưu tiên | File Test dự kiến |
| :--- | :--- | :---: | :--- |
| **Unicode Utilities** | NFC Normalization, Deep NFC traversal, không dấu search matching | **P0** | `src/utils/unicode.test.ts` |
| **AppState & Session Handover** | Alias resolver, Lesson switching, Restore JSON hợp lệ / bất hợp lệ, Deep NFC merging | **P0** | `src/test/appState.test.ts` |
| **Exam Score CV 7991** | Tính điểm Phần I (trắc nghiệm 0.25đ), Phần II (Đúng/Sai 4 lệnh: 0.1/0.25/0.5/1.0đ), Phần III, Phần IV, tổng điểm 10.0đ | **P0** | `src/test/examScore.test.ts` |
| **Matrix Calculations** | Tỷ lệ nhận thức NB/TH/VD, tỷ lệ %, tổng điểm, khớp chuẩn isMatched (< 0.05đ) | **P0** | `src/test/matrixCalculation.test.ts` |
| **Rubric Calculations** | Cân bằng barem 10.0đ, tổng trọng số, sửa/xóa/thêm tiêu chí, làm tròn số thực | **P0** | `src/test/rubricCalculation.test.ts` |
| **Question Builder** | Validation lệnh hỏi, phân loại CognitiveLevel/SkillType, ánh xạ sang các phần đề thi | **P0** | `src/test/questionValidation.test.ts` |
| **Autosave Logic** | Debounce timer, Serialization vào localStorage, Error resilience | **P0** | `src/test/autosave.test.ts` |
| **KHBD 5512 Logic** | Chuẩn 4 hoạt động và 4 bước tổ chức dạy học Công văn 5512 | **P1** | `src/test/khbd.test.ts` |
| **Slides Logic** | Phân loại layout 16:9, quiz interactive state, trích đoạn văn học | **P1** | `src/test/slides.test.ts` |
| **Genre Analysis** | Cây lập luận Argument Map (Thesis -> Claims -> Reasons -> Evidences -> Conclusion) | **P1** | `src/test/genreAnalysis.test.ts` |
| **Export Preparation** | Sanitize tên tệp, cấu trúc tài liệu DOCX/PPTX/JSON trước khi xuất | **P1** | `src/test/exportPreparation.test.ts` |
| **Common UI Components** | Badge variants, StatCard render và tương tác | **P2** | `src/test/components.test.tsx` |

---

### 4. MỤC TIÊU ĐỘ BAO PHỦ (COVERAGE GOALS)
- **Utilities (`src/utils/`)**: ≥ 90%
- **Core Business Logic & Calculations**: ≥ 85%
- **State & Handover Management**: ≥ 80%
- **Common Components**: ≥ 70%
- **Branch Coverage**: Đảm bảo 100% các nhánh kiểm tra điều kiện điểm số (0, <10, ==10, >10), đúng/sai 4 lệnh và định dạng Unicode.

---

### 5. RỦI RO & BIỆN PHÁP GIẢM THIỂU (RISKS & MITIGATIONS)
- **Rủi ro sai số số thực (Floating-point precision)**: Điểm số như `0.25 + 0.25 + 0.5` hoặc phân chia phần trăm có thể sinh ra `9.9999999999`.
  - *Biện pháp*: Viết test boundary cụ thể với `toBeCloseTo` hoặc kiểm tra logic làm tròn `toFixed(1)` / `toFixed(2)`.
- **Rủi ro mã hóa tiếng Việt có dấu (Unicode NFD vs NFC)**: Dữ liệu nhập từ clipboard hoặc Word có thể mang tổ hợp ký tự rời rạc.
  - *Biện pháp*: Test kỹ lưỡng `normalizeVietnamese` và `normalizeDeepNFC`.
- **Rủi ro dữ liệu JSON hỏng khi khôi phục (Corrupted Session State)**: Người dùng có thể dán JSON thiếu trường hoặc sai kiểu dữ liệu.
  - *Biện pháp*: Test nghiêm ngặt các negative case khi restore.
