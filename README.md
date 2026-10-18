# You on the .com — boilerplate corporate/B2B

Boilerplate tehnic reutilizabil pentru site-uri corporate/business (agenții de creație, clienți
B2B), parte din linia de servicii **"You on the .com"** a **Creative Corporation International
(CCI)**. Se clonează per client și se personalizează doar la conținut și culori — structura de
cod rămâne neatinsă.

Conținutul din acest repo (Altura Consulting, servicii, studii de caz, echipă) e **demo/test**,
o firmă fictivă de consultanță de business — înlocuiește-l cu conținutul real al clientului.

> **Reguli de lucru: [`CC_WEBDEV.md`](CC_WEBDEV.md)** — metoda unică (v2.0) pentru Dan, ChatGPT și Claude Code. Înlocuiește orice reguli webdev anterioare.

## Cuprins

1. [Stack tehnic](#stack-tehnic)
2. [Structura de fișiere](#structura-de-fișiere)
3. [Clonare pentru un client nou](#clonare-pentru-un-client-nou)
4. [Rebranding — culori, font, logo](#rebranding--culori-font-logo)
5. [Adăugarea unei pagini noi](#adăugarea-unei-pagini-noi)
6. [Editarea conținutului (servicii, studii de caz, echipă, testimoniale)](#editarea-conținutului)
   6b. [Panoul de conținut (Decap CMS)](#panoul-de-conținut-decap-cms)
7. [Formularul de contact](#formularul-de-contact)
8. [Variabile de mediu](#variabile-de-mediu)
9. [Deploy pe Cloudflare](#deploy-pe-cloudflare)
10. [SEO tehnic — ce e automat](#seo-tehnic--ce-e-automat)
11. [Comenzi disponibile](#comenzi-disponibile)
12. [Recomandări pentru continuare](#recomandări-pentru-continuare)

---

## Stack tehnic

| Componentă          | Alegere                                                                                         | De ce                                                                                                                                                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework           | [Astro 7](https://astro.build)                                                                  | Randare majoritar statică (HTML minim, zero JS by-default) → Core Web Vitals excelente din start; ideal pentru site-uri de conținut ca acestea, spre deosebire de Next.js (orientat spre aplicații interactive, cu overhead nejustificat aici). |
| Stiluri             | [Tailwind CSS 4](https://tailwindcss.com)                                                       | Design tokens definiți direct în CSS (`@theme`), fără fișier de config JS separat; rebranding = editezi valorile hex din `src/styles/global.css`.                                                                                               |
| Conținut            | Astro Content Collections (Markdown, validat cu Zod)                                            | Fără CMS/bază de date — conținutul repetabil (servicii, studii de caz, echipă, testimoniale) sunt fișiere `.md` simple, editabile de oricine.                                                                                                   |
| Hosting             | Cloudflare Workers Static Assets                                                                | Recomandarea actuală (2026) a Cloudflare pentru proiecte noi, în locul Cloudflare Pages. Site-ul e 100% static (build-time), fără worker/adaptor SSR — vezi § Formularul de contact pentru motiv.                                               |
| Formular de contact | Worker Cloudflare separat, independent de Astro, legat de `/api/contact` prin Cloudflare Routes | Ocolește complet un bug curent (iulie 2026) în `@astrojs/cloudflare` + `@cloudflare/vite-plugin` — vezi § Formularul de contact.                                                                                                                |
| Email formular      | [Resend](https://resend.com) (API simplu, fără SDK)                                             | Ușor de înlocuit cu alt provider — vezi `workers/contact-form/src/index.ts`.                                                                                                                                                                    |

Vezi [package.json](package.json) pentru versiunile exacte instalate.

## Structura de fișiere

```
src/
  data/site.config.ts       ← datele firmei (nume, contact, meniu, social) — primul fișier de editat
  styles/global.css         ← design tokens (culori, fonturi) — al doilea fișier de editat
  content/                  ← conținut repetabil, în Markdown
    services/*.md
    case-studies/*.md
    team/*.md
    testimonials/*.md
  content.config.ts         ← schema (câmpurile obligatorii) pentru colecțiile de mai sus
  components/
    layout/                 ← Header, Footer
    sections/                ← Hero, Services, CaseStudies, Team, Testimonials, ContactForm, Cta
    ui/                      ← Button, Container, SectionHeading, SkipLink (primitive vizuale)
    seo/                     ← Seo.astro (meta tags), OrganizationSchema.astro (JSON-LD)
    icons/Icon.astro         ← toate iconițele site-ului, într-un singur fișier
  layouts/BaseLayout.astro  ← scheletul HTML comun tuturor paginilor (head, header, footer)
  pages/                    ← rutele site-ului (fiecare .astro = o pagină)
    index.astro              → /
    despre.astro              → /despre
    servicii/index.astro      → /servicii
    servicii/[slug].astro     → /servicii/strategie-de-business etc. (generat din content/services)
    portofoliu/index.astro    → /portofoliu
    portofoliu/[slug].astro   → /portofoliu/... (generat din content/case-studies)
    contact.astro              → /contact
    robots.txt.ts             → generează /robots.txt automat (rută statică, la build)
public/
  _headers                  ← security headers (Cloudflare le citește automat, nu se ating per client)
  images/og-default.jpg     ← imaginea implicită pentru Open Graph/social sharing
  favicon.svg, favicon.png, apple-touch-icon.png, site.webmanifest
  admin/                     ← panoul de conținut Decap CMS — vezi § Panoul de conținut
    index.html
    config.yml                ← singurul fișier de schimbat per client (câmpul `repo:`)
workers/
  contact-form/              ← Worker independent pentru formularul de contact (nu face parte din
                                build-ul Astro) — vezi § Formularul de contact
    src/index.ts
    wrangler.jsonc
  cms-oauth/                  ← Worker independent, partajat CCI-wide, pentru autentificarea
                                panoului de conținut — vezi § Panoul de conținut
    src/index.ts
    wrangler.jsonc
```

**Regulă simplă:** conținutul care se repetă (servicii, studii de caz, oameni din echipă,
testimoniale) e în `src/content/`. Restul textului (titlul din hero, textul din "Despre noi")
e direct în fișierul `.astro` al paginii respective — sunt fișiere scurte, ușor de citit chiar
și fără cunoștințe de programare.

## Clonare pentru un client nou

```bash
# 1. Copiază folderul (sau clonează repo-ul Git al boilerplate-ului)
cp -r you-on-the-com nume-client-nou
cd nume-client-nou

# 2. Instalează dependințele
npm install

# 3. Pornește serverul de dezvoltare
npm run dev
```

Apoi, în ordine:

1. Editează [src/data/site.config.ts](src/data/site.config.ts) — numele firmei, tagline, date de
   contact, meniu, rețele sociale.
2. Editează culorile din [src/styles/global.css](src/styles/global.css) (vezi secțiunea de mai jos).
3. Șterge conținutul demo din `src/content/*` și adaugă conținutul real al clientului (păstrează
   structura fișierelor ca exemplu).
4. Înlocuiește imaginile din `src/assets/` (fotografii echipă, studii de caz) și
   `public/images/og-default.jpg`, `public/favicon.svg` cu cele ale clientului.
5. Actualizează `wrangler.jsonc` → câmpul `"name"` cu un identificator unic (ex. `"acme-corp-site"`).
6. Actualizează `workers/contact-form/wrangler.jsonc` → `"name"` și, la câmpul `"routes"`,
   `pattern`/`zone_name` cu domeniul real al clientului (vezi § Formularul de contact).
7. Configurează variabilele de mediu (vezi mai jos) și fă deploy.

## Rebranding — culori, font, logo

- **Culori** — în [src/styles/global.css](src/styles/global.css), în blocul `@theme`, sunt două
  palete de câte 11 nuanțe: `--color-brand-*` (culoarea principală) și `--color-accent-*`
  (culoare secundară/CTA). Generează rapid o paletă nouă pornind de la culoarea de brand a
  clientului cu un tool ca [uicolors.app/create](https://uicolors.app/create) și înlocuiește
  valorile hex — toate componentele (butoane, linkuri, iconițe) se actualizează automat, pentru
  că folosesc clasele Tailwind `brand-*`/`accent-*`, nu culori hardcodate.
- **Font** — în [astro.config.mjs](astro.config.mjs), secțiunea `fonts:`, schimbă `name:` cu
  fontul dorit de pe Google Fonts (sau alt provider din
  [lista suportată](https://docs.astro.build/en/guides/fonts/)). Fonturile sunt auto-găzduite
  (servite de pe domeniul propriu, nu de la Google) pentru performanță și confidențialitate.
- **Logo** — momentan header-ul/footer-ul afișează numele firmei ca text
  (`siteConfig.companyName`). Dacă clientul are un logo grafic, înlocuiește textul din
  [src/components/layout/Header.astro](src/components/layout/Header.astro) cu
  `<img src="/images/logo.svg" alt={siteConfig.companyName} class="h-8" />`, folosind un fișier
  SVG pus în `public/images/`.
- **Favicon** — regenerează `public/favicon.svg`, `favicon.png`, `apple-touch-icon.png` și
  `icon-512.png` pornind de la logo-ul/monograma clientului (păstrează aceleași nume de fișier).

## Adăugarea unei pagini noi

Creează un fișier `.astro` nou în `src/pages/`. Numele fișierului devine URL-ul paginii — de
exemplu, `src/pages/cariere.astro` va fi disponibil la `/cariere`.

```astro
---
import BaseLayout from "@layouts/BaseLayout.astro";
import Container from "@components/ui/Container.astro";
---

<BaseLayout title="Cariere" description="Descriere pentru motoarele de căutare, 1-2 propoziții.">
  <Container class="py-20">
    <h1 class="text-4xl">Cariere</h1>
    <p class="mt-4 text-slate-600">Conținutul paginii aici.</p>
  </Container>
</BaseLayout>
```

Adaugă apoi link-ul în meniu, editând array-ul `nav` din
[src/data/site.config.ts](src/data/site.config.ts).

## Editarea conținutului

Fiecare colecție din `src/content/` e un folder cu fișiere `.md`. Ca să adaugi o intrare nouă:

1. Copiază un fișier `.md` existent din folderul colecției (ex. `src/content/services/`).
2. Redenumește fișierul (numele fișierului devine parte din URL, la servicii și studii de caz).
3. Schimbă valorile din antetul `---...---` (frontmatter) de sus.
4. Rescrie textul de dedesubt (suportă Markdown: `##` pentru subtitluri, `-` pentru liste, etc.).

Câmpurile obligatorii pentru fiecare colecție sunt definite (și validate automat la build) în
[src/content.config.ts](src/content.config.ts) — dacă lipsește un câmp obligatoriu sau are alt
tip decât cel așteptat, `npm run build` va afișa o eroare clară, cu fișierul și câmpul exact.

## Panoul de conținut (Decap CMS)

Editarea directă de fișiere Markdown (secțiunea de mai sus) e suficientă pentru cine se simte
confortabil cu Git. Pentru clienți sau colegi non-tehnici, boilerplate-ul include și un **panou
vizual de editare**, la `/admin` pe orice site clonat din el (ex.
`https://acme-corp.ro/admin`) — [Decap CMS](https://decapcms.org), open-source, fără cost de
licență, care scrie direct în aceleași fișiere Markdown din `src/content/` prin API-ul GitHub.
Nu e o bază de date separată — e doar o interfață peste conținutul deja versionat în Git.

### De ce Git ca backend, nu Netlify Identity

Decap CMS are nevoie de un mecanism OAuth ca să se autentifice cu GitHub și să aibă voie să
scrie în repo. Varianta oficială (Netlify Identity/Git Gateway) presupune găzduire pe Netlify —
nepotrivit aici, unde totul e pe Cloudflare. În loc de asta, boilerplate-ul include un **Worker
Cloudflare minimal, propriu** (`workers/cms-oauth/`) care face exact acest schimb OAuth
(cod scris de la zero, nu o dependință externă nevalidată — panoul gestionează conținutul unui
site de business, nu merită riscul de securitate al unui pachet OAuth nescris/neverificat de noi).

### Setup (o singură dată, la nivel de CCI — nu per client)

Spre deosebire de worker-ul de contact (care e per client, legat de domeniul fiecăruia),
**worker-ul de OAuth pentru CMS e o singură instanță, partajată de toate site-urile clonate din
acest boilerplate** — la fel ca un OAuth App GitHub, care nu e legat de un singur repo.

1. **Creează un OAuth App pe GitHub** (o singură dată — pas manual, doar din interfața web):
   [github.com/settings/applications/new](https://github.com/settings/applications/new)
   - **Application name**: orice (ex. "CCI — Decap CMS")
   - **Homepage URL**: `https://you-on-the-com-cms-oauth.danandrei-com.workers.dev`
   - **Authorization callback URL**: `https://you-on-the-com-cms-oauth.danandrei-com.workers.dev/callback`
   - Salvează **Client ID**-ul afișat, apoi apasă **Generate a new client secret** și salvează și
     acel secret (nu mai e afișat ulterior).
2. Setează cele două valori ca secrete ale worker-ului:
   ```bash
   npx wrangler secret put GITHUB_OAUTH_CLIENT_ID --config workers/cms-oauth/wrangler.jsonc
   npx wrangler secret put GITHUB_OAUTH_CLIENT_SECRET --config workers/cms-oauth/wrangler.jsonc
   ```
3. Deploy (dacă nu e deja):
   ```bash
   npm run deploy:cms-oauth
   ```

### La fiecare client nou

Singurul lucru de schimbat e câmpul `repo:` din
[public/admin/config.yml](public/admin/config.yml), cu `owner/nume-repo` al site-ului clonat.
Restul configurației (worker-ul de OAuth, colecțiile de conținut) rămâne identic, pentru că
mapează structura fixă a boilerplate-ului. Orice cont GitHub cu acces de scriere pe acel repo se
poate autentifica și edita conținutul din `/admin`.

## Formularul de contact

### De ce e un Worker separat, nu o rută Astro

Varianta "firească" ar fi fost un endpoint Astro (`src/pages/api/contact.ts`, cu
`export const prerender = false`, randat la cerere prin adaptorul `@astrojs/cloudflare`). Am
încercat exact asta — dar versiunile curente (iulie 2026) ale `@astrojs/cloudflare` (14.x) și
`@cloudflare/vite-plugin` (1.47.x) au un bug reprodus și confirmat separat, inclusiv pe un
proiect Astro+Cloudflare complet nou, generat oficial: primul `astro build`/`astro check` dintr-un
clone curat eșuează, pentru că plugin-ul validează existența fișierului worker generat
(`dist/_worker.js/index.js`) **înainte** ca Astro să apuce să-l genereze — o dependență circulară
care nu poate fi rezolvată din exterior (nu doar la noi — la fel eșuează și șablonul oficial
Cloudflare pentru Astro, pe o instalare complet curată). Când se rezolvă în upstream, varianta cu
rută Astro devine din nou opțiune validă.

Până atunci, formularul funcționează printr-un **Worker Cloudflare independent**
(`workers/contact-form/`), care nu depinde deloc de pipeline-ul de build Astro — deci nu e afectat
de bug-ul de mai sus. E legat de calea `/api/contact` de pe domeniul site-ului principal prin
[Cloudflare Routes](https://developers.cloudflare.com/workers/configuration/routing/routes/), deci
din perspectiva formularului (și a browserului) totul se comportă identic cu un endpoint
same-origin normal — zero cod suplimentar în `ContactForm.astro`, zero CORS în producție.

### Cum funcționează

`workers/contact-form/src/index.ts` validează datele primite (inclusiv un câmp "honeypot"
anti-spam, invizibil pentru vizitatori reali) și trimite un email prin [Resend](https://resend.com).
Are nevoie de cele trei variabile de mediu din secțiunea următoare ca să funcționeze.

Dacă preferi alt provider de email (SendGrid, Postmark, Amazon SES) sau vrei să trimiți datele
către un CRM, adaptează doar blocul `fetch(...)` din `index.ts` — restul (validare, honeypot,
răspunsurile JSON) rămâne neschimbat.

### Setup (o singură dată, per client)

1. În `workers/contact-form/wrangler.jsonc`, schimbă `"name"` și, la `"routes"`,
   `pattern`/`zone_name` cu domeniul real al clientului (ex.
   `"pattern": "acme-corp.ro/api/contact"`, `"zone_name": "acme-corp.ro"`) — domeniul trebuie să
   fie deja activ pe Cloudflare (DNS gestionat de Cloudflare).
2. Setează secretele (vezi § Variabile de mediu) și fă `npm run deploy:contact-form`.

### Testare locală (development)

Rulează worker-ul separat, în paralel cu `npm run dev`:

```bash
# Terminal 1 — worker-ul de contact, pe http://localhost:8787
cp workers/contact-form/.dev.vars.example workers/contact-form/.dev.vars
# completează RESEND_API_KEY etc. în fișierul de mai sus, apoi:
npm run dev:contact-form

# Terminal 2 — site-ul principal
# în .env: PUBLIC_CONTACT_ENDPOINT=http://localhost:8787
npm run dev
```

Fără `PUBLIC_CONTACT_ENDPOINT` setat, formularul afișează din UI corect (vezi design-ul), dar
trimiterea eșuează local — normal, pentru că `/api/contact` nu există pe serverul de dev Astro
(doar în producție, prin Cloudflare Routes).

**Recomandare pentru producție:** adaugă
[Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) (CAPTCHA invizibil, gratuit)
în plus față de honeypot, dacă site-ul primește trafic semnificativ de spam.

## Variabile de mediu

Sunt împărțite în două grupuri, pentru că sunt doi deployabili separați (vezi § Formularul de
contact). **Nu comite niciodată** `.env`/`.dev.vars` în Git (sunt deja excluse prin `.gitignore`).

**Site-ul principal** — copiază [.env.example](.env.example) ca `.env`:

| Variabilă                 | Obligatorie         | Descriere                                                                                                                |
| ------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `PUBLIC_SITE_URL`         | Da                  | URL-ul final al site-ului (ex. `https://acme-corp.ro`), folosit pentru sitemap, `robots.txt`, canonical URLs și JSON-LD. |
| `PUBLIC_CONTACT_ENDPOINT` | Nu (doar dev local) | Adresa worker-ului de contact rulat local — vezi § Formularul de contact § Testare locală.                               |

**Worker-ul de contact** (`workers/contact-form/`) — copiază
[workers/contact-form/.dev.vars.example](workers/contact-form/.dev.vars.example) ca
`workers/contact-form/.dev.vars` pentru testare locală:

| Variabilă            | Obligatorie | Descriere                                                         |
| -------------------- | ----------- | ----------------------------------------------------------------- |
| `RESEND_API_KEY`     | Da          | Cheia API generată din dashboard-ul Resend.                       |
| `CONTACT_TO_EMAIL`   | Da          | Adresa care primește mesajele din formular.                       |
| `CONTACT_FROM_EMAIL` | Da          | Adresa "From" — trebuie să fie pe un domeniu verificat în Resend. |
| `ALLOWED_ORIGIN`     | Nu          | Doar pentru dev local/CORS — vezi comentariile din fișier.        |

**În producție**, secretele worker-ului de contact se setează **doar** prin comanda de mai jos
(rulată din rădăcina proiectului), niciodată în fișiere:

```bash
npx wrangler secret put RESEND_API_KEY --config workers/contact-form/wrangler.jsonc
npx wrangler secret put CONTACT_TO_EMAIL --config workers/contact-form/wrangler.jsonc
npx wrangler secret put CONTACT_FROM_EMAIL --config workers/contact-form/wrangler.jsonc
```

`PUBLIC_SITE_URL` (site-ul principal) se setează la build, ca variabilă de mediu în CI/CD sau
local înainte de `npm run deploy`.

## Deploy pe Cloudflare

Boilerplate-ul e configurat pentru **Cloudflare Workers** (nu Cloudflare Pages — Cloudflare
recomandă Workers pentru proiecte noi începând din 2026). Sunt **doi deployabili separați**:
site-ul principal (static) și worker-ul de contact (vezi § Formularul de contact pentru motiv).

```bash
# Autentificare (o singură dată per mașină)
npx wrangler login

# 1. Site-ul principal — build + deploy
npm run deploy

# 2. Worker-ul de contact — o singură dată per client, sau la fiecare modificare a lui
npm run deploy:contact-form
```

`npm run deploy` rulează `astro check` (verificare de tipuri), `astro build` (generează `dist/`,
100% static) și `wrangler deploy` (publică fișierele statice pe Cloudflare). După primul deploy:

1. În dashboard-ul Cloudflare → Workers & Pages → proiectul tău → **Settings → Domains**,
   conectează domeniul final al clientului.
2. Confirmă că `workers/contact-form/wrangler.jsonc` are `routes` configurat cu același domeniu
   (vezi § Formularul de contact § Setup) și rulează `npm run deploy:contact-form`.
3. Setează secretele worker-ului de contact (comenzile de mai sus).
4. Verifică `wrangler.jsonc` și `workers/contact-form/wrangler.jsonc` → `"name"` e unic în fiecare
   (dacă rulezi mai multe site-uri de clienți din același cont Cloudflare, fiecare are nevoie de
   nume distincte).

## SEO tehnic — ce e automat

Nu trebuie configurat manual per client:

- **`sitemap.xml`** — generat automat la build de `@astrojs/sitemap`, pe baza paginilor existente.
- **`robots.txt`** — generat automat (`src/pages/robots.txt.ts`), trimite direct la sitemap.
- **Meta tags (Open Graph, Twitter Card)** — `src/components/seo/Seo.astro`, populat automat cu
  `title`/`description` din fiecare pagină.
- **JSON-LD (schema.org)** — `src/components/seo/OrganizationSchema.astro`, generat din datele
  din `site.config.ts` (adresă, telefon, email) — nu necesită editare separată.
- **Optimizare imagini** — componenta `<Image />` din `astro:assets`, folosită pentru fotografiile
  din studii de caz și echipă: redimensionare și conversie automată la formate moderne (WebP/AVIF)
  la build, fără request-uri către un serviciu extern.
- **Fonturi auto-găzduite** — via Fonts API nativ Astro, fără request-uri către Google Fonts la
  runtime.

## Comenzi disponibile

| Comandă           | Ce face                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `npm run dev`     | Server de development local, cu hot-reload.                                                                        |
| `npm run build`   | Verificare de tipuri (`astro check`) + build de producție în `dist/`.                                              |
| `npm run preview` | Rulează build-ul local prin `wrangler dev`, emulând mediul Cloudflare real (inclusiv variabilele din `.dev.vars`). |
| `npm run deploy`  | Build + publicare pe Cloudflare.                                                                                   |
| `npm run check`   | Doar verificarea de tipuri, fără build.                                                                            |
| `npm run lint`    | Verifică regulile ESLint (calitate cod, accesibilitate de bază).                                                   |
| `npm run format`  | Formatează automat tot codul cu Prettier.                                                                          |

## Recomandări pentru continuare

Câteva îmbunătățiri de luat în calcul înainte de un site cu trafic mare, sau la cererea unui
client anume — deliberat **nu** sunt incluse implicit, ca boilerplate-ul să rămână simplu:

- **Cloudflare Turnstile** pe formularul de contact, dacă apare spam în ciuda honeypot-ului.
- **Cloudflare Web Analytics** (gratuit, fără cookie-uri, fără banner de consimțământ necesar) —
  se adaugă cu un singur snippet din dashboard; dacă adaugi alt tool de analiză (Google
  Analytics etc.), actualizează și `Content-Security-Policy` din `public/_headers`.
- **Rută Astro pentru formular, în loc de Worker separat** — dacă bug-ul upstream descris în
  § Formularul de contact e rezolvat între timp (verifică changelog-ul
  [`@astrojs/cloudflare`](https://github.com/withastro/astro/tree/main/packages/integrations/cloudflare)),
  varianta cu `src/pages/api/contact.ts` randat la cerere prin `@astrojs/cloudflare` e mai simplă
  (un singur deployabil) — poate înlocui worker-ul separat.
- **Newsletter/CRM** — formularul de contact e independent de orice newsletter; pentru integrare
  Mailchimp/HubSpot etc., se adaugă un al doilea formular sau se extinde
  `workers/contact-form/src/index.ts`.
- **Test de accesibilitate automatizat** — pentru proiecte mari, adaugă
  [`@axe-core/playwright`](https://www.npmjs.com/package/@axe-core/playwright) în CI, ca
  completare la verificările manuale deja aplicate în componente (contrast AA, navigare de
  tastatură, HTML semantic, ARIA).
