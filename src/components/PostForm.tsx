import { View, Pressable } from "react-native";

import Avatar from "@/components/common/Avatar";
import Icon from "@/components/common/Icon";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import ImagePreview from "@/components/ImagePreview";
import VideoPreview from "@/components/VideoPreview";

import usePost, { PostForm as TPostForm } from "@/hooks/usePost";

export default function PostForm() {
  const {
    form: { Controller, control, errors, handleSubmit, removeFile },
    query: { isPending, submit },
    mediaPicker: { pickMedia },
    meta: { profile, fileUri, isImageFile },
  } = usePost();

  return (
    <View className="gap-8">
      <View className="flex-row items-center gap-4">
        <Avatar uri={profile?.avatar || null} size={60} />
        <View>
          <Text variant="headline">{profile?.name}</Text>
          <Text variant="caption">Public</Text>
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
        <View>
          {isImageFile ? (
            <ImagePreview uri={fileUri} />
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
            <Icon name="image-outline" onPress={() => pickMedia()} />
            <Icon
              name="videocam-outline"
              onPress={() => pickMedia(["videos"])}
            />
          </View>
        </View>
      )}

      <Button
        text="Post"
        isLoading={isPending}
        onPress={handleSubmit((data: TPostForm) => {
          submit(data);
        })}
      />
    </View>
  );
}
