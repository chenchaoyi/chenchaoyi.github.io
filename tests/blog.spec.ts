import { test, expect } from '@playwright/test';

test.describe('Blog Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('file://' + process.cwd() + '/../blog.html');
  });

  test('should load blog page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Blog/);
  });

  test('should display blog posts', async ({ page }) => {
    const blogPosts = page.locator('.blog-post');
    await expect(blogPosts).toHaveCount(1);
  });

  test('should have working post links', async ({ page }) => {
    const postLink = page.locator('.blog-post a').first();
    await expect(postLink).toBeVisible();
    await postLink.click();
    await expect(page).toHaveURL(/.*blog\/.*\.html/);
  });

  test('should have working navigation back to homepage', async ({ page }) => {
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL(/.*index\.html/);
  });
});
