import "server-only";
import { publicEnv } from "@/lib/env/public";
import { TIER_LABELS } from "@/lib/membership";

// Plain, inline-styled transactional emails. Kept intentionally simple (no
// external template engine) — these render reliably across mail clients.
// [PROD] Legal/footer copy is placeholder and should be finalized before launch.

const SITE = publicEnv.NEXT_PUBLIC_SITE_URL;

export type Email = { subject: string; html: string; text: string };

function formatUsd(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDate(date: string | null): string {
  if (!date) return "—";
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Shared shell: a heading, body paragraphs/blocks, an optional button.
function layout(opts: {
  heading: string;
  bodyHtml: string;
  button?: { label: string; url: string };
}): string {
  const button = opts.button
    ? `<p style="margin:24px 0;">
         <a href="${opts.button.url}" style="background:#1A56A0;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 20px;border-radius:6px;display:inline-block;">${escapeHtml(
           opts.button.label,
         )}</a>
       </p>`
    : "";
  return `<!doctype html>
<html>
  <body style="margin:0;background:#F0F6FC;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#0D1F3C;">
    <div style="max-width:520px;margin:0 auto;padding:32px 24px;">
      <div style="font-size:13px;letter-spacing:0.08em;color:#5A6B7B;text-transform:uppercase;margin-bottom:8px;">Texas Society of Nephrology</div>
      <div style="background:#ffffff;border-radius:12px;padding:28px;">
        <h1 style="font-size:19px;margin:0 0 12px;color:#0D1F3C;">${escapeHtml(opts.heading)}</h1>
        ${opts.bodyHtml}
        ${button}
      </div>
      <p style="font-size:12px;color:#8a9797;margin-top:20px;">
        You received this email because you have a TSN membership account.
      </p>
    </div>
  </body>
</html>`;
}

// Sent on invoice.paid — first activation and every yearly renewal.
export function receiptEmail(args: {
  firstName: string;
  tier: string;
  amountCents: number;
  periodEnd: string | null;
  invoiceUrl: string | null;
}): Email {
  const tierLabel = TIER_LABELS[args.tier] ?? args.tier;
  const amount = formatUsd(args.amountCents);
  const until = formatDate(args.periodEnd);
  const subject = "Your TSN membership is active — payment receipt";

  const bodyHtml = `
    <p style="font-size:14px;line-height:1.6;margin:0 0 12px;">Hi ${escapeHtml(args.firstName)},</p>
    <p style="font-size:14px;line-height:1.6;margin:0 0 12px;">Thank you for your payment. Your TSN membership is active.</p>
    <table style="width:100%;font-size:14px;border-collapse:collapse;margin:16px 0;">
      <tr><td style="padding:6px 0;color:#5b6b6b;">Tier</td><td style="padding:6px 0;text-align:right;font-weight:600;">${escapeHtml(tierLabel)}</td></tr>
      <tr><td style="padding:6px 0;color:#5b6b6b;">Amount paid</td><td style="padding:6px 0;text-align:right;font-weight:600;">${amount}</td></tr>
      <tr><td style="padding:6px 0;color:#5b6b6b;">Active through</td><td style="padding:6px 0;text-align:right;font-weight:600;">${until}</td></tr>
    </table>`;

  const html = layout({
    heading: "Payment received",
    bodyHtml,
    button: args.invoiceUrl
      ? { label: "View invoice", url: args.invoiceUrl }
      : { label: "Go to my account", url: `${SITE}/member` },
  });

  const text = [
    `Hi ${args.firstName},`,
    "",
    "Thank you for your payment. Your TSN membership is active.",
    "",
    `Tier: ${tierLabel}`,
    `Amount paid: ${amount}`,
    `Active through: ${until}`,
    "",
    args.invoiceUrl ? `View invoice: ${args.invoiceUrl}` : `Account: ${SITE}/member`,
  ].join("\n");

  return { subject, html, text };
}

// Sent on invoice.payment_failed — dues charge (usually a renewal) didn't go through.
export function paymentFailedEmail(args: {
  firstName: string;
  updateUrl: string;
}): Email {
  const subject = "Action needed: your TSN dues payment failed";
  const bodyHtml = `
    <p style="font-size:14px;line-height:1.6;margin:0 0 12px;">Hi ${escapeHtml(args.firstName)},</p>
    <p style="font-size:14px;line-height:1.6;margin:0 0 12px;">We weren't able to process your TSN membership dues. We'll retry automatically, but you can update your payment method now to avoid any interruption to your membership.</p>`;
  const html = layout({
    heading: "We couldn't process your payment",
    bodyHtml,
    button: { label: "Update payment", url: args.updateUrl },
  });
  const text = [
    `Hi ${args.firstName},`,
    "",
    "We weren't able to process your TSN membership dues. We'll retry automatically, but you can update your payment method now to avoid any interruption.",
    "",
    `Update payment: ${args.updateUrl}`,
  ].join("\n");
  return { subject, html, text };
}

// Sent by the daily cron ahead of a member's renewal date. Copy differs by
// whether auto-renewal is on (courtesy heads-up) or off (renew to keep access).
export function renewalReminderEmail(args: {
  firstName: string;
  renewsOn: string | null;
  autoRenew: boolean;
}): Email {
  const date = formatDate(args.renewsOn);
  if (args.autoRenew) {
    const subject = "Your TSN membership renews soon";
    const bodyHtml = `
      <p style="font-size:14px;line-height:1.6;margin:0 0 12px;">Hi ${escapeHtml(args.firstName)},</p>
      <p style="font-size:14px;line-height:1.6;margin:0 0 12px;">This is a courtesy reminder that your TSN membership will renew automatically on <strong>${date}</strong>. No action is needed. If your card has changed, you can update it from your account.</p>`;
    const html = layout({
      heading: "Membership renewing soon",
      bodyHtml,
      button: { label: "Manage membership", url: `${SITE}/member` },
    });
    const text = [
      `Hi ${args.firstName},`,
      "",
      `Your TSN membership will renew automatically on ${date}. No action is needed — update your card from your account if it has changed.`,
      "",
      `Account: ${SITE}/member`,
    ].join("\n");
    return { subject, html, text };
  }

  const subject = "Your TSN membership expires soon — renew to keep access";
  const bodyHtml = `
    <p style="font-size:14px;line-height:1.6;margin:0 0 12px;">Hi ${escapeHtml(args.firstName)},</p>
    <p style="font-size:14px;line-height:1.6;margin:0 0 12px;">Your TSN membership expires on <strong>${date}</strong>. Automatic renewal is off, so renew now to keep uninterrupted access to member benefits.</p>`;
  const html = layout({
    heading: "Renew your membership",
    bodyHtml,
    button: { label: "Renew membership", url: `${SITE}/member/renew` },
  });
  const text = [
    `Hi ${args.firstName},`,
    "",
    `Your TSN membership expires on ${date}. Automatic renewal is off, so renew now to keep uninterrupted access.`,
    "",
    `Renew: ${SITE}/member/renew`,
  ].join("\n");
  return { subject, html, text };
}

// Sent when a member turns off automatic renewal.
export function cancellationEmail(args: {
  firstName: string;
  activeUntil: string | null;
}): Email {
  const until = formatDate(args.activeUntil);
  const subject = "Your TSN automatic renewal is off";
  const bodyHtml = `
    <p style="font-size:14px;line-height:1.6;margin:0 0 12px;">Hi ${escapeHtml(args.firstName)},</p>
    <p style="font-size:14px;line-height:1.6;margin:0 0 12px;">Automatic renewal has been turned off. Your membership stays active until <strong>${until}</strong>, and it won't renew after that. You can re-enable renewal anytime from your account.</p>`;
  const html = layout({
    heading: "Automatic renewal turned off",
    bodyHtml,
    button: { label: "Go to my account", url: `${SITE}/member` },
  });
  const text = [
    `Hi ${args.firstName},`,
    "",
    `Automatic renewal has been turned off. Your membership stays active until ${until}, and it won't renew after that.`,
    "",
    `Account: ${SITE}/member`,
  ].join("\n");
  return { subject, html, text };
}
