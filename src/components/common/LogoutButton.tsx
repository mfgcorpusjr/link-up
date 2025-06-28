import { Pressable } from "react-native";

import Icon from "@/components/common/Icon";

import useAuth from "@/hooks/useAuth";

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Pressable
      className="w-11 aspect-square justify-center items-center rounded-2xl bg-rose-100"
      onPress={logout}
    >
      <Icon name="power-outline" color="crimson" />
    </Pressable>
  );
}
