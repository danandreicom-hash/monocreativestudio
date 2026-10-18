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

## Status

Placeholder home page only (TASK-001). Strategy, copy, design and Shopify decisions are in `project/`.
