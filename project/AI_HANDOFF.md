# AI Handoff

- Protocol version: 2.0 (CC WEBDEV, `CC_WEBDEV.md`)
- Updated: 2026-10-18
- Base: bootstrap from `you-on-the-com` master (CC WEBDEV v2.0, commit e1102f1). TASK-001 (demo removed, MONO placeholder) is merged to main.
- Overall: Phase 1 = site + Print Lab + small Shopify shop. The bilingual Astro site (TASK-008) is built locally; nothing is published. Preview prototype v8 is a private artifact.

## Read order (every task)

1. This file
2. `project/TASK_LOCKS.md`
3. Your task file `project/tasks/TASK-xxx.md`
4. `project/06_DECISIONS.md`
5. Only the files the task file lists

## Tasks

- TASK-001 bootstrap cleanup: DONE (accepted by Dan, 2026-10-18; merged PR #1)
- TASK-002 strategy and sitemap: DONE, G1 approved (D-008); Home copy v0.2 at G2; language RO+EN (D-009)
- TASK-003 lab facts and Print Lab copy brief (G2): REVIEW, owner ChatGPT
- TASK-004 Shopify architecture and edition model: DONE, D-006 (Basic approved, not bought) and D-007 approved
- TASK-005 visual brief v0.2 (G3): IMPLEMENTED and merged; Dan approves G3 after the Claude prototype
- TASK-007 logo, favicon, photographs: IMPLEMENTED
- TASK-008 bilingual Astro site from prototype v8: IMPLEMENTED (D-015 to D-019)
- TASK-006 print configurator and file upload spec: REVIEW, owner ChatGPT (starts when Dan sets IMPLEMENT)

## Blockers (all need a decision from Dan or Vladimir)

- Open questions 1 to 7 in `project/00_PROJECT.md` (question 1, language, is closed by D-009).
- Decide: language detection method (D-013); Vladimir answers; accountant and legal review (shop-model open questions).

## Standing rules

- Statuses: DRAFT, REVIEW, APPROVED, IMPLEMENT, IMPLEMENTED, QA, DONE. Severities: P0, P1, P2.
- 0 EUR default; Dan approves any cost first (D-006).
- Indexing stays off until the release build (G4).
- Unresolved question: AMBIGUITY note in the task file, task stays `REVIEW`.

## Next

- Dan: send `project/questions-for-vladimir.md` to Vladimir; deploy the Cloudflare preview (D-012) with Claude, one command at a time; create office@ in Cloudflare Email Routing (D-016).
- ChatGPT: TASK-003 starts when Vladimir answers; TASK-004 and TASK-005 can start from the G1 baseline.
