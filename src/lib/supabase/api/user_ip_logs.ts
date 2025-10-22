import { sendLoginAlertEmail } from "@/lib/mailtrap";
import { createClient } from "../client";

export const resetOrInsertIpLog = async (
  cognitoid: string,
  ipaddress: string
) => {
  const supabase = createClient();

  const { data: user } = await supabase
    .from("User")
    .select("userid, email")
    .eq("cognitoid", cognitoid)
    .single();

  const { data: reset_log } = await supabase
    .from("user_ip_logs")
    .select("id")
    .eq("userid", Number(user?.userid))
    .eq("ip_address", ipaddress)
    .single();

  console.log("Insert new log with 0 login_count");
  if (reset_log) {
    await supabase
      .from("user_ip_logs")
      .update({
        login_count: 0,
      })
      .eq("id", reset_log.id);
  } else {
    await supabase.from("user_ip_logs").insert({
      userid: Number(user?.userid),
      ip_address: ipaddress,
      login_count: 0,
    });

    const { data: allLogs } = await supabase
      .from("user_ip_logs")
      .select("*")
      .eq("userid", Number(user?.userid));

    if (allLogs && allLogs.length > 1) {
      await fetch("/api/send-login-alert", {
        method: "POST",
        body: JSON.stringify({
          userEmail: user?.email,
          ipAddress: ipaddress,
        }),
      });
    }
  }
};
