/* ==========================================================================
   VISUALS (Year 12, second set): diagrams for the remaining Year 12 lessons
   that need a picture. Same format as visuals.js: lesson id, then heading.
   ========================================================================== */

const circlePts = (cx, cy, r, n = 180) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = (2 * Math.PI * i) / n;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  });
const sinDeg = (x) => Math.sin((x * Math.PI) / 180);

export const VISUALS_Y12_MORE = {
  "y12-u2-l5": {
    "The discriminant": {
      kind: "plot", x: [-1, 5], y: [-2, 6], xStep: 1, yStep: 1,
      curves: [
        { f: (x) => x * x - 4 * x + 3, label: "b² − 4ac > 0: 2 roots", colour: 0 },
        { f: (x) => x * x - 4 * x + 4, label: "= 0: 1 repeated root", colour: 1 },
        { f: (x) => x * x - 4 * x + 5, label: "< 0: no real roots", colour: 2 },
      ],
      hlines: [{ y: 0, dashed: false }],
    },
  },

  "y12-u2-l6": {
    "Maximum height of a projectile": {
      kind: "plot", x: [0, 4], y: [0, 24], xStep: 1, yStep: 4, xLabel: "t (s)", yLabel: "h (m)",
      curves: [{ f: (t) => 20 * t - 5 * t * t, from: 0, to: 4, label: "h = 20t − 5t²" }],
      points: [{ x: 2, y: 20, label: "maximum 20 m at t = 2" }],
      vlines: [{ x: 2, dashed: true }],
    },
  },

  "y12-u4-l7": {
    "Apply the rule to every feature@2": {
      kind: "plot", x: [-3, 6], y: [-5, 6], xStep: 1, yStep: 1,
      curves: [
        { f: (x) => x * x - 4, label: "y = x² − 4", colour: 0 },
        { f: (x) => (x - 3) * (x - 3) - 3, label: "y = f(x − 3) + 1", colour: 1 },
      ],
      points: [{ x: 0, y: -4, label: "(0, −4)" }, { x: 3, y: -3, label: "(3, −3)" }],
    },
  },

  "y12-u5-l3": {
    "Distance@2": {
      kind: "plot", x: [-1, 5], y: [-1, 7], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: [[1, 2], [4, 6]], label: "distance 5", colour: 0 }],
      points: [{ x: 1, y: 2, label: "(1, 2)" }, { x: 4, y: 6, label: "(4, 6)" }],
    },
    "Area of a triangle": {
      kind: "plot", x: [-1, 5], y: [-1, 4], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: [[0, 0], [4, 0], [0, 3], [0, 0]], label: "area 6", colour: 0 }],
      points: [{ x: 0, y: 0, label: "(0, 0)" }, { x: 4, y: 0, label: "(4, 0)" }, { x: 0, y: 3, label: "(0, 3)" }],
    },
  },

  "y12-u5-l7": {
    "Tangent perpendicular to the radius": {
      kind: "plot", x: [-6, 9], y: [-6, 8], xStep: 1, yStep: 2, equal: true,
      curves: [
        { pts: circlePts(0, 0, 5), label: "x² + y² = 25", colour: 0 },
        { pts: [[-1, 7], [8, 0.25]], label: "tangent", colour: 1 },
        { pts: [[0, 0], [3, 4]], label: "radius", colour: 2, dashed: true },
      ],
      points: [{ x: 3, y: 4, label: "(3, 4)" }],
    },
  },

  "y12-u5-l8": {
    "Angle in a semicircle": {
      kind: "plot", x: [-4, 4], y: [-1, 4], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: circlePts(0, 0, 3), label: "circle, centre O", colour: 0 },
        { pts: [[-3, 0], [3, 0], [0, 3], [-3, 0]], label: "triangle ABC", colour: 1 },
      ],
      points: [{ x: -3, y: 0, label: "A" }, { x: 3, y: 0, label: "B" }, { x: 0, y: 3, label: "C" }],
    },
  },

  "y12-u8-l9": {
    "Finding the rest": {
      kind: "plot", x: [0, 360], y: [-1.2, 1.2], xStep: 90, yStep: 0.5, xLabel: "x (°)",
      curves: [{ f: (x) => sinDeg(x), from: 0, to: 360, label: "sin x", colour: 0 }],
      hlines: [{ y: 0.5, dashed: true, label: "sin x = 0.5" }],
      points: [{ x: 30, y: 0.5, label: "30°" }, { x: 150, y: 0.5, label: "150°" }],
    },
  },

  "y12-u9-l1": {
    "Adding and scaling": {
      kind: "plot", x: [-2, 6], y: [-9, 5], xStep: 1, yStep: 2, equal: true,
      arrows: [
        { from: [0, 0], to: [3, -2], label: "a", colour: 0 },
        { from: [0, 0], to: [1, 4], label: "b", colour: 1 },
        { from: [0, 0], to: [5, -8], label: "2a − b", colour: 2 },
      ],
    },
  },

  "y12-u9-l3": {
    "Direction": {
      kind: "plot", x: [-1, 4], y: [-1, 5], xStep: 1, yStep: 1, equal: true,
      arrows: [{ from: [0, 0], to: [3, 4], label: "3i + 4j", colour: 0 }],
      hlines: [{ y: 0, dashed: false }],
    },
  },

  "y12-u9-l4": {
    "Position vectors": {
      kind: "plot", x: [-1, 5], y: [-1, 7], xStep: 1, yStep: 1, equal: true,
      arrows: [
        { from: [0, 0], to: [1, 2], label: "a", colour: 0 },
        { from: [0, 0], to: [4, 6], label: "b", colour: 1 },
        { from: [1, 2], to: [4, 6], label: "AB = 3i + 4j", colour: 2 },
      ],
    },
  },

  "y12-u9-l5": {
    "Collinear points@2": {
      kind: "plot", x: [0, 6], y: [0, 8], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: [[0, 1], [6, 7]], label: "y = x + 1", colour: 0 }],
      points: [{ x: 1, y: 2, label: "A" }, { x: 3, y: 4, label: "B" }, { x: 5, y: 6, label: "C" }],
    },
  },

  "y12-u10-l1": {
    "Chords and tangents": {
      kind: "plot", x: [-0.5, 3], y: [-1, 9], xStep: 1, yStep: 1,
      curves: [
        { f: (x) => x * x, label: "y = x²", colour: 0 },
        { pts: [[1, 1], [2, 4]], label: "chord", colour: 1 },
        { pts: [[0, -1], [2.5, 4]], label: "tangent at x = 1", colour: 2 },
      ],
      points: [{ x: 1, y: 1, label: "(1, 1)" }, { x: 2, y: 4, label: "(2, 4)" }],
    },
  },

  "y12-u10-l6": {
    "Finding where it increases": {
      kind: "plot", x: [-2.5, 2.5], y: [-4, 4], xStep: 1, yStep: 1,
      curves: [{ f: (x) => x ** 3 - 3 * x, label: "y = x³ − 3x" }],
      points: [{ x: -1, y: 2, label: "(−1, 2)" }, { x: 1, y: -2, label: "(1, −2)" }],
    },
  },

  "y12-u11-l3": {
    "Using a point": {
      kind: "plot", x: [-2, 2], y: [0, 10], xStep: 1, yStep: 2,
      curves: [{ f: (x) => x ** 3 - x + 4, label: "y = x³ − x + 4" }],
      points: [{ x: 1, y: 4, label: "(1, 4)" }],
    },
  },

  "y12-u12-l2": {
    "Differentiating eˣ": {
      kind: "plot", x: [-2, 2.5], y: [-1, 8], xStep: 1, yStep: 1,
      curves: [
        { f: (x) => Math.exp(x), label: "y = eˣ", colour: 0 },
        { pts: [[-1, 0], [2, 3]], label: "gradient 1 at (0, 1)", colour: 1 },
      ],
      points: [{ x: 0, y: 1, label: "(0, 1)" }],
    },
  },

  "y12-u12-l8": {
    "Finding the constants": {
      kind: "plot", x: [-0.5, 3], y: [0, 60], xStep: 1, yStep: 10,
      curves: [{ f: (x) => 2 * 3 ** x, from: -0.5, to: 3, label: "y = 2 × 3ˣ" }],
      points: [{ x: 0, y: 2, label: "(0, 2)" }, { x: 1, y: 6, label: "(1, 6)" }],
    },
  },

  "y12-u15-l2": {
    "The five-number summary": {
      kind: "boxplot", min: 2, q1: 4, med: 6, q3: 9, max: 12, axis: [0, 14], step: 2,
      description: "Box plot with minimum 2, lower quartile 4, median 6, upper quartile 9 and maximum 12.",
    },
  },

  "y12-u15-l3": {
    "Reading the graph": {
      kind: "plot", x: [0, 40], y: [0, 50], xStep: 10, yStep: 10,
      xLabel: "upper boundary", yLabel: "cumulative frequency",
      curves: [{ pts: [[0, 0], [10, 5], [20, 18], [30, 40], [40, 50]], label: "cumulative frequency", colour: 0 }],
      hlines: [{ y: 25, dashed: true, label: "n/2" }],
    },
  },

  "y12-u16-l1": {
    "Describing correlation": {
      kind: "plot", x: [0, 10], y: [0, 22], xStep: 1, yStep: 4,
      xLabel: "x", yLabel: "y",
      points: [
        { x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 7 }, { x: 4, y: 8 }, { x: 5, y: 11 },
        { x: 6, y: 12 }, { x: 7, y: 15 }, { x: 8, y: 16 }, { x: 9, y: 19 },
      ],
      curves: [{ pts: [[0.5, 1.5], [9.5, 20]], label: "strong positive", colour: 0, dashed: true }],
    },
  },

  "y12-u17-l2": {
    "Overlapping events": {
      kind: "venn", a: 0.3, both: 0.2, b: 0.2, out: 0.3, labels: ["A", "B"],
      description: "Venn diagram: A only 0.3, both 0.2, B only 0.2, neither 0.3.",
    },
  },

  "y12-u20-l4": {
    "Speed from velocity": {
      kind: "plot", x: [-1, 5], y: [-1, 5], xStep: 1, yStep: 1, equal: true,
      arrows: [{ from: [0, 0], to: [3, 4], label: "v = 3i + 4j", colour: 0 }],
    },
  },

  "y12-u22-l2": {
    "Components": {
      kind: "plot", x: [-2, 4], y: [-1, 7], xStep: 1, yStep: 1, equal: true,
      arrows: [
        { from: [0, 0], to: [3, 4], label: "3i + 4j", colour: 0 },
        { from: [0, 0], to: [-1, 2], label: "−i + 2j", colour: 1 },
        { from: [0, 0], to: [2, 6], label: "resultant 2i + 6j", colour: 2 },
      ],
    },
  },
};
