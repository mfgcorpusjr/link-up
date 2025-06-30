import { View, Pressable } from "react-native";
import { Link } from "expo-router";

import Icon from "@/components/common/Icon";

import useNotificationStore from "@/store/useNotificationStore";

export default function NotificationIcon() {
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  return (
    <Link href="/notifications" asChild>
      <Pressable>
        <Icon name="heart-outline" size={32} />

        {unreadCount > 0 && (
          <View className="absolute -top-1 -right-1 bg-rose-500 w-4 h-4 rounded-full" />
        )}
      </Pressable>
    </Link>
  );
}
