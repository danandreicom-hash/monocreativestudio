/**
 * Worker independent — punte OAuth GitHub pentru panoul de editare Decap CMS
 * (public/admin/). Reutilizabil pentru orice site clonat din acest boilerplate:
 * un singur OAuth App GitHub + un singur deploy al acestui worker, la nivel de
 * CCI, nu per client (vezi README § Panoul de conținut (Decap CMS)).
 *
 * Implementează protocolul standard "OAuth proxy" pe care Decap CMS îl așteaptă
 * de la un backend "github" auto-găzduit: /auth redirecționează spre ecranul de
 * autorizare GitHub, /callback schimbă codul primit pe un access token și îl
 * trimite înapoi ferestrei care a deschis popup-ul prin `postMessage`.
 */

export interface Env {
  GITHUB_OAUTH_CLIENT_ID: string;
  GITHUB_OAUTH_CLIENT_SECRET: string;
}

const STATE_COOKIE = "decap_oauth_state";

function randomState(): string {
  return crypto.randomUUID();
}

function htmlResponse(body: string) {
  return new Response(body, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

function callbackScript(status: "success" | "error", payload: Record<string, unknown>) {
  // Formatul exact așteptat de Decap CMS: un mesaj postMessage de tipul
  // "authorization:github:<status>:<json>", trimis DUPĂ ce fereastra Decap
  // (opener) confirmă că ascultă, prin propriul ei mesaj "authorizing:github".
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  return htmlResponse(`<!doctype html>
<html>
<body>
<script>
  (function () {
    function receiveMessage(event) {
      window.opener.postMessage(${JSON.stringify(message)}, event.origin);
      window.removeEventListener("message", receiveMessage, false);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
</script>
<p>${status === "success" ? "Autentificare reușită — poți închide fereastra." : "Eroare la autentificare."}</p>
</body>
</html>`);
}

async function handleAuth(url: URL, env: Env): Promise<Response> {
  const state = randomState();
  const redirectUri = `${url.origin}/callback`;

  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", env.GITHUB_OAUTH_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo,user:email");
  authorizeUrl.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl.toString(),
      // HttpOnly + SameSite=Lax + Secure: cookie-ul de state nu e accesibil din JS
      // și nu circulă cross-site — protecție standard CSRF pentru fluxul OAuth.
      "Set-Cookie": `${STATE_COOKIE}=${state}; HttpOnly; Secure; SameSite=Lax; Path=/callback; Max-Age=600`,
    },
  });
}

async function handleCallback(request: Request, url: URL, env: Env): Promise<Response> {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieHeader = request.headers.get("Cookie") ?? "";
  const expectedState = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${STATE_COOKIE}=`))
    ?.split("=")[1];

  if (!code || !state || !expectedState || state !== expectedState) {
    return callbackScript("error", { message: "invalid-state" });
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/callback`,
    }),
  });

  if (!tokenResponse.ok) {
    return callbackScript("error", { message: "token-exchange-failed" });
  }

  const tokenData = (await tokenResponse.json()) as { access_token?: string; error?: string };
  if (!tokenData.access_token) {
    return callbackScript("error", { message: tokenData.error ?? "no-access-token" });
  }

  return callbackScript("success", { token: tokenData.access_token, provider: "github" });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/auth") return handleAuth(url, env);
    if (url.pathname === "/callback") return handleCallback(request, url, env);

    return new Response(
      "Worker de autentificare OAuth pentru panoul Decap CMS. Nu accesa direct — folosește /admin de pe site.",
      { status: 404 },
    );
  },
};
