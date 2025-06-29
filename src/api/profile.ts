import { supabase } from "@/lib/supabase";

import { uploadFile } from "@/api/storage";

import { ProfileForm } from "@/schemas/profile";

export const get = async (profile_id: string) => {
  const { data } = await supabase
    .from("profiles")
    .select()
    .eq("id", profile_id)
    .single()
    .throwOnError();

  return data;
};

export const update = async (payload: ProfileForm) => {
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
