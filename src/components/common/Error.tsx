import { View } from "react-native";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import BackButton from "@/components/common/BackButton";
import Text from "@/components/ui/Text";

type ErrorProps = {
  text: string;
};

export default function Error({ text }: ErrorProps) {
  return (
    <ScreenWrapper>
      <ScreenHeader title="" leftIcon={<BackButton />} />

      <View className="flex-1 justify-center items-center">
        <Text>{text}</Text>
      </View>
    </ScreenWrapper>
  );
}
