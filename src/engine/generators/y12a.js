/* ==========================================================================
   Year 12 Pure generators, Part A: Units 1–6 (light format: core + extend)
   Algebraic expressions · Quadratics · Equations and inequalities ·
   Graphs and transformations · Straight lines and circles · Algebraic methods
   --------------------------------------------------------------------------
   Where an A level skill is the same as a GCSE one (e.g. expanding three
   brackets), the GCSE generator is reused with reuse(). Every other
   question is built here from random numbers, with its answer worked out
   from those numbers. The automated test (scripts/test-engine.mjs) makes
   2,000 questions from each generator and checks every one.
   ========================================================================== */
import { fmt, gcd } from "../numbers.js";
import { core, extend, expr, frac, mc3, multi, num, polyMul, polyText, polyExpr, lin, reuse, T } from "./helpers.js";
import { tidyQuestion } from "./tidy.js";
import { Y9A_GENERATORS } from "./y9a.js";
import { Y9B_GENERATORS } from "./y9b.js";
import { Y10A_GENERATORS } from "./y10a.js";
import { Y10B_GENERATORS } from "./y10b.js";
import { Y10C_GENERATORS } from "./y10c.js";
import { Y11A_GENERATORS } from "./y11a.js";
import { Y11B_GENERATORS } from "./y11b.js";
import { Y11C_GENERATORS } from "./y11c.js";

const S = (u, l) => `y12-u${u}-l${l}`;
// Every question goes through tidy() so the maths text reads naturally (see tidy.js)
const C = (u, l, name, make, v = () => true) => core(S(u, l), name, name, (rng) => tidyQuestion(make(rng)), v);
const E = (u, l, name, make, v = () => true) => extend(S(u, l), name, name, (rng) => tidyQuestion(make(rng)), v);
const ALL = { ...Y9A_GENERATORS, ...Y9B_GENERATORS, ...Y10A_GENERATORS, ...Y10B_GENERATORS, ...Y10C_GENERATORS, ...Y11A_GENERATORS, ...Y11B_GENERATORS, ...Y11C_GENERATORS };
// Reuse the GCSE generator `name` from lesson `id` as level `level` of this lesson
const R = (id, name, u, l, level) => {
  const g = ALL[id].find((x) => x.id === `${id}/${name}`);
  if (!g) throw new Error(`No generator ${id}/${name}`);
  return reuse(g, S(u, l), level, name);
};
const nz = (rng, a, b) => rng.nonZero(a, b);
// "+ 3x", "− x": a signed term in a letter, leaving out a coefficient of 1
const sgv = (n, v) => `${n < 0 ? "−" : "+"} ${Math.abs(n) === 1 ? "" : fmt(Math.abs(n))}${v}`;
const sg = (n) => `${n < 0 ? "−" : "+"} ${fmt(Math.abs(n))}`;
const pt = (x, y) => `(${fmt(x)}, ${fmt(y)})`;
const SUPS = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
const sup = (n) => String(n).split("").map((c) => SUPS[c] ?? c).join("");
// x to a whole-number power, for display: x, x², x⁻³
const xp = (n, v = "x") => (n === 1 ? v : `${v}${sup(n)}`);
// a monomial c·x^n for display and as an expression string
const mono = (c, n, v = "x") => (n === 0 ? fmt(c) : `${c === 1 ? "" : c === -1 ? "−" : fmt(c)}${xp(n, v)}`);
const monoExpr = (c, n, v = "x") => `(${c})*${v}^(${n})`;
const bankMC = (rng, bank) => {
  const [prompt, right, w1, w2, hint, why] = rng.pick(bank);
  return mc3(rng, prompt, right, [[w1, hint], [w2, hint]], { hints: [hint, "Check each option carefully against the definition."], solution: [why] });
};

/* ===================== Unit 1: Algebraic expressions ===================== */
const U1 = {
  [S(1, 1)]: [
    C(1, 1, "multiply-divide-powers", (rng) => {
      const a = rng.int(2, 9), m = nz(rng, -4, 7), b = rng.int(2, 9), n = nz(rng, -4, 6), div = rng.chance(0.5);
      if (div && a % b !== 0) return null;
      const c = div ? a / b : a * b, p = div ? m - n : m + n;
      if (p === 0) return null;
      const prompt = div ? `Simplify ${mono(a, m)} ÷ ${mono(b, n)}.` : `Simplify ${mono(a, m)} × ${mono(b, n)}.`;
      return expr(prompt, monoExpr(c, p), {
        answerText: mono(c, p), flags: { simplified: true },
        traps: [{ expr: monoExpr(c, div ? m / n : m * n), feedback: div ? "When dividing, SUBTRACT the powers." : "When multiplying, ADD the powers." }],
        hints: ["Deal with the numbers first, then the powers of x.", div ? `${a} ÷ ${b} = ${c}; subtract the powers: ${m} − (${n}).` : `${a} × ${b} = ${c}; add the powers: ${m} + (${n}).`],
        solution: [div ? `${a} ÷ ${b} = ${c}` : `${a} × ${b} = ${c}`, `x${sup(m)} ${div ? "÷" : "×"} x${sup(n)} = x${sup(p)}`, `= ${mono(c, p)}`],
      });
    }),
    E(1, 1, "power-of-a-term", (rng) => {
      const a = rng.int(2, 4), m = nz(rng, -3, 4), k = rng.int(2, 4), b = rng.pick([2, 4, 8, 3, 9]), n = nz(rng, -2, 3);
      const top = a ** k, p = m * k - n;
      if (top % b !== 0 || p === 0) return null;
      const c = top / b;
      return expr(`Simplify (${mono(a, m)})${sup(k)} ÷ ${mono(b, n)}.`, monoExpr(c, p), {
        answerText: mono(c, p), flags: { simplified: true },
        traps: [{ expr: monoExpr(a * k / b, p), feedback: `Raise the ${a} to the power ${k} too: ${a}${sup(k)} = ${top}.` }],
        hints: [`(${mono(a, m)})${sup(k)} = ${a}${sup(k)} × x${sup(m * k)}.`, `${a}${sup(k)} = ${top}. Then divide by ${mono(b, n)}: divide the numbers and subtract the powers.`],
        solution: [`(${mono(a, m)})${sup(k)} = ${mono(top, m * k)}`, `${top} ÷ ${b} = ${c} and x${sup(m * k)} ÷ x${sup(n)} = x${sup(p)}`, `= ${mono(c, p)}`],
      });
    }),
  ],
  [S(1, 2)]: [R("y10-u3-l2", "expand-triple", 1, 2, 1), R("y10-u3-l2", "expand-triple-coefficient", 1, 2, 2)],
  [S(1, 3)]: [
    R("y10-u3-l3", "factorise-composite-a", 1, 3, 1),
    E(1, 3, "factorise-cubic-completely", (rng) => {
      const k = rng.pick([1, 1, 2, 3]), p = nz(rng, -6, 6), q = nz(rng, -6, 6);
      if (p === q) return null;
      const c = polyMul([k, 0], polyMul([1, -p], [1, -q]));
      const ans = `${k === 1 ? "" : k}x${lin(1, -p)}${lin(1, -q)}`;
      return expr(`Factorise completely ${polyText(c)}.`, `${k}*x*${`((x)+(${-p}))`}*${`((x)+(${-q}))`}`, {
        answerText: ans, flags: { factorised: true },
        traps: [{ expr: `${k}*x*(${polyExpr(polyMul([1, -p], [1, -q]))})`, feedback: "That's right so far, but the quadratic bracket factorises further." }],
        hints: [`Every term has a factor of ${k === 1 ? "x" : k + "x"}: take it out first.`, `Then factorise the quadratic ${polyText(polyMul([1, -p], [1, -q]))}.`],
        solution: [`${polyText(c)} = ${k === 1 ? "" : k}x(${polyText(polyMul([1, -p], [1, -q]))})`, `= ${ans}`],
      });
    }),
  ],
  [S(1, 4)]: [
    R("y10-u1-l7", "general-fractional-index", 1, 4, 1),
    E(1, 4, "write-as-powers", (rng) => {
      const kind = rng.int(0, 2), a = rng.int(2, 9), n = rng.int(2, 5);
      if (kind === 0) {   // a / x^n  ->  a x^-n
        return multi(`Write ${a}/x${sup(n)} in the form axᵖ. Find a and p.`, [["a =", a], ["p =", -n, undefined, [T(n, "The power is on the bottom, so it is negative.")]]], {
          hints: ["1/xⁿ = x⁻ⁿ.", `So ${a}/x${sup(n)} = ${a}x${sup(-n)}.`], solution: [`${a}/x${sup(n)} = ${a} × x${sup(-n)}`, `a = ${a}, p = −${n}`],
        });
      }
      if (kind === 1) {   // a / √x -> a x^(-1/2)
        return multi(`Write ${a}/√x in the form axᵖ. Find a and p (as a decimal).`, [["a =", a], ["p =", -0.5, undefined, [T(0.5, "√x is on the bottom, so the power is negative.")]]], {
          hints: ["√x = x^(1/2).", "Dividing by x^(1/2) is the same as multiplying by x^(−1/2)."], solution: [`${a}/√x = ${a}x^(−1/2)`, `a = ${a}, p = −0.5`],
        });
      }
      // x^n √x -> x^(n + 1/2)
      return multi(`Write x${sup(n)}√x as a single power xᵖ. Find p (as a decimal).`, [["p =", n + 0.5, undefined, [T(n * 0.5, "Add the powers, don't multiply them.")]]], {
        hints: ["√x = x^(1/2).", `Multiplying: add the powers, ${n} + ½.`], solution: [`x${sup(n)} × x^(1/2) = x^(${n} + 1/2)`, `p = ${n + 0.5}`],
      });
    }),
  ],
  [S(1, 5)]: [R("y10-u1-l4", "simplify-surd", 1, 5, 1), R("y10-u1-l5", "difference-of-surds", 1, 5, 2)],
  [S(1, 6)]: [
    C(1, 6, "rationalise-single", (rng) => {
      const b = rng.pick([2, 3, 5, 6, 7, 10]), k = rng.int(1, 6), a = b * k;
      return num(`Write ${a}/√${b} in the form k√${b}. Find k.`, k, {
        traps: [T(a, `Multiply top and bottom by √${b}: the ${b} on the bottom divides into ${a}.`)],
        hints: [`Multiply top and bottom by √${b}.`, `${a}/√${b} = ${a}√${b}/${b}.`], solution: [`${a}/√${b} × √${b}/√${b} = ${a}√${b}/${b}`, `= ${k}√${b}, so k = ${k}`],
      });
    }),
    E(1, 6, "rationalise-conjugate", (rng) => {
      const b = rng.pick([2, 3, 5, 6, 7, 8, 10, 11]), a = rng.int(1, 4), sign = rng.pick([1, -1]);
      const D = a * a - b;
      if (D === 0) return null;
      const c = Math.abs(D) * rng.int(1, 3);
      // c / (a + sign√b) = c(a − sign√b) / D
      const p = (c * a) / D, q = (-sign * c) / D;
      return multi(`Rationalise ${c}/(${a} ${sign > 0 ? "+" : "−"} √${b}). Write it as p + q√${b}. Find p and q.`, [["p =", p], ["q =", q, undefined, [T(-q, "Check the sign of the surd term: multiply by the conjugate, then divide by a² − b.")]]], {
        hints: [`Multiply top and bottom by the conjugate ${a} ${sign > 0 ? "−" : "+"} √${b}.`, `The bottom becomes ${a}² − ${b} = ${D}.`],
        solution: [`${c}(${a} ${sign > 0 ? "−" : "+"} √${b}) / ${D}`, `p = ${fmt(p)}, q = ${fmt(q)}`],
      });
    }),
  ],
};

/* ========================= Unit 2: Quadratics ========================= */
const U2 = {
  [S(2, 1)]: [
    R("y10-u4-l1", "solve-factorise-a2", 2, 1, 1),
    E(2, 1, "hidden-quadratic", (rng) => {
      const p = rng.int(1, 5); let q = rng.int(2, 7); if (q === p) q = p + 1;
      const kind = rng.chance(0.5);
      if (kind) {   // x⁴ − (p² + q²)x² + p²q² = 0: positive solutions p and q
        const [s, l] = [Math.min(p, q), Math.max(p, q)];
        return multi(`Solve x⁴ − ${p * p + q * q}x² + ${p * p * q * q} = 0. Give the two positive solutions.`, [["smaller =", s, undefined, [T(s * s, "That's x². Take the square root.")]], ["larger =", l, undefined, [T(l * l, "That's x². Take the square root.")]]], {
          hints: ["Let u = x². The equation becomes a quadratic in u.", `u² − ${p * p + q * q}u + ${p * p * q * q} = (u − ${s * s})(u − ${l * l}) = 0.`],
          solution: [`u = ${s * s} or u = ${l * l}`, `x² = ${s * s} or ${l * l}, so x = ±${s} or ±${l}`, `Positive solutions: ${s} and ${l}`],
        });
      }
      const [s, l] = [Math.min(p, q), Math.max(p, q)];   // x − (p + q)√x + pq = 0: x = p², q²
      return multi(`Solve x − ${p + q}√x + ${p * q} = 0.`, [["smaller x =", s * s, undefined, [T(s, "That's √x. Square it to find x.")]], ["larger x =", l * l, undefined, [T(l, "That's √x. Square it to find x.")]]], {
        hints: ["Let u = √x, so x = u².", `u² − ${p + q}u + ${p * q} = (u − ${s})(u − ${l}) = 0.`],
        solution: [`√x = ${s} or √x = ${l}`, `x = ${s * s} or x = ${l * l}`],
      });
    }),
  ],
  [S(2, 2)]: [
    R("y10-u4-l5", "complete-square-even", 2, 2, 1),
    E(2, 2, "complete-square-a", (rng) => {
      const a = rng.pick([2, 3, -1, -2]), p = nz(rng, -5, 5), q = rng.int(-12, 12);
      const b = 2 * a * p, c = a * p * p + q;
      return multi(`Write ${polyText([a, b, c])} in the form a(x + p)² + q. Find a, p and q.`, [["a =", a], ["p =", p, undefined, [T(-p, "Check the sign: (x + p)² expands to x² + 2px.")]], ["q =", q, undefined, [T(c - p * p, `Multiply the −p² by a before adding: ${a} × ${p * p}.`)]]], {
        hints: [`Take ${a} out of the first two terms: ${a}(x² ${sgv(b / a, "x")}) ${sg(c)}.`, `x² ${sgv(b / a, "x")} = (x ${sg(p)})² − ${p * p}.`],
        solution: [`${a}[(x ${sg(p)})² − ${p * p}] ${sg(c)}`, `= ${a}(x ${sg(p)})² ${sg(-a * p * p)} ${sg(c)}`, `= ${a}(x ${sg(p)})² ${sg(q)}`],
      });
    }),
  ],
  [S(2, 3)]: [
    R("y11-u2-l3", "function-value", 2, 3, 1),
    E(2, 3, "solve-f-equals-k", (rng) => {
      const r1 = rng.int(-7, 3), r2 = r1 + rng.int(1, 9), k = rng.int(-10, 15);
      const b = -(r1 + r2), c = r1 * r2 + k;   // f(x) − k = (x − r1)(x − r2)
      return multi(`f(x) = ${polyText([1, b, c])}. Solve f(x) = ${fmt(k)}.`, [["smaller x =", r1], ["larger x =", r2]], {
        hints: [`Rearrange: ${polyText([1, b, c - k])} = 0.`, `Factorise: (x ${sg(-r1)})(x ${sg(-r2)}) = 0.`],
        solution: [`${polyText([1, b, c])} = ${fmt(k)}`, `${polyText([1, b, c - k])} = 0`, `x = ${fmt(r1)} or x = ${fmt(r2)}`],
      });
    }),
  ],
  [S(2, 4)]: [
    C(2, 4, "turning-point", (rng) => {
      const h = nz(rng, -6, 6), k = rng.int(-12, 12);
      const b = -2 * h, c = h * h + k;
      return multi(`Find the turning point of y = ${polyText([1, b, c])}.`, [["x =", h, undefined, [T(-h, "Complete the square: the x-coordinate is the opposite sign to the number in the bracket.")]], ["y =", k]], {
        hints: ["Complete the square.", `${polyText([1, b, c])} = (x ${sg(-h)})² ${sg(k)}.`], solution: [`(x ${sg(-h)})² ${sg(k)}`, `Turning point ${pt(h, k)}`],
      });
    }),
    E(2, 4, "equation-from-roots", (rng) => {
      const p = rng.int(-5, -1), q = rng.int(1, 6), a = nz(rng, -3, 3);
      const c = polyMul([a], polyMul([1, -p], [1, -q]));
      return multi(`A quadratic graph crosses the x-axis at x = ${p} and x = ${q}, and the y-axis at (0, ${fmt(c[2])}). Its equation is y = ax² + bx + c. Find a, b and c.`, [["a =", a], ["b =", c[1]], ["c =", c[2]]], {
        hints: [`y = a(x ${sg(-p)})(x ${sg(-q)}).`, `At x = 0: a × ${-p} × ${-q} = ${c[2]}, so a = ${a}.`], solution: [`a × ${p * q} = ${c[2]}, a = ${a}`, `y = ${a}(x ${sg(-p)})(x ${sg(-q)}) = ${polyText(c)}`],
      });
    }),
  ],
  [S(2, 5)]: [
    C(2, 5, "discriminant-value", (rng) => {
      const a = nz(rng, -4, 5), b = rng.int(-9, 9), c = rng.int(-9, 9);
      const D = b * b - 4 * a * c;
      return num(`Find the discriminant of ${polyText([a, b, c])} = 0, and so decide how many real roots it has (2, 1 or 0). Give the discriminant.`, D, {
        traps: [T(b * b + 4 * a * c, "The discriminant is b² MINUS 4ac."), T(-b * b - 4 * a * c, "(−b)² is positive: b² is never negative.")],
        hints: [`a = ${a}, b = ${b}, c = ${c}.`, `b² − 4ac = (${b})² − 4(${a})(${c}).`],
        solution: [`b² − 4ac = ${b * b} − ${4 * a * c} = ${D}`, D > 0 ? "Positive: two real roots" : D === 0 ? "Zero: one repeated root" : "Negative: no real roots"],
      });
    }),
    E(2, 5, "equal-roots-k", (rng) => {
      const m = rng.int(2, 9), kind = rng.int(0, 1);
      if (kind === 0) {   // x² + kx + m² = 0 equal roots: k = ±2m
        return num(`x² + kx + ${m * m} = 0 has equal roots. Find the positive value of k.`, 2 * m, {
          traps: [T(m, "Use the discriminant: k² − 4 × " + m * m + " = 0."), T(4 * m * m, "That's k². Take the square root.")],
          hints: ["Equal roots: b² − 4ac = 0.", `k² − 4(1)(${m * m}) = 0, so k² = ${4 * m * m}.`], solution: [`k² = ${4 * m * m}`, `k = ±${2 * m}; positive value ${2 * m}`],
        });
      }
      const b = 2 * m, c = rng.int(1, 5);   // kx² + bx + c... choose so k = b²/4c is whole
      if ((b * b) % (4 * c) !== 0) return null;
      const k = (b * b) / (4 * c);
      return num(`kx² + ${b}x + ${c} = 0 has equal roots. Find k.`, k, {
        traps: [T((4 * c) / (b * b), "Rearrange carefully: b² = 4ac gives k = b² ÷ 4c.")],
        hints: ["Equal roots: b² − 4ac = 0.", `${b}² − 4(k)(${c}) = 0.`], solution: [`${b * b} − ${4 * c}k = 0`, `k = ${k}`],
      });
    }),
  ],
  [S(2, 6)]: [
    C(2, 6, "maximum-height", (rng) => {
      const t0 = rng.int(1, 4), H = rng.int(15, 60), a = 5;
      const b = 2 * a * t0, c = H - a * t0 * t0;
      if (c < 0) return null;
      return multi(`A ball's height is h = −5t² + ${b}t + ${c} metres after t seconds. Find the greatest height and when it happens.`, [["greatest height h =", H], ["time t =", t0]], {
        hints: ["Complete the square, or find the turning point at t = −b ÷ 2a.", `t = ${b} ÷ 10 = ${t0}.`], solution: [`t = −${b} ÷ (2 × −5) = ${t0}`, `h = −5(${t0})² + ${b}(${t0}) + ${c} = ${H} m`],
      });
    }),
    E(2, 6, "greatest-area", (rng) => {
      const P = rng.int(5, 25) * 4, wall = rng.chance(0.5);
      if (wall) {   // three sides: x + 2y = P, area xy max at x = P/2
        const A = (P / 2) * (P / 4);
        return num(`A farmer has ${P} m of fencing for three sides of a rectangular pen against a wall. Find the greatest area.`, A, {
          traps: [T((P / 4) ** 2, "This pen only needs three sides, so it isn't a square.")],
          hints: ["Let the side parallel to the wall be x; the other two sides are (P − x)/2 each.", `Area = x(${P} − x)/2. Complete the square or use the turning point.`], solution: [`A = ½x(${P} − x), greatest at x = ${P / 2}`, `A = ½ × ${P / 2} × ${P / 2} = ${A} m²`],
        });
      }
      const A = (P / 4) ** 2;
      return num(`A rectangle has perimeter ${P} cm. Find its greatest possible area.`, A, {
        traps: [T((P / 2) ** 2, "The two sides add to HALF the perimeter.")],
        hints: [`Sides x and ${P / 2} − x.`, `Area = x(${P / 2} − x): greatest when x = ${P / 4}.`], solution: [`A = x(${P / 2} − x) = ${(P / 4) ** 2} − (x − ${P / 4})²`, `Greatest area ${A} cm²`],
      });
    }),
  ],
};

/* =================== Unit 3: Equations and inequalities =================== */
const U3 = {
  [S(3, 1)]: [
    C(3, 1, "linear-simultaneous", (rng) => {
      const x = rng.int(-6, 6), y = rng.int(-6, 6), a = rng.int(1, 5), b = nz(rng, -5, 5), c = rng.int(1, 5), d = nz(rng, -5, 5);
      if (a * d - b * c === 0) return null;
      const e1 = `${a === 1 ? "" : a}x ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}y = ${fmt(a * x + b * y)}`;
      const e2 = `${c === 1 ? "" : c}x ${d < 0 ? "−" : "+"} ${Math.abs(d) === 1 ? "" : Math.abs(d)}y = ${fmt(c * x + d * y)}`;
      return multi(`Solve ${e1} and ${e2}.`, [["x =", x], ["y =", y]], {
        hints: ["Make the coefficients of one letter the same, then add or subtract.", "Substitute your first answer back to find the other letter."], solution: [`Eliminate one letter, solve, then substitute back`, `x = ${fmt(x)}, y = ${fmt(y)}`],
      });
    }),
    E(3, 1, "linear-simultaneous-context", (rng) => {
      const p = rng.int(3, 12) * 10, q = rng.int(3, 12) * 10, a = rng.int(2, 5), b = rng.int(1, 4), c = rng.int(1, 4), d = rng.int(2, 5);
      if (a * d - b * c === 0) return null;
      return multi(`${a} pens and ${b} rulers cost ${fmt(a * p + b * q)}p. ${c} pens and ${d} rulers cost ${fmt(c * p + d * q)}p. Find the cost of each, in pence.`, [["pen =", p], ["ruler =", q]], {
        hints: ["Let a pen cost p and a ruler cost r. Write two equations.", "Solve them by elimination."], solution: [`${a}p + ${b}r = ${a * p + b * q}, ${c}p + ${d}r = ${c * p + d * q}`, `pen ${p}p, ruler ${q}p`],
      });
    }),
  ],
  [S(3, 2)]: [
    C(3, 2, "line-and-circle", (rng) => {
      const [r, pts] = rng.pick([[5, [[3, 4], [4, 3], [5, 0], [0, 5], [-3, 4], [-4, 3], [-5, 0], [0, -5], [3, -4], [4, -3], [-3, -4], [-4, -3]]], [13, [[5, 12], [12, 5], [-5, 12], [12, -5], [13, 0], [0, 13], [-12, 5], [5, -12]]]]);
      const A = rng.pick(pts), B = rng.pick(pts);
      if (A[0] === B[0]) return null;
      const m = (B[1] - A[1]) / (B[0] - A[0]), c = A[1] - m * A[0];
      if (!Number.isInteger(m) || !Number.isInteger(c)) return null;
      const big = A[0] > B[0] ? A : B;
      return multi(`Solve y = ${polyText([m, c]) || "0"} and x² + y² = ${r * r}. Give the solution with the larger value of x.`, [["x =", big[0]], ["y =", big[1]]], {
        hints: [`Substitute y = ${polyText([m, c])} into x² + y² = ${r * r}.`, "Solve the quadratic in x, then find each y from the LINEAR equation."], solution: [`The solutions are ${pt(A[0], A[1])} and ${pt(B[0], B[1])}`, `Larger x: ${pt(big[0], big[1])}`],
      });
    }),
    E(3, 2, "line-and-hyperbola", (rng) => {
      const x1 = rng.int(1, 4), x2 = x1 + rng.int(1, 4), y1 = rng.int(1, 6) * x2, y2 = (x1 * y1) / x2;
      if (!Number.isInteger(y2)) return null;
      const k = x1 * y1, m = (y2 - y1) / (x2 - x1), c = y1 - m * x1;
      if (!Number.isInteger(m) || !Number.isInteger(c) || m === 0) return null;
      return multi(`Solve y = ${polyText([m, c])} and xy = ${k}. Give the solution with the larger x.`, [["x =", x2], ["y =", y2]], {
        hints: [`Substitute: x(${polyText([m, c])}) = ${k}.`, "Rearrange into a quadratic and solve."], solution: [`Solutions ${pt(x1, y1)} and ${pt(x2, y2)}`, `Larger x: ${pt(x2, y2)}`],
      });
    }),
  ],
  [S(3, 3)]: [
    C(3, 3, "count-intersections", (rng) => {
      const b = rng.int(-6, 6), c = rng.int(-6, 8), m = rng.int(-5, 5), k = rng.int(-8, 8);
      const B = b - m, Cc = c - k, D = B * B - 4 * Cc, n = D > 0 ? 2 : D === 0 ? 1 : 0;
      return num(`How many times does the line y = ${polyText([m, k]) || "0"} meet the curve y = ${polyText([1, b, c])}?`, n, {
        hints: ["Set the two expressions equal and rearrange to = 0.", `x² ${sgv(B, "x")} ${sg(Cc)} = 0: find its discriminant.`], solution: [`Discriminant = ${B}² − 4(${Cc}) = ${D}`, `${n} point${n === 1 ? "" : "s"} of intersection`],
      });
    }),
    E(3, 3, "tangent-condition", (rng) => {
      const c = rng.pick([1, 4, 9, 16, 25]), e = rng.int(-3, 3);
      // y = kx + e tangent to y = x² + c + e... x² − kx + c = 0 has equal roots when k² = 4c
      const k = 2 * Math.sqrt(c);
      return num(`The line y = kx ${sg(e)} is a tangent to y = x² ${sg(c + e)}. Find the positive value of k.`, k, {
        traps: [T(4 * c, "That's k². Take the square root."), T(Math.sqrt(c), "Use k² − 4 × " + c + " = 0.")],
        hints: [`x² ${sg(c + e)} = kx ${sg(e)} gives x² − kx + ${c} = 0.`, "A tangent means equal roots: discriminant = 0."], solution: [`k² − 4 × ${c} = 0`, `k = ±${k}; positive value ${k}`],
      });
    }),
  ],
  [S(3, 4)]: [
    R("y10-u6-l4", "solve-inequality", 3, 4, 1),
    E(3, 4, "two-inequalities-set", (rng) => {
      const lo = rng.int(-6, 3), hi = lo + rng.int(2, 8), a = rng.int(2, 5), b = rng.int(-5, 5), c = rng.int(2, 4);
      const right = `{x : ${fmt(lo)} < x < ${fmt(hi)}}`;
      return mc3(rng, `Find the set of values satisfying ${a}x ${sg(b)} > ${fmt(a * lo + b)} and ${c}x < ${fmt(c * hi)}.`, right, [[`{x : x > ${fmt(lo)}} ∪ {x : x < ${fmt(hi)}}`, "Both must be true at once, so it's the overlap, not ∪."], [`{x : ${fmt(lo)} ≤ x ≤ ${fmt(hi)}}`, "The inequalities are strict, so the ends aren't included."]], {
        hints: ["Solve each inequality separately.", `x > ${fmt(lo)} and x < ${fmt(hi)}: where do they overlap?`], solution: [`First: x > ${fmt(lo)}. Second: x < ${fmt(hi)}`, `Both: ${right}`],
      });
    }),
  ],
  [S(3, 5)]: [
    R("y11-u5-l1", "factorised-inequality", 3, 5, 1),
    E(3, 5, "quadratic-inequality-set", (rng) => {
      const p = rng.int(-6, 2), q = p + rng.int(1, 7), less = rng.chance(0.5);
      const c = polyMul([1, -p], [1, -q]);
      const inside = `{x : ${fmt(p)} < x < ${fmt(q)}}`, outside = `{x : x < ${fmt(p)}} ∪ {x : x > ${fmt(q)}}`;
      return mc3(rng, `Solve ${polyText(c)} ${less ? "<" : ">"} 0, giving your answer in set notation.`, less ? inside : outside, [[less ? outside : inside, "Sketch the ∪-shaped graph: is it below or above the axis between the roots?"], [`{x : ${fmt(-q)} < x < ${fmt(-p)}}`, "Check the signs of the roots."]], {
        hints: ["Factorise to find the critical values.", `Roots ${fmt(p)} and ${fmt(q)}; sketch y = ${polyText(c)}.`], solution: [`(x ${sg(-p)})(x ${sg(-q)}) = 0 at x = ${fmt(p)}, ${fmt(q)}`, `${less ? "Below" : "Above"} the axis ${less ? "between" : "outside"} the roots: ${less ? inside : outside}`],
      });
    }),
  ],
  [S(3, 6)]: [
    R("y10-u6-l5", "region-one-line", 3, 6, 1),
    E(3, 6, "point-in-region", (rng) => {
      const a = rng.int(1, 4), x = rng.int(-3, 3), y = rng.int(-4, 8), m = rng.int(-2, 3), c = rng.int(-2, 5);
      const in1 = y > x * x - a * a, in2 = y < m * x + c;
      const right = in1 && in2 ? "Yes, it satisfies both" : !in1 ? `No: it fails y > x² − ${a * a}` : `No: it fails y < ${polyText([m, c]) || "0"}`;
      const opts = ["Yes, it satisfies both", `No: it fails y > x² − ${a * a}`, `No: it fails y < ${polyText([m, c]) || "0"}`];
      if (!in1 && !in2) return null;
      return mc3(rng, `Is the point ${pt(x, y)} in the region y > x² − ${a * a}, y < ${polyText([m, c]) || "0"}?`, right, opts.filter((o) => o !== right).map((o) => [o, "Substitute the point into each inequality."]), {
        hints: ["Substitute the coordinates into each inequality.", `x² − ${a * a} = ${x * x - a * a} and ${polyText([m, c]) || "0"} = ${m * x + c} when x = ${x}.`], solution: [`${y} > ${x * x - a * a}? ${in1 ? "Yes" : "No"}`, `${y} < ${m * x + c}? ${in2 ? "Yes" : "No"}`, right],
      });
    }),
  ],
};

/* ================== Unit 4: Graphs and transformations ================== */
const prodText = (roots) => roots.map((r) => (r === 0 ? "x" : `(x ${sg(-r)})`)).join("");
const U4 = {
  [S(4, 1)]: [
    C(4, 1, "cubic-y-intercept", (rng) => {
      const r = [nz(rng, -5, 5), nz(rng, -5, 5), nz(rng, -5, 5)], a = rng.pick([1, 1, -1, 2]);
      const y0 = a * r.reduce((p, v) => p * -v, 1);
      return num(`Find the y-intercept of y = ${a === 1 ? "" : a === -1 ? "−" : a}${prodText(r)}.`, y0, {
        traps: [T(-y0, "Check the signs: put x = 0 into each bracket.")],
        hints: ["The y-intercept is where x = 0.", `Put x = 0 into each bracket: ${r.map((v) => fmt(-v)).join(", ")}.`], solution: [`y = ${a}(${r.map((v) => fmt(-v)).join(")(")})`, `= ${y0}`],
      });
    }),
    E(4, 1, "cubic-distinct-roots", (rng) => {
      const p = nz(rng, -4, 4), q = nz(rng, -4, 4), rep = rng.chance(0.5);
      const roots = rep ? [p, p, q] : [p, q, nz(rng, -4, 4)];
      const n = new Set(roots).size;
      const disp = rep ? `(x ${sg(-p)})²(x ${sg(-q)})` : prodText(roots);
      return num(`At how many different points does y = ${disp} meet the x-axis?`, n, {
        traps: n !== 3 ? [T(3, "A squared factor gives a repeated root: the graph only touches the axis there.")] : [],
        hints: ["Each different factor gives a different root.", "A squared factor gives one point where the graph touches the axis."], solution: [`Roots: ${[...new Set(roots)].map(fmt).join(", ")}`, `${n} different point${n === 1 ? "" : "s"}`],
      });
    }),
  ],
  [S(4, 2)]: [
    C(4, 2, "quartic-y-intercept", (rng) => {
      const r = [nz(rng, -3, 3), nz(rng, -3, 3), nz(rng, -3, 3), nz(rng, -3, 3)];
      const y0 = r.reduce((p, v) => p * -v, 1);
      return num(`Find the y-intercept of y = ${prodText(r)}.`, y0, {
        hints: ["Put x = 0.", `Multiply ${r.map((v) => fmt(-v)).join(" × ")}.`], solution: [`y = ${r.map((v) => `(${fmt(-v)})`).join("")} = ${y0}`],
      });
    }),
    E(4, 2, "quartic-find-a", (rng) => {
      const p = nz(rng, -3, 3), q = nz(rng, -4, 4), s = nz(rng, -4, 4), a = nz(rng, -3, 3);
      const y0 = a * p * p * q * s;
      if (y0 === 0) return null;
      return num(`y = a(x ${sg(-p)})²(x ${sg(-q)})(x ${sg(-s)}) passes through (0, ${fmt(y0)}). Find a.`, a, {
        traps: [T(-a, "Check the signs when you put x = 0 into each bracket.")],
        hints: ["Put x = 0 and y = " + fmt(y0) + ".", `a × ${p * p} × ${fmt(-q)} × ${fmt(-s)} = ${fmt(y0)}.`], solution: [`a × ${p * p * q * s} = ${fmt(y0)}`, `a = ${fmt(a)}`],
      });
    }),
  ],
  [S(4, 3)]: [
    C(4, 3, "reciprocal-asymptotes", (rng) => {
      const a = nz(rng, -6, 6), b = nz(rng, -6, 6);
      return multi(`Write down the asymptotes of y = 1/(x ${sg(-a)}) ${sg(b)}.`, [["vertical: x =", a, undefined, [T(-a, "The vertical asymptote is where the bottom is zero.")]], ["horizontal: y =", b]], {
        hints: ["Vertical asymptote: where the denominator is zero.", `The ${sg(b)} moves the horizontal asymptote from y = 0.`], solution: [`x ${sg(-a)} = 0 when x = ${fmt(a)}`, `Horizontal asymptote y = ${fmt(b)}`],
      });
    }),
    E(4, 3, "reciprocal-find-a", (rng) => {
      const b = nz(rng, -6, 6), a = nz(rng, -9, 9), x0 = rng.int(-4, 4);
      if (x0 + b === 0) return null;
      const y0 = a / (x0 + b);
      if (!Number.isInteger(y0)) return null;
      return multi(`y = a/(x + b) has a vertical asymptote x = ${fmt(-b)} and passes through ${pt(x0, y0)}. Find a and b.`, [["b =", b, undefined, [T(-b, "x + b = 0 at the asymptote.")]], ["a =", a]], {
        hints: ["The denominator is zero at the vertical asymptote.", `Substitute the point: ${fmt(y0)} = a/(${fmt(x0)} ${sg(b)}).`], solution: [`b = ${fmt(b)}`, `a = ${fmt(y0)} × ${fmt(x0 + b)} = ${fmt(a)}`],
      });
    }),
  ],
  [S(4, 4)]: [
    C(4, 4, "count-solutions-cubic", (rng) => {
      const p = nz(rng, -3, 3), q = nz(rng, -3, 3), m = rng.int(-3, 3), c = rng.int(-6, 6);
      const f = (x) => x * (x - p) * (x - q) - (m * x + c);
      let n = 0, prev = f(-20);
      for (let x = -20 + 0.001; x <= 20; x += 0.001) { const v = f(x); if (v === 0 || prev * v < 0) n++; prev = v; }
      // reject cases where the curve only just touches (hard to judge from a sketch)
      for (let x = -6; x <= 6; x += 0.01) if (Math.abs(f(x)) < 0.05 && Math.abs(3 * x * x - 2 * (p + q) * x + p * q - m) < 0.3) return null;
      return num(`How many solutions does x(x ${sg(-p)})(x ${sg(-q)}) = ${polyText([m, c]) || "0"} have?`, n, {
        hints: [`Sketch y = x(x ${sg(-p)})(x ${sg(-q)}) and y = ${polyText([m, c]) || "0"} on the same axes.`, "Count the points where they cross."], solution: [`The graphs cross ${n} time${n === 1 ? "" : "s"}`, `${n} solution${n === 1 ? "" : "s"}`],
      });
    }),
    E(4, 4, "count-solutions-reciprocal", (rng) => {
      const k = nz(rng, -6, 6), m = rng.int(-3, 3), c = rng.int(-5, 5);
      // k/x = mx + c  ->  mx² + cx − k = 0 (x ≠ 0)
      let n;
      if (m === 0) n = c === 0 ? 0 : 1; else { const D = c * c + 4 * m * k; n = D > 0 ? 2 : D === 0 ? 1 : 0; }
      return num(`How many solutions does ${k}/x = ${polyText([m, c]) || "0"} have?`, n, {
        hints: ["Multiply both sides by x (x can't be 0).", m === 0 ? "This gives a linear equation." : `${polyText([m, c, -k])} = 0: use the discriminant.`], solution: [m === 0 ? `${fmt(c)}x = ${k}` : `Discriminant ${c}² + 4(${m})(${k}) = ${c * c + 4 * m * k}`, `${n} solution${n === 1 ? "" : "s"}`],
      });
    }),
  ],
  [S(4, 5)]: [
    R("y11-u2-l5", "translate-graph", 4, 5, 1),
    E(4, 5, "translate-point", (rng) => {
      const x = rng.int(-5, 5), y = rng.int(-5, 5), a = nz(rng, -5, 5), b = nz(rng, -5, 5);
      return multi(`(${fmt(x)}, ${fmt(y)}) lies on y = f(x). Find its image on y = f(x ${sg(a)}) ${sg(b)}.`, [["x =", x - a, undefined, [T(x + a, "Inside the bracket the movement is the opposite way.")]], ["y =", y + b]], {
        hints: [`f(x ${sg(a)}) moves the graph ${a > 0 ? "left" : "right"} by ${Math.abs(a)}.`, `${sg(b)} outside moves it ${b > 0 ? "up" : "down"} by ${Math.abs(b)}.`], solution: [`x: ${fmt(x)} ${sg(-a)} = ${fmt(x - a)}`, `y: ${fmt(y)} ${sg(b)} = ${fmt(y + b)}`],
      });
    }),
  ],
  [S(4, 6)]: [
    R("y11-u2-l5", "reflect-stretch-graph", 4, 6, 1),
    E(4, 6, "stretch-point", (rng) => {
      const x = rng.int(-6, 6) * 2, y = rng.int(-5, 5), k = rng.pick([2, 3, -1, 4]), inside = rng.chance(0.5);
      if (inside) {
        const nx = x / k;
        if (!Number.isInteger(nx)) return null;
        return multi(`(${fmt(x)}, ${fmt(y)}) lies on y = f(x). Find its image on y = f(${k === -1 ? "−" : k}x).`, [["x =", nx, undefined, [T(x * k, "Inside the bracket: DIVIDE the x-coordinate by " + k + ".")]], ["y =", y]], {
          hints: [`f(${k}x) is a stretch parallel to the x-axis, scale factor 1/${k}.`, "The y-coordinate doesn't change."], solution: [`x: ${fmt(x)} ÷ ${k} = ${fmt(nx)}`, `Image (${fmt(nx)}, ${fmt(y)})`],
        });
      }
      return multi(`(${fmt(x)}, ${fmt(y)}) lies on y = f(x). Find its image on y = ${k === -1 ? "−" : k}f(x).`, [["x =", x], ["y =", y * k]], {
        hints: [`${k}f(x) multiplies every y-coordinate by ${k}.`, "The x-coordinate doesn't change."], solution: [`y: ${fmt(y)} × ${k} = ${fmt(y * k)}`, `Image (${fmt(x)}, ${fmt(y * k)})`],
      });
    }),
  ],
  [S(4, 7)]: [
    C(4, 7, "transform-turning-point", (rng) => {
      const x = rng.int(-4, 4), y = rng.int(-6, 6), a = nz(rng, -4, 4), k = rng.pick([2, 3]), kind = rng.int(0, 2);
      if (kind === 0) return multi(`y = f(x) has a maximum at (${fmt(x)}, ${fmt(y)}). Find the maximum of y = f(x ${sg(-a)}).`, [["x =", x + a], ["y =", y]], { hints: [`f(x ${sg(-a)}) moves the graph ${a > 0 ? "right" : "left"} ${Math.abs(a)}.`, "Only the x-coordinate changes."], solution: [`(${fmt(x + a)}, ${fmt(y)})`] });
      if (kind === 1) return multi(`y = f(x) has a maximum at (${fmt(x)}, ${fmt(y)}). Find the maximum of y = ${k}f(x).`, [["x =", x], ["y =", k * y]], { hints: [`Multiply the y-coordinate by ${k}.`, "The x-coordinate stays the same."], solution: [`(${fmt(x)}, ${fmt(k * y)})`] });
      return multi(`y = f(x) has a maximum at (${fmt(x)}, ${fmt(y)}). y = −f(x) has a minimum. Find it.`, [["x =", x], ["y =", -y]], { hints: ["−f(x) reflects the graph in the x-axis.", "The maximum becomes a minimum; change the sign of y."], solution: [`(${fmt(x)}, ${fmt(-y)})`] });
    }),
    E(4, 7, "transform-asymptote", (rng) => {
      const h = nz(rng, -5, 5), k = rng.pick([2, 3, 4]), b = nz(rng, -6, 6);
      return num(`y = f(x) has a horizontal asymptote y = ${fmt(h)}. Find the horizontal asymptote of y = ${k}f(x) ${sg(b)}.`, k * h + b, {
        traps: [T(h + b, `Multiply by ${k} first, then add.`), T(k * (h + b), `Multiply y = ${fmt(h)} by ${k}, THEN add ${fmt(b)}.`)],
        hints: [`${k}f(x) multiplies every y-value by ${k}.`, `Then ${sg(b)} moves it.`], solution: [`${k} × ${fmt(h)} ${sg(b)} = ${fmt(k * h + b)}`, `y = ${fmt(k * h + b)}`],
      });
    }),
  ],
};

/* =================== Unit 5: Straight lines and circles =================== */
const U5 = {
  [S(5, 1)]: [
    C(5, 1, "line-two-points", (rng) => {
      const x1 = rng.int(-5, 4), x2 = x1 + rng.int(1, 4), m = nz(rng, -4, 4), c = rng.int(-8, 8);
      const y1 = m * x1 + c, y2 = m * x2 + c;
      return multi(`Find the equation of the line through ${pt(x1, y1)} and ${pt(x2, y2)} in the form y = mx + c.`, [["m =", m, undefined, [T(1 / m, "Gradient = change in y ÷ change in x.")]], ["c =", c]], {
        hints: ["Gradient = (y₂ − y₁) ÷ (x₂ − x₁).", `m = ${y2 - y1} ÷ ${x2 - x1} = ${m}. Then substitute a point to find c.`], solution: [`m = ${m}`, `y − ${fmt(y1)} = ${m}(x − ${fmt(x1)})`, `y = ${polyText([m, c])}`],
      });
    }),
    E(5, 1, "general-form", (rng) => {
      const q = rng.pick([2, 3, 4, 5]), p = nz(rng, -7, 7), c = rng.int(-6, 6);
      if (gcd(Math.abs(p), q) !== 1) return null;
      // y = (p/q)x + c  ->  px − qy + qc = 0, with a > 0
      let A = p, B = -q, Cc = q * c;
      if (A < 0) { A = -A; B = -B; Cc = -Cc; }
      return multi(`Write y = {${p}/${q}}x ${sg(c)} in the form ax + by + c = 0, where a, b and c are integers and a > 0.`, [["a =", A], ["b =", B], ["c =", Cc]], {
        hints: [`Multiply every term by ${q}.`, "Collect everything on one side, with the x term positive."], solution: [`${q}y = ${p}x ${sg(q * c)}`, `${A}x ${sgv(B, "y")} ${sg(Cc)} = 0`],
      });
    }),
  ],
  [S(5, 2)]: [R("y10-u6-l3", "perpendicular-gradient", 5, 2, 1), R("y10-u6-l3", "perpendicular-line", 5, 2, 2)],
  [S(5, 3)]: [
    C(5, 3, "distance-between-points", (rng) => {
      const [a, b, d] = rng.pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [7, 24, 25]]);
      const x1 = rng.int(-6, 6), y1 = rng.int(-6, 6), sx = rng.pick([1, -1]), sy = rng.pick([1, -1]), swap = rng.chance(0.5);
      const x2 = x1 + sx * (swap ? b : a), y2 = y1 + sy * (swap ? a : b);
      return num(`Find the distance between ${pt(x1, y1)} and ${pt(x2, y2)}.`, d, {
        traps: [T(a + b, "Use Pythagoras, not just adding the differences."), T(d * d, "That's the distance squared. Take the square root.")],
        hints: ["Find the change in x and the change in y.", `√(${a}² + ${b}²).`], solution: [`√((${fmt(x2 - x1)})² + (${fmt(y2 - y1)})²)`, `= √${d * d} = ${d}`],
      });
    }),
    E(5, 3, "triangle-with-axes", (rng) => {
      const a = rng.int(1, 6), b = rng.int(1, 6), k = rng.int(1, 5);
      const c = a * b * k;   // ax + by = c meets axes at (c/a, 0) and (0, c/b)
      const area = (c / a) * (c / b) / 2;
      return num(`The line ${a === 1 ? "" : a}x + ${b === 1 ? "" : b}y = ${c} meets the axes at P and Q. Find the area of triangle OPQ.`, area, {
        traps: [T((c / a) * (c / b), "Area of a triangle is HALF base × height.")],
        hints: [`x-intercept: ${c} ÷ ${a} = ${c / a}. y-intercept: ${c} ÷ ${b} = ${c / b}.`, "Area = ½ × base × height."], solution: [`P(${c / a}, 0), Q(0, ${c / b})`, `Area = ½ × ${c / a} × ${c / b} = ${fmt(area)}`],
      });
    }),
  ],
  [S(5, 4)]: [
    C(5, 4, "linear-model", (rng) => {
      const a = rng.int(2, 12) * 5, b = rng.int(2, 9) * 5, t1 = rng.int(1, 3), t2 = t1 + rng.int(2, 5);
      return multi(`A plumber charges a fixed fee plus an hourly rate. ${t1} hours cost £${a + b * t1}; ${t2} hours cost £${a + b * t2}. Find the fixed fee and the hourly rate.`, [["fixed fee £", a], ["hourly rate £", b]], {
        hints: [`The rate is the extra cost per extra hour: (${a + b * t2} − ${a + b * t1}) ÷ ${t2 - t1}.`, "Then subtract the cost of the hours from either total."], solution: [`rate = ${b * (t2 - t1)} ÷ ${t2 - t1} = £${b}`, `fee = ${a + b * t1} − ${b * t1} = £${a}`],
      });
    }),
    E(5, 4, "models-equal", (rng) => {
      const a1 = rng.int(10, 40), b1 = rng.int(2, 6), b2 = b1 + rng.int(1, 4), t = rng.int(2, 12), a2 = a1 + (b1 - b2) * t;
      if (a2 < 0) return null;
      return num(`Plan A costs £${a1} plus £${b1} per month. Plan B costs £${a2} plus £${b2} per month. After how many months do they cost the same?`, t, {
        hints: [`Set ${a1} + ${b1}m = ${a2} + ${b2}m.`, "Collect the m terms on one side."], solution: [`${a1 - a2} = ${b2 - b1}m`, `m = ${t}`],
      });
    }),
  ],
  [S(5, 5)]: [
    R("y11-u5-l2", "centre-and-radius", 5, 5, 1),
    E(5, 5, "circle-expanded-form", (rng) => {
      const a = nz(rng, -6, 6), b = nz(rng, -6, 6), r = rng.int(2, 9);
      const D = -2 * a, Ee = -2 * b, F = a * a + b * b - r * r;
      return multi(`Find the centre and radius of x² + y² ${sgv(D, "x")} ${sgv(Ee, "y")} ${sg(F)} = 0.`, [["centre x =", a, undefined, [T(-a, "Halve the x coefficient and change its sign.")]], ["centre y =", b, undefined, [T(-b, "Halve the y coefficient and change its sign.")]], ["radius =", r, undefined, [T(r * r, "That's r². Take the square root.")]]], {
        hints: ["Complete the square in x and in y.", `(x ${sg(-a)})² + (y ${sg(-b)})² = ${r * r}.`], solution: [`(x ${sg(-a)})² − ${a * a} + (y ${sg(-b)})² − ${b * b} ${sg(F)} = 0`, `(x ${sg(-a)})² + (y ${sg(-b)})² = ${r * r}`, `Centre ${pt(a, b)}, radius ${r}`],
      });
    }),
  ],
  [S(5, 6)]: [
    C(5, 6, "line-circle-count", (rng) => {
      const r2 = rng.pick([4, 8, 9, 16, 18, 25]), m = rng.pick([1, -1]), k = rng.int(-8, 8);
      // x² + (mx + k)² = r²  ->  2x² + 2mkx + k² − r² = 0
      const D = 4 * k * k - 8 * (k * k - r2), n = D > 0 ? 2 : D === 0 ? 1 : 0;
      return num(`How many points does the line y = ${m === 1 ? "" : "−"}x ${sg(k)} share with the circle x² + y² = ${r2}?`, n, {
        hints: ["Substitute the line into the circle.", `2x² ${sgv(2 * m * k, "x")} ${sg(k * k - r2)} = 0: use the discriminant.`], solution: [`Discriminant = ${4 * k * k} − 8(${k * k - r2}) = ${D}`, n === 2 ? "Two points: the line crosses" : n === 1 ? "One point: the line is a tangent" : "None: the line misses"],
      });
    }),
    E(5, 6, "tangent-k-circle", (rng) => {
      const m = rng.int(1, 7), r2 = 2 * m * m;
      return num(`y = x + k is a tangent to x² + y² = ${r2}. Find the positive value of k.`, 2 * m, {
        traps: [T(r2, "Use the discriminant: it gives k², then take the square root."), T(4 * m * m, "That's k². Take the square root.")],
        hints: ["Substitute: x² + (x + k)² = " + r2 + ", so 2x² + 2kx + k² − " + r2 + " = 0.", "Tangent: discriminant = 0, so 4k² − 8(k² − " + r2 + ") = 0."], solution: [`4k² − 8k² + ${8 * r2} = 0, so k² = ${4 * m * m}`, `k = ±${2 * m}; positive value ${2 * m}`],
      });
    }),
  ],
  [S(5, 7)]: [
    C(5, 7, "tangent-gradient", (rng) => {
      const [a, b] = rng.pick([[3, 4], [4, 3], [5, 12], [12, 5], [6, 8], [8, 6], [1, 2], [2, 1], [1, 3], [3, 1], [2, 3]]);
      const x = rng.pick([1, -1]) * a, y = rng.pick([1, -1]) * b;
      // tangent gradient = −x/y
      const n = -x, d = y, g = gcd(Math.abs(n), Math.abs(d)), nn = (d < 0 ? -n : n) / g, dd = Math.abs(d) / g;
      return frac(`Find the gradient of the tangent to x² + y² = ${a * a + b * b} at ${pt(x, y)}.`, nn, dd, {
        answerText: dd === 1 ? fmt(nn) : `${nn < 0 ? "−" : ""}{${Math.abs(nn)}/${dd}}`,
        hints: [`The radius to ${pt(x, y)} has gradient ${y}/${x}.`, "The tangent is perpendicular: take the negative reciprocal."], solution: [`Radius gradient = ${fmt(y)}/${fmt(x)}`, `Tangent gradient = −${fmt(x)}/${fmt(y)} = ${dd === 1 ? fmt(nn) : `${nn}/${dd}`}`],
      });
    }),
    E(5, 7, "tangent-length", (rng) => {
      const [dx, dy, r, t] = rng.pick([[7, 4, 4, 7], [4, 7, 4, 7], [5, 5, 5, 5], [6, 8, 6, 8], [8, 6, 8, 6], [9, 2, 6, 7], [2, 9, 6, 7], [7, 1, 5, 5], [1, 7, 5, 5], [8, 1, 4, 7], [4, 8, 8, 4]]);
      if (dx * dx + dy * dy !== r * r + t * t) return null;
      const cx = rng.int(-4, 4), cy = rng.int(-4, 4);
      return num(`A circle has centre ${pt(cx, cy)} and radius ${r}. Find the length of the tangent from ${pt(cx + dx, cy + dy)} to the circle.`, t, {
        traps: [T(Math.sqrt(dx * dx + dy * dy), "That's the distance to the CENTRE. The tangent meets the radius at 90°: use Pythagoras.")],
        hints: ["The tangent, the radius and the line to the centre make a right-angled triangle.", `Distance to the centre = √${dx * dx + dy * dy}. Tangent² = ${dx * dx + dy * dy} − ${r * r}.`], solution: [`Tangent² = ${dx * dx + dy * dy} − ${r * r} = ${t * t}`, `Tangent = ${t}`],
      });
    }),
  ],
  [S(5, 8)]: [
    C(5, 8, "right-angle-diameter", (rng) => {
      const p = rng.int(1, 6) * 2, q = rng.int(1, 6) * 2;
      return multi(`A(0, ${q}), B(${p}, 0) and O(0, 0) form a right-angled triangle. Find the centre of the circle through A, B and O.`, [["x =", p / 2], ["y =", q / 2]], {
        hints: ["The angle at O is 90°, so AB is a diameter.", "The centre is the midpoint of AB."], solution: [`Midpoint of AB = (${p / 2}, ${q / 2})`],
      });
    }),
    E(5, 8, "circle-three-points", (rng) => {
      const h = rng.int(-4, 4), k = rng.int(-4, 4), offs = rng.shuffle([[5, 0], [0, 5], [-5, 0], [0, -5], [3, 4], [4, 3], [-3, 4], [-4, 3], [3, -4], [4, -3], [-3, -4], [-4, -3]]).slice(0, 3);
      const ps = offs.map(([a, b]) => pt(h + a, k + b));
      return multi(`Find the centre of the circle through ${ps.join(", ")}.`, [["x =", h], ["y =", k]], {
        hints: ["The perpendicular bisector of any chord passes through the centre.", "Find two perpendicular bisectors and where they meet. (Or check which point is the same distance from all three.)"], solution: [`The point ${pt(h, k)} is 5 units from each point`, `Centre ${pt(h, k)}, radius 5`],
      });
    }),
  ],
};

/* ================= Unit 6: Algebraic methods and proof ================= */
const U6 = {
  [S(6, 1)]: [R("y10-u3-l4", "cancel-quadratic", 6, 1, 1), R("y10-u3-l4", "cancel-both", 6, 1, 2)],
  [S(6, 2)]: [
    C(6, 2, "remainder-theorem", (rng) => {
      const c = [1, rng.int(-5, 5), rng.int(-9, 9), rng.int(-9, 9)], a = nz(rng, -3, 3);
      const f = (x) => c[0] * x ** 3 + c[1] * x * x + c[2] * x + c[3], R0 = f(a);
      return num(`Find the remainder when ${polyText(c)} is divided by (x ${sg(-a)}).`, R0, {
        traps: [T(f(-a), `Dividing by (x ${sg(-a)}) means you substitute x = ${a}.`)],
        hints: ["The remainder theorem: the remainder is f(a).", `Substitute x = ${a}.`], solution: [`f(${a}) = ${R0}`],
      });
    }),
    E(6, 2, "divide-cubic", (rng) => {
      const a = nz(rng, -4, 4), q = [rng.int(1, 3), rng.int(-5, 5), rng.int(-6, 6)];
      const c = polyMul([1, -a], q);
      return expr(`Divide ${polyText(c)} by (x ${sg(-a)}).`, polyExpr(q), {
        answerText: polyText(q), flags: { expanded: true, simplified: true },
        hints: [`Divide the first term: ${polyText([c[0], 0, 0, 0])} ÷ x = ${polyText([c[0], 0, 0])}.`, "Multiply back, subtract and repeat. The answer is a quadratic."], solution: [`${polyText(c)} = (x ${sg(-a)})(${polyText(q)})`, `Quotient: ${polyText(q)}`],
      });
    }),
  ],
  [S(6, 3)]: [
    C(6, 3, "factor-find-k", (rng) => {
      const a = nz(rng, -3, 3), b = rng.int(-6, 6), d = rng.int(-9, 9);
      // f(x) = x³ + kx² + bx + d with f(a) = 0  ->  k = −(a³ + ab + d)/a²
      const k = -(a ** 3 + a * b + d) / (a * a);
      if (!Number.isInteger(k)) return null;
      return num(`(x ${sg(-a)}) is a factor of x³ + kx² ${sgv(b, "x")} ${sg(d)}. Find k.`, k, {
        hints: [`Factor theorem: f(${a}) = 0.`, `${a ** 3} + ${a * a}k ${sg(a * b)} ${sg(d)} = 0.`], solution: [`${a * a}k = ${-(a ** 3 + a * b + d)}`, `k = ${k}`],
      });
    }),
    E(6, 3, "factor-two-unknowns", (rng) => {
      const p = nz(rng, -3, 3), q = nz(rng, -3, 3), r = nz(rng, -4, 4);
      if (p === q) return null;
      const c = polyMul(polyMul([1, -p], [1, -q]), [1, -r]);
      return multi(`(x ${sg(-p)}) and (x ${sg(-q)}) are factors of x³ + ax² + bx ${sg(c[3])}. Find a and b.`, [["a =", c[1]], ["b =", c[2]]], {
        hints: [`f(${p}) = 0 and f(${q}) = 0 give two equations in a and b.`, "Solve them simultaneously."], solution: [`The cubic is ${prodText([p, q, r])} = ${polyText(c)}`, `a = ${c[1]}, b = ${c[2]}`],
      });
    }),
  ],
  [S(6, 4)]: [R("y10-u3-l6", "always-property", 6, 4, 1), R("y10-u3-l6", "difference-of-squares-proof", 6, 4, 2)],
  [S(6, 5)]: [
    C(6, 5, "exhaustion-cases", (rng) => bankMC(rng, [
      ["To prove n² − n is even for every integer n by exhaustion, which cases cover every integer?", "n even and n odd", "n positive and n negative", "n = 1, 2, 3, 4 and 5", "The cases must include every integer.", "Every integer is either even or odd, so two cases cover them all."],
      ["To prove a result about every integer's remainder when divided by 3, which cases do you need?", "n = 3k, 3k + 1 and 3k + 2", "n = 3k and 3k + 1", "n odd and n even", "Dividing by 3 leaves remainder 0, 1 or 2.", "Three cases: remainder 0, 1 and 2."],
      ["Which statement could be proved by exhaustion by checking each case?", "n² + n + 11 is prime for 1 ≤ n ≤ 6", "n² + n + 11 is prime for every n", "There are infinitely many primes", "Exhaustion needs a limited number of cases.", "Only six values need checking."],
      ["Square numbers end in which digits?", "0, 1, 4, 5, 6, 9", "0, 1, 4, 9", "1, 4, 6, 9", "Square each last digit 0 to 9.", "0², 1², …, 9² end in 0, 1, 4, 9, 6, 5, 6, 9, 4, 1."],
    ])),
    E(6, 5, "exhaustion-check", (rng) => {
      const a = rng.int(1, 5), b = rng.int(5, 15), lo = rng.int(1, 3), hi = lo + 4;
      const vals = []; for (let n = lo; n <= hi; n++) vals.push(n * n + a * n + b);
      const isPrime = (m) => { if (m < 2) return false; for (let d = 2; d * d <= m; d++) if (m % d === 0) return false; return true; };
      const nPrime = vals.filter(isPrime).length;
      return num(`For n = ${lo}, ${lo + 1}, …, ${hi}, how many values of n² ${sg(a)}n ${sg(b)} are prime?`, nPrime, {
        hints: ["Work out each value in turn.", `Values: ${vals.join(", ")}. Test each for primes.`], solution: [`${vals.map((v) => `${v}${isPrime(v) ? " (prime)" : ""}`).join(", ")}`, `${nPrime} are prime`],
      });
    }),
  ],
  [S(6, 6)]: [
    C(6, 6, "choose-counter-example", (rng) => bankMC(rng, [
      ["Which value is a counter-example to 'x² > x for every real x'?", "x = ½", "x = 2", "x = −3", "Try a number between 0 and 1.", "(½)² = ¼, which is less than ½."],
      ["Which is a counter-example to 'if a > b then a² > b²'?", "a = 1, b = −2", "a = 3, b = 2", "a = 5, b = 0", "Try a negative value of b.", "1 > −2 but 1² = 1 < 4 = (−2)²."],
      ["Which is a counter-example to 'the sum of two primes is even'?", "2 + 3", "3 + 5", "5 + 7", "Remember 2 is prime.", "2 + 3 = 5 is odd."],
      ["Which is a counter-example to '√(a + b) = √a + √b'?", "a = b = 1", "a = 0, b = 4", "a = 9, b = 0", "Avoid zero: it makes the statement true.", "√2 ≠ 2."],
      ["Which value of n is a counter-example to 'n² − n + 41 is always prime'?", "n = 41", "n = 1", "n = 10", "Make every term share a factor.", "41² − 41 + 41 = 41², which isn't prime."],
    ])),
    E(6, 6, "find-counter-example", (rng) => {
      const a = rng.pick([1, 2, 3, 5]), b = rng.pick([11, 17, 41]);
      // smallest positive n with n² + a·n + b not prime (search)
      const isPrime = (m) => { if (m < 2) return false; for (let d = 2; d * d <= m; d++) if (m % d === 0) return false; return true; };
      let n = 1; while (isPrime(n * n + a * n + b)) n++;
      return num(`Find the smallest positive integer n for which n² ${sg(a)}n ${sg(b)} is NOT prime.`, n, {
        hints: ["Work through n = 1, 2, 3, … and test each value.", `Try values where the expression could share a factor with ${b}.`], solution: [`n = ${n}: ${n * n + a * n + b}, which is not prime`, `So n = ${n} is a counter-example`],
      });
    }),
  ],
};

export const Y12A_GENERATORS = { ...U1, ...U2, ...U3, ...U4, ...U5, ...U6 };
