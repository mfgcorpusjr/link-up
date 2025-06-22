import { PropsWithChildren } from "react";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";

export default function ScreenWrapper({
  children,
  ...rest
}: PropsWithChildren<SafeAreaViewProps>) {
  const screenWrapperClass = "flex-1 bg-white px-4 pt-4";
  const edges = rest.edges || ["top", "bottom"];

  return (
    <SafeAreaView
      className={twMerge(screenWrapperClass, rest.className)}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
}
