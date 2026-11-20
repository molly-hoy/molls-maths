/* ==========================================================================
   Site header and navigation
   --------------------------------------------------------------------------
   The menu bar:

     Home | Learn ▾ | Topics ▾ | Practise ▾ | Revision ▾ | My progress | About ▾ | 🔍 Search

   • The menu's links are listed in data/navigation.js: change them there.
   • "Topics" is made automatically from the curriculum: the topics on the
     left; point at one
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
import { useAuth } from "../state/AuthContext.jsx";
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
                    {l.locked ? (
                      <span className={`${styles.link} ${styles.locked}`} aria-disabled="true" data-menu-link="">
                        <span className={styles.menuText}><span>{l.label}</span><span className={styles.hint}>{l.hint ?? "Under construction"}</span></span>
                      </span>
                    ) : (
                    <NavLink to={l.to} className={linkClass} data-menu-link="">
                      <span className={styles.menuText}>
                        <span>{l.label}</span>
                        {l.hint && <span className={styles.hint}>{l.hint}</span>}
                      </span>
                    </NavLink>
                    )}
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
          {/* Left: the topics. Pointing at one (or tabbing to it) shows its units. */}
          <div className={styles.megaTopics}>
            {[["GCSE", STRANDS]].map(([heading, list]) => (
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
  const { user, hasAccess, role } = useAuth();
  // Logged-out visitors and accounts without a plan only see the items marked public.
  // Parents, teachers and tutors don't have their own progress, so "My progress" is hidden
  // for them (they see pupil reports on the account page instead).
  const visibleNav = hasAccess
    ? NAV.filter((item) => !(item.to === "/progress" && role === "adult"))
    : NAV.filter((item) => item.public);
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
          {/* The Moll's Maths logo (the curve on graph paper), saved as public/logo.png */}
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" width="32" height="32" className={styles.logoImage} />
          <span>Moll's <span className={styles.logoMaths}>Maths</span></span>
        </Link>

        {/* ---- Wide screens: the bar with drop-downs ---- */}
        <nav aria-label="Main" className={styles.desktopNav}>
          <ul className={styles.list}>
            {visibleNav.map((item) => {
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

        {/* Search lists lesson and worksheet titles, so it is for paid members only */}
        {hasAccess && <SiteSearch />}

        {/* Shown on wide screens; on phones the same link is in the Menu panel */}
        <span className={styles.accountWrap}>
          <Link to="/account" className="btn btn-secondary btn-small">{user ? "My account" : "Log in"}</Link>
        </span>

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
              <li><NavLink to="/account" className={linkClass}>{user ? "My account" : "Log in"}</NavLink></li>
              {visibleNav.map((item) => {
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
