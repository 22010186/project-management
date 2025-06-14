import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
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

export function TaskChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Task Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300} className="h-80">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completed" fill="#22c55e" name="Completed" />
            <Bar dataKey="created" fill="#3b82f6" name="Created" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
