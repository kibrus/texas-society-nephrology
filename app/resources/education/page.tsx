import { PageHeader, Container, Icon } from "@/components/ui";

export const metadata = { title: "Education & CME · TxSN" };

const sessions = [
  { title: "Transplant Updates 2026", date: "July 2026", cme: "1.0 CME" },
  { title: "Managing Complex CKD", date: "August 2026", cme: "1.0 CME" },
  { title: "Glomerular Disease Review", date: "September 2026", cme: "1.0 CME" },
];

export default function EducationPage() {
  return (
    <>
      <PageHeader eyebrow="RESOURCES" title="Education & CME" intro="Our monthly webinar series and accredited continuing education, included with membership." />
      <Container className="py-14">
        <div className="grid gap-4 sm:grid-cols-3 max-w-4xl">
          {sessions.map((s) => (
            <div key={s.title} className="bg-white border border-txsn-mint-soft/50 rounded-xl p-5">
              <div className="w-10 h-10 rounded-[10px] bg-txsn-wash flex items-center justify-center text-txsn-teal mb-3">
                <Icon name="video" size={20} />
              </div>
              <div className="text-[14px] font-medium text-txsn-teal-deep mb-1">{s.title}</div>
              <div className="text-[12px] text-txsn-slate">{s.date}</div>
              <span className="inline-block mt-2 text-[11px] font-medium text-txsn-teal bg-txsn-wash px-2.5 py-0.5 rounded-full">{s.cme}</span>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
