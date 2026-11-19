/* ==========================================================================
   VISUALS (GCSE, Years 7 to 11): diagrams for lessons that need a picture.
   Same format as visuals.js: lesson id, then heading.
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
const sq = (x, y) => [[x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1], [x, y]];
const L_SHAPE = [[0, 0], [6, 0], [6, 2], [3, 2], [3, 5], [0, 5], [0, 0]];

// Shared tree for two stages (a bag with 3 red and 2 blue, no replacement)
const bagTree = {
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
};

export const VISUALS_GCSE = {
  /* ---------------- Year 7 ---------------- */
  "y7-u8-l6": {
    "The rule": {
      kind: "plot", x: [-0.5, 4.5], y: [-0.5, 4], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: [[0, 0], [4, 0], [2.37, 2.83], [0, 0]], label: "triangle", colour: 0 }],
      points: [{ x: 0, y: 0, label: "50°" }, { x: 4, y: 0, label: "60°" }, { x: 2.37, y: 2.83, label: "?" }],
    },
  },

  "y7-u9-l3": {
    "½ × base × height": {
      kind: "plot", x: [-0.5, 7], y: [-0.5, 5], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: [[0, 0], [6, 0], [2, 4], [0, 0]], label: "area 12", colour: 0 }],
      vlines: [{ x: 2, dashed: true, label: "height 4" }],
    },
  },

  "y7-u9-l5": {
    "Split or subtract": {
      kind: "plot", x: [-0.5, 7], y: [-0.5, 6], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: L_SHAPE, label: "area 21", colour: 0 }],
    },
  },

  /* ---------------- Year 8 ---------------- */
  "y8-u5-l3": {
    "Substitute each x": {
      kind: "plot", x: [-2, 3], y: [-4, 4], xStep: 1, yStep: 1,
      curves: [{ pts: [[-2, -5], [3, 5]], label: "y = 2x − 1", colour: 0 }],
      points: [
        { x: -1, y: -3, label: "(−1, −3)" },
        { x: 0, y: -1, label: "(0, −1)" },
        { x: 2, y: 3, label: "(2, 3)" },
      ],
    },
  },

  "y8-u7-l2": {
    "More parts": {
      kind: "plot", x: [-1, 4], y: [-1, 4], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: circlePts(0, 0, 3), label: "circle", colour: 0 },
        { pts: [[0, 0], [3, 0], ...arcPts(3, 0, Math.PI / 2), [0, 0]], label: "sector", colour: 1 },
        { pts: [[0, 3], [3, 0]], label: "chord", colour: 2, dashed: true },
      ],
    },
  },

  "y8-u7-l5": {
    "Split the shape": {
      kind: "plot", x: [-0.5, 7], y: [-0.5, 6], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: L_SHAPE, label: "compound shape", colour: 0 }],
      vlines: [{ x: 3, dashed: true }],
    },
  },

  "y8-u8-l6": {
    "(n − 2) × 180°": {
      kind: "plot", x: [-4, 4], y: [-4, 4], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: circlePts(0, 0, 3, 6), label: "hexagon, sum = 720°", colour: 0 }],
    },
  },

  "y8-u9-l2": {
    "Faces become shapes": {
      kind: "plot", x: [-0.5, 4.5], y: [-0.5, 3.5], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: sq(1, 0), colour: 0 }, { pts: sq(0, 1), colour: 0 }, { pts: sq(1, 1), colour: 0 },
        { pts: sq(2, 1), colour: 0 }, { pts: sq(3, 1), colour: 0 }, { pts: sq(1, 2), colour: 0 },
      ],
    },
  },

  "y8-u10-l3": {
    "Add the vector": {
      kind: "plot", x: [-1, 8], y: [-2, 4], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: [[1, 1], [3, 1], [1, 3], [1, 1]], label: "shape", colour: 0 },
        { pts: [[5, -1], [7, -1], [5, 1], [5, -1]], label: "image", colour: 1 },
      ],
      arrows: [{ from: [1, 1], to: [5, -1], label: "(4, −2)", colour: 2 }],
    },
  },

  "y8-u10-l5": {
    "What to include": {
      kind: "plot", x: [-4, 4], y: [-1, 4], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: [[1, 1], [3, 1], [1, 3], [1, 1]], label: "shape", colour: 0 },
        { pts: [[-1, 1], [-3, 1], [-1, 3], [-1, 1]], label: "image", colour: 1 },
      ],
      vlines: [{ x: 0, dashed: true, label: "mirror line x = 0" }],
    },
  },

  "y8-u11-l5": {
    "Types": {
      kind: "plot", x: [0, 9], y: [0, 11], xStep: 1, yStep: 1,
      points: [
        { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 5 }, { x: 4, y: 4 },
        { x: 5, y: 6 }, { x: 6, y: 7 }, { x: 7, y: 8 }, { x: 8, y: 9 },
      ],
    },
    "Estimating": {
      kind: "plot", x: [0, 9], y: [0, 11], xStep: 1, yStep: 1,
      points: [
        { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 5 }, { x: 4, y: 4 },
        { x: 5, y: 6 }, { x: 6, y: 7 }, { x: 7, y: 8 }, { x: 8, y: 9 },
      ],
      curves: [{ pts: [[0.5, 1.6], [8.5, 9.6]], label: "line of best fit", colour: 1 }],
    },
  },

  /* ---------------- Year 9 ---------------- */
  "y9-u5-l1": {
    "Reading inequalities": {
      kind: "numberline", min: -5, max: 5, ticks: 10,
      segment: { a: -2, b: 3, aOpen: true, bOpen: false },
      points: [],
    },
  },

  "y9-u5-l2": {
    "Drawing": {
      kind: "numberline", min: -4, max: 4, ticks: 8,
      segment: { a: -1, b: 2, aOpen: true, bOpen: false },
      points: [],
    },
  },

  "y9-u5-l3": {
    "The rule": {
      kind: "numberline", min: -5, max: 5, ticks: 10,
      segment: { aInf: true, b: -3, bOpen: true },
      points: [],
    },
  },

  "y9-u6-l3": {
    "From a graph": {
      kind: "plot", x: [-2, 3], y: [-2, 6], xStep: 1, yStep: 1,
      curves: [{ pts: [[-2, -3], [3, 7]], label: "y = 2x + 1", colour: 0 }],
      points: [{ x: 0, y: 1, label: "c = 1" }],
    },
  },

  "y9-u6-l6": {
    "Reading": {
      kind: "plot", x: [0, 5], y: [0, 40], xStep: 1, yStep: 10, xLabel: "time (h)", yLabel: "distance (km)",
      curves: [{ pts: [[0, 0], [1, 20], [2, 20], [3, 40], [4, 0]], label: "journey", colour: 0 }],
    },
  },

  "y9-u9-l1": {
    "The theorem": {
      kind: "plot", x: [-0.5, 5], y: [-0.5, 3.5], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: [[0, 0], [4, 0], [0, 3], [0, 0]], label: "hypotenuse 5", colour: 0 }],
      points: [{ x: 4, y: 0, label: "right angle" }],
    },
  },

  "y9-u9-l5": {
    "The method": {
      kind: "plot", x: [0, 5], y: [0, 7], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: [[1, 2], [4, 2], [4, 6], [1, 2]], label: "difference 3 and 4", colour: 0 },
      ],
      points: [{ x: 1, y: 2, label: "(1, 2)" }, { x: 4, y: 6, label: "(4, 6)" }],
    },
  },

  "y9-u10-l1": {
    "Labelling": {
      kind: "plot", x: [-0.5, 5], y: [-0.5, 3.5], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: [[0, 0], [4, 0], [4, 3], [0, 0]], label: "hypotenuse", colour: 0 }],
      points: [{ x: 0, y: 0, label: "θ" }],
    },
  },

  "y9-u11-l2": {
    "The construction": {
      kind: "plot", x: [-2, 7], y: [-4, 4], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: circlePts(1, 0, 3), label: "arc from A", colour: 0, dashed: true, labelAt: [-1.12, 2.12] },
        { pts: circlePts(5, 0, 3), label: "arc from B", colour: 1, dashed: true, labelAt: [7.12, 2.12] },
        { pts: [[1, 0], [5, 0]], label: "AB", colour: 2, labelAt: [3, 0.45] },
      ],
      vlines: [{ x: 3, label: "perpendicular bisector" }],
      points: [{ x: 1, y: 0, label: "A" }, { x: 5, y: 0, label: "B" }],
    },
  },

  "y9-u11-l4": {
    "Regions": {
      kind: "plot", x: [-4, 4], y: [-4, 4], xStep: 1, yStep: 1, equal: true,
      regions: [{ test: (x, y) => x * x + y * y < 9, colour: 0 }],
      curves: [{ pts: circlePts(0, 0, 3), label: "3 m", colour: 0 }],
      points: [{ x: 0, y: 0, label: "centre" }],
    },
  },

  "y9-u11-l6": {
    "Plotting a route": {
      kind: "plot", x: [-1, 4], y: [-1, 5], xStep: 1, yStep: 1, equal: true,
      vlines: [{ x: 0, dashed: true, label: "N" }],
      arrows: [{ from: [0, 0], to: [2.57, 3.06], label: "040°", colour: 0 }],
    },
  },

  "y9-u13-l3": {
    "Multiply along, add between": { kind: "tree", root: bagTree },
  },

  /* ---------------- Year 10 ---------------- */
  "y10-u4-l2": {
    "The shape": {
      kind: "plot", x: [-1, 5], y: [0, 10], xStep: 1, yStep: 1,
      curves: [{ f: (x) => (x - 2) * (x - 2) + 1, label: "y = (x − 2)² + 1", colour: 0 }],
      points: [{ x: 2, y: 1, label: "lowest point (2, 1)" }],
    },
  },

  "y10-u4-l3": {
    "Roots": {
      kind: "plot", x: [-2, 4], y: [-5, 5], xStep: 1, yStep: 1,
      curves: [{ f: (x) => x * x - 2 * x - 3, label: "y = x² − 2x − 3" }],
      points: [{ x: -1, y: 0, label: "−1" }, { x: 3, y: 0, label: "3" }],
    },
  },

  "y10-u5-l5": {
    "The method": {
      kind: "plot", x: [-3, 3], y: [-1, 6], xStep: 1, yStep: 1,
      curves: [
        { f: (x) => x * x, label: "y = x²", colour: 0 },
        { pts: [[-3, -1], [3, 5]], label: "y = x + 2", colour: 1 },
      ],
      points: [{ x: -1, y: 1, label: "(−1, 1)" }, { x: 2, y: 4, label: "(2, 4)" }],
    },
  },

  "y10-u6-l2": {
    "Length": {
      kind: "plot", x: [0, 5], y: [0, 7], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: [[1, 2], [4, 2], [4, 6], [1, 2]], label: "right-angled triangle", colour: 0 }],
      points: [{ x: 1, y: 2, label: "A(1, 2)" }, { x: 4, y: 6, label: "B(4, 6)" }],
    },
  },

  "y10-u6-l4": {
    "Double inequalities": {
      kind: "numberline", min: -5, max: 5, ticks: 10,
      segment: { a: -2, b: 4, aOpen: true, bOpen: false },
      points: [],
    },
  },

  "y10-u6-l5": {
    "Reading a region": {
      kind: "plot", x: [-2, 5], y: [-1, 6], xStep: 1, yStep: 1, equal: true,
      regions: [{ test: (x, y) => y >= 1 && x <= 3 && y <= x + 2, colour: 0 }],
      curves: [
        { pts: [[-2, 1], [5, 1]], label: "y = 1", colour: 0 },
        { pts: [[3, -1], [3, 6]], label: "x = 3", colour: 1 },
        { pts: [[-2, 0], [4, 6]], label: "y = x + 2", colour: 2 },
      ],
    },
  },

  "y10-u7-l5": {
    "Shapes": {
      kind: "plot", x: [-1, 6], y: [-1, 8], xStep: 1, yStep: 1,
      curves: [
        { pts: [[0, 0], [5, 10]], label: "direct: y = 2x", colour: 0 },
        { f: (x) => 6 / x, label: "inverse: y = 6/x", colour: 1 },
      ],
    },
  },

  "y10-u8-l3": {
    "Spotting similarity": {
      kind: "plot", x: [-1, 11], y: [-1, 7], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: [[0, 0], [10, 0], [0, 6], [0, 0]], label: "triangle ABC", colour: 0 },
        { pts: [[4, 0], [0, 2.4]], label: "DE", colour: 1 },
      ],
      points: [
        { x: 0, y: 0, label: "A" }, { x: 10, y: 0, label: "B" }, { x: 0, y: 6, label: "C" },
        { x: 4, y: 0, label: "D" }, { x: 0, y: 2.4, label: "E" },
      ],
    },
  },

  "y10-u11-l1": {
    "Plotting": {
      kind: "plot", x: [0, 40], y: [0, 50], xStep: 10, yStep: 10, xLabel: "upper boundary", yLabel: "cumulative frequency",
      curves: [{ pts: [[0, 0], [10, 5], [20, 18], [30, 40], [40, 50]], label: "cumulative frequency", colour: 0 }],
    },
    "The median": {
      kind: "plot", x: [0, 40], y: [0, 50], xStep: 10, yStep: 10, xLabel: "upper boundary", yLabel: "cumulative frequency",
      curves: [{ pts: [[0, 0], [10, 5], [20, 18], [30, 40], [40, 50]], label: "cumulative frequency", colour: 0 }],
      hlines: [{ y: 25, dashed: true, label: "n ÷ 2 = 25" }],
    },
  },

  "y10-u11-l3": {
    "Reading one": {
      kind: "boxplot", min: 2, q1: 4, med: 6, q3: 9, max: 12, axis: [0, 14], step: 2,
      description: "Box plot with minimum 2, lower quartile 4, median 6, upper quartile 9 and maximum 12.",
    },
  },

  "y10-u11-l5": {
    "Drawing": {
      kind: "plot", x: [0, 40], y: [0, 2], xStep: 10, yStep: 0.5, xLabel: "age", yLabel: "frequency density",
      bars: [
        { x0: 0, x1: 10, h: 1 },
        { x0: 10, x1: 20, h: 1.5 },
        { x0: 20, x1: 40, h: 1.5 },
      ],
    },
  },

  /* ---------------- Year 11 ---------------- */
  "y11-u1-l1": {
    "Writing and finding vectors": {
      kind: "plot", x: [-1, 4], y: [-3, 2], xStep: 1, yStep: 1, equal: true,
      arrows: [{ from: [0, 0], to: [3, -2], label: "(3, −2)", colour: 0 }],
    },
  },

  "y11-u1-l3": {
    "The journey method": {
      kind: "plot", x: [-1, 6], y: [-1, 4], xStep: 1, yStep: 1, equal: true,
      arrows: [
        { from: [0, 0], to: [2, 3], label: "OA", colour: 0 },
        { from: [2, 3], to: [5, 1], label: "AB", colour: 1 },
        { from: [0, 0], to: [5, 1], label: "OB", colour: 2 },
      ],
    },
  },

  "y11-u1-l4": {
    "Parallel and collinear": {
      kind: "plot", x: [0, 8], y: [0, 5], xStep: 1, yStep: 1, equal: true,
      arrows: [
        { from: [1, 1], to: [3, 2], label: "AB", colour: 0 },
        { from: [1, 1], to: [7, 4], label: "AC = 3AB", colour: 1 },
      ],
    },
  },

  "y11-u2-l2": {
    "Exponential graphs": {
      kind: "plot", x: [-3, 3], y: [0, 8], xStep: 1, yStep: 2,
      curves: [{ f: (x) => 2 ** x, label: "y = 2ˣ" }],
      points: [{ x: 0, y: 1, label: "(0, 1)" }],
    },
  },

  "y11-u2-l5": {
    "Changes outside and inside the bracket": {
      kind: "plot", x: [-1, 5], y: [-1, 10], xStep: 1, yStep: 2,
      curves: [
        { f: (x) => x * x, label: "y = x²", dashed: true },
        { f: (x) => (x - 2) * (x - 2) + 1, label: "y = (x − 2)² + 1", colour: 1 },
      ],
    },
  },

  "y11-u4-l1": {
    "Reading the graph": {
      kind: "plot", x: [0, 4], y: [0, 40], xStep: 1, yStep: 10, xLabel: "time (h)", yLabel: "distance (km)",
      curves: [{ pts: [[0, 0], [1, 30], [2, 30], [3, 0]], label: "journey", colour: 0 }],
    },
  },

  "y11-u4-l3": {
    "Estimating under a curve": {
      kind: "plot", x: [-0.2, 3.2], y: [0, 11], xStep: 1, yStep: 2,
      curves: [{ f: (x) => x * x + 1, from: 0, to: 3, label: "y = x² + 1", colour: 0 }],
      vlines: [{ x: 1, dashed: true }, { x: 2, dashed: true }],
      points: [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 5 }, { x: 3, y: 10 }],
    },
  },

  "y11-u4-l4": {
    "Tangent and chord": {
      kind: "plot", x: [-1, 3], y: [-1, 6], xStep: 1, yStep: 1,
      curves: [
        { f: (x) => x * x, label: "y = x²", colour: 0 },
        { pts: [[-0.5, -2], [2.5, 5]], label: "tangent at x = 1", colour: 1 },
        { pts: [[0, 0], [2, 4]], label: "chord", colour: 2, dashed: true },
      ],
    },
  },

  "y11-u5-l1": {
    "Roots, sketch, read": {
      kind: "plot", x: [-2, 4], y: [-5, 5], xStep: 1, yStep: 1,
      curves: [{ f: (x) => x * x - 2 * x - 3, label: "y = x² − 2x − 3" }],
      points: [{ x: -1, y: 0, label: "−1" }, { x: 3, y: 0, label: "3" }],
    },
  },

  "y11-u5-l2": {
    "Circle equations": {
      kind: "plot", x: [-1, 5], y: [-2, 4], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: circlePts(2, 1, 2), label: "(x − 2)² + (y − 1)² = 4", colour: 0 }],
      points: [{ x: 2, y: 1, label: "centre (2, 1)" }],
    },
  },

  "y11-u5-l3": {
    "The method": {
      kind: "plot", x: [-6, 9], y: [-6, 8], xStep: 1, yStep: 2, equal: true,
      curves: [
        { pts: circlePts(0, 0, 5), label: "x² + y² = 25", colour: 0 },
        { pts: [[-1, 7], [8, 0.25]], label: "tangent", colour: 1 },
      ],
      points: [{ x: 3, y: 4, label: "(3, 4)" }],
    },
  },

  "y11-u6-l6": {
    "Proving the angle at the centre": {
      kind: "plot", x: [-4, 4], y: [-4, 4], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: circlePts(0, 0, 3), label: "circle", colour: 0 },
        { pts: [[0, 0], [3, 0]], label: "radius OA", colour: 1, dashed: true },
        { pts: [[0, 0], [-1.5, 2.6]], label: "radius OB", colour: 2, dashed: true },
        { pts: [[3, 0], [-1.5, 2.6], [0, -3], [3, 0]], label: "triangle ABC", colour: 3 },
      ],
      points: [
        { x: 0, y: 0, label: "O" }, { x: 3, y: 0, label: "A" },
        { x: -1.5, y: 2.6, label: "B" }, { x: 0, y: -3, label: "C" },
      ],
    },
  },

  "y11-u7-l1": {
    "From the origin or another centre": {
      kind: "plot", x: [-0.5, 5], y: [-0.5, 5], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: [[1, 1], [2, 1], [1, 2], [1, 1]], label: "shape", colour: 0 },
        { pts: [[2, 2], [4, 2], [2, 4], [2, 2]], label: "enlarged ×2", colour: 1 },
      ],
    },
  },

  "y11-u7-l4": {
    "Invariant points": {
      kind: "plot", x: [-1, 4], y: [-1, 4], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: [[-1, -1], [4, 4]], label: "mirror line y = x", colour: 0 }],
      points: [{ x: 2, y: 2, label: "invariant" }],
    },
  },

  "y11-u8-l3": {
    "Plan, draw, multiply, add": {
      kind: "tree",
      root: {
        children: [
          { p: "0.3", label: "Rain", children: [
            { p: "0.2", label: "Late", result: "0.06" },
            { p: "0.8", label: "On time", result: "0.24" },
          ] },
          { p: "0.7", label: "Dry", children: [
            { p: "0.1", label: "Late", result: "0.07" },
            { p: "0.9", label: "On time", result: "0.63" },
          ] },
        ],
      },
    },
  },
};
