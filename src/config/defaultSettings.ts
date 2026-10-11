import { 
  WorkspaceSettings, 
  AccentColorId, 
  WorkspaceThemePresetId, 
  SurfaceStyleId,
  MotionPreferences
} from '../types/settings';

// =========================================================================
// 1. DEFAULT WORKSPACE SETTINGS
// =========================================================================
export const DEFAULT_MOTION_PREFERENCES: MotionPreferences = {
  preset: 'smooth',
  hoverEffects: true,
  panelTransitions: true,
  modalAnimations: true,
  smoothScroll: true,
  buttonFeedback: true,
  respectReducedMotion: true,
};

export const DEFAULT_WORKSPACE_SETTINGS: WorkspaceSettings = {
  appearance: {
    themeMode: 'light',
    accentColorId: 'burgundy',
    customAccentHex: '#7A2938',
    themePresetId: 'academic-burgundy',
    surfaceStyle: 'warm-ivory',
    cornerRadius: 'balanced',
    shadowStyle: 'subtle',
    uiFont: 'Be Vietnam Pro',
    uiFontScale: 100,
    uiDensity: 'balanced',
    sidebarBehavior: 'remember',
    showModuleNames: true,
    showModuleIcons: true,
    motionMode: 'standard',
    respectReducedMotion: true,
    motionPreferences: DEFAULT_MOTION_PREFERENCES
  },
  authoring: {
    autosaveEnabled: true,
    autosaveDelaySec: 1,
    showSaveStatusTopBar: true,
    notifyOnSaveFailure: true,
    readerFont: 'Lora',
    readerFontSize: 18,
    readerLineHeight: 1.75,
    readerPageWidth: 760,
    rememberReaderPosition: true,
    rememberLastActiveTab: true,
    defaultFocusMode: false,
    focusModeConfig: {
      hideSidebar: true,
      hideAnalysisPanel: true,
      hideTopBar: false,
      keepSelectionToolbar: true
    },
    confirmBeforeDelete: {
      lesson: true,
      question: true,
      slide: true,
      rubric: true,
      annotation: false
    },
    quickUndoEnabled: true,
    startupLessonBehavior: 'recent',
    defaultModuleAfterOpen: 'workspace'
  },
  presentation: {
    defaultThemeId: 'cinematic-literary',
    slideAccentMode: 'theme',
    slideCustomAccent: '#F59E0B',
    defaultTitleFont: 'Lora',
    defaultBodyFont: 'Be Vietnam Pro',
    defaultQuoteFont: 'Lora',
    defaultTitleSize: 32,
    defaultBodySize: 18,
    defaultQuoteSize: 26,
    defaultBgType: 'theme',
    defaultBgColor: '#171413',
    defaultBgGradientId: 'grad-obsidian',
    defaultOverlayOpacity: 0.5,
    slideTransition: 'fade',
    slideTransitionSpeed: 'normal',
    quizResetOnSlideChange: true,
    quizShowCorrectOnWrong: true,
    quizShowExplanation: true,
    speakerNotesInPresenter: true,
    speakerNotesFontSize: 'medium',
    useSpaceToAdvance: true,
    presenterDualScreen: false
  },
  export: {
    defaultFormatKhbd: 'docx',
    defaultFormatExam: 'docx',
    defaultFormatSlide: 'pptx',
    defaultFormatRubric: 'docx',
    imageQuality: 'balanced',
    filenamePattern: 'title_type',
    customFilenamePattern: '{title}_{type}',
    sanitizeFilenames: true,
    filenameSpaceChar: '-',
    includeSpeakerNotes: true,
    exportNotificationDetail: false,
    autoIncludeMetadata: true,
    adminMetadata: {
      department: 'Sở GD&ĐT Hà Nội',
      school: 'Trường THPT Chuyên Hà Nội - Amsterdam',
      teacherName: 'Nguyễn Văn A',
      subjectGroup: 'Tổ Ngữ văn'
    }
  },
  data: {
    backupReminderInterval: 'monthly',
    lastBackupTimestamp: null,
    backupBeforeRestore: true
  },
  help: {
    enableContextTips: true,
    enableShortcuts: true,
    tourProgress: {}
  }
};

// =========================================================================
// 2. ACCENT COLOR PRESETS
// =========================================================================
export interface AccentPreset {
  id: AccentColorId;
  name: string;
  hex: string;
  hoverHex: string;
  pressedHex: string;
  softHex: string;
  borderHex: string;
  ringRgba: string;
}

export const ACCENT_COLOR_PRESETS: AccentPreset[] = [
  {
    id: 'burgundy',
    name: 'Đỏ mận (Burgundy)',
    hex: '#7A2938',
    hoverHex: '#68222E',
    pressedHex: '#521B24',
    softHex: '#FCF3F4',
    borderHex: '#ECC2C9',
    ringRgba: 'rgba(122, 41, 56, 0.22)'
  },
  {
    id: 'forest',
    name: 'Xanh rừng (Forest)',
    hex: '#18352B',
    hoverHex: '#122921',
    pressedHex: '#0D1E18',
    softHex: '#F0FDF4',
    borderHex: '#BBF7D0',
    ringRgba: 'rgba(24, 53, 43, 0.22)'
  },
  {
    id: 'navy',
    name: 'Lam đen (Navy)',
    hex: '#1E3A8A',
    hoverHex: '#172B68',
    pressedHex: '#11204E',
    softHex: '#EFF6FF',
    borderHex: '#BFDBFE',
    ringRgba: 'rgba(30, 58, 138, 0.22)'
  },
  {
    id: 'teal',
    name: 'Xanh ngọc (Teal)',
    hex: '#0D9488',
    hoverHex: '#0B776D',
    pressedHex: '#085C54',
    softHex: '#F0FDFA',
    borderHex: '#99F6E4',
    ringRgba: 'rgba(13, 148, 136, 0.22)'
  },
  {
    id: 'amber',
    name: 'Hổ phách (Amber)',
    hex: '#D97706',
    hoverHex: '#B45309',
    pressedHex: '#92400E',
    softHex: '#FFFBEB',
    borderHex: '#FDE68A',
    ringRgba: 'rgba(217, 119, 6, 0.22)'
  },
  {
    id: 'rose',
    name: 'Hoa hồng (Rose)',
    hex: '#E11D48',
    hoverHex: '#BE123C',
    pressedHex: '#9F1239',
    softHex: '#FFF1F2',
    borderHex: '#FECDD3',
    ringRgba: 'rgba(225, 29, 72, 0.22)'
  },
  {
    id: 'violet',
    name: 'Tím ngọc (Violet)',
    hex: '#7C3AED',
    hoverHex: '#6D28D9',
    pressedHex: '#5B21B6',
    softHex: '#F5F3FF',
    borderHex: '#DDD6FE',
    ringRgba: 'rgba(124, 58, 237, 0.22)'
  }
];

// =========================================================================
// 3. THEME PRESETS WORKSPACE (6 BỘ TRỌN GÓI)
// =========================================================================
export interface WorkspaceThemePreset {
  id: WorkspaceThemePresetId;
  name: string;
  description: string;
  accentId: AccentColorId;
  accentHex: string;
  surfaceId: SurfaceStyleId;
  readerFont: 'Lora' | 'Merriweather' | 'Noto Serif' | 'Georgia';
}

export const THEME_PRESETS_WORKSPACE: WorkspaceThemePreset[] = [
  {
    id: 'academic-burgundy',
    name: 'Academic Burgundy',
    description: 'Phong cách hàn lâm kinh điển: Đỏ mận học thuật, nền ngà ấm dịu mắt và phông chữ Lora.',
    accentId: 'burgundy',
    accentHex: '#7A2938',
    surfaceId: 'warm-ivory',
    readerFont: 'Lora'
  },
  {
    id: 'warm-ivory',
    name: 'Warm Ivory Paper',
    description: 'Trang sách ấm áp: Tông hổ phách đất, nền giấy ngà cổ điển và phông Georgia thanh thoát.',
    accentId: 'amber',
    accentHex: '#D97706',
    surfaceId: 'warm-ivory',
    readerFont: 'Georgia'
  },
  {
    id: 'forest-scholar',
    name: 'Forest Scholar',
    description: 'Học thuật xanh rừng: Sắc xanh rêu đại ngàn tĩnh tại, nền trắng tinh và phông Merriweather.',
    accentId: 'forest',
    accentHex: '#18352B',
    surfaceId: 'pure-white',
    readerFont: 'Merriweather'
  },
  {
    id: 'midnight-lit',
    name: 'Midnight Literature',
    description: 'Điện ảnh trầm tối: Lam đen huyền bí, tương phản cao, tối ưu khi làm việc vào ban đêm.',
    accentId: 'navy',
    accentHex: '#1E3A8A',
    surfaceId: 'dark-neutral',
    readerFont: 'Lora'
  },
  {
    id: 'sepia-classic',
    name: 'Sepia Classic',
    description: 'Văn chương Sepia hoài niệm: Điểm nhấn cánh hồng cổ điển, nền ngà và phông Noto Serif.',
    accentId: 'rose',
    accentHex: '#E11D48',
    surfaceId: 'warm-ivory',
    readerFont: 'Noto Serif'
  },
  {
    id: 'minimal-neutral',
    name: 'Minimal Neutral',
    description: 'Tối giản hiện đại: Xanh ngọc mòng két, nền xám thanh lịch, tập trung tối đa vào cấu trúc.',
    accentId: 'teal',
    accentHex: '#0D9488',
    surfaceId: 'soft-gray',
    readerFont: 'Lora'
  }
];

// =========================================================================
// 4. SURFACE STYLE PRESETS
// =========================================================================
export interface SurfacePreset {
  id: SurfaceStyleId;
  name: string;
  description: string;
  canvas: string;
  surface: string;
  surfaceSubtle: string;
  isDark: boolean;
}

export const SURFACE_STYLE_PRESETS: SurfacePreset[] = [
  {
    id: 'warm-ivory',
    name: 'Ngà ấm cổ điển (Warm Ivory)',
    description: 'Sắc ngà ấm tự nhiên, dịu mắt khi làm việc và đọc văn bản nhiều giờ.',
    canvas: '#F7F6F3',
    surface: '#FFFFFF',
    surfaceSubtle: '#FAF9F7',
    isDark: false
  },
  {
    id: 'pure-white',
    name: 'Trắng tinh khiết (Pure White)',
    description: 'Nền trắng sáng hiện đại, độ sắc nét cao và tương phản tối ưu.',
    canvas: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceSubtle: '#F4F4F5',
    isDark: false
  },
  {
    id: 'soft-gray',
    name: 'Xám thanh lịch (Soft Gray)',
    description: 'Tông xám nhạt trung tính, phong cách giao diện biên tập chuẩn mực.',
    canvas: '#F4F4F5',
    surface: '#FFFFFF',
    surfaceSubtle: '#E4E4E7',
    isDark: false
  },
  {
    id: 'dark-neutral',
    name: 'Tối trầm tĩnh (Dark Neutral)',
    description: 'Bề mặt tối bảo vệ thị giác, chống mỏi mắt trong môi trường ánh sáng yếu.',
    canvas: '#1C1917',
    surface: '#292524',
    surfaceSubtle: '#44403C',
    isDark: true
  }
];

// =========================================================================
// 5. KEYBOARD SHORTCUTS DIRECTORY
// =========================================================================
export interface ShortcutItem {
  key: string;
  description: string;
  category: 'general' | 'reader' | 'khbd' | 'exam' | 'slides';
}

export const SHORTCUTS_CATALOG: ShortcutItem[] = [
  // Chung
  { key: 'F5', description: 'Trình chiếu slide toàn màn hình', category: 'general' },
  { key: 'Esc', description: 'Đóng modal / Thoát toàn màn hình', category: 'general' },
  { key: 'Ctrl + P', description: 'Xem trước bản in hoặc xuất PDF', category: 'general' },
  { key: 'Ctrl + S', description: 'Lưu tức thì vào phiên làm việc', category: 'general' },
  // Reader
  { key: 'Space', description: 'Cuộn trang đọc xuống', category: 'reader' },
  { key: 'Shift + Space', description: 'Cuộn trang đọc lên', category: 'reader' },
  { key: '1, 2, 3, 4', description: 'Chuyển nhanh các tab phân tích thi pháp', category: 'reader' },
  // KHBD
  { key: 'Ctrl + Enter', description: 'Thêm hoạt động dạy học mới', category: 'khbd' },
  // Slides
  { key: '→ / PageDown', description: 'Chuyển sang slide tiếp theo', category: 'slides' },
  { key: '← / PageUp', description: 'Quay lại slide phía trước', category: 'slides' },
  { key: 'Space', description: 'Chuyển slide kế tiếp khi đang trình chiếu', category: 'slides' }
];
