import { test, expect } from '@playwright/test';

for (const mode of ['normal', 'reduced', 'off'] as const) {
  test(`Motion ${mode}: mobile drawer positioning, settings and stable Reader`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference' });
    await page.addInitScript(() => localStorage.setItem('edumaster_tour_preferences', JSON.stringify({ hasSeenIntro: true, dismissedIntro: true })));
    await page.goto('/#/workspace');
    const sidebar = page.locator('aside[data-tour-id="sidebar"]');
    if (mode === 'off') await page.evaluate(() => document.documentElement.dataset.motion = 'off');
    // Suppressing motion must preserve the transform that keeps the drawer offscreen.
    await expect.poll(() => sidebar.evaluate(el => el.getBoundingClientRect().right)).toBeLessThanOrEqual(1);
    const paragraph = page.locator('main article p').first();
    await expect(paragraph).toBeVisible();
    expect(await paragraph.evaluate(el => getComputedStyle(el).animationName)).toBe('none');
    await page.getByRole('button', { name: 'Mở menu điều hướng' }).click();
    await expect.poll(() => sidebar.evaluate(el => el.getBoundingClientRect().left)).toBeCloseTo(0, 0);
    await sidebar.getByRole('button', { name: 'Mở cài đặt sư phạm', exact: true }).click();
    await expect(page.getByText('Cài đặt Không gian', { exact: true })).toBeVisible();
    if (mode !== 'normal') {
      const duration = await sidebar.evaluate(el => parseFloat(getComputedStyle(el).transitionDuration));
      expect(duration).toBeLessThanOrEqual(0.05);
    }
  });
}

test('Motion tokens: toolbar, exit, granular controls and off mode', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('edumaster_tour_preferences', JSON.stringify({ hasSeenIntro: true, dismissedIntro: true })));
  await page.goto('/#/about');
  const result = await page.evaluate(() => {
    const root = document.documentElement;
    const probe = document.createElement('div');
    document.body.append(probe);
    const sample = (className: string) => { probe.className = className; const style = getComputedStyle(probe); return { name: style.animationName, duration: parseFloat(style.animationDuration) }; };
    const toolbar = sample('anim-selection-toolbar');
    const modal = sample('anim-modal-dialog');
    const exit = sample('anim-modal-dialog-exit');
    root.dataset.motionModal = 'false';
    const disabledExit = sample('anim-modal-dialog-exit');
    root.dataset.motion = 'off';
    const off = sample('anim-selection-toolbar');
    probe.remove();
    return { toolbar, modal, exit, disabledExit, off };
  });
  expect(result.toolbar.duration).toBeGreaterThan(0);
  expect(result.toolbar.duration).toBeLessThanOrEqual(0.16);
  expect(result.exit.duration).toBeLessThan(result.modal.duration);
  expect(result.disabledExit.name).toBe('none');
  expect(result.off.name).toBe('none');
});
