/* ==========================================================================
   SITE SEARCH
   --------------------------------------------------------------------------
   A "Search" button in the header. Clicking it (or pressing "/" or Ctrl+K
   anywhere on the site) opens a search box over the page. Results appear
   as you type: topics, pages, units, lessons and worksheets.
   (What is searched, and how results are ranked: data/searchIndex.js.)

   Using it with the keyboard:
     Up / Down arrows   move through the results
     Enter              open the highlighted result
     Escape             close the search (back to where you were)

   For screen readers, the box is a "combobox": the text field announces
   how many results there are and which one is highlighted, without moving
   the typing cursor out of the box.
   ========================================================================== */
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { search } from "../data/searchIndex.js";
import styles from "./SiteSearch.module.css";

const TYPE_LABEL = { topic: "Topic", page: "Page", unit: "Unit", lesson: "Lesson", worksheet: "Worksheet" };

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);         // which result is highlighted
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const { pathname } = useLocation();
  const id = useId();                              // unique ids for the accessibility links

  // useMemo: only search again when the words change, not on every redraw
  const { total, results } = useMemo(() => search(query), [query]);

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  // Open with "/" or Ctrl+K (Cmd+K on a Mac), unless you're typing in a box already
  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
      if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // When it opens: put the cursor in the box, and stop the page behind scrolling
  useEffect(() => {
    if (!open) return undefined;
    inputRef.current?.focus();
    inputRef.current?.select();
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = before; };
  }, [open]);

  // Close after a result takes you to a new page
  useEffect(() => { setOpen(false); }, [pathname]);

  // A new search highlights the top result again
  useEffect(() => { setActive(0); }, [query]);

  // Keep the highlighted result scrolled into view
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onInputKey = (e) => {
    if (e.key === "Escape") { e.preventDefault(); close(); }
    if (!results.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % results.length); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + results.length) % results.length); }
    if (e.key === "Enter") {
      e.preventDefault();
      // "Click" the highlighted result, so it behaves exactly like a mouse click
      listRef.current?.querySelector(`[data-index="${active}"]`)?.click();
    }
  };

  const optionId = (i) => `${id}-result-${i}`;

  return (
    <>
      <button ref={buttonRef} type="button" className={styles.trigger} onClick={() => setOpen(true)} aria-haspopup="dialog">
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M13 13 L17.5 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className={styles.triggerText}>Search</span>
        <span className="sr-only"> the site (shortcut: forward slash)</span>
      </button>

      {open && (
        // The dark backdrop: clicking it (outside the box) closes the search
        <div className={styles.backdrop} onPointerDown={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className={styles.dialog} role="dialog" aria-modal="true" aria-label="Search Moll's Maths">
            <div className={styles.inputRow}>
              <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" className={styles.inputIcon}>
                <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M13 13 L17.5 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                className={styles.input}
                type="search"
                placeholder="Search topics, lessons and worksheets"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls={`${id}-results`}
                aria-activedescendant={results.length ? optionId(active) : undefined}
                aria-autocomplete="list"
                aria-label="Search"
              />
              <button type="button" className={styles.close} onClick={close}>
                Esc<span className="sr-only"> to close the search</span>
              </button>
            </div>

            {/* Read out by screen readers whenever the number of results changes */}
            <p className={styles.status} aria-live="polite">
              {query.trim() === ""
                ? "Try “fractions”, “Year 9”, “pythagoras” or “worksheets”."
                : total === 0
                  ? `No results for “${query.trim()}”. Try a shorter or different word.`
                  : total > results.length
                    ? `Showing the top ${results.length} of ${total} results.`
                    : `${total} result${total === 1 ? "" : "s"}`}
            </p>

            {results.length > 0 && (
              <ul ref={listRef} id={`${id}-results`} role="listbox" className={styles.results} aria-label="Search results">
                {results.map((r, i) => {
                  const inner = (
                    <>
                      <span className={`${styles.type} ${styles[r.type]}`}>{TYPE_LABEL[r.type]}</span>
                      <span className={styles.text}>
                        <span className={styles.title}>{r.title}</span>
                        <span className={styles.detail}>{r.detail}</span>
                      </span>
                    </>
                  );
                  const common = {
                    id: optionId(i),
                    role: "option",
                    "aria-selected": i === active,
                    "data-index": i,
                    className: `${styles.result} ${i === active ? styles.activeResult : ""}`,
                    onMouseMove: () => setActive(i),   // the mouse highlights too
                    tabIndex: -1,
                  };
                  return (
                    <li key={`${r.type}-${r.to ?? r.href}`} role="presentation">
                      {r.href
                        // Worksheets are PDF files: open them in a new tab
                        ? <a {...common} href={r.href} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>{inner}</a>
                        : <Link {...common} to={r.to} onClick={() => setOpen(false)}>{inner}</Link>}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
