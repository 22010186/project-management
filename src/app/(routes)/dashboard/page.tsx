"use client";

import { QuickActions } from "@/components/dashboard/quick-action";
import { RecentTasks } from "@/components/dashboard/recent-task";
import { TaskChart } from "@/components/dashboard/task-chart";
import { TaskStats } from "@/components/dashboard/task-status";
import { useSidebar } from "@/components/ui/sidebar";
import { getTasksByProjects } from "@/lib/supabase/api/tasks";
import { useStateProject } from "@/store/state";
import { Task } from "@/store/type";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Dashboard() {
  const { setOpen } = useSidebar();
  useEffect(() => {
    setOpen(true);
  }, []);

  const { projects } = useStateProject();

  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`task-all-project`],
    queryFn: () => getTasksByProjects(projects!),
    enabled: !!projects?.length,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div>
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-6 space-y-6">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          </div>

          <TaskStats tasks={tasks ?? []} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentTasks tasks={tasks ?? []} />
            <TaskChart />
          </div>

          <QuickActions />
        </div>
      </main>
    </div>
  );
}
