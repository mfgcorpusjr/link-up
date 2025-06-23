import { View } from "react-native";
import { Link } from "expo-router";

import Avatar from "@/components/common/Avatar";
import Icon from "@/components/common/Icon";
import Text from "@/components/ui/Text";
import ImagePreview from "@/components/ImagePreview";
import VideoPreview from "@/components/VideoPreview";

import { PostItem as TPostItem } from "@/types/models";

import { humanReadableDate } from "@/helpers/date";
import { isImage } from "@/helpers/image";

import useLike from "@/hooks/useLike";
import useShare from "@/hooks/useShare";

type PostItemProps = {
  post: TPostItem;
  isViewable?: boolean;
  showMoreIcon?: boolean;
  showActions?: boolean;
};

const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
};

export default function PostItem({
  post,
  isViewable,
  showMoreIcon = true,
  showActions = false,
}: PostItemProps) {
  const { isLiked, toggleLike } = useLike(post);
  const { isSharing, share } = useShare(post);

  return (
    <View
      className="bg-white border border-zinc-200 rounded-2xl gap-4 p-4"
      style={shadow}
    >
      <View className="flex-row items-center gap-4">
        <Avatar uri={post.profile.avatar} size={40} />
        <View className="flex-1">
          <Text className="font-bold">{post.profile.name}</Text>
          <Text variant="caption">{humanReadableDate(post.created_at)}</Text>
        </View>
        {showMoreIcon && (
          <Link href={`/post/${post.id}`} asChild>
            <Icon name="ellipsis-horizontal-outline" size={20} />
          </Link>
        )}
        {showActions && (
          <View className="flex-row items-center gap-4">
            <Icon name="pencil-outline" />
            <Icon name="trash-outline" color="crimson" />
          </View>
        )}
      </View>

      <Text>{post.text}</Text>

      {post.file && isImage(post.file) && <ImagePreview uri={post.file} />}
      {post.file && !isImage(post.file) && (
        <VideoPreview uri={post.file} isViewable={isViewable} />
      )}

      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center gap-2">
          <Icon
            name={isLiked ? "heart" : "heart-outline"}
            color={isLiked ? "crimson" : "black"}
            onPress={toggleLike}
          />
          <Text>{post.likes.length}</Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Link href={`/post/${post.id}`} asChild>
            <Icon name="chatbox-ellipses-outline" />
          </Link>
          <Text>{post.comments.length}</Text>
        </View>

        <Icon
          name="share-social-outline"
          isLoading={isSharing}
          onPress={share}
        />
      </View>
    </View>
  );
}
