import { PageHeader, Container, Icon } from "@/components/ui";

export const metadata = { title: "Careers · TxSN" };

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="RESOURCES"
        title="Nephrology career center"
        intro="Open positions for kidney care professionals across Texas."
      />
      <Container className="py-14">
        <div className="max-w-3xl bg-txsn-wash border border-txsn-mint-soft/50 rounded-xl p-10 text-center">
          <Icon name="briefcase" size={28} className="text-txsn-teal mx-auto mb-3" />
          <p className="text-[14px] text-txsn-slate">No open positions are posted right now.</p>
        </div>
        <div className="mt-6 bg-txsn-gold-soft rounded-xl p-6 max-w-3xl">
          <h2 className="font-serif text-lg text-txsn-teal-deep font-medium mb-1">Have a position to post?</h2>
          <p className="text-[13px] text-txsn-slate mb-3">Send us the details and we'll add it to the career center.</p>
          <a href="/contact" className="inline-block bg-txsn-gold text-white text-[13px] font-medium px-4 py-2 rounded-md">Submit a posting</a>
        </div>
      </Container>
    </>
  );
}
