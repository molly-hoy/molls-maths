/* ==========================================================================
   Under construction page (locked sections)
   --------------------------------------------------------------------------
   Shown instead of a locked section, such as A level, whose addresses are
   listed in data/levels.js. Change ALEVEL_UNDER_CONSTRUCTION there to open it.
   ========================================================================== */
import { Link } from "react-router-dom";

export default function UnderConstructionPage() {
  return (
    <div className="container section">
      <header className="page-head">
        <p className="eyebrow">Under construction</p>
        <h1>This section is under construction</h1>
        <p className="lead">The course is being built and is not open yet. It will appear here when it is ready.</p>
      </header>
      <div className="card" style={{ display: "grid", gap: "var(--space-3)", maxWidth: "560px" }}>
        <p style={{ margin: 0 }}>In the meantime, you can work through Years 7 to 11 or use the practice questions.</p>
        <p style={{ margin: 0, display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
          <Link to="/year/11" className="btn">Year 11</Link>
          <Link to="/practice" className="btn btn-secondary">Practice questions</Link>
        </p>
      </div>
    </div>
  );
}
