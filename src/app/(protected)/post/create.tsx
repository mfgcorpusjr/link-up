import { View } from "react-native";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import KeyboardAvoidingScrollView from "@/components/common/KeyboardAvoidingScrollView";
import ScreenHeader from "@/components/common/ScreenHeader";
import BackButton from "@/components/common/BackButton";
import PostForm from "@/components/PostForm";

export default function CreatePostScreen() {
  return (
    <ScreenWrapper className="pb-4" edges={["top", "bottom"]}>
      <KeyboardAvoidingScrollView>
        <View className="gap-10">
          <ScreenHeader title="Create Post" leftIcon={<BackButton />} />

          <PostForm />
        </View>
      </KeyboardAvoidingScrollView>
    </ScreenWrapper>
  );
}
