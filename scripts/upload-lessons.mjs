// ==========================================================================
// Upload the lesson teaching text to the members-only database table.
// --------------------------------------------------------------------------
// Run this on YOUR computer, from the project folder, after running
// supabase/lesson-content.sql once in the Supabase SQL Editor.
//
//   SUPABASE_URL=https://your-project-ref.supabase.co SB_SECRET_KEY=sb_secret_... node scripts/upload-lessons.mjs
//
// The secret key (sb_secret_...) is typed here only. Never put it in .env,
// in the website's code, or in GitHub.
//
// It sends every written lesson's teaching text to the table lesson_content.
// Running it again replaces the text, so you can re-run it after editing a lesson.
// ==========================================================================

import { FULL_LESSON_IDS } from "../src/data/lessons/index.js";
import { getTeachingContent } from "../src/data/lessons/teaching.js";

const BASE = (process.env.SUPABASE_URL ?? "").replace(/\/$/, "");
const KEY = process.env.SB_SECRET_KEY ?? "";

if (!BASE || !KEY) {
  console.error("Set SUPABASE_URL and SB_SECRET_KEY first (see the note at the top of this file).");
  process.exit(1);
}

// Sends the rows in groups, so a failure is easy to spot.
const GROUP_SIZE = 25;

async function uploadGroup(rows) {
  const res = await fetch(`${BASE}/rest/v1/lesson_content?on_conflict=lesson_id`, {
    method: "POST",
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      // merge-duplicates replaces the row when the lesson already exists
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed (${res.status}): ${text}`);
  }
}

// Some graphs store their formula as a function, such as (x) => x * x. A database
// cannot hold a function, so each one is saved as its source text, "(x) => x * x".
// The website turns that text back into a function when it draws the graph.
const saveFunctionsAsText = (key, value) => (typeof value === "function" ? value.toString() : value);

// Build the rows: plain data, with functions saved as text.
const rows = FULL_LESSON_IDS.map((id) => {
  const body = getTeachingContent(id);
  if (!body) throw new Error(`No teaching text found for ${id}`);
  return {
    lesson_id: id,
    body: JSON.parse(JSON.stringify(body, saveFunctionsAsText)),
    updated_at: new Date().toISOString(),
  };
});

console.log(`Uploading ${rows.length} lessons…`);
for (let i = 0; i < rows.length; i += GROUP_SIZE) {
  await uploadGroup(rows.slice(i, i + GROUP_SIZE));
  console.log(`  done ${Math.min(i + GROUP_SIZE, rows.length)} of ${rows.length}`);
}
console.log("All lessons uploaded.");
