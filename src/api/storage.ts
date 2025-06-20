import { decode } from "base64-arraybuffer";

import { supabase } from "@/lib/supabase";

import { convertFileUriToBase64 } from "@/helpers/image";

import { File } from "@/types/common";

export const uploadFile = async (bucket: string, path: string, file: File) => {
  const base64 = await convertFileUriToBase64(file.uri);

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, decode(base64), {
      contentType: file.mimeType,
    });

  if (error) throw new Error(error.message);

  return getPublicUrl(bucket, path);
};

export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return data.publicUrl;
};
