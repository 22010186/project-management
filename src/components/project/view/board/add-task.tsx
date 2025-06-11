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
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createTask } from "@/lib/supabase/api/tasks";
import { useStateProject, useStateUser } from "@/store/state";
import { useQueryClient } from "@tanstack/react-query";

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
};

type Props = {
  status: string;
};

const AddTask = ({ status }: Props) => {
  const { register, handleSubmit, setValue } = useForm<Inputs>();

  const [open, setOpen] = useState(false);
  const { dataUser } = useStateUser();
  const { id } = useStateProject();

  const queryClient = useQueryClient();

  const handleOnSubmit: SubmitHandler<Inputs> = async (data) => {
    data.authoruserid = Number(dataUser.userid);
    data.projectid = id;
    data.assigneduserid = Number(data.assigneduserid);
    if (data.points) {
      data.points = Number(data.points);
    } else {
      data.points = undefined;
    }
    await createTask(data);
    queryClient.invalidateQueries({ queryKey: ["task-all-project"] });
    toast("Success", { description: "Task created" });
    setOpen(false);
  };

  function handleOpenDialog() {
    setOpen(!open);
    setValue("status", status as Status);
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
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 my-8">
            <div className="grid gap-3">
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                placeholder="New Project"
                required
                {...register("title")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input id="description" required {...register("description")} />
            </div>
            <div className="flex gap-3 justify-between">
              <div className="grid gap-3 w-full">
                <Label htmlFor="status">Status</Label>
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
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="Work In Progress">
                        Work In Progress
                      </SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3 w-full">
                <Label htmlFor="status">Priority</Label>
                <Select
                  onValueChange={(val) => setValue("priority", val as Priority)}
                >
                  <SelectTrigger name="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup defaultValue={status}>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                      <SelectItem value="Hight">Hight</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Backlog">Backlog</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3 justify-between">
              <div className="grid gap-3 w-full">
                <Label htmlFor="end-date">Start Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  required
                  placeholder="mm/dd/yyyy"
                  {...register("startdate")}
                />
              </div>
              <div className="grid gap-3 w-full">
                <Label htmlFor="end-date">Due Date</Label>
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
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                placeholder="2"
                {...register("points")}
              />
            </div>
            <div className="grid gap-3 w-full">
              <Label htmlFor="points">Tags</Label>
              <Input
                id="points"
                type="text"
                placeholder="eg: AI, Machine Learning, ..."
                {...register("tags")}
              />
            </div>
            <div className="grid gap-3 w-full">
              <Label htmlFor="assigneduserid">Assigned User Id</Label>
              <Input
                id="assigneduserid"
                required
                type="number"
                {...register("assigneduserid")}
              />
            </div>
          </div>
          <DialogFooter className="mt-3 flex justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { AddTask };
