import * as FileSystem from "expo-file-system";

export const convertFileUriToBase64 = async (fileUri: string) => {
  const base64 = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return base64;
};
