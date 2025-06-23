import { PropsWithChildren } from "react";
import { useLocalSearchParams, router } from "expo-router";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import Icon from "@/components/common/Icon";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import PostItem from "@/components/PostItem";

import usePostDetails from "@/hooks/usePostDetails";

import useAuthStore from "@/store/useAuthStore";

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <ScreenWrapper>
      <Icon name="close-outline" size={32} onPress={() => router.back()} />
      {children}
    </ScreenWrapper>
  );
};

export default function PostDetailsScreen() {
  const profile = useAuthStore((state) => state.profile);
  const { id } = useLocalSearchParams();
  const {
    query: { isLoading, data, error },
  } = usePostDetails(Number(id));

  if (isLoading || !profile) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
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
        onDeleteSuccess={() => router.back()}
      />
    </Wrapper>
  );
}
