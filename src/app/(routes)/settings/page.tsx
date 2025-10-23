"use client";

import { HeaderTitle } from "@/components/project/header/header-title";
import { ChangePassword } from "@/components/setting/changepass";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadAvatar } from "@/lib/supabase/api/storage";
import { useStateUser } from "@/store/state";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function SettingPage() {
  const { dataUser } = useStateUser();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const bucketPath = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL;

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);

      // Tạo preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOnSubmit = async () => {
    if (!image) {
      toast("Error", { description: "Please select an image" });
      return;
    }
    if (!dataUser?.userid) {
      toast("Error", { description: "User not found" });
      return;
    }

    await uploadAvatar(image, dataUser.userid);
    queryClient.invalidateQueries({ queryKey: ["user-data"] });
  };

  return (
    <div className="p-8">
      <div className="py-6 lg:pb-4 lg:pt-8">
        <HeaderTitle name={t("page.setting.title")} button={false} />
      </div>
      <div className="space-y-8">
        <div className="grid gap-3">
          <Label>{t("page.setting.part.1.title")}</Label>
          <div className="flex gap-14 items-end">
            <Avatar className="size-32 border">
              <AvatarImage
                src={`${bucketPath}/${dataUser?.profilepictureurl}`}
                alt={dataUser?.username}
              />
              <AvatarFallback>
                {dataUser?.username && (
                  <span>
                    {dataUser.username.charAt(0) + dataUser.username.charAt(1)}
                  </span>
                )}
              </AvatarFallback>
            </Avatar>
            <Dialog>
              <DialogTrigger>
                <Badge className="cursor-pointer px-3 py-2">
                  {t("page.setting.part.1.button")}
                </Badge>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <form onSubmit={handleOnSubmit}>
                  <DialogHeader>
                    <DialogTitle>{t("page.setting.dialog.title")}</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 my-8">
                    <div className="grid gap-3">
                      <Label htmlFor="avatar">
                        {t("page.setting.dialog.label1")}
                      </Label>
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 my-8">
                    {imagePreview && (
                      <div className="grid gap-3">
                        <Label htmlFor="avatar">
                          {t("page.setting.dialog.label2")}
                        </Label>
                        <div className="flex w-full items-center justify-center">
                          <Avatar className="size-32 border">
                            <AvatarImage
                              src={imagePreview}
                              alt={dataUser?.username}
                            />
                            <AvatarFallback>
                              {dataUser?.username && (
                                <span>
                                  {dataUser.username.charAt(0) +
                                    dataUser.username.charAt(1)}
                                </span>
                              )}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    )}
                  </div>
                  <DialogFooter className="mt-3 flex justify-end">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        {t("page.setting.dialog.button.1")}
                      </Button>
                    </DialogClose>
                    <Button type="submit">
                      {t("page.setting.dialog.button.2")}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="grid gap-3">
          <Label>{t("page.setting.part.2.username")}</Label>
          <Input defaultValue={dataUser?.username} readOnly />
        </div>
        <div className="grid gap-3">
          <Label>Email</Label>
          <Input defaultValue={dataUser?.email} readOnly />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ChangePassword />
        </Suspense>
      </div>
    </div>
  );
}
