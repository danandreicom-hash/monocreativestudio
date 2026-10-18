# Sitemap and Journeys — MONO Creative Studio

- Version: 0.1
- Status: DRAFT (input for TASK-002; Dan approves at gate G1)
- Prepared by: Claude, 2026-10-18, from section 3 to 7 of `project/source/strategy-draft-2026-10.md`, simplified for phase 1 (D-003)

## Principles

- One canonical header and footer on every route; two registers of language, not two sites.
- Primary header navigation has five items; "Request a quote" is a persistent secondary button.
- Search, account and filters by theme or size wait until the catalogue is large enough to need them.

## Header and footer

Header: Shop, Print Lab, About, Journal, Contact, Cart, "Request a quote".
Footer: Shop, Print Lab, Materials, Samples, Request a quote, Shipping and returns, Privacy, Terms, Cookies, Contact, owner and legal entity `[to confirm]`.

## Phase 1 routes

| Route                                                     | Zone  | Purpose                                                            | Primary CTA         |
| --------------------------------------------------------- | ----- | ------------------------------------------------------------------ | ------------------- |
| `/`                                                       | Both  | Two paths: Shop and Print Lab; why MONO; for professionals         | Shop / Print Lab    |
| `/shop`                                                   | Shop  | Collection grid, edition status (open / limited)                   | View work           |
| `/shop/[product]`                                         | Shop  | Product page: size, presentation, edition counter, details tabs    | Add to cart         |
| `/shop/limited-editions`                                  | Shop  | Filtered collection                                                | View work           |
| `/shop/artists` and `/shop/artists/[artist]`              | Shop  | Added when at least three artists are live                         | View work           |
| `/cart` (Shopify checkout)                                | Shop  | Cart; checkout is hosted by Shopify                                | Checkout            |
| `/print-lab`                                              | Lab   | Hub: audiences, materials, how it works                            | Request a quote     |
| `/print-lab/artists`                                      | Lab   | Editions, colour control, files, quote form                        | Send your files     |
| `/print-lab/designers`                                    | Lab   | Custom sizes, framing, interior projects                           | Request a quote     |
| `/print-lab/b2b`                                          | Lab   | Volume tiers `[to confirm]`, invoicing, packaging                  | Request a quote     |
| `/print-lab/materials`                                    | Lab   | Papers and finishes table from confirmed lab facts                 | Order a sample pack |
| `/print-lab/samples`                                      | Lab   | Sample pack, fixed price `[to confirm]`                            | Order a sample pack |
| `/print-lab/framing`                                      | Lab   | Framing options, only if offered `[to confirm]`                    | Request a quote     |
| `/request-a-quote`                                        | Both  | One form: "I am ordering as" Artist, Designer, Business, Collector | Send request        |
| `/about`, `/about/process`                                | Both  | Studio, owner, process, quality standards                          | Request a quote     |
| `/journal`, `/journal/[slug]`                             | Both  | Articles on paper, printing, editions (from phase 1 or soon after) | Subscribe / Contact |
| `/contact`                                                | Both  | Address, hours, form                                               | Send message        |
| `/shipping-and-returns`, `/privacy`, `/terms`, `/cookies` | Legal | Made-to-order terms, data processing                               | —                   |

Not in phase 1: customer accounts beyond Shopify defaults, print-upload configurator, white-label portal, search.

## Journeys

1. **Artist:** Home, Print Lab, Materials, Sample pack, Quote form, reply from a person.
2. **Designer or company:** Home, Print Lab B2B, Quote form with project details, reply with a quote.
3. **Collector:** Home, Shop, Product, Cart, Shopify checkout, confirmation, certificate if the edition model applies.

## Cross-cutting

- Request a quote and Sample pack are reachable from both zones.
- Materials and quality page is shared; every figure comes from `project/lab-facts.md`.
- Each page: one H1, unique title and description, canonical URL, social image; site stays `noindex` until gate G4.

## Open Questions

1. Is `/request-a-quote` a page, a Shopify form or a Worker-delivered form (cost approval D-006)?
2. Is the Journal live at launch, or after the first six weeks?
3. Does the shop use Shopify's cart page or an Astro cart that hands off to checkout (TASK-004)?
4. Which RO or EN routes exist if the site is bilingual (`/ro/...`)?
5. Framing: offered at launch, or Print Lab only on request?
