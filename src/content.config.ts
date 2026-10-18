import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/* ═══════════════════════════════════════════════════════════════════════
   CONTENT COLLECTIONS — conținutul repetabil al site-ului (servicii,
   studii de caz, echipă, testimoniale) trăiește ca fișiere Markdown în
   src/content/<colecție>/, complet separat de componente/design.

   Ca să adaugi o intrare nouă: copiază un fișier .md existent din
   colecția respectivă, schimbă frontmatter-ul (câmpurile de sus, între
   ---) și textul de dedesubt. Nu trebuie atinsă nicio linie de cod.
   ═══════════════════════════════════════════════════════════════════════ */

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: () =>
    z.object({
      title: z.string(),
      shortDescription: z.string().max(200),
      // Cheia unei iconițe din src/components/icons/ (vezi acel folder pentru lista completă).
      icon: z.enum(["strategy", "finance", "digital", "operations", "people", "growth"]),
      order: z.number().default(0),
      featured: z.boolean().default(false),
    }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/case-studies" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      industry: z.string(),
      summary: z.string().max(280),
      coverImage: image(),
      coverImageAlt: z.string(),
      results: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
          }),
        )
        .min(1)
        .max(4),
      publishDate: z.coerce.date(),
      featured: z.boolean().default(false),
    }),
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/team" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      photo: image(),
      linkedinUrl: z.string().url().optional(),
      order: z.number().default(0),
    }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
  schema: () =>
    z.object({
      quote: z.string(),
      authorName: z.string(),
      authorRole: z.string(),
      company: z.string(),
      order: z.number().default(0),
    }),
});

export const collections = { services, "case-studies": caseStudies, team, testimonials };
