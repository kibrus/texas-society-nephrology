import { PageHeader, Container, Icon } from "@/components/ui";
import { requireActiveMember } from "@/lib/auth";

export const metadata = { title: "Member Resources · TSN" };

// Gated: requireActiveMember redirects signed-out users to /sign-in and
// expired/cancelled members to /member/renew, per the spec access rules.
export const dynamic = "force-dynamic";

export default async function MemberResourcesPage() {
  const profile = await requireActiveMember();

  return (
    <>
      <PageHeader
        eyebrow="RESOURCES"
        title="Member resources"
        intro={`Welcome, ${profile.first_name}. These resources are exclusive to active TSN members.`}
      />
      <Container className="py-14">
        <div className="max-w-2xl">
          <div className="flex items-start gap-3 bg-txsn-wash rounded-xl p-6">
            <div className="text-txsn-teal mt-0.5">
              <Icon name="check" size={20} />
            </div>
            <div>
              <div className="text-[15px] font-medium text-txsn-teal-deep">
                Your member access is active
              </div>
              <p className="text-[14px] text-txsn-slate mt-1">
                Member-only resources and downloads will appear here. Content is
                being added — check back soon.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
