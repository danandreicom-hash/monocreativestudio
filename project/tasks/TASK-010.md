# TASK-010 — descriptive home page titles (EN and RO)

- Status: IMPLEMENTED
- Owner / branch: CLAUDE / `claude/TASK-010`
- Goal: give `/en/` and `/ro/` distinct, descriptive titles (they were both "MONO Creative Studio").
- Authorized by: D-026, 2026-11-16.
- Authorized files: `src/i18n/index.ts`, `src/components/seo/Seo.astro`, `project/**` notes for this task.
- Do not touch: all other copy, schema, robots, DNS.
- Acceptance criteria: `/en/` and `/ro/` titles match D-026; other pages unchanged; `/` chooser unchanged.
- Check: `bash scripts/qa.sh`
- Result: see PR.
