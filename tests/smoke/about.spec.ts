import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('edumaster_tour_preferences', JSON.stringify({ hasSeenIntro: true, dismissedIntro: true })));
});

test('About: owner, contact, copy, footer/settings navigation and unchanged lesson data', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#/workspace');
  await expect(page.locator('main')).toBeVisible();
  await expect.poll(() => page.evaluate(() => localStorage.getItem('edumaster_app_state_v3'))).not.toBeNull();
  const before = await page.evaluate(() => JSON.parse(localStorage.getItem('edumaster_app_state_v3')!));
  const ownerLink = page.locator('aside[data-tour-id="sidebar"]').getByRole('link', { name: /Chủ sở hữu & quản lý: Trầm Thị Đổi/ });
  await expect(ownerLink).toContainText('Giáo viên');
  await expect(ownerLink).toContainText('Trung tâm GDNN - GDTX Duyên Hải');
  await expect(ownerLink).toContainText('Ấp Rạch, xã Hiệp Mỹ, Vĩnh Long');
  await ownerLink.click();
  await expect(page).toHaveURL(/#\/about/);
  await page.goBack();
  await page.locator('footer.app-owner-footer').getByRole('link').click();
  await expect(page.getByRole('heading', { name: 'Giới thiệu & Chủ sở hữu', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Trầm Thị Đổi' })).toBeVisible();
  await expect(page.locator('dd').filter({ hasText: 'Trung tâm GDNN - GDTX Duyên Hải' })).toBeVisible();
  await expect(page.locator('dd').filter({ hasText: 'Ấp Rạch, xã Hiệp Mỹ, Vĩnh Long' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Gửi email', exact: true })).toHaveAttribute('href', 'mailto:tramthidoi0099@gmail.com');
  await page.getByRole('button', { name: 'Sao chép email', exact: true }).click();
  await expect(page.locator('.about-page').getByRole('status')).toHaveText('Đã sao chép địa chỉ email.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('tramthidoi0099@gmail.com');
  await expect.poll(async () => page.evaluate(() => JSON.parse(localStorage.getItem('edumaster_app_state_v3')!).activeModule)).toBe('about');
  const after = await page.evaluate(() => JSON.parse(localStorage.getItem('edumaster_app_state_v3')!));
  const { activeModule: beforeModule, ...beforeData } = before;
  const { activeModule: afterModule, ...afterData } = after;
  expect(afterData).toEqual(beforeData);
  await page.goBack();
  await expect(page).toHaveURL(/#\/workspace/);
  await page.getByRole('button', { name: 'Cài đặt sư phạm' }).click();
  await page.getByRole('button', { name: '6. Phím tắt & Trợ giúp' }).click();
  await page.getByRole('button', { name: 'Xem thông tin' }).click();
  await expect(page).toHaveURL(/#\/about/);
  await expect(page.getByRole('heading', { name: 'Giới thiệu & Chủ sở hữu', exact: true })).toBeFocused();
});

for (const [width, height] of [[1366, 768], [1440, 900], [768, 1024], [390, 844]]) {
  test(`About responsive ${width}x${height} and reduced motion`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/#/about');
    await expect(page.getByRole('heading', { name: 'Giới thiệu & Chủ sở hữu', exact: true })).toBeVisible();
    expect(await page.locator('.about-scroll').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    expect(await page.locator('.about-page').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: /^Gửi email đến/ })).toBeFocused();
    await page.locator('.about-scroll').evaluate(el => { el.scrollTop = 0; });
    await page.screenshot({ path: `/tmp/edumaster-about-${width}.png` });
  });
}
