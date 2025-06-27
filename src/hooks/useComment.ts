import { useEffect } from "react";
import { Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { create, _delete } from "@/api/comment";

import useAuthStore from "@/store/useAuthStore";

import { Post } from "@/types/models";

const schema = z.object({
  post_id: z.number({ required_error: "Post ID is required" }),
  profile_id: z.string({
    required_error: "Profile ID is required",
  }),
  text: z.string({
    required_error: "Text is required",
  }),
});

export type CommentForm = z.infer<typeof schema>;

const useComment = (post?: Post) => {
  const profile = useAuthStore((state) => state.profile);

  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate: createComment, isPending: isCreating } = useMutation({
    mutationFn: (comment: CommentForm) => create(comment),
    onSuccess: ({ post_id }) => {
      resetField("text");
      queryClient.invalidateQueries({ queryKey: ["posts", post_id] });
    },
    onError: (error) => {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationFn: (commentId: number) => _delete(commentId),
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
      setValue("post_id", post.id);
      setValue("profile_id", profile.id);
    }
  }, [post, profile]);

  const handleDelete = (commentId: number) => {
    Alert.alert("Delete Comment", "Are you sure you want to continue?", [
      { text: "Cancel" },
      {
        text: "Ok",
        style: "destructive",
        onPress: () => deleteComment(commentId),
      },
    ]);
  };

  return {
    form: {
      Controller,
      control,
      handleSubmit,
      errors,
    },
    create: createComment,
    isCreating,
    delete: handleDelete,
    isDeleting,
  };
};

export default useComment;
