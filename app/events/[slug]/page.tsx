import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container, Icon } from "@/components/ui";
import { getAllEvents, getEventBySlug, formatDate, isPastDate } from "@/lib/content";

export function generateStaticParams() {
  return getAllEvents().map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug);
  return { title: event ? `${event.title} · TxSN` : "Event · TxSN" };
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug);
  if (!event) notFound();

  const past = isPastDate(event.date);

  return (
    <>
      {/* Header */}
      <div className="bg-txsn-wash border-b border-txsn-mint-soft/40">
        <Container className="py-12 lg:py-14">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-[13px] text-txsn-teal font-medium mb-6 hover:gap-2.5 transition-all"
          >
            <Icon name="arrow" size={14} className="rotate-180" /> All Events
          </Link>

          {/* Badges */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`text-[10px] uppercase tracking-wide font-medium px-2.5 py-1 rounded-full border ${
              past
                ? "text-txsn-slate bg-white border-txsn-mint-soft/60"
                : "text-txsn-teal bg-white border-txsn-teal/30"
            }`}>
              {past ? "Past Event" : "Upcoming"}
            </span>
            <span className={`text-[10px] uppercase tracking-wide text-white font-medium px-2.5 py-1 rounded-full ${
              event.isFree ? "bg-txsn-teal" : "bg-txsn-gold"
            }`}>
              {event.isFree ? "Free" : "Paid"}
            </span>
            {event.sponsor && (
              <span className="text-[10px] uppercase tracking-wide text-txsn-gold font-medium px-2.5 py-1 rounded-full bg-txsn-gold-soft border border-txsn-gold/20">
                Sponsored by {event.sponsor}
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl lg:text-[2.5rem] leading-tight text-txsn-teal-deep font-medium max-w-2xl">
            {event.title}
          </h1>

          {/* Meta row */}
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center gap-2 text-[13px] text-txsn-slate">
              <Icon name="calendar" size={14} className="text-txsn-teal flex-shrink-0" />
              {formatDate(event.date)}
              {event.time && <span className="text-txsn-slate/50 mx-1">·</span>}
              {event.time && <span>{event.time}</span>}
            </div>
            <div className="flex items-center gap-2 text-[13px] text-txsn-slate">
              <Icon name={event.location === "Online" ? "video" : "pin"} size={14} className="text-txsn-teal flex-shrink-0" />
              {event.location}
            </div>
          </div>
        </Container>
      </div>

      {/* Body */}
      <Container className="py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10 items-start">

          {/* Left — MDX content */}
          <article className="prose-txsn min-w-0">
            {event.excerpt && (
              <div className="bg-txsn-teal-deep/5 border-l-4 border-txsn-teal rounded-r-xl px-5 py-4 mb-8">
                <p className="text-[15px] text-txsn-teal-deep font-medium leading-relaxed m-0">
                  {event.excerpt}
                </p>
              </div>
            )}
            {event.content?.trim() ? (
              <MDXRemote source={event.content} />
            ) : (
              <p className="text-txsn-slate text-[15px]">Details for this event will be posted soon.</p>
            )}
          </article>

          {/* Right — Sidebar */}
          <aside className="space-y-4">

            {/* PDF Brochure */}
            {event.brochurePdf && (
              <div className="bg-txsn-teal-deep rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                    <Icon name="file" size={20} />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-widest font-medium text-txsn-mint uppercase mb-0.5">Event Brochure</div>
                    <div className="text-[14px] font-semibold">Program PDF</div>
                  </div>
                </div>
                <p className="text-[12.5px] text-white/70 leading-relaxed mb-4">
                  Download the full event brochure including the program schedule and speaker details.
                </p>
                <a
                  href={event.brochurePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white text-txsn-teal-deep text-[13px] font-semibold px-4 py-2.5 rounded-md hover:bg-txsn-wash transition-colors w-full"
                >
                  <Icon name="file" size={15} /> View / Download PDF
                </a>
              </div>
            )}

            {/* Event details card */}
            <div className="bg-txsn-wash rounded-xl p-6 border border-txsn-mint-soft/50">
              <div className="text-[11px] tracking-widest font-medium text-txsn-gold uppercase mb-4">Event Details</div>
              <div className="space-y-3">
                <div>
                  <div className="text-[10px] text-txsn-slate/60 uppercase tracking-wide font-medium mb-0.5">Date</div>
                  <div className="text-[13.5px] text-txsn-teal-deep font-medium">{formatDate(event.date)}</div>
                </div>
                {event.time && (
                  <div>
                    <div className="text-[10px] text-txsn-slate/60 uppercase tracking-wide font-medium mb-0.5">Time</div>
                    <div className="text-[13.5px] text-txsn-teal-deep font-medium">{event.time}</div>
                  </div>
                )}
                <div>
                  <div className="text-[10px] text-txsn-slate/60 uppercase tracking-wide font-medium mb-0.5">Location</div>
                  <div className="text-[13.5px] text-txsn-teal-deep font-medium leading-snug">{event.location}</div>
                </div>
                <div>
                  <div className="text-[10px] text-txsn-slate/60 uppercase tracking-wide font-medium mb-0.5">Admission</div>
                  <div className={`text-[13.5px] font-medium ${event.isFree ? "text-txsn-teal" : "text-txsn-gold"}`}>
                    {event.isFree ? "Free to attend" : "Paid — member discounts may apply"}
                  </div>
                </div>
                {event.sponsor && (
                  <div>
                    <div className="text-[10px] text-txsn-slate/60 uppercase tracking-wide font-medium mb-0.5">Sponsor</div>
                    <div className="text-[13.5px] text-txsn-teal-deep font-medium">{event.sponsor}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Back to events */}
            <Link
              href="/events"
              className="flex items-center justify-center gap-2 text-txsn-teal text-[13px] font-medium border border-txsn-mint bg-white rounded-xl py-3 hover:bg-txsn-wash transition-colors"
            >
              <Icon name="arrow" size={14} className="rotate-180" /> Back to all events
            </Link>

          </aside>
        </div>
      </Container>
    </>
  );
}
