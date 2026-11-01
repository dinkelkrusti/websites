// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://dinkelkrusti.github.io",
  base: "/websites/",
  integrations: [
    sitemap({
      // Skip the 404 page and the noindex language-picker root.
      // At launch: update the root URL to the new domain.
      filter: (page) =>
        !page.includes("/404") &&
        !page.includes("/presse-kit") &&
        page !== "https://dinkelkrusti.github.io/websites/",
    }),
  ],
});
