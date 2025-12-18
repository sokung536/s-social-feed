"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function FeedCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
      <div className="space-y-4">
        {/* User Info Skeleton */}
        <div className="flex items-start gap-3">
          <Skeleton className="size-10 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>

        {/* Post Content Skeleton */}
        <div className="flex flex-col gap-4">
          {/* Thumbnail Skeleton */}
          <Skeleton className="w-full h-64 rounded-lg" />

          {/* Text Content Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
