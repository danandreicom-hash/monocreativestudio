# Shop model — MONO Creative Studio

- Version: 0.1; Status: REVIEW; TASK-004, CODEX, 2026-10-18.
- Dan Andrei aprobă; Vladimir Andrei confirmă oferta și operațiunile.
- Propunere de model, nu inventar real. Orice valoare comercială lipsă rămâne [to confirm]; nu se publică placeholder-uri ca ofertă.

## Produs, variante și date obligatorii

Un produs reprezintă o lucrare și un pool de ediție cu termeni unici. Recomand ediție distinctă per combinație lucrare + dimensiune + hârtie; înrămarea este o variantă a aceluiași pool, fără a multiplica tirajul. Pentru altă dimensiune/hârtie se creează produs separat, asociat aceleiași lucrări prin work_id. Acesta este model propus, nu o afirmație despre edițiile artiștilor. Dacă artistul cere tiraj comun între formate, modelul se reanalizează înainte de publicare; nu se vinde pe un pool agregat improvizat.

| Nivel                | Câmpuri / reguli propuse                                                                                                                                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lucrare              | work_id stabil, titlu RO/EN, artist, an [to confirm], descrieri RO/EN, credite, drepturi de reproducere și vânzare confirmate în scris                                                                                                                        |
| Produs / pool        | product ID, handle stabil comun RO/EN, edition_id unic, tip open/limited [to confirm], tiraj total [to confirm], AP/PP și relația cu tirajul [to confirm], materiale și dimensiuni imagine/foaie confirmate, termeni ediție, imagini cu drepturi și alt RO/EN |
| Variantă             | variant ID, SKU unic și stabil, dimensiune/hârtie/ramă confirmate, preț și monedă aprobate, greutate/date transport, inventar urmărit, livrare fizică, politică fiscală validată                                                                              |
| Publicare            | ambele limbi aprobate, preț real, imagini permise, descriere material fără afirmații neconfirmate, lead time, transport, retururi și entitate legală aprobate                                                                                                 |
| Privat / operațional | contract artist, costuri, registru ediții/certificate, order ID, date client în Shopify; fără expunere prin metafields publice                                                                                                                                |

Metafields tipizate propuse pentru work_id, edition_id, edition_type, edition_size și informațiile publice despre certificat; expunere Storefront numai pentru câmpurile necesare. Tirajul aprobat se blochează operațional după prima vânzare; nu se mărește pentru a evita epuizarea. Corecțiile cer acordul artistului, Dan și comunicare către clienții afectați. Open edition nu afișează numitor, „limited”, sold-out de ediție sau număr inventat. Produsele fără model confirmat nu sunt cumpărabile.

### Opțiuni Shopify și limite

Shopify permite **maximum trei opțiuni și 2.048 variante per produs**, verificate în [documentația oficială Shopify](https://help.shopify.com/en/manual/products/variants/add-variants), 2026-10-18. Cele trei axe posibile sunt Dimensiune/Size, Hârtie/Paper și Înrămare/Framing. Nu presupunem că laboratorul oferă vreuna dintre valorile posibile. În modelul recomandat, dimensiunea și hârtia sunt fixe per pool; numai înrămarea confirmată variază. Se pot folosi mai puțin de trei opțiuni; nu se generează combinații care nu există.

Exemplu strict de calcul, nu ofertă MONO: 3 dimensiuni × 2 hârtii × 2 finisări = 12 variante într-un model comun. Acest calcul nu rezolvă stocul partajat. Nu folosim numărul certificatului drept a patra opțiune, variantă sau input al cumpărătorului; nu folosim proprietăți de linie pentru suprataxe neverificate. Dacă oferta depășește limita, se simplifică/separă în produse înainte de lansare, fără app plătit implicit.

## Tiraj, inventar și prevenirea supravânzării

Shopify urmărește stocul pe variantă, nu un tiraj comun arbitrar între variante. Recomand alocare explicită și fixă pe variante de înrămare pentru fiecare pool în faza 1. Suma unităților alocate nu depășește soldul ediției. Opțiunea de vânzare după epuizare este dezactivată pentru edițiile limitate în toate canalele; un singur loc de inventar pentru pool la lansare. Nu setăm tirajul întreg pe fiecare ramă.

Registrul privat consemnează totalul aprobat, numerele deja emise/vândute anterior pe orice canal, AP/PP, pierderi, rezervări offline și unitățile disponibile. Soldul inițial Shopify se reconciliază cu registrul, nu se egalează automat cu tirajul. Operatorul [to confirm] verifică și semnează reconcilierea înainte de publicare și înainte de expediere. Comenzile externe consumă din aceeași alocare înainte de confirmarea vânzării externe. Pentru mutarea unităților între rame, se reduce întâi stocul variantei sursă, apoi se crește destinația, cu jurnal de modificare; niciodată invers.

Counter public recomandat: „Ediție limitată la [N], pentru [format/hârtie]” numai după confirmare. Nu afișăm „vândute X/N” din scăderea inventarului: rezervările, pierderile, vânzările externe și variantele îl fac nesigur. Disponibilitatea live este pe varianta selectată; „stoc disponibil pentru comandă” nu înseamnă print deja produs. Dacă se cere ulterior counter exact de pool, acesta necesită alt task și sincronizare validată; în faza 1 registrul manual nu devine contor live.

## Număr de ediție și certificat

Propun certificat fizic în faza 1, cu registru privat manual și fără NFC sau verificare publică QR; existența certificatului, costul fizic, semnătura și acceptul artistului sunt [to confirm]. Nu se promite certificat până la aprobare. NFC și serviciile externe rămân pentru o decizie ulterioară. Un QR simplu ar fi numai un link, nu dovadă împotriva copierii; nu propunem autentificare digitală neverificată.

Flux propus:

1. După plata confirmată în Shopify, operatorul alocă în registru următorul număr liber al pool-ului; o linie cu cantitatea q primește q înregistrări. Rezervarea în coș nu primește număr. Un singur operator de registru evită alocările simultane.
2. Cheie unică: edition_id + număr. Format lizibil propus `MONO-{edition_id}-{număr}/{tiraj}`; certificat cu serial unic separat, de exemplu `MONO-CERT-{serial}`. Exemplele nu sunt certificate emise. Shopify order number nu înlocuiește numărul de ediție.
3. Registrul păstrează edition_id, SKU/variant ID, order/line ID, număr, serial certificat, stare (alocat/produs/expediat/returnat/anulat/distrus), date, responsabil, semnatar și jurnalul corecțiilor. Datele personale rămân în Shopify, legate prin ID; acces restrâns și retenție [to confirm]. Registrul are backup și control al versiunilor într-un spațiu privat aprobat, în afara Git-ului public/editorial.
4. Certificatul identifică artistul, lucrarea, materialul și dimensiunea confirmate, numărul/tirajul, data, emitentul și semnătura acceptată. Versiunea RO/EN respectă D-009. Operatorul compară printul, certificatul și comanda înainte de ambalare, apoi marchează fulfillment manual în Shopify.
5. Anulare înainte de producție: numărul rămâne trasabil în jurnal; eliberarea cere verificare că nu există exemplar/certificat emis. Refund-ul nu reface automat stocul. Returul unui exemplar revandabil păstrează același număr. Reprint-ul pentru deteriorare păstrează numărul numai după documentarea retragerii/distrugerii originalului; nu coexistă două exemplare valide cu același număr. Înlocuirea certificatului invalidează serialul anterior în registru. Regulile finale necesită acordul artistului.

AP/PP, exemplare de arhivă și probe nu se amestecă în numărătoarea comercială. Tirajele și seriile lor sunt [to confirm] înainte de vânzarea unei ediții limitate.

## Made-to-order: producție, transport și retururi

Printurile se produc la comandă numai dacă Vladimir confirmă această ofertă. Nu sunt înregistrate ca fulfillment automat și nu afișăm termene inventate. Înainte de checkout, PDP RO/EN prezintă separat timpul de producție [to confirm] și timpul estimat de tranzit [to confirm], zonele eligibile, costurile/taxele aplicabile și politica de retur aprobată. Costul final de transport se calculează în Shopify înainte de plată; „gratuit” și livrare mondială nu sunt presupuse.

Flux manual: plată/comandă verificată → alocare ediție → producție și control → certificat → ambalare → curier/tracking → fulfillment Shopify și notificare în limba comenzii. Operatorul confirmă greutăți, ambalare, curier, tarife, adresă de retur, expediere parțială și tratamentul comenzilor mixte [to confirm]. Zonele fără tarif/configurație validată nu permit comandă; la întârziere clientul primește termen revizuit și opțiuni conforme politicii aprobate.

**Made-to-order nu înseamnă automat „fără retur”.** Pentru consumatorii UE, regula generală include retragerea în 14 zile; excepția pentru bunuri realizate după specificații sau clar personalizate se interpretează strict. Alegerea dintre variante standard nu se califică automat. Aceasta este o constrângere de redactare, nu încadrarea juridică finală a produselor MONO: [Your Europe](https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/ecommerce-distance-selling/index_en.htm), [ghidul Comisiei Europene privind opțiunile standard](https://commission.europa.eu/system/files/2019-07/crd_guidance_en_0_updated_0.pdf), verificate 2026-10-18.

Înainte de lansare, revizie juridică pentru politica RO/EN: eligibilitate și procedură de retragere/anulare, informarea precontractuală și formularul/procedura online aplicabilă la data lansării, costul returului, rambursarea, deteriorări/neconformitate și eventualele excepții individual justificate. Drepturile pentru neconformitate nu dispar prin personalizare; [sursa UE pentru garanții](https://europa.eu/youreurope/business/selling-in-eu/consumer-contracts-guarantees/consumer-guarantees/index_en.htm). Contabilul confirmă stornările și reconcilierea refund-urilor. Politica se aplică identic în site, checkout și comunicarea comenzii. Nicio clauză „toate printurile nu se returnează” fără validare.

La retur/chargeback, operatorul separă refund-ul financiar de decizia de restock și starea certificatului. Nu se reactivează automat inventarul unei ediții doar fiindcă Shopify permite restock la refund.

## Open Questions

1. Vladimir/artiști: ce lucrări, drepturi, prețuri, dimensiuni, hârtii și rame există efectiv [to confirm]?
2. Sunt ediții limitate, open sau ambele? Tiraj pe format/hârtie, vânzări anterioare, AP/PP și serii de arhivă [to confirm]. Dan aprobă modelul propus înainte de configurare.
3. Certificat fizic în faza 1: emitent, semnatar, conținut, numerotare, cost, reguli de reprint și înlocuire [to confirm]. NFC/QR nu sunt aprobate.
4. Cine operează registrul, unde este păstrat, cine îl verifică și ce retenție are [to confirm]?
5. Entitate fiscală, TVA, monedă și facturare — contabil; zone/curier/ambalare, tarife și termene — Vladimir; retururi — revizie juridică și Dan [to confirm].
6. Dan: deciziile D-006/D-007, deținător cont și operator, default de limbă și responsabil de deploy — vezi `05_DEV_SPEC.md`.
