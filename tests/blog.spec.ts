import { test, expect } from '@playwright/test';

test.describe('Blog index', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog.html');
  });

  test('loads with the Journal title', async ({ page }) => {
    await expect(page).toHaveTitle(/Journal/);
  });

  test('renders the full post list', async ({ page }) => {
    // All <li> in #post-list exist in the DOM regardless of pagination.
    const items = page.locator('#post-list > li');
    const total = await items.count();
    expect(total).toBeGreaterThanOrEqual(40);
  });

  test('paginates to 8 visible posts at a time', async ({ page }) => {
    const visible = page.locator('#post-list > li:visible');
    await expect(visible).toHaveCount(8);
    await expect(page.locator('#current-page')).toHaveText('1');
  });

  test('Next advances the page and Previous goes back', async ({ page }) => {
    await page.locator('#next-page').click();
    await expect(page.locator('#current-page')).toHaveText('2');
    await page.locator('#prev-page').click();
    await expect(page.locator('#current-page')).toHaveText('1');
    await expect(page.locator('#prev-page')).toHaveClass(/disabled/);
  });

  test('disables Next on the final page', async ({ page }) => {
    const totalPages = parseInt(await page.locator('#total-pages').innerText(), 10);
    for (let i = 1; i < totalPages; i++) {
      await page.locator('#next-page').click();
    }
    await expect(page.locator('#current-page')).toHaveText(String(totalPages));
    await expect(page.locator('#next-page')).toHaveClass(/disabled/);
  });

  test('TOC categories are clickable and toggle open/closed', async ({ page }) => {
    const firstCat = page.locator('.toc-cat').first();
    await expect(firstCat).toHaveClass(/open/); // first category open by default

    const head = firstCat.locator('.cat-head');
    await head.click();
    await expect(firstCat).not.toHaveClass(/open/);
    await head.click();
    await expect(firstCat).toHaveClass(/open/);
  });

  test('every internal post link resolves under /blogs/', async ({ page }) => {
    const internalLinks = await page
      .locator('#post-list a.post-link:not([target="_blank"])')
      .evaluateAll((els) => els.map((a) => (a as HTMLAnchorElement).getAttribute('href')));
    expect(internalLinks.length).toBeGreaterThan(0);
    for (const href of internalLinks) {
      expect(href).toMatch(/^blogs\/[^/]+\.html$/);
    }
  });

  test('clicking the topbar brand returns to the homepage', async ({ page }) => {
    await page.locator('header.topbar a.brand').click();
    await expect(page).toHaveURL(/index\.html$/);
  });
});
