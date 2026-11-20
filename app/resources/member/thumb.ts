import type { EventItem } from "@/lib/content";

// Card image for a recording: branded thumbnail, else the speaker's photo
// (portrait, so anchored to the top), else the generic event photo.
export function recordingThumb(v: Pick<EventItem, "videoThumbnail" | "speakerPhoto">): {
  src: string;
  position: string;
} {
  if (v.videoThumbnail) return { src: v.videoThumbnail, position: "center" };
  if (v.speakerPhoto) return { src: v.speakerPhoto, position: "center 20%" };
  return { src: "/images/site/events/fallback.webp", position: "center" };
}
