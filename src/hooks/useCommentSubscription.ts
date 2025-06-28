import { useEffect } from "react";

import { supabase } from "@/lib/supabase";

import { get as _get } from "@/api/post";

import useNotification from "@/hooks/useNotification";

import { Notification } from "@/types/models";

export type CreateCommentNotificationPayload = Omit<
  Notification,
  "id" | "comment_id" | "like_id" | "is_read" | "created_at"
> & {
  comment_id: number;
  like_id: null;
};

const useCommmentSubscription = () => {
  const { create } = useNotification();

  useEffect(() => {
    const getPost = async (postId: number) => {
      const post = await _get(postId);
      return post;
    };

    const channel = supabase
      .channel("comment-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        (payload) => {
          (async () => {
            const comment = payload.new;

            const post = await getPost(comment.post_id);

            if (post.profile_id !== comment.profile_id) {
              const payload: CreateCommentNotificationPayload = {
                sender_id: comment.profile_id,
                receiver_id: post.profile_id,
                post_id: post.id,
                comment_id: comment.id,
                like_id: null,
                title: "commented on your post",
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

export default useCommmentSubscription;
