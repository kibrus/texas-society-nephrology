import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PageHeader, Container } from "@/components/ui";
import { AuthCard } from "@/components/auth/AuthUI";
import { SIGNUP_EMAIL_COOKIE } from "../signup-shared";
import { VerifyForm } from "./VerifyForm";

export const metadata = { title: "Verify your email · TSN" };

// Depends on the signup cookie set by /membership/join.
export const dynamic = "force-dynamic";

export default function VerifyPage() {
  const email = cookies().get(SIGNUP_EMAIL_COOKIE)?.value;
  if (!email) redirect("/membership/join");

  return (
    <>
      <PageHeader eyebrow="MEMBERSHIP" title="Verify your email" />
      <Container>
        <AuthCard>
          <VerifyForm email={email} />
        </AuthCard>
      </Container>
    </>
  );
}
