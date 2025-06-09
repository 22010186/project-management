"use client";

import React, { useMemo, useState, useEffect } from "react";
import { HeaderTitle } from "@/components/project/header/header-title";
import { DisplayOption, Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

interface Project {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  // Optional: Add progress field if available from API
  // progress?: number;
}

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = () => {
  const isDarkMode = typeof window !== "undefined"
    ? document.documentElement.classList.contains("dark")
    : false;

  const { data: projects, isLoading, isError } = useGetProjectsQuery<Project>();

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks: Task[] = useMemo(() => {
    return (
      projects?.map((project: Project) => ({
        start: new Date(project.startDate),
        end: new Date(project.endDate),
        name: project.name,
        id: `Project-${project.id}`,
        type: "project" as TaskTypeItems,
        progress: 50, // Replace with project.progress if available
        isDisabled: false,
      })) || []
    );
  }, [projects]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const viewModeValue = event.target.value as ViewMode;
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: viewModeValue,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !projects)
    return <div>An error occurred while fetching projects</div>;

  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex items-center justify-between">
        <HeaderTitle name="Projects Timeline" button={false} />
        <div className="relative inline-block w-64">
          <select
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </header>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
            projectProgressColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
            projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;

// --- Custom Hook ---
// function useGetProjectsQuery<T>(): { data: T[] | null; isLoading: boolean; isError: boolean } {
//   const [data, setData] = useState<T[] | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isError, setIsError] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/projects");
//         if (!response.ok) throw new Error("Network response was not ok");
//         const result: T[] = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { data, isLoading, isError };
// }

// --- Custom Hook ---
function useGetProjectsQuery<T extends Project>(): {
  data: T[] | null;
  isLoading: boolean;
  isError: boolean;
} {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const loadMockData = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const mockData: Project[] = [
          {
            id: 1,
            name: "Website Redesign",
            startDate: "2025-06-01",
            endDate: "2025-06-20",
          },
          {
            id: 2,
            name: "Mobile App Launch",
            startDate: "2025-06-05",
            endDate: "2025-06-25",
          },
          {
            id: 3,
            name: "Marketing Campaign",
            startDate: "2025-06-15",
            endDate: "2025-07-05",
          },
        ];

        setData(mockData as T[]);
      } catch (error) {
        console.error("Error loading mock projects:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadMockData();
  }, []);

  return { data, isLoading, isError };
}

