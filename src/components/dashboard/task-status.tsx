"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { Task } from "@/store/type";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type TaskStatusProp = {
  tasks: Task[];
};

const stats = [
  {
    title: "Total Tasks",
    value: "24",
    change: "+12%",
    icon: CheckCircle,
    color: "text-blue-600",
  },
  {
    title: "Work In Progress",
    value: "8",
    change: "+4%",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "Completed",
    value: "16",
    change: "+8%",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Overdue",
    value: "2",
    change: "-1%",
    icon: AlertCircle,
    color: "text-red-600",
  },
];

export function TaskStats({ tasks }: TaskStatusProp) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("page.dashboard.part.1.card." + (index + 1) + ".title")}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            {stat.title == "Total Tasks" && (
              <div className="text-2xl font-bold">{tasks.length}</div>
            )}
            {stat.title == "Work In Progress" && (
              <div className="text-2xl font-bold">
                {
                  tasks.filter((task) => task.status === "Work In Progress")
                    .length
                }
              </div>
            )}
            {stat.title == "Completed" && (
              <div className="text-2xl font-bold">
                {tasks.filter((task) => task.status === "Completed").length}
              </div>
            )}
            {stat.title == "Overdue" && (
              <div className="text-2xl font-bold">
                {
                  tasks.filter((task) => new Date(task.duedate!) < new Date())
                    .length
                }
              </div>
            )}
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {t("page.dashboard.part.1.card." + (index + 1) + ".description")}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
