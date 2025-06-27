export type Profile = {
  id: string;
  name: string;
  avatar: string | null;
  bio: string | null;
  location: string | null;
  phone_number: string | null;
  created_at: Date;
};

export type Post = {
  id: number;
  profile_id: string;
  text: string;
  file: string | null;
  created_at: Date;
};

export type Comment = {
  id: number;
  post_id: number;
  profile_id: string;
  text: string;
  created_at: Date;
};

export type Like = {
  id: number;
  post_id: number;
  profile_id: string;
  created_at: Date;
};

export type Notification = {
  id: number;
  sender_id: string;
  receiver_id: string;
  post_id: number;
  comment_id: number | null;
  like_id: number | null;
  title: string;
  is_read: boolean;
  created_at: Date;
};

export type PostWithProfile = Post & {
  profile: Profile;
};

export type CommentWithProfile = Comment & {
  profile: Profile;
};

export type LikeWithProfile = Like & {
  profile: Profile;
};

export type PostItem = PostWithProfile & {
  comments: CommentWithProfile[];
  likes: LikeWithProfile[];
};

export type NotificationWithSender = Notification & {
  sender: Profile;
};
