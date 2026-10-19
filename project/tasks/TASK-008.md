# TASK-008: Bilingual Astro site from prototype v8

- Status: IMPLEMENTED
- Owner / branch: CLAUDE / `main` (Dan's mandate, small repo)
- Goal: build Home, Print Lab, Shop ("Coming soon"), About and Contact as real Astro pages in Romanian and English, using prototype v8 as the visual and copy source.
- Authorized by: D-015 to D-019, 2026-10-19.
- Authorized files: `src/**`, `public/**`, `astro.config.mjs`, `wrangler.jsonc`, `project/**` status files.
- Do not touch: strategy, copy meaning, visual direction (changes need Dan's approval).
- Read only: `copy/*.md`, `project/04_DESIGN_SPEC.md`, prototype v8 (artifact).
- Acceptance criteria:
  - `/ro/` and `/en/` with Home, Print Lab, Shop, About, Contact; language switch keeps the equivalent page.
  - hreflang alternates, `noindex` until the release build, no VAT wording, no returns text.
  - Outfit self-hosted, header, dark footer, hero boxes as in the prototype.
  - Quote form validates; submit opens the email app (`mailto:`) with an honest note.
  - `bash scripts/qa.sh` passes.
- Check: `bash scripts/qa.sh`
- Result: Astro pages for Home, Print Lab, Shop, About, Contact in `/ro/` and `/en/`; copy in `src/i18n/*.json`; Outfit self-hosted in `public/fonts`; edge language Worker `workers/edge-language/index.js` (untested until deployed). QA passes. Open: Cloudflare preview deploy, mailbox office@ (D-016), copy still draft, `[to confirm]` markers still visible, generated lab imagery.
