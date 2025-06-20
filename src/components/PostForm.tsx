import { View, Image, Pressable } from "react-native";

import Avatar from "@/components/common/Avatar";
import Icon from "@/components/common/Icon";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";

import useAuthStore from "@/store/useAuthStore";

export default function PostForm() {
  const profile = useAuthStore((state) => state.profile);

  return (
    <View className="gap-8">
      <View className="flex-row items-center gap-4">
        <Avatar uri={profile?.avatar || null} size={60} />
        <View>
          <Text variant="headline">{profile?.name}</Text>
          <Text>Public</Text>
        </View>
      </View>

      <TextInput
        placeholder="What's on your mind?"
        multiline
        className="h-28"
      />

      <View className="w-full aspect-[4/3] rounded-2xl overflow-hidden">
        <Image
          className="flex-1"
          source={{ uri: "https://picsum.photos/500" }}
        />
        <Pressable
          className="bg-rose-500 shadow-lg rounded-full p-[4] absolute top-3 right-3"
          onPress={() => {}}
        >
          <Icon name="close-outline" color="white" size={20} />
        </Pressable>
      </View>

      <View className="flex-row justify-between items-center border border-zinc-200 rounded-2xl p-4">
        <Text variant="subHeadline">Add to your post</Text>
        <View className="flex-row items-center gap-5">
          <Icon name="image-outline" />
          <Icon name="videocam-outline" />
        </View>
      </View>

      <Button text="Post" />
    </View>
  );
}
