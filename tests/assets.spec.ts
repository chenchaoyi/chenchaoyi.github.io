import { test, expect } from '@playwright/test';

test.describe('Static assets', () => {
  test('site.css loads and defines the design tokens', async ({ request }) => {
    const res = await request.get('/assets/css/site.css');
    expect(res.status()).toBe(200);
    const body = await res.text();
    // Spot-check that the documented design tokens are still there.
    for (const token of ['--bg:', '--ink:', '--accent:', '--maxw:']) {
      expect(body).toContain(token);
    }
  });

  test('favicon trio responds with the correct content types', async ({ request }) => {
    const svg = await request.get('/images/favicon.svg');
    expect(svg.status()).toBe(200);
    expect(svg.headers()['content-type']).toContain('image/svg');

    const ico = await request.get('/images/favicon.ico');
    expect(ico.status()).toBe(200);

    const apple = await request.get('/images/apple-touch-icon.png');
    expect(apple.status()).toBe(200);
    expect(apple.headers()['content-type']).toContain('image/png');
  });

  test('the homepage declares all three favicon variants', async ({ page }) => {
    await page.goto('/index.html');
    await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate icon"]')).toHaveCount(1);
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
  });

  test('Google Fonts preconnect hints are present on every shell page', async ({ page }) => {
    for (const path of ['/index.html', '/blog.html', '/causes.html']) {
      await page.goto(path);
      await expect(page.locator('link[rel="preconnect"][href="https://fonts.googleapis.com"]')).toHaveCount(1);
      await expect(page.locator('link[href*="Newsreader"]')).toHaveCount(1);
    }
  });
});
