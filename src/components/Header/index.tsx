"use client";

import { ThemeSwitcher } from "@/components/Header/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/Header/LanguageSwitcher";
import { useLoginOverlay } from "@/providers/LoginProvider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import letterS from "@/assets/letter-s.png";

export default function Header() {
  const { showLoginOverlay } = useLoginOverlay();

  return (
    <div className="flex items-center gap-4">
      <Button onClick={showLoginOverlay} variant="default">
        Login
      </Button>
      <LanguageSwitcher />
      <ThemeSwitcher />
    </div>
  );
}
