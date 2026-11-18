/* ==========================================================================
   sentences(): splits a paragraph of lesson text into separate sentences
   --------------------------------------------------------------------------
   Used by the lesson page so each teaching sentence can be its own bullet
   point, and each key point sentence can sit on its own line.

   A new sentence starts after . ! or ? followed by a space, EXCEPT:
     - after short forms such as e.g. i.e. d.p. s.f. etc.
     - after a list number such as "1." or "2." (so "1. Assume…" stays whole)

   Example:
     sentences("Add the powers. Then simplify.")
     → ["Add the powers.", "Then simplify."]
   ========================================================================== */
const SPLIT = /(?<!\b(?:e\.g|i\.e|d\.p|s\.f|etc|vs)\.)(?<!(?:^|\s)\d+\.)(?<=[.!?])\s+/;

export function sentences(text) {
  if (typeof text !== "string") return [];
  return text.split(SPLIT).map((s) => s.trim()).filter(Boolean);
}
