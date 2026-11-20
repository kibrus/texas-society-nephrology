import Link from "next/link";
import Image from "next/image";
import { PageHeader, Container, Icon } from "@/components/ui";
import { requireActiveMember } from "@/lib/auth";
import { getVideoEvents, formatDate } from "@/lib/content";
import { recordingThumb } from "./thumb";
import s from "./talk.module.css";

export const metadata = { title: "Member Recordings · TSN" };

// Gated: requireActiveMember redirects signed-out users to /sign-in and
// non-active members to /member/renew, per the spec access rules.
export const dynamic = "force-dynamic";

export default async function MemberResourcesPage() {
  const profile = await requireActiveMember();
  const videos = getVideoEvents();

  return (
    <>
      <PageHeader
        eyebrow="Member resources"
        title="Event Recordings"
        intro={`Welcome, ${profile.first_name}. Catch up on Bayou City Bean Club talks and other TSN sessions, available only to active members.`}
      />
      <section className="pad">
        <Container>
          {videos.length === 0 ? (
            <div className="card mx-auto flex max-w-xl items-start gap-5 p-8">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-surface-2 text-navy">
                <Icon name="video" size={22} />
              </span>
              <div>
                <h2 className="font-serif text-[20px] font-bold text-navy">Recordings are on the way</h2>
                <p className="mt-2 text-[16px] leading-[1.65] text-slate">
                  New Bayou City Bean Club talks are posted here each month. Your
                  member access is active, so check back soon for the first
                  recording.
                </p>
              </div>
            </div>
          ) : (
            <div className={s.grid}>
              {videos.map((v, i) => {
                const t = recordingThumb(v);
                return (
                  <div key={v.slug} className="rv" style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
                    <Link href={`/resources/member/${v.slug}`} className={`${s.talk} spot`} data-tilt>
                      <div className={`${s.ph} tilt`}>
                        <Image
                          src={t.src}
                          alt=""
                          fill
                          sizes="(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          style={{ objectPosition: t.position }}
                        />
                        <span className={s.play} aria-hidden="true">
                          <span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </span>
                      </div>
                      <div className={s.body}>
                        <h2>{v.talkTitle ?? v.title}</h2>
                        {v.speakerName && <p className={s.who}>{v.speakerName}</p>}
                        {v.speakerTitle && <p className={s.role}>{v.speakerTitle}</p>}
                        <div className={s.row}>
                          <span>{v.dateLabel ?? formatDate(v.date)}</span>
                          <span className={s.lock}>
                            <Icon name="lock" size={12} />
                            Members only
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
