/* ==========================================================================
   The "light" lesson format (Year 10 onwards)
   --------------------------------------------------------------------------
   Shorter than the Year 7 format but with the same A–M structure, so every
   page still works. Content is written compactly and expanded here:
     L({
       intro:  ["paragraph", …],
       obj:    ["objective", …],
       prior:  ["prior knowledge", …],
       vocab:  [["term", "definition"], …],
       teach:  [["Heading", "paragraph", "key point (optional)", visual?], …],
       ex:     [["question", ["step", …], "answer"], …],
       mis:    [["mistake", "why it's wrong", "what to do instead"], …],
       check:  ["checklist item", …],
     })
   ========================================================================== */
export function L(c) {
  return {
    light: true,
    introduction: c.intro,
    objectives: c.obj,
    priorKnowledge: c.prior,
    vocabulary: c.vocab.map(([term, definition]) => ({ term, definition })),
    teaching: c.teach.map(([heading, text, keyPoint, visual]) => ({ heading, paragraphs: Array.isArray(text) ? text : [text], keyPoint, visual })),
    examples: c.ex.map(([question, steps, answer]) => ({ question, steps, answer })),
    mistakes: c.mis.map(([mistake, why, fix]) => ({ mistake, why, fix })),
    checklist: c.check,
  };
}

/* ==========================================================================
   addDetail: adds extra "going deeper" content to a lesson that already
   exists. The base lesson keeps its short teaching; the extra sections are
   appended after it, so the lesson reads: short summary, then detail.
   Each extra list uses the same shape as the L() inputs above:
     teach: [["Heading", ["paragraph", …], "key point"], …]
     ex:    [["question", ["step", …], "answer"], …]
     mis:   [["mistake", "why it's wrong", "what to do instead"], …]
   ========================================================================== */
export function addDetail(content, extra) {
  if (!extra) return content;
  return {
    ...content,
    // Extra intro sentences follow the short introduction; a prior list replaces the short one
    introduction: extra.intro ? [...content.introduction, ...extra.intro] : content.introduction,
    priorKnowledge: extra.prior ?? content.priorKnowledge,
    teaching: [
      ...content.teaching,
      ...(extra.teach || []).map(([heading, text, keyPoint]) => ({
        heading,
        paragraphs: Array.isArray(text) ? text : [text],
        keyPoint,
      })),
    ],
    examples: [
      ...content.examples,
      ...(extra.ex || []).map(([question, steps, answer]) => ({ question, steps, answer })),
    ],
    mistakes: [
      ...content.mistakes,
      ...(extra.mis || []).map(([mistake, why, fix]) => ({ mistake, why, fix })),
    ],
  };
}

/* ==========================================================================
   addVisuals: attaches a diagram to a teaching step, found by its heading.
   The map key is the heading text. If a heading appears more than once in a
   lesson, "@2" picks the second one, "@3" the third, and so on. A step that
   already has a visual is left alone.
   ========================================================================== */
export function addVisuals(content, map) {
  if (!map) return content;
  const seen = {};
  const teaching = content.teaching.map((step) => {
    const n = (seen[step.heading] = (seen[step.heading] ?? 0) + 1);
    const spec = map[`${step.heading}@${n}`] ?? (n === 1 ? map[step.heading] : undefined);
    return spec && !step.visual ? { ...step, visual: spec } : step;
  });
  return { ...content, teaching };
}
