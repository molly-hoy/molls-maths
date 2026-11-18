/* ==========================================================================
   Year 12 Pure generators, Part B: Units 7–12 (light format: core + extend)
   Binomial expansion · Trigonometry · Vectors · Differentiation ·
   Integration · Exponentials and logarithms
   --------------------------------------------------------------------------
   Same pattern as y12a.js: random numbers in, answer worked out from them.
   Decimal answers say how many decimal places to give (dp), and the checker
   only accepts that rounding.
   ========================================================================== */
import { fmt, gcd, round } from "../numbers.js";
import { core, extend, expr, frac, mc3, multi, num, polyText, polyExpr, reuse, T } from "./helpers.js";
import { tidyQuestion } from "./tidy.js";
import { Y10C_GENERATORS } from "./y10c.js";
import { Y10B_GENERATORS } from "./y10b.js";
import { Y10A_GENERATORS } from "./y10a.js";
import { Y11A_GENERATORS } from "./y11a.js";

const S = (u, l) => `y12-u${u}-l${l}`;
// Every question goes through tidy() so the maths text reads naturally (see tidy.js)
const C = (u, l, name, make, v = () => true) => core(S(u, l), name, name, (rng) => tidyQuestion(make(rng)), v);
const E = (u, l, name, make, v = () => true) => extend(S(u, l), name, name, (rng) => tidyQuestion(make(rng)), v);
const ALL = { ...Y10A_GENERATORS, ...Y10B_GENERATORS, ...Y10C_GENERATORS, ...Y11A_GENERATORS };
const R = (id, name, u, l, level) => {
  const g = (ALL[id] ?? []).find((x) => x.id === `${id}/${name}`);
  if (!g) throw new Error(`No generator ${id}/${name}`);
  return reuse(g, S(u, l), level, name);
};
const nz = (rng, a, b) => rng.nonZero(a, b);
// "+ 3x", "− x": a signed term in a letter, leaving out a coefficient of 1
const sgv = (n, v) => `${n < 0 ? "−" : "+"} ${Math.abs(n) === 1 ? "" : fmt(Math.abs(n))}${v}`;
const sg = (n) => `${n < 0 ? "−" : "+"} ${fmt(Math.abs(n))}`;
const SUPS = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
const SUBS = { 0: "₀", 1: "₁", 2: "₂", 3: "₃", 4: "₄", 5: "₅", 6: "₆", 7: "₇", 8: "₈", 9: "₉" };
const sup = (n) => String(n).split("").map((c) => SUPS[c] ?? c).join("");
const sub = (n) => String(n).split("").map((c) => SUBS[c] ?? c).join("");
const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
const ncr = (n, r) => Math.round(fact(n) / (fact(r) * fact(n - r)));
const rad = (d) => (d * Math.PI) / 180, deg = (r) => (r * 180) / Math.PI;
// Reduced fraction n/d for frac() answers
const F = (n, d) => { const g = gcd(Math.abs(n), Math.abs(d)) || 1; const s = d < 0 ? -1 : 1; return [(s * n) / g, (s * d) / g]; };
const fText = (n, d) => { const [a, b] = F(n, d); return b === 1 ? fmt(a) : `${a < 0 ? "−" : ""}{${Math.abs(a)}/${b}}`; };
const vec = (x, y) => { const t = []; if (x) t.push(`${x === 1 ? "" : x === -1 ? "−" : fmt(x)}i`); if (y) t.push(t.length ? `${y < 0 ? "−" : "+"} ${Math.abs(y) === 1 ? "" : Math.abs(y)}j` : `${y === 1 ? "" : y === -1 ? "−" : fmt(y)}j`); return t.join(" ") || "0"; };
const bankMC = (rng, bank) => {
  const [prompt, right, w1, w2, hint, why] = rng.pick(bank);
  return mc3(rng, prompt, right, [[w1, hint], [w2, hint]], { hints: [hint, "Check each option carefully."], solution: [why] });
};
// Evaluate a polynomial given as [highest power … constant]
const pval = (c, x) => c.reduce((s, k) => s * x + k, 0);
const pderiv = (c) => c.slice(0, -1).map((k, i) => k * (c.length - 1 - i));

/* ===================== Unit 7: The binomial expansion ===================== */
const U7 = {
  [S(7, 1)]: [
    C(7, 1, "pascal-entry", (rng) => {
      const n = rng.int(4, 8), r = rng.int(1, n - 1);
      return num(`In row ${n} of Pascal's triangle (1 ${n} …), what is number ${r + 1}? (Count the first 1 as number 1.)`, ncr(n, r), {
        hints: ["Each number is the sum of the two above it.", `Write out the rows up to row ${n}.`], solution: [`Row ${n}: ${Array.from({ length: n + 1 }, (_, k) => ncr(n, k)).join(" ")}`, `Number ${r + 1} is ${ncr(n, r)}`],
      });
    }),
    E(7, 1, "pascal-term", (rng) => {
      const n = rng.int(3, 5), b = nz(rng, -3, 3), r = rng.int(1, n - 1);
      const coef = ncr(n, r) * b ** r;
      return num(`Use Pascal's triangle to find the coefficient of x${sup(n - r)} in (x ${sg(b)})${sup(n)}.`, coef, {
        traps: [T(ncr(n, r), `Multiply by (${b})${sup(r)} too.`), T(ncr(n, r) * Math.abs(b) ** r, "Check the sign: a negative number to an odd power is negative.")],
        hints: [`Row ${n}: ${Array.from({ length: n + 1 }, (_, k) => ncr(n, k)).join(" ")}.`, `The x${sup(n - r)} term is ${ncr(n, r)} × x${sup(n - r)} × (${b})${sup(r)}.`], solution: [`${ncr(n, r)} × (${b})${sup(r)} = ${coef}`],
      });
    }),
  ],
  [S(7, 2)]: [
    C(7, 2, "ncr-value", (rng) => {
      const n = rng.int(5, 12), r = rng.int(2, Math.min(5, n - 1));
      return num(`Find ${sup(n)}C${sub(r)}.`, ncr(n, r), {
        traps: [T(fact(n) / fact(n - r), `Divide by ${r}! as well.`)],
        hints: [`${sup(n)}C${sub(r)} = ${n}! ÷ (${r}! × ${n - r}!).`, `Cancel ${n - r}!: (${Array.from({ length: r }, (_, k) => n - k).join(" × ")}) ÷ ${r}!.`], solution: [`${Array.from({ length: r }, (_, k) => n - k).join(" × ")} ÷ ${fact(r)} = ${ncr(n, r)}`],
      });
    }),
    E(7, 2, "factorial-ratio", (rng) => {
      const m = rng.int(4, 12), k = rng.int(1, 3);
      const v = fact(m + k) / fact(m);
      return num(`Simplify ${m + k}! ÷ ${m}!.`, v, {
        traps: [T(fact(k), `${m + k}! ÷ ${m}! isn't ${k}!. Write the top out until you reach ${m}!.`)],
        hints: [`${m + k}! = ${Array.from({ length: k }, (_, i) => m + k - i).join(" × ")} × ${m}!.`, `The ${m}! cancels.`], solution: [`${Array.from({ length: k }, (_, i) => m + k - i).join(" × ")} = ${v}`],
      });
    }),
  ],
  [S(7, 3)]: [
    C(7, 3, "first-terms-1-plus", (rng) => {
      const n = rng.int(4, 9), b = nz(rng, -4, 4);
      return multi(`(1 ${sgv(b, "x")})${sup(n)} = 1 + px + qx² + … Find p and q.`, [["p =", n * b], ["q =", ncr(n, 2) * b * b, undefined, [T(ncr(n, 2) * b, `Square the ${b}x: (${b}x)² = ${b * b}x².`)]]], {
        hints: [`p = ${sup(n)}C${sub(1)} × ${b}.`, `q = ${sup(n)}C${sub(2)} × (${b})² = ${ncr(n, 2)} × ${b * b}.`], solution: [`p = ${n} × ${b} = ${n * b}`, `q = ${ncr(n, 2)} × ${b * b} = ${ncr(n, 2) * b * b}`],
      });
    }),
    E(7, 3, "first-terms-a-plus", (rng) => {
      const n = rng.int(3, 6), a = rng.int(2, 3), b = nz(rng, -3, 3);
      const t = [0, 1, 2].map((r) => ncr(n, r) * a ** (n - r) * b ** r);
      return multi(`Find the first three terms of (${a} ${sgv(b, "x")})${sup(n)} in ascending powers of x: A + Bx + Cx². Find A, B and C.`, [["A =", t[0]], ["B =", t[1]], ["C =", t[2]]], {
        hints: [`The general term is ${sup(n)}Cᵣ × ${a}${sup(n)}⁻ʳ × (${b}x)ʳ.`, `A = ${a}${sup(n)} = ${t[0]}.`], solution: [`A = ${t[0]}`, `B = ${n} × ${a}${sup(n - 1)} × ${b} = ${t[1]}`, `C = ${ncr(n, 2)} × ${a}${sup(n - 2)} × ${b * b} = ${t[2]}`],
      });
    }),
  ],
  [S(7, 4)]: [
    C(7, 4, "coefficient", (rng) => {
      const n = rng.int(5, 9), a = rng.pick([1, 2]), b = nz(rng, -3, 3), r = rng.int(2, 4);
      const c = ncr(n, r) * a ** (n - r) * b ** r;
      return num(`Find the coefficient of x${sup(r)} in (${a} ${sgv(b, "x")})${sup(n)}.`, c, {
        traps: [T(ncr(n, r), `Include ${a}${sup(n - r)} and (${b})${sup(r)}.`), T(ncr(n, r) * a ** (n - r) * b, `Raise ${b} to the power ${r}.`)],
        hints: [`The x${sup(r)} term is ${sup(n)}C${sub(r)} × ${a}${sup(n - r)} × (${b}x)${sup(r)}.`, `${sup(n)}C${sub(r)} = ${ncr(n, r)}.`], solution: [`${ncr(n, r)} × ${a ** (n - r)} × ${b ** r} = ${c}`],
      });
    }),
    E(7, 4, "find-k-from-coefficient", (rng) => {
      const n = rng.int(4, 10), k = nz(rng, -5, 5), useSq = rng.chance(0.5);
      if (useSq) {
        const c = ncr(n, 2) * k * k;
        return num(`The coefficient of x² in (1 + kx)${sup(n)} is ${c}. Find the positive value of k.`, Math.abs(k), {
          hints: [`The x² coefficient is ${sup(n)}C${sub(2)} × k² = ${ncr(n, 2)}k².`, `${ncr(n, 2)}k² = ${c}.`], solution: [`k² = ${k * k}`, `k = ${Math.abs(k)}`],
        });
      }
      return num(`The coefficient of x in (1 + kx)${sup(n)} is ${n * k}. Find k.`, k, {
        hints: [`The x coefficient is ${n}k.`, `${n}k = ${n * k}.`], solution: [`k = ${n * k} ÷ ${n} = ${k}`],
      });
    }),
  ],
  [S(7, 5)]: [
    C(7, 5, "binomial-estimate", (rng) => {
      const n = rng.int(4, 10), x = rng.pick([0.01, 0.02, 0.01, 0.03]), neg = rng.chance(0.4);
      const xx = neg ? -x : x, est = 1 + n * xx + ncr(n, 2) * xx * xx;
      return num(`Use the first three terms of (1 + x)${sup(n)} to estimate ${fmt(1 + xx, 2)}${sup(n)}. Give your answer to 4 decimal places.`, round(est, 4), {
        dp: 4,
        hints: [`(1 + x)${sup(n)} ≈ 1 + ${n}x + ${ncr(n, 2)}x².`, `Use x = ${fmt(xx)}.`], solution: [`1 + ${n}(${fmt(xx)}) + ${ncr(n, 2)}(${fmt(xx)})²`, `≈ ${fmt(round(est, 4), 4)}`],
      });
    }),
    E(7, 5, "binomial-estimate-2x", (rng) => {
      const n = rng.int(5, 9), b = rng.pick([2, 3]), x = 0.01;
      const est = 1 + n * b * x + ncr(n, 2) * b * b * x * x;
      return num(`(1 + ${b}x)${sup(n)} ≈ 1 + ${n * b}x + ${ncr(n, 2) * b * b}x². Use a suitable value of x to estimate ${fmt(1 + b * x, 2)}${sup(n)} to 4 decimal places.`, round(est, 4), {
        dp: 4, traps: [T(round(1 + n * b * (b * x) + ncr(n, 2) * b * b * (b * x) ** 2, 4), `1 + ${b}x = ${fmt(1 + b * x, 2)} means x = 0.01, not ${fmt(b * x)}.`)],
        hints: [`Solve 1 + ${b}x = ${fmt(1 + b * x, 2)}: x = 0.01.`, "Substitute into the three terms."], solution: [`x = 0.01: 1 + ${fmt(n * b * x)} + ${fmt(ncr(n, 2) * b * b * x * x)}`, `≈ ${fmt(round(est, 4), 4)}`],
      });
    }),
  ],
};

/* ========================= Unit 8: Trigonometry ========================= */
const SPECIAL = { 0: [0, 1], 30: [0.5, Math.sqrt(3) / 2], 45: [Math.SQRT1_2, Math.SQRT1_2], 60: [Math.sqrt(3) / 2, 0.5], 90: [1, 0] };
const U8 = {
  [S(8, 1)]: [R("y10-u9-l4", "cosine-rule-side", 8, 1, 1), R("y10-u9-l4", "cosine-rule-angle", 8, 1, 2)],
  [S(8, 2)]: [
    R("y10-u9-l3", "sine-rule-side", 8, 2, 1),
    E(8, 2, "ambiguous-case", (rng) => {
      const B = rng.int(25, 70), A = rng.int(10, B - 5);   // A < B, so the obtuse B (180° − B) still fits
      const s = round(Math.sin(rad(B)), 3);
      const b1 = round(deg(Math.asin(s)), 1), b2 = round(180 - deg(Math.asin(s)), 1);
      return multi(`In triangle ABC, A = ${A}° and sin B = ${fmt(s, 3)}. Find both possible values of B to 1 decimal place.`, [["acute B =", b1, 1], ["obtuse B =", b2, 1]], {
        hints: ["Your calculator gives the acute angle: sin⁻¹(" + fmt(s, 3) + ").", `The other is 180° minus it. Check ${A}° + B < 180° for each.`], solution: [`B = ${fmt(b1, 1)}° or 180° − ${fmt(b1, 1)}° = ${fmt(b2, 1)}°`, `${A}° + ${fmt(b2, 1)}° < 180°, so both are possible`],
      });
    }),
  ],
  [S(8, 3)]: [R("y10-u9-l5", "area-sine", 8, 3, 1), R("y10-u9-l5", "area-find-side", 8, 3, 2)],
  [S(8, 4)]: [
    C(8, 4, "bearing-distance", (rng) => {
      const a = rng.int(3, 15), b = rng.int(3, 15), ang = rng.pick([40, 60, 75, 100, 120, 135, 150]);
      const d = round(Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(ang))), 1);
      return num(`A walker goes ${a} km, then turns and walks ${b} km. The angle between the two legs is ${ang}°. How far is she from the start, to 1 decimal place?`, d, {
        dp: 1, unit: "km",
        hints: ["Two sides and the angle between them: use the cosine rule.", `d² = ${a}² + ${b}² − 2(${a})(${b}) cos ${ang}°.`], solution: [`d² = ${round(a * a + b * b - 2 * a * b * Math.cos(rad(ang)), 2)}`, `d = ${fmt(d, 1)} km`],
      });
    }),
    E(8, 4, "three-sides-area", (rng) => {
      const a = rng.int(4, 12), b = rng.int(4, 12), c = rng.int(4, 12);
      if (a + b <= c || a + c <= b || b + c <= a) return null;
      const C0 = Math.acos((a * a + b * b - c * c) / (2 * a * b));
      const area = round(0.5 * a * b * Math.sin(C0), 1);
      return num(`A triangle has sides ${a} cm, ${b} cm and ${c} cm. Find its area to 1 decimal place.`, area, {
        dp: 1, unit: "cm²",
        hints: ["Use the cosine rule to find one angle first.", `cos C = (${a}² + ${b}² − ${c}²) ÷ (2 × ${a} × ${b}). Then area = ½ab sin C.`], solution: [`C = ${fmt(round(deg(C0), 2), 2)}°`, `Area = ½ × ${a} × ${b} × sin C = ${fmt(area, 1)} cm²`],
      });
    }),
  ],
  [S(8, 5)]: [
    C(8, 5, "trig-period", (rng) => {
      const k = rng.pick([2, 3, 4, 5, 6, 0.5]), f = rng.pick(["sin", "cos", "tan"]);
      const P = (f === "tan" ? 180 : 360) / k;
      return num(`What is the period of y = ${f} ${k === 0.5 ? "½" : k}x (in degrees)?`, P, {
        traps: [T((f === "tan" ? 180 : 360) * k, "The graph repeats faster when k > 1: divide, don't multiply."), ...(f === "tan" ? [T(360 / k, "tan repeats every 180°, not 360°.")] : [])],
        hints: [`${f} x has period ${f === "tan" ? 180 : 360}°.`, `${f} ${k}x repeats ${k} times as often.`], solution: [`${f === "tan" ? 180 : 360}° ÷ ${k} = ${fmt(P)}°`],
      });
    }),
    E(8, 5, "trig-max-min", (rng) => {
      const a = rng.int(2, 6), d = rng.int(-5, 8), f = rng.pick(["sin", "cos"]), max = rng.chance(0.5);
      const v = max ? d + a : d - a;
      return num(`Find the ${max ? "maximum" : "minimum"} value of y = ${d === 0 ? "" : d + " + "}${a} ${f} x.`, v, {
        traps: [T(max ? d - a : d + a, `${max ? "Maximum" : "Minimum"}: ${f} x = ${max ? "1" : "−1"}.`)],
        hints: [`${f} x is between −1 and 1.`, `Put ${f} x = ${max ? 1 : -1}.`], solution: [`${d} ${sg(max ? a : -a)} = ${v}`],
      });
    }),
  ],
  [S(8, 6)]: [
    C(8, 6, "cast-sign", (rng) => {
      const ang = rng.pick([110, 135, 150, 200, 225, 240, 300, 315, 330, 120, 210, 170, 280]), f = rng.pick(["sin", "cos", "tan"]);
      const v = f === "sin" ? Math.sin(rad(ang)) : f === "cos" ? Math.cos(rad(ang)) : Math.tan(rad(ang));
      const q = ang < 90 ? 1 : ang < 180 ? 2 : ang < 270 ? 3 : 4;
      return mc3(rng, `Is ${f} ${ang}° positive or negative?`, v > 0 ? "Positive" : "Negative", [[v > 0 ? "Negative" : "Positive", "Use CAST: which functions are positive in that quadrant?"], ["Zero", `${ang}° isn't on an axis.`]], {
        hints: [`${ang}° is in quadrant ${q}.`, "CAST: quadrant 1 All, 2 Sin, 3 Tan, 4 Cos are positive."], solution: [`Quadrant ${q}: ${f} is ${v > 0 ? "positive" : "negative"}`],
      });
    }),
    E(8, 6, "related-angle", (rng) => {
      const base = rng.pick([20, 25, 35, 40, 50, 55, 65, 70]), q = rng.int(2, 4), f = rng.pick(["sin", "cos"]);
      const ang = q === 2 ? 180 - base : q === 3 ? 180 + base : 360 - base;
      const v = round(f === "sin" ? Math.sin(rad(ang)) : Math.cos(rad(ang)), 3);
      const w = round(f === "sin" ? Math.sin(rad(base)) : Math.cos(rad(base)), 3);
      return num(`${f} ${base}° = ${fmt(w, 3)}. Without a calculator, write down ${f} ${ang}° to 3 decimal places.`, v, {
        dp: 3, traps: [T(-v, "Check the sign with CAST.")],
        hints: [`${ang}° is related to ${base}°.`, `Which sign does ${f} have in quadrant ${q}?`], solution: [`${f} ${ang}° = ${v < 0 ? "−" : ""}${f} ${base}° = ${fmt(v, 3)}`],
      });
    }),
  ],
  [S(8, 7)]: [
    R("y10-u9-l2", "exact-value", 8, 7, 1),
    E(8, 7, "exact-any-angle", (rng) => {
      const base = rng.pick([30, 45, 60]), q = rng.int(2, 4), f = rng.pick(["sin", "cos"]);
      const ang = q === 2 ? 180 - base : q === 3 ? 180 + base : 360 - base;
      const v = f === "sin" ? Math.sin(rad(ang)) : Math.cos(rad(ang));
      const mag = SPECIAL[base][f === "sin" ? 0 : 1];
      const txt = (m) => (Math.abs(m - 0.5) < 1e-9 ? "½" : Math.abs(m - Math.SQRT1_2) < 1e-9 ? "√2/2" : "√3/2");
      const right = `${v < 0 ? "−" : ""}${txt(mag)}`, other = `${v < 0 ? "" : "−"}${txt(mag)}`;
      const alt = txt(base === 45 ? 0.5 : SPECIAL[base][f === "sin" ? 1 : 0]);
      return mc3(rng, `Find the exact value of ${f} ${ang}°.`, right, [[other, "Check the sign with CAST."], [`${v < 0 ? "−" : ""}${alt}`, `Use the related angle ${base}°.`]], {
        hints: [`The related angle is ${base}°.`, `${f} ${base}° = ${txt(mag)}; quadrant ${q} decides the sign.`], solution: [`${f} ${ang}° = ${right}`],
      });
    }),
  ],
  [S(8, 8)]: [
    C(8, 8, "pythag-identity", (rng) => {
      const [a, b, c] = rng.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), f = rng.pick(["sin", "cos"]), obtuse = f === "sin" && rng.chance(0.5);
      const g = f === "sin" ? "cos" : "sin";
      const sign = obtuse ? -1 : 1;
      return frac(`θ is ${obtuse ? "obtuse" : "acute"} and ${f} θ = {${a}/${c}}. Find ${g} θ.`, sign * b, c, {
        answerText: `${sign < 0 ? "−" : ""}{${b}/${c}}`,
        traps: [T((-sign * b) / c, obtuse ? "θ is obtuse, so cos θ is negative." : "θ is acute, so both are positive.")],
        hints: [`${g}²θ = 1 − ${f}²θ = 1 − {${a * a}/${c * c}}.`, `= {${b * b}/${c * c}}; take the square root${obtuse ? " and choose the sign" : ""}.`], solution: [`${g}²θ = {${b * b}/${c * c}}`, `${g} θ = ${sign < 0 ? "−" : ""}{${b}/${c}}`],
      });
    }),
    E(8, 8, "tan-from-sin", (rng) => {
      const [a, b, c] = rng.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]);
      return frac(`θ is acute and sin θ = {${a}/${c}}. Find tan θ.`, a, b, {
        traps: [T(b / a, "tan θ = sin θ ÷ cos θ, not the other way.")],
        hints: [`First find cos θ = {${b}/${c}}.`, "tan θ = sin θ ÷ cos θ."], solution: [`cos θ = √(1 − {${a * a}/${c * c}}) = {${b}/${c}}`, `tan θ = {${a}/${c}} ÷ {${b}/${c}} = {${a}/${b}}`],
      });
    }),
  ],
  [S(8, 9)]: [
    C(8, 9, "solve-sin-cos", (rng) => {
      const f = rng.pick(["sin", "cos"]), k = round(rng.int(-9, 9) / 10, 1);
      if (k === 0 || Math.abs(k) === 1) return null;
      const p = deg(f === "sin" ? Math.asin(k) : Math.acos(k));
      let sols = f === "sin" ? [p, 180 - p] : [p, 360 - p];
      sols = sols.map((s) => ((s % 360) + 360) % 360).sort((x, y) => x - y);
      return multi(`Solve ${f} x = ${fmt(k)} for 0° ≤ x < 360°, to 1 decimal place.`, [["smaller x =", round(sols[0], 1), 1], ["larger x =", round(sols[1], 1), 1]], {
        hints: [`Your calculator gives ${f}⁻¹(${fmt(k)}) = ${fmt(round(p, 1), 1)}°.`, f === "sin" ? "The other solution is 180° minus it (add 360° if it's negative)." : "The other solution is 360° minus it."], solution: [`Principal value ${fmt(round(p, 1), 1)}°`, `Solutions ${fmt(round(sols[0], 1), 1)}° and ${fmt(round(sols[1], 1), 1)}°`],
      });
    }),
    E(8, 9, "solve-tan", (rng) => {
      const k = round(rng.int(-30, 30) / 10, 1);
      if (k === 0) return null;
      let p = deg(Math.atan(k)); if (p < 0) p += 180;
      return multi(`Solve tan x = ${fmt(k)} for 0° ≤ x < 360°, to 1 decimal place.`, [["smaller x =", round(p, 1), 1], ["larger x =", round(p + 180, 1), 1]], {
        hints: ["tan repeats every 180°.", `tan⁻¹(${fmt(k)}) = ${fmt(round(deg(Math.atan(k)), 1), 1)}°; add 180° to get into range.`], solution: [`x = ${fmt(round(p, 1), 1)}° and ${fmt(round(p + 180, 1), 1)}°`],
      });
    }),
  ],
  [S(8, 10)]: [
    C(8, 10, "multiple-angle-count", (rng) => {
      const k = rng.int(2, 4), f = rng.pick(["sin", "cos"]), v = round(rng.int(1, 9) / 10, 1) * rng.pick([1, -1]);
      return num(`How many solutions does ${f} ${k}x = ${fmt(v)} have for 0° ≤ x < 360°?`, 2 * k, {
        traps: [T(2, `${k}x runs from 0° to ${360 * k}°, so there are more solutions.`)],
        hints: [`Let u = ${k}x. Then 0° ≤ u < ${360 * k}°.`, `${f} u = ${fmt(v)} has two solutions every 360°.`], solution: [`2 × ${k} = ${2 * k} solutions`],
      });
    }),
    E(8, 10, "quadratic-trig", (rng) => {
      const [eq, sols, note] = rng.pick([
        ["2sin²x − sin x = 0", [0, 30, 150, 180], "sin x(2sin x − 1) = 0, so sin x = 0 or ½"],
        ["2cos²x − cos x − 1 = 0", [0, 120, 240], "(2cos x + 1)(cos x − 1) = 0, so cos x = −½ or 1"],
        ["tan²x = 3", [60, 120, 240, 300], "tan x = ±√3"],
        ["2sin²x + 3sin x + 1 = 0", [210, 270, 330], "(2sin x + 1)(sin x + 1) = 0, so sin x = −½ or −1"],
        ["4cos²x = 1", [60, 120, 240, 300], "cos x = ±½"],
        ["2cos²x + sin x − 1 = 0", [90, 210, 330], "Use cos²x = 1 − sin²x: 2sin²x − sin x − 1 = 0, (2sin x + 1)(sin x − 1) = 0"],
      ]);
      return num(`How many solutions does ${eq} have for 0° ≤ x < 360°? (Then find them.)`, sols.length, {
        hints: ["Factorise, or use an identity to get one trig function.", note], solution: [note, `x = ${sols.map((s) => s + "°").join(", ")}: ${sols.length} solutions`],
      });
    }),
  ],
};

/* ========================= Unit 9: Vectors ========================= */
const U9 = {
  [S(9, 1)]: [R("y11-u1-l2", "add-subtract-vectors", 9, 1, 1), R("y11-u1-l4", "find-k-parallel", 9, 1, 2)],
  [S(9, 2)]: [
    C(9, 2, "resultant", (rng) => {
      const a = [nz(rng, -6, 6), nz(rng, -6, 6)], b = [nz(rng, -6, 6), nz(rng, -6, 6)], p = rng.int(1, 3), q = rng.pick([1, -1, 2]);
      const r = [p * a[0] + q * b[0], p * a[1] + q * b[1]];
      return multi(`a = ${vec(...a)} and b = ${vec(...b)}. Find ${p === 1 ? "" : p}a ${q < 0 ? "−" : "+"} ${Math.abs(q) === 1 ? "" : Math.abs(q)}b in the form xi + yj.`, [["x =", r[0]], ["y =", r[1]]], {
        hints: ["Work with the i parts and j parts separately.", `i: ${p} × ${a[0]} ${sg(q * b[0])}.`], solution: [`i: ${r[0]}, j: ${r[1]}`, `= ${vec(...r)}`],
      });
    }),
    E(9, 2, "find-scalars", (rng) => {
      const a = [rng.int(1, 4), nz(rng, -3, 3)], b = [nz(rng, -3, 3), rng.int(1, 4)], l = nz(rng, -4, 4), m = nz(rng, -4, 4);
      if (a[0] * b[1] - a[1] * b[0] === 0) return null;
      const r = [l * a[0] + m * b[0], l * a[1] + m * b[1]];
      return multi(`a = ${vec(...a)}, b = ${vec(...b)}. Find λ and μ so that λa + μb = ${vec(...r)}.`, [["λ =", l], ["μ =", m]], {
        hints: ["Compare i parts and j parts: two equations.", `${a[0]}λ ${sg(b[0])}μ = ${r[0]} and ${a[1]}λ ${sg(b[1])}μ = ${r[1]}.`], solution: [`Solving simultaneously: λ = ${l}, μ = ${m}`],
      });
    }),
  ],
  [S(9, 3)]: [
    R("y11-u1-l1", "magnitude", 9, 3, 1),
    E(9, 3, "direction-angle", (rng) => {
      const x = nz(rng, -8, 8), y = nz(rng, -8, 8);
      let a = deg(Math.atan2(y, x)); if (a < 0) a += 360;
      return num(`Find the angle the vector ${vec(x, y)} makes with the positive x-axis (i direction), measured anticlockwise, from 0° to 360°, to 1 decimal place.`, round(a, 1), {
        dp: 1, traps: [T(round(deg(Math.atan(y / x)), 1), "Sketch the vector: your calculator's tan⁻¹ may give the wrong quadrant.")],
        hints: [`Sketch it: ${x > 0 ? "right" : "left"} ${Math.abs(x)}, ${y > 0 ? "up" : "down"} ${Math.abs(y)}.`, `tan⁻¹(${Math.abs(y)}/${Math.abs(x)}) = ${fmt(round(deg(Math.atan(Math.abs(y / x))), 1), 1)}°, then adjust for the quadrant.`], solution: [`Angle = ${fmt(round(a, 1), 1)}°`],
      });
    }),
  ],
  [S(9, 4)]: [
    R("y11-u1-l3", "vector-ab", 9, 4, 1),
    E(9, 4, "distance-position-vectors", (rng) => {
      const [p, q, d] = rng.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]);
      const A = [rng.int(-5, 5), rng.int(-5, 5)], s = rng.pick([[1, 1], [1, -1], [-1, 1], [-1, -1]]), sw = rng.chance(0.5);
      const B = [A[0] + s[0] * (sw ? q : p), A[1] + s[1] * (sw ? p : q)];
      return num(`A and B have position vectors ${vec(...A)} and ${vec(...B)}. Find the distance AB.`, d, {
        traps: [T(d * d, "Take the square root.")],
        hints: ["AB = b − a.", `AB = ${vec(B[0] - A[0], B[1] - A[1])}; find its magnitude.`], solution: [`|AB| = √(${(B[0] - A[0]) ** 2} + ${(B[1] - A[1]) ** 2}) = ${d}`],
      });
    }),
  ],
  [S(9, 5)]: [
    C(9, 5, "ratio-point", (rng) => {
      const m = rng.int(1, 4), n = rng.int(1, 4), A = [rng.int(-6, 6), rng.int(-6, 6)], k = m + n;
      const B = [A[0] + k * nz(rng, -3, 3), A[1] + k * nz(rng, -3, 3)];
      const P = [A[0] + (m * (B[0] - A[0])) / k, A[1] + (m * (B[1] - A[1])) / k];
      return multi(`A = ${vec(...A)}, B = ${vec(...B)}. P divides AB in the ratio ${m} : ${n}. Find the position vector of P as xi + yj.`, [["x =", P[0]], ["y =", P[1]]], {
        hints: [`P is ${m}/${k} of the way from A to B.`, `p = a + ${m}/${k}(b − a).`], solution: [`AB = ${vec(B[0] - A[0], B[1] - A[1])}`, `p = ${vec(...P)}`],
      });
    }),
    E(9, 5, "collinear-check", (rng) => {
      const A = [rng.int(-4, 4), rng.int(-4, 4)], d = [nz(rng, -3, 3), nz(rng, -3, 3)], k = rng.int(2, 3), yes = rng.chance(0.5);
      const B = [A[0] + d[0], A[1] + d[1]];
      const Cc = [B[0] + k * d[0], B[1] + k * d[1] + (yes ? 0 : nz(rng, -2, 2))];
      const BC = [Cc[0] - B[0], Cc[1] - B[1]];
      return mc3(rng, `A = ${vec(...A)}, B = ${vec(...B)}, C = ${vec(...Cc)}. Are A, B and C collinear?`, yes ? `Yes: BC = ${k}AB` : "No: BC isn't a multiple of AB", [[yes ? "No: BC isn't a multiple of AB" : `Yes: BC = ${k}AB`, "Find AB and BC and compare."], ["Only if C is the midpoint", "Collinear just means on one straight line."]], {
        hints: ["Find AB and BC.", `AB = ${vec(...d)}, BC = ${vec(...BC)}.`], solution: [`AB = ${vec(...d)}, BC = ${vec(...BC)}`, yes ? `BC = ${k}AB and they share B, so they are collinear` : "BC isn't a multiple of AB, so not collinear"],
      });
    }),
  ],
  [S(9, 6)]: [
    C(9, 6, "speed-from-velocity", (rng) => {
      const [p, q, d] = rng.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]]);
      return num(`A particle has velocity (${vec(rng.pick([1, -1]) * p, rng.pick([1, -1]) * q)}) m s⁻¹. Find its speed.`, d, {
        traps: [T(p + q, "Speed is the magnitude: use Pythagoras.")],
        hints: ["Speed = |v|.", `√(${p}² + ${q}²).`], solution: [`√${d * d} = ${d} m s⁻¹`],
      });
    }),
    E(9, 6, "position-after-time", (rng) => {
      const r0 = [rng.int(-5, 5), rng.int(-5, 5)], v = [nz(rng, -4, 4), nz(rng, -4, 4)], t = rng.int(2, 6);
      return multi(`A boat starts at ${vec(...r0)} km and moves with constant velocity (${vec(...v)}) km h⁻¹. Find its position vector after ${t} hours, as xi + yj.`, [["x =", r0[0] + v[0] * t], ["y =", r0[1] + v[1] * t]], {
        hints: ["r = r₀ + vt.", `r = ${vec(...r0)} + ${t}(${vec(...v)}).`], solution: [`r = ${vec(r0[0] + v[0] * t, r0[1] + v[1] * t)}`],
      });
    }),
  ],
};

/* ========================= Unit 10: Differentiation ========================= */
const powTerm = (c, n) => (n === 0 ? fmt(c) : `${c === 1 ? "" : c === -1 ? "−" : fmt(c)}x${n === 1 ? "" : sup(n)}`);
const U10 = {
  [S(10, 1)]: [
    C(10, 1, "chord-gradient", (rng) => {
      const a = rng.int(1, 5), h = rng.pick([0.1, 0.01, 0.5, 0.2]), k = rng.pick([1, 2, 3]);
      const g = round((k * (a + h) ** 2 - k * a * a) / h, 4);
      return num(`Find the gradient of the chord on y = ${k === 1 ? "" : k}x² from x = ${a} to x = ${fmt(a + h)}.`, g, {
        hints: ["Gradient = change in y ÷ change in x.", `y-values: ${fmt(k * a * a)} and ${fmt(round(k * (a + h) ** 2, 6))}.`], solution: [`(${fmt(round(k * (a + h) ** 2, 6))} − ${k * a * a}) ÷ ${fmt(h)} = ${fmt(g)}`],
      });
    }),
    E(10, 1, "limit-gradient", (rng) => {
      const a = rng.int(1, 6), k = rng.int(1, 3);
      return num(`Chords on y = ${k === 1 ? "" : k}x² from x = ${a} to x = ${a} + h have gradient ${2 * k * a} + ${k === 1 ? "" : k}h. What is the gradient of the curve at x = ${a}?`, 2 * k * a, {
        hints: ["As the chord shrinks, h → 0.", `${2 * k * a} + ${k}h → ${2 * k * a}.`], solution: [`Gradient = ${2 * k * a}`],
      });
    }),
  ],
  [S(10, 2)]: [
    C(10, 2, "first-principles-steps", (rng) => bankMC(rng, [
      ["For f(x) = x², what does (f(x + h) − f(x))/h simplify to?", "2x + h", "2x", "h²", "Expand (x + h)² = x² + 2xh + h², subtract x², divide by h.", "(2xh + h²)/h = 2x + h."],
      ["For f(x) = x³, what does (f(x + h) − f(x))/h simplify to?", "3x² + 3xh + h²", "3x²", "3x + h", "(x + h)³ = x³ + 3x²h + 3xh² + h³.", "Subtract x³ and divide by h."],
      ["In first principles, why can't you put h = 0 straight away?", "It gives 0 ÷ 0", "The answer would be negative", "x would be zero", "Look at the denominator.", "You must cancel h first, then let h → 0."],
      ["For f(x) = 5x, what does (f(x + h) − f(x))/h simplify to?", "5", "5 + h", "5x", "5(x + h) − 5x = 5h.", "5h ÷ h = 5."],
    ])),
    E(10, 2, "first-principles-kx2", (rng) => {
      const a = rng.int(2, 6), b = nz(rng, -6, 6);
      return expr(`Differentiate f(x) = ${a}x² ${sgv(b, "x")} from first principles. What is f′(x)?`, `${2 * a}*x+(${b})`, {
        answerText: `${2 * a}x ${sg(b)}`, flags: { simplified: true },
        hints: [`f(x + h) − f(x) = ${2 * a}xh + ${a}h² ${sg(b)}h.`, `Divide by h: ${2 * a}x + ${a}h ${sg(b)}. Let h → 0.`], solution: [`(f(x + h) − f(x))/h = ${2 * a}x + ${a}h ${sg(b)}`, `→ ${2 * a}x ${sg(b)}`],
      });
    }),
  ],
  [S(10, 3)]: [
    C(10, 3, "differentiate-axn", (rng) => {
      const a = nz(rng, -9, 9), n = nz(rng, -4, 7);
      return expr(`Differentiate y = ${powTerm(a, n)}.`, `(${a * n})*x^(${n - 1})`, {
        answerText: powTerm(a * n, n - 1),
        traps: [{ expr: `(${a * (n - 1)})*x^(${n - 1})`, feedback: "Multiply by the ORIGINAL power, then take 1 off." }],
        hints: ["Multiply by the power, then reduce the power by 1.", `${n} × ${a} = ${a * n}; power ${n} − 1 = ${n - 1}.`], solution: [`dy/dx = ${powTerm(a * n, n - 1)}`],
      });
    }),
    E(10, 3, "differentiate-fraction-power", (rng) => {
      const a = rng.int(2, 12), n = rng.int(1, 4);
      // y = a / x^n = a x^-n
      return expr(`Differentiate y = ${a}/x${n === 1 ? "" : sup(n)}.`, `(${-a * n})*x^(${-n - 1})`, {
        answerText: powTerm(-a * n, -n - 1),
        traps: [{ expr: `(${-a * n})*x^(${-n + 1})`, feedback: `Taking 1 off −${n} gives −${n + 1}.` }],
        hints: [`Rewrite as ${a}x${sup(-n)}.`, `Multiply by −${n} and reduce the power to −${n + 1}.`], solution: [`y = ${a}x${sup(-n)}`, `dy/dx = ${powTerm(-a * n, -n - 1)}`],
      });
    }),
  ],
  [S(10, 4)]: [
    C(10, 4, "differentiate-polynomial", (rng) => {
      const c = [nz(rng, -4, 4), rng.int(-6, 6), rng.int(-9, 9), rng.int(-9, 9)];
      return expr(`Differentiate y = ${polyText(c)}.`, polyExpr(pderiv(c)), {
        answerText: polyText(pderiv(c)), flags: { simplified: true },
        hints: ["Differentiate each term separately.", "The constant disappears."], solution: [`dy/dx = ${polyText(pderiv(c))}`],
      });
    }),
    E(10, 4, "gradient-at-point-brackets", (rng) => {
      const p = nz(rng, -5, 5), q = nz(rng, -5, 5), x = rng.int(-4, 4);
      // y = (x + p)(x + q) → 2x + p + q
      return num(`Find the gradient of y = (x ${sg(p)})(x ${sg(q)}) at x = ${x}.`, 2 * x + p + q, {
        traps: [T(1, "Expand the brackets first: don't differentiate each bracket separately.")],
        hints: [`Expand: x² ${sgv(p + q, "x")} ${sg(p * q)}.`, `dy/dx = 2x ${sg(p + q)}; put x = ${x}.`], solution: [`dy/dx = 2x ${sg(p + q)}`, `At x = ${x}: ${2 * x + p + q}`],
      });
    }),
  ],
  [S(10, 5)]: [
    C(10, 5, "tangent-equation", (rng) => {
      const c = [nz(rng, -3, 3), rng.int(-5, 5), rng.int(-6, 6)], x0 = rng.int(-3, 3);
      const y0 = pval(c, x0), m = pval(pderiv(c), x0), k = y0 - m * x0;
      return multi(`Find the tangent to y = ${polyText(c)} at x = ${x0}, in the form y = mx + c.`, [["m =", m], ["c =", k]], {
        hints: [`At x = ${x0}: y = ${y0}. dy/dx = ${polyText(pderiv(c))}.`, `m = ${m}. Use y − ${y0} = ${m}(x − ${x0}).`], solution: [`Point (${x0}, ${y0}), gradient ${m}`, `y = ${polyText([m, k]) || "0"}`],
      });
    }),
    E(10, 5, "normal-gradient", (rng) => {
      const c = [nz(rng, -3, 3), rng.int(-6, 6), rng.int(-6, 6)], x0 = rng.int(-3, 3);
      const m = pval(pderiv(c), x0);
      if (m === 0) return null;
      const [n, d] = F(-1, m);
      return frac(`Find the gradient of the normal to y = ${polyText(c)} at x = ${x0}.`, n, d, {
        answerText: fText(-1, m), traps: [T(m, "That's the tangent gradient. The normal is perpendicular.")],
        hints: [`dy/dx = ${polyText(pderiv(c))} = ${m} at x = ${x0}.`, "Normal gradient = −1 ÷ tangent gradient."], solution: [`Tangent gradient ${m}`, `Normal gradient ${fText(-1, m)}`],
      });
    }),
  ],
  [S(10, 6)]: [
    C(10, 6, "increasing-linear", (rng) => {
      const a = rng.pick([1, 2, 3, -1, -2]), b = nz(rng, -12, 12), inc = rng.chance(0.5);
      // f(x) = ax² + bx: f′ = 2ax + b > 0
      const crit = -b / (2 * a);
      const gt = (inc && a > 0) || (!inc && a < 0);
      const right = `x ${gt ? ">" : "<"} ${fmt(crit)}`;
      return mc3(rng, `For which values of x is f(x) = ${polyText([a, b, 0])} ${inc ? "increasing" : "decreasing"}?`, right, [[`x ${gt ? "<" : ">"} ${fmt(crit)}`, `Solve f′(x) ${inc ? ">" : "<"} 0 carefully.`], [`x ${gt ? ">" : "<"} ${fmt(-crit)}`, "Check the sign when you rearrange."]], {
        hints: [`f′(x) = ${polyText([2 * a, b])}.`, `Solve ${polyText([2 * a, b])} ${inc ? ">" : "<"} 0.`], solution: [`${polyText([2 * a, b])} ${inc ? ">" : "<"} 0`, right],
      });
    }),
    E(10, 6, "decreasing-cubic", (rng) => {
      const p = rng.int(-4, 2), q = p + rng.int(1, 6);
      // f′(x) = 3(x − p)(x − q) → f = x³ − 1.5(p+q)x² + 3pq x ; use integer by scaling: f′ = 3x² − 3(p+q)x + 3pq
      const right = `${fmt(p)} < x < ${fmt(q)}`;
      return mc3(rng, `f′(x) = 3x² ${sgv(-3 * (p + q), "x")} ${sg(3 * p * q)}. On which interval is f decreasing?`, right, [[`x < ${fmt(p)} or x > ${fmt(q)}`, "That's where f′(x) > 0: increasing."], [`${fmt(-q)} < x < ${fmt(-p)}`, "Check the signs of the roots."]], {
        hints: [`f′(x) = 3(x ${sg(-p)})(x ${sg(-q)}).`, "Decreasing where f′(x) < 0: between the roots."], solution: [`Roots ${fmt(p)} and ${fmt(q)}`, `f is decreasing for ${right}`],
      });
    }),
  ],
  [S(10, 7)]: [
    C(10, 7, "second-derivative", (rng) => {
      const c = [nz(rng, -4, 4), rng.int(-6, 6), rng.int(-9, 9), rng.int(-9, 9), rng.int(-9, 9)];
      return expr(`Find d²y/dx² for y = ${polyText(c)}.`, polyExpr(pderiv(pderiv(c))), {
        answerText: polyText(pderiv(pderiv(c))), flags: { simplified: true },
        traps: [{ expr: polyExpr(pderiv(c)), feedback: "That's dy/dx. Differentiate again." }],
        hints: [`dy/dx = ${polyText(pderiv(c))}.`, "Differentiate that again."], solution: [`dy/dx = ${polyText(pderiv(c))}`, `d²y/dx² = ${polyText(pderiv(pderiv(c)))}`],
      });
    }),
    E(10, 7, "second-derivative-value", (rng) => {
      const a = nz(rng, -5, 5), n = rng.int(3, 5), b = nz(rng, -6, 6), x = rng.int(-2, 3);
      const v = a * n * (n - 1) * x ** (n - 2) + 0 * b;
      return num(`f(x) = ${powTerm(a, n)} ${sgv(b, "x")}. Find f″(${x}).`, v, {
        hints: [`f′(x) = ${powTerm(a * n, n - 1)} ${sg(b)}.`, `f″(x) = ${powTerm(a * n * (n - 1), n - 2)}.`], solution: [`f″(${x}) = ${a * n * (n - 1)} × ${x}${sup(n - 2)} = ${v}`],
      });
    }),
  ],
  [S(10, 8)]: [
    C(10, 8, "stationary-quadratic", (rng) => {
      const a = nz(rng, -3, 3), h = rng.int(-5, 5), k = rng.int(-10, 10);
      const c = [a, -2 * a * h, a * h * h + k];
      return multi(`Find the stationary point of y = ${polyText(c)}.`, [["x =", h], ["y =", k]], {
        hints: [`dy/dx = ${polyText(pderiv(c))} = 0.`, `x = ${h}; substitute into y.`], solution: [`x = ${h}`, `y = ${k}`],
      });
    }),
    E(10, 8, "classify-cubic", (rng) => {
      const p = rng.int(-3, 1), q = p + rng.int(1, 4), a = rng.pick([1, -1]);
      // f′ = 3a(x − p)(x − q) → f = a(x³ − 1.5(p+q)x² + 3pq x) — choose p+q even to keep integers
      if ((p + q) % 2 !== 0) return null;
      const c = [a, -1.5 * a * (p + q), 3 * a * p * q, 0];
      const isMaxAtP = a > 0; // ∪-shaped derivative: max at smaller root
      const xMax = isMaxAtP ? p : q;
      return multi(`y = ${polyText(c)}. Find the x-coordinate of the maximum point and the y-value there.`, [["x =", xMax], ["y =", pval(c, xMax)]], {
        hints: [`dy/dx = ${polyText(pderiv(c))} = ${3 * a}(x ${sg(-p)})(x ${sg(-q)}).`, `d²y/dx² = ${polyText(pderiv(pderiv(c)))}: negative at a maximum.`], solution: [`Stationary at x = ${p} and ${q}`, `d²y/dx² < 0 at x = ${xMax}: maximum (${xMax}, ${pval(c, xMax)})`],
      });
    }),
  ],
  [S(10, 9)]: [
    C(10, 9, "gradient-function-roots", (rng) => {
      const p = rng.int(-5, 0), q = p + rng.int(1, 6);
      return multi(`y = f(x) has stationary points at x = ${p} and x = ${q}. Where does y = f′(x) cross the x-axis? (smaller first)`, [["x =", p], ["x =", q]], {
        hints: ["At a stationary point the gradient is zero.", "So f′(x) = 0 there."], solution: [`f′(x) = 0 at x = ${p} and x = ${q}`],
      });
    }),
    E(10, 9, "gradient-function-shape", (rng) => bankMC(rng, [
      ["y = f(x) is a positive cubic with a maximum then a minimum. What shape is y = f′(x)?", "A ∪-shaped parabola", "A ∩-shaped parabola", "A straight line", "f increases, then decreases, then increases.", "f′ is positive, negative, positive: a ∪ shape."],
      ["y = f(x) is a ∪-shaped quadratic. What is y = f′(x)?", "A straight line with positive gradient", "A ∪-shaped parabola", "A horizontal line", "Differentiating x² gives 2x.", "f′ is linear, negative then positive."],
      ["Where f(x) is decreasing, the graph of y = f′(x) is…", "below the x-axis", "above the x-axis", "on the x-axis", "Decreasing means negative gradient.", "f′(x) < 0, so below the axis."],
      ["y = f(x) is a straight line with gradient 3. What is y = f′(x)?", "The horizontal line y = 3", "The line y = 3x", "The x-axis", "The gradient never changes.", "f′(x) = 3 everywhere."],
    ])),
  ],
  [S(10, 10)]: [
    C(10, 10, "maximise-product", (rng) => {
      const s = rng.int(4, 30) * 2;
      return num(`Two positive numbers add to ${s}. Find the greatest possible value of their product.`, (s / 2) ** 2, {
        hints: [`P = x(${s} − x) = ${s}x − x².`, `dP/dx = ${s} − 2x = 0.`], solution: [`x = ${s / 2}`, `P = ${(s / 2) ** 2}`],
      });
    }),
    E(10, 10, "open-box", (rng) => {
      const L = rng.int(1, 8) * 6;
      // V = x(L − 2x)², maximum at x = L/6
      const x = L / 6, V = x * (L - 2 * x) ** 2;
      return multi(`An open box is made from a ${L} cm square of card by cutting x cm squares from each corner. V = x(${L} − 2x)². Find the x that gives the greatest volume, and that volume.`, [["x =", x], ["V =", V]], {
        hints: [`Expand: V = 4x³ − ${4 * L}x² + ${L * L}x.`, `dV/dx = 12x² − ${8 * L}x + ${L * L} = 0. Reject x = ${L / 2} (no box).`], solution: [`x = ${x} or ${L / 2}; x = ${L / 2} gives V = 0`, `x = ${x}, V = ${V} cm³`],
      });
    }),
  ],
};

/* ========================= Unit 11: Integration ========================= */
const U11 = {
  [S(11, 1)]: [
    C(11, 1, "integrate-axn", (rng) => {
      const n = rng.int(0, 6), k = rng.int(1, 6), a = k * (n + 1);
      return multi(`∫${powTerm(a, n)} dx = Axᵖ + c. Find A and p.`, [["A =", k, undefined, [T(a * (n + 1), "That's differentiating. Add 1 to the power, then DIVIDE by the new power.")]], ["p =", n + 1]], {
        hints: ["Add 1 to the power.", `Divide by the new power ${n + 1}.`], solution: [`${a}x${sup(n + 1)} ÷ ${n + 1} = ${powTerm(k, n + 1)}`, `∫ = ${powTerm(k, n + 1)} + c`],
      });
    }),
    E(11, 1, "integrate-negative-power", (rng) => {
      const n = rng.int(2, 5), k = rng.int(1, 5), a = k * (n - 1);
      // ∫ a x^-n = a x^(1−n)/(1−n) = −k x^(1−n)
      return multi(`∫${a}x${sup(-n)} dx = Axᵖ + c. Find A and p.`, [["A =", -k, undefined, [T(k, "Dividing by a negative power gives a negative coefficient.")]], ["p =", 1 - n, undefined, [T(-n - 1, `Add 1 to −${n}: −${n} + 1 = ${1 - n}.`)]]], {
        hints: [`Add 1: −${n} + 1 = ${1 - n}.`, `Divide ${a} by ${1 - n}.`], solution: [`${a}x${sup(1 - n)} ÷ (${1 - n}) = ${powTerm(-k, 1 - n)}`],
      });
    }),
  ],
  [S(11, 2)]: [
    C(11, 2, "integrate-polynomial", (rng) => {
      const A = nz(rng, -4, 4), B = rng.int(-5, 5), Cc = rng.int(-9, 9);
      return multi(`∫(${polyText([3 * A, 2 * B, Cc])}) dx = Ax³ + Bx² + Cx + c. Find A, B and C.`, [["A =", A], ["B =", B], ["C =", Cc]], {
        hints: ["Integrate each term: add 1 to the power and divide by the new power.", `${3 * A}x² → ${A}x³.`], solution: [`= ${polyText([A, B, Cc, 0])} + c`],
      });
    }),
    E(11, 2, "integrate-brackets", (rng) => {
      const p = nz(rng, -4, 4) * 1, q = nz(rng, -4, 4);
      // ∫(x + p)(x + q) = x³/3 + (p+q)x²/2 + pq x
      const [a1, b1] = F(1, 3), [a2, b2] = F(p + q, 2);
      return multi(`∫(x ${sg(p)})(x ${sg(q)}) dx = Ax³ + Bx² + Cx + c. Find A, B and C (give fractions like 1/3).`, [["A =", 1 / 3, undefined], ["B =", (p + q) / 2], ["C =", p * q]], {
        answerText: `A = {1/3}, B = ${fText(p + q, 2)}, C = ${p * q}`,
        hints: [`Expand first: x² ${sgv(p + q, "x")} ${sg(p * q)}.`, "Then integrate each term."], solution: [`x² ${sgv(p + q, "x")} ${sg(p * q)}`, `∫ = {${a1}/${b1}}x³ + ${fText(p + q, 2)}x² ${sgv(p * q, "x")} + c`],
      });
    }),
  ],
  [S(11, 3)]: [
    C(11, 3, "find-c", (rng) => {
      const A = nz(rng, -3, 3), B = rng.int(-5, 5), x0 = rng.int(-2, 3), cc = rng.int(-9, 9);
      const y0 = A * x0 ** 2 + B * x0 + cc;
      return num(`dy/dx = ${polyText([2 * A, B])}, and the curve passes through (${x0}, ${y0}). Find the constant c in y = ${polyText([A, B, 0])} + c.`, cc, {
        hints: [`y = ${polyText([A, B, 0])} + c.`, `Substitute x = ${x0}, y = ${y0}.`], solution: [`${y0} = ${A * x0 * x0 + B * x0} + c`, `c = ${cc}`],
      });
    }),
    E(11, 3, "find-f-value", (rng) => {
      const A = nz(rng, -2, 2), B = rng.int(-4, 4), Cc = rng.int(-6, 6), x0 = rng.int(1, 3), cc = rng.int(-9, 9), x1 = rng.int(-2, 3);
      const f = (x) => A * x ** 3 + B * x ** 2 + Cc * x + cc;
      return num(`f′(x) = ${polyText([3 * A, 2 * B, Cc])} and f(${x0}) = ${f(x0)}. Find f(${x1}).`, f(x1), {
        hints: [`f(x) = ${polyText([A, B, Cc, 0])} + c.`, `f(${x0}) = ${f(x0)} gives c = ${cc}.`], solution: [`c = ${cc}`, `f(${x1}) = ${f(x1)}`],
      });
    }),
  ],
  [S(11, 4)]: [
    C(11, 4, "definite-integral", (rng) => {
      const A = nz(rng, -3, 3), B = rng.int(-4, 4), a = rng.int(-2, 2), b = a + rng.int(1, 3);
      const Fn = (x) => A * x ** 3 + B * x ** 2;
      return num(`Evaluate ∫ from ${a} to ${b} of (${polyText([3 * A, 2 * B, 0])}) dx.`, Fn(b) - Fn(a), {
        traps: [T(Fn(a) - Fn(b), "Top limit minus bottom limit.")],
        hints: [`Integrate: [${polyText([A, B, 0, 0])}].`, `F(${b}) − F(${a}).`], solution: [`F(${b}) = ${Fn(b)}, F(${a}) = ${Fn(a)}`, `= ${Fn(b) - Fn(a)}`],
      });
    }),
    E(11, 4, "definite-find-k", (rng) => {
      const k = rng.int(1, 6), a = rng.int(1, 4);
      // ∫0^k 2a x dx = a k²
      return num(`∫ from 0 to k of ${2 * a}x dx = ${a * k * k}, where k > 0. Find k.`, k, {
        hints: [`∫ = [${a === 1 ? "" : a}x²] from 0 to k = ${a === 1 ? "" : a}k².`, `${a}k² = ${a * k * k}.`], solution: [`k² = ${k * k}`, `k = ${k}`],
      });
    }),
  ],
  [S(11, 5)]: [
    C(11, 5, "area-under-quadratic", (rng) => {
      const r = rng.int(2, 6), k = rng.int(1, 3);
      // y = k x (r − x) between 0 and r: area = k r³/6
      const [n, d] = F(k * r ** 3, 6);
      return frac(`Find the area enclosed by y = ${k === 1 ? "" : k}x(${r} − x) and the x-axis.`, n, d, {
        answerText: fText(k * r ** 3, 6),
        hints: [`It crosses the axis at x = 0 and x = ${r}.`, `∫ from 0 to ${r} of (${polyText([-k, k * r, 0])}) dx.`], solution: [`[${fText(k * r, 2)}x² − ${fText(k, 3)}x³] from 0 to ${r}`, `= ${fText(k * r ** 3, 6)}`],
      });
    }),
    E(11, 5, "area-power-curve", (rng) => {
      const a = rng.int(0, 2), b = a + rng.int(1, 3), k = rng.pick([1, 3]), n = 2;
      // ∫ k x² from a to b = k(b³ − a³)/3
      const [p, q] = F(k * (b ** 3 - a ** 3), 3);
      return frac(`Find the area under y = ${k === 1 ? "" : k}x² between x = ${a} and x = ${b}.`, p, q, {
        answerText: fText(k * (b ** 3 - a ** 3), 3),
        hints: [`∫ ${k === 1 ? "" : k}x² dx = ${fText(k, 3)}x³.`, `${fText(k, 3)}(${b}³ − ${a}³).`], solution: [`= ${fText(k * (b ** 3 - a ** 3), 3)}`], data: { n },
      });
    }),
  ],
  [S(11, 6)]: [
    C(11, 6, "negative-integral", (rng) => {
      const r = rng.int(1, 9);
      // y = x² − r x between 0 and r: integral −r³/6
      const [n, d] = F(-(r ** 3), 6);
      return frac(`Evaluate ∫ from 0 to ${r} of (x² − ${r === 1 ? "" : r}x) dx.`, n, d, {
        answerText: fText(-(r ** 3), 6), traps: [T(r ** 3 / 6, "The curve is below the axis here, so the integral is negative.")],
        hints: [`[⅓x³ − ${fText(r, 2)}x²] from 0 to ${r}.`, `${fText(r ** 3, 3)} − ${fText(r ** 3, 2)}.`], solution: [`= ${fText(-(r ** 3), 6)}`],
      });
    }),
    E(11, 6, "split-area", (rng) => {
      const r = rng.int(1, 3), b = r + rng.int(1, 3);
      // y = x² − r², area from 0 to b split at r
      const I = (x) => x ** 3 / 3 - r * r * x;
      const area = Math.abs(I(r) - I(0)) + Math.abs(I(b) - I(r));
      const [n, d] = F(Math.round(area * 3), 3);
      return frac(`Find the total area between y = x² − ${r * r} and the x-axis from x = 0 to x = ${b}.`, n, d, {
        answerText: fText(Math.round(area * 3), 3), traps: [T(I(b), "Split at x = " + r + ": the part below the axis is negative and cancels.")],
        hints: [`The curve crosses the axis at x = ${r}.`, `Integrate from 0 to ${r} and from ${r} to ${b} separately, then add the sizes.`], solution: [`|∫₀^${r}| = ${fText(Math.round(Math.abs(I(r)) * 3), 3)}, ∫ from ${r} to ${b} = ${fText(Math.round((I(b) - I(r)) * 3), 3)}`, `Total ${fText(Math.round(area * 3), 3)}`],
      });
    }),
  ],
  [S(11, 7)]: [
    C(11, 7, "area-line-curve", (rng) => {
      const a = rng.int(1, 6);
      // y = a x and y = x²: area a³/6
      const [n, d] = F(a ** 3, 6);
      return frac(`Find the area enclosed by y = ${a === 1 ? "" : a}x and y = x².`, n, d, {
        answerText: fText(a ** 3, 6),
        hints: [`They meet where x² = ${a}x: x = 0 and x = ${a}.`, `∫ from 0 to ${a} of (${a}x − x²) dx.`], solution: [`[${fText(a, 2)}x² − ⅓x³] from 0 to ${a}`, `= ${fText(a ** 3, 6)}`],
      });
    }),
    E(11, 7, "area-horizontal-line", (rng) => {
      const a = rng.int(1, 5), k = rng.int(1, 3);
      // y = k a² and y = k x²: area 4k a³/3
      const [n, d] = F(4 * k * a ** 3, 3);
      return frac(`Find the area enclosed by y = ${k === 1 ? "" : k}x² and the line y = ${k * a * a}.`, n, d, {
        answerText: fText(4 * k * a ** 3, 3),
        hints: [`They meet at x = ±${a}.`, `∫ from −${a} to ${a} of (${k * a * a} − ${k === 1 ? "" : k}x²) dx.`], solution: [`[${k * a * a}x − ${fText(k, 3)}x³] from −${a} to ${a}`, `= ${fText(4 * k * a ** 3, 3)}`],
      });
    }),
  ],
};

/* ================= Unit 12: Exponentials and logarithms ================= */
const U12 = {
  [S(12, 1)]: [
    C(12, 1, "evaluate-exponential", (rng) => {
      const a = rng.pick([2, 3, 4, 5, 10]), x = rng.int(-3, 4);
      const v = a ** x;
      return x < 0 ? frac(`Find the value of y = ${a}ˣ when x = ${x}.`, 1, a ** -x, { hints: ["A negative power means 1 over.", `${a}${sup(x)} = 1/${a}${sup(-x)}.`], solution: [`= {1/${a ** -x}}`] })
        : num(`Find the value of y = ${a}ˣ when x = ${x}.`, v, { traps: [T(a * x, "aˣ means a multiplied by itself x times.")], hints: ["Substitute the value of x as the power.", `${a}${sup(x)}.`], solution: [`= ${v}`] });
    }),
    E(12, 1, "exponential-features", (rng) => bankMC(rng, [
      ["Which point lies on every graph y = aˣ (a > 0)?", "(0, 1)", "(1, 0)", "(0, 0)", "a⁰ = 1.", "Every aˣ graph passes through (0, 1)."],
      ["What is the asymptote of y = 3ˣ?", "y = 0", "x = 0", "y = 3", "What happens as x becomes very negative?", "3ˣ approaches 0 but never reaches it."],
      ["Which describes y = (½)ˣ?", "Decreasing, through (0, 1)", "Increasing, through (0, 1)", "Decreasing, through (0, ½)", "0 < a < 1 gives decay.", "It's a reflection of 2ˣ in the y-axis."],
      ["What is the asymptote of y = 2ˣ + 3?", "y = 3", "y = 0", "x = 3", "The +3 moves the graph up.", "The asymptote moves up by 3."],
    ])),
  ],
  [S(12, 2)]: [
    C(12, 2, "differentiate-ekx", (rng) => {
      const a = rng.int(1, 6), k = nz(rng, -5, 5);
      return mc3(rng, `Differentiate y = ${a === 1 ? "" : a}e^(${k}x).`, `${a * k === 1 ? "" : a * k === -1 ? "−" : a * k}e^(${k}x)`, [[`${a === 1 ? "" : a}e^(${k}x)`, `Multiply by k = ${k}.`], [`${a * k}e^(${k - 1}x)`, "e^(kx) isn't a power of x: don't take 1 off."]], {
        hints: ["d/dx(e^(kx)) = ke^(kx).", `Multiply ${a} by ${k}.`], solution: [`dy/dx = ${a * k}e^(${k}x)`],
      });
    }),
    E(12, 2, "gradient-ekx", (rng) => {
      const a = rng.int(1, 5), k = nz(rng, -3, 3), x = rng.pick([0, 0, 1, 0.5]);
      const g = round(a * k * Math.exp(k * x), 2);
      return num(`Find the gradient of y = ${a === 1 ? "" : a}e^(${k}x) at x = ${x}, to 2 decimal places.`, g, {
        dp: 2, hints: [`dy/dx = ${a * k}e^(${k}x).`, `Substitute x = ${x}.`], solution: [`${a * k}e^(${fmt(k * x)}) = ${fmt(g, 2)}`],
      });
    }),
  ],
  [S(12, 3)]: [
    C(12, 3, "exponential-model-value", (rng) => {
      const A = rng.int(2, 50) * 100, k = round(rng.pick([1, -1]) * rng.int(1, 30) / 100, 2), t = rng.int(1, 10);
      const v = Math.round(A * Math.exp(k * t));
      return num(`A model is P = ${A}e^(${fmt(k)}t). Find P when t = ${t}, to the nearest whole number.`, v, {
        dp: 0, hints: [`Substitute t = ${t}.`, `${A} × e^(${fmt(round(k * t, 4))}).`], solution: [`P = ${v}`],
      });
    }),
    E(12, 3, "model-initial-and-k", (rng) => {
      const A = rng.int(2, 20) * 50, k = rng.int(1, 9) / 10, neg = rng.chance(0.5), kk = neg ? -k : k;
      return mc3(rng, `V = ${A}e^(${fmt(kk)}t). Which statement is correct?`, `The initial value is ${A} and it is ${neg ? "decaying" : "growing"}`, [[`The initial value is ${A} and it is ${neg ? "growing" : "decaying"}`, "Look at the sign of k."], [`The initial value is ${round(A * Math.exp(kk), 0)} and it is ${neg ? "decaying" : "growing"}`, "The initial value is at t = 0."]], {
        hints: ["Initial value: put t = 0.", "k > 0 growth, k < 0 decay."], solution: [`At t = 0, V = ${A}`, `k = ${fmt(kk)}: ${neg ? "decay" : "growth"}`],
      });
    }),
  ],
  [S(12, 4)]: [
    C(12, 4, "evaluate-log", (rng) => {
      const a = rng.pick([2, 3, 4, 5, 10]), n = rng.int(-2, 5);
      const b = a ** n;
      return num(`Evaluate log${sub(a)} ${n < 0 ? `(1/${a ** -n})` : b}.`, n, {
        traps: [T(b / a, "A log is a power, not a division.")],
        hints: [`${a} to what power gives ${n < 0 ? `1/${a ** -n}` : b}?`, n < 0 ? "A fraction means a negative power." : `Try ${a}², ${a}³, …`], solution: [`${a}${sup(n)} = ${n < 0 ? `1/${a ** -n}` : b}, so the answer is ${n}`],
      });
    }),
    E(12, 4, "log-to-index", (rng) => {
      const a = rng.pick([2, 3, 5]), n = rng.int(2, 5);
      return num(`log${sub(a)} x = ${n}. Find x.`, a ** n, {
        traps: [T(a * n, "log means power: x = " + a + " to the power " + n + ".")],
        hints: ["Write it in index form.", `x = ${a}${sup(n)}.`], solution: [`x = ${a ** n}`],
      });
    }),
  ],
  [S(12, 5)]: [
    C(12, 5, "combine-logs", (rng) => {
      const a = rng.pick([2, 3]), p = rng.int(1, 4), m = rng.int(2, 6), sub2 = rng.chance(0.5);
      if (sub2) {   // log_a(m·a^p) − log_a m = p
        return num(`Evaluate log${sub(a)} ${m * a ** p} − log${sub(a)} ${m}.`, p, {
          hints: ["log x − log y = log(x/y).", `${m * a ** p} ÷ ${m} = ${a ** p}.`], solution: [`log${sub(a)} ${a ** p} = ${p}`],
        });
      }
      const q = a ** p * m;   // log_a q + log_a (a^k/m)... simpler: log_a(m) + log_a(a^p / m) with integer
      if ((a ** (p + 1)) % m !== 0) return null;
      const s = (a ** (p + 1)) / m;
      return num(`Evaluate log${sub(a)} ${m} + log${sub(a)} ${s}.`, p + 1, {
        hints: ["log x + log y = log(xy).", `${m} × ${s} = ${a ** (p + 1)}.`], solution: [`log${sub(a)} ${a ** (p + 1)} = ${p + 1}`], data: { q },
      });
    }),
    E(12, 5, "single-log", (rng) => {
      const a = rng.int(2, 5), b = rng.int(2, 6), c = rng.int(2, 9), k = rng.int(2, 3);
      const v = (a ** k * b) / c;
      if (!Number.isInteger(v)) return null;
      return num(`Write ${k} log ${a} + log ${b} − log ${c} as log N. Find N.`, v, {
        traps: [T(k * a + b - c, "Use the log laws, not ordinary arithmetic on the numbers."), T(k * a * b / c, `${k} log ${a} = log ${a}${sup(k)}, not log ${k * a}.`)],
        hints: [`${k} log ${a} = log ${a ** k}.`, `log ${a ** k} + log ${b} − log ${c} = log(${a ** k} × ${b} ÷ ${c}).`], solution: [`N = ${a ** k * b} ÷ ${c} = ${v}`],
      });
    }),
  ],
  [S(12, 6)]: [
    C(12, 6, "solve-exponential", (rng) => {
      const a = rng.pick([2, 3, 4, 5, 6, 7]), b = rng.int(5, 200);
      if (Number.isInteger(Math.log(b) / Math.log(a))) return null;
      const x = round(Math.log(b) / Math.log(a), 3);
      return num(`Solve ${a}ˣ = ${b}, giving x to 3 decimal places.`, x, {
        dp: 3, traps: [T(round(b / a, 3), "Take logs: x = log " + b + " ÷ log " + a + ".")],
        hints: ["Take logs of both sides.", `x log ${a} = log ${b}.`], solution: [`x = log ${b} ÷ log ${a} = ${fmt(x, 3)}`],
      });
    }),
    E(12, 6, "solve-log-equation", (rng) => {
      const a = rng.pick([2, 3]), n = rng.int(2, 4), c = rng.int(-5, 5);
      const x = a ** n - c;
      return num(`Solve log${sub(a)}(x ${sg(c)}) = ${n}.`, x, {
        hints: ["Write in index form.", `x ${sg(c)} = ${a}${sup(n)} = ${a ** n}.`], solution: [`x = ${a ** n} ${sg(-c)} = ${x}`],
      });
    }),
  ],
  [S(12, 7)]: [
    C(12, 7, "solve-ekx", (rng) => {
      const k = rng.int(1, 5), b = rng.int(2, 50);
      const x = round(Math.log(b) / k, 3);
      return num(`Solve e^(${k === 1 ? "" : k}x) = ${b}, giving x to 3 decimal places.`, x, {
        dp: 3, traps: k === 1 ? [] : [T(round(Math.log(b), 3), `Divide ln ${b} by ${k}.`)],
        hints: ["Take ln of both sides.", `${k === 1 ? "" : k}x = ln ${b}.`], solution: [`x = ln ${b}${k === 1 ? "" : " ÷ " + k} = ${fmt(x, 3)}`],
      });
    }),
    E(12, 7, "solve-lnx", (rng) => {
      const k = rng.int(1, 3), c = round(rng.int(5, 30) / 10, 1), m = rng.int(1, 3);
      // ln(mx) = c  →  x = e^c / m
      const x = round(Math.exp(c) / m, 3);
      return num(`Solve ln(${m === 1 ? "" : m}x) = ${fmt(c)}, giving x to 3 decimal places.`, x, {
        dp: 3, hints: ["Use e to undo ln.", `${m === 1 ? "" : m}x = e^${fmt(c)}.`], solution: [`x = e^${fmt(c)}${m === 1 ? "" : " ÷ " + m} = ${fmt(x, 3)}`], data: { k },
      });
    }),
  ],
  [S(12, 8)]: [
    C(12, 8, "power-model-from-line", (rng) => {
      const n = rng.int(2, 5), la = rng.int(0, 2);
      return multi(`A graph of log y against log x (base 10) is a straight line with gradient ${n} and intercept ${la}. y = axⁿ. Find n and a.`, [["n =", n], ["a =", 10 ** la, undefined, [T(la, "The intercept is log a. Undo it: a = 10^intercept.")]]], {
        hints: ["log y = n log x + log a.", `Gradient = n; intercept = log a = ${la}.`], solution: [`n = ${n}`, `a = 10${sup(la)} = ${10 ** la}`],
      });
    }),
    E(12, 8, "exponential-model-from-line", (rng) => {
      const g = round(rng.int(1, 9) / 10, 1), c = rng.int(0, 2);
      const b = round(10 ** g, 2);
      return multi(`log y = ${fmt(g)}x + ${c} (base 10) for a model y = abˣ. Find a, and b to 2 decimal places.`, [["a =", 10 ** c], ["b =", b, 2, [T(g, "The gradient is log b. Undo it: b = 10^gradient.")]]], {
        hints: ["log y = log a + x log b.", `log a = ${c}, log b = ${fmt(g)}.`], solution: [`a = 10${sup(c)} = ${10 ** c}`, `b = 10^${fmt(g)} = ${fmt(b, 2)}`],
      });
    }),
  ],
};

export const Y12B_GENERATORS = { ...U7, ...U8, ...U9, ...U10, ...U11, ...U12 };
