"use client";

import { Task as TaskType } from "@/store/type";
import { useDrag } from "react-dnd";
import { format } from "date-fns";
import Image from "next/image";
import { EllipsisVertical, MessageSquareMore } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTask } from "@/lib/supabase/api/tasks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type TaskProps = {
  task: TaskType;
};

const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    options: {
      dropEffect: "move",
    },
  }));

  const taskTagSplit = task.tags?.split(",") || [];
  const formattedStartDate = task.startdate
    ? format(new Date(task.startdate), "P")
    : "";
  const formattedDueDate = task.duedate
    ? format(new Date(task.duedate), "P")
    : "";
  const numberOfComments = task.comments?.length ?? 0;

  const queryClient = useQueryClient();
  const handleDeleteTask = async (taskid: number) => {
    await deleteTask(taskid);
    toast("Success", { description: "Task deleted" });
    queryClient.invalidateQueries({ queryKey: ["task-all-project"] });
  };

  const priorityTag = ({ priority }: { priority: TaskType["priority"] }) => {
    return (
      <div
        className={`rounded-full px-2 py-1 text-xs font-semibold ${
          priority === "Urgent"
            ? "bg-red-200 text-red-700"
            : priority === "High"
            ? "bg-yellow-200 text-yellow-700"
            : priority === "Medium"
            ? "bg-green-200 text-green-700"
            : priority === "Low"
            ? "bg-blue-200 text-blue-700"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {priority}
      </div>
    );
  };

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary transition-transform ${
        isDragging ? "opacity-50 scale-[96%]" : "opacity-100"
      }`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileurl}`}
          alt={task.attachments[0].filename}
          className="h-auto w-full rounded-t-md"
        />
      )}
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && priorityTag({ priority: task.priority })}
            <div className="flex gap-2">
              {taskTagSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                >
                  {" "}
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
                <EllipsisVertical size={20} className="cursor-pointer" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left">
              <DropdownMenuLabel>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="size-full hover:underline cursor-pointer text-red-500"
                >
                  Delete
                </button>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="my-3 flex items-center justify-between">
          <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
          {typeof task.points == "number" && (
            <div className="text-xs font-semibold dark:text-white">
              {task.points} pts
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500">
          {formattedStartDate || "No Start Date"} -{" "}
          {formattedDueDate || "No Due Date"}
        </p>

        <p className="text-sm text-gray-600 dark:text-neutral-500">
          {task.description}
        </p>
        <div className="text-sm text-gray-600 dark:text-neutral-500" />

        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-2 overflow-hidden">
            {task.assignee && (
              <Avatar className="border-2 border-white dark:border-dark-secondary">
                <AvatarImage
                  src={task.assignee.profilepictureurl}
                  alt={task.assignee.username}
                  height={30}
                  width={30}
                />
                <AvatarFallback>
                  <span>{task.assignee.username.charAt(0)}</span>
                </AvatarFallback>
              </Avatar>
            )}
            {task.author && (
              <Avatar className="border-2 border-white dark:border-dark-secondary">
                <AvatarImage
                  src={task.author.profilepictureurl}
                  alt={task.author.username}
                  height={30}
                  width={30}
                />
                <AvatarFallback>
                  <span>{task.author.username.charAt(0)}</span>
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <div className="flex items-center text-gray-500 dark:text-neutral-500">
            <MessageSquareMore size={20} />
            <span className="ml-1 text-sm dark:text-neutral-400">
              {numberOfComments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Task };
