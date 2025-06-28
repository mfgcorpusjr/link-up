import { z } from "zod";

const schema = z.object({
  id: z.number().optional(),
  profile_id: z.string({ required_error: "Profile ID is required" }),
  text: z.string({ required_error: "Text is required" }),
  file: z.union([
    z.string(),
    z.null(),
    z.object({ uri: z.string(), mimeType: z.string() }),
  ]),
});

export default schema;

export type PostForm = z.infer<typeof schema>;
