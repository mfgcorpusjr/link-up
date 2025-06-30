import { useEffect } from "react";

import { supabase } from "@/lib/supabase";

import useNotificationStore from "@/store/useNotificationStore";

const useNotificationSubscription = (profileId?: string) => {
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);

  useEffect(() => {
    if (!profileId) return;

    setUnreadCount(profileId);

    const channel = supabase
      .channel("realtime:insert_notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `receiver_id=eq.${profileId}`,
        },
        () => setUnreadCount(profileId)
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `receiver_id=eq.${profileId}`,
        },
        () => setUnreadCount(profileId)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profileId]);
};

export default useNotificationSubscription;
