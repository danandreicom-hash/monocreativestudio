# TASK-001 — Bootstrap cleanup (MONO identity, no demo content)

- Status: IMPLEMENT (set by Dan, 2026-10-18)
- Owner / branch: CLAUDE / `claude/TASK-001`
- Goal: turn the master copy into a clean MONO project: remove the demo content inherited from the master, neutral MONO identity, indexing off.
- Authorized by: D-004; IMPLEMENT set by Dan, 2026-10-18.
- Authorized files: `src/**`, `public/**`, `astro.config.mjs`, `wrangler.jsonc`, `.env.example`, `README.md`, `package.json` (name only).
- Do not touch: `project/**` except this file's Result, `CC_WEBDEV.md`, `workers/**` (kept inert).
- Read only: `CC_WEBDEV.md` section 12 (bootstrap), section 7 (stack).
- Acceptance: no demo company names left (grep); `site.config.ts` holds only confirmed MONO data or `to confirm`; wrangler name is `monocreativestudio`; `PUBLIC_ALLOW_INDEXING` unset; one placeholder home page marked `noindex`; Decap CMS inert.
- Check: `bash scripts/qa.sh`
- Result: IMPLEMENTED on `claude/TASK-001`. Demo pages, sections, content, images and icons removed; neutral MONO identity; placeholder home `noindex`; fail-closed indexing added (robots Disallow + meta unless `PUBLIC_ALLOW_INDEXING=true`); CMS inert (`collections: []`, OAuth proxy removed from config and CSP); no icons or og image until a MONO logo exists; fonts and neutral stone tokens are placeholders until G3. `workers/**` untouched (still carry `you-on-the-com` names, outside scope). `bash scripts/qa.sh`: all passed. Commit: see report.
