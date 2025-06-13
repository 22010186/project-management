import { Task } from "@/store/type";
import { TaskCard } from "./task-card";

type ListProps = {
  id?: string;
  tasks?: Task[];
};

const ListView = ({ tasks }: ListProps) => {
  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        {tasks && !tasks.length && (
          <p className="text-center text-muted-foreground">No tasks found.</p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export { ListView };
