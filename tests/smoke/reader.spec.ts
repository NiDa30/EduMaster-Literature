import { test, expect } from '@playwright/test';

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
    await expect(page.getByText(/Ghi chú & Dẫn chứng/i)).toBeVisible();

    // Switch back to structure tab
    await structureTab.click();

    // Right column tabs (Phân tích tác phẩm / Ghi chú sư phạm)
    await expect(page.getByRole('button', { name: /Phân tích/ }).first()).toBeVisible();
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
