import { PageHeader, Container } from "@/components/ui";
import { corporatePartners } from "@/lib/site";

export const metadata = { title: "Corporate Partners · TxSN" };

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT TXSN"
        title="Corporate Partners"
        intro="We're grateful to the organizations whose support makes our education, advocacy, and community work possible."
      />
      <Container className="py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {corporatePartners.map((p) => (
            <div key={p.name} className="bg-white border border-txsn-mint-soft/50 rounded-xl p-6 text-center">
              <div className="h-16 flex items-center justify-center mb-3 text-txsn-slate/40 font-medium">
                {p.name} logo
              </div>
              <div className="font-medium text-txsn-teal-deep text-[15px]">{p.name}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 bg-txsn-gold-soft rounded-xl p-7 text-center">
          <h2 className="font-serif text-xl text-txsn-teal-deep font-medium mb-2">Interested in partnering with TxSN?</h2>
          <p className="text-[14px] text-txsn-slate mb-4 max-w-lg mx-auto">
            Corporate partnership connects your organization with kidney care professionals across Texas. Reach out to learn about opportunities.
          </p>
          <a href="/contact" className="inline-block bg-txsn-gold text-white text-[13px] font-medium px-5 py-2.5 rounded-md">Contact us</a>
        </div>
      </Container>
    </>
  );
}
