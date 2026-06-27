import { PageHeader, Container, Icon } from "@/components/ui";
import Link from "next/link";

export const metadata = { title: "Membership · TxSN" };

const benefits = [
  { icon: "school", title: "Education & CME", body: "Year-round webinars and accredited content to stay current." },
  { icon: "calendar", title: "Event discounts", body: "Reduced registration for the annual meeting and paid events." },
  { icon: "users", title: "Community", body: "Mentorship and connection with peers across Texas." },
  { icon: "speakerphone", title: "A unified voice", body: "Add your weight to advocacy on the issues that matter." },
  { icon: "file", title: "Member resources", body: "Access to clinical and educational materials." },
  { icon: "research", title: "Research platform", body: "Submit abstracts and present at the annual meeting." },
];

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="MEMBERSHIP"
        title="Why join TxSN"
        intro="Membership connects you to the people, education, and advocacy that strengthen nephrology practice across Texas."
      />
      <Container className="py-14">
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="bg-white border border-txsn-mint-soft/50 rounded-xl p-5">
              <div className="w-10 h-10 rounded-[10px] bg-txsn-wash flex items-center justify-center text-txsn-teal mb-3">
                <Icon name={b.icon} size={20} />
              </div>
              <div className="font-medium text-txsn-teal-deep text-[15px] mb-1">{b.title}</div>
              <div className="text-[13px] text-txsn-slate leading-relaxed">{b.body}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/membership/tiers" className="inline-flex items-center gap-2 bg-txsn-teal text-white text-[14px] font-medium px-5 py-3 rounded-md hover:bg-txsn-teal-mid transition-colors">
            Compare membership tiers <Icon name="arrow" size={16} />
          </Link>
          <Link href="/membership/join" className="inline-flex items-center bg-txsn-gold text-white text-[14px] font-medium px-5 py-3 rounded-md hover:bg-txsn-gold/90 transition-colors">
            Join or renew
          </Link>
        </div>
      </Container>
    </>
  );
}
