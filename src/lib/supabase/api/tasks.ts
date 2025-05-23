import { Task } from "@/store/type";
import { createClient } from "../client";

export const getTaskByProjectId = async (id: string) => {
  const { data, error } = await createClient()
    .from("task")
    .select()
    .eq("projectid", id);
  if (data) return data as Task[];
};
