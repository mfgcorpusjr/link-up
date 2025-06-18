import { Pressable } from "react-native";
import { router } from "expo-router";

import Icon from "@/components/common/Icon";

export default function BackButton() {
  return (
    <Pressable
      className="w-11 aspect-square justify-center items-center rounded-2xl bg-zinc-200"
      onPress={() => router.back()}
    >
      <Icon name="chevron-back-outline" />
    </Pressable>
  );
}
