import { z } from "zod";

const schema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .trim(),
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
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
      "Password must include an uppercase letter, a number, and a special character"
    )
    .trim(),
});

export default schema;

export type SignUpForm = z.infer<typeof schema>;
