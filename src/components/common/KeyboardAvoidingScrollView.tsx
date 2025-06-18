import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

export default function KeyboardAvoidingScrollView({
  children,
}: PropsWithChildren) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerClassName="grow"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
