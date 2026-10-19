// Edge language routing (D-013). Only "/" reaches this Worker (run_worker_first).
// 1. A saved choice (cookie mono_lang) wins.
// 2. Visitors from Romania go to /ro/, everyone else to /en/.
// All other paths are served as static assets.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/") return env.ASSETS.fetch(request);

    const cookie = request.headers.get("Cookie") || "";
    const match = cookie.match(/(?:^|;\s*)mono_lang=(ro|en)/);
    const country = request.cf && request.cf.country;
    const lang = match ? match[1] : country === "RO" ? "ro" : "en";

    return new Response(null, {
      status: 302,
      headers: {
        Location: `/${lang}/`,
        Vary: "Cookie, CF-IPCountry",
        "Cache-Control": "private, no-store",
      },
    });
  },
};
