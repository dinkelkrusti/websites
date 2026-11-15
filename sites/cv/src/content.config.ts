import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { file, glob } from "astro/loaders";
import { localized, localizedList } from "@websites/core/content";

/**
 * "2022-05" when the month matters, or 2020 for a year only (YAML reads a
 * bare year as a number). Entries without `end` are current.
 */
const partialDate = z
  .union([z.number().int(), z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/)])
  .transform((value): { year: number; month?: number } => {
    const [year, month] = String(value).split("-").map(Number);
    return month ? { year, month } : { year };
  });

const period = {
  start: partialDate,
  end: partialDate.optional(),
};

// One YAML file per position
const experience = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/experience" }),
  schema: z.object({
    role: localized,
    organization: z.string(),
    location: z.string(),
    ...period,
    summary: localized.optional(),
    highlights: localizedList.optional(),
    tech: z.array(z.string()).default([]),
  }),
});

// One YAML file per degree, apprenticeship or school
const education = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/education" }),
  schema: z.object({
    degree: localized,
    institution: z.string(),
    location: z.string(),
    ...period,
    details: localized.optional(),
  }),
});

// One YAML file per project; `featured` ones also appear on the home page
const projects = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    year: z.number().int(),
    summary: localized,
    tech: z.array(z.string()).default([]),
    url: z.url().optional(),
    repo: z.url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(999),
  }),
});

// All skill groups in a single file, each entry needs an `id`.
// Items are plain strings ("Kotlin") or translated ({ de: Deutsch, en: German }).
const skills = defineCollection({
  loader: file("src/content/skills.yaml"),
  schema: z.object({
    label: localized,
    items: z.array(z.union([z.string(), localized])),
    order: z.number().default(999),
  }),
});

export const collections = { experience, education, projects, skills };
