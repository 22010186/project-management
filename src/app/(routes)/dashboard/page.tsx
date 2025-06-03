"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";

export default function Dashboard() {
  const { setOpen } = useSidebar();
  useEffect(() => {
    setOpen(true);
  }, []);

  return <div>Dashboard</div>;
}
