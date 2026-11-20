"use client";

import { useState } from "react";
import { PageHeader, Container, Icon, Button } from "@/components/ui";
import { siteConfig } from "@/lib/site";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", company: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "", company: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Contact TSN"
        intro="Questions about membership, events, or partnership? Send us a note and we'll get back to you."
        image="/images/site/contact/hero.webp"
        imagePosition="85% top"
      />
      <section className="pad !pb-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.45fr] lg:gap-16">
            {/* Info */}
            <div className="rv grid content-start gap-4">
              <h2 className="h-display">Get in touch</h2>
              <div className="card-line mt-4 flex items-start gap-4 p-6">
                <span className="ic-tile">
                  <Icon name="mail" size={20} />
                </span>
                <div>
                  <div className="text-[14px] font-semibold text-ink">Email</div>
                  <a href={`mailto:${siteConfig.email}`} className="link mt-0.5 break-all text-[17px]">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
              <div className="card-line flex items-start gap-4 p-6">
                <span className="ic-tile">
                  <Icon name="pin" size={20} />
                </span>
                <div>
                  <div className="text-[14px] font-semibold text-ink">Serving</div>
                  <div className="mt-0.5 text-[17px] text-slate">Nephrology professionals across Texas</div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="card rv p-7 sm:p-9 lg:p-10" style={{ transitionDelay: ".08s" }}>
              {status === "sent" ? (
                <div role="status" className="py-8 text-center">
                  <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white">
                    <svg className="success-check" width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h2 className="font-serif text-[1.5rem] font-bold">Message sent</h2>
                  <p className="mt-2 text-[17px] text-slate">Thanks for reaching out. We&apos;ll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot — hidden from users, catches bots. */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="label">Name</label>
                      <input id="name" required autoComplete="name" className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label htmlFor="email" className="label">Email</label>
                      <input id="email" type="email" required autoComplete="email" className="field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="label">Subject</label>
                    <input id="subject" required className="field" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="message" className="label">Message</label>
                    <textarea id="message" required rows={6} className="field" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>
                  {status === "error" && (
                    <p role="alert" className="text-[15px] text-red-700">
                      Something went wrong sending your message. Please email us directly.
                    </p>
                  )}
                  <Button type="submit" disabled={status === "sending"} arrow={status !== "sending"}>
                    {status === "sending" ? "Sending..." : "Send message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
