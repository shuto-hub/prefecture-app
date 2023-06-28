import { test, expect } from '@playwright/test';
test.describe.configure({ mode: 'parallel' });

test.describe('index', () => {
  test('basic認証', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('h1')).not.toBeVisible();
  });
  test('画面表示と操作', async ({ browser }) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: 'admin',
        password: 'admin',
      },
    });
    const page = await context.newPage();
    await page.goto('./');
    await expect(page.locator('h1')).toBeVisible();
    await page.locator('text=東京都').click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot();
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
});
