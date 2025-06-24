import { supabase } from "@/lib/supabase";

import { Payload } from "@/hooks/useLike";

export const like = async (payload: Payload) => {
  await supabase.from("likes").insert(payload).throwOnError();
};

export const unLike = async (payload: Payload) => {
  await supabase
    .from("likes")
    .delete()
    .match({ post_id: payload.post_id, profile_id: payload.profile_id })
    .throwOnError();
};
