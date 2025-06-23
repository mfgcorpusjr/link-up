import { View, Pressable, ActivityIndicator } from "react-native";
import { twMerge } from "tailwind-merge";

import Icon from "@/components/common/Icon";

import useLogout from "@/hooks/useLogout";

export default function LogoutButton() {
  const { isLoggingOut, handleLogout } = useLogout();

  const containerClass = "w-11 aspect-square justify-center items-center";

  if (isLoggingOut) {
    return (
      <View className={containerClass}>
        <ActivityIndicator className="text-tint" />
      </View>
    );
  }

  return (
    <Pressable
      className={twMerge(containerClass, "rounded-2xl bg-rose-100")}
      onPress={handleLogout}
    >
      <Icon name="power-outline" color="crimson" />
    </Pressable>
  );
}
