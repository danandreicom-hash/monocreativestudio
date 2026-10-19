/**
 * Site configuration: single source of truth for business data.
 * Only confirmed MONO facts or the literal "to confirm" belong here (D-002).
 * Email is the planned address (D-016); the mailbox is created in Cloudflare Email Routing.
 */

export const siteConfig = {
  companyName: "MONO Creative Studio",
  tagline: "Fine art prints.",
  defaultMetaDescription: "MONO Creative Studio. Fine art prints.",
  language: "en",

  contact: {
    email: "office@monocreativestudio.com" as string,
    phone: "+40 745 155 425" as string,
    address: "" as string,
  },

  social: {} as Record<string, string>,

  nav: [] as { label: string; href: string }[],

  footerLinks: [] as { label: string; href: string }[],
} as const;

export type SiteConfig = typeof siteConfig;
