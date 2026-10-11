import { describe, it, expect } from 'vitest';
import { ACCENT_COLOR_PRESETS, DEFAULT_WORKSPACE_SETTINGS, SURFACE_STYLE_PRESETS } from '../config/defaultSettings';
import { applyWorkspaceSettingsToDom, getReadableAccent } from '../utils/themeManager';
import { getContrastRatio } from '../utils/slideStyleUtils';

describe('Workspace contrast for preset and custom colors', () => {
  for (const surface of SURFACE_STYLE_PRESETS) {
    it(`keeps accent and normal text readable on ${surface.id}`, () => {
      for (const hex of [...ACCENT_COLOR_PRESETS.map(accent => accent.hex), '#ffffff', '#000000', '#ff0', '#abc']) {
        const label = getReadableAccent(hex, surface.surface, surface.surfaceSubtle);
        expect(getContrastRatio(label, surface.surface)).toBeGreaterThanOrEqual(4.5);
        expect(getContrastRatio(label, surface.surfaceSubtle)).toBeGreaterThanOrEqual(4.5);
        applyWorkspaceSettingsToDom({ ...DEFAULT_WORKSPACE_SETTINGS, appearance: { ...DEFAULT_WORKSPACE_SETTINGS.appearance, accentColorId: 'custom', customAccentHex: hex, surfaceStyle: surface.id } });
        const root = document.documentElement;
        expect(getContrastRatio(root.style.getPropertyValue('--color-text-primary'), surface.surface)).toBeGreaterThanOrEqual(4.5);
        for (const [fill, foreground] of [['700', 'accent'], ['800', 'hover'], ['900', 'pressed']]) {
          expect(getContrastRatio(root.style.getPropertyValue(`--color-brand-on-${foreground}`), root.style.getPropertyValue(`--color-brand-${fill}`))).toBeGreaterThanOrEqual(4.5);
        }
      }
    });
  }
  it('restores light neutral tokens after leaving a dark surface', () => {
    applyWorkspaceSettingsToDom({ ...DEFAULT_WORKSPACE_SETTINGS, appearance: { ...DEFAULT_WORKSPACE_SETTINGS.appearance, surfaceStyle: 'dark-neutral' } });
    applyWorkspaceSettingsToDom(DEFAULT_WORKSPACE_SETTINGS);
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(document.documentElement.style.getPropertyValue('--color-text-primary')).toBe('#302C29');
  });
});
