"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

interface HeaderProps {
  className?: string;
}

export const ChangePassword = ({ className }: HeaderProps) => {
  const [show, setShow] = useState(false);

  const [currentIp, setCurrentIp] = useState("");
  const searchParams = useSearchParams();
  const newIp = searchParams.get("ip");

  const handleShow = () => {
    console.log("Current IP:", currentIp);
    console.log("New IP:", newIp);
    if (!newIp || newIp == currentIp) return;
    setShow(!show);
  };

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const r = await fetch("https://api.ipify.org?format=json");
        const data = await r.json();
        setCurrentIp(data.ip);
        console.log("Current IP Address:", currentIp);
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };

    fetchIp();
  }, []);
  return (
    <div className="flex flex-wrap gap-4">
      <Button onClick={() => handleShow()}>Đổi mật khẩu</Button>
      {show && <ChangePasswordForm />}
    </div>
  );
};

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Đổi mật khẩu thất bại");

      setMessage("✅ Đổi mật khẩu thành công!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="min-w-md">
      <CardHeader>
        <CardTitle>Thay đổi mật khẩu</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
            <Input
              id="currentPassword"
              type={showPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="newPassword">Mật khẩu mới</Label>
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm"
            >
              {showPassword ? (
                <>
                  <EyeOff className="w-4 h-4 mr-1" /> Ẩn
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-1" /> Hiện
                </>
              )}
            </Button>
          </div>

          {message && (
            <p
              className={`text-sm mt-2 ${
                message.startsWith("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <CardFooter className="px-0">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
