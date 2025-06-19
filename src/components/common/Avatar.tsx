import { Pressable, Image } from "react-native";

type AvatarProps = {
  uri?: string | null;
  size?: number;
  onPress?: () => void;
};

export default function Avatar({ uri, size = 32, onPress }: AvatarProps) {
  return (
    <Pressable
      style={{ width: size, height: size }}
      className="border border-zinc-200 rounded-xl overflow-hidden"
      onPress={onPress}
    >
      <Image
        className="w-full h-full"
        source={uri ? { uri } : require("@assets/images/defaultAvatar.png")}
      />
    </Pressable>
  );
}
