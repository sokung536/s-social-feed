"use client";

import * as React from "react";
import { Bot, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/AppSideBar/NavMain";
import { NavUser } from "@/components/AppSideBar/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/lib/i18n/context";
import { useLoginOverlay } from "@/providers/LoginProvider";
import letterS from "@/assets/letter-s.png";
import Image from "next/image";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { t } = useLanguage();
  const { username } = useLoginOverlay();

  const data = {
    user: {
      name: username,
      email: username,
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: t("appSideBar.Feed"),
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: t("appSideBar.Main"),
            url: "/feed-main",
          },
        ],
      },
      {
        title: t("appSideBar.Group"),
        url: "#",
        icon: Bot,
        items: [
          {
            title: t("appSideBar.Friends"),
            url: "#",
          },
          {
            title: t("appSideBar.Family"),
            url: "#",
          },
          {
            title: t("appSideBar.Work"),
            url: "#",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Image
          src={letterS}
          alt="Logo"
          width={24}
          height={24}
          className="object-contain "
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
