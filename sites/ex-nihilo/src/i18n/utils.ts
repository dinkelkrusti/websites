import { createRoutes } from "@websites/core/i18n";
import type { Lang } from "./ui";

export { BASE, stripBase, withBase } from "@websites/core/base";
export { getLangFromUrl } from "@websites/core/i18n";

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

export const { localizedPath, pageFromPath, switchLangPath } =
  createRoutes(slugMap);
