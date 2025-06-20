import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  View,
} from "react-native";
import { twMerge } from "tailwind-merge";

type Variant = "filled" | "outlined";

type ButtonProps = {
  text?: string;
  variant?: Variant;
  containerClassName?: string;
  textClassName?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
} & PressableProps;

export default function Button({
  text,
  variant = "filled",
  containerClassName,
  textClassName,
  icon,
  isLoading,
  ...rest
}: ButtonProps) {
  const defaultContainerClass = `h-14 flex-row justify-center items-center gap-2 rounded-2xl ${rest.disabled && "opacity-50"}`;
  const containerClass: Record<Variant, string> = {
    filled: "bg-tint",
    outlined: "border border-tint",
  };

  const defaultTextClass = "text-xl font-semibold";
  const textClass: Record<Variant, string> = {
    filled: "text-white",
    outlined: "text-tint",
  };

  if (isLoading) {
    return (
      <View className={defaultContainerClass}>
        <ActivityIndicator className="text-tint" />
      </View>
    );
  }

  return (
    <Pressable
      {...rest}
      className={twMerge(
        defaultContainerClass,
        containerClass[variant],
        containerClassName
      )}
    >
      {icon}

      {text && (
        <Text
          className={twMerge(
            defaultTextClass,
            textClass[variant],
            textClassName
          )}
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
}
