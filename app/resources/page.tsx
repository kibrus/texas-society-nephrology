import Link from "next/link";
import { PageHeader, Container, Icon } from "@/components/ui";

export const metadata = { title: "Resources · TSN" };

// Clinical Resources and Education & CME are hidden for now (placeholder
// content). Re-add their cards here when they have real material.
const groups = [
  { href: "/resources/member", icon: "users", title: "Member Resources", body: "Exclusive materials and event recordings available to TSN members.", action: "Open member resources" },
  { href: "/news", icon: "speakerphone", title: "News", body: "Latest updates, announcements, and stories from the Texas nephrology community.", action: "Read the news" },
  { href: "/careers", icon: "briefcase", title: "Careers", body: "Job opportunities and career resources for nephrology professionals in Texas.", action: "Visit the career center" },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Resources for Texas nephrology"
        intro="Curated clinical references, continuing education, and member materials, all in one place."
        image="/images/site/resources/hero.webp"
      />
      <section className="pad">
        <Container>
          <div className="grid gap-7 md:grid-cols-3">
            {groups.map((g, i) => (
              <div key={g.href} className="rv" style={{ transitionDelay: `${i * 0.08}s` }}>
                <Link href={g.href} className="card card-hover spot group flex h-full flex-col p-8">
                  <span className="ic-tile mb-6">
                    <Icon name={g.icon} size={22} />
                  </span>
                  <h2 className="font-serif text-[22px] font-bold leading-[1.3] text-navy">{g.title}</h2>
                  <p className="mt-3 flex-1 text-[16px] leading-[1.65] text-slate">{g.body}</p>
                  <span className="link mt-6 text-[15px]">
                    {g.action}
                    <span className="arrow" aria-hidden="true">→</span>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
