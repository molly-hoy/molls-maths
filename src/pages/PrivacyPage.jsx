/* ==========================================================================
   Privacy notice and cookies (/privacy)
   --------------------------------------------------------------------------
   Plain-English notice on what Moll's Maths stores, why, and who can see it.
   The [square brackets] are details the site owner must fill in before the
   site opens to customers. Change PRIVACY_VERSION whenever this text changes:
   new sign-ups record which version they accepted.
   ========================================================================== */
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const PRIVACY_VERSION = "2026-11-20";

export default function PrivacyPage() {
  // Open at the cookies section when linked as /privacy#cookies.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <div className="container section" style={{ maxWidth: "760px" }}>
      <header className="page-head">
        <h1>Privacy notice and cookies</h1>
        <p className="muted">Version {PRIVACY_VERSION}</p>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <h2>Who we are</h2>
        <p>Moll's Maths (mollsmaths.com) is run by Molly Hoy. You can contact us at contact@mollsmaths.com or through the <Link to="/contact">contact page</Link>.</p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <h2>What we store</h2>
        <ul>
          <li><strong>Adult accounts:</strong> your name, email address, the type of account (parent, teacher or tutor), your password in a scrambled form that we can't read, and the version of this notice you accepted and when.</li>
          <li><strong>Pupils added to an account:</strong> first name, last name, year group, a username and a password in scrambled form, and when the adult confirmed they were entitled to add the pupil.</li>
          <li><strong>Lesson progress and answers:</strong> kept in your web browser. When a pupil is logged in, a copy is also saved on our servers, so the adult who manages the pupil can see their progress in the pupil reports. Clearing your browser data removes the copy on that device only.</li>
          <li><strong>Server logs:</strong> when you visit the site, our web host records basic technical details such as your IP address, the page you asked for and your browser type.</li>
        </ul>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <h2>Why we use it, and on what basis</h2>
        <ul>
          <li>To create and run accounts, so you can log in and manage pupils. This is needed to provide the accounts you ask for.</li>
          <li>For pupils, we rely on the adult's confirmation that they are entitled to add the pupil's details. The adult must have the authority to do so, as a parent, carer, teacher or tutor.</li>
          <li>To keep the site secure and to fix problems, using the server logs. We do this because it is needed to run the site safely.</li>
        </ul>
        <p>We don't sell your information, and we don't use it for advertising.</p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <h2>Who we share it with</h2>
        <ul>
          <li><strong>Supabase</strong> stores accounts and pupil records and runs the login system. The data is kept in London.</li>
          <li><strong>Fasthosts</strong> hosts the website files and keeps the server logs.</li>
          <li><strong>Google Fonts</strong> supplies the site's typeface. When a page loads it, your browser contacts Google, which receives your IP address.</li>
        </ul>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <h2>How long we keep it</h2>
        <p>Account and pupil records are kept while the account is open. When an account is deleted, its adult and pupil records are deleted with it. Server logs are kept by the web host for 6 months. A pupil's saved progress is kept while their account is open, and is deleted with it. Progress saved in a browser stays there until you clear it.</p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <h2>Your choices and rights</h2>
        <ul>
          <li>You can see and change your name, and add, reset the password for or remove pupils from your <Link to="/account">account page</Link>.</li>
          <li>You can ask us for a copy of your information, ask us to correct it, or ask us to delete your account. Email contact@mollsmaths.com and we will reply.</li>
          <li>You can complain to the Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" rel="noopener">ico.org.uk</a>.</li>
        </ul>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <h2>Pupils</h2>
        <p>Pupils' details are entered by the parent, teacher or tutor who manages their account. A pupil who has forgotten their password should ask that adult, who can reset it. Pupils should keep their passwords private.</p>
      </section>

      <section id="cookies" className="section" style={{ paddingTop: 0 }}>
        <h2>Cookies and browser storage</h2>
        <p>We use only the storage the site needs to work. We don't use advertising, tracking or analytics cookies, so we don't ask for consent to any cookies.</p>
        <ul>
          <li><strong>Login session</strong> (stored in your browser under the name <code>molls-maths-auth-v1</code>): keeps you logged in between visits. It is removed when you log out.</li>
          <li><strong>Lesson progress</strong> (stored in your browser under the name <code>molls-maths-progress-v1</code>): remembers your answers and results on this device.</li>
        </ul>
        <p>Your browser's settings can also clear these at any time. Clearing them logs you out and removes your local progress. If we add other cookies in future, we will update this page and ask for consent first where the law requires it.</p>
      </section>
    </div>
  );
}
