# TASK-006 — Print configurator and file upload (specification)

- Status: REVIEW (becomes IMPLEMENT when Dan sets it)
- Owner / branch: CODEX / `codex/TASK-006`
- Goal: specify an original configurator in three stages, so Claude Code can build it later: (A) quote form with file upload, (B) visual configurator without price (surface, paper, size, frame, proportion preview, pre-filled quote request), (C) self-service with instant price and checkout.
- Authorized by: Dan's request, 2026-10-18; D-006 (no cost without approval), D-014.
- Authorized files: `project/05_DEV_SPEC.md` (new section), `project/configurator.md`.
- Do not touch: everything else. No code, no purchase, no dependency.
- Must cover: user flow per stage; upload limits, accepted formats, resolution check, security (malware, size, abuse, GDPR retention); storage and Worker options on free tiers with verified limits; price model needed from Vladimir; how stage C fits Shopify (variant limits, custom price, Functions, Plus restrictions) with sources; open-source libraries for crop and upload with licence and approval need; cost per stage with a free alternative; recommended order and effort.
- Rule: original design. No code, text or assets from any reference site.
- Acceptance: a recommended stage plan with tradeoffs, cost table and `## Open Questions`.
- Check: Dan decides which stage goes into phase 1.
- Result: (owner fills)
