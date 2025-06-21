import { useInfiniteQuery } from "@tanstack/react-query";

import { getPosts } from "@/api/post";

export const PAGE_SIZE = 10;

const usePostList = () => {
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
  };
};

export default usePostList;
