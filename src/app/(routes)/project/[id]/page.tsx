"use client";

import { Loading } from "@/components/loading";
import { ProjectHeader } from "@/components/project/header/project-header";
import { BoardView } from "@/components/project/view/board/board-view";
import { ListView } from "@/components/project/view/list/list-view";
import { getTaskByProjectId } from "@/lib/supabase/api/tasks";
import { useStateProject } from "@/store/state";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

type Props = {
  id: string;
};

export default function Project() {
  const params = useParams<Props>();
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const { name } = useStateProject();

  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`task-project-${id}`],
    queryFn: () => getTaskByProjectId(id),
  });

  if (isLoading) return <Loading />;
  if (error) throw error;

  return (
    <div>
      <ProjectHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        title={name}
      />

      {activeTab == "Board" && <BoardView id={id} tasks={tasks} />}
      {activeTab == "List" && <ListView id={id} tasks={tasks} />}
    </div>
  );
}
