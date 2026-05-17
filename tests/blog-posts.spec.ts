import { test, expect } from '@playwright/test';

const POSTS = [
  { file: 'chimes-post.html', titleContains: 'Chimes' },
  { file: 'crystal-want-writing-post.html', titleContains: 'Crystal, Want and Writing' },
  { file: 'digital-illustration-post.html', titleContains: 'Digital Illustration' },
  { file: 'disney-problems-post.html', titleContains: 'Disney - Part 1' },
  { file: 'disney-problems-post-2.html', titleContains: 'Salvageable or Spineless' },
  { file: 'infinite-post.html', titleContains: 'Infinite' },
  { file: 'introvert-life-post.html', titleContains: "Introvert's Life" },
  { file: 'introvert-post.html', titleContains: 'Being An Introvert' },
  { file: 'olivias-chapter-post.html', titleContains: "Olivia's Chapter" },
  { file: 'philosophy-religion-cults-post.html', titleContains: 'Wherever Philosophy Takes You' },
  { file: 'slaughterhouse-animal-abuse-post.html', titleContains: 'Slaughterhouse' },
  { file: 'social-media-literature-post.html', titleContains: 'Social Media on Modern Literature' },
];

test.describe('Blog post pages', () => {
  for (const { file, titleContains } of POSTS) {
    test(`${file} loads with the new template`, async ({ page }) => {
      const response = await page.goto(`/blogs/${file}`);
      expect(response?.status()).toBe(200);

      await expect(page).toHaveTitle(new RegExp(titleContains));

      // Topbar present with all six nav items
      const nav = page.locator('header.topbar nav ul.nav');
      const linkCount = await nav.locator('a').count();
      expect(linkCount).toBe(6);

      // Post heading and "posted on" meta — tolerate both the standard
      // box.style1 wrapper (.post-meta) and the comic-strip layout (.blog-meta).
      await expect(page.locator('main h2').first()).toBeVisible();
      await expect(page.locator('main .post-meta, main .blog-meta').first()).toBeVisible();

      // Back-to-blog link (multiple may exist; just check at least one is visible)
      await expect(page.getByRole('link', { name: /Back to Blog/i }).first()).toBeVisible();

      // No stale references to the old Miniport stack
      const html = await page.content();
      expect(html).not.toMatch(/jquery|fontawesome|miniport|is-preload/i);
    });
  }
});
