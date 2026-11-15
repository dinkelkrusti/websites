# websites

Static websites built with [Astro](https://docs.astro.build), sharing one
toolchain, one CI/CD pipeline and one Hetzner server.

| Site                      | Folder             | Production                 | Staging (noindex)                                    |
| :------------------------ | :----------------- | :------------------------- | :--------------------------------------------------- |
| ex nihilo — classical duo | `sites/ex-nihilo/` | <https://duo-ex-nihilo.de> | <https://dinkelkrusti.github.io/websites/ex-nihilo/> |
| Erik Wittemeier — CV      | `sites/cv/`        | not live yet               | <https://dinkelkrusti.github.io/websites/cv/>        |

All sites follow the same rules: German and English, zero client JS beyond
what a feature needs, self-hosted fonts, no cookies, no tracking, and no
third-party requests without consent. Impressum and Datenschutz are German.

## Layout

```text
packages/core/     shared code, imported as @websites/core/…
  src/base.ts        base-path helpers (staging sub-path vs. domain root)
  src/i18n.ts        languages, translator and localized routing factories
  src/content.ts     zod helpers for bilingual content
  src/styles/        base.css: reset, focus, skip link, motion, print
  src/components/    Document (HTML shell), SeoHead, JsonLd,
                     legal/Impressum, legal/LegalArticle, legal/privacy/*
sites/<site>/      one Astro project per site (pages, content, tokens.css)
.github/           composite setup action, checks + deploy workflows
```

Each site defines its own design tokens in `src/styles/tokens.css`; the
semantic variables the shared base styles expect are listed at the top of
`packages/core/src/styles/base.css`.

## Commands

Run from the repository root.

| Command              | Action                                              |
| :------------------- | :-------------------------------------------------- |
| `pnpm install`       | Install dependencies for all sites (Node ≥ 22.23.4) |
| `pnpm dev:ex-nihilo` | Dev server for ex nihilo at `localhost:4321`        |
| `pnpm dev:cv`        | Dev server for the CV site at `localhost:4321`      |
| `pnpm build`         | Build every site into `sites/<site>/dist/`          |
| `pnpm lint`          | ESLint (incl. jsx-a11y) over the whole repo         |
| `pnpm format:read`   | Prettier check (`format:write` to fix)              |
| `pnpm astro:check`   | Type and template checks for every site             |

For a single site: `pnpm --filter cv build`, `pnpm --filter cv preview`, …

## Content

- **ex nihilo:** concerts, photos and press quotes in
  `sites/ex-nihilo/src/content/`.
- **CV:** personal data in `sites/cv/src/data/profile.ts`; experience,
  education, projects (one YAML file each) and `skills.yaml` in
  `sites/cv/src/content/`. Schemas: `sites/cv/src/content.config.ts`.

## CI/CD

- `checks.yml` — on pull requests and before every deploy: format, lint,
  `astro check`, build, offline link check.
- `deploy.yml` — on push to `main`, after the checks:
  - **staging:** every site in `SITES` is built under `/websites/<site>/`
    and published to GitHub Pages as one artifact;
  - **production:** each site in the matrix is built for its domain and
    rsynced to its own web root on the Hetzner server.
- `check-links.yml` — daily link check, opens an issue on failure.

Adding a site to the server: see [docs/hosting.md](docs/hosting.md).

## Release checks (ex nihilo)

- [Performance budget](sites/ex-nihilo/docs/performance-budget.md)
- [QA checklist](sites/ex-nihilo/docs/qa-checklist.md)
