import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { createComment } from "@/api/comment";

import useAuthStore from "@/store/useAuthStore";

const schema = z.object({
  post_id: z.number({ required_error: "Post ID is required" }),
  profile_id: z.string({ required_error: "Profile ID is required" }),
  text: z.string({
    required_error: "Text is required",
  }),
});

export type CommentForm = z.infer<typeof schema>;

const useCreateComment = (postId: number) => {
  const profile = useAuthStore((state) => state.profile);
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { isPending: isCreatingComment, mutate } = useMutation({
    mutationFn: (data: CommentForm) => createComment(data),
    onSuccess: () => {
      setValue("text", "");
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
    if (postId && profile) {
      setValue("post_id", postId);
      setValue("profile_id", profile.id);
    }
  }, [postId, profile]);

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
