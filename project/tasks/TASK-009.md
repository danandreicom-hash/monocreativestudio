# TASK-009 Release build: open indexing (G4 switch)

- Status: IMPLEMENT (set to IMPLEMENTED at merge)
- Owner / branch: CLAUDE / `claude/TASK-009`
- Goal: let search engines and AI answer engines see monocreativestudio.com, as D-023 planned for the release build.
- Authorized by: Dan Andrei in chat, 2026-10-30 (D-025). Dan states Vladimir Andrei agrees and that Dan administers the site.
- Authorized files: `package.json`, `astro.config.mjs`, `src/pages/robots.txt.ts`, `src/pages/llms.txt.ts`, `README.md`, this file, `project/06_DECISIONS.md`, `project/AI_HANDOFF.md`, `project/TASK_LOCKS.md`.
- Do not touch: copy, design, schema fields beyond name and url (D-002), contact Worker, edge language Worker, `/admin`, header/footer.
- Acceptance: `npm run build:public` gives `index,follow` on `/ro/` and `/en/`, robots.txt with `Allow: /`, a sitemap, and `/llms.txt` built only from `src/i18n` text; plain `npm run build` stays noindex; the bare `/` chooser stays noindex; qa passes.
- Check: `bash scripts/qa.sh`
- Result: see below.
  - Changed: `build:public` script (sets `PUBLIC_ALLOW_INDEXING=true` and the production URL); `deploy` now uses it; robots.txt allows search and AI answer-engine crawlers in the public build; new `/llms.txt` built from `src/i18n` only; the sitemap no longer lists the noindex `/` chooser; README and D-025 updated.
  - Verified: `bash scripts/qa.sh` ALL CHECKS PASSED. Public build: no robots tag on `/ro/` and `/en/` pages, `Allow: /` with Sitemap, 10 URLs in the sitemap, canonical and hreflang on the production domain. Plain `npm run build` still gives noindex and `Disallow: /`.
  - Not changed: copy, schema (name and url only, D-002), edge language Worker, contact Worker, `/admin`.
  - Deploy: after merge run `npm run deploy` from `main`, then check robots.txt, `/llms.txt` and the meta robots live.
