import { useStateUser } from "@/store/state";
import { createClient } from "../client";

export const getUser = async () => {
  const { dataUser, setDataUser } = useStateUser();
  const { data, error } = await createClient().auth.getUser();
  if (error) throw error;
  setDataUser(data.user);
  return data.user;
};

export const createUser = async (cognitoid: string, username: string) => {
  const { error } = await createClient().from("User").insert({
    cognitoid,
    username,
  });

  if (error) throw error;
};
