import type { Lang } from "./ui";

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
  return slug ? `/${lang}/${slug}/` : `/${lang}/`;
}

export function getLangFromUrl(url: URL): Lang {
  return url.pathname.startsWith("/en") ? "en" : "de";
}

export function pageFromPath(pathname: string, lang: Lang): PageKey {
  const segment = pathname.replace(`/${lang}/`, "").replace(/\/$/, "");
  const match = (Object.keys(slugMap[lang]) as PageKey[]).find(
    (key) => slugMap[lang][key] === segment,
  );
  return match ?? "home";
}

/** Language toggle target: same page, other language */
export function switchLangPath(current: Lang, page: PageKey): string {
  return localizedPath(current === "de" ? "en" : "de", page);
}
