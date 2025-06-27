import { Alert } from "react-native";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { _delete } from "@/api/post";

const useDeletePost = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (postId: number) => _delete(postId),
    onSuccess: () => {
      Snackbar.show({
        text: "Post deleted",
        duration: Snackbar.LENGTH_SHORT,
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.back();
    },
    onError: (error) => {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  const handleDelete = (postId: number) => {
    Alert.alert("Delete Post", "Are you sure you want to continue?", [
      { text: "Cancel" },
      { text: "Ok", style: "destructive", onPress: () => mutate(postId) },
    ]);
  };

  return {
    delete: handleDelete,
    isLoading: isPending,
  };
};

export default useDeletePost;
