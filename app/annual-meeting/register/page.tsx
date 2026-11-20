import Link from "next/link";
import { ArrowLink, Container, Icon, PageHeader, Status } from "@/components/ui";
import { annualMeeting } from "@/lib/site";
import { isPastDate } from "@/lib/content";

export const metadata = { title: "Register · TSN Annual Meeting" };

export default function RegisterPage() {
  const past = isPastDate(annualMeeting.isoDate);

  return (
    <>
      <PageHeader
        eyebrow={<Link href="/annual-meeting">Annual Meeting</Link>}
        title="Register"
        intro={annualMeeting.title}
        image="/images/site/annual-meeting/hero.webp"
      />

      <section className="pad">
        <Container>
          <div className="card rv mx-auto max-w-3xl p-7 sm:p-9">
            {past ? (
              <Status tone="past">Past event</Status>
            ) : (
              <Status tone="live">Upcoming</Status>
            )}
            <h2 className="mt-3 font-serif text-[1.5rem] font-bold leading-snug text-navy">{annualMeeting.eventName}</h2>
            <ul className="mt-5 grid gap-2.5 text-[16px] text-ink">
              <li className="flex items-start gap-2.5">
                <Icon name="calendar" size={18} className="mt-[3px] shrink-0 text-muted" />
                {annualMeeting.dateLabel}
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="clock" size={18} className="mt-[3px] shrink-0 text-muted" />
                {annualMeeting.timeLabel}
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="pin" size={18} className="mt-[3px] shrink-0 text-muted" />
                {annualMeeting.location}
              </li>
            </ul>
            <p className="mt-6 text-[17px] leading-relaxed text-slate">
              {past ? `This meeting took place on ${annualMeeting.dateLabel}.` : annualMeeting.blurb}
            </p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
              <ArrowLink href="/annual-meeting/schedule">Program schedule</ArrowLink>
              <ArrowLink href="/events">All events</ArrowLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
