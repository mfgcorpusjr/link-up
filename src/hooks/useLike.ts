import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { like, unLike } from "@/api/like";

import { PostItem } from "@/types/models";

import useAuthStore from "@/store/useAuthStore";

import useNotification from "@/hooks/useNotification";

export type Payload = {
  post_id: number;
  profile_id: string;
};

const useLike = (post: PostItem) => {
  const profile = useAuthStore((state) => state.profile);
  const { handleCreateNotification } = useNotification();

  const [isLiked, setIsLiked] = useState(false);
  const [likePayload, setLikePayload] = useState<Payload>();

  useEffect(() => {
    if (profile) {
      setIsLiked(post.likes.some((v) => v.profile_id === profile.id));
      setLikePayload({ post_id: post.id, profile_id: profile.id });
    }
  }, [profile, post]);

  const { isPending: isLiking, mutate } = useMutation({
    mutationFn: () => (isLiked ? unLike(likePayload!) : like(likePayload!)),
    onSuccess: () => {
      setIsLiked((v) => !v);

      if (profile && !isLiked && post.profile_id !== profile.id) {
        handleCreateNotification({
          sender_id: profile.id,
          receiver_id: post.profile_id,
          post_id: post.id,
          title: "liked your post",
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

  return {
    isLiking,
    isLiked,
    handleToggleLike: () => mutate(),
  };
};

export default useLike;
