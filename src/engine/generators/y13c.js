/* ==========================================================================
   Year 13 Statistics and Mechanics generators (Units 13–20, and lesson 5
   of Unit 21), light format: one core and one extend generator per lesson
   --------------------------------------------------------------------------
   Normal probabilities come from stats.js, which matches a calculator.
   Mechanics uses g = 9.8 m s⁻². Every question goes through tidy().
   ========================================================================== */
import { fmt, gcd, round } from "../numbers.js";
import { binomPmf, invNorm, nCr, normalCdf } from "../stats.js";
import { core, extend, frac, mc3, multi, num, T } from "./helpers.js";
import { tidyQuestion } from "./tidy.js";

const S = (u, l) => `y13-u${u}-l${l}`;
const C = (u, l, name, make, v = () => true) => core(S(u, l), name, name, (rng) => tidyQuestion(make(rng)), v);
const E = (u, l, name, make, v = () => true) => extend(S(u, l), name, name, (rng) => tidyQuestion(make(rng)), v);
const nz = (rng, a, b) => rng.nonZero(a, b);
const co = (n, v) => `${n === 1 ? "" : n === -1 ? "−" : fmt(n)}${v}`;
const vec = (x, y) => [[x, "i"], [y, "j"]].filter(([c]) => c !== 0).map(([c, u], i) => (i === 0 ? co(c, u) : `${c < 0 ? "−" : "+"} ${Math.abs(c) === 1 ? "" : Math.abs(c)}${u}`)).join(" ") || "0";
const g = 9.8;
const rad = (d) => (d * Math.PI) / 180;
const F = (n, d) => { const k = gcd(Math.abs(n), Math.abs(d)) || 1; return [n / k, d / k]; };
const fText = (n, d) => { const [a, b] = F(n, d); return b === 1 ? fmt(a) : `{${a}/${b}}`; };
const bankMC = (rng, bank) => {
  const [prompt, right, w1, w2, hint, why] = rng.pick(bank);
  return mc3(rng, prompt, right, [[w1, hint], [w2, hint]], { hints: [hint, "Check each option against the definition."], solution: [why] });
};
const p1 = (x) => round(x, 1), p2 = (x) => round(x, 2);

/* ============ Unit 13: Regression, correlation and hypothesis testing ============ */
const U13 = {
  [S(13, 1)]: [
    C(13, 1, "log-model-a", (rng) => {
      const c = round(rng.int(0, 30) / 10, 1), m = round(rng.int(1, 9) / 10, 1);
      return multi(`A model y = abˣ gives log y = ${fmt(c)} + ${fmt(m)}x (log base 10). Find a and b, to 2 decimal places.`, [["a =", round(10 ** c, 2), 2], ["b =", round(10 ** m, 2), 2]], {
        hints: ["log y = log a + x log b.", `a = 10^${fmt(c)}, b = 10^${fmt(m)}.`], solution: [`a = ${fmt(round(10 ** c, 2), 2)}`, `b = ${fmt(round(10 ** m, 2), 2)}`],
      });
    }),
    E(13, 1, "power-model", (rng) => {
      const c = rng.int(0, 2), n = rng.int(2, 5);
      return multi(`A graph of log y against log x is a straight line with intercept ${c} and gradient ${n}. y = axⁿ. Find a and n.`, [["a =", 10 ** c, undefined, [T(c, "The intercept is log a: a = 10^intercept.")]], ["n =", n]], {
        hints: ["log y = log a + n log x.", `log a = ${c}.`], solution: [`a = ${10 ** c}, n = ${n}`],
      });
    }),
  ],
  [S(13, 2)]: [
    C(13, 2, "interpret-r", (rng) => {
      const r = round(nz(rng, -99, 99) / 100, 2);
      const strength = Math.abs(r) >= 0.7 ? "strong" : Math.abs(r) >= 0.3 ? "moderate" : "weak";
      const right = `${strength[0].toUpperCase() + strength.slice(1)} ${r > 0 ? "positive" : "negative"} correlation`;
      const wrongSign = `${strength[0].toUpperCase() + strength.slice(1)} ${r > 0 ? "negative" : "positive"} correlation`;
      const wrongStr = `${strength === "strong" ? "Weak" : "Strong"} ${r > 0 ? "positive" : "negative"} correlation`;
      return mc3(rng, `The PMCC is r = ${fmt(r)}. Describe the correlation.`, right, [[wrongSign, "The sign of r gives the direction."], [wrongStr, "How close is r to ±1?"]], {
        hints: ["Sign: positive or negative.", "Size: near 1 strong, near 0 weak (around 0.3–0.7 moderate)."], solution: [right],
      });
    }),
    E(13, 2, "calc-r", (rng) => {
      const n = 6, xs = Array.from({ length: n }, (_, i) => i + 1), b = nz(rng, -3, 3);
      const ys = xs.map((x) => b * x + rng.int(-3, 3));
      const mx = xs.reduce((s, v) => s + v) / n, my = ys.reduce((s, v) => s + v) / n;
      const sxy = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0), sxx = xs.reduce((s, x) => s + (x - mx) ** 2, 0), syy = ys.reduce((s, y) => s + (y - my) ** 2, 0);
      if (syy === 0) return null;
      const r = round(sxy / Math.sqrt(sxx * syy), 3);
      return num(`Use your calculator to find the PMCC for x: ${xs.join(", ")} and y: ${ys.join(", ")}, to 3 decimal places.`, r, {
        dp: 3, hints: ["Use the two-variable statistics mode.", "Enter the pairs, then read off r."], solution: [`r = ${fmt(r, 3)}`],
      });
    }),
  ],
  [S(13, 3)]: [
    C(13, 3, "correlation-test", (rng) => {
      const [n, cv] = rng.pick([[8, 0.6215], [10, 0.5494], [12, 0.4973], [15, 0.4409], [20, 0.3783]]);
      const r = round(rng.int(20, 90) / 100, 2), rej = r > cv;
      return mc3(rng, `n = ${n}, r = ${fmt(r)}. The 5% one-tailed critical value is ${cv}. Test H₀: ρ = 0 against H₁: ρ > 0.`, rej ? "Reject H₀: evidence of positive correlation" : "Do not reject H₀: insufficient evidence of positive correlation", [[rej ? "Do not reject H₀: insufficient evidence of positive correlation" : "Reject H₀: evidence of positive correlation", `Compare ${fmt(r)} with ${cv}.`], ["Reject H₀: the variables cause each other", "Correlation isn't causation."]], {
        hints: ["Reject H₀ if r is beyond the critical value.", `${fmt(r)} vs ${cv}.`], solution: [`${fmt(r)} ${rej ? ">" : "<"} ${cv}`],
      });
    }),
    E(13, 3, "rho-hypotheses", (rng) => bankMC(rng, [
      ["Which hypotheses test for negative correlation?", "H₀: ρ = 0, H₁: ρ < 0", "H₀: r = 0, H₁: r < 0", "H₀: ρ < 0, H₁: ρ = 0", "Hypotheses use the population ρ.", "H₀ has '=' and uses ρ."],
      ["Which hypotheses test for any correlation?", "H₀: ρ = 0, H₁: ρ ≠ 0", "H₀: ρ = 0, H₁: ρ > 0", "H₀: ρ ≠ 0, H₁: ρ = 0", "'Any' means either direction.", "Two-tailed: ρ ≠ 0."],
      ["For a two-tailed test at 5%, which table column do you use?", "The 2.5% one-tailed column", "The 5% one-tailed column", "The 10% column", "Split the level.", "Each tail gets 2.5%."],
      ["What does ρ represent?", "The population correlation coefficient", "The sample PMCC", "The gradient of the regression line", "Greek letters are population parameters.", "ρ is for the whole population; r is from the sample."],
    ])),
  ],
};

/* ===================== Unit 14: Conditional probability ===================== */
const U14 = {
  [S(14, 1)]: [
    C(14, 1, "set-notation-values", (rng) => {
      const pa = rng.int(3, 7) / 10, pb = rng.int(2, 6) / 10, pab = rng.int(1, Math.min(pa, pb) * 10 - 1) / 10;
      const u = round(pa + pb - pab, 2);
      if (u > 1) return null;
      const kind = rng.int(0, 2);
      const [lab, v] = [[`P(A ∩ B′)`, round(pa - pab, 2)], [`P(A′ ∩ B)`, round(pb - pab, 2)], [`P((A ∪ B)′)`, round(1 - u, 2)]][kind];
      return num(`P(A) = ${fmt(pa)}, P(B) = ${fmt(pb)}, P(A ∩ B) = ${fmt(pab)}. Find ${lab}.`, v, {
        hints: ["Draw a Venn diagram, filling the overlap first.", kind === 0 ? "A but not B." : kind === 1 ? "B but not A." : "Outside both circles."], solution: [`${lab} = ${fmt(v)}`],
      });
    }),
    E(14, 1, "set-notation-meaning", (rng) => bankMC(rng, [
      ["What does A ∩ B′ mean?", "A and not B", "A or B", "Neither A nor B", "∩ is 'and'; ′ is 'not'.", "In A, outside B."],
      ["What does (A ∪ B)′ mean?", "Neither A nor B", "Both A and B", "Not A, but B", "The complement of 'A or B'.", "Outside both circles."],
      ["What does A′ ∪ B mean?", "Not A, or B (or both)", "B but not A", "A and B", "∪ is 'or'.", "Everything outside A, together with B."],
      ["Which is the same as (A ∩ B)′?", "A′ ∪ B′", "A′ ∩ B′", "A ∪ B", "De Morgan's law.", "Not both = not A or not B."],
    ])),
  ],
  [S(14, 2)]: [
    C(14, 2, "conditional-formula", (rng) => {
      const pb = rng.int(2, 9) / 10, pab = rng.int(1, pb * 10 - 1) / 10;
      const [n, d] = F(Math.round(pab * 10), Math.round(pb * 10));
      return frac(`P(A ∩ B) = ${fmt(pab)} and P(B) = ${fmt(pb)}. Find P(A | B).`, n, d, {
        traps: [T(pab * pb, "Divide, don't multiply.")], hints: ["P(A | B) = P(A ∩ B) ÷ P(B).", `${fmt(pab)} ÷ ${fmt(pb)}.`], solution: [`= ${fText(Math.round(pab * 10), Math.round(pb * 10))}`],
      });
    }),
    E(14, 2, "conditional-table", (rng) => {
      const a = rng.int(5, 30), b = rng.int(5, 30), c = rng.int(5, 30), d = rng.int(5, 30);
      return frac(`A survey: ${a} boys walk, ${b} boys cycle, ${c} girls walk, ${d} girls cycle. A pupil who walks is chosen. Find P(boy | walks).`, ...F(a, a + c), {
        traps: [T(a / (a + b + c + d), "Only count pupils who walk.")], hints: [`${a + c} pupils walk.`, `${a} of them are boys.`], solution: [`= ${fText(a, a + c)}`],
      });
    }),
  ],
  [S(14, 3)]: [
    C(14, 3, "venn-conditional", (rng) => {
      const ao = rng.int(1, 4) / 10, both = rng.int(1, 3) / 10, bo = rng.int(1, 4) / 10;
      if (ao + both + bo > 1) return null;
      const givenB = rng.chance(0.5);
      const num_ = Math.round(both * 10), den = Math.round((givenB ? both + bo : both + ao) * 10);
      return frac(`On a Venn diagram: A only ${fmt(ao)}, both ${fmt(both)}, B only ${fmt(bo)}. Find P(${givenB ? "A | B" : "B | A"}).`, ...F(num_, den), {
        hints: [`Restrict to ${givenB ? "B" : "A"}: ${fmt(round(den / 10, 1))} in total.`, `The part also in ${givenB ? "A" : "B"} is ${fmt(both)}.`], solution: [`${fmt(both)} ÷ ${fmt(round(den / 10, 1))} = ${fText(num_, den)}`],
      });
    }),
    E(14, 3, "venn-counts-conditional", (rng) => {
      const n = rng.int(40, 100), ao = rng.int(3, 15), both = rng.int(2, 12), bo = rng.int(3, 15);
      if (ao + both + bo > n) return null;
      return frac(`Of ${n} people, ${ao + both} like tea, ${bo + both} like coffee and ${both} like both. A coffee-drinker is chosen. Find P(likes tea | likes coffee).`, ...F(both, both + bo), {
        hints: [`${bo + both} like coffee.`, `${both} of them like tea too.`], solution: [`= ${fText(both, both + bo)}`],
      });
    }),
  ],
  [S(14, 4)]: [
    C(14, 4, "addition-rule", (rng) => {
      const pa = rng.int(3, 7) / 10, pb = rng.int(2, 6) / 10, pab = rng.int(1, Math.min(pa, pb) * 10) / 10, u = round(pa + pb - pab, 2);
      if (u > 1) return null;
      return num(`P(A) = ${fmt(pa)}, P(B) = ${fmt(pb)}, P(A ∪ B) = ${fmt(u)}. Find P(A ∩ B).`, round(pab, 2), {
        hints: ["P(A ∪ B) = P(A) + P(B) − P(A ∩ B).", `${fmt(pa)} + ${fmt(pb)} − ${fmt(u)}.`], solution: [`= ${fmt(round(pab, 2))}`],
      });
    }),
    E(14, 4, "multiplication-rule", (rng) => {
      const pa = rng.int(1, 9) / 10, pba = rng.int(1, 9) / 10;
      return num(`P(A) = ${fmt(pa)} and P(B | A) = ${fmt(pba)}. Find P(A ∩ B).`, round(pa * pba, 4), {
        traps: [T(round(pa + pba, 2), "'And' with a conditional: multiply.")], hints: ["P(A ∩ B) = P(B | A) × P(A).", `${fmt(pba)} × ${fmt(pa)}.`], solution: [`= ${fmt(round(pa * pba, 4))}`],
      });
    }),
  ],
  [S(14, 5)]: [
    C(14, 5, "tree-total", (rng) => {
      const pa = rng.int(1, 9) / 10, pla = rng.int(1, 9) / 10, plb = rng.int(1, 9) / 10;
      const v = round(pa * pla + (1 - pa) * plb, 4);
      return num(`P(bus) = ${fmt(pa)}. P(late | bus) = ${fmt(pla)}; P(late | not bus) = ${fmt(plb)}. Find P(late).`, v, {
        hints: ["Add the two paths that end in 'late'.", `${fmt(pa)} × ${fmt(pla)} + ${fmt(round(1 - pa, 1))} × ${fmt(plb)}.`], solution: [`= ${fmt(v)}`],
      });
    }),
    E(14, 5, "tree-reverse", (rng) => {
      const pa = rng.int(1, 9) / 10, pla = rng.int(1, 9) / 10, plb = rng.int(1, 9) / 10;
      const top = pa * pla, tot = top + (1 - pa) * plb, v = round(top / tot, 4);
      return num(`P(bus) = ${fmt(pa)}. P(late | bus) = ${fmt(pla)}; P(late | not bus) = ${fmt(plb)}. Given someone was late, find P(they took the bus), to 4 decimal places.`, v, {
        dp: 4, traps: [T(round(top, 4), `Divide by P(late) = ${fmt(round(tot, 4))}.`)],
        hints: [`P(bus ∩ late) = ${fmt(round(top, 4))}.`, `P(late) = ${fmt(round(tot, 4))}; divide.`], solution: [`${fmt(round(top, 4))} ÷ ${fmt(round(tot, 4))} = ${fmt(v, 4)}`],
      });
    }),
  ],
};

/* ===================== Unit 15: The normal distribution ===================== */
const U15 = {
  [S(15, 1)]: [
    C(15, 1, "normal-facts", (rng) => {
      const mu = rng.int(10, 100), s = rng.int(2, 15), kind = rng.int(0, 1);
      if (kind === 0) return num(`X ~ N(${mu}, ${s * s}). Find the standard deviation of X.`, s, { traps: [T(s * s, "N(μ, σ²) gives the variance; take the square root.")], hints: ["The second number is σ².", `√${s * s}.`], solution: [`σ = ${s}`] });
      const k = rng.int(1, 3);
      return multi(`X ~ N(${mu}, ${s * s}). About ${[68, 95, 99.7][k - 1]}% of values lie within ${k} standard deviation${k > 1 ? "s" : ""} of the mean. Find that range.`, [["from", mu - k * s], ["to", mu + k * s]], { hints: [`σ = ${s}.`, `${mu} ± ${k} × ${s}.`], solution: [`${mu - k * s} to ${mu + k * s}`] });
    }),
    E(15, 1, "normal-properties", (rng) => bankMC(rng, [
      ["For a normal distribution, which is true?", "Mean = median = mode", "Mean > median", "The mode is 0", "It's symmetric.", "Symmetry makes all three equal."],
      ["X is normal and continuous. What is P(X = 5)?", "0", "It depends on μ", "0.5", "A single value has no width.", "For continuous X, P(X = a) = 0."],
      ["Where are the points of inflection of a normal curve?", "At μ ± σ", "At μ", "At μ ± 2σ", "Where the curve changes concavity.", "One standard deviation either side."],
      ["About what percentage of a normal distribution lies within 2σ of μ?", "95%", "68%", "99.7%", "Learn 68–95–99.7.", "Two standard deviations: 95%."],
    ])),
  ],
  [S(15, 2)]: [
    C(15, 2, "normal-less-than", (rng) => {
      const mu = rng.int(20, 100), s = rng.int(2, 15), x = round(mu + (rng.int(-25, 25) / 10) * s, 1), more = rng.chance(0.5);
      const v = round(more ? 1 - normalCdf(x, mu, s) : normalCdf(x, mu, s), 4);
      return num(`X ~ N(${mu}, ${s}²). Find P(X ${more ? ">" : "<"} ${fmt(x)}), to 4 decimal places.`, v, {
        dp: 4, traps: [T(round(more ? normalCdf(x, mu, s) : 1 - normalCdf(x, mu, s), 4), `That's P(X ${more ? "<" : ">"} ${fmt(x)}).`)],
        hints: ["Use the normal CD function on your calculator.", `σ = ${s}, μ = ${mu}.`], solution: [`= ${fmt(v, 4)}`],
      });
    }),
    E(15, 2, "normal-between", (rng) => {
      const mu = rng.int(20, 100), s = rng.int(2, 15), a = round(mu - (rng.int(1, 25) / 10) * s, 1), b = round(mu + (rng.int(1, 25) / 10) * s, 1);
      const v = round(normalCdf(b, mu, s) - normalCdf(a, mu, s), 4);
      const wrong = round(normalCdf(b, mu, s * s) - normalCdf(a, mu, s * s), 4);
      return num(`X ~ N(${mu}, ${s * s}). Find P(${fmt(a)} < X < ${fmt(b)}), to 4 decimal places.`, v, {
        dp: 4, traps: wrong !== v ? [T(wrong, `The ${s * s} is the variance: use σ = ${s}.`)] : [],
        hints: [`σ = √${s * s} = ${s}.`, "Normal CD with lower and upper bounds."], solution: [`≈ ${fmt(v, 4)}`],
      });
    }),
  ],
  [S(15, 3)]: [
    C(15, 3, "inverse-normal", (rng) => {
      const mu = rng.int(20, 100), s = rng.int(2, 15), p = rng.pick([0.05, 0.1, 0.2, 0.25, 0.3, 0.7, 0.75, 0.8, 0.9, 0.95]);
      const a = round(mu + s * invNorm(p), 2);
      return num(`X ~ N(${mu}, ${s}²). P(X < a) = ${fmt(p)}. Find a, to 2 decimal places.`, a, {
        dp: 2, hints: ["Use the inverse normal function.", `Area to the left = ${fmt(p)}.`], solution: [`a = ${fmt(a, 2)}`],
      });
    }),
    E(15, 3, "inverse-normal-right", (rng) => {
      const mu = rng.int(20, 100), s = rng.int(2, 15), p = rng.pick([0.05, 0.1, 0.15, 0.2, 0.25]);
      const a = round(mu + s * invNorm(1 - p), 2);
      return num(`X ~ N(${mu}, ${s}²). The top ${p * 100}% of values are above a. Find a, to 2 decimal places.`, a, {
        dp: 2, traps: [T(round(mu + s * invNorm(p), 2), `Enter the LEFT area: 1 − ${fmt(p)} = ${fmt(1 - p)}.`)],
        hints: ["P(X > a) = " + fmt(p) + ", so P(X < a) = " + fmt(round(1 - p, 2)) + ".", "Use the inverse normal."], solution: [`a = ${fmt(a, 2)}`],
      });
    }),
  ],
  [S(15, 4)]: [
    C(15, 4, "standardise", (rng) => {
      const mu = rng.int(20, 100), s = rng.int(2, 15), z = round(rng.int(-30, 30) / 10, 1), x = round(mu + z * s, 1);
      return num(`X ~ N(${mu}, ${s}²). Standardise x = ${fmt(x)}: find z.`, z, {
        traps: [T(round((x - mu) / (s * s), 4), "Divide by σ, not σ².")], hints: ["z = (x − μ) ÷ σ.", `(${fmt(x)} − ${mu}) ÷ ${s}.`], solution: [`z = ${fmt(z)}`],
      });
    }),
    E(15, 4, "unstandardise", (rng) => {
      const mu = rng.int(20, 100), s = rng.int(2, 15), z = round(rng.int(-30, 30) / 10, 1);
      return num(`X ~ N(${mu}, ${s}²). A value has z = ${fmt(z)}. Find x.`, round(mu + z * s, 1), {
        hints: ["x = μ + zσ.", `${mu} + ${fmt(z)} × ${s}.`], solution: [`x = ${fmt(round(mu + z * s, 1))}`],
      });
    }),
  ],
  [S(15, 5)]: [
    C(15, 5, "find-mu", (rng) => {
      const s = rng.int(2, 12), x = rng.int(30, 120), p = rng.pick([0.05, 0.1, 0.2, 0.8, 0.9, 0.95, 0.975]);
      const z = invNorm(p), mu = round(x - s * z, 2);
      return num(`X ~ N(μ, ${s}²) and P(X < ${x}) = ${fmt(p)}. Find μ, to 2 decimal places.`, mu, {
        dp: 2, hints: [`z for an area of ${fmt(p)} is ${fmt(round(z, 4))}.`, `(${x} − μ)/${s} = ${fmt(round(z, 4))}.`], solution: [`μ = ${x} − ${s} × ${fmt(round(z, 4))} = ${fmt(mu, 2)}`],
      });
    }),
    E(15, 5, "find-sigma", (rng) => {
      const mu = rng.int(30, 100), d = rng.int(2, 20), p = rng.pick([0.8, 0.9, 0.95, 0.975, 0.99]);
      const z = invNorm(p), s = round(d / z, 2);
      return num(`X ~ N(${mu}, σ²) and P(X < ${mu + d}) = ${fmt(p)}. Find σ, to 2 decimal places.`, s, {
        dp: 2, hints: [`z = ${fmt(round(z, 4))}.`, `${d} ÷ σ = ${fmt(round(z, 4))}.`], solution: [`σ = ${d} ÷ ${fmt(round(z, 4))} = ${fmt(s, 2)}`],
      });
    }),
  ],
  [S(15, 6)]: [
    C(15, 6, "approx-parameters", (rng) => {
      const n = rng.int(5, 40) * 10, p = rng.pick([0.3, 0.4, 0.5, 0.6]);
      return multi(`X ~ B(${n}, ${fmt(p)}) is approximated by N(μ, σ²). Find μ and σ².`, [["μ =", round(n * p, 2)], ["σ² =", round(n * p * (1 - p), 2)]], {
        hints: ["μ = np.", "σ² = np(1 − p)."], solution: [`μ = ${fmt(round(n * p, 2))}, σ² = ${fmt(round(n * p * (1 - p), 2))}`],
      });
    }),
    E(15, 6, "continuity-correction", (rng) => {
      const k = rng.int(10, 60), kind = rng.int(0, 3);
      const [lab, bound, op] = [[`P(X ≤ ${k})`, k + 0.5, "<"], [`P(X < ${k})`, k - 0.5, "<"], [`P(X ≥ ${k})`, k - 0.5, ">"], [`P(X > ${k})`, k + 0.5, ">"]][kind];
      return num(`Using a continuity correction, ${lab} ≈ P(Y ${op} c). Find c.`, bound, {
        traps: [T(kind === 0 || kind === 3 ? k - 0.5 : k + 0.5, "Think about which whole numbers are included.")],
        hints: ["Each whole number n covers n − 0.5 to n + 0.5.", kind === 0 ? `Include ${k}.` : kind === 1 ? `Exclude ${k}.` : kind === 2 ? `Include ${k}.` : `Exclude ${k}.`], solution: [`c = ${fmt(bound)}`],
      });
    }),
  ],
  [S(15, 7)]: [
    C(15, 7, "sample-mean-sd", (rng) => {
      const s = rng.int(2, 30), n = rng.pick([4, 16, 25, 64, 100]);   // √n = 2, 4, 5, 8, 10: exact decimals
      return num(`A population has σ = ${s}. Find the standard deviation of the mean of a sample of size ${n}.`, round(s / Math.sqrt(n), 4), {
        traps: [T(round(s / n, 4), "Divide by √n, not n.")], hints: ["X̄ has standard deviation σ/√n.", `${s} ÷ √${n}.`], solution: [`= ${fmt(round(s / Math.sqrt(n), 4))}`],
      });
    }),
    E(15, 7, "mean-test-probability", (rng) => {
      const mu = rng.int(20, 100), s = rng.int(4, 20), n = rng.pick([16, 25, 36, 49, 64]), up = rng.chance(0.5);
      const se = s / Math.sqrt(n), xbar = round(mu + (up ? 1 : -1) * rng.int(5, 30) / 10 * se, 1);
      const v = round(up ? 1 - normalCdf(xbar, mu, se) : normalCdf(xbar, mu, se), 4);
      if (v < 0.0005) return null;
      return num(`H₀: μ = ${mu}, H₁: μ ${up ? ">" : "<"} ${mu}, σ = ${s}. A sample of ${n} has mean ${fmt(xbar)}. Find P(X̄ ${up ? "≥" : "≤"} ${fmt(xbar)}) under H₀, to 4 decimal places.`, v, {
        dp: 4, hints: [`Under H₀, X̄ ~ N(${mu}, (${s}/√${n})²).`, `σ/√n = ${fmt(round(se, 4))}.`], solution: [`= ${fmt(v, 4)}`, v < 0.05 ? "Less than 5%: reject H₀" : "Not less than 5%: do not reject H₀"],
      });
    }),
  ],
};

/* ========================= Unit 16: Moments ========================= */
const U16 = {
  [S(16, 1)]: [
    C(16, 1, "moment", (rng) => {
      const Fv = rng.int(2, 60), d = round(rng.int(1, 40) / 10, 1);
      return num(`Find the moment of a ${Fv} N force acting ${fmt(d)} m from the pivot, at right angles to the rod.`, round(Fv * d, 2), {
        unit: "N m", hints: ["Moment = force × perpendicular distance.", `${Fv} × ${fmt(d)}.`], solution: [`= ${fmt(round(Fv * d, 2))} N m`],
      });
    }),
    E(16, 1, "moment-angle", (rng) => {
      const Fv = rng.int(5, 60), d = rng.int(1, 5), a = rng.pick([30, 45, 60, 20, 70]);
      return num(`A force of ${Fv} N acts at the end of a ${d} m rod, at ${a}° to the rod. Find its moment about the other end, to 2 decimal places.`, p2(Fv * d * Math.sin(rad(a))), {
        dp: 2, unit: "N m", traps: [T(p2(Fv * d * Math.cos(rad(a))), "Use the component PERPENDICULAR to the rod: F sin θ.")],
        hints: ["Only the perpendicular component turns the rod.", `${Fv} sin ${a}° × ${d}.`], solution: [`= ${fmt(p2(Fv * d * Math.sin(rad(a))), 2)} N m`],
      });
    }),
  ],
  [S(16, 2)]: [
    C(16, 2, "resultant-moment", (rng) => {
      const c1 = rng.int(5, 80), c2 = rng.int(5, 80), a1 = rng.int(5, 80);
      const r = c1 + c2 - a1;
      if (r === 0) return null;
      return num(`Clockwise moments of ${c1} N m and ${c2} N m and an anticlockwise moment of ${a1} N m act on a body. Find the size of the resultant moment.`, Math.abs(r), {
        unit: "N m", traps: [T(c1 + c2 + a1, "Opposite directions subtract.")], hints: ["Clockwise total minus anticlockwise total.", `${c1 + c2} − ${a1}.`], solution: [`${Math.abs(r)} N m ${r > 0 ? "clockwise" : "anticlockwise"}`],
      });
    }),
    E(16, 2, "rod-resultant", (rng) => {
      const F1 = rng.int(2, 20), d1 = rng.int(1, 5), F2 = rng.int(2, 20), d2 = rng.int(1, 5);
      const r = F1 * d1 - F2 * d2;
      if (r === 0) return null;
      return mc3(rng, `A rod pivots at P. ${F1} N acts ${d1} m to the left of P (downwards) and ${F2} N acts ${d2} m to the right of P (downwards). What is the resultant moment about P?`, `${Math.abs(r)} N m ${r > 0 ? "anticlockwise" : "clockwise"}`, [[`${Math.abs(r)} N m ${r > 0 ? "clockwise" : "anticlockwise"}`, "A downward force to the LEFT of a pivot turns it anticlockwise."], [`${F1 * d1 + F2 * d2} N m clockwise`, "They turn opposite ways."]], {
        hints: ["Left side down: anticlockwise. Right side down: clockwise.", `${F1 * d1} anticlockwise, ${F2 * d2} clockwise.`], solution: [`${Math.abs(r)} N m ${r > 0 ? "anticlockwise" : "clockwise"}`],
      });
    }),
  ],
  [S(16, 3)]: [
    C(16, 3, "balance-rod", (rng) => {
      const F1 = rng.int(2, 30), d1 = rng.int(1, 6), d2 = rng.int(1, 6);
      const F2 = round((F1 * d1) / d2, 2);
      return num(`A light rod is balanced on a pivot. A ${F1} N weight hangs ${d1} m from the pivot on one side. What weight ${d2} m from the pivot on the other side balances it?`, F2, {
        unit: "N", hints: ["Clockwise moments = anticlockwise moments.", `${F1} × ${d1} = W × ${d2}.`], solution: [`W = ${fmt(F2)} N`],
      });
    }),
    E(16, 3, "beam-reactions", (rng) => {
      const L = rng.int(2, 10), W = rng.int(10, 100) * 2, x = rng.int(1, L * 2 - 1) / 2, P = rng.int(5, 60);
      // uniform beam weight W at L/2, load P at x from A; supports at A (0) and B (L)
      const RB = round((W * (L / 2) + P * x) / L, 2), RA = round(W + P - RB, 2);
      return multi(`A uniform beam AB of length ${L} m and weight ${W} N rests on supports at A and B. A ${P} N load is ${fmt(x)} m from A. Find the reactions at A and B.`, [["R_A =", RA], ["R_B =", RB]], {
        hints: ["Take moments about A to find R_B.", `R_B × ${L} = ${W} × ${fmt(L / 2)} + ${P} × ${fmt(x)}.`], solution: [`R_B = ${fmt(RB)} N`, `R_A = ${W + P} − ${fmt(RB)} = ${fmt(RA)} N`],
      });
    }),
  ],
  [S(16, 4)]: [
    C(16, 4, "centre-of-mass-particles", (rng) => {
      const m1 = rng.int(1, 9), m2 = rng.int(1, 9), x2 = rng.int(1, 10), m3 = rng.int(0, 6), x3 = rng.int(1, 10);
      const tot = m1 + m2 + m3, mom = m2 * x2 + m3 * x3;
      return frac(`Particles of ${m1} kg at x = 0, ${m2} kg at x = ${x2}${m3 ? ` and ${m3} kg at x = ${x3}` : ""} lie on a light rod. Find the x-coordinate of the centre of mass.`, ...F(mom, tot), {
        hints: ["x̄ = Σmx ÷ Σm.", `(${m2} × ${x2}${m3 ? ` + ${m3} × ${x3}` : ""}) ÷ ${tot}.`], solution: [`x̄ = ${fText(mom, tot)}`],
      });
    }),
    E(16, 4, "rod-plus-particle", (rng) => {
      const M = rng.int(1, 10), L = rng.int(2, 10), m = rng.int(1, 10);
      // uniform rod mass M from 0 to L, particle m at L
      return frac(`A uniform rod of mass ${M} kg and length ${L} m has a ${m} kg particle fixed at one end. How far from the other end is the centre of mass?`, ...F(M * L + 2 * m * L, 2 * (M + m)), {
        hints: [`The rod's mass acts at ${fmt(L / 2)} m.`, `x̄ = (${M} × ${fmt(L / 2)} + ${m} × ${L}) ÷ ${M + m}.`], solution: [`x̄ = ${fText(M * L + 2 * m * L, 2 * (M + m))} m`],
      });
    }),
  ],
  [S(16, 5)]: [
    C(16, 5, "tilting-zero", (rng) => bankMC(rng, [
      ["A beam rests on supports C and D and is about to tilt about D. What is the reaction at C?", "0", "Equal to the reaction at D", "Half the beam's weight", "Losing contact.", "At the point of tilting the other reaction is zero."],
      ["When a beam is about to tilt about a support, where should you take moments?", "About that support", "About the centre of the beam", "About the far end", "Which reaction is unknown?", "Moments about the tilting support remove its reaction."],
      ["A plank sticks out past a support. A person walks towards the end. What happens to the reaction at the other support?", "It decreases", "It increases", "It stays the same", "Their moment about the near support grows.", "It falls to 0 at the point of tilting."],
    ])),
    E(16, 5, "tilting-load", (rng) => {
      const L = rng.int(6, 12), a = rng.int(1, 2), b = L - rng.int(1, 3), W = rng.int(20, 200);
      // light? use uniform beam weight W at L/2; supports at a and b; load P at end L; tilting about b
      const P = round((W * (b - L / 2)) / (L - b), 2);
      if (P <= 0) return null;
      return num(`A uniform beam of length ${L} m and weight ${W} N rests on supports ${a} m and ${b} m from end A. A load is hung at the end ${L} m from A. Find the load that makes the beam about to tilt.`, P, {
        unit: "N", hints: [`About to tilt about the support at ${b} m, so the other reaction is 0.`, `Moments about ${b}: ${W} × ${fmt(b - L / 2)} = P × ${L - b}.`], solution: [`P = ${fmt(P)} N`],
      });
    }),
  ],
};

/* ===================== Unit 17: Forces and friction ===================== */
const ANG = [20, 25, 30, 35, 40, 45, 50, 60];
const U17 = {
  [S(17, 1)]: [
    C(17, 1, "resolve-components", (rng) => {
      const Fv = rng.int(5, 100), a = rng.pick(ANG);
      return multi(`A force of ${Fv} N acts at ${a}° above the horizontal. Find its horizontal and vertical components, to 2 decimal places.`, [["horizontal =", p2(Fv * Math.cos(rad(a))), 2], ["vertical =", p2(Fv * Math.sin(rad(a))), 2]], {
        hints: ["Horizontal: F cos θ.", "Vertical: F sin θ."], solution: [`${fmt(p2(Fv * Math.cos(rad(a))), 2)} N, ${fmt(p2(Fv * Math.sin(rad(a))), 2)} N`],
      });
    }),
    E(17, 1, "resultant-from-two", (rng) => {
      const F1 = rng.int(5, 40), F2 = rng.int(5, 40), a = rng.pick(ANG);
      const x = F1 + F2 * Math.cos(rad(a)), y = F2 * Math.sin(rad(a));
      return num(`Forces of ${F1} N (horizontal) and ${F2} N (at ${a}° above the horizontal) act on a particle. Find the magnitude of the resultant, to 2 decimal places.`, p2(Math.hypot(x, y)), {
        dp: 2, unit: "N", hints: ["Resolve both forces horizontally and vertically.", `Horizontal ${fmt(p2(x))}, vertical ${fmt(p2(y))}.`], solution: [`|R| = ${fmt(p2(Math.hypot(x, y)), 2)} N`],
      });
    }),
  ],
  [S(17, 2)]: [
    C(17, 2, "slope-reaction", (rng) => {
      const m = rng.int(1, 20), a = rng.pick(ANG);
      return num(`A ${m} kg block rests on a slope at ${a}° to the horizontal. Find the normal reaction, to 2 decimal places.`, p2(m * g * Math.cos(rad(a))), {
        dp: 2, unit: "N", traps: [T(p2(m * g), "On a slope R = mg cos α."), T(p2(m * g * Math.sin(rad(a))), "That's the component down the slope.")],
        hints: ["Resolve perpendicular to the slope.", `R = ${m} × 9.8 × cos ${a}°.`], solution: [`R = ${fmt(p2(m * g * Math.cos(rad(a))), 2)} N`],
      });
    }),
    E(17, 2, "smooth-slope-acceleration", (rng) => {
      const a = rng.pick(ANG);
      return num(`A particle slides down a smooth slope at ${a}° to the horizontal. Find its acceleration, to 2 decimal places.`, p2(g * Math.sin(rad(a))), {
        dp: 2, unit: "m s⁻²", hints: ["Down the slope: mg sin α = ma.", `a = 9.8 sin ${a}°.`], solution: [`a = ${fmt(p2(g * Math.sin(rad(a))), 2)} m s⁻²`],
      });
    }),
  ],
  [S(17, 3)]: [
    C(17, 3, "max-friction", (rng) => {
      const m = rng.int(1, 30), mu = round(rng.int(1, 8) / 10, 1);
      return num(`A ${m} kg box is on a rough horizontal floor with μ = ${fmt(mu)}. Find the maximum friction.`, p2(mu * m * g), {
        unit: "N", hints: ["F_max = μR, with R = mg.", `${fmt(mu)} × ${m} × 9.8.`], solution: [`= ${fmt(p2(mu * m * g))} N`],
      });
    }),
    E(17, 3, "pull-with-friction", (rng) => {
      const m = rng.int(2, 20), mu = round(rng.int(1, 6) / 10, 1), a = round(rng.int(1, 8) / 2, 1);
      const P = p2(m * a + mu * m * g);
      return num(`A ${m} kg box on a rough floor (μ = ${fmt(mu)}) is pulled horizontally by a force of ${fmt(P)} N. Find its acceleration.`, a, {
        unit: "m s⁻²", traps: [T(round(P / m, 2), "Subtract the friction μmg first.")],
        hints: [`Friction = ${fmt(mu)} × ${m} × 9.8 = ${fmt(p2(mu * m * g))} N.`, `${fmt(P)} − ${fmt(p2(mu * m * g))} = ${m}a.`], solution: [`a = ${fmt(a)} m s⁻²`],
      });
    }),
  ],
};

/* ========================= Unit 18: Projectiles ========================= */
const U18 = {
  [S(18, 1)]: [
    C(18, 1, "fall-time", (rng) => {
      const t = round(rng.int(5, 40) / 10, 1), h = round(4.9 * t * t, 3);
      return num(`A stone is dropped (or thrown horizontally) from a height of ${fmt(h)} m. How long does it take to reach the ground?`, t, {
        unit: "s", hints: ["Vertically: s = ½gt² with u = 0.", `${fmt(h)} = 4.9t².`], solution: [`t = ${fmt(t)} s`],
      });
    }),
    E(18, 1, "horizontal-distance", (rng) => {
      const t = round(rng.int(5, 30) / 10, 1), h = round(4.9 * t * t, 3), u = rng.int(2, 25);
      return num(`A ball is thrown horizontally at ${u} m s⁻¹ from a height of ${fmt(h)} m. How far from the base does it land?`, round(u * t, 2), {
        unit: "m", hints: ["Find the time from the vertical motion.", `t = ${fmt(t)} s; horizontal distance = ${u} × t.`], solution: [`= ${fmt(round(u * t, 2))} m`],
      });
    }),
  ],
  [S(18, 2)]: [
    C(18, 2, "velocity-components", (rng) => {
      const U = rng.int(5, 40), a = rng.pick(ANG);
      return multi(`A projectile is launched at ${U} m s⁻¹ at ${a}° above the horizontal. Find the horizontal and vertical components, to 2 decimal places.`, [["horizontal =", p2(U * Math.cos(rad(a))), 2], ["vertical =", p2(U * Math.sin(rad(a))), 2]], {
        hints: ["Horizontal U cos α, vertical U sin α.", `${U} cos ${a}° and ${U} sin ${a}°.`], solution: [`${fmt(p2(U * Math.cos(rad(a))), 2)}, ${fmt(p2(U * Math.sin(rad(a))), 2)} m s⁻¹`],
      });
    }),
    E(18, 2, "speed-later", (rng) => {
      const ux = rng.int(3, 20), uy = rng.int(5, 30), t = round(rng.int(5, 30) / 10, 1);
      const vy = uy - g * t;
      return num(`A projectile has initial velocity (${ux}i + ${uy}j) m s⁻¹. Find its speed after ${fmt(t)} s, to 2 decimal places.`, p2(Math.hypot(ux, vy)), {
        dp: 2, unit: "m s⁻¹", hints: ["Horizontal velocity stays the same.", `Vertical: ${uy} − 9.8 × ${fmt(t)} = ${fmt(p2(vy))}.`], solution: [`speed = √(${ux}² + ${fmt(p2(vy))}²) = ${fmt(p2(Math.hypot(ux, vy)), 2)} m s⁻¹`],
      });
    }),
  ],
  [S(18, 3)]: [
    C(18, 3, "time-of-flight", (rng) => {
      const t = round(rng.int(5, 50) / 10, 1), uy = round(4.9 * t, 2);
      return num(`A projectile on level ground has initial vertical velocity ${fmt(uy)} m s⁻¹. Find its time of flight.`, t, {
        unit: "s", hints: ["It lands when the vertical displacement is 0.", `0 = ${fmt(uy)}t − 4.9t².`], solution: [`t = ${fmt(uy)} ÷ 4.9 = ${fmt(t)} s`],
      });
    }),
    E(18, 3, "range-from-components", (rng) => {
      const U = rng.int(10, 40), a = rng.pick([15, 20, 30, 40, 45, 50, 60, 70]);
      const T_ = (2 * U * Math.sin(rad(a))) / g, R = p2(U * Math.cos(rad(a)) * T_);
      return num(`A ball is kicked at ${U} m s⁻¹ at ${a}° above level ground. Find its range, to 2 decimal places.`, R, {
        dp: 2, unit: "m", hints: [`Time of flight = 2 × ${U} sin ${a}° ÷ 9.8 = ${fmt(round(T_, 4))} s.`, `Range = ${U} cos ${a}° × time.`], solution: [`R = ${fmt(R, 2)} m`],
      });
    }),
  ],
  [S(18, 4)]: [
    C(18, 4, "range-formula", (rng) => {
      const U = rng.int(5, 40), a = rng.pick([15, 30, 45, 60, 75]);
      const R = p2((U * U * Math.sin(rad(2 * a))) / g);
      return num(`Use R = U² sin 2α ÷ g to find the range for U = ${U} m s⁻¹ and α = ${a}°, to 2 decimal places.`, R, {
        dp: 2, unit: "m", traps: [T(p2((U * U * Math.sin(rad(a))) / g), "Use sin 2α, not sin α.")],
        hints: [`sin 2α = sin ${2 * a}°.`, `${U * U} × sin ${2 * a}° ÷ 9.8.`], solution: [`R = ${fmt(R, 2)} m`],
      });
    }),
    E(18, 4, "greatest-height-formula", (rng) => {
      const U = rng.int(5, 40), a = rng.pick(ANG);
      const H = p2((U * U * Math.sin(rad(a)) ** 2) / (2 * g));
      return num(`A projectile is launched at ${U} m s⁻¹ at ${a}°. Find its greatest height above the launch point, to 2 decimal places.`, H, {
        dp: 2, unit: "m", hints: ["H = U² sin²α ÷ 2g.", `Vertical component ${fmt(p2(U * Math.sin(rad(a))))} m s⁻¹; 0 = u² − 19.6H.`], solution: [`H = ${fmt(H, 2)} m`],
      });
    }),
  ],
};

/* ===================== Unit 19: Applications of forces ===================== */
const U19 = {
  [S(19, 1)]: [
    C(19, 1, "static-two-strings", (rng) => {
      const m = rng.int(1, 20), a = rng.pick([20, 30, 40, 45, 50, 60]);
      // symmetric strings at angle a to the horizontal: 2T sin a = mg
      return num(`A ${m} kg particle hangs from two strings, each at ${a}° to the horizontal. Find the tension in each string, to 2 decimal places.`, p2((m * g) / (2 * Math.sin(rad(a)))), {
        dp: 2, unit: "N", hints: ["By symmetry the tensions are equal.", `Vertically: 2T sin ${a}° = ${m} × 9.8.`], solution: [`T = ${fmt(p2((m * g) / (2 * Math.sin(rad(a)))), 2)} N`],
      });
    }),
    E(19, 1, "static-horizontal-force", (rng) => {
      const m = rng.int(1, 20), a = rng.pick([10, 15, 20, 25, 30, 35, 40]);
      // string at angle a to vertical, horizontal force P holds it: T cos a = mg, P = T sin a = mg tan a
      return multi(`A ${m} kg particle hangs on a string held at ${a}° to the vertical by a horizontal force P. Find P and the tension T, to 2 decimal places.`, [["P =", p2(m * g * Math.tan(rad(a))), 2], ["T =", p2((m * g) / Math.cos(rad(a))), 2]], {
        hints: ["Vertically: T cos α = mg.", "Horizontally: T sin α = P."], solution: [`T = ${fmt(p2((m * g) / Math.cos(rad(a))), 2)} N`, `P = ${fmt(p2(m * g * Math.tan(rad(a))), 2)} N`],
      });
    }),
  ],
  [S(19, 2)]: [
    C(19, 2, "sign-tension", (rng) => {
      const m = rng.int(1, 30), a = rng.pick([30, 45, 60]);
      return num(`A ${m} kg sign hangs from two symmetric cables, each at ${a}° to the horizontal. Find the tension in each cable, to 2 decimal places.`, p2((m * g) / (2 * Math.sin(rad(a)))), {
        dp: 2, unit: "N", hints: ["Resolve vertically.", `2T sin ${a}° = ${fmt(p2(m * g))}.`], solution: [`T = ${fmt(p2((m * g) / (2 * Math.sin(rad(a)))), 2)} N`],
      });
    }),
    E(19, 2, "three-forces", (rng) => bankMC(rng, [
      ["Three forces keep a particle in equilibrium. Drawn nose to tail, they form…", "a closed triangle", "a straight line", "an open triangle", "They add to zero.", "Zero resultant: the triangle closes."],
      ["Why resolve perpendicular to an unknown force?", "So that force doesn't appear in that equation", "Because it's always vertical", "To make it bigger", "Its perpendicular component is zero.", "One unknown disappears."],
      ["Two strings support a mass symmetrically. What can you say about their tensions?", "They are equal", "One is zero", "They add to the weight", "Symmetry.", "Equal angles give equal tensions."],
    ])),
  ],
  [S(19, 3)]: [
    C(19, 3, "mu-from-angle", (rng) => {
      const a = rng.pick([10, 15, 20, 25, 30, 35, 40]);
      return num(`A block is on the point of slipping down a rough slope at ${a}°. Find μ, to 3 decimal places.`, round(Math.tan(rad(a)), 3), {
        dp: 3, hints: ["Limiting: mg sin α = μ mg cos α.", `μ = tan ${a}°.`], solution: [`μ = ${fmt(round(Math.tan(rad(a)), 3), 3)}`],
      });
    }),
    E(19, 3, "limiting-push", (rng) => {
      const m = rng.int(2, 20), mu = round(rng.int(1, 7) / 10, 1);
      return num(`A ${m} kg box is on rough horizontal ground (μ = ${fmt(mu)}). What horizontal force is needed to make it about to move?`, p2(mu * m * g), {
        unit: "N", hints: ["About to move: F = μR.", `R = ${m} × 9.8.`], solution: [`F = ${fmt(p2(mu * m * g))} N`],
      });
    }),
  ],
  [S(19, 4)]: [
    C(19, 4, "ladder-friction", (rng) => {
      const W = rng.int(100, 400), a = rng.pick([50, 55, 60, 65, 70, 75]);
      // uniform ladder, smooth wall, rough ground, angle a with ground: S = W/(2 tan a) = friction
      const Fr = p2(W / (2 * Math.tan(rad(a))));
      return num(`A uniform ladder of weight ${W} N rests against a smooth wall at ${a}° to the rough ground. Find the friction at the ground, to 2 decimal places.`, Fr, {
        dp: 2, unit: "N", hints: ["Moments about the foot: S × L sin α = W × ½L cos α.", "Horizontally, friction = S (the wall's reaction)."], solution: [`F = ${W} ÷ (2 tan ${a}°) = ${fmt(Fr, 2)} N`],
      });
    }),
    E(19, 4, "ladder-mu", (rng) => {
      const a = rng.pick([50, 55, 60, 65, 70, 75]);
      return num(`A uniform ladder rests against a smooth wall on rough ground, at ${a}° to the ground, and is about to slip. Find μ, to 3 decimal places.`, round(1 / (2 * Math.tan(rad(a))), 3), {
        dp: 3, hints: ["R = W at the ground; F = S = W/(2 tan α).", "μ = F ÷ R = 1/(2 tan α)."], solution: [`μ = ${fmt(round(1 / (2 * Math.tan(rad(a))), 3), 3)}`],
      });
    }),
  ],
  [S(19, 5)]: [
    C(19, 5, "rough-slope-down", (rng) => {
      const a = rng.pick([25, 30, 35, 40, 45, 50]), mu = round(rng.int(1, 4) / 10, 1);
      const acc = p2(g * (Math.sin(rad(a)) - mu * Math.cos(rad(a))));
      if (acc <= 0) return null;
      return num(`A block slides down a rough slope at ${a}° with μ = ${fmt(mu)}. Find its acceleration, to 2 decimal places.`, acc, {
        dp: 2, unit: "m s⁻²", traps: [T(p2(g * Math.sin(rad(a))), "Include friction μ mg cos α up the slope.")],
        hints: ["Along the slope: mg sin α − μ mg cos α = ma.", `a = 9.8(sin ${a}° − ${fmt(mu)} cos ${a}°).`], solution: [`a = ${fmt(acc, 2)} m s⁻²`],
      });
    }),
    E(19, 5, "rough-slope-up", (rng) => {
      const a = rng.pick([10, 15, 20, 25, 30]), mu = round(rng.int(1, 4) / 10, 1);
      const dec = p2(g * (Math.sin(rad(a)) + mu * Math.cos(rad(a))));
      return num(`A block is projected up a rough slope at ${a}° with μ = ${fmt(mu)}. Find its deceleration while moving up, to 2 decimal places.`, dec, {
        dp: 2, unit: "m s⁻²", traps: [T(p2(g * (Math.sin(rad(a)) - mu * Math.cos(rad(a)))), "Moving UP, friction acts DOWN the slope, with gravity.")],
        hints: ["Both gravity's component and friction act down the slope.", `a = 9.8(sin ${a}° + ${fmt(mu)} cos ${a}°).`], solution: [`= ${fmt(dec, 2)} m s⁻²`],
      });
    }),
  ],
  [S(19, 6)]: [
    C(19, 6, "table-pulley", (rng) => {
      const m1 = rng.int(1, 10), m2 = rng.int(1, 10);
      return num(`A ${m1} kg block on a smooth table is joined by a string over a smooth pulley to a hanging ${m2} kg mass. Find the acceleration, to 2 decimal places.`, p2((m2 * g) / (m1 + m2)), {
        dp: 2, unit: "m s⁻²", hints: [`Hanging: ${m2}g − T = ${m2}a. Table: T = ${m1}a.`, `Add: ${m2}g = ${m1 + m2}a.`], solution: [`a = ${fmt(p2((m2 * g) / (m1 + m2)), 2)} m s⁻²`],
      });
    }),
    E(19, 6, "rough-table-pulley", (rng) => {
      const m1 = rng.int(1, 10), m2 = rng.int(1, 10), mu = round(rng.int(1, 5) / 10, 1);
      const acc = p2(((m2 - mu * m1) * g) / (m1 + m2));
      if (acc <= 0) return null;
      return num(`A ${m1} kg block on a rough table (μ = ${fmt(mu)}) is joined over a smooth pulley to a hanging ${m2} kg mass. Find the acceleration, to 2 decimal places.`, acc, {
        dp: 2, unit: "m s⁻²", traps: [T(p2((m2 * g) / (m1 + m2)), "Include friction on the table block.")],
        hints: [`Friction = ${fmt(mu)} × ${m1} × 9.8.`, `${m2}g − ${fmt(mu)} × ${m1}g = ${m1 + m2}a.`], solution: [`a = ${fmt(acc, 2)} m s⁻²`],
      });
    }),
  ],
};

/* ===================== Unit 20: Further kinematics ===================== */
const U20 = {
  [S(20, 1)]: [
    C(20, 1, "vector-v", (rng) => {
      const u = [rng.int(-5, 5), rng.int(-5, 5)], a = [nz(rng, -3, 3), rng.int(-3, 3)], t = rng.int(1, 6);
      const v = [u[0] + a[0] * t, u[1] + a[1] * t];
      return multi(`u = (${vec(...u)}) m s⁻¹, a = (${vec(...a)}) m s⁻². Find v after ${t} s, as xi + yj.`, [["x =", v[0]], ["y =", v[1]]], {
        hints: ["v = u + at, component by component.", `i: ${u[0]} + ${a[0]} × ${t}.`], solution: [`v = (${vec(...v)}) m s⁻¹`],
      });
    }),
    E(20, 1, "vector-position", (rng) => {
      const r0 = [rng.int(-5, 5), rng.int(-5, 5)], u = [rng.int(-4, 4), rng.int(-4, 4)], a = [rng.int(-2, 2) * 2, rng.int(-2, 2) * 2], t = rng.int(1, 5);
      const r = [r0[0] + u[0] * t + (a[0] * t * t) / 2, r0[1] + u[1] * t + (a[1] * t * t) / 2];
      return multi(`A particle starts at (${vec(...r0)}) m with velocity (${vec(...u)}) m s⁻¹ and acceleration (${vec(...a)}) m s⁻². Find its position after ${t} s, as xi + yj.`, [["x =", r[0]], ["y =", r[1]]], {
        hints: ["r = r₀ + ut + ½at².", "Work out each component separately."], solution: [`r = (${vec(...r)}) m`],
      });
    }),
  ],
  [S(20, 2)]: [
    C(20, 2, "projectile-vector", (rng) => {
      const ux = rng.int(2, 15), uy = round(rng.int(5, 30), 0), t = round(rng.int(5, 30) / 10, 1);
      return multi(`A projectile starts at O with velocity (${ux}i + ${uy}j) m s⁻¹. Find its position vector after ${fmt(t)} s, as xi + yj (2 d.p.).`, [["x =", round(ux * t, 2), 2], ["y =", p2(uy * t - 4.9 * t * t), 2]], {
        hints: ["r = ut + ½at² with a = −9.8j.", `j: ${uy} × ${fmt(t)} − 4.9 × ${fmt(t)}².`], solution: [`r = ${fmt(round(ux * t, 2))}i + ${fmt(p2(uy * t - 4.9 * t * t))}j`],
      });
    }),
    E(20, 2, "projectile-top-time", (rng) => {
      const t = round(rng.int(5, 40) / 10, 1), uy = round(g * t, 2), ux = rng.int(2, 15);
      return num(`A projectile has initial velocity (${ux}i + ${fmt(uy)}j) m s⁻¹. When does it reach its highest point?`, t, {
        unit: "s", hints: ["At the top the j-component of velocity is 0.", `${fmt(uy)} − 9.8t = 0.`], solution: [`t = ${fmt(t)} s`],
      });
    }),
  ],
  [S(20, 3)]: [
    C(20, 3, "v-to-a", (rng) => {
      const a = nz(rng, -3, 4), b = rng.int(-6, 6), t = rng.int(0, 5);
      return num(`v = ${co(a, "t²")} ${b < 0 ? "−" : "+"} ${Math.abs(b)}t. Find the acceleration when t = ${t}.`, 2 * a * t + b, {
        unit: "m s⁻²", hints: ["a = dv/dt.", `a = ${2 * a}t ${b < 0 ? "−" : "+"} ${Math.abs(b)}.`], solution: [`a = ${2 * a * t + b} m s⁻²`],
      });
    }),
    E(20, 3, "exp-velocity", (rng) => {
      const A = rng.int(2, 20), k = round(rng.int(1, 10) / 10, 1), t = rng.int(1, 5);
      // v = A e^(−kt): distance from 0 to t = (A/k)(1 − e^(−kt))
      const s = round((A / k) * (1 - Math.exp(-k * t)), 3);
      return num(`v = ${A}e^(−${fmt(k)}t). Find the distance travelled from t = 0 to t = ${t}, to 3 decimal places.`, s, {
        dp: 3, hints: [`s = ∫v dt = −${fmt(round(A / k, 4))}e^(−${fmt(k)}t).`, "Top limit minus bottom limit."], solution: [`s = ${fmt(round(A / k, 4))}(1 − e^(−${fmt(round(k * t, 2))})) = ${fmt(s, 3)} m`],
      });
    }),
  ],
  [S(20, 4)]: [
    C(20, 4, "differentiate-r", (rng) => {
      const a = nz(rng, -4, 4), b = nz(rng, -4, 4), c = rng.int(-5, 5), t = rng.int(0, 4);
      // r = a t² i + (b t³ + c t) j → v = 2a t i + (3b t² + c) j
      return multi(`r = ${co(a, "t²")}i + (${co(b, "t³")} ${c < 0 ? "−" : "+"} ${Math.abs(c)}t)j. Find the velocity when t = ${t}, as xi + yj.`, [["x =", 2 * a * t], ["y =", 3 * b * t * t + c]], {
        hints: ["Differentiate each component.", `v = ${2 * a}ti + (${3 * b}t² ${c < 0 ? "−" : "+"} ${Math.abs(c)})j.`], solution: [`v = (${vec(2 * a * t, 3 * b * t * t + c)}) m s⁻¹`],
      });
    }),
    E(20, 4, "speed-from-r", (rng) => {
      const a = nz(rng, -4, 4), b = nz(rng, -4, 4), t = rng.int(1, 4);
      const v = [2 * a * t, 3 * b * t * t];
      return num(`r = ${co(a, "t²")}i + ${co(b, "t³")}j. Find the speed when t = ${t}, to 2 decimal places.`, p2(Math.hypot(...v)), {
        dp: 2, unit: "m s⁻¹", hints: [`v = ${2 * a}ti + ${3 * b}t²j.`, `At t = ${t}: (${vec(...v)}).`], solution: [`speed = ${fmt(p2(Math.hypot(...v)), 2)} m s⁻¹`],
      });
    }),
  ],
  [S(20, 5)]: [
    C(20, 5, "integrate-a-vector", (rng) => {
      const a = [rng.int(1, 4) * 2, nz(rng, -4, 4)], u = [rng.int(-4, 4), rng.int(-4, 4)], t = rng.int(1, 4);
      // a = (a0 t) i + a1 j → v = (a0 t²/2 + u0) i + (a1 t + u1) j
      const v = [(a[0] * t * t) / 2 + u[0], a[1] * t + u[1]];
      return multi(`a = ${a[0]}ti + ${co(a[1], "j")} m s⁻², and v = (${vec(...u)}) m s⁻¹ when t = 0. Find v when t = ${t}, as xi + yj.`, [["x =", v[0]], ["y =", v[1]]], {
        hints: ["Integrate each component and add the initial velocity.", `v = (${fmt(a[0] / 2)}t² + ${u[0]})i + (${a[1]}t + ${u[1]})j.`], solution: [`v = (${vec(...v)}) m s⁻¹`],
      });
    }),
    E(20, 5, "integrate-v-vector", (rng) => {
      const p = rng.int(1, 4), q = nz(rng, -4, 4), t = rng.int(1, 4);
      // v = 2p t i + 3q t² j, r = 0 at t = 0 → r = p t² i + q t³ j
      return multi(`v = ${2 * p}ti + ${co(3 * q, "t²")}j m s⁻¹, and the particle starts at O. Find its position when t = ${t}, as xi + yj.`, [["x =", p * t * t], ["y =", q * t ** 3]], {
        hints: ["Integrate each component; r = 0 at t = 0 so no constant.", `r = ${co(p, "t²")}i + ${co(q, "t³")}j.`], solution: [`r = (${vec(p * t * t, q * t ** 3)}) m`],
      });
    }),
  ],
};

/* ============ Unit 21 lesson 5: Statistics and mechanics mixed practice ============ */
const U21 = {
  [S(21, 5)]: [
    C(21, 5, "mixed-stats", (rng) => {
      const kind = rng.int(0, 1);
      if (kind === 0) {
        const n = rng.int(5, 12), p = rng.pick([0.2, 0.3, 0.5]), r = rng.int(1, n - 1);
        return num(`X ~ B(${n}, ${fmt(p)}). Find P(X = ${r}), to 4 decimal places.`, round(binomPmf(n, p, r), 4), { dp: 4, hints: ["P(X = r) = ⁿCᵣ pʳ(1 − p)ⁿ⁻ʳ.", `${nCr(n, r)} × ${fmt(p)}^${r} × ${fmt(round(1 - p, 1))}^${n - r}.`], solution: [`= ${fmt(round(binomPmf(n, p, r), 4), 4)}`] });
      }
      const mu = rng.int(20, 80), s = rng.int(2, 10), x = mu + rng.int(-20, 20) / 10 * s;
      return num(`X ~ N(${mu}, ${s}²). Find P(X < ${fmt(round(x, 1))}), to 4 decimal places.`, round(normalCdf(round(x, 1), mu, s), 4), { dp: 4, hints: ["Use the normal CD function.", `σ = ${s}.`], solution: [`= ${fmt(round(normalCdf(round(x, 1), mu, s), 4), 4)}`] });
    }),
    E(21, 5, "mixed-mechanics", (rng) => {
      const kind = rng.int(0, 1);
      if (kind === 0) {
        const m = rng.int(2, 10), a = rng.int(1, 5), R = rng.int(1, 20);
        return num(`A ${m} kg particle is pulled by ${m * a + R} N against a resistance of ${R} N. Find its acceleration.`, a, { unit: "m s⁻²", hints: ["F = ma with the resultant force.", `${m * a + R} − ${R} = ${m}a.`], solution: [`a = ${a} m s⁻²`] });
      }
      const u = rng.int(5, 25), a2 = rng.pick([30, 45, 60]);
      return num(`A projectile is launched at ${u} m s⁻¹ at ${a2}° above level ground. Find its time of flight, to 2 decimal places.`, p2((2 * u * Math.sin(rad(a2))) / g), { dp: 2, unit: "s", hints: ["Vertical: 0 = (U sin α)t − 4.9t².", `t = 2 × ${u} sin ${a2}° ÷ 9.8.`], solution: [`t = ${fmt(p2((2 * u * Math.sin(rad(a2))) / g), 2)} s`] });
    }),
  ],
};

export const Y13C_GENERATORS = { ...U13, ...U14, ...U15, ...U16, ...U17, ...U18, ...U19, ...U20, ...U21 };
