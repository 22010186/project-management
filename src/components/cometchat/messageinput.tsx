import React, { useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";
import { Message, User } from "@/store/type";
import { sendGroupTextMessage } from "@/lib/cometchat/message/sent-message";
import { useStateMessage, useStateProject } from "@/store/state";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { id } = useStateProject();
  const { addMessage } = useStateMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const mess = await sendGroupTextMessage(id, message);
      addMessage(mess);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-secondary border-t border-gray-100 p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <button
          type="button"
          className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 cursor-pointer rounded-full transition-colors"
        >
          <Paperclip size={20} />
        </button>
        <div className="flex-1 relative flex items-center">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32"
            rows={1}
            style={{ minHeight: "40px" }}
          />
          <button
            type="button"
            className="absolute right-2 bottom-2 p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-full transition-colors"
          >
            <Smile size={18} />
          </button>
        </div>
        <button
          type="submit"
          disabled={!message.trim()}
          className="flex-shrink-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
