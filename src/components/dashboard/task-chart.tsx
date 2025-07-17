"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dataEn = [
  {
    name: "Mon",
    completed: 4,
    created: 6,
  },
  {
    name: "Tue",
    completed: 3,
    created: 5,
  },
  {
    name: "Wed",
    completed: 5,
    created: 4,
  },
  {
    name: "Thu",
    completed: 7,
    created: 8,
  },
  {
    name: "Fri",
    completed: 6,
    created: 7,
  },
  {
    name: "Sat",
    completed: 2,
    created: 3,
  },
  {
    name: "Sun",
    completed: 1,
    created: 2,
  },
];
const dataVn = [
  {
    name: "T2",
    completed: 4,
    created: 6,
  },
  {
    name: "T3",
    completed: 3,
    created: 5,
  },
  {
    name: "T4",
    completed: 5,
    created: 4,
  },
  {
    name: "T5",
    completed: 7,
    created: 8,
  },
  {
    name: "T6",
    completed: 6,
    created: 7,
  },
  {
    name: "T7",
    completed: 2,
    created: 3,
  },
  {
    name: "CN",
    completed: 1,
    created: 2,
  },
];

export function TaskChart() {
  const { t, i18n } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("page.dashboard.part.2.card.2.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300} className="h-80">
          <BarChart data={i18n.language === "en" ? dataEn : dataVn}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="completed"
              fill="#22c55e"
              name={i18n.language === "en" ? "Completed" : "Đã hoàn thành"}
            />
            <Bar
              dataKey="created"
              fill="#3b82f6"
              name={i18n.language === "en" ? "Created" : "Đã tạo"}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
