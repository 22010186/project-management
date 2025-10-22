import { createClient } from "../server";

// Kiểm tra xem IP có bị blacklist không
export async function isIpBlocked(ip: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("ip_blacklist")
    .select("*")
    .eq("ipaddress", ip)
    .eq("active", true)
    .maybeSingle();

  if (!data) return false;
  if (data.expiresat && new Date(data.expiresat) < new Date()) return false;
  return true;
}

// Thêm IP vào blacklist
export async function addIpToBlacklist(
  ip: string,
  reason?: string,
  addedById?: number,
  expiresAt?: Date
) {
  const supabase = await createClient();
  await supabase.from("ip_blacklist").insert({
    ipaddress: ip,
    reason,
    addedbyid: addedById,
    expiresat: expiresAt?.toISOString(),
  });
}

// Gỡ IP khỏi blacklist
export async function removeIpFromBlacklist(ip: string) {
  const supabase = await createClient();
  await supabase
    .from("ip_blacklist")
    .update({ active: false })
    .eq("ipaddress", ip);
}
