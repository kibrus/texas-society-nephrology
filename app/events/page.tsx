import { PageHeader, Container } from "@/components/ui";
import { EventRow, FeaturedEvent } from "@/components/events/EventCards";
import { getAllEvents, getNextEvent, getPastEvents, isEventPast } from "@/lib/content";

export const metadata = { title: "All Events · TSN" };

export default function EventsPage() {
  // Upcoming vs past is computed from the dates on every render — nothing is hard-coded.
  const next = getNextEvent();
  const upcoming = getAllEvents().filter((e) => !isEventPast(e) && e.slug !== next?.slug);
  const past = getPastEvents();

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="All Events"
        intro="Every TSN gathering, past and upcoming, in one place."
        image="/images/site/events/hero.webp"
      />

      <section className="pad">
        <Container>
          <h2 className="h-display rv mb-10">Upcoming events</h2>

          {next && (
            <div className="rv">
              <FeaturedEvent event={next} />
            </div>
          )}

          {upcoming.length > 0 && (
            <ul className={`grid gap-3.5 lg:grid-cols-2 ${next ? "mt-6" : ""}`}>
              {upcoming.map((ev, i) => (
                <li key={ev.slug} className="rv" style={{ transitionDelay: `${Math.min(i, 4) * 0.06}s` }}>
                  <EventRow event={ev} />
                </li>
              ))}
            </ul>
          )}

          {!next && upcoming.length === 0 && (
            <p className="text-[17px] text-slate">
              No upcoming events are scheduled right now. Please check back soon.
            </p>
          )}

          {past.length > 0 && (
            <>
              <h2 className="sep-label mb-5 mt-16">Past events</h2>
              <ul className="grid gap-3.5 lg:grid-cols-2">
                {past.map((ev, i) => (
                  <li key={ev.slug} className="rv" style={{ transitionDelay: `${Math.min(i % 2, 1) * 0.06}s` }}>
                    <EventRow event={ev} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
