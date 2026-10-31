import type { Lang } from "./ui";

/**
 * Astro's configured base: '/websites/' on GitHub Pages, '/' once the
 * site moves to its own domain at launch. All internal hrefs go through
 * withBase(), so that move is a config change only — no code changes.
 */
export const BASE = import.meta.env.BASE_URL;

/** Prefix a root-relative path ('/de/…') with the configured base. */
export function withBase(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE}${path.slice(1)}`;
}

/** Inverse for full pathnames: '/websites/de/duo/' → '/de/duo/'. */
export function stripBase(pathname: string): string {
  if (BASE !== "/" && pathname.startsWith(BASE)) {
    return pathname.slice(BASE.length - 1);
  }
  return pathname;
}

export const pages = [
  "duo",
  "medien",
  "konzerte",
  "presse",
  "kontakt",
] as const;
export type PageKey = (typeof pages)[number] | "home";

/** Slug map per language */
export const slugMap: Record<Lang, Record<PageKey, string>> = {
  de: {
    home: "",
    duo: "duo",
    medien: "medien",
    konzerte: "konzerte",
    presse: "presse",
    kontakt: "kontakt",
  },
  en: {
    home: "",
    duo: "duo",
    medien: "media",
    konzerte: "concerts",
    presse: "press",
    kontakt: "contact",
  },
};

export function localizedPath(lang: Lang, page: PageKey): string {
  const slug = slugMap[lang][page];
  return withBase(slug ? `/${lang}/${slug}/` : `/${lang}/`);
}

export function getLangFromUrl(url: URL): Lang {
  return stripBase(url.pathname).startsWith("/en") ? "en" : "de";
}

export function pageFromPath(pathname: string, lang: Lang): PageKey {
  const segment = stripBase(pathname)
    .replace(`/${lang}/`, "")
    .replace(/\/$/, "");
  const match = (Object.keys(slugMap[lang]) as PageKey[]).find(
    (key) => slugMap[lang][key] === segment,
  );
  return match ?? "home";
}

/** Language toggle target: same page, other language */
export function switchLangPath(current: Lang, page: PageKey): string {
  return localizedPath(current === "de" ? "en" : "de", page);
}
