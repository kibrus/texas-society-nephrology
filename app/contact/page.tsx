"use client";

import { useState } from "react";
import { PageHeader, Container, Icon } from "@/components/ui";
import { siteConfig } from "@/lib/site";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

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
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full bg-white border border-txsn-mint-soft rounded-md px-3.5 py-2.5 text-[14px] text-txsn-ink placeholder:text-txsn-slate/50 focus:outline-none focus:border-txsn-teal focus:ring-2 focus:ring-txsn-mint/40 transition-colors";

  return (
    <>
      <PageHeader
        eyebrow="GET IN TOUCH"
        title="Contact TxSN"
        intro="Questions about membership, events, or partnership? Send us a note and we'll get back to you."
      />
      <Container className="py-14">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 max-w-4xl">
          <div>
            {status === "sent" ? (
              <div className="bg-txsn-wash rounded-xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-txsn-teal flex items-center justify-center text-white mx-auto mb-3">
                  <Icon name="check" size={24} />
                </div>
                <h2 className="font-serif text-xl text-txsn-teal-deep font-medium mb-1">Message sent</h2>
                <p className="text-[14px] text-txsn-slate">Thanks for reaching out. We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-[13px] font-medium text-txsn-teal-deep mb-1.5">Name</label>
                    <input id="name" required className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[13px] font-medium text-txsn-teal-deep mb-1.5">Email</label>
                    <input id="email" type="email" required className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-[13px] font-medium text-txsn-teal-deep mb-1.5">Subject</label>
                  <input id="subject" required className={field} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[13px] font-medium text-txsn-teal-deep mb-1.5">Message</label>
                  <textarea id="message" required rows={5} className={field} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                {status === "error" && (
                  <p className="text-[13px] text-red-700">Something went wrong sending your message. Please email us directly.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 bg-txsn-teal hover:bg-txsn-teal-mid disabled:opacity-60 text-white text-[14px] font-medium px-5 py-3 rounded-md transition-colors"
                >
                  {status === "sending" ? "Sending..." : "Send message"} <Icon name="arrow" size={16} />
                </button>
              </form>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-txsn-wash rounded-xl p-6">
              <Icon name="mail" size={22} className="text-txsn-teal mb-2" />
              <div className="text-[13px] font-medium text-txsn-teal-deep">Email</div>
              <a href={`mailto:${siteConfig.email}`} className="text-[13px] text-txsn-teal hover:underline">{siteConfig.email}</a>
            </div>
            <div className="bg-txsn-gold-soft rounded-xl p-6">
              <Icon name="pin" size={22} className="text-txsn-gold mb-2" />
              <div className="text-[13px] font-medium text-txsn-teal-deep">Serving</div>
              <div className="text-[13px] text-txsn-slate">Nephrology professionals across Texas</div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
