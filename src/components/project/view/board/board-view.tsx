import { getTaskByProjectId, updateTaskStatus } from "@/lib/supabase/api/tasks";
import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskColumn } from "./task-column";
import { Status, Task } from "@/store/type";
import { useEffect, useState } from "react";

type BoardProps = {
  id: string;
  setIsModalNewTask: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

export const BoardView = ({ id, setIsModalNewTask }: BoardProps) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`task-project-${id}`],
    queryFn: () => getTaskByProjectId(id),
  });

  const moveTask = async (taskId: string, toStatus: string) => {
    // if (!tasks) return;

    // const targetTask = tasks.find((task) => task.id == Number(taskId));
    // if (targetTask) {
    //   targetTask.status = toStatus as Status;
    // }

    await updateTaskStatus(taskId, toStatus);
  };

  if (isLoading)
    return (
      <div className="">
        <LoaderIcon className="size-5 animate-spin" />
      </div>
    );

  if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            projectId={id}
            key={status}
            status={status}
            tasks={tasks ?? []}
            moveTask={moveTask}
            setIsModalNewTask={setIsModalNewTask}
          />
        ))}
      </div>
    </DndProvider>
  );
};
