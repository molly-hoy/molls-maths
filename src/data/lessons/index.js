/* ==========================================================================
   Lesson registry (website side)
   --------------------------------------------------------------------------
   The WEBSITE imports this file. It holds the question generators (which make
   the practice questions and check answers) and the helpers the pages use.

   The teaching text is NOT here any more. It lives in:
     • teaching.js: the source files, read only by scripts/upload-lessons.mjs
     • the members-only database table, read by the lesson page after login
       (see supabase/lesson-content.sql)

   To publish a new lesson:
     1. write its teaching text (see teaching.js for the files), then run
        scripts/upload-lessons.mjs
     2. write its generators and add them below
   The curriculum map then marks the lesson as "full" automatically.
   ========================================================================== */
import { Y7U1_GENERATORS } from "../../engine/generators/y7u1.js";
import { Y7B_GENERATORS } from "../../engine/generators/y7b.js";
import { Y8_GENERATORS } from "../../engine/generators/y8.js";
import { Y9A_GENERATORS } from "../../engine/generators/y9a.js";
import { Y9B_GENERATORS } from "../../engine/generators/y9b.js";
import { Y10A_GENERATORS } from "../../engine/generators/y10a.js";
import { Y10B_GENERATORS } from "../../engine/generators/y10b.js";
import { Y10C_GENERATORS } from "../../engine/generators/y10c.js";
import { Y11A_GENERATORS } from "../../engine/generators/y11a.js";
import { Y11B_GENERATORS } from "../../engine/generators/y11b.js";
import { Y11C_GENERATORS } from "../../engine/generators/y11c.js";

const GENERATORS = { ...Y7U1_GENERATORS, ...Y7B_GENERATORS, ...Y8_GENERATORS, ...Y9A_GENERATORS, ...Y9B_GENERATORS, ...Y10A_GENERATORS, ...Y10B_GENERATORS, ...Y10C_GENERATORS, ...Y11A_GENERATORS, ...Y11B_GENERATORS, ...Y11C_GENERATORS, };

// Only lessons with generators count as written. (A lesson is written when it
// has both its teaching text, stored on the server, and its generators.)
export const FULL_LESSON_IDS = Object.keys(GENERATORS).filter((id) => GENERATORS[id]?.length);
export const ALL_GENERATORS = Object.values(GENERATORS).flat();

/* Graphs store their formulas as text in the database, e.g. "(x) => x * x".
   This turns those texts back into working functions for the graph drawing.
   Only the keys "f" (a curve) and "test" (a shaded region) are changed. The
   text comes only from our own uploaded lesson files, never from visitors. */
export function reviveTeaching(value) {
  if (Array.isArray(value)) return value.map(reviveTeaching);
  if (value && typeof value === "object") {
    const out = {};
    for (const [key, v] of Object.entries(value)) {
      const isFormula = (key === "f" || key === "test") && typeof v === "string" && v.trim().startsWith("(");
      out[key] = isFormula ? new Function("return " + v)() : reviveTeaching(v);
    }
    return out;
  }
  return value;
}

/* Builds everything the lesson page needs. `teaching` is the lesson's teaching
   text fetched from the database (already passed through reviveTeaching). */
export function getLessonContent(lessonId, teaching) {
  const gens = GENERATORS[lessonId];
  if (!teaching || !gens?.length) return null;
  const byLevel = (level) => gens.find((g) => g.level === level);
  if (teaching.light) {
    // Light lessons: Core (level 1) and Extend (level 2)
    return {
      ...teaching,
      generators: gens,
      guided: [byLevel(1), byLevel(2)],
      independent: [1, 1, 1, 2, 2, 2].map(byLevel),
      quiz: [1, 1, 2, 2].map(byLevel),
    };
  }
  return {
    ...teaching,
    generators: gens,
    guided: [byLevel(1), byLevel(2)],                                    // H
    independent: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4].map(byLevel),      // I
    quiz: [1, 2, 2, 3, 4].map(byLevel),                                  // L
  };
}

export function generatorsFor(lessonId) {
  return GENERATORS[lessonId] ?? [];
}
