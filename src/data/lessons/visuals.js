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
  "y12-u2-l4": {
    "Finding the features": {
      kind: "plot", x: [-2, 4], y: [-6, 4], xStep: 1, yStep: 2,
      curves: [{ f: (x) => x * x - 2 * x - 3, label: "y = x² − 2x − 3" }],
      points: [
        { x: 3, y: 0, label: "(3, 0)" },
        { x: -1, y: 0, label: "(−1, 0)" },
        { x: 0, y: -3, label: "(0, −3)" },
        { x: 1, y: -4, label: "turning point (1, −4)" },
      ],
      vlines: [{ x: 1, dashed: true }],
    },
  },

  "y12-u3-l3": {
    "Counting intersections with the discriminant": {
      kind: "plot", x: [-2, 3], y: [-1, 5], xStep: 1, yStep: 1,
      curves: [
        { f: (x) => x * x, label: "y = x²" },
        { pts: [[-2, -1], [3, 4]], label: "y = x + 1", colour: 1 },
      ],
      points: [
        { x: 1.62, y: 2.62, label: "2 solutions" },
        { x: -0.62, y: 0.38 },
      ],
    },
  },

  "y12-u3-l5": {
    "Sketch the quadratic": {
      kind: "plot", x: [-4, 5], y: [-8, 8], xStep: 1, yStep: 2,
      curves: [{ f: (x) => x * x - x - 6, label: "y = x² − x − 6" }],
      shade: [{ f: () => 0, g: (x) => x * x - x - 6, from: -2, to: 3, colour: 0 }],
      points: [{ x: -2, y: 0, label: "−2" }, { x: 3, y: 0, label: "3" }],
    },
  },

  "y12-u3-l6": {
    "Finding the region": {
      kind: "plot", x: [-1, 4], y: [-1, 4], xStep: 1, yStep: 1, equal: true,
      regions: [{ test: (x, y) => y >= x && x + y < 4 && x >= 0, colour: 0 }],
      curves: [
        { pts: [[-1, -1], [4, 4]], label: "y = x" },
        { pts: [[-1, 5], [4, 0]], label: "x + y = 4", colour: 1 },
      ],
      points: [{ x: 2, y: 2, label: "(2, 2)" }],
    },
  },


  /* ---------------- Cubics, quartics, reciprocals ---------------- */
  "y12-u4-l1": {
    "Sketching a factorised cubic": {
      kind: "plot", x: [-3, 4], y: [-8, 12], xStep: 1, yStep: 4,
      curves: [{ f: (x) => (x - 1) * (x + 2) * (x - 3), label: "y = (x − 1)(x + 2)(x − 3)" }],
      points: [
        { x: -2, y: 0, label: "−2" },
        { x: 1, y: 0, label: "1" },
        { x: 3, y: 0, label: "3" },
        { x: 0, y: 6, label: "(0, 6)" },
      ],
    },
    "Repeated roots@2": {
      kind: "plot", x: [-3, 3], y: [-2, 10], xStep: 1, yStep: 2,
      curves: [{ f: (x) => (x - 1) * (x - 1) * (x + 2), label: "y = (x − 1)²(x + 2)" }],
      points: [{ x: 1, y: 0, label: "touches at 1" }, { x: 0, y: 2, label: "(0, 2)" }],
    },
  },

  "y12-u4-l2": {
    "Quartic shape": {
      kind: "plot", x: [-3, 3], y: [-4, 12], xStep: 1, yStep: 2,
      curves: [{ f: (x) => x ** 4 - 5 * x * x + 4, label: "y = x⁴ − 5x² + 4" }],
      points: [
        { x: -2, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
        { x: 0, y: 4, label: "(0, 4)" },
      ],
    },
  },

  "y12-u4-l3": {
    "Two shapes": {
      kind: "plot", x: [-3, 3], y: [-3, 3], xStep: 1, yStep: 1, equal: true,
      curves: [
        { f: (x) => 1 / x, label: "y = 1/x" },
        { f: (x) => 1 / (x * x), label: "y = 1/x²", colour: 1 },
      ],
      vlines: [{ x: 0, dashed: true }],
      hlines: [{ y: 0, dashed: true }],
    },
    "Moved reciprocal graphs": {
      kind: "plot", x: [-6, 3], y: [-5, 4], xStep: 1, yStep: 1,
      curves: [{ f: (x) => 4 / (x + 2) - 1, label: "y = 4/(x + 2) − 1" }],
      vlines: [{ x: -2, dashed: true, label: "x = −2" }],
      hlines: [{ y: -1, dashed: true, label: "y = −1" }],
    },
  },

  /* ---------------- Solving and transforming ---------------- */
  "y12-u4-l4": {
    "Using two graphs": {
      kind: "plot", x: [-4, 3], y: [-4, 5], xStep: 1, yStep: 1,
      curves: [
        { f: (x) => 1 / x, label: "y = 1/x" },
        { pts: [[-4, -2], [3, 5]], label: "y = x + 2", colour: 1 },
      ],
      points: [
        { x: 0.41, y: 2.41, label: "x ≈ 0.41" },
        { x: -2.41, y: -0.41, label: "x ≈ −2.41" },
      ],
    },
  },

  "y12-u4-l5": {
    "Inside and outside the bracket": {
      kind: "plot", x: [-2, 6], y: [-1, 12], xStep: 1, yStep: 2,
      curves: [
        { f: (x) => x * x, label: "y = x²", dashed: true, labelAt: [-1.2, 1.44] },
        { f: (x) => (x - 2) * (x - 2) + 3, label: "y = (x − 2)² + 3", colour: 1, labelAt: [4.2, 7] },
      ],
      points: [
        { x: 0, y: 0, label: "(0, 0)" },
        { x: 2, y: 3, label: "(2, 3)" },
      ],
    },
  },

  "y12-u4-l6": {
    "Reflections": {
      kind: "plot", x: [-3, 3], y: [-8, 8], xStep: 1, yStep: 2,
      curves: [
        { f: (x) => x ** 3, label: "y = x³", dashed: true },
        { f: (x) => -(x ** 3), label: "y = −x³", colour: 1 },
      ],
    },
    "Stretches": {
      kind: "plot", x: [-3, 3], y: [-2, 12], xStep: 1, yStep: 2,
      curves: [
        { f: (x) => x * x, label: "y = x²", dashed: true },
        { f: (x) => 3 * x * x, label: "y = 3x²", colour: 1 },
      ],
    },
  },

  /* ---------------- Circles ---------------- */
  "y12-u5-l5": {
    "Centre and radius": {
      kind: "plot", x: [-2, 6], y: [-5, 3], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: circlePts(2, -1, 3), label: "(x − 2)² + (y + 1)² = 9" }],
      points: [{ x: 2, y: -1, label: "centre (2, −1)" }],
    },
  },

  "y12-u5-l6": {
    "Substitute and solve": {
      kind: "plot", x: [-7, 7], y: [-7, 7], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: circlePts(0, 0, 5), label: "x² + y² = 25" },
        { pts: [[-6, -5], [5, 6]], label: "y = x + 1", colour: 1 },
      ],
      points: [
        { x: 3, y: 4, label: "(3, 4)" },
        { x: -4, y: -3, label: "(−4, −3)" },
      ],
    },
  },

  /* ---------------- Trigonometry ---------------- */
  "y12-u8-l5": {
    "Shapes": {
      kind: "plot", x: [0, 360], y: [-1.5, 1.5], xStep: 90, yStep: 0.5,
      xLabel: "x (°)", labelEvery: 1,
      curves: [
        { f: sinDeg, from: 0, to: 360, label: "sin x", colour: 0 },
        { f: cosDeg, from: 0, to: 360, label: "cos x", colour: 1 },
      ],
      hlines: [{ y: 0, dashed: false }],
    },
  },

  /* ---------------- Vectors ---------------- */
  "y12-u9-l2": {
    "Position of the parts": {
      kind: "plot", x: [-1, 5], y: [-2, 3], xStep: 1, yStep: 1, equal: true,
      arrows: [{ from: [1, 2], to: [4, -1], label: "3i − 3j", colour: 0 }],
      points: [{ x: 1, y: 2, label: "A(1, 2)" }, { x: 4, y: -1, label: "B(4, −1)" }],
    },
  },

  /* ---------------- Integration ---------------- */
  "y12-u11-l5": {
    "Area as an integral": {
      kind: "plot", x: [-0.5, 2.5], y: [-0.5, 4.5], xStep: 1, yStep: 1,
      curves: [{ f: (x) => x * x, label: "y = x²", from: -0.5, to: 2.5 }],
      shade: [{ f: (x) => x * x, g: () => 0, from: 0, to: 2, colour: 0 }],
      hlines: [{ y: 0, dashed: false }],
      labelEvery: 1,
    },
  },

  "y12-u11-l7": {
    "Top minus bottom": {
      kind: "plot", x: [-2, 3], y: [-2, 5], xStep: 1, yStep: 1,
      curves: [
        { f: (x) => x + 2, label: "y = x + 2" },
        { f: (x) => x * x, label: "y = x²", colour: 1, labelAt: [-1.7, 2.89] },
      ],
      shade: [{ f: (x) => x + 2, g: (x) => x * x, from: -1, to: 2, colour: 2 }],
      points: [{ x: -1, y: 1, label: "x = −1" }, { x: 2, y: 4, label: "x = 2" }],
    },
  },

  /* ---------------- Exponentials ---------------- */
  "y12-u12-l1": {
    "Growth and decay": {
      kind: "plot", x: [-3, 3], y: [0, 8], xStep: 1, yStep: 2,
      curves: [
        { f: (x) => 2 ** x, label: "y = 2ˣ", colour: 0 },
        { f: (x) => 0.5 ** x, label: "y = (½)ˣ", colour: 1 },
      ],
      points: [{ x: 0, y: 1, label: "(0, 1)" }],
    },
  },

  /* ---------------- Histograms ---------------- */
  "y12-u15-l4": {
    "Area as frequency": {
      kind: "plot", x: [0, 40], y: [0, 2], xStep: 10, yStep: 0.5,
      xLabel: "age", yLabel: "frequency density",
      bars: [
        { x0: 0, x1: 10, h: 1 },
        { x0: 10, x1: 20, h: 1.5 },
        { x0: 20, x1: 40, h: 1.5 },
      ],
    },
  },

  /* ---------------- Probability trees ---------------- */
  "y12-u17-l4": {
    "Multiply along, add between": {
      kind: "tree",
      root: {
        children: [
          { p: "3/5", label: "Red", children: [
            { p: "2/4", label: "Red", result: "3/10" },
            { p: "2/4", label: "Blue", result: "3/10" },
          ] },
          { p: "2/5", label: "Blue", children: [
            { p: "3/4", label: "Red", result: "3/10" },
            { p: "1/4", label: "Blue", result: "1/10" },
          ] },
        ],
      },
    },
  },

  /* ---------------- Kinematics graphs ---------------- */
  "y12-u21-l1": {
    "Reading the graph": {
      kind: "plot", x: [0, 6], y: [0, 16], xStep: 1, yStep: 2, xLabel: "t (s)", yLabel: "s (m)",
      curves: [{ pts: [[0, 0], [3, 12], [6, 12]], label: "moving, then at rest" }],
      points: [{ x: 3, y: 12, label: "(3, 12)" }],
    },
  },

  "y12-u21-l2": {
    "Velocity–time graphs": {
      kind: "plot", x: [0, 6], y: [0, 24], xStep: 1, yStep: 4, xLabel: "t (s)", yLabel: "v (m s⁻¹)",
      curves: [{ pts: [[0, 10], [4, 20]], label: "v rises from 10 to 20" }],
      shade: [{ f: (t) => 10 + 2.5 * t, g: () => 0, from: 0, to: 4, colour: 0 }],
    },
  },

  /* ---------------- Forces ---------------- */
  "y12-u22-l1": {
    "Force diagrams": {
      kind: "forces",
      title: "a block",
      forces: [
        { deg: 0, label: "10 N", size: 1.0 },
        { deg: 180, label: "4 N", size: 0.4 },
        { deg: 90, label: "R", size: 1.0 },
        { deg: 270, label: "W", size: 1.0 },
      ],
    },
  },
};
