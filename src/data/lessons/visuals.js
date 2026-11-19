/* ==========================================================================
   VISUALS: diagrams attached to teaching steps
   --------------------------------------------------------------------------
   Each lesson id maps to { heading: diagram }. The diagram is drawn above the
   key-point box in that step. The diagram "kind" tells the renderer what to
   draw (see components/Diagram.jsx and components/Plot.jsx):
     plot    graph with axes, curves, points, shading, regions, arrows
     tree    probability tree
     forces  force diagram (optionally on a slope)
     bars    bar chart
   Diagrams are written from the same numbers used in the lesson text, so the
   picture and the worked example always agree.
   The key is the heading text. Use "Heading@2" for a repeated heading.
   ========================================================================== */

// A full circle as a list of points, for drawing with a plot
const circlePts = (cx, cy, r, n = 180) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = (2 * Math.PI * i) / n;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  });

const sinDeg = (x) => Math.sin((x * Math.PI) / 180);
const cosDeg = (x) => Math.cos((x * Math.PI) / 180);

export const VISUALS = {
  /* ---------------- Quadratics ---------------- */





  /* ---------------- Cubics, quartics, reciprocals ---------------- */



  /* ---------------- Solving and transforming ---------------- */



  /* ---------------- Circles ---------------- */


  /* ---------------- Trigonometry ---------------- */

  /* ---------------- Vectors ---------------- */

  /* ---------------- Integration ---------------- */


  /* ---------------- Exponentials ---------------- */

  /* ---------------- Histograms ---------------- */

  /* ---------------- Probability trees ---------------- */

  /* ---------------- Kinematics graphs ---------------- */


  /* ---------------- Forces ---------------- */
};
