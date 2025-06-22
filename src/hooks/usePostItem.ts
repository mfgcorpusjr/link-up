import { useState, useEffect } from "react";
import { Share, ShareContent } from "react-native";
import { useMutation } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { like, unLike } from "@/api/like";

import { PostItem } from "@/types/models";

import useAuthStore from "@/store/useAuthStore";

import { downloadRemoteFile } from "@/helpers/image";

export type Payload = {
  post_id: number;
  profile_id: string;
};

const usePostItem = (post: PostItem) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likePayload, setLikePayload] = useState<Payload>();
  const [isSharing, setIsSharing] = useState(false);
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
    onError: (error) => {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  const handleShare = async () => {
    try {
      setIsSharing(true);

      const content: ShareContent = { message: post.text };
      if (post.file) content.url = await downloadRemoteFile(post.file);
      Share.share(content);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSharing(false);
    }
  };

  return {
    isLiked,
    handleToggleLike: () => handleToggleLike(),
    isSharing,
    handleShare,
  };
};

export default usePostItem;
