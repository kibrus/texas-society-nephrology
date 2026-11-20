import { PartnerStrip } from "@/components/site/PartnerStrip";
import {
  Hero,
  ActionBar,
  Pillars,
  AnnualMeetingBand,
  EventsSection,
  NewsRow,
  Divider,
  Talks,
} from "@/components/home/sections";
import {
  getLatestNews,
  getNextEvent,
  getPastEvents,
  getUpcomingEvents,
  getVideoEvents,
} from "@/lib/content";

export const revalidate = 3600;

export default function HomePage() {
  // Everything below is derived from content/ at request time (ISR), so the
  // "next" and "past" events move automatically as dates pass.
  const next = getNextEvent();
  const upcoming = getUpcomingEvents(4);
  const past = getPastEvents(3);
  const news = getLatestNews(3);
  const talks = getVideoEvents().slice(0, 2);

  return (
    <>
      <Hero />
      <ActionBar next={next} />
      <PartnerStrip />
      <Pillars />
      <AnnualMeetingBand />
      <EventsSection next={next} upcoming={upcoming} past={past} />
      <NewsRow posts={news} />
      <Divider />
      <Talks talks={talks} />
    </>
  );
}
