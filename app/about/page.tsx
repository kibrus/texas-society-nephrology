import Image from "next/image";
import Link from "next/link";
import { PageHeader, Container, SectionHead, Icon } from "@/components/ui";
import { pillars } from "@/lib/site";

export const metadata = { title: "About · TSN" };

const audience = [
  "Nephrologists practicing in Texas — both academic and community-based",
  "Nephrology fellows, residents, and medical students interested in kidney medicine",
  "Advanced practice providers (NPs, PAs) working in nephrology",
  "Allied kidney care professionals (renal pathologists, etc.)",
  "Healthcare stakeholders and industry partners",
];

const statements = [
  {
    icon: "speakerphone",
    title: "Mission",
    body: "To advance kidney health in Texas by empowering nephrology professionals through education, advocacy, collaboration, and innovation.",
  },
  {
    icon: "research",
    title: "Vision",
    body: "A future where every patient in Texas receives exceptional, equitable, and innovative kidney care supported by a connected and thriving nephrology community.",
  },
];

const pillarPhotos: Record<string, string> = {
  Education: "/images/site/home/pillar-education.webp",
  Advocacy: "/images/site/home/pillar-advocacy.webp",
  Community: "/images/site/home/pillar-community.webp",
  Research: "/images/site/home/pillar-research.webp",
};

const quickLinks = [
  { href: "/about/leadership", icon: "users", title: "Leadership", body: "Meet the board guiding the society." },
  { href: "/about/corporate-partners", icon: "briefcase", title: "Corporate Partners", body: "The organizations supporting our work." },
  { href: "/contact", icon: "mail", title: "Contact", body: "Get in touch with the society." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Our Mission & Vision"
        intro="The Texas Society of Nephrology exists to advance kidney care across the state through education, advocacy, collaboration, and innovation."
        image="/images/site/about/hero.webp"
      />

      {/* Mission & Vision */}
      <section className="pad">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {statements.map((s, i) => (
              <article
                key={s.title}
                className="card card-hover spot rv p-8 lg:p-10"
                style={i ? { transitionDelay: ".08s" } : undefined}
              >
                <span className="ic-tile">
                  <Icon name={s.icon} size={22} />
                </span>
                <h2 className="mt-6 font-serif text-[1.6rem] font-bold">{s.title}</h2>
                <p className="mt-3 text-[17.5px] leading-relaxed text-slate">{s.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Pillars */}
      <section className="pad">
        <Container>
          <SectionHead title="Four ways we move nephrology forward" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <article
                key={p.title}
                className="card card-hover spot rv flex flex-col"
                style={i ? { transitionDelay: `${i * 0.08}s` } : undefined}
              >
                {pillarPhotos[p.title] && (
                  <div className="settle zoom-img relative aspect-[4/3]">
                    <Image
                      src={pillarPhotos[p.title]}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <span className="absolute bottom-3.5 left-[18px] z-[2] text-[13px] font-bold tracking-[0.06em] text-white [text-shadow:0_1px_8px_rgba(0,0,0,.45)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-[21px] font-bold">{p.title}</h3>
                  <p className="mt-2.5 text-[16px] text-slate">{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Who we serve + quick links (root layout adds the closing spacing) */}
      <section className="pad !pb-0">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div className="rv">
              <h2 className="h-display">Who We Serve</h2>
              <ul className="mt-8 grid gap-3">
                {audience.map((item) => (
                  <li key={item} className="card-line flex items-start gap-3.5 px-5 py-4 text-[17px] leading-snug text-ink">
                    <span className="mt-[3px] flex-shrink-0 text-navy">
                      <Icon name="check" size={18} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-label="More about TSN" className="grid content-start gap-4">
              {quickLinks.map((l, i) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="card card-hover spot rv group flex items-start gap-4 p-6 no-underline"
                  style={i ? { transitionDelay: `${i * 0.08}s` } : undefined}
                >
                  <span className="ic-tile">
                    <Icon name={l.icon} size={20} />
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center gap-2 font-serif text-[18px] font-bold text-navy">
                      {l.title}
                      <span className="arrow" aria-hidden="true">→</span>
                    </span>
                    <span className="mt-1 block text-[15px] text-slate">{l.body}</span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </Container>
      </section>
    </>
  );
}
