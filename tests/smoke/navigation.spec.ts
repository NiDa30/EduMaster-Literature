import { test, expect } from '@playwright/test';

test.describe('SMOKE: Sidebar Navigation (P0)', () => {
  test('SMOKE-NAV-001: Navigates across all 10 core modules without crash', async ({ page }) => {
    await page.goto('/');

    const sidebar = page.locator('aside[data-tour-id="sidebar"]');
    await expect(sidebar).toBeVisible();

    // 1. Tác phẩm (Literature Workspace)
    await sidebar.getByRole('button', { name: 'Tác phẩm' }).click();
    await expect(page).toHaveURL(/#\/workspace/);
    await expect(page.locator('main')).toBeVisible();

    // 2. Phân tích thể loại (Genre Analysis)
    await sidebar.getByRole('button', { name: 'Phân tích thể loại' }).click();
    await expect(page).toHaveURL(/#\/genre_analysis/);
    await expect(page.locator('main')).toBeVisible();

    // 3. Kế hoạch bài dạy (KHBD 5512)
    await sidebar.getByRole('button', { name: 'Kế hoạch bài dạy' }).click();
    await expect(page).toHaveURL(/#\/khbd/);
    await expect(page.locator('main')).toBeVisible();

    // 4. Câu hỏi (Question Builder)
    await sidebar.getByRole('button', { name: 'Câu hỏi' }).click();
    await expect(page).toHaveURL(/#\/question_builder/);
    await expect(page.locator('main')).toBeVisible();

    // 5. Ma trận & Đặc tả (Matrix)
    await sidebar.getByRole('button', { name: 'Ma trận & Đặc tả' }).click();
    await expect(page).toHaveURL(/#\/matrix/);
    await expect(page.locator('main')).toBeVisible();

    // 6. Đề kiểm tra (Exam 7991)
    await sidebar.getByRole('button', { name: 'Đề kiểm tra' }).click();
    await expect(page).toHaveURL(/#\/exam/);
    await expect(page.locator('main')).toBeVisible();

    // 7. Rubric
    await sidebar.getByRole('button', { name: 'Rubric' }).click();
    await expect(page).toHaveURL(/#\/rubric/);
    await expect(page.locator('main')).toBeVisible();

    // 8. Slide
    await sidebar.getByRole('button', { name: 'Slide' }).click();
    await expect(page).toHaveURL(/#\/slides/);
    await expect(page.locator('main')).toBeVisible();

    // 9. Xuất bản (Export Handover)
    await sidebar.getByRole('button', { name: 'Xuất bản' }).click();
    await expect(page).toHaveURL(/#\/export_handover/);
    await expect(page.locator('main')).toBeVisible();

    // 10. Bàn làm việc (Dashboard)
    await sidebar.getByRole('button', { name: 'Bàn làm việc' }).click();
    await expect(page).toHaveURL(/#\/dashboard/);
    await expect(page.getByRole('heading', { name: 'Bàn làm việc Giáo viên' })).toBeVisible();
  });
});
