// ==========================================================================
// Edge Function: worksheet-link
// --------------------------------------------------------------------------
// Gives a logged-in paid member a short-lived link to one worksheet PDF.
// The PDFs sit in a PRIVATE storage bucket, so the only way to reach one is
// through this function. It runs on Supabase's servers and uses the SECRET
// key, which never goes to the website.
//
// Each request is checked twice:
//   1. the caller's own login must be valid, and
//   2. account_has_access() (see schema.sql) must say they have a paid plan.
// The second check runs with the caller's login, so the database applies the
// same rules as the rest of the site.
//
// SETUP (once, using the Supabase CLI, after the secret is set for student-accounts):
//   supabase functions deploy worksheet-link --no-verify-jwt
// (--no-verify-jwt because this function checks the login itself.)
// ==========================================================================

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SECRET_KEY = Deno.env.get("SB_SECRET_KEY")!;

const BUCKET = "worksheets";
const LINK_SECONDS = 300;   // the link stops working after 5 minutes
// Only the names the bucket holds: "<slug>.pdf" or "pupil/<slug>.pdf". Nothing else.
const PATH_PATTERN = /^(pupil\/)?[a-z0-9-]+\.pdf$/;

// The browser checks permission before the real request (a "preflight").
// These headers say the website may call this function. The function still
// checks the caller's login itself, so the headers don't let strangers in.
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, apikey, Authorization",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return json({ error: "Use POST." }, 405);

  // 1. Who is calling?
  const token = req.headers.get("Authorization")?.replace(/^Bearer /, "");
  if (!token) return json({ error: "Log in to open worksheets." }, 401);

  // The file name must be one we expect, so nobody can ask for anything else.
  let body: { path?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Unknown worksheet." }, 400);
  }
  const path = typeof body.path === "string" ? body.path : "";
  if (!PATH_PATTERN.test(path)) return json({ error:"Unknown worksheet." }, 400);

  // Pupils may open only the pupil copies (no answers). An adult has a row in the
  // profiles table, and a pupil does not. The user's own login decides what they can read.
  const profileCheck = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=id`, {
    headers: { apikey: SECRET_KEY, Authorization: `Bearer ${token}` },
  });
  const profileRows = profileCheck.ok ? await profileCheck.json() : [];
  const isAdult = Array.isArray(profileRows) && profileRows.length === 1;
  if (!isAdult && !path.startsWith("pupil/")) return json({ error: "Pupils can only open the pupil copy." }, 403);

  // 2. Does this login have a paid plan? The database decides, using the caller's own login.
  const access = await fetch(`${SUPABASE_URL}/rest/v1/rpc/account_has_access`, {
    method: "POST",
    headers: { apikey: SECRET_KEY, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: "{}",
  });
  if (!access.ok) return json({ error: "Log in to open worksheets." }, 401);
  if ((await access.json()) !== true) return json({ error: "Worksheets are for paid members." }, 403);

  // 3. Make the short-lived link to the private file.
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/sign/${BUCKET}/${path}`, {
    method: "POST",
    // The secret key goes in the apikey header only. It is not a login token,
    // so it must not be sent as "Bearer ...".
    headers: { apikey: SECRET_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ expiresIn: LINK_SECONDS }),
  });
  if (!res.ok) return json({ error: "The worksheet could not be opened. Try again later." }, 502);
  const data = await res.json();   // { signedURL: "/object/sign/worksheets/..." }
  return json({ url: `${SUPABASE_URL}/storage/v1${data.signedURL}` });
});
