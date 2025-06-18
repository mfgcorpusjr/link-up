import { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Icon({ ...rest }: ComponentProps<typeof Ionicons>) {
  const size = rest.size || 24;
  const color = rest.color || "black";

  return <Ionicons {...rest} name={rest.name} size={size} color={color} />;
}
