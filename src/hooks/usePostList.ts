import { useState, useRef, useCallback } from "react";
import { FlatList, ViewabilityConfig, ViewToken } from "react-native";
import { useFocusEffect } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getPosts } from "@/api/post";

export const PAGE_SIZE = 10;

const usePostList = () => {
  const [activePostId, setActivePostId] = useState<number>();
  const flatListRef = useRef<FlatList>(null);

  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length * PAGE_SIZE,
  });

  useFocusEffect(
    useCallback(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: false });
      }
    }, [])
  );

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
      flatListRef,
      viewabilityConfig,
      handleViewableItemsChanged,
      activePostId,
    },
  };
};

export default usePostList;
