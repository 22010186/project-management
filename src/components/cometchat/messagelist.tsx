import { useEffect, useRef, useState } from "react";
import { useStateMessage, useStateProject } from "@/store/state";
import MessageBubble from "./messagebubble";
import { Loading } from "../loading";
import {
  addMessageListener,
  fetchMessages,
  removeListener,
} from "@/lib/cometchat/message/get-message";

type MessageListProps = {
  currentUser: CometChat.User;
};

export default function MessageList({ currentUser }: MessageListProps) {
  const { id } = useStateProject();
  const { messages, setMessages, addMessage } = useStateMessage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages(id.toString(), setMessages, setLoading, setError);
    addMessageListener(id.toString(), addMessage, setError);

    return () => {
      removeListener(id.toString());
    };
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loading)
    return (
      <div className="relative flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-dark-secondary text-center">
        <Loading classString="absolute" />
      </div>
    );
  if (error)
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-dark-secondary text-center">
        Error: {error}
      </div>
    );

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-dark-secondary no-scroll">
      {messages.map((message) => (
        <MessageBubble
          key={message.getId()}
          message={message}
          currentUser={currentUser}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
