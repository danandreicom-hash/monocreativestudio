# TASK-002 — Strategy, sitemap and Home copy (gate G1)

- Status: REVIEW; Owner / branch: CODEX / `codex/TASK-002`; Dan approval pending.
- Authorization: Dan's 2026-10-18 mandate; D-001–D-005 preserved; no implementation or cost approval.
- Authorized files: `project/01_STRATEGY.md`, `project/02_SITEMAP.md`, `copy/home.md`, this task; claim in `project/TASK_LOCKS.md`.
- Inputs: CLAUDE.md, AI_HANDOFF.md, TASK_LOCKS.md, 06_DECISIONS.md, COORDINATION.md; 00_PROJECT.md, strategy/reference-analysis sources, v0.1 strategy/sitemap/design/Home; relevant CC_WEBDEV sections 4, 6, 8.
- Acceptance: concise strategy/sitemap (each under two pages at normal document scale), audiences, two zones, CTAs, URLs, RO/EN proposal, sources, publication conditions and Open Questions; Dan reviews G1, Home at G2.
- **AMBIGUITY:**
  - Document/section affected: `project/04_DESIGN_SPEC.md` (TASK-005) and coordination claim procedure.
  - Question: Should visual specification edits be reassigned to TASK-002; should this claim be merged to main before review?
  - Impact: design remains read-only because its lock overlaps TASK-005; claim stays on the requested branch because Dan explicitly prohibited work on main. No visual or main-branch changes made.
  - Decision needed from: Dan Andrei.
- Result: Refined v0.1 strategy/sitemap to v0.2, clarified conditional routes and enquiry contract, refined Home copy; live reference links retained internally. Lab/edition/legal/language decisions stay open; no source/public/worker files edited. QA: `bash scripts/qa.sh` passed all checks after installing existing locked dependencies with `npm ci`; no dependency changes. Delivery commit: `docs: TASK-002 refine strategy sitemap and Home copy` on `codex/TASK-002` (exact hash in final delivery report); PR/merge pending Dan.
- Open Questions: Approve G1 direction, language/default, launch-ready content and AMBIGUITY above; lab facts TASK-003, commerce TASK-004, visual direction TASK-005.
