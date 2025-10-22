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
  const username = (userData as User[])[0].username;
  const teamid = (userData as User[])[0].teamid;
  const profilepictureurl = (userData as User[])[0].profilepictureurl;

  return {
    ...data.user,
    username,
    userid,
    teamid,
    profilepictureurl,
  };
};

export const createUser = async (
  cognitoid: string,
  username: string,
  email: string
) => {
  const { error } = await createClient().from("User").insert({
    cognitoid,
    username,
    email,
  });

  if (error) throw error;
};

export const getAllUser = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("User").select();
  if (error) throw error;
  return data as User[];
};
