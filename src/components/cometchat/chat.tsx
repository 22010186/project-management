import React, { useEffect, useState } from "react";
import { CometChat, User } from "@cometchat/chat-sdk-javascript";
import { COMETCHAT_CONSTANTS } from "../../../utils/const";
import { useStateUser } from "@/store/state";
import { Loading } from "../loading";
import ChatApp from "./chatapp";

type Props = {
  openChat: boolean;
};

const CometChatComponent = ({ openChat }: Props) => {
  const { dataUser } = useStateUser();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (!dataUser) return;

    const loginOrCreate = async (uid: string, name: string) => {
      try {
        // Đăng nhập vào CometChat
        const loggedInUser = await CometChat.login(
          uid,
          COMETCHAT_CONSTANTS.AUTH_KEY
        );
        setUser(loggedInUser);
      } catch (error) {
        // Nếu lỗi "user not found", tạo user mới
        if ((error as any).code === "ERR_UID_NOT_FOUND") {
          try {
            const newUser = new CometChat.User(uid);
            newUser.setName(name);
            await CometChat.createUser(newUser, COMETCHAT_CONSTANTS.AUTH_KEY);

            const loggedInUser = await CometChat.login(
              uid,
              COMETCHAT_CONSTANTS.AUTH_KEY
            );
            setUser(loggedInUser);
          } catch (createError) {
            console.error("Create user failed:", createError);
          }
        } else {
          console.error("Login failed:", error);
        }
      }
    };

    const initCometChat = async () => {
      const appSettings = new CometChat.AppSettingsBuilder()
        .setRegion(COMETCHAT_CONSTANTS.REGION)
        .subscribePresenceForAllUsers()
        .build();

      try {
        await CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSettings);
        await loginOrCreate(dataUser?.id, dataUser?.email ?? "Unknown");
      } catch (error) {
        console.error("CometChat initialization failed:", error);
      }
    };

    initCometChat();
  }, [dataUser]);

  return (
    <div className="relative h-full">
      {user ? (
        // <div>Logged in to CometChat as {user.getName()}</div>
        <ChatApp user={user} listen={openChat} />
      ) : (
        <Loading classString="absolute" />
      )}
    </div>
  );
};

export default CometChatComponent;
