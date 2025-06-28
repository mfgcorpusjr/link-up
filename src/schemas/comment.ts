import { z } from "zod";

const schema = z.object({
  post_id: z.number({ required_error: "Post ID is required" }),
  profile_id: z.string({
    required_error: "Profile ID is required",
  }),
  text: z.string({
    required_error: "Text is required",
  }),
});

export default schema;

export type CommentForm = z.infer<typeof schema>;
