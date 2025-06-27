import { supabase } from "@/lib/supabase";

import { uploadFile } from "@/api/storage";

import { Profile } from "@/types/models";
import { File } from "@/types/common";

type Update = Omit<Profile, "avatar" | "created_at"> & {
  avatar: string | null | File;
};

export const get = async (profile_id: string) => {
  const { data } = await supabase
    .from("profiles")
    .select()
    .eq("id", profile_id)
    .single()
    .throwOnError();

  return data;
};

export const update = async (payload: Update) => {
  if (payload.avatar !== null && typeof payload.avatar === "object") {
    const path = "avatars/" + payload.avatar.uri.split("/").pop();
    const fileUri = await uploadFile({
      bucket: "uploads",
      path,
      file: payload.avatar,
    });
    payload.avatar = fileUri;
  }

  const { data } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", payload.id)
    .select()
    .single()
    .throwOnError();

  return data;
};
