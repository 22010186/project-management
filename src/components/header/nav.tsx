"use client";
import React from "react";
import { ThemeToggle } from "./theme-toogle";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import { Search, AlignJustify } from "lucide-react";
import { BrandLogo } from "../logo";
import { useIsLogin, useSidebar, useStateUser } from "@/store/state";
import { createClient } from "@/lib/supabase/client";
import { UserDropdown } from "./user-dropdown";
import { SidebarTrigger } from "../ui/sidebar";
import { getUserData } from "@/lib/supabase/api/auth";

interface HeaderProps {
  className?: string;
}

export const NavBar = ({ className }: HeaderProps) => {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const { dataUser: user, setDataUser } = useStateUser();
  const { changeAction } = useIsLogin();

  useEffect(() => {
    async function fetchUser() {
      const data = await getUserData();
      if (data) setDataUser(data);
    }
    fetchUser();
  }, []);

  return (
    <header
      className={cn(
        "w-full px-4 xl:px-6 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md dark:shadow-gray-800",
        className
      )}
    >
      <div className="container flex h-16 items-center justify-between mx-auto">
        <Link
          href={user ? "/projects" : "/"}
          className="hidden md:flex items-center space-x-2 font-bold text-xl hover:text-primary transition-colors text-blue-400 font-mono"
        >
          <BrandLogo />
        </Link>

        <div className="md:hidden cursor-pointer">
          <SidebarTrigger />
          {/* <AlignJustify size={24} onClick={() => open()} /> */}
        </div>

        <div className="relative h-fit w-full px-4 lg:px-10">
          <Search
            size={20}
            className="absolute top-1/2 right-10 lg:right-16 -translate-y-1/2"
          />
          <Input
            type="text"
            placeholder="Search..."
            className="rounded-full box-border px-4 w-full text-base"
          />
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <UserDropdown />
          ) : (
            <div className="flex items-center gap-3">
              {isLandingPage && (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/auth">Sign in</Link>
                  </Button>
                  <Button asChild onClick={changeAction}>
                    <Link href="/auth">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          )}
          <div className="border-l pl-4 dark:border-gray-800">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
