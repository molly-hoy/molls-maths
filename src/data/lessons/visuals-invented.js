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
};
