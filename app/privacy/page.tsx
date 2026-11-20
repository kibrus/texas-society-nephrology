import Link from "next/link";
import { PageHeader, Container } from "@/components/ui";

export const metadata = {
  title: "Privacy Policy · TSN",
  description:
    "How the Texas Society of Nephrology collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "August 25, 2026";
const CONTACT_EMAIL = "support@txsocietyofnephrology.org";

const SECTIONS = [
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "cookies", label: "Cookies" },
  { id: "how-we-use-information", label: "How We Use Information" },
  { id: "email-privacy", label: "Email Privacy" },
  { id: "text-messaging-policy", label: "Text Messaging Policy" },
  { id: "third-party-service-providers", label: "Third-Party Service Providers" },
  { id: "data-security", label: "Data Security" },
  { id: "data-retention", label: "Data Retention" },
  { id: "your-privacy-rights", label: "Your Privacy Rights" },
  { id: "childrens-privacy", label: "Children’s Privacy" },
  { id: "external-links", label: "External Links" },
  { id: "policy-updates", label: "Policy Updates" },
  { id: "contact-us", label: "Contact Us" },
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-14 mb-4 font-serif text-[1.5rem] font-bold leading-[1.3] tracking-[-0.01em] text-navy">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-7 mb-2 text-[18px] font-semibold text-navy">{children}</h3>;
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

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
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
                The Texas Society of Nephrology (&ldquo;TSN,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the
                privacy of our members, meeting participants, sponsors, exhibitors,
                and website visitors. This Privacy Policy explains what information we
                collect, how we use it, and the choices you have. By using our website
                or services, you agree to the practices described here.
              </P>

              <section id="information-we-collect" aria-labelledby="information-we-collect-h">
                <H2 id="information-we-collect-h">Information We Collect</H2>

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
              </section>

              <section id="cookies" aria-labelledby="cookies-h">
                <H2 id="cookies-h">Cookies</H2>
                <P>
                  Our website uses cookies and similar technologies to keep you signed
                  in, remember preferences, secure your session, and understand
                  aggregate usage. You may disable cookies in your browser settings,
                  though some features — including member sign-in — may not function
                  properly without them.
                </P>
              </section>

              <section id="how-we-use-information" aria-labelledby="how-we-use-information-h">
                <H2 id="how-we-use-information-h">How We Use Information</H2>
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
              </section>

              <section id="email-privacy" aria-labelledby="email-privacy-h">
                <H2 id="email-privacy-h">Email Privacy</H2>
                <P>
                  TSN does not sell, rent, or share email addresses without your
                  permission, except as required by law or through trusted service
                  providers assisting with our operations. You may opt out of marketing
                  communications at any time using the unsubscribe link in our emails or
                  by contacting us directly. We may still send you non-promotional
                  messages related to your membership or account (for example, payment
                  receipts and renewal notices).
                </P>
              </section>

              <section id="text-messaging-policy" aria-labelledby="text-messaging-policy-h">
                <H2 id="text-messaging-policy-h">Text Messaging Policy</H2>
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
              </section>

              <section id="third-party-service-providers" aria-labelledby="third-party-service-providers-h">
                <H2 id="third-party-service-providers-h">Third-Party Service Providers</H2>
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
              </section>

              <section id="data-security" aria-labelledby="data-security-h">
                <H2 id="data-security-h">Data Security</H2>
                <P>
                  TSN implements reasonable administrative, technical, and physical
                  safeguards designed to protect personal information. Payment card data
                  is handled by a PCI-compliant payment processor, and passwords are
                  stored in hashed form. However, no method of transmission over the
                  internet or method of electronic storage is completely secure, and we
                  cannot guarantee absolute security.
                </P>
              </section>

              <section id="data-retention" aria-labelledby="data-retention-h">
                <H2 id="data-retention-h">Data Retention</H2>
                <P>
                  TSN retains personal information only as long as necessary for
                  operational, legal, tax, and regulatory purposes, and securely
                  disposes of it when it is no longer required.
                </P>
              </section>

              <section id="your-privacy-rights" aria-labelledby="your-privacy-rights-h">
                <H2 id="your-privacy-rights-h">Your Privacy Rights</H2>
                <P>
                  Depending on your state of residence (including under the Texas Data
                  Privacy and Security Act), you may have the right to request access to,
                  correction of, or deletion of your personal information, and to opt out
                  of certain uses. To exercise these rights, contact us using the details
                  below. We will respond as required by applicable law and may need to
                  verify your identity before acting on your request.
                </P>
              </section>

              <section id="childrens-privacy" aria-labelledby="childrens-privacy-h">
                <H2 id="childrens-privacy-h">Children&rsquo;s Privacy</H2>
                <P>
                  Our website and services are intended for healthcare professionals and
                  other adults. We do not knowingly collect personal information from
                  children under 13. If you believe a child has provided us with personal
                  information, please contact us and we will delete it.
                </P>
              </section>

              <section id="external-links" aria-labelledby="external-links-h">
                <H2 id="external-links-h">External Links</H2>
                <P>
                  Our website may link to third-party sites. TSN is not responsible for
                  the privacy practices or content of those sites, and we encourage you
                  to review their privacy policies.
                </P>
              </section>

              <section id="policy-updates" aria-labelledby="policy-updates-h">
                <H2 id="policy-updates-h">Policy Updates</H2>
                <P>
                  TSN may update this Privacy Policy periodically. Changes become
                  effective when posted with a revised &ldquo;Last updated&rdquo; date.
                  Your continued use of our website or services after changes are posted
                  constitutes acceptance of the updated policy.
                </P>
              </section>

              <section id="contact-us" aria-labelledby="contact-us-h">
                <H2 id="contact-us-h">Contact Us</H2>
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
