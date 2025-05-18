"use client";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  Home,
  Layers3,
  Lock,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { BrandLogo } from "./logo";
import clsx from "clsx";
import { useSidebar } from "@/store/state";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { useWindowWidth } from "@/lib/utils";

export function Sidebar() {
  const [showProjects, setShowProjects] = useState(false);
  const [showPriority, setShowPriority] = useState(true);
  const { openSidebar, close, open } = useSidebar();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth > 756 && !openSidebar) {
      open();
    } else if (windowWidth <= 756 && openSidebar) {
      close();
    }
  }, [windowWidth]);

  return (
    <div
      className={clsx(
        "fixed flex flex-col h-full justify-between shadow-xl dark:shadow-gray-800 transition-all duration-300 z-60 dark:bg-black overflow-y-auto bg-white w-64",
        !openSidebar && "-translate-x-full",
        "no-scroll"
      )}
    >
      <div className="flex size-full flex-col justify-start">
        {/* Top Logo */}
        <div className="z-70 flex min-h-14 w-full items-center justify-between px-6">
          <span className="font-extrabold font-mono text-lg">ProjectM</span>
          <X onClick={() => close()} className="md:hidden" />
        </div>

        {/* Team */}
        <div className="flex items-center justify-center gap-5 border-y-[1.5px] border-gray-200 dark:border-gray-700 py-2">
          <BrandLogo />
          <span className="text-gray-500 flex items-center gap-1">
            <Lock size={20} />
            <span className="text-sm ">Private</span>
          </span>
        </div>

        {/* Navbar links */}
        <nav className="z-10 w-full">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={Settings} label="Settings" href="/settings" />
          <SidebarLink icon={User} label="User" href="/user" />
          <SidebarLink icon={Users} label="Teams" href="/teams" />
        </nav>

        <Collapsible
          open={showProjects}
          onOpenChange={setShowProjects}
          className="w-full"
        >
          <CollapsibleTrigger className="w-full">
            <div className="flex w-full items-center justify-between px-8 py-3 text-gray-500 cursor-pointer">
              <span>Projects</span>
              <ChevronDown
                size={24}
                className={clsx(
                  showProjects && "rotate-180",
                  "transition-transform duration-300"
                )}
              />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
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
            <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
            <SidebarLink icon={Layers3} label="Backlog" href="/priority/bl" />
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={showPriority}
          onOpenChange={setShowPriority}
          className="w-full"
        >
          <CollapsibleTrigger className="w-full">
            <div className="flex w-full items-center justify-between px-8 py-3 text-gray-500 cursor-pointer">
              <span>Priority</span>
              <ChevronDown
                size={24}
                className={clsx(
                  showPriority && "rotate-180",
                  "transition-transform duration-300"
                )}
              />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
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
            <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname == href || (pathname == "/" && href == "/dashboard");
  // const screenWidth = window.innerWidth;

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer justify-start px-8 py-3 items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        }`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-1 bg-blue-200" />
        )}
        <Icon className="size-6 text-gray-800 dark:text-gray-100" />
        <span className="font-medium text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </div>
    </Link>
  );
};
