import { useState } from "react";
import { ViewabilityConfig, ViewToken } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getAll as _getAll } from "@/api/post";

import { Profile } from "@/types/models";

const usePostList = (profile?: Profile) => {
  const [activePostId, setActivePostId] = useState<number>();
  const [isRefetching, setIsRefetching] = useState(false);

  const getAll = useInfiniteQuery({
    queryKey: profile ? ["posts", "profile", profile.id] : ["posts"],
    queryFn: ({ pageParam }) =>
      profile ? _getAll({ pageParam }, profile.id) : _getAll({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < 10 ? undefined : allPages.length * 10,
  });

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const handleViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setActivePostId(viewableItems[0].item.id);
    }
  };

  const refetch = async () => {
    setIsRefetching(true);
    await getAll.refetch();
    setIsRefetching(false);
  };

  return {
    getAll: {
      ...getAll,
      refetch,
      isRefetching,
    },
    metadata: {
      activePostId,
      viewabilityConfig,
      handleViewableItemsChanged,
    },
  };
};

export default usePostList;
