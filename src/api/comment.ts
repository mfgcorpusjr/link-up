import { supabase } from "@/lib/supabase";

import { Comment } from "@/types/models";

type Create = Pick<Comment, "post_id" | "profile_id" | "text">;

export const create = async (payload: Create) => {
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
