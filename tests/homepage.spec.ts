import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('file://' + process.cwd() + '/../index.html');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle('Situ E. Chen');
  });

  test('should have correct navigation links', async ({ page }) => {
    const navLinks = ['Top', 'Work', 'Portfolio', 'Blog', 'Things I Care About', 'Contact'];
    for (const link of navLinks) {
      await expect(page.getByRole('link', { name: link })).toBeVisible();
    }
  });

  test('should display author image', async ({ page }) => {
    const authorImage = page.locator('img[src="images/author.jpg"]');
    await expect(authorImage).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL(/.*blog.html/);
  });
});
