import React, { useState, useEffect, useMemo } from 'react';
import { 
  Palette, 
  BookOpen, 
  Presentation, 
  FileText, 
  Database, 
  HelpCircle, 
  X, 
  RotateCcw, 
  Check, 
  CheckCircle2, 
  Upload, 
  Download, 
  Trash2, 
  Sparkles, 
  Keyboard, 
  Search, 
  Copy, 
  AlertTriangle, 
  ExternalLink,
  Sliders,
  Type,
  Layout,
  Layers,
  ShieldCheck,
  Eye,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { 
  WorkspaceSettings, 
  SettingsTab, 
  AccentColorId, 
  SurfaceStyleId, 
  WorkspaceThemePresetId, 
  ReaderFontFamily,
  UiFontFamily,
  MotionPreset,
  MotionPreferences
} from '../types/settings';
import { 
  DEFAULT_WORKSPACE_SETTINGS, 
  DEFAULT_MOTION_PREFERENCES,
  ACCENT_COLOR_PRESETS, 
  THEME_PRESETS_WORKSPACE, 
  SURFACE_STYLE_PRESETS, 
  SHORTCUTS_CATALOG,
  ShortcutItem
} from '../config/defaultSettings';
import { 
  applyWorkspaceSettingsToDom, 
  getAccentScale, 
  calculateStorageUsage, 
  cleanTemporaryData, 
  generateDiagnosticInfo,
  exportCompleteStateJson,
  parseAndValidateRestoreJson,
  StorageReport
} from '../utils/themeManager';
import { AppState, LessonPlan5512 } from '../types';
import { validateHexColor, normalizeHex } from '../utils/slideStyleUtils';
import { normalizeVietnamese } from '../utils/unicode';

interface PersonalWorkspaceCenterProps {
  isOpen: boolean;
  onClose: () => void;
  appState: AppState;
  onUpdateSettings: (settings: WorkspaceSettings) => void;
  onUpdateKhbdInfo?: (patch: Partial<LessonPlan5512['info']>) => void;
  onTriggerTour?: () => void;
  onOpenAbout?: () => void;
}

export const PersonalWorkspaceCenter: React.FC<PersonalWorkspaceCenterProps> = ({
  isOpen,
  onClose,
  appState,
  onUpdateSettings,
  onUpdateKhbdInfo,
  onTriggerTour,
  onOpenAbout
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');
  const [settings, setSettings] = useState<WorkspaceSettings>(
    appState.workspaceSettings || DEFAULT_WORKSPACE_SETTINGS
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [storageReport, setStorageReport] = useState<StorageReport>(calculateStorageUsage());
  const [shortcutQuery, setShortcutQuery] = useState('');
  const [restoreJsonText, setRestoreJsonText] = useState('');
  const [restoreError, setRestoreError] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [previewTab, setPreviewTab] = useState<'intro' | 'details'>('intro');
  const [previewLiked, setPreviewLiked] = useState(false);

  // Sync state if appState changes
  useEffect(() => {
    if (appState.workspaceSettings) {
      setSettings(appState.workspaceSettings);
    }
  }, [appState.workspaceSettings]);

  // Recalculate storage when opening Data tab
  useEffect(() => {
    if (activeTab === 'data') {
      setStorageReport(calculateStorageUsage());
    }
  }, [activeTab]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdate = (updater: (prev: WorkspaceSettings) => WorkspaceSettings) => {
    setSettings(prev => {
      const next = updater(prev);
      applyWorkspaceSettingsToDom(next);
      onUpdateSettings(next);
      return next;
    });
  };

  const handleApplyThemePreset = (presetId: WorkspaceThemePresetId) => {
    const preset = THEME_PRESETS_WORKSPACE.find(p => p.id === presetId);
    if (!preset) return;
    handleUpdate(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        themePresetId: preset.id,
        accentColorId: preset.accentId,
        customAccentHex: preset.accentHex,
        surfaceStyle: preset.surfaceId
      },
      authoring: {
        ...prev.authoring,
        readerFont: preset.readerFont
      }
    }));
    showToast(`Đã áp dụng trọn gói chủ đề "${preset.name}"!`);
  };

  const handleResetToDefault = () => {
    handleUpdate(() => DEFAULT_WORKSPACE_SETTINGS);
    showToast('Đã khôi phục toàn bộ cài đặt về mặc định của hệ thống.');
  };

  const handleCleanCache = () => {
    const freed = cleanTemporaryData();
    setStorageReport(calculateStorageUsage());
    showToast(`Đã dọn dẹp ${Math.round(freed / 1024)} KB dữ liệu tạm thời!`);
  };

  const handleCopyDiagnostics = () => {
    const diag = generateDiagnosticInfo(appState, settings);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(diag);
      showToast('Đã sao chép thông tin chẩn đoán hệ thống vào clipboard!');
    }
  };

  const filteredShortcuts = useMemo(() => {
    if (!shortcutQuery.trim()) return SHORTCUTS_CATALOG;
    const q = shortcutQuery.toLowerCase();
    return SHORTCUTS_CATALOG.filter(s => 
      s.key.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    );
  }, [shortcutQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 anim-modal-backdrop">
      <div 
        className="bg-white rounded-3xl border border-[#E5E0DA] shadow-2xl max-w-5xl w-full h-[90vh] max-h-[820px] flex flex-col md:flex-row overflow-hidden relative modal-motion-enter"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-dialog-title"
      >
        {/* ======================================================== */}
        {/* LEFT NAVIGATION COLUMN (PERSONAL WORKSPACE CENTER HUB)   */}
        {/* ======================================================== */}
        <div className="w-full md:w-64 lg:w-72 shrink-0 bg-[#FAF9F7] border-b md:border-b-0 md:border-r border-[#EEEAE5] p-3 md:p-4 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#EEEAE5]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FCF3F4] text-[#7A2938] border border-[#7A2938]/20 flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h2 id="settings-dialog-title" className="text-card-title text-[#211E1C] font-semibold leading-tight">
                    Cài đặt Không gian
                  </h2>
                  <span className="text-[11px] text-[#706A65]">Personal Workspace Center</span>
                </div>
              </div>
            </div>

            {/* Nav Tabs List */}
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('appearance')}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'appearance'
                    ? 'bg-white text-[#7A2938] shadow-xs border border-[#E5E0DA]'
                    : 'text-[#57534E] hover:bg-white/60 hover:text-[#211E1C]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Palette className={`w-4 h-4 ${activeTab === 'appearance' ? 'text-[#7A2938]' : 'text-stone-400'}`} />
                  <span>1. Giao diện & Màu sắc</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('authoring')}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'authoring'
                    ? 'bg-white text-[#7A2938] shadow-xs border border-[#E5E0DA]'
                    : 'text-[#57534E] hover:bg-white/60 hover:text-[#211E1C]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className={`w-4 h-4 ${activeTab === 'authoring' ? 'text-[#7A2938]' : 'text-stone-400'}`} />
                  <span>2. Soạn giảng & Reader</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('presentation')}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'presentation'
                    ? 'bg-white text-[#7A2938] shadow-xs border border-[#E5E0DA]'
                    : 'text-[#57534E] hover:bg-white/60 hover:text-[#211E1C]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Presentation className={`w-4 h-4 ${activeTab === 'presentation' ? 'text-[#7A2938]' : 'text-stone-400'}`} />
                  <span>3. Trình chiếu Slide</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('export')}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'export'
                    ? 'bg-white text-[#7A2938] shadow-xs border border-[#E5E0DA]'
                    : 'text-[#57534E] hover:bg-white/60 hover:text-[#211E1C]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className={`w-4 h-4 ${activeTab === 'export' ? 'text-[#7A2938]' : 'text-stone-400'}`} />
                  <span>4. Xuất tài liệu & Giáo viên</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('data')}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'data'
                    ? 'bg-white text-[#7A2938] shadow-xs border border-[#E5E0DA]'
                    : 'text-[#57534E] hover:bg-white/60 hover:text-[#211E1C]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Database className={`w-4 h-4 ${activeTab === 'data' ? 'text-[#7A2938]' : 'text-stone-400'}`} />
                  <span>5. Dữ liệu & Lưu trữ</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('help')}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'help'
                    ? 'bg-white text-[#7A2938] shadow-xs border border-[#E5E0DA]'
                    : 'text-[#57534E] hover:bg-white/60 hover:text-[#211E1C]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className={`w-4 h-4 ${activeTab === 'help' ? 'text-[#7A2938]' : 'text-stone-400'}`} />
                  <span>6. Phím tắt & Trợ giúp</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Reset All Footer Button */}
          <div className="pt-3 border-t border-[#EEEAE5] shrink-0 mt-4">
            <button
              onClick={handleResetToDefault}
              className="w-full py-2 px-3 rounded-xl border border-stone-300 hover:bg-white text-stone-600 hover:text-stone-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
              <span>Khôi phục mặc định</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT MAIN PANEL (ACTIVE TAB CONTENT)                    */}
        {/* ======================================================== */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          {/* Header */}
          <div className="p-4 md:p-5 border-b border-[#EEEAE5] flex items-center justify-between shrink-0">
            <div>
              <h3 className="text-section font-semibold text-[#211E1C]">
                {activeTab === 'appearance' && 'Tùy biến Giao diện & Màu sắc'}
                {activeTab === 'authoring' && 'Cấu hình Soạn giảng & Trải nghiệm Đọc'}
                {activeTab === 'presentation' && 'Thiết lập Mặc định Trình chiếu Slide'}
                {activeTab === 'export' && 'Quy chuẩn Xuất bản & Hồ sơ Giáo viên'}
                {activeTab === 'data' && 'Bảo vệ Dữ liệu & Quản lý Bộ nhớ'}
                {activeTab === 'help' && 'Trung tâm Trợ giúp, Hướng dẫn & Phím tắt'}
              </h3>
              <p className="text-xs text-[#706A65] mt-0.5">
                {activeTab === 'appearance' && 'Cá nhân hóa tông màu, độ ấm bề mặt, phông chữ và cảm xúc không gian làm việc.'}
                {activeTab === 'authoring' && 'Tối ưu tốc độ tự động lưu, kích thước trang đọc tác phẩm và cơ chế an toàn thao tác.'}
                {activeTab === 'presentation' && 'Quy định phông chữ, chủ đề và hành vi tương tác mặc định khi trình chiếu trên lớp.'}
                {activeTab === 'export' && 'Cài đặt thông tin hành chính của giáo viên và quy tắc tự động đặt tên tệp xuất ra.'}
                {activeTab === 'data' && 'Tạo bản sao lưu an toàn, dọn dẹp dung lượng tạm và kiểm tra sức khỏe bộ nhớ.'}
                {activeTab === 'help' && 'Khởi động lại tour hướng dẫn các module, tra cứu phím tắt và sao chép thông tin chẩn đoán.'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition cursor-pointer"
              title="Đóng cài đặt (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Body Scrollable */}
          <div key={activeTab} className="workspace-view-enter flex-1 overflow-y-auto p-4 md:p-6 panel-scroll space-y-6 text-meta text-[#302C29]">
            {/* ---------------------------------------------------- */}
            {/* TAB 1: GIAO DIỆN                                     */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                {/* 6 Theme Presets */}
                <div>
                  <label className="block text-xs font-semibold text-[#211E1C] uppercase tracking-wider mb-2">
                    6 CHỦ ĐỀ TRỌN GÓI HỌC THUẬT (THEME PRESETS)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {THEME_PRESETS_WORKSPACE.map(preset => {
                      const isSelected = settings.appearance.themePresetId === preset.id;
                      return (
                        <div
                          key={preset.id}
                          onClick={() => handleApplyThemePreset(preset.id)}
                          className={`p-3 rounded-2xl border motion-surface cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#7A2938] ring-2 ring-[#7A2938]/15 bg-[#FCF3F4]/50 shadow-xs'
                              : 'border-[#E5E0DA] hover:border-[#D6D0C8] bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-semibold text-xs text-[#211E1C]">{preset.name}</span>
                              <span 
                                className="w-3.5 h-3.5 rounded-full border border-black/20" 
                                style={{ backgroundColor: preset.accentHex }}
                              />
                            </div>
                            <p className="text-[11px] text-[#706A65] leading-relaxed">
                              {preset.description}
                            </p>
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-[#EEEAE5] flex items-center justify-between text-[11px]">
                            <span className="font-mono text-stone-500">{preset.readerFont}</span>
                            {isSelected && <span className="font-bold text-[#7A2938]">✓ Đang dùng</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Accent Color Palette */}
                <div className="pt-4 border-t border-[#EEEAE5]">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-[#211E1C] uppercase tracking-wider">
                      MÀU NHẤN CÁ NHÂN (ACCENT COLOR)
                    </label>
                    <span className="text-[11px] text-[#706A65]">Không làm thay đổi màu cảnh báo ngữ nghĩa</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    {ACCENT_COLOR_PRESETS.map(preset => {
                      const isSelected = settings.appearance.accentColorId === preset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => handleUpdate(prev => ({
                            ...prev,
                            appearance: {
                              ...prev.appearance,
                              accentColorId: preset.id,
                              customAccentHex: preset.hex
                            }
                          }))}
                          className={`p-2.5 rounded-xl border flex items-center gap-2 text-left transition cursor-pointer ${
                            isSelected
                              ? 'border-[#7A2938] ring-2 ring-[#7A2938]/15 bg-[#FCF3F4]/60'
                              : 'border-[#E5E0DA] hover:border-[#D6D0C8] bg-white'
                          }`}
                        >
                          <span 
                            className="w-4 h-4 rounded-full border border-black/20 shrink-0 shadow-xs" 
                            style={{ backgroundColor: preset.hex }} 
                          />
                          <span className="text-xs font-medium text-[#211E1C] truncate">{preset.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Hex Picker */}
                  <div className="p-3 bg-[#FAF9F7] rounded-xl border border-[#EEEAE5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={normalizeHex(settings.appearance.customAccentHex, '#7A2938')}
                        onChange={(e) => handleUpdate(prev => ({
                          ...prev,
                          appearance: {
                            ...prev.appearance,
                            accentColorId: 'custom',
                            customAccentHex: e.target.value
                          }
                        }))}
                        className="w-9 h-8 rounded-lg border border-stone-300 bg-white cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-semibold text-[#211E1C] block">Mã màu tùy chỉnh</span>
                        <span className="text-[11px] text-[#706A65]">Hệ thống tự động sinh dải Hover & Soft Tint</span>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={settings.appearance.customAccentHex}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (validateHexColor(val)) {
                          handleUpdate(prev => ({
                            ...prev,
                            appearance: {
                              ...prev.appearance,
                              accentColorId: 'custom',
                              customAccentHex: val
                            }
                          }));
                        } else {
                          setSettings(prev => ({
                            ...prev,
                            appearance: { ...prev.appearance, customAccentHex: val }
                          }));
                        }
                      }}
                      placeholder="#7A2938"
                      className="w-28 px-3 py-1.5 border border-stone-300 rounded-lg bg-white text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Surface Style & Corner Radius */}
                <div className="pt-4 border-t border-[#EEEAE5] grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#211E1C] uppercase tracking-wider mb-2">
                      NỀN GIAO DIỆN (SURFACE STYLE)
                    </label>
                    <div className="space-y-1.5">
                      {SURFACE_STYLE_PRESETS.map(s => (
                        <label 
                          key={s.id}
                          className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                            settings.appearance.surfaceStyle === s.id
                              ? 'border-[#7A2938] bg-[#FCF3F4]/50'
                              : 'border-[#E5E0DA] hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="surfaceStyle"
                              checked={settings.appearance.surfaceStyle === s.id}
                              onChange={() => handleUpdate(prev => ({
                                ...prev,
                                appearance: { ...prev.appearance, surfaceStyle: s.id }
                              }))}
                              className="accent-[#7A2938]"
                            />
                            <div>
                              <div className="text-xs font-semibold text-[#211E1C]">{s.name}</div>
                              <div className="text-[11px] text-[#706A65]">{s.description}</div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#211E1C] uppercase tracking-wider mb-2">
                        BO GÓC NÚT & THẺ
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['compact', 'balanced', 'soft'] as const).map(rad => (
                          <button
                            key={rad}
                            onClick={() => handleUpdate(prev => ({
                              ...prev,
                              appearance: { ...prev.appearance, cornerRadius: rad }
                            }))}
                            className={`py-2 px-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                              settings.appearance.cornerRadius === rad
                                ? 'bg-[#7A2938] text-white border-[#7A2938]'
                                : 'bg-white hover:bg-stone-50 border-stone-300 text-stone-700'
                            }`}
                          >
                            {rad === 'compact' && 'Gọn (6-8px)'}
                            {rad === 'balanced' && 'Cân bằng (10-12px)'}
                            {rad === 'soft' && 'Mềm (14-16px)'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#211E1C] uppercase tracking-wider mb-2">
                        PHÔNG CHỮ GIAO DIỆN (UI FONT)
                      </label>
                      <select
                        aria-label="Phông chữ giao diện"
                        value={settings.appearance.uiFont}
                        onChange={(e) => handleUpdate(prev => ({
                          ...prev,
                          appearance: { ...prev.appearance, uiFont: e.target.value as UiFontFamily }
                        }))}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white text-xs font-medium"
                      >
                        <option value="Be Vietnam Pro">Be Vietnam Pro (Tối ưu Unicode tiếng Việt)</option>
                        <option value="Inter">Inter (Tinh tế, hiện đại)</option>
                        <option value="Noto Sans">Noto Sans (Chuẩn mực)</option>
                        <option value="System Default">Mặc định hệ điều hành (System Default)</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-[#211E1C] uppercase tracking-wider">CỠ CHỮ GIAO DIỆN</span>
                        <span className="font-bold font-mono text-[#7A2938]">{settings.appearance.uiFontScale}%</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[90, 100, 110, 120].map(sc => (
                          <button
                            key={sc}
                            onClick={() => handleUpdate(prev => ({
                              ...prev,
                              appearance: { ...prev.appearance, uiFontScale: sc }
                            }))}
                            className={`py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                              settings.appearance.uiFontScale === sc
                                ? 'bg-[#7A2938] text-white border-[#7A2938]'
                                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                            }`}
                          >
                            {sc}%
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Motion & Interaction Settings (Tuân thủ design_animation_guid.md) */}
                {(() => {
                  const currentMotion: MotionPreferences = settings.appearance.motionPreferences || DEFAULT_MOTION_PREFERENCES;
                  const handleUpdateMotion = (patch: Partial<MotionPreferences>) => {
                    const updatedMotion: MotionPreferences = {
                      ...currentMotion,
                      ...patch
                    };
                    const modeMapping: Record<MotionPreset, 'none' | 'subtle' | 'standard'> = {
                      off: 'none',
                      light: 'subtle',
                      smooth: 'standard',
                      slow: 'standard'
                    };
                    handleUpdate(prev => ({
                      ...prev,
                      appearance: {
                        ...prev.appearance,
                        motionPreferences: updatedMotion,
                        motionMode: modeMapping[updatedMotion.preset],
                        respectReducedMotion: updatedMotion.respectReducedMotion
                      }
                    }));
                  };

                  return (
                    <div className="pt-5 border-t border-[#EEEAE5] space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold text-[#211E1C] block uppercase tracking-wider">
                            CHUYỂN ĐỘNG & TƯƠNG TÁC (MOTION & INTERACTIONS)
                          </span>
                          <span className="text-[11px] text-[#706A65]">
                            Điều chỉnh nhịp độ chuyển cảnh, hiệu ứng nổi bật (hover) và cảm giác chiều sâu toàn không gian làm việc
                          </span>
                        </div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#FAF9F7] border border-[#E5E0DA] text-[#7A2938] font-semibold">
                          Preset: {currentMotion.preset === 'off' ? 'Tắt (0ms)' : currentMotion.preset === 'light' ? 'Nhẹ (140–180ms)' : currentMotion.preset === 'smooth' ? 'Mượt (180–240ms)' : 'Chậm & êm (240–320ms)'}
                        </span>
                      </div>

                      {/* 4 Motion Presets */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {[
                          {
                            id: 'off' as MotionPreset,
                            label: 'Tắt',
                            speed: '0ms',
                            desc: 'Gần như không animation, tối ưu máy cấu hình thấp hoặc nhạy cảm chuyển động'
                          },
                          {
                            id: 'light' as MotionPreset,
                            label: 'Nhẹ',
                            speed: '140–180ms',
                            desc: 'Chuyển động vi mô nhanh gọn, chủ yếu đổi màu và độ mờ êm ái'
                          },
                          {
                            id: 'smooth' as MotionPreset,
                            label: 'Mượt (Chuẩn)',
                            speed: '180–240ms',
                            desc: 'Thiết lập mặc định: fade + nâng nhẹ, phản hồi nhanh nhạy cho việc dạy'
                          },
                          {
                            id: 'slow' as MotionPreset,
                            label: 'Chậm & êm',
                            speed: '240–320ms',
                            desc: 'Chuyển động điện ảnh sâu lắng, easing mềm mại, không gây cảm giác giật'
                          }
                        ].map(p => {
                          const isSelected = currentMotion.preset === p.id;
                          return (
                            <button
                              type="button"
                              aria-label={`Chuyển động: ${p.label}`}
                              aria-pressed={isSelected}
                              key={p.id}
                              onClick={() => handleUpdateMotion({ preset: p.id })}
                              className={`p-3 rounded-2xl border motion-surface cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? 'border-[#7A2938] ring-2 ring-[#7A2938]/15 bg-[#FCF3F4]/60 shadow-xs'
                                  : 'border-[#E5E0DA] hover:border-[#D6D0C8] bg-white'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-semibold text-xs text-[#211E1C]">{p.label}</span>
                                  <span className="text-[10px] font-mono text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                                    {p.speed}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#706A65] leading-relaxed">
                                  {p.desc}
                                </p>
                              </div>
                              <div className="mt-2 pt-2 border-t border-[#EEEAE5] flex items-center justify-between text-[11px]">
                                <span className="text-stone-400">Tốc độ</span>
                                {isSelected ? (
                                  <span className="font-bold text-[#7A2938]">✓ Đang chọn</span>
                                ) : (
                                  <span className="text-stone-400 hover:text-stone-700">Chọn</span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <p className="text-xs text-[#706A65] leading-relaxed">
                        Thời gian trên dành cho chuyển cảnh và cửa sổ. Hover chậm theo mức đã chọn; click giữ phản hồi nhanh;
                        thay đổi được áp dụng và lưu ngay. Nếu bật Giảm chuyển động trên thiết bị, hiệu ứng sẽ tắt khi chọn tôn trọng cài đặt này.
                      </p>

                      {/* Granular Feature Toggles */}
                      <div className="p-3.5 bg-[#FAF9F7] rounded-2xl border border-[#EEEAE5] space-y-2.5">
                        <span className="text-[11px] font-semibold text-[#211E1C] uppercase tracking-wider block">
                          CHI TIẾT CÁC HIỆU ỨNG ÁP DỤNG
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-white transition">
                            <input
                              type="checkbox"
                              checked={currentMotion.hoverEffects}
                              onChange={(e) => handleUpdateMotion({ hoverEffects: e.target.checked })}
                              className="w-4 h-4 accent-[#7A2938] cursor-pointer"
                            />
                            <span className="text-[#302C29]">Hiệu ứng hover mềm mại (nâng nhẹ thẻ & nút)</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-white transition">
                            <input
                              type="checkbox"
                              checked={currentMotion.panelTransitions}
                              onChange={(e) => handleUpdateMotion({ panelTransitions: e.target.checked })}
                              className="w-4 h-4 accent-[#7A2938] cursor-pointer"
                            />
                            <span className="text-[#302C29]">Chuyển cảnh giữa các panel & tab nội dung</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-white transition">
                            <input
                              type="checkbox"
                              checked={currentMotion.modalAnimations}
                              onChange={(e) => handleUpdateMotion({ modalAnimations: e.target.checked })}
                              className="w-4 h-4 accent-[#7A2938] cursor-pointer"
                            />
                            <span className="text-[#302C29]">Animation khi mở modal & ngăn kéo (drawer)</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-white transition">
                            <input
                              type="checkbox"
                              checked={currentMotion.smoothScroll}
                              onChange={(e) => handleUpdateMotion({ smoothScroll: e.target.checked })}
                              className="w-4 h-4 accent-[#7A2938] cursor-pointer"
                            />
                            <span className="text-[#302C29]">Cuộn trang mượt mà (smooth scroll)</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-white transition sm:col-span-2">
                            <input
                              type="checkbox"
                              checked={currentMotion.buttonFeedback}
                              onChange={(e) => handleUpdateMotion({ buttonFeedback: e.target.checked })}
                              className="w-4 h-4 accent-[#7A2938] cursor-pointer"
                            />
                            <span className="text-[#302C29]">Hiệu ứng nén nhẹ phản hồi khi click nút (click feedback)</span>
                          </label>
                        </div>

                        {/* Reduced Motion System Preference Guard */}
                        <div className="pt-2.5 border-t border-[#EEEAE5] flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-[#211E1C] block">Tôn trọng cài đặt Giảm chuyển động (Reduced Motion)</span>
                            <span className="text-[11px] text-[#706A65]">Tự động tắt chuyển động nếu hệ điều hành hoặc trình duyệt bật chế độ này</span>
                          </div>
                          <input
                            type="checkbox"
                            aria-label="Tôn trọng cài đặt Giảm chuyển động"
                            checked={currentMotion.respectReducedMotion}
                            onChange={(e) => handleUpdateMotion({ respectReducedMotion: e.target.checked })}
                            className="w-4 h-4 accent-[#7A2938] cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Interactive Live Motion Preview Sandbox (Mục 27 design_animation_guid.md) */}
                      <div className="p-4 bg-white rounded-2xl border border-[#E5E0DA] shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#7A2938]" />
                            <span className="text-xs font-semibold text-[#211E1C]">XEM THỬ CẢM GIÁC CHUYỂN ĐỘNG TRỰC TIẾP</span>
                          </div>
                          <span className="text-[11px] text-[#706A65]">Rê chuột và bấm thử bên dưới để cảm nhận nhịp độ</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                          {/* Sample Interactive Card */}
                          <div className="card-interactive p-3.5 bg-[#FAF9F7] rounded-xl border border-[#E5E0DA] cursor-pointer select-none">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-semibold text-[#211E1C]">Thẻ bài giảng mẫu (Hover thử)</span>
                              <span className="text-[10px] text-[#7A2938] font-bold bg-[#FCF3F4] px-1.5 py-0.5 rounded">Thơ Đường luật</span>
                            </div>
                            <p className="text-[11px] text-[#706A65] leading-relaxed">
                              Rê chuột qua thẻ này để cảm nhận độ nâng êm ái (translateY) và viền Bordeaux mềm mại.
                            </p>
                          </div>

                          {/* Interactive Controls Sandbox */}
                          <div className="flex flex-col gap-2.5">
                            <div className="flex items-center gap-2">
                              <button 
                                type="button" 
                                className="btn-primary flex-1 text-xs py-2"
                              >
                                Hover & Bấm thử
                              </button>
                              <button
                                type="button"
                                onClick={() => setPreviewLiked(prev => !prev)}
                                className="btn-icon-motion p-2.5 rounded-xl border border-[#E5E0DA] bg-[#FAF9F7] text-stone-700 hover:text-[#7A2938] hover:border-[#7A2938]/30 cursor-pointer"
                                title="Bấm thử hiệu ứng icon button"
                              >
                                <Sparkles className={`w-4 h-4 ${previewLiked ? 'text-[#7A2938] fill-[#7A2938]' : ''}`} />
                              </button>
                            </div>

                            {/* Mini Tab switcher preview */}
                            <div className="bg-[#FAF9F7] p-1 rounded-xl border border-[#EEEAE5] flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setPreviewTab('intro')}
                                className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                                  previewTab === 'intro' ? 'bg-white text-[#7A2938] shadow-2xs' : 'text-stone-500 hover:text-stone-800'
                                }`}
                              >
                                Tab 1 (Tổng quan)
                              </button>
                              <button
                                type="button"
                                onClick={() => setPreviewTab('details')}
                                className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                                  previewTab === 'details' ? 'bg-white text-[#7A2938] shadow-2xs' : 'text-stone-500 hover:text-stone-800'
                                }`}
                              >
                                Tab 2 (Chi tiết)
                              </button>
                            </div>

                            <div key={previewTab} className="text-[11px] text-stone-600 px-1 panel-fade-enter">
                              {previewTab === 'intro' ? (
                                <span>✓ Đang mở Tab 1: Cảm giác lướt êm ái không giật cục.</span>
                              ) : (
                                <span>✓ Đang mở Tab 2: Hiệu ứng chuyển động có chiều sâu học thuật.</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 2: SOẠN GIẢNG                                    */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'authoring' && (
              <div className="space-y-6">
                {/* Autosave Controls */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-semibold text-[#211E1C] block uppercase tracking-wider">
                        QUY TẮC TỰ ĐỘNG LƯU (AUTOSAVE)
                      </span>
                      <span className="text-[11px] text-[#706A65]">
                        Tự động ghi lại các chỉnh sửa vào bộ nhớ máy tính mà không cần nhấn lưu thủ công
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.authoring.autosaveEnabled}
                      onChange={(e) => handleUpdate(prev => ({
                        ...prev,
                        authoring: { ...prev.authoring, autosaveEnabled: e.target.checked }
                      }))}
                      className="w-5 h-5 accent-[#7A2938] cursor-pointer"
                    />
                  </div>

                  {settings.authoring.autosaveEnabled && (
                    <div className="p-3 bg-[#FAF9F7] rounded-xl border border-[#EEEAE5] flex items-center justify-between text-xs mt-2">
                      <span className="text-[#302C29]">Thời gian chờ sau khi ngừng nhập:</span>
                      <div className="flex items-center gap-1.5">
                        {[0.5, 1, 2, 5].map(sec => (
                          <button
                            key={sec}
                            onClick={() => handleUpdate(prev => ({
                              ...prev,
                              authoring: { ...prev.authoring, autosaveDelaySec: sec }
                            }))}
                            className={`py-1 px-2.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                              settings.authoring.autosaveDelaySec === sec
                                ? 'bg-[#7A2938] text-white border-[#7A2938]'
                                : 'bg-white text-stone-700 border-stone-300'
                            }`}
                          >
                            {sec}s
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Reader Typography Customization */}
                <div className="pt-4 border-t border-[#EEEAE5]">
                  <label className="block text-xs font-semibold text-[#211E1C] uppercase tracking-wider mb-2">
                    VÙNG ĐỌC TÁC PHẨM (LITERATURE READER TYPOGRAPHY)
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">Phông chữ đọc</label>
                      <select
                        aria-label="Phông chữ đọc"
                        value={settings.authoring.readerFont}
                        onChange={(e) => handleUpdate(prev => ({
                          ...prev,
                          authoring: { ...prev.authoring, readerFont: e.target.value as ReaderFontFamily }
                        }))}
                        className="w-full px-2.5 py-1.5 border border-stone-300 rounded-xl bg-white text-xs"
                      >
                        <option value="Lora">Lora (Khuyên dùng)</option>
                        <option value="Merriweather">Merriweather (Dày dặn)</option>
                        <option value="Georgia">Georgia (Thanh thoát)</option>
                        <option value="Noto Serif">Noto Serif (Chuẩn mực)</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-medium text-stone-600 mb-1">
                        <span>Cỡ chữ văn bản</span>
                        <span className="font-bold text-[#7A2938]">{settings.authoring.readerFontSize}px</span>
                      </div>
                      <input
                        type="range"
                        min={16}
                        max={22}
                        value={settings.authoring.readerFontSize}
                        onChange={(e) => handleUpdate(prev => ({
                          ...prev,
                          authoring: { ...prev.authoring, readerFontSize: parseInt(e.target.value) }
                        }))}
                        className="w-full accent-[#7A2938] cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">Chiều rộng trang đọc</label>
                      <select
                        value={settings.authoring.readerPageWidth}
                        onChange={(e) => handleUpdate(prev => ({
                          ...prev,
                          authoring: { ...prev.authoring, readerPageWidth: parseInt(e.target.value) as any }
                        }))}
                        className="w-full px-2.5 py-1.5 border border-stone-300 rounded-xl bg-white text-xs"
                      >
                        <option value={680}>Hẹp (680px)</option>
                        <option value={760}>Cân đối (760px)</option>
                        <option value={860}>Rộng (860px)</option>
                      </select>
                    </div>
                  </div>

                  {/* Sample poem reading preview */}
                  <div 
                    className="p-4 rounded-xl border border-stone-200 bg-[#FFFEFC] shadow-2xs space-y-2"
                    style={{
                      fontFamily: `"${settings.authoring.readerFont}", Georgia, serif`,
                      fontSize: `${settings.authoring.readerFontSize}px`,
                      lineHeight: settings.authoring.readerLineHeight
                    }}
                  >
                    <div className="text-xs uppercase tracking-wider text-amber-800 font-sans font-semibold mb-1">
                      XEM TRƯỚC VĂN BẢN TRÍCH ĐOẠN
                    </div>
                    <p className="italic text-[#302C29]">
                      “Sông Mã xa rồi Tây Tiến ơi!<br />
                      Nhớ về rừng núi, nhớ chơi vơi.<br />
                      Sài Khao sương lấp đoàn quân mỏi,<br />
                      Mường Lát hoa về trong đêm hơi.”
                    </p>
                  </div>
                </div>

                {/* Safety Rules (Confirm before deleting) */}
                <div className="pt-4 border-t border-[#EEEAE5]">
                  <label className="block text-xs font-semibold text-[#211E1C] uppercase tracking-wider mb-2">
                    AN TOÀN THAO TÁC & BẢO VỆ DỮ LIỆU
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {(['lesson', 'question', 'slide', 'rubric'] as const).map(item => (
                      <label 
                        key={item}
                        className="p-2 border border-stone-200 rounded-xl bg-[#FAF9F7] flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={settings.authoring.confirmBeforeDelete[item]}
                          onChange={(e) => handleUpdate(prev => ({
                            ...prev,
                            authoring: {
                              ...prev.authoring,
                              confirmBeforeDelete: {
                                ...prev.authoring.confirmBeforeDelete,
                                [item]: e.target.checked
                              }
                            }
                          }))}
                          className="accent-[#7A2938]"
                        />
                        <span className="capitalize">Xác nhận xóa {item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: TRÌNH CHIẾU                                   */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'presentation' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-[#211E1C] uppercase tracking-wider mb-2">
                    CHỦ ĐỀ SLIDE MẶC ĐỊNH CHO BÀI DẠY MỚI
                  </label>
                  <select
                    value={settings.presentation.defaultThemeId}
                    onChange={(e) => handleUpdate(prev => ({
                      ...prev,
                      presentation: { ...prev.presentation, defaultThemeId: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white text-xs font-medium"
                  >
                    <option value="cinematic-literary">Điện ảnh Văn học (Tối trầm tĩnh, ánh vàng hổ phách)</option>
                    <option value="academic-burgundy">Học thuật Burgundy (Đỏ mận hàn lâm, trang trọng)</option>
                    <option value="classic-paper">Trang sách cổ điển (Màu giấy ngà, mực nâu cổ phong)</option>
                    <option value="light-editorial">Biên tập sáng (Nền ngà sáng hiện đại, chữ sắc nét)</option>
                    <option value="forest-academic">Học thuật xanh rừng (Sắc xanh rêu đại ngàn)</option>
                    <option value="night-poetry">Đêm thi ca (Lam đen huyền bí)</option>
                    <option value="sepia-literature">Văn chương Sepia (Tông màu hoài niệm)</option>
                    <option value="minimal-bw">Tối giản (Trắng đen tinh gọn, tương phản cao)</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-[#EEEAE5] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#211E1C] uppercase tracking-wider mb-2">
                      HIỆU ỨNG CHUYỂN SLIDE (TRANSITION)
                    </label>
                    <div className="flex gap-2">
                      {(['none', 'fade', 'slide'] as const).map(tr => (
                        <button
                          key={tr}
                          onClick={() => handleUpdate(prev => ({
                            ...prev,
                            presentation: { ...prev.presentation, slideTransition: tr }
                          }))}
                          className={`flex-1 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer ${
                            settings.presentation.slideTransition === tr
                              ? 'bg-[#7A2938] text-white border-[#7A2938]'
                              : 'bg-white text-stone-700 border-stone-300'
                          }`}
                        >
                          {tr === 'none' && 'Không'}
                          {tr === 'fade' && 'Fade mờ'}
                          {tr === 'slide' && 'Trượt nhẹ'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#211E1C] uppercase tracking-wider mb-2">
                      PHÍM CÁCH (SPACE)
                    </label>
                    <label className="p-2 border border-stone-200 rounded-xl bg-[#FAF9F7] flex items-center justify-between cursor-pointer">
                      <span className="text-xs">Dùng phím Space để chuyển slide</span>
                      <input
                        type="checkbox"
                        checked={settings.presentation.useSpaceToAdvance}
                        onChange={(e) => handleUpdate(prev => ({
                          ...prev,
                          presentation: { ...prev.presentation, useSpaceToAdvance: e.target.checked }
                        }))}
                        className="w-4 h-4 accent-[#7A2938]"
                      />
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EEEAE5]">
                  <label className="block text-xs font-semibold text-[#211E1C] uppercase tracking-wider mb-2">
                    TƯƠNG TÁC TRẮC NGHIỆM TRÊN LỚP (QUIZ SETTINGS)
                  </label>
                  <div className="space-y-2 text-xs">
                    <label className="p-2.5 rounded-xl border border-stone-200 bg-white flex items-center justify-between cursor-pointer">
                      <span>Tự động làm mới câu trả lời khi chuyển slide</span>
                      <input
                        type="checkbox"
                        checked={settings.presentation.quizResetOnSlideChange}
                        onChange={(e) => handleUpdate(prev => ({
                          ...prev,
                          presentation: { ...prev.presentation, quizResetOnSlideChange: e.target.checked }
                        }))}
                        className="accent-[#7A2938]"
                      />
                    </label>
                    <label className="p-2.5 rounded-xl border border-stone-200 bg-white flex items-center justify-between cursor-pointer">
                      <span>Hiển thị phần giải thích sau khi học sinh trả lời</span>
                      <input
                        type="checkbox"
                        checked={settings.presentation.quizShowExplanation}
                        onChange={(e) => handleUpdate(prev => ({
                          ...prev,
                          presentation: { ...prev.presentation, quizShowExplanation: e.target.checked }
                        }))}
                        className="accent-[#7A2938]"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: XUẤT TÀI LIỆU & THÔNG TIN GIÁO VIÊN            */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'export' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-[#211E1C] uppercase tracking-wider mb-2">
                    THÔNG TIN HÀNH CHÍNH & HỒ SƠ GIÁO VIÊN
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-stone-600 mb-1 font-medium">Sở Giáo dục & Đào tạo</label>
                      <input
                        type="text"
                        value={appState.khbd.info.department}
                        onChange={(e) => {
                          const val = normalizeVietnamese(e.target.value);
                          onUpdateKhbdInfo?.({ department: val });
                        }}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1 font-medium">Trường THPT</label>
                      <input
                        type="text"
                        value={appState.khbd.info.school}
                        onChange={(e) => {
                          const val = normalizeVietnamese(e.target.value);
                          onUpdateKhbdInfo?.({ school: val });
                        }}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1 font-medium">Giáo viên thực hiện</label>
                      <input
                        type="text"
                        value={appState.khbd.info.teacherName}
                        onChange={(e) => {
                          const val = normalizeVietnamese(e.target.value);
                          onUpdateKhbdInfo?.({ teacherName: val });
                        }}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1 font-medium">Tổ chuyên môn</label>
                      <input
                        type="text"
                        value={appState.khbd.info.subjectGroup}
                        onChange={(e) => {
                          const val = normalizeVietnamese(e.target.value);
                          onUpdateKhbdInfo?.({ subjectGroup: val });
                        }}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EEEAE5]">
                  <label className="block text-xs font-semibold text-[#211E1C] uppercase tracking-wider mb-2">
                    QUY TẮC ĐẶT TÊN TỆP XUẤT BẢN
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <button
                      onClick={() => handleUpdate(prev => ({
                        ...prev,
                        export: { ...prev.export, filenamePattern: 'title_type' }
                      }))}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer ${
                        settings.export.filenamePattern === 'title_type'
                          ? 'border-[#7A2938] bg-[#FCF3F4]/50'
                          : 'border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      <div className="font-semibold text-stone-900">Tên bài + Loại tài liệu</div>
                      <div className="font-mono text-[10px] text-stone-500 mt-0.5">TayTien_KHBD.docx</div>
                    </button>
                    <button
                      onClick={() => handleUpdate(prev => ({
                        ...prev,
                        export: { ...prev.export, filenamePattern: 'title_type_date' }
                      }))}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer ${
                        settings.export.filenamePattern === 'title_type_date'
                          ? 'border-[#7A2938] bg-[#FCF3F4]/50'
                          : 'border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      <div className="font-semibold text-stone-900">Tên bài + Loại + Ngày</div>
                      <div className="font-mono text-[10px] text-stone-500 mt-0.5">TayTien_KHBD_20261008.docx</div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                    <span>Tự động loại bỏ ký tự đặc biệt và dấu cách có hại</span>
                    <input
                      type="checkbox"
                      checked={settings.export.sanitizeFilenames}
                      onChange={(e) => handleUpdate(prev => ({
                        ...prev,
                        export: { ...prev.export, sanitizeFilenames: e.target.checked }
                      }))}
                      className="accent-[#7A2938]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 5: DỮ LIỆU & LƯU TRỮ                             */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                {/* Storage Health Mini Dashboard */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-[#211E1C] uppercase tracking-wider">
                      DUNG LƯỢNG LƯU TRỮ TRÌNH DUYỆT (STORAGE QUOTA)
                    </label>
                    <span className="text-xs font-mono font-bold text-[#7A2938]">
                      {(storageReport.totalUsedBytes / 1024).toFixed(1)} KB / {(storageReport.totalQuotaBytes / (1024 * 1024)).toFixed(1)} MB ({storageReport.percentageUsed}%)
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full h-3 rounded-full bg-stone-200 overflow-hidden mb-3">
                    <div 
                      className="h-full bg-[#7A2938] motion-progress"
                      style={{ width: `${Math.max(storageReport.percentageUsed, 3)}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="text-stone-500 block text-[10px]">Bài dạy</span>
                      <span className="font-semibold text-stone-900">{(storageReport.breakdown.lessonsBytes / 1024).toFixed(1)} KB</span>
                    </div>
                    <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="text-stone-500 block text-[10px]">Slides</span>
                      <span className="font-semibold text-stone-900">{(storageReport.breakdown.slidesBytes / 1024).toFixed(1)} KB</span>
                    </div>
                    <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="text-stone-500 block text-[10px]">Ảnh nền nén</span>
                      <span className="font-semibold text-stone-900">{(storageReport.breakdown.imagesBytes / 1024).toFixed(1)} KB</span>
                    </div>
                  </div>
                </div>

                {/* Backup & Export Actions */}
                <div className="pt-4 border-t border-[#EEEAE5] space-y-3">
                  <label className="block text-xs font-semibold text-[#211E1C] uppercase tracking-wider">
                    SAO LƯU & BẢO VỆ DỮ LIỆU
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() => {
                        exportCompleteStateJson(appState);
                        showToast('Đã tạo và tải tệp sao lưu JSON thành công!');
                      }}
                      className="btn-primary flex-1 py-2 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Tải Bản Sao Lưu Đầy Đủ (.JSON)</span>
                    </button>
                    <button
                      onClick={handleCleanCache}
                      className="py-2 px-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 text-stone-400" />
                      <span>Dọn Dữ Liệu Tạm</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 6: TRỢ GIÚP & HỆ THỐNG                           */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'help' && (
              <div className="space-y-6">
                <section className="space-y-2">
                  <h4 className="font-semibold">Giới thiệu &amp; Chủ sở hữu</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">Xem thông tin về EduMaster Văn, chủ sở hữu và thông tin liên hệ.</p>
                  <button className="btn-primary px-4 py-2" onClick={onOpenAbout}>Xem thông tin</button>
                </section>
                {/* Guided Tour Launcher */}
                <div className="p-4 rounded-2xl bg-[#FCF3F4]/60 border border-[#7A2938]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-sm text-[#7A2938] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      Hướng dẫn Sử dụng Hệ thống (Guided Tour)
                    </h4>
                    <p className="text-xs text-[#706A65] mt-0.5">
                      Tham quan từng phân hệ: Không gian đọc, KHBD 5512, Ngân hàng câu hỏi, Đề thi 7991 và Slide.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onTriggerTour?.();
                    }}
                    className="btn-primary py-1.5 px-3.5 text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    Bắt đầu Tour Ngay
                  </button>
                </div>

                {/* Shortcuts Directory */}
                <div className="pt-4 border-t border-[#EEEAE5]">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-[#211E1C] uppercase tracking-wider">
                      DANH MỤC PHÍM TẮT THAO TÁC NHANH
                    </label>
                    <div className="relative w-48">
                      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2" />
                      <input
                        type="text"
                        value={shortcutQuery}
                        onChange={(e) => setShortcutQuery(e.target.value)}
                        placeholder="Tìm phím tắt..."
                        className="w-full pl-8 pr-2.5 py-1 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto panel-scroll pr-1">
                    {filteredShortcuts.map((s, idx) => (
                      <div 
                        key={idx}
                        className="p-2 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs"
                      >
                        <span className="text-stone-700">{s.description}</span>
                        <kbd className="px-2 py-0.5 rounded bg-white border border-stone-300 font-mono text-stone-900 font-bold text-[11px] shadow-2xs">
                          {s.key}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Diagnostics & About */}
                <div className="pt-4 border-t border-[#EEEAE5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-stone-900 block">EduMaster Văn THPT • Version 4.0</span>
                    <span className="text-stone-500">Build 2026.10.08 • Academic Editorial Design Architecture</span>
                  </div>
                  <button
                    onClick={handleCopyDiagnostics}
                    className="py-1.5 px-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Sao chép chẩn đoán hệ thống</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-3.5 md:p-4 border-t border-[#EEEAE5] bg-[#FAF9F7] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Tự động áp dụng & lưu cấu hình tức thì</span>
            </div>
            <button
              onClick={onClose}
              className="btn-primary py-1.5 px-5 text-xs font-semibold cursor-pointer"
            >
              Hoàn tất & Đóng
            </button>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-60 bg-[#211E1C] text-white px-4 py-2.5 rounded-xl shadow-lg border border-stone-700 text-xs font-medium flex items-center gap-2 anim-toast">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
