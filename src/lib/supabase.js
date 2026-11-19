/* ==========================================================================
   Supabase connection (no extra package needed)
   --------------------------------------------------------------------------
   Supabase is the database and login service. This file talks to it
   directly with the browser's built-in fetch(), so nothing needs installing.

   SETTINGS: two values go in a file called .env in the project folder
   (it is private and git ignores it):

       VITE_SUPABASE_URL=https://your-project-ref.supabase.co
       VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...

   The publishable key is designed to be public, so it is fine in the
   browser. NEVER put the secret key (sb_secret_...) in this file or any
   VITE_ setting, because Vite would ship it to every visitor.

   The login details are kept in localStorage under SESSION_KEY, so you stay
   logged in after a refresh. Nothing else is stored in cookies.
   ========================================================================== */

const BASE_URL = (import.meta.env.VITE_SUPABASE_URL ?? "").replace(/\/$/, "");
const PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";

export const supabaseConfigured = Boolean(BASE_URL && PUBLISHABLE_KEY);
export const SESSION_KEY = "molls-maths-auth-v1";

// Pupil logins use an address on this domain, built from the username. Pupils
// never receive email there. Must match PUPIL_EMAIL_DOMAIN in the Edge Function.
export const PUPIL_EMAIL_DOMAIN = "pupils.mollsmaths.com";

export class SupabaseError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "SupabaseError";
    this.status = status;
  }
}

/* ---------- Saving the login between visits ---------- */
export function readSavedSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) ?? null;
  } catch {
    return null;
  }
}

function saveSession(session) {
  try {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    // Storage blocked (e.g. private browsing): the login lasts this visit only.
  }
}

/* ---------- One place that makes every web request ---------- */
// `token` is the logged-in user's access token. The publishable key goes in
// the "apikey" header on its own; it is not used as a bearer token.
async function request(path, { method = "GET", body, token, headers = {} } = {}) {
  if (!supabaseConfigured) throw new SupabaseError("Accounts are not set up on this site yet.", 0);

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      apikey: PUBLISHABLE_KEY,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    // Supabase puts the reason in different fields depending on the endpoint.
    const message = data?.msg ?? data?.error_description ?? data?.message ?? data?.error ?? `Something went wrong (${res.status}).`;
    throw new SupabaseError(message, res.status);
  }
  return data;
}

/* ---------- Login and accounts ---------- */

// Turns the reply from Supabase into the session we keep. A reply without
// an access_token means the user must confirm their email first.
function sessionFrom(data) {
  if (!data?.access_token) return null;
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: data.expires_at ?? Math.floor(Date.now() / 1000) + (data.expires_in ?? 3600),
    user: data.user,
  };
}

export async function signUp({ email, password, displayName, accountType, privacyVersion }) {
  const data = await request("/auth/v1/signup", {
    method: "POST",
    body: {
      email,
      password,
      data: { display_name: displayName, account_type: accountType, privacy_version: privacyVersion },
    },
  });
  const session = sessionFrom(data);
  saveSession(session);
  return { session, needsConfirmation: !session };
}

export async function signIn({ email, password }) {
  const data = await request("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: { email, password },
  });
  const session = sessionFrom(data);
  saveSession(session);
  return session;
}

// Pupils log in with their username; it becomes the login address.
export function signInPupil({ username, password }) {
  return signIn({ email: `${username.trim().toLowerCase()}@${PUPIL_EMAIL_DOMAIN}`, password });
}

export async function signOut() {
  const saved = readSavedSession();
  try {
    if (saved?.access_token) await request("/auth/v1/logout", { method: "POST", token: saved.access_token });
  } catch {
    // Even if the server can't be reached, forget the login on this device.
  }
  saveSession(null);
}

// Returns a usable session, refreshing the token if it is about to expire.
// Returns null when nobody is logged in or the login can no longer be renewed.
export async function getValidSession() {
  const saved = readSavedSession();
  if (!saved?.access_token) return null;

  const expiresSoon = saved.expires_at * 1000 - Date.now() < 60_000;
  if (!expiresSoon) return saved;

  try {
    const data = await request("/auth/v1/token?grant_type=refresh_token", {
      method: "POST",
      body: { refresh_token: saved.refresh_token },
    });
    const session = sessionFrom(data);
    saveSession(session);
    return session;
  } catch {
    saveSession(null);
    return null;
  }
}

/* ---------- Reading rows in the database ----------
   `path` is the table plus any filters, e.g. "students?select=*&order=last_name.asc".
   The access rules in schema.sql decide what each call is allowed to see. */
export function dbSelect(path, token) {
  return request(`/rest/v1/${path}`, { token });
}

// Adding a row. Prefer asks Supabase to send the new row back. The access
// rules still apply, so a user can only add what schema.sql allows.
export function dbInsert(path, row, token) {
  return request(`/rest/v1/${path}`, { method: "POST", body: row, token, headers: { Prefer: "return=representation" } });
}

// Deleting rows that match the filter in `path`, e.g. "feedback?id=eq.123".
export function dbDelete(path, token) {
  return request(`/rest/v1/${path}`, { method: "DELETE", token, headers: { Prefer: "return=minimal" } });
}

/* ---------- Actions that need the secret key (run by the Edge Function) ---------- */
export function callStudentAccounts(body, token) {
  return request("/functions/v1/student-accounts", { method: "POST", body, token });
}
