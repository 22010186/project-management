// lib/cometchat.js
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { COMETCHAT_CONSTANTS } from "../../../utils/const";

const appID = COMETCHAT_CONSTANTS.APP_ID; // Thay bằng App ID của bạn
const region = COMETCHAT_CONSTANTS.REGION; // Thay bằng region của bạn
const authKey = COMETCHAT_CONSTANTS.AUTH_KEY;

const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();

export const initCometChat = async () => {
  return await CometChat.init(appID, appSetting);
};

export const loginCometChat = async (uid: string) => {
  return await CometChat.login(uid, authKey);
};

export const getCometChatInstance = () => CometChat;
