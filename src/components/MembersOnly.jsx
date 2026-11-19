/* ==========================================================================
   MembersOnly: shown instead of any members-only page
   --------------------------------------------------------------------------
   Lessons, worksheets, practice, tests, progress and the tutor are for people
   with a paid plan. App.jsx decides which addresses this covers. A pupil uses
   the plan of the parent, teacher or tutor who added them.
   ========================================================================== */
import { Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";

export default function MembersOnly() {
  const { user, ready, configured } = useAuth();

  return (
    <div className="container section">
      <header className="page-head">
        <h1>Members only</h1>
        <p className="lead">Lessons, worksheets, practice and tests are for paid members. Home, About, Contact and the privacy notice are open to everyone.</p>
      </header>

      <div className="card" style={{ maxWidth: "560px" }}>
        {!ready ? (
          <p className="muted" style={{ margin: 0 }}>Checking your account…</p>
        ) : !configured ? (
          <p style={{ margin: 0 }}>Accounts are not set up on this copy of the site yet.</p>
        ) : user ? (
          <p style={{ margin: 0 }}>Your account doesn't have an active plan yet. <Link to="/contact">Contact us</Link> to get access.</p>
        ) : (
          <p style={{ margin: 0 }}>Log in or create an account to use the lessons. <Link to="/account">Go to accounts</Link></p>
        )}
      </div>
    </div>
  );
}
