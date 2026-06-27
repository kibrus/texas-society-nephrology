import { PageHeader, Container, Icon } from "@/components/ui";
import Link from "next/link";
import { membershipTiers } from "@/lib/site";

export const metadata = { title: "Membership Tiers · TxSN" };

export default function TiersPage() {
  return (
    <>
      <PageHeader
        eyebrow="MEMBERSHIP"
        title="Membership tiers"
        intro="Two tiers, built for where you are in your career. Pricing is confirmed at renewal."
      />
      <Container className="py-14">
        <div className="grid gap-5 sm:grid-cols-2 max-w-3xl">
          {membershipTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl p-7 border ${
                tier.featured
                  ? "bg-white border-txsn-teal border-2"
                  : "bg-white border-txsn-mint-soft/50"
              }`}
            >
              {tier.featured && (
                <span className="inline-block text-[11px] font-medium text-txsn-teal bg-txsn-wash px-3 py-1 rounded-full mb-3">
                  Most members
                </span>
              )}
              <h2 className="font-serif text-2xl text-txsn-teal-deep font-medium">{tier.name}</h2>
              <div className="text-[13px] text-txsn-gold font-medium mt-1 mb-1">{tier.price} dues</div>
              <p className="text-[13px] text-txsn-slate mb-5">{tier.audience}</p>
              <ul className="space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2 text-[13.5px] text-txsn-slate">
                    <Icon name="check" size={17} className="text-txsn-teal flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/membership/join" className="inline-flex items-center gap-2 bg-txsn-gold text-white text-[14px] font-medium px-5 py-3 rounded-md hover:bg-txsn-gold/90 transition-colors">
            Join or renew <Icon name="arrow" size={16} />
          </Link>
        </div>
      </Container>
    </>
  );
}
