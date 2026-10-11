import { afterEach, describe, expect, it, vi } from 'vitest';
import { getNavigationScrollBehavior } from '../utils/motionUtils';
import { DEFAULT_WORKSPACE_SETTINGS, DEFAULT_MOTION_PREFERENCES } from '../config/defaultSettings';
import { applyWorkspaceSettingsToDom } from '../utils/themeManager';

afterEach(() => {
  document.documentElement.removeAttribute('data-motion');
  document.documentElement.removeAttribute('data-motion-scroll');
  document.documentElement.removeAttribute('style');
  vi.restoreAllMocks();
});

describe('Navigation motion policy', () => {
  it('uses smooth scrolling only for explicit navigation with motion enabled', () => {
    expect(getNavigationScrollBehavior()).toBe('smooth');
    document.documentElement.dataset.motionScroll = 'false';
    expect(getNavigationScrollBehavior()).toBe('auto');
  });
  it('honors disabled motion and live OS reduced motion', () => {
    document.documentElement.dataset.motion = 'off';
    expect(getNavigationScrollBehavior()).toBe('auto');
    document.documentElement.dataset.motion = 'smooth';
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList);
    expect(getNavigationScrollBehavior()).toBe('auto');
  });
  it('keeps default durations within the documented limits without global smooth scrolling', () => {
    applyWorkspaceSettingsToDom({ ...DEFAULT_WORKSPACE_SETTINGS, appearance: { ...DEFAULT_WORKSPACE_SETTINGS.appearance, motionPreferences: { ...DEFAULT_MOTION_PREFERENCES, preset: 'smooth' } } });
    expect(document.documentElement.style.getPropertyValue('--motion-fast')).toBe('120ms');
    expect(document.documentElement.style.getPropertyValue('--motion-normal')).toBe('180ms');
    expect(document.documentElement.style.scrollBehavior).toBe('auto');
  });
});
