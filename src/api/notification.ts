import { supabase } from "@/lib/supabase";

import { Notification } from "@/types/models";

import { CreateLikeNotificationPayload } from "@/hooks/useLikeSubscription";
import { CreateCommentNotificationPayload } from "@/hooks/useCommentSubscription";

export type MarkAsReadPayload = Pick<Notification, "receiver_id" | "post_id">;

export const getAll = async ({ pageParam = 0 }, receiver_id: string) => {
  const { data } = await supabase
    .from("notifications")
    .select("*, sender:sender_id(*)")
    .eq("receiver_id", receiver_id)
    .order("id", { ascending: false })
    .range(pageParam, pageParam + 10 - 1)
    .throwOnError();

  return data;
};

export const create = async (
  payload: CreateLikeNotificationPayload | CreateCommentNotificationPayload
) => {
  const { data } = await supabase
    .from("notifications")
    .insert(payload)
    .select()
    .single()
    .throwOnError();

  return data;
};

export const markAsRead = async ({
  receiver_id,
  post_id,
}: MarkAsReadPayload) => {
  const { data } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .match({ receiver_id, post_id })
    .select()
    .single()
    .throwOnError();

  return data;
};
