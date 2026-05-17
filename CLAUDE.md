# CLAUDE.md — situchen.me

> Operating notes for Claude Code working on this site. Keep edits aligned with the conventions below.

## What this site is

The personal site of **Situ E. Chen** (陈思逢) — a young author and graphic novelist. It showcases her published books, an essay/review journal, and the causes she cares about. Hosted on GitHub Pages at `situchen.me`. Pure static HTML — no build step, no framework.

## File layout

```
/
├─ index.html          Hero, Work, Portfolio, Contact (single-page with hash anchors)
├─ blog.html           Journal: paginated post list + categorised TOC sidebar
├─ causes.html         Long-form: Gender Equality + Animal Rights
├─ blogs/              Individual post pages (one HTML file per post)
├─ assets/
│  └─ css/site.css     Single shared stylesheet — ALL styling lives here
├─ images/             Photos, illustrations, book covers, QR codes
├─ CNAME               GitHub Pages custom domain
└─ CLAUDE.md           This file
```

There is no JS framework, no bundler, no package manager. Edit HTML and `site.css` directly.

## Design system (already established — match it)

### Aesthetic
Editorial / literary. Warm cream page with deep ink type, a single terracotta accent, generous whitespace, no card chrome. Looks like a writer's column, not a SaaS landing page.

### Color tokens (from `site.css` `:root`)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#f3ede1` | Page background — tuned to match the author portrait |
| `--bg-deep` | `#ebe3d2` | Subtle inset blocks |
| `--bg-card` | `#faf6ec` | Form inputs |
| `--ink` | `#1c1916` | Headings, primary text |
| `--ink-soft` | `#4a443c` | Body text |
| `--ink-mute` | `#8a8278` | Tertiary / metadata |
| `--rule` | `rgba(28,25,22,0.12)` | Hairlines |
| `--accent` | `#a85638` | Terracotta — italic emphasis, hover, single dot in eyebrows |
| `--blue` | `#4a6b8a` | Reserved; rarely used |

**Never invent new colors.** Use existing tokens or `oklch()` adjustments of them.

### Typography
- **Newsreader** (variable serif, Google Fonts) — everything readable. Use italic for emphasis. Headings are weight 400 with negative letter-spacing.
- **JetBrains Mono** (Google Fonts) — small UPPERCASE labels: nav, dates, eyebrows, button text.
- No system fonts, no Inter, no Roboto.

### Visual rules
- Italic `<em>` inside a heading is colored `var(--accent)` — that's the only flourish on titles.
- "Eyebrow" labels use the `.eyebrow` class: small mono uppercase, optionally with a `<span class="dot">` (4px terracotta dot).
- Buttons are pill-shaped (`border-radius: 999px`) with monospace labels. Two variants: `.btn` (outline) and `.btn-primary` (filled ink → terracotta on hover).
- Books in the Portfolio use real cover images with soft shadows — no card backgrounds.
- Section headers are h2 only — no "Section 01" prefixes, no "N° 01" item numbers (we deliberately removed these).

### Layout
- Max content width is 1240px (`--maxw`), gutter is `clamp(1.5rem, 4vw, 3.5rem)`.
- Editorial section heads: `.sec-head` with a single h2.
- Asymmetric grids preferred over centered ones.

## Conventions

### Adding a new blog post
1. Create `blogs/<slug>-post.html` — copy `blogs/introvert-life-post.html` as a template; keep the same `<header class="topbar">`, font links, and `<footer class="site-foot">`.
2. Add a new `<li>` at the **top** of the `<ul class="post-list">` in `blog.html`. Match the existing shape exactly:
   ```html
   <li><a class="post-link" href="blogs/your-slug-post.html"
          data-cat="Essays|Books|Film|Game"
          data-date="MMM D YYYY">
       <span class="pdate">MMM D YYYY</span>
       <span class="pmeta">
         <span class="ptitle">Title with original emoji if any</span>
         <span class="pblurb">One-line description.</span>
       </span>
       <span class="parrow">→</span>
   </a></li>
   ```
3. `data-cat` controls both the category tag above the title and which TOC group it appears in. Valid values:
   - `Essays` → "Other Thoughts"
   - `Books` → "Book Reviews"
   - `Film` → "Movie Reviews"
   - `Game` → "Game Reviews"
4. External links (WeChat articles) use `target="_blank" rel="noopener"` and the arrow becomes `↗`.

### Adding a new book to the Portfolio
Edit the `.portfolio-grid` in `index.html`. Use an `<a class="book">` with a `.cover img`, `.meta` (h3 + `.kind` label), and a `<p>` blurb. Cover image goes in `images/` as a JPG.

### Nav menu
Six fixed items, same on every page. If you add a page, add a `<li>` to ALL of: `index.html`, `blog.html`, `causes.html`, and every file in `blogs/`. The mobile hamburger script handles itself.

### Editing copy
Keep the existing voice — Situ wrote it. Don't rewrite or "polish" her words unless asked. Common pitfalls:
- Original titles use Title Case (e.g. "The Problem With Disney - Part 1") — preserve them.
- Original blurbs sometimes have typos or unusual phrasing — leave them unless told to fix.
- Some titles have leading 📚 / 🎬 emojis — keep them, they're meaningful (book vs. film review).

## Things to avoid

- ❌ Adding "filler" sections, fake stats, or motivational copy
- ❌ Reintroducing card backgrounds, drop shadows on text blocks, or "Section 0X" labels
- ❌ Inventing icons via SVG — use real images from `images/` or skip the icon entirely
- ❌ Using free-picker colors — always reference a CSS token
- ❌ Switching fonts — Newsreader + JetBrains Mono only

## Mobile

Already hardened. Breakpoints: 860px (collapse multi-column layouts), 640px (hamburger nav + tighter type + iOS-zoom-safe inputs), 380px (single-column hero stats). If adding new layouts, test in DevTools mobile mode and keep tap targets ≥44px.

## Integrations (don't break these)

- **Contact form** posts to `https://formsubmit.co/6801b45c05adfe30e7b50c80215cde66` — don't change the action URL.
- **WeChat QR**: `images/wechat-qr.bmp` (legacy BMP) with PNG fallback. Opened via modal on the contact section.
- **Amazon author store**: `https://www.amazon.com/stores/Situ-Chen/author/B0CFJXGN7V`
- **Linktree**: `https://linktr.ee/situchen`
- **Book Amazon links**: hard-coded `https://a.co/d/...` short URLs per book — don't regenerate.

## Quick local preview

No server needed. Open `index.html` directly in a browser, OR for relative-path correctness:
```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

GitHub Pages auto-deploys on push to `master` (the repo's default branch). The `CNAME` file pins the custom domain `situchen.me`.
