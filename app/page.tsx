import {
  Hero,
  FeaturedEvent,
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
  const featuredEvent = events[0] ?? null;

  return (
    <>
      <Hero />
      {featuredEvent && <FeaturedEvent event={featuredEvent} />}
      <Partners />
      <Pillars />
      <NewsPreview posts={news} />
      <EventsPreview events={events} />
      <JoinCTA />
    </>
  );
}
