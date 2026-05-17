import { test, expect } from '@playwright/test';

test.describe('Contact section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html#contact');
  });

  test('renders the contact form', async ({ page }) => {
    await expect(page.locator('form.contact-form')).toBeVisible();
  });

  test('all four fields are present and required', async ({ page }) => {
    for (const name of ['name', 'email', 'subject', 'message']) {
      const field = page.locator(`form.contact-form [name="${name}"]`);
      await expect(field).toBeVisible();
      // boolean attributes serialise to empty string in HTML
      const required = await field.getAttribute('required');
      expect(required).not.toBeNull();
    }
  });

  test('submitting with an invalid email is blocked by native validation', async ({ page }) => {
    await page.locator('[name="name"]').fill('Test');
    await page.locator('[name="email"]').fill('not-an-email');
    await page.locator('[name="subject"]').fill('Hi');
    await page.locator('[name="message"]').fill('Hello');
    await page.locator('form.contact-form button[type="submit"]').click();
    // Native validation keeps us on the page (does not navigate to formsubmit.co)
    await expect(page).toHaveURL(/index\.html#contact$/);
    const valid = await page.locator('[name="email"]').evaluate(
      (el: HTMLInputElement) => el.validity.valid,
    );
    expect(valid).toBe(false);
  });

  test('Amazon author-store link is present', async ({ page }) => {
    const amazon = page.locator('section#contact a[href*="amazon.com/stores/Situ-Chen"]');
    await expect(amazon).toBeVisible();
  });

  test.describe('WeChat modal', () => {
    test('opens when the WeChat link is clicked', async ({ page }) => {
      await page.locator('#wechat-link').click();
      await expect(page.locator('#wechat-modal')).toHaveClass(/open/);
      await expect(page.locator('#wechat-modal .modal-card')).toBeVisible();
    });

    test('closes via the × button', async ({ page }) => {
      await page.locator('#wechat-link').click();
      await page.locator('#modal-close').click();
      await expect(page.locator('#wechat-modal')).not.toHaveClass(/open/);
    });

    test('closes when the backdrop is clicked', async ({ page }) => {
      await page.locator('#wechat-link').click();
      // Click the backdrop (the modal itself, not the inner card)
      await page.locator('#wechat-modal').click({ position: { x: 5, y: 5 } });
      await expect(page.locator('#wechat-modal')).not.toHaveClass(/open/);
    });

    test('closes when Escape is pressed', async ({ page }) => {
      await page.locator('#wechat-link').click();
      await expect(page.locator('#wechat-modal')).toHaveClass(/open/);
      await page.keyboard.press('Escape');
      await expect(page.locator('#wechat-modal')).not.toHaveClass(/open/);
    });
  });
});
