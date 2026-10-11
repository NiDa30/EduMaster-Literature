import { test, expect } from '@playwright/test';

test.describe('SMOKE: App Startup & Core Shell (P0)', () => {
  test('SMOKE-STARTUP-001: Dev server serves app, root renders with no fatal console errors', async ({ page }) => {
    const fatalErrors: string[] = [];
    page.on('pageerror', (err) => {
      fatalErrors.push(`[PAGEERROR] ${err.message}`);
    });
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignore non-fatal React / Vite dev server warnings or known minor dev warnings
        if (!text.includes('favicon.ico') && !text.includes('Tour')) {
          // Track genuine fatal errors
          if (text.includes('Uncaught') || text.includes('TypeError') || text.includes('ReferenceError')) {
            fatalErrors.push(`[CONSOLE.ERROR] ${text}`);
          }
        }
      }
    });

    await page.goto('/');

    // Check root app shell
    const appShell = page.locator('.app-shell');
    await expect(appShell).toBeVisible({ timeout: 10000 });

    // Expect no fatal uncaught exceptions
    expect(fatalErrors).toHaveLength(0);
  });

  test('SMOKE-STARTUP-002: Dashboard, TopBar, and Sidebar render properly', async ({ page }) => {
    await page.goto('/');

    // Sidebar branding
    const brand = page.locator('aside').getByText('EduMaster Văn', { exact: true });
    await expect(brand).toBeVisible();

    // TopBar element
    const topBar = page.locator('header');
    await expect(topBar).toBeVisible();

    // Dashboard title
    const dashboardTitle = page.getByRole('heading', { name: 'Bàn làm việc Giáo viên' });
    await expect(dashboardTitle).toBeVisible();

    // Resume card with current lesson
    const resumeCard = page.locator('[data-tour-id="dashboard-resume"]');
    await expect(resumeCard).toBeVisible();
    await expect(resumeCard.getByText('Tây Tiến')).toBeVisible();

    // Quick Actions CTA
    const openWorkspaceBtn = page.getByRole('button', { name: 'Mở không gian soạn' });
    await expect(openWorkspaceBtn).toBeVisible();
  });
});
