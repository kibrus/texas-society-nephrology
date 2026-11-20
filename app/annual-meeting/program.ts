import { annualMeeting } from "@/lib/site";

export type Slot = (typeof annualMeeting.schedule)[number];

// "When the Kidneys Fail, the Brain Pays – Dr. Jochen Reiser" → title + speaker.
export function splitSession(session: string): { title: string; speaker?: string } {
  const i = session.lastIndexOf(" – ");
  if (i === -1) return { title: session };
  return { title: session.slice(0, i), speaker: session.slice(i + 3) };
}

// "11:15 AM – 11:45 AM" → "11:15 AM"
export function startTime(time: string): string {
  return time.split(" – ")[0];
}

// Talks with a named speaker, excluding the opening plenary.
export function programHighlights(): Slot[] {
  return annualMeeting.schedule.filter(
    (s) => s.track !== "Plenary" && Boolean(splitSession(s.session).speaker),
  );
}
