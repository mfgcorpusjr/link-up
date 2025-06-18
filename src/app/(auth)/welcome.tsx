import { View, Image } from "react-native";
import { Link } from "expo-router";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

export default function WelcomeScreen() {
  return (
    <ScreenWrapper className="pb-4" edges={["top", "bottom"]}>
      <View className="flex-1 justify-center items-center gap-8">
        <Image
          className="w-full h-20"
          source={require("@assets/images/logo.png")}
          resizeMode="contain"
        />

        <View className="w-[70%] gap-2">
          <Text className="text-center" variant="logo">
            LinkUp!
          </Text>
          <Text className="text-center">
            Where every thought finds a home and every image tells a story.
          </Text>
        </View>
      </View>

      <View className="gap-4">
        <Link href="/sign-up" asChild>
          <Button text="Get Started" />
        </Link>

        <View className="flex-row justify-center items-center gap-1">
          <Text>Already have an account?</Text>
          <Link href="/login" asChild>
            <Text variant="link">Login</Text>
          </Link>
        </View>
      </View>
    </ScreenWrapper>
  );
}
