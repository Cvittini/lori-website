import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/common.json";
import es from "./locales/es/common.json";

i18n
  .use(initReactI18next)
  .init({
    resources: { en: { common: en }, es: { common: es } },
    lng: localStorage.getItem("lang") || (navigator.language || "en").slice(0, 2),
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false }
  });

export default i18n;
