"use client";

import { ProjectHeader } from "@/components/project/project-header";
import { BoardView } from "@/components/project/view/board/board-view";
import { ListView } from "@/components/project/view/list/list-view";
import { getAllProjects } from "@/lib/supabase/api/projects";
import { getTaskByProjectId } from "@/lib/supabase/api/tasks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

type Props = {
  id: string;
};

export default function Project() {
  const params = useParams<Props>();
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`task-project-${id}`],
    queryFn: () => getTaskByProjectId(id),
  });

  if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {isLoading ? (
        <div className="">
          <LoaderIcon className="size-5 animate-spin" />
        </div>
      ) : (
        <>
          {activeTab == "Board" && (
            <BoardView
              id={id}
              tasks={tasks}
              setIsModalNewTask={setIsModalNewTaskOpen}
            />
          )}
          {activeTab == "List" && (
            <ListView
              id={id}
              tasks={tasks}
              setIsModalNewTask={setIsModalNewTaskOpen}
            />
          )}

          {/* Timeline and table view at 4h23m */}
        </>
      )}
    </div>
  );
}
