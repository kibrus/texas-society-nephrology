import { PageHeader, Container, Icon } from "@/components/ui";
import Link from "next/link";

export const metadata = { title: "Resources · TxSN" };

const groups = [
  { href: "/resources/clinical", icon: "file", title: "Clinical Resources", body: "Guidelines, references, and tools for everyday nephrology practice.", accent: "teal" },
  { href: "/resources/education", icon: "school", title: "Education & CME", body: "Webinars, recordings, and accredited continuing education.", accent: "gold" },
  { href: "/resources/member", icon: "users", title: "Member Resources", body: "Exclusive materials available to TxSN members.", accent: "teal" },
  { href: "/news", icon: "speakerphone", title: "News", body: "Latest updates, announcements, and stories from the Texas nephrology community.", accent: "gold" },
  { href: "/careers", icon: "research", title: "Careers", body: "Job opportunities and career resources for nephrology professionals in Texas.", accent: "teal" },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="RESOURCES"
        title="Resources for Texas nephrology"
        intro="Curated clinical references, continuing education, and member materials, all in one place."
      />
      <Container className="py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {groups.map((g) => (
            <Link key={g.href} href={g.href} className={`rounded-xl p-6 hover:-translate-y-0.5 transition-transform ${g.accent === "teal" ? "bg-txsn-wash" : "bg-txsn-gold-soft"}`}>
              <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center text-white mb-3 ${g.accent === "teal" ? "bg-txsn-teal" : "bg-txsn-gold"}`}>
                <Icon name={g.icon} size={21} />
              </div>
              <div className="font-medium text-txsn-teal-deep text-[16px]">
                {g.title}
              </div>
              <div className="text-[13px] text-txsn-slate mt-1 leading-relaxed">{g.body}</div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
