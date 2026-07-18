import { PageHeader, Container, Icon } from "@/components/ui";
import Link from "next/link";

export const metadata = { title: "About · TxSN" };

const audience = [
  "Nephrologists practicing in Texas — both academic and community-based",
  "Nephrology fellows, residents, and medical students interested in kidney medicine",
  "Advanced practice providers (NPs, PAs) working in nephrology",
  "Allied kidney care professionals (renal pathologists, etc.)",
  "Healthcare stakeholders and industry partners",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT TXSN"
        title="Our Mission & Vision"
        intro="The Texas Society of Nephrology exists to advance kidney care across the state through education, advocacy, collaboration, and innovation."
      />
      <Container className="py-14">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">

          {/* Left — Mission, Vision, Audience */}
          <div className="space-y-10">

            {/* Mission */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-11 h-11 rounded-[10px] bg-txsn-teal flex items-center justify-center text-white mt-0.5">
                <Icon name="speakerphone" size={20} />
              </div>
              <div>
                <h2 className="font-serif text-[1.35rem] text-txsn-teal-deep font-medium mb-2">Mission</h2>
                <p className="text-[15px] text-txsn-slate leading-relaxed">
                  To advance kidney health in Texas by empowering nephrology professionals through education, advocacy, collaboration, and innovation.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-11 h-11 rounded-[10px] bg-txsn-gold flex items-center justify-center text-white mt-0.5">
                <Icon name="research" size={20} />
              </div>
              <div>
                <h2 className="font-serif text-[1.35rem] text-txsn-teal-deep font-medium mb-2">Vision</h2>
                <p className="text-[15px] text-txsn-slate leading-relaxed">
                  A future where every patient in Texas receives exceptional, equitable, and innovative kidney care supported by a connected and thriving nephrology community.
                </p>
              </div>
            </div>

            {/* Target Audience */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-11 h-11 rounded-[10px] bg-txsn-teal flex items-center justify-center text-white mt-0.5">
                <Icon name="users" size={20} />
              </div>
              <div>
                <h2 className="font-serif text-[1.35rem] text-txsn-teal-deep font-medium mb-3">Who We Serve</h2>
                <ul className="space-y-2.5">
                  {audience.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-txsn-slate leading-snug">
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-txsn-teal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Right — Quick links */}
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
