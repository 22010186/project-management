"use client";

import * as React from "react";
import { Cog, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStateUser } from "@/store/state";
import { logout } from "@/lib/supabase/api/actions";
import { useRouter } from "next/navigation";

export function UserDropdown() {
  const { dataUser, setDataUser } = useStateUser();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    setDataUser(null);
    router.push("/auth");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <User size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem disabled className="flex flex-col items-start">
          <p className="font-medium text-base">Logged with</p>
          <p className="text-sm opacity-80">{dataUser?.email}</p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Cog className="mr-2 h-4 w-4" />
          <span>Setting</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="bg-red-100/50 hover:bg-red-200/50 [&:hover>*]:text-red-800"
        >
          <LogOut className="mr-2 h-4 w-4 text-red-400" />
          <span className="text-red-400 font-bold">LogOut</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
