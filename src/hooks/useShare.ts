import { useState } from "react";
import { Share, ShareContent } from "react-native";

import { PostItem } from "@/types/models";

import { downloadRemoteFile } from "@/helpers/image";

export type Payload = {
  post_id: number;
  profile_id: string;
};

const useShare = (post: PostItem) => {
  const [isSharing, setIsSharing] = useState(false);

  const share = async () => {
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
    share,
  };
};

export default useShare;
