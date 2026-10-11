import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('Built app: Vietnamese question persistence, all document exports and backup restore', async ({ page }) => {
  test.setTimeout(60000);
  await page.addInitScript(() => localStorage.setItem('edumaster_tour_preferences', JSON.stringify({ hasSeenIntro: true, dismissedIntro: true })));
  await page.goto('/#/question_builder');
  await page.getByRole('button', { name: 'Tạo câu hỏi', exact: true }).click();
  const question = 'Phân tích vẻ đẹp người lính Tây Tiến và tình yêu quê hương.';
  await page.getByPlaceholder('Nội dung câu hỏi...', { exact: true }).fill(question);
  await page.getByPlaceholder('Ý trả lời chuẩn...', { exact: true }).fill('Vẻ đẹp hào hoa, lòng quả cảm và khát vọng cống hiến.');
  await page.getByRole('button', { name: 'Lưu vào Ngân hàng', exact: true }).click();
  await expect(page.locator('.question-bank').getByText(question, { exact: true })).toBeVisible();
  await expect.poll(() => page.evaluate(() => localStorage.getItem('edumaster_app_state_v3'))).toContain(question);
  await page.reload();
  await expect(page.locator('.question-bank').getByText(question, { exact: true })).toBeVisible();
  await page.goto('/#/export_handover');
  for (const [label, extension] of [
    ['Tải Word (.docx)', '.docx'], ['Tải Đề thi (.docx)', '.docx'],
    ['Tải Ma trận (.docx)', '.docx'], ['Tải Rubric (.docx)', '.docx'], ['Tải PPTX (.pptx)', '.pptx'],
  ]) {
    const promise = page.waitForEvent('download');
    await page.getByRole('button', { name: label, exact: true }).click();
    const download = await promise;
    expect(download.suggestedFilename()).toMatch(new RegExp(`\\${extension}$`));
    const data = await readFile((await download.path())!);
    expect(data.subarray(0, 2).toString()).toBe('PK');
    expect(data.length).toBeGreaterThan(1000);
  }
  const promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Tải bản sao lưu', exact: true }).click();
  const backup = await promise;
  const json = await readFile((await backup.path())!, 'utf8');
  expect(json).toContain(question);
  const stored = JSON.parse(json);
  expect(stored.lessons.length).toBeGreaterThan(0);
  const restore = page.getByPlaceholder('Dán nội dung tệp sao lưu (.json) vào đây để khôi phục...', { exact: true });
  await restore.fill(json);
  await page.getByRole('button', { name: 'Khôi phục dữ liệu', exact: true }).click();
  await expect(page.getByText('Nạp thành công phiên làm việc!', { exact: true })).toBeVisible();
  await page.goto('/#/question_builder');
  await expect(page.locator('.question-bank').getByText(question, { exact: true })).toBeVisible();
});
