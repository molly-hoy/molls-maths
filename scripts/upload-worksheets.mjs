// ==========================================================================
// Uploads the worksheet PDFs to the PRIVATE "worksheets" storage bucket.
// --------------------------------------------------------------------------
// Run this on YOUR computer, from the project folder, after building the PDFs:
//
//   SUPABASE_URL=https://your-project-ref.supabase.co SB_SECRET_KEY=sb_secret_... node scripts/upload-worksheets.mjs
//
// The secret key stays on your computer. Never put it in the website's .env
// file, and never commit it. Run it again after changing any worksheet; the
// new file replaces the old one.
// ==========================================================================
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const BASE = (process.env.SUPABASE_URL ?? "").replace(/\/$/, "");
const KEY = process.env.SB_SECRET_KEY ?? "";
if (!BASE || !KEY) {
  console.error("Set SUPABASE_URL and SB_SECRET_KEY first (see the note at the top of this file).");
  process.exit(1);
}

// The PDFs the build script made: with answers, and the pupil copies without.
const SRC = path.resolve("worksheets-src/output");
const PUPIL_SRC = path.join(SRC, "pupil");

async function uploadOne(localFile, bucketPath) {
  const body = await readFile(localFile);
  const res = await fetch(`${BASE}/storage/v1/object/worksheets/${bucketPath}`, {
    method: "POST",
    headers: {
      apikey: KEY,   // the secret key goes in this header only, not in Authorization
      "Content-Type": "application/pdf",
      "x-upsert": "true",   // replace the file if it is already there
    },
    body,
  });
  if (!res.ok) throw new Error(`${bucketPath}: ${res.status} ${await res.text()}`);
}

async function uploadAll(folder, prefix) {
  const names = (await readdir(folder)).filter((n) => n.endsWith(".pdf"));
  let done = 0;
  // A few at a time: quick, but not so many that the server refuses.
  for (let i = 0; i < names.length; i += 6) {
    await Promise.all(names.slice(i, i + 6).map((n) => uploadOne(path.join(folder, n), prefix + n)));
    done += Math.min(6, names.length - i);
    process.stdout.write(`\r${prefix || "full copies"}: ${done}/${names.length}`);
  }
  console.log();
  return names.length;
}

const full = await uploadAll(SRC, "");
const pupil = await uploadAll(PUPIL_SRC, "pupil/");
console.log(`Uploaded ${full} worksheets and ${pupil} pupil copies to the private bucket.`);
