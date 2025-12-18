"use client";

import { useState, useEffect, startTransition } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Friend, FriendStatus } from "@/types";

// Mock data for 20 friends
const generateMockFriends = (): Friend[] => {
  const names = [
    "Lasmini",
    "Sukirman Sanjaya",
    "Michael Arafat",
    "Darsini",
    "Ibnun Cah Angon",
    "Thomas Hanunu",
    "Stephanie Johnson",
    "David Chen",
    "Sarah Williams",
    "James Anderson",
    "Emily Martinez",
    "Robert Taylor",
    "Lisa Brown",
    "Michael Davis",
    "Jennifer Wilson",
    "Christopher Lee",
    "Amanda Garcia",
    "Daniel Rodriguez",
    "Jessica Moore",
    "Matthew Thompson",
  ];

  return names.map((name, index) => {
    const isActive = Math.random() > 0.4; // 60% chance of being active
    const status: FriendStatus = isActive
      ? { type: "active" }
      : { type: "inactive", hoursAgo: Math.floor(Math.random() * 24) + 1 };

    return {
      id: `friend-${index + 1}`,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      status,
    };
  });
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function FriendList() {
  const { t } = useLanguage();
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    startTransition(() => {
      setFriends(generateMockFriends());
    });
  }, []);

  return (
    <div className="flex flex-col h-full bg-card border-l border-border w-80 shrink-0">
      {/* Header */}
      <div className="bg-primary dark:bg-primary/80 px-4 py-3 flex items-center justify-center">
        <h2 className="text-lg font-bold text-primary-foreground">
          {t("friendList.allFriends")}
        </h2>
      </div>

      {/* Friend List */}
      <div className="flex-1 overflow-y-auto">
        {friends.map((friend, index) => (
          <div
            key={friend.id}
            className={`flex items-center gap-3 px-4 py-3 ${
              index !== friends.length - 1 ? "border-b border-border" : ""
            }`}
          >
            {/* Avatar */}
            <div className="relative">
              <Avatar className="size-12 border-2 border-yellow-400 dark:border-yellow-500 rounded-lg">
                <AvatarImage src={friend.avatar} />
                <AvatarFallback className="rounded-lg bg-muted">
                  {getInitials(friend.name)}
                </AvatarFallback>
              </Avatar>
              {/* Status indicator */}
              <div
                className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-background ${
                  friend.status.type === "active"
                    ? "bg-green-500 dark:bg-green-400"
                    : "bg-muted-foreground/50"
                }`}
              />
            </div>

            {/* Name and Status */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground truncate">
                {friend.name}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div
                  className={`size-2 rounded-full ${
                    friend.status.type === "active"
                      ? "bg-green-500 dark:bg-green-400"
                      : "bg-muted-foreground/50"
                  }`}
                />
                <span className="text-sm text-muted-foreground">
                  {friend.status.type === "active"
                    ? t("friendList.activeNow")
                    : (t("friendList.activeHoursAgo") as string).replace(
                        "{hours}",
                        friend.status.hoursAgo?.toString() || "0"
                      )}
                </span>
              </div>
            </div>

            {/* Chat Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <MessageCircle className="size-5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
