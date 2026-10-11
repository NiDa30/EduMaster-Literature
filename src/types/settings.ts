// =========================================================================
// CÀI ĐẶT — PERSONAL WORKSPACE CENTER DATA MODELS (v4.0)
// docs/design/design_setting_icon.md
// =========================================================================

export type SettingsTab = 
  | 'appearance' 
  | 'authoring' 
  | 'presentation' 
  | 'export' 
  | 'data' 
  | 'help';

// ---------------- I. GIAO DIỆN (APPEARANCE) ----------------
export type ThemeMode = 'light' | 'system' | 'dark';
export type AccentColorId = 
  | 'burgundy' 
  | 'forest' 
  | 'navy' 
  | 'teal' 
  | 'amber' 
  | 'rose' 
  | 'violet' 
  | 'custom';

export type WorkspaceThemePresetId = 
  | 'academic-burgundy' 
  | 'warm-ivory' 
  | 'forest-scholar' 
  | 'midnight-lit' 
  | 'sepia-classic' 
  | 'minimal-neutral';

export type SurfaceStyleId = 
  | 'warm-ivory' 
  | 'pure-white' 
  | 'soft-gray' 
  | 'dark-neutral';

export type CornerRadiusPreset = 'compact' | 'balanced' | 'soft';
export type ShadowStylePreset = 'flat' | 'subtle' | 'elevated';
export type UiFontFamily = 'Be Vietnam Pro' | 'Inter' | 'Noto Sans' | 'System Default';
export type UiDensity = 'compact' | 'balanced' | 'comfortable';
export type SidebarBehavior = 'always-open' | 'remember' | 'collapsed';
export type MotionMode = 'none' | 'subtle' | 'standard';
export type MotionPreset = 'off' | 'light' | 'smooth' | 'slow';

export interface MotionPreferences {
  preset: MotionPreset;
  hoverEffects: boolean;
  panelTransitions: boolean;
  modalAnimations: boolean;
  smoothScroll: boolean;
  buttonFeedback: boolean;
  respectReducedMotion: boolean;
}

export interface AppearanceSettings {
  themeMode: ThemeMode;
  accentColorId: AccentColorId;
  customAccentHex: string;
  themePresetId: WorkspaceThemePresetId;
  surfaceStyle: SurfaceStyleId;
  cornerRadius: CornerRadiusPreset;
  shadowStyle: ShadowStylePreset;
  uiFont: UiFontFamily;
  uiFontScale: number; // 90 | 100 | 110 | 120
  uiDensity: UiDensity;
  sidebarBehavior: SidebarBehavior;
  showModuleNames: boolean;
  showModuleIcons: boolean;
  motionMode: MotionMode;
  respectReducedMotion: boolean;
  motionPreferences?: MotionPreferences;
}

// ---------------- II. SOẠN GIẢNG (AUTHORING) ----------------
export type ReaderFontFamily = 'Lora' | 'Merriweather' | 'Noto Serif' | 'Georgia';
export type ReaderLineHeight = 1.55 | 1.75 | 1.9;
export type ReaderPageWidth = 680 | 760 | 860;
export type StartupLessonBehavior = 'recent' | 'dashboard' | 'ask';
export type DefaultModuleAfterOpen = 'workspace' | 'dashboard' | 'khbd' | 'remember';

export interface AuthoringSettings {
  autosaveEnabled: boolean;
  autosaveDelaySec: number; // 0.5 | 1 | 2 | 5
  showSaveStatusTopBar: boolean;
  notifyOnSaveFailure: boolean;
  readerFont: ReaderFontFamily;
  readerFontSize: number; // 16 to 22
  readerLineHeight: ReaderLineHeight;
  readerPageWidth: ReaderPageWidth;
  rememberReaderPosition: boolean;
  rememberLastActiveTab: boolean;
  defaultFocusMode: boolean;
  focusModeConfig: {
    hideSidebar: boolean;
    hideAnalysisPanel: boolean;
    hideTopBar: boolean;
    keepSelectionToolbar: boolean;
  };
  confirmBeforeDelete: {
    lesson: boolean;
    question: boolean;
    slide: boolean;
    rubric: boolean;
    annotation: boolean;
  };
  quickUndoEnabled: boolean;
  startupLessonBehavior: StartupLessonBehavior;
  defaultModuleAfterOpen: DefaultModuleAfterOpen;
}

// ---------------- III. TRÌNH CHIẾU (PRESENTATION) ----------------
export type SlideAccentMode = 'theme' | 'burgundy' | 'amber' | 'forest' | 'navy' | 'custom';
export type SlideTransitionMode = 'none' | 'fade' | 'slide';
export type SlideTransitionSpeed = 'fast' | 'normal' | 'slow';
export type SpeakerNotesSize = 'small' | 'medium' | 'large';

export interface PresentationSettings {
  defaultThemeId: string;
  slideAccentMode: SlideAccentMode;
  slideCustomAccent: string;
  defaultTitleFont: string;
  defaultBodyFont: string;
  defaultQuoteFont: string;
  defaultTitleSize: number;
  defaultBodySize: number;
  defaultQuoteSize: number;
  defaultBgType: 'theme' | 'solid' | 'gradient' | 'image';
  defaultBgColor: string;
  defaultBgGradientId: string;
  defaultOverlayOpacity: number;
  slideTransition: SlideTransitionMode;
  slideTransitionSpeed: SlideTransitionSpeed;
  quizResetOnSlideChange: boolean;
  quizShowCorrectOnWrong: boolean;
  quizShowExplanation: boolean;
  speakerNotesInPresenter: boolean;
  speakerNotesFontSize: SpeakerNotesSize;
  useSpaceToAdvance: boolean;
  presenterDualScreen: boolean;
}

// ---------------- IV. XUẤT TÀI LIỆU (EXPORT) ----------------
export type ImageExportQuality = 'low' | 'balanced' | 'high';
export type FilenamePatternPreset = 'title_type' | 'title_type_date' | 'author_title_type' | 'custom';

export interface ExportSettings {
  defaultFormatKhbd: 'docx' | 'pdf';
  defaultFormatExam: 'docx' | 'pdf';
  defaultFormatSlide: 'pptx' | 'html' | 'pdf';
  defaultFormatRubric: 'docx' | 'pdf';
  imageQuality: ImageExportQuality;
  filenamePattern: FilenamePatternPreset;
  customFilenamePattern: string;
  sanitizeFilenames: boolean;
  filenameSpaceChar: '-' | '_' | ' ';
  includeSpeakerNotes: boolean;
  exportNotificationDetail: boolean;
  autoIncludeMetadata: boolean;
  adminMetadata: {
    department: string;
    school: string;
    teacherName: string;
    subjectGroup: string;
  };
}

// ---------------- V. DỮ LIỆU & LƯU TRỮ (DATA & STORAGE) ----------------
export type BackupReminderInterval = 'none' | 'weekly' | 'monthly';

export interface DataStorageSettings {
  backupReminderInterval: BackupReminderInterval;
  lastBackupTimestamp: string | null;
  backupBeforeRestore: boolean;
}

// ---------------- VI. TRỢ GIÚP & HỆ THỐNG (HELP & SYSTEM) ----------------
export interface HelpSettings {
  enableContextTips: boolean;
  enableShortcuts: boolean;
  tourProgress: Record<string, boolean>;
}

// ---------------- TOÀN BỘ CẤU HÌNH WORKSPACE ----------------
export interface WorkspaceSettings {
  appearance: AppearanceSettings;
  authoring: AuthoringSettings;
  presentation: PresentationSettings;
  export: ExportSettings;
  data: DataStorageSettings;
  help: HelpSettings;
}
