# TASK-004 — Shopify architecture and edition model

- Status: DONE (D-006, D-007 approved by Dan, 2026-10-18)
- Goal: specify how the small shop works, so Claude Code can implement it later. Authorized by: D-003; D-006/D-007 remain REVIEW.
- Authorized files: `project/05_DEV_SPEC.md`, `project/shop-model.md`.
- Do not touch: everything else.
- Read only: `project/00_PROJECT.md` (open questions 3, 4, 5); `CC_WEBDEV.md` sections 2 and 7.
- Must cover: separate Shopify store vs shared with Arthalle (tradeoffs, fiscal separation); static build vs client-side catalogue when a product is added; variants (size, paper, framing) and Shopify option limits; edition counter and certificate numbering; made-to-order shipping and returns; costs listed per D-006 with a free alternative.
- Acceptance: a recommended option with tradeoffs and an `## Open Questions` section; no code, no purchase. Check: Dan decides D-006 and D-007.
- Result: `05_DEV_SPEC.md` + `shop-model.md`: separate-store recommendation, static/live workflow, RO/EN, variants, editions/certificates, shipping/returns, official Shopify prices/free alternatives; D-006/D-007 proposals remain REVIEW. QA: `bash scripts/qa.sh` passed (2026-10-18).
- **AMBIGUITY:**
  - Document/section affected: `05_DEV_SPEC.md` Open Questions; `shop-model.md` Open Questions.
  - Question: Which entity/TVA, edition terms/certificates, shipping/returns and default language apply, and does Dan approve proposed D-006/D-007? Values remain [to confirm].
  - Impact: specification is reviewable; store setup, sales and affected public claims remain blocked.
  - Decision needed from: Dan Andrei, with Vladimir/artist facts, accountant confirmation and legal review.
