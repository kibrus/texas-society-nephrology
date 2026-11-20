import { PageHeader, Container, Icon } from "@/components/ui";

export const metadata = { title: "Education & CME · TSN" };

const sessions = [
  { title: "Transplant Updates 2026", date: "July 2026", cme: "1.0 CME" },
  { title: "Managing Complex CKD", date: "August 2026", cme: "1.0 CME" },
  { title: "Glomerular Disease Review", date: "September 2026", cme: "1.0 CME" },
];

export default function EducationPage() {
  return (
    <>
      <PageHeader eyebrow="Resources" title="Education & CME" intro="Our monthly webinar series and accredited continuing education, included with membership." />
      <section className="pad">
        <Container>
          <div className="grid max-w-4xl gap-6 sm:grid-cols-3">
            {sessions.map((s) => (
              <div key={s.title} className="card p-6">
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-navy">
                  <Icon name="video" size={20} />
                </span>
                <h2 className="text-[17px] font-semibold leading-snug text-navy">{s.title}</h2>
                <div className="meta mt-2">
                  <span className="date">{s.date}</span>
                  <span className="cat">{s.cme}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
