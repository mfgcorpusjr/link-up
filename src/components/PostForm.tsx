import { View, Image, Pressable } from "react-native";

import Avatar from "@/components/common/Avatar";
import Icon from "@/components/common/Icon";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import VideoPreview from "@/components/VideoPreview";

import usePostForm, { PostForm as TPostForm } from "@/hooks/usePostForm";

export default function PostForm() {
  const {
    profile,
    form: { Controller, control, errors, handleSubmit },
    query: { mutate, isPending },
    mediaPicker: { handlePickMedia },
    meta: { fileUri, isImageFile, removeFile },
  } = usePostForm();

  return (
    <View className="gap-8">
      <View className="flex-row items-center gap-4">
        <Avatar uri={profile?.avatar || null} size={60} />
        <View>
          <Text variant="headline">{profile?.name}</Text>
          <Text>Public</Text>
        </View>
      </View>

      <View>
        <Controller
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="What's on your mind?"
              multiline
              className="h-28"
            />
          )}
          name="text"
        />

        <Text className="p-1" variant="error">
          {errors?.text?.message}
        </Text>
      </View>

      {fileUri ? (
        <View className="w-full aspect-[4/3] rounded-2xl overflow-hidden">
          {isImageFile ? (
            <Image className="flex-1" source={{ uri: fileUri }} />
          ) : (
            <VideoPreview uri={fileUri} />
          )}

          <Pressable
            className="bg-rose-500 shadow-lg rounded-full p-[4] absolute top-3 right-3"
            onPress={removeFile}
          >
            <Icon name="close-outline" color="white" size={20} />
          </Pressable>
        </View>
      ) : (
        <View className="flex-row justify-between items-center border border-zinc-200 rounded-2xl p-4">
          <Text variant="subHeadline">Add to your post</Text>
          <View className="flex-row items-center gap-5">
            <Icon name="image-outline" onPress={() => handlePickMedia()} />
            <Icon
              name="videocam-outline"
              onPress={() => handlePickMedia(["videos"])}
            />
          </View>
        </View>
      )}

      <Button
        text="Post"
        isLoading={isPending}
        onPress={handleSubmit((data: TPostForm) => {
          mutate(data);
        })}
      />
    </View>
  );
}
