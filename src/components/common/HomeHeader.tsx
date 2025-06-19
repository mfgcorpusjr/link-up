import { View } from "react-native";

import Icon from "@/components/common/Icon";
import Avatar from "@/components/common/Avatar";
import Text from "@/components/ui/Text";

export default function HomeHeader() {
  return (
    <View className="flex-row items-center">
      <Text variant="title">LinkUp</Text>

      <View className="flex-row items-center ml-auto gap-5">
        <Icon name="heart-outline" size={32} />
        <Icon name="add-circle-outline" size={32} />
        <Avatar uri={null} />
      </View>
    </View>
  );
}
