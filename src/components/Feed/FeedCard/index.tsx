"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Share2 } from "lucide-react";
import type { FeedItem } from "@/services/feedMain";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function FeedCard({ feedItem }: { feedItem: FeedItem }) {
  const { t } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(feedItem.likeCount);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: feedItem.content.text.substring(0, 50),
          text: feedItem.content.text,
          url: feedItem.postUrl,
        });
      } catch {
        // User cancelled or error occurred
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(feedItem.postUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6 space-y-4">
      {/* User Info */}
      <div className="flex items-start gap-3">
        <Avatar className="size-10 rounded-md">
          <AvatarImage src={feedItem.author.avatar} />
          <AvatarFallback className="rounded-md">
            {getInitials(feedItem.author.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-foreground">
              {feedItem.author.name}
            </h3>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <span className="font-bold">{feedItem.source}</span>
              via {feedItem.source}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {feedItem.author.role}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="flex flex-col gap-4">
        {/* Thumbnail */}
        <div className="w-[70%] mx-auto">
          <Image
            src={feedItem.content.thumbnail}
            alt={feedItem.content.thumbnailAlt}
            width={500}
            height={300}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <p className="text-sm leading-relaxed text-foreground">
            {feedItem.content.text}
          </p>
          <button className="text-sm text-muted-foreground hover:text-foreground">
            {t("socialFeed.seeMore")}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={`gap-2 ${
              isLiked
                ? "text-red-500 dark:text-red-400 border-red-500 dark:border-red-400 hover:text-red-600 dark:hover:text-red-300 hover:border-red-600 dark:hover:border-red-300"
                : ""
            }`}
            onClick={handleLike}
          >
            <Heart className={`size-4 ${isLiked ? "fill-current" : ""}`} />
            <span className="text-sm">{likeCount.toLocaleString()}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleShare}
          >
            <Share2 className="size-4" />
            {t("socialFeed.share")}
          </Button>
        </div>
        <span className="text-sm text-muted-foreground">
          {feedItem.timestamp}
        </span>
      </div>
    </div>
  );
}
