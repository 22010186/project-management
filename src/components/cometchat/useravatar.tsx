import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@cometchat/chat-sdk-javascript";

interface UserAvatarProps {
  user: User;
  size: "sm" | "md" | "lg";
  isOnline?: boolean;
}

const UserAvatar = ({ user, size, isOnline }: UserAvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div className="relative">
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={user.getAvatar()} />
        <AvatarFallback>
          {user.getName().charAt(0) + user.getName().charAt(1)}
        </AvatarFallback>
      </Avatar>
      {isOnline && (
        <div
          className={`absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full ${
            size === "sm" ? "w-2.5 h-2.5" : ""
          }`}
        ></div>
      )}
    </div>
  );
};

export default UserAvatar;
