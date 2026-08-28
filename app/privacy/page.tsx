import Link from "next/link";
import { PageHeader, Container } from "@/components/ui";

export const metadata = {
  title: "Privacy Policy · TSN",
  description:
    "How the Texas Society of Nephrology collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "August 25, 2026";
const CONTACT_EMAIL = "support@txsocietyofnephrology.org";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-xl font-medium text-txsn-teal-deep mt-10 mb-3">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[15px] font-semibold text-txsn-teal-deep mt-5 mb-2">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-relaxed text-txsn-slate mb-3">{children}</p>;
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 text-[15px] leading-relaxed text-txsn-slate mb-3">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        intro={`Last updated: ${LAST_UPDATED}`}
      />
      <Container className="py-14 lg:py-20">
        <div className="max-w-3xl">
          <P>
            The Texas Society of Nephrology (&ldquo;TSN,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the
            privacy of our members, meeting participants, sponsors, exhibitors,
            and website visitors. This Privacy Policy explains what information we
            collect, how we use it, and the choices you have. By using our website
            or services, you agree to the practices described here.
          </P>

          <H2>Information We Collect</H2>

          <H3>Information You Provide Voluntarily</H3>
          <P>When you take actions such as:</P>
          <List
            items={[
              "Apply for or renew membership",
              "Register for conferences or educational programs",
              "Submit research for presentation",
              "Sign up for communications",
              "Complete online forms",
              "Apply for sponsorship or exhibit opportunities",
            ]}
          />
          <P>we may collect:</P>
          <List
            items={[
              "Name",
              "Email address",
              "Mailing address",
              "Phone number",
              "Professional credentials and practice information",
              "Account login credentials (passwords are stored in encrypted, hashed form and are never visible to us)",
              "Payment information, which is entered on and processed securely by our third-party payment processor — TSN does not store full card numbers on its servers",
              "Any additional information you choose to provide",
            ]}
          />

          <H3>Automatically Collected Information</H3>
          <P>When you visit our website, we may automatically collect:</P>
          <List
            items={[
              "IP address",
              "Browser and device information",
              "Pages visited and usage data",
              "Referral sources",
            ]}
          />
          <P>This information is used to:</P>
          <List
            items={[
              "Maintain website security",
              "Improve website performance",
              "Analyze overall usage trends",
              "Enhance user experience",
            ]}
          />

          <H2>Cookies</H2>
          <P>
            Our website uses cookies and similar technologies to keep you signed
            in, remember preferences, secure your session, and understand
            aggregate usage. You may disable cookies in your browser settings,
            though some features — including member sign-in — may not function
            properly without them.
          </P>

          <H2>How We Use Information</H2>
          <P>TSN may use your information to:</P>
          <List
            items={[
              "Provide and administer membership services",
              "Process meeting registrations and educational activities",
              "Process membership dues and payments",
              "Distribute society communications",
              "Respond to inquiries and provide support",
              "Improve our programs and website functionality",
              "Generate aggregate, non-identifiable statistics",
              "Comply with legal and regulatory requirements",
            ]}
          />
          <P>
            <strong>TSN does not sell your personal information.</strong>
          </P>

          <H2>Email Privacy</H2>
          <P>
            TSN does not sell, rent, or share email addresses without your
            permission, except as required by law or through trusted service
            providers assisting with our operations. You may opt out of marketing
            communications at any time using the unsubscribe link in our emails or
            by contacting us directly. We may still send you non-promotional
            messages related to your membership or account (for example, payment
            receipts and renewal notices).
          </P>

          <H2>Text Messaging Policy</H2>
          <P>
            If you provide a mobile number and opt in to text messages, the
            following applies:
          </P>
          <H3>Sharing of Personal Information</H3>
          <P>
            TSN does not share, sell, or disclose your personal information or
            mobile opt-in data without explicit consent, except as required by
            law. Text messaging opt-in data and consent are not shared with third
            parties.
          </P>
          <H3>Opting Out</H3>
          <P>
            You may opt out at any time by replying &ldquo;STOP&rdquo; to any text
            message. Message and data rates may apply.
          </P>
          <H3>Consent</H3>
          <P>
            By providing your phone number and opting in, you consent to the
            collection and use of your information as outlined in this policy.
          </P>

          <H2>Third-Party Service Providers</H2>
          <P>TSN uses trusted third-party providers for functions such as:</P>
          <List
            items={[
              "Website hosting and delivery",
              "Membership, account, and identity management",
              "Payment processing",
              "Email communications",
              "Event management",
              "Data analytics",
            ]}
          />
          <P>
            These providers are contractually required to protect your personal
            information and use it only for the purposes for which it was
            disclosed.
          </P>

          <H2>Data Security</H2>
          <P>
            TSN implements reasonable administrative, technical, and physical
            safeguards designed to protect personal information. Payment card data
            is handled by a PCI-compliant payment processor, and passwords are
            stored in hashed form. However, no method of transmission over the
            internet or method of electronic storage is completely secure, and we
            cannot guarantee absolute security.
          </P>

          <H2>Data Retention</H2>
          <P>
            TSN retains personal information only as long as necessary for
            operational, legal, tax, and regulatory purposes, and securely
            disposes of it when it is no longer required.
          </P>

          <H2>Your Privacy Rights</H2>
          <P>
            Depending on your state of residence (including under the Texas Data
            Privacy and Security Act), you may have the right to request access to,
            correction of, or deletion of your personal information, and to opt out
            of certain uses. To exercise these rights, contact us using the details
            below. We will respond as required by applicable law and may need to
            verify your identity before acting on your request.
          </P>

          <H2>Children&rsquo;s Privacy</H2>
          <P>
            Our website and services are intended for healthcare professionals and
            other adults. We do not knowingly collect personal information from
            children under 13. If you believe a child has provided us with personal
            information, please contact us and we will delete it.
          </P>

          <H2>External Links</H2>
          <P>
            Our website may link to third-party sites. TSN is not responsible for
            the privacy practices or content of those sites, and we encourage you
            to review their privacy policies.
          </P>

          <H2>Policy Updates</H2>
          <P>
            TSN may update this Privacy Policy periodically. Changes become
            effective when posted with a revised &ldquo;Last updated&rdquo; date.
            Your continued use of our website or services after changes are posted
            constitutes acceptance of the updated policy.
          </P>

          <H2>Contact Us</H2>
          <P>
            If you have questions about this Privacy Policy or our privacy
            practices, please contact us:
          </P>
          <P>
            Texas Society of Nephrology
            <br />
            Website:{" "}
            <a
              href="https://www.txsocietyofnephrology.org"
              className="font-medium text-txsn-teal hover:underline"
            >
              www.txsocietyofnephrology.org
            </a>
            <br />
            Email:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-txsn-teal hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            <br />
            <Link href="/contact" className="font-medium text-txsn-teal hover:underline">
              Contact form
            </Link>
          </P>
        </div>
      </Container>
    </>
  );
}
