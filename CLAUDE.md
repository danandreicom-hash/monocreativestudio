# Claude Code Instructions — CC WEBDEV v2.0

This repository is the **MONO Creative Studio project** (monocreativestudio.com), created from CC WEBDEV MASTER (`you-on-the-com`). MONO-specific strategy, copy, design and code belong here; reusable method changes go to the master. Owner of the business: Vladimir Andrei; approver: Dan Andrei. GitHub is the single source of truth.

The complete ruleset is **`CC_WEBDEV.md`**. It replaces every earlier webdev rule. Read the sections your task needs; do not re-read the whole repository.

## Before every task

1. `project/AI_HANDOFF.md` (60 lines or fewer: current state only)
2. `project/TASK_LOCKS.md` (one owner per task; protocol in `project/COORDINATION.md`)
3. Your task file `project/tasks/TASK-xxx.md`
4. `project/06_DECISIONS.md` (standing decisions)
5. Only the files the task file names

`DRAFT` and `REVIEW` do not authorize implementation. Work from `IMPLEMENT` tasks or an explicit mandate from Dan.

## Non-negotiables

- Roles: Dan decides and accepts; ChatGPT does research, strategy, copy, specifications and milestone QA; Claude Code implements. Two agents never work on the same task or files at once.
- No change to approved strategy, copy, architecture or visual direction without Dan's approval recorded in `project/06_DECISIONS.md`.
- No paid service, API, dependency or plan without Dan's prior explicit approval (0 EUR default; Decap CMS by default, Storyblok only with Dan's approval).
- Unresolved question: do not guess. Write an AMBIGUITY note in the task file (format in `project/COORDINATION.md`), leave the task at `REVIEW`.
- Statuses: DRAFT, REVIEW, APPROVED, IMPLEMENT, IMPLEMENTED, QA, DONE. Severities: P0, P1, P2.
- Run `bash scripts/qa.sh` before reporting; report failures only. Do not claim DONE before acceptance.
- No secrets in the repository. Indexing stays off until the release build sets `PUBLIC_ALLOW_INDEXING=true`.
- Changelog is generated with `bash scripts/changelog.sh`, never hand-written.
