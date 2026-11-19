// ==========================================================================
// Edge Function: student-accounts
// --------------------------------------------------------------------------
// Creates, resets and removes pupil logins. It runs on Supabase's servers,
// not in the browser, because it needs the SECRET key, which can do anything
// to the database. The secret key is never sent to the website.
//
// Only a logged-in parent, teacher or tutor can use it, and only on pupils
// they own. Each request is checked against the caller's own login.
//
// SETUP (once, using the Supabase CLI):
//   supabase secrets set SB_SECRET_KEY=sb_secret_...
//   supabase functions deploy student-accounts --no-verify-jwt
// (--no-verify-jwt because this function checks the login itself.)
// ==========================================================================

// Used to build each pupil's login email. Must match PUPIL_EMAIL_DOMAIN in src/lib/supabase.js.
const PUPIL_EMAIL_DOMAIN = "pupils.mollsmaths.com";
const ADULT_TYPES = ["parent", "teacher", "tutor"];

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SECRET_KEY = Deno.env.get("SB_SECRET_KEY")!;

// Letters and numbers that are easy to read aloud and type. No 0/O, 1/l/I.
const PASSWORD_CHARS = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

// Calls Supabase's own web API with the secret key (sent in the apikey header only).
async function admin(path: string, init: RequestInit = {}) {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      apikey: SECRET_KEY,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, data: text ? JSON.parse(text) : null };
}

// Who is calling? Check the user's login token with Supabase.
async function callerId(req: Request): Promise<string | null> {
  const token = req.headers.get("Authorization")?.replace(/^Bearer /, "");
  if (!token) return null;
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SECRET_KEY, Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const user = await res.json();
  return user?.id ?? null;
}

// Only adults (parent, teacher, tutor) may manage pupils.
async function isAdult(id: string): Promise<boolean> {
  const r = await admin(`/rest/v1/profiles?select=account_type&id=eq.${id}`);
  return r.ok && r.data?.length === 1 && ADULT_TYPES.includes(r.data[0].account_type);
}

// The pupil's record, only if it belongs to this adult.
async function ownedPupil(studentId: string, ownerId: string) {
  const r = await admin(`/rest/v1/students?select=*&id=eq.${studentId}&owner_id=eq.${ownerId}`);
  return r.ok && r.data?.length === 1 ? r.data[0] : null;
}

// Keeps the letters only, in lower case, and takes the first 3 (e.g. "Mary" -> "mar").
const part = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "").slice(0, 3);

// Generates a password with the browser-safe character set.
function makePassword(): string {
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => PASSWORD_CHARS[b % PASSWORD_CHARS.length]).join("");
}

// The login email is built from the username, so a pupil can log in with just a username.
const pupilEmail = (username: string) => `${username}@${PUPIL_EMAIL_DOMAIN}`;

// ---------- Actions ----------

async function createPupil(ownerId: string, body: any) {
  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const yearGroup = Number(body.yearGroup);
  if (!firstName || !lastName) return json({ error: "Please enter the pupil's first and last name." }, 400);
  if (!(yearGroup >= 7 && yearGroup <= 11)) return json({ error: "Please choose a year group from 7 to 11." }, 400);
  if (body.consent !== true) return json({ error: "Please confirm you are entitled to add this pupil." }, 400);

  const base = part(firstName) + part(lastName);
  if (base.length < 2) return json({ error: "Names must include letters." }, 400);

  // Try the plain username first, then add 2, 3, ... if it is taken.
  for (let n = 1; n <= 50; n++) {
    const username = n === 1 ? base : `${base}${n}`;
    const password = makePassword();

    // 1. Create the pupil's login. It is confirmed straight away, because the pupil has no email.
    const created = await admin("/auth/v1/admin/users", {
      method: "POST",
      body: JSON.stringify({
        email: pupilEmail(username),
        password,
        email_confirm: true,
        user_metadata: { account_type: "student", display_name: firstName },
      }),
    });
    if (created.status === 422 || created.status === 409) continue; // this username is taken
    if (!created.ok) return json({ error: "Could not create the pupil's login. Please try again." }, 500);

    // 2. Add the pupil's record. If that fails, remove the login so nothing is left half-made.
    const row = await admin("/rest/v1/students?select=*", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        owner_id: ownerId,
        first_name: firstName,
        last_name: lastName,
        year_group: yearGroup,
        username,
        auth_user_id: created.data.id,
        consent_confirmed_at: new Date().toISOString(),
      }),
    });
    if (!row.ok) {
      await admin(`/auth/v1/admin/users/${created.data.id}`, { method: "DELETE" });
      continue; // most likely a username clash, so try the next number
    }
    return json({ student: row.data[0], username, password });
  }
  return json({ error: "Could not find a free username. Please try different names." }, 409);
}

async function resetPassword(ownerId: string, body: any) {
  const pupil = await ownedPupil(String(body.studentId ?? ""), ownerId);
  if (!pupil) return json({ error: "Pupil not found." }, 404);
  const password = makePassword();
  const r = await admin(`/auth/v1/admin/users/${pupil.auth_user_id}`, {
    method: "PUT",
    body: JSON.stringify({ password }),
  });
  if (!r.ok) return json({ error: "Could not reset the password. Please try again." }, 500);
  return json({ username: pupil.username, password });
}

async function removePupil(ownerId: string, body: any) {
  const pupil = await ownedPupil(String(body.studentId ?? ""), ownerId);
  if (!pupil) return json({ error: "Pupil not found." }, 404);
  // Deleting the login also deletes the pupil's record (the link is set to cascade).
  const r = await admin(`/auth/v1/admin/users/${pupil.auth_user_id}`, { method: "DELETE" });
  if (!r.ok) return json({ error: "Could not remove the pupil. Please try again." }, 500);
  return json({ removed: true });
}

// ---------- Entry point ----------
Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "Use POST." }, 405);

  const ownerId = await callerId(req);
  if (!ownerId) return json({ error: "Please log in first." }, 401);
  if (!(await isAdult(ownerId))) return json({ error: "Only parent, teacher and tutor accounts can manage pupils." }, 403);

  const body = await req.json().catch(() => ({}));
  switch (body.action) {
    case "create": return createPupil(ownerId, body);
    case "reset": return resetPassword(ownerId, body);
    case "remove": return removePupil(ownerId, body);
    default: return json({ error: "Unknown action." }, 400);
  }
});
