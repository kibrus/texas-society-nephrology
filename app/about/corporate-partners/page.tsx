import { PageHeader, Container } from "@/components/ui";
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
        eyebrow="ABOUT TXSN"
        title="Corporate Partners"
        intro="We're grateful to the organizations whose support makes our education, advocacy, and community work possible."
      />
      <Container className="py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => {
            const src = `/images/partners/${p.slug}.${p.ext ?? "png"}`;
            const desc = descriptions[p.slug] ?? "";
            return (
              <a
                key={p.slug}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-txsn-mint-soft/50 rounded-xl p-6 flex flex-col gap-4 hover:shadow-md hover:border-txsn-mint transition-all"
              >
                <div className="h-12 flex items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={p.name}
                    className="h-10 w-auto object-contain max-w-[180px]"
                  />
                </div>
                {desc && (
                  <p className="text-[13px] text-txsn-slate leading-relaxed">{desc}</p>
                )}
                <span className="mt-auto text-[12px] font-semibold text-heritage-navy inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Visit website
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            );
          })}
        </div>

        <div className="mt-12 bg-txsn-gold-soft rounded-xl p-7 text-center">
          <h2 className="font-serif text-xl text-txsn-teal-deep font-medium mb-2">
            Interested in partnering with TSN?
          </h2>
          <p className="text-[14px] text-txsn-slate mb-4 max-w-lg mx-auto">
            Corporate partnership connects your organization with kidney care professionals across Texas.
            Reach out to learn about available opportunities.
          </p>
          <a
            href="/contact"
            className="inline-block bg-txsn-gold text-white text-[13px] font-medium px-5 py-2.5 rounded-md"
          >
            Contact us
          </a>
        </div>
      </Container>
    </>
  );
}
