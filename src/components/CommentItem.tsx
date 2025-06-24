import { View } from "react-native";

import Avatar from "@/components/common/Avatar";
import Icon from "@/components/common/Icon";
import Text from "@/components/ui/Text";

import { CommentWithProfile } from "@/types/models";

import { humanReadableDate } from "@/helpers/date";

type CommentItemProps = {
  comment: CommentWithProfile;
};

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <View className="flex-row gap-2">
      <Avatar uri={comment.profile.avatar} />

      <View className="flex-1 gap-1">
        <View className="flex-row gap-3 p-3 rounded-2xl bg-zinc-100">
          <View className="flex-1 gap-1">
            <Text className="font-bold">{comment.profile.name}</Text>
            <Text>{comment.text}</Text>
          </View>

          <Icon name="trash-outline" color="crimson" />
        </View>

        <Text variant="caption">{humanReadableDate(comment.created_at)}</Text>
      </View>
    </View>
  );
}

{
  /* <Text variant="caption">{humanReadableDate(comment.created_at)}</Text> */
}
