import { View } from "react-native";

import Text from "@/components/ui/Text";

type ScreenHeaderProps = {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function ScreenHeader({
  title,
  leftIcon,
  rightIcon,
}: ScreenHeaderProps) {
  return (
    <View className="flex-row justify-center items-center pt-2">
      {leftIcon && <View className="absolute left-0">{leftIcon}</View>}

      <Text variant="title">{title}</Text>

      {rightIcon && <View className="absolute right-0">{rightIcon}</View>}
    </View>
  );
}
