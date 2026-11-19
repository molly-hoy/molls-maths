/* ==========================================================================
   VISUALS (Year 13): diagrams for the A level Year 13 lessons that need a
   picture. Same format as visuals.js: lesson id, then heading.
   Helpers below build the points for circles, arcs and paths.
   ========================================================================== */

const circlePts = (cx, cy, r, n = 180) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = (2 * Math.PI * i) / n;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  });
// Points along an arc of radius r from angle a to angle b (radians)
const arcPts = (r, a, b, n = 60) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = a + ((b - a) * i) / n;
    return [r * Math.cos(t), r * Math.sin(t)];
  });
// Points on a path x = fx(t), y = fy(t) for t from t0 to t1
const pathPts = (fx, fy, t0, t1, n = 120) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = t0 + ((t1 - t0) * i) / n;
    return [fx(t), fy(t)];
  });
// Projectile path: launch speed U (m/s) at angle deg, g = 9.8
const projectile = (U, deg) => {
  const a = (deg * Math.PI) / 180;
  const T = (2 * U * Math.sin(a)) / 9.8;
  return pathPts((t) => U * Math.cos(a) * t, (t) => U * Math.sin(a) * t - 4.9 * t * t, 0, T);
};
const normalPdf = (x) => Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI);

export const VISUALS_Y13 = {
  /* ---------------- Modulus and functions ---------------- */
  "y13-u2-l1": {
    "V-shaped graphs": {
      kind: "plot", x: [-3, 5], y: [-1, 6], xStep: 1, yStep: 1,
      curves: [{ f: (x) => Math.abs(x - 2), label: "y = |x − 2|" }],
      points: [{ x: 2, y: 0, label: "(2, 0)" }],
    },
    "Solving with modulus": {
      kind: "plot", x: [-4, 8], y: [-1, 7], xStep: 1, yStep: 1,
      curves: [{ f: (x) => Math.abs(x - 2), label: "y = |x − 2|" }],
      hlines: [{ y: 5, dashed: true, label: "y = 5" }],
      points: [{ x: -3, y: 5, label: "x = −3" }, { x: 7, y: 5, label: "x = 7" }],
    },
  },

  "y13-u2-l4": {
    "Swapping and rearranging": {
      kind: "plot", x: [-4, 6], y: [-4, 6], xStep: 1, yStep: 1, equal: true,
      curves: [
        { pts: [[-4, -5], [6, 15]], label: "f(x) = 2x + 3", colour: 0 },
        { pts: [[-4, -3.5], [6, 4.5]], label: "f⁻¹(x) = (x − 3)/2", colour: 1 },
        { pts: [[-4, -4], [6, 6]], label: "y = x", dashed: true },
      ],
    },
  },

  "y13-u2-l5": {
    "Modulus outside the function": {
      kind: "plot", x: [-2, 4], y: [-2, 4], xStep: 1, yStep: 1,
      curves: [
        { f: (x) => x - 1, label: "y = x − 1", dashed: true },
        { f: (x) => Math.abs(x - 1), label: "y = |x − 1|", colour: 1 },
      ],
    },
    "Modulus inside the function": {
      kind: "plot", x: [-3, 3], y: [-2, 3], xStep: 1, yStep: 1,
      curves: [
        { f: (x) => Math.abs(x) - 1, label: "y = |x| − 1", colour: 0 },
      ],
      hlines: [{ y: 0, dashed: false }],
    },
  },

  "y13-u2-l6": {
    "Shifts go the opposite way inside": {
      kind: "plot", x: [-1, 6], y: [-1, 12], xStep: 1, yStep: 2,
      curves: [
        { f: (x) => x * x, label: "y = x²", dashed: true },
        { f: (x) => (x - 3) * (x - 3) + 2, label: "y = (x − 3)² + 2", colour: 1 },
      ],
      points: [{ x: 3, y: 2, label: "(3, 2)" }],
    },
  },

  "y13-u2-l7": {
    "Greater than with a sketch": {
      kind: "plot", x: [-3, 7], y: [-1, 6], xStep: 1, yStep: 1,
      curves: [{ f: (x) => Math.abs(x - 2), label: "y = |x − 2|" }],
      hlines: [{ y: 3, dashed: true, label: "y = 3" }],
      points: [{ x: -1, y: 3, label: "x = −1" }, { x: 5, y: 3, label: "x = 5" }],
    },
  },

  /* ---------------- Radians and sectors ---------------- */
  "y13-u5-l2": {
    "Arc length": {
      kind: "plot", x: [-1, 6], y: [-1, 4], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: [[0, 0], [5, 0], ...arcPts(5, 0, 0.6), [0, 0]], label: "sector, r = 5, θ = 0.6", colour: 0 }],
      points: [{ x: 0, y: 0, label: "O" }],
    },
  },

  "y13-u5-l3": {
    "The sector": {
      kind: "plot", x: [-1, 7], y: [-1, 7], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: [[0, 0], [6, 0], ...arcPts(6, 0, Math.PI / 3), [0, 0]], label: "sector, r = 6, θ = π/3", colour: 0 }],
    },
    "The segment": {
      kind: "plot", x: [-1, 7], y: [-1, 7], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: [...arcPts(6, 0, Math.PI / 3), [6, 0]], label: "segment", colour: 1 }],
    },
  },

  "y13-u5-l5": {
    "Why the approximations work": {
      kind: "plot", x: [-1.5, 1.5], y: [-1.5, 1.5], xStep: 0.5, yStep: 0.5, equal: true,
      curves: [
        { f: (x) => Math.sin(x), label: "y = sin x", colour: 0 },
        { f: (x) => x, label: "y = x", colour: 1, dashed: true },
      ],
      points: [{ x: 0, y: 0, label: "(0, 0)" }],
    },
  },

  /* ---------------- Trig models ---------------- */
  "y13-u7-l7": {
    "Reading a model": {
      kind: "plot", x: [0, 24], y: [4, 16], xStep: 3, yStep: 2, xLabel: "time (hours)", yLabel: "H",
      curves: [{ f: (t) => 10 + 4 * Math.sin((30 * t * Math.PI) / 180), from: 0, to: 24, label: "H = 10 + 4 sin(30t)°" }],
      hlines: [{ y: 10, dashed: true, label: "middle 10" }],
    },
  },

  /* ---------------- Parametric curves ---------------- */
  "y13-u8-l3": {
    "Example": {
      kind: "plot", x: [-0.5, 2.5], y: [-2, 2], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: pathPts((t) => t * t, (t) => t, -1.5, 1.5), label: "x = t², y = t", colour: 0 }],
      points: [{ x: 1, y: -1, label: "t = −1" }, { x: 0, y: 0, label: "t = 0" }, { x: 1, y: 1, label: "t = 1" }],
    },
  },

  "y13-u8-l5": {
    "Reading the model": {
      kind: "plot", x: [0, 70], y: [0, 25], xStep: 10, yStep: 5, xLabel: "x (m)", yLabel: "y (m)",
      curves: [{ pts: pathPts((t) => 20 * t, (t) => 15 * t - 5 * t * t, 0, 3), label: "x = 20t, y = 15t − 5t²", colour: 0 }],
      points: [{ x: 60, y: 0, label: "lands at (60, 0)" }],
    },
  },

  "y13-u9-l9": {
    "Concavity": {
      kind: "plot", x: [-1.5, 3.5], y: [-6, 6], xStep: 1, yStep: 2,
      curves: [{ f: (x) => x ** 3 - 3 * x * x, label: "y = x³ − 3x²" }],
      points: [{ x: 1, y: -2, label: "inflection (1, −2)" }],
      vlines: [{ x: 1, dashed: true }],
    },
  },

  /* ---------------- Numerical methods and integration ---------------- */
  "y13-u10-l1": {
    "Checking the interval": {
      kind: "plot", x: [1, 3.5], y: [-8, 18], xStep: 0.5, yStep: 4,
      curves: [{ f: (x) => x ** 3 - 2 * x - 5, label: "f(x) = x³ − 2x − 5" }],
      points: [{ x: 2, y: -1, label: "f(2) = −1" }, { x: 3, y: 16, label: "f(3) = 16" }],
      hlines: [{ y: 0, dashed: false }],
    },
  },

  "y13-u11-l8": {
    "Area between curves": {
      kind: "plot", x: [-2, 3], y: [-2, 5], xStep: 1, yStep: 1,
      curves: [
        { f: (x) => x + 2, label: "y = x + 2" },
        { f: (x) => x * x, label: "y = x²", colour: 1, labelAt: [-1.7, 2.89] },
      ],
      shade: [{ f: (x) => x + 2, g: (x) => x * x, from: -1, to: 2, colour: 2 }],
    },
  },

  "y13-u11-l9": {
    "The rule": {
      kind: "plot", x: [-0.2, 2.2], y: [-0.5, 4.5], xStep: 0.5, yStep: 1,
      curves: [{ f: (x) => x * x, from: 0, to: 2, label: "y = x²" }],
      vlines: [{ x: 0.5, dashed: true }, { x: 1, dashed: true }, { x: 1.5, dashed: true }],
      points: [{ x: 0.5, y: 0.25 }, { x: 1, y: 1 }, { x: 1.5, y: 2.25 }, { x: 2, y: 4 }],
    },
  },

  /* ---------------- Mechanics: forces ---------------- */
  "y13-u16-l1": {
    "The moment": {
      kind: "plot", x: [-1, 1], y: [-1, 1], xStep: 0.5, yStep: 0.5, equal: true,
      curves: [{ pts: [[-1, 0], [1, 0]], label: "beam", colour: 0 }],
      points: [{ x: 0, y: 0, label: "pivot" }],
      arrows: [{ from: [0.5, 0], to: [0.5, -0.6], label: "20 N at 0.5 m", colour: 1 }],
    },
  },

  "y13-u17-l1": {
    "Components": {
      kind: "forces", title: "a force at 30°",
      forces: [{ deg: 30, label: "10 N" }],
    },
  },

  "y13-u17-l2": {
    "Resolving the weight": {
      kind: "forces", incline: 30, title: "a block on a slope",
      forces: [{ deg: 270, label: "mg" }, { deg: 120, label: "R" }],
    },
  },

  "y13-u17-l3": {
    "Friction": {
      kind: "forces", incline: 30, title: "a block on a slope",
      forces: [{ deg: 270, label: "mg" }, { deg: 120, label: "R" }, { deg: 30, label: "F" }],
    },
  },

  "y13-u18-l2": {
    "Components of velocity": {
      kind: "plot", x: [-1, 22], y: [-1, 12], xStep: 5, yStep: 2, equal: true,
      arrows: [{ from: [0, 0], to: [17.32, 10], label: "U = 20 m s⁻¹", colour: 0 }],
      curves: [
        { pts: [[0, 0], [17.32, 0]], label: "U cos α", dashed: true },
        { pts: [[17.32, 0], [17.32, 10]], label: "U sin α", dashed: true, colour: 1 },
      ],
    },
  },

  "y13-u18-l3": {
    "Key results on level ground": {
      kind: "plot", x: [0, 40], y: [0, 7], xStep: 5, yStep: 1, equal: true, xLabel: "x (m)", yLabel: "y (m)",
      curves: [{ pts: projectile(20, 30), label: "U = 20 m s⁻¹, α = 30°", colour: 0 }],
      points: [
        { x: 17.67, y: 5.1, label: "H ≈ 5.1 m" },
        { x: 35.3, y: 0, label: "R ≈ 35.3 m" },
      ],
    },
  },

  "y13-u18-l4": {
    "Maximum range": {
      kind: "plot", x: [0, 45], y: [0, 22], xStep: 5, yStep: 5, xLabel: "x (m)", yLabel: "y (m)",
      curves: [
        { pts: projectile(20, 30), label: "30°", colour: 0 },
        { pts: projectile(20, 45), label: "45°", colour: 1 },
        { pts: projectile(20, 60), label: "60°", colour: 2 },
      ],
    },
  },

  "y13-u19-l1": {
    "Equilibrium": {
      kind: "forces", title: "a particle in equilibrium",
      forces: [
        { deg: 0, label: "6 N", size: 0.75 },
        { deg: 90, label: "8 N", size: 1.0 },
        { deg: 233, label: "F", size: 0.9 },
      ],
    },
  },

  "y13-u19-l2": {
    "Example": {
      kind: "forces", title: "a particle held by a string",
      forces: [{ deg: 60, label: "T" }, { deg: 270, label: "20 N" }],
    },
  },

  "y13-u19-l3": {
    "On a slope": {
      kind: "forces", incline: 30, title: "a block on a rough slope",
      forces: [{ deg: 270, label: "mg" }, { deg: 120, label: "R" }, { deg: 30, label: "F" }],
    },
  },

  "y13-u19-l4": {
    "Ladder": {
      kind: "plot", x: [-0.5, 2.5], y: [-0.5, 4], xStep: 1, yStep: 1, equal: true,
      curves: [{ pts: [[0, 3.46], [2, 0]], label: "ladder, 4 m", colour: 0 }],
      points: [{ x: 1, y: 1.73, label: "80 N" }],
      hlines: [{ y: 0, dashed: false }],
    },
  },

  "y13-u19-l5": {
    "Rough slope with motion": {
      kind: "forces", incline: 30, title: "a block sliding down a slope",
      forces: [{ deg: 270, label: "mg" }, { deg: 120, label: "R" }, { deg: 30, label: "F" }],
    },
  },

  /* ---------------- Vectors and calculus in mechanics ---------------- */
  "y13-u20-l2": {
    "The position vector": {
      kind: "plot", x: [0, 40], y: [0, 7], xStep: 5, yStep: 1, equal: true, xLabel: "x (m)", yLabel: "y (m)",
      curves: [{ pts: projectile(20, 30), label: "path", colour: 0 }],
    },
  },

  "y13-u20-l4": {
    "Component by component": {
      kind: "plot", x: [-0.5, 2.5], y: [-1.5, 1.5], xStep: 0.5, yStep: 0.5,
      curves: [{ pts: pathPts((t) => t * t, (t) => Math.sin(t), 0, 2), label: "r = t²i + sin t j", colour: 0 }],
      points: [{ x: 0, y: 0, label: "t = 0" }],
    },
  },

  /* ---------------- Probability ---------------- */
  "y13-u14-l5": {
    "Example": {
      kind: "tree",
      root: {
        children: [
          { p: "0.01", label: "Disease", children: [
            { p: "0.9", label: "Positive", result: "0.009" },
            { p: "0.1", label: "Negative", result: "0.001" },
          ] },
          { p: "0.99", label: "No disease", children: [
            { p: "0.05", label: "Positive", result: "0.0495" },
            { p: "0.95", label: "Negative", result: "0.9405" },
          ] },
        ],
      },
    },
  },

  "y13-u15-l1": {
    "Shape": {
      kind: "plot", x: [-3.5, 3.5], y: [0, 0.5], xStep: 1, yStep: 0.1,
      curves: [{ f: normalPdf, from: -3.5, to: 3.5, label: "X ~ N(0, 1)", colour: 0 }],
      shade: [{ f: normalPdf, g: () => 0, from: -1, to: 1, colour: 0 }],
      vlines: [{ x: 0, dashed: true, label: "μ" }],
    },
  },
};
