import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import { like, unLike } from "@/api/like";

import { PostItem } from "@/types/models";

import useAuthStore from "@/store/useAuthStore";

export type Payload = {
  post_id: number;
  profile_id: string;
};

const usePostItem = (post: PostItem) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likePayload, setLikePayload] = useState<Payload>();
  const profile = useAuthStore((state) => state.profile);

  useEffect(() => {
    if (profile) {
      setIsLiked(post.likes.some((v) => v.profile_id === profile.id));
      setLikePayload({ post_id: post.id, profile_id: profile.id });
    }
  }, [profile, post]);

  const { mutate: handleToggleLike } = useMutation({
    mutationFn: () => (isLiked ? unLike(likePayload!) : like(likePayload!)),
    onSuccess: () => setIsLiked((v) => !v),
  });

  return {
    isLiked,
    toggleLike: () => handleToggleLike(),
  };
};

export default usePostItem;
