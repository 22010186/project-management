import { updateTaskStatus } from "@/lib/supabase/api/tasks";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskColumn } from "./task-column";
import { Task } from "@/store/type";

type BoardProps = {
  id: string;
  tasks?: Task[];
};

const taskStatus = [
  {
    title: "To Do",
    key_lng: "todo",
  },
  {
    title: "Work In Progress",
    key_lng: "work_in_progress",
  },
  {
    title: "Under Review",
    key_lng: "under_review",
  },
  {
    title: "Completed",
    key_lng: "completed",
  },
];

export const BoardView = ({ id, tasks }: BoardProps) => {
  const moveTask = async (taskId: string, toStatus: string) => {
    // if (!tasks) return;

    // const targetTask = tasks.find((task) => task.id == Number(taskId));
    // if (targetTask) {
    //   targetTask.status = toStatus as Status;
    // }

    await updateTaskStatus(taskId, toStatus);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            projectId={id}
            key={status.title}
            status={status.title}
            keyLng={status.key_lng}
            tasks={tasks ?? []}
            moveTask={moveTask}
          />
        ))}
      </div>
    </DndProvider>
  );
};
