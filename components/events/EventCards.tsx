import Image from "next/image";
import Link from "next/link";
import { Button, DateTile, Icon, Status } from "@/components/ui";
import { EventItem, formatDate, isEventPast, isEventTba } from "@/lib/content";
import styles from "./events.module.css";

export const EVENT_FALLBACK_IMAGE = "/images/site/events/fallback.webp";

// Where an event links to (some events, e.g. the Annual Meeting, have their own page).
export function eventHref(e: EventItem): string {
  return e.href ?? `/events/${e.slug}`;
}

// True when `image` is a photo rather than a flyer/brochure graphic.
export function isPhotoImage(src?: string): src is string {
  return Boolean(src && /\.(jpe?g|png|webp|avif)$/i.test(src) && !/flyer|brochure/i.test(src));
}

// Thumbnail (shared by the home page and /events): speaker photo → recording
// poster → event photo → online-event photo → sponsored-summit photo → fallback.
export function eventThumb(e: EventItem): string {
  if (e.speakerPhoto) return e.speakerPhoto;
  if (e.videoThumbnail) return e.videoThumbnail;
  if (isPhotoImage(e.image)) return e.image;
  if (/online/i.test(e.location)) return "/images/site/home/event-webinar.webp";
  if (e.sponsor) return "/images/site/home/event-summit.webp";
  return EVENT_FALLBACK_IMAGE;
}

export function eventWhen(e: EventItem): string {
  if (isEventTba(e)) return "To be announced";
  return e.dateLabel ?? formatDate(e.date);
}

function isOnline(location: string) {
  return /^online$/i.test(location.trim());
}

function rsvpLabel(url: string) {
  return url.startsWith("mailto:") ? "RSVP by email" : "Register";
}

/* ---------- Featured next event ---------- */

export function FeaturedEvent({ event }: { event: EventItem }) {
  const href = eventHref(event);
  const photo = event.speakerPhoto || (isPhotoImage(event.image) ? event.image : EVENT_FALLBACK_IMAGE);
  const heading = event.talkTitle ?? event.title;
  const canRegister = event.registrationUrl && !isEventPast(event);

  return (
    <article className={`card card-hover spot ${styles.feature}`}>
      <div className={`${styles.featurePhoto} zoom-img settle`}>
        <Image
          src={photo}
          alt={event.speakerPhoto ? event.speakerName ?? "" : ""}
          fill
          sizes="(max-width: 760px) 100vw, 40vw"
          style={{ objectPosition: event.speakerPhoto ? "center 20%" : "center" }}
        />
        <DateTile iso={event.date} showYear tba={isEventTba(event)} className={styles.featureDate} />
      </div>
      <div className={styles.featureBody}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Status tone="live">Next event</Status>
          {event.talkTitle && <span className="text-[14px] font-semibold text-muted">{event.title}</span>}
        </div>
        <h3 className="mt-3 font-serif text-[clamp(1.5rem,2.2vw,1.9rem)] font-bold leading-tight text-navy">
          {heading}
        </h3>
        {event.speakerName && <p className="mt-2 text-[16px] font-semibold text-ink">{event.speakerName}</p>}
        <ul className="mt-4 grid gap-2 text-[15px] font-medium text-ink">
          <li className="flex items-start gap-2">
            <Icon name="calendar" size={16} className="mt-[3px] shrink-0 text-muted" />
            {eventWhen(event)}
          </li>
          {event.time && (
            <li className="flex items-start gap-2">
              <Icon name="clock" size={16} className="mt-[3px] shrink-0 text-muted" />
              {event.time}
            </li>
          )}
          <li className="flex items-start gap-2">
            <Icon name={isOnline(event.location) ? "video" : "pin"} size={16} className="mt-[3px] shrink-0 text-muted" />
            {event.location}
          </li>
          {!event.hidePricing && event.isFree && (
            <li className="flex items-start gap-2">
              <Icon name="check" size={16} className="mt-[3px] shrink-0 text-muted" />
              Free to attend
            </li>
          )}
        </ul>
        {event.excerpt && <p className="mt-4 line-clamp-3 text-[16px] text-slate">{event.excerpt}</p>}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          {canRegister && (
            <Button href={event.registrationUrl} arrow className={styles.above}>
              {rsvpLabel(event.registrationUrl!)}
            </Button>
          )}
          <Link href={href} className={`link ${styles.stretch}`}>
            View details<span className="sr"> about {heading}</span>
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ---------- List rows ---------- */

// Upcoming row: date tile + title. Past row: greyed with a B&W thumbnail.
export function EventRow({ event }: { event: EventItem }) {
  const past = isEventPast(event);
  const tba = isEventTba(event);
  const sub = [event.speakerName, past && event.youtubeId ? "Recording available" : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={eventHref(event)}
      className={`card-line row-hover spot ${styles.row}${past ? ` is-past ${styles.past}` : ""}`}
    >
      {past ? (
        <div className={styles.thumb}>
          <Image
            src={eventThumb(event)}
            alt=""
            fill
            sizes="96px"
            style={{ objectPosition: event.speakerPhoto ? "center 20%" : "center" }}
          />
        </div>
      ) : (
        <div className={styles.rowDate}>
          <DateTile iso={event.date} tba={tba} />
        </div>
      )}
      <div className="min-w-0">
        <p className={`text-[13.5px] font-semibold ${past ? "text-muted" : "text-navy"}`}>
          {eventWhen(event)}
          {past && <span className="sr"> (past event)</span>}
        </p>
        <h3 className="mt-1 text-[16.5px] font-semibold leading-snug text-navy transition-colors">{event.title}</h3>
        {event.talkTitle && <p className="mt-0.5 line-clamp-1 text-[14px] text-slate">&ldquo;{event.talkTitle}&rdquo;</p>}
        <p className="mt-0.5 line-clamp-1 text-[14px] text-muted">{sub || event.location}</p>
      </div>
    </Link>
  );
}
