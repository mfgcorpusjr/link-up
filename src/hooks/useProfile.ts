import { useState, useEffect } from "react";
import { router } from "expo-router";
import { useForm, Controller, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import useAuthStore from "@/store/useAuthStore";
import useMediaPicker from "@/hooks/useMediaPicker";

import { updateProfile } from "@/api/profile";

import { replaceEmptyWithNull } from "@/helpers/data";

const schema = z.object({
  id: z.string({ required_error: "ID is required" }),
  avatar: z.union([
    z.string(),
    z.null(),
    z.object({ uri: z.string(), mimeType: z.string() }),
  ]),
  name: z.string({
    required_error: "Name is required",
  }),
  phone_number: z.union([z.string(), z.null()]),
  location: z.union([z.string(), z.null()]),
  bio: z.union([z.string(), z.null()]),
});

export type ProfileForm = z.infer<typeof schema>;

const useProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => state.setProfile);
  const { media, handlePickMedia } = useMediaPicker();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { isPending: isEditing, mutate } = useMutation({
    mutationFn: (data: ProfileForm) => {
      return updateProfile(replaceEmptyWithNull(data));
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
      setIsLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    if (media) {
      setValue("avatar", { uri: media.uri, mimeType: media.mimeType! });
    }
  }, [media]);

  const avatar = useWatch({ control, name: "avatar" });
  const avatarUri =
    avatar !== null && typeof avatar === "object" ? avatar.uri : avatar;

  return {
    form: {
      Controller,
      control,
      errors,
      handleSubmit,
    },
    query: {
      isEditing,
      handleEdit: mutate,
    },
    mediaPicker: {
      handlePickMedia,
    },
    meta: {
      isLoading,
      avatarUri,
    },
  };
};

export default useProfile;
