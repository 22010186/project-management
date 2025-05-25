"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Status, Task as TaskType } from "@/store/type";
import { EllipsisVertical, Plus } from "lucide-react";
import { useDrop } from "react-dnd";
import { Task } from "./task-view";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

type TaskColumnProps = {
  projectId: string;
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: string, toStatus: string) => void;
  setIsModalNewTask: (isOpen: boolean) => void;
};

const TaskColumn = ({
  projectId,
  status,
  tasks,
  moveTask,
  setIsModalNewTask,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: string }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const supabase = createClient();
  const queryClient = useQueryClient();

  useEffect(() => {
    const chanel = supabase.channel("task-channel");
    chanel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "task",
        },
        (payload) => {
          console.log("Change received!", payload);
          queryClient.invalidateQueries({
            queryKey: [`task-project-${projectId}`],
          });
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("Subscribed to task changes");
        }
      });
  }, []);

  const tasksCount = tasks.filter((task) => task.status == status).length;
  const statusColor: any = {
    "To Do": "#2563EB",
    "Work In Progress": "#FBBF24",
    "Under Review": "#4ADE80",
    Completed: "#4ADE80",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`h-fit xl:py-4 rounded-lg py-2 xl:px-2 shadow-md dark:shadow-gray-700 ${
        isOver ? "bg-gray-100 dark:bg-neutral-950" : ""
      }`}
    >
      <div className="mb-3 flex w-full border-b border-gray-200 dark:border-dark-tertiary">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="flex items-center text-lg font-semibold">
            {status}{" "}
            <span className="ml-2 inline-block rounded-xl bg-gray-200 p-1 items-center text-sm leading-none dark:bg-dark-tertiary">
              {tasksCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <div className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} className="cursor-pointer" />
            </div>
            <Dialog>
              <DialogTrigger>
                <Badge variant="outline" className="p-3 cursor-pointer">
                  <Plus size={26} />
                </Badge>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Task</DialogTitle>
                  <DialogDescription>
                    Anyone who has this link will be able to view this.
                  </DialogDescription>
                </DialogHeader>
                {/* Create Form Here */}
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task task={task} key={task.id} />
        ))}
    </div>
  );
};

export { TaskColumn };
