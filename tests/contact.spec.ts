import { test, expect } from '@playwright/test';

test.describe('Contact Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('file://' + process.cwd() + '/../index.html#contact');
  });

  test('should load contact section successfully', async ({ page }) => {
    const contactForm = page.locator('form');
    await expect(contactForm).toBeVisible();
  });

  test('should have required form fields', async ({ page }) => {
    const requiredFields = ['name', 'email', 'subject', 'message'];
    for (const field of requiredFields) {
      const input = page.locator(`[name="${field}"]`);
      await expect(input).toBeVisible();
      await expect(input).toHaveAttribute('required', '');
    }
  });

  test('should validate email format', async ({ page }) => {
    const emailInput = page.locator('[name="email"]');
    await emailInput.fill('invalid-email');
    await page.locator('input[type="submit"]').click();
    await expect(page.url()).toContain('index.html#contact');
  });

  test('should have working social media links', async ({ page }) => {
    const amazonLink = page.locator('a[href*="amazon.com"]');
    await expect(amazonLink).toBeVisible();
    
    const wechatIcon = page.locator('#wechat-icon');
    await expect(wechatIcon).toBeVisible();
    await wechatIcon.click();
    const modal = page.locator('#wechat-modal');
    await expect(modal).toBeVisible();
  });
}); 
