import { useEffect } from "react";
import { router } from "expo-router";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { update as _update } from "@/api/profile";

import useAuthStore from "@/store/useAuthStore";
import useMediaPicker from "@/hooks/useMediaPicker";

import profileFormSchema, { ProfileForm } from "@/schemas/profile";

import { replaceEmptyWithNull } from "@/helpers/data";

const useProfile = () => {
  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => state.setProfile);

  const { media, pickMedia } = useMediaPicker();

  const profileForm = useForm({
    resolver: zodResolver(profileFormSchema),
  });

  const update = useMutation({
    mutationFn: (data: ProfileForm) => {
      return _update(replaceEmptyWithNull(data));
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
      profileForm.reset(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (media && media.mimeType) {
      profileForm.setValue("avatar", {
        uri: media.uri,
        mimeType: media.mimeType,
      });
    }
  }, [media]);

  const avatar = useWatch({ control: profileForm.control, name: "avatar" });
  const avatarUri =
    avatar !== null && typeof avatar === "object" ? avatar.uri : avatar;

  return {
    Controller,
    profileForm,
    update,
    mediaPicker: {
      pickMedia,
    },
    metadata: {
      avatarUri,
    },
  };
};

export default useProfile;
