import Link from "next/link";
import Image from "next/image";
import { Icon, Container } from "@/components/ui";
import { pillars, corporatePartners, annualMeeting } from "@/lib/site";
import { SponsorLogo } from "./SponsorLogo";
import { NewsPost, EventItem, formatDate, formatDateShort, isPastDate } from "@/lib/content";

export function FeaturedEvent({ event }: { event: EventItem }) {
  return (
    <section className="bg-txsn-wash border-b border-txsn-mint-soft/50">
      <Container className="py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          {/* Left — label + title */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex-shrink-0 bg-txsn-teal text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">
              Next Event
            </div>
            <div className="min-w-0">
              <span className="text-txsn-teal-deep font-semibold text-[15px] truncate block">
                {event.title}
              </span>
              <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                <span className="flex items-center gap-1 text-txsn-slate/70 text-[12px]">
                  <Icon name="calendar" size={12} />
                  {formatDate(event.date)}{event.time ? ` · ${event.time}` : ""}
                </span>
                <span className="flex items-center gap-1 text-txsn-slate/70 text-[12px]">
                  <Icon name="pin" size={12} />
                  {event.location}
                </span>
              </div>
            </div>
          </div>
          {/* Right — CTA */}
          <Link
            href={`/events/${event.slug}`}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-txsn-teal hover:bg-txsn-teal-mid text-white text-[13px] font-medium px-5 py-2 rounded-md transition-colors"
          >
            View event <Icon name="arrow" size={14} />
          </Link>
        </div>
      </Container>
    </section>
  );
}

// HERO IMAGE PLACEHOLDER — swap the src below with your own photo when ready.
// Place your image in /public/images/hero.jpg and update the src.
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background photo */}
      <Image
        src="/images/hero2.png"
        alt=""
        fill
        className="hero-img"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-txsn-teal-deep from-[0%] via-txsn-teal-deep/90 via-[45%] to-txsn-teal-deep/10 to-[72%]" />

      <Container className="relative z-10 py-20 lg:py-28">
        <div className="max-w-2xl reveal">
          <h1 className="font-serif text-4xl lg:text-[3.5rem] leading-[1.1] text-amber-200 font-medium [text-shadow:0_2px_16px_rgba(0,0,0,0.9),0_0_40px_rgba(0,0,0,0.5)]">
            The home of kidney care professionals in Texas
          </h1>
          <p className="mt-5 text-[16px] lg:text-[17px] leading-relaxed text-amber-100 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
            We bring together physicians, fellows, and kidney care leaders to
            advance patient care, sharpen practice, and shape the future of
            nephrology across the state.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 bg-txsn-teal hover:bg-txsn-teal-mid text-white text-[14px] font-semibold px-6 py-3 rounded-md transition-colors shadow-lg"
            >
              Become a member <Icon name="arrow" size={16} />
            </Link>
            <Link
              href="/annual-meeting"
              className="inline-flex items-center bg-white hover:bg-txsn-wash text-txsn-teal-deep text-[14px] font-medium px-6 py-3 rounded-md border border-txsn-mint transition-colors"
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
      <Container className="py-8 lg:py-10">
        <div className="text-[11px] tracking-wide text-txsn-gold font-medium mb-1">
          WHAT WE DO
        </div>
        <h2 className="font-serif text-[1.75rem] lg:text-[2rem] text-txsn-teal-deep font-medium mb-4">
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
      <Container className="py-8 lg:py-10">
        <div className="flex items-end justify-between mb-4 gap-4">
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
  // Annual meeting is always on the left (from site config); all upcoming events on the right
  const others = events;

  return (
    <section className="bg-txsn-paper">
      <Container className="py-10 lg:py-12">
        {/* Section header */}
        <div className="flex items-end justify-between mb-5 gap-4">
          <div>
            <div className="text-[11px] tracking-wide text-txsn-gold font-medium mb-1">
              MARK YOUR CALENDAR
            </div>
            <h2 className="font-serif text-[1.75rem] lg:text-[2rem] text-txsn-teal-deep font-medium">
              Events
            </h2>
          </div>
          <Link
            href="/events"
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-txsn-teal text-[13px] font-medium px-4 py-2 rounded-md border border-txsn-mint hover:bg-txsn-wash transition-colors"
          >
            View all events <Icon name="arrow" size={14} />
          </Link>
        </div>

        {/* Two-column: left = annual meeting (narrow), right = other events (wider) */}
        <div className="grid lg:grid-cols-[2fr_3fr] gap-4 items-stretch">

          {/* Left — Annual Meeting (from site config) */}
          <div className="relative bg-txsn-teal-deep rounded-xl overflow-hidden flex flex-col justify-end p-7">
            <div className="absolute inset-0 bg-gradient-to-t from-txsn-teal-deep/95 via-txsn-teal-deep/55 to-txsn-teal/15" />
            {/* Past event badge */}
            {isPastDate(annualMeeting.isoDate) && (
              <div className="absolute top-4 right-4 z-20">
                <span className="inline-flex items-center bg-white/15 border border-white/25 text-white/80 text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                  Past event
                </span>
              </div>
            )}
            <div className="relative z-10">
              <span className="text-[10px] tracking-widest text-txsn-mint font-semibold uppercase mb-2.5 block">
                Annual Meeting
              </span>
              <h3 className="font-serif text-[1.4rem] text-white font-medium leading-snug mb-2">
                {annualMeeting.title}
              </h3>
              <div className="flex items-center gap-1.5 text-white/60 text-[12px] mb-1">
                <Icon name="pin" size={11} />
                {annualMeeting.location}
              </div>
              <div className="flex items-center gap-1.5 text-white/60 text-[12px] mb-4">
                <Icon name="calendar" size={11} />
                {annualMeeting.dateLabel}
              </div>
              <p className="text-[12.5px] text-white/70 leading-relaxed mb-5 line-clamp-2">
                {annualMeeting.summary}
              </p>
              <Link
                href="/annual-meeting"
                className="inline-flex items-center gap-2 border border-white/40 hover:bg-white hover:text-txsn-teal-deep text-white text-[12.5px] font-semibold px-5 py-2 rounded-md transition-colors"
              >
                Review program <Icon name="arrow" size={13} />
              </Link>
            </div>
          </div>

          {/* Right — All other upcoming events */}
          <div className="flex flex-col gap-3">
            <div className="text-[10px] tracking-widest text-txsn-gold font-semibold uppercase mb-1">
              More Upcoming Events
            </div>
            {others.length > 0 ? (
              others.map((ev) => {
                const d = formatDateShort(ev.date);
                return (
                  <div
                    key={ev.slug}
                    className="flex items-center gap-4 bg-txsn-wash rounded-xl p-4 lg:px-5"
                  >
                    <div className="flex-shrink-0 text-center rounded-lg px-3 py-2 bg-txsn-teal text-white">
                      <div className="text-[9px] tracking-wide">{d.month}</div>
                      <div className="font-serif text-xl font-medium leading-none">{d.day}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13.5px] font-medium text-txsn-teal-deep truncate">
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
              })
            ) : (
              <div className="flex-1 flex items-center justify-center bg-txsn-wash rounded-xl p-6 text-center">
                <div>
                  <Icon name="calendar" size={24} className="text-txsn-mint mx-auto mb-2" />
                  <p className="text-[13px] text-txsn-slate">More events coming soon.</p>
                  <Link href="/events" className="mt-2 inline-flex items-center gap-1 text-txsn-teal text-[12px] font-medium hover:underline">
                    View all events <Icon name="arrow" size={12} />
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </Container>
    </section>
  );
}

export function Partners() {
  return (
    <section className="bg-white border-t border-b border-txsn-mint-soft/40">
      <Container className="py-5">
        <p className="text-center text-[10px] tracking-widest text-txsn-slate/40 font-medium mb-4 uppercase">
          Supported by our corporate partners
        </p>
        <div className="flex justify-between items-center gap-6">
          {corporatePartners.map((p) => (
            <SponsorLogo key={p.name} name={p.name} color={p.color} />
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
