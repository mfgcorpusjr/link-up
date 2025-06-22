import { View, ActivityIndicator } from "react-native";

import Text from "@/components/ui/Text";

type ListEmptyProps = {
  text?: string;
  isLoading?: boolean;
};

export default function ListEmpty({
  text = "No data found",
  isLoading,
}: ListEmptyProps) {
  return (
    <View className="justify-center items-center p-10">
      {isLoading ? (
        <ActivityIndicator className="text-tint" />
      ) : (
        <Text>{text}</Text>
      )}
    </View>
  );
}
