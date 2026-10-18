# AI Handoff

- Protocol version: 2.0 (CC WEBDEV, `CC_WEBDEV.md`)
- Updated: 2026-10-18
- Base: bootstrap from `you-on-the-com` master (CC WEBDEV v2.0, commit e1102f1). Demo content inherited from the master is still in `src/`; TASK-001 removes it.
- Overall: project pack created. Phase 1 = site + Print Lab + small Shopify shop. Nothing is implemented or published.

## Read order (every task)

1. This file
2. `project/TASK_LOCKS.md`
3. Your task file `project/tasks/TASK-xxx.md`
4. `project/06_DECISIONS.md`
5. Only the files the task file lists

## Tasks

- TASK-001 bootstrap cleanup (remove demo, MONO identity, noindex): REVIEW, owner Claude
- TASK-002 strategy and sitemap (G1): REVIEW, owner ChatGPT; Claude drafts v0.1 of 01, 02 and 04 exist as input
- TASK-003 lab facts and Print Lab copy brief (G2): REVIEW, owner ChatGPT
- TASK-004 Shopify architecture and edition model: REVIEW, owner ChatGPT
- TASK-005 visual direction brief for Claude Design (G3): REVIEW, owner ChatGPT

## Blockers (all need a decision from Dan or Vladimir)

- Open questions 1 to 7 in `project/00_PROJECT.md`.
- D-006 and D-007 are in REVIEW.

## Standing rules

- Statuses: DRAFT, REVIEW, APPROVED, IMPLEMENT, IMPLEMENTED, QA, DONE. Severities: P0, P1, P2.
- 0 EUR default; Dan approves any cost first (D-006).
- Indexing stays off until the release build (G4).
- Unresolved question: AMBIGUITY note in the task file, task stays `REVIEW`.

## Next

- Dan: create the empty private GitHub repository, then set TASK-001 to IMPLEMENT.
- ChatGPT: start with TASK-002 in a new thread, using the startup prompt in `CC_WEBDEV.md` section 11.
