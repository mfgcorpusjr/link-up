import { useState } from "react";
import { Share, ShareContent } from "react-native";

import { Post } from "@/types/models";

import { downloadRemoteFile } from "@/helpers/image";

const useSharePost = () => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async (post: Post) => {
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
    isSharing,
    handleShare,
  };
};

export default useSharePost;
