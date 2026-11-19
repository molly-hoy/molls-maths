// ==========================================================================
// Edge Function: contact-message
// --------------------------------------------------------------------------
// Receives the contact form from the website and emails it to you, using
// your Fasthosts mailbox (contact@mollsmaths.com) over SMTP.
//
// It runs on Supabase's servers, so the mailbox password never reaches the
// browser. Visitors do not need to be logged in to send a message.
//
// SETUP (once, using the Supabase CLI):
//   1. Set the secrets (replace the example values with your own):
//        supabase secrets set SMTP_HOST=smtp.livemail.co.uk
//        supabase secrets set SMTP_PORT=465
//        supabase secrets set SMTP_USER=contact@mollsmaths.com
//        supabase secrets set SMTP_PASSWORD=your-mailbox-password
//        supabase secrets set CONTACT_TO=contact@mollsmaths.com
//   2. Deploy with the exact name below:
//        supabase functions deploy contact-message --no-verify-jwt
//      (--no-verify-jwt because visitors do not log in to use the form.)
// ==========================================================================

import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

// Only the website may call this function from a browser.
const ALLOWED_ORIGINS = [
  "https://mollsmaths.com",
  "https://www.mollsmaths.com",
  "http://localhost:5173",   // the local development server
];

const ROLES = ["student", "parent", "teacher", "other"];

const cors = (origin: string | null) => ({
  "Access-Control-Allow-Origin": origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, apikey, Authorization",
});

const json = (body: unknown, status: number, origin: string | null) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors(origin), "Content-Type": "application/json" },
  });

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  const origin = req.headers.get("Origin");

  // Browsers send an OPTIONS request first to check the rules above.
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
  if (req.method !== "POST") return json({ error: "Use POST." }, 405, origin);

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return json({ error: "The message could not be read. Please try again." }, 400, origin);
  }

  // Hidden "website" field: real visitors never fill it in, spam bots often do.
  // Pretend it worked, so the bot does not learn to avoid it.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return json({ ok: true }, 200, origin);
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const role = typeof data.role === "string" && ROLES.includes(data.role) ? data.role : "other";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  // The same checks as the form, repeated here because anyone can call this function directly.
  if (!name || name.length > 100) return json({ error: "Please enter your name (up to 100 characters)." }, 400, origin);
  if (!EMAIL_PATTERN.test(email) || email.length > 200) return json({ error: "Please enter a valid email address." }, 400, origin);
  if (message.length < 10 || message.length > 2000) return json({ error: "Please write a message between 10 and 2000 characters." }, 400, origin);

  const host = Deno.env.get("SMTP_HOST");
  const port = Number(Deno.env.get("SMTP_PORT") ?? "465");
  const user = Deno.env.get("SMTP_USER");
  const password = Deno.env.get("SMTP_PASSWORD");
  const to = Deno.env.get("CONTACT_TO") ?? user;
  if (!host || !user || !password || !to) {
    return json({ error: "Messages cannot be sent right now. Please email us directly." }, 500, origin);
  }

  // Strip line breaks from the name and email so nobody can add extra email headers.
  const safeName = name.replace(/[\r\n]+/g, " ");
  const safeEmail = email.replace(/[\r\n]+/g, "");

  const client = new SMTPClient({
    connection: {
      hostname: host,
      port,
      tls: port === 465,   // 465 uses encryption from the start; other ports upgrade later
      auth: { username: user, password },
    },
  });

  try {
    await client.send({
      from: user,               // the mailbox sends it, so it can be trusted by the mail server
      to,
      replyTo: safeEmail,       // pressing Reply in your mail app goes to the visitor
      subject: `Moll's Maths contact: ${safeName} (${role})`,
      content: `From: ${safeName} <${safeEmail}>\nRole: ${role}\n\n${message}\n`,
    });
    return json({ ok: true }, 200, origin);
  } catch (err) {
    // The details go to the server log, not to the visitor.
    console.error("Sending contact message failed:", err);
    return json({ error: "The message could not be sent. Please try again later, or email us directly." }, 502, origin);
  } finally {
    await client.close();
  }
});
