import React, { useEffect, useState } from "react";
import { Users, MessageSquare } from "lucide-react";
import { ChatRoom, User } from "@/store/type";
import { useStateProject } from "@/store/state";
import formatTime from "../../../utils/format-time";
import Link from "next/link";
import {
  attachGroupCounterListeners,
  fetchGroupCounters,
} from "@/lib/cometchat/group/count";

interface ChatSidebarProps {
  chatRooms: ChatRoom[];
  setMember: (data: { total: number; online: number }) => void;
}

const ChatSidebar = ({ chatRooms, setMember }: ChatSidebarProps) => {
  const { id, setId } = useStateProject();

  const [stats, setStats] = useState({ total: 0, online: 0 });

  useEffect(() => {
    if (!id) return;

    let cleanup: () => void;

    (async () => {
      // 1. fetch initial
      const data = await fetchGroupCounters(id.toString());
      setStats(data);
      setMember(data);
      // 2. attach listeners
      cleanup = attachGroupCounterListeners(id.toString(), setStats);
    })();

    return () => {
      cleanup?.();
    };
  }, [id]);

  const handleChangeRoom = (roomId: number) => {
    if (roomId) {
      setId(roomId);
    }
  };

  return (
    <div className="hidden md:w-50 lg:w-60 xl:w-80 bg-white dark:bg-dark-secondary border-r border-gray-200 dark:border-gray-600 md:flex flex-col transition-all overflow-y-auto no-scroll">
      <div className="p-4 border-b border-gray-200 dark:border-gray-600">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Groups Chats
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chatRooms.map((room) => (
          <Link key={room.id} href={`/project/${room.id}`}>
            <div
              onClick={() => handleChangeRoom(room.id)}
              className={`p-3 border-b border-gray-100 dark:border-gray-600 cursor-pointer hover:bg-gray-200 dark:hover:bg-blue-500 transition-colors ${
                id === room.id
                  ? "bg-blue-200 border-blue-200 dark:bg-blue-700 dark:border-blue-700"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-white" />
                  </div>

                  {room.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {room.unreadCount}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {room.name}
                    </h3>
                  </div>

                  <div className="flex items-center mt-1">
                    <Users
                      size={12}
                      className="text-gray-400 dark:text-gray-200 mr-1"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-300">
                      {stats.total} members
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
