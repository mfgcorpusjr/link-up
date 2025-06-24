import { PropsWithChildren } from "react";
import { View, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import BackButton from "@/components/common/BackButton";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import ListEmpty from "@/components/common/ListEmpty";
import PostItem from "@/components/PostItem";
import CommentForm from "@/components/CommentForm";
import CommentItem from "@/components/CommentItem";
import PostDetailsHeader from "@/components/PostDetailsHeader";

import usePostDetails from "@/hooks/usePostDetails";

import useAuthStore from "@/store/useAuthStore";

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams();
  const profile = useAuthStore((state) => state.profile);

  const {
    query: { isLoading, data, error },
  } = usePostDetails(Number(id));

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
        renderItem={({ item }) => <CommentItem comment={item} />}
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
