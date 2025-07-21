import { createClient } from "../client";

export const uploadImage = async (file: File) => {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("projectm")
    .upload(`images/${file.name}`, file);

  if (error) throw error;
  return data.fullPath;
};

export const uploadAvatar = async (file: File, userid: number) => {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("projectm")
    .upload(`avatar/${file.name}`, file);

  console.log(data?.fullPath);

  if (error) throw error;

  await supabase
    .from("User")
    .update({ profilepictureurl: data.fullPath })
    .eq("userid", userid);

  return data.fullPath;
};
