import Image from "next/image";
import Link from "next/link";
import { Button, Container, Icon, PageHeader, Status } from "@/components/ui";
import { callForAbstracts } from "@/lib/site";
import { isPastDate } from "@/lib/content";

export const metadata = { title: "Abstract Submission · TSN" };

export default function AbstractsPage() {
  const deadlinePassed = isPastDate(callForAbstracts.deadlineIso);

  return (
    <>
      <PageHeader
        eyebrow={<Link href="/annual-meeting">Annual Meeting</Link>}
        title={callForAbstracts.title}
        intro={callForAbstracts.subtitle}
        image="/images/site/annual-meeting/hero.webp"
      />

      <section className="pad">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
            <div className="min-w-0">
              {deadlinePassed && (
                <div className="card-line rv mb-10 flex items-start gap-4 p-6" role="note">
                  <Icon name="clock" size={20} className="mt-0.5 shrink-0 text-muted" />
                  <div>
                    <Status tone="past">Submissions closed</Status>
                    <p className="mt-1.5 text-[16px] font-semibold text-ink">Submissions are closed for this cycle</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-slate">
                      The deadline for this call has passed. Please check back here for the next abstract submission
                      window.
                    </p>
                  </div>
                </div>
              )}

              <h2 className="h-display rv">Submission criteria</h2>
              <dl className="rv mt-8 divide-y divide-line border-y border-line">
                <div className="grid gap-1 py-5 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-[15px] font-semibold text-navy">Categories</dt>
                  <dd className="text-[16px] text-slate">{callForAbstracts.categories.join(", ")}</dd>
                </div>
                <div className="grid gap-1 py-5 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-[15px] font-semibold text-navy">Open to</dt>
                  <dd className="text-[16px] text-slate">{callForAbstracts.openTo}</dd>
                </div>
                <div className="grid gap-1 py-5 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-[15px] font-semibold text-navy">Poster awards eligibility</dt>
                  <dd className="text-[16px] text-slate">{callForAbstracts.awards}</dd>
                </div>
                <div className="grid gap-1 py-5 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-[15px] font-semibold text-navy">Deadline</dt>
                  <dd className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[16px] text-slate">
                    {callForAbstracts.deadlineLabel}
                    {deadlinePassed && <Status tone="past">Passed</Status>}
                  </dd>
                </div>
              </dl>

              <h2 className="h-display rv mt-16">Abstract format</h2>
              <ul className="rv mt-8 grid gap-3">
                {callForAbstracts.formatRules.map((rule) => (
                  <li key={rule} className="flex gap-3 text-[16px] text-ink">
                    <Icon name="check" size={18} className="mt-[3px] shrink-0 text-navy" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:sticky lg:top-[110px]" aria-label="Submit your abstract">
              <div className="card rv">
                <div className="settle relative aspect-[4/3]">
                  <Image
                    src="/images/site/annual-meeting/posters.webp"
                    alt="A researcher explaining her poster to colleagues"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
                <div className="p-7">
                  <h2 className="font-serif text-[1.35rem] font-bold leading-snug text-navy">Submit your abstract to</h2>
                  <p className="mt-2 break-all text-[16px] font-semibold text-ink">{callForAbstracts.submitEmail}</p>
                  <div className="mt-5">
                    <Button href={`mailto:${callForAbstracts.submitEmail}`} className="w-full">
                      <Icon name="mail" size={17} /> Email your abstract
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
