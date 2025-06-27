import { useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import {
  getAll,
  create,
  _delete,
  markAsRead,
  CreatePayload,
  DeletePayload,
  MarkAsReadPayload,
} from "@/api/notification";

import { Profile } from "@/types/models";

const useNotification = (profile: Profile | undefined) => {
  const [isRefetching, setIsRefetching] = useState(false);

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    refetch: handleRefetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    enabled: !!profile,
    queryKey: ["notifications", profile?.id],
    queryFn: ({ pageParam }) => getAll({ pageParam }, profile?.id || ""),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < 10 ? undefined : allPages.length * 10,
  });

  const { mutate: createNotification } = useMutation({
    mutationFn: (notification: CreatePayload) => create(notification),
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

  const { mutate: deleteNotification } = useMutation({
    mutationFn: (notification: DeletePayload) => _delete(notification),
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

  const { mutate: markNotificationsAsRead } = useMutation({
    mutationFn: (notification: MarkAsReadPayload) => markAsRead(notification),
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
    create: createNotification,
    delete: deleteNotification,
    markAsRead: markNotificationsAsRead,
  };
};

export default useNotification;
