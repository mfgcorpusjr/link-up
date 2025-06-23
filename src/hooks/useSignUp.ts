import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { signUp } from "@/api/auth";

const schema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
});

export type SignUpForm = z.infer<typeof schema>;

const useSignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { isPending: isSigningUp, mutate } = useMutation({
    mutationFn: signUp,
    onError: (error) => {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });

      reset();
    },
  });

  return {
    form: {
      Controller,
      control,
      errors,
      handleSubmit,
    },
    query: {
      isSigningUp,
      handleSignUp: mutate,
    },
  };
};

export default useSignUp;
