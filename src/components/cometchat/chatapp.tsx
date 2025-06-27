import React, { useState, useRef, useEffect, useMemo } from "react";
import ChatHeader from "./chatheader";
import ChatSidebar from "./chatsidebar";
import MessageList from "./messagelist";
import MessageInput from "./messageinput";
import { ChatRoom, Message, User } from "@/store/type";
import { useStateProject, useStateUser } from "@/store/state";
import { joinOrCreateGroup } from "@/lib/cometchat/join";
import { User as UserSender } from "@cometchat/chat-sdk-javascript";

type Props = {
  user: UserSender;
  listen: boolean;
};
const ChatApp = ({ user, listen }: Props) => {
  const { projects, id } = useStateProject();
  const [member, setMember] = useState<{ total: number; online: number }>({
    total: 0,
    online: 0,
  });

  const projectRooms = useMemo(() => {
    if (!projects) return [];
    return projects.map((project) => {
      return {
        id: project.id,
        name: project.name,
        isGroup: true,
        participants: {
          total: 0,
          online: 0,
        },
        unreadCount: 0,
      } as ChatRoom;
    });
  }, [projects]);

  const activeChat = useMemo(() => {
    return projectRooms.find((room) => room.id === id);
  }, [projectRooms, id]);

  useEffect(() => {
    if (!activeChat?.id) return;
    joinOrCreateGroup(activeChat.id, activeChat.name, "public");
  }, [activeChat]);

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-600 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-full max-h-[800px] bg-white dark:bg-gray-700 rounded-2xl shadow-2xl overflow-hidden flex">
        <ChatSidebar chatRooms={projectRooms} setMember={setMember} />

        <div className="flex-1 flex flex-col">
          <ChatHeader chatRoom={activeChat!} member={member} />
          <MessageList currentUser={user} />

          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
