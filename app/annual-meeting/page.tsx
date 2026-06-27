import { PageHeader, Container, Icon, PastBadge } from "@/components/ui";
import Link from "next/link";
import { annualMeeting } from "@/lib/site";
import { isPastDate } from "@/lib/content";

export const metadata = { title: "Annual Meeting · TxSN" };


export default function AnnualMeetingPage() {
  const past = isPastDate(annualMeeting.isoDate);

  return (
    <>
      <PageHeader eyebrow="ANNUAL MEETING" title={annualMeeting.title} />
      <Container className="py-14">
        <div className="max-w-2xl mb-10">
          <p className="text-[15px] leading-relaxed text-txsn-slate">
            {annualMeeting.blurb}
          </p>
        </div>

        <div className="bg-white border border-txsn-mint-soft/50 rounded-xl p-7 lg:p-9 mb-10">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
            <div className="text-[11px] tracking-wide text-txsn-gold font-medium">
              FEATURED TXSN EVENT
            </div>
            {past && <PastBadge />}
          </div>
          <h2 className="font-serif text-2xl lg:text-[1.75rem] text-txsn-teal-deep font-medium mb-2">
            {annualMeeting.eventName}
          </h2>
          <p className="text-[14px] text-txsn-slate leading-relaxed mb-6 max-w-xl">
            {annualMeeting.summary}
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            <div>
              <div className="text-[11px] tracking-wide text-txsn-slate/70 font-medium mb-1">DATE</div>
              <div className="flex items-center gap-2 text-[14px] text-txsn-teal-deep font-medium">
                <Icon name="calendar" size={16} /> {annualMeeting.dateLabel}
              </div>
            </div>
            <div>
              <div className="text-[11px] tracking-wide text-txsn-slate/70 font-medium mb-1">TIME</div>
              <div className="text-[14px] text-txsn-teal-deep font-medium">{annualMeeting.timeLabel}</div>
            </div>
            <div>
              <div className="text-[11px] tracking-wide text-txsn-slate/70 font-medium mb-1">LOCATION</div>
              <div className="flex items-start gap-2 text-[14px] text-txsn-teal-deep font-medium">
                <Icon name="pin" size={16} className="mt-0.5 flex-shrink-0" /> {annualMeeting.location}
              </div>
            </div>
          </div>

          <h3 className="font-serif text-lg text-txsn-teal-deep font-medium mb-4">Program schedule</h3>
          <div className="space-y-2.5">
            {annualMeeting.schedule.map((slot, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 bg-txsn-wash rounded-lg px-4 py-3">
                <div className="text-[12.5px] font-medium text-txsn-teal sm:w-44 flex-shrink-0">{slot.time}</div>
                <div className="text-[13.5px] text-txsn-teal-deep flex-1">{slot.session}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/annual-meeting/abstracts" className="inline-flex items-center gap-2 bg-txsn-teal text-white text-[14px] font-medium px-5 py-3 rounded-md hover:bg-txsn-teal-mid transition-colors">
            Call for abstracts <Icon name="arrow" size={16} />
          </Link>
          <Link href="/annual-meeting/register" className="inline-flex items-center bg-white text-txsn-teal text-[14px] font-medium px-5 py-3 rounded-md border border-txsn-mint hover:bg-txsn-wash transition-colors">
            Register
          </Link>
        </div>
      </Container>
    </>
  );
}
