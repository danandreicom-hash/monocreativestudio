// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Domeniul final al clientului — schimbă-l la clonare (folosit pentru sitemap, canonical URLs, JSON-LD).
// Poate fi suprascris din variabila de mediu PUBLIC_SITE_URL în timpul build-ului (vezi .env.example).
const SITE_URL = process.env.PUBLIC_SITE_URL || "https://example.com";

export default defineConfig({
  site: SITE_URL,

  // 100% static — cel mai bun rezultat posibil la Core Web Vitals (HTML deja
  // randat, zero cold-start). Site-ul e servit ca Cloudflare Workers Static
  // Assets (vezi wrangler.jsonc), fără adaptor Astro — nu există nicio rută
  // randată la cerere în acest proiect.
  //
  // Formularul de contact NU e o rută Astro (vezi § Formularul de contact din
  // README) — e un Worker separat, minimal, deployat independent și legat de
  // /api/contact prin Cloudflare Routes. Motivul acestei separări: adaptorul
  // @astrojs/cloudflare are în versiunea curentă (@astrojs/cloudflare 14.x +
  // @cloudflare/vite-plugin 1.47.x, iulie 2026) o eroare cunoscută la primul
  // build dintr-un clone curat, pe combinația output:"static" cu rute
  // `prerender = false` — reprodusă și confirmată separat, inclusiv pe un
  // proiect Astro+Cloudflare complet nou, generat oficial. Un Worker separat
  // pentru formular evită complet acel cod, fără niciun compromis funcțional.
  output: "static",

  integrations: [
    mdx(),
    sitemap({
      // The bare "/" is the noindex language chooser (edge Worker, D-013): keep it out of the sitemap.
      filter: (page) => !page.includes("/api/") && new URL(page).pathname !== "/",
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  // Typeface: Outfit (SIL OFL), self-hosted from public/fonts (D-015); see src/styles/mono.css.

  image: {
    // Limite rezonabile pentru surse de imagini remote (ex. CMS extern, dacă se adaugă ulterior).
    remotePatterns: [{ protocol: "https" }],
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
});
