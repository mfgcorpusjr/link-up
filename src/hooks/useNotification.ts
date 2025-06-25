import { useMutation } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { Notification } from "@/types/models";

import { createNotification } from "@/api/notification";

export type CreateNotification = Omit<
  Notification,
  "id" | "is_read" | "created_at"
>;

const useNotification = () => {
  const { mutate: handleCreateNotification } = useMutation({
    mutationFn: (notification: CreateNotification) =>
      createNotification(notification),
    onError: (error) => {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  return {
    handleCreateNotification,
  };
};

export default useNotification;
