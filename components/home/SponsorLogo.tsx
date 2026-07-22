export function SponsorLogo({ name }: { name: string; color?: string; logo?: string }) {
  return (
    <span className="text-xl font-bold text-txsn-teal-deep">
      {name}
    </span>
  );
}
