/* ==========================================================================
   AuthContext: who is logged in, and their profile and pupils
   --------------------------------------------------------------------------
   Every page can read this with useAuth(). It provides:
     user         the logged-in login (null when logged out)
     role         "adult" (parent, teacher or tutor), "pupil", or null
     profile      an adult's name and account type
     pupil        the pupil's own record, when the login is a pupil's
     students     the pupils an adult manages
     ready        false until the site has checked for a saved login
     hasAccess    true when this login has a paid plan (a pupil follows their adult's plan)
     configured   false if the Supabase settings are missing
   and the actions: signIn, signInPupil, signUp, signOut, addStudent,
   resetStudentPassword, removeStudent, getFeedback, sendFeedback and
   deleteFeedback. Feedback is stored in the database; the access rules in
   schema.sql decide who can read or write each note.

   Pupils and their passwords are managed through the "student-accounts"
   Edge Function, because creating logins needs the secret key.
   Lesson progress is still kept in each browser (see ProgressContext).
   ========================================================================== */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  callStudentAccounts,
  checkAccess,
  dbDelete,
  dbInsert,
  dbSelect,
  getLessonTeaching as apiGetLessonTeaching,
  getValidSession,
  signIn as apiSignIn,
  signInPupil as apiSignInPupil,
  signOut as apiSignOut,
  signUp as apiSignUp,
  supabaseConfigured,
} from "../lib/supabase.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [pupil, setPupil] = useState(null);
  const [students, setStudents] = useState([]);
  const [ready, setReady] = useState(!supabaseConfigured); // nothing to check if not set up
  const [hasAccess, setHasAccess] = useState(false);       // paid plan? checked by the database

  // Load who this login is, and the data that goes with it.
  const loadAccount = useCallback(async (current) => {
    if (!current) {
      setProfile(null);
      setPupil(null);
      setStudents([]);
      setHasAccess(false);
      return;
    }
    const { id } = current.user;
    const token = current.access_token;
    // Does this login have a paid plan? The database answers; if the check fails, assume no.
    setHasAccess(await checkAccess(token).catch(() => false));
    const profiles = await dbSelect(`profiles?select=*&id=eq.${id}`, token);
    if (profiles?.[0]) {
      const pupils = await dbSelect("students?select=*&order=last_name.asc,first_name.asc", token);
      setProfile(profiles[0]);
      setPupil(null);
      setStudents(pupils ?? []);
      return;
    }
    // No adult profile: this may be a pupil's login, whose own record is linked to it.
    const mine = await dbSelect(`students?select=*&auth_user_id=eq.${id}`, token);
    setProfile(null);
    setPupil(mine?.[0] ?? null);
    setStudents([]);
  }, []);

  // On first load, pick up a saved login (if there is one).
  useEffect(() => {
    if (!supabaseConfigured) return undefined;
    let cancelled = false;
    (async () => {
      const current = await getValidSession();
      if (cancelled) return;
      setSession(current);
      try {
        await loadAccount(current);
      } catch {
        // If the account can't be loaded, the user simply appears logged out.
        setSession(null);
      }
      if (!cancelled) setReady(true);
    })();
    return () => { cancelled = true; };
  }, [loadAccount]);

  const signIn = useCallback(async ({ email, password }) => {
    const current = await apiSignIn({ email, password });
    setSession(current);
    await loadAccount(current);
  }, [loadAccount]);

  const signInPupil = useCallback(async ({ username, password }) => {
    const current = await apiSignInPupil({ username, password });
    setSession(current);
    await loadAccount(current);
  }, [loadAccount]);

  const signUp = useCallback(async ({ email, password, displayName, accountType, privacyVersion }) => {
    const { session: current, needsConfirmation } = await apiSignUp({ email, password, displayName, accountType, privacyVersion });
    if (current) {
      setSession(current);
      await loadAccount(current);
    }
    return { needsConfirmation };
  }, [loadAccount]);

  const signOut = useCallback(async () => {
    await apiSignOut();
    setSession(null);
    setHasAccess(false);
    setProfile(null);
    setPupil(null);
    setStudents([]);
  }, []);

  // Creates a pupil and returns their username and password. The password is
  // only shown once, so the caller must display it straight away.
  const addStudent = useCallback(async ({ firstName, lastName, yearGroup, consent }) => {
    const result = await callStudentAccounts({ action: "create", firstName, lastName, yearGroup, consent }, session.access_token);
    setStudents((list) => [...list, result.student].sort((a, b) => a.last_name.localeCompare(b.last_name) || a.first_name.localeCompare(b.first_name)));
    return { username: result.username, password: result.password, student: result.student };
  }, [session]);

  const resetStudentPassword = useCallback(async (studentId) => {
    const result = await callStudentAccounts({ action: "reset", studentId }, session.access_token);
    return { username: result.username, password: result.password };
  }, [session]);

  const removeStudent = useCallback(async (studentId) => {
    await callStudentAccounts({ action: "remove", studentId }, session.access_token);
    setStudents((list) => list.filter((s) => s.id !== studentId));
  }, [session]);

  // Feedback notes. An adult passes a studentId to see one pupil's notes; a
  // pupil passes nothing and gets the notes written about them.
  const getFeedback = useCallback(async (studentId) => {
    const filter = studentId ? `&student_id=eq.${studentId}` : "";
    return dbSelect(`feedback?select=id,student_id,author_id,lesson_id,message,created_at&order=created_at.desc${filter}`, session?.access_token);
  }, [session]);

  // Adds a note for one pupil and returns the saved row.
  const sendFeedback = useCallback(async ({ studentId, message, lessonId }) => {
    const rows = await dbInsert("feedback", {
      student_id: studentId,
      author_id: session.user.id,
      message,
      lesson_id: lessonId ?? null,
    }, session.access_token);
    return rows[0];
  }, [session]);

  const deleteFeedback = useCallback(async (id) => {
    await dbDelete(`feedback?id=eq.${id}`, session.access_token);
  }, [session]);

  // Gets the teaching text of one lesson. The database decides whether this login may read it.
  const getLessonTeaching = useCallback((lessonId) => apiGetLessonTeaching(lessonId, session?.access_token), [session]);

  const value = useMemo(() => ({
    user: session?.user ?? null,
    role: profile ? "adult" : pupil ? "pupil" : null,
    profile,
    pupil,
    students,
    ready,
    hasAccess,
    configured: supabaseConfigured,
    signIn,
    signInPupil,
    signUp,
    signOut,
    addStudent,
    resetStudentPassword,
    removeStudent,
    getFeedback,
    sendFeedback,
    deleteFeedback,
    getLessonTeaching,
  }), [session, profile, pupil, students, ready, hasAccess, signIn, signInPupil, signUp, signOut, addStudent, resetStudentPassword, removeStudent, getFeedback, sendFeedback, deleteFeedback, getLessonTeaching]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
