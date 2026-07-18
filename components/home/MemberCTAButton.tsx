"use client";

import { useAuth } from "@/lib/auth-context";
import { Icon } from "@/components/ui";

export function MemberCTAButton() {
  const { user } = useAuth();
  const href = user ? "http://localhost:3001/member" : "http://localhost:3001/sign-up";

  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 bg-txsn-teal hover:bg-txsn-teal-mid text-white text-[14px] font-semibold px-6 py-3 rounded-md transition-colors shadow-lg"
    >
      Become a member <Icon name="arrow" size={16} />
    </a>
  );
}
