/* ==========================================================================
   Year 13 Pure generators, Part A: Units 1–6 (light format: core + extend)
   Proof and algebraic methods · Functions · Sequences and series ·
   Binomial expansion (any power) · Radians · Trigonometric functions
   --------------------------------------------------------------------------
   The answer box can't read sin, ln or e, so answers here are numbers
   (often to a set number of decimal places), several numbers (multi), or a
   choice of three (mc3) when the answer is an expression with trig in it.
   ========================================================================== */
import { fmt, gcd, round } from "../numbers.js";
import { core, extend, frac, mc3, multi, num, polyText, T } from "./helpers.js";
import { tidyQuestion } from "./tidy.js";

const S = (u, l) => `y13-u${u}-l${l}`;
// Every question goes through tidy() so the maths text reads naturally (see tidy.js)
const C = (u, l, name, make, v = () => true) => core(S(u, l), name, name, (rng) => tidyQuestion(make(rng)), v);
const E = (u, l, name, make, v = () => true) => extend(S(u, l), name, name, (rng) => tidyQuestion(make(rng)), v);
const nz = (rng, a, b) => rng.nonZero(a, b);
// "+ 3x", "− x": a signed term in a letter, leaving out a coefficient of 1
const sgv = (n, v) => `${n < 0 ? "−" : "+"} ${Math.abs(n) === 1 ? "" : fmt(Math.abs(n))}${v}`;
const sg = (n) => `${n < 0 ? "−" : "+"} ${fmt(Math.abs(n))}`;
const SUBS = { 0: "₀", 1: "₁", 2: "₂", 3: "₃", 4: "₄", 5: "₅", 6: "₆", 7: "₇", 8: "₈", 9: "₉" };
const SUPS = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
const sub = (n) => String(n).split("").map((c) => SUBS[c] ?? c).join("");
const sup = (n) => String(n).split("").map((c) => SUPS[c] ?? c).join("");
const F = (n, d) => { const g = gcd(Math.abs(n), Math.abs(d)) || 1; const s = d < 0 ? -1 : 1; return [(s * n) / g, (s * d) / g]; };
const fText = (n, d) => { const [a, b] = F(n, d); return b === 1 ? fmt(a) : `${a < 0 ? "−" : ""}{${Math.abs(a)}/${b}}`; };
const xb = (a) => `(x ${sg(-a)})`;   // (x − a)
const rad = (d) => (d * Math.PI) / 180, deg = (r) => (r * 180) / Math.PI;
const bankMC = (rng, bank) => {
  const [prompt, right, w1, w2, hint, why] = rng.pick(bank);
  return mc3(rng, prompt, right, [[w1, hint], [w2, hint]], { hints: [hint, "Check each option carefully."], solution: [why] });
};
// Generalised binomial coefficient n(n − 1)…(n − r + 1)/r! for rational n (given as p/q)
const gbin = (n, r) => { let v = 1; for (let k = 0; k < r; k++) v *= (n - k) / (k + 1); return v; };

/* ================== Unit 1: Proof and algebraic methods ================== */
const U1 = {
  [S(1, 1)]: [
    C(1, 1, "contradiction-assumption", (rng) => bankMC(rng, [
      ["To prove √2 is irrational by contradiction, what do you assume?", "√2 = a/b, a fraction in its lowest terms", "√2 is irrational", "√2 = 1.414…", "Assume the opposite of what you're proving.", "Assume it's rational: a/b with no common factors."],
      ["To prove there are infinitely many primes, what do you assume?", "There is a finite list of primes", "Every number is prime", "There are no primes", "Assume the opposite.", "Assume a finite list p₁, …, pₙ, then consider p₁p₂…pₙ + 1."],
      ["To prove 'if n² is odd then n is odd', what do you assume?", "n² is odd and n is even", "n² is even and n is odd", "n is odd", "Keep the 'if' part; deny the conclusion.", "Assume n² odd but n = 2k: then n² = 4k² is even, a contradiction."],
      ["To prove there is no greatest odd number, what do you assume?", "There is a greatest odd number N", "Every number is odd", "N is even", "Assume the opposite.", "Then N + 2 is odd and greater: a contradiction."],
      ["In the √2 proof, a² = 2b² shows that a is…", "even", "odd", "prime", "2b² is a multiple of 2.", "If a² is even, a is even."],
    ])),
    E(1, 1, "contradiction-step", (rng) => bankMC(rng, [
      ["Assume a and b are both even and √2 = a/b in lowest terms. Why is this a contradiction?", "Lowest terms means a and b have no common factor, but both even share 2", "a/b can't equal √2", "Even numbers can't be squared", "What does 'lowest terms' mean?", "Two even numbers share the factor 2."],
      ["If p₁, …, pₙ are all the primes, N = p₁p₂…pₙ + 1 leaves remainder … when divided by each pᵢ.", "1", "0", "pᵢ − 1", "N is one more than a multiple of each prime.", "So no pᵢ divides N: a contradiction."],
      ["Assume n is even, n = 2k. Then n² = …", "4k², which is even", "4k² + 1, which is odd", "2k², which is odd", "Square 2k.", "(2k)² = 4k² = 2(2k²)."],
      ["Assume x is rational and y irrational, and x + y = r is rational. Then y = r − x is…", "rational: a contradiction", "irrational", "zero", "The difference of two rationals is rational.", "So y would be rational, contradicting the assumption."],
    ])),
  ],
  [S(1, 2)]: [
    C(1, 2, "add-fractions-numerator", (rng) => {
      const a = rng.int(1, 6), b = rng.int(1, 6), p = nz(rng, -5, 5), q = nz(rng, -5, 5);
      if (p === q) return null;
      // a/(x − p) + b/(x − q) = ((a + b)x − (aq + bp)) / ((x − p)(x − q))
      return multi(`${a}/${xb(p)} + ${b}/${xb(q)} = (Ax + B)/(${xb(p)}${xb(q)}). Find A and B.`, [["A =", a + b], ["B =", -(a * q + b * p)]], {
        hints: ["Use the common denominator.", `Top: ${a}${xb(q)} + ${b}${xb(p)}.`], solution: [`${a}x ${sg(-a * q)} + ${b}x ${sg(-b * p)}`, `= ${polyText([a + b, -(a * q + b * p)])}`],
      });
    }),
    E(1, 2, "divide-fractions", (rng) => {
      const p = nz(rng, -6, 6), q = nz(rng, -6, 6), r = nz(rng, -6, 6), x0 = rng.int(-5, 5);
      if (p === q || x0 === p || x0 === -r || x0 === q || p === -r) return null;
      // (x² − p²)/(x + r) ÷ (x − p)/(x + r) = x + p
      return num(`Simplify (x² − ${p * p})/(x ${sg(r)}) ÷ ${xb(p)}/(x ${sg(r)}), then find its value when x = ${x0}.`, x0 + p, {
        hints: ["Flip the second fraction and multiply.", `x² − ${p * p} = (x ${sg(-p)})(x ${sg(p)}).`], solution: [`Simplifies to x ${sg(p)}`, `At x = ${x0}: ${x0 + p}`], data: { q },
      });
    }),
  ],
  [S(1, 3)]: [
    C(1, 3, "partial-fractions", (rng) => {
      const p = nz(rng, -5, 5), q = nz(rng, -5, 5), A = nz(rng, -6, 6), B = nz(rng, -6, 6);
      if (p === q) return null;
      // A/(x − p) + B/(x − q) = ((A + B)x − (Aq + Bp))/…
      const top = [A + B, -(A * q + B * p)];
      if (top[0] === 0 && top[1] === 0) return null;
      return multi(`(${polyText(top)})/(${xb(p)}${xb(q)}) = A/${xb(p)} + B/${xb(q)}. Find A and B.`, [["A =", A], ["B =", B]], {
        hints: [`${polyText(top)} = A${xb(q)} + B${xb(p)}.`, `Put x = ${p} to find A, and x = ${q} to find B.`], solution: [`x = ${p}: ${top[0] * p + top[1]} = ${p - q}A, A = ${A}`, `x = ${q}: ${top[0] * q + top[1]} = ${q - p}B, B = ${B}`],
      });
    }),
    E(1, 3, "partial-fractions-coefficient", (rng) => {
      const p = nz(rng, -4, 4), A = nz(rng, -5, 5), B = nz(rng, -5, 5), k = rng.int(2, 3), q = nz(rng, -4, 4);
      // A/(x − p) + B/(kx − q)
      const top = [A * k + B, -(A * q + B * p)];
      if (k * p === q) return null;
      return multi(`(${polyText(top)})/(${xb(p)}(${k}x ${sg(-q)})) = A/${xb(p)} + B/(${k}x ${sg(-q)}). Find A and B.`, [["A =", A], ["B =", B]], {
        hints: [`${polyText(top)} = A(${k}x ${sg(-q)}) + B${xb(p)}.`, `Put x = ${p}, then x = ${fText(q, k)}.`], solution: [`x = ${p}: A = ${A}`, `x = ${fText(q, k)}: B = ${B}`],
      });
    }),
  ],
  [S(1, 4)]: [
    C(1, 4, "repeated-factor-C", (rng) => {
      const p = nz(rng, -4, 4), q = nz(rng, -4, 4), A = nz(rng, -4, 4), B = nz(rng, -4, 4), Cc = nz(rng, -5, 5);
      if (p === q) return null;
      // A/(x−p) + B/(x−q) + C/(x−q)²; top = A(x−q)² + B(x−p)(x−q) + C(x−p)
      const top = [A + B, -2 * A * q - B * (p + q) + Cc, A * q * q + B * p * q - Cc * p];
      return num(`(${polyText(top)})/(${xb(p)}${xb(q)}²) = A/${xb(p)} + B/${xb(q)} + C/${xb(q)}². Find C.`, Cc, {
        hints: [`${polyText(top)} = A${xb(q)}² + B${xb(p)}${xb(q)} + C${xb(p)}.`, `Put x = ${q}: only the C term is left.`], solution: [`x = ${q}: ${top[0] * q * q + top[1] * q + top[2]} = ${q - p}C`, `C = ${Cc}`],
      });
    }),
    E(1, 4, "repeated-factor-all", (rng) => {
      const p = nz(rng, -3, 3), q = nz(rng, -3, 3), A = nz(rng, -4, 4), B = nz(rng, -4, 4), Cc = nz(rng, -4, 4);
      if (p === q) return null;
      const top = [A + B, -2 * A * q - B * (p + q) + Cc, A * q * q + B * p * q - Cc * p];
      return multi(`(${polyText(top)})/(${xb(p)}${xb(q)}²) = A/${xb(p)} + B/${xb(q)} + C/${xb(q)}². Find A, B and C.`, [["A =", A], ["B =", B], ["C =", Cc]], {
        hints: [`x = ${p} gives A; x = ${q} gives C.`, `Compare x² coefficients: A + B = ${top[0]}.`], solution: [`A = ${A}, C = ${Cc}`, `B = ${top[0]} − ${A} = ${B}`],
      });
    }),
  ],
  [S(1, 5)]: [
    C(1, 5, "improper-linear", (rng) => {
      const a = rng.int(1, 5), p = nz(rng, -5, 5), r = nz(rng, -9, 9);
      // (a x + (a p + r))/(x + p) = a + r/(x + p)
      return multi(`(${polyText([a, a * p + r])})/(x ${sg(p)}) = A + B/(x ${sg(p)}). Find A and B.`, [["A =", a], ["B =", r]], {
        hints: [`${polyText([a, a * p + r])} = ${a}(x ${sg(p)}) + ?`, `${a * p + r} − ${a * p} = ${r}.`], solution: [`= ${a}(x ${sg(p)}) ${sg(r)}`, `A = ${a}, B = ${r}`],
      });
    }),
    E(1, 5, "improper-quadratic", (rng) => {
      const p = nz(rng, -4, 4), a = nz(rng, -5, 5), r = nz(rng, -9, 9);
      // (x + a)(x + p) + r over (x + p)
      const top = [1, a + p, a * p + r];
      return multi(`(${polyText(top)})/(x ${sg(p)}) = x + A + B/(x ${sg(p)}). Find A and B.`, [["A =", a], ["B =", r]], {
        hints: ["Divide by (x " + sg(p) + ").", `${polyText(top)} = (x ${sg(a)})(x ${sg(p)}) ${sg(r)}.`], solution: [`Quotient x ${sg(a)}, remainder ${r}`],
      });
    }),
  ],
};

/* ======================= Unit 2: Functions and graphs ======================= */
const U2 = {
  [S(2, 1)]: [
    C(2, 1, "modulus-vertex", (rng) => {
      const a = rng.int(1, 4), b = nz(rng, -12, 12), c = rng.int(-6, 6);
      if (b % a !== 0) return null;
      return multi(`Find the vertex of y = |${a === 1 ? "" : a}x ${sg(b)}| ${c === 0 ? "" : sg(c)}.`, [["x =", -b / a], ["y =", c]], {
        hints: ["The vertex is where the inside equals 0.", `${a}x ${sg(b)} = 0 when x = ${fmt(-b / a)}.`], solution: [`(${fmt(-b / a)}, ${c})`],
      });
    }),
    E(2, 1, "modulus-evaluate", (rng) => {
      const a = rng.int(2, 5), b = rng.int(-9, 9), x = rng.int(-6, 6), c = rng.int(-5, 5);
      const v = Math.abs(a * x + b) + c;
      return num(`f(x) = |${a}x ${sg(b)}| ${sg(c)}. Find f(${x}).`, v, {
        traps: [T(a * x + b + c, "Take the modulus of the inside before adding.")],
        hints: [`Inside: ${a}(${x}) ${sg(b)} = ${a * x + b}.`, `|${a * x + b}| = ${Math.abs(a * x + b)}.`], solution: [`${Math.abs(a * x + b)} ${sg(c)} = ${v}`],
      });
    }),
  ],
  [S(2, 2)]: [
    C(2, 2, "range-linear", (rng) => {
      const m = nz(rng, -4, 4), c = rng.int(-6, 6), a = rng.int(-3, 1), b = a + rng.int(2, 5);
      const lo = Math.min(m * a + c, m * b + c), hi = Math.max(m * a + c, m * b + c);
      return multi(`f(x) = ${polyText([m, c])}, ${a} ≤ x ≤ ${b}. Find the range: least and greatest values of f(x).`, [["least =", lo], ["greatest =", hi]], {
        hints: ["A straight line takes its extreme values at the ends.", `f(${a}) = ${m * a + c}, f(${b}) = ${m * b + c}.`], solution: [`${lo} ≤ f(x) ≤ ${hi}`],
      });
    }),
    E(2, 2, "range-quadratic", (rng) => {
      const h = rng.int(-5, 5), k = rng.int(-9, 9), a = rng.pick([1, 2, -1]);
      return num(`f(x) = ${a === 1 ? "" : a === -1 ? "−" : a}(x ${sg(-h)})² ${sg(k)}, x ∈ ℝ. The range is f(x) ${a > 0 ? "≥" : "≤"} k. Find k.`, k, {
        traps: [T(h, "That's the x-coordinate of the turning point. The range is about f(x).")],
        hints: [`(x ${sg(-h)})² ≥ 0.`, `So f(x) ${a > 0 ? "≥" : "≤"} ${k}.`], solution: [`Turning point (${h}, ${k})`, `Range f(x) ${a > 0 ? "≥" : "≤"} ${k}`],
      });
    }),
  ],
  [S(2, 3)]: [
    C(2, 3, "composite-value", (rng) => {
      const a = rng.int(2, 5), b = rng.int(-6, 6), c = rng.int(-4, 4), x = rng.int(-3, 4), fg = rng.chance(0.5);
      const f = (t) => a * t + b, g = (t) => t * t + c;
      const v = fg ? f(g(x)) : g(f(x));
      return num(`f(x) = ${polyText([a, b])}, g(x) = x² ${sg(c)}. Find ${fg ? "fg" : "gf"}(${x}).`, v, {
        traps: [T(fg ? g(f(x)) : f(g(x)), `${fg ? "fg" : "gf"}(x) means do ${fg ? "g" : "f"} FIRST.`)],
        hints: [`Work from the right: ${fg ? "g" : "f"}(${x}) first.`, fg ? `g(${x}) = ${g(x)}.` : `f(${x}) = ${f(x)}.`], solution: [fg ? `g(${x}) = ${g(x)}, f(${g(x)}) = ${v}` : `f(${x}) = ${f(x)}, g(${f(x)}) = ${v}`],
      });
    }),
    E(2, 3, "composite-solve", (rng) => {
      const a = rng.int(2, 4), b = rng.int(-5, 5), c = rng.int(1, 4), x = rng.int(-4, 4);
      // fg(x) = a(cx)... f(x) = ax + b, g(x) = x + c: fg(x) = a(x + c) + b = k
      const k = a * (x + c) + b;
      return num(`f(x) = ${polyText([a, b])}, g(x) = x + ${c}. Solve fg(x) = ${k}.`, x, {
        hints: [`fg(x) = ${a}(x + ${c}) ${sg(b)}.`, `${a}(x + ${c}) ${sg(b)} = ${k}.`], solution: [`${a}x + ${a * c + b} = ${k}`, `x = ${x}`],
      });
    }),
  ],
  [S(2, 4)]: [
    C(2, 4, "inverse-value", (rng) => {
      const a = rng.int(2, 7), b = rng.int(-9, 9), x = rng.int(-5, 6);
      const y = a * x + b;
      return num(`f(x) = ${polyText([a, b])}. Find f⁻¹(${y}).`, x, {
        traps: [T(a * y + b, "f⁻¹ undoes f: solve f(x) = " + y + ".")],
        hints: [`Solve ${polyText([a, b])} = ${y}.`, `Or: f⁻¹(x) = (x ${sg(-b)})/${a}.`], solution: [`(${y} ${sg(-b)}) ÷ ${a} = ${x}`],
      });
    }),
    E(2, 4, "inverse-domain", (rng) => {
      const h = rng.int(-4, 4), k = rng.int(-6, 6);
      return num(`f(x) = (x ${sg(-h)})² ${sg(k)}, x ≥ ${h}. The domain of f⁻¹ is x ≥ a. Find a.`, k, {
        traps: [T(h, "The domain of f⁻¹ is the RANGE of f.")],
        hints: ["Domain of f⁻¹ = range of f.", `f(x) ≥ ${k}.`], solution: [`Range of f: f(x) ≥ ${k}`, `So f⁻¹ has domain x ≥ ${k}`],
      });
    }),
  ],
  [S(2, 5)]: [
    C(2, 5, "mod-f-point", (rng) => {
      const x = rng.int(-6, 6), y = nz(rng, -8, 8), outside = rng.chance(0.5);
      if (outside) return multi(`(${x}, ${y}) is on y = f(x). Find the matching point on y = |f(x)|.`, [["x =", x], ["y =", Math.abs(y)]], { hints: ["|f(x)| makes every y-value positive.", "x doesn't change."], solution: [`(${x}, ${Math.abs(y)})`] });
      const xx = Math.abs(x) || 2;
      return multi(`(${xx}, ${y}) is on y = f(x). Find the point with x = ${-xx} on y = f(|x|).`, [["y =", y]], { hints: [`f(|${-xx}|) = f(${xx}).`, "f(|x|) is symmetric in the y-axis."], solution: [`(${-xx}, ${y})`] });
    }),
    E(2, 5, "mod-graph-features", (rng) => bankMC(rng, [
      ["How is y = |f(x)| made from y = f(x)?", "Reflect the parts below the x-axis in the x-axis", "Reflect the right half in the y-axis", "Reflect the whole graph in y = x", "The modulus is outside.", "Negative y-values become positive."],
      ["How is y = f(|x|) made from y = f(x)?", "Copy the part for x ≥ 0, and reflect it in the y-axis", "Reflect parts below the x-axis", "Delete the left half", "The modulus is inside.", "f(|x|) = f(x) for x ≥ 0, and is symmetric."],
      ["Which is always true of y = f(|x|)?", "It is symmetric in the y-axis", "It never goes below the x-axis", "It is a straight line", "f(|−a|) = f(a).", "The same output for x and −x."],
      ["Which is always true of y = |f(x)|?", "y ≥ 0 everywhere", "It is symmetric in the y-axis", "It passes through the origin", "A modulus is never negative.", "Every output is non-negative."],
    ])),
  ],
  [S(2, 6)]: [
    C(2, 6, "combined-transform-point", (rng) => {
      const x = rng.int(-4, 4), y = rng.int(-5, 5), a = rng.int(2, 3), b = nz(rng, -4, 4), c = nz(rng, -5, 5);
      return multi(`(${x}, ${y}) is on y = f(x). Find its image on y = ${a}f(x ${sg(b)}) ${sg(c)}.`, [["x =", x - b, undefined, [T(x + b, "Inside the bracket: opposite direction.")]], ["y =", a * y + c, undefined, [T(a * (y + c), `Multiply by ${a} first, then add ${c}.`)]]], {
        hints: [`x: move ${b > 0 ? "left" : "right"} ${Math.abs(b)}.`, `y: × ${a}, then ${sg(c)}.`], solution: [`(${x - b}, ${a * y + c})`],
      });
    }),
    E(2, 6, "combined-stretch-point", (rng) => {
      const x = rng.int(-4, 4) * 2, y = rng.int(-5, 5), b = rng.int(-6, 6), k = 2;
      return multi(`(${x}, ${y}) is on y = f(x). Find its image on y = −f(${k}x) ${sg(b)}.`, [["x =", x / k, undefined, [T(x * k, `f(${k}x): divide x by ${k}.`)]], ["y =", -y + b]], {
        hints: [`Divide x by ${k}.`, `Change the sign of y, then ${sg(b)}.`], solution: [`(${x / k}, ${-y + b})`],
      });
    }),
  ],
  [S(2, 7)]: [
    C(2, 7, "solve-modulus", (rng) => {
      const a = rng.int(1, 4), b = rng.int(-9, 9), c = rng.int(1, 12);
      const s1 = (c - b) / a, s2 = (-c - b) / a;
      if (!Number.isInteger(s1) || !Number.isInteger(s2)) return null;
      return multi(`Solve |${a === 1 ? "" : a}x ${sg(b)}| = ${c}. (Smaller first.)`, [["x =", Math.min(s1, s2)], ["x =", Math.max(s1, s2)]], {
        hints: [`${a}x ${sg(b)} = ${c} or ${a}x ${sg(b)} = −${c}.`, "Solve each."], solution: [`x = ${s1} or x = ${s2}`],
      });
    }),
    E(2, 7, "modulus-equals-line", (rng) => {
      const p = rng.int(1, 6), m = rng.int(2, 4);
      // |x − p| = m x: case 1 x − p = mx → x = −p/(m − 1) (negative, rejected since RHS < 0); case 2 p − x = mx → x = p/(m + 1)
      const [n, d] = F(p, m + 1);
      return frac(`Solve |x − ${p}| = ${m}x.`, n, d, {
        answerText: fText(p, m + 1), traps: [T(-p / (m - 1), `Check this in the original: ${m}x would be negative, but a modulus can't be.`)],
        hints: [`Case 1: x − ${p} = ${m}x. Case 2: −(x − ${p}) = ${m}x.`, "Check each answer: the right-hand side must be ≥ 0."], solution: [`Case 1 gives x = ${fText(-p, m - 1)}: rejected`, `Case 2 gives x = ${fText(p, m + 1)}`],
      });
    }),
  ],
};

/* ======================= Unit 3: Sequences and series ======================= */
const U3 = {
  [S(3, 1)]: [
    C(3, 1, "arithmetic-term", (rng) => {
      const a = rng.int(-20, 30), d = nz(rng, -9, 12), n = rng.int(10, 60);
      return num(`An arithmetic sequence has first term ${a} and common difference ${d}. Find u${sub(n)}.`, a + (n - 1) * d, {
        traps: [T(a + n * d, "Use (n − 1)d: the first term has no d added.")],
        hints: ["uₙ = a + (n − 1)d.", `${a} + ${n - 1} × ${d}.`], solution: [`u${sub(n)} = ${a + (n - 1) * d}`],
      });
    }),
    E(3, 1, "arithmetic-from-two", (rng) => {
      const a = rng.int(-10, 20), d = nz(rng, -6, 8), m = rng.int(2, 5), n = m + rng.int(3, 8);
      return multi(`u${sub(m)} = ${a + (m - 1) * d} and u${sub(n)} = ${a + (n - 1) * d}. Find a and d.`, [["a =", a], ["d =", d]], {
        hints: [`${n - m}d = ${(n - m) * d}.`, `Then a = u${sub(m)} − ${m - 1}d.`], solution: [`d = ${d}`, `a = ${a}`],
      });
    }),
  ],
  [S(3, 2)]: [
    C(3, 2, "arithmetic-sum", (rng) => {
      const a = rng.int(-10, 20), d = nz(rng, -5, 8), n = rng.int(8, 40);
      return num(`Find the sum of the first ${n} terms of the arithmetic series with a = ${a}, d = ${d}.`, (n * (2 * a + (n - 1) * d)) / 2, {
        traps: [T(n * (2 * a + (n - 1) * d), "Don't forget the ½.")],
        hints: ["Sₙ = ½n(2a + (n − 1)d).", `½ × ${n} × (${2 * a} + ${n - 1} × ${d}).`], solution: [`S${sub(n)} = ${(n * (2 * a + (n - 1) * d)) / 2}`],
      });
    }),
    E(3, 2, "sum-to-last-term", (rng) => {
      const a = rng.int(1, 12), d = rng.int(2, 7), n = rng.int(10, 40), l = a + (n - 1) * d;
      return num(`Find ${a} + ${a + d} + ${a + 2 * d} + … + ${l}.`, (n * (a + l)) / 2, {
        traps: [T(((n - 1) * (a + l)) / 2, "Count the terms: (last − first) ÷ d + 1.")],
        hints: [`Number of terms: (${l} − ${a}) ÷ ${d} + 1 = ${n}.`, "Sₙ = ½n(a + l)."], solution: [`n = ${n}`, `½ × ${n} × ${a + l} = ${(n * (a + l)) / 2}`],
      });
    }),
  ],
  [S(3, 3)]: [
    C(3, 3, "geometric-term", (rng) => {
      const a = nz(rng, -5, 6), r = rng.pick([2, 3, -2, -3]), n = rng.int(4, 9);
      return num(`A geometric sequence has a = ${a} and r = ${r}. Find u${sub(n)}.`, a * r ** (n - 1), {
        traps: [T(a * r ** n, "Use rⁿ⁻¹.")],
        hints: ["uₙ = arⁿ⁻¹.", `${a} × (${r})${sup(n - 1)}.`], solution: [`u${sub(n)} = ${a * r ** (n - 1)}`],
      });
    }),
    E(3, 3, "geometric-ratio", (rng) => {
      const a = rng.int(1, 6), r = rng.pick([2, 3, 4, -2]), m = rng.int(1, 3), k = rng.pick([2, 3]);
      const n = m + k;
      return num(`A geometric sequence has u${sub(m)} = ${a * r ** (m - 1)} and u${sub(n)} = ${a * r ** (n - 1)}. Find the common ratio r${k % 2 === 0 ? " (r > 0)" : ""}.`, k % 2 === 0 ? Math.abs(r) : r, {
        hints: [`u${sub(n)} ÷ u${sub(m)} = r${sup(k)}.`, `r${sup(k)} = ${r ** k}.`], solution: [`r${sup(k)} = ${r ** k}`, `r = ${k % 2 === 0 ? Math.abs(r) : r}`],
      });
    }),
  ],
  [S(3, 4)]: [
    C(3, 4, "geometric-sum", (rng) => {
      const a = rng.int(1, 8), r = rng.pick([2, 3, -2]), n = rng.int(4, 8);
      const s = (a * (r ** n - 1)) / (r - 1);
      return num(`Find the sum of the first ${n} terms of the geometric series with a = ${a} and r = ${r}.`, s, {
        hints: ["Sₙ = a(rⁿ − 1)/(r − 1).", `${a}((${r})${sup(n)} − 1)/(${r} − 1).`], solution: [`S${sub(n)} = ${s}`],
      });
    }),
    E(3, 4, "least-n", (rng) => {
      const a = rng.int(1, 5), r = rng.pick([2, 3]), target = rng.int(100, 5000);
      let n = 1; while ((a * (r ** n - 1)) / (r - 1) <= target) n++;
      return num(`A geometric series has a = ${a} and r = ${r}. Find the least n for which Sₙ > ${target}.`, n, {
        hints: [`${a}(${r}ⁿ − 1)/${r - 1} > ${target}.`, "Rearrange and use logs, or try values of n."], solution: [`S${sub(n - 1)} = ${(a * (r ** (n - 1) - 1)) / (r - 1)}, S${sub(n)} = ${(a * (r ** n - 1)) / (r - 1)}`, `n = ${n}`],
      });
    }),
  ],
  [S(3, 5)]: [
    C(3, 5, "sum-to-infinity", (rng) => {
      const [rn, rd] = rng.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [-1, 2], [-1, 3], [1, 5]]);
      const a = rd * rng.int(1, 9);
      const [n, d] = F(a * rd, rd - rn);
      return frac(`Find the sum to infinity of the geometric series with first term ${a} and r = ${fText(rn, rd)}.`, n, d, {
        answerText: fText(a * rd, rd - rn), traps: [T((a * rd) / (rd + rn), "S∞ = a ÷ (1 − r), not (1 + r).")],
        hints: ["S∞ = a/(1 − r).", `1 − r = ${fText(rd - rn, rd)}.`], solution: [`${a} ÷ ${fText(rd - rn, rd)} = ${fText(a * rd, rd - rn)}`],
      });
    }),
    E(3, 5, "find-r-from-sum", (rng) => {
      const [rn, rd] = rng.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5]]);
      const S = rd * rng.int(2, 9), a = (S * (rd - rn)) / rd;
      return frac(`A geometric series has first term ${fmt(a)} and sum to infinity ${S}. Find r.`, rn, rd, {
        hints: [`${fmt(a)}/(1 − r) = ${S}.`, `1 − r = ${fmt(a)}/${S}.`], solution: [`1 − r = ${fText(rd - rn, rd)}`, `r = ${fText(rn, rd)}`],
      });
    }),
  ],
  [S(3, 6)]: [
    C(3, 6, "sigma-arithmetic", (rng) => {
      const p = rng.int(1, 6), q = rng.int(-5, 8), n = rng.int(5, 30);
      // Σ (pr + q), r = 1..n
      const v = (p * n * (n + 1)) / 2 + q * n;
      return num(`Evaluate Σ from r = 1 to ${n} of (${p === 1 ? "" : p}r ${sg(q)}).`, v, {
        hints: [`It's arithmetic: first term ${p + q}, last term ${p * n + q}.`, `½ × ${n} × (${p + q} + ${p * n + q}).`], solution: [`= ${v}`],
      });
    }),
    E(3, 6, "sigma-geometric", (rng) => {
      const a = rng.int(1, 5), r = rng.pick([2, 3]), n = rng.int(3, 8);
      // Σ a r^k, k = 1..n
      const v = a * r * (r ** n - 1) / (r - 1);
      return num(`Evaluate Σ from k = 1 to ${n} of ${a === 1 ? "" : a + " × "}${r}ᵏ.`, v, {
        traps: [T((a * (r ** n - 1)) / (r - 1), `The first term is k = 1: ${a * r}, not ${a}.`)],
        hints: [`Geometric: first term ${a * r}, r = ${r}, ${n} terms.`, `${a * r}(${r}${sup(n)} − 1)/(${r} − 1).`], solution: [`= ${v}`],
      });
    }),
  ],
  [S(3, 7)]: [
    C(3, 7, "recurrence-term", (rng) => {
      const p = rng.int(2, 4), q = rng.int(-5, 5), u1 = rng.int(-3, 5), n = rng.int(3, 5);
      let u = u1; for (let i = 1; i < n; i++) u = p * u + q;
      return num(`uₙ₊₁ = ${p}uₙ ${sg(q)}, u₁ = ${u1}. Find u${sub(n)}.`, u, {
        hints: ["Apply the rule to each term in turn.", `u₂ = ${p} × ${u1} ${sg(q)} = ${p * u1 + q}.`], solution: [`u${sub(n)} = ${u}`],
      });
    }),
    E(3, 7, "recurrence-find-k", (rng) => {
      const k = nz(rng, -5, 5), u1 = rng.int(1, 5), m = rng.int(2, 3);
      // uₙ₊₁ = m uₙ + k: u₃ = m(m u1 + k) + k
      const u3 = m * (m * u1 + k) + k;
      return num(`uₙ₊₁ = ${m}uₙ + k, u₁ = ${u1}, and u₃ = ${u3}. Find k.`, k, {
        hints: [`u₂ = ${m * u1} + k.`, `u₃ = ${m}(${m * u1} + k) + k = ${m * m * u1} + ${m + 1}k.`], solution: [`${m * m * u1} + ${m + 1}k = ${u3}`, `k = ${k}`],
      });
    }),
  ],
  [S(3, 8)]: [
    C(3, 8, "depreciation", (rng) => {
      const V = rng.int(5, 40) * 1000, p = rng.pick([10, 15, 20, 25]), n = rng.int(2, 6);
      const v = round(V * (1 - p / 100) ** n, 2);
      return num(`A car worth £${fmt(V)} loses ${p}% of its value each year. Find its value after ${n} years, to the nearest penny.`, v, {
        dp: 2, pre: "£", traps: [T(round(V * (p / 100) ** n, 2), `It KEEPS ${100 - p}% each year: r = ${fmt(1 - p / 100)}.`)],
        hints: [`r = ${fmt(1 - p / 100)}.`, `${V} × ${fmt(1 - p / 100)}${sup(n)}.`], solution: [`£${fmt(v, 2)}`],
      });
    }),
    E(3, 8, "savings-arithmetic", (rng) => {
      const a = rng.int(2, 20) * 5, d = rng.int(1, 5) * 5, n = rng.int(6, 24);
      return num(`Sam saves £${a} in month 1, then £${d} more each month than the month before. How much has she saved in total after ${n} months?`, (n * (2 * a + (n - 1) * d)) / 2, {
        pre: "£", hints: [`Arithmetic: a = ${a}, d = ${d}.`, `S${sub(n)} = ½ × ${n} × (${2 * a} + ${n - 1} × ${d}).`], solution: [`£${(n * (2 * a + (n - 1) * d)) / 2}`],
      });
    }),
  ],
};

/* =================== Unit 4: Binomial expansion for any power =================== */
const NS = [[-1, 1], [-2, 1], [-3, 1], [1, 2], [-1, 2], [3, 2], [-3, 2]];   // all give terminating decimals
const nText = ([p, q]) => (q === 1 ? fmt(p) : `${p < 0 ? "−" : ""}${Math.abs(p)}/${q}`);
const U4 = {
  [S(4, 1)]: [
    C(4, 1, "expand-1-plus-x", (rng) => {
      const nn = rng.pick(NS), n = nn[0] / nn[1], b = rng.pick([1, 2, -1, -2, 3]);
      const c1 = n * b, c2 = gbin(n, 2) * b * b;
      return multi(`(1 ${sgv(b, "x")})^(${nText(nn)}) = 1 + px + qx² + … Find p and q (fractions like 3/8 are fine).`, [["p =", c1], ["q =", c2, undefined, [T(gbin(n, 2) * b, `Square the ${b}x.`)]]], {
        answerText: `p = ${fmt(round(c1, 4))}, q = ${fmt(round(c2, 4))}`,
        hints: ["(1 + x)ⁿ = 1 + nx + n(n − 1)x²/2! + …", `Replace x with ${b}x.`], solution: [`p = ${nText(nn)} × ${b} = ${fmt(round(c1, 4))}`, `q = ${nText(nn)}(${nText(nn)} − 1)/2 × ${b * b} = ${fmt(round(c2, 4))}`],
      });
    }),
    E(4, 1, "cube-term", (rng) => {
      const nn = rng.pick(NS), n = nn[0] / nn[1], b = rng.pick([1, 2, -1, -2]);
      const c3 = gbin(n, 3) * b ** 3;
      return num(`Find the coefficient of x³ in the expansion of (1 ${sgv(b, "x")})^(${nText(nn)}). Give it as a decimal or fraction.`, c3, {
        answerText: fmt(round(c3, 5)),
        hints: ["The x³ term is n(n − 1)(n − 2)/3! × (bx)³.", `n = ${nText(nn)}, b = ${b}.`], solution: [`${fmt(round(gbin(n, 3), 5))} × ${b ** 3} = ${fmt(round(c3, 5))}`],
      });
    }),
  ],
  [S(4, 2)]: [
    C(4, 2, "factor-out-a", (rng) => {
      // [a, p, q, A as top, A as bottom] where A = a^(p/q)
      const [a, p, q, An, Ad] = rng.pick([[4, 1, 2, 2, 1], [9, 1, 2, 3, 1], [2, -1, 1, 1, 2], [3, -1, 1, 1, 3], [2, -2, 1, 1, 4], [4, -1, 2, 1, 2], [8, 1, 3, 2, 1], [3, -2, 1, 1, 9], [16, 1, 2, 4, 1], [5, -1, 1, 1, 5]]);
      const b = nz(rng, -3, 3);
      return frac(`(${a} ${sgv(b, "x")})^(${nText([p, q])}) = A(1 ${sgv(b, "x")}/${a})^(${nText([p, q])}). Find A.`, An, Ad, {
        hints: [`A = ${a}^(${nText([p, q])}).`, p < 0 ? "A negative power means 1 over." : "A fractional power means a root."], solution: [`A = ${fText(An, Ad)}`],
      });
    }),
    E(4, 2, "validity", (rng) => {
      const a = rng.int(1, 9), b = nz(rng, -5, 5), nn = rng.pick(NS);
      if (a === Math.abs(b)) return null;
      const [n, d] = F(a, Math.abs(b));
      return frac(`The expansion of (${a} ${sgv(b, "x")})^(${nText(nn)}) is valid for |x| < k. Find k.`, n, d, {
        answerText: fText(a, Math.abs(b)), traps: [T(Math.abs(b) / a, `Valid when |${b}x/${a}| < 1, so |x| < ${a}/${Math.abs(b)}.`)],
        hints: [`Write it as ${a}ⁿ(1 ${sgv(b, "x")}/${a})ⁿ.`, `Need |${b}x/${a}| < 1.`], solution: [`|x| < ${fText(a, Math.abs(b))}`],
      });
    }),
  ],
  [S(4, 3)]: [
    C(4, 3, "pf-expansion-constant", (rng) => {
      const A = nz(rng, -4, 4), B = nz(rng, -4, 4), p = rng.pick([1, 2, 3]), q = rng.pick([1, 2, 3]);
      // A/(1 + p x) + B/(1 − q x): constant A + B, x coeff −A p + B q
      return multi(`Expand ${A}/(1 + ${p === 1 ? "" : p}x) ${sg(B)}/(1 − ${q === 1 ? "" : q}x) as c + dx + … Find c and d.`, [["c =", A + B], ["d =", -A * p + B * q]], {
        hints: [`1/(1 + ${p}x) = 1 − ${p}x + …; 1/(1 − ${q}x) = 1 + ${q}x + …`, "Multiply by A and B, then add matching terms."], solution: [`c = ${A} ${sg(B)} = ${A + B}`, `d = ${-A * p} ${sg(B * q)} = ${-A * p + B * q}`],
      });
    }),
    E(4, 3, "pf-validity", (rng) => {
      const p = rng.int(1, 4), q = rng.int(1, 4);
      if (p === q) return null;
      const big = Math.max(p, q);
      return frac(`f(x) = A/(1 + ${p === 1 ? "" : p}x) + B/(1 − ${q === 1 ? "" : q}x). For which |x| < k is the expansion of f(x) valid? Find k.`, 1, big, {
        traps: [T(1 / Math.min(p, q), "Both expansions must be valid: use the narrower range.")],
        hints: [`First: |x| < 1/${p}. Second: |x| < 1/${q}.`, "Both must hold."], solution: [`|x| < ${fText(1, big)}`],
      });
    }),
  ],
};

/* ========================= Unit 5: Radians ========================= */
const U5 = {
  [S(5, 1)]: [
    C(5, 1, "deg-to-rad", (rng) => {
      const d = rng.pick([30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360]);
      const [n, k] = F(d, 180);
      return frac(`Write ${d}° in radians as a multiple of π: kπ. Find k.`, n, k, {
        hints: ["π radians = 180°.", `k = ${d}/180.`], solution: [`${d}° = ${fText(d, 180)}π`],
      });
    }),
    E(5, 1, "rad-to-deg", (rng) => {
      const r = round(rng.int(5, 60) / 10, 1);
      const d = round(deg(r), 1);
      return num(`Convert ${fmt(r)} radians to degrees, to 1 decimal place.`, d, {
        dp: 1, traps: [T(round(r * Math.PI / 180, 1), "Radians to degrees: multiply by 180/π.")],
        hints: ["Multiply by 180/π.", `${fmt(r)} × 180 ÷ π.`], solution: [`${fmt(d, 1)}°`],
      });
    }),
  ],
  [S(5, 2)]: [
    C(5, 2, "arc-length", (rng) => {
      const r = rng.int(2, 20), t = round(rng.int(2, 30) / 10, 1);
      return num(`A sector has radius ${r} cm and angle ${fmt(t)} radians. Find the arc length.`, round(r * t, 2), {
        unit: "cm", hints: ["s = rθ.", `${r} × ${fmt(t)}.`], solution: [`s = ${fmt(round(r * t, 2))} cm`],
      });
    }),
    E(5, 2, "sector-perimeter", (rng) => {
      const r = rng.int(3, 15), t = round(rng.int(2, 25) / 10, 1);
      const P = round(2 * r + r * t, 2);
      return num(`Find the perimeter of a sector of radius ${r} cm and angle ${fmt(t)} radians.`, P, {
        unit: "cm", traps: [T(round(r * t, 2), "Add the two radii as well.")],
        hints: ["Perimeter = 2r + rθ.", `2 × ${r} + ${r} × ${fmt(t)}.`], solution: [`${fmt(P)} cm`],
      });
    }),
  ],
  [S(5, 3)]: [
    C(5, 3, "sector-area", (rng) => {
      const r = rng.int(2, 15), t = round(rng.int(2, 30) / 10, 1);
      const A = round(0.5 * r * r * t, 2);
      return num(`Find the area of a sector with radius ${r} cm and angle ${fmt(t)} radians.`, A, {
        unit: "cm²", traps: [T(round(r * r * t, 2), "Area = ½r²θ: don't forget the ½.")],
        hints: ["A = ½r²θ.", `½ × ${r * r} × ${fmt(t)}.`], solution: [`${fmt(A)} cm²`],
      });
    }),
    E(5, 3, "segment-area", (rng) => {
      const r = rng.int(3, 15), t = round(rng.int(5, 30) / 10, 1);
      const A = round(0.5 * r * r * (t - Math.sin(t)), 2);
      return num(`Find the area of the segment cut off by a chord, in a circle of radius ${r} cm, where the angle at the centre is ${fmt(t)} radians. Give your answer to 2 decimal places.`, A, {
        dp: 2, unit: "cm²", traps: [T(round(0.5 * r * r * (t - Math.sin(rad(t))), 2), "Your calculator must be in RADIANS for sin θ.")],
        hints: ["Segment = ½r²(θ − sin θ).", "Calculator in radians."], solution: [`½ × ${r * r} × (${fmt(t)} − sin ${fmt(t)}) = ${fmt(A, 2)} cm²`],
      });
    }),
  ],
  [S(5, 4)]: [
    C(5, 4, "solve-radians", (rng) => {
      const f = rng.pick(["sin", "cos"]), k = round(rng.int(1, 9) / 10 * rng.pick([1, -1]), 1);
      const p = f === "sin" ? Math.asin(k) : Math.acos(k);
      let s = f === "sin" ? [p, Math.PI - p] : [p, 2 * Math.PI - p];
      s = s.map((v) => (v + 2 * Math.PI) % (2 * Math.PI)).sort((a, b) => a - b);
      return multi(`Solve ${f} x = ${fmt(k)} for 0 ≤ x < 2π, to 2 decimal places.`, [["smaller x =", round(s[0], 2), 2], ["larger x =", round(s[1], 2), 2]], {
        hints: [`${f}⁻¹(${fmt(k)}) = ${fmt(round(p, 4))} (radians).`, f === "sin" ? "The other solution is π minus it (add 2π if negative)." : "The other is 2π minus it."], solution: [`x = ${fmt(round(s[0], 2), 2)}, ${fmt(round(s[1], 2), 2)}`],
      });
    }),
    E(5, 4, "exact-radian-solutions", (rng) => {
      const [eq, right, w1, w2] = rng.pick([
        ["sin x = ½", "π/6, 5π/6", "π/6, 7π/6", "π/3, 2π/3"],
        ["cos x = ½", "π/3, 5π/3", "π/3, 2π/3", "π/6, 11π/6"],
        ["tan x = 1", "π/4, 5π/4", "π/4, 3π/4", "π/4, 7π/4"],
        ["sin x = −√3/2", "4π/3, 5π/3", "π/3, 2π/3", "2π/3, 4π/3"],
        ["cos x = −√2/2", "3π/4, 5π/4", "π/4, 7π/4", "3π/4, 7π/4"],
        ["tan x = −√3", "2π/3, 5π/3", "π/3, 4π/3", "2π/3, 4π/3"],
      ]);
      return mc3(rng, `Solve ${eq} for 0 ≤ x < 2π.`, right, [[w1, "Check the quadrants with CAST."], [w2, "Find the related angle first."]], {
        hints: ["Find the related acute angle from the exact values.", "Use CAST to find the quadrants."], solution: [`x = ${right}`],
      });
    }),
  ],
  [S(5, 5)]: [
    C(5, 5, "small-angle-cos", (rng) => {
      const t = rng.pick([0.1, 0.2, 0.05, 0.15, 0.3]), k = rng.int(1, 3);
      const v = round(1 - 0.5 * (k * t) ** 2, 4);
      return num(`Use the small angle approximation to estimate cos ${fmt(round(k * t, 2))} (radians), to 4 decimal places.`, v, {
        dp: 4, hints: ["cos θ ≈ 1 − ½θ².", `θ = ${fmt(round(k * t, 2))}.`], solution: [`1 − ½(${fmt(round(k * t, 2))})² = ${fmt(v, 4)}`],
      });
    }),
    E(5, 5, "small-angle-limit", (rng) => {
      const a = rng.int(2, 6), b = rng.int(1, 4), kind = rng.int(0, 2);
      if (kind === 0) return frac(`For small θ, (sin ${a}θ)/(${b}θ) ≈ k. Find k.`, ...F(a, b), { hints: [`sin ${a}θ ≈ ${a}θ.`, `${a}θ ÷ ${b}θ.`], solution: [`k = ${fText(a, b)}`] });
      if (kind === 1) return frac(`For small θ, (1 − cos ${a}θ)/θ² ≈ k. Find k.`, ...F(a * a, 2), { hints: [`cos ${a}θ ≈ 1 − ½(${a}θ)².`, `1 − cos ${a}θ ≈ ${fText(a * a, 2)}θ².`], solution: [`k = ${fText(a * a, 2)}`] });
      return frac(`For small θ, (tan ${a}θ)/(sin ${b}θ) ≈ k. Find k.`, ...F(a, b), { hints: [`tan ${a}θ ≈ ${a}θ and sin ${b}θ ≈ ${b}θ.`, "Divide."], solution: [`k = ${fText(a, b)}`] });
    }),
  ],
};

/* ======================= Unit 6: Trigonometric functions ======================= */
const U6 = {
  [S(6, 1)]: [
    C(6, 1, "reciprocal-exact", (rng) => {
      const [q, v, why] = rng.pick([
        ["sec 60°", 2, "cos 60° = ½"], ["cosec 30°", 2, "sin 30° = ½"], ["cot 45°", 1, "tan 45° = 1"], ["sec 0°", 1, "cos 0° = 1"],
        ["cosec 90°", 1, "sin 90° = 1"], ["sec 180°", -1, "cos 180° = −1"], ["cosec 150°", 2, "sin 150° = ½"], ["sec 120°", -2, "cos 120° = −½"],
        ["cosec 210°", -2, "sin 210° = −½"], ["sec 300°", 2, "cos 300° = ½"], ["cot 135°", -1, "tan 135° = −1"], ["cosec 330°", -2, "sin 330° = −½"],
      ]);
      return num(`Find the exact value of ${q}.`, v, {
        traps: Math.abs(v) === 1 ? [] : [T(1 / v, "sec, cosec and cot are 1 ÷ cos, sin and tan.")],
        hints: ["sec = 1/cos, cosec = 1/sin, cot = 1/tan.", why + "."], solution: [`${why}, so ${q} = ${v}`],
      });
    }),
    E(6, 1, "reciprocal-decimal", (rng) => {
      const f = rng.pick(["sec", "cosec", "cot"]), a = rng.int(10, 80);
      const v = round(1 / (f === "sec" ? Math.cos(rad(a)) : f === "cosec" ? Math.sin(rad(a)) : Math.tan(rad(a))), 3);
      return num(`Find ${f} ${a}° to 3 decimal places.`, v, {
        dp: 3, traps: [T(round(f === "sec" ? Math.cos(rad(a)) : f === "cosec" ? Math.sin(rad(a)) : Math.tan(rad(a)), 3), "Take 1 ÷ that value.")],
        hints: [`${f} x = 1/${f === "sec" ? "cos" : f === "cosec" ? "sin" : "tan"} x.`, "Calculator in degrees."], solution: [`${fmt(v, 3)}`],
      });
    }),
  ],
  [S(6, 2)]: [
    C(6, 2, "reciprocal-graph-features", (rng) => bankMC(rng, [
      ["Where does y = sec x have asymptotes for 0° ≤ x ≤ 360°?", "x = 90° and x = 270°", "x = 0°, 180° and 360°", "x = 45° and 225°", "Asymptotes where cos x = 0.", "cos x = 0 at 90° and 270°."],
      ["Where does y = cosec x have asymptotes for 0° ≤ x ≤ 360°?", "x = 0°, 180° and 360°", "x = 90° and 270°", "x = 45° and 225°", "Asymptotes where sin x = 0.", "sin x = 0 at 0°, 180°, 360°."],
      ["What is the range of y = sec x?", "y ≤ −1 or y ≥ 1", "−1 ≤ y ≤ 1", "y > 0", "cos x is between −1 and 1.", "Its reciprocal has size at least 1."],
      ["Where does y = cot x cross the x-axis for 0° < x < 180°?", "x = 90°", "x = 45°", "It doesn't", "cot x = cos x/sin x.", "cos 90° = 0, so cot 90° = 0."],
      ["What is the period of y = cosec x?", "360°", "180°", "90°", "It repeats when sin x repeats.", "Same as sin x."],
    ])),
    E(6, 2, "sec-min-value", (rng) => {
      const a = rng.int(2, 6), b = rng.int(-5, 5);
      return num(`y = ${a} sec x ${sg(b)}. On the branches where sec x is positive, what is the least value of y?`, a + b, {
        hints: ["On the branches where sec x ≥ 1, the least value is sec x = 1.", `${a} × 1 ${sg(b)}.`], solution: [`${a + b}`],
      });
    }),
  ],
  [S(6, 3)]: [
    C(6, 3, "solve-sec", (rng) => {
      const f = rng.pick(["sec", "cosec"]), k = round(rng.pick([1, -1]) * rng.int(11, 40) / 10, 1);
      const p = deg(f === "sec" ? Math.acos(1 / k) : Math.asin(1 / k));
      let s = f === "sec" ? [p, 360 - p] : [p, 180 - p];
      s = s.map((v) => (v + 360) % 360).sort((a, b) => a - b);
      return multi(`Solve ${f} x = ${fmt(k)} for 0° ≤ x < 360°, to 1 decimal place.`, [["smaller x =", round(s[0], 1), 1], ["larger x =", round(s[1], 1), 1]], {
        hints: [`${f === "sec" ? "cos" : "sin"} x = 1/${fmt(k)}.`, "Then find both solutions with CAST."], solution: [`x = ${fmt(round(s[0], 1), 1)}°, ${fmt(round(s[1], 1), 1)}°`],
      });
    }),
    E(6, 3, "simplify-reciprocal", (rng) => bankMC(rng, [
      ["Simplify sin x cot x.", "cos x", "sin²x/cos x", "1", "cot x = cos x/sin x.", "sin x × cos x/sin x = cos x."],
      ["Simplify cos x cosec x.", "cot x", "tan x", "1", "cosec x = 1/sin x.", "cos x/sin x = cot x."],
      ["Simplify sec x/cosec x.", "tan x", "cot x", "1", "Write both in sin and cos.", "(1/cos x) ÷ (1/sin x) = sin x/cos x."],
      ["Simplify tan x cos x cosec x.", "1", "sin x", "sec x", "tan x = sin x/cos x.", "(sin x/cos x)(cos x)(1/sin x) = 1."],
    ])),
  ],
  [S(6, 4)]: [
    C(6, 4, "sec-squared", (rng) => {
      const t = nz(rng, -6, 6), kind = rng.chance(0.5);
      if (kind) return num(`tan x = ${t}. Find sec²x.`, 1 + t * t, { traps: [T(1 - t * t, "sec²x = 1 + tan²x.")], hints: ["1 + tan²x = sec²x.", `1 + ${t * t}.`], solution: [`sec²x = ${1 + t * t}`] });
      return num(`cot x = ${t}. Find cosec²x.`, 1 + t * t, { traps: [T(t * t - 1, "cosec²x = 1 + cot²x.")], hints: ["1 + cot²x = cosec²x.", `1 + ${t * t}.`], solution: [`cosec²x = ${1 + t * t}`] });
    }),
    E(6, 4, "identity-quadratic", (rng) => {
      const p = rng.int(1, 4), q = rng.int(1, 4) * -1;
      // sec²x + b tan x = c → tan²x + b tan x + (1 − c) = 0 with roots p, q
      // roots p and q: tan²x − (p + q)tan x + pq = 0, and sec²x = 1 + tan²x
      const b = -(p + q), cc = 1 - p * q;
      return multi(`sec²x ${sg(b)} tan x = ${cc}. This becomes a quadratic in tan x. Find its two roots (smaller first).`, [["tan x =", Math.min(p, q)], ["tan x =", Math.max(p, q)]], {
        hints: ["Replace sec²x with 1 + tan²x.", `tan²x ${sg(b)} tan x ${sg(1 - cc)} = 0.`], solution: [`(tan x ${sg(-p)})(tan x ${sg(-q)}) = 0`, `tan x = ${p} or ${q}`],
      });
    }),
  ],
  [S(6, 5)]: [
    C(6, 5, "inverse-trig-exact", (rng) => {
      const [q, right, w1, w2] = rng.pick([
        ["arcsin(½)", "π/6", "5π/6", "π/3"], ["arccos(½)", "π/3", "−π/3", "π/6"], ["arctan(1)", "π/4", "5π/4", "π/2"],
        ["arcsin(−½)", "−π/6", "7π/6", "11π/6"], ["arccos(−½)", "2π/3", "−π/3", "4π/3"], ["arccos(0)", "π/2", "0", "3π/2"],
        ["arctan(−1)", "−π/4", "3π/4", "7π/4"], ["arcsin(1)", "π/2", "0", "π"],
      ]);
      return mc3(rng, `Find the exact value of ${q} in radians.`, right, [[w1, "The answer must be in the range of the inverse function."], [w2, "Check the exact value table."]], {
        hints: ["arcsin and arctan give −π/2 to π/2; arccos gives 0 to π.", "Use the exact values."], solution: [`${q} = ${right}`],
      });
    }),
    E(6, 5, "inverse-trig-decimal", (rng) => {
      const f = rng.pick(["arcsin", "arccos", "arctan"]), k = round(rng.int(-9, 9) / 10, 1);
      const v = round(f === "arcsin" ? Math.asin(k) : f === "arccos" ? Math.acos(k) : Math.atan(k), 3);
      return num(`Find ${f}(${fmt(k)}) in radians, to 3 decimal places.`, v, {
        dp: 3, traps: [T(round(deg(v), 3), "Give the answer in RADIANS.")],
        hints: ["Calculator in radian mode.", `${f === "arcsin" ? "sin" : f === "arccos" ? "cos" : "tan"}⁻¹(${fmt(k)}).`], solution: [`${fmt(v, 3)}`],
      });
    }),
  ],
};

export const Y13A_GENERATORS = { ...U1, ...U2, ...U3, ...U4, ...U5, ...U6 };
