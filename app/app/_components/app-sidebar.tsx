"use client";

import * as React from "react";
import {
  Home,
  LogOut,
  Palette,
  Code,
  Coffee,
  Settings,
  Loader2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "./user-btn";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Dashboard",
    url: "/app/dashboard",
    icon: Home,
  },
  {
    title: "Competitor Analysis",
    url: "/app/competitor-analysis",
    icon: Code,
  },
  {
    title: "Content Generation",
    url: "/app/content-generation",
    icon: Coffee,
  },
  {
    title: "Growth Strategy",
    url: "/app/growth-strategy",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathName = usePathname();
  const router = useRouter();
  const { open } = useSidebar();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const routes = [
      ...navigation.map((item) => item.url),
      "/settings?page=account",
    ];

    routes.forEach((url) => {
      router.prefetch(url);
    });
  }, [router]);

  if (!isMounted) {
    return (
      <div className="flex h-screen w-[var(--sidebar-width)] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader
        className={cn(
          "flex flex-row items-center py-3 text-sm font-semibold",
          open ? "px-4" : "justify-center",
        )}
      >
        <Logo className="m-0 size-5 p-1" />
        {open && <>LinkedIn Growth System</>}
      </SidebarHeader>
      <SidebarContent className="pt-1">
        <SidebarGroup>
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.url === pathName}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
