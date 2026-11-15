import { createRoutes } from "@websites/core/i18n";
import type { Lang } from "./ui";

export { withBase } from "@websites/core/base";
export { getLangFromUrl } from "@websites/core/i18n";

/** Pages in navigation order */
export const pages = ["cv", "projects", "contact"] as const;
export type PageKey = (typeof pages)[number] | "home";

export const slugMap: Record<Lang, Record<PageKey, string>> = {
  de: { home: "", cv: "lebenslauf", projects: "projekte", contact: "kontakt" },
  en: { home: "", cv: "cv", projects: "projects", contact: "contact" },
};

export const { localizedPath, pageFromPath, switchLangPath } =
  createRoutes(slugMap);
