import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { 
  DEFAULT_WORKSPACE_SETTINGS, 
  DEFAULT_MOTION_PREFERENCES,
  ACCENT_COLOR_PRESETS, 
  THEME_PRESETS_WORKSPACE, 
  SURFACE_STYLE_PRESETS,
  SHORTCUTS_CATALOG 
} from '../config/defaultSettings';
import { 
  getAccentScale, 
  applyWorkspaceSettingsToDom, 
  calculateStorageUsage, 
  cleanTemporaryData, 
  generateDiagnosticInfo,
  parseAndValidateRestoreJson 
} from '../utils/themeManager';
import { PersonalWorkspaceCenter } from '../components/PersonalWorkspaceCenter';
import { initialAppState } from '../data/presets';
import { WorkspaceSettings } from '../types/settings';

describe('Personal Workspace Center & Settings Engine', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('style');
    document.documentElement.removeAttribute('data-theme');
  });

  describe('1. Default Settings Configuration & Presets', () => {
    it('provides complete and valid default settings matching pedagogical specification', () => {
      expect(DEFAULT_WORKSPACE_SETTINGS.appearance.themeMode).toBe('light');
      expect(DEFAULT_WORKSPACE_SETTINGS.appearance.accentColorId).toBe('burgundy');
      expect(DEFAULT_WORKSPACE_SETTINGS.appearance.themePresetId).toBe('academic-burgundy');
      expect(DEFAULT_WORKSPACE_SETTINGS.appearance.surfaceStyle).toBe('warm-ivory');
      expect(DEFAULT_WORKSPACE_SETTINGS.appearance.cornerRadius).toBe('balanced');
      expect(DEFAULT_WORKSPACE_SETTINGS.appearance.uiFont).toBe('Be Vietnam Pro');
      expect(DEFAULT_WORKSPACE_SETTINGS.appearance.uiFontScale).toBe(100);

      expect(DEFAULT_WORKSPACE_SETTINGS.authoring.autosaveDelaySec).toBe(1);
      expect(DEFAULT_WORKSPACE_SETTINGS.authoring.readerFont).toBe('Lora');
      expect(DEFAULT_WORKSPACE_SETTINGS.authoring.readerFontSize).toBe(18);
      expect(DEFAULT_WORKSPACE_SETTINGS.authoring.readerLineHeight).toBe(1.75);
      expect(DEFAULT_WORKSPACE_SETTINGS.authoring.readerPageWidth).toBe(760);

      expect(DEFAULT_WORKSPACE_SETTINGS.presentation.defaultThemeId).toBe('cinematic-literary');
      expect(DEFAULT_WORKSPACE_SETTINGS.export.defaultFormatKhbd).toBe('docx');
      expect(DEFAULT_WORKSPACE_SETTINGS.data.backupReminderInterval).toBe('monthly');
      expect(DEFAULT_WORKSPACE_SETTINGS.help.enableShortcuts).toBe(true);
    });

    it('contains all 7 curated academic accent color presets', () => {
      expect(ACCENT_COLOR_PRESETS.length).toBe(7);
      const ids = ACCENT_COLOR_PRESETS.map(p => p.id);
      expect(ids).toContain('burgundy');
      expect(ids).toContain('forest');
      expect(ids).toContain('navy');
      expect(ids).toContain('teal');
      expect(ids).toContain('amber');
      expect(ids).toContain('rose');
      expect(ids).toContain('violet');
    });

    it('contains 6 visual theme presets and 4 surface styles', () => {
      expect(THEME_PRESETS_WORKSPACE.length).toBe(6);
      expect(SURFACE_STYLE_PRESETS.length).toBe(4);
      expect(SHORTCUTS_CATALOG.length).toBeGreaterThan(10);
    });
  });

  describe('2. Dynamic Accent Scale Engine', () => {
    it('generates harmonic accent color scale for burgundy preset', () => {
      const scale = getAccentScale('burgundy', '#7A2938');
      expect(scale.hex).toBe('#7A2938');
      expect(scale.hoverHex).toBe('#68222E');
      expect(scale.softHex).toBe('#FCF3F4');
      expect(scale.borderHex).toBe('#ECC2C9');
      expect(scale.ringRgba).toBe('rgba(122, 41, 56, 0.22)');
    });

    it('generates harmonic accent color scale for forest preset', () => {
      const scale = getAccentScale('forest', '#18352B');
      expect(scale.hex).toBe('#18352B');
      expect(scale.hoverHex).toBe('#122921');
      expect(scale.softHex).toBe('#F0FDF4');
    });

    it('derives harmonic scale dynamically for valid custom HEX', () => {
      const scale = getAccentScale('custom', '#2563EB');
      expect(scale.hex).toBe('#2563EB');
      expect(scale.softHex).toBe('rgba(37, 99, 235, 0.08)');
      expect(scale.borderHex).toBe('rgba(37, 99, 235, 0.25)');
      expect(scale.ringRgba).toBe('rgba(37, 99, 235, 0.25)');
    });

    it('gracefully falls back to default burgundy when custom HEX is invalid', () => {
      const scale = getAccentScale('custom', 'invalid-color-value');
      expect(scale.hex).toBe('#7A2938');
    });
  });

  describe('3. DOM CSS Variables Realtime Application', () => {
    it('injects CSS variables to document.documentElement according to workspace settings', () => {
      const customSettings: WorkspaceSettings = {
        ...DEFAULT_WORKSPACE_SETTINGS,
        appearance: {
          ...DEFAULT_WORKSPACE_SETTINGS.appearance,
          themeMode: 'dark',
          accentColorId: 'forest',
          surfaceStyle: 'pure-white',
          uiFontScale: 110,
          motionPreferences: {
            ...DEFAULT_MOTION_PREFERENCES,
            preset: 'off'
          }
        },
        authoring: {
          ...DEFAULT_WORKSPACE_SETTINGS.authoring,
          readerFontSize: 20,
          readerLineHeight: 1.9,
          readerPageWidth: 860
        }
      };

      applyWorkspaceSettingsToDom(customSettings);

      const root = document.documentElement;
      expect(root.dataset.theme).toBe('dark');
      expect(root.style.getPropertyValue('--color-brand-700')).toBe('#18352B');
      expect(root.style.getPropertyValue('--font-ui')).toContain('Be Vietnam Pro');
      expect(root.style.getPropertyValue('--font-literary')).toContain('Lora');
      expect(root.style.getPropertyValue('--text-document-size')).toBe('20px');
      expect(root.style.getPropertyValue('--text-document-line')).toBe('1.9');
      expect(root.style.getPropertyValue('--reader-page-width')).toBe('860px');
      expect(root.style.getPropertyValue('--motion-normal')).toBe('0ms'); // motion off
      expect(root.style.fontSize).toBe('17.6px');
    });

    it('applies warm ivory surface correctly', () => {
      const warmSettings: WorkspaceSettings = {
        ...DEFAULT_WORKSPACE_SETTINGS,
        appearance: {
          ...DEFAULT_WORKSPACE_SETTINGS.appearance,
          surfaceStyle: 'warm-ivory'
        }
      };

      applyWorkspaceSettingsToDom(warmSettings);

      const root = document.documentElement;
      expect(root.style.getPropertyValue('--color-canvas')).toBe('#F7F6F3');
      expect(root.style.getPropertyValue('--color-surface')).toBe('#FFFFFF');
    });
  });

  describe('4. Storage Quota Calculation & Cache Cleaner', () => {
    it('accurately computes storage usage and breakdown in local storage', () => {
      localStorage.setItem('edumaster_app_state_v3', JSON.stringify({ test: 'hello world' }));
      localStorage.setItem('tmp_cache_key', 'temporary junk data');

      const report = calculateStorageUsage();
      expect(report.totalUsedBytes).toBeGreaterThan(0);
      expect(report.totalQuotaBytes).toBe(5 * 1024 * 1024);
      expect(report.percentageUsed).toBeGreaterThanOrEqual(0);
      expect(report.health).toBe('healthy');
    });

    it('cleans only temporary keys without touching persistent app state', () => {
      localStorage.setItem('edumaster_app_state_v3', JSON.stringify(initialAppState));
      localStorage.setItem('tmp_render_cache', 'cache1');
      localStorage.setItem('tour_temp_step', 'step3');
      localStorage.setItem('doc_cache_preview', 'previewData');

      const freedBytes = cleanTemporaryData();
      expect(freedBytes).toBeGreaterThan(0);

      // Temporary keys removed
      expect(localStorage.getItem('tmp_render_cache')).toBeNull();
      expect(localStorage.getItem('tour_temp_step')).toBeNull();
      expect(localStorage.getItem('doc_cache_preview')).toBeNull();

      // Core persistent state remains intact
      expect(localStorage.getItem('edumaster_app_state_v3')).not.toBeNull();
    });
  });

  describe('5. Diagnostic Info & JSON Backup Validation', () => {
    it('generates complete non-sensitive system diagnostics', () => {
      const diag = generateDiagnosticInfo(initialAppState, DEFAULT_WORKSPACE_SETTINGS);
      expect(diag).toContain('EduMaster Literature — Thông tin Chẩn đoán Hệ thống');
      expect(diag).toContain('Phiên bản ứng dụng');
      expect(diag).toContain('Màu nhấn (Accent)');
      expect(diag).toContain('Phông chữ UI');
      expect(diag).toContain('Phông chữ Reader');
    });

    it('validates JSON restore successfully for valid state payload', () => {
      const validPayload = JSON.stringify(initialAppState);
      const res = parseAndValidateRestoreJson(validPayload);
      expect(res.success).toBe(true);
      expect(res.data?.khbd).toBeDefined();
      expect(res.data?.slides).toBeDefined();
    });

    it('rejects corrupted or incomplete JSON restores with clear error message', () => {
      const emptyRes = parseAndValidateRestoreJson('');
      expect(emptyRes.success).toBe(false);
      expect(emptyRes.error).toBe('Dữ liệu JSON trống.');

      const invalidRes = parseAndValidateRestoreJson('{ not json }');
      expect(invalidRes.success).toBe(false);

      const missingModulesRes = parseAndValidateRestoreJson(JSON.stringify({ someKey: 123 }));
      expect(missingModulesRes.success).toBe(false);
      expect(missingModulesRes.error).toContain('thiếu các phân hệ bắt buộc');
    });
  });

  describe('6. PersonalWorkspaceCenter UI Component Interaction', () => {
    it('renders modal with 6 tabs when open', () => {
      const onUpdateSettings = vi.fn();
      const onClose = vi.fn();

      render(
        <PersonalWorkspaceCenter
          isOpen={true}
          onClose={onClose}
          appState={initialAppState}
          onUpdateSettings={onUpdateSettings}
        />
      );

      expect(screen.getByText('Cài đặt Không gian')).toBeInTheDocument();
      expect(screen.getByText('1. Giao diện & Màu sắc')).toBeInTheDocument();
      expect(screen.getByText('2. Soạn giảng & Reader')).toBeInTheDocument();
      expect(screen.getByText('3. Trình chiếu Slide')).toBeInTheDocument();
      expect(screen.getByText('4. Xuất tài liệu & Giáo viên')).toBeInTheDocument();
      expect(screen.getByText('5. Dữ liệu & Lưu trữ')).toBeInTheDocument();
      expect(screen.getByText('6. Phím tắt & Trợ giúp')).toBeInTheDocument();
    });

    it('allows switching between tabs and modifying settings', () => {
      const onUpdateSettings = vi.fn();
      const onClose = vi.fn();

      render(
        <PersonalWorkspaceCenter
          isOpen={true}
          onClose={onClose}
          appState={initialAppState}
          onUpdateSettings={onUpdateSettings}
        />
      );

      // Switch to Authoring tab
      fireEvent.click(screen.getByText('2. Soạn giảng & Reader'));
      expect(screen.getByText('QUY TẮC TỰ ĐỘNG LƯU (AUTOSAVE)')).toBeInTheDocument();
      expect(screen.getByText('XEM TRƯỚC VĂN BẢN TRÍCH ĐOẠN')).toBeInTheDocument();

      // Switch to Slide tab
      fireEvent.click(screen.getByText('3. Trình chiếu Slide'));
      expect(screen.getByText(/CHỦ ĐỀ SLIDE MẶC ĐỊNH/i)).toBeInTheDocument();

      // Switch to Export tab
      fireEvent.click(screen.getByText('4. Xuất tài liệu & Giáo viên'));
      expect(screen.getByText('THÔNG TIN HÀNH CHÍNH & HỒ SƠ GIÁO VIÊN')).toBeInTheDocument();

      // Switch to Help tab
      fireEvent.click(screen.getByText('6. Phím tắt & Trợ giúp'));
      expect(screen.getByText('DANH MỤC PHÍM TẮT THAO TÁC NHANH')).toBeInTheDocument();
    });

    it('triggers onTriggerTour callback when clicking start tour button', () => {
      const onTriggerTour = vi.fn();
      const onClose = vi.fn();

      render(
        <PersonalWorkspaceCenter
          isOpen={true}
          onClose={onClose}
          appState={initialAppState}
          onUpdateSettings={vi.fn()}
          onTriggerTour={onTriggerTour}
        />
      );

      // Switch to Help tab
      fireEvent.click(screen.getByText('6. Phím tắt & Trợ giúp'));
      const startTourBtn = screen.getByText('Bắt đầu Tour Ngay');
      fireEvent.click(startTourBtn);

      expect(onClose).toHaveBeenCalled();
      expect(onTriggerTour).toHaveBeenCalled();
    });
  });
});
