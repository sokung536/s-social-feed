"use client";

import { cn } from "@/lib/utils";
import SocialFeedMain from "./SocialFeedMain";

export default function Home() {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center bg-secondary"
      )}
    >
      <div
        className={cn(
          "relative flex w-full flex-1 flex-col items-center font-mitr"
        )}
      >
        <SocialFeedMain />
      </div>
    </div>
  );
}
