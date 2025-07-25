import * as FileSystem from "expo-file-system";

import { File } from "@/types/common";

export const convertFileUriToBase64 = async (fileUri: string) => {
  const base64 = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return base64;
};

export const isImage = (file: File | string | null) => {
  if (file !== null && typeof file === "object") {
    return file.mimeType.includes("image");
  } else if (typeof file === "string") {
    return file.includes("post_images");
  }

  return false;
};

export const downloadRemoteFile = async (remoteUri: string) => {
  try {
    const fileName = remoteUri.split("/").pop();
    const localUri = `${FileSystem.cacheDirectory}${fileName}`;
    const { uri } = await FileSystem.downloadAsync(remoteUri, localUri);

    return uri;
  } catch (error) {
    throw new Error("Failed to download remote file");
  }
};
