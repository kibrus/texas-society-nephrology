"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader, Container, Icon } from "@/components/ui";
import { createClient } from "@/lib/supabase";

export default function SignUpPage() {
  const supabase = createClient();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.name },
      },
    });

    if (error) {
      setStatus("error");
      const msg = error.message.toLowerCase();
      if (msg.includes("already registered") || msg.includes("already been registered") || msg.includes("email address is already")) {
        setMessage("An account with this email already exists. Please sign in instead.");
      } else {
        setMessage(error.message);
      }
    } else {
      setStatus("success");
    }
  }

  const field =
    "w-full bg-white border border-txsn-mint-soft rounded-md px-3.5 py-2.5 text-[14px] text-txsn-ink placeholder:text-txsn-slate/50 focus:outline-none focus:border-txsn-teal focus:ring-2 focus:ring-txsn-mint/40 transition-colors";

  return (
    <>
      <PageHeader
        eyebrow="BECOME A MEMBER"
        title="Create your account"
        intro="Join the Texas Society of Nephrology. Create an account to get started."
      />
      <Container className="py-14">
        <div className="max-w-md">
          {status === "success" ? (
            <div className="bg-txsn-wash rounded-xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-txsn-teal flex items-center justify-center text-white mx-auto mb-3">
                <Icon name="check" size={24} />
              </div>
              <h2 className="font-serif text-xl text-txsn-teal-deep font-medium mb-1">Account created</h2>
              <p className="text-[14px] text-txsn-slate mb-4">
                Check your email to confirm your account, then sign in.
              </p>
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-2 bg-txsn-teal text-white text-[14px] font-medium px-5 py-2.5 rounded-md hover:bg-txsn-teal-mid transition-colors"
              >
                Go to sign in <Icon name="arrow" size={15} />
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[13px] font-medium text-txsn-teal-deep mb-1.5">
                    Full name
                  </label>
                  <input
                    id="name"
                    required
                    className={field}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[13px] font-medium text-txsn-teal-deep mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className={field}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-[13px] font-medium text-txsn-teal-deep mb-1.5">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={6}
                    className={field}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <p className="text-[12px] text-txsn-slate/70 mt-1">At least 6 characters.</p>
                </div>

                {status === "error" && (
                  <div className="text-[13px] text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2.5">
                    <p>{message}</p>
                    {message.includes("already exists") && (
                      <Link href="/sign-in" className="mt-1.5 inline-block font-medium underline hover:text-red-900">
                        Go to sign in →
                      </Link>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center gap-2 bg-txsn-gold hover:bg-txsn-gold/90 disabled:opacity-60 text-white text-[14px] font-medium px-5 py-3 rounded-md transition-colors"
                >
                  {status === "loading" ? "Creating account..." : "Create account"} <Icon name="arrow" size={16} />
                </button>
              </form>

              <p className="text-[13px] text-txsn-slate mt-6">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-txsn-teal font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
