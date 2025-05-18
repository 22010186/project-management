"use client";

import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { useIsLogin } from "@/store/state";

export default function AuthPage() {
  const { isLogin } = useIsLogin();
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
