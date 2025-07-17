"use client";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Priority, Status } from "@/store/type";
import { Plus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createTask } from "@/lib/supabase/api/tasks";
import { useStateProject, useStateUser } from "@/store/state";
import { useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "@/lib/supabase/api/storage";
import { useTranslation } from "react-i18next";

type Inputs = {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  tags?: string;
  points?: number;
  assigneduserid: number;
  startdate: string;
  duedate: string;
  authoruserid: number;
  projectid: number;
  image?: string;
};

type Props = {
  status: string;
};

const AddTask = ({ status }: Props) => {
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const { dataUser } = useStateUser();
  const { id } = useStateProject();
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const queryClient = useQueryClient();

  const handleOnSubmit: SubmitHandler<Inputs> = async (data) => {
    data.authoruserid = Number(dataUser?.userid);
    data.projectid = id;
    data.assigneduserid = Number(data.assigneduserid);
    if (data.points) {
      data.points = Number(data.points);
    } else {
      data.points = undefined;
    }
    if (image) {
      const fullPath = await uploadImage(image);
      data.image = fullPath;
    }
    await createTask(data);
    queryClient.invalidateQueries({ queryKey: ["task-all-project"] });
    toast("Success", { description: "Task created" });
    setOpen(false);
  };

  function handleOpenDialog() {
    setOpen(!open);
    setValue("status", status as Status);
    if (!open) setImage(null);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
      <DialogTrigger>
        <Badge variant="outline" className="p-3 cursor-pointer">
          <Plus size={26} />
        </Badge>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("page.project.dialog.title")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 my-8">
            <div className="grid gap-3">
              <Label htmlFor="task-title">
                {t("page.project.dialog.form.task_title")}
              </Label>
              <Input
                id="task-title"
                placeholder="New Project"
                required
                {...register("title")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">
                {t("page.project.dialog.form.description")}
              </Label>
              <Input id="description" required {...register("description")} />
            </div>
            <div className="flex gap-3 justify-between">
              <div className="grid gap-3 w-full">
                <Label htmlFor="status">
                  {t("page.project.dialog.form.status.title")}
                </Label>
                <Select
                  required
                  defaultValue={status}
                  onValueChange={(val) => setValue("status", val as Status)}
                >
                  <SelectTrigger name="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="To Do">
                        {t("page.project.dialog.form.status.option.todo")}
                      </SelectItem>
                      <SelectItem value="Work In Progress">
                        {t(
                          "page.project.dialog.form.status.option.work_in_progress"
                        )}
                      </SelectItem>
                      <SelectItem value="Under Review">
                        {t(
                          "page.project.dialog.form.status.option.under_review"
                        )}
                      </SelectItem>
                      <SelectItem value="Completed">
                        {t("page.project.dialog.form.status.option.completed")}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3 w-full">
                <Label htmlFor="status">
                  {t("page.project.dialog.form.priority.title")}
                </Label>
                <Select
                  onValueChange={(val) => setValue("priority", val as Priority)}
                >
                  <SelectTrigger name="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup defaultValue={status}>
                      <SelectItem value="Urgent">
                        {t("page.project.dialog.form.priority.option.urgent")}
                      </SelectItem>
                      <SelectItem value="High">
                        {t("page.project.dialog.form.priority.option.high")}
                      </SelectItem>
                      <SelectItem value="Medium">
                        {t("page.project.dialog.form.priority.option.medium")}
                      </SelectItem>
                      <SelectItem value="Low">
                        {t("page.project.dialog.form.priority.option.low")}
                      </SelectItem>
                      <SelectItem value="Backlog">
                        {t("page.project.dialog.form.priority.option.backlog")}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3 justify-between">
              <div className="grid gap-3 w-full">
                <Label htmlFor="end-date">
                  {t("page.project.dialog.form.start_date")}
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  required
                  placeholder="mm/dd/yyyy"
                  {...register("startdate")}
                />
              </div>
              <div className="grid gap-3 w-full">
                <Label htmlFor="end-date">
                  {t("page.project.dialog.form.due_date")}
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  required
                  placeholder="mm/dd/yyyy"
                  {...register("duedate")}
                />
              </div>
            </div>
            <div className="grid gap-3 w-full">
              <Label htmlFor="points">
                {t("page.project.dialog.form.points")}
              </Label>
              <Input
                id="points"
                type="number"
                placeholder="2"
                {...register("points")}
              />
            </div>
            <div className="grid gap-3 w-full">
              <Label htmlFor="points">
                {t("page.project.dialog.form.tags")}
              </Label>
              <Input
                id="points"
                type="text"
                placeholder="eg: AI, Machine Learning, ..."
                {...register("tags")}
              />
            </div>
            <div className="grid gap-3 w-full">
              <Label htmlFor="assigneduserid">
                {t("page.project.dialog.form.assigned_user_id")}
              </Label>
              <Input
                id="assigneduserid"
                required
                type="number"
                {...register("assigneduserid")}
              />
            </div>
            <div className="grid gap-3 w-full">
              <Label htmlFor="image">
                {t("page.project.dialog.form.image")}
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <DialogFooter className="mt-3 flex justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                {t("page.project.dialog.form.button.1")}
              </Button>
            </DialogClose>
            <Button type="submit">
              {t("page.project.dialog.form.button.2")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { AddTask };
