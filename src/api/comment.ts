import { supabase } from "@/lib/supabase";

import { CommentForm } from "@/hooks/useCreateComment";

export const createComment = async (form: CommentForm) => {
  await supabase.from("comments").insert(form).throwOnError();
};

export const deleteComment = async (id: number) => {
  await supabase.from("comments").delete().eq("id", id).throwOnError();
};
