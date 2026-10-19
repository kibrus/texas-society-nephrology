import {
  Hero,
  // FeaturedEvent, // "Next Event" bar hidden for now — re-add below to restore
  // BrochureFeature, // Bean Club feature removed (event has passed) — re-add to restore
  SummitFeature,
  Pillars,
  NewsPreview,
  EventsPreview,
  JoinCTA,
} from "@/components/home/sections";
import { Partners } from "@/components/home/Partners";
import { ScrollRevealInit } from "@/components/home/ScrollRevealInit";
import { getLatestNews, getUpcomingEvents } from "@/lib/content";

export default function HomePage() {
  const news = getLatestNews(3);
  const events = getUpcomingEvents(3);

  return (
    <>
      <ScrollRevealInit />
      <Hero />
      {/* "Next Event" bar hidden for now:
          {featuredEvent && <FeaturedEvent event={featuredEvent} />} */}
      {/* Bean Club feature removed — event has passed:
          <BrochureFeature /> */}
      <Partners />
      <SummitFeature />
      <Pillars />
      <NewsPreview posts={news} />
      <EventsPreview events={events} />
      <JoinCTA />
    </>
  );
}
