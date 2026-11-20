import { PageHeader, Container, Icon, Button, ArrowLink, Status } from "@/components/ui";
import { membershipTiers } from "@/lib/site";
import { TIER_OPTIONS } from "@/lib/membership";

export const metadata = { title: "Membership Tiers · TSN" };

export default function TiersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="Membership tiers"
        intro="Two tiers, built for where you are in your career. Pricing is confirmed at renewal."
        image="/images/site/membership/hero.webp"
      />

      <section className="pad">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {membershipTiers.map((tier, i) => {
              // Display price from the signup tier options (same label shown on /join).
              const option = TIER_OPTIONS.find((t) => t.label === tier.name);
              return (
                <article
                  key={tier.name}
                  className={`card card-hover spot rv flex flex-col p-8 sm:p-9 ${
                    tier.featured ? "outline outline-2 -outline-offset-2 outline-navy" : ""
                  }`}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="relative z-[2] flex flex-1 flex-col">
                    <div className="min-h-[22px]">
                      {tier.featured && <Status>Most members</Status>}
                    </div>
                    <h2 className="mt-3 font-serif text-[1.75rem] font-bold text-navy">{tier.name}</h2>
                    <p className="mt-1 text-[16px] text-slate">{tier.audience}</p>
                    <div className="mt-6 border-y border-line py-5">
                      {option ? (
                        <>
                          <div className="font-serif text-[2rem] font-bold leading-none text-navy">
                            {option.priceLabel}
                          </div>
                          <div className="mt-2 text-[14px] text-slate">{tier.price} dues</div>
                        </>
                      ) : (
                        <div className="text-[18px] font-semibold text-navy">{tier.price} dues</div>
                      )}
                    </div>
                    <ul className="mt-6 flex-1 space-y-3">
                      {tier.features.map((f) => (
                        <li key={f} className="flex gap-3 text-[16px] text-slate">
                          <Icon name="check" size={18} className="mt-1 flex-shrink-0 text-navy" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button href="/join" variant={tier.featured ? "navy" : "outline"} arrow className="w-full">
                        Join or renew
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="rv mt-12 text-center">
            <ArrowLink href="/membership">Why join TSN</ArrowLink>
          </p>
        </Container>
      </section>
    </>
  );
}
