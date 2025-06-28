import { supabase } from "@/lib/supabase";

import { uploadFile } from "@/api/storage";

import { PostForm } from "@/schemas/post";

import { isImage } from "@/helpers/image";

export const get = async (post_id: number) => {
  const { data } = await supabase
    .from("posts")
    .select(
      "*, profile:profiles(*), likes(*, profile:profiles(*)), comments(*, profile: profiles(*))"
    )
    .eq("id", post_id)
    .order("id", { ascending: false, referencedTable: "comments" })
    .single()
    .throwOnError();

  return data;
};

export const getAll = async ({ pageParam = 0 }, profile_id?: string) => {
  let query = supabase
    .from("posts")
    .select(
      "*, profile:profiles(*), likes(*, profile:profiles(*)), comments(*, profile: profiles(*))"
    )
    .order("id", { ascending: false })
    .range(pageParam, pageParam + 10 - 1);

  if (profile_id) {
    query = query.eq("profile_id", profile_id);
  }

  const { data } = await query.throwOnError();

  return data;
};

export const upsert = async (payload: PostForm) => {
  if (payload.file !== null && typeof payload.file === "object") {
    const folder = isImage(payload.file) ? "post_images" : "post_videos";
    const path = `${folder}/${payload.file.uri.split("/").pop()}`;
    const fileUri = await uploadFile({
      bucket: "uploads",
      path,
      file: payload.file,
    });
    payload.file = fileUri;
  }

  await supabase.from("posts").upsert(payload).throwOnError();
};

export const _delete = async (post_id: number) => {
  await supabase.from("posts").delete().eq("id", post_id).throwOnError();
};
