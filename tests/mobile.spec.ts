import { test, expect, devices } from '@playwright/test';

// All tests in this file run at a mobile viewport so the hamburger
// CSS media query (@media max-width: 640px) is active.
test.use({
  ...devices['Pixel 5'],
});

test.describe('Mobile topbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('shows the hamburger toggle and starts with the drawer closed', async ({ page }) => {
    await expect(page.locator('#nav-toggle')).toBeVisible();
    await expect(page.locator('header.topbar ul.nav')).not.toHaveClass(/open/);
    await expect(page.locator('#nav-toggle')).toHaveAttribute('aria-expanded', 'false');
  });

  test('opens the nav drawer when the hamburger is clicked', async ({ page }) => {
    await page.locator('#nav-toggle').click();
    await expect(page.locator('header.topbar ul.nav')).toHaveClass(/open/);
    await expect(page.locator('#nav-toggle')).toHaveAttribute('aria-expanded', 'true');
  });

  test('closes the drawer when a nav link is tapped', async ({ page }) => {
    await page.locator('#nav-toggle').click();
    const nav = page.locator('header.topbar ul.nav');
    await expect(nav).toHaveClass(/open/);

    await nav.getByRole('link', { name: 'Contact' }).click();
    await expect(nav).not.toHaveClass(/open/);
    await expect(page.locator('#nav-toggle')).toHaveAttribute('aria-expanded', 'false');
  });
});
