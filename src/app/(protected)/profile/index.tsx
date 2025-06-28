import { FlatList, RefreshControl, ActivityIndicator } from "react-native";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import Loading from "@/components/common/Loading";
import ListEmpty from "@/components/common/ListEmpty";
import PostItem from "@/components/PostItem";
import ProfileHeader from "@/components/ProfileHeader";

import useAuthStore from "@/store/useAuthStore";

import usePostList from "@/hooks/usePostList";

import colors from "@/constants/colors";

export default function ProfileScreen() {
  const session = useAuthStore((state) => state.session);
  const profile = useAuthStore((state) => state.profile);

  if (!session || !profile) {
    return <Loading />;
  }

  const {
    getAll: {
      data,
      isLoading,
      refetch,
      isRefetching,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
    },
    metadata: { activePostId, viewabilityConfig, handleViewableItemsChanged },
  } = usePostList(profile);

  return (
    <ScreenWrapper>
      <FlatList
        data={data?.pages.flat() || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostItem post={item} isViewable={item.id === activePostId} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.tint}
          />
        }
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        ListHeaderComponent={
          <ProfileHeader session={session} profile={profile} />
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator className="text-tint" />
          ) : null
        }
        ListEmptyComponent={
          <ListEmpty text="No posts found" isLoading={isLoading} />
        }
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={handleViewableItemsChanged}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-5 p-1"
      />
    </ScreenWrapper>
  );
}
