import Link from "next/link";
import Image from "next/image";
import { ArrowLink, Button, Container, DateTile, Icon, MetaRow, RiseWords, SectionHead } from "@/components/ui";
import { annualMeeting, pillars } from "@/lib/site";
import {
  type EventItem,
  type NewsPost,
  formatDate,
  formatDateShort,
  isEventPast,
  isEventTba,
  isPastDate,
} from "@/lib/content";
import { eventThumb } from "@/components/events/EventCards";
import s from "./home.module.css";

/* ---------- Helpers (derive display text from existing content only) ---------- */

const FALLBACK = "/images/site/events/fallback.webp";

// "III at Wolfgang Puck, …, Houston, TX 77030" → "Houston"
function cityOf(location: string): string {
  const parts = location.split(",").map((p) => p.trim());
  const stateIdx = parts.findIndex((p) => /^TX\b/.test(p));
  if (stateIdx > 0) return parts[stateIdx - 1];
  return parts[0] ?? location;
}

// First segment = venue ("III at Wolfgang Puck").
function venueOf(location: string): string {
  return location.split(",")[0]?.trim() ?? location;
}

// "Venue, City" without repeating the city.
function shortPlace(location: string): string {
  const venue = venueOf(location);
  const city = cityOf(location);
  return venue === city ? venue : `${venue}, ${city}`;
}

function eventHref(e: EventItem) {
  return `/events/${e.slug}`;
}

function longDate(e: EventItem): string {
  if (e.endDate && e.dateLabel) return e.dateLabel;
  if (!e.date) return e.dateLabel ?? "";
  return new Date(e.date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function whenLabel(e: EventItem): string {
  if (isEventTba(e)) return "To be announced";
  return e.dateLabel ?? formatDate(e.date);
}

// "Bayou City Bean Club: A Lunch and Learn" → series name "Bayou City Bean Club"
function seriesOf(title: string) {
  return title.split(":")[0].trim();
}

function listTitle(e: EventItem) {
  return e.talkTitle ? `${seriesOf(e.title)}: ${e.talkTitle}` : e.title;
}

const thumbFor = eventThumb;

const mentionsZoom = (e: EventItem) => /zoom/i.test(e.content) || /zoom/i.test(e.excerpt);

/* ---------- 1. Hero ---------- */

export function Hero() {
  return (
    <section className={s.hero} data-hero>
      <Image
        src="/images/site/home/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        data-parallax
      />
      <Container className={s.heroInner}>
        <RiseWords text="The home of kidney care professionals in Texas" className={s.heroTitle} />
        <p className={`${s.heroText} fade-up`} style={{ animationDelay: ".3s" }}>
          We bring together physicians, fellows, and kidney care leaders to advance patient care,
          sharpen practice, and shape the future of nephrology across the state.
        </p>
        <div className={`${s.heroCtas} fade-up`} style={{ animationDelay: ".45s" }}>
          <Button href="/join" variant="white" arrow>
            Become a member
          </Button>
          <Button href="/annual-meeting" variant="glass">
            2026 Annual Meeting
          </Button>
        </div>
      </Container>
    </section>
  );
}

/* ---------- 2. Action bar ---------- */

const quickLinks = [
  { href: "/join", icon: "user-plus", title: "Join or renew", sub: "Trainee and full membership" },
  { href: "/resources/member", icon: "play-screen", title: "Watch past talks", sub: "Bayou City Bean Club recordings" },
  { href: "/events", icon: "calendar", title: "All events", sub: "Meetings, webinars and lunch-and-learns" },
];

export function ActionBar({ next }: { next: EventItem | null }) {
  let eventCell;
  if (next) {
    const { month, day } = formatDateShort(next.date);
    const name = next.talkTitle ? seriesOf(next.title) : next.title;
    const where = [next.speakerName, cityOf(next.location)].filter(Boolean).join(" · ");
    const go = next.registrationUrl ? "RSVP" : "Details";
    eventCell = (
      <Link
        href={eventHref(next)}
        className={`${s.qEvent} spot dark`}
        aria-label={`Next event: ${name}${next.speakerName ? ` with ${next.speakerName}` : ""}, ${longDate(next)}, ${cityOf(next.location)}. ${go}.`}
      >
        <span className={s.qKicker}>
          <span className={s.qDot} aria-hidden="true" />
          Next event
        </span>
        <span className={s.qDate} aria-hidden="true">
          <span className={s.qm}>{month}</span>
          <span className={s.qd}>{day}</span>
        </span>
        <span>
          <span className={s.qTitle}>{name}</span>
          <span className={s.qWhere}>{where}</span>
          <span className={s.qGo}>
            {go}{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </span>
        </span>
      </Link>
    );
  } else {
    eventCell = (
      <Link href="/events" className={`${s.qEvent} ${s.noDate} spot dark`}>
        <span className={s.qKicker}>Events</span>
        <span>
          <span className={s.qTitle}>See past events and recordings</span>
          <span className={s.qGo}>
            All events{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </span>
        </span>
      </Link>
    );
  }

  return (
    <div className={s.quick}>
      <Container>
        <nav aria-label="Quick links" className={`${s.quickGrid} shadow-card-lg`}>
          {eventCell}
          {quickLinks.map((q) => (
            <Link key={q.href} href={q.href} className={`${s.ql} spot`}>
              <span className={s.qIcon}>
                <Icon name={q.icon} size={20} />
              </span>
              <span className={s.qt}>
                {q.title}{" "}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </span>
              <span className={s.qs}>{q.sub}</span>
            </Link>
          ))}
        </nav>
      </Container>
    </div>
  );
}

/* ---------- 4. Four pillars ---------- */

const pillarExtras: Record<string, { img: string; alt: string; href: string; cta: string }> = {
  Education: {
    img: "/images/site/home/pillar-education.webp",
    alt: "A presenter speaking in front of a screen to a seated audience",
    href: "/events",
    cta: "See events",
  },
  Advocacy: {
    img: "/images/site/home/pillar-advocacy.webp",
    alt: "The Texas State Capitol dome with flags",
    href: "/about",
    cta: "Our mission",
  },
  Community: {
    img: "/images/site/home/pillar-community.webp",
    alt: "A group of people stacking their hands together",
    href: "/membership",
    cta: "Why join",
  },
  Research: {
    img: "/images/site/home/pillar-research.webp",
    alt: "A scientist pipetting samples in a laboratory",
    href: "/annual-meeting/abstracts",
    cta: "Abstract submission",
  },
};

export function Pillars() {
  return (
    <section className="pad" aria-labelledby="pillars-title">
      <Container>
        <SectionHead
          id="pillars-title"
          title="Four ways we move nephrology forward"
          intro="Education, advocacy, community and research for the physicians, fellows and kidney care leaders who care for patients across Texas."
          action={<ArrowLink href="/about">About TSN</ArrowLink>}
        />
        <ul className={s.pillars}>
          {pillars.map((p, i) => {
            const x = pillarExtras[p.title];
            if (!x) return null;
            return (
              <li key={p.title} className="rv" style={{ transitionDelay: `${i * 0.08}s` }}>
                <Link href={x.href} className={`${s.pillar} card card-hover spot h-full`}>
                  <div className={`${s.pillarPhoto} settle`}>
                    <Image
                      src={x.img}
                      alt={x.alt}
                      fill
                      sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 25vw"
                    />
                    <span className={s.pillarNum} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={s.pillarBody}>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                    <span className="link">
                      {x.cta}{" "}
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/* ---------- 5. Annual Meeting band ---------- */

export function AnnualMeetingBand() {
  const past = isPastDate(annualMeeting.isoDate);
  const highlights = annualMeeting.schedule
    .map((row) => {
      const [title, speaker] = row.session.split(" – ");
      return { time: row.time.split(" – ")[0], title, speaker };
    })
    // Talks with a named speaker (the welcome/introduction isn't a talk).
    .filter((r) => r.speaker && !/^introduction$/i.test(r.title.trim()))
    .slice(0, 3);

  return (
    <section className={s.am} aria-labelledby="am-title">
      <Image src="/images/site/home/annual-meeting.webp" alt="" fill sizes="100vw" />
      <Container className={s.amInner}>
        <div className="rv">
          {past && <span className={s.chip}>Past event</span>}
          <h2 id="am-title" className={s.amTitle}>
            {annualMeeting.title}
          </h2>
          <div className={s.amFacts}>
            <span>
              <Icon name="calendar" size={17} />
              {annualMeeting.dateLabel} · {annualMeeting.timeLabel}
            </span>
            <span>
              <Icon name="pin" size={17} />
              {shortPlace(annualMeeting.location)}
            </span>
          </div>
          <p className={s.amLede}>{annualMeeting.summary}</p>
          <div className={s.amCtas}>
            <Button href="/annual-meeting" variant="white" arrow>
              Review program
            </Button>
            <Button href="/annual-meeting/schedule" variant="glass">
              Schedule
            </Button>
          </div>
        </div>
        {highlights.length > 0 && (
          <div className="glass-panel rv" style={{ transitionDelay: ".12s" }}>
            <h3 className={s.glassTitle}>Program highlights</h3>
            <ul>
              {highlights.map((h) => (
                <li key={h.title} className={s.talkRow}>
                  <span className={s.time}>{h.time}</span>
                  <div>
                    <b>{h.title}</b>
                    <span className={s.who}>{h.speaker}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}

/* ---------- 6. Events ---------- */

function FeaturedEvent({ e }: { e: EventItem }) {
  const hasSpeaker = Boolean(e.speakerPhoto);
  const photo = e.speakerPhoto ?? e.image ?? FALLBACK;
  const kind = e.talkTitle ? e.title.replace(/:\s*/, " · ") : e.sponsor;
  const inPersonOrZoom = !/online/i.test(e.location) && mentionsZoom(e);
  const free = e.isFree && !e.hidePricing;

  return (
    <article className={`${s.evFeature} ${hasSpeaker ? s.speaker : ""} card card-hover spot rv`}>
      <div className={`${s.evPhoto} settle zoom-img`}>
        <Image
          src={photo}
          alt={hasSpeaker && e.speakerName ? e.speakerName : ""}
          fill
          sizes={hasSpeaker ? "(max-width: 700px) 100vw, (max-width: 1000px) 40vw, 300px" : "(max-width: 1000px) 100vw, 60vw"}
        />
        <DateTile iso={e.date} showYear className={s.evDate} />
      </div>
      <div className={s.evBody}>
        {kind && <p className={s.evKind}>{kind}</p>}
        <h3 className={s.evTitle}>
          <Link href={eventHref(e)}>{e.talkTitle ?? e.title}</Link>
        </h3>
        {e.speakerName && <p className={s.evWho}>{e.speakerName}</p>}
        <ul className={s.evFacts}>
          <li>
            <Icon name="calendar" size={16} />
            {longDate(e)}
          </li>
          {e.time && (
            <li>
              <Icon name="clock" size={16} />
              {e.time.replace(/\s-\s/, " – ")}
            </li>
          )}
          <li>
            <Icon name="pin" size={16} />
            {shortPlace(e.location)}
          </li>
          {inPersonOrZoom && (
            <li>
              <Icon name="video" size={16} />
              In person or on Zoom
            </li>
          )}
        </ul>
        {e.excerpt && (
          <p className={s.evDesc}>
            {e.excerpt}
            {free ? " Free to attend." : ""}
          </p>
        )}
        <div className={s.evCtas}>
          {e.registrationUrl && (
            <Button href={e.registrationUrl} variant="navy" arrow>
              RSVP
            </Button>
          )}
          <ArrowLink href={eventHref(e)}>View details</ArrowLink>
        </div>
      </div>
    </article>
  );
}

function EventRow({ e, past, delay }: { e: EventItem; past?: boolean; delay: number }) {
  const city = cityOf(e.location);
  const sub = [e.speakerName ?? (e.speakerPhoto ? undefined : e.sponsor), past && e.youtubeId ? "Recording available" : undefined]
    .filter(Boolean)
    .join(" · ");
  return (
    <li className="rv" style={{ transitionDelay: `${delay}s` }}>
      <Link
        href={eventHref(e)}
        className={`${s.evItem} card-line spot ${past ? "is-past" : ""}`}
      >
        <div className={s.evThumb}>
          <Image src={thumbFor(e)} alt="" fill sizes="104px" />
        </div>
        <div>
          <span className={`${s.evWhen} block`}>
            {whenLabel(e)}
            {city ? ` · ${city}` : ""}
          </span>
          <h3>{listTitle(e)}</h3>
          {sub && <span className={`${s.evSub} block`}>{sub}</span>}
        </div>
      </Link>
    </li>
  );
}

export function EventsSection({
  next,
  upcoming,
  past,
}: {
  next: EventItem | null;
  upcoming: EventItem[];
  past: EventItem[];
}) {
  const others = upcoming.filter((e) => e.slug !== next?.slug && !isEventPast(e));
  return (
    <section className="pad" aria-labelledby="events-title">
      <Container>
        <SectionHead
          id="events-title"
          title="Events"
          intro="Meetings, summits and lunch-and-learns for kidney care professionals across Texas."
          action={<ArrowLink href="/events">View all events</ArrowLink>}
        />
        <div className={next ? s.evLayout : undefined}>
          {next && <FeaturedEvent e={next} />}
          <ul className={s.evList}>
            {others.map((e, i) => (
              <EventRow key={e.slug} e={e} delay={i * 0.06} />
            ))}
            {past.length > 0 && (
              <li className={`${s.evSep} sep-label`} aria-hidden="true">
                <span>Past events</span>
              </li>
            )}
            {past.map((e, i) => (
              <EventRow key={e.slug} e={e} past delay={(others.length + i) * 0.06} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* ---------- 7. News ---------- */

export function NewsRow({ posts }: { posts: NewsPost[] }) {
  if (posts.length === 0) return null;
  return (
    <section className={s.news} aria-labelledby="news-title">
      <Container>
        <div className={`${s.colHead} rv`}>
          <h2 id="news-title" className="h-display">
            Latest news
          </h2>
          <ArrowLink href="/news">View all news</ArrowLink>
        </div>
        <ul className={s.newsRow}>
          {posts.map((p, i) => (
            <li key={p.slug} className="rv" style={{ transitionDelay: `${i * 0.08}s` }}>
              <Link href={`/news/${p.slug}`} className={s.nitem}>
                <MetaRow category={p.category} date={formatDate(p.date)} />
                <h3>{p.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------- 8. Talks ---------- */

export function Talks({ talks }: { talks: EventItem[] }) {
  if (talks.length === 0) return null;
  return (
    <section className="pad" aria-labelledby="talks-title">
      <Container>
        <SectionHead
          id="talks-title"
          title="Watch past talks"
          intro="Recordings from the Bayou City Bean Club, our lunch-and-learn series in the Texas Medical Center."
          action={
            <Button href="/resources/member" variant="outline">
              All recordings
            </Button>
          }
        />
        <ul className={s.talkGrid}>
          {talks.map((t, i) => (
            <li key={t.slug} className="rv" style={{ transitionDelay: `${i * 0.1}s` }}>
              <Link
                href={`/resources/member/${t.slug}`}
                className={`${s.talk} card card-hover spot h-full`}
                data-tilt
              >
                <div className={`${s.talkPhoto} tilt`}>
                  <Image
                    src={t.videoThumbnail ?? t.speakerPhoto ?? FALLBACK}
                    alt=""
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                  />
                  <span className={s.play} aria-hidden="true">
                    <span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </div>
                <div className={s.talkBody}>
                  <h3>{t.talkTitle ?? t.title}</h3>
                  {t.speakerName && <span className={`${s.talkWho} block`}>{t.speakerName}</span>}
                  {t.speakerTitle && (
                    <span className={`${s.talkRole} block`}>{t.speakerTitle.split(";")[0].trim()}</span>
                  )}
                  <span className={s.talkMeta}>
                    <span>{formatDate(t.date)}</span>
                    <span className={s.lock}>
                      <Icon name="lock" size={12} />
                      Members only
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Divider() {
  return (
    <Container>
      <hr className={s.divider} />
    </Container>
  );
}
