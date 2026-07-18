import Link from "next/link";
import { PageHeader, Container, Icon } from "@/components/ui";

export const metadata = { title: "Join / Renew · TxSN" };

export default function JoinPage() {
  return (
    <>
      <PageHeader
        eyebrow="MEMBERSHIP"
        title="Join TxSN"
        intro="Create your member account to join the Texas Society of Nephrology."
      />
      <Container className="py-14">
        <div className="max-w-md">
          <div className="bg-txsn-wash rounded-xl p-7 mb-5">
            <div className="w-11 h-11 rounded-[10px] bg-txsn-gold flex items-center justify-center text-white mb-3">
              <Icon name="users" size={21} />
            </div>
            <h2 className="font-serif text-xl text-txsn-teal-deep font-medium mb-2">Become a member</h2>
            <p className="text-[14px] text-txsn-slate leading-relaxed mb-4">
              Create an account to access member resources, register for events, and stay connected with nephrology across Texas.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 bg-txsn-gold hover:bg-txsn-gold/90 text-white text-[14px] font-medium px-5 py-3 rounded-md transition-colors"
            >
              Create your account <Icon name="arrow" size={16} />
            </Link>
          </div>
          <p className="text-[13px] text-txsn-slate">
            Already a member?{" "}
            <Link href="/sign-in" className="text-txsn-teal font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
}
