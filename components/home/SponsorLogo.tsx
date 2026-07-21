export function SponsorLogo({ name }: { name: string; color?: string; logo?: string }) {
  return (
    <div className="flex-1 flex items-center justify-center min-w-0 px-4 py-3">
      <div className="flex items-center gap-2.5 border border-dashed border-txsn-mint rounded-lg px-5 py-2.5 w-full justify-center">
        <div className="w-2 h-2 rounded-full bg-txsn-teal/40 flex-shrink-0" />
        <span className="text-[13px] font-medium text-txsn-slate/50 whitespace-nowrap tracking-wide">
          {name}
        </span>
      </div>
    </div>
  );
}
