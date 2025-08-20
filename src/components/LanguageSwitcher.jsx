import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher({ compact = true }) {
  const { i18n } = useTranslation();
  const languages = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" }
  ];
  const changeLang = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
  };
  return (
    <div className={`lang-switcher ${compact ? "lang-switcher--compact" : ""}`}>
      {languages.map((l) => (
        <button
          key={l.code}
          className={`lang-btn ${i18n.language === l.code ? "active" : ""}`}
          onClick={() => changeLang(l.code)}
          aria-label={`Switch language to ${l.label}`}
          type="button"
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
