import { z } from "astro/zod";

/** Schema for a text that every content entry must provide in both languages. */
export const localized = z.object({ de: z.string(), en: z.string() });

/** Same, for lists (e.g. bullet points per language). */
export const localizedList = z.object({
  de: z.array(z.string()),
  en: z.array(z.string()),
});
