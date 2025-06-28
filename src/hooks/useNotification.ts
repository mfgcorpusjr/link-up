import { useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import {
  getAll as _getAll,
  create as _create,
  markAsRead as _markAsRead,
} from "@/api/notification";

import { Profile } from "@/types/models";

const useNotification = (profile?: Profile) => {
  const [isRefetching, setIsRefetching] = useState(false);

  const queryClient = useQueryClient();

  const getAll = useInfiniteQuery({
    enabled: !!profile,
    queryKey: ["notifications", profile?.id],
    queryFn: ({ pageParam }) => _getAll({ pageParam }, profile?.id || ""),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < 10 ? undefined : allPages.length * 10,
  });

  const create = useMutation({
    mutationFn: _create,
    onSuccess: ({ receiver_id }) => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", receiver_id],
      });
    },
    onError: (error) => {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  const markAsRead = useMutation({
    mutationFn: _markAsRead,
    onSuccess: ({ receiver_id }) => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", receiver_id],
      });
    },
    onError: (error) => {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

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
    create,
    markAsRead,
  };
};

export default useNotification;
