/* ==========================================================================
   A LEVEL MATHEMATICS PAGE  (/a-level)
   --------------------------------------------------------------------------
   The front page of the A level section:
     • the two years (Year 12 and Year 13) with links to their units
     • the three strands: pure, statistics and mechanics
     • how each exam board sets its papers
     • the A level curriculum map (which unit builds on which)
   The units themselves are in data/curriculumALevel.js.

   The exam board table was checked against each board's published papers
   (AQA 7357, Pearson Edexcel 9MA0, OCR H240) in November 2026. Boards can
   change their specifications, so check the board's own website if in doubt.
   ========================================================================== */
import { Link } from "react-router-dom";
import { YEARS } from "../data/curriculum.js";
import { getStrand } from "../data/strands.js";
import { Placeholder } from "../components/ui.jsx";
import CurriculumMapPage from "./CurriculumMapPage.jsx";
import styles from "./pages.module.css";

const A_LEVEL_YEARS = YEARS.filter((y) => y.keyStage === 5);
const A_LEVEL_UNITS = A_LEVEL_YEARS.flatMap((y) => y.units);

// The three strands of A level, with what each one covers
const PARTS = [
  { id: "pure", about: "About two-thirds of the course: proof, algebra and functions, coordinate geometry, sequences and series, the binomial expansion, trigonometry, exponentials and logarithms, differentiation, integration, numerical methods and vectors." },
  { id: "alevel-statistics", about: "Sampling, presenting and interpreting data, probability, the binomial and normal distributions, and hypothesis testing, using your exam board's large data set." },
  { id: "mechanics", about: "Quantities and units, kinematics, forces and Newton's laws, moments, friction and projectiles." },
];

// How each board arranges the papers. Every paper is 2 hours and 100 marks.
const BOARDS = [
  { board: "AQA", spec: "7357", p1: "Pure", p2: "Pure and mechanics", p3: "Pure and statistics" },
  { board: "Pearson Edexcel", spec: "9MA0", p1: "Pure 1", p2: "Pure 2", p3: "Statistics and mechanics" },
  { board: "OCR (Maths A)", spec: "H240", p1: "Pure", p2: "Pure and statistics", p3: "Pure and mechanics" },
];

export default function ALevelPage() {
  const lessons = A_LEVEL_UNITS.flatMap((u) => u.lessons);

  return (
    <div className="container">
      <header className="page-head">
        <p className="eyebrow">Years 12 and 13 · Key Stage 5</p>
        <h1>A Level Mathematics</h1>
        <p className="lead">
          A level Maths builds on the whole of GCSE, especially the Higher tier. It is taught over Years 12 and 13 and
          covers the same content for AQA, Pearson Edexcel and OCR: pure mathematics, statistics and mechanics.
        </p>
        <div className={styles.stats}>
          <div className={styles.stat}><span className={styles.statValue}>{A_LEVEL_UNITS.length}</span><span className={styles.statLabel}>units</span></div>
          <div className={styles.stat}><span className={styles.statValue}>{lessons.length}</span><span className={styles.statLabel}>lessons</span></div>
          <div className={styles.stat}><span className={styles.statValue}>3</span><span className={styles.statLabel}>exam papers</span></div>
        </div>
      </header>

      <Placeholder title="Lessons are being written in stages">
        <p>
          The whole course is planned: every unit and lesson below has its title, its place in the course and the units it builds
          on. The teaching, worked examples and practice questions for each lesson will be added in stages, as they were for
          Years 7 to 11.
        </p>
      </Placeholder>

      {/* ---- The two years ---- */}
      <section className="section" aria-labelledby="years">
        <h2 id="years">The two years</h2>
        <div className="grid-auto">
          {A_LEVEL_YEARS.map((y) => (
            <Link key={y.year} to={`/year/${y.year}`} className="card" style={{ textDecoration: "none", color: "inherit" }}>
              <h3>{y.title}</h3>
              <p>{y.year === 12
                ? "The AS content: algebra, graphs, trigonometry, a first look at calculus, and the first half of statistics and mechanics."
                : "Completing the full A level: harder calculus, further trigonometry, the normal distribution, moments, friction and projectiles."}</p>
              <p className="muted" style={{ margin: 0 }}>{y.units.length} units · {y.units.flatMap((u) => u.lessons).length} lessons</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ---- Pure, statistics, mechanics ---- */}
      <section className="section" aria-labelledby="parts">
        <h2 id="parts">What the course covers</h2>
        <div className="grid-auto">
          {PARTS.map((p) => {
            const s = getStrand(p.id);
            const units = A_LEVEL_UNITS.filter((u) => u.strand === p.id);
            return (
              <div key={p.id} className="card" style={{ borderTop: `4px solid ${s.colour}` }}>
                <h3>{s.name}</h3>
                <p>{p.about}</p>
                <p style={{ margin: 0 }}><Link to={`/topic/${s.id}`}>See all {units.length} {s.short ?? s.name} units at A level</Link></p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---- Exam papers ---- */}
      <section className="section" aria-labelledby="papers">
        <h2 id="papers">The exam papers</h2>
        <p>
          A level Maths is assessed by three papers at the end of Year 13. Each one is 2 hours long, is worth 100 marks
          (a third of the A level), and allows a calculator. The boards test the same content but share it out
          differently between the papers:
        </p>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th scope="col">Exam board</th><th scope="col">Specification</th><th scope="col">Paper 1</th><th scope="col">Paper 2</th><th scope="col">Paper 3</th></tr>
            </thead>
            <tbody>
              {BOARDS.map((b) => (
                <tr key={b.board}><td>{b.board}</td><td>{b.spec}</td><td>{b.p1}</td><td>{b.p2}</td><td>{b.p3}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="notice notice-info" style={{ marginTop: "1rem" }}>
          Each board publishes its own <strong>large data set</strong>: real data you explore during the course, which
          statistics questions in the exam assume you know. OCR also offers a second A level, Mathematics B (MEI, H640),
          with a different paper structure. Check with your teacher which board and specification you are taking.
        </p>
      </section>

      {/* ---- Curriculum map for Years 12 and 13 ---- */}
      <section className="section" aria-labelledby="map">
        <h2 id="map">A level curriculum map</h2>
        <p>Select a unit to see which units it builds on (including GCSE units) and which later units build on it.</p>
        <CurriculumMapPage keyStage={5} />
      </section>
    </div>
  );
}
