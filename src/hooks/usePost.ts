import { useEffect } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";

import { get as _get, upsert as _upsert, _delete } from "@/api/post";

import postFormSchema from "@/schemas/post";

import useAuthStore from "@/store/useAuthStore";

import useMediaPicker from "@/hooks/useMediaPicker";

import { isImage } from "@/helpers/image";

const usePost = (id?: number) => {
  const profile = useAuthStore((state) => state.profile);

  const { media, pickMedia } = useMediaPicker();

  const queryClient = useQueryClient();

  const postForm = useForm({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      id: undefined,
      profile_id: undefined,
      text: undefined,
      file: null,
    },
  });

  const get = useQuery({
    enabled: !!id,
    queryKey: ["posts", id],
    queryFn: () => _get(id!),
  });

  const upsert = useMutation({
    mutationFn: _upsert,
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

  const deletePost = useMutation({
    mutationFn: _delete,
    onSuccess: () => {
      Snackbar.show({
        text: "Post deleted",
        duration: Snackbar.LENGTH_SHORT,
      });

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
    if (profile) postForm.setValue("profile_id", profile.id);
  }, [profile]);

  useEffect(() => {
    if (media)
      postForm.setValue("file", { uri: media.uri, mimeType: media.mimeType! });
  }, [media]);

  useEffect(() => {
    if (get.data) postForm.reset(get.data);
  }, [get.data]);

  const confirmDelete = (postId: number) => {
    Alert.alert("Delete Post", "Are you sure you want to continue?", [
      { text: "Cancel" },
      {
        text: "Ok",
        style: "destructive",
        onPress: () => deletePost.mutate(postId),
      },
    ]);
  };

  const file = useWatch({ control: postForm.control, name: "file" });
  const fileUri = file !== null && typeof file === "object" ? file.uri : file;

  return {
    get,
    Controller,
    postForm,
    upsert,
    deletePost: {
      mutate: confirmDelete,
      isPending: deletePost.isPending,
    },
    mediaPicker: {
      pickMedia,
    },
    metadata: {
      profile,
      fileUri,
      isImageFile: isImage(file),
      removeFile: () => postForm.setValue("file", null),
    },
  };
};

export default usePost;
