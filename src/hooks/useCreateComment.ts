import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { createComment } from "@/api/comment";

import useAuthStore from "@/store/useAuthStore";

import useNotification from "@/hooks/useNotification";

import { PostItem } from "@/types/models";

const schema = z.object({
  post_id: z.number({ required_error: "Post ID is required" }),
  profile_id: z.string({ required_error: "Profile ID is required" }),
  text: z.string({
    required_error: "Text is required",
  }),
});

export type CommentForm = z.infer<typeof schema>;

const useCreateComment = (post: PostItem) => {
  const profile = useAuthStore((state) => state.profile);
  const { handleCreateNotification } = useNotification();
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

  const { isPending: isCreatingComment, mutate } = useMutation({
    mutationFn: (data: CommentForm) => createComment(data),
    onSuccess: () => {
      resetField("text");
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      if (profile && post.profile_id !== profile.id) {
        handleCreateNotification({
          sender_id: profile.id,
          receiver_id: post.profile_id,
          post_id: post.id,
          title: "commented on your post",
        });
      }
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

  return {
    form: {
      Controller,
      control,
      errors,
      handleSubmit,
    },
    query: {
      isCreatingComment,
      handleCreateComment: mutate,
    },
  };
};

export default useCreateComment;
