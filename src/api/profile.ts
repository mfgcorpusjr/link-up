import { supabase } from "@/lib/supabase";

import { uploadFile } from "@/api/storage";

import { ProfileForm } from "@/hooks/useProfileForm";

export const getProfile = async (id: string) => {
  const { data } = await supabase
    .from("profiles")
    .select()
    .eq("id", id)
    .single()
    .throwOnError();

  return data;
};

export const updateProfile = async (form: ProfileForm, id: string) => {
  const payload = { ...form };

  if (typeof payload.avatar === "object" && payload.avatar !== null) {
    const path = "avatars/" + payload.avatar.uri.split("/").pop();
    const fileUri = await uploadFile("uploads", path, payload.avatar);
    payload.avatar = fileUri;
  }

  const { data } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", id)
    .select()
    .single()
    .throwOnError();

  return data;
};
