import { PageHeader, Container, Icon } from "@/components/ui";
import Link from "next/link";

export const metadata = { title: "About · TxSN" };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT TXSN"
        title="Our mission"
        intro="The Texas Society of Nephrology exists to advance kidney care across the state through education, advocacy, and a connected community of professionals."
      />
      <Container className="py-14">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
          <div className="prose-txsn max-w-none">
            <p className="text-[16px]">
              We bring together physicians, fellows, advanced practice clinicians,
              and kidney care leaders to advance patient care, strengthen
              professional collaboration, and keep members informed on the issues
              shaping nephrology practice in Texas.
            </p>
            <h2>What we believe</h2>
            <p>
              Better kidney care comes from a connected profession. When Texas
              nephrology professionals learn together, advocate together, and
              support one another, patients across the state benefit.
            </p>
            <h2>What we do</h2>
            <p>
              From our flagship annual meeting to year-round education, advocacy on
              the policies that matter, and a community that mentors the next
              generation of nephrologists, TxSN is the professional home for kidney
              care in Texas.
            </p>
          </div>
          <div className="space-y-3">
            <Link href="/about/leadership" className="block bg-txsn-wash rounded-xl p-5 hover:-translate-y-0.5 transition-transform">
              <Icon name="users" size={22} className="text-txsn-teal mb-2" />
              <div className="font-medium text-txsn-teal-deep text-[15px]">Leadership</div>
              <div className="text-[13px] text-txsn-slate mt-1">Meet the board guiding the society.</div>
            </Link>
            <Link href="/about/corporate-partners" className="block bg-txsn-gold-soft rounded-xl p-5 hover:-translate-y-0.5 transition-transform">
              <Icon name="briefcase" size={22} className="text-txsn-gold mb-2" />
              <div className="font-medium text-txsn-teal-deep text-[15px]">Corporate Partners</div>
              <div className="text-[13px] text-txsn-slate mt-1">The organizations supporting our work.</div>
            </Link>
            <Link href="/contact" className="block bg-txsn-wash rounded-xl p-5 hover:-translate-y-0.5 transition-transform">
              <Icon name="mail" size={22} className="text-txsn-teal mb-2" />
              <div className="font-medium text-txsn-teal-deep text-[15px]">Contact</div>
              <div className="text-[13px] text-txsn-slate mt-1">Get in touch with the society.</div>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
