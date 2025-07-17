// lib/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import vn from "./locales/vn.json";
import fr from "./locales/fr.json";
import cn from "./locales/cn.json";

const resources = {
  en: { translation: en },
  vn: { translation: vn },
  fr: { translation: fr },
  cn: { translation: cn },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: "vn",
      fallbackLng: "vn",
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
      },
    });
}

export default i18n;
