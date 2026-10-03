/**
 * EduMaster Văn - Vietnamese Unicode Normalization & Search Utilities
 * Chuẩn hóa Unicode tiếng Việt sang chuẩn NFC (dựng sẵn)
 * Hỗ trợ tìm kiếm không phân biệt dấu và chữ hoa/thường
 */

/**
 * Chuẩn hóa chuỗi tiếng Việt sang chuẩn NFC (Canonical Decomposition, followed by Canonical Composition).
 * Sử dụng khi nhận dữ liệu từ clipboard, file import, Word, PDF, API.
 */
export const normalizeVietnamese = (value: string): string => {
  if (typeof value !== 'string') return value;
  return value.normalize('NFC');
};

/**
 * Chuẩn hóa đệ quy toàn bộ chuỗi trong một object hoặc array sang NFC.
 */
export const normalizeDeepNFC = <T>(obj: T): T => {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') return normalizeVietnamese(obj) as unknown as T;
  if (Array.isArray(obj)) return obj.map(normalizeDeepNFC) as unknown as T;
  if (typeof obj === 'object') {
    const res: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
      res[key] = normalizeDeepNFC((obj as Record<string, any>)[key]);
    }
    return res as T;
  }
  return obj;
};

/**
 * Chuẩn hóa chuỗi tìm kiếm không dấu (Search không dấu).
 * Lưu ý: Việc lưu trữ dữ liệu chính thức luôn giữ nguyên tiếng Việt có dấu dạng NFC.
 * Hàm này chỉ dùng để so khớp / lọc chuỗi trong lúc tìm kiếm.
 */
export const toSearchNormalized = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
};

/**
 * Kiểm tra xem chuỗi nguồn có chứa từ khóa tìm kiếm (không phân biệt dấu và hoa thường) không.
 */
export const matchesVietnameseSearch = (source: string, query: string): boolean => {
  if (!query) return true;
  if (!source) return false;
  return toSearchNormalized(source).includes(toSearchNormalized(query));
};
