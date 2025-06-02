import { Project } from "@/store/type";
import { createClient } from "../client";
import { useStateUser } from "@/store/state";

export const getAllProjects = async () => {
  // const { dataUser } = useStateUser();
  // if (!dataUser.email) return [] as Project[];

  const { data, error } = await createClient().from("project").select();
  if (data) return data as Project[];
};
