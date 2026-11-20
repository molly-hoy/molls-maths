/* ==========================================================================
   ProgressSync: copies a logged-in pupil's progress to the server
   --------------------------------------------------------------------------
   Progress is still kept in the browser, so it works offline and for visitors.
   When a PUPIL is logged in, this component also:
     1. loads their saved copy from the server when the site opens, so their
        progress follows them to another device; and
     2. saves any change a few seconds later, so their parent or teacher can
        see it in the reports.
   Adults and visitors do nothing here. The database rules in
   supabase/progress.sql decide what each login can read or save.
   ========================================================================== */
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useProgress } from "./ProgressContext.jsx";
import { getValidSession, dbSelect, savePupilProgress } from "../lib/supabase.js";

const SAVE_DELAY_MS = 3000;   // wait this long after the last change before saving

export default function ProgressSync() {
  const { role, ready } = useAuth();
  const { state, dispatch } = useProgress();
  const [studentId, setStudentId] = useState(null);
  const loaded = useRef(false);   // true once the saved copy has been checked

  // 1. When a pupil logs in, find their pupil record and load their saved progress.
  useEffect(() => {
    if (!ready || role !== "pupil") return undefined;
    let cancelled = false;
    (async () => {
      const session = await getValidSession();
      if (!session || cancelled) return;
      const mine = await dbSelect("students?select=id,first_name,last_name,year_group", session.access_token);
      const pupilRow = mine?.[0];
      if (!pupilRow?.id || cancelled) return;
      const id = pupilRow.id;
      const saved = await dbSelect(`pupil_progress?select=data&student_id=eq.${id}`, session.access_token);
      if (cancelled) return;
      // Replace what this browser has with the saved copy, when there is one.
      if (saved?.[0]?.data) dispatch({ type: "import", data: saved[0].data });
      // The name and year come from the teacher's record, so the pupil never has to type them.
      dispatch({ type: "setProfile", profile: { name: `${pupilRow.first_name} ${pupilRow.last_name}`, year: pupilRow.year_group } });
      loaded.current = true;
      setStudentId(id);
    })().catch(() => {
      // If the copy cannot be loaded, the pupil simply keeps this browser's progress.
    });
    return () => { cancelled = true; };
  }, [ready, role, dispatch]);

  // 2. After any change, save a copy a few seconds later (only once the saved copy has been checked).
  useEffect(() => {
    if (!studentId || !loaded.current) return undefined;
    const timer = setTimeout(async () => {
      try {
        const session = await getValidSession();
        if (session) await savePupilProgress(studentId, state, session.access_token);
      } catch {
        // If saving fails, the progress is still kept in this browser and the next change tries again.
      }
    }, SAVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [state, studentId]);

  return null;   // this component only does the work above; it draws nothing
}
