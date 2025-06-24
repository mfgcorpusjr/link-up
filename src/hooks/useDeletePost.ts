import { Alert } from "react-native";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { deletePost } from "@/api/post";

const useDeletePost = () => {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      Snackbar.show({
        text: "Post deleted",
        duration: Snackbar.LENGTH_SHORT,
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.back();
    },
    onError: (error: Error) => {
      Snackbar.show({
        text: error.message || "Failed to delete post",
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
    isDeleting,
    handleDelete,
  };
};

export default useDeletePost;
