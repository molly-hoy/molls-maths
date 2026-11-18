/* ==========================================================================
   Year 13 Pure generators, Part B: Units 7–12 and exam preparation (Unit 21)
   Trigonometry and modelling · Parametric equations · Differentiation ·
   Numerical methods · Integration · Vectors in 3D · Mixed practice
   --------------------------------------------------------------------------
   Calculus answers with sin, e or ln in them are asked as a VALUE (e.g. the
   gradient at a point, or a definite integral to 3 decimal places), because
   the answer box can only read polynomial algebra. Every value is worked out
   here in JavaScript from the random numbers, so the answers are exact.
   ========================================================================== */
import { fmt, gcd, round } from "../numbers.js";
import { core, extend, frac, mc3, multi, num, reuse, T } from "./helpers.js";
import { tidyQuestion } from "./tidy.js";
import { Y12A_GENERATORS } from "./y12a.js";
import { Y12B_GENERATORS } from "./y12b.js";
import { Y13A_GENERATORS } from "./y13a.js";

const S = (u, l) => `y13-u${u}-l${l}`;
// Every question goes through tidy() so the maths text reads naturally (see tidy.js)
const C = (u, l, name, make, v = () => true) => core(S(u, l), name, name, (rng) => tidyQuestion(make(rng)), v);
const E = (u, l, name, make, v = () => true) => extend(S(u, l), name, name, (rng) => tidyQuestion(make(rng)), v);
const ALL = { ...Y12A_GENERATORS, ...Y12B_GENERATORS, ...Y13A_GENERATORS };
const R = (id, name, u, l, level) => {
  const g = (ALL[id] ?? []).find((x) => x.id === `${id}/${name}`);
  if (!g) throw new Error(`No generator ${id}/${name}`);
  return reuse(g, S(u, l), level, name);
};
const nz = (rng, a, b) => rng.nonZero(a, b);
const sg = (n) => `${n < 0 ? "−" : "+"} ${fmt(Math.abs(n))}`;
const sgv = (n, v) => `${n < 0 ? "−" : "+"} ${Math.abs(n) === 1 ? "" : fmt(Math.abs(n))}${v}`;
const co = (n, v) => `${n === 1 ? "" : n === -1 ? "−" : fmt(n)}${v}`;   // "3x", "x", "−x"
const SUPS = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
const sup = (n) => String(n).split("").map((c) => SUPS[c] ?? c).join("");
const F = (n, d) => { const g = gcd(Math.abs(n), Math.abs(d)) || 1; const s = d < 0 ? -1 : 1; return [(s * n) / g, (s * d) / g]; };
const fText = (n, d) => { const [a, b] = F(n, d); return b === 1 ? fmt(a) : `${a < 0 ? "−" : ""}{${Math.abs(a)}/${b}}`; };
const rad = (d) => (d * Math.PI) / 180, deg = (r) => (r * 180) / Math.PI;
const vec3 = (x, y, z) => {
  const parts = [[x, "i"], [y, "j"], [z, "k"]].filter(([c]) => c !== 0);
  if (!parts.length) return "0";
  return parts.map(([c, u], i) => (i === 0 ? co(c, u) : sgv(c, u))).join(" ");
};
const bankMC = (rng, bank) => {
  const [prompt, right, w1, w2, hint, why] = rng.pick(bank);
  return mc3(rng, prompt, right, [[w1, hint], [w2, hint]], { hints: [hint, "Check each option carefully."], solution: [why] });
};
// Simpson's rule with many strips: used only to CHECK our own exact answers
const simpson = (f, a, b, n = 400) => { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return (s * h) / 3; };
const PYTH = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];

/* =================== Unit 7: Trigonometry and modelling =================== */
const U7 = {
  [S(7, 1)]: [
    C(7, 1, "addition-exact", (rng) => {
      const [q, right, w1, w2, how] = rng.pick([
        ["sin 75°", "(√6 + √2)/4", "(√6 − √2)/4", "(√3 + 1)/2", "sin(45° + 30°) = sin 45° cos 30° + cos 45° sin 30°"],
        ["cos 75°", "(√6 − √2)/4", "(√6 + √2)/4", "(√3 − 1)/2", "cos(45° + 30°) = cos 45° cos 30° − sin 45° sin 30°"],
        ["sin 15°", "(√6 − √2)/4", "(√6 + √2)/4", "(√3 − 1)/4", "sin(45° − 30°) = sin 45° cos 30° − cos 45° sin 30°"],
        ["cos 15°", "(√6 + √2)/4", "(√6 − √2)/4", "(√2 + 1)/4", "cos(45° − 30°) = cos 45° cos 30° + sin 45° sin 30°"],
        ["tan 15°", "2 − √3", "2 + √3", "√3 − 1", "tan(45° − 30°) = (1 − √3/3)/(1 + √3/3)"],
        ["tan 75°", "2 + √3", "2 − √3", "√3 + 1", "tan(45° + 30°) = (1 + √3/3)/(1 − √3/3)"],
      ]);
      return mc3(rng, `Find the exact value of ${q}.`, right, [[w1, "Check the sign in the formula."], [w2, "Use the addition formula with 45° and 30°."]], {
        hints: [`Write ${q.split(" ")[1]} using 45° and 30°.`, how + "."], solution: [how, `= ${right}`],
      });
    }),
    E(7, 1, "addition-value", (rng) => {
      const A = rng.int(10, 80), B = rng.int(5, 60), f = rng.pick(["sin", "cos"]), plus = rng.chance(0.5);
      const sa = round(Math.sin(rad(A)), 4), ca = round(Math.cos(rad(A)), 4), sb = round(Math.sin(rad(B)), 4), cb = round(Math.cos(rad(B)), 4);
      const v = f === "sin" ? sa * cb + (plus ? 1 : -1) * ca * sb : ca * cb - (plus ? 1 : -1) * sa * sb;
      const ans = round(v, 3);
      const wrong = round(f === "sin" ? sa * cb - (plus ? 1 : -1) * ca * sb : ca * cb + (plus ? 1 : -1) * sa * sb, 3);
      return num(`sin A = ${fmt(sa, 4)}, cos A = ${fmt(ca, 4)}, sin B = ${fmt(sb, 4)}, cos B = ${fmt(cb, 4)}. Use the addition formula to find ${f}(A ${plus ? "+" : "−"} B) to 3 decimal places.`, ans, {
        dp: 3, traps: Math.abs(wrong - ans) > 0.0015 ? [T(wrong, f === "cos" ? "cos(A ± B) has the OPPOSITE sign: cos A cos B ∓ sin A sin B." : "Check the sign in sin(A ± B).")] : [],
        hints: [f === "sin" ? `sin(A ${plus ? "+" : "−"} B) = sin A cos B ${plus ? "+" : "−"} cos A sin B.` : `cos(A ${plus ? "+" : "−"} B) = cos A cos B ${plus ? "−" : "+"} sin A sin B.`, "Substitute the four values."], solution: [`= ${fmt(ans, 3)}`],
      });
    }),
  ],
  [S(7, 2)]: [
    C(7, 2, "addition-from-triangles", (rng) => {
      const [a1, b1, c1] = rng.pick(PYTH), [a2, b2, c2] = rng.pick(PYTH), f = rng.pick(["sin", "cos"]), plus = rng.chance(0.5);
      // sin A = a1/c1, cos A = b1/c1; cos B = b2/c2, sin B = a2/c2 (both acute)
      const top = f === "sin" ? a1 * b2 + (plus ? 1 : -1) * b1 * a2 : b1 * b2 - (plus ? 1 : -1) * a1 * a2;
      const [n, d] = F(top, c1 * c2);
      return frac(`A and B are acute, sin A = {${a1}/${c1}} and cos B = {${b2}/${c2}}. Find the exact value of ${f}(A ${plus ? "+" : "−"} B).`, n, d, {
        answerText: fText(top, c1 * c2),
        hints: [`cos A = {${b1}/${c1}} and sin B = {${a2}/${c2}} (Pythagoras).`, f === "sin" ? `sin A cos B ${plus ? "+" : "−"} cos A sin B.` : `cos A cos B ${plus ? "−" : "+"} sin A sin B.`], solution: [`= ${fText(top, c1 * c2)}`],
      });
    }),
    E(7, 2, "solve-addition", (rng) => {
      const a = rng.pick([30, 45, 60]), k = rng.int(2, 4);
      // sin(x + a) = k cos x → sin x cos a + cos x sin a = k cos x → tan x = (k − sin a)/cos a
      const t = (k - Math.sin(rad(a))) / Math.cos(rad(a));
      let x1 = deg(Math.atan(t)); if (x1 < 0) x1 += 180;
      return multi(`Solve sin(x + ${a}°) = ${k} cos x for 0° ≤ x < 360°, to 1 decimal place.`, [["smaller x =", round(x1, 1), 1], ["larger x =", round(x1 + 180, 1), 1]], {
        hints: [`Expand: sin x cos ${a}° + cos x sin ${a}° = ${k} cos x.`, `Divide by cos x: tan x = (${k} − sin ${a}°)/cos ${a}° = ${fmt(round(t, 4))}.`], solution: [`tan x = ${fmt(round(t, 4))}`, `x = ${fmt(round(x1, 1), 1)}°, ${fmt(round(x1 + 180, 1), 1)}°`],
      });
    }),
  ],
  [S(7, 3)]: [
    C(7, 3, "double-angle-values", (rng) => {
      const [a, b, c] = rng.pick(PYTH), kind = rng.int(0, 2);
      if (kind === 0) return frac(`θ is acute and sin θ = {${a}/${c}}. Find sin 2θ exactly.`, ...F(2 * a * b, c * c), { traps: [T((2 * a) / c, "sin 2θ = 2 sin θ cos θ.")], hints: [`cos θ = {${b}/${c}}.`, "sin 2θ = 2 sin θ cos θ."], solution: [`2 × {${a}/${c}} × {${b}/${c}} = ${fText(2 * a * b, c * c)}`] });
      if (kind === 1) return frac(`θ is acute and sin θ = {${a}/${c}}. Find cos 2θ exactly.`, ...F(c * c - 2 * a * a, c * c), { hints: ["cos 2θ = 1 − 2sin²θ.", `1 − 2 × {${a * a}/${c * c}}.`], solution: [`= ${fText(c * c - 2 * a * a, c * c)}`] });
      return frac(`θ is acute and tan θ = {${a}/${b}}. Find tan 2θ exactly.`, ...F(2 * a * b, b * b - a * a), { hints: ["tan 2θ = 2 tan θ/(1 − tan²θ).", `2({${a}/${b}}) ÷ (1 − {${a * a}/${b * b}}).`], solution: [`= ${fText(2 * a * b, b * b - a * a)}`] });
    }),
    E(7, 3, "cos-double-from-cos", (rng) => {
      const p = rng.int(1, 4), q = rng.int(p + 1, 7);
      const [n, d] = F(2 * p * p - q * q, q * q);
      return frac(`cos θ = {${p}/${q}}. Find cos 2θ.`, n, d, {
        answerText: fText(2 * p * p - q * q, q * q), traps: [T((2 * p) / q, "cos 2θ isn't 2 cos θ.")],
        hints: ["cos 2θ = 2cos²θ − 1.", `2 × {${p * p}/${q * q}} − 1.`], solution: [`= ${fText(2 * p * p - q * q, q * q)}`],
      });
    }),
  ],
  [S(7, 4)]: [
    C(7, 4, "double-angle-equation-count", (rng) => {
      const [eq, sols, note] = rng.pick([
        ["sin 2x = sin x", [0, 60, 180, 300], "sin x(2cos x − 1) = 0"],
        ["cos 2x = cos x", [0, 120, 240], "2cos²x − cos x − 1 = 0, (2cos x + 1)(cos x − 1) = 0"],
        ["sin 2x = cos x", [30, 90, 150, 270], "cos x(2sin x − 1) = 0"],
        ["cos 2x = sin x", [30, 150, 270], "1 − 2sin²x = sin x, (2sin x − 1)(sin x + 1) = 0"],
        ["cos 2x + 3cos x + 2 = 0", [120, 180, 240], "2cos²x + 3cos x + 1 = 0, (2cos x + 1)(cos x + 1) = 0"],
        ["sin 2x + sin x = 0", [0, 120, 180, 240], "sin x(2cos x + 1) = 0"],
      ]);
      return num(`How many solutions does ${eq} have for 0° ≤ x < 360°?`, sols.length, {
        hints: ["Replace the double angle with a formula in x.", note], solution: [note, `x = ${sols.map((s) => s + "°").join(", ")}`],
      });
    }),
    E(7, 4, "double-angle-solve", (rng) => {
      const k = round(rng.int(1, 9) / 10, 1);
      // sin 2x = k sin x... → sin x(2cos x − k) = 0, cos x = k/2 (plus 0°, 180°). Ask for the solution in 0 < x < 90.
      const x = round(deg(Math.acos(k / 2)), 1);
      return num(`Solve sin 2x = ${fmt(k)} sin x. Give the solution between 0° and 90°, to 1 decimal place.`, x, {
        dp: 1, hints: ["sin 2x = 2 sin x cos x.", `sin x(2cos x − ${fmt(k)}) = 0, so cos x = ${fmt(k / 2)}.`], solution: [`x = cos⁻¹(${fmt(k / 2)}) = ${fmt(x, 1)}°`],
      });
    }),
  ],
  [S(7, 5)]: [
    C(7, 5, "r-and-alpha", (rng) => {
      const [a, b, c] = rng.pick(PYTH), sw = rng.chance(0.5);
      const A = sw ? b : a, B = sw ? a : b;
      const alpha = round(deg(Math.atan(B / A)), 1);
      return multi(`Write ${A} cos x + ${B} sin x in the form R cos(x − α), with R > 0 and 0° < α < 90°.`, [["R =", c], ["α =", alpha, 1, [T(round(deg(Math.atan(A / B)), 1), "tan α = (sin coefficient) ÷ (cos coefficient).")]]], {
        hints: [`R = √(${A}² + ${B}²).`, `R cos α = ${A}, R sin α = ${B}: tan α = ${B}/${A}.`], solution: [`R = ${c}`, `α = ${fmt(alpha, 1)}°`],
      });
    }),
    E(7, 5, "r-max-min", (rng) => {
      const a = rng.int(1, 8), b = rng.int(1, 8), k = rng.int(5, 20), max = rng.chance(0.5);
      const Rv = Math.sqrt(a * a + b * b);
      const v = round(max ? k + Rv : k - Rv, 3);
      return num(`Find the ${max ? "maximum" : "minimum"} value of ${k} + ${a} sin x + ${b} cos x, to 3 decimal places.`, v, {
        dp: 3, hints: ["Write a sin x + b cos x as R sin(x + α).", `R = √(${a * a} + ${b * b}); the ${max ? "max" : "min"} of R sin(…) is ${max ? "R" : "−R"}.`], solution: [`R = ${fmt(round(Rv, 4))}`, `${k} ${max ? "+" : "−"} R = ${fmt(v, 3)}`],
      });
    }),
  ],
  [S(7, 6)]: [
    C(7, 6, "simplify-identity", (rng) => bankMC(rng, [
      ["Simplify (1 − cos 2x)/sin 2x.", "tan x", "cot x", "sin x", "1 − cos 2x = 2sin²x and sin 2x = 2 sin x cos x.", "2sin²x/(2 sin x cos x) = tan x."],
      ["Simplify (1 + cos 2x)/sin 2x.", "cot x", "tan x", "cos x", "1 + cos 2x = 2cos²x.", "2cos²x/(2 sin x cos x) = cot x."],
      ["Simplify (1 − cos 2x)/(1 + cos 2x).", "tan²x", "cot²x", "−1", "Use the two double-angle forms.", "2sin²x/2cos²x = tan²x."],
      ["Simplify cos⁴x − sin⁴x.", "cos 2x", "1", "sin 2x", "Difference of two squares.", "(cos²x − sin²x)(cos²x + sin²x) = cos 2x."],
      ["Simplify 2 sin x cos x/cos 2x.", "tan 2x", "tan x", "sin 2x", "The top is sin 2x.", "sin 2x/cos 2x = tan 2x."],
      ["Simplify (sin x + cos x)².", "1 + sin 2x", "1", "1 + cos 2x", "Expand and use sin² + cos² = 1.", "sin²x + 2 sin x cos x + cos²x = 1 + sin 2x."],
    ])),
    E(7, 6, "identity-check-value", (rng) => {
      const x = rng.int(10, 80);
      const v = round((1 - Math.cos(rad(2 * x))) / Math.sin(rad(2 * x)), 3);
      return num(`(1 − cos 2x)/sin 2x simplifies to a single trig function. Use that to find its value when x = ${x}°, to 3 decimal places.`, v, {
        dp: 3, hints: ["1 − cos 2x = 2sin²x; sin 2x = 2 sin x cos x.", "It simplifies to tan x."], solution: [`tan ${x}° = ${fmt(v, 3)}`],
      });
    }),
  ],
  [S(7, 7)]: [
    C(7, 7, "trig-model-max", (rng) => {
      const m = rng.int(5, 20), a = rng.int(1, Math.min(8, m - 1)), w = rng.pick([15, 30, 20, 45]), f = rng.pick(["sin", "cos"]), sgn = rng.pick([1, -1]), max = rng.chance(0.5);
      return num(`The depth of water is H = ${m} ${sgn > 0 ? "+" : "−"} ${a} ${f}(${w}t)° metres, t hours after midnight. Find the ${max ? "greatest" : "least"} depth.`, max ? m + a : m - a, {
        traps: [T(max ? m - a : m + a, `${f}(…) is between −1 and 1. Which value gives the ${max ? "greatest" : "least"} H?`)],
        hints: [`${f}(${w}t)° is between −1 and 1.`, `H is between ${m - a} and ${m + a}.`], solution: [`${max ? "Greatest" : "Least"} depth ${max ? m + a : m - a} m`],
      });
    }),
    E(7, 7, "trig-model-period", (rng) => {
      const w = rng.pick([15, 30, 20, 45, 10, 12, 18, 24, 36, 40]);
      return num(`H = 10 + 3 sin(${w}t)°. How long is one full cycle (in the same units as t)?`, 360 / w, {
        traps: [T(w, `The period is 360 ÷ ${w}.`)],
        hints: ["sin repeats every 360°.", `${w}t goes up by 360 when t goes up by 360/${w}.`], solution: [`Period = 360 ÷ ${w} = ${fmt(360 / w)}`],
      });
    }),
  ],
};

/* ======================= Unit 8: Parametric equations ======================= */
const U8 = {
  [S(8, 1)]: [
    C(8, 1, "parametric-point", (rng) => {
      const a = nz(rng, -4, 4), b = rng.int(-5, 5), c = rng.int(-6, 6), t = rng.int(-3, 3);
      return multi(`x = ${co(a, "t")} ${sg(b)}, y = t² ${sg(c)}. Find the point where t = ${t}.`, [["x =", a * t + b], ["y =", t * t + c]], {
        hints: [`Substitute t = ${t} into both.`, `x = ${a}(${t}) ${sg(b)}.`], solution: [`(${a * t + b}, ${t * t + c})`],
      });
    }),
    E(8, 1, "parametric-to-cartesian", (rng) => {
      const a = rng.int(2, 5), b = rng.int(-4, 4), c = rng.int(-6, 6), x0 = a * rng.int(-3, 3) + b;
      // x = a t + b → t = (x − b)/a, y = t² + c
      const t = (x0 - b) / a;
      return num(`x = ${a}t ${sg(b)}, y = t² ${sg(c)}. Find the Cartesian equation, then find y when x = ${x0}.`, t * t + c, {
        hints: [`t = (x ${sg(-b)})/${a}.`, `y = ((x ${sg(-b)})/${a})² ${sg(c)}.`], solution: [`At x = ${x0}: t = ${t}`, `y = ${t * t + c}`],
      });
    }),
  ],
  [S(8, 2)]: [
    C(8, 2, "circle-parametric", (rng) => {
      const r = rng.int(2, 9), a = rng.int(-5, 5), b = rng.int(-5, 5);
      return multi(`x = ${a === 0 ? "" : a + " + "}${r} cos t, y = ${b === 0 ? "" : b + " + "}${r} sin t. The curve is a circle. Find its centre and radius.`, [["centre x =", a], ["centre y =", b], ["radius =", r, undefined, [T(r * r, "That's r².")]]], {
        hints: ["cos²t + sin²t = 1.", `(x ${sg(-a)})² + (y ${sg(-b)})² = ${r * r}.`], solution: [`Centre (${a}, ${b}), radius ${r}`],
      });
    }),
    E(8, 2, "double-angle-parametric", (rng) => {
      const k = rng.int(1, 4), x0 = round(rng.int(-9, 9) / 10, 1);
      // x = sin t, y = k cos 2t → y = k(1 − 2x²)
      const v = round(k * (1 - 2 * x0 * x0), 4);
      return num(`x = sin t, y = ${k === 1 ? "" : k + " "}cos 2t. Write y in terms of x, then find y when x = ${fmt(x0)}.`, v, {
        hints: ["cos 2t = 1 − 2sin²t.", `y = ${k}(1 − 2x²).`], solution: [`y = ${k}(1 − 2 × ${fmt(round(x0 * x0, 4))}) = ${fmt(v)}`],
      });
    }),
  ],
  [S(8, 3)]: [
    C(8, 3, "parametric-range", (rng) => {
      const a = rng.int(-5, 5), r = rng.int(1, 6), f = rng.pick(["cos", "sin"]);
      return multi(`x = ${a === 0 ? "" : a + " + "}${r} ${f} t, 0 ≤ t < 2π. Find the least and greatest values of x.`, [["least =", a - r], ["greatest =", a + r]], {
        hints: [`${f} t is between −1 and 1.`, `x is between ${a} − ${r} and ${a} + ${r}.`], solution: [`${a - r} ≤ x ≤ ${a + r}`],
      });
    }),
    E(8, 3, "parametric-domain", (rng) => {
      const lo = rng.int(-3, 1), hi = lo + rng.int(2, 5), k = rng.int(-4, 4);
      const vals = [lo * lo + k, hi * hi + k]; if (lo < 0 && hi > 0) vals.push(k);
      return multi(`x = t² ${sg(k)}, ${lo} ≤ t ≤ ${hi}. Find the least and greatest values of x.`, [["least =", Math.min(...vals)], ["greatest =", Math.max(...vals)]], {
        hints: ["t² is smallest when t is closest to 0.", `Check t = ${lo}, t = ${hi}${lo < 0 && hi > 0 ? " and t = 0" : ""}.`], solution: [`${Math.min(...vals)} ≤ x ≤ ${Math.max(...vals)}`],
      });
    }),
  ],
  [S(8, 4)]: [
    C(8, 4, "parametric-axis", (rng) => {
      const a = nz(rng, -5, 5), b = rng.int(-6, 6);
      // x = t + a, y = t² + b; meets y-axis when t = −a
      return num(`x = t ${sg(a)}, y = t² ${sg(b)}. Where does the curve meet the y-axis? Give the y-coordinate.`, a * a + b, {
        hints: [`On the y-axis x = 0, so t = ${-a}.`, `y = (${-a})² ${sg(b)}.`], solution: [`y = ${a * a + b}`],
      });
    }),
    E(8, 4, "parametric-line", (rng) => {
      const p = rng.int(-4, 3), q = p + rng.int(1, 5);
      // x = t², y = 2t meets y = m x + c? Use x = t, y = t²: meets y = (p+q)x − pq at t = p, q
      const m = p + q, c = -p * q;
      return multi(`x = t, y = t². Find the x-coordinates where the curve meets y = ${co(m, "x") || "0"} ${sg(c)}. (Smaller first.)`, [["x =", p], ["x =", q]], {
        hints: [`Substitute: t² = ${m}t ${sg(c)}.`, `t² ${sgv(-m, "t")} ${sg(-c)} = 0.`], solution: [`t = ${p} or ${q}`],
      });
    }),
  ],
  [S(8, 5)]: [
    C(8, 5, "projectile-landing", (rng) => {
      const u = rng.int(5, 30), v = rng.int(2, 6) * 5;
      // x = u t, y = v t − 5t²: lands at t = v/5
      const t = v / 5;
      return multi(`A ball's path is x = ${u}t, y = ${v}t − 5t² (metres, t seconds). Find when it lands and how far it travels horizontally.`, [["t =", t], ["x =", u * t]], {
        hints: ["It lands when y = 0 (t ≠ 0).", `5t(${t} − t) = 0.`], solution: [`t = ${t}`, `x = ${u} × ${t} = ${u * t} m`],
      });
    }),
    E(8, 5, "projectile-max-height", (rng) => {
      const v = rng.int(1, 8) * 10;
      // y = v t − 5t², max at t = v/10, height v²/20
      return num(`y = ${v}t − 5t². Find the greatest height of the ball.`, (v * v) / 20, {
        hints: ["dy/dt = 0 at the top.", `${v} − 10t = 0, t = ${v / 10}.`], solution: [`y = ${v}(${v / 10}) − 5(${v / 10})² = ${(v * v) / 20} m`],
      });
    }),
  ],
};

/* ========================= Unit 9: Differentiation ========================= */
const U9 = {
  [S(9, 1)]: [
    C(9, 1, "differentiate-sin-cos", (rng) => {
      const a = nz(rng, -5, 5), k = rng.int(1, 5), f = rng.pick(["sin", "cos"]);
      const right = f === "sin" ? `${co(a * k, "")}cos ${co(k, "x")}` : `${co(-a * k, "")}sin ${co(k, "x")}`;
      const w1 = f === "sin" ? `${co(-a * k, "")}cos ${co(k, "x")}` : `${co(a * k, "")}sin ${co(k, "x")}`;
      const w2 = f === "sin" ? `${co(a, "")}cos ${co(k, "x")}` : `${co(-a, "")}sin ${co(k, "x")}`;
      if (w2 === right) return null;
      return mc3(rng, `Differentiate y = ${co(a, "")}${f} ${co(k, "x")}.`, right.replace(/^1(?=[a-z])/, "").replace(/^−1(?=[a-z])/, "−"), [[w1, f === "sin" ? "d/dx sin is +cos." : "d/dx cos is −sin."], [w2, `Multiply by ${k} (chain rule).`]], {
        hints: [f === "sin" ? "d/dx sin kx = k cos kx." : "d/dx cos kx = −k sin kx.", `Multiply ${a} by ${k}.`], solution: [`dy/dx = ${right}`],
      });
    }),
    E(9, 1, "trig-gradient-value", (rng) => {
      const a = nz(rng, -5, 5), k = rng.int(1, 4), f = rng.pick(["sin", "cos"]), x = rng.pick([0, Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 1, 0.5]);
      const xs = { 0: "0", [Math.PI / 6]: "π/6", [Math.PI / 4]: "π/4", [Math.PI / 3]: "π/3", [Math.PI / 2]: "π/2", 1: "1", 0.5: "0.5" }[x];
      const g = round(f === "sin" ? a * k * Math.cos(k * x) : -a * k * Math.sin(k * x), 3);
      return num(`Find the gradient of y = ${co(a, "")}${f} ${co(k, "x")} at x = ${xs}, to 3 decimal places.`, g, {
        dp: 3, hints: [f === "sin" ? `dy/dx = ${a * k} cos ${k}x.` : `dy/dx = ${-a * k} sin ${k}x.`, "Calculator in radians."], solution: [`= ${fmt(g, 3)}`],
      });
    }),
  ],
  [S(9, 2)]: [
    R("y12-u12-l2", "gradient-ekx", 9, 2, 1),
    E(9, 2, "ln-and-ax-gradient", (rng) => {
      const kind = rng.int(0, 1), x = rng.int(1, 5);
      if (kind === 0) {
        const a = rng.int(1, 6), k = rng.int(2, 9);
        const [n, d] = F(a, x);
        return frac(`Find the gradient of y = ${co(a, "")}ln ${k}x at x = ${x}.`, n, d, {
          answerText: fText(a, x), traps: [T((a * k) / x, `ln ${k}x = ln ${k} + ln x, so the ${k} disappears.`)],
          hints: [`d/dx ln ${k}x = 1/x.`, `${a} × 1/${x}.`], solution: [`= ${fText(a, x)}`],
        });
      }
      const b = rng.pick([2, 3, 5, 10]);
      const g = round(b ** x * Math.log(b), 3);
      return num(`Find the gradient of y = ${b}ˣ at x = ${x}, to 3 decimal places.`, g, {
        dp: 3, traps: [T(round(x * b ** (x - 1), 3), `${b}ˣ isn't a power of x: d/dx aˣ = aˣ ln a.`)],
        hints: ["d/dx aˣ = aˣ ln a.", `${b}${sup(x)} × ln ${b}.`], solution: [`= ${fmt(g, 3)}`],
      });
    }),
  ],
  [S(9, 3)]: [
    C(9, 3, "chain-rule-power", (rng) => {
      const a = rng.int(1, 5), b = nz(rng, -6, 6), n = rng.int(2, 6), x = rng.int(-2, 2);
      const g = n * a * (a * x + b) ** (n - 1);
      return num(`Find the gradient of y = (${co(a, "x")} ${sg(b)})${sup(n)} at x = ${x}.`, g, {
        traps: a !== 1 ? [T(n * (a * x + b) ** (n - 1), `Multiply by the derivative of the inside, ${a}.`)] : [],
        hints: [`dy/dx = ${n}(${co(a, "x")} ${sg(b)})${sup(n - 1)} × ${a}.`, `At x = ${x}, the bracket is ${a * x + b}.`], solution: [`${n} × ${(a * x + b) ** (n - 1)} × ${a} = ${g}`],
      });
    }),
    E(9, 3, "chain-rule-exp", (rng) => {
      const a = rng.int(1, 3), b = rng.int(-2, 2), x = round(rng.int(-10, 10) / 10, 1);
      // y = e^(a x² + b), dy/dx = 2a x e^(a x² + b)
      const g = round(2 * a * x * Math.exp(a * x * x + b), 3);
      return num(`Find the gradient of y = e^(${co(a, "x²")} ${sg(b)}) at x = ${fmt(x)}, to 3 decimal places.`, g, {
        dp: 3, hints: [`dy/dx = ${2 * a}x e^(${a}x² ${sg(b)}).`, `Substitute x = ${fmt(x)}.`], solution: [`= ${fmt(g, 3)}`],
      });
    }),
  ],
  [S(9, 4)]: [
    C(9, 4, "product-rule-value", (rng) => {
      const n = rng.int(1, 3), k = rng.int(1, 3), x = round(rng.int(1, 15) / 10, 1);
      // y = xⁿ e^(kx), y′ = xⁿ⁻¹ e^(kx)(n + kx)
      const g = round(x ** (n - 1) * Math.exp(k * x) * (n + k * x), 3);
      return num(`Find the gradient of y = x${n === 1 ? "" : sup(n)}e^(${co(k, "x")}) at x = ${fmt(x)}, to 3 decimal places.`, g, {
        dp: 3, traps: [T(round(n * x ** (n - 1) * k * Math.exp(k * x), 3), "The product rule is u v′ + v u′, not u′ v′.")],
        hints: [`u = x${n === 1 ? "" : sup(n)}, v = e^(${k}x).`, `dy/dx = x${n === 1 ? "" : sup(n)} × ${k}e^(${k}x) + ${n === 1 ? "" : n + "x" + (n - 1 === 1 ? "" : sup(n - 1))}e^(${k}x)${n === 1 ? " × 1" : ""}.`], solution: [`= ${fmt(g, 3)}`],
      });
    }),
    E(9, 4, "product-rule-stationary", (rng) => {
      const k = rng.int(1, 5);
      // y = x e^(−kx): y′ = e^(−kx)(1 − kx) = 0 at x = 1/k
      return frac(`Find the x-coordinate of the stationary point of y = xe^(−${k === 1 ? "" : k}x).`, 1, k, {
        hints: [`dy/dx = e^(−${k}x) − ${k}xe^(−${k}x) = e^(−${k}x)(1 − ${k}x).`, "e^(…) is never 0."], solution: [`1 − ${k}x = 0, x = ${fText(1, k)}`],
      });
    }),
  ],
  [S(9, 5)]: [
    C(9, 5, "quotient-rule-value", (rng) => {
      const a = rng.int(1, 5), b = rng.int(1, 6), x = rng.int(0, 4);
      // y = x/(a x + b): y′ = b/(ax + b)²
      const [n, d] = F(b, (a * x + b) ** 2);
      return frac(`Find the gradient of y = x/(${co(a, "x")} + ${b}) at x = ${x}.`, n, d, {
        answerText: fText(b, (a * x + b) ** 2),
        hints: ["Quotient rule: (v u′ − u v′)/v².", `(${a}x + ${b})(1) − x(${a}) = ${b}, over (${a}x + ${b})².`], solution: [`dy/dx = ${b}/(${a}x + ${b})²`, `At x = ${x}: ${fText(b, (a * x + b) ** 2)}`],
      });
    }),
    E(9, 5, "quotient-rule-exp", (rng) => {
      const k = rng.int(1, 3), x = round(rng.int(5, 30) / 10, 1);
      // y = e^(kx)/x: y′ = e^(kx)(kx − 1)/x²
      const g = round(Math.exp(k * x) * (k * x - 1) / (x * x), 3);
      return num(`Find the gradient of y = e^(${co(k, "x")})/x at x = ${fmt(x)}, to 3 decimal places.`, g, {
        dp: 3, hints: ["v u′ − u v′ over v².", `dy/dx = e^(${k}x)(${k}x − 1)/x².`], solution: [`= ${fmt(g, 3)}`],
      });
    }),
  ],
  [S(9, 6)]: [
    C(9, 6, "trig-derivative-choice", (rng) => bankMC(rng, [
      ["Differentiate tan x.", "sec²x", "−sec²x", "sec x tan x", "Write tan x = sin x/cos x and use the quotient rule.", "d/dx tan x = sec²x."],
      ["Differentiate sec x.", "sec x tan x", "sec²x", "−sec x tan x", "sec x = (cos x)⁻¹.", "−(cos x)⁻² × (−sin x) = sec x tan x."],
      ["Differentiate cosec x.", "−cosec x cot x", "cosec x cot x", "−cosec²x", "cosec x = (sin x)⁻¹.", "−(sin x)⁻² cos x = −cosec x cot x."],
      ["Differentiate cot x.", "−cosec²x", "cosec²x", "−cot x cosec x", "cot x = cos x/sin x.", "Quotient rule gives −1/sin²x."],
      ["Differentiate tan 3x.", "3sec²3x", "sec²3x", "3sec 3x tan 3x", "Chain rule: × 3.", "3sec²3x."],
    ])),
    E(9, 6, "tan-gradient", (rng) => {
      const a = nz(rng, -4, 4), k = rng.int(1, 3), x = round(rng.int(1, 6) / 10, 1);
      const g = round((a * k) / Math.cos(k * x) ** 2, 3);
      return num(`Find the gradient of y = ${co(a, "")}tan ${co(k, "x")} at x = ${fmt(x)}, to 3 decimal places.`, g, {
        dp: 3, hints: [`dy/dx = ${a * k} sec²${k}x = ${a * k}/cos²${k}x.`, "Calculator in radians."], solution: [`= ${fmt(g, 3)}`],
      });
    }),
  ],
  [S(9, 7)]: [
    C(9, 7, "parametric-gradient", (rng) => {
      const a = rng.int(1, 4), b = rng.int(1, 4), t = nz(rng, -3, 3);
      // x = a t², y = b t³: dy/dx = 3b t² / 2a t = 3bt/2a
      const [n, d] = F(3 * b * t, 2 * a);
      return frac(`x = ${co(a, "t²")}, y = ${co(b, "t³")}. Find dy/dx when t = ${t}.`, n, d, {
        answerText: fText(3 * b * t, 2 * a), traps: Math.abs((3 * b * t) / (2 * a)) === 1 ? [] : [T((2 * a) / (3 * b * t), "dy/dx = (dy/dt) ÷ (dx/dt): y's derivative on top.")],
        hints: [`dx/dt = ${2 * a}t, dy/dt = ${3 * b}t².`, `dy/dx = ${3 * b}t² ÷ ${2 * a}t.`], solution: [`= ${fText(3 * b, 2 * a)}t = ${fText(3 * b * t, 2 * a)}`],
      });
    }),
    E(9, 7, "parametric-trig-gradient", (rng) => {
      const a = rng.int(1, 5), b = rng.int(1, 5), t = rng.pick([Math.PI / 6, Math.PI / 4, Math.PI / 3, 1, 0.5]);
      const ts = { [Math.PI / 6]: "π/6", [Math.PI / 4]: "π/4", [Math.PI / 3]: "π/3", 1: "1", 0.5: "0.5" }[t];
      // x = a cos t, y = b sin t: dy/dx = −b cos t/(a sin t)
      const g = round((-b * Math.cos(t)) / (a * Math.sin(t)), 3);
      return num(`x = ${co(a, "")}cos t, y = ${co(b, "")}sin t. Find dy/dx at t = ${ts}, to 3 decimal places.`, g, {
        dp: 3, hints: [`dx/dt = −${a} sin t, dy/dt = ${b} cos t.`, `dy/dx = −${b} cos t/(${a} sin t).`], solution: [`= ${fmt(g, 3)}`],
      });
    }),
  ],
  [S(9, 8)]: [
    C(9, 8, "implicit-circle", (rng) => {
      const [p, q, r] = rng.pick(PYTH), sx = rng.pick([1, -1]), sy = rng.pick([1, -1]), sw = rng.chance(0.5);
      const x = sx * (sw ? q : p), y = sy * (sw ? p : q);
      const [n, d] = F(-x, y);
      return frac(`x² + y² = ${r * r}. Find dy/dx at (${x}, ${y}).`, n, d, {
        answerText: fText(-x, y), traps: [T(y / x, "dy/dx = −x/y.")],
        hints: ["Differentiate: 2x + 2y dy/dx = 0.", "dy/dx = −x/y."], solution: [`= −(${x})/(${y}) = ${fText(-x, y)}`],
      });
    }),
    E(9, 8, "implicit-xy", (rng) => {
      const x = nz(rng, -4, 4), y = nz(rng, -4, 4), a = rng.int(1, 3);
      // x² + a x y + y² = K: 2x + a(x y′ + y) + 2y y′ = 0 → y′ = −(2x + a y)/(a x + 2y)
      const K = x * x + a * x * y + y * y, den = a * x + 2 * y;
      if (den === 0) return null;
      const [n, d] = F(-(2 * x + a * y), den);
      return frac(`x² + ${co(a, "xy")} + y² = ${K}. Find dy/dx at (${x}, ${y}).`, n, d, {
        answerText: fText(-(2 * x + a * y), den),
        hints: [`d/dx(${co(a, "xy")}) = ${a}(x dy/dx + y) by the product rule.`, `2x + ${a}x dy/dx + ${a}y + 2y dy/dx = 0.`], solution: [`dy/dx = −(2x + ${a}y)/(${a}x + 2y)`, `= ${fText(-(2 * x + a * y), den)}`],
      });
    }),
  ],
  [S(9, 9)]: [
    C(9, 9, "inflection-cubic", (rng) => {
      const a = nz(rng, -3, 3), h = rng.int(-4, 4), c = rng.int(-6, 6), d = rng.int(-9, 9);
      // y = a x³ − 3a h x² + c x + d: y″ = 6a x − 6a h = 0 at x = h
      return num(`Find the x-coordinate of the point of inflection of y = ${co(a, "x³")} ${sgv(-3 * a * h, "x²")} ${sgv(c, "x")} ${sg(d)}.`.replace(/ [+−] 0x²| [+−] 0x| [+−] 0$/g, "").replace(/ \+ 0\./, "."), h, {
        hints: [`d²y/dx² = ${6 * a}x ${sg(-6 * a * h)}.`, "Set it equal to 0."], solution: [`x = ${h}`],
      });
    }),
    E(9, 9, "convex-interval", (rng) => {
      const a = rng.pick([1, 2, -1, -2]), h = nz(rng, -4, 4);
      const conv = a > 0 ? `x > ${h}` : `x < ${h}`;
      return mc3(rng, `For which values of x is y = ${co(a, "x³")} ${sgv(-3 * a * h, "x²")} convex?`.replace(/ [+−] 0x²/, ""), conv, [[a > 0 ? `x < ${h}` : `x > ${h}`, "Convex means f″(x) > 0."], [`x > ${-h}`, "Check the sign of the root."]].filter(([o]) => o !== conv), {
        hints: [`f″(x) = ${6 * a}x ${sg(-6 * a * h)}.`, "Solve f″(x) > 0."], solution: [`f″(x) > 0 for ${conv}`],
      });
    }),
  ],
  [S(9, 10)]: [
    C(9, 10, "connected-rates", (rng) => {
      const kind = rng.int(0, 1), x = rng.int(2, 6), r = rng.int(1, 5);
      if (kind === 0) return num(`A cube's side increases at ${r} cm/s. Find the rate the volume increases when the side is ${x} cm.`, 3 * x * x * r, {
        unit: "cm³/s", hints: ["V = x³, so dV/dx = 3x².", `dV/dt = 3x² × ${r}.`], solution: [`3 × ${x * x} × ${r} = ${3 * x * x * r} cm³/s`],
      });
      return num(`A square's side increases at ${r} cm/s. Find the rate its area increases when the side is ${x} cm.`, 2 * x * r, {
        unit: "cm²/s", hints: ["A = x², dA/dx = 2x.", `dA/dt = 2x × ${r}.`], solution: [`${2 * x * r} cm²/s`],
      });
    }),
    E(9, 10, "connected-rates-circle", (rng) => {
      const r = rng.int(2, 10), dr = round(rng.int(1, 9) / 10, 1);
      const v = round(2 * Math.PI * r * dr, 2);
      return num(`A circle's radius grows at ${fmt(dr)} cm/s. Find the rate of increase of its area when r = ${r} cm, to 2 decimal places.`, v, {
        dp: 2, unit: "cm²/s", hints: ["A = πr², dA/dr = 2πr.", `dA/dt = 2π(${r})(${fmt(dr)}).`], solution: [`= ${fmt(v, 2)} cm²/s`],
      });
    }),
  ],
};

/* ======================= Unit 10: Numerical methods ======================= */
const U10 = {
  [S(10, 1)]: [
    C(10, 1, "sign-change-value", (rng) => {
      const a = rng.int(-5, 5), b = rng.int(-9, 9), x = rng.int(-3, 3);
      const v = x ** 3 + a * x + b;
      return num(`f(x) = x³ ${sgv(a, "x")} ${sg(b)}. Find f(${x}) to help locate a root.`.replace(" + 0x", "").replace(" − 0x", ""), v, {
        hints: [`Substitute x = ${x}.`, `(${x})³ + ${a}(${x}) ${sg(b)}.`], solution: [`f(${x}) = ${v}`],
      });
    }),
    E(10, 1, "locate-root-interval", (rng) => {
      const a = rng.int(-6, -1), b = rng.int(-5, 5);
      const f = (x) => x ** 3 + a * x + b;
      // find the integer n with f(n) and f(n+1) of opposite sign (largest such n)
      let n = null; for (let k = 5; k >= -5; k--) if (f(k) * f(k + 1) < 0) { n = k; break; }
      if (n === null) return null;
      return num(`f(x) = x³ ${sgv(a, "x")} ${sg(b)}. The largest root lies between n and n + 1, where n is an integer. Find n.`, n, {
        hints: ["Work out f(x) for whole-number values.", "Look for where the sign changes."], solution: [`f(${n}) = ${f(n)}, f(${n + 1}) = ${f(n + 1)}`, `Sign change, so n = ${n}`],
      });
    }),
  ],
  [S(10, 2)]: [
    C(10, 2, "iteration-step", (rng) => {
      const c = rng.int(2, 9), x0 = rng.int(1, 3);
      const x1 = round(Math.sqrt(x0 + c), 4);
      return num(`Use xₙ₊₁ = √(xₙ + ${c}) with x₀ = ${x0} to find x₁, to 4 decimal places.`, x1, {
        dp: 4, hints: [`x₁ = √(${x0} + ${c}).`, `√${x0 + c}.`], solution: [`x₁ = ${fmt(x1, 4)}`],
      });
    }),
    E(10, 2, "iteration-three-steps", (rng) => {
      const c = rng.int(2, 9), x0 = rng.int(1, 3), k = rng.int(2, 4);
      let x = x0; for (let i = 0; i < 3; i++) x = Math.cbrt(k * x + c);
      return num(`Use xₙ₊₁ = ∛(${k}xₙ + ${c}) with x₀ = ${x0} to find x₃, to 4 decimal places.`, round(x, 4), {
        dp: 4, hints: ["Use the ANS key: don't round between steps.", `x₁ = ∛(${k * x0 + c}).`], solution: [`x₃ = ${fmt(round(x, 4), 4)}`],
      });
    }),
  ],
  [S(10, 3)]: [
    C(10, 3, "newton-one-step", (rng) => {
      const c = rng.int(2, 20), x0 = rng.int(1, 5);
      // f = x² − c: x1 = x0 − (x0² − c)/(2x0)
      const x1 = round(x0 - (x0 * x0 - c) / (2 * x0), 4);
      return num(`f(x) = x² − ${c}. Use one step of Newton–Raphson with x₀ = ${x0} to find x₁, to 4 decimal places.`, x1, {
        dp: 4, traps: [T(round(x0 + (x0 * x0 - c) / (2 * x0), 4), "Subtract f(x₀)/f′(x₀).")],
        hints: ["f′(x) = 2x.", `x₁ = ${x0} − (${x0 * x0 - c})/${2 * x0}.`], solution: [`x₁ = ${fmt(x1, 4)}`],
      });
    }),
    E(10, 3, "newton-cubic", (rng) => {
      const a = rng.int(-5, 5), b = rng.int(-9, 9), x0 = rng.int(1, 3);
      const f = (x) => x ** 3 + a * x + b, d = (x) => 3 * x * x + a;
      if (d(x0) === 0) return null;
      let x = x0; for (let i = 0; i < 2; i++) { if (d(x) === 0) return null; x = x - f(x) / d(x); }
      if (!Number.isFinite(x) || Math.abs(x) > 50) return null;
      return num(`f(x) = x³ ${sgv(a, "x")} ${sg(b)}. Starting with x₀ = ${x0}, use Newton–Raphson twice to find x₂, to 4 decimal places.`.replace(/ [+−] 0x/, ""), round(x, 4), {
        dp: 4, hints: [`f′(x) = 3x² ${sg(a)}.`, "xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ). Keep full values between steps."], solution: [`x₂ = ${fmt(round(x, 4), 4)}`],
      });
    }),
  ],
  [S(10, 4)]: [
    C(10, 4, "accuracy-interval", (rng) => {
      const v = round(rng.int(1000, 9999) / 1000, 3), dp = rng.pick([2, 3]);
      const r = round(v, dp), h = 0.5 * 10 ** -dp;
      return multi(`To show a root is ${fmt(r, dp)} to ${dp} decimal places, which two values of x do you test for a change of sign? (Smaller first.)`, [["x =", round(r - h, dp + 1), dp + 1], ["x =", round(r + h, dp + 1), dp + 1]], {
        hints: ["Test half a unit of the last decimal place either side.", `± ${fmt(h)}.`], solution: [`${fmt(round(r - h, dp + 1), dp + 1)} and ${fmt(round(r + h, dp + 1), dp + 1)}`],
      });
    }),
    E(10, 4, "method-choice", (rng) => bankMC(rng, [
      ["Why might Newton–Raphson fail with a starting value near a turning point?", "f′(x) is close to 0, so the next value is far away", "f(x) is close to 0", "The iteration always converges", "Look at the denominator.", "Dividing by a tiny f′(x) sends xₙ₊₁ a long way off."],
      ["A sign change between x = a and b does NOT prove a root if…", "f is not continuous between a and b", "f(a) is negative", "a and b are close together", "Think about asymptotes.", "A discontinuity can cause a sign change with no root."],
      ["An iteration's values go 1, 3, 11, 123, … What is happening?", "It diverges: try another rearrangement", "It converges to a root", "It's periodic", "Are the values settling down?", "They get further apart."],
      ["Which diagram shows xₙ₊₁ = g(xₙ) converging while alternating either side of the root?", "A cobweb diagram", "A staircase diagram", "A tree diagram", "Alternating gives a spiral.", "Cobwebs spiral in; staircases approach from one side."],
    ])),
  ],
};

/* ========================= Unit 11: Integration ========================= */
const U11 = {
  [S(11, 1)]: [
    C(11, 1, "standard-definite", (rng) => {
      const kind = rng.int(0, 3), a = rng.int(1, 5);
      if (kind === 0) { const b = rng.int(2, 9); const v = round(a * Math.log(b), 3); return num(`Evaluate ∫ from 1 to ${b} of ${a === 1 ? "1" : a}/x dx, to 3 decimal places.`, v, { dp: 3, hints: ["∫1/x dx = ln|x|.", `${a}(ln ${b} − ln 1).`], solution: [`${a} ln ${b} = ${fmt(v, 3)}`] }); }
      if (kind === 1) { const b = round(rng.int(1, 20) / 10, 1); const v = round(a * (Math.exp(b) - 1), 3); return num(`Evaluate ∫ from 0 to ${fmt(b)} of ${co(a, "")}eˣ dx, to 3 decimal places.`, v, { dp: 3, hints: ["∫eˣ dx = eˣ.", `${a}(e^${fmt(b)} − 1).`], solution: [`= ${fmt(v, 3)}`] }); }
      if (kind === 2) { const b = round(rng.int(1, 15) / 10, 1); const v = round(a * Math.sin(b), 3); return num(`Evaluate ∫ from 0 to ${fmt(b)} of ${co(a, "")}cos x dx, to 3 decimal places.`, v, { dp: 3, traps: [T(round(-a * Math.sin(b), 3), "∫cos x = +sin x.")], hints: ["∫cos x dx = sin x.", "Radians."], solution: [`${a} sin ${fmt(b)} = ${fmt(v, 3)}`] }); }
      const b = round(rng.int(1, 15) / 10, 1); const v = round(a * (1 - Math.cos(b)), 3);
      return num(`Evaluate ∫ from 0 to ${fmt(b)} of ${co(a, "")}sin x dx, to 3 decimal places.`, v, { dp: 3, traps: [T(round(a * (Math.cos(b) - 1), 3), "∫sin x = −cos x: watch the signs.")], hints: ["∫sin x dx = −cos x.", `${a}[−cos x] from 0 to ${fmt(b)}.`], solution: [`${a}(1 − cos ${fmt(b)}) = ${fmt(v, 3)}`] });
    }),
    E(11, 1, "standard-mixed", (rng) => {
      const a = rng.int(1, 6), b = rng.int(1, 4), u = rng.int(2, 5);
      // ∫1^u (a/x + 2b x) dx = a ln u + b(u² − 1)
      const v = round(a * Math.log(u) + b * (u * u - 1), 3);
      return num(`Evaluate ∫ from 1 to ${u} of (${a}/x + ${co(2 * b, "x")}) dx, to 3 decimal places.`, v, {
        dp: 3, hints: [`∫${a}/x dx = ${a} ln x; ∫${2 * b}x dx = ${co(b, "x²")}.`, `[${a} ln x + ${co(b, "x²")}] from 1 to ${u}.`], solution: [`${a} ln ${u} + ${b}(${u * u} − 1) = ${fmt(v, 3)}`],
      });
    }),
  ],
  [S(11, 2)]: [
    C(11, 2, "linear-inside-power", (rng) => {
      const a = rng.int(2, 4), b = rng.int(-3, 3), n = rng.int(2, 4), lo = 0, hi = 1;
      const Fn = (x) => (a * x + b) ** (n + 1) / (a * (n + 1));
      const top = (a * hi + b) ** (n + 1) - (a * lo + b) ** (n + 1);
      if (top === 0) return null;   // symmetric cases give 0: not a useful question
      return frac(`Evaluate ∫ from ${lo} to ${hi} of (${a}x ${sg(b)})${sup(n)} dx exactly.`, ...F(top, a * (n + 1)), {
        answerText: fText(top, a * (n + 1)), traps: [T(top / (n + 1), `Divide by ${a} as well (the derivative of the inside).`)],
        hints: [`∫(${a}x ${sg(b)})${sup(n)} dx = (${a}x ${sg(b)})${sup(n + 1)}/(${a} × ${n + 1}).`, "Substitute the limits."], solution: [`= ${fText(top, a * (n + 1))}`], data: { check: Fn(hi) - Fn(lo) },
      });
    }),
    E(11, 2, "linear-inside-exp", (rng) => {
      const a = rng.int(2, 5), b = rng.int(-2, 2), up = round(rng.int(1, 10) / 10, 1);
      const v = round((Math.exp(a * up + b) - Math.exp(b)) / a, 3);
      return num(`Evaluate ∫ from 0 to ${fmt(up)} of e^(${a}x ${sg(b)}) dx, to 3 decimal places.`, v, {
        dp: 3, traps: [T(round(Math.exp(a * up + b) - Math.exp(b), 3), `Divide by ${a}.`)],
        hints: [`∫e^(${a}x ${sg(b)}) dx = (1/${a})e^(${a}x ${sg(b)}).`, "Top limit minus bottom."], solution: [`= ${fmt(v, 3)}`],
      });
    }),
  ],
  [S(11, 3)]: [
    C(11, 3, "sin-squared-integral", (rng) => {
      const f = rng.pick(["sin", "cos"]), up = rng.pick([Math.PI / 2, Math.PI, Math.PI / 4, 1]);
      const us = { [Math.PI / 2]: "π/2", [Math.PI]: "π", [Math.PI / 4]: "π/4", 1: "1" }[up];
      const v = round(f === "sin" ? up / 2 - Math.sin(2 * up) / 4 : up / 2 + Math.sin(2 * up) / 4, 3);
      return num(`Evaluate ∫ from 0 to ${us} of ${f}²x dx, to 3 decimal places.`, v, {
        dp: 3, hints: [`${f}²x = ½(1 ${f === "sin" ? "−" : "+"} cos 2x).`, `∫ = ½x ${f === "sin" ? "−" : "+"} ¼ sin 2x.`], solution: [`= ${fmt(v, 3)}`],
      });
    }),
    E(11, 3, "tan-squared-integral", (rng) => {
      const up = round(rng.int(1, 12) / 10, 1);
      const v = round(Math.tan(up) - up, 3);
      return num(`Evaluate ∫ from 0 to ${fmt(up)} of tan²x dx, to 3 decimal places.`, v, {
        dp: 3, hints: ["tan²x = sec²x − 1.", "∫ = tan x − x."], solution: [`tan ${fmt(up)} − ${fmt(up)} = ${fmt(v, 3)}`],
      });
    }),
  ],
  [S(11, 4)]: [
    C(11, 4, "f-prime-over-f", (rng) => {
      const a = rng.int(1, 5), up = rng.int(1, 4);
      // ∫0^up 2x/(x² + a) dx = ln((up² + a)/a)
      const v = round(Math.log((up * up + a) / a), 3);
      return num(`Evaluate ∫ from 0 to ${up} of 2x/(x² + ${a}) dx, to 3 decimal places.`, v, {
        dp: 3, hints: ["The top is the derivative of the bottom.", `∫ = ln(x² + ${a}).`], solution: [`ln(${up * up + a}) − ln(${a}) = ${fmt(v, 3)}`],
      });
    }),
    E(11, 4, "reverse-chain-power", (rng) => {
      const a = rng.int(1, 4), n = rng.int(2, 4), up = rng.int(1, 2);
      // ∫0^up x (x² + a)ⁿ dx = [(x² + a)ⁿ⁺¹ / (2(n+1))]
      const top = (up * up + a) ** (n + 1) - a ** (n + 1);
      return frac(`Evaluate ∫ from 0 to ${up} of x(x² + ${a})${sup(n)} dx exactly.`, ...F(top, 2 * (n + 1)), {
        answerText: fText(top, 2 * (n + 1)), traps: [T(top / (n + 1), "x is HALF the derivative of x² + " + a + ": divide by 2 too.")],
        hints: [`d/dx (x² + ${a})${sup(n + 1)} = ${2 * (n + 1)}x(x² + ${a})${sup(n)}.`, `So ∫ = (x² + ${a})${sup(n + 1)}/${2 * (n + 1)}.`], solution: [`= ${fText(top, 2 * (n + 1))}`],
      });
    }),
  ],
  [S(11, 5)]: [
    C(11, 5, "substitution-limits", (rng) => {
      const a = rng.int(1, 6), lo = rng.int(0, 2), hi = lo + rng.int(1, 3);
      return multi(`For ∫ from ${lo} to ${hi} of x√(x² + ${a}) dx, use u = x² + ${a}. Find the new limits for u.`, [["lower u =", lo * lo + a], ["upper u =", hi * hi + a]], {
        hints: ["Substitute each x-limit into u = x² + " + a + ".", `x = ${lo} gives u = ${lo * lo + a}.`], solution: [`u from ${lo * lo + a} to ${hi * hi + a}`],
      });
    }),
    E(11, 5, "substitution-value", (rng) => {
      const a = rng.int(1, 6), hi = rng.int(1, 3);
      // ∫0^hi x√(x² + a) dx = (1/3)[(x² + a)^(3/2)]
      const v = round(((hi * hi + a) ** 1.5 - a ** 1.5) / 3, 3);
      return num(`Use u = x² + ${a} to evaluate ∫ from 0 to ${hi} of x√(x² + ${a}) dx, to 3 decimal places.`, v, {
        dp: 3, hints: ["du = 2x dx, so x dx = ½ du.", `½∫ u^(½) du from ${a} to ${hi * hi + a} = ⅓[u^(3/2)].`], solution: [`⅓(${hi * hi + a}^(3/2) − ${a}^(3/2)) = ${fmt(v, 3)}`], data: { check: simpson((x) => x * Math.sqrt(x * x + a), 0, hi) },
      });
    }, (q) => Math.abs(q.data.check - q.answer.value) < 0.001),
  ],
  [S(11, 6)]: [
    C(11, 6, "parts-xex", (rng) => {
      const k = rng.int(1, 3), up = rng.int(1, 2);
      // ∫0^up x e^(kx) dx = e^(kx)(x/k − 1/k²) |0..up
      const v = round(Math.exp(k * up) * (up / k - 1 / (k * k)) + 1 / (k * k), 3);
      return num(`Evaluate ∫ from 0 to ${up} of xe^(${co(k, "x")}) dx, to 3 decimal places.`, v, {
        dp: 3, hints: ["By parts: u = x, dv/dx = e^(" + k + "x).", `∫ = (x/${k})e^(${k}x) − (1/${k * k})e^(${k}x).`], solution: [`= ${fmt(v, 3)}`], data: { check: simpson((x) => x * Math.exp(k * x), 0, up) },
      });
    }, (q) => Math.abs(q.data.check - q.answer.value) < 0.001),
    E(11, 6, "parts-lnx", (rng) => {
      const n = rng.int(0, 2), up = rng.int(2, 5);
      // ∫1^up xⁿ ln x dx = [x^(n+1) ln x/(n+1) − x^(n+1)/(n+1)²]
      const Fn = (x) => (x ** (n + 1) * Math.log(x)) / (n + 1) - x ** (n + 1) / (n + 1) ** 2;
      const v = round(Fn(up) - Fn(1), 3);
      return num(`Evaluate ∫ from 1 to ${up} of ${n === 0 ? "" : n === 1 ? "x " : "x² "}ln x dx, to 3 decimal places.`, v, {
        dp: 3, hints: ["By parts with u = ln x (logs first in LATE).", `dv/dx = ${n === 0 ? "1" : n === 1 ? "x" : "x²"}, v = ${n === 0 ? "x" : n === 1 ? "½x²" : "⅓x³"}.`], solution: [`= ${fmt(v, 3)}`], data: { check: simpson((x) => x ** n * Math.log(x), 1, up) },
      });
    }, (q) => Math.abs(q.data.check - q.answer.value) < 0.001),
  ],
  [S(11, 7)]: [
    C(11, 7, "pf-integral", (rng) => {
      const A = rng.int(1, 5), B = nz(rng, -4, 4), p = rng.int(1, 3), q = rng.int(1, 3), up = rng.int(1, 3);
      // ∫0^up (A/(x + p) + B/(x + q)) dx
      const v = round(A * Math.log((up + p) / p) + B * Math.log((up + q) / q), 3);
      return num(`Evaluate ∫ from 0 to ${up} of (${A}/(x + ${p}) ${sg(B)}/(x + ${q})) dx, to 3 decimal places.`, v, {
        dp: 3, hints: ["∫A/(x + p) dx = A ln|x + p|.", `[${A} ln(x + ${p}) ${sg(B)} ln(x + ${q})] from 0 to ${up}.`], solution: [`= ${fmt(v, 3)}`],
      });
    }),
    E(11, 7, "pf-then-integrate", (rng) => {
      const p = rng.int(1, 3), q = p + rng.int(1, 3), up = rng.int(1, 3);
      // 1/((x+p)(x+q)) = (1/(q−p))(1/(x+p) − 1/(x+q))
      const v = round((Math.log((up + p) / p) - Math.log((up + q) / q)) / (q - p), 4);
      return num(`Evaluate ∫ from 0 to ${up} of 1/((x + ${p})(x + ${q})) dx, to 4 decimal places.`, v, {
        dp: 4, hints: [`Partial fractions: ${fText(1, q - p)}(1/(x + ${p}) − 1/(x + ${q})).`, "Integrate each to ln."], solution: [`= ${fmt(v, 4)}`], data: { check: simpson((x) => 1 / ((x + p) * (x + q)), 0, up) },
      });
    }, (q) => Math.abs(q.data.check - q.answer.value) < 0.0001),
  ],
  [S(11, 8)]: [
    C(11, 8, "area-exp-curve", (rng) => {
      const k = rng.int(1, 3), up = rng.int(1, 3);
      const v = round((Math.exp(k * up) - 1) / k, 3);
      return num(`Find the area under y = e^(${co(k, "x")}) between x = 0 and x = ${up}, to 3 decimal places.`, v, {
        dp: 3, hints: [`∫e^(${k}x) dx = (1/${k})e^(${k}x).`, "Top minus bottom."], solution: [`= ${fmt(v, 3)}`],
      });
    }),
    E(11, 8, "area-sin-curve", (rng) => {
      const k = rng.int(1, 4), a = rng.int(1, 5);
      // area under a sin(kx) from 0 to π/k = 2a/k
      const [n, d] = F(2 * a, k);
      return frac(`Find the area enclosed by y = ${co(a, "")}sin ${co(k, "x")} and the x-axis, between x = 0 and x = π/${k === 1 ? "1" : k}.`.replace("π/1", "π"), n, d, {
        answerText: fText(2 * a, k), hints: [`∫${a} sin ${k}x dx = −(${a}/${k}) cos ${k}x.`, `cos π = −1 and cos 0 = 1.`], solution: [`(${a}/${k})(1 − (−1)) = ${fText(2 * a, k)}`],
      });
    }),
  ],
  [S(11, 9)]: [
    C(11, 9, "trapezium-rule", (rng) => {
      const n = rng.pick([2, 4]), b = rng.pick([2, 4]), k = rng.int(1, 3);
      const f = (x) => Math.sqrt(x * x + k), h = b / n;
      let s = f(0) + f(b); for (let i = 1; i < n; i++) s += 2 * f(i * h);
      const v = round((h / 2) * s, 3);
      return num(`Use the trapezium rule with ${n} strips to estimate ∫ from 0 to ${b} of √(x² + ${k}) dx, to 3 decimal places.`, v, {
        dp: 3, hints: [`h = ${b}/${n} = ${fmt(h)}.`, "½h[y₀ + 2(middle y-values) + yₙ]."], solution: [`= ${fmt(v, 3)}`],
      });
    }),
    E(11, 9, "trapezium-over-under", (rng) => bankMC(rng, [
      ["The trapezium rule is used on y = x² (convex) for 0 ≤ x ≤ 2. The estimate is…", "an overestimate", "an underestimate", "exact", "Convex curves sag below the chords.", "The trapezium tops lie above the curve."],
      ["The trapezium rule is used on y = √x (concave) for 1 ≤ x ≤ 4. The estimate is…", "an underestimate", "an overestimate", "exact", "Concave curves bulge above the chords.", "The trapezia sit below the curve."],
      ["The trapezium rule is used on y = eˣ. The estimate is…", "an overestimate", "an underestimate", "exact", "eˣ is convex.", "Its second derivative is positive."],
      ["How can you make a trapezium rule estimate more accurate?", "Use more strips", "Use fewer strips", "Round more", "Narrower strips fit the curve better.", "More strips, smaller h."],
      ["The trapezium rule is used on y = 3x + 1. The estimate is…", "exact", "an overestimate", "an underestimate", "The graph is a straight line.", "Trapezia fit a straight line exactly."],
    ])),
  ],
  [S(11, 10)]: [
    C(11, 10, "de-growth", (rng) => {
      const A = rng.int(1, 9), k = round(rng.int(1, 9) / 10, 1), x = rng.int(1, 4);
      const v = round(A * Math.exp(k * x), 3);
      return num(`dy/dx = ${fmt(k)}y and y = ${A} when x = 0. Find y when x = ${x}, to 3 decimal places.`, v, {
        dp: 3, hints: [`Separate: ∫1/y dy = ∫${fmt(k)} dx, so y = Ae^(${fmt(k)}x).`, `A = ${A}.`], solution: [`y = ${A}e^(${fmt(round(k * x, 2))}) = ${fmt(v, 3)}`],
      });
    }),
    E(11, 10, "de-polynomial", (rng) => {
      const a = nz(rng, -4, 4), b = rng.int(-5, 5), x0 = rng.int(-2, 2), y0 = rng.int(-9, 9), x1 = rng.int(-3, 3);
      // dy/dx = 2a x + b → y = a x² + b x + c
      const c = y0 - a * x0 * x0 - b * x0;
      return num(`dy/dx = ${co(2 * a, "x")} ${sg(b)}, and y = ${y0} when x = ${x0}. Find y when x = ${x1}.`, a * x1 * x1 + b * x1 + c, {
        hints: [`y = ${co(a, "x²")} ${sgv(b, "x")} + c.`, `${y0} = ${a * x0 * x0 + b * x0} + c, so c = ${c}.`], solution: [`y(${x1}) = ${a * x1 * x1 + b * x1 + c}`],
      });
    }),
  ],
  [S(11, 11)]: [
    C(11, 11, "decay-half-life", (rng) => {
      const k = round(rng.int(1, 30) / 100, 2);
      const t = round(Math.log(2) / k, 2);
      return num(`m = m₀e^(−${fmt(k)}t). Find the time for the mass to halve, to 2 decimal places.`, t, {
        dp: 2, hints: [`½ = e^(−${fmt(k)}t).`, `t = ln 2 ÷ ${fmt(k)}.`], solution: [`t = ${fmt(t, 2)}`],
      });
    }),
    E(11, 11, "find-k-from-data", (rng) => {
      const P0 = rng.int(1, 9) * 100, mult = rng.int(2, 5), T = rng.int(2, 10);
      const k = round(Math.log(mult) / T, 4);
      return num(`dP/dt = kP and P = ${P0} at t = 0. After ${T} years P = ${P0 * mult}. Find k to 4 decimal places.`, k, {
        dp: 4, hints: [`P = ${P0}e^(kt), so ${mult} = e^(${T}k).`, `k = ln ${mult} ÷ ${T}.`], solution: [`k = ${fmt(k, 4)}`],
      });
    }),
  ],
  [S(11, 12)]: [
    C(11, 12, "limit-of-sum", (rng) => {
      const a = rng.int(0, 2), b = a + rng.int(1, 3), k = rng.int(1, 4);
      // lim Σ k x² δx = k(b³ − a³)/3
      return frac(`Evaluate the limit as δx → 0 of Σ ${k === 1 ? "" : k}x² δx, from x = ${a} to x = ${b}.`, ...F(k * (b ** 3 - a ** 3), 3), {
        answerText: fText(k * (b ** 3 - a ** 3), 3), hints: [`It equals ∫ from ${a} to ${b} of ${k === 1 ? "" : k}x² dx.`, `[${fText(k, 3)}x³] from ${a} to ${b}.`], solution: [`= ${fText(k * (b ** 3 - a ** 3), 3)}`],
      });
    }),
    E(11, 12, "limit-of-sum-linear", (rng) => {
      const m = rng.int(1, 5), c = rng.int(-3, 5), a = rng.int(0, 2), b = a + rng.int(1, 4);
      const v = (m * (b * b - a * a)) / 2 + c * (b - a);
      return num(`Evaluate the limit as δx → 0 of Σ (${co(m, "x")} ${sg(c)}) δx, from x = ${a} to x = ${b}.`, v, {
        hints: ["Write it as an integral.", `∫ from ${a} to ${b} of (${co(m, "x")} ${sg(c)}) dx.`], solution: [`= ${fmt(v)}`],
      });
    }),
  ],
};

/* ===================== Unit 12: Vectors in three dimensions ===================== */
const PYTH3 = [[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11], [4, 4, 7, 9], [2, 10, 11, 15], [6, 6, 7, 11]];
const U12 = {
  [S(12, 1)]: [
    C(12, 1, "distance-3d", (rng) => {
      const [a, b, c, d] = rng.pick(PYTH3), s = [rng.pick([1, -1]), rng.pick([1, -1]), rng.pick([1, -1])], p = [rng.int(-4, 4), rng.int(-4, 4), rng.int(-4, 4)];
      const o = rng.shuffle([a, b, c]);
      const q = [p[0] + s[0] * o[0], p[1] + s[1] * o[1], p[2] + s[2] * o[2]];
      return num(`Find the distance between (${p.join(", ")}) and (${q.join(", ")}).`, d, {
        traps: [T(d * d, "Take the square root.")], hints: ["√(Δx² + Δy² + Δz²).", `√(${o[0] ** 2} + ${o[1] ** 2} + ${o[2] ** 2}).`], solution: [`√${d * d} = ${d}`],
      });
    }),
    E(12, 1, "distance-3d-unknown", (rng) => {
      const [a, b, c, d] = rng.pick(PYTH3), k = rng.int(-4, 4);
      return num(`The distance from (0, 0, ${k}) to (${a}, ${b}, z) is ${d}, where z > ${k}. Find z.`, k + c, {
        hints: [`${a}² + ${b}² + (z ${sg(-k)})² = ${d * d}.`, `(z ${sg(-k)})² = ${c * c}.`], solution: [`z ${sg(-k)} = ${c}`, `z = ${k + c}`],
      });
    }),
  ],
  [S(12, 2)]: [
    C(12, 2, "magnitude-3d", (rng) => {
      const [a, b, c, d] = rng.pick(PYTH3), o = rng.shuffle([a, b, c]).map((v) => v * rng.pick([1, -1]));
      return num(`Find |${vec3(...o)}|.`, d, {
        hints: ["|a| = √(x² + y² + z²).", `√(${o.map((v) => v * v).join(" + ")}).`], solution: [`= ${d}`],
      });
    }),
    E(12, 2, "angle-with-axis", (rng) => {
      const [a, b, c, d] = rng.pick(PYTH3), o = rng.shuffle([a, b, c]).map((v) => v * rng.pick([1, -1])), ax = rng.int(0, 2);
      const ang = round(deg(Math.acos(o[ax] / d)), 1);
      return num(`Find the angle between ${vec3(...o)} and the positive ${["x", "y", "z"][ax]}-axis, to 1 decimal place.`, ang, {
        dp: 1, hints: [`|a| = ${d}.`, `cos θ = ${o[ax]}/${d}.`], solution: [`θ = cos⁻¹(${o[ax]}/${d}) = ${fmt(ang, 1)}°`],
      });
    }),
  ],
  [S(12, 3)]: [
    C(12, 3, "midpoint-3d", (rng) => {
      const A = [rng.int(-5, 5), rng.int(-5, 5), rng.int(-5, 5)], d = [rng.int(-4, 4) * 2, rng.int(-4, 4) * 2, rng.int(-4, 4) * 2];
      const B = A.map((v, i) => v + d[i]);
      return multi(`Find the midpoint of A(${A.join(", ")}) and B(${B.join(", ")}).`, [["x =", A[0] + d[0] / 2], ["y =", A[1] + d[1] / 2], ["z =", A[2] + d[2] / 2]], {
        hints: ["Average each coordinate.", "½(a + b)."], solution: [`(${A.map((v, i) => v + d[i] / 2).join(", ")})`],
      });
    }),
    E(12, 3, "parallelogram-3d", (rng) => {
      const A = [rng.int(-4, 4), rng.int(-4, 4), rng.int(-4, 4)], B = [rng.int(-4, 4), rng.int(-4, 4), rng.int(-4, 4)], Cc = [rng.int(-4, 4), rng.int(-4, 4), rng.int(-4, 4)];
      const D = A.map((v, i) => v + Cc[i] - B[i]);
      return multi(`ABCD is a parallelogram with A(${A.join(", ")}), B(${B.join(", ")}), C(${Cc.join(", ")}). Find D.`, [["x =", D[0]], ["y =", D[1]], ["z =", D[2]]], {
        hints: ["AD = BC.", "d = a + (c − b)."], solution: [`D(${D.join(", ")})`],
      });
    }),
  ],
  [S(12, 4)]: [
    C(12, 4, "acceleration-3d", (rng) => {
      const m = rng.int(2, 5), a = [nz(rng, -4, 4), rng.int(-4, 4), nz(rng, -4, 4)];
      const Fv = a.map((v) => v * m);
      return multi(`A ${m} kg particle has resultant force (${vec3(...Fv)}) N. Find its acceleration as xi + yj + zk.`, [["x =", a[0]], ["y =", a[1]], ["z =", a[2]]], {
        hints: ["F = ma, so a = F/m.", `Divide each component by ${m}.`], solution: [`a = ${vec3(...a)} m s⁻²`],
      });
    }),
    E(12, 4, "resultant-magnitude-3d", (rng) => {
      const [p, q, r, d] = rng.pick(PYTH3), o = rng.shuffle([p, q, r]).map((v) => v * rng.pick([1, -1]));
      const F1 = [rng.int(-5, 5), rng.int(-5, 5), rng.int(-5, 5)], F2 = o.map((v, i) => v - F1[i]);
      return num(`Two forces (${vec3(...F1)}) N and (${vec3(...F2)}) N act on a particle. Find the magnitude of the resultant force.`, d, {
        traps: [T(round(Math.hypot(...F1) + Math.hypot(...F2), 4), "Add the vectors first, then find the magnitude.")],
        hints: ["Add the forces component by component.", `R = ${vec3(...o)}.`], solution: [`|R| = ${d} N`],
      });
    }),
  ],
};

/* ======================= Unit 21: Exam preparation ======================= */
const U21 = {
  [S(21, 1)]: [
    C(21, 1, "rectangle-problem", (rng) => {
      const w = rng.int(2, 12), d = rng.int(1, 6);
      return num(`A rectangle's length is ${d} cm more than its width. Its area is ${w * (w + d)} cm². Find the width.`, w, {
        unit: "cm", traps: [T(w + d, "That's the length.")],
        hints: [`w(w + ${d}) = ${w * (w + d)}.`, "Solve the quadratic; reject the negative root."], solution: [`w² + ${d}w − ${w * (w + d)} = 0`, `w = ${w} cm`],
      });
    }),
    E(21, 1, "optimise-cylinder", (rng) => {
      const V = rng.int(1, 10) * 100;
      // open-top? closed cylinder min surface area: r = (V/(2π))^(1/3)
      const r = round(Math.cbrt(V / (2 * Math.PI)), 2);
      return num(`A closed cylinder has volume ${V} cm³. Find the radius that minimises its surface area, to 2 decimal places.`, r, {
        dp: 2, unit: "cm", hints: [`h = ${V}/(πr²), so A = 2πr² + ${2 * V}/r.`, `dA/dr = 4πr − ${2 * V}/r² = 0.`], solution: [`r³ = ${V}/(2π)`, `r = ${fmt(r, 2)} cm`],
      });
    }),
  ],
  [S(21, 2)]: [
    C(21, 2, "choose-proof-method", (rng) => bankMC(rng, [
      ["Which method best proves 'there are infinitely many primes'?", "Contradiction", "Exhaustion", "Counter-example", "You can't check them all.", "Assume finitely many and reach a contradiction."],
      ["Which method best disproves 'n² + n + 41 is always prime'?", "Counter-example", "Deduction", "Contradiction", "One failure is enough.", "n = 40 gives 41²."],
      ["Which method best proves 'n³ − n is divisible by 6 for every integer n'?", "Deduction", "Counter-example", "Checking n = 1 to 10", "Factorise: (n − 1)n(n + 1).", "Three consecutive integers include a multiple of 2 and of 3."],
      ["Which method best proves 'every square number from 1² to 10² has a last digit 0, 1, 4, 5, 6 or 9'?", "Exhaustion", "Contradiction", "Counter-example", "There are only ten cases.", "Check each one."],
      ["Which method best proves '√3 is irrational'?", "Contradiction", "Exhaustion", "Deduction from examples", "Assume it's a fraction.", "Assume √3 = a/b in lowest terms."],
    ])),
    R("y12-u6-l6", "find-counter-example", 21, 2, 2),
  ],
  [S(21, 3)]: [
    C(21, 3, "calculator-integral", (rng) => {
      const kind = rng.int(0, 2), b = rng.int(2, 4);
      const [txt, f, a] = [["ln x", (x) => Math.log(x), 1], ["x eˣ", (x) => x * Math.exp(x), 0], ["√(1 + x³)", (x) => Math.sqrt(1 + x ** 3), 0]][kind];
      const v = round(simpson(f, a, b, 2000), 3);
      return num(`Use your calculator's integration function to evaluate ∫ from ${a} to ${b} of ${txt} dx, to 3 decimal places.`, v, {
        dp: 3, hints: ["Use the ∫ button.", "Check the limits and use radians if trig is involved."], solution: [`= ${fmt(v, 3)}`],
      });
    }),
    E(21, 3, "calculator-table-root", (rng) => {
      const c = rng.int(2, 9);
      // root of x³ + x − c, by Newton to high precision
      let x = 1.5; for (let i = 0; i < 40; i++) x -= (x ** 3 + x - c) / (3 * x * x + 1);
      return num(`Use your calculator (table or solve mode) to find the real root of x³ + x − ${c} = 0, to 3 decimal places.`, round(x, 3), {
        dp: 3, hints: ["Table mode: look for the sign change, then zoom in.", "Or use Newton–Raphson with the ANS key."], solution: [`x = ${fmt(round(x, 3), 3)}`],
      });
    }),
  ],
  [S(21, 4)]: [
    C(21, 4, "mixed-sigma", (rng) => {
      const a = rng.int(1, 5), b = rng.int(-3, 5), n = rng.int(10, 40);
      const v = (a * n * (n + 1)) / 2 + b * n;
      return num(`Evaluate Σ from r = 1 to ${n} of (${co(a, "r")} ${sg(b)}).`, v, {
        hints: [`Arithmetic: first term ${a + b}, last term ${a * n + b}.`, "½n(first + last)."], solution: [`= ${v}`],
      });
    }),
    E(21, 4, "mixed-product-gradient", (rng) => {
      const k = rng.int(1, 3), x = round(rng.int(1, 10) / 10, 1);
      // y = x² e^(kx), y′ = x e^(kx)(2 + kx)
      const g = round(x * Math.exp(k * x) * (2 + k * x), 3);
      return num(`Find the gradient of y = x²e^(${co(k, "x")}) at x = ${fmt(x)}, to 3 decimal places.`, g, {
        dp: 3, hints: ["Product rule.", `dy/dx = xe^(${k}x)(2 + ${k}x).`], solution: [`= ${fmt(g, 3)}`],
      });
    }),
  ],
};

export const Y13B_GENERATORS = { ...U7, ...U8, ...U9, ...U10, ...U11, ...U12, ...U21 };
