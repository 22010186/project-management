"use client";

import { ProjectHeader } from "@/components/project/project-header";
import { BoardView } from "@/components/project/view/board/board-view";
import { getAllProjects } from "@/lib/supabase/api/projects";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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

  const queryClient = useQueryClient();

  // Lấy dữ liệu đã cache từ query key ['user']
  const cacheProjects = queryClient.getQueryData(["allProjects"]);

  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab == "Board" && (
        <BoardView id={id} setIsModalNewTask={setIsModalNewTaskOpen} />
      )}
    </div>
  );
}
