import type { APIRoute } from "astro";

// Fail-closed: crawlers are blocked unless the release build sets
// PUBLIC_ALLOW_INDEXING=true (CC_WEBDEV.md).
export const GET: APIRoute = ({ site }) => {
  const allow = import.meta.env.PUBLIC_ALLOW_INDEXING === "true";
  const sitemapURL = new URL("sitemap-index.xml", site);

  const body = allow
    ? `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${sitemapURL}
`
    : `User-agent: *
Disallow: /
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
