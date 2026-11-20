import Link from "next/link";
import { PageHeader, Container, MetaRow, Status } from "@/components/ui";
import { getAllNews, formatDate } from "@/lib/content";

export const metadata = { title: "News · TSN" };

export default function NewsIndexPage() {
  const posts = getAllNews();
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Stay informed"
        title="News & updates"
        intro="Announcements, education, and updates from the Texas Society of Nephrology."
        image="/images/site/news/hero.webp"
      />

      <section className="pad">
        <Container>
          {!lead ? (
            <p className="text-[17px] text-slate">No news has been posted yet. Check back soon.</p>
          ) : (
            <>
              {/* Lead story */}
              <div className="rv">
                <Link
                href={`/news/${lead.slug}`}
                className="card card-hover spot group block p-8 md:p-12"
              >
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end">
                  <div>
                    <Status className="mb-4">Latest</Status>
                    <MetaRow category={lead.category} date={formatDate(lead.date)} />
                    <h2 className="mt-4 font-serif text-[clamp(1.6rem,2.6vw,2.3rem)] font-bold leading-[1.2] tracking-[-0.015em] text-navy group-hover:text-navy-hover">
                      {lead.title}
                    </h2>
                  </div>
                  <div>
                    {lead.excerpt && (
                      <p className="text-[17px] leading-[1.7] text-slate">{lead.excerpt}</p>
                    )}
                    <span className="link mt-6">
                      Read the story
                      <span className="arrow" aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </Link>
              </div>

              {/* The rest */}
              {rest.length > 0 && (
                <>
                  <h2 className="h-display rv mt-24 mb-10">More news</h2>
                  <div className="rv grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/news/${post.slug}`}
                        className="card-line row-hover group flex flex-col p-7"
                      >
                        <MetaRow category={post.category} date={formatDate(post.date)} />
                        <h3 className="mt-3 text-[18px] font-semibold leading-[1.4] text-navy group-hover:text-navy-hover">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="mt-3 flex-1 text-[16px] leading-[1.65] text-slate">{post.excerpt}</p>
                        )}
                        <span className="link mt-5 text-[15px]">
                          Read more
                          <span className="arrow" aria-hidden="true">→</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
}
