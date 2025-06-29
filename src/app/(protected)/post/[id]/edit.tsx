import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import KeyboardAvoidingScrollView from "@/components/common/KeyboardAvoidingScrollView";
import ScreenHeader from "@/components/common/ScreenHeader";
import BackButton from "@/components/common/BackButton";
import PostForm from "@/components/PostForm";

export default function EditPostScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ScreenWrapper className="pb-4">
      <KeyboardAvoidingScrollView>
        <View className="gap-10">
          <ScreenHeader title="Edit Post" leftIcon={<BackButton />} />

          <PostForm id={Number(id)} />
        </View>
      </KeyboardAvoidingScrollView>
    </ScreenWrapper>
  );
}
