import Link from "next/link";
import { PageHeader, Container } from "@/components/ui";

export const metadata = {
  title: "Terms of Service · TSN",
  description:
    "The terms governing membership in and use of the Texas Society of Nephrology website and services.",
};

const LAST_UPDATED = "August 25, 2026";
const CONTACT_EMAIL = "support@txsocietyofnephrology.org";

const SECTIONS = [
  { id: "eligibility-and-accounts", label: "1. Eligibility and Accounts" },
  { id: "membership-and-dues", label: "2. Membership and Dues" },
  { id: "automatic-renewal-and-cancellation", label: "3. Automatic Renewal and Cancellation" },
  { id: "refunds", label: "4. Refunds" },
  { id: "educational-content-and-knowledge-library", label: "5. Educational Content and Knowledge Library" },
  { id: "medical-disclaimer", label: "6. Medical Disclaimer" },
  { id: "acceptable-use", label: "7. Acceptable Use" },
  { id: "intellectual-property", label: "8. Intellectual Property" },
  { id: "third-party-services-and-links", label: "9. Third-Party Services and Links" },
  { id: "disclaimers", label: "10. Disclaimers" },
  { id: "limitation-of-liability", label: "11. Limitation of Liability" },
  { id: "indemnification", label: "12. Indemnification" },
  { id: "termination", label: "13. Termination" },
  { id: "changes-to-these-terms", label: "14. Changes to These Terms" },
  { id: "governing-law-and-disputes", label: "15. Governing Law and Disputes" },
  { id: "contact-us", label: "16. Contact Us" },
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-14 mb-4 font-serif text-[1.5rem] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-[17px] leading-[1.75] text-slate">{children}</p>;
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mb-4 list-disc space-y-2 pl-5 text-[17px] leading-[1.75] text-slate marker:text-navy">
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
      <section className="pt-14 pb-4 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16">
            <aside className="hidden lg:block">
              <nav className="toc" aria-label="On this page">
                <div className="mb-3 text-[13.5px] font-semibold text-muted">On this page</div>
                {SECTIONS.map((sec) => (
                  <a key={sec.id} href={`#${sec.id}`}>
                    {sec.label}
                  </a>
                ))}
              </nav>
            </aside>
            <div className="max-w-[760px]">
              <P>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
                use of the website, membership, and services of the Texas Society of
                Nephrology (&ldquo;TSN,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                &ldquo;our&rdquo;). By creating an account, becoming a member, or using
                our website, you agree to these Terms and to our{" "}
                <Link href="/privacy" className="font-semibold text-navy underline underline-offset-4 hover:text-navy-hover">
                  Privacy Policy
                </Link>
                . If you do not agree, please do not use our website or services.
              </P>

              <section id="eligibility-and-accounts" aria-labelledby="eligibility-and-accounts-h">
                <H2 id="eligibility-and-accounts-h">1. Eligibility and Accounts</H2>
                <P>
                  To create an account or become a member, you must be at least 18 years
                  old and provide accurate, current, and complete information. You are
                  responsible for maintaining the confidentiality of your login
                  credentials and for all activity that occurs under your account. Notify
                  us promptly of any unauthorized use. We may suspend or terminate
                  accounts that contain false information or that are used in violation
                  of these Terms.
                </P>
              </section>

              <section id="membership-and-dues" aria-labelledby="membership-and-dues-h">
                <H2 id="membership-and-dues-h">2. Membership and Dues</H2>
                <P>
                  TSN offers membership tiers, each with annual dues shown at checkout.
                  By purchasing a membership you authorize TSN and its payment processor
                  to charge the applicable dues to your selected payment method. All fees
                  are stated and charged in U.S. dollars. We may change membership tiers,
                  benefits, and pricing prospectively; changes will not affect the term
                  you have already paid for.
                </P>
              </section>

              <section id="automatic-renewal-and-cancellation" aria-labelledby="automatic-renewal-and-cancellation-h">
                <H2 id="automatic-renewal-and-cancellation-h">3. Automatic Renewal and Cancellation</H2>
                <P>
                  Memberships renew automatically each year at the then-current dues rate
                  using your payment method on file, unless you cancel automatic renewal
                  before the renewal date. You can turn off automatic renewal at any time
                  from your account. If you cancel, your membership remains active through
                  the end of the period you have already paid for, and it will not renew
                  after that. We may send you a reminder before each renewal.
                </P>
              </section>

              <section id="refunds" aria-labelledby="refunds-h">
                <H2 id="refunds-h">4. Refunds</H2>
                <P>
                  Except where required by law, membership dues are non-refundable. If you
                  believe you were charged in error, contact us and we will review the
                  matter in good faith. Turning off automatic renewal prevents future
                  charges but does not refund dues already paid for the current term.
                </P>
              </section>

              <section id="educational-content-and-knowledge-library" aria-labelledby="educational-content-and-knowledge-library-h">
                <H2 id="educational-content-and-knowledge-library-h">5. Educational Content and Knowledge Library</H2>
                <P>
                  Membership may include access to educational materials, recorded
                  lectures, and the Knowledge Library. TSN grants you a limited,
                  personal, non-exclusive, non-transferable license to access this
                  content for your own professional and educational use. You may not
                  copy, download (except where expressly permitted), redistribute,
                  resell, publicly display, or share your access credentials or the
                  content with others. Access ends when your membership ends.
                </P>
              </section>

              <section id="medical-disclaimer" aria-labelledby="medical-disclaimer-h">
                <H2 id="medical-disclaimer-h">6. Medical Disclaimer</H2>
                <P>
                  TSN&rsquo;s content and educational programs are provided for general
                  professional and educational purposes only. They are not a substitute
                  for independent professional judgment, and nothing on our website or in
                  our programs constitutes medical advice or creates a physician-patient
                  relationship. Always rely on your own clinical judgment and applicable
                  standards of care when treating patients.
                </P>
              </section>

              <section id="acceptable-use" aria-labelledby="acceptable-use-h">
                <H2 id="acceptable-use-h">7. Acceptable Use</H2>
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
              </section>

              <section id="intellectual-property" aria-labelledby="intellectual-property-h">
                <H2 id="intellectual-property-h">8. Intellectual Property</H2>
                <P>
                  The website and its content — including text, graphics, logos, the TSN
                  name and marks, and educational materials — are owned by or licensed to
                  TSN and are protected by intellectual property laws. Except for the
                  limited license granted above, no rights are transferred to you. You may
                  not use TSN&rsquo;s name, logo, or marks without our prior written
                  permission.
                </P>
              </section>

              <section id="third-party-services-and-links" aria-labelledby="third-party-services-and-links-h">
                <H2 id="third-party-services-and-links-h">9. Third-Party Services and Links</H2>
                <P>
                  We use third-party services (including for payment processing, hosting,
                  identity management, and email) and may link to third-party websites.
                  Your use of a third-party service may be subject to that provider&rsquo;s
                  own terms. TSN is not responsible for the content, policies, or
                  practices of third-party sites or services.
                </P>
              </section>

              <section id="disclaimers" aria-labelledby="disclaimers-h">
                <H2 id="disclaimers-h">10. Disclaimers</H2>
                <P>
                  The website and services are provided &ldquo;as is&rdquo; and &ldquo;as
                  available&rdquo; without warranties of any kind, whether express or
                  implied, including warranties of merchantability, fitness for a
                  particular purpose, and non-infringement. TSN does not warrant that the
                  website will be uninterrupted, secure, or error-free.
                </P>
              </section>

              <section id="limitation-of-liability" aria-labelledby="limitation-of-liability-h">
                <H2 id="limitation-of-liability-h">11. Limitation of Liability</H2>
                <P>
                  To the fullest extent permitted by law, TSN and its officers,
                  directors, volunteers, employees, and agents will not be liable for any
                  indirect, incidental, special, consequential, or punitive damages, or
                  for any loss of profits or data, arising out of or relating to your use
                  of the website or services. To the extent liability cannot be excluded,
                  TSN&rsquo;s total liability will not exceed the amount of dues you paid
                  to TSN in the twelve months preceding the claim.
                </P>
              </section>

              <section id="indemnification" aria-labelledby="indemnification-h">
                <H2 id="indemnification-h">12. Indemnification</H2>
                <P>
                  You agree to indemnify and hold harmless TSN and its officers,
                  directors, volunteers, employees, and agents from any claims, damages,
                  liabilities, and expenses (including reasonable attorneys&rsquo; fees)
                  arising out of your use of the website or services or your violation of
                  these Terms.
                </P>
              </section>

              <section id="termination" aria-labelledby="termination-h">
                <H2 id="termination-h">13. Termination</H2>
                <P>
                  We may suspend or terminate your account or access to the website or
                  services at any time if you violate these Terms or for other lawful
                  reasons. You may stop using the services and cancel automatic renewal at
                  any time. Provisions that by their nature should survive termination
                  (including intellectual property, disclaimers, limitation of liability,
                  and indemnification) will survive.
                </P>
              </section>

              <section id="changes-to-these-terms" aria-labelledby="changes-to-these-terms-h">
                <H2 id="changes-to-these-terms-h">14. Changes to These Terms</H2>
                <P>
                  We may update these Terms from time to time. Changes become effective
                  when posted with a revised &ldquo;Last updated&rdquo; date. Your
                  continued use of the website or services after changes are posted
                  constitutes acceptance of the updated Terms.
                </P>
              </section>

              <section id="governing-law-and-disputes" aria-labelledby="governing-law-and-disputes-h">
                <H2 id="governing-law-and-disputes-h">15. Governing Law and Disputes</H2>
                <P>
                  These Terms are governed by the laws of the State of Texas, without
                  regard to its conflict-of-laws rules. Any dispute arising out of or
                  relating to these Terms or your use of the services will be subject to
                  the exclusive jurisdiction of the state and federal courts located in
                  Texas, and you consent to venue there.
                </P>
              </section>

              <section id="contact-us" aria-labelledby="contact-us-h">
                <H2 id="contact-us-h">16. Contact Us</H2>
                <P>
                  Questions about these Terms? Contact us:
                </P>
                <P>
                  Texas Society of Nephrology
                  <br />
                  Website:{" "}
                  <a
                    href="https://www.txsocietyofnephrology.org"
                    className="font-semibold text-navy underline underline-offset-4 hover:text-navy-hover"
                  >
                    www.txsocietyofnephrology.org
                  </a>
                  <br />
                  Email:{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-semibold text-navy underline underline-offset-4 hover:text-navy-hover"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <br />
                  <Link href="/contact" className="font-semibold text-navy underline underline-offset-4 hover:text-navy-hover">
                    Contact form
                  </Link>
                </P>
              </section>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
