import Link from "next/link";
import { PageHeader, Container, Icon, PastBadge } from "@/components/ui";
import { getAllEvents, formatDate, isPastDate } from "@/lib/content";

export const metadata = { title: "All Events · TxSN" };

export default function EventsPage() {
  const events = getAllEvents();

  return (
    <>
      <PageHeader
        eyebrow="EVENTS"
        title="All Events"
        intro="Every TxSN gathering, past and upcoming, in one place."
      />
      <Container className="py-14">
        <div className="space-y-3 max-w-3xl">
          {events.map((ev) => {
            const past = isPastDate(ev.date);
            return (
              <div
                key={ev.slug}
                className={`flex items-center gap-4 rounded-xl p-4 lg:px-5 border ${
                  past
                    ? "bg-txsn-paper border-txsn-mint-soft/40 opacity-80"
                    : "bg-txsn-wash border-transparent"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <div className="text-[14px] font-medium text-txsn-teal-deep">{ev.title}</div>
                    {past && <PastBadge />}
                  </div>
                  <div className="text-[12px] text-txsn-slate flex items-center gap-1 flex-wrap">
                    <Icon name="calendar" size={12} /> {formatDate(ev.date)}
                    <span className="mx-1">·</span>
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
                  {ev.excerpt && (
                    <p className="text-[12px] text-txsn-slate mt-1.5 line-clamp-2">{ev.excerpt}</p>
                  )}
                </div>
                <Link
                  href={ev.href ?? `/events/${ev.slug}`}
                  className="shrink-0 text-[12px] font-medium text-txsn-teal border border-txsn-teal/30 hover:bg-txsn-teal hover:text-white px-3 py-1.5 rounded-md transition-colors"
                >
                  Details
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}
