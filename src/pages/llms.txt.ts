import type { APIRoute } from "astro";
import { getT, href, meta, type Lang, type Page } from "../i18n";

// Built only from the approved site copy in src/i18n (D-002, D-020): no new
// facts are introduced here, so this file stays in sync with the pages.
const pages: Page[] = ["home", "lab", "shop", "about", "contact"];

export const GET: APIRoute = ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const en = getT("en");

  const pageLines = (lang: Lang) =>
    pages.map(
      (page) =>
        `- [${meta[lang][page].title}](${abs(href(lang, page))}): ${meta[lang][page].description}`,
    );

  const lines = [
    "# MONO Creative Studio",
    "",
    `> ${en.abP} ${en.sub}`,
    "",
    en.owner,
    "",
    "The site is bilingual: English under `/en/`, Romanian under `/ro/`. Each page links to its counterpart via `hreflang`.",
    "",
    "## Print Lab (English)",
    "",
    `- Printer: ${en.fPrinterV}`,
    `- Inks: ${en.fInkV}`,
    `- Sizes: ${en.fSizeV}`,
    `- Surfaces: ${en.fMediaV}`,
    `- Colour control: ${en.fColourV}`,
    `- Framing: ${en.fFrameV}`,
    "",
    "## Pages (English)",
    "",
    ...pageLines("en"),
    "",
    "## Pagini (Romana)",
    "",
    ...pageLines("ro"),
    "",
    "## Shop",
    "",
    en.soonP,
    "",
    "## Contact",
    "",
    `- Email: ${en.coMailV}`,
    `- Reply time: ${en.coReplyV}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
