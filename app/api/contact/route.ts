import { NextResponse } from "next/server";

// Contact form handler. Sends the submission via Resend when an API key
// is configured; otherwise logs it (so the form works in local/dev preview).
export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL || "info@txsn.org";

    if (!apiKey) {
      // No key configured yet — log and succeed so the UI flow works in preview.
      console.log("[contact] (no RESEND_API_KEY set) submission:", {
        name,
        email,
        subject,
        message,
      });
      return NextResponse.json({ ok: true, mode: "logged" });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "TxSN Website <noreply@txsn.org>",
      to,
      reply_to: email,
      subject: `[TxSN Contact] ${subject || "New message"}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
