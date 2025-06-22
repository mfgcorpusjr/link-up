import { useEffect } from "react";
import { View } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

type VideoPreviewProps = {
  uri: string;
  isViewable?: boolean;
};

export default function VideoPreview({ uri, isViewable }: VideoPreviewProps) {
  const player = useVideoPlayer(uri);

  useEffect(() => {
    if (player && isViewable) player.play();
    else player.pause();
  }, [player, isViewable]);

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
