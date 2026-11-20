import Link from "next/link";
import { ArrowLink, Container, PageHeader, Status } from "@/components/ui";
import { annualMeeting } from "@/lib/site";
import { isPastDate } from "@/lib/content";
import { splitSession } from "../program";

export const metadata = { title: "Schedule · TSN Annual Meeting" };

export default function SchedulePage() {
  const past = isPastDate(annualMeeting.isoDate);

  return (
    <>
      <PageHeader
        eyebrow={<Link href="/annual-meeting">Annual Meeting</Link>}
        title="Schedule"
        intro={`${annualMeeting.dateLabel} · ${annualMeeting.timeLabel} · ${annualMeeting.location}`}
        image="/images/site/annual-meeting/hero.webp"
      >
        {past && (
          <div className="fade-up mt-6" style={{ animationDelay: ".24s" }}>
            <Status tone="past" className="!text-white/80">
              Past event
            </Status>
          </div>
        )}
      </PageHeader>

      <section className="pad">
        <Container>
          <div>
            <h2 className="h-display rv">{annualMeeting.eventName}</h2>

            {/* Column labels (visible from sm up; rows label themselves on mobile) */}
            <div
              className="mt-10 hidden grid-cols-[190px_minmax(0,1fr)_120px] gap-6 border-b border-line px-1 pb-3 text-[14px] font-semibold text-muted sm:grid"
              aria-hidden="true"
            >
              <span>Time</span>
              <span>Session</span>
              <span>Track</span>
            </div>

            <ol className="mt-6 sm:mt-0" aria-label="Program schedule">
              {annualMeeting.schedule.map((slot, i) => {
                const { title, speaker } = splitSession(slot.session);
                return (
                  <li
                    key={slot.time}
                    className="rv grid gap-1 border-b border-line px-1 py-5 sm:grid-cols-[190px_minmax(0,1fr)_120px] sm:gap-6"
                    style={{ transitionDelay: `${Math.min(i, 6) * 0.04}s` }}
                  >
                    <span className="text-[15px] font-semibold tabular-nums text-navy">
                      <span className="sr">Time: </span>
                      {slot.time}
                    </span>
                    <span>
                      <span className="block text-[17px] font-semibold leading-snug text-ink">{title}</span>
                      {speaker && <span className="mt-0.5 block text-[15px] text-slate">{speaker}</span>}
                    </span>
                    <span className="text-[15px] text-slate">
                      <span className="sr">Track: </span>
                      {slot.track}
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className="rv mt-10 flex flex-wrap gap-x-8 gap-y-3">
              <ArrowLink href="/annual-meeting">Annual Meeting overview</ArrowLink>
              <ArrowLink href="/annual-meeting/abstracts">Call for abstracts</ArrowLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
