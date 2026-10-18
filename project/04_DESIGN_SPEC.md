# Design Specification — MONO Creative Studio

- Version: 0.2, REVIEW — brief G3 pentru Claude Design; 2026-10-18, CODEX, rafinare a draftului v0.1 de Claude.
- Vladimir Andrei deține MONO; Dan Andrei conduce direcția creativă și aprobă G3 după prototip. Propunerile de mai jos nu sunt direcție finală.
- Buget nou: 0 EUR. Surse: G1, D-001–D-013, analiza de referințe și logo-sheet examinat vizual. Fără preluări din alte proiecte (§12) sau competitori în copy public (D-005).

## Direction

Păstrăm ideea v0.1: pagina este passe-partout-ul lucrării. Minimal, monocrom: gri închis, alb, griuri, roșu discret. **Shop** cald prin imagini mari, selecție și ritm aerisit; **Print Lab** precis prin detalii reale, legende și tabele. Aceleași fonturi/componente/paletă; fără crem pentru Shop. Fotografiile își păstrează culorile naturale.

Corectăm serifele din v0.1: titluri sans geometrice, rotunde, curate, potrivite vizual simbolurilor și inscripției ușoare MONO. **Fontul exact al logo-ului se confirmă cu Vladimir.** Păstrăm alinierea precisă și mișcarea discretă; fără carusele, countdown sau afirmații neconfirmate.

## Layout rules și componente canonice

Grilă: max. 1280 px, text 55–70 caractere/rând; gutters 24/48 px mobil/desktop, secțiuni 64/96 px. Înălțimea urmează conținutul. Mobil: o coloană, text înaintea detaliilor, fără overflow la 320 px.

**Header/footer canonice** pe toate paginile. Header alb: logo, Shop, Print Lab, Despre/About, Contact, Journal dacă există; CTA „Cere o ofertă / Request a quote”, limbă. Fără coș în Coming soon. Mobil: logo, RO/EN vizibil, „Meniu/Menu” cu navigare/CTA, focus controlat, Escape. Footer alb: logo, destinații și pagini juridice disponibile, contact confirmat, proprietar Vladimir Andrei; date fiscale [to confirm].

**Logo din sheet:** pe alb, orizontala plină integral gri (rândul doi); pe închis, orizontala inversată albă (mijloc-dreapta). Mobil: același lockup, proporțional, circa 144 px, lizibilitate de verificat; fără monograma verticală/contururi implicit. Link Home localizat, nume accesibil „MONO Creative Studio”. Clearspace propus: jumătate din diametrul O. Fără redesenare/recolorare raster; vectori, dimensiuni și clearspace [to confirm] cu Vladimir.

## Tokens — propunere pentru prototip

Hex-uri eșantionate din raster, conform brand README: **[to confirm vector/Pantone]**, nu valori finale. Fără nuanțe inventate pentru corectarea contrastului.

| Token         | Valoare de lucru și utilizare                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| ink / surface | `#404041` text, butoane, contururi / `#FFFFFF` fundal și text inversat                                          |
| grey          | `#939597` decor/separatoare; nu text obișnuit, placeholder de formular sau etichetă esențială                   |
| accent        | `#D93832` detaliu rar; fără opacitate redusă pe text                                                            |
| type          | H1 40/44 mobil, 64/68 desktop; H2 28/34, 40/46; body 16/26 mobil, 18/28 desktop; UI și legende minimum 16/24 px |
| weights       | titluri 400–500, body 400, navigare/CTA 500–600; fără greutăți ultraușoare la text mic                          |
| spacing       | 4, 8, 16, 24, 32, 48, 64, 96 px; controale minimum 44×44 px; fotografii și butoane cu rază 0                    |

**Două familii G3**, fiecare folosită singură:

- **Manrope**: titluri 400–500, body/UI 400/600. Rotundă și curată, apropiată vizual de inscripția MONO; propunere de pornire și pentru tabele Lab.
- **Outfit**: titluri 400, body/UI 400/500. Geometrie circulară apropiată de O-urile simbolului; Dan compară lizibilitatea cu Manrope.

Ambele: SIL OFL 1.1, self-hosted, fără cereri Google Fonts, licența păstrată la distribuție. Verificate 2026-10-18 în sursele oficiale: [Manrope — metadata](https://github.com/google/fonts/blob/main/ofl/manrope/METADATA.pb), [OFL](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt); [Outfit — metadata](https://github.com/google/fonts/blob/main/ofl/outfit/METADATA.pb), [OFL](https://github.com/google/fonts/blob/main/ofl/outfit/OFL.txt). Fișierele TTF oficiale au fost verificate prin cmap pentru **ĂăÂâÎîȘșȚț**. Prototipul testează „Mărime, hârtie, înrămare, ediție” și EN; exportul WOFF2/subset-ul viitor trebuie să păstreze aceste caractere, inclusiv ș/ț cu virgulă.

**Contrast calculat sRGB**, culori opace: ink/alb **10,36:1**, roșu/alb **4,60:1**, gri/alb **3,01:1**, gri/ink **3,45:1**, roșu/ink **2,25:1**. Conform [WCAG 2.2 AA](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), text normal ≥4,5:1, text mare ≥3:1 (24 px regular sau aproximativ 18,67 px bold). Roșu/alb trece la limită: nu se aplică transparență; se reverifică după vector. Griul nu trece pentru text normal pe niciun fond propus; roșu pe ink nu trece nici pentru text mare. Inversarea perechii păstrează raportul.

**Regula roșului:** un singur accent focal per secțiune, de exemplu o linie scurtă lângă titlu sau indicatorul paginii active, însoțit de subliniere și text ink. Dacă Dan alege logo-ul cu O roșu, acesta consumă accentul header-ului. Fără suprafețe mari roșii, CTA roșii repetate, text lung, tabele roșii sau filtre aplicate imaginilor. CTA principale ink/alb; linkuri subliniate. Focus vizibil ink pe alb/alb pe ink, fără a depinde de roșu; erorile au text și simbol, nu numai culoare.

## Imagery and provenance / photo treatment

§7: dovadă reală MONO; lucrare/produs autorizat; generare editorială numai generală, aprobată de Dan; concept etichetat; placeholder exclus din producție. Fiecare asset: master, autor/drepturi/credit, rol, crop/punct focal, alt RO/EN, aprobare. Master separat; repetarea fotografiei cere acordul lui Dan.

Shop: lucrare integrală, proporție reală; mockup etichetat. Lab: fotografii reale, materiale confirmate. Fără stock/generare ca dovadă MONO, rotunjiri, filtre sau recolorare. Crop tehnic numai aprobat. AVIF/WebP, dimensiuni explicite, fără upscaling; fidelitate prioritară. Fără text pe fotografie cu contrast variabil.

## Representative pages pentru G3

1. **Home:** păstrăm succesiunea G1: hero cu două căi → carduri Shop/Print Lab → fapte confirmate → lucrări numai când există → audiențe profesionale → samples numai dacă sunt gata → contact. Shop indică vizibil „În curând / Coming soon”; linkul duce la pagina de informare. Nicio promisiune de cumpărare imediată. Textul final rămâne la G2.
2. **Print Lab hub:** introducere scurtă + fotografie reală disponibilă → artiști/designeri/B2B → materiale confirmate în tabel → proces numai după confirmare → CTA ofertă. În prototip, lipsurile sunt adnotări interne [to confirm], nu beneficii fabricate. Formularul arată label, focus și eroare; fără promisiune de livrare email până la aprobare.
3. **Shop — Coming soon (D-006):** titlu, mesaj scurt bilingv și spațiu generos, eventual o singură lucrare autorizată cu credit; fără ea, compoziție tipografică. Contact și Print Lab ca destinații utile. Fără produse fictive, prețuri, scarcity, coș, checkout, newsletter sau dată de lansare inventată. PDP și certificatele din v0.1 rămân pentru după activarea Shopify de Dan.

## RO/EN, accesibilitate și predare

Comutator text **RO / EN** în header pe desktop și mobil, fără steaguri. Limba activă: greutate 600 + subliniere ink, nu doar culoare; etichete accesibile „Română/English”. Păstrează pagina echivalentă pe `/ro/` și `/en/`; acoperire egală (D-011). D-013: România → RO, restul → EN; alegerea explicită prevalează. Propun detectare de țară la [edge Cloudflare](https://developers.cloudflare.com/workers/runtime-apis/request/) numai la intrarea `/`, metodă de validat cu Dan la implementare; limba browserului nu dovedește țara. Țară necunoscută: EN propus. Rutele explicite nu se redirecționează după geolocație; crawlerele au acces la ambele, cu hreflang, fără redirect forțat. Preview rămâne noindex (D-012).

Prototipul livrează cele trei pagini desktop/mobil în RO/EN, variantele tipografice pe aceeași compoziție și stări meniu/focus/eroare. Verifică tastatura, zoom 200%, reflow, texte RO mai lungi și reduced-motion; fără autoplay. Dan aprobă G3 după comparație, nu prin acest brief.

## Open Questions

1. Dan: Manrope sau Outfit, ritmul Shop și gradul de densitate Lab? Ce compoziție aprobăm la G3?
2. Dan/Vladimir: lockup monocrom sau O roșu în header, dimensiuni minime, clearspace și vectori/Pantone [to confirm]?
3. Dan: aprobi detectarea edge propusă și fallback EN la țară necunoscută? Detaliile tehnice rămân pentru implementare.
4. Vladimir prin Dan: ce fotografii, lucrări și drepturi sunt disponibile? Ce conținut Lab/samples este confirmat pentru prototip și G2?
