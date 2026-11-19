/* ==========================================================================
   unit(): builds one unit of the course, with its lessons
   --------------------------------------------------------------------------
   Used by curriculum.js (Years 7 to 11), so every unit has exactly the same shape.

   unit(id, year, strand, title, intro, objectives, prerequisites, lessons)
     id             e.g. "y7-u1" (Year 7, unit 1). Lesson ids add "-l1", "-l2"...
     strand         the topic it belongs to: an id from strands.js
     objectives     "I can..." statements shown on the unit page
     prerequisites  ids of earlier units this one builds on
     lessons        lesson titles, or [title, tier, grades] for GCSE lessons
   ========================================================================== */
import { FULL_LESSON_IDS } from "./lessons/index.js";

// Helper: write units compactly. Lessons are given as titles, or as
// [title, tier, grades] for GCSE lessons.
export function unit(id, year, strand, title, intro, objectives, prerequisites, lessons, extra = {}) {
  return {
    id,
    year,
    strand,
    title,
    intro,
    objectives,
    prerequisites,
    ...extra,
    lessons: lessons.map((l, i) => {
      const [lessonTitle, tier, grades] = Array.isArray(l) ? l : [l];
      const lessonId = `${id}-l${i + 1}`;
      return {
        id: lessonId,
        unitId: id,
        number: i + 1,
        title: lessonTitle,
        tier: tier ?? null,       // "F" = Foundation and Higher, "H" = Higher only, null = KS3
        grades: grades ?? null,   // indicative GCSE grades, e.g. "4–5"
        status: FULL_LESSON_IDS.includes(lessonId) ? "full" : "planned",
      };
    }),
  };
}

