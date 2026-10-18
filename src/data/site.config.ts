/**
 * Site configuration: single source of truth for business data.
 * Only confirmed MONO facts or the literal "to confirm" belong here (D-002).
 * Contact, legal and social data stay empty until Vladimir confirms them.
 */

export const siteConfig = {
  companyName: "MONO Creative Studio",
  tagline: "Fine art prints.",
  defaultMetaDescription: "MONO Creative Studio. Fine art prints.",
  language: "en",

  contact: {
    email: "" as string,
    phone: "" as string,
    address: "" as string,
  },

  social: {} as Record<string, string>,

  nav: [{ label: "Home", href: "/" }],

  footerLinks: [] as { label: string; href: string }[],
} as const;

export type SiteConfig = typeof siteConfig;
