import { supabase } from "@/lib/supabase";

import { Payload } from "@/hooks/useLike";

export const like = async (payload: Payload) => {
  const { data } = await supabase
    .from("likes")
    .insert(payload)
    .select()
    .single()
    .throwOnError();

  return data;
};

export const unlike = async ({ post_id, profile_id }: Payload) => {
  const { data } = await supabase
    .from("likes")
    .delete()
    .match({ post_id, profile_id })
    .select()
    .single()
    .throwOnError();

  return data;
};
