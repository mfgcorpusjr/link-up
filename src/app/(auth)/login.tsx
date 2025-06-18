import { View } from "react-native";
import { Link } from "expo-router";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import KeyboardAvoidingScrollView from "@/components/common/KeyboardAvoidingScrollView";
import BackButton from "@/components/common/BackButton";
import Icon from "@/components/common/Icon";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";

export default function LoginScreen() {
  return (
    <ScreenWrapper className="pb-4" edges={["top", "bottom"]}>
      <KeyboardAvoidingScrollView>
        <View className="gap-16">
          <BackButton />

          <View>
            <Text variant="title">Hey,</Text>
            <Text variant="title">Welcome Back</Text>
          </View>

          <View className="gap-10">
            <Text className="-mb-4">Please login to continue</Text>

            <TextInput
              placeholder="Enter your email"
              icon={<Icon name="mail-outline" color="grey" />}
              autoCapitalize="none"
            />

            <TextInput
              placeholder="Enter your password"
              icon={<Icon name="lock-closed-outline" color="grey" />}
              autoCapitalize="none"
              secureTextEntry
            />

            <View className="gap-4">
              <Button text="Login" />

              <View className="flex-row justify-center items-center gap-1">
                <Text>Don't have an account?</Text>
                <Link href="/sign-up" asChild dismissTo>
                  <Text variant="link">Sign Up</Text>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </ScreenWrapper>
  );
}
