import { useRef, useCallback } from "react";
import { FlatList } from "react-native";
import { useFocusEffect } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getPosts } from "@/api/post";

export const PAGE_SIZE = 10;

const usePostList = () => {
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
    },
  };
};

export default usePostList;
