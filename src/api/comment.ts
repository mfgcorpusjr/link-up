import { supabase } from "@/lib/supabase";

import { CommentForm } from "@/schemas/comment";

export const create = async (payload: CommentForm) => {
  const { data } = await supabase
    .from("comments")
    .insert(payload)
    .select()
    .single()
    .throwOnError();

  return data;
};

export const _delete = async (comment_id: number) => {
  const { data } = await supabase
    .from("comments")
    .delete()
    .eq("id", comment_id)
    .select()
    .single()
    .throwOnError();

  return data;
};
