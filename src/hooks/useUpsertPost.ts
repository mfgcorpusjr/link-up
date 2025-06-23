import { useEffect } from "react";
import { router } from "expo-router";
import { useForm, Controller, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import useAuthStore from "@/store/useAuthStore";
import useMediaPicker from "@/hooks/useMediaPicker";

import { createPost } from "@/api/post";

import { isImage } from "@/helpers/image";

const schema = z.object({
  profile_id: z.string({ required_error: "Profile is required" }),
  text: z.string({ required_error: "Text is required" }),
  file: z.union([
    z.string(),
    z.null(),
    z.object({ uri: z.string(), mimeType: z.string() }),
  ]),
});

export type PostForm = z.infer<typeof schema>;

const useUpsertPost = () => {
  const profile = useAuthStore((state) => state.profile);
  const { media, handlePickMedia } = useMediaPicker();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      profile_id: undefined,
      text: undefined,
      file: null,
    },
  });

  const { isPending, mutate: submit } = useMutation({
    mutationFn: (data: PostForm) => {
      return createPost(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
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
      setValue("profile_id", profile.id);
    }
  }, [profile]);

  useEffect(() => {
    if (media) {
      setValue("file", { uri: media.uri, mimeType: media.mimeType! });
    }
  }, [media]);

  const file = useWatch({ control, name: "file" });
  const fileUri = file !== null && typeof file === "object" ? file.uri : file;

  return {
    form: {
      Controller,
      control,
      errors,
      handleSubmit,
      removeFile: () => setValue("file", null),
    },
    query: {
      isPending,
      submit,
    },
    mediaPicker: {
      handlePickMedia,
    },
    meta: {
      profile,
      fileUri,
      isImageFile: isImage(file),
    },
  };
};

export default useUpsertPost;
