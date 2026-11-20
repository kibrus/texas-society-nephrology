import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHeader, Container, Status } from "@/components/ui";
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
      <PageHeader eyebrow="My account" title="Billing history" />
      <section className="pt-14 pb-4 md:pt-16">
        <Container>
          <div className="max-w-4xl space-y-8">
            <Link href="/member" className="link">
              <span aria-hidden="true">←</span>
              Back to my account
            </Link>

            {rows.length === 0 ? (
              <div className="card p-8">
                <p className="text-[17px] leading-[1.65] text-slate">
                  You don&apos;t have any payments yet. Once your first dues payment
                  is processed, your invoices will appear here.
                </p>
              </div>
            ) : (
              <div className="card">
                <div className="overflow-x-auto">
                <table className="w-full text-left text-[15px]">
                  <thead>
                    <tr className="bg-surface text-[13.5px] text-slate">
                      <th scope="col" className="px-5 py-4 font-semibold">Date</th>
                      <th scope="col" className="px-5 py-4 font-semibold">Period</th>
                      <th scope="col" className="px-5 py-4 font-semibold">Tier</th>
                      <th scope="col" className="px-5 py-4 font-semibold">Amount</th>
                      <th scope="col" className="px-5 py-4 font-semibold">Status</th>
                      <th scope="col" className="px-5 py-4 text-right font-semibold">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((p) => (
                      <tr key={p.id} className="border-t border-line text-ink">
                        <td className="whitespace-nowrap px-5 py-4">
                          {formatDate(p.created_at.slice(0, 10))}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-slate">
                          {formatDate(p.period_start)} – {formatDate(p.period_end)}
                        </td>
                        <td className="px-5 py-4">{TIER_LABELS[p.tier] ?? p.tier}</td>
                        <td className="whitespace-nowrap px-5 py-4 font-semibold">
                          {formatAmount(p.amount_cents)}
                        </td>
                        <td className="px-5 py-4">
                          <Status
                            tone={p.status === "succeeded" || p.status === "paid" ? "live" : "default"}
                            className="capitalize"
                          >
                            {p.status}
                          </Status>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right">
                          <span className="inline-flex items-center gap-4">
                            {p.stripe_hosted_invoice_url && (
                              <a
                                href={p.stripe_hosted_invoice_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-navy underline-offset-4 hover:underline"
                              >
                                View
                              </a>
                            )}
                            {p.stripe_invoice_pdf_url && (
                              <a
                                href={p.stripe_invoice_pdf_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-navy underline-offset-4 hover:underline"
                              >
                                Download
                              </a>
                            )}
                            {!p.stripe_hosted_invoice_url &&
                              !p.stripe_invoice_pdf_url && (
                                <span className="text-muted">—</span>
                              )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
