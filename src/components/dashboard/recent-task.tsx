import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import { Task } from "@/store/type";

const recentTasks = [
  {
    id: 1,
    title: "Design system updates",
    assignee: "John Doe",
    dueDate: "2024-06-12",
    status: "in-progress",
    priority: "high",
  },
  {
    id: 2,
    title: "API integration testing",
    assignee: "Jane Smith",
    dueDate: "2024-06-14",
    status: "todo",
    priority: "medium",
  },
  {
    id: 3,
    title: "User feedback analysis",
    assignee: "Mike Johnson",
    dueDate: "2024-06-10",
    status: "completed",
    priority: "low",
  },
  {
    id: 4,
    title: "Mobile app optimization",
    assignee: "Sarah Wilson",
    dueDate: "2024-06-16",
    status: "todo",
    priority: "high",
  },
];

const getStatusColor = (status?: string) => {
  switch (status) {
    case "To Do":
      return "bg-[#2563EB]";
    case "Work In Progress":
      return "bg-[#FBBF24]";
    case "Under Review":
      return "bg-[#4ADE80]";
    case "Completed":
      return "bg-[#4ADE80]";
  }
};

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case "Urgent":
      return "bg-red-200 text-red-700";
    case "High":
      return "bg-yellow-200 text-yellow-700";
    case "Medium":
      return "bg-blue-200 text-blue-700";
    case "Low":
      return "bg-green-200 text-green-700";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

type RecentTaskProps = {
  tasks: Task[];
};

export function RecentTasks({ tasks }: RecentTaskProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 border border-border rounded-lg"
            >
              <div className="space-y-1">
                <h4 className="font-medium">{task.title}</h4>
                <div className="flex items-center text-sm text-muted-foreground space-x-2">
                  <User className="h-3 w-3" />
                  <span>{task?.authoruserid as any}</span>
                  <Clock className="h-3 w-3 ml-2" />
                  <span>{task.duedate}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                <Badge className={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
