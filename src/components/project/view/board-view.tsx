import { getTaskByProjectId } from "@/lib/supabase/api/tasks";
import { Task } from "@/store/type";
import { useQuery } from "@tanstack/react-query";

type BoardProps = {
  id: string;
  setIsModalNewTask: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

export const BoardView = ({ id, setIsModalNewTask }: BoardProps) => {
  const { data } = useQuery({
    queryKey: [`task-project-${id}`],
    queryFn: () => getTaskByProjectId(id),
  });

  return (
    <div>
      {data && Array.isArray(data) && (
        <ul>
          {data.map((task: Task, idx: number) => (
            <li key={task.id || idx}>
              {typeof task === "object" && task.title
                ? task.title
                : JSON.stringify(task)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
