import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// Concerts: language-neutral data, localized program text
const concerts = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/concerts" }),
  schema: z.object({
    date: z.coerce.date(),
    venue: z.string(),
    city: z.string(),
    program: z.object({
      de: z.string(),
      en: z.string(),
    }),
    link: z.url().optional(),
  }),
});

// Photos: alt text is REQUIRED — build fails without it
const photos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/photos" }),
  schema: ({ image }) =>
    z.object({
      image: image(),
      alt: z.string().min(1, "Alt-Text ist Pflicht"),
      order: z.number().default(999),
      caption: z
        .object({
          de: z.string().optional(),
          en: z.string().optional(),
        })
        .optional(),
    }),
});

// Press quotes: original wording kept, never paraphrased
const quotes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/quotes" }),
  schema: z.object({
    quote: z.string(),
    source: z.string(), // e.g. "Süddeutsche Zeitung, 12.03.2026"
    url: z.url().optional(),
  }),
});

export const collections = { concerts, photos, quotes };
