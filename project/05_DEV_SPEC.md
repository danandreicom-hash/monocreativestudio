# Development Specification

- Version: 1.2; Status: REVIEW — propunere TASK-004, 2026-10-18.
- Specification owner: CODEX; implementation owner: Claude Code; approval: Dan Andrei.
- Scope: arhitectura Shop. Restul specificației site-ului rămâne de completat prin task-uri dedicate.
- Baseline: D-001–D-010; D-006 și D-007 sunt REVIEW. Documentul nu autorizează cod, conturi, achiziții sau lansare.

## Recomandare și granițe

Recomand un Shopify MONO separat de Arthalle, plan Basic numai după aprobarea costului, Astro 100% static pe Cloudflare Workers Static Assets, date Shopify la build, verificări comerciale în browser și checkout găzduit de Shopify. Modelul produselor, edițiilor și operațiunilor este în `shop-model.md`. Nu propun SSR, automatizarea producției, marketplace sau conturi custom.

| Opțiune                          | Avantaje                                                                                                             | Dezavantaje și implicații                                                                                                                                                                |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Separat — recomandat**         | Catalog, comenzi, acces, politici, plăți și identitate MONO administrate distinct; risc redus de amestec cu Arthalle | Abonament separat; configurare și reconciliere separate; nu creează automat o persoană juridică distinctă                                                                                |
| Comun cu Arthalle — nerecomandat | Administrare centrală; posibil fără un al doilea abonament dacă planul și configurația existente permit              | Checkout, vânzător, plăți, clienți și politici comune pot contrazice separarea brandurilor; colecțiile/tagurile nu sunt separare fiscală; starea și costurile Arthalle sunt [to confirm] |

Nu presupun că Arthalle are un anumit plan, backend sau entitate. Dacă vânzătorii sunt entități diferite, un backend comun nu trebuie tratat ca soluție de încasare/facturare separată fără validare profesională. Nici două magazine ale aceleiași entități nu separă obligațiile fiscale ale acelei entități.

**De confirmat de contabil înainte de configurare:** entitatea contractantă MONO, CUI/date facturare, TVA și cote aplicabile lucrărilor, monedă contabilă și de vânzare, cont de încasare, facturare/e-Factura aplicabilă, vânzări UE/OSS și export, comisioane, retururi/stornări și remunerația artiștilor. Fluxurile și eventualele transferuri între MONO și Arthalle necesită documentare contractuală. Acestea sunt întrebări, nu concluzii fiscale. Vladimir furnizează datele; Dan aprobă configurația.

## Catalog: build static și actualizări

Shopify este sursa pentru produse, variante, prețuri, taxe, inventar și comenzi; Decap nu duplică aceste date. Git păstrează specificația și interfața editorială. Folosim pagini Shop și PDP generate la build pentru HTML accesibil, SEO și funcționarea descrierii fără JavaScript. Un catalog integral client-side ar arăta mai repede produsele noi, dar introduce dependență API/JS și nu creează automat rute statice noi; nu îl recomand pentru faza 1.

Flux propus după aprobare: operatorul nominalizat de Vladimir completează produsul în draft → Dan aprobă conținutul sursă și traducerea → operatorul publică în canalul Headless → responsabilul de deploy [to confirm] rulează build/deploy → verifică ambele rute și coșul. **Produsul nou nu apare pe site până la deploy reușit.** Actualizările de text, imagini, traduceri și handle cer rebuild. Nu introducem webhook, serviciu de sincronizare sau promisiune de publicare instantanee. Ștergerea/ascunderea produselor cere și ea rebuild; până atunci verificarea live oprește cumpărarea.

Build-ul paginează produsele și variantele, cere explicit RO și EN și validează câmpurile de publicare din shop-model. Dacă Shopify sau validarea eșuează, build-ul eșuează; ultimul deploy rămâne disponibil, fără a publica un catalog gol. Rollback-ul revine la ultimul artefact valid, dar nu restaurează inventarul/comenzile Shopify. Retragerea urgentă se face întâi în Shopify, apoi rebuild; prețul și disponibilitatea din snapshot nu sunt autoritate pentru comandă.

În browser se reverifică varianta, prețul și moneda înainte de Add to cart, apoi se citesc liniile și totalurile returnate de Shopify. Preț schimbat: afișare și reconfirmare înainte de continuare. Variantă epuizată/retrasă: blocare și mesaj în limba paginii. Eroare API/offline: descrierea rămâne vizibilă, cumpărarea se oprește cu retry; nu se simulează succesul. Nu folosim schema Product cu preț/stock dinamic neverificat; datele structurate comerciale cer o soluție validată ulterior.

## Coș și checkout

Rutele de coș aparțin Astro, Shopify deține starea comercială. Cart API primește ID-ul variantei și cantitatea; selecția de opțiuni nu modifică prețul local. Modificările rapide se serializează, butonul nu permite dublarea accidentală, iar erorile Shopify sunt afișate accesibil. Persistăm numai referința coșului în browser, fără date personale sau date de card; nu în loguri ori analytics. Coș expirat: recreare cu variantele încă valide și informare despre schimbări.

Checkout pleacă exclusiv la `checkoutUrl` întors de Shopify pentru coșul curent, fără URL construit manual. Shopify verifică preț, stoc, adresă, taxă și transport. Coșul nu rezervă o ediție și pagina de revenire nu dovedește plata. Operatorul verifică plata/comanda în Shopify înainte de alocare și producție. Confirmările și fulfillment-ul rămân manuale; nu sunt promisiuni de producție automată.

## RO și EN la lansare — D-009

Propun `/ro/shop`, `/en/shop`, `/ro/shop/[product]`, `/en/shop/[product]`, `/ro/cart`, `/en/cart`, aceleași prefixe pentru rutele aprobate ale site-ului și paginile juridice. Handle comun stabil per produs; titlu, descriere, opțiuni, alt text, mesaje și politici traduse. Un singur produs și inventar comun celor două limbi. Nu dublăm SKU-urile pentru traducere. Prefixele explicite extind schema propusă în sitemap; nu modifică destinațiile G1. Default-ul pentru `/` rămâne [to confirm] de Dan, fără redirect bazat pe IP.

Shopify publică ambele limbi; traducerile se introduc manual în Translate & Adapt după aprobarea sursei. API-ul citește conținutul cu context `RO`/`EN`. Metafields descriptive necesită verificarea disponibilității traducerii; dacă nu sunt translatabile, se păstrează câmpuri RO/EN explicite, nu fallback tăcut. Produs fără ambele versiuni aprobate nu intră în catalogul de lansare. Aceeași regulă pentru transport, retururi și certificate.

Coșul se creează cu `@inContext(language: RO/EN)` pentru checkout în limba aleasă. La schimbarea limbii cu coș existent, se recreează coșul în noul context din variante/cantități, se reverifică totalurile și se actualizează referința numai după succes; la eroare se păstrează coșul vechi și se anunță limba checkout-ului. Țara/adresa nu se deduc din limbă: EN nu implică transport internațional, RO nu impune o monedă. Piețele, moneda și țările acceptate sunt [to confirm]. Se testează politicile, mesajele checkout și notificările în ambele limbi.

Switcher-ul duce la echivalentul paginii. Canonical propriu și hreflang reciproc RO/EN; sitemap cu ambele limbi. Cart și stările de eroare/rezultat sunt noindex; întreg site-ul rămâne noindex până la G4. Header/footer canonice, navigare cu tastatura, anunțarea erorilor și focus pe eroare; dimensiuni rezervate imaginilor, fără salturi când se încarcă stocul.

## Acces și configurare ulterioară

Vladimir desemnează deținătorul contului și operatorul [to confirm]; Dan aprobă accesul și costurile, fără parole partajate. Compatibilitatea rolurilor necesare cu Basic se verifică înainte de contractare; nevoia de conturi suplimentare nu autorizează upgrade automat. Produsele se publică explicit în canalul Headless; numai câmpurile publice necesare se expun Storefront API. Registrul certificatelor și datele clienților rămân private.

Variabile propuse, fără valori: `PUBLIC_SHOPIFY_STORE_DOMAIN`, `PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` (token public, permisiuni minime), `SHOPIFY_API_VERSION` (versiune stabilă fixată și verificată la implementare). Token Admin/private niciodată în browser sau Git. Nu este necesar Admin API pentru acest flux manual. CSP va permite numai endpointurile comerciale și imaginile necesare; Claude verifică configurația reală într-un task IMPLEMENT ulterior, fără a presupune comportamentul boilerplate-ului.

## Costuri și propunere D-006 — REVIEW, pentru Dan

Prețuri citite live la **2026-10-18**, piața România, [Shopify Pricing RO](https://www.shopify.com/ro/pricing). Nu folosim trial-ul/promoția ca buget permanent. TVA pe abonament, eligibilitate Payments, categorii card și alte taxe se confirmă înainte de aprobare; nu convertim arbitrar în EUR.

| Ce                                                             | Preț verificat / buget                                                                                                                                                | Alternativa gratuită și ce se pierde                                                                                                                                                              |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Shopify Basic separat — recomandat cu facturare lunară inițial | 139 RON/lună; 1.668 RON/12 luni la tarif neschimbat. Alternativa anuală: 99 RON/lună, 1.188 RON/an, angajament anual                                                  | Catalog static și cerere prin contact/mailto la 0 cost software suplimentar; fără coș, plăți sau checkout Shopify. Nu satisface lansarea Shop D-003; numai fallback temporar cu aprobarea lui Dan |
| Plăți Basic                                                    | Card online standard: 1,9% + 1,25 RON/tranzacție; Amex/internațional: 3% + 1,25 RON; procesator extern: comision Shopify 2%, plus tariful procesatorului [to confirm] | Fără plată online și fără checkout activ; cerere manuală. Nu există promisiune de procesare comercială gratuită                                                                                   |
| Canal Headless                                                 | Gratuit, 0/lună, conform [listării Shopify](https://apps.shopify.com/headless); abonamentul magazinului rămâne necesar                                                | Catalog static manual fără integrare; se pierde sincronizarea comercială                                                                                                                          |
| Translate & Adapt                                              | Gratuit, 0/lună, conform [listării Shopify](https://apps.shopify.com/translate-and-adapt); traducere/revizie umană, fără serviciu plătit propus                       | Texte RO/EN întreținute manual în catalog static; fără checkout localizat funcțional până la integrare                                                                                            |
| Astro / Cloudflare Free / registru manual de ediții            | 0 cost software suplimentar în limitele aprobate de §2; muncă și producție neincluse                                                                                  | Același flux manual; fără app de ediții, automatizare sau NFC                                                                                                                                     |

Basic include un magazin headless în comparația oficială; nu presupunem un al doilea storefront gratuit în contul Arthalle. Nu propunem Grow/Advanced/Plus, aplicații plătite, domeniu nou sau serviciu de autentificare. Domeniul existent, transportul, materialele/certificatele fizice și contabilitatea au costuri [to confirm], neautorizate; nu sunt incluse în abonament. Dacă apare un furnizor nou, se prezintă separat prețul oficial și alternativa gratuită înainte de orice pas.

**Text propus D-006 (nu APPROVED):** „Dan aprobă explicit Shopify Basic separat pentru MONO, facturat lunar la tariful verificat de 139 RON/lună, plus taxele aplicabile și comisioanele de plată confirmate înainte de activare. Orice angajament anual, upgrade, aplicație sau alt cost cere aprobare distinctă. Alternativa fără cost software este catalog static + contact, fără checkout, și amână lansarea comercială D-003.” Dan poate respinge/modifica textul; acest document nu este aprobare.

## Propunere D-007 — REVIEW, pentru Dan

„Shop MONO separat de Arthalle. Astro rămâne 100% static; Shopify furnizează catalogul la build, iar Storefront Cart API și verificările comerciale rulează în browser; checkout găzduit Shopify. Adăugarea/modificarea unui produs cere rebuild/deploy manual în faza 1. RO și EN au rute prefixate și checkout în limba coșului. Edițiile folosesc stoc Shopify și registru privat manual conform shop-model; fără fulfillment automat.” Nicio modificare în Decision Log înainte de decizia lui Dan.

## Criterii pentru task-ul ulterior de implementare

Verificări necesare: produs nou absent înainte de deploy și prezent RO/EN după; build eșuat păstrează ultima versiune; API indisponibil blochează cumpărarea; preț schimbat, opțiune invalidă, coș expirat și două comenzi simultane pentru ultima unitate; fără supravânzare; schimbarea limbii păstrează variantele și checkout-ul corect; transportul blochează țările neacceptate; totaluri/taxe și refund validate; registrul nu dublează numerele. QA de accesibilitate pe mobil și tastatură și verificarea datelor publice/private completează testele. Nu există cod sau verificare Shopify reală în TASK-004.

## Open Questions

1. Dan: aprobă/modifică D-006, D-007 și prefixele propuse? Default RO sau EN pentru `/`?
2. Vladimir + contabil: entitate, TVA, facturare, monedă, Payments, încasare și jurisdicții [to confirm].
3. Vladimir: proprietarul contului, operatorul și responsabilul de deploy, existența/configurația Arthalle [to confirm].
4. Vladimir: zone, tarife, timpi de producție și transport, retururi; revizie juridică înainte de publicare [to confirm].
5. Vladimir + artiști: catalog, drepturi, prețuri, ediții și certificate din shop-model [to confirm].

## Surse tehnice oficiale

Verificate 2026-10-18: [Headless și tokenuri](https://shopify.dev/docs/storefronts/headless/overview), [configurare Storefront API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/getting-started), [limbi și locale pentru cart/checkout](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/markets/multiple-languages). Recomandările de workflow și arhitectură sunt propuneri MONO deduse din aceste capabilități, nu funcții livrate.
