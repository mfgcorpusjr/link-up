import { View, Image } from "react-native";

type ImagePreviewProps = {
  uri: string;
};

export default function ImagePreview({ uri }: ImagePreviewProps) {
  return (
    <View className="w-full aspect-[4/3] rounded-2xl overflow-hidden">
      <Image className="flex-1" source={{ uri }} />
    </View>
  );
}
