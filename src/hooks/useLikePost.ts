import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { like, unLike } from "@/api/like";

import { PostItem } from "@/types/models";

import useAuthStore from "@/store/useAuthStore";

export type Payload = {
  post_id: number;
  profile_id: string;
};

type UseLikePostOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

const useLikePost = (
  post: PostItem,
  { onSuccess, onError }: UseLikePostOptions = {}
) => {
  const profile = useAuthStore((state) => state.profile);

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

      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });

      if (onError) onError(error);
    },
  });

  const handleToggleLike = () => mutate();

  return {
    isLiking,
    isLiked,
    handleToggleLike,
  };
};

export default useLikePost;
