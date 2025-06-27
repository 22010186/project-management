// src/services/cometchatCounters.ts
import { CometChat } from "@cometchat/chat-sdk-javascript";

export type GroupCounters = { total: number; online: number };

/**
 * Gọi API CometChat và trả về tổng + online của một group.
 */
export const fetchGroupCounters = async (
  groupId: string
): Promise<GroupCounters> => {
  const group = await CometChat.getGroup(groupId);
  const onlineObj = await CometChat.getOnlineGroupMemberCount([groupId]);

  return {
    total: group?.getMembersCount() ?? 0,
    // @ts-ignore
    online: onlineObj[groupId] ?? 0,
  };
};

/**
 * Gắn các listener cần thiết để cập nhật counters realtime.
 * Trả về một hàm cleanup cần được gọi khi unmount.
 *
 * @param groupId  GUID của group
 * @param onUpdate callback nhận { total, online } mới
 */
export const attachGroupCounterListeners = (
  groupId: string,
  onUpdate: (next: GroupCounters) => void
): (() => void) => {
  const listenerId = `grp_stats_${groupId}`;
  let counters: GroupCounters = { total: 0, online: 0 };

  /** helper cập nhật + đẩy sang callback */
  const set = (partial: Partial<GroupCounters>) => {
    counters = { ...counters, ...partial };
    onUpdate(counters);
  };

  // ── Group events ─────────────────────────────────────────────
  CometChat.addGroupListener(
    listenerId,
    new CometChat.GroupListener({
      onGroupMemberJoined: (_action: any, user: any, group: any) => {
        if (group.guid !== groupId) return;
        set({
          total: counters.total + 1,
          online:
            counters.online +
            (user.status === CometChat.USER_STATUS.ONLINE ? 1 : 0),
        });
      },
      onGroupMemberLeft: (_action: any, user: any, group: any) => {
        if (group.guid !== groupId) return;
        set({
          total: Math.max(0, counters.total - 1),
          online:
            counters.online -
            (user.status === CometChat.USER_STATUS.ONLINE ? 1 : 0),
        });
      },
    })
  );

  // ── Presence events ──────────────────────────────────────────
  CometChat.addUserListener(
    listenerId,
    new CometChat.UserListener({
      onUserOnline: () => void refresh(), // user lên online/offline ta refetch
      onUserOffline: () => void refresh(),
    })
  );

  /** refetch counters */
  const refresh = async () => {
    try {
      const latest = await fetchGroupCounters(groupId);
      counters = latest;
      onUpdate(latest);
    } catch (e) {
      console.error("refresh counters error", e);
    }
  };

  // Hàm cleanup
  return () => {
    CometChat.removeGroupListener(listenerId);
    CometChat.removeUserListener(listenerId);
  };
};
