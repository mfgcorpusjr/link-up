import { View, Image } from "react-native";

type AvatarProps = {
  uri: string | null;
  size?: number;
};

export default function Avatar({ uri, size = 32 }: AvatarProps) {
  return (
    <View className="border border-zinc-200 rounded-xl overflow-hidden">
      <Image
        style={{ width: size, height: size }}
        source={uri ? { uri } : require("@assets/images/defaultAvatar.png")}
      />
    </View>
  );
}
