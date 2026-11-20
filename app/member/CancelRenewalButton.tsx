"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cancelAutoRenewal } from "./actions";

// Confirms, then calls the cancel server action. On success we refresh so the
// server component re-reads the profile and shows the "renewal off" state.
export function CancelRenewalButton() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function onClick() {
    setError(null);
    const confirmed = window.confirm(
      "Turn off automatic renewal? Your membership stays active until the end of your current paid period, then it won't renew.",
    );
    if (!confirmed) return;

    startTransition(async () => {
      const res = await cancelAutoRenewal();
      if (res.error) setError(res.error);
      else router.refresh();
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        className="text-[15px] font-semibold text-slate underline-offset-4 transition-colors hover:text-navy hover:underline disabled:opacity-60"
      >
        {pending ? "Cancelling…" : "Cancel automatic renewal"}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-[14px] text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
