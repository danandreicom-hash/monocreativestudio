import type { APIRoute } from "astro";

// Endpoint static, generat automat la build — trimite direct la sitemap-ul
// produs de integrarea @astrojs/sitemap, fără să fie nevoie de întreținere
// manuală per client (URL-ul e derivat din `site` din astro.config.mjs).
export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);

  const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${sitemapURL}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
