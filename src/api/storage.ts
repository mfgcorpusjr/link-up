import { decode } from "base64-arraybuffer";

import { supabase } from "@/lib/supabase";

import { File } from "@/types/common";

import { convertFileUriToBase64 } from "@/helpers/image";

type UploadFile = {
  bucket: string;
  path: string;
  file: File;
};

type GetPublicUrl = {
  bucket: string;
  path: string;
};

export const uploadFile = async ({ bucket, path, file }: UploadFile) => {
  const base64 = await convertFileUriToBase64(file.uri);

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, decode(base64), {
      contentType: file.mimeType,
    });

  if (error) throw new Error(error.message);

  return getPublicUrl({ bucket, path });
};

export const getPublicUrl = ({ bucket, path }: GetPublicUrl) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return data.publicUrl;
};
