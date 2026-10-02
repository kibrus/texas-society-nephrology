import Link from "next/link";
import { PageHeader, Container, Icon } from "@/components/ui";
import { requireActiveMember } from "@/lib/auth";
import { getVideoEvents, formatDate } from "@/lib/content";

export const metadata = { title: "Member Recordings · TSN" };

// Gated: requireActiveMember redirects signed-out users to /sign-in and
// non-active members to /member/renew, per the spec access rules.
export const dynamic = "force-dynamic";

// YouTube serves a public thumbnail per video id. hqdefault always exists;
// object-cover crops its 4:3 frame to our 16:9 card cleanly.
function thumb(youtubeId: string) {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

export default async function MemberResourcesPage() {
  const profile = await requireActiveMember();
  const videos = getVideoEvents();

  return (
    <>
      <PageHeader
        eyebrow="MEMBER RESOURCES"
        title="Event Recordings"
        intro={`Welcome, ${profile.first_name}. Catch up on Bayou City Bean Club talks and other TSN sessions, available only to active members.`}
      />
      <Container className="py-14 lg:py-16">
        {videos.length === 0 ? (
          <div className="mx-auto max-w-xl">
            <div className="flex items-start gap-4 rounded-2xl border border-txsn-mint-soft bg-txsn-wash/60 p-6">
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-txsn-teal ring-1 ring-txsn-mint-soft">
                <Icon name="video" size={20} />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-txsn-teal-deep">
                  Recordings are on the way
                </div>
                <p className="mt-1 text-[14px] leading-relaxed text-txsn-slate">
                  New Bayou City Bean Club talks are posted here each month. Your
                  member access is active, so check back soon for the first
                  recording.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-x-7 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, i) => (
              <Link
                key={v.slug}
                href={`/resources/member/${v.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-txsn-mint-soft/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-txsn-teal-deep/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-txsn-teal/40 focus-visible:ring-offset-2"
              >
                {/* Thumbnail with play overlay */}
                <div className="relative aspect-video overflow-hidden bg-txsn-teal-deep">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumb(v.youtubeId as string)}
                    alt={v.talkTitle ?? v.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-txsn-teal-deep/10 transition-colors duration-300 group-hover:bg-txsn-teal-deep/25" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-txsn-teal shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Icon name="play" size={24} className="ml-0.5" />
                    </span>
                  </div>
                  {i === 0 && (
                    <span className="absolute left-3 top-3 rounded-full bg-txsn-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Latest
                    </span>
                  )}
                </div>

                {/* Meta */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-1.5 text-[12px] text-txsn-slate">
                    <Icon name="calendar" size={13} className="text-txsn-teal" />
                    {v.dateLabel ?? formatDate(v.date)}
                  </div>
                  <h2 className="mt-2 font-serif text-[18px] font-medium leading-snug text-txsn-teal-deep">
                    {v.talkTitle ?? v.title}
                  </h2>
                  {v.speakerName && (
                    <div className="mt-1.5 text-[13.5px] text-txsn-slate">
                      {v.speakerName}
                    </div>
                  )}
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold text-txsn-teal">
                    Watch recording
                    <Icon
                      name="arrow"
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
