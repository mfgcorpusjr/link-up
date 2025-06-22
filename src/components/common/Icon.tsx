import { ComponentProps } from "react";
import { ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type IconProps = {
  isLoading?: boolean;
} & ComponentProps<typeof Ionicons>;

export default function Icon({ isLoading, ...rest }: IconProps) {
  const size = rest.size || 24;
  const color = rest.color || "black";

  if (isLoading) {
    return <ActivityIndicator className="text-tint" />;
  }

  return <Ionicons {...rest} name={rest.name} size={size} color={color} />;
}
