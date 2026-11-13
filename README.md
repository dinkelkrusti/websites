# ex nihilo — website

Official website of **ex nihilo**, a classical duo from Aachen:
Violeta Kadesha (violin) and Jakob Grabenhorst (cello, voice).

- Production: <https://duo-ex-nihilo.de>
- Staging (noindex): <https://dinkelkrusti.github.io/websites/>

Static [Astro](https://docs.astro.build) site, German and English, zero
client JS, self-hosted fonts, no cookies and no third-party requests
before the YouTube consent click.

## Commands

| Command            | Action                                 |
| :----------------- | :------------------------------------- |
| `pnpm install`     | Install dependencies (Node ≥ 22.23.4)  |
| `pnpm dev`         | Dev server at `localhost:4321`         |
| `pnpm build`       | Build to `./dist/`                     |
| `pnpm preview`     | Preview the build locally              |
| `pnpm lint`        | ESLint (incl. jsx-a11y)                |
| `pnpm format:read` | Prettier check (`format:write` to fix) |
| `pnpm astro:check` | Type and template checks               |

## Structure

```text
src/
├── pages/de/, pages/en/   # thin route files per language
├── components/pages/      # shared page components (Home, Duo, Media, …)
├── components/            # Header, Footer, VideoEmbed, JsonLd, …
├── content/               # concerts (YAML), photos, press quotes
├── i18n/                  # UI strings + helpers
├── layouts/BaseLayout.astro
└── styles/tokens.css      # design tokens, print styles
```

Impressum, Datenschutz and the press kit (`/de/presse-kit/`, noindex)
exist in German only.

## Content

- **Concerts:** add `src/content/concerts/YYYY-MM-DD-city.yaml` with
  `date`, `venue`, `city`, `program.de`, `program.en`, optional `link`.
- **Photos:** a `.md` file in `src/content/photos/` pointing to an image
  in `src/assets/`. `alt` is required — the build fails without it.
- **Press quotes:** `src/content/quotes/*.md` with `quote`, `source`,
  optional `url`. Keep the original wording.

## Deployment

On push to `main`:

- `deploy.yml` — lint, format, type and link checks, then a noindex
  staging build to GitHub Pages.
- `hetzner.yml` — the same checks, then a production build
  (`SITE_URL=https://duo-ex-nihilo.de`, `BASE_PATH=/`) rsynced to Hetzner.

Pull requests run `pr-checks.yml`; `check-links.yml` runs daily and opens
an issue on broken links.

## Release checks

- [Performance budget](docs/performance-budget.md)
- [QA checklist](docs/qa-checklist.md)
