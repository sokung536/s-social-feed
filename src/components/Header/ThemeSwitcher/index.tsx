"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const currentTheme = theme || "system";

  return (
    <div className="flex items-center gap-1 rounded-lg border p-1">
      <Button
        variant={currentTheme === "light" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("light")}
        title={t("common.light")}
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant={currentTheme === "dark" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("dark")}
        title={t("common.dark")}
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant={currentTheme === "system" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("system")}
        title={t("common.system")}
      >
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  );
}
