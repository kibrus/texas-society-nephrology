import {
  Hero,
  Pillars,
  NewsPreview,
  EventsPreview,
  Partners,
  JoinCTA,
} from "@/components/home/sections";
import { getLatestNews, getUpcomingEvents } from "@/lib/content";

export default function HomePage() {
  const news = getLatestNews(3);
  const events = getUpcomingEvents(3);

  return (
    <>
      <Hero />
      <Partners />
      <Pillars />
      <NewsPreview posts={news} />
      <EventsPreview events={events} />
      <JoinCTA />
    </>
  );
}
