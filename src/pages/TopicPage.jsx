/* ==========================================================================
   TOPIC PAGE  (/topic/number, /topic/algebra, ...)
   --------------------------------------------------------------------------
   Everything in one topic (strand) across all five years:
     • links to the other topics, so you can hop between them
     • every unit in the topic, grouped by year, in teaching order
     • every worksheet that goes with those units
   It is built from the curriculum, so a new unit appears here automatically.
   ========================================================================== */
import { Link, useParams } from "react-router-dom";
import { YEARS } from "../data/curriculum.js";
import { STRANDS, getStrand } from "../data/strands.js";
import { worksheetsForLessons } from "../data/lessonWorksheets.js";
import { unitSummary } from "../state/progress.js";
import { useProgress } from "../state/ProgressContext.jsx";
import { ProgressBar } from "../components/ui.jsx";
import WorksheetList from "../components/WorksheetList.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import styles from "./pages.module.css";

// One sentence about each topic, shown under the heading
const ABOUT = {
  number: "Place value, the four operations, fractions, decimals and percentages, powers and roots, and working accurately: the foundations everything else is built on.",
  algebra: "Using letters for numbers: expressions, equations, sequences, graphs and functions, building up to quadratics and simultaneous equations.",
  ratio: "Comparing amounts and how one quantity changes with another: ratio, proportion, percentages in context, compound measures and rates of change.",
  geometry: "Shapes, angles, measuring, transformations, constructions, Pythagoras and trigonometry, circles and vectors.",
  statistics: "Collecting, showing and making sense of data: charts, averages, spread and comparing distributions.",
  "alevel-statistics": "A level statistics: sampling, correlation and regression, conditional probability, the binomial and normal distributions, and hypothesis testing.",
  probability: "How likely things are: from the probability scale to tree diagrams, Venn diagrams and conditional probability.",
  pure: "The core of A Level Mathematics: proof, algebra and functions, coordinate geometry, sequences and series, trigonometry, exponentials and logarithms, calculus and vectors.",
  mechanics: "A level mechanics: modelling how things move and why, from constant acceleration and Newton's laws to moments, friction and projectiles.",
};

export default function TopicPage() {
  const { strandId } = useParams();
  const topic = getStrand(strandId);
  const { state } = useProgress();
  if (!topic) return <NotFoundPage />;

  // This topic's units, in year order, with empty years left out
  const years = YEARS.map((y) => ({ ...y, units: y.units.filter((u) => u.strand === topic.id) })).filter((y) => y.units.length);
  const units = years.flatMap((y) => y.units);
  const lessons = units.flatMap((u) => u.lessons);
  const worksheets = worksheetsForLessons(lessons.map((l) => l.id));

  return (
    <div className="container">
      <header className="page-head">
        <nav className={styles.crumbs} aria-label="Breadcrumb"><Link to="/">Home</Link> / <span>Topics</span> / <span>{topic.name}</span></nav>
        <p className="eyebrow" style={{ color: topic.ink }}>Topic</p>
        <h1>{topic.name}</h1>
        <p className="lead">{ABOUT[topic.id]}</p>
        <div className={styles.stats}>
          <div className={styles.stat}><span className={styles.statValue}>{units.length}</span><span className={styles.statLabel}>units</span></div>
          <div className={styles.stat}><span className={styles.statValue}>{lessons.length}</span><span className={styles.statLabel}>lessons</span></div>
          <div className={styles.stat}><span className={styles.statValue}>{worksheets.length}</span><span className={styles.statLabel}>worksheets</span></div>
        </div>
      </header>

      {/* Hop to another topic. aria-current tells screen readers which one you're on. */}
      <nav className={styles.filterRow} aria-label="Other topics">
        {STRANDS.map((s) => (
          <Link key={s.id} to={`/topic/${s.id}`} className={styles.chip} aria-current={s.id === topic.id ? "page" : undefined}
                style={s.id === topic.id ? { background: s.ink, color: "#fff", borderColor: s.ink, textDecoration: "none" } : { textDecoration: "none", color: "inherit" }}>
            {s.short ?? s.name}
          </Link>
        ))}
      </nav>

      {/* The units, year by year */}
      {years.map((y) => (
        <section key={y.year} className="section" aria-labelledby={`year-${y.year}`}>
          <h2 id={`year-${y.year}`}>Year {y.year}</h2>
          <ol className={styles.unitList}>
            {y.units.map((u) => {
              const summary = unitSummary(state, u.id);
              const unitNo = u.id.split("-u")[1];
              return (
                <li key={u.id}>
                  <Link to={`/unit/${u.id}`} className={styles.unitCard} style={{ "--strand-tint": topic.tint, "--strand-ink": topic.ink }}>
                    <span className={styles.unitNo} aria-hidden="true">{unitNo}</span>
                    <div>
                      <h3>Unit {unitNo}: {u.title}</h3>
                      <p>{u.intro}</p>
                      <div className={styles.unitMeta}>
                        <span>{u.lessons.length} lessons</span>
                        <span>{u.lessons.map((l) => l.title).slice(0, 3).join(" · ")}{u.lessons.length > 3 ? " …" : ""}</span>
                      </div>
                      {summary.completed > 0 && (
                        <div style={{ marginTop: "0.6rem", maxWidth: "20rem" }}><ProgressBar value={summary.percent} label={`Progress in ${u.title}`} /></div>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ))}

      {worksheets.length > 0 && (
        <section className="section" aria-labelledby="topic-ws">
          <h2 id="topic-ws">{topic.short ?? topic.name} worksheets</h2>
          <p className="muted">Printable PDFs for this topic's lessons, in teaching order. Answers are on the last page; the pupil copy leaves them out.</p>
          <WorksheetList worksheets={worksheets} limit={9} />
        </section>
      )}
    </div>
  );
}
