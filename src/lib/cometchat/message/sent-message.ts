import { CometChat, TextMessage } from "@cometchat/chat-sdk-javascript";

/**
 * Gửi tin nhắn văn bản tới một group CometChat.
 *
 * @param groupId  - ID của group (ví dụ: "lop12a")
 * @param text     - Nội dung tin nhắn
 * @returns        - Đối tượng Message đã được server xác nhận
 */
export const sendGroupTextMessage = async (groupId: number, text: string) => {
  // 1. Tạo đối tượng tin nhắn
  const message = new CometChat.TextMessage(
    groupId.toString(), // receiver ID (groupId)
    text, // nội dung
    CometChat.RECEIVER_TYPE.GROUP // kiểu người nhận: GROUP
  );

  // (Tuỳ chọn) Thêm metadata, lấy ví dụ:
  // message.setMetadata({ foo: "bar" });

  try {
    // 2. Gửi lên server
    const sentMessage = await CometChat.sendMessage(message);
    console.log("✅ Message sent:", sentMessage);
    return sentMessage;
  } catch (error) {
    console.error("❌ Sending message failed:", error);
    throw error;
  }
};
