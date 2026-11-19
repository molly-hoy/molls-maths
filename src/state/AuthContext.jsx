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
     configured   false if the Supabase settings are missing
   and the actions: signIn, signInPupil, signUp, signOut, addStudent,
   resetStudentPassword, removeStudent.

   Pupils and their passwords are managed through the "student-accounts"
   Edge Function, because creating logins needs the secret key.
   Lesson progress is still kept in each browser (see ProgressContext).
   ========================================================================== */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  callStudentAccounts,
  dbSelect,
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

  // Load who this login is, and the data that goes with it.
  const loadAccount = useCallback(async (current) => {
    if (!current) {
      setProfile(null);
      setPupil(null);
      setStudents([]);
      return;
    }
    const { id } = current.user;
    const token = current.access_token;
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

  const value = useMemo(() => ({
    user: session?.user ?? null,
    role: profile ? "adult" : pupil ? "pupil" : null,
    profile,
    pupil,
    students,
    ready,
    configured: supabaseConfigured,
    signIn,
    signInPupil,
    signUp,
    signOut,
    addStudent,
    resetStudentPassword,
    removeStudent,
  }), [session, profile, pupil, students, ready, signIn, signInPupil, signUp, signOut, addStudent, resetStudentPassword, removeStudent]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
