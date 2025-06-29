import { useEffect } from "react";
import { View, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import ListEmpty from "@/components/common/ListEmpty";
import CommentItem from "@/components/CommentItem";
import PostDetailsHeader from "@/components/PostDetailsHeader";

import usePost from "@/hooks/usePost";
import useNotification from "@/hooks/useNotification";

import useAuthStore from "@/store/useAuthStore";

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams();
  const profile = useAuthStore((state) => state.profile);
  const { markAsRead } = useNotification();

  const {
    get: { isLoading, data, error },
  } = usePost(Number(id));

  useEffect(() => {
    if (profile && data) {
      markAsRead.mutate({ receiver_id: profile.id, post_id: data.id });
    }
  }, [profile, data]);

  if (isLoading || !profile) {
    return <Loading />;
  }

  if (error) {
    return <Error text={error.message} />;
  }

  return (
    <ScreenWrapper>
      <FlatList
        data={data.comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CommentItem
            comment={item}
            showActionIcon={item.profile_id === profile.id}
          />
        )}
        ListHeaderComponent={
          <PostDetailsHeader post={data} profile={profile} />
        }
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListEmptyComponent={
          <ListEmpty text="No comments found" isLoading={isLoading} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-2 p-1"
      />
    </ScreenWrapper>
  );
}
