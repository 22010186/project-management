import React from "react";
import UserAvatar from "./useravatar";
import formatTime from "../../../utils/format-time";
import { BaseMessage, User } from "@cometchat/chat-sdk-javascript";

interface MessageBubbleProps {
  message: BaseMessage;
  currentUser: User;
}

const MessageBubble = ({ message, currentUser }: MessageBubbleProps) => {
  return (
    <div
      className={`flex items-end space-x-2 animate-fade-in ${
        message.getSender().getUid() == currentUser.getUid()
          ? "flex-row-reverse space-x-reverse"
          : ""
      }`}
    >
      <div className="flex-shrink-0">
        {message.getSender().getUid() != currentUser.getUid() ? (
          <UserAvatar user={message.getSender()} size="sm" />
        ) : (
          <div className="w-8 h-8" />
        )}
      </div>
      <div
        className={`max-w-xs lg:max-w-md ${
          message.getSender().getUid() == currentUser.getUid() ? "order-1" : ""
        }`}
      >
        {!(message.getSender().getUid() == currentUser.getUid()) && (
          <p className="text-xs text-gray-500 mb-1 px-1">
            {message.getSender().getName()}
          </p>
        )}
        <div
          className={`px-4 py-2 rounded-2xl ${
            message.getSender().getUid() == currentUser.getUid()
              ? "bg-blue-500 text-white rounded-br-md"
              : "bg-white text-gray-900 rounded-bl-md shadow-sm border border-gray-100"
          }`}
        >
          <p className="text-sm leading-relaxed">{message.getData().text}</p>
        </div>
        <p
          className={`text-xs text-gray-500 dark:text-gray-300 mt-1 ${
            message.getSender().getUid() == currentUser.getUid()
              ? "text-right"
              : "text-left"
          }`}
        >
          {formatTime(message.getSentAt())}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
