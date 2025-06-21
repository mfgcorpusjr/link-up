import { View } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

type VideoPreviewProps = {
  uri: string;
};

export default function VideoPreview({ uri }: VideoPreviewProps) {
  const player = useVideoPlayer(uri);

  return (
    <View className="w-full aspect-[4/3] rounded-2xl overflow-hidden">
      <VideoView
        style={{ flex: 1 }}
        player={player}
        contentFit="cover"
        allowsFullscreen
      />
    </View>
  );
}
