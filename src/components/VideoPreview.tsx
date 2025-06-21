import { useVideoPlayer, VideoView } from "expo-video";

type VideoPreviewProps = {
  uri: string;
};

export default function VideoPreview({ uri }: VideoPreviewProps) {
  const player = useVideoPlayer(uri);

  return (
    <VideoView
      style={{ flex: 1 }}
      player={player}
      contentFit="cover"
      allowsFullscreen
    />
  );
}
