import { supabase } from "@/lib/supabase";

import { Notification } from "@/types/models";

export type CreatePayload = Omit<Notification, "id" | "is_read" | "created_at">;
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

export const create = async (payload: CreatePayload) => {
  const { data } = await supabase
    .from("notifications")
    .insert(payload)
    .select()
    .single()
    .throwOnError();

  return data;
};

export const markAsRead = async (payload: MarkAsReadPayload) => {
  const { data } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .match({ receiver_id: payload.receiver_id, post_id: payload.post_id })
    .select()
    .throwOnError();

  return data;
};
