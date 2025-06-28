import { View, Pressable, ActivityIndicator } from "react-native";
import { twMerge } from "tailwind-merge";

import Icon from "@/components/common/Icon";

import useAuth from "@/hooks/useAuth";

export default function LogoutButton() {
  const { logout } = useAuth();

  const containerClass = "w-11 aspect-square justify-center items-center";

  if (logout.isPending) {
    return (
      <View className={containerClass}>
        <ActivityIndicator className="text-tint" />
      </View>
    );
  }

  return (
    <Pressable
      className={twMerge(containerClass, "rounded-2xl bg-rose-100")}
      onPress={logout.mutate}
    >
      <Icon name="power-outline" color="crimson" />
    </Pressable>
  );
}
