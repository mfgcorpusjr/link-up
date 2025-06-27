import { useState } from "react";
import { Share, ShareContent } from "react-native";
import Snackbar from "react-native-snackbar";

import { Post } from "@/types/models";

import { downloadRemoteFile } from "@/helpers/image";

const useShare = () => {
  const [isLoading, setIsLoading] = useState(false);

  const share = async (post: Post) => {
    try {
      setIsLoading(true);

      const content: ShareContent = { message: post.text };
      if (post.file) content.url = await downloadRemoteFile(post.file);

      Share.share(content);
    } catch (error) {
      Snackbar.show({
        text:
          error instanceof Error
            ? error.message
            : "Failed to download remote file",
        duration: Snackbar.LENGTH_SHORT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    share,
    isLoading,
  };
};

export default useShare;
