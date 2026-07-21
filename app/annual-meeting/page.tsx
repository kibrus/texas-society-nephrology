import { PageHeader, Container, Icon, PastBadge } from "@/components/ui";
import { annualMeeting } from "@/lib/site";
import { isPastDate } from "@/lib/content";

export const metadata = { title: "Annual Meeting · TxSN" };


export default function AnnualMeetingPage() {
  const past = isPastDate(annualMeeting.isoDate);

  return (
    <>
      <PageHeader eyebrow="ANNUAL MEETING" title={annualMeeting.title} />
      <Container className="py-14">
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

      </Container>
    </>
  );
}
