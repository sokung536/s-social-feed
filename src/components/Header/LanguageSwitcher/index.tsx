"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-lg border p-1">
      <Button
        variant={language === "th" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("th")}
      >
        ไทย
      </Button>
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
      >
        EN
      </Button>
    </div>
  );
}
