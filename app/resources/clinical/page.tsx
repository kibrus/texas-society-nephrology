import { PageHeader, Container, Icon } from "@/components/ui";

export const metadata = { title: "Clinical Resources · TxSN" };

const resources = [
  { title: "CKD management reference", type: "PDF", desc: "Quick-reference guide for chronic kidney disease staging and management." },
  { title: "Dialysis access guidelines", type: "Link", desc: "Current best-practice guidance on vascular access." },
  { title: "Transplant referral checklist", type: "PDF", desc: "When and how to refer patients for transplant evaluation." },
  { title: "Texas nephrology practice directory", type: "Link", desc: "Statewide directory of practices and referral contacts." },
];

export default function ClinicalPage() {
  return (
    <>
      <PageHeader eyebrow="RESOURCES" title="Clinical resources" intro="References and tools for everyday nephrology practice." />
      <Container className="py-14">
        <div className="space-y-2.5 max-w-3xl">
          {resources.map((r) => (
            <div key={r.title} className="flex items-center gap-4 bg-white border border-txsn-mint-soft/50 rounded-xl p-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-txsn-wash flex items-center justify-center text-txsn-teal">
                <Icon name={r.type === "PDF" ? "file" : "arrow"} size={19} />
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-medium text-txsn-teal-deep">{r.title}</div>
                <div className="text-[12.5px] text-txsn-slate">{r.desc}</div>
              </div>
              <span className="text-[11px] font-medium text-txsn-gold bg-txsn-gold-soft px-2.5 py-1 rounded">{r.type}</span>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
