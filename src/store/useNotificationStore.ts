import { create } from "zustand";

import { getUnreadCount } from "@/api/notification";

type NotificationStore = {
  unreadCount: number;
  setUnreadCount: (receiverId: string) => void;
};

const useNotificationStore = create<NotificationStore>()((set) => ({
  unreadCount: 0,

  setUnreadCount: async (receiverId: string) => {
    const _unreadCount = await getUnreadCount(receiverId);
    set({ unreadCount: _unreadCount || 0 });
  },
}));

export default useNotificationStore;
