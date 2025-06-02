import { createClient } from "../client";
import { User } from "@/store/type";

export const getUserData = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;

  const { data: userData } = await supabase
    .from("User")
    .select()
    .eq("cognitoid", data.user.id);
  const userid = (userData as User[])[0].userid;

  return {
    ...data.user,
    userid,
  };
};

export const createUser = async (cognitoid: string, username: string) => {
  const { error } = await createClient().from("User").insert({
    cognitoid,
    username,
  });

  if (error) throw error;
};
