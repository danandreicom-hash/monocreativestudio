/**
 * Worker independent pentru formularul de contact — deployat separat de
 * site-ul principal (vezi README § Formularul de contact pentru motiv și
 * pași de deploy). Nu depinde de Astro/@astrojs/cloudflare.
 */

export interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
  // Originea permisă pentru CORS — utilă mai ales în development local
  // (ex. http://localhost:4321), unde worker-ul și site-ul NU sunt same-origin.
  // În producție, dacă worker-ul e legat prin Cloudflare Routes pe același
  // domeniu ca site-ul (configurația implicită, recomandată), CORS nu mai e
  // necesar — dar header-ul rămâne inofensiv.
  ALLOWED_ORIGIN?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data: unknown, status: number, origin: string) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": origin,
      Vary: "Origin",
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = env.ALLOWED_ORIGIN ?? "*";

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return json({ error: "method-not-allowed" }, 405, origin);
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return json({ error: "invalid-json" }, 400, origin);
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const company = String(body.company ?? "").trim();
    const message = String(body.message ?? "").trim();
    const honeypot = String(body.website ?? "").trim();

    // Câmp honeypot completat = aproape sigur un bot. Răspundem "succes" fals,
    // ca să nu semnalăm scriptului că a fost detectat.
    if (honeypot.length > 0) {
      return json({ ok: true }, 200, origin);
    }

    if (name.length < 2 || name.length > 120) {
      return json({ error: "invalid-name" }, 400, origin);
    }
    if (!EMAIL_RE.test(email) || email.length > 200) {
      return json({ error: "invalid-email" }, 400, origin);
    }
    if (message.length < 10 || message.length > 4000) {
      return json({ error: "invalid-message" }, 400, origin);
    }

    if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
      console.error("Lipsesc variabilele de mediu pentru trimiterea emailului de contact.");
      return json({ error: "server-not-configured" }, 500, origin);
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: env.CONTACT_TO_EMAIL,
        reply_to: email,
        subject: `Mesaj nou din site — ${name}`,
        text: [`Nume: ${name}`, `Email: ${email}`, company && `Companie: ${company}`, "", message]
          .filter(Boolean)
          .join("\n"),
      }),
    });

    if (!emailResponse.ok) {
      console.error("Resend a răspuns cu eroare:", await emailResponse.text());
      return json({ error: "email-provider-error" }, 502, origin);
    }

    return json({ ok: true }, 200, origin);
  },
};
