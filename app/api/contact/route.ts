import { NextResponse } from "next/server";
import { serverEnv } from "@/lib/env/server";
import { rateLimit, clientIp } from "@/lib/rate-limit";

// Contact form handler. Delivers submissions to the public contact inbox
// (CONTACT_RECIPIENT_EMAIL = contact@txsocietyofnephrology.org) via Resend,
// sent from the verified EMAIL_FROM sender with the submitter set as reply-to.
export async function POST(request: Request) {
  try {
    // Throttle abuse: max 5 submissions per IP per 10 minutes.
    const ip = clientIp(request.headers);
    const limit = rateLimit(`contact:${ip}`, 5, 10 * 60_000);
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many messages. Please try again later." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
      );
    }

    const { name, email, subject, message, company } = await request.json();

    // Honeypot: real users never fill the hidden "company" field. Silently
    // accept so bots don't learn they were caught.
    if (typeof company === "string" && company.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(serverEnv.RESEND_API_KEY);

    await resend.emails.send({
      from: serverEnv.EMAIL_FROM,
      to: serverEnv.CONTACT_RECIPIENT_EMAIL,
      reply_to: email,
      subject: `[TSN Contact] ${subject || "New message"}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
