# Development Specification

- Version: 1.1
- Status: DRAFT
- Specification owner: ChatGPT
- Implementation owner: Claude Code
- Approval: Dan Andrei

## Master baseline

Use the existing Astro repository as the starting point. Verify actual dependencies and configuration before planning; do not infer production behavior from the boilerplate name.

## Per-project requirements

- Approved routes, components and responsive behavior.
- Content model, CMS permissions and editorial workflow.
- Forms, validation, delivery, consent and error handling.
- Integrations, analytics and privacy requirements.
- SEO metadata, Open Graph, favicon, robots, sitemap and relevant schema.
- Accessibility and performance acceptance criteria.
- Hosting target, environment variables, deploy method, rollback and redirects.
- Browser/device support and test matrix.

## Implementation rules

- Work only from an authorized IMPLEMENT task.
- Preserve approved copy, architecture and design unless a later approved decision says otherwise.
- Keep secrets out of Git; document variable names and ownership, never values.
- Record build/lint/test results and the implementation commit in `AI_HANDOFF.md` and `08_CHANGELOG.md`.
- Do not add a paid dependency or service without Dan's explicit approval.

## Definition of implemented

Code is committed, acceptance criteria are addressed, available automated checks pass (or failures are documented), and the handoff identifies what still needs QA. IMPLEMENTED is not DONE.

## Open Questions

None.
