/* ==========================================================================
   SITE SEARCH: what can be found, and how results are ranked
   --------------------------------------------------------------------------
   Everything searchable is gathered into one list (SEARCH_ITEMS) when the
   site loads: topics, pages, units, lessons and worksheets. It is all made
   from the data files you already have, so a new lesson or worksheet is
   searchable automatically.

   Each item has:
     type      "topic" | "page" | "unit" | "lesson" | "worksheet"
     title     the main text shown, and the most important text to match
     detail    the small grey text under the title (e.g. "Year 7 · Algebra")
     context   extra words that can match, e.g. a lesson's unit and year
     to        where it goes inside the site (e.g. "/lesson/y7-u1-l3"), or
     href      a file to open in a new tab (the worksheet PDFs)

   HOW MATCHING WORKS: the search is split into words, and every word must
   be found somewhere (in the title or the context). A word counts if it is
   the start of a word in the item, so typing "frac" finds "Fractions".
   Results whose title matches score highest, then the ones that only match
   the context. Ties go to topics, then pages, units, lessons, worksheets.
   ========================================================================== */
import { YEARS } from "./curriculum.js";
import { STRANDS, getStrand } from "./strands.js";
import { WORKSHEETS } from "./worksheets.js";
import { NAV_PAGES } from "./navigation.js";

// Words people use for the same thing. Searching for either finds both.
const SAME_AS = {
  bodmas: "bidmas", bidmas: "bodmas",
  pythagoras: "pythag", trig: "trigonometry", stats: "statistics",
  percent: "percentages", maths: "mathematics", sohcahtoa: "trigonometry",
};

/** Lower case, swap symbols for spaces, and split into words. */
export function words(text) {
  return String(text)
    .toLowerCase()
    .replace(/['’]/g, "")             // "Moll's" -> "molls"
    .replace(/[^a-z0-9]+/g, " ")      // anything else that isn't a letter or digit
    .trim()
    .split(" ")
    .filter(Boolean);
}

const TYPE_ORDER = { topic: 0, page: 1, unit: 2, lesson: 3, worksheet: 4 };
const yearName = (y) => `Year ${y} y${y}`;

function build() {
  const items = [];

  // The six topics
  for (const s of STRANDS) {
    const units = YEARS.flatMap((y) => y.units).filter((u) => u.strand === s.id);
    const years = units.map((u) => u.year);
    items.push({ type: "topic", title: s.name, detail: `Topic · ${units.length} units, Years ${Math.min(...years)} to ${Math.max(...years)}`,
                 context: `${s.short ?? ""} topic`, to: `/topic/${s.id}` });
  }

  // The pages in the menu, plus the home page
  for (const p of NAV_PAGES) {
    items.push({ type: "page", title: p.label, detail: p.hint || p.group || "Page", context: `${p.hint ?? ""} ${p.group ?? ""}`, to: p.to });
  }

  // Units and lessons
  for (const y of YEARS) {
    for (const u of y.units) {
      const strand = getStrand(u.strand);
      const unitNo = u.id.split("-u")[1];
      items.push({ type: "unit", title: u.title, detail: `Year ${y.year} · Unit ${unitNo} · ${strand.short ?? strand.name}`,
                   context: `${yearName(y.year)} unit ${strand.name}`, to: `/unit/${u.id}` });
      for (const l of u.lessons) {
        items.push({ type: "lesson", title: l.title, detail: `Year ${y.year} · ${u.title}`,
                     context: `${yearName(y.year)} ${u.title} lesson ${l.tier === "H" ? "higher" : ""}`, to: `/lesson/${l.id}` });
      }
    }
  }

  // Worksheets (open as PDFs in a new tab)
  for (const w of WORKSHEETS) {
    items.push({ type: "worksheet", title: w.title, detail: `Worksheet (PDF) · ${w.level}`,
                 context: `worksheet pdf ${w.topic} ${w.level}`, to: "/worksheets" });
  }

  // Work out each item's words once, now, so searching is fast
  return items.map((it) => ({ ...it, titleWords: words(it.title), contextWords: words(it.context) }));
}

export const SEARCH_ITEMS = build();

/** Search everything. Returns { total, results }: how many matched, and the
    best matches first (at most `limit` of them). */
export function search(query, limit = 40) {
  const qWords = words(query);
  if (qWords.length === 0) return { total: 0, results: [] };
  const phrase = qWords.join(" ");

  const scored = [];
  for (const item of SEARCH_ITEMS) {
    let score = 0;
    let everyWordFound = true;
    for (const q of qWords) {
      const alt = SAME_AS[q];
      const starts = (w) => w.startsWith(q) || (alt && w.startsWith(alt));
      if (item.titleWords.some(starts)) score += 3;            // in the title: best
      else if (item.contextWords.some(starts)) score += 1;     // only in the extra words
      else { everyWordFound = false; break; }
    }
    if (!everyWordFound) continue;
    const title = item.titleWords.join(" ");
    if (title === phrase) score += 6;                          // exact title
    else if (title.startsWith(phrase)) score += 3;             // title starts with the search
    scored.push({ item, score });
  }

  scored.sort((a, b) => b.score - a.score
    || TYPE_ORDER[a.item.type] - TYPE_ORDER[b.item.type]
    || a.item.title.localeCompare(b.item.title));
  return { total: scored.length, results: scored.slice(0, limit).map((s) => s.item) };
}
