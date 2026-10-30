# MONO Creative Studio

Website, Print Lab and online shop for MONO Creative Studio (monocreativestudio.com).
Owner: Vladimir Andrei. Approver: Dan Andrei.

Created from CC WEBDEV MASTER (Astro + Tailwind, Cloudflare Workers Static Assets). The working rules are in `CLAUDE.md` and `CC_WEBDEV.md`; current state is in `project/AI_HANDOFF.md`.

## Commands

```bash
npm install
npm run dev        # local development
npm run build      # static build into dist/
bash scripts/qa.sh # checks before reporting
```

## Indexing

Search engines are blocked by default (`noindex` meta and `Disallow: /` in robots.txt). Only the release build sets `PUBLIC_ALLOW_INDEXING=true`.

`npm run build` is the private build (noindex, `Disallow: /`). `npm run build:public` sets `PUBLIC_ALLOW_INDEXING=true` and the production site URL, and `npm run deploy` uses it, so a normal production deploy is always indexable (D-025). Never publish the output of a plain `npm run build` to monocreativestudio.com. `/llms.txt` is generated from the approved copy in `src/i18n`.

## Status

Placeholder home page only (TASK-001). Strategy, copy, design and Shopify decisions are in `project/`.
