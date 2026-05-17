import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Situ E. Chen');
  });

  test('shows all six nav items in the topbar', async ({ page }) => {
    const nav = page.locator('header.topbar nav ul.nav');
    const labels = ['Top', 'Work', 'Portfolio', 'Blog', 'Things I Care About', 'Contact'];
    for (const label of labels) {
      await expect(nav.getByRole('link', { name: label })).toBeVisible();
    }
  });

  test('renders the author illustration', async ({ page }) => {
    const portrait = page.locator('img[src="images/author/author3.png"]');
    await expect(portrait).toBeVisible();
    // Image must actually load (naturalWidth > 0)
    const width = await portrait.evaluate((el: HTMLImageElement) => el.naturalWidth);
    expect(width).toBeGreaterThan(0);
  });

  test('navigates to the blog from the topbar', async ({ page }) => {
    await page.locator('header.topbar').getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL(/blog\.html/);
    await expect(page).toHaveTitle(/Journal/);
  });

  test('Portfolio anchor scrolls to the portfolio section', async ({ page }) => {
    await page.locator('header.topbar').getByRole('link', { name: 'Portfolio' }).click();
    await expect(page).toHaveURL(/#portfolio$/);
    const portfolioSection = page.locator('#portfolio');
    await expect(portfolioSection).toBeInViewport();
  });

  test('renders the redesigned editorial markers (eyebrow, italic accent)', async ({ page }) => {
    // .eyebrow with a leading terracotta dot is part of the design system.
    await expect(page.locator('.eyebrow').first()).toBeVisible();
    // The hero h1 carries italic <em> styled in the accent color.
    await expect(page.locator('h1 em').first()).toBeVisible();
  });
});
