import Image from "next/image";
import { PageHeader, Container, Icon, SectionHead, Button, ArrowLink } from "@/components/ui";
import { TIER_OPTIONS } from "@/lib/membership";

export const metadata = { title: "Membership · TSN" };

const benefits = [
  { icon: "school", title: "Education & CME", body: "Year-round webinars and accredited content to stay current." },
  { icon: "calendar", title: "Event discounts", body: "Reduced registration for the annual meeting and paid events." },
  { icon: "users", title: "Community", body: "Mentorship and connection with peers across Texas." },
  { icon: "speakerphone", title: "A unified voice", body: "Add your weight to advocacy on the issues that matter." },
  { icon: "file", title: "Member resources", body: "Access to clinical and educational materials." },
  { icon: "research", title: "Research platform", body: "Submit abstracts and present at the annual meeting." },
];

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="Why join TSN"
        intro="Membership connects you to the people, education, and advocacy that strengthen nephrology practice across Texas."
        image="/images/site/membership/hero.webp"
        actions={
          <>
            <Button href="/join" variant="white" arrow>
              Join or renew
            </Button>
            <Button href="/membership/tiers" variant="glass">
              Compare membership tiers
            </Button>
          </>
        }
      />

      <section className="pad">
        <Container>
          <SectionHead title="What membership gives you" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <li
                key={b.title}
                className="card card-hover spot rv p-7"
                style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
              >
                <div className="relative z-[2]">
                  <div className="ic-tile mb-5">
                    <Icon name={b.icon} size={22} />
                  </div>
                  <h3 className="font-serif text-[1.25rem] font-bold text-navy">{b.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-slate">{b.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pad">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="settle zoom-img relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card-lg">
              <Image
                src="/images/site/membership/card.webp"
                alt="Three medical trainees in white coats reviewing notes together in a hospital corridor"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="rv">
              <h2 className="h-display">Two tiers, built for where you are in your career</h2>
              <ul className="mt-8 space-y-4">
                {TIER_OPTIONS.map((t) => (
                  <li key={t.value} className="card-line flex items-center justify-between gap-4 p-5">
                    <div>
                      <div className="font-serif text-[1.15rem] font-bold text-navy">{t.label}</div>
                      <div className="mt-0.5 text-[15px] text-slate">{t.blurb}</div>
                    </div>
                    <div className="whitespace-nowrap text-[16px] font-semibold text-ink">{t.priceLabel}</div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button href="/join" arrow>
                  Join or renew
                </Button>
                <ArrowLink href="/membership/tiers">Compare membership tiers</ArrowLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
