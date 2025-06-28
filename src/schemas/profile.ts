import { z } from "zod";

const schema = z.object({
  id: z.string({ required_error: "ID is required" }),
  name: z
    .string({
      required_error: "Name is required",
    })
    .trim(),
  avatar: z.union([
    z.string(),
    z.null(),
    z.object({ uri: z.string(), mimeType: z.string() }),
  ]),
  bio: z.union([z.string().trim(), z.null()]),
  location: z.union([z.string().trim(), z.null()]),
  phone_number: z.union([z.string().trim(), z.null()]),
});

export default schema;

export type ProfileForm = z.infer<typeof schema>;
