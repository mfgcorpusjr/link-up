import { supabase } from "@/lib/supabase";

import { uploadFile } from "@/api/storage";

import { PostForm } from "@/hooks/usePostForm";

import { isImage } from "@/helpers/image";

export const createPost = async (form: PostForm) => {
  if (form.file !== null && typeof form.file === "object") {
    const folder = isImage(form.file) ? "post_images" : "post_videos";
    const path = `${folder}/${form.file.uri.split("/").pop()}`;
    const fileUri = await uploadFile("uploads", path, form.file);
    form.file = fileUri;
  }

  await supabase.from("posts").insert(form).throwOnError();
};
