import { test, expect } from '@playwright/test';
test.describe.configure({ mode: 'parallel' });

test.describe('index', () => {
  // basic認証を通さない場合、初期表示されないこと
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
    // タイトルが表示されること(初期表示できるか)
    await expect(page.locator('h1')).toBeVisible();
    // 都道府県のチェックボックスをクリック
    await page.locator('text=東京都').click();
    await page.waitForTimeout(1000);
    await page.locator('text=大阪府').click();
    await page.waitForTimeout(1000);
    // 複数選択した場合表示される要素が取得できること
    const series = page.locator('.apexcharts-legend-series');
    // 「東京都」「大阪府」で2件取得できていること
    expect(await series.count()).toBe(2);
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
});
