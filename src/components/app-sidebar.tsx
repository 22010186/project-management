"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { BrandLogo } from "./logo";
import {
  Briefcase,
  Home,
  Lock,
  LucideIcon,
  Search,
  Settings,
  User,
  Users,
  ChevronDown,
  AlertCircle,
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  Layers3,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "@/lib/supabase/api/projects";
import { useStateProject, useStateUser } from "@/store/state";

export function AppSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  const { dataUser: user } = useStateUser();

  const query = useQuery({
    queryKey: ["allProjects"],
    queryFn: getAllProjects,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="z-70 flex min-h-14 w-full items-center justify-between px-6">
          <span className="font-extrabold font-mono text-lg">ProjectM</span>
        </div>

        {/* Team */}
        <div className="flex items-center justify-center gap-5 border-y-[1.5px] border-gray-200 dark:border-gray-700 py-2">
          <BrandLogo />
          {user && (
            <span className="text-gray-500 flex items-center gap-1">
              <Lock size={20} />
              <span className="text-sm">Private</span>
            </span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="no-scroll">
        <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <Button
                  className="w-full text-lg font-bold py-4 flex items-center justify-between"
                  variant="ghost"
                >
                  <span>Navigation</span>
                  <ChevronDown className="transition-transform group-data-[state=open]/collapsible:-rotate-90" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem />
                  <SidebarLink icon={Home} label="Home" href="/" />
                  <SidebarLink
                    icon={Briefcase}
                    label="Timeline"
                    href="/timeline"
                  />
                  <SidebarLink icon={Search} label="Search" href="/search" />
                  <SidebarLink
                    icon={Settings}
                    label="Settings"
                    href="/settings"
                  />
                  <SidebarLink icon={User} label="User" href="/user" />
                  <SidebarLink icon={Users} label="Teams" href="/teams" />
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>

        {/* Project */}
        <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <Button
                  className="w-full text-lg font-bold py-4 flex items-center justify-between"
                  variant="ghost"
                >
                  <span>Projects</span>
                  <ChevronDown className="transition-transform group-data-[state=open]/collapsible:-rotate-90" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {query?.data &&
                    query?.data.map((project) => (
                      <SidebarLink
                        key={project.id}
                        icon={Briefcase}
                        label={project.name}
                        href={`/project/${project.id}`}
                      />
                    ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>

        {/* Priority */}
        <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <Button
                  className="w-full text-lg font-bold py-4 flex items-center justify-between"
                  variant="ghost"
                >
                  <span>Priority</span>
                  <ChevronDown className="transition-transform group-data-[state=open]/collapsible:-rotate-90" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarLink
                    icon={AlertCircle}
                    label="Urgent"
                    href="/priority/urgent"
                  />
                  <SidebarLink
                    icon={ShieldAlert}
                    label="High"
                    href="/priority/high"
                  />
                  <SidebarLink
                    icon={AlertTriangle}
                    label="Medium"
                    href="/priority/medium"
                  />
                  <SidebarLink
                    icon={AlertOctagon}
                    label="Low"
                    href="/priority/low"
                  />
                  <SidebarLink
                    icon={Layers3}
                    label="Backlog"
                    href="/priority/backlog"
                  />
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const { setName } = useStateProject();

  const isActive =
    pathname == href || (pathname == "/" && href == "/dashboard");

  useEffect(() => {
    if (isActive) {
      setName(label);
    }
  }, [isActive]);

  return (
    <Link href={href} className="w-full">
      <SidebarMenuSubItem
        className={`relative flex cursor-pointer justify-start px-4 py-2 items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600 font-bold" : ""
        }`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-1 bg-blue-200" />
        )}
        <Icon className="size-5 text-gray-800 dark:text-gray-100" />
        <span className="font-medium text-base text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </SidebarMenuSubItem>
    </Link>
  );
};
