import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHeader, Container } from "@/components/ui";
import { getSessionContext } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { TIER_LABELS } from "@/lib/membership";

export const metadata = { title: "Billing history · TSN" };

// Reads the member's payments per request; never cached.
export const dynamic = "force-dynamic";

function formatDate(date: string | null) {
  if (!date) return "—";
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatAmount(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function InvoicesPage() {
  const { user, profile } = await getSessionContext();
  if (!user) redirect("/sign-in");
  if (!profile) redirect("/join");

  // RLS (payments_select_own) restricts this to the caller's own rows.
  const supabase = createSupabaseServerClient();
  const { data: payments } = await supabase
    .from("payments")
    .select(
      "id, created_at, period_start, period_end, tier, amount_cents, status, stripe_hosted_invoice_url, stripe_invoice_pdf_url",
    )
    .order("created_at", { ascending: false });

  const rows = payments ?? [];

  return (
    <>
      <PageHeader eyebrow="MY ACCOUNT" title="Billing history" />
      <Container className="py-14">
        <div className="max-w-3xl space-y-6">
          <Link
            href="/member"
            className="inline-flex items-center text-[13px] text-txsn-teal font-medium hover:underline"
          >
            ← Back to my account
          </Link>

          {rows.length === 0 ? (
            <div className="bg-txsn-wash rounded-xl p-6">
              <p className="text-[14px] text-txsn-slate">
                You don&apos;t have any payments yet. Once your first dues payment
                is processed, your invoices will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-txsn-mint-soft/60">
              <table className="w-full text-left text-[14px]">
                <thead>
                  <tr className="bg-txsn-wash text-[12px] text-txsn-slate">
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Period</th>
                    <th className="px-4 py-3 font-medium">Tier</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((p) => (
                    <tr
                      key={p.id}
                      className="border-t border-txsn-mint-soft/50 text-txsn-teal-deep"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        {formatDate(p.created_at.slice(0, 10))}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-txsn-slate">
                        {formatDate(p.period_start)} – {formatDate(p.period_end)}
                      </td>
                      <td className="px-4 py-3">
                        {TIER_LABELS[p.tier] ?? p.tier}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium">
                        {formatAmount(p.amount_cents)}
                      </td>
                      <td className="px-4 py-3 capitalize">{p.status}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <span className="inline-flex items-center gap-3">
                          {p.stripe_hosted_invoice_url && (
                            <a
                              href={p.stripe_hosted_invoice_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-txsn-teal font-medium hover:underline"
                            >
                              View
                            </a>
                          )}
                          {p.stripe_invoice_pdf_url && (
                            <a
                              href={p.stripe_invoice_pdf_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-txsn-teal font-medium hover:underline"
                            >
                              Download
                            </a>
                          )}
                          {!p.stripe_hosted_invoice_url &&
                            !p.stripe_invoice_pdf_url && (
                              <span className="text-txsn-slate">—</span>
                            )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
