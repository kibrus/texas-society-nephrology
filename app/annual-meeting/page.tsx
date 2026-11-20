import Image from "next/image";
import Link from "next/link";
import { ArrowLink, Button, Container, Icon, Status } from "@/components/ui";
import { annualMeeting, callForAbstracts } from "@/lib/site";
import { isPastDate } from "@/lib/content";
import { programHighlights, splitSession, startTime } from "./program";
import styles from "./am.module.css";

export const metadata = { title: "Annual Meeting · TSN" };

export default function AnnualMeetingPage() {
  const past = isPastDate(annualMeeting.isoDate);
  const deadlinePassed = isPastDate(callForAbstracts.deadlineIso);
  const highlights = programHighlights();

  return (
    <>
      {/* Photo hero with frosted program panel */}
      <section className={`${styles.hero} on-dark`} data-hero>
        <Image
          src="/images/site/annual-meeting/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          data-parallax
        />
        <Container className={styles.inner}>
          <div className="fade-up">
            <p className={styles.crumb}>
              <Link href="/events" className="hover:text-white hover:underline">
                Events
              </Link>
            </p>
            <div className="mt-4">
              {past ? (
                <Status tone="past" className="!text-white/80">
                  Past event
                </Status>
              ) : (
                <Status tone="live" className="!text-white">
                  Upcoming
                </Status>
              )}
            </div>
            <h1 className="mt-3">{annualMeeting.title}</h1>
            <div className={styles.facts}>
              <span>
                <Icon name="calendar" size={17} className="mt-[3px] shrink-0" />
                {annualMeeting.dateLabel} · {annualMeeting.timeLabel}
              </span>
              <span>
                <Icon name="pin" size={17} className="mt-[3px] shrink-0" />
                {annualMeeting.location}
              </span>
            </div>
            <p className={styles.lede}>{annualMeeting.summary}</p>
            <div className={styles.ctas}>
              <Button href="/annual-meeting/schedule" variant="white" arrow>
                Full schedule
              </Button>
              {!past && (
                <Button href="/annual-meeting/register" variant="glass">
                  Register
                </Button>
              )}
              <Button href="/annual-meeting/abstracts" variant="glass">
                Call for abstracts
              </Button>
            </div>
          </div>

          {highlights.length > 0 && (
            <div className="glass-panel fade-up" style={{ animationDelay: ".15s" }}>
              <h2 className={styles.panelTitle}>Program highlights</h2>
              {highlights.map((slot) => {
                const { title, speaker } = splitSession(slot.session);
                return (
                  <div key={slot.time} className={styles.talk}>
                    <time>{startTime(slot.time)}</time>
                    <div>
                      <b>{title}</b>
                      {speaker && <span>{speaker}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Program at a glance + abstracts */}
      <section className="pad">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
            <div>
              <h2 className="h-display rv">Program at a glance</h2>
              <p className="rv mt-4 max-w-xl text-[17.5px] leading-relaxed text-slate">
                {annualMeeting.eventName}. {annualMeeting.dateLabel}, {annualMeeting.timeLabel}.
              </p>
              <ol className="mt-8 grid gap-2.5">
                {annualMeeting.schedule.map((slot, i) => (
                  <li
                    key={slot.time}
                    className="card-line rv grid gap-1 px-5 py-4 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-5"
                    style={{ transitionDelay: `${Math.min(i, 6) * 0.04}s` }}
                  >
                    <span className="text-[14px] font-semibold text-navy">{startTime(slot.time)}</span>
                    <span className="text-[16px] text-ink">{slot.session}</span>
                  </li>
                ))}
              </ol>
              <div className="rv mt-6">
                <ArrowLink href="/annual-meeting/schedule">View the full schedule</ArrowLink>
              </div>
            </div>

            <article className="card card-hover rv" style={{ transitionDelay: ".1s" }}>
              <div className="zoom-img settle relative aspect-[4/3]">
                <Image
                  src="/images/site/annual-meeting/posters.webp"
                  alt="A researcher explaining her poster to colleagues"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="p-7">
                <p className="text-[14px] font-semibold text-muted">{callForAbstracts.subtitle}</p>
                <h2 className="mt-2 font-serif text-[1.5rem] font-bold leading-snug text-navy">
                  {callForAbstracts.title}
                </h2>
                <p className="mt-3 text-[16px] text-slate">
                  Categories: {callForAbstracts.categories.join(", ")}.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-ink">
                  <span>
                    <span className="font-semibold">Deadline:</span> {callForAbstracts.deadlineLabel}
                  </span>
                  {deadlinePassed && <Status tone="past">Closed</Status>}
                </div>
                <div className="mt-6">
                  <ArrowLink href="/annual-meeting/abstracts">Submission guidelines</ArrowLink>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
