import { CometChat, BaseMessage } from "@cometchat/chat-sdk-javascript";
import { COMETCHAT_CONSTANTS } from "../../../../utils/const";

const appID = COMETCHAT_CONSTANTS.APP_ID; // Thay bằng App ID của bạn
const region = COMETCHAT_CONSTANTS.REGION; // Thay bằng region của bạn
const authKey = COMETCHAT_CONSTANTS.AUTH_KEY;
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();

export const fetchMessages = async (
  groupId: string,
  setMessages: (messages: BaseMessage[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) => {
  const messageRequest = new CometChat.MessagesRequestBuilder()
    .setGUID(groupId)
    .setLimit(50)
    .build();

  try {
    setLoading(true);
    const fetchedMessages = await messageRequest.fetchPrevious();
    setMessages(fetchedMessages);
    setLoading(false);
  } catch (err) {
    console.error("Fetch failed:", err);
    setError("Fetch messages failed " + err);
  }
};

export const addMessageListener = (
  groupId: string,
  addMessage: (messages: BaseMessage) => void,
  setError: (error: string | null) => void
) => {
  CometChat.addMessageListener(
    `listener_${groupId}`,
    new CometChat.MessageListener({
      onTextMessageReceived: (msg: CometChat.TextMessage) => {
        addMessage(msg);
      },
      onMediaMessageReceived: (msg: CometChat.BaseMessage) => {
        addMessage(msg);
      },
      onResponseError(res: any) {
        setError(`Request failed with status code ${res.response.status}`);
      },
    })
  );
};

export const removeListener = (groupId: string) => {
  CometChat.removeMessageListener(`listener_${groupId}`);
};
