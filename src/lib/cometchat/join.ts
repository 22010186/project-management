import { CometChat } from "@cometchat/chat-sdk-javascript";

/**
 * Tự động tham gia group hoặc tạo mới nếu chưa có.
 * @param groupId - ID duy nhất của group (ví dụ: "class12a")
 * @param groupName - Tên hiển thị của group (ví dụ: "Lớp 12A")
 * @param type - Kiểu group: public | private | password (default: public)
 */
export const joinOrCreateGroup = async (
  groupId: number,
  groupName: string,
  type: "public" | "private" | "password" = "public",
  password = ""
) => {
  const groupType = {
    public: CometChat.GROUP_TYPE.PUBLIC,
    private: CometChat.GROUP_TYPE.PRIVATE,
    password: CometChat.GROUP_TYPE.PASSWORD,
  }[type] as CometChat.GroupType;

  try {
    // 👉 Thử join group trước
    const group = await CometChat.joinGroup(
      groupId.toString(),
      groupType,
      password
    );
    console.log("✅ Joined group:", group);
    return group;
  } catch (err: any) {
    // ⚠️ Nếu lỗi là group chưa tồn tại thì tạo mới
    if (err && err.code === "ERR_GUID_NOT_FOUND") {
      try {
        const newGroup = new CometChat.Group(
          groupId.toString(),
          groupName,
          groupType,
          password
        );
        const createdGroup = await CometChat.createGroup(newGroup);
        console.log("🆕 Group created:", createdGroup);

        // Sau khi tạo thì tự động join
        const joined = await CometChat.joinGroup(
          groupId.toString(),
          groupType,
          password
        );
        console.log("✅ Joined new group:", joined);
        return joined;
      } catch (createError) {
        console.error("❌ Failed to create/join group:", createError);
        throw createError;
      }
    } else {
      console.error("❌ Failed to join group:", err);
      throw err;
    }
  }
};
