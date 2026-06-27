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
      <div className="bg-txsn-wash border-b border-txsn-mint-soft/40">
        <Container className="py-12 lg:py-14">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-[13px] text-txsn-teal font-medium mb-5 hover:gap-2.5 transition-all"
          >
            <Icon name="arrow" size={14} className="rotate-180" /> All Events
          </Link>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {past ? (
                <span className="text-[10px] uppercase tracking-wide text-txsn-slate bg-white px-2 py-0.5 rounded-full font-medium border border-txsn-mint-soft/60">
                  Past Event
                </span>
              ) : (
                <span className="text-[10px] uppercase tracking-wide text-txsn-teal bg-white px-2 py-0.5 rounded-full font-medium border border-txsn-teal/30">
                  Upcoming
                </span>
              )}
              {event.isFree ? (
                <span className="text-[10px] uppercase tracking-wide text-white bg-txsn-teal px-2 py-0.5 rounded-full font-medium">
                  Free
                </span>
              ) : (
                <span className="text-[10px] uppercase tracking-wide text-white bg-txsn-gold px-2 py-0.5 rounded-full font-medium">
                  Paid
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl lg:text-[2.5rem] leading-tight text-txsn-teal-deep font-medium">
              {event.title}
            </h1>
            <div className="mt-4 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[13px] text-txsn-slate">
                <Icon name="calendar" size={14} />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-txsn-slate">
                <Icon name={event.location === "Online" ? "video" : "pin"} size={14} />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container className="py-12">
        <article className="prose-txsn max-w-2xl">
          {event.content?.trim() ? (
            <MDXRemote source={event.content} />
          ) : (
            <p className="text-txsn-slate text-[15px]">Details for this event will be posted soon.</p>
          )}
        </article>
      </Container>
    </>
  );
}
