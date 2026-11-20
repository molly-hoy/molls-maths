/* ==========================================================================
   Account page: log in, create an account, and manage pupils
   --------------------------------------------------------------------------
   Logged out: log in as a parent, teacher or tutor, log in as a pupil with
   a username and password, or create an account (which needs consent to the
   privacy notice).
   Adults: add (one at a time or from a spreadsheet), reset the password for,
   remove pupils, and view each pupil's progress or print the pupil reports.
   Pupils: see their own details.

   The privacy notice version is recorded when someone creates an account
   (see PRIVACY_VERSION in PrivacyPage.jsx).
   ========================================================================== */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { ALL_UNITS, YEARS as COURSE_YEARS } from "../data/curriculum.js";
import { PRIVACY_VERSION } from "./PrivacyPage.jsx";
import { parsePupilCsv } from "../utils/pupilCsv.js";

// The most pupil accounts each kind of adult account may have. The server
// enforces the same numbers (see supabase/functions/student-accounts).
const PUPIL_LIMITS = { parent: 2, tutor: 10, teacher: 50 };
import styles from "./AccountPage.module.css";

const ACCOUNT_TYPES = [["parent", "Parent"], ["teacher", "Teacher"], ["tutor", "Tutor"]];
const YEARS = [7, 8, 9, 10, 11];   // the year groups a pupil can be in
const MIN_PASSWORD = 8;

/* ---------- Log in or create an account (adults and pupils) ---------- */
function AuthForm() {
  const { signIn, signInPupil, signUp } = useAuth();
  const [mode, setMode] = useState("login"); // "login", "pupil" or "signup"
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ email: "", password: "", displayName: "", accountType: "parent", adultCode: "", username: "", privacy: false });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const switchTo = (next) => { setMode(next); setError(""); setNotice(""); };

  async function submit(e) {
    e.preventDefault();
    setError("");
    setNotice("");
    if (mode === "signup") {
      if (form.password.length < MIN_PASSWORD) return setError(`Please use a password of at least ${MIN_PASSWORD} characters.`);
      if (!form.privacy) return setError("Please read the privacy notice and tick the box to create your account.");
    }
    setBusy(true);
    try {
      if (mode === "login") {
        await signIn({ email: form.email.trim(), password: form.password });
      } else if (mode === "pupil") {
        await signInPupil({ adultCode: form.adultCode, username: form.username, password: form.password });
      } else {
        const { needsConfirmation } = await signUp({
          email: form.email.trim(),
          password: form.password,
          displayName: form.displayName.trim(),
          accountType: form.accountType,
          privacyVersion: PRIVACY_VERSION,
        });
        if (needsConfirmation) setNotice("Almost there: check your email and click the link to confirm your account, then log in here.");
      }
    } catch (err) {
      setError(mode === "pupil" ? "That username or password isn't right. Ask your parent, teacher or tutor if you've forgotten them." : err.message);
    } finally {
      setBusy(false);
    }
  }

  const tab = (value, label) => (
    <button type="button" role="tab" aria-selected={mode === value} className={`btn btn-small ${mode === value ? "" : "btn-secondary"}`} onClick={() => switchTo(value)}>{label}</button>
  );

  return (
    <div className={`card ${styles.narrow}`}>
      <div className={styles.tabs} role="tablist" aria-label="Log in or create an account">
        {tab("login", "Adult log in")}
        {tab("pupil", "Pupil log in")}
        {tab("signup", "Create an account")}
      </div>

      <form onSubmit={submit} className={styles.form}>
        {mode === "signup" && (
          <>
            <div className="field">
              <label htmlFor="display-name">Your name</label>
              <input id="display-name" className="input" value={form.displayName} onChange={update("displayName")} required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="account-type">I am a</label>
              <select id="account-type" className="input" value={form.accountType} onChange={update("accountType")}>
                {ACCOUNT_TYPES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>
          </>
        )}

        {mode === "pupil" ? (
          <>
            {/* The adult's code tells the site which adult this pupil belongs to. Usernames can repeat between adults. */}
            <div className="field">
              <label htmlFor="adult-code">Your adult's pupil sign-in code</label>
              <input id="adult-code" className="input" value={form.adultCode} onChange={update("adultCode")} required autoComplete="off" autoCapitalize="none" spellCheck={false} />
              <p className="muted" style={{ fontSize: "0.9rem", margin: "0.25rem 0 0" }}>Your parent, teacher or tutor has this code on their account page.</p>
            </div>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input id="username" className="input" value={form.username} onChange={update("username")} required autoComplete="username" autoCapitalize="none" spellCheck={false} />
          </div>
          </>
        ) : (
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" className="input" value={form.email} onChange={update("email")} required autoComplete="email" />
          </div>
        )}

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="input"
            value={form.password}
            onChange={update("password")}
            required
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            minLength={mode === "signup" ? MIN_PASSWORD : undefined}
          />
        </div>

        {mode === "signup" && (
          <label className={styles.consent}>
            <input type="checkbox" checked={form.privacy} onChange={update("privacy")} required />
            <span>I have read the <Link to="/privacy">privacy notice</Link> and agree to my details being stored so I can use my account.</span>
          </label>
        )}

        {error && <p role="alert" className={styles.error}>{error}</p>}
        {notice && <p role="status" className={styles.notice}>{notice}</p>}

        <button type="submit" className="btn" disabled={busy}>
          {busy ? "Please wait…" : mode === "signup" ? "Create my account" : "Log in"}
        </button>
      </form>
    </div>
  );
}

/* ---------- A new or reset password, shown once ---------- */
function Credentials({ username, password, onDone }) {
  return (
    <div className={styles.credentials} role="status">
      <p style={{ margin: 0 }}><strong>Write these down now.</strong> The password is only shown this once. You can reset it later if it's lost.</p>
      <dl className={styles.creds}>
        <dt>Username</dt><dd><code>{username}</code></dd>
        <dt>Password</dt><dd><code>{password}</code></dd>
      </dl>
      <button type="button" className="btn btn-secondary btn-small" onClick={onDone}>I've saved them</button>
    </div>
  );
}

/* ---------- Adults: pupils ---------- */
function PupilList() {
  const { students, profile, addStudent, resetStudentPassword, removeStudent } = useAuth();
  const [form, setForm] = useState({ firstName: "", lastName: "", yearGroup: 7, consent: false });
  const [created, setCreated] = useState(null);   // { username, password } shown once
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // How many pupils this account may have, and whether it is full.
  const limit = PUPIL_LIMITS[profile?.account_type] ?? 0;
  const atLimit = students.length >= limit;

  // The spreadsheet import: the rows read from the file, the results once accounts are made.
  const [batchRows, setBatchRows] = useState([]);
  const [batchFileName, setBatchFileName] = useState("");
  const [batchConsent, setBatchConsent] = useState(false);
  const [batchBusy, setBatchBusy] = useState(false);
  const [batchResults, setBatchResults] = useState(null);   // [{ name, username, password, error }] shown once

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  async function add(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const result = await addStudent({ ...form, yearGroup: Number(form.yearGroup) });
      setCreated({ username: result.username, password: result.password });
      setForm({ firstName: "", lastName: "", yearGroup: form.yearGroup, consent: false });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function reset(student) {
    if (!window.confirm(`Create a new password for ${student.first_name}? Their old password will stop working.`)) return;
    setError("");
    try {
      const result = await resetStudentPassword(student.id);
      setCreated({ username: result.username, password: result.password });
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(student) {
    if (!window.confirm(`Remove ${student.first_name} ${student.last_name}? Their login and records will be deleted.`)) return;
    setError("");
    try {
      await removeStudent(student.id);
    } catch (err) {
      setError(err.message);
    }
  }

  // Reads the chosen CSV file and shows the rows before anything is created.
  async function chooseFile(e) {
    const file = e.target.files?.[0];
    setBatchResults(null);
    setBatchConsent(false);
    if (!file) { setBatchRows([]); setBatchFileName(""); return; }
    setBatchFileName(file.name);
    setBatchRows(parsePupilCsv(await file.text()));
  }

  // Makes one account for each good row. Each one is checked by the server,
  // so the limit and the consent are enforced even if this page is changed.
  async function importBatch() {
    const good = batchRows.filter((r) => !r.problem);
    setBatchBusy(true);
    setError("");
    const results = [];
    for (const row of good) {
      const name = `${row.firstName} ${row.lastName}`;
      try {
        const result = await addStudent({ firstName: row.firstName, lastName: row.lastName, yearGroup: row.yearGroup, consent: true });
        results.push({ name, username: result.username, password: result.password });
      } catch (err) {
        results.push({ name, error: err.message });
        break;   // stop at the first problem, such as the limit being reached
      }
    }
    setBatchResults(results);
    setBatchRows([]);
    setBatchFileName("");
    setBatchBusy(false);
  }

  return (
    <section className="card" aria-labelledby="students-h">
      <h2 id="students-h" className={styles.heading}>Your pupils</h2>
      <p className="muted">Add each pupil you look after. The site creates a username and password for them to log in with.</p>
      {profile?.pupil_code && (
        <p className="notice notice-info">
          <strong>Your pupil sign-in code: <code>{profile.pupil_code}</code></strong><br />
          Pupils type this code first when they log in, then their username and password. Give it to each pupil with their details.
        </p>
      )}
      {students.length > 0 && <p><Link to="/reports" className="btn btn-secondary btn-small">Pupil reports (print or save as PDF)</Link></p>}

      {created && <Credentials username={created.username} password={created.password} onDone={() => setCreated(null)} />}

      {students.length === 0 ? (
        <p className="muted">No pupils yet. Add one below.</p>
      ) : (
        <ul className={styles.students}>
          {students.map((s) => (
            <li key={s.id} className={styles.pupilItem}>
              <div className={styles.pupilRow}>
                <span>
                  <strong>{s.first_name} {s.last_name}</strong> <span className="muted">· Year {s.year_group} · username <code>{s.username}</code></span>
                </span>
                <span className={styles.rowButtons}>
                  <Link to={`/pupils/${s.id}`} className="btn btn-secondary btn-small">View progress</Link>
                  <button type="button" className="btn btn-secondary btn-small" onClick={() => reset(s)}>Reset password</button>
                  <button type="button" className="btn btn-secondary btn-small" onClick={() => remove(s)}>Remove</button>
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="muted">Your {profile?.account_type ?? "account"} allows up to {limit} pupil accounts. You have {students.length}.</p>
      {atLimit && <p className="notice notice-warning">This account is full. Remove a pupil before adding another.</p>}

      {batchResults && (
        <div className="card" role="status" style={{ marginBottom: "1rem" }}>
          <h3>Pupils created</h3>
          <p><strong>Save this list now.</strong> Passwords are shown only once. If one is lost, use Reset password on the pupil's row.</p>
          {profile?.pupil_code && <p>Pupil sign-in code for this list: <code>{profile.pupil_code}</code> (pupils type it first when they log in)</p>}
          {batchResults.some((r) => r.username) && (
            <table>
              <thead><tr><th scope="col">Name</th><th scope="col">Username</th><th scope="col">Password</th></tr></thead>
              <tbody>
                {batchResults.filter((r) => r.username).map((r) => (
                  <tr key={r.username}><td>{r.name}</td><td><code>{r.username}</code></td><td><code>{r.password}</code></td></tr>
                ))}
              </tbody>
            </table>
          )}
          {batchResults.some((r) => r.error) && <p role="alert" className={styles.error}>Not created: {batchResults.find((r) => r.error).name}. {batchResults.find((r) => r.error).error}</p>}
          <p>
            <button type="button" className="btn btn-secondary" onClick={() => window.print()}>Print list</button>{" "}
            <button type="button" className="btn btn-secondary" onClick={() => setBatchResults(null)}>Close</button>
          </p>
        </div>
      )}

      {!atLimit && (() => {
        const good = batchRows.filter((r) => !r.problem);
        const spaceLeft = limit - students.length;
        const tooMany = good.length > spaceLeft;
        return (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3>Add many pupils from a spreadsheet</h3>
            <p className="muted">In Excel, choose File, then Save As, then CSV (Comma delimited). Each row needs a first name, last name and year group from 7 to 11. A header row is fine.</p>
            <input type="file" accept=".csv,text/csv" onChange={chooseFile} disabled={batchBusy} aria-label="Spreadsheet file (CSV)" />
            {batchRows.length > 0 && (
              <>
                <p style={{ marginTop: "1rem" }}>{batchFileName}: {good.length} ready, {batchRows.length - good.length} with problems.</p>
                <ul>
                  {batchRows.map((r) => (
                    <li key={r.line} className={r.problem ? styles.error : undefined}>
                      Row {r.line}: {r.firstName} {r.lastName}, Year {r.yearGroup || "?"}{r.problem ? ` (${r.problem})` : ""}
                    </li>
                  ))}
                </ul>
                {tooMany && <p role="alert" className={styles.error}>This file has {good.length} pupils, but you can add only {spaceLeft} more.</p>}
                <label className={styles.consent} style={{ display: "flex", gap: "0.5rem", margin: "0.75rem 0" }}>
                  <input type="checkbox" checked={batchConsent} onChange={(e) => setBatchConsent(e.target.checked)} />
                  <span>I confirm I am the parent, carer, teacher or tutor responsible for every pupil in this file, and I am entitled to add their details here.</span>
                </label>
                <button type="button" className="btn" onClick={importBatch} disabled={batchBusy || !batchConsent || good.length === 0 || tooMany}>
                  {batchBusy ? "Creating…" : `Create ${good.length} pupil${good.length === 1 ? "" : "s"}`}
                </button>
              </>
            )}
          </div>
        );
      })()}

      <form onSubmit={add} className={styles.addForm}>
        <div className="field">
          <label htmlFor="pupil-first">First name</label>
          <input id="pupil-first" className="input" value={form.firstName} onChange={update("firstName")} maxLength={40} required />
        </div>
        <div className="field">
          <label htmlFor="pupil-last">Last name</label>
          <input id="pupil-last" className="input" value={form.lastName} onChange={update("lastName")} maxLength={40} required />
        </div>
        <div className="field">
          <label htmlFor="pupil-year">Year group</label>
          <select id="pupil-year" className="input" value={form.yearGroup} onChange={update("yearGroup")}>
            {YEARS.map((y) => <option key={y} value={y}>Year {y}</option>)}
          </select>
        </div>
        <label className={`${styles.consent} ${styles.fullRow}`}>
          <input type="checkbox" checked={form.consent} onChange={update("consent")} required />
          <span>I confirm I am the parent, carer, teacher or tutor responsible for this pupil, and I am entitled to add their details here.</span>
        </label>
        <button type="submit" className="btn" disabled={busy || !form.consent || atLimit}>{busy ? "Adding…" : "Add pupil"}</button>
      </form>

      {error && <p role="alert" className={styles.error}>{error}</p>}
    </section>
  );
}

/* ---------- Pupils: their own details ---------- */
function PupilDetails({ pupil }) {
  return (
    <>
      <section className="card">
        <h2 className={styles.heading}>Your details</h2>
        <dl className={styles.creds}>
          <dt>Name</dt><dd>{pupil.first_name} {pupil.last_name}</dd>
          <dt>Year group</dt><dd>Year {pupil.year_group}</dd>
          <dt>Username</dt><dd><code>{pupil.username}</code></dd>
        </dl>
        <p className="muted" style={{ margin: 0 }}>If you forget your password, ask your parent, teacher or tutor to reset it for you.</p>
      </section>

    </>
  );
}

export default function AccountPage() {
  const { user, role, profile, pupil, configured, ready, signOut } = useAuth();

  if (!configured) {
    return (
      <div className="container section">
        <header className="page-head"><h1>Accounts</h1></header>
        <p className="card">Accounts are not switched on for this copy of the site yet. The lessons are still available as previews.</p>
      </div>
    );
  }

  if (!ready) {
    return <div className="container section"><p className="muted">Checking your account…</p></div>;
  }

  if (!user) {
    return (
      <div className="container section">
        <header className="page-head">
          <h1>Log in or create an account</h1>
          <p className="lead">An account lets you read every lesson in full. Parents, teachers and tutors can also add pupils. Logged out, you can still preview each lesson.</p>
        </header>
        <AuthForm />
        <p className="muted" style={{ marginTop: "1.5rem" }}>Lesson previews don't need an account. <Link to="/">Back to the lessons</Link>.</p>
      </div>
    );
  }

  const name = role === "pupil" ? pupil?.first_name : profile?.display_name;
  return (
    <div className="container section">
      <header className="page-head">
        <h1>{name ? `Hello, ${name}` : "Your account"}</h1>
        <p className="muted">
          {role === "pupil" ? "Pupil account" : `${user.email} · ${ACCOUNT_TYPES.find(([v]) => v === profile?.account_type)?.[1] ?? "Account"}`}
        </p>
      </header>
      <div className={styles.stack}>
        {role === "pupil" ? <PupilDetails pupil={pupil} /> : <PupilList />}
        <div className="card">
          <p className="muted" style={{ margin: 0 }}>Signed in on this device. Log out if you share the computer.</p>
          <button type="button" className="btn btn-secondary" style={{ marginTop: "0.75rem" }} onClick={() => signOut()}>Log out</button>
        </div>
      </div>
    </div>
  );
}
