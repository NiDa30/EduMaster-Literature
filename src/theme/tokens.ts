/**
 * EduMaster Văn - Design Tokens & Visual Design System Architecture v4.0
 * Dựa trên:
 * - docs/design/design_coler.md (Hệ thống màu sắc, typography, surface elevation)
 * - docs/design/design_animation.md (Hệ thống motion, easing, duration, micro-interactions)
 *
 * Triết lý: Academic + Editorial + Professional Workspace
 * Đặc tính: Subtle, Responsive, Calm, Editorial, Accessible.
 */

export const tokens = {
  colors: {
    // 1. Warm Neutral Palette (Canvas & Surface)
    neutral: {
      canvas: '#F7F6F3',          // App Canvas - Nền tổng thể ứng dụng (Level 0)
      canvasElevated: '#FBFAF8',  // Nền các vùng đệm / container
      surface: '#FFFFFF',         // Workspace Surface - Panel, card, form, table (Level 1)
      surfaceSubtle: '#FAF9F7',   // Bề mặt phụ, hover row, panel phụ
      surfaceMuted: '#F5F3F0',    // Nền header bảng, tab inactive, step counter
      paper: '#FFFEFC',           // Reader Paper - Bề mặt tài liệu văn bản đọc (Level 2)
      
      borderSubtle: '#EEEAE5',    // Đường phân chia rất nhẹ (dividers)
      borderDefault: '#E5E0DA',   // Viền thẻ mặc định, inputs (Level 1)
      borderStrong: '#D6D0C8',    // Viền hover, viền phân vùng quan trọng

      textStrong: '#211E1C',      // Tiêu đề cấp cao, văn bản quan trọng (không dùng #000)
      textPrimary: '#302C29',     // Nội dung chính, chữ giao diện (WCAG AAA)
      textSecondary: '#706A65',   // Chú thích, nhãn phụ, icon mặc định (WCAG AA)
      textMuted: '#99918A',       // Placeholder, disabled, metadata phụ
    },

    // 2. Burgundy Brand Tonal Scale (11-step scale - Mục 3.1 design_coler.md)
    burgundy: {
      25: '#FDF8F8',              // Nền thẻ selected rất nhẹ, table row selected
      50: '#FAF0F2',              // Nền hover active, active tab background, soft badge
      100: '#F5E0E4',             // Nền badge, soft tint, icon button pressed
      200: '#ECC2C9',             // Viền hover của thẻ interactive, viền selected
      300: '#DE9EAA',             // Viền selected nhấn mạnh
      400: '#CA7081',             // Phụ trợ đồ họa
      500: '#B04A5D',             // Accent trung gian
      600: '#933647',             // Hover cấp 1
      700: '#7A2938',             // BRAND PRIMARY chính thức (Primary Button, CTA chính, active indicator)
      800: '#68222E',             // Primary Hover (~8% darker)
      900: '#521B24',             // Primary Pressed / Active
    },

    // 3. Brand Application States
    brand: {
      primary: '#7A2938',
      primaryHover: '#68222E',
      primaryPressed: '#521B24',
      primarySoft: '#FCF3F4',
      primarySoft50: '#FAF0F2',
      primaryBorder: 'rgba(122, 41, 56, 0.18)',
      primaryBorderStrong: '#ECC2C9',
      focusRing: 'rgba(122, 41, 56, 0.22)',
    },

    // 4. Semantic Color Strategy (Soft Tint + Dark Text - Mục 6 design_coler.md)
    semantic: {
      // SUCCESS: Hoàn tất, chuẩn xác, đạt yêu cầu (Emerald)
      success: {
        text: '#166534',
        bg: '#F0FDF4',
        border: '#BBF7D0',
        dot: '#22C55E',
      },
      // WARNING: Đang soạn, cần lưu ý, thiếu điểm (Amber)
      warning: {
        text: '#92400E',
        bg: '#FFFBEB',
        border: '#FDE68A',
        dot: '#F59E0B',
      },
      // DANGER: Lỗi, xóa vĩnh viễn, vượt điểm (Rose / Deep Red)
      danger: {
        text: '#991B1B',
        bg: '#FEF2F2',
        border: '#FECACA',
        dot: '#EF4444',
      },
      // INFO: Thông tin tài liệu, hướng dẫn (Blue)
      info: {
        text: '#1E40AF',
        bg: '#EFF6FF',
        border: '#BFDBFE',
        dot: '#3B82F6',
      },
    },

    // 5. Paper Reader Highlights (Dịu mắt, không dùng màu huỳnh quang chói - Mục 5 design_coler.md)
    readerHighlight: {
      amber: { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' },
      emerald: { bg: '#DCFCE7', text: '#166534', border: '#BBF7D0' },
      blue: { bg: '#DBEAFE', text: '#1E40AF', border: '#BFDBFE' },
      rose: { bg: '#FFE4E6', text: '#9F1239', border: '#FECDD3' },
      stone: { bg: '#F5F5F4', text: '#44403C', border: '#E7E5E4' },
    }
  },

  // 6. Surface Elevation & Shadows (Chiều sâu thị giác 4 cấp - Mục 7 & 22 design_coler.md)
  elevation: {
    // Level 0: Nền trang (Canvas) - Flat, không shadow
    0: {
      shadow: 'none',
      border: 'none',
    },
    // Level 1: Workspace Surface - Panel, Card, Table, Form, Editor
    1: {
      shadow: '0 1px 2px rgba(41, 37, 36, 0.04)',
      border: '1px solid #E5E0DA',
    },
    // Level 2: Paper Surface - Literature Reader, KHBD Document View
    2: {
      shadow: '0 8px 30px rgba(41, 37, 36, 0.04)',
      border: '1px solid #EEEAE5',
    },
    // Level 3: Overlay - Modal, Dropdown, Popover, Floating Selection Toolbar
    3: {
      shadow: '0 16px 40px rgba(41, 37, 36, 0.12), 0 4px 12px rgba(41, 37, 36, 0.06)',
      border: '1px solid #D6D0C8',
    },
  },

  shadows: {
    xs: '0 1px 2px rgba(41, 37, 36, 0.04)',
    sm: '0 1px 3px rgba(41, 37, 36, 0.06), 0 1px 2px rgba(41, 37, 36, 0.04)',
    md: '0 8px 24px rgba(41, 37, 36, 0.08)',
    lg: '0 16px 40px rgba(41, 37, 36, 0.12)',
    paper: '0 8px 30px rgba(41, 37, 36, 0.04)',
  },

  // 7. Motion & Animation System (Mục 29, 30 & 79 design_animation.md)
  motion: {
    duration: {
      instant: '90ms',     // 80–100ms: Nút nhấn (button pressed), focus ring, table row hover
      fast: '120ms',        // 120ms: Hover buttons, cards, tooltips, selection toolbar
      normal: '180ms',      // 180ms: Dropdowns, tabs switch, accordion, micro-feedback
      emphasis: '240ms',    // 240ms: Modal open, drawer, view transition
      slow: '240ms',        // Compatibility alias
    },
    easing: {
      standard: 'cubic-bezier(0.2, 0, 0, 1)',   // Chuẩn mượt mà, tự nhiên
      enter: 'cubic-bezier(0, 0, 0.2, 1)',      // Xuất hiện (Enter)
      exit: 'cubic-bezier(0.4, 0, 1, 1)',       // Biến mất (Exit)
    }
  },

  // 8. Typography Scale (Mục 9 & 10 design_coler.md)
  typography: {
    fonts: {
      ui: '"Be Vietnam Pro", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
      literary: '"Lora", "Times New Roman", Georgia, serif',
    },
    scale: {
      pageTitle: { size: '26px', weight: '600', lineHeight: '1.3' },
      sectionTitle: { size: '19px', weight: '600', lineHeight: '1.4' },
      cardTitle: { size: '15px', weight: '600', lineHeight: '1.4' },
      bodyUI: { size: '14px', weight: '400', lineHeight: '1.55' },
      metadata: { size: '12.5px', weight: '400', lineHeight: '1.5' },
      readerText: { size: '18px', weight: '400', lineHeight: '1.85' },
    }
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },

  radius: {
    modal: '16px',
    panel: '14px',
    card: '12px',
    button: '8px',
    input: '8px',
    badge: '9999px',
  }
} as const;

export type DesignTokens = typeof tokens;


/** Runtime presets share the canonical durations above; legacy modes stay supported. */
export const motionDurationPresets = {
  off: { instant: '0ms', fast: '0ms', normal: '0ms', smooth: '0ms', slow: '0ms', emphasis: '0ms' },
  light: { instant: '80ms', fast: '100ms', normal: '140ms', smooth: '180ms', slow: '220ms', emphasis: '180ms' },
  smooth: { ...tokens.motion.duration, smooth: tokens.motion.duration.emphasis },
  slow: { instant: '100ms', fast: '140ms', normal: '220ms', smooth: '260ms', slow: '280ms', emphasis: '280ms' },
} as const;
