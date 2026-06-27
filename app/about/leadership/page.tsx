import { PageHeader, Container } from "@/components/ui";
import { leadership } from "@/lib/site";

export const metadata = { title: "Leadership · TxSN" };

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT TXSN"
        title="Leadership"
        intro="The board of directors guiding the Texas Society of Nephrology."
      />
      <Container className="py-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {leadership.map((person) => (
            <div key={person.role} className="bg-white border border-txsn-mint-soft/50 rounded-xl p-6 flex gap-4 items-center">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-txsn-wash flex items-center justify-center text-txsn-teal font-serif text-lg font-medium">
                {person.name.split(" ").map((w) => w[0]).join("")}
              </div>
              <div>
                <div className="font-medium text-txsn-teal-deep text-[16px]">{person.name}</div>
                <div className="text-[13px] text-txsn-gold font-medium">{person.role}</div>
                <div className="text-[13px] text-txsn-slate mt-0.5">{person.focus}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
