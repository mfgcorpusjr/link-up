import { PropsWithChildren } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import BackButton from "@/components/common/BackButton";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import PostItem from "@/components/PostItem";

import usePostDetails from "@/hooks/usePostDetails";

import useAuthStore from "@/store/useAuthStore";

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <ScreenWrapper>
      <View className="gap-10">
        <ScreenHeader title="Post Details" leftIcon={<BackButton />} />
        {children}
      </View>
    </ScreenWrapper>
  );
};

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams();
  const profile = useAuthStore((state) => state.profile);

  const {
    query: { isLoading, data, error },
  } = usePostDetails(Number(id));

  if (isLoading || !profile) {
    return <Loading />;
  }

  if (error) {
    return (
      <Wrapper>
        <Error text={error.message} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <PostItem
        post={data}
        showMoreIcon={false}
        showActionsIcon={data.profile_id === profile.id}
      />
    </Wrapper>
  );
}
