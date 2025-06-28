import { z } from "zod";

const schema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format")
    .trim(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim(),
});

export default schema;

export type LoginForm = z.infer<typeof schema>;
