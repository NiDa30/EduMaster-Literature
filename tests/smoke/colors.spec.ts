import { test, expect } from '@playwright/test';
import { ACCENT_COLOR_PRESETS, SURFACE_STYLE_PRESETS, THEME_PRESETS_WORKSPACE } from '../../src/config/defaultSettings';
import { getContrastRatio } from '../../src/utils/slideStyleUtils';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('edumaster_tour_preferences', JSON.stringify({ hasSeenIntro: true, dismissedIntro: true })));
  await page.goto('/#/dashboard');
  await page.getByRole('button', { name: 'Mở cài đặt sư phạm', exact: true }).click();
});

test('All seven accent choices update real labels, fills and persist', async ({ page }) => {
  for (const accent of ACCENT_COLOR_PRESETS) {
    await page.getByRole('button', { name: accent.name, exact: true }).click();
    await expect.poll(() => page.locator('html').evaluate(el => el.style.getPropertyValue('--color-brand-700'))).toBe(accent.hex);
    await page.getByRole('button', { name: 'Đóng cài đặt (Esc)' }).click();
    const expected = await page.evaluate(hex => { const probe = document.createElement('span'); probe.style.color = hex; document.body.append(probe); const result = getComputedStyle(probe).color; probe.remove(); return result; }, accent.hex);
    await expect.poll(() => page.getByRole('button', { name: 'Tạo bài dạy', exact: true }).evaluate(el => getComputedStyle(el).backgroundColor)).toBe(expected);
    const heading = page.getByText('Tác phẩm đang soạn thảo', { exact: true });
    const labelHex = await heading.evaluate(el => '#' + getComputedStyle(el).color.match(/\d+/g)!.slice(0, 3).map(value => Number(value).toString(16).padStart(2, '0')).join(''));
    expect(getContrastRatio(labelHex, '#FFFFFF')).toBeGreaterThanOrEqual(4.5);
    await page.reload();
    await expect.poll(() => page.locator('html').evaluate(el => el.style.getPropertyValue('--color-brand-700'))).toBe(accent.hex);
    await page.getByRole('button', { name: 'Mở cài đặt sư phạm', exact: true }).click();
  }
});

test('Dark theme keeps actual workspace surfaces and headings readable across modules', async ({ page }) => {
  await page.getByText('Midnight Literature', { exact: true }).click();
  await page.getByRole('button', { name: 'Đóng cài đặt (Esc)' }).click();
  for (const route of ['dashboard', 'workspace', 'khbd', 'exam', 'matrix', 'rubric', 'slides', 'questions', 'export_handover', 'about']) {
    await page.goto(`/#/${route}`);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const background = await page.locator('.app-shell').evaluate(el => getComputedStyle(el).backgroundColor);
    expect(background).toBe('rgb(28, 25, 23)');
    const heading = page.locator('main h1, main h2').first();
    await expect(heading).toBeVisible();
    const color = await heading.evaluate(el => '#' + getComputedStyle(el).color.match(/\d+/g)!.slice(0, 3).map(value => Number(value).toString(16).padStart(2, '0')).join(''));
    expect(getContrastRatio(color, '#292524')).toBeGreaterThanOrEqual(4.5);
    if (route === 'matrix') {
      const cells = await page.locator('main th[class*="bg-"]').evaluateAll(elements => {
        const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
        const context = canvas.getContext('2d')!;
        const hex = (value: string) => {
          context.clearRect(0, 0, 1, 1); context.fillStyle = value; context.fillRect(0, 0, 1, 1);
          return '#' + [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map(channel => channel.toString(16).padStart(2, '0')).join('');
        };
        return elements.map(el => { const style = getComputedStyle(el); return [hex(style.color), hex(style.backgroundColor)]; });
      });
      expect(cells.length).toBeGreaterThan(0);
      for (const [foreground, background] of cells) expect(getContrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5);
    }
  }
});

test('All six theme bundles apply accent, surface and reader font', async ({ page }) => {
  for (const theme of THEME_PRESETS_WORKSPACE) {
    await page.getByText(theme.name, { exact: true }).click();
    await expect.poll(() => page.locator('html').evaluate(el => el.style.getPropertyValue('--color-brand-700'))).toBe(theme.accentHex);
    const surface = SURFACE_STYLE_PRESETS.find(surface => surface.id === theme.surfaceId)!;
    await expect(page.locator('html')).toHaveAttribute('data-theme', surface.isDark ? 'dark' : 'light');
    expect(await page.locator('html').evaluate(el => el.style.getPropertyValue('--font-literary'))).toContain(theme.readerFont);
  }
});

test('Four surface choices update dashboard and survive reload', async ({ page }) => {
  for (const surface of SURFACE_STYLE_PRESETS) {
    await page.getByRole('radio', { name: new RegExp(surface.name.replace(/[()]/g, '\\$&')) }).check();
    await expect(page.locator('html')).toHaveAttribute('data-theme', surface.isDark ? 'dark' : 'light');
    await page.getByRole('button', { name: 'Đóng cài đặt (Esc)' }).click();
    await page.reload();
    expect(await page.locator('html').evaluate(el => el.style.getPropertyValue('--color-surface'))).toBe(surface.surface);
    await expect(page.locator('html')).toHaveAttribute('data-theme', surface.isDark ? 'dark' : 'light');
    await page.getByRole('button', { name: 'Mở cài đặt sư phạm', exact: true }).click();
  }
});

test('Custom color accepts short HEX, rejects invalid value and resets', async ({ page }) => {
  const input = page.getByPlaceholder('#7A2938', { exact: true });
  await input.fill('#fff');
  await expect.poll(() => page.locator('html').evaluate(el => el.style.getPropertyValue('--color-brand-700'))).toBe('#ffffff');
  await page.getByRole('button', { name: 'Đóng cài đặt (Esc)' }).click();
  const primary = page.getByRole('button', { name: 'Tạo bài dạy', exact: true });
  for (const hovered of [false, true]) {
    if (hovered) await primary.hover();
    await expect.poll(async () => {
      const colors = await primary.evaluate(el => {
        const style = getComputedStyle(el);
        const hex = (value: string) => '#' + value.match(/\d+/g)!.slice(0, 3).map(channel => Number(channel).toString(16).padStart(2, '0')).join('');
        return [hex(style.color), hex(style.backgroundColor)];
      });
      return getContrastRatio(colors[0], colors[1]);
    }).toBeGreaterThanOrEqual(4.5);
  }
  await page.reload();
  await expect.poll(() => page.locator('html').evaluate(el => el.style.getPropertyValue('--color-brand-700'))).toBe('#ffffff');
  await page.getByRole('button', { name: 'Mở cài đặt sư phạm', exact: true }).click();
  await input.fill('not-a-color');
  expect(await page.locator('html').evaluate(el => el.style.getPropertyValue('--color-brand-700'))).toBe('#ffffff');
  await page.getByRole('button', { name: 'Khôi phục mặc định', exact: true }).click();
  await expect.poll(() => page.locator('html').evaluate(el => el.style.getPropertyValue('--color-brand-700'))).toBe('#7A2938');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('Color settings remain usable on mobile with dark and light themes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const name of ['Midnight Literature', 'Forest Scholar']) {
    await page.getByText(name, { exact: true }).click();
    const bounds = await page.getByRole('dialog').boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(390);
  }
  await page.getByRole('button', { name: 'Đóng cài đặt (Esc)' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect.poll(() => page.locator('html').evaluate(el => el.style.getPropertyValue('--color-brand-700'))).toBe('#18352B');
});
