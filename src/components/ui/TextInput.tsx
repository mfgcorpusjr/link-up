import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Platform,
} from "react-native";
import { twMerge } from "tailwind-merge";

type TextInputProps = {
  icon?: React.ReactNode;
} & RNTextInputProps;

export default function TextInput({ icon, ...rest }: TextInputProps) {
  const padding = Platform.OS === "android" ? "p-2" : "p-4";

  return (
    <View
      className={twMerge(
        "flex-row items-center border border-zinc-200 rounded-2xl gap-3",
        padding
      )}
    >
      {icon}

      <RNTextInput
        {...rest}
        style={{ fontSize: 18, textAlignVertical: "top" }}
        className={twMerge("flex-1 text-zinc-900", rest.className)}
      />
    </View>
  );
}
