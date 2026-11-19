/* ==========================================================================
   VISUALS (remaining lessons that benefit from a picture). Same format as
   visuals.js: lesson id, then heading. Uses the diagram kinds already in the
   app: plot, numberline, tree, venn, bars, boxplot, labelled, forces.
   ========================================================================== */

const circlePts = (cx, cy, r, n = 180) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = (2 * Math.PI * i) / n;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  });
const arcPts = (r, a, b, n = 60) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = a + ((b - a) * i) / n;
    return [r * Math.cos(t), r * Math.sin(t)];
  });
const pathPts = (fx, fy, t0, t1, n = 120) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = t0 + ((t1 - t0) * i) / n;
    return [fx(t), fy(t)];
  });
const degToRad = (d) => (d * Math.PI) / 180;

// Probability tree for two independent events: A (0.6 yes), then B (0.3 yes)
const independentTree = {
  children: [
    { p: "0.6", label: "A yes", children: [
      { p: "0.3", label: "B yes", result: "0.18" },
      { p: "0.7", label: "B no", result: "0.42" },
    ] },
    { p: "0.4", label: "A no", children: [
      { p: "0.3", label: "B yes", result: "0.12" },
      { p: "0.7", label: "B no", result: "0.28" },
    ] },
  ],
};

export const VISUALS_REMAINING = {
  /* ---------------- Number and algebra ---------------- */
  "y8-u1-l1": {
    "Two signs together": {
      kind: "numberline", min: -6, max: 6, ticks: 12,
      points: [
        { value: 3, label: "start: 3" },
        { value: -2, label: "3 + (−5) = −2" },
      ],
    },
  },

  "y9-u6-l5": {
    "Meaning": {
      kind: "plot", x: [0, 10], y: [0, 25], xStep: 1, yStep: 5, xLabel: "miles", yLabel: "fare (£)",
      curves: [{ pts: [[0, 3], [10, 23]], label: "fare = £3 + £2 per mile", colour: 0 }],
      points: [{ x: 0, y: 3, label: "fixed charge £3" }],
    },
  },






  /* ---------------- Sets and probability ---------------- */
  "y9-u13-l1": {
    "Using a grid": {
      kind: "plot", x: [0.5, 6.5], y: [0.5, 6.5], xStep: 1, yStep: 1, equal: true,
      xLabel: "first die", yLabel: "second die",
      points: [1, 2, 3, 4, 5, 6].flatMap((a) => [1, 2, 3, 4, 5, 6].map((b) => ({ x: a, y: b }))),
    },
  },

  "y9-u13-l2": {
    "Reading the regions": {
      kind: "venn", a: 7, both: 5, b: 4, out: 4, labels: ["Maths", "Art"],
      description: "Venn diagram of 20 students: Maths only 7, both 5, Art only 4, neither 4.",
    },
  },

  "y10-u12-l3": {
    "Reading regions": {
      kind: "venn", a: 7, both: 5, b: 4, out: 4, labels: ["A", "B"],
      description: "Venn diagram: A only 7, both 5, B only 4, neither 4.",
    },
  },

  "y10-u12-l1": {
    "Multiply along, add between": { kind: "tree", root: independentTree },
  },

  /* ---------------- Time series and graphs ---------------- */
  "y8-u11-l3": {
    "Reading": {
      kind: "plot", x: [6, 18], y: [0, 22], xStep: 2, yStep: 4, xLabel: "time (h)", yLabel: "temperature (°C)",
      curves: [{ pts: [[6, 8], [8, 10], [10, 13], [12, 17], [14, 19], [16, 18], [18, 14]], label: "temperature", colour: 0 }],
    },
  },

  "y9-u12-l5": {
    "Reading": {
      kind: "plot", x: [1, 6], y: [0, 40], xStep: 1, yStep: 10, xLabel: "month", yLabel: "sales (£100s)",
      curves: [{ pts: [[1, 20], [2, 24], [3, 22], [4, 30], [5, 28], [6, 35]], label: "sales", colour: 0 }],
    },
  },

  "y10-u11-l2": {
    "From a graph": {
      kind: "plot", x: [0, 40], y: [0, 50], xStep: 10, yStep: 10, xLabel: "upper boundary", yLabel: "cumulative frequency",
      curves: [{ pts: [[0, 0], [10, 5], [20, 18], [30, 40], [40, 50]], label: "cumulative frequency", colour: 0 }],
      hlines: [{ y: 12.5, dashed: true, label: "LQ at n/4" }, { y: 37.5, dashed: true, label: "UQ at 3n/4" }],
    },
  },

  /* ---------------- Geometry and trigonometry ---------------- */
  "y7-u8-l7": {
    "The rule": {
      kind: "plot", x: [-0.5, 7], y: [-0.5, 5], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: [[0, 0], [5, 0], [6, 4], [1, 3], [0, 0]], label: "quadrilateral", colour: 0 },
        { pts: [[0, 0], [6, 4]], label: "diagonal", colour: 1, dashed: true },
      ],
    },
  },

  "y8-u7-l3": {
    "C = πd = 2πr": {
      kind: "plot", x: [-4, 4], y: [-4, 4], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: circlePts(0, 0, 3), label: "circle", colour: 0 }],
      points: [{ x: 0, y: 0, label: "centre" }],
      vlines: [{ x: 0, dashed: true }],
    },
  },

  "y8-u7-l4": {
    "A = πr²": {
      kind: "plot", x: [-4, 4], y: [-4, 4], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: circlePts(0, 0, 3), label: "circle", colour: 0 },
        { pts: [[0, 0], [3, 0]], label: "radius r", colour: 1, dashed: true },
      ],
    },
  },

  "y9-u9-l4": {
    "Find the triangle": {
      kind: "plot", x: [-0.5, 6], y: [-0.5, 5], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: [[0, 0], [6, 0], [3, 4], [0, 0]], label: "isosceles triangle", colour: 0 },
        { pts: [[3, 0], [3, 4]], label: "altitude splits into two right triangles", colour: 1, dashed: true },
      ],
    },
  },

  "y9-u10-l3": {
    "Using sin and cos": {
      kind: "labelled", pts: [[0, 0], [8.66, 0], [0, 5]], names: ["A", "B", "C"],
      sides: ["adjacent", "hypotenuse 10", "opposite"], angles: ["", "30°", ""],
    },
  },

  "y9-u11-l1": {
    "Three sides (SSS)": {
      kind: "labelled", pts: [[0, 0], [4, 0], [3.375, 4.96]], names: ["A", "B", "C"],
      sides: ["4 cm", "5 cm", "6 cm"], angles: ["", "", ""],
    },
  },

  "y9-u11-l3": {
    "The construction": {
      kind: "plot", x: [-1, 5], y: [-1, 4], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: [[0, 0], [4.5, 0]], label: "arm", colour: 0 },
        { pts: [[0, 0], [4.5 * Math.cos(degToRad(60)), 4.5 * Math.sin(degToRad(60))]], label: "arm", colour: 0 },
        { pts: [[0, 0], [4 * Math.cos(degToRad(30)), 4 * Math.sin(degToRad(30))]], label: "bisector", colour: 1, dashed: true },
        { pts: arcPts(2, 0, degToRad(60)), label: "construction arc", colour: 2, dashed: true },
      ],
    },
  },

  "y9-u11-l5": {
    "Three rules": {
      kind: "plot", x: [-1, 4], y: [-1, 5], xStep: 1, yStep: 1, equal: true,
      vlines: [{ x: 0, dashed: true, label: "N" }],
      arrows: [{ from: [0, 0], to: [4 * Math.sin(degToRad(50)), 4 * Math.cos(degToRad(50))], label: "050°", colour: 0 }],
    },
  },

  "y10-u9-l5": {
    "The formula": {
      kind: "labelled", pts: [[0, 0], [5, 0], [3.5, 6.06]], names: ["A", "B", "C"],
      sides: ["c", "a", "b"], angles: ["", "", "C"],
    },
  },

  "y10-u9-l2": {
    "The special triangles": {
      kind: "labelled", pts: [[0, 0], [1, 0], [0, 1]], names: ["A", "B", "C"],
      sides: ["1", "√2", "1"], angles: ["90°", "45°", "45°"],
    },
  },

  "y11-u1-l2": {
    "Top with top, bottom with bottom": {
      kind: "plot", x: [-1, 5], y: [-2, 3], xStep: 1, yStep: 1, equal: true,
      arrows: [
        { from: [0, 0], to: [1, 2], label: "a", colour: 0 },
        { from: [1, 2], to: [3, 1], label: "b", colour: 1 },
        { from: [0, 0], to: [3, 1], label: "a + b", colour: 2 },
      ],
    },
  },

  "y11-u7-l2": {
    "Smaller images": {
      kind: "plot", x: [-0.5, 5], y: [-0.5, 5], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: [[2, 2], [4, 2], [2, 4], [2, 2]], label: "original", colour: 0 },
        { pts: [[1, 1], [2, 1], [1, 2], [1, 1]], label: "×½ from the origin", colour: 1 },
      ],
    },
  },



  /* ---------------- Vectors and calculus ---------------- */








};
