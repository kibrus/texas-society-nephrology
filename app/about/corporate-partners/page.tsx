import { PageHeader, Container, Button } from "@/components/ui";
import { corporatePartners } from "@/lib/site";

export const metadata = { title: "Corporate Partners · TSN" };

const descriptions: Record<string, string> = {
  partner1:
    "Alexion, an AstraZeneca Rare Disease company, pioneers life-changing treatments for patients with devastating rare diseases. Their portfolio spans complement-mediated diseases, hematology, and nephrology, supported by robust diagnostics and patient support programs.",
  partner2:
    "Alexion's US Medical Affairs team for Hematology & Nephrology equips kidney care professionals with evidence-based clinical insights, real-world data, and dedicated medical education resources to optimize patient outcomes.",
  partner3:
    "Otsuka is a global healthcare company with operations in 28 countries, bringing deep expertise to nephrology, immunology, and central nervous system disorders. Their research-driven approach addresses serious unmet needs in kidney and other chronic diseases.",
  partner4:
    "CareDx is a molecular diagnostics leader in transplant care, having performed over one million rejection monitoring tests for kidney and other organ recipients. Their integrated platform, combining cell-free DNA testing, workflow software, and a specialized transplant pharmacy, helps clinicians identify rejection risk early and support long-term graft success.",
  partner5:
    "Kyowa Kirin is a global specialty pharmaceutical company advancing therapies in bone and mineral metabolism, hematologic malignancies, and rare diseases. Using proprietary antibody engineering and gene therapy platforms, they address critical unmet needs including complications of chronic kidney disease.",
  partner6:
    "Natera is a leader in cell-free DNA diagnostics with targeted solutions for kidney transplant and renal disease management. Their Prospera™ Kidney test enables early detection of organ injury post-transplant, while Renasight™ provides comprehensive genomic screening to identify genetic causes of kidney disease.",
  partner7:
    "Apellis Pharmaceuticals is a pioneer in complement biology, developing medicines for diseases driven by complement dysregulation, a key immune pathway in conditions such as C3 glomerulopathy and paroxysmal nocturnal hemoglobinuria. With multiple approved therapies, Apellis has established a leading position in rare, complement-mediated kidney and retinal diseases.",
  partner8:
    "Calliditas Therapeutics is a biopharmaceutical company dedicated to rare renal and hepatic diseases. Their flagship therapy TARPEYO® (budesonide) was the first FDA-approved treatment specifically developed for IgA nephropathy, with a growing pipeline targeting orphan indications where patients have few existing options.",
  partner9:
    "Vera Therapeutics focuses on transformative therapies for immune-mediated kidney diseases, with a lead program in IgA nephropathy. Their therapy TRUTAKNA™ received FDA accelerated approval as the first treatment to simultaneously target both BAFF and APRIL, two key immune mediators driving IgAN, representing a major advance for patients with this progressive kidney disease.",
  partner10:
    "Kaneka Americas brings together the company's healthcare, pharmaceutical, and nutritional innovation for North American markets. Through Kaneka Medical America, the company offers specialized medical devices including the Liposorber® LA-15 System for LDL apheresis, alongside pharmaceutical ingredients and health-focused nutritional compounds.",
  partner11:
    "Keenova is a healthcare company focused on delivering innovative medical products and solutions to improve patient care. Their work spans multiple areas of clinical need, bringing advanced options to healthcare providers and the patients they serve.",
  partner12:
    "Vertex Pharmaceuticals is a global biotechnology company committed to developing transformative medicines for serious diseases. Building on breakthroughs in cystic fibrosis, Vertex is actively advancing programs in kidney disease, sickle cell disease, pain, and type 1 diabetes for patients with significant unmet medical need.",
};

export default function PartnersPage() {
  const partners = corporatePartners.filter((p) => p.url && !p.hidden);

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Corporate Partners"
        intro="We're grateful to the organizations whose support makes our education, advocacy, and community work possible."
        image="/images/site/partners/hero.webp"
      />
      <section className="pad !pb-0">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p, i) => {
              const src = `/images/partners/${p.slug}.${p.ext ?? "png"}`;
              const desc = descriptions[p.slug] ?? "";
              return (
                <li key={p.slug} className="rv flex" style={i % 3 ? { transitionDelay: `${(i % 3) * 0.08}s` } : undefined}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card card-hover spot group flex w-full flex-col no-underline"
                  >
                    <div className="flex h-[148px] items-center justify-center border-b border-line px-8">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className={`w-auto max-w-[200px] object-contain transition-transform duration-300 group-hover:scale-[1.04] ${
                          p.slug === "partner11" ? "h-10" : "h-14"
                        }`}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="font-serif text-[19px] font-bold leading-snug">{p.name}</h2>
                      {desc && <p className="mt-2.5 text-[16px] leading-relaxed text-slate">{desc}</p>}
                      <span className="link mt-auto pt-5 text-[15px]">
                        Visit website
                        <span className="arrow" aria-hidden="true">→</span>
                        <span className="sr"> (opens in a new tab)</span>
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="card spot rv mt-16 flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between lg:p-10">
            <div className="max-w-2xl">
              <h2 className="font-serif text-[1.5rem] font-bold">Interested in partnering with TSN?</h2>
              <p className="mt-2.5 text-[17px] leading-relaxed text-slate">
                Corporate partnership connects your organization with kidney care professionals across Texas.
                Reach out to learn about available opportunities.
              </p>
            </div>
            <Button href="/contact" arrow className="flex-shrink-0">
              Contact us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
