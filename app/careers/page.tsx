import { PageHeader, Container, Icon, Button } from "@/components/ui";

export const metadata = { title: "Careers · TSN" };

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Nephrology career center"
        intro="Open positions for kidney care professionals across Texas."
        image="/images/site/careers/hero.webp"
      />
      <section className="pad">
        <Container>
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div className="card-line rv flex flex-col items-center justify-center px-8 py-14 text-center">
              <span className="ic-tile mb-5">
                <Icon name="briefcase" size={26} />
              </span>
              <h2 className="font-serif text-[22px] font-bold text-navy">Open positions</h2>
              <p className="mt-3 text-[17px] text-slate">No open positions are posted right now.</p>
            </div>
            <div className="rv" style={{ transitionDelay: ".08s" }}>
              <div className="card flex h-full flex-col p-8 md:p-10">
                <h2 className="font-serif text-[22px] font-bold text-navy">Have a position to post?</h2>
                <p className="mt-3 flex-1 text-[17px] leading-[1.7] text-slate">
                  Send us the details and we&apos;ll add it to the career center.
                </p>
                <div className="mt-8">
                  <Button href="/contact" arrow>
                    Submit a posting
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
