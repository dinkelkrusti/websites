import { getCollection, type CollectionEntry } from "astro:content";
import { locales, type Lang } from "@websites/core/i18n";

/** A date from the CV: year, plus month where it is known. */
export type PartialDate = { year: number; month?: number };

type Dated = { data: { start: PartialDate; end?: PartialDate } };

/** Year-only dates count as January for starts and December for ends. */
const timeOf = (date: PartialDate, fallbackMonth: number) =>
  Date.UTC(date.year, (date.month ?? fallbackMonth) - 1);

/** Current entries (no end date) first, then by end date, newest first. */
function byRecency(a: Dated, b: Dated): number {
  const endA = a.data.end ? timeOf(a.data.end, 12) : Infinity;
  const endB = b.data.end ? timeOf(b.data.end, 12) : Infinity;
  if (endA !== endB) return endB - endA;
  return timeOf(b.data.start, 1) - timeOf(a.data.start, 1);
}

export async function getExperience(): Promise<
  CollectionEntry<"experience">[]
> {
  return (await getCollection("experience")).sort(byRecency);
}

export async function getEducation(): Promise<CollectionEntry<"education">[]> {
  return (await getCollection("education")).sort(byRecency);
}

export async function getSkills(): Promise<CollectionEntry<"skills">[]> {
  return (await getCollection("skills")).sort(
    (a, b) => a.data.order - b.data.order,
  );
}

/** By `order`, then newest year first. */
export async function getProjects(): Promise<CollectionEntry<"projects">[]> {
  return (await getCollection("projects")).sort(
    (a, b) => a.data.order - b.data.order || b.data.year - a.data.year,
  );
}

export async function getFeaturedProjects(): Promise<
  CollectionEntry<"projects">[]
> {
  return (await getProjects()).filter((project) => project.data.featured);
}

/** "Mai 2022" / "May 2022", or just "2020" for year-only dates. */
function formatPartialDate(date: PartialDate, lang: Lang): string {
  if (date.month === undefined) return String(date.year);
  return new Intl.DateTimeFormat(locales[lang], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(Date.UTC(date.year, date.month - 1));
}

/** "Mai 2022 – heute", "2020 – 2021" */
export function formatPeriod(
  start: PartialDate,
  end: PartialDate | undefined,
  lang: Lang,
  presentLabel: string,
): string {
  const until = end ? formatPartialDate(end, lang) : presentLabel;
  return `${formatPartialDate(start, lang)} – ${until}`;
}
