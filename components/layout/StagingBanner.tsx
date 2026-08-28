// Shown only on non-production (preview/staging) deployments — see the
// VERCEL_ENV check in app/layout.tsx. Warns visitors that this is a test copy
// so they don't mistake it for the live site or enter real details.
export function StagingBanner() {
  return (
    <div className="bg-amber-400 text-txsn-teal-deep border-b-2 border-amber-500">
      <div className="mx-auto max-w-content px-5 py-3 text-center text-[14px] sm:text-[16px] font-bold leading-snug">
        🚧 TEST SITE — this is a staging copy for testing only. Payments and data
        here are not real. For the live Texas Society of Nephrology website, please
        visit{" "}
        <a
          href="https://www.txsocietyofnephrology.org"
          className="underline underline-offset-2 hover:opacity-80"
        >
          www.txsocietyofnephrology.org
        </a>
      </div>
    </div>
  );
}
