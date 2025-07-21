"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { NavBar } from "@/components/header/nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import "@/lib/i18n";

export default function DashBoardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <AppSidebar />

        <main className="flex w-full flex-col min-w-md">
          <NavBar />

          <div className="p-4 xl:p-6 w-full">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
