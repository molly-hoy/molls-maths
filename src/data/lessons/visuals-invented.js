/* ==========================================================================
   VISUALS (invented example data): diagrams for lessons where the lesson
   text gives no numbers to draw. The numbers below are made up for the
   example and are chosen to agree with the section text. Each diagram is
   labelled as an example.
   ========================================================================== */

const circlePts = (cx, cy, r, n = 180) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = (2 * Math.PI * i) / n;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  });
const arcPts = (r, a, b, n = 40) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = a + ((b - a) * i) / n;
    return [r * Math.cos(t), r * Math.sin(t)];
  });

// Pascal's triangle as labelled points: row n, entry k sits at x = k − n/2, y = −n
const pascalRows = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]];
const pascalPoints = pascalRows.flatMap((row, n) =>
  row.map((v, k) => ({ x: k - n / 2, y: -n, label: String(v) })));

export const VISUALS_INVENTED = {
  /* ---------------- Year 7 ---------------- */
  "y7-u11-l3": {
    "Tallying": {
      kind: "bars",
      items: [{ label: "Red", value: 7 }, { label: "Blue", value: 5 }, { label: "Green", value: 3 }, { label: "Yellow", value: 6 }],
      yMax: 8, yStep: 1, xLabel: "colour", yLabel: "frequency",
      description: "Example bar chart of favourite colours: Red 7, Blue 5, Green 3, Yellow 6.",
    },
  },

  "y7-u11-l4": {
    "Reading": {
      kind: "bars",
      items: [{ label: "Dog", value: 8 }, { label: "Cat", value: 6 }, { label: "Rabbit", value: 3 }, { label: "Fish", value: 4 }],
      yMax: 10, yStep: 2, xLabel: "pet", yLabel: "frequency",
      description: "Example bar chart of pets: Dog 8, Cat 6, Rabbit 3, Fish 4.",
    },
  },

  /* ---------------- Year 8 ---------------- */
  "y8-u8-l4": {
    "Exterior angle": {
      kind: "labelled", pts: [[0, 0], [6, 0], [2, 4]], names: ["A", "B", "C"],
      sides: ["", "", ""], angles: ["63.4°", "45°", "71.6°"],
    },
  },

  "y8-u10-l6": {
    "Which transformations?": {
      kind: "plot", x: [-0.5, 7], y: [-0.5, 7], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: [[1, 1], [3, 1], [1, 3], [1, 1]], label: "original", colour: 0 },
        { pts: [[2, 2], [6, 2], [2, 6], [2, 2]], label: "enlarged ×2 (not congruent)", colour: 1, dashed: true },
      ],
    },
  },

  "y8-u11-l2": {
    "Compare pairs": {
      kind: "groupbars",
      items: [
        { label: "Football", values: [8, 4] }, { label: "Netball", values: [2, 7] },
        { label: "Tennis", values: [5, 5] }, { label: "Swimming", values: [3, 6] },
      ],
      names: ["Boys", "Girls"], yMax: 10, yStep: 2, yLabel: "frequency",
      description: "Example dual bar chart of favourite sports: Football boys 8 girls 4; Netball boys 2 girls 7; Tennis 5 and 5; Swimming 3 and 6.",
    },
  },

  /* ---------------- Year 9 ---------------- */
  "y9-u3-l3": {
    "Shared factors": {
      kind: "venn", a: "2", both: "2 × 3", b: "3", out: "", labels: ["12", "18"],
      description: "Venn diagram of prime factors: 12 = 2 × 2 × 3 and 18 = 2 × 3 × 3. Shared: 2 and 3, so HCF = 6.",
    },
  },

  "y9-u3-l4": {
    "All the factors": {
      kind: "venn", a: "2", both: "2 × 3", b: "3", out: "", labels: ["12", "18"],
      description: "Venn diagram of prime factors for the LCM: take the higher power of each prime. 2 × 2 × 3 × 3 = 36.",
    },
  },

  "y9-u4-l6": {
    "Find the fact": {
      kind: "labelled", pts: [[0, 0], [6, 0], [2, 4]], names: ["A", "B", "C"],
      sides: ["", "", ""], angles: ["x", "2x", "3x"],
    },
  },

  "y9-u8-l2": {
    "The triangle": {
      kind: "plot", x: [0, 3], y: [0, 200], xStep: 1, yStep: 40, xLabel: "time (h)", yLabel: "distance (km)",
      curves: [{ pts: [[0, 0], [3, 180]], label: "speed 60 km/h (slope)", colour: 0 }],
    },
  },

  "y9-u8-l4": {
    "Pressure": {
      kind: "forces", title: "a box on the ground",
      forces: [{ deg: 270, label: "60 N" }],
    },
    "Converting m/s and km/h": {
      kind: "plot", x: [0, 10], y: [0, 40], xStep: 1, yStep: 5, xLabel: "m/s", yLabel: "km/h",
      curves: [{ pts: [[0, 0], [10, 36]], label: "1 m/s = 3.6 km/h", colour: 0 }],
    },
  },

  /* ---------------- Year 10 ---------------- */
  "y10-u8-l1": {
    "The four conditions": {
      kind: "labelled", pts: [[0, 0], [4, 0], [0, 3]], names: ["A", "B", "C"],
      sides: ["4 cm", "5 cm", "3 cm"], angles: ["90°", "", ""],
    },
  },

  /* ---------------- Year 11 ---------------- */
  "y11-u8-l4": {
    "Compare with numbers": {
      kind: "plot", x: [0, 40], y: [0, 50], xStep: 10, yStep: 10, xLabel: "time (min)", yLabel: "cumulative frequency",
      curves: [
        { pts: [[0, 0], [10, 8], [20, 22], [30, 40], [40, 50]], label: "class A", colour: 0 },
        { pts: [[0, 0], [10, 4], [20, 14], [30, 34], [40, 50]], label: "class B", colour: 1 },
      ],
    },
  },

  /* ---------------- Year 12 ---------------- */
  "y12-u7-l1": {
    "Building the triangle": {
      kind: "plot", x: [-2.5, 2.5], y: [-4.6, 0.6], xStep: 1, yStep: 1, equal: true,
      points: pascalPoints,
      description: "Pascal's triangle, rows 0 to 4: 1; 1 1; 1 2 1; 1 3 3 1; 1 4 6 4 1.",
    },
  },

  "y12-u7-l2": {
    "Matching the triangle": {
      kind: "plot", x: [-2.5, 2.5], y: [-4.6, 0.6], xStep: 1, yStep: 1, equal: true,
      points: pascalPoints,
      description: "Pascal's triangle, rows 0 to 4. Row 4 is 1, 4, 6, 4, 1, so 4C2 = 6 is its middle entry.",
    },
  },

  "y12-u8-l2": {
    "The ambiguous case": {
      kind: "plot", x: [-0.5, 11], y: [-0.5, 9], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: [[0, 0], [12.91, 7.46], [10, 0], [0, 0]], label: "triangle 1 (B ≈ 38.7°)", colour: 0 },
        { pts: [[0, 0], [2.09, 1.21], [10, 0], [0, 0]], label: "triangle 2 (B ≈ 141.3°)", colour: 1, dashed: true },
      ],
      points: [{ x: 0, y: 0, label: "A" }, { x: 10, y: 0, label: "C" }],
    },
  },

  "y12-u13-l4": {
    "Types of data": {
      kind: "bars",
      items: [{ label: "4", value: 3 }, { label: "5", value: 7 }, { label: "6", value: 12 }, { label: "7", value: 8 }, { label: "8", value: 2 }],
      yMax: 14, yStep: 2, xLabel: "shoe size", yLabel: "frequency",
      description: "Example bar chart of shoe sizes: 4 has frequency 3, 5 has 7, 6 has 12, 7 has 8, 8 has 2.",
    },
  },

  "y12-u20-l2": {
    "Common assumptions": {
      kind: "forces", title: "a particle on a smooth surface",
      forces: [{ deg: 90, label: "R" }, { deg: 270, label: "mg" }],
    },
  },

  "y12-u20-l3": {
    "Weight@2": {
      kind: "forces", title: "a 5 kg mass",
      forces: [{ deg: 270, label: "49 N" }],
    },
  },

  "y12-u22-l4": {
    "Vector form": {
      kind: "plot", x: [-0.5, 5], y: [-0.5, 4], xStep: 1, yStep: 1, equal: true,
      arrows: [
        { from: [0, 0], to: [4, 3], label: "F = 4i + 3j N", colour: 0 },
        { from: [0, 0], to: [2, 1.5], label: "a = 2i + 1.5j", colour: 1 },
      ],
    },
  },

  "y12-u22-l5": {
    "Same acceleration": {
      kind: "forces", title: "the 2 kg particle",
      forces: [{ deg: 0, label: "12 N" }, { deg: 180, label: "T", size: 0.8 }],
    },
  },

  /* ---------------- Year 13 ---------------- */
  "y13-u5-l1": {
    "Degrees and radians": {
      kind: "plot", x: [-1.2, 1.4], y: [-1.2, 1.2], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: circlePts(0, 0, 1), label: "unit circle", colour: 0 },
        { pts: arcPts(1, 0, Math.PI / 3), label: "60° = π/3", colour: 1 },
        { pts: [[0, 0], [1, 0]], label: "radius 1", colour: 2, dashed: true },
      ],
    },
  },

  "y13-u5-l4": {
    "Second solution": {
      kind: "plot", x: [0, 2 * Math.PI], y: [-1.2, 1.2], xStep: 1, yStep: 0.5, xLabel: "θ (radians)",
      curves: [{ f: (x) => Math.sin(x), from: 0, to: 2 * Math.PI, label: "sin θ", colour: 0 }],
      hlines: [{ y: 0.5, dashed: true, label: "sin θ = ½" }],
      points: [{ x: Math.PI / 6, y: 0.5, label: "π/6" }, { x: (5 * Math.PI) / 6, y: 0.5, label: "5π/6" }],
    },
  },

  "y13-u6-l2": {
    "Asymptotes": {
      kind: "plot", x: [0, 2 * Math.PI], y: [-5, 5], xStep: 1, yStep: 1, xLabel: "x (radians)",
      curves: [{ f: (x) => 1 / Math.cos(x), from: 0, to: 2 * Math.PI, label: "sec x", colour: 0 }],
      vlines: [
        { x: Math.PI / 2, dashed: true, label: "π/2" },
        { x: (3 * Math.PI) / 2, dashed: true, label: "3π/2" },
      ],
    },
  },

  "y13-u7-l2": {
    "Right-angled triangles": {
      kind: "labelled", pts: [[0, 0], [4, 0], [4, 3]], names: ["A", "B", "C"],
      sides: ["4", "3", "5"], angles: ["A", "", ""],
    },
  },

  "y13-u9-l10": {
    "Connecting rates": {
      kind: "plot", x: [-6, 6], y: [-6, 6], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: circlePts(0, 0, 5), label: "circle, r = 5 cm", colour: 0 },
        { pts: [[0, 0], [5, 0]], label: "r", colour: 1, dashed: true },
      ],
    },
  },

  "y13-u12-l2": {
    "Components": {
      kind: "space",
      vectors: [{ to: [2, 3, 6], label: "a = 2i + 3j + 6k, |a| = 7", colour: 0 }],
    },
  },

  "y13-u12-l3": {
    "Midpoints and ratios": {
      kind: "space",
      vectors: [{ to: [3, 6, 9], label: "AB", colour: 0 }],
      points: [
        { p: [0, 0, 0], label: "A" },
        { p: [3, 6, 9], label: "B" },
        { p: [1.5, 3, 4.5], label: "midpoint" },
        { p: [1, 2, 3], label: "1:2 point" },
      ],
    },
  },

  "y13-u12-l4": {
    "Forces in 3D": {
      kind: "space",
      vectors: [
        { to: [2, 3, 1], label: "F1", colour: 0 },
        { from: [2, 3, 1], to: [1, 4, 3], label: "F2", colour: 1 },
        { to: [1, 4, 3], label: "resultant", colour: 2 },
      ],
    },
  },

  "y13-u14-l1": {
    "Notation": {
      kind: "venn", a: "2, 4", both: "6, 8, 10", b: "7, 9", out: "1, 3, 5", labels: ["A (even)", "B (> 5)"],
      description: "Venn diagram with universal set 1 to 10: A only 2, 4; both 6, 8, 10; B only 7, 9; neither 1, 3, 5.",
    },
  },

  "y13-u14-l3": {
    "The reduced diagram": {
      kind: "venn", a: 7, both: 5, b: 6, out: 2, labels: ["Maths", "Physics"],
      description: "Venn diagram of 20 students: Maths only 7, both 5, Physics only 6, neither 2.",
    },
  },

  "y13-u19-l6": {
    "Connected systems": {
      kind: "plot", x: [-0.5, 7.5], y: [-3.5, 1.5], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: [[0, 0], [7, 0]], label: "smooth table", colour: 0 },
        { pts: [[1, 0], [2, 0], [2, 0.5], [1, 0.5], [1, 0]], label: "5 kg", colour: 1 },
        { pts: [[2, 0.25], [6, 0.25], [6, -2]], label: "string", colour: 2, dashed: true },
        { pts: [[5.7, -2], [6.3, -2], [6.3, -3], [5.7, -3], [5.7, -2]], label: "3 kg", colour: 3 },
        { pts: circlePts(6, 0.25, 0.25, 20), label: "pulley", colour: 0 },
      ],
    },
  },
};
