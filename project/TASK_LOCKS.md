# Task Locks

One owner per task. Rules: `project/COORDINATION.md`. Owner is `CLAUDE`, `CODEX` or `NONE`. Only Dan assigns an owner for a task that is not `NONE`.

| Task     | Status    | Owner  | Branch          | Claimed    | Files it may touch                                                                       |
| -------- | --------- | ------ | --------------- | ---------- | ---------------------------------------------------------------------------------------- |
| TASK-001 | IMPLEMENT | CLAUDE | claude/TASK-001 | 2026-10-18 | `src/**`, `public/**`, `astro.config.mjs`, `wrangler.jsonc`, `.env.example`, `README.md` |
| TASK-002 | IMPLEMENT | CODEX  | codex/TASK-002  | -          | `project/01_STRATEGY.md`, `project/02_SITEMAP.md`                                        |
| TASK-003 | REVIEW    | CODEX  | -               | -          | `project/lab-facts.md`, `copy/print-lab*.md`                                             |
| TASK-004 | REVIEW    | CODEX  | -               | -          | `project/05_DEV_SPEC.md`, `project/shop-model.md`                                        |
| TASK-005 | REVIEW    | CODEX  | -               | -          | `project/04_DESIGN_SPEC.md`                                                              |

Add one row per task. Remove nothing; set the owner to `NONE` and the status to `IMPLEMENTED` on merge.
