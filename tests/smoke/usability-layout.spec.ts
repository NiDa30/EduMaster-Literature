import { test, expect } from '@playwright/test';

for (const viewport of [{ width: 1366, height: 768 }, { width: 1440, height: 900 }, { width: 768, height: 1024 }, { width: 390, height: 844 }]) {
  test(`Workspaces remain readable and reachable at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.addInitScript(() => localStorage.setItem('edumaster_tour_preferences', JSON.stringify({ hasSeenIntro: true, dismissedIntro: true })));
    for (const route of ['workspace', 'question_builder', 'exam', 'matrix', 'rubric', 'slides', 'export_handover']) {
      await page.goto(`/#/${route}`);
      const main = page.locator('main');
      await expect(main).toBeVisible();
      expect(await main.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
      const mainBounds = (await main.boundingBox())!;
      for (const button of await page.locator('.workspace-header button').all()) {
        const bounds = await button.boundingBox();
        if (!bounds) continue;
        expect(bounds.x).toBeGreaterThanOrEqual(mainBounds.x);
        expect(bounds.x + bounds.width).toBeLessThanOrEqual(mainBounds.x + mainBounds.width + 1);
      }
      if (route === 'workspace' && viewport.width >= 1024) {
        expect((await page.locator('.reader-column').boundingBox())!.width).toBeGreaterThan(600);
      }
      if (route === 'question_builder' && viewport.width < 1024) {
        await page.getByRole('button', { name: 'Tạo câu hỏi', exact: true }).click();
        const editor = page.locator('.question-editor');
        await expect(editor).toBeInViewport();
        expect((await editor.boundingBox())!.width).toBeGreaterThan(viewport.width - 80);
        const field = editor.locator('textarea').first();
        await field.scrollIntoViewIfNeeded();
        await expect(field).toBeInViewport();
        expect(await field.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(viewport.width < 768 ? 16 : 14);
      }
      if (route === 'exam' && viewport.width < 1024) {
        const document = page.locator('.exam-document');
        await document.scrollIntoViewIfNeeded();
        await expect(document).toBeInViewport();
        expect((await document.boundingBox())!.width).toBeGreaterThan(viewport.width - 80);
      }
      if (route === 'slides' && viewport.width < 1024) {
        const stage = page.locator('[data-tour-id="slides-stage"]');
        await stage.scrollIntoViewIfNeeded();
        expect((await stage.boundingBox())!.width).toBeGreaterThan(viewport.width - 80);
        await page.getByRole('button', { name: 'Thiết kế & Biên tập', exact: true }).click();
        await expect(page.locator('.slides-inspector')).toBeInViewport();
      }
      if (route === 'export_handover' && viewport.width < 1024) {
        const backup = page.locator('[data-tour-id="backup-restore"]');
        const restore = backup.locator('textarea');
        await restore.scrollIntoViewIfNeeded();
        await expect(restore).toBeInViewport();
        expect((await backup.boundingBox())!.height).toBeLessThanOrEqual(600);
      }
    }
  });
}
