"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function ConfirmEmail() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center bg-primary-foreground">
      <Card className="max-w-md">
        <CardHeader className="text-center">
          <h2 className="text-3xl font-bold">Confirm your email</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            We've sent a confirmation email to the address you provided. Please
            check your email and click on the link to confirm your account.
          </p>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => router.push("/auth")}
          >
            Go to login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
