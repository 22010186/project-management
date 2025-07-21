"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Users, FileText } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Project, Team } from "@/store/type";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { createProject } from "@/lib/supabase/api/projects";
import { useStateUser } from "@/store/state";
import { useTranslation } from "react-i18next";
import { createTeams } from "@/lib/supabase/api/teams";

const quickActions = [
  {
    title: "Create New Task",
    description: "Add a new task to your project",
    icon: Plus,
    action: "task",
  },
  {
    title: "Create Project",
    description: "Create a new project",
    icon: Plus,
    action: "project",
  },
  {
    title: "Invite Team Member",
    description: "Add someone to your workspace",
    icon: Users,
    action: "invite",
  },
  {
    title: "Generate Report",
    description: "Create a progress report",
    icon: FileText,
    action: "generate",
  },
];

export function QuickActions() {
  const [open, setOpen] = useState(false);
  const [typeForm, setTypeForm] = useState("task");
  const { register, handleSubmit, reset } = useForm<Partial<Project | Team>>();
  const queryClient = useQueryClient();
  const { dataUser: user } = useStateUser();
  const { t } = useTranslation();

  const handleClick = (action: string) => {
    reset();
    setTypeForm(action);
    setOpen(true);
  };

  const handleOnSubmit: SubmitHandler<Partial<Project | Team>> = async (
    data
  ) => {
    if (typeForm === "project") {
      if (!user?.teamid) {
        toast("Error", { description: "Please create team first" });
      }
      await createProject(data, user?.teamid);
      toast("Success", { description: "Team created" });
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
      queryClient.invalidateQueries({ queryKey: ["allProjects"] });
    }
    if (typeForm === "invite") {
      // @ts-ignore
      data.productowneruserid = user?.userid;
      const { data: team } = await createTeams(data);
      if (!team) {
        throw new Error("Team not created");
      }
      toast("Success", { description: "Team created" });
      queryClient.invalidateQueries({ queryKey: ["allTeams"] });
    }
    setOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t("page.dashboard.part.3.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={action.action}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => handleClick(action.action)}
              >
                <action.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">
                    {t("page.dashboard.part.3.card." + (index + 1) + ".title")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t(
                      "page.dashboard.part.3.card." +
                        (index + 1) +
                        ".description"
                    )}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {typeForm === "project" && (
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <DialogHeader>
                <DialogTitle>
                  {t("page.dashboard.part.3.dialog.project.title")}
                </DialogTitle>
                <DialogDescription>
                  {t("page.dashboard.part.3.dialog.project.description1")}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 my-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">
                    {t("page.dashboard.part.3.dialog.project.name")}
                  </Label>
                  <Input
                    id="name-1"
                    placeholder="eg: My Project"
                    {...register("name")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">
                    {t("page.dashboard.part.3.dialog.project.description2")}
                  </Label>
                  <Input id="description" {...register("description")} />
                </div>
                <div className="flex gap-3 justify-between">
                  <div className="grid gap-3 w-full">
                    <Label htmlFor="start-date">
                      {t("page.dashboard.part.3.dialog.project.date.1")}
                    </Label>
                    <Input
                      id="start-date"
                      type="date"
                      required
                      placeholder="mm/dd/yyyy"
                      {...register("startdate")}
                    />
                  </div>
                  <div className="grid gap-3 w-full">
                    <Label htmlFor="end-date">
                      {t("page.dashboard.part.3.dialog.project.date.2")}
                    </Label>
                    <Input
                      id="end-date"
                      type="date"
                      required
                      placeholder="mm/dd/yyyy"
                      {...register("enddate")}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">
                    {t("page.dashboard.part.3.dialog.project.button.1")}
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {t("page.dashboard.part.3.dialog.project.button.2")}
                </Button>
              </DialogFooter>
            </form>
          )}
          {typeForm === "invite" && (
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <DialogHeader>
                <DialogTitle>{t("page.team.dialog.title")}</DialogTitle>
                <DialogDescription>
                  {t("page.team.dialog.description")}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 my-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">
                    {t("page.team.dialog.form.team_name")}
                  </Label>
                  <Input
                    id="name-1"
                    placeholder="eg: My Team"
                    {...register("teamname")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">
                    {t("page.team.dialog.form.project_manager")}
                  </Label>
                  <Input
                    id="username-1"
                    type="number"
                    {...register("projectmanageruserid")}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">
                    {t("page.team.dialog.form.button.1")}
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {t("page.team.dialog.form.button.2")}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
