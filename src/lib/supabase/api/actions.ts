"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

interface FormDataType {
  name?: string;
  email: string;
  password: string;
}

export async function login(data: FormDataType) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { data: res, error } = await supabase.auth.signInWithPassword(data);

  if (!res.user || error) {
    redirect("/error");
  }

  return {
    user: res.user,
    error,
  };
}

export async function signup(data: FormDataType) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { data: res, error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  return res;
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();
}
