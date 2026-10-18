/**
 * ═══════════════════════════════════════════════════════════════════════
 * CONFIGURAȚIA SITE-ULUI — sursa unică de adevăr pentru datele firmei.
 * ═══════════════════════════════════════════════════════════════════════
 * La clonarea boilerplate-ului pentru un client nou, acesta e primul
 * fișier de editat: nume firmă, tagline, date de contact, rețele sociale,
 * meniul de navigare și valorile implicite de SEO. Componentele și
 * paginile citesc totul de aici — nu hardcoda aceste date în altă parte.
 */

export const siteConfig = {
  companyName: "Company Name",
  legalName: "Company Name SRL",
  tagline: "Strategie, finanțe și transformare digitală pentru companii care vor să crească.",

  // Folosit ca fallback pentru title tag și meta description acolo unde
  // o pagină nu-și definește propriile valori (vezi src/components/seo/Seo.astro).
  defaultMetaDescription:
    "Company Name este o firmă de consultanță de business din România, specializată " +
    "în strategie, consultanță financiară și transformare digitală pentru companii B2B.",

  contact: {
    email: "contact@company-name.example",
    phone: "+40 21 300 4455",
    // Format E.164, pentru linkuri tel: din UI.
    phoneHref: "+40213004455",
    address: {
      streetAddress: "Str. Industriei Ușoare nr. 12, Et. 4",
      locality: "București",
      postalCode: "013704",
      region: "Sector 1",
      country: "RO",
    },
  },

  social: {
    linkedin: "https://www.linkedin.com/company/company-name-example",
    facebook: "https://www.facebook.com/companyname.example",
  },

  nav: [
    { label: "Acasă", href: "/" },
    { label: "Servicii", href: "/servicii" },
    { label: "Studii de caz", href: "/portofoliu" },
    { label: "Despre noi", href: "/despre" },
    { label: "Contact", href: "/contact" },
  ],

  footerLinks: [
    { label: "Politica de confidențialitate", href: "/confidentialitate" },
    { label: "Termeni și condiții", href: "/termeni" },
  ],

  // Anul înființării — folosit pentru "© {year}–prezent" și pentru contorul
  // "X ani de experiență" dacă e afișat undeva.
  foundedYear: 2011,
} as const;

export type SiteConfig = typeof siteConfig;
