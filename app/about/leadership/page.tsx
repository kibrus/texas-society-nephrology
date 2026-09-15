import { PageHeader, Container, Icon } from "@/components/ui";
import { leadership } from "@/lib/site";

export const metadata = { title: "Leadership · TSN" };

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT TXSN"
        title="Leadership"
        intro="The board of directors guiding the Texas Society of Nephrology."
      />
      <Container className="py-14 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {leadership.map((person) => (
            <article
              key={person.role}
              className="group flex flex-col overflow-hidden rounded-2xl border border-txsn-mint-soft/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-txsn-teal-deep/5 sm:flex-row"
            >
              {/* Large portrait */}
              <div className="relative w-full overflow-hidden bg-txsn-wash sm:w-[54%] sm:flex-shrink-0">
                <img
                  src={person.photo}
                  alt={`Portrait of ${person.name}`}
                  className="h-72 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04] sm:h-full"
                />
              </div>

              {/* Bio */}
              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-txsn-gold">
                  {person.role}
                </div>
                <h2 className="font-serif text-xl font-medium leading-snug text-txsn-teal-deep">
                  {person.name}
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-txsn-slate">
                  {person.bio}
                </p>
                <a
                  href={person.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex w-fit items-center gap-1.5 pt-5 text-[13px] font-semibold text-txsn-teal transition-all hover:gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-txsn-teal/40 focus-visible:ring-offset-2 rounded-sm"
                >
                  Read more <Icon name="external" size={13} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
