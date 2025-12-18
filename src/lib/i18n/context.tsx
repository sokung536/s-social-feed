"use client";

import * as React from "react";
import enTranslations from "./translations/en.json";
import thTranslations from "./translations/th.json";

type Language = "th" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  en: enTranslations,
  th: thTranslations,
};

export function LanguageProvider({
  children,
  defaultLanguage = "en",
}: {
  children: React.ReactNode;
  defaultLanguage?: Language;
}) {
  const [language, setLanguage] = React.useState<Language>(defaultLanguage);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("language") as Language | null;
    if (saved && (saved === "th" || saved === "en")) {
      setLanguage(saved);
    }
  }, []);

  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language);
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const t = React.useCallback(
    (key: string): string => {
      const keys = key.split(".");
      let value: any = translations[language];
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) return key;
      }
      return typeof value === "string" ? value : key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
