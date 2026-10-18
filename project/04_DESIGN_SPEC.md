# Design Specification — MONO Creative Studio

- Version: 0.1
- Status: DRAFT (input for TASK-005; Dan leads creative direction and approves at gate G3)
- Prepared by: Claude, 2026-10-18
- Rule: no colour, wordmark, photograph or wording is carried over from another project (`CC_WEBDEV.md` section 12). Tokens below are directions, not values.

## Direction

A print studio that looks like a good print: restrained, exact, image-led. The page is a mount; the work is the picture.

- Calm editorial layouts with generous whitespace; images carry the page, text supports.
- One visual system, two registers: **Shop** warmer, gallery-like, larger imagery and slower rhythm; **Print Lab** cleaner and more technical, with detail photography and tables that read quickly.
- Precision is visible: aligned grid, consistent captions, real measurements.
- Restrained interaction and motion; usability and image performance come first.
- Avoid a decor-shop look (lifestyle clutter, discount banners) and an opaque gallery look (hidden prices, no process).

## Layout rules (from the method, to be tuned by Dan)

- One canonical header and footer on all routes; no page-specific variants.
- Full-page grid and consistent outer gutters; content width roughly 1200 to 1320 px on wide desktop; long text measure 55 to 70 characters.
- Page height is set by content, never fitted to a screenshot; spacing values are minimum rhythm references.
- Photographs are not rounded unless the approved design says so; stable image ratios so the grid does not jump.
- Mobile reading order is predictable; base text at least 16 px.

## Tokens (to decide with Dan and Vladimir)

| Token        | Direction                                                                               | Status     |
| ------------ | --------------------------------------------------------------------------------------- | ---------- |
| Brand colour | One accent taken from MONO's own logo or brand assets, exact hex from the approved file | to confirm |
| Neutrals     | Paper white, warm grey, near-black for text; contrast meets WCAG 2.2 AA                 | to design  |
| Display type | A refined serif for headlines and edition names (see reference note below)              | to choose  |
| Text type    | A neutral sans for body, navigation, forms, tables                                      | to choose  |
| Fonts        | Self-hosted and subset where licences permit; no Google Fonts requests                  | rule       |
| Spacing      | Scale defined once in `global.css`                                                      | to design  |

## Reference note (observed 2026-10-18, `project/source/reference-analysis-2026-10.md`)

- The three references keep type plain: one geometric sans throughout, or an editorial serif for section titles over a neutral sans for everything else; text is near-black on white, and the artwork supplies the colour.
- MONO follows the second pattern for the Shop register and uses the sans alone for the Print Lab register.
- Candidate pairs to test in the G3 prototype (open-licence, self-hostable; not the references' fonts and not Conceptiones' fonts): a serif such as Newsreader or Instrument Serif with a sans such as Manrope or Public Sans. Dan chooses.
- Borrowed from the references: square or lightly rounded controls, generous image blocks, short overlay text, one repeated verb per zone. Not borrowed: carousels, countdown banners, award-led hierarchy.

## Components (phase 1)

- Header, footer, sticky announcement line (only with confirmed text).
- Two-path home cards (Shop, Print Lab); audience cards on the Print Lab hub.
- Product card: image, artist, title, "from" price, edition status (open, limited, remaining count).
- Product page: gallery with paper-detail image, size and presentation selector, edition counter, details tabs, B2B link.
- Materials table; sample-pack card; four-step "how it works".
- Quote form (one form, role selector), validation summary focus fixed, honeypot, no stored data until delivery is approved.
- Certificate preview (only if the edition model is approved).

## Imagery and provenance

Every public image is classified before use (`CC_WEBDEV.md` section 7): real lab or process photography, real artwork or product photography with permission and credit, generated editorial image (general areas only, never as evidence of a real job), concept study, or placeholder.

- Print Lab leads with real close-ups of paper, ink and process from MONO's own lab.
- Shop leads with each work at true proportion; wall mockups are labelled as mockups.
- No stock image presented as MONO's work. Artist credits and rights recorded per image.

## Accessibility and performance

WCAG 2.2 AA target; keyboard and screen-reader paths for cart, forms and filters; reduced-motion support; AVIF or WebP with explicit dimensions; the Shopify cart script and any third-party script are measured against Core Web Vitals before release.

## Representative pages for gate G3

1. Home. 2. Print Lab hub. 3. Product page.

## Open Questions

1. Does MONO have a logo, wordmark and brand colours already, and who owns the files?
2. Should the Shop and Print Lab registers differ by background (warm vs cool neutral) or only by imagery and language?
3. Dark or light default for the Shop?
4. Which photography exists for the lab and process, and who shoots more?
5. Is a Claude Design prototype built before or after the lab facts are known?
