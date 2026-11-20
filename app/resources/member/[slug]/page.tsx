import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHeader, Container, Icon } from "@/components/ui";
import { requireActiveMember } from "@/lib/auth";
import { getVideoEvents, getVideoEventBySlug, formatDate } from "@/lib/content";
import { recordingThumb } from "../thumb";
import s from "../talk.module.css";

// Gated player page for a single recording. requireActiveMember enforces
// access before any video id reaches the browser.
export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { slug: string } }) {
  const video = getVideoEventBySlug(params.slug);
  const name = video ? (video.talkTitle ?? video.title) : "Recording";
  return { title: `${name} · TSN Member Recordings` };
}

export default async function MemberVideoPage({
  params,
}: {
  params: { slug: string };
}) {
  await requireActiveMember();

  const video = getVideoEventBySlug(params.slug);
  if (!video) notFound();

  // Privacy-enhanced embed (youtube-nocookie), related videos limited to this
  // channel, no video annotations.
  const embedSrc = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&modestbranding=1`;

  const more = getVideoEvents()
    .filter((v) => v.slug !== video.slug)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={
          <>
            <Link href="/resources/member">Member recordings</Link>
            <span aria-hidden="true">/</span>
            <span>{video.dateLabel ?? formatDate(video.date)}</span>
          </>
        }
        title={video.talkTitle ?? video.title}
      />

      <section className="pt-14 pb-4 md:pt-16">
        <Container>
          <div className="mx-auto max-w-[880px]">
            {/* Player */}
            <div className="overflow-hidden rounded-2xl bg-black shadow-card-lg">
              <div className="relative aspect-video">
                <iframe
                  src={embedSrc}
                  title={video.talkTitle ?? video.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Details */}
            <div className="mt-8">
              <div className="meta">
                <span className="date">{video.dateLabel ?? formatDate(video.date)}</span>
                <span className="cat inline-flex items-center gap-1.5">
                  <Icon name="lock" size={12} /> Members only
                </span>
              </div>

              {(video.speakerName || video.speakerTitle) && (
                <div className="card mt-6 flex items-center gap-5 p-5 md:p-6">
                  {video.speakerPhoto && (
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-surface-2">
                      <Image
                        src={video.speakerPhoto}
                        alt={video.speakerName ?? "Speaker"}
                        fill
                        sizes="80px"
                        className="object-cover object-top"
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-[13.5px] font-semibold text-muted">Speaker</div>
                    {video.speakerName && (
                      <div className="mt-0.5 font-serif text-[18px] font-bold text-navy">
                        {video.speakerName}
                      </div>
                    )}
                    {video.speakerTitle && (
                      <div className="mt-0.5 text-[15px] text-slate">{video.speakerTitle}</div>
                    )}
                  </div>
                </div>
              )}

              {video.excerpt && (
                <p className="mt-6 text-[17px] leading-[1.7] text-slate">{video.excerpt}</p>
              )}

              <div className="mt-8">
                <Link href="/resources/member" className="link">
                  <span aria-hidden="true">←</span>
                  All recordings
                </Link>
              </div>
            </div>

            {/* More recordings */}
            {more.length > 0 && (
              <div className="mt-14 border-t border-line pt-10">
                <h2 className="mb-6 font-serif text-[22px] font-bold text-navy">More recordings</h2>
                <div className="grid gap-4">
                  {more.map((m) => {
                    const t = recordingThumb(m);
                    return (
                      <Link
                        key={m.slug}
                        href={`/resources/member/${m.slug}`}
                        className={`card-line row-hover group ${s.mini}`}
                      >
                        <div className={s.miniPh}>
                          <Image
                            src={t.src}
                            alt=""
                            fill
                            sizes="132px"
                            style={{ objectPosition: t.position }}
                          />
                          <span className={s.miniPlay} aria-hidden="true">
                            <span>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </span>
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="font-serif text-[16px] font-bold leading-snug text-navy group-hover:text-navy-hover">
                            {m.talkTitle ?? m.title}
                          </div>
                          <div className="meta mt-1">
                            <span className="date">{m.dateLabel ?? formatDate(m.date)}</span>
                            {m.speakerName && <span className="date">{m.speakerName}</span>}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
