import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PageHeader, Container, MetaRow, ArrowLink } from "@/components/ui";
import { getAllNews, getNewsBySlug, formatDate } from "@/lib/content";

export function generateStaticParams() {
  return getAllNews().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getNewsBySlug(params.slug);
  return { title: post ? `${post.title} · TSN` : "News · TSN" };
}

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  const post = getNewsBySlug(params.slug);
  if (!post) notFound();

  const more = getAllNews()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={
          <>
            <Link href="/news">News</Link>
            <span aria-hidden="true">/</span>
            <span>{post.category ?? "Article"}</span>
          </>
        }
        title={post.title}
        image="/images/site/news/hero.webp"
      />

      <section className="pt-16 pb-8 md:pt-20">
        <Container>
          <div className="mx-auto max-w-[720px]">
            <MetaRow
              category={post.category}
              date={formatDate(post.date)}
              extra={post.author ? `By ${post.author}` : undefined}
              className="mb-8 border-b border-line pb-6"
            />
            <article className="prose-txsn">
              <MDXRemote source={post.content} />
            </article>
            <div className="mt-12 border-t border-line pt-8">
              <Link href="/news" className="link">
                <span aria-hidden="true">←</span>
                All news
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {more.length > 0 && (
        <section className="pt-16 pb-4">
          <Container>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="h-display">More news</h2>
              <ArrowLink href="/news">View all news</ArrowLink>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  href={`/news/${p.slug}`}
                  className="card-line row-hover group block p-6"
                >
                  <MetaRow category={p.category} date={formatDate(p.date)} />
                  <h3 className="mt-2 text-[17px] font-semibold leading-[1.4] text-navy group-hover:text-navy-hover">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
