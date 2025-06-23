import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { login } from "@/api/auth";

const schema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  password: z.string({
    required_error: "Password is required",
  }),
});

export type LoginForm = z.infer<typeof schema>;

const useLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: login,
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
      errors,
      handleSubmit,
    },
    query: {
      isPending,
      login: mutate,
    },
  };
};

export default useLogin;
