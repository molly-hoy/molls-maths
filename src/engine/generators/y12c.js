/* ==========================================================================
   Year 12 Statistics and Mechanics generators (Units 13–23)
   light format: one core and one extend generator per lesson
   --------------------------------------------------------------------------
   Statistics answers use stats.js (binomial and normal maths), which agrees
   with a calculator. Mechanics uses g = 9.8 m s⁻². Decimal answers say how
   many places to give (dp). Every question goes through tidy() (tidy.js).
   ========================================================================== */
import { fmt, gcd, round } from "../numbers.js";
import { binomCdf, binomPmf, nCr } from "../stats.js";
import { core, extend, frac, mc3, multi, num, T } from "./helpers.js";
import { tidyQuestion } from "./tidy.js";

const S = (u, l) => `y12-u${u}-l${l}`;
const C = (u, l, name, make, v = () => true) => core(S(u, l), name, name, (rng) => tidyQuestion(make(rng)), v);
const E = (u, l, name, make, v = () => true) => extend(S(u, l), name, name, (rng) => tidyQuestion(make(rng)), v);
const nz = (rng, a, b) => rng.nonZero(a, b);
const sg = (n) => `${n < 0 ? "−" : "+"} ${fmt(Math.abs(n))}`;
const co = (n, v) => `${n === 1 ? "" : n === -1 ? "−" : fmt(n)}${v}`;
const vec = (x, y) => [[x, "i"], [y, "j"]].filter(([c]) => c !== 0).map(([c, u], i) => (i === 0 ? co(c, u) : `${c < 0 ? "−" : "+"} ${Math.abs(c) === 1 ? "" : Math.abs(c)}${u}`)).join(" ") || "0";
const g = 9.8;
const bankMC = (rng, bank) => {
  const [prompt, right, w1, w2, hint, why] = rng.pick(bank);
  return mc3(rng, prompt, right, [[w1, hint], [w2, hint]], { hints: [hint, "Check each option against the definition."], solution: [why] });
};
const sum = (a) => a.reduce((s, x) => s + x, 0);
const F = (n, d) => { const k = gcd(Math.abs(n), Math.abs(d)) || 1; return [n / k, d / k]; };
const fText = (n, d) => { const [a, b] = F(n, d); return b === 1 ? fmt(a) : `{${a}/${b}}`; };
// Position-based quartile from the lesson's rule: n/4 whole → average with next; else round up
const quartile = (sorted, frac4) => {
  const pos = (sorted.length * frac4) / 4;
  return Number.isInteger(pos) ? (sorted[pos - 1] + sorted[pos]) / 2 : sorted[Math.ceil(pos) - 1];
};

/* ========================= Unit 13: Data collection ========================= */
const U13 = {
  [S(13, 1)]: [
    C(13, 1, "population-words", (rng) => bankMC(rng, [
      ["What is a census?", "Data collected from every member of the population", "Data from a randomly chosen group", "A list of the whole population", "Think 'everyone'.", "A census includes the whole population."],
      ["What is a sampling frame?", "A list of the members of the population that can be sampled", "The people chosen for the sample", "The whole population's data", "It's a list you choose from.", "The frame is the list; the sample is chosen from it."],
      ["Why must a factory testing how long batteries last use a sample?", "Testing destroys the batteries", "A census is always biased", "Samples are more accurate", "What happens to a tested battery?", "Testing to failure would use up the whole stock."],
      ["Which is an advantage of a sample over a census?", "It is quicker and cheaper", "It is always completely accurate", "It includes everyone", "Compare effort and cost.", "Samples need less time and money."],
      ["What is a sampling unit?", "One individual member of the population that could be chosen", "The number of people in the sample", "The unit of measurement", "It's one member.", "Each person or item that could be picked is a sampling unit."],
    ])),
    E(13, 1, "census-or-sample", (rng) => bankMC(rng, [
      ["A school wants every pupil's opinion on the uniform; there are 120 pupils. Best choice?", "A census", "An opportunity sample", "A sample of 5", "The population is small and easy to reach.", "With only 120 pupils, asking everyone is practical and accurate."],
      ["A sweet maker checks that each jar is sealed by opening it. Best choice?", "A sample", "A census", "Neither", "Opening the jar spoils it.", "Destructive testing needs a sample."],
      ["The government counts every household every ten years. This is…", "a census", "a stratified sample", "a quota sample", "Every household is included.", "Including everyone is a census."],
      ["Which is a disadvantage of a census?", "It takes a long time and is expensive", "It may not represent the population", "It needs a sampling frame of strata", "Think about the effort involved.", "Collecting from everyone is slow and costly."],
    ])),
  ],
  [S(13, 2)]: [
    C(13, 2, "stratified-number", (rng) => {
      const N = rng.int(4, 20) * 50, n = rng.pick([20, 25, 40, 50, 60, 80, 100]);
      const k = N / gcd(N, n);   // stratum must be a multiple of N/gcd so the answer is whole
      const s = k * rng.int(1, Math.floor((N - 1) / k));
      if (s <= 0 || s >= N) return null;
      const ans = (s * n) / N;
      return num(`A population of ${N} includes ${s} adults. How many adults should be in a stratified sample of ${n}?`, ans, {
        traps: [T(s / n, `Use (${s} ÷ ${N}) × ${n}.`)],
        hints: ["Each group is sampled in proportion to its size.", `${s}/${N} × ${n}.`], solution: [`${s} ÷ ${N} × ${n} = ${fmt(ans)}`],
      });
    }),
    E(13, 2, "systematic-k", (rng) => {
      const n = rng.pick([10, 20, 25, 40, 50]), N = n * rng.int(4, 30);
      return num(`A systematic sample of ${n} is taken from an ordered list of ${N}. Every kth item is chosen. Find k.`, N / n, {
        traps: [T(n / N, "k = population size ÷ sample size.")],
        hints: ["Spread the sample evenly through the list.", `${N} ÷ ${n}.`], solution: [`k = ${N / n}`, `Start at a random number from 1 to ${N / n}`],
      });
    }),
  ],
  [S(13, 3)]: [
    C(13, 3, "name-method", (rng) => bankMC(rng, [
      ["An interviewer must ask 20 men and 20 women, choosing who to ask. Which method?", "Quota sampling", "Stratified sampling", "Simple random sampling", "Who chooses the people?", "Fixed numbers per group, chosen by the interviewer: quota."],
      ["A student asks the first 30 people leaving the canteen. Which method?", "Opportunity sampling", "Systematic sampling", "Quota sampling", "They used whoever was available.", "Convenience/opportunity sampling."],
      ["Every 10th name on a register is chosen, starting at a random name. Which method?", "Systematic sampling", "Opportunity sampling", "Quota sampling", "Regular intervals from a list.", "Every kth item: systematic."],
      ["Names are numbered and random numbers choose 50 of them. Which method?", "Simple random sampling", "Quota sampling", "Systematic sampling", "Every group of 50 is equally likely.", "Random numbers on a numbered list: simple random."],
    ])),
    E(13, 3, "bias-reason", (rng) => bankMC(rng, [
      ["Why might asking people at a train station at 8 am about commuting be biased?", "It over-represents people who commute by train", "The sample is too large", "It uses random numbers", "Who is at a station at 8 am?", "Commuters by train are over-represented."],
      ["Which is an advantage of quota sampling?", "No sampling frame is needed", "It is completely random", "It is never biased", "Think about the list.", "Quota sampling doesn't need a list of the population."],
      ["Which is a disadvantage of opportunity sampling?", "It is unlikely to represent the population", "It needs a sampling frame", "It is very slow", "Who gets included?", "Only people who happen to be there are sampled."],
      ["Why does stratified sampling need a sampling frame?", "To list members of each stratum", "To choose people by opportunity", "To set interviewer quotas", "Strata must be sampled randomly.", "Random selection within each stratum needs a list."],
    ])),
  ],
  [S(13, 4)]: [
    C(13, 4, "data-type", (rng) => {
      const [item, right, w1, w2] = rng.pick([
        ["the number of pets in a household", "Quantitative, discrete", "Quantitative, continuous", "Qualitative"],
        ["a person's height", "Quantitative, continuous", "Quantitative, discrete", "Qualitative"],
        ["the colour of a car", "Qualitative", "Quantitative, discrete", "Quantitative, continuous"],
        ["the time to run 100 m", "Quantitative, continuous", "Quantitative, discrete", "Qualitative"],
        ["shoe size", "Quantitative, discrete", "Quantitative, continuous", "Qualitative"],
        ["daily rainfall in mm", "Quantitative, continuous", "Quantitative, discrete", "Qualitative"],
        ["favourite sport", "Qualitative", "Quantitative, continuous", "Quantitative, discrete"],
        ["the mass of an apple", "Quantitative, continuous", "Quantitative, discrete", "Qualitative"],
      ]);
      return mc3(rng, `What type of data is ${item}?`, right, [[w1, "Can it take any value in a range, or only certain values?"], [w2, "Is it a number?"]], {
        hints: ["Qualitative = words; quantitative = numbers.", "Discrete = only certain values; continuous = any value in a range."], solution: [`${item}: ${right.toLowerCase()}`],
      });
    }),
    E(13, 4, "class-width-midpoint", (rng) => {
      const lo = round(rng.int(0, 40) / 2, 1), w = rng.pick([2, 2.5, 4, 5, 10, 0.5]);
      const hi = round(lo + w, 2);
      return multi(`For the class ${fmt(lo)} ≤ x < ${fmt(hi)}, find the class width and the midpoint.`, [["width =", w], ["midpoint =", round(lo + w / 2, 3)]], {
        hints: ["Width = upper − lower boundary.", "Midpoint = (lower + upper) ÷ 2."], solution: [`width = ${fmt(w)}`, `midpoint = ${fmt(round(lo + w / 2, 3))}`],
      });
    }),
  ],
  [S(13, 5)]: [
    C(13, 5, "lds-ideas", (rng) => bankMC(rng, [
      ["In weather data, 'tr' for rainfall means…", "a trace: less than 0.05 mm", "the value was not recorded", "exactly 0 mm", "It's a tiny amount.", "Trace means too small to measure accurately."],
      ["Why should 'n/a' values be left out of a mean?", "They are missing values, not zeros", "They are outliers", "They are always very large", "What does n/a mean?", "Missing data isn't a measurement."],
      ["Why might data from one weather station not represent the whole country?", "Weather varies between places", "The sample is too large", "The data is qualitative", "Think about location.", "Coastal and inland, north and south differ."],
      ["Why use a spreadsheet with the large data set?", "It handles many values and calculations quickly", "It removes all bias", "It makes the data qualitative", "Think about the size of the data.", "Large data sets are slow to process by hand."],
    ])),
    E(13, 5, "lds-clean-mean", (rng) => {
      const vals = Array.from({ length: 6 }, () => rng.int(5, 30));
      const k = rng.int(0, 5), shown = vals.map((v, i) => (i === k ? "n/a" : String(v)));
      const good = vals.filter((_, i) => i !== k), m = round(sum(good) / good.length, 2);
      return num(`Daily values from a data set: ${shown.join(", ")}. Leaving out the missing value, find the mean, to 2 decimal places.`, m, {
        dp: 2, traps: [T(round(sum(good) / 6, 2), "Divide by the number of values you actually have.")],
        hints: ["Ignore 'n/a': it isn't a number.", `Add the ${good.length} values and divide by ${good.length}.`], solution: [`${sum(good)} ÷ ${good.length} = ${fmt(m, 2)}`],
      });
    }),
  ],
};

/* ================== Unit 14: Measures of location and spread ================== */
const U14 = {
  [S(14, 1)]: [
    C(14, 1, "mean-from-table", (rng) => {
      const xs = [0, 1, 2, 3, 4], fs = xs.map(() => rng.int(1, 12));
      const m = round(sum(xs.map((x, i) => x * fs[i])) / sum(fs), 2);
      return num(`x: ${xs.join(", ")} with frequencies ${fs.join(", ")}. Find the mean, to 2 decimal places.`, m, {
        dp: 2, traps: [T(round(sum(xs.map((x, i) => x * fs[i])) / 5, 2), "Divide by the total frequency, not the number of rows.")],
        hints: ["x̄ = Σfx ÷ Σf.", `Σfx = ${sum(xs.map((x, i) => x * fs[i]))}, Σf = ${sum(fs)}.`], solution: [`${sum(xs.map((x, i) => x * fs[i]))} ÷ ${sum(fs)} = ${fmt(m, 2)}`],
      });
    }),
    E(14, 1, "grouped-mean", (rng) => {
      const w = rng.pick([5, 10, 20]), start = rng.int(0, 4) * w, fs = [rng.int(2, 15), rng.int(5, 20), rng.int(5, 20), rng.int(1, 10)];
      const mids = fs.map((_, i) => start + w * i + w / 2), m = round(sum(mids.map((x, i) => x * fs[i])) / sum(fs), 2);
      const classes = fs.map((_, i) => `${start + w * i} ≤ x < ${start + w * (i + 1)}`);
      return num(`Estimate the mean of this grouped data, to 2 decimal places: ${classes.map((c, i) => `${c}: ${fs[i]}`).join("; ")}.`, m, {
        dp: 2, hints: ["Use the midpoint of each class.", `Midpoints ${mids.join(", ")}; x̄ ≈ Σfx ÷ Σf.`], solution: [`Σfx = ${sum(mids.map((x, i) => x * fs[i]))}, Σf = ${sum(fs)}`, `x̄ ≈ ${fmt(m, 2)}`],
      });
    }),
  ],
  [S(14, 2)]: [
    C(14, 2, "lower-quartile", (rng) => {
      const n = rng.int(7, 12), data = Array.from({ length: n }, () => rng.int(1, 40)).sort((a, b) => a - b), up = rng.chance(0.5);
      const q = quartile(data, up ? 3 : 1);
      return num(`Find the ${up ? "upper" : "lower"} quartile of: ${rng.shuffle([...data]).join(", ")}.`, q, {
        hints: ["Put the data in order first.", `${up ? "3n/4" : "n/4"} = ${(n * (up ? 3 : 1)) / 4}: if it's whole, average that value and the next; otherwise round up.`], solution: [`Ordered: ${data.join(", ")}`, `${up ? "Q₃" : "Q₁"} = ${fmt(q)}`],
      });
    }),
    E(14, 2, "interpolate-median", (rng) => {
      const w = rng.pick([5, 10, 20]), lo = rng.int(1, 6) * w, cfBefore = rng.int(5, 30), f = rng.int(8, 30), n = 2 * (cfBefore + rng.int(1, f - 1));
      const pos = n / 2, med = round(lo + ((pos - cfBefore) / f) * w, 2);
      return num(`Of ${n} values, ${cfBefore} are below ${lo}. The class ${lo} ≤ x < ${lo + w} has frequency ${f}. Estimate the median by interpolation, to 2 decimal places.`, med, {
        dp: 2, hints: [`The median is the ${pos}th value, in this class.`, `${lo} + ((${pos} − ${cfBefore}) ÷ ${f}) × ${w}.`], solution: [`= ${fmt(med, 2)}`],
      });
    }),
  ],
  [S(14, 3)]: [
    C(14, 3, "iqr", (rng) => {
      const q1 = round(rng.int(10, 80) / 2, 1), q3 = round(q1 + rng.int(2, 40) / 2, 1);
      return num(`Q₁ = ${fmt(q1)} and Q₃ = ${fmt(q3)}. Find the interquartile range.`, round(q3 - q1, 1), {
        traps: [T(round(q3 + q1, 1), "IQR = Q₃ − Q₁.")], hints: ["IQR = Q₃ − Q₁.", `${fmt(q3)} − ${fmt(q1)}.`], solution: [`= ${fmt(round(q3 - q1, 1))}`],
      });
    }),
    E(14, 3, "range-and-iqr", (rng) => {
      const n = 8, data = Array.from({ length: n }, () => rng.int(1, 50)).sort((a, b) => a - b);
      const q1 = quartile(data, 1), q3 = quartile(data, 3);
      return multi(`For ${rng.shuffle([...data]).join(", ")}, find the range and the interquartile range.`, [["range =", data[n - 1] - data[0]], ["IQR =", q3 - q1]], {
        hints: ["Order the data.", "n = 8: Q₁ averages the 2nd and 3rd values; Q₃ the 6th and 7th."], solution: [`Ordered: ${data.join(", ")}`, `range = ${data[n - 1] - data[0]}, Q₁ = ${fmt(q1)}, Q₃ = ${fmt(q3)}, IQR = ${fmt(q3 - q1)}`],
      });
    }),
  ],
  [S(14, 4)]: [
    C(14, 4, "variance-summary", (rng) => {
      const n = rng.int(5, 20), mean = rng.int(2, 20), varr = rng.int(1, 25);
      const Sx = n * mean, Sxx = n * (varr + mean * mean);
      return num(`n = ${n}, Σx = ${Sx}, Σx² = ${Sxx}. Find the variance.`, varr, {
        traps: [T(Sxx / n, "Subtract the square of the mean."), T(Math.sqrt(varr), "That's the standard deviation; the variance is σ².")].filter((t) => t.value !== varr),
        hints: ["σ² = Σx²/n − (Σx/n)².", `${Sxx}/${n} − ${mean}².`], solution: [`${Sxx / n} − ${mean * mean} = ${varr}`],
      });
    }),
    E(14, 4, "sd-from-data", (rng) => {
      const data = Array.from({ length: rng.int(4, 6) }, () => rng.int(1, 20)), n = data.length;
      const m = sum(data) / n, v = sum(data.map((x) => x * x)) / n - m * m, sd = round(Math.sqrt(v), 3);
      return num(`Find the standard deviation of ${data.join(", ")}, to 3 decimal places.`, sd, {
        dp: 3, hints: ["Find Σx and Σx².", `Σx = ${sum(data)}, Σx² = ${sum(data.map((x) => x * x))}; σ = √(Σx²/n − x̄²).`], solution: [`σ² = ${fmt(round(v, 4))}`, `σ = ${fmt(sd, 3)}`],
      });
    }),
  ],
  [S(14, 5)]: [
    C(14, 5, "coding-mean", (rng) => {
      const a = rng.int(10, 200), b = rng.pick([1, 2, 5, 10]), ym = round(rng.int(-50, 50) / 10, 1);
      const xm = round(b * ym + a, 2);
      return num(`Data is coded using y = ${b === 1 ? `x − ${a}` : `(x − ${a})/${b}`}. ȳ = ${fmt(ym)}. Find x̄.`, xm, {
        traps: [T(round((ym - a) / b, 2), "Undo the coding: x = " + (b === 1 ? "" : b) + "y + " + a + ".")],
        hints: [`x = ${b === 1 ? "" : b}y + ${a}.`, `x̄ = ${b === 1 ? "" : b + " × "}${fmt(ym)} + ${a}.`], solution: [`x̄ = ${fmt(xm)}`],
      });
    }),
    E(14, 5, "coding-sd", (rng) => {
      const a = rng.int(10, 200), b = rng.pick([2, 4, 5, 10, 0.5]), sy = round(rng.int(5, 40) / 10, 1);
      return num(`Data is coded using y = (x − ${a})/${fmt(b)}. σᵧ = ${fmt(sy)}. Find σₓ.`, round(b * sy, 2), {
        traps: [T(round(b * sy + a, 2), "Shifting data doesn't change the spread: only multiply by " + fmt(b) + ".")],
        hints: ["Subtracting a doesn't change the standard deviation.", `σₓ = ${fmt(b)} × σᵧ.`], solution: [`σₓ = ${fmt(round(b * sy, 2))}`],
      });
    }),
  ],
};

/* =================== Unit 15: Representations of data =================== */
const U15 = {
  [S(15, 1)]: [
    C(15, 1, "outlier-limits", (rng) => {
      const q1 = rng.int(5, 50), iqr = rng.int(2, 20) * 2, q3 = q1 + iqr, up = rng.chance(0.5);
      const lim = up ? q3 + 1.5 * iqr : q1 - 1.5 * iqr;
      return num(`Q₁ = ${q1}, Q₃ = ${q3}. Outliers are more than 1.5 × IQR beyond the quartiles. Find the ${up ? "upper" : "lower"} limit.`, lim, {
        traps: [T(up ? q3 + iqr : q1 - iqr, "Use 1.5 × IQR.")],
        hints: [`IQR = ${iqr}.`, `${up ? `${q3} + 1.5 × ${iqr}` : `${q1} − 1.5 × ${iqr}`}.`], solution: [`= ${fmt(lim)}`],
      });
    }),
    E(15, 1, "outlier-sd", (rng) => {
      const m = rng.int(20, 80), s = rng.int(2, 10), k = rng.pick([2, 3]), x = m + rng.pick([1, -1]) * rng.int(1, 4 * s);
      const out = Math.abs(x - m) > k * s;
      return mc3(rng, `x̄ = ${m}, σ = ${s}. Outliers are more than ${k} standard deviations from the mean. Is ${x} an outlier?`, out ? "Yes" : "No", [[out ? "No" : "Yes", `The limits are ${m - k * s} and ${m + k * s}.`], ["It can't be decided", "The rule gives clear limits."]], {
        hints: [`Limits: ${m} ± ${k} × ${s}.`, `${m - k * s} to ${m + k * s}.`], solution: [`${x} is ${out ? "outside" : "inside"} ${m - k * s} to ${m + k * s}`],
      });
    }),
  ],
  [S(15, 2)]: [
    C(15, 2, "box-plot-read", (rng) => {
      const lo = rng.int(0, 20), q1 = lo + rng.int(2, 10), med = q1 + rng.int(1, 8), q3 = med + rng.int(1, 8), hi = q3 + rng.int(2, 12);
      const kind = rng.int(0, 2);
      const label = ["the median", "the interquartile range", "the range"][kind], ans = [med, q3 - q1, hi - lo][kind];
      return num(`A box plot shows: lowest ${lo}, Q₁ ${q1}, median ${med}, Q₃ ${q3}, highest ${hi}. Find ${label}.`, ans, {
        hints: ["Read the five values.", kind === 1 ? "IQR = Q₃ − Q₁." : kind === 2 ? "Range = highest − lowest." : "The line inside the box."], solution: [`${label} = ${ans}`],
      });
    }),
    E(15, 2, "box-plot-compare", (rng) => bankMC(rng, [
      ["Box plot A has median 30, IQR 10; B has median 30, IQR 20. Which is true?", "B's data is more spread out", "A's values are higher", "They are identical", "Compare the box widths.", "Same median, B has a larger IQR."],
      ["What fraction of data lies between the median and Q₃?", "A quarter", "A half", "Three quarters", "Quartiles split data into four.", "Median to Q₃ holds 25%."],
      ["Why are outliers drawn separately on a box plot?", "So they don't stretch the whiskers", "Because they are errors", "To show the mean", "Whiskers show the main data.", "Whiskers end at the last non-outlier."],
      ["Group A's median is 45 and B's is 38. In context this means…", "A's values were typically higher", "A's values were more consistent", "B had more values", "The median is an average.", "A higher median means typically higher values."],
    ])),
  ],
  [S(15, 3)]: [
    C(15, 3, "cumulative-totals", (rng) => {
      const fs = [rng.int(1, 10), rng.int(3, 15), rng.int(3, 15), rng.int(1, 10)], k = rng.int(1, 3);
      const cf = fs.map((_, i) => sum(fs.slice(0, i + 1)));
      return num(`Frequencies are ${fs.join(", ")}. Find the cumulative frequency for class ${k + 1}.`, cf[k], {
        traps: [T(fs[k], "Cumulative frequency is a running total.")],
        hints: ["Add the frequencies up to and including that class.", `${fs.slice(0, k + 1).join(" + ")}.`], solution: [`= ${cf[k]}`],
      });
    }),
    E(15, 3, "cf-position", (rng) => {
      const n = rng.int(10, 50) * 4, which = rng.int(0, 2);
      const label = ["the lower quartile", "the median", "the upper quartile"][which], pos = [n / 4, n / 2, (3 * n) / 4][which];
      return num(`A cumulative frequency graph has total ${n}. At what cumulative frequency do you read ${label}?`, pos, {
        hints: ["Q₁ at n/4, median at n/2, Q₃ at 3n/4.", `n = ${n}.`], solution: [`${pos}`],
      });
    }),
  ],
  [S(15, 4)]: [
    C(15, 4, "frequency-density", (rng) => {
      const w = rng.pick([2, 4, 5, 10, 20, 25]), fd = round(rng.int(1, 40) / 2, 1), f = round(fd * w, 1);
      const find = rng.chance(0.5);
      if (find) return num(`A class has width ${w} and frequency ${fmt(f)}. Find the frequency density.`, fd, { traps: [T(f * w, "Frequency density = frequency ÷ width.")], hints: ["FD = frequency ÷ class width.", `${fmt(f)} ÷ ${w}.`], solution: [`= ${fmt(fd)}`] });
      return num(`A histogram bar has width ${w} and frequency density ${fmt(fd)}. Find the frequency.`, f, { traps: [T(round(fd / w, 3), "Frequency = density × width.")], hints: ["Area = frequency.", `${fmt(fd)} × ${w}.`], solution: [`= ${fmt(f)}`] });
    }),
    E(15, 4, "histogram-scale", (rng) => {
      const k = rng.pick([2, 4, 5, 0.5]), f1 = rng.int(5, 30), area1 = f1 * k, f2 = rng.int(5, 40);
      return num(`In a histogram, area is proportional to frequency. A bar of area ${fmt(area1)} cm² represents a frequency of ${f1}. What area represents a frequency of ${f2}?`, round(f2 * k, 2), {
        hints: [`1 unit of frequency = ${fmt(area1)} ÷ ${f1} = ${fmt(k)} cm².`, `${f2} × ${fmt(k)}.`], solution: [`= ${fmt(round(f2 * k, 2))} cm²`],
      });
    }),
  ],
  [S(15, 5)]: [
    C(15, 5, "choose-measures", (rng) => bankMC(rng, [
      ["Data has extreme outliers. Which measures should you compare?", "Median and IQR", "Mean and standard deviation", "Mode and range", "Which measures ignore extremes?", "Median and IQR aren't affected by outliers."],
      ["Town A's standard deviation is smaller than B's. In context…", "A's values are more consistent", "A's values are higher", "A has more data", "SD measures spread.", "Smaller spread means more consistent."],
      ["A good comparison of two data sets includes…", "a location and a spread, both in context", "only the means", "only the ranges", "Two features.", "Compare an average and a spread, saying what they mean."],
      ["Why not compare A's mean with B's median?", "You should compare like with like", "Means are always larger", "Medians can't be compared", "Fair comparison.", "Use the same measure for both."],
    ])),
    E(15, 5, "compare-means", (rng) => {
      const a = round(rng.int(100, 300) / 10, 1), b = round(a + nz(rng, -40, 40) / 10, 1);
      const higher = a > b ? "A" : "B";
      return mc3(rng, `Group A mean ${fmt(a)} °C, group B mean ${fmt(b)} °C. Which statement is correct?`, `Group ${higher} was warmer on average`, [[`Group ${higher === "A" ? "B" : "A"} was warmer on average`, "Compare the means."], [`Group ${higher} was more consistent`, "Consistency is about spread, not the mean."]], {
        hints: ["The mean is a measure of location.", "Higher mean: warmer on average."], solution: [`${fmt(Math.max(a, b))} > ${fmt(Math.min(a, b))}`],
      });
    }),
  ],
};

/* ========================= Unit 16: Correlation ========================= */
const U16 = {
  [S(16, 1)]: [
    C(16, 1, "describe-correlation", (rng) => bankMC(rng, [
      ["As engine size increases, fuel economy decreases. What type of correlation?", "Negative", "Positive", "None", "One goes up, the other down.", "Opposite directions: negative."],
      ["Points lie close to a line going up from left to right. Describe the correlation.", "Strong positive", "Weak positive", "Strong negative", "Close to a line means strong.", "Upward and close: strong positive."],
      ["Ice cream sales and sunburn cases are positively correlated. Does one cause the other?", "No: both are linked to sunny weather", "Yes: ice cream causes sunburn", "Yes: sunburn causes ice cream sales", "Is there a third factor?", "Correlation doesn't mean causation."],
      ["Points are scattered with no pattern. Describe the correlation.", "No correlation", "Strong negative", "Weak positive", "Is there a trend?", "No trend: no correlation."],
    ])),
    E(16, 1, "variable-roles", (rng) => bankMC(rng, [
      ["A scientist varies the temperature and measures the reaction time. Which is the explanatory variable?", "Temperature", "Reaction time", "Neither", "Which one is controlled?", "The variable you set is explanatory."],
      ["Which variable goes on the y-axis?", "The response variable", "The explanatory variable", "Either", "y depends on x.", "Response on the vertical axis."],
      ["A hidden variable that explains a correlation is called…", "a confounding variable", "a response variable", "a sampling frame", "It confounds the link.", "It affects both variables."],
    ])),
  ],
  [S(16, 2)]: [
    C(16, 2, "regression-predict", (rng) => {
      const a = round(rng.int(-50, 200) / 10, 1), b = round(nz(rng, -40, 60) / 10, 1), x = rng.int(5, 40);
      const y = round(a + b * x, 2);
      return num(`The regression line is y = ${fmt(a)} ${sg(b)}x. Predict y when x = ${x}.`, y, {
        hints: [`Substitute x = ${x}.`, `${fmt(a)} ${sg(b)} × ${x}.`], solution: [`y = ${fmt(y)}`],
      });
    }),
    E(16, 2, "regression-interpret", (rng) => {
      const a = rng.int(5, 40), b = round(rng.int(5, 50) / 10, 1), lo = rng.int(1, 5), hi = lo + rng.int(5, 15), x = rng.chance(0.5) ? rng.int(lo, hi) : hi + rng.int(5, 20);
      const inside = x <= hi;
      return mc3(rng, `y = ${a} + ${fmt(b)}x (y = test mark, x = hours revised), from data with ${lo} ≤ x ≤ ${hi}. Is predicting the mark for x = ${x} reliable?`, inside ? "Yes: it is interpolation" : "No: it is extrapolation", [[inside ? "No: it is extrapolation" : "Yes: it is interpolation", `Is ${x} inside ${lo} to ${hi}?`], [`Yes: each hour adds ${a} marks`, `The gradient is ${fmt(b)}, not ${a}.`]], {
        hints: ["Inside the data range: interpolation.", "Outside: extrapolation, which is unreliable."], solution: [`${x} is ${inside ? "inside" : "outside"} the range of the data`],
      });
    }),
  ],
};

/* ========================= Unit 17: Probability ========================= */
const U17 = {
  [S(17, 1)]: [
    C(17, 1, "basic-probability", (rng) => {
      const r = rng.int(1, 9), b = rng.int(1, 9), gg = rng.int(0, 6);
      const [n, d] = F(r, r + b + gg);
      return frac(`A bag has ${r} red, ${b} blue${gg ? ` and ${gg} green` : ""} counters. One is picked at random. Find P(red).`, n, d, {
        hints: ["P = favourable ÷ total.", `${r} ÷ ${r + b + gg}.`], solution: [`= ${fText(r, r + b + gg)}`],
      });
    }),
    E(17, 1, "two-dice", (rng) => {
      const t = rng.int(2, 12), ways = 6 - Math.abs(7 - t);
      const [n, d] = F(ways, 36);
      return frac(`Two fair dice are rolled. Find P(the total is ${t}).`, n, d, {
        hints: ["There are 36 equally likely outcomes.", `Count the pairs that make ${t}.`], solution: [`${ways} ways out of 36 = ${fText(ways, 36)}`],
      });
    }),
  ],
  [S(17, 2)]: [
    C(17, 2, "venn-union", (rng) => {
      const pa = rng.int(2, 7) / 10, pb = rng.int(1, 6) / 10, pab = rng.int(0, Math.min(pa, pb) * 10) / 10;
      const u = round(pa + pb - pab, 2);
      if (u > 1) return null;
      return num(`P(A) = ${fmt(pa)}, P(B) = ${fmt(pb)}, P(A ∩ B) = ${fmt(pab)}. Find P(A ∪ B).`, u, {
        traps: [T(round(pa + pb, 2), "Subtract the overlap: it is counted twice.")],
        hints: ["P(A ∪ B) = P(A) + P(B) − P(A ∩ B).", `${fmt(pa)} + ${fmt(pb)} − ${fmt(pab)}.`], solution: [`= ${fmt(u)}`],
      });
    }),
    E(17, 2, "venn-neither", (rng) => {
      const n = rng.int(30, 60), a = rng.int(5, 20), b = rng.int(5, 20), both = rng.int(1, Math.min(a, b) - 1);
      const neither = n - (a + b - both);
      if (neither < 0) return null;
      const [p, q] = F(neither, n);
      return frac(`In a class of ${n}, ${a} play football, ${b} play tennis and ${both} play both. A student is picked at random. Find P(plays neither).`, p, q, {
        hints: ["Fill in the Venn diagram from the middle outwards.", `Football or tennis: ${a} + ${b} − ${both} = ${a + b - both}.`], solution: [`Neither: ${neither}`, `P = ${fText(neither, n)}`],
      });
    }),
  ],
  [S(17, 3)]: [
    C(17, 3, "independent-and", (rng) => {
      const pa = rng.int(1, 9) / 10, pb = rng.int(1, 9) / 10, me = rng.chance(0.5);
      if (me && pa + pb > 1) return null;
      if (me) return num(`A and B are mutually exclusive. P(A) = ${fmt(pa)}, P(B) = ${fmt(pb)}. Find P(A ∪ B).`, round(pa + pb, 2), { traps: [T(round(pa * pb, 4), "Mutually exclusive: ADD (they can't both happen).")], hints: ["Mutually exclusive: P(A ∩ B) = 0.", "Add the probabilities."], solution: [`${fmt(pa)} + ${fmt(pb)} = ${fmt(round(pa + pb, 2))}`] });
      return num(`A and B are independent. P(A) = ${fmt(pa)}, P(B) = ${fmt(pb)}. Find P(A ∩ B).`, round(pa * pb, 4), { traps: [T(round(pa + pb, 2), "Independent and: MULTIPLY.")], hints: ["Independent: P(A ∩ B) = P(A) × P(B).", `${fmt(pa)} × ${fmt(pb)}.`], solution: [`= ${fmt(round(pa * pb, 4))}`] });
    }),
    E(17, 3, "test-independence", (rng) => {
      const pa = rng.int(1, 9) / 10, pb = rng.int(1, 9) / 10, indep = rng.chance(0.5);
      const pab = indep ? round(pa * pb, 4) : round(pa * pb + rng.pick([0.02, 0.05, -0.02]), 4);
      if (pab <= 0 || pab > Math.min(pa, pb)) return null;
      return mc3(rng, `P(A) = ${fmt(pa)}, P(B) = ${fmt(pb)}, P(A ∩ B) = ${fmt(pab)}. Are A and B independent?`, indep ? "Yes" : "No", [[indep ? "No" : "Yes", `Compare P(A) × P(B) = ${fmt(round(pa * pb, 4))} with ${fmt(pab)}.`], ["They are mutually exclusive", "P(A ∩ B) isn't 0."]], {
        hints: ["Independent if P(A ∩ B) = P(A) × P(B).", `${fmt(pa)} × ${fmt(pb)} = ${fmt(round(pa * pb, 4))}.`], solution: [indep ? "Equal, so independent" : "Not equal, so not independent"],
      });
    }),
  ],
  [S(17, 4)]: [
    C(17, 4, "tree-two-days", (rng) => {
      const p = rng.int(1, 9) / 10, kind = rng.int(0, 2);
      const v = [p * p, 2 * p * (1 - p), 1 - (1 - p) ** 2][kind];
      const label = ["on both days", "on exactly one day", "on at least one day"][kind];
      return num(`P(rain) = ${fmt(p)} each day, independently. Find P(rain ${label}).`, round(v, 4), {
        hints: ["Draw a tree: multiply along branches, add the end results.", kind === 1 ? "Rain then dry, or dry then rain." : kind === 2 ? "1 − P(dry on both days)." : `${fmt(p)} × ${fmt(p)}.`], solution: [`= ${fmt(round(v, 4))}`],
      });
    }),
    E(17, 4, "tree-without-replacement", (rng) => {
      const r = rng.int(2, 7), b = rng.int(2, 7), same = rng.chance(0.5);
      const t = r + b;
      const top = same ? r * (r - 1) + b * (b - 1) : r * (r - 1), bot = t * (t - 1);
      const [n, d] = F(top, bot);
      return frac(`A bag has ${r} red and ${b} blue balls. Two are taken without replacement. Find P(${same ? "both the same colour" : "both red"}).`, n, d, {
        traps: same ? [] : [T((r * r) / (t * t), "Without replacement, the second probability changes.")],
        hints: [`P(red then red) = {${r}/${t}} × {${r - 1}/${t - 1}}.`, same ? "Add red-red and blue-blue." : "Multiply along the branches."], solution: [`= ${fText(top, bot)}`],
      });
    }),
  ],
};

/* ===================== Unit 18: Statistical distributions ===================== */
const U18 = {
  [S(18, 1)]: [
    C(18, 1, "find-k-uniform", (rng) => {
      const n = rng.pick([4, 5, 8, 10]), kind = rng.chance(0.5);
      if (kind) return num(`P(X = x) = k for x = 1, 2, …, ${n}. Find k.`, round(1 / n, 4), { hints: ["The probabilities add to 1.", `${n}k = 1.`], solution: [`k = ${fText(1, n)}`] });
      const tot = (n * (n + 1)) / 2;
      return frac(`P(X = x) = kx for x = 1, 2, …, ${n}. Find k.`, ...F(1, tot), { hints: ["The probabilities add to 1.", `k(1 + 2 + … + ${n}) = ${tot}k = 1.`], solution: [`k = ${fText(1, tot)}`] });
    }),
    E(18, 1, "missing-probability", (rng) => {
      const ps = [rng.int(1, 3), rng.int(1, 3), rng.int(1, 3)].map((v) => v / 10), rest = round(1 - sum(ps), 2);
      if (rest <= 0) return null;
      return num(`P(X = 1) = ${fmt(ps[0])}, P(X = 2) = ${fmt(ps[1])}, P(X = 3) = ${fmt(ps[2])}, P(X = 4) = p. Find p.`, rest, {
        hints: ["All probabilities add to 1.", `1 − ${fmt(round(sum(ps), 2))}.`], solution: [`p = ${fmt(rest)}`],
      });
    }),
  ],
  [S(18, 2)]: [
    C(18, 2, "binomial-pmf", (rng) => {
      const n = rng.int(4, 15), p = rng.pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7]), r = rng.int(0, n);
      const v = round(binomPmf(n, p, r), 4);
      if (v < 0.0005) return null;
      return num(`X ~ B(${n}, ${fmt(p)}). Find P(X = ${r}), to 4 decimal places.`, v, {
        dp: 4, traps: [T(round(p ** r * (1 - p) ** (n - r), 4), `Multiply by ${n}C${r} = ${nCr(n, r)} for all the orders.`)].filter((t) => t.value !== v),
        hints: ["P(X = r) = ⁿCᵣ pʳ(1 − p)ⁿ⁻ʳ.", `${nCr(n, r)} × ${fmt(p)}^${r} × ${fmt(round(1 - p, 2))}^${n - r}.`], solution: [`= ${fmt(v, 4)}`],
      });
    }),
    E(18, 2, "binomial-conditions", (rng) => bankMC(rng, [
      ["Which situation can be modelled by a binomial distribution?", "The number of sixes in 20 rolls of a fair die", "The time until a bus arrives", "The heights of 20 students", "Fixed trials, success or failure, constant p.", "20 independent rolls, success = six, p = 1/6."],
      ["Why isn't 'number of red cards when 5 are dealt without replacement' binomial?", "The probability changes after each card", "There are only two colours", "The number of trials is fixed", "Without replacement…", "p isn't constant."],
      ["X ~ B(n, p). What does n stand for?", "The number of trials", "The probability of success", "The number of successes", "n is fixed in advance.", "n trials."],
      ["Which is NOT a condition for a binomial model?", "The outcomes must be continuous", "A fixed number of trials", "Independent trials", "Binomial counts successes.", "Binomial is discrete."],
    ])),
  ],
  [S(18, 3)]: [
    C(18, 3, "binomial-cdf", (rng) => {
      const n = rng.int(8, 30), p = rng.pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5]), r = rng.int(1, Math.min(n - 1, Math.round(n * p) + 4)), kind = rng.int(0, 2);
      const v = kind === 0 ? binomCdf(n, p, r) : kind === 1 ? 1 - binomCdf(n, p, r - 1) : binomCdf(n, p, r - 1);
      const lab = kind === 0 ? `P(X ≤ ${r})` : kind === 1 ? `P(X ≥ ${r})` : `P(X < ${r})`;
      return num(`X ~ B(${n}, ${fmt(p)}). Find ${lab}, to 4 decimal places.`, round(v, 4), {
        dp: 4, traps: kind === 1 ? [T(round(1 - binomCdf(n, p, r), 4), `P(X ≥ ${r}) = 1 − P(X ≤ ${r - 1}).`)] : kind === 2 ? [T(round(binomCdf(n, p, r), 4), `X < ${r} means X ≤ ${r - 1}.`)] : [],
        hints: ["Use the binomial cumulative function on your calculator.", kind === 1 ? `1 − P(X ≤ ${r - 1}).` : kind === 2 ? `P(X ≤ ${r - 1}).` : `P(X ≤ ${r}).`], solution: [`${lab} = ${fmt(round(v, 4), 4)}`],
      });
    }),
    E(18, 3, "binomial-range", (rng) => {
      const n = rng.int(10, 30), p = rng.pick([0.2, 0.3, 0.4, 0.5]), a = rng.int(1, Math.round(n * p)), b = a + rng.int(1, 5);
      const v = round(binomCdf(n, p, b) - binomCdf(n, p, a - 1), 4);
      return num(`X ~ B(${n}, ${fmt(p)}). Find P(${a} ≤ X ≤ ${b}), to 4 decimal places.`, v, {
        dp: 4, traps: [T(round(binomCdf(n, p, b) - binomCdf(n, p, a), 4), `Keep ${a}: subtract P(X ≤ ${a - 1}).`)],
        hints: [`P(X ≤ ${b}) − P(X ≤ ${a - 1}).`, "Use the cumulative function twice."], solution: [`= ${fmt(v, 4)}`],
      });
    }),
  ],
};

/* ========================= Unit 19: Hypothesis testing ========================= */
const lowerCrit = (n, p, a) => { let c = -1; while (binomCdf(n, p, c + 1) < a) c++; return c; };        // largest c with P(X ≤ c) < a
const upperCrit = (n, p, a) => { let c = n + 1; while (c - 1 >= 0 && 1 - binomCdf(n, p, c - 2) < a) c--; return c; };   // smallest c with P(X ≥ c) < a
const U19 = {
  [S(19, 1)]: [
    C(19, 1, "write-hypotheses", (rng) => {
      const [ctx, p0, dir] = rng.pick([["A die is thought to land on six too often", "{1/6}", ">"], ["A coin is thought to be biased (either way)", "0.5", "≠"], ["A new treatment is thought to reduce the 30% failure rate", "0.3", "<"], ["A machine's 5% defect rate is thought to have increased", "0.05", ">"], ["A spinner's 0.25 chance of red is thought to have changed", "0.25", "≠"]]);
      const right = `H₀: p = ${p0}, H₁: p ${dir} ${p0}`;
      const others = ["<", ">", "≠"].filter((d) => d !== dir);
      return mc3(rng, `${ctx}. Which hypotheses are correct?`, right, [[`H₀: p = ${p0}, H₁: p ${others[0]} ${p0}`, "Which direction does the suspicion point?"], [`H₀: p ${dir} ${p0}, H₁: p = ${p0}`, "H₀ always has the equals sign."]], {
        hints: ["H₀ states the original value, with '='.", "H₁ states the suspected change."], solution: [right],
      });
    }),
    E(19, 1, "compare-significance", (rng) => {
      const a = rng.pick([1, 5, 10]), pr = round(rng.int(1, 200) / 1000, 3);
      if (Math.abs(pr * 100 - a) < 0.05) return null;
      const rej = pr * 100 < a;
      return mc3(rng, `A one-tailed test at the ${a}% level gives a probability of ${fmt(pr)} for the observed result or more extreme. Conclusion?`, rej ? "Reject H₀" : "Do not reject H₀", [[rej ? "Do not reject H₀" : "Reject H₀", `Compare ${fmt(pr)} with ${a / 100}.`], ["H₀ is proved true", "Tests never prove H₀."]], {
        hints: ["Reject H₀ if the probability is less than the significance level.", `${fmt(pr)} vs ${a / 100}.`], solution: [`${fmt(pr)} ${rej ? "<" : ">"} ${a / 100}`, rej ? "Reject H₀" : "Insufficient evidence to reject H₀"],
      });
    }),
  ],
  [S(19, 2)]: [
    C(19, 2, "lower-critical", (rng) => {
      const n = rng.int(10, 30), p = rng.pick([0.3, 0.4, 0.5, 0.6]), a = rng.pick([0.05, 0.1]);
      const c = lowerCrit(n, p, a);
      if (c < 0) return null;
      return num(`X ~ B(${n}, ${fmt(p)}). H₁: p < ${fmt(p)}, at the ${a * 100}% level. The critical region is X ≤ c. Find c.`, c, {
        traps: [T(c + 1, `P(X ≤ ${c + 1}) = ${fmt(round(binomCdf(n, p, c + 1), 4))}, which is above ${a}.`)],
        hints: [`Find the largest c with P(X ≤ c) < ${a}.`, `P(X ≤ ${c}) = ${fmt(round(binomCdf(n, p, c), 4))}; P(X ≤ ${c + 1}) = ${fmt(round(binomCdf(n, p, c + 1), 4))}.`], solution: [`Critical region X ≤ ${c}`],
      });
    }),
    E(19, 2, "upper-critical", (rng) => {
      const n = rng.int(10, 30), p = rng.pick([0.1, 0.2, 0.3, 0.4, 0.5]), a = rng.pick([0.05, 0.1]);
      const c = upperCrit(n, p, a);
      if (c > n) return null;
      const act = round(1 - binomCdf(n, p, c - 1), 4);
      return multi(`X ~ B(${n}, ${fmt(p)}). H₁: p > ${fmt(p)}, at the ${a * 100}% level. The critical region is X ≥ c. Find c and the actual significance level (4 d.p.).`, [["c =", c], ["actual level =", act, 4]], {
        hints: [`Find the smallest c with P(X ≥ c) < ${a}.`, `P(X ≥ c) = 1 − P(X ≤ c − 1).`], solution: [`P(X ≥ ${c}) = ${fmt(act, 4)} < ${a}`, `P(X ≥ ${c - 1}) = ${fmt(round(1 - binomCdf(n, p, c - 2), 4))}`],
      });
    }),
  ],
  [S(19, 3)]: [
    C(19, 3, "one-tail-probability", (rng) => {
      const n = rng.int(10, 25), p = rng.pick([0.2, 0.3, 0.4]), up = rng.chance(0.5), x = up ? Math.round(n * p) + rng.int(2, 5) : Math.max(0, Math.round(n * p) - rng.int(2, 5));
      if (x > n) return null;
      const v = round(up ? 1 - binomCdf(n, p, x - 1) : binomCdf(n, p, x), 4);
      if (v < 0.0005) return null;
      return num(`X ~ B(${n}, ${fmt(p)}), H₁: p ${up ? ">" : "<"} ${fmt(p)}. The observed value is ${x}. Find P(X ${up ? "≥" : "≤"} ${x}), to 4 decimal places.`, v, {
        dp: 4, hints: ["Find the probability of the observed value or more extreme.", up ? `1 − P(X ≤ ${x - 1}).` : `P(X ≤ ${x}).`], solution: [`= ${fmt(v, 4)}`],
      });
    }),
    E(19, 3, "one-tail-conclusion", (rng) => {
      const n = rng.int(12, 25), p = rng.pick([0.2, 0.25, 0.3]), x = Math.round(n * p) + rng.int(1, 6), a = 0.05;
      if (x > n) return null;
      const pr = 1 - binomCdf(n, p, x - 1), rej = pr < a;
      return mc3(rng, `A machine's defect rate is ${fmt(p)}. After servicing, ${x} of ${n} items are defective. Test at 5% whether the rate has increased.`, rej ? "Reject H₀: evidence the rate has increased" : "Do not reject H₀: insufficient evidence the rate has increased", [[rej ? "Do not reject H₀: insufficient evidence the rate has increased" : "Reject H₀: evidence the rate has increased", `P(X ≥ ${x}) = ${fmt(round(pr, 4))}.`], ["Reject H₀: the rate has definitely changed", "Tests give evidence, not certainty."]], {
        hints: [`H₀: p = ${fmt(p)}, H₁: p > ${fmt(p)}; X ~ B(${n}, ${fmt(p)}).`, `P(X ≥ ${x}) = ${fmt(round(pr, 4))}. Compare with 0.05.`], solution: [`${fmt(round(pr, 4))} ${rej ? "<" : ">"} 0.05`],
      });
    }),
  ],
  [S(19, 4)]: [
    C(19, 4, "two-tail-split", (rng) => {
      const a = rng.pick([1, 2, 5, 10]);
      return num(`A two-tailed test is at the ${a}% level. What percentage is in each tail?`, a / 2, {
        traps: [T(a, "Two tails share the significance level.")], hints: ["Split it equally.", `${a} ÷ 2.`], solution: [`${fmt(a / 2)}% in each tail`],
      });
    }),
    E(19, 4, "two-tail-conclusion", (rng) => {
      const n = rng.int(15, 30), p = 0.5, x = rng.chance(0.5) ? Math.round(n / 2) + rng.int(2, 7) : Math.round(n / 2) - rng.int(2, 7);
      if (x < 0 || x > n) return null;
      const up = x > n * p, pr = up ? 1 - binomCdf(n, p, x - 1) : binomCdf(n, p, x), rej = pr < 0.025;
      return mc3(rng, `A coin is tossed ${n} times and gives ${x} heads. Test at 5% whether it is biased (H₁: p ≠ 0.5).`, rej ? "Reject H₀: evidence the coin is biased" : "Do not reject H₀: insufficient evidence of bias", [[rej ? "Do not reject H₀: insufficient evidence of bias" : "Reject H₀: evidence the coin is biased", `P(X ${up ? "≥" : "≤"} ${x}) = ${fmt(round(pr, 4))}; compare with 0.025.`], ["Compare with 0.05", "A two-tailed test uses 2.5% in each tail."]], {
        hints: ["Two-tailed: compare each tail with 0.025.", `P(X ${up ? "≥" : "≤"} ${x}) = ${fmt(round(pr, 4))}.`], solution: [`${fmt(round(pr, 4))} ${rej ? "<" : ">"} 0.025`],
      });
    }),
  ],
};

/* ===================== Unit 20: Modelling in mechanics ===================== */
const U20 = {
  [S(20, 1)]: [
    C(20, 1, "modelling-cycle", (rng) => bankMC(rng, [
      ["After comparing a model's predictions with reality and finding they disagree, what next?", "Refine the model's assumptions", "Ignore the real data", "Stop: the model is wrong", "The cycle continues.", "Improve the model and test again."],
      ["Why are mechanics models simplified?", "So the problem can be solved mathematically", "Because reality doesn't matter", "To make answers exact", "Think about difficulty.", "Simplifying makes the maths manageable."],
      ["What is the first stage of the modelling cycle?", "Simplify the real-world problem with assumptions", "Solve the equations", "Compare with reality", "Before any maths…", "Start by setting up a simplified model."],
    ])),
    E(20, 1, "model-limitation", (rng) => bankMC(rng, [
      ["A ball is modelled as a particle. What does the model ignore?", "Air resistance and spin", "The ball's mass", "Gravity", "A particle has no size.", "No size means no air resistance or rotation."],
      ["Why might a model of a falling leaf as a particle be poor?", "Air resistance on a leaf is large", "Leaves have no mass", "Gravity doesn't act on leaves", "Think about how leaves fall.", "Its shape makes air resistance important."],
      ["A car's model predicts a stopping distance of 30 m but tests give 34 m. Suggest a refinement.", "Include more resistance forces", "Remove the brakes", "Use a lighter car", "The model underestimates.", "Add forces the model left out."],
    ])),
  ],
  [S(20, 2)]: [
    C(20, 2, "assumption-meaning", (rng) => bankMC(rng, [
      ["What does it mean to model a string as light?", "Its mass is ignored, so the tension is the same throughout", "It doesn't stretch", "There is no friction", "Light = no mass.", "A light string has the same tension along it."],
      ["What does 'inextensible string' tell you?", "Connected objects have the same acceleration", "The string has no mass", "The surface is smooth", "It can't stretch.", "No stretching keeps the motion linked."],
      ["What does 'smooth surface' mean?", "There is no friction", "The surface is flat", "The object is a particle", "Smooth vs rough.", "Smooth surfaces have no friction."],
      ["What does 'rigid' mean for a rod?", "It doesn't bend", "It has no mass", "It doesn't stretch", "Rigid bodies keep their shape.", "Rigid means no bending."],
      ["What does 'uniform rod' tell you?", "Its weight acts at its centre", "It has no weight", "It is smooth", "Mass spread evenly.", "Uniform: centre of mass at the middle."],
    ])),
    E(20, 2, "choose-assumption", (rng) => bankMC(rng, [
      ["A block on ice. Which assumption is most reasonable?", "The surface is smooth", "The block is light", "The surface is rough", "Ice is slippery.", "Little friction on ice."],
      ["A climber hangs on a rope. Which assumption simplifies the rope?", "Light and inextensible", "Smooth", "Uniform rod", "Think about mass and stretch.", "Ignore its mass and stretch."],
      ["A plank used as a seesaw. Which model?", "A rigid uniform rod", "A particle", "A light string", "It has length and doesn't bend.", "Model as a rigid rod with weight at the centre."],
    ])),
  ],
  [S(20, 3)]: [
    C(20, 3, "weight", (rng) => {
      const m = round(rng.int(1, 200) / 2, 1);
      return num(`Find the weight of a mass of ${fmt(m)} kg (g = 9.8 m s⁻²).`, round(m * g, 2), {
        unit: "N", traps: [T(m, "Weight is a force: W = mg.")], hints: ["W = mg.", `${fmt(m)} × 9.8.`], solution: [`W = ${fmt(round(m * g, 2))} N`],
      });
    }),
    E(20, 3, "unit-conversion", (rng) => {
      const v = rng.int(1, 40) * 18;
      return num(`Convert ${v} km h⁻¹ to m s⁻¹.`, v / 3.6, {
        traps: [T(round(v * 3.6, 2), "Divide by 3.6: × 1000 ÷ 3600.")], hints: ["1 km = 1000 m and 1 h = 3600 s.", `${v} × 1000 ÷ 3600.`], solution: [`= ${fmt(v / 3.6)} m s⁻¹`],
      });
    }),
  ],
  [S(20, 4)]: [
    C(20, 4, "speed-from-velocity", (rng) => {
      const [a, b, c] = rng.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15]]);
      return num(`A particle has velocity (${vec(rng.pick([1, -1]) * a, rng.pick([1, -1]) * b)}) m s⁻¹. Find its speed.`, c, {
        unit: "m s⁻¹", traps: [T(a + b, "Use Pythagoras.")], hints: ["Speed = magnitude of velocity.", `√(${a}² + ${b}²).`], solution: [`= ${c} m s⁻¹`],
      });
    }),
    E(20, 4, "resultant-force", (rng) => {
      const F1 = [nz(rng, -8, 8), nz(rng, -8, 8)], F2 = [nz(rng, -8, 8), nz(rng, -8, 8)];
      const R = [F1[0] + F2[0], F1[1] + F2[1]];
      return multi(`Forces (${vec(...F1)}) N and (${vec(...F2)}) N act on a particle. Find the resultant as xi + yj.`, [["x =", R[0]], ["y =", R[1]]], {
        hints: ["Add the i parts and the j parts.", `i: ${F1[0]} ${sg(F2[0])}.`], solution: [`R = (${vec(...R)}) N`],
      });
    }),
  ],
};

/* ===================== Unit 21: Constant acceleration ===================== */
const U21 = {
  [S(21, 1)]: [
    C(21, 1, "dt-gradient", (rng) => {
      const s1 = rng.int(0, 30), t1 = rng.int(0, 5), dt = rng.int(2, 8), v = nz(rng, -6, 8), s2 = s1 + v * dt;
      return num(`A displacement–time graph goes from (${t1} s, ${s1} m) to (${t1 + dt} s, ${s2} m). Find the velocity.`, v, {
        unit: "m s⁻¹", hints: ["Velocity = gradient.", `(${s2} − ${s1}) ÷ ${dt}.`], solution: [`= ${v} m s⁻¹`],
      });
    }),
    E(21, 1, "average-speed", (rng) => {
      const a = rng.int(10, 60), b = rng.int(5, a), t1 = rng.int(2, 10), t2 = rng.int(2, 10), rest = rng.int(0, 5);
      // goes out a m in t1 s, rests, comes back b m in t2 s
      const total = a + b, time = t1 + rest + t2;
      return num(`A runner goes ${a} m in ${t1} s, rests for ${rest} s, then runs back ${b} m in ${t2} s. Find the average speed for the whole journey, to 2 decimal places.`, round(total / time, 2), {
        dp: 2, unit: "m s⁻¹", traps: [T(round((a - b) / time, 2), "Average SPEED uses total distance, not displacement.")],
        hints: ["Average speed = total distance ÷ total time.", `${total} ÷ ${time}.`], solution: [`= ${fmt(round(total / time, 2), 2)} m s⁻¹`],
      });
    }),
  ],
  [S(21, 2)]: [
    C(21, 2, "vt-acceleration", (rng) => {
      const u = rng.int(0, 20), t = rng.int(2, 10), a = nz(rng, -3, 4), v = u + a * t;
      if (v < 0) return null;
      return num(`A velocity–time graph goes from ${u} m s⁻¹ to ${v} m s⁻¹ in ${t} s. Find the acceleration.`, a, {
        unit: "m s⁻²", hints: ["Acceleration = gradient.", `(${v} − ${u}) ÷ ${t}.`], solution: [`= ${a} m s⁻²`],
      });
    }),
    E(21, 2, "vt-area", (rng) => {
      const V = rng.int(4, 20), t1 = rng.int(2, 10), t2 = rng.int(2, 20), t3 = rng.int(2, 10);
      const d = 0.5 * V * t1 + V * t2 + 0.5 * V * t3;
      return num(`A car accelerates from rest to ${V} m s⁻¹ in ${t1} s, travels at ${V} m s⁻¹ for ${t2} s, then decelerates to rest in ${t3} s. Find the total distance.`, d, {
        unit: "m", hints: ["Distance = area under the velocity–time graph (a trapezium).", `½ × (${t2} + ${t1 + t2 + t3}) × ${V}.`], solution: [`= ${fmt(d)} m`],
      });
    }),
  ],
  [S(21, 3)]: [
    C(21, 3, "suvat-v", (rng) => {
      const u = rng.int(0, 15), a = nz(rng, -3, 5), t = rng.int(1, 10), v = u + a * t;
      return num(`u = ${u} m s⁻¹, a = ${a} m s⁻², t = ${t} s. Find v.`, v, {
        unit: "m s⁻¹", hints: ["v = u + at.", `${u} + ${a} × ${t}.`], solution: [`v = ${v} m s⁻¹`],
      });
    }),
    E(21, 3, "suvat-choose", (rng) => {
      const kind = rng.int(0, 2);
      if (kind === 0) { const u = rng.int(0, 10), a = rng.int(1, 5), t = rng.int(1, 8); return num(`u = ${u} m s⁻¹, a = ${a} m s⁻², t = ${t} s. Find s.`, u * t + 0.5 * a * t * t, { unit: "m", hints: ["s = ut + ½at².", `${u}(${t}) + ½(${a})(${t})².`], solution: [`s = ${fmt(u * t + 0.5 * a * t * t)} m`] }); }
      if (kind === 1) { const v = rng.int(2, 20) * 2, a = rng.pick([1, 2, 4]); const s = (v * v) / (2 * a); return num(`From rest, a particle accelerates at ${a} m s⁻² to ${v} m s⁻¹. Find the distance.`, s, { unit: "m", hints: ["v² = u² + 2as with u = 0.", `${v}² = 2 × ${a} × s.`], solution: [`s = ${fmt(s)} m`] }); }
      const u = rng.int(1, 10), v = u + rng.int(1, 10), t = rng.int(2, 10);
      return num(`A particle speeds up from ${u} m s⁻¹ to ${v} m s⁻¹ in ${t} s. Find the distance.`, ((u + v) / 2) * t, { unit: "m", hints: ["s = ½(u + v)t.", `½(${u} + ${v}) × ${t}.`], solution: [`s = ${fmt(((u + v) / 2) * t)} m`] });
    }),
  ],
  [S(21, 4)]: [
    C(21, 4, "braking", (rng) => {
      const u = rng.int(2, 15) * 2, a = rng.pick([1, 2, 4, 5, 0.5]);
      const t = u / a;
      return num(`A car travelling at ${u} m s⁻¹ brakes with deceleration ${fmt(a)} m s⁻² until it stops. How long does it take?`, t, {
        unit: "s", hints: ["v = u + at with v = 0 and a = −" + fmt(a) + ".", `0 = ${u} − ${fmt(a)}t.`], solution: [`t = ${fmt(t)} s`],
      });
    }),
    E(21, 4, "braking-distance", (rng) => {
      const u = rng.int(2, 15) * 2, a = rng.pick([1, 2, 4, 5, 0.5]);
      return num(`A car travelling at ${u} m s⁻¹ brakes with deceleration ${fmt(a)} m s⁻² until it stops. How far does it travel while braking?`, (u * u) / (2 * a), {
        unit: "m", traps: [T(-(u * u) / (2 * a), "Distance is positive: use a = −" + fmt(a) + " correctly.")],
        hints: ["v² = u² + 2as with v = 0.", `0 = ${u}² − 2 × ${fmt(a)} × s.`], solution: [`s = ${fmt((u * u) / (2 * a))} m`],
      });
    }),
  ],
  [S(21, 5)]: [
    C(21, 5, "time-to-top", (rng) => {
      const t = round(rng.int(5, 40) / 10, 1), u = round(g * t, 2);
      return num(`A ball is thrown vertically upwards at ${fmt(u)} m s⁻¹. How long does it take to reach its highest point?`, t, {
        unit: "s", hints: ["At the top v = 0. Use v = u + at with a = −9.8.", `0 = ${fmt(u)} − 9.8t.`], solution: [`t = ${fmt(t)} s`],
      });
    }),
    E(21, 5, "greatest-height", (rng) => {
      const u = rng.int(5, 30);
      const h = round((u * u) / (2 * g), 2);
      return num(`A ball is thrown vertically upwards at ${u} m s⁻¹. Find its greatest height above the point of projection, to 2 decimal places.`, h, {
        dp: 2, unit: "m", hints: ["v² = u² + 2as with v = 0 and a = −9.8.", `0 = ${u}² − 19.6s.`], solution: [`s = ${u * u} ÷ 19.6 = ${fmt(h, 2)} m`],
      });
    }),
  ],
};

/* ======================= Unit 22: Forces and motion ======================= */
const U22 = {
  [S(22, 1)]: [
    C(22, 1, "normal-reaction", (rng) => {
      const m = rng.int(1, 30), extra = rng.chance(0.5) ? rng.int(5, 50) : 0;
      const R = round(m * g + extra, 2);
      return num(`A ${m} kg box rests on a horizontal floor${extra ? ` with a ${extra} N object pressing down on it` : ""}. Find the normal reaction.`, R, {
        unit: "N", hints: ["Vertically the forces balance.", `R = ${m} × 9.8${extra ? ` + ${extra}` : ""}.`], solution: [`R = ${fmt(R)} N`],
      });
    }),
    E(22, 1, "resultant-1d", (rng) => {
      const a = rng.int(5, 60), b = rng.int(5, 60);
      if (a === b) return null;
      return num(`Forces of ${a} N to the right and ${b} N to the left act on a particle. Find the size of the resultant force.`, Math.abs(a - b), {
        unit: "N", traps: [T(a + b, "The forces act in opposite directions, so subtract.")],
        hints: ["Opposite forces subtract.", `${a} − ${b}.`], solution: [`${Math.abs(a - b)} N to the ${a > b ? "right" : "left"}`],
      });
    }),
  ],
  [S(22, 2)]: [
    C(22, 2, "equilibrium-unknowns", (rng) => {
      const F1 = [rng.int(-8, 8), rng.int(-8, 8)], F2 = [rng.int(-8, 8), rng.int(-8, 8)];
      const a = -(F1[0] + F2[0]), b = -(F1[1] + F2[1]);
      return multi(`Forces (${vec(...F1)}) N, (${vec(...F2)}) N and (ai + bj) N are in equilibrium. Find a and b.`, [["a =", a], ["b =", b]], {
        hints: ["In equilibrium the resultant is 0.", "Set the i parts and j parts to 0 separately."], solution: [`a = ${a}, b = ${b}`],
      });
    }),
    E(22, 2, "resultant-magnitude", (rng) => {
      const F1 = [nz(rng, -6, 6), nz(rng, -6, 6)], F2 = [nz(rng, -6, 6), nz(rng, -6, 6)];
      const R = [F1[0] + F2[0], F1[1] + F2[1]], mag = round(Math.hypot(...R), 2);
      if (mag === 0) return null;
      return num(`Find the magnitude of the resultant of (${vec(...F1)}) N and (${vec(...F2)}) N, to 2 decimal places.`, mag, {
        dp: 2, unit: "N", hints: [`Resultant = (${vec(...R)}) N.`, "Magnitude = √(x² + y²)."], solution: [`= ${fmt(mag, 2)} N`],
      });
    }),
  ],
  [S(22, 3)]: [
    C(22, 3, "f-equals-ma", (rng) => {
      const m = rng.int(2, 20), a = round(rng.int(1, 20) / 2, 1), R = rng.int(1, 50), D = round(m * a + R, 2);
      return num(`A ${m} kg box is pulled by a force of ${fmt(D)} N against a resistance of ${R} N. Find its acceleration.`, a, {
        unit: "m s⁻²", traps: [T(round(D / m, 3), "Use the RESULTANT force: subtract the resistance.")],
        hints: ["Resultant = forward − backward.", `${fmt(D)} − ${R} = ${m}a.`], solution: [`a = ${fmt(a)} m s⁻²`],
      });
    }),
    E(22, 3, "lift-tension", (rng) => {
      const m = rng.int(2, 15), a = round(rng.int(1, 10) / 2, 1), up = rng.chance(0.5);
      const T_ = round(m * (g + (up ? a : -a)), 2);
      return num(`A ${m} kg mass hangs from a string and accelerates ${up ? "upwards" : "downwards"} at ${fmt(a)} m s⁻². Find the tension.`, T_, {
        unit: "N", hints: [up ? "T − mg = ma (up positive)." : "mg − T = ma (down positive).", `${up ? `T = ${m}(9.8 + ${fmt(a)})` : `T = ${m}(9.8 − ${fmt(a)})`}.`], solution: [`T = ${fmt(T_)} N`],
      });
    }),
  ],
  [S(22, 4)]: [
    C(22, 4, "vector-acceleration", (rng) => {
      const m = rng.int(2, 5), a = [nz(rng, -5, 5), nz(rng, -5, 5)], Fv = a.map((v) => v * m);
      return multi(`A resultant force of (${vec(...Fv)}) N acts on a ${m} kg particle. Find its acceleration as xi + yj.`, [["x =", a[0]], ["y =", a[1]]], {
        hints: ["a = F ÷ m.", `Divide each component by ${m}.`], solution: [`a = (${vec(...a)}) m s⁻²`],
      });
    }),
    E(22, 4, "vector-acc-magnitude", (rng) => {
      const [p, q, c] = rng.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]), m = rng.int(2, 6);
      return num(`A ${m} kg particle has resultant force (${vec(p * m, q * m * rng.pick([1, -1]))}) N. Find the magnitude of its acceleration.`, c, {
        unit: "m s⁻²", hints: [`a = F ÷ ${m}: divide each component by ${m}.`, "Then find the magnitude with Pythagoras."], solution: [`|a| = ${c} m s⁻²`],
      });
    }),
  ],
  [S(22, 5)]: [
    C(22, 5, "connected-acceleration", (rng) => {
      const m1 = rng.int(1, 10), m2 = rng.int(1, 10), a = rng.int(1, 6), D = (m1 + m2) * a;
      return num(`Particles of ${m1} kg and ${m2} kg are joined by a light string on a smooth floor. A force of ${D} N pulls the ${m1} kg particle. Find the acceleration.`, a, {
        unit: "m s⁻²", hints: ["Treat both together: the tension is internal.", `${D} = ${m1 + m2}a.`], solution: [`a = ${a} m s⁻²`],
      });
    }),
    E(22, 5, "tow-tension", (rng) => {
      const M = rng.int(8, 20) * 100, m = rng.int(2, 8) * 100, a = round(rng.int(1, 6) / 2, 1), r1 = rng.int(1, 6) * 100, r2 = rng.int(1, 4) * 50;
      const D = round((M + m) * a + r1 + r2, 2), T_ = round(m * a + r2, 2);
      return multi(`A ${M} kg car tows a ${m} kg trailer. The driving force is ${fmt(D)} N; resistances are ${r1} N on the car and ${r2} N on the trailer. Find the acceleration and the tension in the tow bar.`, [["a =", a], ["T =", T_]], {
        hints: [`Whole system: ${fmt(D)} − ${r1 + r2} = ${M + m}a.`, `Trailer: T − ${r2} = ${m}a.`], solution: [`a = ${fmt(a)} m s⁻²`, `T = ${fmt(T_)} N`],
      });
    }),
  ],
  [S(22, 6)]: [
    C(22, 6, "pulley-acceleration", (rng) => {
      const m1 = rng.int(1, 10), m2 = rng.int(1, 10);
      if (m1 === m2) return null;
      const a = round((Math.abs(m1 - m2) * g) / (m1 + m2), 2);
      return num(`Particles of ${m1} kg and ${m2} kg hang on either side of a smooth pulley. Find the acceleration, to 2 decimal places.`, a, {
        dp: 2, unit: "m s⁻²", hints: ["Heavier side: mg − T = ma; lighter side: T − mg = ma.", `Add: (${Math.max(m1, m2)} − ${Math.min(m1, m2)})g = ${m1 + m2}a.`], solution: [`a = ${fmt(a, 2)} m s⁻²`],
      });
    }),
    E(22, 6, "pulley-tension", (rng) => {
      const m1 = rng.int(1, 10), m2 = rng.int(1, 10);
      if (m1 === m2) return null;
      const T_ = round((2 * m1 * m2 * g) / (m1 + m2), 2);
      return num(`Particles of ${m1} kg and ${m2} kg hang on either side of a smooth pulley. Find the tension in the string, to 2 decimal places.`, T_, {
        dp: 2, unit: "N", hints: ["Find a first, then use one particle's equation.", "T = 2m₁m₂g ÷ (m₁ + m₂)."], solution: [`T = ${fmt(T_, 2)} N`],
      });
    }),
  ],
};

/* ===================== Unit 23: Variable acceleration ===================== */
const U23 = {
  [S(23, 1)]: [
    C(23, 1, "at-rest-time", (rng) => {
      const k = rng.int(1, 5), t = rng.int(1, 6);
      return num(`v = ${k === 1 ? "" : k}t² − ${k * t * t}. When is the particle instantaneously at rest (t > 0)?`, t, {
        unit: "s", hints: ["At rest means v = 0.", `${k}t² = ${k * t * t}.`], solution: [`t = ${t} s`],
      });
    }),
    E(23, 1, "returns-to-origin", (rng) => {
      const a = rng.int(2, 9), b = rng.int(1, 3);
      // s = a t² − b t³ → returns when t = a/b
      const [n, d] = F(a, b);
      return frac(`s = ${a}t² − ${b === 1 ? "" : b}t³. When does the particle return to O (t > 0)?`, n, d, {
        hints: ["At O, s = 0.", `t²(${a} − ${b}t) = 0.`], solution: [`t = ${fText(a, b)}`],
      });
    }),
  ],
  [S(23, 2)]: [
    C(23, 2, "velocity-from-s", (rng) => {
      const a = nz(rng, -3, 4), b = rng.int(-6, 6), c = rng.int(-9, 9), t = rng.int(0, 5);
      return num(`s = ${co(a, "t³")} ${sg(b)}t² ${sg(c)}t. Find v when t = ${t}.`, 3 * a * t * t + 2 * b * t + c, {
        unit: "m s⁻¹", hints: [`v = ds/dt = ${3 * a}t² ${sg(2 * b)}t ${sg(c)}.`, `Substitute t = ${t}.`], solution: [`v = ${3 * a * t * t + 2 * b * t + c} m s⁻¹`],
      });
    }),
    E(23, 2, "acceleration-from-s", (rng) => {
      const a = nz(rng, -3, 4), b = rng.int(-6, 6), c = rng.int(-9, 9), t = rng.int(0, 5);
      return num(`s = ${co(a, "t³")} ${sg(b)}t² ${sg(c)}t. Find the acceleration when t = ${t}.`, 6 * a * t + 2 * b, {
        unit: "m s⁻²", traps: [T(3 * a * t * t + 2 * b * t + c, "That's the velocity. Differentiate again.")].filter((x) => x.value !== 6 * a * t + 2 * b),
        hints: ["Differentiate twice.", `a = ${6 * a}t ${sg(2 * b)}.`], solution: [`a = ${6 * a * t + 2 * b} m s⁻²`],
      });
    }),
  ],
  [S(23, 3)]: [
    C(23, 3, "max-velocity", (rng) => {
      const b = rng.int(1, 3), t0 = rng.int(1, 5), a = 2 * b * t0;   // v = a t − b t², max at t0
      return num(`v = ${a}t − ${b === 1 ? "" : b}t². Find the maximum velocity.`, a * t0 - b * t0 * t0, {
        unit: "m s⁻¹", hints: ["Maximum when dv/dt = 0.", `${a} − ${2 * b}t = 0, so t = ${t0}.`], solution: [`v = ${a * t0 - b * t0 * t0} m s⁻¹`],
      });
    }),
    E(23, 3, "max-displacement-time", (rng) => {
      const t0 = rng.int(1, 6), k = rng.int(1, 3);
      // v = 3k t(... ) choose s = k(3 t0 t² − t³)·? s = 3k t0 t² − 2k t³? v = 6k t0 t − 6k t² = 0 at t = t0
      return num(`s = ${3 * k * t0}t² − ${2 * k}t³. When is the displacement greatest (t > 0)?`, t0, {
        unit: "s", hints: ["Greatest s when v = ds/dt = 0.", `v = ${6 * k * t0}t − ${6 * k}t² = ${6 * k}t(${t0} − t).`], solution: [`t = ${t0} s`],
      });
    }),
  ],
  [S(23, 4)]: [
    C(23, 4, "integrate-a", (rng) => {
      const k = rng.int(1, 5), u = rng.int(0, 9), t = rng.int(1, 5);
      return num(`a = ${2 * k}t m s⁻², and v = ${u} m s⁻¹ when t = 0. Find v when t = ${t}.`, k * t * t + u, {
        unit: "m s⁻¹", traps: [T(k * t * t, "Include the starting velocity (the + c).")].filter((x) => x.value !== k * t * t + u),
        hints: [`v = ∫${2 * k}t dt = ${co(k, "t²")} + c.`, `c = ${u}.`], solution: [`v = ${co(k, "t²")} + ${u}`, `v(${t}) = ${k * t * t + u} m s⁻¹`],
      });
    }),
    E(23, 4, "displacement-integral", (rng) => {
      const a = rng.int(1, 4), b = rng.int(0, 6), T1 = rng.int(1, 4);
      // ∫0^T (3a t² + 2b t) dt = a T³ + b T²
      return num(`v = ${co(3 * a, "t²")} ${sg(2 * b)}t. Find the displacement from t = 0 to t = ${T1}.`, a * T1 ** 3 + b * T1 * T1, {
        unit: "m", hints: [`s = ∫v dt = ${co(a, "t³")} ${sg(b)}t².`, `Substitute t = ${T1} (and subtract the value at 0).`], solution: [`s = ${a * T1 ** 3 + b * T1 * T1} m`],
      });
    }),
  ],
  [S(23, 5)]: [
    C(23, 5, "derive-steps", (rng) => bankMC(rng, [
      ["Integrate a constant acceleration a with respect to t.", "at + c", "½at²", "a", "a is a constant.", "∫a dt = at + c."],
      ["In v = at + c, what is c, using v = u when t = 0?", "u", "0", "a", "Put t = 0.", "v(0) = c = u."],
      ["Integrate v = u + at with respect to t.", "ut + ½at² + c", "u + a", "ut + at²", "Term by term.", "∫u dt = ut and ∫at dt = ½at²."],
      ["Which suvat equation comes from integrating a once?", "v = u + at", "s = ut + ½at²", "v² = u² + 2as", "Acceleration → velocity.", "Integrating a gives v."],
    ])),
    E(23, 5, "derived-check", (rng) => {
      const u = rng.int(0, 10), a = rng.int(1, 6), t = rng.int(1, 6);
      return num(`Using s = ∫(${u} + ${a}t) dt with s = 0 when t = 0, find s when t = ${t}.`, u * t + 0.5 * a * t * t, {
        unit: "m", hints: [`s = ${u}t + ${fmt(a / 2)}t².`, `Substitute t = ${t}.`], solution: [`s = ${fmt(u * t + 0.5 * a * t * t)} m`],
      });
    }),
  ],
};

export const Y12C_GENERATORS = { ...U13, ...U14, ...U15, ...U16, ...U17, ...U18, ...U19, ...U20, ...U21, ...U22, ...U23 };
