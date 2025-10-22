import crypto from "crypto";
import { createClient } from "../server";

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// Tạo session mới khi user login
export async function createSession(
  userId: number,
  token: string,
  ip?: string,
  ua?: string
) {
  const supabase = await createClient();

  const tokenHash = hashToken(token);

  await supabase.from("session").insert({
    userid: userId,
    tokenhash: tokenHash,
    ipaddress: ip,
    useragent: ua,
    expiresat: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 ngày
  });
}

// Kiểm tra session hợp lệ
export async function verifySession(token: string) {
  const supabase = await createClient();
  const tokenHash = hashToken(token);
  const { data } = await supabase
    .from("session")
    .select("*")
    .eq("tokenhash", tokenHash)
    .eq("revoked", false)
    .maybeSingle();

  if (!data) return null;
  if (data.expiresat && new Date(data.expiresat) < new Date()) return null;

  return data;
}

// Đánh dấu session là revoked (logout)
export async function revokeSession(token: string) {
  const supabase = await createClient();
  const tokenHash = hashToken(token);
  await supabase
    .from("session")
    .update({ revoked: true })
    .eq("tokenhash", tokenHash);
}
