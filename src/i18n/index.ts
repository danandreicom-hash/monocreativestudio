import en from "./en.json";
import ro from "./ro.json";

export type Lang = "ro" | "en";
export type Page = "home" | "lab" | "shop" | "about" | "contact";

export const langs: Lang[] = ["ro", "en"];
export const defaultLang: Lang = "en";

const dicts: Record<Lang, Record<string, string>> = { en, ro };

export function getT(lang: Lang): Record<string, string> {
  return dicts[lang];
}

const slugs: Record<Page, string> = {
  home: "",
  lab: "print-lab",
  shop: "shop",
  about: "about",
  contact: "contact",
};

export function href(lang: Lang, page: Page, anchor?: string): string {
  const slug = slugs[page];
  return `/${lang}/${slug ? `${slug}/` : ""}${anchor ? `#${anchor}` : ""}`;
}

export const meta: Record<Lang, Record<Page, { title: string; description: string }>> = {
  en: {
    home: {
      title: "MONO Creative Studio",
      description:
        "Fine art printing in our own lab: archival papers, canvas, metal and glass, from 20 × 30 to 70 × 150 cm.",
    },
    lab: {
      title: "Print Lab",
      description:
        "Fine art printing for artists, designers and businesses. Papers, formats, price guide, file preparation and quote request.",
    },
    shop: {
      title: "Shop",
      description:
        "The MONO shop is coming soon: artworks and prints by artists and photographers.",
    },
    about: {
      title: "About",
      description:
        "MONO Creative Studio, led by Vladimir Andrei, a photographer and artist passionate about fine art printing.",
    },
    contact: {
      title: "Contact",
      description:
        "Write to MONO Creative Studio about your print project. We reply within 24 hours.",
    },
  },
  ro: {
    home: {
      title: "MONO Creative Studio",
      description:
        "Tipar fine art în laboratorul nostru: hârtii de arhivă, canvas, metal și sticlă, de la 20 × 30 la 70 × 150 cm.",
    },
    lab: {
      title: "Print Lab",
      description:
        "Tipar fine art pentru artiști, designeri și firme. Hârtii, formate, ghid de prețuri, pregătirea fișierelor și cerere de ofertă.",
    },
    shop: {
      title: "Magazin",
      description:
        "Magazinul MONO se deschide în curând: lucrări și printuri de la artiști și fotografi.",
    },
    about: {
      title: "Despre noi",
      description:
        "MONO Creative Studio, condus de Vladimir Andrei, fotograf și artist pasionat de tiparul de artă.",
    },
    contact: {
      title: "Contact",
      description: "Scrie-ne despre proiectul tău de print. Îți răspundem în 24 de ore.",
    },
  },
};
