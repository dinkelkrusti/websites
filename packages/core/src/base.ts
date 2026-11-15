/**
 * Base-path helpers. Staging serves every site under a sub-path of GitHub
 * Pages ('/websites/<site>/'); production serves each site at its domain
 * root ('/'). All internal hrefs go through withBase(), so moving between
 * the two is a config change only — no code changes.
 */
const rawBase = import.meta.env.BASE_URL;

/** Always has a trailing slash: '/websites/cv/' on staging, '/' in production. */
export const BASE = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

/** Prefix a root-relative path ('/de/…') with the configured base. */
export function withBase(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE}${path.slice(1)}`;
}

/** Inverse for full pathnames: '/websites/cv/de/' → '/de/'. */
export function stripBase(pathname: string): string {
  if (BASE !== "/" && pathname.startsWith(BASE)) {
    return pathname.slice(BASE.length - 1);
  }
  return pathname;
}
