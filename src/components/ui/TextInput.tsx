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
  const textInputClass = `flex-1 border border-zinc-200 h-16 rounded-2xl text-zinc-900 px-4 ${icon && "pl-14"}`;

  return (
    <View className="flex-row items-center">
      {icon && <View className="absolute pl-4">{icon}</View>}

      <RNTextInput
        {...rest}
        style={{ fontSize: 18 }}
        className={twMerge(textInputClass, rest.className)}
      />
    </View>
  );
}
