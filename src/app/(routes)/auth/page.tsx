"use client";

import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsLogin } from "@/store/state";
import { useEffect } from "react";

export default function AuthPage() {
  const { isLogin } = useIsLogin();
  const { setOpen } = useSidebar();
  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
