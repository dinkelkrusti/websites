// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Staging (GitHub Pages) by default; production overrides both in CI.
const site = process.env.SITE_URL ?? "https://dinkelkrusti.github.io";
const base = process.env.BASE_PATH ?? "/websites";
const root = `${site}${base === "/" ? "" : base}/`;

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [
    sitemap({
      // Skip the 404, the noindex pages, and the language-picker root.
      filter: (page) =>
        !page.includes("/404") &&
        !page.includes("/presse-kit") &&
        page !== root,
    }),
  ],
});
