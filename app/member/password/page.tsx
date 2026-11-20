import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHeader, Container } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth";
import { ChangePasswordForm } from "./ChangePasswordForm";

export const metadata = { title: "Change password · TSN" };

// Reads auth state per request.
export const dynamic = "force-dynamic";

export default async function ChangePasswordPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return (
    <>
      <PageHeader
        eyebrow="Account security"
        title="Change password"
        intro="Enter your current password and choose a new one."
      />
      <section className="pt-14 pb-4 md:pt-16">
        <Container>
          <div className="mx-auto max-w-md">
            <Link href="/member" className="link mb-6">
              <span aria-hidden="true">←</span>
              Back to my account
            </Link>
            <div className="card p-7 md:p-8">
              <ChangePasswordForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
