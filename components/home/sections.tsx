import Link from "next/link";
import Image from "next/image";
import { Icon, Container } from "@/components/ui";
import { pillars, corporatePartners, annualMeeting } from "@/lib/site";
import { SponsorLogo } from "./SponsorLogo";
import { NewsPost, EventItem, formatDate, formatDateShort, isPastDate } from "@/lib/content";

export function FeaturedEvent({ event }: { event: EventItem }) {
  return (
    <section className="bg-clinical-blue border-b border-txsn-mint-soft/50">
      <Container className="py-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex-shrink-0 bg-heritage-navy text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">
              Next Event
            </div>
            <div className="min-w-0">
              <span className="text-heritage-navy font-semibold text-[15px] truncate block">
                {event.title}
              </span>
              <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                <span className="flex items-center gap-1 text-txsn-slate/70 text-[12px]">
                  <Icon name="calendar" size={12} />
                  {event.dateLabel ?? formatDate(event.date)}{event.time && !event.dateLabel ? ` · ${event.time}` : ""}
                </span>
                <span className="flex items-center gap-1 text-txsn-slate/70 text-[12px]">
                  <Icon name="pin" size={12} />
                  {event.location}
                </span>
              </div>
            </div>
          </div>
          <Link
            href={`/events/${event.slug}`}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-heritage-navy hover:opacity-90 text-white text-[13px] font-medium px-5 py-2.5 rounded-sm transition-colors"
          >
            View event <Icon name="arrow" size={14} />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
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
              className="inline-flex items-center gap-2 bg-amber-accent hover:opacity-90 text-white text-[14px] font-semibold px-6 py-3 rounded-sm transition-colors shadow-lg"
            >
              Become a member <Icon name="arrow" size={16} />
            </Link>
            <Link
              href="/annual-meeting"
              className="inline-flex items-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-[14px] font-medium px-6 py-3 rounded-sm border border-white/30 transition-colors"
            >
              2026 Annual Meeting
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Partners() {
  return (
    <section className="py-5 border-b border-txsn-mint-soft/40">
      <Container>
        <p className="text-center text-[10px] tracking-[0.2em] text-txsn-slate/50 font-medium mb-4 uppercase">
          Supported by our corporate partners
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 opacity-35">
          {corporatePartners.map((p) => (
            <SponsorLogo key={p.name} name={p.name} color={p.color} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Pillars() {
  return (
    <section className="bg-white">
      <Container className="py-10 lg:py-12">
        <div className="mb-6">
          <div className="text-[11px] tracking-[0.2em] text-amber-accent font-semibold mb-1 uppercase">
            WHAT WE DO
          </div>
          <h2 className="font-serif text-[1.75rem] lg:text-[2rem] text-heritage-navy font-bold">
            Four ways we move nephrology forward
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => {
            const isTeal = p.accent === "teal";
            return (
              <div
                key={p.title}
                className={`group rounded-lg p-6 flex flex-col transition-all hover:-translate-y-1 hover:shadow-md border-t-4 ${
                  isTeal
                    ? "bg-clinical-blue border-heritage-navy"
                    : "bg-txsn-paper border-amber-accent"
                }`}
              >
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-white mb-4 flex-shrink-0 ${
                  isTeal ? "bg-heritage-navy" : "bg-amber-accent"
                }`}>
                  <Icon name={p.icon} size={20} />
                </div>
                <h3 className="text-[15px] font-semibold text-heritage-navy mb-2">
                  {p.title}
                </h3>
                <p className="text-[13px] text-txsn-slate leading-relaxed">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function NewsPreview({ posts }: { posts: NewsPost[] }) {
  return (
    <section className="bg-[#f4f3f7]">
      <Container className="py-10 lg:py-12">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <div className="text-[11px] tracking-[0.2em] text-amber-accent font-semibold mb-1 uppercase">
              STAY INFORMED
            </div>
            <h2 className="font-serif text-[1.75rem] lg:text-[2rem] text-heritage-navy font-bold">
              Latest News
            </h2>
          </div>
          <Link
            href="/news"
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-heritage-navy text-[13px] font-semibold px-4 py-2 rounded-sm border-2 border-heritage-navy hover:bg-heritage-navy hover:text-white transition-all"
          >
            View all news <Icon name="arrow" size={14} />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/news/${post.slug}`}
              className="group bg-white rounded-lg overflow-hidden border border-txsn-mint-soft/50 hover:border-txsn-mint hover:-translate-y-1 hover:shadow-md transition-all flex flex-col"
            >
              <div className="p-5 flex flex-col flex-1">
                <div className="text-[10px] uppercase tracking-wider text-amber-accent font-semibold mb-3">
                  {formatDate(post.date)}
                </div>
                <h3 className="text-[14px] font-semibold text-heritage-navy leading-snug mb-3 group-hover:text-amber-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-[12.5px] text-txsn-slate leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <span className="text-[12px] font-semibold text-heritage-navy inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
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
  const others = events;

  return (
    <section className="bg-white">
      <Container className="py-10 lg:py-12">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <div className="text-[11px] tracking-[0.2em] text-amber-accent font-semibold mb-1 uppercase">
              MARK YOUR CALENDAR
            </div>
            <h2 className="font-serif text-[1.75rem] lg:text-[2rem] text-heritage-navy font-bold">
              Events
            </h2>
          </div>
          <Link
            href="/events"
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-heritage-navy text-[13px] font-semibold px-4 py-2 rounded-sm border-2 border-heritage-navy hover:bg-heritage-navy hover:text-white transition-all"
          >
            View all events <Icon name="arrow" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-5 items-start">

          {/* Featured Annual Meeting */}
          <div className="relative rounded-xl overflow-hidden bg-heritage-navy text-white p-5 lg:p-6 flex flex-col justify-between">
            {isPastDate(annualMeeting.isoDate) && (
              <div className="absolute top-3 right-3 z-20">
                <span className="inline-flex items-center bg-white/15 border border-white/25 text-white/80 text-[11px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                  Past event
                </span>
              </div>
            )}
            <div className="relative z-10">
              <span className="text-[10px] tracking-widest text-txsn-mint font-semibold uppercase mb-2 block">
                Annual Meeting
              </span>
              <h3 className="font-serif text-[1.4rem] text-white font-medium leading-snug mb-2">
                {annualMeeting.title}
              </h3>
              <div className="space-y-1 mb-3">
                <p className="flex items-center gap-1.5 text-white/60 text-[12px]">
                  <Icon name="pin" size={11} /> {annualMeeting.location}
                </p>
                <p className="flex items-center gap-1.5 text-white/60 text-[12px]">
                  <Icon name="calendar" size={11} /> {annualMeeting.dateLabel}
                </p>
              </div>
              <p className="text-white/55 text-[12.5px] leading-relaxed line-clamp-2">
                {annualMeeting.summary}
              </p>
            </div>
            <div className="relative z-10 mt-4">
              <Link
                href="/annual-meeting"
                className="inline-flex items-center gap-2 border border-white/40 hover:bg-white hover:text-heritage-navy text-white px-5 py-2 rounded-sm font-semibold text-[12.5px] transition-all"
              >
                Review program <Icon name="arrow" size={12} />
              </Link>
            </div>
          </div>

          {/* Sidebar events list */}
          <div className="flex flex-col gap-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent pb-3 mb-2 border-b border-txsn-mint-soft/60">
              More Upcoming Events
            </p>
            {others.length > 0 ? (
              <div className="flex flex-col gap-3">
                {others.map((ev) => {
                  const d = formatDateShort(ev.date);
                  return (
                    <div
                      key={ev.slug}
                      className="flex items-center gap-3 bg-txsn-wash rounded-lg p-3.5"
                    >
                      <div className="bg-heritage-navy text-white w-13 h-13 shrink-0 flex flex-col items-center justify-center rounded-lg px-3 py-2 text-center">
                        <span className="text-[9px] uppercase font-bold tracking-wide block">
                          {ev.dateLabel ? "TBA" : d.month}
                        </span>
                        <span className="text-[18px] font-bold leading-tight block">
                          {ev.dateLabel ? "—" : d.day}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-heritage-navy text-[13px] leading-snug">
                          {ev.title}
                        </h4>
                        <div className="flex items-center gap-1 mt-0.5 flex-wrap text-[11.5px] text-txsn-slate">
                          <Icon name={ev.location === "Online" ? "video" : "pin"} size={11} />
                          <span className="truncate">{ev.location}</span>
                          <span className="mx-0.5">·</span>
                          {ev.dateLabel ? (
                            <span className="text-amber-accent font-medium">{ev.dateLabel}</span>
                          ) : (
                            <span className={ev.isFree ? "text-txsn-teal font-medium" : "text-amber-accent font-medium"}>
                              {ev.isFree ? "Free" : "Paid"}
                            </span>
                          )}
                        </div>
                      </div>
                      <Link
                        href={ev.href ?? `/events/${ev.slug}`}
                        className="flex-shrink-0 text-[12px] font-medium text-heritage-navy border border-txsn-mint-soft bg-white px-3 py-1.5 rounded-sm hover:bg-clinical-blue hover:border-txsn-mint transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center text-center py-8">
                <div>
                  <Icon name="calendar" size={24} className="text-txsn-mint mx-auto mb-2" />
                  <p className="text-[13px] text-txsn-slate">More events coming soon.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </Container>
    </section>
  );
}

export function JoinCTA() {
  return (
    <section className="bg-heritage-navy">
      <Container className="py-20 lg:py-24 text-center">
        <h2 className="font-serif text-[2rem] lg:text-[2.75rem] text-white font-bold max-w-2xl mx-auto leading-tight">
          Join the leading voice for Texas nephrology
        </h2>
        <p className="mt-5 text-[15px] lg:text-[16px] text-white/80 max-w-xl mx-auto leading-relaxed">
          Trainee and full membership tiers. Renew online, register for events,
          and access members-only resources to support your clinical practice.
        </p>
        <Link
          href="/membership"
          className="mt-8 inline-flex items-center gap-2 bg-amber-accent hover:opacity-90 text-white text-[15px] font-bold px-10 py-4 rounded-sm transition-all shadow-xl"
        >
          Become a member <Icon name="arrow" size={16} />
        </Link>
      </Container>
    </section>
  );
}
