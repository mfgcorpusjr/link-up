import { View } from "react-native";
import { Link } from "expo-router";

import Icon from "@/components/common/Icon";
import Avatar from "@/components/common/Avatar";
import Text from "@/components/ui/Text";

import useAuthStore from "@/store/useAuthStore";

export default function HomeHeader() {
  const profile = useAuthStore((state) => state.profile);

  return (
    <View className="flex-row items-center">
      <Text variant="title">LinkUp</Text>

      <View className="flex-row items-center ml-auto gap-5">
        <Icon name="heart-outline" size={32} />
        <Icon name="add-circle-outline" size={32} />
        <Link href="/profile" asChild>
          <Avatar uri={profile?.avatar || null} />
        </Link>
      </View>
    </View>
  );
}
