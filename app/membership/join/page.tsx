import { redirect } from "next/navigation";
import { PageHeader, Container } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth";
import { SignupForm } from "./SignupForm";

export const metadata = { title: "Join TSN · TSN" };

// Reads auth state per request to bounce already-signed-in users.
export const dynamic = "force-dynamic";

export default async function JoinPage() {
  const user = await getCurrentUser();
  if (user) redirect("/member");

  return (
    <>
      <PageHeader
        eyebrow="MEMBERSHIP"
        title="Join TSN"
        intro="Create your account, verify your email, and choose a membership tier. Dues are billed after verification."
      />
      <Container className="py-14">
        <div className="max-w-xl">
          <SignupForm />
        </div>
      </Container>
    </>
  );
}
