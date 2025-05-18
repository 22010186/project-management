import { createClient } from "../client";

export const getAllProjects = async () => {
  const { data, error } = await createClient().from("project").select();
  if (data) return data;
};
