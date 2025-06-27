import React from "react";
import { Phone, Video, MoreVertical, Users } from "lucide-react";
import UserAvatar from "./useravatar";
import { ChatRoom, User } from "@/store/type";

interface ChatHeaderProps {
  chatRoom: ChatRoom;
  member: { total: number; online: number };
}

const ChatHeader = ({ chatRoom, member }: ChatHeaderProps) => {
  return (
    <div className="bg-white dark:bg-dark-secondary border-b border-gray-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Users size={20} className="text-white" />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">
            {chatRoom.name}
          </h2>
          {chatRoom.isGroup ? (
            <p className="text-sm text-green-500 flex items-center">
              <Users size={12} className="mr-1" />
              {member.online} of {member.total} online
            </p>
          ) : (
            <p className="text-sm text-green-500 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Online
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button className="p-2 text-gray-500 dark:text-white hover:text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-500 cursor-pointer rounded-full transition-colors">
          <Phone size={20} />
        </button>
        <button className="p-2 text-gray-500 dark:text-white hover:text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-500 cursor-pointer rounded-full transition-colors">
          <Video size={20} />
        </button>
        <button className="p-2 text-gray-500 dark:text-white hover:text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-500 cursor-pointer rounded-full transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
