import { useEffect } from "react";
import { Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { create as _create, _delete } from "@/api/comment";
import { get as getPost } from "@/api/post";

import useAuthStore from "@/store/useAuthStore";

import useNotification from "@/hooks/useNotification";

import { Post } from "@/types/models";

import commentFormSchema from "@/schemas/comment";

const useComment = (post?: Post) => {
  const profile = useAuthStore((state) => state.profile);

  const queryClient = useQueryClient();

  const { create: createNotification } = useNotification();

  const createForm = useForm({
    resolver: zodResolver(commentFormSchema),
  });

  const create = useMutation({
    mutationFn: _create,
    onSuccess: async (comment) => {
      const post = await getPost(comment.post_id);
      if (post.profile_id !== comment.profile_id) {
        createNotification.mutate({
          sender_id: comment.profile_id,
          receiver_id: post.profile_id,
          post_id: post.id,
          comment_id: comment.id,
          like_id: null,
          title: "commented on your post",
        });
      }

      createForm.resetField("text");

      queryClient.invalidateQueries({ queryKey: ["posts"] });
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
    onSuccess: () => {
      Snackbar.show({
        text: "Comment deleted",
        duration: Snackbar.LENGTH_SHORT,
      });

      queryClient.invalidateQueries({ queryKey: ["posts"] });
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
