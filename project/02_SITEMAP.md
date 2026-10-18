# Sitemap and Journeys — MONO Creative Studio

- Version: 0.2; Status: REVIEW — TASK-002, G1 approval by Dan Andrei pending.
- Refined by: CODEX, 2026-10-18, from Claude's v0.1; URLs and content contracts, not implementation approval.

## Principles, header and footer

One site, one header/footer, two language registers. Proposed header: Shop, Print Lab, About, Journal, Contact; Cart utility; persistent “Request a quote”. Journal appears only when launch content exists. Samples, materials and audience pages sit under Print Lab; do not populate the header with unready pages.

Footer: Shop, Print Lab, confirmed Materials / Samples pages, Request a quote, Contact, Shipping and returns, Privacy, Terms, Cookies as applicable. Owner: Vladimir Andrei; legal entity and contact details `[to confirm]`. No empty destination or disabled purchase button presented as an available service.

## Phase 1 route contracts

Routes below use the working EN-only scheme. “Conditional” means within the proposed phase 1 structure but hidden until its content and operational prerequisites are met, not a fabricated offer.

| URL                                                       | Purpose / prerequisite                                                                                        | Primary CTA                              |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `/`                                                       | Two paths, evidence, real works, professional entry, contact                                                  | Shop prints / Print Lab                  |
| `/shop`                                                   | Small catalogue of purchasable works with rights, artist and actual price                                     | View work                                |
| `/shop/[product]`                                         | Artwork, artist, real variants/prices, availability, materials and delivery; edition data only if approved    | Add to cart                              |
| `/cart`                                                   | Proposed logical cart destination; implementation and Shopify checkout handoff in TASK-004                    | Checkout                                 |
| `/print-lab`                                              | Audience entry, confirmed capabilities, enquiry process                                                       | Request a quote                          |
| `/print-lab/artists`                                      | Artists and photographers; edition/proofing services `[to confirm]`                                           | Request a quote                          |
| `/print-lab/designers`                                    | Designers and agencies; formats/framing `[to confirm]`                                                        | Request a quote                          |
| `/print-lab/b2b`                                          | Business project enquiries; volume terms and packaging `[to confirm]`                                         | Request a quote                          |
| `/print-lab/materials`                                    | Conditional: confirmed papers, sizes and finishes from TASK-003                                               | Request a quote                          |
| `/print-lab/samples`                                      | Conditional: contents, price, stock and delivery `[to confirm]`                                               | Order a sample pack, only when orderable |
| `/request-a-quote`                                        | One enquiry form; role and project brief; no upload/configurator                                              | Send request                             |
| `/about`                                                  | Studio, Vladimir's ownership, confirmed process and permitted images                                          | Contact the studio                       |
| `/journal`, `/journal/[slug]`                             | Conditional: approved original articles, no newsletter dependency                                             | Read article / Contact                   |
| `/contact`                                                | Confirmed contact channels; address and hours `[to confirm]`                                                  | Send message                             |
| `/shipping-and-returns`, `/privacy`, `/terms`, `/cookies` | Appropriate legal content; entity, shipping and returns `[to confirm]`; cookie content matched to actual site | Relevant contact link                    |

Shop is in phase 1 (D-003); language, facts and catalogue/legal readiness must be resolved before launch. Do not publish a purchase path until it can complete a real order. Checkout stays Shopify-hosted; backend choice, cart route ownership and paid-plan approval remain with TASK-004 / D-006 / D-007.

## Conditional expansion from v0.1

Retain `/shop/limited-editions` only with approved limited products; `/shop/artists` and `/shop/artists/[artist]` when at least three artists have approved biographies and works. `/print-lab/framing` requires a confirmed framing offer. `/about/process` requires enough confirmed process content to warrant its own page; otherwise keep it on About. None needs an empty launch page. Catalogue filters, search, accounts beyond Shopify defaults, upload configurator, marketplace, white-label portal and automated fulfillment remain outside this phase.

## Journeys and enquiry contract

1. Artist: Home → Print Lab → confirmed Materials / Samples if ready → Quote → human response. Collect requirements first; file transfer and proofing `[to confirm]` are arranged separately.
2. Designer/business: Home → Designers or B2B → Quote → human response. Ask for intended use, quantity, dimensions and desired date as requests, not supported specifications or delivery promises.
3. Collector: Home → Shop → Product → Cart → Shopify checkout → order confirmation. Show certificates only under an approved edition model; link to the lab for project quantities without promising discounts.

Quote form proposal: role (Artist / Designer / Business / Collector), name, email, project brief; optional quantity, dimensions and desired date. Clear validation, receipt/error state and relevant privacy notice. Delivery channel, retention and response time `[to confirm]`; no new provider or storage is authorized.

## RO/EN and cross-cutting specification

Recommendation, pending Dan: `/ro/` and `/en/`, with matching logical paths (`/ro/print-lab`, `/en/print-lab`) and translated interface/content. Bare `/` directs to the approved default language; do not decide that default automatically. If EN only is approved, use the unprefixed table above. Language switching preserves the equivalent page; do not expose untranslated duplicates. Checkout language constraints belong to TASK-004.

Each indexable page needs one H1, unique title/description, canonical and social image with rights. Bilingual release adds reciprocal language references. Exclude cart and form-result states from indexing; site stays noindex until G4. Sample and quote links work across both zones. Design tokens stay in TASK-005; this document specifies hierarchy and behaviour only.

## Open Questions

1. Which language scheme and default language does Dan approve?
2. Which lab pages, sample purchase flow and Journal articles are ready for launch?
3. Who owns cart routes and checkout language behaviour (TASK-004)?
4. Which quote delivery channel, privacy terms and response expectation are approved?
5. Which legal entity, shipping zones and returns terms apply to the first orders?
