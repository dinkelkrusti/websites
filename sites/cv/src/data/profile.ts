import type { Localized } from "@websites/core/i18n";

/**
 * Personal data in one place. Header, home page, CV, contact page,
 * Impressum and Datenschutz all read from here.
 */
export const profile = {
  name: "Erik Wittemeier",
  role: {
    de: "Full-Stack-Softwareentwickler",
    en: "Full-Stack Software Engineer",
  } as Localized,
  /** One-sentence pitch for the home page */
  intro: {
    de: "Ich entwickle benutzerfreundliche Lösungen für komplexe Fachdomänen – vom Backend bis ins Frontend.",
    en: "I build user-friendly solutions for complex domains – from the backend to the frontend.",
  } as Localized,
  /** Shown on the CV page and in print */
  location: { de: "Aachen", en: "Aachen, Germany" } as Localized,
  email: "erik@wittemeier.net",
  /** Full postal address for Impressum and Datenschutz (§ 5 DDG) */
  address: "[Straße Hausnummer], [PLZ] Aachen, Deutschland",
  links: [{ label: "GitHub", url: "https://github.com/dinkelkrusti" }],
  interests: {
    de: [
      "Musik in großer Bandbreite: Klassik, Electronic und andere zeitgenössische Genres",
      "Grand-Strategy- und Aufbauspiele",
    ],
    en: [
      "A broad taste in music: classical, electronic and other contemporary genres",
      "Grand strategy and builder games",
    ],
  } as Localized<string[]>,
} as const;

/**
 * How the web server writes access logs. The Datenschutzerklärung states
 * these values, so they must match the server's nginx/Caddy configuration.
 */
export const serverLogs = {
  retentionDays: 14,
  ipShortened: false,
} as const;
