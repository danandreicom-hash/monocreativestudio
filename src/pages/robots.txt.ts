import type { APIRoute } from "astro";

// Fail-closed: crawlers are blocked unless the release build sets
// PUBLIC_ALLOW_INDEXING=true (CC_WEBDEV.md, D-023, D-025).
const answerEngineCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export const GET: APIRoute = ({ site }) => {
  const allow = import.meta.env.PUBLIC_ALLOW_INDEXING === "true";
  const sitemapURL = new URL("sitemap-index.xml", site);

  const body = allow
    ? [
        "User-agent: *",
        "Allow: /",
        "Disallow: /api/",
        "",
        "# Search and AI answer engines: explicitly allowed",
        ...answerEngineCrawlers.flatMap((bot) => [`User-agent: ${bot}`, "Allow: /", ""]),
        `Sitemap: ${sitemapURL}`,
        "",
      ].join("\n")
    : "User-agent: *\nDisallow: /\n";

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
