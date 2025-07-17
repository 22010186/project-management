"use client";

import * as React from "react";
import { Cog, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStateAllTask, useStateProject, useStateUser } from "@/store/state";
import { logout } from "@/lib/supabase/api/actions";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSidebar } from "../ui/sidebar";

export function UserDropdown() {
  const { dataUser, setDataUser } = useStateUser();
  const { setTasks } = useStateAllTask();
  const { setProjects } = useStateProject();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { setOpen } = useSidebar();

  async function handleLogout() {
    await logout();
    setDataUser(undefined);
    setProjects(undefined);
    setTasks(undefined);

    queryClient.clear();
    router.push("/auth");
  }

  function handleNavigateSetting() {
    router.push("/settings");
    setOpen(true);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <User size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem disabled className="flex flex-col items-start">
          <p className="font-medium text-base">{t("nav.dropdown.title")}</p>
          <p className="text-sm opacity-80">{dataUser?.email}</p>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleNavigateSetting}>
          <Cog className="mr-2 h-4 w-4" />
          <span>{t("nav.dropdown.setting")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="bg-red-100/50 hover:bg-red-200/50 [&:hover>*]:text-red-800"
        >
          <LogOut className="mr-2 h-4 w-4 text-red-400" />
          <span className="text-red-400 font-bold">
            {t("nav.dropdown.logout")}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
