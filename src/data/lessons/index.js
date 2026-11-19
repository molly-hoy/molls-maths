/* ==========================================================================
   Lesson content registry
   --------------------------------------------------------------------------
   Connects each written lesson to its teaching content and its question
   generators. To publish a new lesson:
     1. write its content (Y7: full format in y7-u1.js; Y10: light format,
        see light.js and y10-a.js)
     2. write its generators (Y7: four levels; light lessons: core + extend)
     3. add both below
   The curriculum map then marks the lesson as "full" automatically.
   ========================================================================== */
import { Y7U1_LESSONS } from "./y7-u1.js";
import { Y10A_LESSONS } from "./y10-a.js";
import { Y10B_LESSONS } from "./y10-b.js";
import { Y10C_LESSONS } from "./y10-c.js";
import { Y7B_LESSONS } from "./y7-b.js";
import { Y8_LESSONS } from "./y8.js";
import { Y9A_LESSONS } from "./y9-a.js";
import { Y9B_LESSONS } from "./y9-b.js";
import { Y11A_LESSONS } from "./y11-a.js";
import { Y11B_LESSONS } from "./y11-b.js";
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

import { addDetail, addVisuals } from "./light.js";
// Diagrams for teaching steps, keyed by lesson id then by heading (see visuals.js)
import { VISUALS } from "./visuals.js";
import { VISUALS_GCSE } from "./visuals-gcse.js";
import { VISUALS_SHAPES } from "./visuals-shapes.js";
import { VISUALS_REMAINING } from "./visuals-remaining.js";
import { VISUALS_INVENTED } from "./visuals-invented.js";
import { VISUALS_ANGLES } from "./visuals-angles.js";
import { DETAIL_ANGLES } from "./detail-angles.js";
import { DETAIL_Y7A } from "./detail-y7a.js";
import { DETAIL_Y7B } from "./detail-y7b.js";
import { DETAIL_Y8A } from "./detail-y8a.js";
import { DETAIL_Y8B } from "./detail-y8b.js";
import { DETAIL_Y9A } from "./detail-y9a.js";
import { DETAIL_Y9B } from "./detail-y9b.js";
import { DETAIL_Y10A } from "./detail-y10a.js";
import { DETAIL_Y10B } from "./detail-y10b.js";
import { DETAIL_Y11 } from "./detail-y11.js";

const CONTENT = { ...Y7U1_LESSONS, ...Y7B_LESSONS, ...Y8_LESSONS, ...Y9A_LESSONS, ...Y9B_LESSONS, ...Y10A_LESSONS, ...Y10B_LESSONS, ...Y10C_LESSONS, ...Y11A_LESSONS, ...Y11B_LESSONS, };
const GENERATORS = { ...Y7U1_GENERATORS, ...Y7B_GENERATORS, ...Y8_GENERATORS, ...Y9A_GENERATORS, ...Y9B_GENERATORS, ...Y10A_GENERATORS, ...Y10B_GENERATORS, ...Y10C_GENERATORS, ...Y11A_GENERATORS, ...Y11B_GENERATORS, ...Y11C_GENERATORS, };

// Add the going-deeper detail to each lesson that has it. Lessons without a
// detail entry keep their short teaching unchanged.
const DETAIL = { ...DETAIL_Y7A, ...DETAIL_Y7B, ...DETAIL_Y8A, ...DETAIL_Y8B, ...DETAIL_Y9A, ...DETAIL_Y9B, ...DETAIL_Y10A, ...DETAIL_Y10B, ...DETAIL_Y11, ...DETAIL_ANGLES, };
for (const id of Object.keys(DETAIL)) {
  if (CONTENT[id]) CONTENT[id] = addDetail(CONTENT[id], DETAIL[id]);
}
// Each visual set is merged in turn; a later set adds to an earlier one for the same lesson
for (const set of [VISUALS, VISUALS_GCSE, VISUALS_SHAPES, VISUALS_REMAINING, VISUALS_INVENTED, VISUALS_ANGLES]) {
  for (const id of Object.keys(set)) {
    if (CONTENT[id]) CONTENT[id] = addVisuals(CONTENT[id], set[id]);
  }
}

// Only lessons with BOTH content and generators count as written.
export const FULL_LESSON_IDS = Object.keys(CONTENT).filter((id) => GENERATORS[id]?.length);
export const ALL_GENERATORS = Object.values(GENERATORS).flat();

export function getLessonContent(lessonId) {
  const content = CONTENT[lessonId];
  const gens = GENERATORS[lessonId];
  if (!content || !gens?.length) return null;
  const byLevel = (level) => gens.find((g) => g.level === level);
  if (content.light) {
    // Light lessons: Core (level 1) and Extend (level 2)
    return {
      ...content,
      generators: gens,
      guided: [byLevel(1), byLevel(2)],
      independent: [1, 1, 1, 2, 2, 2].map(byLevel),
      quiz: [1, 1, 2, 2].map(byLevel),
    };
  }
  return {
    ...content,
    generators: gens,
    guided: [byLevel(1), byLevel(2)],                                    // H
    independent: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4].map(byLevel),      // I
    quiz: [1, 2, 2, 3, 4].map(byLevel),                                  // L
  };
}

export function generatorsFor(lessonId) {
  return GENERATORS[lessonId] ?? [];
}
