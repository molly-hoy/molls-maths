/* ==========================================================================
   Pupil reports (for parents, teachers and tutors)
   --------------------------------------------------------------------------
   PupilReportPage  /pupils/:studentId  one pupil's progress
   ReportsPage      /reports            every pupil's progress on one page,
                                        ready to print or save as a PDF
   Both use the saved copy of each pupil's progress (supabase/progress.sql).
   The database only returns the rows of the signed-in adult's own pupils.
   ========================================================================== */
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { dbSelect, getValidSession } from "../lib/supabase.js";
import { emptyProgress, lessonEvidence, unitSummary, STATUS_INFO } from "../state/progress.js";
import { getLesson, YEARS } from "../data/curriculum.js";
import { Placeholder } from "../components/ui.jsx";
import styles from "./pages.module.css";
import reportStyles from "./PupilReports.module.css";

// Picks the background colour for a unit row from its completion percentage:
// 100% is green, 25% or less is red, anything in between is amber.
function progressTone(percent) {
  if (percent >= 100) return reportStyles.done;
  if (percent <= 25) return reportStyles.low;
  return reportStyles.mid;
}

// The newest date and time this pupil worked on a lesson: its latest answer or quiz.
// The dates are ISO text (e.g. "2026-11-20T01:22:00.000Z"), so the latest one sorts last.
function lastWorked(state, lessonId) {
  const dates = [
    state.skills[lessonId]?.last,
    ...(state.quizzes[lessonId] ?? []).map((q) => q.date),
  ].filter(Boolean);
  return dates.length ? dates.sort().at(-1) : null;
}

// Shows a saved date and time in UK style, e.g. "20 Nov 2026, 01:22".
function formatWhen(iso) {
  return new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

// Colour for a single topic (lesson) in the Lessons column:
// secure = green, not started = red, anything in between = amber.
function lessonTone(status) {
  if (status === "secure") return reportStyles.done;
  if (status === "not-started" || !status) return reportStyles.low;
  return reportStyles.mid;
}

// Loads the saved progress rows for the adult's pupils, keyed by pupil id.
// Returns an empty map if the adult has no plan or no pupils.
async function loadProgressRows(studentIds) {
  const session = await getValidSession();
  if (!session) throw new Error("Log in to see pupil reports.");
  const rows = await dbSelect("pupil_progress?select=student_id,data,updated_at", session.access_token);
  const map = new Map();
  for (const row of rows ?? []) {
    if (studentIds.includes(row.student_id)) map.set(row.student_id, row);
  }
  return map;
}

// One pupil's report. `saved` is the row from pupil_progress, or undefined.
// `showLessons` false hides the per-topic (lesson) column, so only units are shown.
// Printing and saving as PDF use the screen, so the PDF follows the same setting.
function PupilReport({ pupil, saved, showLessons = true }) {
  const state = useMemo(() => ({ ...emptyProgress(), ...(saved?.data ?? {}) }), [saved]);

  // Overall totals across every lesson the pupil has worked on.
  const totals = useMemo(() => {
    const skills = Object.values(state.skills);
    const attempted = skills.reduce((sum, s) => sum + (s.attempted ?? 0), 0);
    const correct = skills.reduce((sum, s) => sum + (s.correct ?? 0), 0);
    const quizzes = Object.values(state.quizzes).reduce((sum, list) => sum + list.length, 0);
    const secure = YEARS.flatMap((y) => y.units.flatMap((u) => u.lessons)).filter((l) => lessonEvidence(state, l.id).status === "secure").length;
    return { attempted, accuracy: attempted ? Math.round((correct / attempted) * 100) : null, quizzes, secure };
  }, [state]);

  const quizRows = Object.entries(state.quizzes)
    .filter(([, list]) => list.length > 0)
    .map(([lessonId, list]) => {
      const best = list.reduce((m, q) => Math.max(m, q.score / q.total), 0);
      return { lessonId, title: getLesson(lessonId)?.title ?? lessonId, tries: list.length, best: Math.round(best * 100) };
    });

  return (
    <article className="report-page">
      <header style={{ marginBottom: "1rem" }}>
        <h2 style={{ marginBottom: "0.25rem" }}>{pupil.first_name} {pupil.last_name}</h2>
        <p className="muted" style={{ margin: 0 }}>
          Year {pupil.year_group} · username <code>{pupil.username}</code>
          {saved?.updated_at && <> · last saved {new Date(saved.updated_at).toLocaleDateString("en-GB")}</>}
        </p>
      </header>

      {!saved ? (
        <p className="muted">No progress has been saved for {pupil.first_name} yet. It is saved when they log in and use the lessons.</p>
      ) : (
        <>
          <dl className={styles.creds} style={{ marginBottom: "1rem" }}>
            <dt>Quizzes taken</dt><dd>{totals.quizzes}</dd>
            <dt>Lessons secure</dt><dd>{totals.secure}</dd>
            <dt>Practice accuracy</dt><dd>{totals.accuracy === null ? "No practice yet" : `${totals.accuracy}% (${totals.attempted} questions)`}</dd>
          </dl>

          {YEARS.map((year) => (
            <section key={year.year} style={{ marginTop: "1rem" }}>
              <h3>Year {year.year}</h3>
              <div className={reportStyles.legend} aria-hidden="true">
                <span className={reportStyles.legendItem}><span className={`${reportStyles.swatch} ${reportStyles.done}`} /> Unit complete (100%)</span>
                <span className={reportStyles.legendItem}><span className={`${reportStyles.swatch} ${reportStyles.mid}`} /> In progress</span>
                <span className={reportStyles.legendItem}><span className={`${reportStyles.swatch} ${reportStyles.low}`} /> 25% or less</span>
              </div>
              <table className={reportStyles.reportTable}>
                <thead>
                  <tr><th scope="col">Unit</th><th scope="col">Quizzes done</th><th scope="col">Secure</th>{showLessons && <th scope="col">Lessons</th>}</tr>
                </thead>
                <tbody>
                  {year.units.map((unit) => {
                    const sum = unitSummary(state, unit.id);
                    const tone = progressTone(sum.percent);
                    return (
                      <tr key={unit.id}>
                        <td className={tone}>{unit.title}</td>
                        <td className={tone}>{sum.completed} of {sum.total} ({sum.percent}%)</td>
                        <td className={tone}>{sum.secure}</td>
                        {showLessons && (
                          <td>
                            {unit.lessons.map((l) => {
                              const e = lessonEvidence(state, l.id);
                              // Each topic gets its own colour, separate from the unit's overall colour.
                              return (
                                <span key={l.id} className={`${reportStyles.topic} ${lessonTone(e.status)}`}>
                                  {l.title}: {STATUS_INFO[e.status]?.label}
                                  {lastWorked(state, l.id) && (
                                    <span className={reportStyles.when}>
                                      <br />Last worked on {formatWhen(lastWorked(state, l.id))}
                                    </span>
                                  )}
                                </span>
                              );
                            })}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          ))}

          <section style={{ marginTop: "1rem" }}>
            <h3>Quiz results</h3>
            {quizRows.length === 0 ? (
              <p className="muted">No quizzes taken yet.</p>
            ) : (
              <table className={reportStyles.reportTable}>
                <thead><tr><th scope="col">Lesson</th><th scope="col">Tries</th><th scope="col">Best score</th></tr></thead>
                <tbody>
                  {quizRows.map((r) => <tr key={r.lessonId}><td>{r.title}</td><td>{r.tries}</td><td>{r.best}%</td></tr>)}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}
    </article>
  );
}

// Shown to anyone who is not a parent, teacher or tutor.
function AdultsOnly() {
  return (
    <div className="container">
      <header className="page-head"><h1>Pupil reports</h1></header>
      <Placeholder title="For parents, teachers and tutors">
        <p>Reports are available to the adult who manages the pupil's account. Pupils see their own progress under My progress.</p>
      </Placeholder>
    </div>
  );
}

// The switch that hides or shows the per-lesson (topic) rows. It is hidden when printing.
function ShowLessonsToggle({ checked, onChange }) {
  return (
    <label className="no-print" style={{ display: "inline-flex", gap: "0.5rem", alignItems: "center", margin: "0.5rem 0" }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      Show each lesson (topic) in the table
    </label>
  );
}

export function PupilReportPage() {
  const { studentId } = useParams();
  const { role, students, ready } = useAuth();
  const [showLessons, setShowLessons] = useState(true);
  const [saved, setSaved] = useState(undefined);   // undefined while loading, null if none
  const [error, setError] = useState("");
  const pupil = students.find((s) => s.id === studentId);

  useEffect(() => {
    if (!ready || role !== "adult" || !pupil) return;
    let cancelled = false;
    loadProgressRows([pupil.id])
      .then((map) => { if (!cancelled) setSaved(map.get(pupil.id) ?? null); })
      .catch((err) => { if (!cancelled) setError(err.message); });
    return () => { cancelled = true; };
  }, [ready, role, pupil]);

  if (ready && role !== "adult") return <AdultsOnly />;
  if (ready && !pupil) return <div className="container"><p className="muted">This pupil could not be found. <Link to="/account">Back to your account</Link>.</p></div>;

  return (
    <div className="container section">
      <p className="no-print"><Link to="/account">← Back to your pupils</Link></p>
      <p className="no-print">
        <button type="button" className="btn btn-secondary" onClick={() => window.print()}>Print or save as PDF</button>
      </p>
      <ShowLessonsToggle checked={showLessons} onChange={setShowLessons} />
      {error && <p role="alert" className={styles.error}>{error}</p>}
      {pupil && saved === undefined && !error && <p className="muted">Loading the report…</p>}
      {pupil && saved !== undefined && <PupilReport pupil={pupil} saved={saved ?? undefined} showLessons={showLessons} />}
    </div>
  );
}

export function ReportsPage() {
  const { role, students, ready } = useAuth();
  const [showLessons, setShowLessons] = useState(true);
  const [rows, setRows] = useState(undefined);   // undefined while loading
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ready || role !== "adult" || students.length === 0) { setRows(new Map()); return undefined; }
    let cancelled = false;
    loadProgressRows(students.map((s) => s.id))
      .then((map) => { if (!cancelled) setRows(map); })
      .catch((err) => { if (!cancelled) setError(err.message); });
    return () => { cancelled = true; };
  }, [ready, role, students]);

  if (ready && role !== "adult") return <AdultsOnly />;

  return (
    <div className="container section">
      <header className="page-head no-print">
        <h1>Pupil reports</h1>
        <p className="lead">One report for each pupil. Use the button to print them, or to save them all as one PDF file.</p>
        <p>
          <button type="button" className="btn" onClick={() => window.print()} disabled={students.length === 0}>Print or save all as PDF</button>{" "}
          <Link to="/account" className="btn btn-secondary">Back to your pupils</Link>
        </p>
        <ShowLessonsToggle checked={showLessons} onChange={setShowLessons} />
      </header>
      {error && <p role="alert" className={styles.error}>{error}</p>}
      {students.length === 0 && <p className="muted">You have no pupils yet. Add them on your <Link to="/account">account page</Link>.</p>}
      {rows === undefined && students.length > 0 && !error && <p className="muted">Loading the reports…</p>}
      {rows !== undefined && students.map((pupil) => (
        <PupilReport key={pupil.id} pupil={pupil} saved={rows.get(pupil.id)} showLessons={showLessons} />
      ))}
    </div>
  );
}
