/* ==========================================================================
   tidy(): cleans up the maths text that the A level generators build
   --------------------------------------------------------------------------
   Generators glue numbers into text, which can give clumsy maths such as
   "1x", "x + 0", "+ −3" or a plain hyphen for minus. tidy() fixes these in
   every piece of text a question shows (prompt, hints, solution, answer
   text, step labels and choice labels). It never touches the stored answer
   values, so marking is unaffected.
   ========================================================================== */
export function tidyText(s) {
  if (typeof s !== "string") return s;
  return s
    // a plain hyphen used as a minus sign → proper minus sign
    .replace(/(^|[\s([{,=:;×÷|])-(?=[\d.{(√πx])/g, "$1−")
    // "1x" → "x" and "−1x" → "−x" (a coefficient of 1 isn't written)
    .replace(/(^|[\s([{−])1(?=[a-zA-Zπ](?![a-zA-Z]))/g, "$1")
    // "+ 0x", "− 0x²" → nothing (a zero term isn't written)
    .replace(/ [+−] 0[a-zA-Z][²³⁴]?(?![a-zA-Z])/g, "")
    // "x + 0" after a letter, bracket or power → nothing
    .replace(/(?<=[a-zA-Z)²³⁴ᵗ]) [+−] 0(?=[\s).,=;]|$)/g, "")
    // "+ −3" → "− 3" and "− −3" → "+ 3"
    .replace(/ \+ −\s?/g, " − ")
    .replace(/ − −\s?/g, " + ")
    // "(x)" on its own (not f(x)) → "x"
    .replace(/(?<![a-zA-Zα-ω′⁻¹])\(([a-z])\)(?![²³⁴ʳ])/g, "$1")
    // run the "1x" rule again, in case removing "− 0" left "1(x)" → "1x"
    .replace(/(^|[\s([{−])1(?=[a-zA-Zπ](?![a-zA-Z]))/g, "$1");
}

export function tidyQuestion(q) {
  if (!q) return q;
  const out = { ...q, prompt: tidyText(q.prompt), answerText: tidyText(q.answerText) };
  if (q.hints) out.hints = q.hints.map(tidyText);
  if (q.solution) out.solution = q.solution.map(tidyText);
  if (q.steps) out.steps = q.steps.map((st) => ({ ...st, prompt: tidyText(st.prompt) }));
  if (q.options) out.options = q.options.map((o) => ({ ...o, label: tidyText(o.label), feedback: tidyText(o.feedback) }));
  if (q.traps) out.traps = q.traps.map((t) => ({ ...t, feedback: tidyText(t.feedback) }));
  return out;
}
