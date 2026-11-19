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
import { Y12A_LESSONS } from "./y12-a.js";
import { Y12B_LESSONS } from "./y12-b.js";
import { Y13A_LESSONS } from "./y13-a.js";
import { Y13B_LESSONS } from "./y13-b.js";
import { Y12C_LESSONS } from "./y12-c.js";
import { Y13C_LESSONS } from "./y13-c.js";
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
import { Y12A_GENERATORS } from "../../engine/generators/y12a.js";
import { Y12B_GENERATORS } from "../../engine/generators/y12b.js";
import { Y13A_GENERATORS } from "../../engine/generators/y13a.js";
import { Y13B_GENERATORS } from "../../engine/generators/y13b.js";
import { Y12C_GENERATORS } from "../../engine/generators/y12c.js";
import { Y13C_GENERATORS } from "../../engine/generators/y13c.js";

// Going-deeper detail for the harder A level lessons (see light.js addDetail)
import { addDetail, addVisuals } from "./light.js";
// Diagrams for teaching steps, keyed by lesson id then by heading (see visuals.js)
import { VISUALS } from "./visuals.js";
import { VISUALS_Y12_MORE } from "./visuals-y12-more.js";
import { VISUALS_Y13 } from "./visuals-y13.js";
import { VISUALS_GCSE } from "./visuals-gcse.js";
import { VISUALS_SHAPES } from "./visuals-shapes.js";
import { Y13A_DETAIL } from "./detail-y13a.js";
import { Y12A_DETAIL } from "./detail-y12a.js";
import { Y12B_DETAIL } from "./detail-y12b.js";
import { Y12C_DETAIL } from "./detail-y12c.js";
import { Y13B_DETAIL } from "./detail-y13b.js";
import { Y13C_DETAIL } from "./detail-y13c.js";

const CONTENT = { ...Y7U1_LESSONS, ...Y7B_LESSONS, ...Y8_LESSONS, ...Y9A_LESSONS, ...Y9B_LESSONS, ...Y10A_LESSONS, ...Y10B_LESSONS, ...Y10C_LESSONS, ...Y11A_LESSONS, ...Y11B_LESSONS, ...Y12A_LESSONS, ...Y12B_LESSONS, ...Y13A_LESSONS, ...Y13B_LESSONS, ...Y12C_LESSONS, ...Y13C_LESSONS };
const GENERATORS = { ...Y7U1_GENERATORS, ...Y7B_GENERATORS, ...Y8_GENERATORS, ...Y9A_GENERATORS, ...Y9B_GENERATORS, ...Y10A_GENERATORS, ...Y10B_GENERATORS, ...Y10C_GENERATORS, ...Y11A_GENERATORS, ...Y11B_GENERATORS, ...Y11C_GENERATORS, ...Y12A_GENERATORS, ...Y12B_GENERATORS, ...Y13A_GENERATORS, ...Y13B_GENERATORS, ...Y12C_GENERATORS, ...Y13C_GENERATORS };

// Add the going-deeper detail to each lesson that has it. Lessons without a
// detail entry keep their short teaching unchanged.
const DETAIL = { ...Y12A_DETAIL, ...Y12B_DETAIL, ...Y12C_DETAIL, ...Y13A_DETAIL, ...Y13B_DETAIL, ...Y13C_DETAIL };
for (const id of Object.keys(DETAIL)) {
  if (CONTENT[id]) CONTENT[id] = addDetail(CONTENT[id], DETAIL[id]);
}
// Each visual set is merged in turn; a later set adds to an earlier one for the same lesson
for (const set of [VISUALS, VISUALS_Y12_MORE, VISUALS_Y13, VISUALS_GCSE, VISUALS_SHAPES]) {
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
