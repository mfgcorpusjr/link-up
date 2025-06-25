import { Alert } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { deleteComment } from "@/api/comment";

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      Snackbar.show({
        text: "Comment deleted",
        duration: Snackbar.LENGTH_SHORT,
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: Error) => {
      Snackbar.show({
        text: error.message || "Failed to delete comment",
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  const handleDelete = (commentId: number) => {
    Alert.alert("Delete Comment", "Are you sure you want to continue?", [
      { text: "Cancel" },
      { text: "Ok", style: "destructive", onPress: () => mutate(commentId) },
    ]);
  };

  return {
    isDeleting,
    handleDelete,
  };
};

export default useDeleteComment;
