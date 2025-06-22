import { View } from "react-native";

import Text from "@/components/ui/Text";

type ErrorProps = {
  text: string;
};

export default function Error({ text }: ErrorProps) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text variant="error">{text}</Text>
    </View>
  );
}
