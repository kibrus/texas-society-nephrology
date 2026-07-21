import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  author?: string;
  excerpt: string;
  category?: string;
  content: string;
};

export type EventItem = {
  slug: string;
  title: string;
  date: string;
  endDate?: string;
  time?: string;
  location: string;
  isFree: boolean;
  memberDiscount: boolean;
  excerpt: string;
  content: string;
  href?: string;
  brochurePdf?: string;
  sponsor?: string;
};

function readCollection(folder: string) {
  const dir = path.join(contentDir, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { slug, data, content };
    });
}

export function getAllNews(): NewsPost[] {
  return readCollection("news")
    .map(({ slug, data, content }) => ({
      slug,
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      author: data.author,
      excerpt: data.excerpt ?? "",
      category: data.category,
      content,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatestNews(count = 3): NewsPost[] {
  return getAllNews().slice(0, count);
}

export function getNewsBySlug(slug: string): NewsPost | undefined {
  return getAllNews().find((p) => p.slug === slug);
}

export function getAllEvents(): EventItem[] {
  const events = readCollection("events").map(({ slug, data, content }) => ({
    slug,
    title: data.title ?? "Untitled",
    date: data.date ?? "",
    endDate: data.endDate,
    time: data.time,
    location: data.location ?? "TBD",
    isFree: data.isFree ?? true,
    memberDiscount: data.memberDiscount ?? false,
    excerpt: data.excerpt ?? "",
    content,
    href: data.href,
    brochurePdf: data.brochurePdf,
    sponsor: data.sponsor,
  }));

  const upcoming = events.filter((e) => !isPastDate(e.date)).sort((a, b) => (a.date > b.date ? 1 : -1));
  const past = events.filter((e) => isPastDate(e.date)).sort((a, b) => (a.date > b.date ? -1 : 1));

  return [...upcoming, ...past];
}

export function getEventBySlug(slug: string): EventItem | undefined {
  return getAllEvents().find((e) => e.slug === slug);
}

export function getUpcomingEvents(count = 3): EventItem[] {
  const upcoming = getAllEvents().filter((e) => !isPastDate(e.date));
  return upcoming.slice(0, count);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function isPastDate(iso: string): boolean {
  if (!iso) return false;
  const eventDate = new Date(iso + "T23:59:59");
  return eventDate.getTime() < Date.now();
}

export function formatDateShort(iso: string): { month: string; day: string } {
  if (!iso) return { month: "", day: "" };
  const d = new Date(iso + "T00:00:00");
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: d.toLocaleDateString("en-US", { day: "numeric" }),
  };
}
