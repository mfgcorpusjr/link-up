import { View } from "react-native";

import Avatar from "@/components/common/Avatar";
import Icon from "@/components/common/Icon";
import Text from "@/components/ui/Text";

import { CommentWithProfile } from "@/types/models";

import useDeleteComment from "@/hooks/useDeleteComment";

import { humanReadableDate } from "@/helpers/date";

type CommentItemProps = {
  comment: CommentWithProfile;
  showActionIcon?: boolean;
};

export default function CommentItem({
  comment,
  showActionIcon,
}: CommentItemProps) {
  const { isDeleting, handleDelete } = useDeleteComment();

  return (
    <View className="flex-row gap-2">
      <Avatar uri={comment.profile.avatar} />

      <View className="flex-1">
        <View className="flex-row gap-3 p-3 rounded-2xl bg-zinc-100">
          <View className="flex-1">
            <Text className="font-bold">{comment.profile.name}</Text>
            <Text>{comment.text}</Text>
          </View>

          {showActionIcon && (
            <Icon
              name="trash-outline"
              color="crimson"
              isLoading={isDeleting}
              onPress={() => handleDelete(comment.id)}
            />
          )}
        </View>

        <Text variant="caption" className="px-3">
          {humanReadableDate(comment.created_at)}
        </Text>
      </View>
    </View>
  );
}

{
  /* <Text variant="caption">{humanReadableDate(comment.created_at)}</Text> */
}
