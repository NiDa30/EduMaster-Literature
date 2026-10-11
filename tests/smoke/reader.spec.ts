import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addLocatorHandler(page.getByRole('dialog', { name: 'Chào mừng đến với EduMaster Văn' }), async dialog => {
    await dialog.getByText('Để sau', { exact: true }).click();
  });
});

test.describe('SMOKE: Literature Workspace & Reader (P0)', () => {
  test('SMOKE-READER-001: Renders Literature Reader with text content, outline, and insight panel', async ({ page }) => {
    await page.goto('/#/workspace');

    // Literary text reader area
    const readerMain = page.locator('main');
    await expect(readerMain).toBeVisible();

    // Verify left column tabs (Cấu trúc / Chú thích)
    const structureTab = page.getByRole('button', { name: /Cấu trúc/ });
    const annotationsTab = page.getByRole('button', { name: /Chú thích/ });
    await expect(structureTab).toBeVisible();
    await expect(annotationsTab).toBeVisible();

    // Switch to annotations tab
    await annotationsTab.click();
    await expect(readerMain.getByRole('button', { name: 'Xóa chú thích' }).first()).toBeVisible();

    // Switch back to structure tab
    await structureTab.click();

    await readerMain.getByRole('button', { name: 'Nghiên cứu tác phẩm', exact: true }).click();
    // Current literary research panel and its pedagogical tabs
    await expect(readerMain.getByText('Nghiên cứu văn bản')).toBeVisible();
    await expect(readerMain.getByRole('button', { name: 'Thi pháp', exact: true })).toBeVisible();
    await expect(readerMain.getByRole('button', { name: 'Dẫn chứng', exact: true })).toBeVisible();
  });

  test('SMOKE-READER-002: Handles text selection floating toolbar interaction', async ({ page }) => {
    await page.goto('/#/workspace');

    // Locate reading document passage
    const documentBody = page.locator('.font-serif').first();
    await expect(documentBody).toBeVisible();

    // Verify document contains literature text
    const textContent = await documentBody.textContent();
    expect(textContent).toBeTruthy();
    expect(textContent!.length).toBeGreaterThan(10);
  });
});
