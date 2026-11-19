/* ==========================================================================
   VISUALS (shapes and charts): pie charts, 3D solids, labelled triangles and
   a sector. Same format as visuals.js: lesson id, then heading.
   ========================================================================== */

const arcPts = (r, a, b, n = 60) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = a + ((b - a) * i) / n;
    return [r * Math.cos(t), r * Math.sin(t)];
  });

export const VISUALS_SHAPES = {
  /* ---------------- Pie charts ---------------- */
  "y8-u11-l1": {
    "Angle per person": {
      kind: "pie",
      items: [{ label: "Bus", value: 6 }, { label: "Car", value: 9 }, { label: "Walk", value: 4 }, { label: "Cycle", value: 5 }],
    },
  },

  "y11-u8-l1": {
    "Matching diagram to data": {
      kind: "pie",
      items: [{ label: "Apples", value: 12 }, { label: "Bananas", value: 6 }, { label: "Pears", value: 9 }, { label: "Grapes", value: 3 }],
    },
  },

  /* ---------------- 3D solids ---------------- */
  "y8-u9-l3": {
    "Three pairs": { kind: "solid", shape: "cuboid", l: 4, w: 3, h: 2, labels: { l: "l", w: "w", h: "h" } },
  },

  "y8-u9-l4": {
    "l × w × h": { kind: "solid", shape: "cuboid", l: 4, w: 3, h: 2, labels: { l: "l", w: "w", h: "h" } },
  },

  "y10-u9-l6": {
    "The longest diagonal": { kind: "solid", shape: "cuboid", l: 4, w: 3, h: 2, diagonal: true, labels: { l: "l", w: "w", h: "h", d: "d" } },
  },

  "y10-u10-l2": {
    "Volume": { kind: "solid", shape: "cylinder", labels: { r: "r", h: "h" } },
  },

  "y10-u10-l3": {
    "Add every face": { kind: "solid", shape: "cylinder", labels: { r: "r", h: "h" } },
  },

  "y10-u10-l4": {
    "Formulae": { kind: "solid", shape: "cone", labels: { r: "r", h: "h" } },
  },

  "y10-u10-l5": {
    "Pyramids": { kind: "solid", shape: "pyramid", l: 4, w: 4, h: 3, labels: { l: "base", h: "h" } },
  },

  /* ---------------- Sector ---------------- */
  "y10-u10-l1": {
    "The fraction": {
      kind: "plot", x: [-1, 6], y: [-1, 6], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: [[0, 0], [5, 0], ...arcPts(5, 0, (2 * Math.PI) / 3), [0, 0]], label: "sector, θ = 120°", colour: 0 }],
    },
  },

  /* ---------------- Labelled triangles ---------------- */
  "y10-u9-l1": {
    "Choosing the ratio": {
      kind: "labelled", pts: [[0, 0], [6, 0], [6, 4]], names: ["A", "B", "C"],
      sides: ["adjacent", "opposite", "hypotenuse"], angles: ["θ", "", ""],
    },
  },

  "y9-u10-l4": {
    "Four steps": {
      kind: "labelled", pts: [[0, 0], [8, 0], [8, 6]], names: ["A", "B", "C"],
      sides: ["x", "6 cm", "10 cm"], angles: ["36.9°", "", ""],
    },
  },

  "y10-u9-l3": {
    "Finding a side": {
      kind: "labelled", pts: [[0, 0], [7, 0], [2, 5]], names: ["A", "B", "C"],
      sides: ["c = 7 cm", "a", "b"], angles: ["A", "B", "C"],
    },
  },

  "y10-u9-l4": {
    "Finding a side": {
      kind: "labelled", pts: [[0, 0], [7, 0], [2, 5]], names: ["A", "B", "C"],
      sides: ["c", "a", "b"], angles: ["A", "B", "C"],
    },
  },

  "y12-u8-l1": {
    "The two forms": {
      kind: "labelled", pts: [[0, 0], [5, 0], [3.5, 6.06]], names: ["A", "B", "C"],
      sides: ["5", "a", "7"], angles: ["60°", "", ""],
    },
  },

  "y12-u8-l3": {
    "Why it works": {
      kind: "labelled", pts: [[0, 0], [5, 0], [3.5, 6.06]], names: ["A", "B", "C"],
      sides: ["5", "", "7"], angles: ["60°", "", ""],
    },
  },

  "y12-u8-l7": {
    "Two special triangles": {
      kind: "labelled", pts: [[0, 0], [1.732, 0], [1.732, 1]], names: ["A", "B", "C"],
      sides: ["√3", "1", "2"], angles: ["30°", "", ""],
    },
  },
};
