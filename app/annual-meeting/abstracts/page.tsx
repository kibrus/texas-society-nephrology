import { PageHeader, Container, Icon, PastBadge } from "@/components/ui";
import { callForAbstracts } from "@/lib/site";
import { isPastDate } from "@/lib/content";

export const metadata = { title: "Abstract Submission · TxSN" };

export default function AbstractsPage() {
  const deadlinePassed = isPastDate(callForAbstracts.deadlineIso);

  return (
    <>
      <PageHeader eyebrow="ANNUAL MEETING" title={callForAbstracts.title} intro={callForAbstracts.subtitle} />
      <Container className="py-14">
        <div className="max-w-2xl">
          {deadlinePassed && (
            <div className="bg-txsn-gold-soft border border-txsn-gold/30 rounded-xl p-5 mb-8 flex items-start gap-3">
              <Icon name="clock" size={18} className="text-txsn-gold flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[14px] font-medium text-txsn-teal-deep mb-1">Submissions are closed for this cycle</div>
                <div className="text-[13px] text-txsn-slate leading-relaxed">
                  The deadline for this call has passed. Please check back here for the next abstract submission window.
                </div>
              </div>
            </div>
          )}

          <div className="bg-white border border-txsn-mint-soft/50 rounded-xl p-7">
            <h2 className="font-serif text-lg text-txsn-teal-deep font-medium mb-4">Submission criteria</h2>
            <dl className="space-y-4 mb-6">
              <div>
                <dt className="text-[12px] font-medium text-txsn-gold mb-1">Categories</dt>
                <dd className="text-[14px] text-txsn-slate">{callForAbstracts.categories.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-[12px] font-medium text-txsn-gold mb-1">Open to</dt>
                <dd className="text-[14px] text-txsn-slate">{callForAbstracts.openTo}</dd>
              </div>
              <div>
                <dt className="text-[12px] font-medium text-txsn-gold mb-1">Poster awards eligibility</dt>
                <dd className="text-[14px] text-txsn-slate">{callForAbstracts.awards}</dd>
              </div>
              <div>
                <dt className="text-[12px] font-medium text-txsn-gold mb-1">Deadline</dt>
                <dd className="text-[14px] text-txsn-slate flex items-center gap-2">
                  {callForAbstracts.deadlineLabel}
                  {deadlinePassed && <PastBadge label="Passed" />}
                </dd>
              </div>
            </dl>

            <h2 className="font-serif text-lg text-txsn-teal-deep font-medium mb-3">Abstract format</h2>
            <ul className="space-y-2 mb-6">
              {callForAbstracts.formatRules.map((rule) => (
                <li key={rule} className="flex gap-2 text-[14px] text-txsn-slate">
                  <Icon name="check" size={16} className="text-txsn-teal flex-shrink-0 mt-0.5" />
                  {rule}
                </li>
              ))}
            </ul>

            <h2 className="font-serif text-lg text-txsn-teal-deep font-medium mb-2">Submit your abstract to</h2>
            <a href={`mailto:${callForAbstracts.submitEmail}`} className="inline-flex items-center gap-2 text-txsn-teal text-[14px] font-medium hover:underline">
              <Icon name="mail" size={16} /> {callForAbstracts.submitEmail}
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
