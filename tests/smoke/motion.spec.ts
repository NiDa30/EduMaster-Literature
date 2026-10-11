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

for (const [label, preset, normal, emphasis] of [
  ['Tắt', 'off', 0, 0], ['Nhẹ', 'light', .14, .18],
  ['Mượt (Chuẩn)', 'smooth', .18, .24], ['Chậm & êm', 'slow', .24, .32],
] as const) {
  test(`Settings motion ${preset}: live timing and persistence`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.addInitScript(() => localStorage.setItem('edumaster_tour_preferences', JSON.stringify({ hasSeenIntro: true, dismissedIntro: true })));
    await page.goto('/#/dashboard');
    await page.getByRole('button', { name: 'Mở cài đặt sư phạm', exact: true }).click();
    await page.getByRole('button', { name: `Chuyển động: ${label}`, exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('data-motion', preset);
    const modal = page.getByRole('dialog');
    expect(await modal.evaluate(el => parseFloat(getComputedStyle(el).animationDuration))).toBeCloseTo(emphasis, 3);
    await page.getByRole('button', { name: 'Tab 2 (Chi tiết)', exact: true }).click();
    expect(await page.locator('.panel-fade-enter').evaluate(el => parseFloat(getComputedStyle(el).animationDuration))).toBeCloseTo(normal, 3);
    await page.getByRole('button', { name: 'Đóng cài đặt (Esc)' }).click();
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-motion', preset);
    await page.goto('/#/matrix');
    expect(await page.locator('main').evaluate(el => parseFloat(getComputedStyle(el).animationDuration))).toBeCloseTo(normal, 3);
    const button = page.locator('main .btn-primary').first();
    if (await button.count()) {
      const durations = await button.evaluate(el => getComputedStyle(el).transitionDuration.split(',').map(Number.parseFloat));
      expect(Math.max(...durations)).toBeLessThanOrEqual(Math.max(preset === 'slow' ? .32 : normal, .01));
    }
  });
}

test('Settings switches independently control hover, click, panels, drawer, scrolling and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addInitScript(() => localStorage.setItem('edumaster_tour_preferences', JSON.stringify({ hasSeenIntro: true, dismissedIntro: true })));
  await page.goto('/#/dashboard');
  await page.getByRole('button', { name: 'Mở cài đặt sư phạm', exact: true }).click();
  await page.getByRole('button', { name: 'Chuyển động: Chậm & êm', exact: true }).click();
  const preview = page.getByRole('button', { name: 'Hover & Bấm thử', exact: true });
  await page.getByRole('checkbox', { name: /Hiệu ứng hover mềm mại/ }).uncheck();
  await preview.hover();
  await expect.poll(() => preview.evaluate(el => getComputedStyle(el).transform)).toBe('none');
  await page.mouse.down();
  await expect.poll(() => preview.evaluate(el => getComputedStyle(el).transform)).not.toBe('none');
  await page.mouse.up();
  await page.getByRole('checkbox', { name: /Hiệu ứng nén nhẹ/ }).uncheck();
  await preview.hover(); await page.mouse.down();
  await expect.poll(() => preview.evaluate(el => getComputedStyle(el).transform)).toBe('none');
  await page.mouse.up();
  await page.getByRole('checkbox', { name: /Chuyển cảnh giữa/ }).uncheck();
  await page.getByRole('button', { name: 'Tab 2 (Chi tiết)', exact: true }).click();
  expect(await page.locator('.panel-fade-enter').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await page.getByRole('checkbox', { name: /Animation khi mở modal/ }).uncheck();
  expect(await page.getByRole('dialog').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await page.getByRole('checkbox', { name: /Cuộn trang mượt mà/ }).uncheck();
  await expect(page.locator('html')).toHaveAttribute('data-motion-scroll', 'false');
  await page.getByRole('checkbox', { name: /Animation khi mở modal/ }).check();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.getByRole('dialog').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await page.getByRole('checkbox', { name: 'Tôn trọng cài đặt Giảm chuyển động', exact: true }).uncheck();
  expect(await page.getByRole('dialog').evaluate(el => parseFloat(getComputedStyle(el).animationDuration))).toBeCloseTo(.32, 3);
  await page.getByRole('checkbox', { name: /Animation khi mở modal/ }).uncheck();
  await page.getByRole('button', { name: 'Đóng cài đặt (Esc)' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-motion-hover', 'false');
  await expect(page.locator('html')).toHaveAttribute('data-motion-panel', 'false');
  await expect(page.locator('html')).toHaveAttribute('data-motion-button', 'false');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Mở menu điều hướng' }).click();
  const drawer = page.locator('aside[data-tour-id="sidebar"]');
  expect(await drawer.evaluate(el => parseFloat(getComputedStyle(el).transitionDuration))).toBe(0);
  expect(await page.locator('main').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await expect.poll(() => drawer.evaluate(el => el.getBoundingClientRect().left)).toBeCloseTo(0, 0);
});
