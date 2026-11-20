/* ==========================================================================
   Teaching text, all lessons (SERVER-ONLY SOURCE)
   --------------------------------------------------------------------------
   This file gathers every lesson's teaching text, worked examples, checklist
   and graph settings into one place. The WEBSITE does NOT import it, so these
   words are not sent to visitors' browsers.

   Who uses it:
     • scripts/upload-lessons.mjs, which stores the text in the members-only
       database table (see supabase/lesson-content.sql). Run on your computer.
   The pages get the text from the database after a member logs in.

   To add or change a lesson's text, edit the lesson files listed below, then
   run the upload script again.
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

// The complete teaching text of one lesson, or null if there is none.
export function getTeachingContent(lessonId) {
  return CONTENT[lessonId] ?? null;
}
