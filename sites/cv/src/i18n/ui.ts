import { createTranslator } from "@websites/core/i18n";

export { languages, type Lang } from "@websites/core/i18n";

export const ui = {
  de: {
    "nav.cv": "Lebenslauf",
    "nav.projects": "Projekte",
    "nav.contact": "Kontakt",
    "nav.main": "Hauptnavigation",
    skip: "Zum Inhalt springen",
    "footer.legal": "Rechtliches",
    "footer.impressum": "Impressum",
    "footer.datenschutz": "Datenschutzerklärung",
    "cv.experience": "Berufserfahrung",
    "cv.education": "Ausbildung",
    "cv.skills": "Kenntnisse",
    "cv.interests": "Interessen",
    "cv.present": "heute",
    "cv.printHint": "Als PDF speichern: Strg + P (Mac: ⌘ + P).",
    "projects.code": "Code",
    "projects.live": "Website",
    "projects.all": "Alle Projekte",
    "cta.cv": "Lebenslauf ansehen",
    "cta.contact": "Kontakt aufnehmen",
  },
  en: {
    "nav.cv": "CV",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.main": "Main navigation",
    skip: "Skip to content",
    "footer.legal": "Legal",
    "footer.impressum": "Imprint (German)",
    "footer.datenschutz": "Privacy policy (German)",
    "cv.experience": "Experience",
    "cv.education": "Education",
    "cv.skills": "Skills",
    "cv.interests": "Interests",
    "cv.present": "present",
    "cv.printHint": "Save as PDF: Ctrl + P (Mac: ⌘ + P).",
    "projects.code": "Code",
    "projects.live": "Website",
    "projects.all": "All projects",
    "cta.cv": "View CV",
    "cta.contact": "Get in touch",
  },
} as const;

export type UiKey = keyof typeof ui.de;

export const useTranslations = createTranslator<UiKey>(ui);
