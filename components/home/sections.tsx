import Link from "next/link";
import Image from "next/image";
import { TexasMark } from "@/components/layout/Logo";
import { Icon, Container } from "@/components/ui";
import { pillars, corporatePartners } from "@/lib/site";
import { NewsPost, EventItem, formatDate, formatDateShort } from "@/lib/content";

// HERO BACKGROUND IMAGE PLACEHOLDER
// To add a background photo:
//   1. Place your image in /public/images/ (e.g. hero.jpg)
//   2. Uncomment the <Image> and overlay <div> below
//   3. Change the section className from "bg-txsn-wash" to just "relative overflow-hidden"
//   4. Update text colors (h1, p) from teal/slate to white for contrast
export function Hero() {
  return (
    <section className="relative bg-txsn-wash overflow-hidden">
      {/* -- UNCOMMENT TO ENABLE BACKGROUND IMAGE --
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-txsn-teal-deep/65" />
      */}

      {/* Texas silhouette watermark */}
      <div className="absolute right-[-40px] top-[-20px] opacity-[0.07] pointer-events-none hidden sm:block">
        <TexasMark size={300} color="#0F6E56" opacity={1} />
      </div>
      <Container className="py-20 lg:py-24 relative z-10">
        <div className="max-w-2xl reveal">
          <span className="inline-flex items-center gap-1.5 bg-white text-txsn-teal text-[12px] font-medium px-3.5 py-1.5 rounded-full border border-txsn-mint-soft mb-5">
            <Icon name="pin" size={13} />
            Serving nephrology across Texas
          </span>
          <h1 className="font-serif text-4xl lg:text-[3.25rem] leading-[1.1] text-txsn-teal-deep font-medium">
            The home of kidney care professionals in Texas
          </h1>
          <p className="mt-5 text-[16px] lg:text-[17px] leading-relaxed text-txsn-slate max-w-xl">
            We bring together physicians, fellows, and kidney care leaders to
            advance patient care, sharpen practice, and shape the future of
            nephrology across the state.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 bg-txsn-teal hover:bg-txsn-teal-mid text-white text-[14px] font-medium px-5 py-3 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-txsn-teal/40"
            >
              Become a member <Icon name="arrow" size={16} />
            </Link>
            <Link
              href="/annual-meeting"
              className="inline-flex items-center bg-white hover:bg-txsn-paper text-txsn-teal text-[14px] font-medium px-5 py-3 rounded-md border border-txsn-mint transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-txsn-mint"
            >
              2026 Annual Meeting
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Pillars() {
  return (
    <section className="bg-txsn-paper">
      <Container className="py-16 lg:py-20">
        <div className="text-[11px] tracking-wide text-txsn-gold font-medium mb-2">
          WHAT WE DO
        </div>
        <h2 className="font-serif text-[1.75rem] lg:text-[2rem] text-txsn-teal-deep font-medium mb-8">
          Four ways we move nephrology forward
        </h2>
        <div className="grid gap-3.5 sm:grid-cols-2">
          {pillars.map((p) => {
            const isTeal = p.accent === "teal";
            return (
              <div
                key={p.title}
                className={`group rounded-xl p-5 flex gap-4 transition-transform hover:-translate-y-0.5 ${
                  isTeal ? "bg-txsn-wash" : "bg-txsn-gold-soft"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-11 h-11 rounded-[10px] flex items-center justify-center text-white ${
                    isTeal ? "bg-txsn-teal" : "bg-txsn-gold"
                  }`}
                >
                  <Icon name={p.icon} size={21} />
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-txsn-teal-deep mb-1">
                    {p.title}
                  </h3>
                  <p className="text-[13px] text-txsn-slate leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function NewsPreview({ posts }: { posts: NewsPost[] }) {
  const accents = ["bg-txsn-teal", "bg-txsn-gold", "bg-txsn-teal"];
  return (
    <section className="bg-txsn-wash">
      <Container className="py-16 lg:py-20">
        <div className="flex items-end justify-between mb-7 gap-4">
          <div>
            <div className="text-[11px] tracking-wide text-txsn-gold font-medium mb-1">
              STAY INFORMED
            </div>
            <h2 className="font-serif text-[1.75rem] lg:text-[2rem] text-txsn-teal-deep font-medium">
              Latest News
            </h2>
          </div>
          <Link
            href="/news"
            className="flex-shrink-0 inline-flex items-center gap-1.5 bg-white text-txsn-teal text-[13px] font-medium px-4 py-2 rounded-md border border-txsn-mint hover:bg-txsn-paper transition-colors"
          >
            View all news <Icon name="arrow" size={14} />
          </Link>
        </div>
        <div className="grid gap-3.5 md:grid-cols-3">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/news/${post.slug}`}
              className="group bg-white rounded-xl overflow-hidden border border-txsn-mint-soft/50 hover:border-txsn-mint transition-colors flex flex-col"
            >
              <div className={`h-1.5 ${accents[i % 3]}`} />
              <div className="p-5 flex flex-col flex-1">
                <div className="text-[10px] uppercase tracking-wide text-txsn-gold font-medium mb-2">
                  {formatDate(post.date)}
                </div>
                <h3 className="text-[14px] font-medium text-txsn-teal-deep leading-snug mb-2 group-hover:text-txsn-teal transition-colors">
                  {post.title}
                </h3>
                <p className="text-[12.5px] text-txsn-slate leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <span className="text-[12px] font-medium text-txsn-teal inline-flex items-center gap-1">
                  Read more <Icon name="arrow" size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function EventsPreview({ events }: { events: EventItem[] }) {
  return (
    <section className="bg-txsn-paper">
      <Container className="py-16 lg:py-20">
        <div className="flex items-end justify-between mb-7 gap-4">
          <div>
            <div className="text-[11px] tracking-wide text-txsn-gold font-medium mb-1">
              MARK YOUR CALENDAR
            </div>
            <h2 className="font-serif text-[1.75rem] lg:text-[2rem] text-txsn-teal-deep font-medium">
              Upcoming Events
            </h2>
          </div>
          <Link
            href="/events"
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-txsn-teal text-[13px] font-medium px-4 py-2 rounded-md border border-txsn-mint hover:bg-txsn-wash transition-colors"
          >
            View all events <Icon name="arrow" size={14} />
          </Link>
        </div>
        <div className="flex flex-col gap-2.5">
          {events.map((ev, i) => {
            const d = formatDateShort(ev.date);
            return (
              <div
                key={ev.slug}
                className="flex items-center gap-4 bg-txsn-wash rounded-xl p-4 lg:px-5"
              >
                <div
                  className={`flex-shrink-0 text-center rounded-lg px-3 py-2 ${
                    i === 0 ? "bg-txsn-teal text-white" : "bg-txsn-mint text-txsn-teal-deep"
                  }`}
                >
                  <div className="text-[9px] tracking-wide">{d.month}</div>
                  <div className="font-serif text-xl font-medium leading-none">
                    {d.day}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-txsn-teal-deep truncate">
                    {ev.title}
                  </div>
                  <div className="text-[12px] text-txsn-slate mt-0.5 flex items-center gap-1 flex-wrap">
                    <Icon name={ev.location === "Online" ? "video" : "pin"} size={12} />
                    {ev.location}
                    <span className="mx-1">·</span>
                    {ev.isFree ? (
                      <span className="text-txsn-teal font-medium">Free</span>
                    ) : (
                      <span className="text-txsn-gold font-medium">
                        Paid{ev.memberDiscount ? " · Member discount" : ""}
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  href={ev.href ?? `/events/${ev.slug}`}
                  className="flex-shrink-0 text-[12px] font-medium text-txsn-teal border border-txsn-mint bg-white px-3 py-1.5 rounded-md hover:bg-txsn-paper transition-colors"
                >
                  Details
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function Partners() {
  return (
    <section className="bg-white border-t border-b border-txsn-mint-soft/40">
      <Container className="py-10 text-center">
        <div className="text-[10px] tracking-wide text-txsn-slate/60 font-medium mb-5">
          SUPPORTED BY OUR CORPORATE PARTNERS
        </div>
        <div className="flex justify-center gap-x-10 gap-y-4 flex-wrap items-center">
          {corporatePartners.slice(0, 5).map((p) => (
            <div
              key={p.name}
              className="text-[14px] font-medium text-txsn-slate/50"
            >
              {p.name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function JoinCTA() {
  return (
    <section className="bg-txsn-teal-deep">
      <Container className="py-16 lg:py-20 text-center">
        <h2 className="font-serif text-[1.75rem] lg:text-[2.25rem] text-white font-medium max-w-2xl mx-auto leading-tight">
          Join the leading voice for Texas nephrology
        </h2>
        <p className="mt-4 text-[14px] lg:text-[15px] text-txsn-mint-soft max-w-md mx-auto leading-relaxed">
          Trainee and full membership tiers. Renew online, register for events,
          and access members-only resources.
        </p>
        <Link
          href="/membership"
          className="mt-7 inline-flex items-center gap-2 bg-txsn-gold hover:bg-txsn-gold/90 text-white text-[14px] font-medium px-6 py-3 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-txsn-gold/50"
        >
          Become a member <Icon name="arrow" size={16} />
        </Link>
      </Container>
    </section>
  );
}
