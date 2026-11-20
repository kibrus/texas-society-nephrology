import Image from "next/image";
import { PageHeader, Container, ArrowLink } from "@/components/ui";
import { leadership } from "@/lib/site";

export const metadata = { title: "Leadership · TSN" };

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Leadership"
        intro="The board of directors guiding the Texas Society of Nephrology."
        image="/images/site/leadership/hero.webp"
      />
      <section className="pad !pb-0">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person, i) => (
              <article
                key={person.role}
                className="card card-hover spot rv flex flex-col overflow-hidden"
                style={{ transitionDelay: `${(i % 4) * 0.06}s` }}
              >
                <div className="settle zoom-img relative aspect-[4/5] w-full bg-surface-2">
                  <Image
                    src={person.photo}
                    alt={`Portrait of ${person.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[14px] font-semibold uppercase tracking-[0.06em] text-navy">{person.role}</p>
                  <h2 className="mt-2 font-serif text-[1.25rem] font-bold leading-snug">{person.name}</h2>
                  <p className="mt-3 text-[16px] leading-relaxed text-slate">{person.bio}</p>
                  <div className="mt-auto pt-6">
                    <ArrowLink href={person.profileUrl}>
                      Read more<span className="sr"> about {person.name} (opens in a new tab)</span>
                    </ArrowLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
