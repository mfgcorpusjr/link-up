import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { signUp } from "@/api/auth";

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
    .trim(),
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

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onError: (error) => {
      reset();

      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  return {
    form: {
      Controller,
      control,
      handleSubmit,
      errors,
    },
    signUp: mutate,
    isLoading: isPending,
  };
};

export default useSignUp;
