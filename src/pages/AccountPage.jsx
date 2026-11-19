/* ==========================================================================
   Account page: log in, create an account, and manage pupils
   --------------------------------------------------------------------------
   Logged out: log in as a parent, teacher or tutor, log in as a pupil with
   a username and password, or create an account (which needs consent to the
   privacy notice).
   Adults: add, reset the password for, and remove pupils, and write feedback
   for each pupil (optionally about a lesson, from their year group).
   Pupils: see their own details and the feedback written for them.

   The privacy notice version is recorded when someone creates an account
   (see PRIVACY_VERSION in PrivacyPage.jsx).
   ========================================================================== */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { ALL_UNITS, YEARS as COURSE_YEARS } from "../data/curriculum.js";
import { PRIVACY_VERSION } from "./PrivacyPage.jsx";
import styles from "./AccountPage.module.css";

const ACCOUNT_TYPES = [["parent", "Parent"], ["teacher", "Teacher"], ["tutor", "Tutor"]];
const YEARS = [7, 8, 9, 10, 11];   // the year groups a pupil can be in
const MIN_PASSWORD = 8;

/* The lessons for one year group, for the optional "about a lesson" choice. */
function lessonsForYear(year) {
  const course = COURSE_YEARS.find((y) => y.year === year);
  return (course?.units ?? []).flatMap((u) => u.lessons.map((l) => ({ id: l.id, label: `${u.title}: ${l.title}` })));
}

/* The title of a lesson from its code, or null if that lesson no longer exists. */
function lessonTitle(lessonId) {
  return ALL_UNITS.flatMap((u) => u.lessons).find((l) => l.id === lessonId)?.title ?? null;
}

/* ---------- Log in or create an account (adults and pupils) ---------- */
function AuthForm() {
  const { signIn, signInPupil, signUp } = useAuth();
  const [mode, setMode] = useState("login"); // "login", "pupil" or "signup"
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ email: "", password: "", displayName: "", accountType: "parent", username: "", privacy: false });

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
        await signInPupil({ username: form.username, password: form.password });
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
          <div className="field">
            <label htmlFor="username">Username</label>
            <input id="username" className="input" value={form.username} onChange={update("username")} required autoComplete="username" autoCapitalize="none" spellCheck={false} />
          </div>
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

/* ---------- One feedback note: the date, the lesson (if any) and the message ---------- */
function FeedbackItem({ item }) {
  const lesson = item.lesson_id ? (lessonTitle(item.lesson_id) ?? "A lesson") : "General feedback";
  const date = new Date(item.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return (
    <div>
      <p className="muted" style={{ margin: 0, fontSize: "var(--text-sm)" }}>{date} · {lesson}</p>
      <p style={{ margin: "0.25rem 0 0", whiteSpace: "pre-wrap" }}>{item.message}</p>
    </div>
  );
}

/* ---------- Adults: feedback for one pupil ---------- */
function PupilFeedback({ student }) {
  const { user, getFeedback, sendFeedback, deleteFeedback } = useAuth();
  const [items, setItems] = useState(null);   // null while the notes load
  const [message, setMessage] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const lessons = useMemo(() => lessonsForYear(student.year_group), [student.year_group]);

  useEffect(() => {
    let cancelled = false;
    getFeedback(student.id)
      .then((rows) => { if (!cancelled) setItems(rows); })
      .catch((err) => { if (!cancelled) setError(err.message); });
    return () => { cancelled = true; };
  }, [student.id, getFeedback]);

  async function send(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const row = await sendFeedback({ studentId: student.id, message: message.trim(), lessonId: lessonId || null });
      setItems((list) => [row, ...(list ?? [])]);   // newest first, as the list is ordered
      setMessage("");
      setLessonId("");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id) {
    if (!window.confirm("Delete this feedback? The pupil will no longer see it.")) return;
    setError("");
    try {
      await deleteFeedback(id);
      setItems((list) => list.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className={styles.feedback}>
      <h3 className={styles.subheading}>Feedback for {student.first_name}</h3>

      {items === null ? (
        !error && <p className="muted">Loading…</p>
      ) : items.length === 0 ? (
        <p className="muted" style={{ margin: 0 }}>No feedback yet.</p>
      ) : (
        <ul className={styles.feedbackList}>
          {items.map((item) => (
            <li key={item.id} className={styles.feedbackItem}>
              <FeedbackItem item={item} />
              {item.author_id === user?.id && (
                <button type="button" className="btn btn-secondary btn-small" onClick={() => remove(item.id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={send} className={styles.feedbackForm}>
        <div className="field">
          <label htmlFor={`feedback-message-${student.id}`}>Write feedback</label>
          <textarea id={`feedback-message-${student.id}`} className="input" rows={3} maxLength={1000} required value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor={`feedback-lesson-${student.id}`}>About a lesson (optional)</label>
          <select id={`feedback-lesson-${student.id}`} className="input" value={lessonId} onChange={(e) => setLessonId(e.target.value)}>
            <option value="">General feedback</option>
            {lessons.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-small" disabled={busy || !message.trim()}>{busy ? "Sending…" : "Send feedback"}</button>
      </form>

      {error && <p role="alert" className={styles.error}>{error}</p>}
    </div>
  );
}

/* ---------- Adults: pupils ---------- */
function PupilList() {
  const { students, addStudent, resetStudentPassword, removeStudent } = useAuth();
  const [form, setForm] = useState({ firstName: "", lastName: "", yearGroup: 7, consent: false });
  const [created, setCreated] = useState(null);   // { username, password } shown once
  const [openFeedback, setOpenFeedback] = useState(null);   // the pupil whose feedback panel is open
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

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

  return (
    <section className="card" aria-labelledby="students-h">
      <h2 id="students-h" className={styles.heading}>Your pupils</h2>
      <p className="muted">Add each pupil you look after. The site creates a username and password for them to log in with.</p>

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
                  <button type="button" className="btn btn-secondary btn-small" aria-expanded={openFeedback === s.id} onClick={() => setOpenFeedback(openFeedback === s.id ? null : s.id)}>
                    {openFeedback === s.id ? "Hide feedback" : "Feedback"}
                  </button>
                  <button type="button" className="btn btn-secondary btn-small" onClick={() => reset(s)}>Reset password</button>
                  <button type="button" className="btn btn-secondary btn-small" onClick={() => remove(s)}>Remove</button>
                </span>
              </div>
              {openFeedback === s.id && <PupilFeedback student={s} />}
            </li>
          ))}
        </ul>
      )}

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
        <button type="submit" className="btn" disabled={busy || !form.consent}>{busy ? "Adding…" : "Add pupil"}</button>
      </form>

      {error && <p role="alert" className={styles.error}>{error}</p>}
    </section>
  );
}

/* ---------- Pupils: their own details and the feedback written for them ---------- */
function PupilDetails({ pupil }) {
  const { getFeedback } = useAuth();
  const [items, setItems] = useState(null);   // null while the notes load
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    getFeedback()   // no pupil id: the access rules return only this pupil's notes
      .then((rows) => { if (!cancelled) setItems(rows); })
      .catch((err) => { if (!cancelled) setError(err.message); });
    return () => { cancelled = true; };
  }, [getFeedback]);

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

      <section className="card" aria-labelledby="feedback-h">
        <h2 id="feedback-h" className={styles.heading}>Feedback for you</h2>
        {error && <p role="alert" className={styles.error}>{error}</p>}
        {items === null ? (
          !error && <p className="muted">Loading…</p>
        ) : items.length === 0 ? (
          <p className="muted" style={{ margin: 0 }}>No feedback yet.</p>
        ) : (
          <ul className={styles.feedbackList}>
            {items.map((item) => (
              <li key={item.id} className={styles.feedbackItem}>
                <FeedbackItem item={item} />
              </li>
            ))}
          </ul>
        )}
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
