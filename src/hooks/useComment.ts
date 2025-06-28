import { useEffect } from "react";
import { Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { create as _create, _delete } from "@/api/comment";

import useAuthStore from "@/store/useAuthStore";

import { Post } from "@/types/models";

import commentFormSchema from "@/schemas/comment";

const useComment = (post?: Post) => {
  const profile = useAuthStore((state) => state.profile);

  const queryClient = useQueryClient();

  const createForm = useForm({
    resolver: zodResolver(commentFormSchema),
  });

  const create = useMutation({
    mutationFn: _create,
    onSuccess: ({ post_id }) => {
      createForm.resetField("text");

      queryClient.invalidateQueries({ queryKey: ["posts", post_id] });
    },
    onError: (error) => {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  const deleteComment = useMutation({
    mutationFn: _delete,
    onSuccess: ({ post_id }) => {
      Snackbar.show({
        text: "Comment deleted",
        duration: Snackbar.LENGTH_SHORT,
      });

      queryClient.invalidateQueries({ queryKey: ["posts", post_id] });
    },
    onError: (error) => {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  useEffect(() => {
    if (post && profile) {
      createForm.setValue("post_id", post.id);
      createForm.setValue("profile_id", profile.id);
    }
  }, [post, profile]);

  const confirmDelete = (commentId: number) => {
    Alert.alert("Delete Comment", "Are you sure you want to continue?", [
      { text: "Cancel" },
      {
        text: "Ok",
        style: "destructive",
        onPress: () => deleteComment.mutate(commentId),
      },
    ]);
  };

  return {
    Controller,
    createForm,
    create,
    deleteComment: {
      mutate: confirmDelete,
      isPending: deleteComment.isPending,
    },
  };
};

export default useComment;
