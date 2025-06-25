import { supabase } from "@/lib/supabase";

import { CreateNotification } from "@/hooks/useNotification";

export const createNotification = async (notification: CreateNotification) => {
  await supabase.from("notifications").insert(notification).throwOnError();
};
