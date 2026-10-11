import { test, expect } from '@playwright/test';

const vietnamese = 'Trầm Thị Đổi — Ngữ văn: Đđ Ăă Ââ Êê Ôô Ơơ Ưư Ắằ Ễễ ộ ự ỵ a\u0306\u0301';
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('edumaster_tour_preferences', JSON.stringify({ hasSeenIntro: true, dismissedIntro: true })));
  // Fonts must render when external font services are unavailable.
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, route => route.abort());
});

test('Vietnamese UI and Reader fonts load local glyphs instead of silently falling back', async ({ page }) => {
  await page.goto('/#/workspace');
  await page.getByRole('button', { name: 'Mở cài đặt sư phạm', exact: true }).click();
  const session = await page.context().newCDPSession(page);
  await session.send('DOM.enable'); await session.send('CSS.enable');
  for (const family of ['Be Vietnam Pro', 'Inter', 'Noto Sans', 'Lora', 'Merriweather', 'Noto Serif', 'JetBrains Mono']) {
    const faces = await page.evaluate(async ({ family, vietnamese }) => {
      const faces = await document.fonts.load(`600 18px "${family}"`, vietnamese);
      const probe = document.createElement('span'); probe.id = 'vietnamese-font-probe';
      probe.textContent = vietnamese; probe.style.cssText = `font-family:"${family}";font-weight:600;position:fixed;top:80px;left:20px;z-index:10000;background:white`;
      document.getElementById(probe.id)?.remove(); document.body.append(probe);
      return faces.length;
    }, { family, vietnamese });
    expect(faces, `${family} has installed faces`).toBeGreaterThan(0);
    const { root } = await session.send('DOM.getDocument');
    const { nodeId } = await session.send('DOM.querySelector', { nodeId: root.nodeId, selector: '#vietnamese-font-probe' });
    const { fonts } = await session.send('CSS.getPlatformFontsForNode', { nodeId });
    expect(fonts.length).toBeGreaterThan(0);
    expect(fonts.every((font: { isCustomFont: boolean }) => font.isCustomFont), `${family} renders Vietnamese with the loaded web font`).toBe(true);
  }
  await page.evaluate(() => document.getElementById('vietnamese-font-probe')?.remove());
  for (const family of ['Inter', 'Noto Sans', 'Be Vietnam Pro']) {
    await page.getByRole('combobox', { name: 'Phông chữ giao diện', exact: true }).selectOption(family);
    expect(await page.locator('body').evaluate(el => getComputedStyle(el).fontFamily)).toContain(family);
  }
  await page.getByRole('button', { name: '2. Soạn giảng & Reader', exact: true }).click();
  for (const family of ['Merriweather', 'Noto Serif', 'Lora']) {
    await page.getByRole('combobox', { name: 'Phông chữ đọc', exact: true }).selectOption(family);
    expect(await page.locator('main article .text-document').evaluate(el => getComputedStyle(el).fontFamily)).toContain(family);
  }
});

test('Slow hover lasts 320ms and visibly progresses while typography stays unchanged', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/#/dashboard');
  await page.getByRole('button', { name: 'Mở cài đặt sư phạm', exact: true }).click();
  await page.getByRole('button', { name: 'Chuyển động: Chậm & êm', exact: true }).click();
  const button = page.getByRole('button', { name: 'Hover & Bấm thử', exact: true });
  const before = await button.evaluate(el => { const s = getComputedStyle(el); return { family: s.fontFamily, size: s.fontSize, weight: s.fontWeight }; });
  await button.hover();
  const animations = await button.evaluate(el => el.getAnimations().map(a => ({ duration: a.effect?.getTiming().duration, property: (a as CSSTransition).transitionProperty })));
  expect(animations.some(a => a.property === 'transform' && a.duration === 320)).toBe(true);
  const during = await button.evaluate(el => { const s = getComputedStyle(el); return { family: s.fontFamily, size: s.fontSize, weight: s.fontWeight }; });
  expect(during).toEqual(before);
  await expect.poll(() => button.evaluate(el => getComputedStyle(el).transform)).toBe('matrix(1, 0, 0, 1, 0, -1)');
  const card = page.getByText('Thẻ bài giảng mẫu (Hover thử)', { exact: true }).locator('..').locator('..');
  await card.hover();
  expect(await card.evaluate(el => el.getAnimations().some(a => a.effect?.getTiming().duration === 320))).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => card.evaluate(el => getComputedStyle(el).transform)).toBe('none');
  await page.getByRole('checkbox', { name: 'Tôn trọng cài đặt Giảm chuyển động', exact: true }).uncheck();
  await card.hover();
  await expect.poll(() => card.evaluate(el => getComputedStyle(el).transform)).toBe('matrix(1, 0, 0, 1, 0, -1)');
  await page.getByRole('checkbox', { name: 'Tôn trọng cài đặt Giảm chuyển động', exact: true }).check();
  await card.hover();
  await expect.poll(() => card.evaluate(el => getComputedStyle(el).transform)).toBe('none');
});

for (const policy of ['off', 'reduced', 'override', 'click-disabled'] as const) {
  test(`Every button family obeys motion policy: ${policy}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/#/dashboard');
    await page.evaluate(policy => {
      const root = document.documentElement;
      root.dataset.motion = policy === 'off' ? 'off' : 'slow';
      root.dataset.respectReducedMotion = policy === 'reduced' ? 'true' : 'false';
      root.dataset.motionButton = policy === 'click-disabled' ? 'false' : 'true';
      const panel = document.createElement('div'); panel.id = 'button-policy-probe';
      panel.style.cssText = 'position:fixed;top:100px;left:20px;z-index:10000;background:white;display:flex;gap:8px';
      for (const cls of ['btn-primary', 'btn-secondary', 'btn-ghost', 'btn-icon', 'btn-danger', 'btn-motion', 'btn-icon-motion', 'about-button']) {
        const button = document.createElement('button'); button.className = cls; button.textContent = cls; panel.append(button);
      }
      document.body.append(panel);
    }, policy);
    for (const button of await page.locator('#button-policy-probe button').all()) {
      await button.hover(); await page.mouse.down();
      if (policy === 'override') {
        await expect.poll(() => button.evaluate(el => getComputedStyle(el).transform)).not.toBe('none');
      } else {
        await expect.poll(() => button.evaluate(el => getComputedStyle(el).transform)).toBe('none');
      }
      await page.mouse.up();
    }
  });
}
