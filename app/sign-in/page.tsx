"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader, Container, Icon } from "@/components/ui";
import { createClient } from "@/lib/supabase";

export default function SignInPage() {
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      router.push("/member");
    }
  }

  const field =
    "w-full bg-white border border-txsn-mint-soft rounded-md px-3.5 py-2.5 text-[14px] text-txsn-ink placeholder:text-txsn-slate/50 focus:outline-none focus:border-txsn-teal focus:ring-2 focus:ring-txsn-mint/40 transition-colors";

  return (
    <>
      <PageHeader
        eyebrow="MEMBER ACCESS"
        title="Sign in"
        intro="Welcome back. Sign in to your TxSN member account."
      />
      <Container className="py-14">
        <div className="max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
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
                className={field}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {status === "error" && (
              <p className="text-[13px] text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 bg-txsn-teal hover:bg-txsn-teal-mid disabled:opacity-60 text-white text-[14px] font-medium px-5 py-3 rounded-md transition-colors"
            >
              {status === "loading" ? "Signing in..." : "Sign in"} <Icon name="arrow" size={16} />
            </button>
          </form>

          <p className="text-[13px] text-txsn-slate mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-txsn-teal font-medium hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
}
