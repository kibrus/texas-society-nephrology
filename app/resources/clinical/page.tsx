import { PageHeader, Container, Icon } from "@/components/ui";

export const metadata = { title: "Clinical Resources · TSN" };

const resources = [
  { title: "CKD management reference", type: "PDF", desc: "Quick-reference guide for chronic kidney disease staging and management." },
  { title: "Dialysis access guidelines", type: "Link", desc: "Current best-practice guidance on vascular access." },
  { title: "Transplant referral checklist", type: "PDF", desc: "When and how to refer patients for transplant evaluation." },
  { title: "Texas nephrology practice directory", type: "Link", desc: "Statewide directory of practices and referral contacts." },
];

export default function ClinicalPage() {
  return (
    <>
      <PageHeader eyebrow="Resources" title="Clinical resources" intro="References and tools for everyday nephrology practice." />
      <section className="pad">
        <Container>
          <div className="max-w-3xl space-y-4">
            {resources.map((r) => (
              <div key={r.title} className="card-line flex items-center gap-5 p-5">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-surface-2 text-navy">
                  <Icon name={r.type === "PDF" ? "file" : "external"} size={20} />
                </span>
                <div className="flex-1">
                  <h2 className="text-[17px] font-semibold text-navy">{r.title}</h2>
                  <p className="mt-0.5 text-[15px] text-slate">{r.desc}</p>
                </div>
                <span className="text-[13.5px] font-semibold text-muted">{r.type}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
