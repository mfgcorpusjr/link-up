import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import HomeHeader from "@/components/common/HomeHeader";
import ListEmpty from "@/components/common/ListEmpty";
import PostItem from "@/components/PostItem";

import usePostList from "@/hooks/usePostList";

import colors from "@/constants/colors";

export default function HomeScreen() {
  const {
    query: {
      data,
      isLoading,
      refetch,
      isRefetching,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
    },
  } = usePostList();

  return (
    <ScreenWrapper edges={["top", "bottom"]}>
      <View className="flex-1 gap-4">
        <HomeHeader />

        <FlatList
          data={data?.pages.flat() || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PostItem post={item} />}
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
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator className="text-tint" />
            ) : null
          }
          ListEmptyComponent={
            <ListEmpty text="No posts found" isLoading={isLoading} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-5 p-1"
        />
      </View>
    </ScreenWrapper>
  );
}
