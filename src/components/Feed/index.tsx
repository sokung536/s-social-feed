"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useFeedData } from "@/services/feedMain";
import FeedCard from "./FeedCard";
import FeedCardSkeleton from "./FeedCardSkeleton";

export default function Feed() {
  const { t } = useLanguage();
  const {
    data: feedItems,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFeedData();
  const observerTarget = useRef<HTMLDivElement>(null);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("socialFeed.individualFeed")}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <ChevronDown className="size-4" />
              {t("socialFeed.sortBy")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Newest</DropdownMenuItem>
            <DropdownMenuItem>Oldest</DropdownMenuItem>
            <DropdownMenuItem>Most Popular</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Feed Cards */}
      <div className="space-y-6">
        {feedItems.length === 0 && !isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            No feed data available
          </div>
        ) : (
          <>
            {/* Show skeletons for initial loading */}
            {isLoading && feedItems.length === 0 && (
              <>
                {Array.from({ length: 3 }).map((_, i) => (
                  <FeedCardSkeleton key={`skeleton-initial-${i}`} />
                ))}
              </>
            )}

            {/* Show loaded feed items */}
            {feedItems.map((feedItem) => (
              <FeedCard key={feedItem.id} feedItem={feedItem} />
            ))}

            {/* Show skeletons for loading more */}
            {isFetchingNextPage && (
              <>
                {Array.from({ length: 2 }).map((_, i) => (
                  <FeedCardSkeleton key={`skeleton-loading-${i}`} />
                ))}
              </>
            )}
          </>
        )}

        {/* Infinite scroll trigger */}
        <div ref={observerTarget} className="h-4" />
      </div>
    </div>
  );
}
