import { useEffect } from "react";

import { supabase } from "@/lib/supabase";

import { get as _get } from "@/api/post";

import useNotification from "@/hooks/useNotification";

import { Notification } from "@/types/models";

export type CreateLikeNotificationPayload = Omit<
  Notification,
  "id" | "comment_id" | "like_id" | "is_read" | "created_at"
> & {
  comment_id: null;
  like_id: number;
};

const useLikeSubscription = () => {
  const { create } = useNotification();

  useEffect(() => {
    const getPost = async (postId: number) => {
      const post = await _get(postId);
      return post;
    };

    const channel = supabase
      .channel("like-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "likes" },
        (payload) => {
          (async () => {
            const like = payload.new;

            const post = await getPost(like.post_id);

            if (post.profile_id !== like.profile_id) {
              const payload: CreateLikeNotificationPayload = {
                sender_id: like.profile_id,
                receiver_id: post.profile_id,
                post_id: post.id,
                comment_id: null,
                like_id: like.id,
                title: "liked your post",
              };

              create.mutate(payload);
            }
          })();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
};

export default useLikeSubscription;
