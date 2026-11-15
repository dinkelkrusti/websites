import type { APIRoute } from "astro";
import { withBase } from "@websites/core/base";

// Generated instead of a static file so the sitemap URL always matches the
// domain the build is for (staging or production).
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(withBase("/sitemap-index.xml"), site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
