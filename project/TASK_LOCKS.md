# Task Locks

One owner per task. Rules: `project/COORDINATION.md`. Owner is `CLAUDE`, `CODEX` or `NONE`. Only Dan assigns an owner for a task that is not `NONE`.

| Task     | Status      | Owner | Branch          | Claimed    | Files it may touch                                                                             |
| -------- | ----------- | ----- | --------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| TASK-001 | DONE        | NONE  | claude/TASK-001 | 2026-10-18 | `src/**`, `public/**`, `astro.config.mjs`, `wrangler.jsonc`, `.env.example`, `README.md`       |
| TASK-002 | DONE        | NONE  | codex/TASK-002  | 2026-10-18 | `project/01_STRATEGY.md`, `project/02_SITEMAP.md`, `copy/home.md`, `project/tasks/TASK-002.md` |
| TASK-003 | REVIEW      | CODEX | -               | -          | `project/lab-facts.md`, `copy/print-lab*.md`                                                   |
| TASK-004 | DONE        | NONE  | codex/TASK-004  | 2026-10-18 | `project/05_DEV_SPEC.md`, `project/shop-model.md`, `project/tasks/TASK-004.md`                 |
| TASK-005 | IMPLEMENTED | NONE  | codex/TASK-005  | 2026-10-18 | `project/04_DESIGN_SPEC.md`                                                                    |
| TASK-006 | REVIEW      | CODEX | -               | -          | `project/05_DEV_SPEC.md`, `project/configurator.md`                                            |

Add one row per task. Remove nothing; set the owner to `NONE` and the status to `IMPLEMENTED` on merge.
| TASK-007 | IMPLEMENTED | NONE | main | 2026-10-19 | `public/brand/**`, `public/images/**`, `public/favicon*`, `src/components/layout/**` |
| TASK-008 | IMPLEMENTED | NONE | main | 2026-10-19 | `src/**`, `public/**`, `astro.config.mjs`, `wrangler.jsonc` |
