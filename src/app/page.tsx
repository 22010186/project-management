"use client";

import ConfirmEmail from "@/components/auth/confirm-email";
import { LandingPage } from "@/components/landingpage";
import { useSidebar } from "@/components/ui/sidebar";
import { useStateUser } from "@/store/state";
import { useEffect } from "react";

export default function HomePage() {
  const { dataUser } = useStateUser();
  const { setOpen } = useSidebar();
  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-8 pb-0 font-[family-name:var(--font-geist-sans)]">
      {!dataUser?.email_confirmed_at ? <ConfirmEmail /> : <LandingPage />}
    </div>
  );
}
