import { useEffect } from "react";
import { router } from "expo-router";
import { useForm, Controller, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import useAuthStore from "@/store/useAuthStore";
import useMediaPicker from "@/hooks/useMediaPicker";

import { update } from "@/api/profile";

import { replaceEmptyWithNull } from "@/helpers/data";

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

export type ProfileForm = z.infer<typeof schema>;

const useProfile = () => {
  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => state.setProfile);
  const { media, pickMedia } = useMediaPicker();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ProfileForm) => {
      return update(replaceEmptyWithNull(data));
    },
    onSuccess: (data) => {
      setProfile(data.id);
      router.back();
    },
    onError: (error) => {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (media && media.mimeType) {
      setValue("avatar", { uri: media.uri, mimeType: media.mimeType });
    }
  }, [media]);

  const avatar = useWatch({ control, name: "avatar" });
  const avatarUri =
    avatar !== null && typeof avatar === "object" ? avatar.uri : avatar;

  return {
    form: {
      Controller,
      control,
      handleSubmit,
      errors,
    },
    update: mutate,
    isLoading: isPending,
    mediaPicker: {
      pickMedia,
    },
    metadata: {
      avatarUri,
    },
  };
};

export default useProfile;
