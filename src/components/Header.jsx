/* ==========================================================================
   Site header and navigation
   --------------------------------------------------------------------------
   The menu bar:

     Home | Learn ▾ | Topics ▾ | Practise ▾ | Revision ▾ | My progress | About ▾ | 🔍 Search

   • The menu's links are listed in data/navigation.js: change them there.
   • "Topics" is made automatically from the curriculum: the topics on the
     left (with the A level-only ones under their own heading); point at one
     (or tab to it) to see its units on the right,
     grouped by year. Clicking a topic opens its topic page.
   • "Search" is in components/SiteSearch.jsx.

   On narrow screens (phones and small tablets) a "Menu" button opens one
   panel with every page, grouped under the same headings.

   ACCESSIBILITY: each drop-down is opened by a real <button> that tells
   screen readers whether it is expanded. With the keyboard you can open it
   with Enter, Space or the Down arrow, move between links with the Up and
   Down arrows, and close it with Escape (which puts you back on the button).
   It also closes when you click elsewhere or go to a new page.
   ========================================================================== */
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV } from "../data/navigation.js";
import { YEARS } from "../data/curriculum.js";
import { STRANDS } from "../data/strands.js";
import SiteSearch from "./SiteSearch.jsx";
import styles from "./Header.module.css";

// Is this page the link's page, or a page inside it (e.g. /year/7/...)?
const isOn = (pathname, to) => pathname === to || pathname.startsWith(to + "/");

const linkClass = ({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`;

// Units grouped by topic, then by year: { number: [{ year: 7, units: [...] }, ...], ... }
const ALL_UNITS = YEARS.flatMap((y) => y.units);
const UNITS_BY_TOPIC = Object.fromEntries(STRANDS.map((s) => [
  s.id,
  YEARS.map((y) => ({ year: y.year, units: y.units.filter((u) => u.strand === s.id) })).filter((g) => g.units.length),
]));

/* --------------------------------------------------------------------------
   The open/close behaviour every drop-down shares
   -------------------------------------------------------------------------- */
function useDropdown(pathname) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);         // the whole drop-down: button + panel
  const buttonRef = useRef(null);

  // The links currently in the open panel, so the arrow keys can move between them
  const menuLinks = () => [...(ref.current?.querySelectorAll("[data-menu-link]") ?? [])];

  // While open: close on a click outside, or on Escape
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();      // put keyboard users back where they were
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close when the page changes (after a link is clicked)
  useEffect(() => { setOpen(false); }, [pathname]);

  const buttonProps = {
    ref: buttonRef,
    type: "button",
    "aria-expanded": open,
    onClick: () => setOpen((o) => !o),
    // Down arrow on the button opens the panel and jumps to the first link
    onKeyDown: (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
        requestAnimationFrame(() => menuLinks()[0]?.focus());   // wait one frame for the panel to appear
      }
    },
  };

  // Up/Down arrows move between links; Tab past the last link closes the panel
  const onMenuKey = (e) => {
    const links = menuLinks();
    const i = links.indexOf(document.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); links[(i + 1) % links.length]?.focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); links[(i - 1 + links.length) % links.length]?.focus(); }
    if (e.key === "Tab" && !e.shiftKey && i === links.length - 1) setOpen(false);
  };

  return { open, ref, buttonProps, onMenuKey };
}

/* --------------------------------------------------------------------------
   An ordinary drop-down (Learn, Practise, Revision, About)
   -------------------------------------------------------------------------- */
function Dropdown({ item, pathname }) {
  const { open, ref, buttonProps, onMenuKey } = useDropdown(pathname);
  const active = item.sections.flatMap((s) => s.links).some((l) => isOn(pathname, l.to));
  const panelId = `menu-${item.label.toLowerCase()}`;

  return (
    <li className={styles.dropdown} ref={ref}>
      <button {...buttonProps} aria-controls={panelId} className={`${styles.link} ${active ? styles.active : ""}`}>
        {item.label}
        <span aria-hidden="true" className={`${styles.caret} ${open ? styles.caretOpen : ""}`}>▾</span>
      </button>

      {open && (
        <div
          id={panelId}
          className={`${styles.menu} ${item.wide ? styles.menuWide : ""} ${item.alignRight ? styles.menuRight : ""}`}
          onKeyDown={onMenuKey}
        >
          {item.sections.map((section, si) => (
            <div key={si} className={styles.menuSection}>
              {section.heading && <p className={styles.menuHeading}>{section.heading}</p>}
              <ul className={styles.menuList}>
                {section.links.map((l) => (
                  <li key={l.to}>
                    <NavLink to={l.to} className={linkClass} data-menu-link="">
                      <span className={styles.menuText}>
                        <span>{l.label}</span>
                        {l.hint && <span className={styles.hint}>{l.hint}</span>}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}

/* --------------------------------------------------------------------------
   The Topics drop-down: topics on the left, the chosen topic's units on the right
   -------------------------------------------------------------------------- */
function TopicsDropdown({ item, pathname }) {
  const { open, ref, buttonProps, onMenuKey } = useDropdown(pathname);

  // Which topic's units are showing. Starts on the topic of the page you're
  // on (if any), otherwise the first topic.
  const currentUnit = ALL_UNITS.find((u) => isOn(pathname, `/unit/${u.id}`) || pathname.startsWith(`/lesson/${u.id}-`));
  const pageTopic = pathname.startsWith("/topic/") ? pathname.split("/")[2] : currentUnit?.strand;
  const [shown, setShown] = useState(STRANDS[0].id);
  useEffect(() => { if (open) setShown(pageTopic ?? STRANDS[0].id); }, [open]);   // eslint-disable-line react-hooks/exhaustive-deps

  const active = Boolean(pageTopic);
  const topic = STRANDS.find((s) => s.id === shown);

  return (
    <li className={`${styles.dropdown} ${styles.dropdownMega}`} ref={ref}>
      <button {...buttonProps} aria-controls="menu-topics" className={`${styles.link} ${active ? styles.active : ""}`}>
        {item.label}
        <span aria-hidden="true" className={`${styles.caret} ${open ? styles.caretOpen : ""}`}>▾</span>
      </button>

      {open && (
        <div id="menu-topics" className={`${styles.menu} ${styles.mega}`} onKeyDown={onMenuKey}>
          {/* Left: the topics. Pointing at one (or tabbing to it) shows its units.
              GCSE topics and A level topics (Pure, Statistics, Mechanics) sit under
              their own headings. */}
          <div className={styles.megaTopics}>
            {[["GCSE", STRANDS.filter((s) => !s.aLevel)], ["A level", STRANDS.filter((s) => s.aLevel)]].map(([heading, list]) => (
              <div key={heading}>
                <p className={styles.menuHeading}>{heading}</p>
                <ul className={styles.menuList}>
                  {list.map((s) => (
                    <li key={s.id}>
                      <NavLink
                        to={`/topic/${s.id}`}
                        data-menu-link=""
                        className={({ isActive }) => `${styles.link} ${styles.topicLink} ${isActive ? styles.active : ""} ${shown === s.id ? styles.topicShown : ""}`}
                        style={{ "--dot": s.colour }}
                        onMouseEnter={() => setShown(s.id)}
                        onFocus={() => setShown(s.id)}
                      >
                        <span className={styles.dot} aria-hidden="true" />
                        {s.short ?? s.name}
                        <span aria-hidden="true" className={styles.chevron}>›</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right: the units in the chosen topic, grouped by year */}
          <div className={styles.megaUnits} aria-live="polite">
            <p className={styles.menuHeading}>{topic.name} units</p>
            <div className={styles.megaYears}>
              {UNITS_BY_TOPIC[topic.id].map((g) => (
                <div key={g.year} className={styles.megaYear}>
                  <p className={styles.yearLabel}>Year {g.year}</p>
                  <ul className={styles.menuList}>
                    {g.units.map((u) => (
                      <li key={u.id}>
                        <NavLink to={`/unit/${u.id}`} className={({ isActive }) => `${styles.link} ${styles.unitLink} ${isActive ? styles.active : ""}`} data-menu-link="">
                          {u.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link to={`/topic/${topic.id}`} className={styles.seeAll} data-menu-link="">
              See everything in {topic.short ?? topic.name} →
            </Link>
          </div>
        </div>
      )}
    </li>
  );
}

/* --------------------------------------------------------------------------
   The header
   -------------------------------------------------------------------------- */
export default function Header() {
  const { pathname } = useLocation();
  const [panelOpen, setPanelOpen] = useState(false);   // the phone menu

  // Close the phone menu when the page changes, or on Escape
  useEffect(() => { setPanelOpen(false); }, [pathname]);
  useEffect(() => {
    if (!panelOpen) return undefined;
    const onKey = (e) => { if (e.key === "Escape") setPanelOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [panelOpen]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link to="/" className={styles.logo} aria-label="Moll's Maths home">
          <svg viewBox="0 0 32 32" width="38" height="38" aria-hidden="true" className={styles.logoMark}>
            <path d="M4.1 5.6 Q15.8 2.9 27.9 4.3 Q29.4 15.6 27.6 27.8 Q16.1 29.6 4.3 26.9 Q2.4 16.4 4.1 5.6Z" fill="#a8cbb0" stroke="#6f9a7a" strokeWidth="0.9" />
            <path d="M7.4 10.2 Q15.9 9.0 25.1 10.6" stroke="#2e2e2e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M11.2 10.5 Q10.2 17.2 11.7 23.9" stroke="#2e2e2e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M21.3 11.0 Q22.4 17.0 20.9 24.2" stroke="#2e2e2e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </svg>
          <span className={styles.logoWord}>
            Moll's <span className={styles.logoMaths}><svg className={styles.logoQuartic} viewBox="0 0 40 30" aria-hidden="true"><path d="M2.00,27.34 L2.45,23.55 L2.90,20.17 L3.35,17.17 L3.80,14.53 L4.25,12.22 L4.70,10.22 L5.15,8.51 L5.60,7.08 L6.05,5.89 L6.50,4.94 L6.95,4.19 L7.40,3.65 L7.85,3.28 L8.30,3.07 L8.75,3.00 L9.20,3.06 L9.65,3.24 L10.10,3.51 L10.55,3.87 L11.00,4.30 L11.45,4.78 L11.90,5.32 L12.35,5.89 L12.80,6.49 L13.25,7.10 L13.70,7.71 L14.15,8.32 L14.60,8.92 L15.05,9.50 L15.50,10.06 L15.95,10.58 L16.40,11.06 L16.85,11.49 L17.30,11.88 L17.75,12.22 L18.20,12.49 L18.65,12.71 L19.10,12.87 L19.55,12.97 L20.00,13.00 L20.45,12.97 L20.90,12.87 L21.35,12.71 L21.80,12.49 L22.25,12.22 L22.70,11.88 L23.15,11.49 L23.60,11.06 L24.05,10.58 L24.50,10.06 L24.95,9.50 L25.40,8.92 L25.85,8.32 L26.30,7.71 L26.75,7.10 L27.20,6.49 L27.65,5.89 L28.10,5.32 L28.55,4.78 L29.00,4.30 L29.45,3.87 L29.90,3.51 L30.35,3.24 L30.80,3.06 L31.25,3.00 L31.70,3.07 L32.15,3.28 L32.60,3.65 L33.05,4.19 L33.50,4.94 L33.95,5.89 L34.40,7.08 L34.85,8.51 L35.30,10.22 L35.75,12.22 L36.20,14.53 L36.65,17.17 L37.10,20.17 L37.55,23.55 L38.00,27.34" /></svg>aths</span>
            <svg className={styles.logoLine} viewBox="0 0 120 10" aria-hidden="true">
              <path d="M2 6 Q30 2 58 5.5 Q84 8.5 117 3.5" />
            </svg>
          </span>
        </Link>

        {/* ---- Wide screens: the bar with drop-downs ---- */}
        <nav aria-label="Main" className={styles.desktopNav}>
          <ul className={styles.list}>
            {NAV.map((item) => {
              if (item.topics) return <TopicsDropdown key={item.label} item={item} pathname={pathname} />;
              if (item.sections) return <Dropdown key={item.label} item={item} pathname={pathname} />;
              return (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end} className={linkClass}>{item.label}</NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <SiteSearch />

        {/* ---- Narrow screens: one "Menu" button ---- */}
        <button
          type="button"
          className={`btn btn-secondary btn-small ${styles.menuButton}`}
          aria-expanded={panelOpen}
          aria-controls="mobile-nav"
          onClick={() => setPanelOpen((o) => !o)}
        >
          {panelOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* The phone menu: every page, under the same group names as the bar */}
      {panelOpen && (
        <nav id="mobile-nav" aria-label="Main" className={styles.panel}>
          <div className="container">
            <ul className={styles.panelList}>
              {NAV.map((item) => {
                if (item.topics) {
                  return (
                    <li key={item.label} className={styles.panelGroup}>
                      <span className={styles.groupLabel}>{item.label}</span>
                      <ul className={styles.panelSub}>
                        {STRANDS.map((s) => (
                          <li key={s.id}><NavLink to={`/topic/${s.id}`} className={linkClass}>{s.short ?? s.name}</NavLink></li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                if (item.sections) {
                  return (
                    <li key={item.label} className={styles.panelGroup}>
                      <span className={styles.groupLabel}>{item.label}</span>
                      {item.sections.map((section, si) => (
                        <div key={si}>
                          {section.heading && <span className={styles.subLabel}>{section.heading}</span>}
                          <ul className={styles.panelSub}>
                            {section.links.map((l) => (
                              <li key={l.to}><NavLink to={l.to} className={linkClass}>{l.label}</NavLink></li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </li>
                  );
                }
                return <li key={item.to}><NavLink to={item.to} end={item.end} className={linkClass}>{item.label}</NavLink></li>;
              })}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
