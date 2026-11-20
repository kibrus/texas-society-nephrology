import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthShell, authLink } from "@/components/auth/AuthShell";
import { Icon } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth";
import { SignupForm } from "./SignupForm";

// Membership benefits. Shown in the form column on mobile/tablet, where the
// desktop brand panel (which lists the same benefits) is hidden.
const BENEFITS = [
  {
    title: "Special conference pricing",
    body: "Discounted registration for TSN conferences and events.",
  },
  {
    title: "Knowledge Library access",
    body: "World-class lectures on nephrology and medicine, on demand.",
  },
  {
    title: "Education & community",
    body: "Accredited CME and a statewide network of peers.",
  },
];

export const metadata = { title: "Join TSN · TSN" };

// Reads auth state per request to bounce already-signed-in users.
export const dynamic = "force-dynamic";

export default async function JoinPage() {
  const user = await getCurrentUser();
  if (user) redirect("/member");

  return (
    <AuthShell
      eyebrow="Membership"
      title="Join TSN"
      subtitle="Create your account, verify your email, and choose a membership tier. Dues are billed after verification."
      footer={
        <p className="text-center text-[15px] text-slate">
          Already a member?{" "}
          <Link href="/sign-in" className={authLink}>
            Sign in
          </Link>
        </p>
      }
    >
      {/* Benefits — visible on mobile/tablet; desktop shows them in the brand panel */}
      <div className="card-line mb-8 p-5 lg:hidden">
        <h2 className="mb-3 text-[15px] font-semibold text-navy">
          Membership benefits
        </h2>
        <ul className="space-y-3">
          {BENEFITS.map((b) => (
            <li key={b.title} className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-navy text-white">
                <Icon name="check" size={13} />
              </span>
              <span className="text-[15px] leading-relaxed text-slate">
                <span className="font-semibold text-ink">{b.title}</span>
                {" - "}
                {b.body}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <SignupForm />
    </AuthShell>
  );
}
