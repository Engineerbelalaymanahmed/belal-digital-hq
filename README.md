# Engineer Belal Ayman Ahmed - Digital HQ

Static, zero-build site for GitHub Pages. No npm, no bundler, no runtime dependencies.

## Why this stack
Vanilla ES modules + JSON. It deploys anywhere as plain files, ships almost no JavaScript, has nothing to patch, and the UI only talks to one data function (`get()` in `assets/js/app.js`). To move to an API or headless CMS, set `apiBase` in `data/site.json`; the UI does not change.

## Structure
- `data/` content only: `profile`, `social-links`, `certificates`, `projects`, `services`, `skills`, `i18n`, `site` (JSON)
- `assets/` css, js, `branding/` (originals in `branding/original/`), `profile/`, `certificates/`, `projects/`, `icons/`
- `scripts/` page template + generator (clean URLs `/portfolio/`, sitemap, robots)

## Add content (no code changes)
- Certificate: add an object to `data/certificates.json` (fields: id, title, issuer, date, category, credentialId, credentialUrl, image, description, skills, featured) and drop the image in `assets/certificates/`.
- Project: add to `data/projects.json` (see fields in the spec; every field is optional). Optional `caseStudy`: problem, research, strategy, planning, execution, technology, result, lessons.
- Social account: add to `data/social-links.json`. New categories appear automatically.
- Experience / journey: fill `journey` and `experience` in `data/profile.json` ({title, period, text}). Empty sections stay hidden.
- Arabic: add `ar` next to `en` in any field. Missing Arabic falls back to English.

## Preview locally
`python3 -m http.server` then open `http://localhost:8000/` (add `?sample` to preview sample certificates/projects; works on localhost only).

## Deploy
1. Name the repo `Engineerbelalaymanahmed.github.io` (site serves from `/`). Other names work but set `SITE` in the workflow.
2. Settings > Pages > Source: GitHub Actions. Push to `main`.
3. Custom domain later: add the domain in Pages settings, run the generator with `SITE=https://your-domain/`.

## Troubleshooting
- Blank page: check the browser console; a JSON syntax error in `data/` is the usual cause.
- Missing styles on sub-pages: re-run `bash scripts/generate-pages.sh`.
- Contact form: intentionally absent (static site). Set `contactFormEndpoint` in `data/site.json` when a service such as Formspree is chosen.

## Docs
`docs/CONTENT-GUIDE.md` (Arabic, how to edit content), `docs/ARCHITECTURE.md` (decisions and migration), `docs/AUDIT.md` (tests, checklists, audit). Run `node scripts/validate.mjs` before pushing.
