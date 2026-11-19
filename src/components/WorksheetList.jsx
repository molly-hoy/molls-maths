/* ==========================================================================
   WORKSHEET LIST
   --------------------------------------------------------------------------
   Shows worksheets as cards. Each card has the title, the level and three
   buttons:
     • Open PDF     the full worksheet, with the answers on the last page
     • Pupil copy   the same worksheet with no answer pages, to hand out
     • Download     saves the full worksheet to your computer
   Used in three places, so they all look the same:
     • the Worksheets page (every worksheet, grouped by topic)
     • each lesson page ("Practise on paper")
     • each unit page ("Worksheets for this unit")

   Props:
     worksheets  the list of worksheet entries to show (from worksheets.js)
     limit       optional: show only this many at first, with a
                 "Show all" button for the rest. Leave it out to show all.
     compact     optional: smaller cards, for the narrow column on lesson
                 pages
   ========================================================================== */
import { useState } from "react";
import styles from "./WorksheetList.module.css";
import { getValidSession, getWorksheetLink } from "../lib/supabase.js";

// The list says "worksheets/<slug>.pdf"; the private bucket holds "<slug>.pdf".
const bucketPath = (file) => file.replace(/^worksheets\//, "");

// Opens a worksheet in a new tab. The server checks the member's plan and makes
// a link that lasts a few minutes, so a PDF can't be reached any other way.
async function openWorksheet(file) {
  // Open the tab straight away: browsers block tabs that open after a wait.
  const tab = window.open("", "_blank");
  try {
    const session = await getValidSession();
    if (!session) throw new Error("Log in to open worksheets.");
    if (!tab) throw new Error("Your browser blocked the new tab. Allow pop-ups for this site and try again.");
    tab.location.href = await getWorksheetLink(bucketPath(file), session.access_token);
  } catch (err) {
    tab?.close();
    window.alert(err.message || "This worksheet could not be opened.");
  }
}

export default function WorksheetList({ worksheets, limit, compact = false }) {
  const [showAll, setShowAll] = useState(false);
  const shown = limit && !showAll ? worksheets.slice(0, limit) : worksheets;
  const hidden = worksheets.length - shown.length;

  return (
    <>
      <ul className={`${styles.list} ${compact ? styles.compact : ""}`}>
        {shown.map((w) => (
          <li key={w.slug} className={styles.item}>
            <div>
              <h3 className={styles.title}>{w.title}</h3>
              {w.level && <span className={styles.level}>{w.level}</span>}
            </div>
            <div className={styles.actions}>
              {/* The hidden "sr-only" text tells screen-reader users which
                  worksheet each button is for, since every button says the same. */}
              <button type="button" className="btn btn-small" onClick={() => openWorksheet(w.file)}>
                Open PDF<span className="sr-only"> for {w.title}, with answers (opens in a new tab)</span>
              </button>
              {/* Only shown if this worksheet has a pupil copy */}
              {w.pupilFile && (
                <button type="button" className="btn btn-secondary btn-small" title="The same worksheet without the answer pages"
                        onClick={() => openWorksheet(w.pupilFile)}>
                  Pupil copy<span className="sr-only"> of {w.title}, without answers (opens in a new tab)</span>
                </button>
              )}
              {/* Opens the PDF; the browser's own viewer has a save button */}
              <button type="button" className="btn btn-secondary btn-small" title="Opens the PDF. Use the save button in the viewer to keep a copy." onClick={() => openWorksheet(w.file)}>
                Download<span className="sr-only"> {w.title}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Only appears when some worksheets are hidden by the limit */}
      {hidden > 0 && (
        <button type="button" className={`btn btn-secondary btn-small ${styles.more}`} onClick={() => setShowAll(true)}>
          Show all {worksheets.length} worksheets
        </button>
      )}
    </>
  );
}
