import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container, Icon } from "@/components/ui";
import { getAllNews, getNewsBySlug, formatDate } from "@/lib/content";

export function generateStaticParams() {
  return getAllNews().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getNewsBySlug(params.slug);
  return { title: post ? `${post.title} · TxSN` : "News · TxSN" };
}

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  const post = getNewsBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <div className="bg-txsn-wash border-b border-txsn-mint-soft/40">
        <Container className="py-12 lg:py-14">
          <Link href="/news" className="inline-flex items-center gap-1.5 text-[13px] text-txsn-teal font-medium mb-5 hover:gap-2.5 transition-all">
            <Icon name="arrow" size={14} className="rotate-180" /> All news
          </Link>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              {post.category && (
                <span className="text-[10px] uppercase tracking-wide text-txsn-teal bg-white px-2 py-0.5 rounded-full font-medium">{post.category}</span>
              )}
              <span className="text-[12px] text-txsn-gold font-medium">{formatDate(post.date)}</span>
            </div>
            <h1 className="font-serif text-3xl lg:text-[2.5rem] leading-tight text-txsn-teal-deep font-medium">{post.title}</h1>
            {post.author && <div className="text-[13px] text-txsn-slate mt-4">By {post.author}</div>}
          </div>
        </Container>
      </div>
      <Container className="py-12">
        <article className="prose-txsn max-w-2xl">
          <MDXRemote source={post.content} />
        </article>
      </Container>
    </>
  );
}
