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
    <div className="card-line p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-navy">
          <Icon name="play-screen" size={20} />
        </span>
        <div>
          <p className="text-[14px] font-semibold text-muted">Recording</p>
          <h2 className="text-[16px] font-semibold text-ink">Watch this talk</h2>
        </div>
      </div>
      <p className="mt-3 text-[15px] leading-relaxed text-slate">{subtext}</p>

      {access === "loading" ? (
        <div aria-hidden className="mt-5 h-[48px] w-full animate-pulse rounded-full bg-surface-2" />
      ) : (
        <Link href={cta.href} className="btn btn-navy mt-5 w-full">
          <Icon name={access === "member" ? "play" : "lock"} size={16} />
          {cta.label}
        </Link>
      )}

      {access === "guest" && (
        <p className="mt-3 text-center text-[14px] text-slate">
          Already a member?{" "}
          <Link href="/sign-in" className="font-semibold text-navy underline underline-offset-2 hover:text-navy-hover">
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
}
