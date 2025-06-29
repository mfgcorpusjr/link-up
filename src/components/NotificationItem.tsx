import { Pressable, View } from "react-native";
import { Link } from "expo-router";
import { twMerge } from "tailwind-merge";

import Avatar from "@/components/common/Avatar";
import Text from "@/components/ui/Text";

import { NotificationWithSender } from "@/types/models";

import { shortHandDate } from "@/helpers/date";

import shadow from "@/constants/shadow";

type NotificationItemProps = {
  notification: NotificationWithSender;
};

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  const className =
    "flex-row items-center gap-4 bg-white border border-zinc-200 rounded-2xl p-3";

  return (
    <Link href={`/post/${notification.post_id}`} asChild>
      <Pressable
        className={twMerge(className, !notification.is_read && "bg-zinc-100")}
        style={shadow}
      >
        <Avatar uri={notification.sender.avatar} />

        <View className="flex-1">
          <Text className="font-bold">{notification.sender.name}</Text>
          <Text>{notification.title}</Text>
        </View>

        <Text variant="caption">{shortHandDate(notification.created_at)}</Text>
      </Pressable>
    </Link>
  );
}
