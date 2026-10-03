/**
 * EduMaster Văn - Design Tokens
 * Triết lý: Editorial Workspace + Modern Education Tool
 * Yên tĩnh, học thuật, có khoảng thở, tối giản màu sắc và phân cấp rõ ràng.
 */

export const tokens = {
  colors: {
    // Màu nền chính: Warm Ivory
    bg: '#FAF8F5',
    // Bề mặt: White
    surface: '#FFFFFF',
    // Màu thương hiệu: Deep Burgundy (chỉ dùng cho Primary, trạng thái đang chọn, điểm nhấn)
    brand: {
      burgundy: '#7C2D37',
      burgundyHover: '#68232D',
      burgundySubtle: '#FBF4F5',
      burgundyLight: '#F5EBEB',
    },
    // Hệ trung tính
    neutral: {
      charcoal: '#292524', // Chữ chính
      stone: '#78716C', // Chữ phụ (>= 14px)
      stoneMuted: '#57534E', // Chữ phụ nhỏ (< 14px, đủ tương phản WCAG AA)
      border: '#E7E5E4', // Đường viền chuẩn
      borderLight: '#F5F5F4',
    },
    // Semantic dùng tiết chế
    semantic: {
      green: { text: '#15803D', bg: '#F0FDF4', border: '#BBF7D0' }, // Hoàn thành
      amber: { text: '#B45309', bg: '#FFFBEB', border: '#FDE68A' }, // Chú ý / highlight
      red: { text: '#B91C1C', bg: '#FEF2F2', border: '#FECACA' }, // Lỗi / Xóa
      blue: { text: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE' }, // Thông tin
    }
  },
  typography: {
    fonts: {
      ui: '"Be Vietnam Pro", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
      literary: '"Lora", "Times New Roman", Georgia, serif',
    },
    scale: {
      pageTitle: { size: '28px', weight: '600', lineHeight: '1.3' },
      sectionTitle: { size: '20px', weight: '600', lineHeight: '1.4' },
      cardTitle: { size: '16px', weight: '500', lineHeight: '1.4' },
      bodyUI: { size: '15px', weight: '400', lineHeight: '1.55' },
      metadata: { size: '13px', weight: '400', lineHeight: '1.5' },
      document: { size: '18px', weight: '400', lineHeight: '1.8' },
    }
  },
  spacing: [4, 8, 12, 16, 24, 32, 48],
  radius: {
    card: '12px',
    button: '8px',
    pill: '9999px',
  }
} as const;
