"use client";

import { HeaderTitle } from "@/components/project/header/header-title";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStateUser } from "@/store/state";

export default function SettingPage() {
  const userSettings = {
    username: "johndoe",
    email: "john.doe@example.com",
    teamName: "Development Team",
    roleName: "Developer",
  };

  const { dataUser } = useStateUser();

  return (
    <div className="p-8">
      <div className="py-6 lg:pb-4 lg:pt-8">
        <HeaderTitle name="Settings" button={false} />
      </div>
      <div className="space-y-8">
        {/* <div>
        <div>
          <label className={labelStyles}>Team</label>
          <div className={textStyles}>{userSettings.teamName}</div>
        </div>
        <div>
          <label className={labelStyles}>Role</label>
          <div className={textStyles}>{userSettings.roleName}</div>
        </div> */}
        <div className="grid gap-3">
          <Label>Username</Label>
          <Input defaultValue={dataUser.username} readOnly />
        </div>
        <div className="grid gap-3">
          <Label>Email</Label>
          <Input defaultValue={dataUser.email} readOnly />
        </div>
      </div>
    </div>
  );
}
