import { useState } from "react";
import { ViewabilityConfig, ViewToken } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getPosts } from "@/api/post";

export type UsePostListOption = string | undefined;

const usePostList = (profileId: UsePostListOption = undefined) => {
  const [activePostId, setActivePostId] = useState<number>();

  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: profileId ? ["posts", profileId] : ["posts"],
    queryFn: ({ pageParam }) => getPosts({ pageParam }, profileId),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < 10 ? undefined : allPages.length * 10,
  });

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const handleViewableItemsChanged = (callback: {
    viewableItems: ViewToken[];
  }) => {
    if (callback.viewableItems.length > 0) {
      setActivePostId(callback.viewableItems[0].item.id);
    }
  };

  return {
    query: {
      data,
      isLoading,
      refetch,
      isRefetching,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
    },
    meta: {
      viewabilityConfig,
      handleViewableItemsChanged,
      activePostId,
    },
  };
};

export default usePostList;
