"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function ConfirmEmail() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center bg-primary-foreground">
      <Card className="max-w-md">
        <CardHeader className="text-center">
          <h2 className="text-3xl font-bold">{t("confirm_email.title")}</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">{t("confirm_email.description")}</p>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => router.push("/auth")}
          >
            {t("confirm_email.button")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
