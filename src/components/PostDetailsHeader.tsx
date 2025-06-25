import { View } from "react-native";

import ScreenHeader from "@/components/common/ScreenHeader";
import BackButton from "@/components/common/BackButton";
import PostItem from "@/components/PostItem";
import CommentForm from "@/components/CommentForm";

import { PostItem as TPostItem, Profile } from "@/types/models";

type PostDetailsHeaderProps = {
  post: TPostItem;
  profile: Profile;
};

export default function PostDetailsHeader({
  post,
  profile,
}: PostDetailsHeaderProps) {
  return (
    <View className="gap-10">
      <ScreenHeader title="Post Details" leftIcon={<BackButton />} />

      <PostItem
        post={post}
        showMoreIcon={false}
        showActionsIcon={post.profile_id === profile.id}
      />

      <CommentForm post={post} />
    </View>
  );
}
