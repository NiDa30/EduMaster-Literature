import { 
  WorkspaceSettings, 
  AccentColorId 
} from '../types/settings';
import { 
  ACCENT_COLOR_PRESETS, 
  AccentPreset, 
  SURFACE_STYLE_PRESETS 
} from '../config/defaultSettings';
import { validateHexColor, hexToRgb } from './slideStyleUtils';
import { AppState } from '../types';

// =========================================================================
// 1. DYNAMIC ACCENT COLOR SCALE GENERATOR
// =========================================================================

export function getAccentScale(accentId: AccentColorId, customHex?: string): AccentPreset {
  if (accentId === 'custom' && customHex && validateHexColor(customHex)) {
    const rgb = hexToRgb(customHex);
    if (rgb) {
      // Calculate darker hover & pressed
      const darkR = Math.max(0, Math.round(rgb.r * 0.85)).toString(16).padStart(2, '0');
      const darkG = Math.max(0, Math.round(rgb.g * 0.85)).toString(16).padStart(2, '0');
      const darkB = Math.max(0, Math.round(rgb.b * 0.85)).toString(16).padStart(2, '0');
      const hoverHex = `#${darkR}${darkG}${darkB}`;

      const pressR = Math.max(0, Math.round(rgb.r * 0.72)).toString(16).padStart(2, '0');
      const pressG = Math.max(0, Math.round(rgb.g * 0.72)).toString(16).padStart(2, '0');
      const pressB = Math.max(0, Math.round(rgb.b * 0.72)).toString(16).padStart(2, '0');
      const pressedHex = `#${pressR}${pressG}${pressB}`;

      return {
        id: 'custom',
        name: 'Màu tùy chỉnh',
        hex: customHex,
        hoverHex,
        pressedHex,
        softHex: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`,
        borderHex: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`,
        ringRgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`
      };
    }
  }

  const found = ACCENT_COLOR_PRESETS.find(p => p.id === accentId);
  return found || ACCENT_COLOR_PRESETS[0];
}

// =========================================================================
// 2. DOM CSS VARIABLES INJECTION & SYNCHRONIZATION
// =========================================================================

export function applyWorkspaceSettingsToDom(settings: WorkspaceSettings): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.dataset.theme = settings.appearance.themeMode;

  // 1. Accent Color
  const accent = getAccentScale(settings.appearance.accentColorId, settings.appearance.customAccentHex);
  root.style.setProperty('--color-brand-700', accent.hex);
  root.style.setProperty('--color-brand-800', accent.hoverHex);
  root.style.setProperty('--color-brand-900', accent.pressedHex);
  root.style.setProperty('--color-brand-soft', accent.softHex);
  root.style.setProperty('--color-brand-200', accent.borderHex);
  root.style.setProperty('--color-brand-focus', accent.ringRgba);

  // 2. Surface Style
  const surface = SURFACE_STYLE_PRESETS.find(s => s.id === settings.appearance.surfaceStyle) || SURFACE_STYLE_PRESETS[0];
  root.style.setProperty('--color-canvas', surface.canvas);
  root.style.setProperty('--color-surface', surface.surface);
  root.style.setProperty('--color-surface-subtle', surface.surfaceSubtle);

  // 3. UI Font
  let uiFontStack = '"Be Vietnam Pro", system-ui, -apple-system, sans-serif';
  if (settings.appearance.uiFont === 'Inter') {
    uiFontStack = '"Inter", system-ui, -apple-system, sans-serif';
  } else if (settings.appearance.uiFont === 'Noto Sans') {
    uiFontStack = '"Noto Sans", Arial, sans-serif';
  } else if (settings.appearance.uiFont === 'System Default') {
    uiFontStack = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  }
  root.style.setProperty('--font-ui', uiFontStack);

  // 4. Reader Font, Size & Line Height
  root.style.setProperty('--font-literary', `"${settings.authoring.readerFont}", Georgia, serif`);
  root.style.setProperty('--text-document-size', `${settings.authoring.readerFontSize}px`);
  root.style.setProperty('--text-document-line', `${settings.authoring.readerLineHeight}`);
  root.style.setProperty('--reader-page-width', `${settings.authoring.readerPageWidth}px`);

  // 5. UI Font Scale
  const scale = settings.appearance.uiFontScale || 100;
  root.style.fontSize = `${(scale / 100) * 16}px`;

  // 6. Corner Radius
  if (settings.appearance.cornerRadius === 'compact') {
    root.style.setProperty('--radius-btn', '6px');
    root.style.setProperty('--radius-card', '8px');
  } else if (settings.appearance.cornerRadius === 'soft') {
    root.style.setProperty('--radius-btn', '12px');
    root.style.setProperty('--radius-card', '16px');
  } else {
    root.style.setProperty('--radius-btn', '8px');
    root.style.setProperty('--radius-card', '12px');
  }

  // 7. Motion & Interaction (Tuân thủ design_animation_guid.md)
  const motionPrefs = settings.appearance.motionPreferences || {
    preset: settings.appearance.motionMode === 'none' ? 'off' : settings.appearance.motionMode === 'subtle' ? 'light' : 'smooth',
    hoverEffects: true,
    panelTransitions: true,
    modalAnimations: true,
    smoothScroll: true,
    buttonFeedback: true,
    respectReducedMotion: settings.appearance.respectReducedMotion ?? true,
  };

  root.setAttribute('data-motion', motionPrefs.preset);
  root.setAttribute('data-motion-hover', String(motionPrefs.hoverEffects));
  root.setAttribute('data-motion-panel', String(motionPrefs.panelTransitions));
  root.setAttribute('data-motion-modal', String(motionPrefs.modalAnimations));
  root.setAttribute('data-motion-button', String(motionPrefs.buttonFeedback));
  root.setAttribute('data-respect-reduced-motion', String(motionPrefs.respectReducedMotion));

  // Smooth scroll
  root.style.scrollBehavior = motionPrefs.smoothScroll ? 'smooth' : 'auto';

  // Motion tokens & easings
  root.style.setProperty('--ease-standard', 'cubic-bezier(0.2, 0, 0, 1)');
  root.style.setProperty('--ease-smooth', 'cubic-bezier(0.22, 1, 0.36, 1)');
  root.style.setProperty('--ease-enter', 'cubic-bezier(0, 0, 0.2, 1)');
  root.style.setProperty('--ease-exit', 'cubic-bezier(0.4, 0, 1, 1)');

  if (motionPrefs.preset === 'off') {
    root.style.setProperty('--motion-instant', '0ms');
    root.style.setProperty('--motion-fast', '0ms');
    root.style.setProperty('--motion-normal', '0ms');
    root.style.setProperty('--motion-smooth', '0ms');
    root.style.setProperty('--motion-slow', '0ms');
    root.style.setProperty('--motion-emphasis', '0ms');
  } else if (motionPrefs.preset === 'light') {
    root.style.setProperty('--motion-instant', '60ms');
    root.style.setProperty('--motion-fast', '100ms');
    root.style.setProperty('--motion-normal', '140ms');
    root.style.setProperty('--motion-smooth', '180ms');
    root.style.setProperty('--motion-slow', '220ms');
    root.style.setProperty('--motion-emphasis', '180ms');
  } else if (motionPrefs.preset === 'slow') {
    root.style.setProperty('--motion-instant', '120ms');
    root.style.setProperty('--motion-fast', '160ms');
    root.style.setProperty('--motion-normal', '240ms');
    root.style.setProperty('--motion-smooth', '300ms');
    root.style.setProperty('--motion-slow', '360ms');
    root.style.setProperty('--motion-emphasis', '300ms');
  } else {
    // Default 'smooth'
    root.style.setProperty('--motion-instant', '90ms');
    root.style.setProperty('--motion-fast', '130ms');
    root.style.setProperty('--motion-normal', '190ms');
    root.style.setProperty('--motion-smooth', '240ms');
    root.style.setProperty('--motion-slow', '280ms');
    root.style.setProperty('--motion-emphasis', '240ms');
  }
}

// =========================================================================
// 3. STORAGE QUOTA & USAGE REPORT
// =========================================================================

export interface StorageReport {
  totalUsedBytes: number;
  totalQuotaBytes: number;
  percentageUsed: number;
  breakdown: {
    lessonsBytes: number;
    slidesBytes: number;
    imagesBytes: number;
    otherBytes: number;
  };
  health: 'healthy' | 'warning' | 'critical';
}

export function calculateStorageUsage(): StorageReport {
  let totalBytes = 0;
  let lessonsBytes = 0;
  let slidesBytes = 0;
  let imagesBytes = 0;
  let otherBytes = 0;

  if (typeof localStorage !== 'undefined') {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) || '';
      const val = localStorage.getItem(key) || '';
      const byteSize = (key.length + val.length) * 2; // UTF-16
      totalBytes += byteSize;

      if (key.includes('edumaster_app_state') || key.includes('lessons')) {
        lessonsBytes += byteSize;
        // Count base64 images inside state
        if (val.includes('data:image/')) {
          const imgMatches = val.match(/data:image\/[^"]+/g);
          if (imgMatches) {
            imagesBytes += imgMatches.reduce((acc, str) => acc + str.length * 2, 0);
          }
        }
      } else if (key.includes('slide')) {
        slidesBytes += byteSize;
      } else {
        otherBytes += byteSize;
      }
    }
  }

  // Standard browser localStorage limit is ~5MB (5 * 1024 * 1024 bytes)
  const quota = 5 * 1024 * 1024;
  const pct = Math.min(Math.round((totalBytes / quota) * 100), 100);
  const health = pct > 85 ? 'critical' : pct > 65 ? 'warning' : 'healthy';

  return {
    totalUsedBytes: totalBytes,
    totalQuotaBytes: quota,
    percentageUsed: pct,
    breakdown: {
      lessonsBytes,
      slidesBytes,
      imagesBytes,
      otherBytes
    },
    health
  };
}

export function cleanTemporaryData(): number {
  let freed = 0;
  if (typeof localStorage !== 'undefined') {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) || '';
      if (key.startsWith('tmp_') || key.includes('_cache_') || key.startsWith('tour_temp_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => {
      const val = localStorage.getItem(k) || '';
      freed += (k.length + val.length) * 2;
      localStorage.removeItem(k);
    });
  }
  return freed;
}

// =========================================================================
// 4. NON-SENSITIVE DIAGNOSTIC DATA EXPORTER
// =========================================================================

export function generateDiagnosticInfo(appState: AppState, settings: WorkspaceSettings): string {
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
  const screenSize = typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'N/A';
  const storage = calculateStorageUsage();

  return `### EduMaster Literature — Thông tin Chẩn đoán Hệ thống
- **Phiên bản ứng dụng**: ${appState.version || '4.0.0'}
- **Cập nhật lần cuối**: ${appState.lastUpdated}
- **Phân hệ đang mở**: ${appState.activeModule}
- **Số lượng bài dạy**: ${appState.lessons.length}
- **Số slide hiện tại**: ${appState.slides.length}
- **Dung lượng lưu trữ**: ${(storage.totalUsedBytes / 1024).toFixed(1)} KB / ${(storage.totalQuotaBytes / (1024 * 1024)).toFixed(1)} MB (${storage.percentageUsed}%)
- **Màu nhấn (Accent)**: ${settings.appearance.accentColorId} (${settings.appearance.customAccentHex})
- **Chủ đề & Nền**: ${settings.appearance.themePresetId} • ${settings.appearance.surfaceStyle}
- **Phông chữ UI**: ${settings.appearance.uiFont} (${settings.appearance.uiFontScale}%)
- **Phông chữ Reader**: ${settings.authoring.readerFont} (${settings.authoring.readerFontSize}px)
- **Độ phân giải màn hình**: ${screenSize}
- **Trình duyệt**: ${userAgent}
`;
}

// =========================================================================
// 5. BACKUP & RESTORE UTILITIES
// =========================================================================

export function exportCompleteStateJson(state: AppState): void {
  const jsonString = JSON.stringify(state, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  a.download = `EduMaster_Backup_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseAndValidateRestoreJson(rawJson: string): { success: boolean; data?: AppState; error?: string } {
  try {
    if (!rawJson || !rawJson.trim()) {
      return { success: false, error: 'Dữ liệu JSON trống.' };
    }
    const parsed = JSON.parse(rawJson);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: 'Dữ liệu JSON không đúng định dạng đối tượng.' };
    }
    if (!parsed.khbd || !parsed.slides || !parsed.exam) {
      return { success: false, error: 'Dữ liệu thiếu các phân hệ bắt buộc (khbd, slides, exam).' };
    }
    return { success: true, data: parsed as AppState };
  } catch (err: any) {
    return { success: false, error: err.message || 'Cú pháp JSON không hợp lệ.' };
  }
}

