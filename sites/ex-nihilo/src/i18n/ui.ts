import { createTranslator } from "@websites/core/i18n";

export { languages, type Lang } from "@websites/core/i18n";

export const ui = {
  de: {
    "nav.duo": "Duo",
    "nav.medien": "Medien",
    "nav.konzerte": "Konzerte",
    "nav.presse": "Presse",
    "nav.kontakt": "Kontakt",
    "nav.main": "Hauptnavigation",
    "nav.menu": "Menü",
    skip: "Zum Inhalt springen",
    "footer.legal": "Rechtliches",
    "footer.impressum": "Impressum",
    "footer.datenschutz": "Datenschutzerklärung",
    "footer.contact": "Kontakt",
    "footer.copyright": "© ex nihilo",
    "cta.concerts": "Konzerte ansehen",
    "cta.booking": "Duo anfragen",
  },
  en: {
    "nav.duo": "Duo",
    "nav.medien": "Media",
    "nav.konzerte": "Concerts",
    "nav.presse": "Press",
    "nav.kontakt": "Contact",
    "nav.main": "Main navigation",
    "nav.menu": "Menu",
    skip: "Skip to content",
    "footer.legal": "Legal",
    "footer.impressum": "Imprint (German)",
    "footer.datenschutz": "Privacy policy (German)",
    "footer.contact": "Contact",
    "footer.copyright": "© ex nihilo",
    "cta.concerts": "View concerts",
    "cta.booking": "Book the duo",
  },
} as const;

export type UiKey = keyof typeof ui.de;

export const useTranslations = createTranslator<UiKey>(ui);
