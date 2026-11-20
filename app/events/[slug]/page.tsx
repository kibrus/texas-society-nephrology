import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Button, Container, Icon, PageHeader, Status } from "@/components/ui";
import { WatchRecordingCard } from "@/components/events/WatchRecordingCard";
import { eventWhen, isPhotoImage } from "@/components/events/EventCards";
import styles from "@/components/events/events.module.css";
import { getAllEvents, getEventBySlug, isEventPast, isEventTba } from "@/lib/content";

// External links in event content open in a new tab; internal links stay in-page.
const mdxComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = props.href?.startsWith("http");
    return isExternal ? (
      <a {...props} target="_blank" rel="noopener noreferrer" />
    ) : (
      <a {...props} />
    );
  },
};

export function generateStaticParams() {
  return getAllEvents().map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug);
  return { title: event ? `${event.title} · TSN` : "Event · TSN" };
}

function Fact({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-start gap-2">
      <Icon name={icon} size={17} className="mt-[3px] shrink-0 opacity-80" />
      <span>{children}</span>
    </span>
  );
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug);
  if (!event) notFound();

  // Multi-day events stay "upcoming" until their last day is over.
  const past = isEventPast(event);
  const tba = isEventTba(event);
  const when = eventWhen(event);
  const photoHero = isPhotoImage(event.image);
  const online = /^online$/i.test(event.location.trim());
  const showRegister = Boolean(event.registrationUrl) && !past;

  return (
    <>
      <PageHeader
        eyebrow={<Link href="/events">Events</Link>}
        title={event.title}
        image={photoHero ? event.image : "/images/site/events/hero.webp"}
        intro={
          <span className="flex flex-wrap gap-x-7 gap-y-2 text-[16px]">
            <Fact icon="calendar">{when}</Fact>
            {event.time && <Fact icon="clock">{event.time}</Fact>}
            <Fact icon={online ? "video" : "pin"}>{event.location}</Fact>
          </span>
        }
      >
        <div className="fade-up mt-6 text-white" style={{ animationDelay: ".24s" }}>
          {past ? (
            <Status tone="past" className="!text-white/80">
              Past event
            </Status>
          ) : (
            <Status tone="live" className="!text-white">
              {tba ? "Date to be announced" : "Upcoming"}
            </Status>
          )}
        </div>
      </PageHeader>

      <section className="pad">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
            {/* Main column */}
            <article className="min-w-0">
              {(event.speakerPhoto || event.speakerName) && (
                <div className="card rv mb-10 flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-7">
                  {event.speakerPhoto && (
                    <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-xl bg-surface-2">
                      <Image
                        src={event.speakerPhoto}
                        alt={event.speakerName ?? "Speaker"}
                        fill
                        sizes="176px"
                        className="object-cover object-top"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-muted">Speaker</p>
                    {event.speakerName && (
                      <p className="mt-1 font-serif text-[1.35rem] font-bold leading-snug text-navy">
                        {event.speakerName}
                      </p>
                    )}
                    {event.speakerTitle && (
                      <p className="mt-1.5 text-[15px] leading-relaxed text-slate">{event.speakerTitle}</p>
                    )}
                    {event.talkTitle && (
                      <div className="mt-4 border-t border-line pt-4">
                        <p className="text-[14px] font-semibold text-muted">Presentation</p>
                        <p className="mt-0.5 text-[17px] font-semibold leading-snug text-ink">
                          &ldquo;{event.talkTitle}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* A non-photo `image` (e.g. a flyer graphic) is shown in the body */}
              {event.image && !photoHero && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={event.image}
                  alt={`${event.title} flyer`}
                  className="mb-10 w-full rounded-2xl border border-line"
                />
              )}

              {event.excerpt && (
                <p className="mb-8 border-l-[3px] border-navy pl-5 text-[19px] font-medium leading-relaxed text-ink">
                  {event.excerpt}
                </p>
              )}

              <div className="prose-txsn">
                {event.content?.trim() ? (
                  <MDXRemote source={event.content} components={mdxComponents} />
                ) : (
                  <p>Details for this event will be posted soon.</p>
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside className={`space-y-5 ${styles.side}`} aria-label="Event information">
              <div className="card p-7">
                {(showRegister || event.brochurePdf || event.flyerImage) && (
                  <div className="mb-7 grid gap-3">
                    {showRegister && (
                      <Button href={event.registrationUrl} arrow className="w-full">
                        {event.registrationUrl!.startsWith("mailto:") ? "RSVP by email" : "Register now"}
                      </Button>
                    )}
                    {event.brochurePdf && (
                      <Button href={event.brochurePdf} variant="outline" className="w-full">
                        <Icon name="file" size={17} /> Event brochure (PDF)
                      </Button>
                    )}
                    {event.flyerImage && (
                      <Button href={event.flyerImage} variant="outline" className="w-full">
                        <Icon name="file" size={17} /> View flyer
                      </Button>
                    )}
                  </div>
                )}

                <h2 className="text-[15px] font-semibold text-ink">Event details</h2>
                <dl className="mt-4 divide-y divide-line text-[15px]">
                  <div className="pb-3">
                    <dt className="text-[14px] text-muted">Date</dt>
                    <dd className="mt-0.5 font-medium text-ink">{when}</dd>
                  </div>
                  {event.time && (
                    <div className="py-3">
                      <dt className="text-[14px] text-muted">Time</dt>
                      <dd className="mt-0.5 font-medium text-ink">{event.time}</dd>
                    </div>
                  )}
                  <div className="py-3">
                    <dt className="text-[14px] text-muted">Location</dt>
                    <dd className="mt-0.5 font-medium leading-snug text-ink">{event.location}</dd>
                  </div>
                  {!event.hidePricing && (
                    <div className="py-3">
                      <dt className="text-[14px] text-muted">Admission</dt>
                      <dd className="mt-0.5 font-medium text-ink">
                        {event.isFree ? "Free to attend" : "Paid — member discounts may apply"}
                      </dd>
                    </div>
                  )}
                  {event.sponsor && (
                    <div className="pt-3">
                      <dt className="text-[14px] text-muted">Sponsor</dt>
                      <dd className="mt-0.5 font-medium leading-snug text-ink">{event.sponsor}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Member-only recording (shown once a video is attached) */}
              {event.youtubeId && <WatchRecordingCard slug={event.slug} />}

              <Link
                href="/events"
                className="link px-1 text-[15px]"
              >
                <span aria-hidden="true">←</span> Back to all events
              </Link>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
