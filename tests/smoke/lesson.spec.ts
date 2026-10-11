import { test, expect } from '@playwright/test';
import { smokeLessonData } from '../fixtures/smokeLesson';

test.beforeEach(async ({ page }) => {
  await page.addLocatorHandler(page.getByRole('dialog', { name: 'Chào mừng đến với EduMaster Văn' }), async dialog => {
    await dialog.getByText('Để sau', { exact: true }).click();
  });
});

test.describe('SMOKE: Lesson Management (P0)', () => {
  test('SMOKE-LESSON-001: Switches current lesson via TopBar dropdown', async ({ page }) => {
    await page.goto('/');

    const lessonSwitcher = page.locator('[data-tour-id="lesson-switcher"]');
    await expect(lessonSwitcher).toBeVisible();

    // Open lesson switcher
    await lessonSwitcher.locator('button').first().click();

    // Select "Vợ nhặt"
    const targetOption = page.locator('button').filter({ hasText: 'Vợ nhặt' }).first();
    await expect(targetOption).toBeVisible();
    await targetOption.click();

    // Check TopBar reflects updated lesson
    await expect(lessonSwitcher.getByText('Vợ nhặt')).toBeVisible();

    // Check toast notification appears
    await expect(page.getByText('Đã chuyển sang tác phẩm')).toBeVisible();
  });

  test('SMOKE-LESSON-002: Creates a minimal valid lesson and opens workspace', async ({ page }) => {
    await page.goto('/');

    // Click "Tạo bài dạy" button
    const createBtn = page.getByRole('button', { name: 'Tạo bài dạy', exact: true });
    await expect(createBtn).toBeVisible();
    await createBtn.click();

    // Modal dialog
    const modal = page.locator('.anim-modal-dialog');
    await expect(modal).toBeVisible();
    await expect(modal.getByRole('heading', { name: 'Thiết lập Bài dạy Ngữ văn mới' })).toBeVisible();

    // Fill form using fixtures
    const data = smokeLessonData.newLessonInput;
    await modal.getByPlaceholder(/VD: Tây Tiến, Vợ nhặt/).fill(data.title);
    await modal.getByPlaceholder(/VD: Quang Dũng, Kim Lân/).fill(data.author);
    await modal.getByPlaceholder(/Học sinh nhận biết/).fill(data.objectives);
    await modal.getByPlaceholder(/Dán toàn văn bài thơ/).fill(data.sourceText);

    // Submit form
    await modal.getByRole('button', { name: 'Khởi tạo và Soạn bài ngay' }).click();

    // Expected: Modal closes, URL updates to workspace, toast notification shows
    await expect(modal).not.toBeVisible();
    await expect(page).toHaveURL(/#\/workspace/);
    await expect(page.getByText(data.title).first()).toBeVisible();
  });
});
