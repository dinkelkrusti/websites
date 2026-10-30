import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n/ui";

export type Concert = CollectionEntry<"concerts">;

export async function getConcerts() {
  const concerts = await getCollection("concerts");
  const sorted = concerts.sort(
    (a, b) => a.data.date.getTime() - b.data.date.getTime(),
  );
  const now = new Date();
  return {
    upcoming: sorted.filter((c) => c.data.date >= now),
    past: sorted.filter((c) => c.data.date < now).reverse(), // most recent first
  };
}

// Date formatting per locale via Intl — never hand-built date strings
export function formatConcertDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
