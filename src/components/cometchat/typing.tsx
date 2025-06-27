import React from "react";
import UserAvatar from "./useravatar";
import { User } from "@/store/type";

interface TypingIndicatorProps {
  user: User;
}

const TypingIndicator = ({ user }: TypingIndicatorProps) => {
  return (
    <div className="flex items-end space-x-2 animate-fade-in">
      <UserAvatar user={user} size="sm" />
      <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
