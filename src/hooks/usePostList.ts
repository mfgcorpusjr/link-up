import { useState } from "react";
import { ViewabilityConfig, ViewToken } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getAll } from "@/api/post";

import { Profile } from "@/types/models";

const usePostList = (profile?: Profile) => {
  const [activePostId, setActivePostId] = useState<number>();
  const [isRefetching, setIsRefetching] = useState(false);

  const {
    data,
    isLoading,
    refetch: handleRefetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: profile ? ["posts", "profile", profile.id] : ["posts"],
    queryFn: ({ pageParam }) =>
      profile ? getAll({ pageParam }, profile.id) : getAll({ pageParam }),
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

  const refetch = async () => {
    setIsRefetching(true);
    await handleRefetch();
    setIsRefetching(false);
  };

  return {
    data,
    isLoading,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    metadata: {
      activePostId,
      viewabilityConfig,
      handleViewableItemsChanged,
    },
  };
};

export default usePostList;
