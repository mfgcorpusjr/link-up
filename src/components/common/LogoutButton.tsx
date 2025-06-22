import { View, Pressable, ActivityIndicator, Alert } from "react-native";
import { useMutation } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";
import { twMerge } from "tailwind-merge";

import Icon from "@/components/common/Icon";

import { logout } from "@/api/auth";

export default function LogoutButton() {
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onError: (error) => {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to continue?", [
      { text: "Cancel" },
      { text: "Ok", style: "destructive", onPress: () => mutate() },
    ]);
  };

  const containerClass = "w-11 aspect-square justify-center items-center";

  if (isPending) {
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
