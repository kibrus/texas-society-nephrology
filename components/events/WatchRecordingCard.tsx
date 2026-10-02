"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

// Access states for the viewer, resolved client-side so the (statically
// rendered) event page can route each visitor correctly without going dynamic.
type Access = "loading" | "guest" | "inactive" | "member";

// Sidebar card shown on an event that has a member-only recording. Members are
// sent to the gated player; everyone else is pointed at joining/renewing first.
export function WatchRecordingCard({ slug }: { slug: string }) {
  const [access, setAccess] = useState<Access>("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (cancelled) return;
      if (!user) {
        setAccess("guest");
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("membership_status")
        .eq("id", user.id)
        .maybeSingle();
      if (cancelled) return;
      setAccess(profile?.membership_status === "active" ? "member" : "inactive");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const cta =
    access === "member"
      ? { href: `/resources/member/${slug}`, label: "Watch the recording" }
      : access === "inactive"
        ? { href: "/member/renew", label: "Renew to watch" }
        : { href: "/join", label: "Become a member to watch" };

  const subtext =
    access === "member"
      ? "Your member access is active — enjoy the talk."
      : access === "inactive"
        ? "Recordings are a member benefit. Renew your membership to watch."
        : "The recording of this talk is available to TSN members.";

  return (
    <div className="rounded-xl bg-txsn-teal-deep p-6 text-white">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/15">
          <Icon name="play" size={20} />
        </div>
        <div>
          <div className="mb-0.5 text-[11px] font-medium uppercase tracking-widest text-txsn-mint">
            Recording
          </div>
          <div className="text-[14px] font-semibold">Watch this talk</div>
        </div>
      </div>
      <p className="mb-4 text-[12.5px] leading-relaxed text-white/70">{subtext}</p>

      {access === "loading" ? (
        <div
          aria-hidden
          className="h-[42px] w-full animate-pulse rounded-md bg-white/15"
        />
      ) : (
        <Link
          href={cta.href}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-[13px] font-semibold text-txsn-teal-deep transition-colors hover:bg-txsn-wash"
        >
          {access === "member" ? (
            <Icon name="play" size={15} />
          ) : (
            <Icon name="lock" size={15} />
          )}
          {cta.label}
        </Link>
      )}

      {access === "guest" && (
        <Link
          href="/sign-in"
          className="mt-3 block text-center text-[12.5px] font-medium text-white/70 underline-offset-2 hover:text-white hover:underline"
        >
          Already a member? Sign in
        </Link>
      )}
    </div>
  );
}
