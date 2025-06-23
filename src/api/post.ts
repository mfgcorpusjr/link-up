import { supabase } from "@/lib/supabase";

import { uploadFile } from "@/api/storage";

import { PostForm } from "@/hooks/useUpsertPost";

import { PostItem } from "@/types/models";

import { isImage } from "@/helpers/image";

export const getPosts = async ({ pageParam = 0 }): Promise<PostItem[]> => {
  const { data } = await supabase
    .from("posts")
    .select(
      "*, profile:profiles(*), likes(*, profile:profiles(*)), comments(*, profile: profiles(*))"
    )
    .order("id", { ascending: false })
    .range(pageParam, pageParam + 10 - 1)
    .throwOnError();

  return data;
};

export const upsertPost = async (form: PostForm) => {
  if (form.file !== null && typeof form.file === "object") {
    const folder = isImage(form.file) ? "post_images" : "post_videos";
    const path = `${folder}/${form.file.uri.split("/").pop()}`;
    const fileUri = await uploadFile("uploads", path, form.file);
    form.file = fileUri;
  }

  await supabase.from("posts").upsert(form).throwOnError();
};

export const getPost = async (id: number) => {
  const { data } = await supabase
    .from("posts")
    .select(
      "*, profile:profiles(*), likes(*, profile:profiles(*)), comments(*, profile: profiles(*))"
    )
    .eq("id", id)
    .single()
    .throwOnError();

  return data;
};

export const deletePost = async (id: number) => {
  await supabase.from("posts").delete().eq("id", id).throwOnError();
};
