import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { twMerge } from "tailwind-merge";

type TextInputProps = {
  icon?: React.ReactNode;
} & RNTextInputProps;

export default function TextInput({ icon, ...rest }: TextInputProps) {
  return (
    <View className="flex-row items-center border border-zinc-200 rounded-2xl gap-3 p-4">
      {icon}

      <RNTextInput
        {...rest}
        style={{ fontSize: 18 }}
        className={twMerge("flex-1 text-zinc-900", rest.className)}
      />
    </View>
  );
}
