import { PageHeader, Container, PastBadge } from "@/components/ui";
import { annualMeeting } from "@/lib/site";
import { isPastDate } from "@/lib/content";

export const metadata = { title: "Schedule · TxSN Annual Meeting" };

export default function SchedulePage() {
  const past = isPastDate(annualMeeting.isoDate);

  return (
    <>
      <PageHeader
        eyebrow="ANNUAL MEETING"
        title="Schedule"
        intro={`${annualMeeting.dateLabel} · ${annualMeeting.location}`}
      />
      <Container className="py-14">
        {past && <div className="mb-6"><PastBadge /></div>}
        <div className="max-w-2xl">
          {annualMeeting.schedule.map((slot, i) => (
            <div key={i} className="flex gap-5 pb-6 last:pb-0">
              <div className="flex flex-col items-end">
                <div className="text-[12.5px] font-medium text-txsn-teal w-32 text-right">{slot.time}</div>
              </div>
              <div className="relative flex-1 pb-2">
                <div className="absolute left-[-13px] top-1.5 w-2.5 h-2.5 rounded-full bg-txsn-teal" />
                {i < annualMeeting.schedule.length - 1 && (
                  <div className="absolute left-[-9px] top-4 bottom-[-12px] w-px bg-txsn-mint-soft" />
                )}
                <div className="text-[15px] font-medium text-txsn-teal-deep">{slot.session}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
