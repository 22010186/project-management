"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

interface FormDataType {
  name?: string;
  email: string;
  password: string;
}

export async function login(data: FormDataType, ipaddress: string) {
  const supabase = await createClient();

  // Kiểm tra ip có trong blacklist không nếu có thì chặn đăng nhập
  const { data: ip_blacklist } = await supabase
    .from("ip_blacklist")
    .select("*")
    .eq("ipaddress", ipaddress)
    .eq("active", true)
    .single();
  if (ip_blacklist) {
    throw new Error("Your IP is blocked.");
  }

  const { data: res, error } = await supabase.auth.signInWithPassword(data);

  if (!res.user || error) {
    // Lấy userid từ email
    const { data: user } = await supabase
      .from("User")
      .select("userid")
      .eq("email", data.email)
      .single();

    const { data: ip_log } = await supabase
      .from("user_ip_logs")
      .select("login_count")
      .eq("userid", user?.userid)
      .eq("ip_address", ipaddress)
      .single();

    if (ip_log) {
      await supabase
        .from("user_ip_logs")
        .update({ login_count: ip_log.login_count + 1 })
        .eq("userid", user?.userid);
      if (ip_log.login_count >= 3) {
        const ipInBlacklist = await supabase
          .from("ip_blacklist")
          .select("*")
          .eq("ipaddress", ipaddress)
          .eq("addedbyid", user?.userid)
          .eq("active", true)
          .single();
        if (ipInBlacklist.data) {
          throw new Error("Too many failed login attempts.");
        } else {
          await supabase.from("ip_blacklist").insert({
            ipaddress: ipaddress,
            reason: "Too many failed login attempts",
            addedbyid: user?.userid,
            active: true,
          });
        }
        throw new Error("Too many failed login attempts.");
      }
    } else {
      await supabase.from("user_ip_logs").insert({
        userid: user?.userid,
        ip_address: ipaddress,
        login_count: 1,
      });
    }
    throw error;
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
