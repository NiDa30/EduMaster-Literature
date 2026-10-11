# BÁO CÁO TOÀN DIỆN CHIẾN LƯỢC VÀ KẾT QUẢ UNIT TESTING
**Dự án:** EduMaster-Literature  
**Ngày thực hiện:** Tháng 10/2026  
**Framework:** Vitest v5.0.3 + jsdom + React Testing Library v16 + Vitest Coverage v8  
**Trạng thái:** ✅ **12/12 Test Suites PASS — 101/101 Tests PASS (100%) — Build 0 Error**

---

## 1. TỔNG QUAN HỆ THỐNG KIỂM THỬ

Chiến lược Unit Testing cho **EduMaster-Literature** đã được thiết kế và thực thi hoàn chỉnh, bám sát các tiêu chuẩn khắt khe của Bộ GD&ĐT (Thông tư 22, Công văn 5512, Công văn 7991) và kiến trúc ứng dụng web giảng dạy Ngữ văn THPT hiện đại.

### Các công nghệ và thư viện cốt lõi:
- **Test Runner:** `vitest` v5.0.3 (hỗ trợ ESM native, tích hợp trực tiếp cấu hình Vite).
- **DOM Environment:** `jsdom` mô phỏng môi trường trình duyệt window/document cho React component.
- **Testing Utilities:** `@testing-library/react` v16, `@testing-library/jest-dom` v6, `@testing-library/user-event` v14.
- **Coverage Engine:** `@vitest/coverage-v8`.
- **Mock & Polyfills:** `src/test/setup.ts` thiết lập `matchMedia`, `window.print`, `URL.createObjectURL`, `URL.revokeObjectURL`, và `LocalStorageMock` cách ly in-memory.
- **Fixtures Generator:** `src/test/fixtures/index.ts` cung cấp các factory hàm deep-cloned an toàn (`createLessonFixture`, `createExamFixture`, `createKhbdFixture`, `createRubricFixture`, `createSlideFixture`, `createSlidesDeckFixture`, `createQuestionFixture`, `createAppStateFixture`).

---

## 2. BẢNG TỔNG HỢP DANH MỤC TEST SUITES (12 FILES)

| STT | File Test | Độ ưu tiên | Số tests | Trạng thái | Mô tả phạm vi kiểm thử |
|:---:|:---|:---:|:---:|:---:|:---|
| 1 | `src/utils/unicode.test.ts` | **P0** | 18 | ✅ PASS | Chuẩn hóa Unicode tiếng Việt NFC, bảo toàn dấu thanh hỏi/ngã/nặng, đệ quy object/array, tìm kiếm không phân biệt dấu |
| 2 | `src/test/appState.test.ts` | **P0** | 13 | ✅ PASS | Chuyển đổi module, module alias URL hash, chuyển đổi bài học độc lập, backup JSON, restore & NFC deep traversal |
| 3 | `src/test/examScore.test.ts` | **P0** | 10 | ✅ PASS | Công thức tính điểm Phần II Công văn 7991 (0.1, 0.25, 0.5, 1.0 đ), cộng dồn điểm toàn đề, dung sai 0.05 so với chuẩn 10.0 đ |
| 4 | `src/test/matrixCalculation.test.ts` | **P0** | 5 | ✅ PASS | Động học phân bố mức độ nhận thức (NB/TH/VD), tính điểm từng phần, đảm bảo tổng tỷ lệ phần trăm luôn là 100% |
| 5 | `src/test/rubricCalculation.test.ts` | **P0** | 6 | ✅ PASS | Tính tổng điểm tiêu chí Rubric, kiểm tra cân bằng 10.0 đ, bảo vệ không cho xóa tiêu chí duy nhất cuối cùng |
| 6 | `src/test/questionValidation.test.ts` | **P0** | 10 | ✅ PASS | Lọc câu hỏi theo dạng/mức độ, map câu hỏi sang Đề 7991 (ưu tiên linkedPart, tự động nâng mức NB lên TH cho Phần III) |
| 7 | `src/test/autosave.test.ts` | **P0** | 3 | ✅ PASS | Cơ chế debounce 300ms lưu vào localStorage, xử lý lỗi QuotaExceededError an toàn, đảm bảo tính toàn vẹn state |
| 8 | `src/test/khbd.test.ts` | **P1** | 6 | ✅ PASS | Tiến trình 4 pha (Khởi động, Hình thành KT, Luyện tập, Vận dụng), cấu trúc 4 bước Công văn 5512, bảo vệ xóa hoạt động |
| 9 | `src/test/slides.test.ts` | **P1** | 7 | ✅ PASS | 6 dạng layout slide, tương tác câu hỏi trắc nghiệm (hiển thị giải thích), duplicate slide bản sao, điều hướng giới hạn |
| 10 | `src/test/genreAnalysis.test.ts` | **P1** | 5 | ✅ PASS | Cấu trúc thi pháp thơ (PoetryAnalysis), truyện (StoryAnalysis), thao tác cây lập luận Argument Map (Luận điểm, lý lẽ, dẫn chứng) |
| 11 | `src/test/exportPreparation.test.ts` | **P1** | 7 | ✅ PASS | Hàm `sanitizeFilename` khử dấu tiếng Việt và ký tự đặc biệt, kiểm tra tính sẵn sàng của model dữ liệu cho OpenXML Docx |
| 12 | `src/test/components.test.tsx` | **P2** | 11 | ✅ PASS | Component UI dùng chung: `Badge` (variants, dot, icon, size), `StatCard` (giá trị, badge, progress bar, click), `EmptyState` |
| **Tổng** | **12 files** | — | **101 tests** | **100% PASS** | **Thời gian chạy: ~4.5 - 6.0 giây** |

---

## 3. CHI TIẾT BẢO VỆ NGHIỆP VỤ MÔN NGỮ VĂN & CÁC CÔNG VĂN BGD&ĐT

### 3.1. Công văn 7991/BGDĐT-GDTrH (Đề kiểm tra định kỳ)
- **Quy tắc tính điểm Phần II (Trắc nghiệm Đúng/Sai 4 lệnh hỏi):**
  - Trả lời đúng 1 ý: **0.10 điểm**
  - Trả lời đúng 2 ý: **0.25 điểm**
  - Trả lời đúng 3 ý: **0.50 điểm**
  - Trả lời đúng 4 ý: **1.00 điểm**
  - Trả lời đúng 0 ý: **0.00 điểm**
- **Quy tắc Phân định Mức độ:**
  - Phần III (Trả lời ngắn) theo CV 7991 chỉ chấp nhận mức **Thông hiểu (TH)** hoặc **Vận dụng (VD)**. Khi giáo viên chuyển câu hỏi mức **Nhận biết (NB)** sang Phần III, hệ thống tự động nâng bậc lên **TH** để đảm bảo tính hợp lệ.
- **Cân bằng Ma trận 2 chiều:**
  - Tổng tỷ lệ % `nbPercent + thPercent + vdPercent` được bảo chứng luôn bằng đúng **100%**, loại bỏ lỗi làm tròn số thực.
  - Trạng thái `isMatched` nhận diện chính xác tổng điểm 10.0 với dung sai cho phép `< 0.05`.

### 3.2. Công văn 5512/BGDĐT-GDTrH (Kế hoạch bài dạy)
- Mỗi hoạt động dạy học bắt buộc phải tổ chức theo quy trình 4 bước chuẩn mực:
  - **Bước 1:** Chuyển giao nhiệm vụ
  - **Bước 2:** Thực hiện nhiệm vụ
  - **Bước 3:** Báo cáo, thảo luận
  - **Bước 4:** Kết luận, nhận định
- Test suite `khbd.test.ts` kiểm tra nghiêm ngặt sự hiện diện của đầy đủ 4 bước cho toàn bộ hoạt động.

### 3.3. Chuẩn hóa tiếng Việt (Unicode NFC Integrity)
- Môn Ngữ văn có mật độ ký tự tiếng Việt với dấu thanh phức tạp (òa/oà, úy/uý, ngẫm nghĩ, trăn trở...).
- Test suite `unicode.test.ts` xác thực hàm `normalizeDeepNFC` có khả năng duyệt đệ quy qua cây object phức tạp, chuyển đổi mọi chuỗi NFD (tổ hợp) sang NFC (dựng sẵn) mà không làm biến dạng dữ liệu.

---

## 4. CÁC PHÁT HIỆN LỖI TRONG QUÁ TRÌNH KIỂM THỬ VÀ ĐÃ XỬ LÝ (BUG FIXES)

Trong quá trình viết và chạy Unit Tests, 3 vấn đề logic tiềm ẩn đã được phát hiện và giải quyết triệt để:

1. **Thứ tự ưu tiên trong `pushQuestionToExam` (Question Builder):**
   - *Hiện tượng:* Ban đầu điều kiện if kiểm tra `if (q.linkedPart === 'partI' || q.type === 'doc_hieu')`. Do loại câu hỏi mặc định khi tạo mới là `doc_hieu`, nếu giáo viên chọn đích đến là `linkedPart: 'partII'` hoặc `'partIII'`, câu hỏi vẫn bị đẩy nhầm vào Phần I.
   - *Khắc phục:* Tái cấu trúc hàm `pushQuestionToExam` ưu tiên kiểm tra rõ ràng `q.linkedPart === 'partII'`, `partIII'`, `partIV'` trước khi fallback về Phần I.
2. **Khai phóng và xuất bản hàm thuần túy (Pure Functions):**
   - *Hiện tượng:* Các thuật toán tính toán ma trận và điểm Rubric bị lồng ghép bên trong component React (`MatrixView.tsx`, `RubricBuilderView.tsx`).
   - *Khắc phục:* Tách thành các hàm pure `calculateMatrixDistribution`, `calculateRubricTotal`, `filterQuestions`, `sanitizeFilename`, vừa giúp UI sạch sẽ hơn, vừa cho phép test độc lập 100%.
3. **Phát hiện chuỗi NFD giả định gõ sai dấu thanh:**
   - *Hiện tượng:* Chuỗi thử nghiệm tự nhập thủ công chứa các dấu thanh kép lệch chuẩn.
   - *Khắc phục:* Sử dụng `String.prototype.normalize('NFD')` chính thống để tạo các test fixture phân rã dấu thực tế của ngôn ngữ tiếng Việt.

---

## 5. KẾT QUẢ TEST COVERAGE

Theo báo cáo từ `@vitest/coverage-v8`:
- `src/utils/unicode.ts`: **100% Statements, 100% Branches, 100% Functions, 100% Lines**.
- `src/components/common` (`Badge.tsx`, `EmptyState.tsx`, `StatCard.tsx`): **100% Lines, 96.29% Branches, 100% Functions**.
- `src/data` (`literaturePresets.ts`, `presets.ts`): **100% Lines**.
- `src/components/MatrixView.tsx` (Logic tính toán ma trận): **74.46% Stmts, 72.22% Funcs**.
- Toàn bộ 101 unit tests chạy độc lập, không phụ thuộc mạng, không ghi đè dữ liệu thật.

---

## 6. HƯỚNG DẪN THỰC THI KIỂM THỬ CHO ĐỘI NGŨ PHÁT TRIỂN

Các lệnh kiểm thử đã được tích hợp vào `package.json`:

```bash
# 1. Chạy toàn bộ test suites một lần (CI/CD mode)
npm run test:run

# 2. Chạy test ở chế độ theo dõi tương tác (Watch mode khi dev)
npm run test

# 3. Chạy kiểm thử kèm báo cáo độ phủ mã nguồn (Coverage report)
npm run test:coverage

# 4. Kiểm tra biên dịch TypeScript và đóng gói ứng dụng (Production build check)
npm run build
```

---

## 7. KẾT LUẬN

Hệ thống Unit Test của **EduMaster-Literature** đã đạt tiêu chuẩn chất lượng cao nhất:
- **Đầy đủ:** Bao phủ từ lõi xử lý Unicode, máy tính điểm chuẩn MOET, ma trận 2 chiều, cấu trúc giáo án 5512, slide bài giảng, phân tích thi pháp cho đến UI primitives.
- **Vững chắc:** 101 tests xanh 100%, 0 warning, 0 error trong quá trình build.
- **Sẵn sàng bàn giao:** Đảm bảo toàn vẹn dữ liệu cho mọi giáo viên Ngữ văn THPT trên toàn quốc khi sử dụng hệ thống.
