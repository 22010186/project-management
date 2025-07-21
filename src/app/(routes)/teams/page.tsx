"use client";

import { Loading } from "@/components/loading";
import { HeaderTitle } from "@/components/project/header/header-title";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createTeams, getTeams, leaveTeam } from "@/lib/supabase/api/teams";
import { useStateUser } from "@/store/state";
import { Team } from "@/store/type";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function TeamsPage() {
  const { t } = useTranslation();
  const { dataUser: user, isOwner, setOwner } = useStateUser();
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["allTeams"],
    queryFn: async () => {
      const teams = await getTeams(user?.teamid);
      setOwner(teams[0]?.productownerusername == user?.username);
      return teams;
    },
  });
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<Team>();

  const handleOnSubmit: SubmitHandler<Team> = async (data) => {
    if (data.projectmanageruserid == user?.userid) {
      toast("Error", { description: "You can't invite yourself" });
      return;
    }
    data.productowneruserid = user?.userid;
    const { data: team } = await createTeams(data);
    if (!team) {
      throw new Error("Team not created");
    }
    toast("Success", { description: "Team created" });
    queryClient.invalidateQueries({ queryKey: ["allTeams"] });
    setOpen(false);
  };

  const handleClickToLeave = async (userid?: number, teamid?: number) => {
    if (!userid || !teamid) {
      toast("Error", { description: "User or team not found" });
      return;
    }
    await leaveTeam(userid, teamid);
    toast("Success", { description: "You left the team" });
    queryClient.invalidateQueries({ queryKey: ["allTeams"] });
  };

  if (isLoading) return <Loading />;
  if (error) throw error;

  return (
    <div className="p-8">
      <div className="py-6 lg:pb-4 lg:pt-8">
        <div className="flex items-center">
          <HeaderTitle name={t("page.team.title")} button={false} />
          <Button
            disabled={data && data[0]?.productownerusername != user?.username}
            onClick={() => setOpen(true)}
          >
            <Plus /> <span>{t("page.team.invite")}</span>
          </Button>
        </div>
      </div>

      {user && user.teamid ? (
        <Table className="border max-h-40">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                {t("page.team.table.1")}
              </TableHead>
              <TableHead>{t("page.team.table.2")}</TableHead>
              <TableHead>{t("page.team.table.3")}</TableHead>
              <TableHead>{t("page.team.table.4")}</TableHead>
              <TableHead>{t("page.team.table.5")}</TableHead>
              <TableHead>{t("page.team.table.6")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((team, index) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{team.id}</TableCell>
                <TableCell>{team.teamname}</TableCell>
                <TableCell>{team.productownerusername}</TableCell>
                <TableCell>{team.projectmanagerusername}</TableCell>
                <TableCell>
                  {isOwner ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        handleClickToLeave(team.projectmanageruserid, team.id)
                      }
                    >
                      {t("page.team.table.button.1")}
                    </Button>
                  ) : (
                    team.projectmanagerusername == user.username && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleClickToLeave(team.projectmanageruserid, team.id)
                        }
                      >
                        {t("page.team.table.button.2")}
                      </Button>
                    )
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex items-center justify-center text-lg font-medium text-gray-400 h-40">
          <Button onClick={() => setOpen(true)}>{t("page.team.create")}</Button>
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
