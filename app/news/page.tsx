import { PageHeader, Container, Icon } from "@/components/ui";
import Link from "next/link";
import { getAllNews, formatDate } from "@/lib/content";

export const metadata = { title: "News · TxSN" };

export default function NewsIndexPage() {
  const posts = getAllNews();
  return (
    <>
      <PageHeader
        eyebrow="STAY INFORMED"
        title="News & updates"
        intro="Announcements, education, and updates from the Texas Society of Nephrology."
      />
      <Container className="py-14">
        <div className="grid gap-4 md:grid-cols-2 max-w-4xl">
          {posts.map((post) => (
            <Link key={post.slug} href={`/news/${post.slug}`} className="group bg-white border border-txsn-mint-soft/50 hover:border-txsn-mint rounded-xl p-6 transition-colors flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                {post.category && (
                  <span className="text-[10px] uppercase tracking-wide text-txsn-teal bg-txsn-wash px-2 py-0.5 rounded-full font-medium">{post.category}</span>
                )}
                <span className="text-[11px] text-txsn-gold font-medium">{formatDate(post.date)}</span>
              </div>
              <h2 className="font-serif text-lg text-txsn-teal-deep font-medium leading-snug mb-2 group-hover:text-txsn-teal transition-colors">{post.title}</h2>
              <p className="text-[13px] text-txsn-slate leading-relaxed flex-1">{post.excerpt}</p>
              <span className="text-[12px] font-medium text-txsn-teal inline-flex items-center gap-1 mt-4">Read more <Icon name="arrow" size={13} /></span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
