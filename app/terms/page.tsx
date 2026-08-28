import Link from "next/link";
import { PageHeader, Container } from "@/components/ui";

export const metadata = {
  title: "Terms of Service · TSN",
  description:
    "The terms governing membership in and use of the Texas Society of Nephrology website and services.",
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

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        intro={`Last updated: ${LAST_UPDATED}`}
      />
      <Container className="py-14 lg:py-20">
        <div className="max-w-3xl">
          <P>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
            use of the website, membership, and services of the Texas Society of
            Nephrology (&ldquo;TSN,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;). By creating an account, becoming a member, or using
            our website, you agree to these Terms and to our{" "}
            <Link href="/privacy" className="font-medium text-txsn-teal hover:underline">
              Privacy Policy
            </Link>
            . If you do not agree, please do not use our website or services.
          </P>

          <H2>1. Eligibility and Accounts</H2>
          <P>
            To create an account or become a member, you must be at least 18 years
            old and provide accurate, current, and complete information. You are
            responsible for maintaining the confidentiality of your login
            credentials and for all activity that occurs under your account. Notify
            us promptly of any unauthorized use. We may suspend or terminate
            accounts that contain false information or that are used in violation
            of these Terms.
          </P>

          <H2>2. Membership and Dues</H2>
          <P>
            TSN offers membership tiers, each with annual dues shown at checkout.
            By purchasing a membership you authorize TSN and its payment processor
            to charge the applicable dues to your selected payment method. All fees
            are stated and charged in U.S. dollars. We may change membership tiers,
            benefits, and pricing prospectively; changes will not affect the term
            you have already paid for.
          </P>

          <H2>3. Automatic Renewal and Cancellation</H2>
          <P>
            Memberships renew automatically each year at the then-current dues rate
            using your payment method on file, unless you cancel automatic renewal
            before the renewal date. You can turn off automatic renewal at any time
            from your account. If you cancel, your membership remains active through
            the end of the period you have already paid for, and it will not renew
            after that. We may send you a reminder before each renewal.
          </P>

          <H2>4. Refunds</H2>
          <P>
            Except where required by law, membership dues are non-refundable. If you
            believe you were charged in error, contact us and we will review the
            matter in good faith. Turning off automatic renewal prevents future
            charges but does not refund dues already paid for the current term.
          </P>

          <H2>5. Educational Content and Knowledge Library</H2>
          <P>
            Membership may include access to educational materials, recorded
            lectures, and the Knowledge Library. TSN grants you a limited,
            personal, non-exclusive, non-transferable license to access this
            content for your own professional and educational use. You may not
            copy, download (except where expressly permitted), redistribute,
            resell, publicly display, or share your access credentials or the
            content with others. Access ends when your membership ends.
          </P>

          <H2>6. Medical Disclaimer</H2>
          <P>
            TSN&rsquo;s content and educational programs are provided for general
            professional and educational purposes only. They are not a substitute
            for independent professional judgment, and nothing on our website or in
            our programs constitutes medical advice or creates a physician-patient
            relationship. Always rely on your own clinical judgment and applicable
            standards of care when treating patients.
          </P>

          <H2>7. Acceptable Use</H2>
          <P>You agree not to:</P>
          <List
            items={[
              "Use the website or services for any unlawful purpose",
              "Attempt to gain unauthorized access to any account, system, or data",
              "Interfere with or disrupt the website, servers, or networks",
              "Upload malicious code or attempt to probe, scan, or test vulnerabilities",
              "Misrepresent your identity, credentials, or affiliation",
              "Scrape, harvest, or collect information about other users",
              "Reproduce or redistribute member-only content without authorization",
            ]}
          />

          <H2>8. Intellectual Property</H2>
          <P>
            The website and its content — including text, graphics, logos, the TSN
            name and marks, and educational materials — are owned by or licensed to
            TSN and are protected by intellectual property laws. Except for the
            limited license granted above, no rights are transferred to you. You may
            not use TSN&rsquo;s name, logo, or marks without our prior written
            permission.
          </P>

          <H2>9. Third-Party Services and Links</H2>
          <P>
            We use third-party services (including for payment processing, hosting,
            identity management, and email) and may link to third-party websites.
            Your use of a third-party service may be subject to that provider&rsquo;s
            own terms. TSN is not responsible for the content, policies, or
            practices of third-party sites or services.
          </P>

          <H2>10. Disclaimers</H2>
          <P>
            The website and services are provided &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; without warranties of any kind, whether express or
            implied, including warranties of merchantability, fitness for a
            particular purpose, and non-infringement. TSN does not warrant that the
            website will be uninterrupted, secure, or error-free.
          </P>

          <H2>11. Limitation of Liability</H2>
          <P>
            To the fullest extent permitted by law, TSN and its officers,
            directors, volunteers, employees, and agents will not be liable for any
            indirect, incidental, special, consequential, or punitive damages, or
            for any loss of profits or data, arising out of or relating to your use
            of the website or services. To the extent liability cannot be excluded,
            TSN&rsquo;s total liability will not exceed the amount of dues you paid
            to TSN in the twelve months preceding the claim.
          </P>

          <H2>12. Indemnification</H2>
          <P>
            You agree to indemnify and hold harmless TSN and its officers,
            directors, volunteers, employees, and agents from any claims, damages,
            liabilities, and expenses (including reasonable attorneys&rsquo; fees)
            arising out of your use of the website or services or your violation of
            these Terms.
          </P>

          <H2>13. Termination</H2>
          <P>
            We may suspend or terminate your account or access to the website or
            services at any time if you violate these Terms or for other lawful
            reasons. You may stop using the services and cancel automatic renewal at
            any time. Provisions that by their nature should survive termination
            (including intellectual property, disclaimers, limitation of liability,
            and indemnification) will survive.
          </P>

          <H2>14. Changes to These Terms</H2>
          <P>
            We may update these Terms from time to time. Changes become effective
            when posted with a revised &ldquo;Last updated&rdquo; date. Your
            continued use of the website or services after changes are posted
            constitutes acceptance of the updated Terms.
          </P>

          <H2>15. Governing Law and Disputes</H2>
          <P>
            These Terms are governed by the laws of the State of Texas, without
            regard to its conflict-of-laws rules. Any dispute arising out of or
            relating to these Terms or your use of the services will be subject to
            the exclusive jurisdiction of the state and federal courts located in
            Texas, and you consent to venue there.
          </P>

          <H2>16. Contact Us</H2>
          <P>
            Questions about these Terms? Contact us:
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
