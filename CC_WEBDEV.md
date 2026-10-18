# CC WEBDEV v2.0 — Regulile unice pentru site-uri client

- Versiune: 2.0
- Status: REVIEW (devine APPROVED când Dan Andrei îmbină PR-ul care introduce acest fișier)
- Proprietar: Dan Andrei
- Locul canonic: `CC_WEBDEV.md` în `danandreicom-hash/you-on-the-com` (boilerplate). Fiecare proiect client primește o copie la bootstrap.
- Înlocuiește: toate regulile anterioare despre webdev (CC WEBDEV v1.x din `CLAUDE.md`, `project/AI_HANDOFF.md` v1.1, pagina Notion „CC WEBDEV Method — Conceptiones Pilot”, „Document Master — You on the .com”, „You on the .com — Onboarding, Construcție & Lansare Site”, `09_WEBDEV_METHOD.md` din Conceptiones). Cele vechi rămân doar ca istoric; în caz de conflict, câștigă acest document.
- Limba: română pentru reguli și explicații; engleză pentru identificatori (`TASK-xxx`, statusuri, nume de fișiere) și pentru documentele de proiect scrise de agenți.

## 0. Cum se folosește

| Cine        | Citește                | Când                                                        |
| ----------- | ---------------------- | ----------------------------------------------------------- |
| Dan         | §1, §2, §4, §9         | La început de proiect și la fiecare poartă (G1–G4)          |
| ChatGPT     | §3, §4, §5, §8, §10    | La începutul fiecărui thread nou                            |
| Claude Code | §3, §5, §6, §7, §8, §9 | La începutul fiecărei sesiuni (în plus față de `CLAUDE.md`) |

Regulă de aur: **nimeni nu citește tot documentul la fiecare task.** Un task numește secțiunile de care are nevoie.

## 1. Principii

1. **Cost zero până la clienți serioși.** Orice serviciu plătit, abonament, API cu plată sau dependență nouă cere aprobarea prealabilă a lui Dan (vezi §2).
2. **GitHub e adevărul.** Cod, specificații, decizii, stare, QA. Notion e panou de management și bibliotecă de metodă; o conversație nu dovedește aprobare sau finalizare.
3. **Un singur owner per task, un singur agent pe aceleași fișiere.** Niciodată doi agenți în paralel pe același task.
4. **Documente mici, pe unitate de lucru.** O pagină = un fișier de copy. Un task = un fișier de maxim 15 linii. Handoff-ul are maxim 60 de linii.
5. **Ce poate verifica un script nu se verifică prin citire.** `scripts/qa.sh` rulează la fiecare task și raportează doar erorile.
6. **Nu inventăm.** Fapte, cifre, nume, drepturi, recenzii, adrese: doar ce e confirmat. Ce lipsește se marchează „de confirmat”.
7. **Fail-closed.** Site-ul rămâne `noindex` până când un build de producție verificat îl deschide explicit.
8. **Dan decide, agenții propun.** Strategia, copy-ul, structura, designul, costurile, publicarea și lansarea cer decizia lui Dan, înregistrată în `project/06_DECISIONS.md` (sau, la Essentials, în `AI_HANDOFF.md`).
9. **Greutatea procesului urmărește prețul proiectului** (pachetele pe tier, §5).

## 2. Costuri: ce e gratuit și ce cere aprobare

**Implicit, gratuit (se poate folosi fără întrebare):** GitHub (repo privat), Cloudflare Free (DNS, CDN, SSL, Workers Static Assets), Astro, Tailwind, Decap CMS, ESLint, Prettier, `wrangler`, VS Code, Claude Code și ChatGPT din abonamentele existente ale lui Dan.

**Gratuit, dar cu condiții de verificat la momentul deciziei** (limitele și termenii se schimbă; se verifică pe pagina oficială și se notează în `06_DECISIONS.md`): trimiterea emailului din formular (ex. Resend), monitorizare (UptimeRobot), analytics, cutie poștală de domeniu. Până la decizie, formularul folosește varianta `mailto:` (precedent: Conceptiones D-064), care nu costă nimic și nu stochează date.

**Necesită aprobarea lui Dan înainte de orice pas:**

- Storyblok sau orice CMS cu abonament (politică aprobată de Dan, 2026-10-14: Decap implicit, Storyblok doar cu aprobarea lui per client).
- Cloudflare Pro sau orice upgrade de plan; domeniu nou; cutie poștală plătită (Google Workspace, Microsoft 365).
- Bitwarden Business și alte instrumente de echipă, până apar clienți serioși.
- Orice dependență npm nouă, chiar gratuită (inclusiv uneltele de test din §8, treapta 2).
- Orice API cu plată sau cu card pe fișier.

**Regula de decizie la costuri:** dacă nu e sigur că e gratuit, se tratează ca plătit și se întreabă.

**Raportare:** agentul care propune un cost scrie într-un rând: ce, preț lunar/anual, alternativa gratuită, ce se pierde fără el.

## 3. Roluri și limite

| Rol                                 | Face                                                                                                                                                                           | Nu face                                                                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| **Dan Andrei**                      | Relația cu clientul, brief, direcție creativă, aprobări de scop/copy/asset-uri/cost, acceptarea livrării, decizia de lansare, accesul la conturi (GitHub, Cloudflare, domenii) | —                                                                                                                             |
| **ChatGPT** (cercetare cu browsing) | Cercetare, strategie, UX, sitemap, copy, specificații, QA la milestone, rapoarte                                                                                               | Nu implementează, decât un task atribuit explicit de Dan în `TASK_LOCKS.md`. Nu scrie în Notion. Nu schimbă decizii aprobate. |
| **Claude Code**                     | Implementare, build, responsive, fix-uri, `qa.sh`, commit-uri, PR-uri, sincronizarea Notion (singurul scriitor în Notion), bootstrap-ul proiectelor                            | Nu schimbă strategie, copy, structură sau design aprobat. Nu adaugă costuri. Nu lansează. Nu schimbă statusuri fără dovadă.   |
| **GitHub**                          | Sursa adevărului                                                                                                                                                               | —                                                                                                                             |
| **Notion**                          | Panou de management, registru de metodă, lecții                                                                                                                                | Nu suprascrie GitHub                                                                                                          |

**Acces:** Dan păstrează controlul deplin asupra conturilor. Agenții primesc doar accesul necesar task-ului. Colaboratorii viitori: doar citire și comentarii. Secretele nu intră niciodată în Git.

**Decizii care aparțin doar lui Dan:** aprobarea de copy, asset-uri și drepturi; costuri; domeniul; publicarea; indexarea; analytics și consimțământ; orice schimbare a direcției vizuale.

## 4. Fluxul: 7 faze, 4 porți

Fiecare fază are un singur responsabil, un livrabil cu dimensiune maximă și o ieșire clară.

| Faza                          | Responsabil                                    | Livrabil (max.)                                                                                                              | Poartă                                                           |
| ----------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **0. Calificare și ofertă**   | Dan, cu Claude                                 | Brief de 1 pagină (`00_PROJECT.md`): obiectiv, public, tier, buget, termen, ce nu intră. Ofertă din grila de prețuri         | Ofertă acceptată de client                                       |
| **1. Strategie și structură** | ChatGPT                                        | `01_STRATEGY.md` și `02_SITEMAP.md`, fiecare sub 2 pagini; 2–3 concurenți pentru calibrare, citați ca inspirație, nu copiați | **G1** Brief blocat                                              |
| **2. Copy și asset-uri**      | ChatGPT scrie, Dan aprobă                      | Un fișier de copy pe pagină (`copy/<pagina>.md`); registru de asset-uri                                                      | **G2** Copy și asset-uri aprobate pentru paginile reprezentative |
| **3. Direcție vizuală**       | Claude Design, apoi handoff în Claude Code     | Tokens (culori, tipografie), header și footer canonice, 3 pagini reprezentative                                              | **G3** Direcție aprobată                                         |
| **4. Construcție**            | Claude Code                                    | Task-uri `TASK-xxx`; `qa.sh` verde; URL de preview                                                                           | —                                                                |
| **5. QA, lansare, recurență** | Claude (teste), ChatGPT (QA la milestone), Dan | Checklist de release (§9), hosting, domeniu, adăugare în baza MRR                                                            | **G4** Lansare                                                   |
| **6. Retrospectivă**          | Claude                                         | 30 de minute: ce lecții generice se promovează în boilerplate și în acest document                                           | —                                                                |

**Dependențe:** fazele 2 și 3 pot rula în paralel după G1. Faza 4 începe numai după G2 și G3. Un task de construcție nu poate depăși ce a fost aprobat la G2/G3.

### Ce înseamnă fiecare poartă

- **G1 Brief blocat:** obiectivul, publicul, oferta, structura paginilor, CTA-ul principal și excluderile sunt scrise și aprobate. De aici, schimbările cer o decizie nouă.
- **G2 Copy și asset-uri:** textul paginilor reprezentative e aprobat; fiecare imagine are sursă, drepturi, credit, rol și text alternativ. Fiecare pagină nouă din preview poate avea secțiuni marcate „de confirmat”, dar nimic neconfirmat nu se publică.
- **G3 Direcție vizuală:** culorile (cu valori exacte), fonturile, header-ul, footer-ul și cele 3 pagini reprezentative sunt aprobate. De aici, componentele canonice nu se mai schimbă fără decizie.
- **G4 Lansare:** preview acceptat, checklist de release verde, blocajele juridice și de hosting închise, Dan decide data.

### Faza 0 — pașii comerciali (pe scurt)

Prospect → contactat → calificat → ofertă → negociere → client activ → onboarding. Detaliile comerciale rămân în Notion (Registru de Clienți, baza MRR). Aici contează doar ieșirea: un brief de 1 pagină și un tier ales.

## 5. Pachete de documente pe tier

Greutatea guvernanței urmărește prețul. Se alege tier-ul în faza 0; bootstrap-ul păstrează doar fișierele tier-ului.

| Fișier / practică                                           | Essentials (1.200–2.000 €) | Growth (2.500–4.500 €)   | Premium (de la 6.000 €) |
| ----------------------------------------------------------- | -------------------------- | ------------------------ | ----------------------- |
| `CLAUDE.md` (scurt)                                         | da                         | da                       | da                      |
| `project/AI_HANDOFF.md` (≤ 60 linii, task-urile ca rânduri) | da                         | da                       | da                      |
| `project/00_PROJECT.md` (brief)                             | da                         | da                       | da                      |
| `copy/<pagina>.md`                                          | da                         | da                       | da                      |
| `project/07_QA.md`                                          | da                         | da                       | da                      |
| `project/06_DECISIONS.md`                                   | decizii scurte în handoff  | da                       | da                      |
| `project/01_STRATEGY.md`, `02_SITEMAP.md` (≤ 2 pagini)      | în brief                   | da                       | da                      |
| `project/04_DESIGN_SPEC.md` (≤ 3 pagini)                    | tokens în `global.css`     | da                       | da                      |
| `project/TASK_LOCKS.md`, `project/tasks/TASK-xxx.md`        | nu (un singur agent activ) | da                       | da                      |
| `project/COORDINATION.md`                                   | nu                         | da                       | da                      |
| `project/05_DEV_SPEC.md`                                    | nu                         | opțional                 | da                      |
| `ASSETS.md` pe rută, matrice rute, raport de release        | nu                         | checklist simplu         | da                      |
| Dashboard Notion cu baze de date                            | o pagină „Status”          | pagina Status + Blockers | complet                 |

**Plafoane de dimensiune:** `AI_HANDOFF.md` ≤ 60 linii; fișier de task ≤ 15 linii; `01_STRATEGY`, `02_SITEMAP` ≤ 2 pagini; `04_DESIGN_SPEC` ≤ 3 pagini; copy ≤ 1 fișier per pagină. Ce depășește un plafon se mută în `project/archive/` sau se împarte.

## 6. Structura repo-ului și circuitul unui task

```
CLAUDE.md                     ← instrucțiuni scurte pentru Claude Code (trimite aici)
CC_WEBDEV.md                  ← acest document
project/
  AI_HANDOFF.md               ← starea curentă, ≤ 60 linii
  00_PROJECT.md               ← brief
  01_STRATEGY.md  02_SITEMAP.md  04_DESIGN_SPEC.md  05_DEV_SPEC.md
  06_DECISIONS.md             ← decizii permanente + index
  07_QA.md                    ← probleme P0/P1/P2 cu dovezi
  08_CHANGELOG.md             ← generat: bash scripts/changelog.sh
  COORDINATION.md  TASK_LOCKS.md  tasks/_TEMPLATE.md  tasks/TASK-xxx.md
  archive/                    ← istoric, se citește doar la cerere
copy/<pagina>.md              ← un fișier de copy pe pagină
scripts/qa.sh  scripts/changelog.sh
```

### Ordinea de citire pentru un task

1. `project/AI_HANDOFF.md`
2. `project/TASK_LOCKS.md` (la Growth și Premium)
3. Fișierul de task `project/tasks/TASK-xxx.md`
4. `project/06_DECISIONS.md` (deciziile permanente; arhiva doar când indexul trimite acolo)
5. Doar fișierele pe care task-ul le numește

### Statusuri și severități (exact așa)

- Statusuri: `DRAFT`, `REVIEW`, `APPROVED`, `IMPLEMENT`, `IMPLEMENTED`, `QA`, `DONE`. Numai `IMPLEMENT` autorizează cod. `IMPLEMENTED` nu înseamnă `DONE`.
- Severități QA: `P0` (blochează lansarea sau un parcurs critic), `P1` (corecție importantă), `P2` (îmbunătățire).
- `DONE` = criteriile de acceptare îndeplinite, verificate, după merge și verificare post-merge.

### Circuitul unui task

1. **Autorizare:** Dan setează `IMPLEMENT` (înregistrat în decizie sau în fișierul de task).
2. **Claim:** agentul pune un rând în `TASK_LOCKS.md` (owner `CLAUDE` sau `CODEX`, ramură, fișierele permise) și îl trimite pe `main`. Dacă push-ul e respins, trage, citește din nou și se oprește dacă altcineva a luat taskul.
3. **Lucru pe ramură** `claude/TASK-xxx` sau `codex/TASK-xxx`, creată din `main` curent. Se ating doar fișierele din rândul de lock.
4. **Verificare:** `bash scripts/qa.sh`. Se raportează doar eșecurile.
5. **Rezultat:** secțiunea „Result” din fișierul de task (commit, PR, verificări, blocaje).
6. **PR și merge** (Dan aprobă). La merge, și numai atunci: o linie în `AI_HANDOFF.md`, lock eliberat (owner `NONE`), status `IMPLEMENTED`.
7. **QA și acceptare:** `IMPLEMENTED` → `QA` → `DONE` după verificare și acceptarea lui Dan.

**Fișierele comune** (`AI_HANDOFF.md`, `06_DECISIONS.md`) se editează doar la merge, de agentul care îmbină, după rebase pe `main`.

### AMBIGUITY (când ceva nu e clar)

Agentul nu ghicește. Scrie în fișierul de task, lasă taskul la `REVIEW` și nu implementează partea neclară:

- **AMBIGUITY:**
  - Document/secțiune afectată:
  - Întrebare: întrebarea exactă.
  - Impact: ce nu se poate implementa până la răspuns.
  - Decizia aparține: de regulă Dan Andrei.

### Raportul către Dan (sub 12 linii)

Task, status, fișiere schimbate, rezultatul verificărilor, blocaje, pasul următor.

### Commit-uri

Mesaj clar (`feat:`, `fix:`, `docs:` + id task). Se raportează hash-ul exact. Changelog-ul nu se scrie de mână.

## 7. Reguli de construcție

### Stack (fix, fără excepții implicite)

Astro + Tailwind, output 100% static, hosting pe Cloudflare Workers Static Assets, `npm run deploy` (verificare, build, `wrangler deploy`). Next.js doar cu decizie scrisă a lui Dan, pentru funcționalități de aplicație (dashboard etc.), nu pentru site de prezentare.

### Cod și design

1. **Un singur Header și un singur Footer canonice** pentru toate rutele. Fără variante specifice de pagină.
2. **Design tokens** în `src/styles/global.css`: culoare, tipografie, spațiere. Culorile de brand au valori hex exacte din aprobare; nu se „aproximează”.
3. **Înălțimea paginii o dă conținutul.** Nicio pagină nu se fixează la dimensiunea unei capturi. Intervalele de spațiere sunt praguri minime de lizibilitate, nu valori de comprimat.
4. **Reutilizare:** componente existente înainte de componente noi. Schițele generate sunt direcție, nu coordonate de copiat.
5. **Fotografiile nu au colțuri rotunjite**, dacă designul aprobat nu cere altfel.
6. **Ordine de citire pe mobil previzibilă;** rapoarte de aspect media stabile.
7. **Fonturi auto-găzduite** (fără cereri către Google Fonts). Imagini prin componenta Image din Astro, AVIF/WebP, dimensiuni explicite.

### Imagini și asset-uri (proveniență)

Fiecare imagine publică e clasificată înainte de folosire:

- **Dovadă reală de proiect:** fotografie nemodificată, legată doar de proiectul real la care aparține.
- **Lucrare/produs real fotografiat:** ilustrează o capabilitate, cu autor, permisiune și credit înregistrate.
- **Imagine editorială generată:** doar pentru zone generale (nu studii de caz), cu aprobarea explicită a lui Dan; nu se prezintă ca dovadă a unui proiect real.
- **Concept nerealizat:** etichetat explicit, separat de proiectele finalizate.
- **Placeholder:** clar non-producție, layout stabil, `noindex`; nu înlocuiește în tăcere dovada lipsă.

Pentru fiecare asset se înregistrează: nume stabil, locația sursei (master), derivatele publice, autor/proprietar, drepturi, credit, rolul pe pagină, decupaj/punct focal, text alternativ, decizia de aprobare. Masterele rămân în `master/`; derivatele web se generează separat și nu se mărește peste rezoluția utilă. Fiecare imagine se folosește o dată în site, dacă Dan nu aprobă repetarea. Un blocaj de asset se închide numai după ce accesul, potrivirea vizuală, permisiunea și creditul sunt confirmate.

### Accesibilitate, SEO, GEO, performanță

- Un singur H1 pe pagină; titlu și descriere unice; URL canonic; imagine de social share.
- Text alternativ descriptiv, contrast ridicat, text de bază minim 16 px pe mobil, acces de la tastatură, suport pentru `prefers-reduced-motion` (WCAG 2.2 AA ca țintă).
- Entitate definită consecvent: cine, ce, unde, pentru cine. Întrebări-răspuns doar unde ajută. Date structurate (schema) doar ce susține conținutul vizibil verificat; nu se fabrică birouri, recenzii, disponibilitate sau livrare internațională.
- `llms.txt` pentru descoperire de către motoare de răspuns (model: `marketchemica-site`).
- Risc Core Web Vitals (LCP, INP, CLS) evaluat pe graful real de resurse; nu se sacrifică fidelitatea lucrărilor pentru ținte de compresie arbitrare.
- Copy-ul public primește revizie umană pentru fapte, ton și formulări vizibil generice.

### Securitate

Antete de securitate în `public/_headers` (CSP, HSTS, X-Frame-Options, Permissions-Policy). CSP relaxat numai pe `/admin/*`, dacă CMS-ul e activ. Secretele se pun cu `wrangler secret put`, niciodată în Git. Variabilele de mediu se documentează cu nume și responsabil, fără valori.

### Formular de contact

Implicit, `mailto:` cu validare în browser (cost 0, nicio stocare). Livrarea reală se face printr-un Worker Cloudflare separat (`workers/contact-form`), numai după ce Dan aprobă: furnizorul de email (cost), nota de confidențialitate, controlul datelor și retenția. Fără acestea, formularul nu se declară „funcțional”.

### CMS

Implicit **Decap CMS** (cost 0) în `public/admin/`, autentificare prin Worker OAuth partajat (`workers/cms-oauth`). **Storyblok** sau alt CMS cu abonament: numai cu aprobarea lui Dan, per client. Dacă un client editează rar, modificările pot trece prin Dan (mai simplu și fără cost). Până la decizie, CMS-ul rămâne dezactivat și izolat: `collections: []`, `noindex`, fără OAuth activ. Pentru clienții care folosesc CMS-ul, se livrează un ghid non-tehnic pentru `/admin` (de scris, vezi §12).

## 8. QA

### Treapta 1 — la fiecare task (obligatorie)

`bash scripts/qa.sh` rulează: `git diff --check`, `prettier --check`, `eslint`, `astro check`, build de producție. Raportează doar eșecurile. `bash scripts/qa.sh fast` sare peste build.

### Treapta 2 — la milestone, înaintea lansării

Un singur raport ChatGPT (nu după fiecare task), scris în `07_QA.md` cu severități și dovezi. Se verifică:

- aprobări: copy, fapte, ierarhie, fidelitate față de design;
- responsive la 390, 768, 1024, 1280, 1440 px: text lizibil, punct focal, fără depășire orizontală, tranziția între layout-uri;
- tastatură, ordine de focus, text alternativ, contrast;
- linkuri interne și externe, formular, redirecturi;
- metadate, canonice, sitemap, robots, schema, `llms.txt`;
- imagini: fidelitate, drepturi, credite;
- performanță: riscuri CWV din graful real.

Ce nu s-a putut verifica (de exemplu, lipsa unui browser randat) se notează explicit, nu se prezintă ca acoperit.

### Treapta 2 automatizată (propusă, dezactivată)

Teste rulabile (Playwright pentru parcursuri și capturi, axe-core pentru accesibilitate, Lighthouse CI pentru performanță) ar înlocui o mare parte din verificarea vizuală făcută de agent. Sunt gratuite, dar sunt dependențe noi: **nu se instalează fără aprobarea lui Dan** (§2). Până atunci, treapta 2 rămâne manuală.

### Sablon de problemă QA

```
### QA-XXX — titlu scurt
- Status: DRAFT / REVIEW / IMPLEMENT / IMPLEMENTED / QA / DONE
- Severitate: P0 / P1 / P2
- Pagină și viewport:
- URL sau commit verificat:
- Observat:
- Pași de reproducere:
- Rezultat așteptat:
- Acțiune cerută:
- De păstrat:
- Commit de fix:
- Verificări făcute:
- Reverificare (rezultat / dată):
```

## 9. Lansare (release)

1. **Identitate:** înlocuiește tot ce e moștenit din starter (domeniu canonic, nume de proiect de deploy, referințe repo/OAuth, date de organizație de probă, metadate placeholder).
2. **Indexare fail-closed:** build-urile locale, de preview și de staging rămân `noindex`. Numai un build de producție configurat deliberat (`PUBLIC_ALLOW_INDEXING=true`, `PUBLIC_SITE_URL` setat) deschide indexarea.
3. **Matrice de rute:** rutele publice complete intră în sitemap; indexurile editoriale neterminate, utilitarele, `/admin`, API-urile, 404 și conținutul neaprobat rămân excluse.
4. **Audit per rută indexabilă:** un H1, titlu și descriere unice, canonic, imagine de share, schema adevărată, linkuri funcționale, imagini cu dimensiuni și alt.
5. **Izolează integrările nerezolvate:** un CMS, endpoint de formular, script de analytics sau worker OAuth moștenit nu rămâne executabil doar pentru că e ascuns din interfață.
6. **Două build-uri:** cel implicit (fail-closed) și un release-candidate explicit; se compară robots, sitemap, canonice, acoperirea `noindex`.
7. **Verificări:** build, tipuri/lint, formatare, linkuri, titluri, metadate, asset-uri, date structurate. Dimensiunea pachetului de deploy se verifică față de hostul ales.
8. **Preview la client:** link trimis, cu mențiunea „de vizualizat pe desktop; responsive complet în site-ul final”, dacă prototipul vine din Claude Design.
9. **Deploy:** `npm run deploy` (Cloudflare Workers Static Assets). Domeniul propriu se leagă din Cloudflare DNS. Rollback: redeploy al commit-ului anterior.
10. **După lansare:** test final pe URL-ul live, verificare `robots.txt`, `sitemap.xml`, un test de formular, adăugare în baza MRR (tier, abonament, dată de facturare), activare mentenanță.
11. **Separă pregătirea de lansare:** `IMPLEMENTED` nu e `DONE`. DNS, hosting, deploy, activarea indexării, analytics și consimțământ, CMS și livrarea reală a formularului cer fiecare decizie proprie a lui Dan.

**Pre-lansare, ordinea contează.** Nu se sare la deploy înainte de pașii 1–7.

## 10. Notion (mirror, nu sursă)

Claude actualizează Notion numai din starea GitHub, la patru momente (G1–G4), plus când se schimbă un blocaj material. Nu după fiecare PR.

1. Citește fișierele sursă din GitHub și ultimul commit îmbinat, nu conversația.
2. Actualizează: Current Status, Roadmap & Tasks, Decisions Index, Pull Requests, Content & Assets Tracker, Open Questions / Blockers.
3. Blocajele se marchează `Resolved` numai când decizia din GitHub sau dovada de asset le închide.
4. Se notează data sincronizării, ramura/commit-ul sursă.
5. Lecțiile reutilizabile merg în Methodology Registry; detaliile de client rămân în dashboard, cu link înapoi la GitHub.
6. Un rând Notion nu schimbă niciodată statusul unui task din GitHub.
7. Raport după sincronizare: paginile și rândurile schimbate, statusurile vechi și noi, commit-ul folosit, blocajele rămase.

La Essentials, Notion are o singură pagină „Status”.

## 11. Eficiență pentru ChatGPT și Claude

1. **Un thread nou per fază** în ChatGPT; nu se continuă un thread lung.
2. **ChatGPT scrie în fișiere, nu în chat.** Cercetarea, copy-ul și specificațiile ajung ca fișiere mici în repo, cu titlu și versiune.
3. **Copy pe pagină.** Task-ul numește fișierul; nimeni nu deschide restul.
4. **Context pack sub 250 de linii:** handoff, locks, task, deciziile permanente.
5. **QA la milestone**, nu după fiecare task.
6. **Un loc pentru fiecare regulă.** Rolurile și procesul sunt aici; `CLAUDE.md` și Notion trimit aici.
7. **Un model mare pentru muncă mare.** Pentru sarcini de rutină (reparări mici, formatări) se folosește varianta mai mică/ieftină, dacă planul o permite, și se măsoară.
8. **Măsurare:** consumul de credite Codex se notează înainte și după fiecare trei task-uri și pe fiecare proiect client nou (ce costă de fapt un site).
9. **Rapoarte scurte,** fără capturi sau ieșiri complete de comenzi; doar eșecurile.

### Prompt de pornire pentru ChatGPT (copiat la început de thread)

```
Lucrezi la proiectul <nume>. Citește în ordine, din repo: CLAUDE.md, CC_WEBDEV.md (secțiunile numite în task), project/AI_HANDOFF.md, project/TASK_LOCKS.md.
Rolul tău: cercetare, strategie, copy, specificații, QA la milestone. Nu implementezi decât un task atribuit de Dan.
Scrie rezultatele ca fișiere în repo, nu în chat. Nu adăuga costuri. Dacă ceva e neclar: AMBIGUITY, nu ghici.
Începe numai după ce Dan îți spune ce task/fază.
```

### Prompt de pornire pentru Claude Code

```
Citește CLAUDE.md, apoi project/AI_HANDOFF.md, project/TASK_LOCKS.md și fișierul taskului. Claim-uiește taskul în TASK_LOCKS, lucrează pe ramura claude/TASK-xxx, rulează bash scripts/qa.sh, fă push, raportează sub 12 linii.
```

## 12. Bootstrap pentru un proiect client nou

1. Creează repo-ul clientului din `you-on-the-com` (privat). Nu transforma niciodată master-ul într-un proiect de client.
2. Alege tier-ul (§5) și păstrează doar fișierele lui; șterge conținutul demo (firma fictivă demo) și datele din `site.config.ts`.
3. Completează `00_PROJECT.md` (brief) și înregistrează decizia de tier în `06_DECISIONS.md` sau în handoff.
4. Setează în `astro.config.mjs` / `.env`: `PUBLIC_SITE_URL`; lasă `PUBLIC_ALLOW_INDEXING` nesetat până la G4.
5. Înlocuiește identitatea moștenită (nume proiect în `wrangler.jsonc`, `config.yml` din CMS, date de organizație).
6. Creează pagina Notion „Status” (și restul dashboardului, după tier).
7. Rulează `bash scripts/qa.sh` pe starea inițială, ca să știi că pornești curat.
8. Începe faza 1.

**Nu se copiază** din alt proiect: nume, copy, culori, fotografii, domenii, afirmații.

## 13. Lecții consolidate (din MarketChemica și Conceptiones)

- Un prototip Claude Design se verifică în starea web, nu în starea de print, înainte de export; handoff-ul corect este „Hand off to Claude Code”, nu HTML static descărcat.
- Prototipurile Claude Design nu au breakpoint-uri: responsive vine la construcție.
- Conectorul Cloudflare din chat nu face deploy; deploy-ul se face din Claude Code cu `wrangler`.
- Orice prompt către Claude Code cere push în GitHub; altfel lucrul nu se vede din alte sesiuni.
- Roster, biografii, cifre, drepturi: se publică doar ce e confirmat ferm; ce lipsește se marchează „de confirmat”.
- Un preview multi-pagină nu arată „Lorem Ipsum”: copy aproape final, în vocea clientului, cu secțiuni marcate de confirmat.
- Un blocaj de poze nu e „lipsă” până nu s-au căutat toate locațiile, inclusiv volume externe montate.
- Un nume de fișier nu e dovadă suficientă pentru potrivirea unei imagini: se verifică vizual.
- Un document monolit (copy de peste 2.000 de linii) costă la fiecare sesiune: împarte-l pe pagină.
- O corectare punctuală aprobată de Dan se înregistrează ca decizie, nu rămâne doar în conversație.

## 14. Întrebări deschise

- Rundele de revizuire incluse în ofertă (de exemplu 2) și tariful pentru cele suplimentare: decizie comercială a lui Dan.
- Aprobarea uneltelor de test gratuite (Playwright, axe-core, Lighthouse CI) ca dependențe de dezvoltare.
- Furnizorul de email pentru formular (cost, termeni, protecția datelor) și varianta de cutie poștală de domeniu pentru clienți.
- Analytics implicit dezactivat; ce variantă fără cookie-uri se preferă când un client o cere.
- Ghidul non-tehnic pentru `/admin` (încă nescris).
