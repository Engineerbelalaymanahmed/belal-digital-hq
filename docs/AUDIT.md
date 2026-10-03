# Testing report, checklists and final audit

## Automated checks run
- `node --check assets/js/app.js`: pass
- `node scripts/validate.mjs` (JSON schema basics, unique ids/slugs, image paths exist, https URLs, no placeholder tokens, legacy email absent): see result in delivery notes; runs in CI before deploy.

## Status: release candidate (not declared Production Ready)
No Critical issue known from code review. One High item remains because it needs real devices.

| Severity | Item | State |
|---|---|---|
| High | Not yet verified in real browsers/devices (Chrome, Firefox, Safari, Android, iPhone), including the Arabic (RTL) view | Open: run the manual checklist below |
| Medium | Articles and Achievements content types are not built (spec lists them as future) | Open |
| Medium | Per-language URLs and hreflang | Open (architecture ready) |
| Medium | No Lighthouse / Core Web Vitals measurement yet | Open: run on the live URL |
| Medium | Arabic text missing for service descriptions and project labels (falls back to English) | Open: content task |
| Low | Logo only as raster on a white plate; OG image is square; no sitemap lastmod; clickjacking header not settable on GitHub Pages | Accepted |
| Fixed | Inline styles that a strict CSP blocks; missing image dimensions (layout shift); copy confirmation not announced to screen readers; focus lost on language switch; no crawler-visible content; no pagination for 100+ items; project title not set on detail pages | Fixed |

## Manual checklist (about 10 minutes)
1. Open every page on phone and desktop; no horizontal scroll; nav usable.
2. Switch to Arabic: text flows right-to-left, nothing overlaps; switch back.
3. Tab through the site with a keyboard: focus is always visible; skip link works.
4. Enable "reduce motion" in the OS: reveals and hover movement stop.
5. Click every social link and contact action (mail, call, WhatsApp, Telegram, copy).
6. Add a test certificate (see content guide): search, filter, sort, preview, full view.
7. Open a wrong URL: the 404 page appears.
8. Run Lighthouse on the live URL; target 90+ for Performance, Accessibility, SEO.

## Checklists
- **Performance:** WebP images with dimensions, lazy loading below the fold, hero image preloaded, system fonts, about 12 KB of JS, no dependencies.
- **Security:** CSP, no innerHTML, URL allow-list, no secrets or trackers, legacy email excluded, dependency count zero.
- **Accessibility:** semantic landmarks, skip link, visible focus, reduced motion, alt text, labelled controls, dialog via native `<dialog>`, status announcements.
- **SEO:** unique title/description/canonical per page, Open Graph, JSON-LD Person, sitemap, robots, static h1 fallback, clean URLs.
