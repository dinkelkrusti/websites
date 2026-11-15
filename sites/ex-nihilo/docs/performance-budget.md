# Performance Budget — ex nihilo

Baseline: static Astro output, zero client JS, self-hosted fonts,
third-party requests only after YouTube opt-in click.

## Budgets (per page, built output, measured on dist/)

| Metric                        | Budget                      |
| ----------------------------- | --------------------------- |
| Total page weight (initial)   | ≤ 500 KB                    |
| Render-blocking JS            | 0 KB                        |
| Images (per page)             | ≤ 300 KB initial            |
| Fonts                         | ≤ 150 KB (2 variable woff2) |
| Requests before consent click | 0 third-party               |

## Lighthouse targets (mobile preset, throttled)

| Category       | Target |
| -------------- | ------ |
| Performance    | ≥ 90   |
| Accessibility  | ≥ 90   |
| Best Practices | ≥ 90   |
| SEO            | ≥ 90   |

## Protocol (per release, manual — also QA step 8.3)

1. `pnpm build && pnpm preview`
2. Chrome → incognito → DevTools → Lighthouse tab
3. Device: Mobile, all categories, "Apply throttling"
4. Run against `/de/`, `/de/medien/`, `/en/concerts/`
5. Record all four scores per page in the release notes
6. A budget breach blocks the release until fixed or the budget is
   consciously revised in this file (with date + reason)

## Third-party whitelist

- `youtube-nocookie.com` — only after per-element click (§ 25 TDDDG)
- nothing else. GitHub Pages/Fastly CDN serves the site itself.
