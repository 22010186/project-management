import { Task } from "@/store/type";
import { createClient } from "../client";

export const getTaskByProjectId = async (projectid: string) => {
  const { data, error } = await createClient()
    .from("task")
    .select()
    .order("duedate", { ascending: true })
    .eq("projectid", projectid);
  if (data) return data as Task[];
};

export const getTaskByUserId = async (userid: string) => {
  const { data, error } = await createClient()
    .from("task")
    .select()
    .eq("userid", userid);
  if (data) return data as Task[];
};

export const createTask = async (task: Partial<Task>) => {
  const { data, error } = await createClient()
    .from("task")
    .insert(task)
    .select();

  if (error) throw error;
  return data as Task[];
};

export const updateTaskStatus = async (taskId: string, status: string) => {
  const { data, error } = await createClient()
    .from("task")
    .update({ status })
    .eq("id", taskId);

  if (error) throw error;
  if (data) {
    return data as Task[];
  }
};
