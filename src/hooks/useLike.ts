import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { like, unlike } from "@/api/like";
import { get as getPost } from "@/api/post";

import useAuthStore from "@/store/useAuthStore";

import useNotification from "@/hooks/useNotification";

import { PostItem, Like } from "@/types/models";

export type Payload = Pick<Like, "post_id" | "profile_id">;

const useLike = (post: PostItem) => {
  const [isLiked, setIsLiked] = useState(false);
  const [payload, setPayload] = useState<Payload>();

  const profile = useAuthStore((state) => state.profile);
  const { create: createNotification } = useNotification();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (profile && post) {
      setIsLiked(post.likes.some((v) => v.profile_id === profile.id));
      setPayload({ post_id: post.id, profile_id: profile.id });
    }
  }, [profile, post]);

  const toggleLike = useMutation({
    mutationFn: () => (isLiked ? unlike(payload!) : like(payload!)),
    onSuccess: async (like) => {
      if (!isLiked) {
        const post = await getPost(like.post_id);
        if (post.profile_id !== like.profile_id) {
          createNotification.mutate({
            sender_id: like.profile_id,
            receiver_id: post.profile_id,
            post_id: post.id,
            comment_id: null,
            like_id: like.id,
            title: "liked your post",
          });
        }
      }

      setIsLiked((v) => !v);

      queryClient.invalidateQueries({ queryKey: ["posts", like.post_id] });
    },
    onError: (error) => {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  return {
    toggleLike,
    metadata: {
      isLiked,
    },
  };
};

export default useLike;
