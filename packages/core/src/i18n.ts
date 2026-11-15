import { stripBase, withBase } from "./base";

/**
 * Every site is bilingual. German comes first: legal pages (Impressum,
 * Datenschutz) exist in German only, and German is the fallback language.
 */
export const languages = { de: "Deutsch", en: "English" } as const;
export type Lang = keyof typeof languages;

/** BCP 47 locale per language, for Intl date and number formatting. */
export const locales: Record<Lang, string> = { de: "de-DE", en: "en-GB" };

export function otherLang(lang: Lang): Lang {
  return lang === "de" ? "en" : "de";
}

export function getLangFromUrl(url: URL): Lang {
  return stripBase(url.pathname).startsWith("/en") ? "en" : "de";
}

/** A string that exists in both languages, e.g. from a content collection. */
export type Localized<T = string> = Record<Lang, T>;

/**
 * Typed UI-string lookup. Astro has no built-in t(), so each site keeps a
 * `{ de: {...}, en: {...} }` map and gets a translator per language from it.
 */
export function createTranslator<Key extends string>(
  ui: Record<Lang, Record<Key, string>>,
) {
  return (lang: Lang) =>
    (key: Key): string =>
      ui[lang][key];
}

/**
 * Localized routing from a slug map: `{ de: { home: "", cv: "lebenslauf" },
 * en: { home: "", cv: "cv" } }`. The key "home" is the language root.
 */
export function createRoutes<Page extends string>(
  slugMap: Record<Lang, Record<Page | "home", string>>,
) {
  type PageKey = Page | "home";

  function localizedPath(lang: Lang, page: PageKey): string {
    const slug = slugMap[lang][page];
    return withBase(slug ? `/${lang}/${slug}/` : `/${lang}/`);
  }

  function pageFromPath(pathname: string, lang: Lang): PageKey {
    const segment = stripBase(pathname)
      .replace(`/${lang}/`, "")
      .replace(/\/$/, "");
    const match = (Object.keys(slugMap[lang]) as PageKey[]).find(
      (key) => slugMap[lang][key] === segment,
    );
    return match ?? "home";
  }

  /** Language toggle target: same page, other language. */
  function switchLangPath(current: Lang, page: PageKey): string {
    return localizedPath(otherLang(current), page);
  }

  return { localizedPath, pageFromPath, switchLangPath };
}
