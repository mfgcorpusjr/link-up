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
  if (form.avatar !== null && typeof form.avatar === "object") {
    const path = "avatars/" + form.avatar.uri.split("/").pop();
    const fileUri = await uploadFile("uploads", path, form.avatar);
    form.avatar = fileUri;
  }

  const { data } = await supabase
    .from("profiles")
    .update(form)
    .eq("id", id)
    .select()
    .single()
    .throwOnError();

  return data;
};
