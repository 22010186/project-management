"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
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
import { use, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "@/lib/supabase/api/projects";
import { useStateProject, useStateUser } from "@/store/state";
import { Loading } from "./loading";
import { Project } from "@/store/type";
import LanguageToggle from "./language";
import { useTranslation } from "react-i18next";

export function AppSidebar() {
  const { dataUser: user } = useStateUser();
  const { setProjects } = useStateProject();
  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const data = await getAllProjects(user?.teamid);
      setProjects(data as Project[]);
      return data;
    },
    enabled: !!user?.teamid,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Loading />;
  if (error) throw error;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="z-70 flex min-h-14 w-full items-center justify-center px-6">
          <span className="font-extrabold font-mono text-lg">
            Welcome {user?.username}
          </span>
        </div>

        {/* Team */}
        <div className="flex items-center justify-center gap-1 border-y-[1.5px] border-gray-200 dark:border-gray-700 py-2">
          <BrandLogo className="hidden" />
          {user && (
            <span className="text-gray-500 flex items-center gap-1">
              <Lock size={16} />
              <span className="text-sm">Private</span>
            </span>
          )}
        </div>

        <div className="flex items-center justify-center border-t-0 border-y-[1.5px] border-gray-200 dark:border-gray-700 pt-2 pb-3 sm:hidden">
          <LanguageToggle align="start" />
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
                  <span>{t("sidebar.navigation.title")}</span>
                  <ChevronDown className="transition-transform group-data-[state=open]/collapsible:-rotate-90" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="[&>div]:bg-red-500">
                  <SidebarMenuSubItem />
                  <SidebarLink
                    icon={Home}
                    label="Dashboard"
                    href="/dashboard"
                    type="navigation"
                  />
                  <SidebarLink
                    icon={Briefcase}
                    label="Timeline"
                    href="/timeline"
                    type="navigation"
                  />
                  <SidebarLink
                    icon={Search}
                    label="Search"
                    href="/search"
                    type="navigation"
                  />
                  <SidebarLink
                    icon={Settings}
                    label="Settings"
                    href="/settings"
                    type="navigation"
                  />
                  <SidebarLink
                    icon={User}
                    label="Users"
                    href="/users"
                    type="navigation"
                  />
                  <SidebarLink
                    icon={Users}
                    label="Teams"
                    href="/teams"
                    type="navigation"
                  />
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
                  <span>{t("sidebar.projects")}</span>
                  <ChevronDown className="transition-transform group-data-[state=open]/collapsible:-rotate-90" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {data &&
                    data.map(
                      (project) =>
                        project && (
                          <SidebarLink
                            key={project.id}
                            icon={Briefcase}
                            label={project.name}
                            id={project.id}
                            href={`/project/${project.id}`}
                            type="project"
                          />
                        )
                    )}
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
                  <span>{t("sidebar.priority.title")}</span>
                  <ChevronDown className="transition-transform group-data-[state=open]/collapsible:-rotate-90" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarLink
                    icon={AlertCircle}
                    label="Urgent"
                    href="/priority/urgent"
                    type="priority"
                  />
                  <SidebarLink
                    icon={ShieldAlert}
                    label="High"
                    href="/priority/high"
                    type="priority"
                  />
                  <SidebarLink
                    icon={AlertTriangle}
                    label="Medium"
                    href="/priority/medium"
                    type="priority"
                  />
                  <SidebarLink
                    icon={AlertOctagon}
                    label="Low"
                    href="/priority/low"
                    type="priority"
                  />
                  <SidebarLink
                    icon={Layers3}
                    label="Backlog"
                    href="/priority/backlog"
                    type="priority"
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
  id?: number;
  type: string;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  id,
  type,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const { setName, setId } = useStateProject();
  const { t } = useTranslation();

  const isActive = pathname == href;

  function sliceUrl(url: string, type: string) {
    if (type == "priority") {
      return url.split("/")[2];
    }
    return url.slice(1);
  }

  useEffect(() => {
    if (isActive) {
      setName(label);
      if (id) {
        setId(id);
      }
    }
  }, [isActive]);

  return (
    <Link
      href={href == "/search" || href == "/timeline" ? "/dashboard" : href}
      className="w-full"
    >
      <SidebarMenuSubItem
        className={`relative flex cursor-pointer justify-start px-4 py-2 items-center gap-3 transition-colors hover:bg-gray-100  dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-800 font-bold" : ""
        }`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-1 bg-blue-200" />
        )}
        <Icon className="size-5 text-gray-800 dark:text-gray-100" />
        <span className="font-medium text-base text-gray-800 dark:text-gray-100">
          {type != "project"
            ? t("sidebar." + type + "." + sliceUrl(href, type))
            : label}
        </span>
      </SidebarMenuSubItem>
    </Link>
  );
};
