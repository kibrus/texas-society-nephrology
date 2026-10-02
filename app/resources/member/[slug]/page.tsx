import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Icon } from "@/components/ui";
import { requireActiveMember } from "@/lib/auth";
import { getVideoEvents, getVideoEventBySlug, formatDate } from "@/lib/content";

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
    <div className="bg-txsn-paper">
      <Container className="py-10 lg:py-14">
        <Link
          href="/resources/member"
          className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-txsn-teal transition-all hover:gap-2.5"
        >
          <Icon name="arrow" size={14} className="rotate-180" /> All recordings
        </Link>

        <div className="mx-auto max-w-3xl">
          {/* Player */}
          <div className="overflow-hidden rounded-2xl border border-txsn-mint-soft/60 bg-black shadow-sm">
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
          <div className="mt-7">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-txsn-slate">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="calendar" size={14} className="text-txsn-teal" />
                {video.dateLabel ?? formatDate(video.date)}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-txsn-mint/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-txsn-teal ring-1 ring-txsn-mint/40">
                <Icon name="lock" size={12} /> Members only
              </span>
            </div>

            <h1 className="mt-3 font-serif text-2xl font-medium leading-tight text-txsn-teal-deep lg:text-[2rem]">
              {video.talkTitle ?? video.title}
            </h1>

            {(video.speakerName || video.speakerTitle) && (
              <div className="mt-4 flex items-center gap-4 rounded-xl border border-txsn-mint-soft bg-white p-4">
                {video.speakerPhoto && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={video.speakerPhoto}
                    alt={video.speakerName ?? "Speaker"}
                    className="h-14 w-14 flex-shrink-0 rounded-lg object-cover object-top ring-1 ring-txsn-mint-soft"
                  />
                )}
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-txsn-gold">
                    Speaker
                  </div>
                  {video.speakerName && (
                    <div className="font-serif text-[16px] font-medium text-txsn-teal-deep">
                      {video.speakerName}
                    </div>
                  )}
                  {video.speakerTitle && (
                    <div className="text-[13px] text-txsn-slate">
                      {video.speakerTitle}
                    </div>
                  )}
                </div>
              </div>
            )}

            {video.excerpt && (
              <p className="mt-5 text-[15px] leading-relaxed text-txsn-slate">
                {video.excerpt}
              </p>
            )}
          </div>

          {/* More recordings */}
          {more.length > 0 && (
            <div className="mt-12 border-t border-txsn-mint-soft/60 pt-8">
              <h2 className="mb-4 font-serif text-lg font-medium text-txsn-teal-deep">
                More recordings
              </h2>
              <div className="grid gap-3">
                {more.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/resources/member/${m.slug}`}
                    className="group flex items-center gap-4 rounded-xl border border-txsn-mint-soft/60 bg-white p-3 transition-colors hover:bg-txsn-wash/60"
                  >
                    <div className="relative aspect-video w-32 flex-shrink-0 overflow-hidden rounded-lg bg-txsn-teal-deep">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.videoThumbnail ?? `https://i.ytimg.com/vi/${m.youtubeId}/hqdefault.jpg`}
                        alt={m.talkTitle ?? m.title}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-txsn-teal">
                          <Icon name="play" size={14} className="ml-0.5" />
                        </span>
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-serif text-[15px] font-medium text-txsn-teal-deep">
                        {m.talkTitle ?? m.title}
                      </div>
                      <div className="mt-0.5 text-[12.5px] text-txsn-slate">
                        {m.dateLabel ?? formatDate(m.date)}
                        {m.speakerName ? ` · ${m.speakerName}` : ""}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
