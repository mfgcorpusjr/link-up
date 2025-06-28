import { Stack, Redirect } from "expo-router";

import useLikeSubscription from "@/hooks/useLikeSubscription";
import useCommentSubscription from "@/hooks/useCommentSubscription";

import useAuthStore from "@/store/useAuthStore";

export default function ProtectedLayout() {
  useLikeSubscription();
  useCommentSubscription();

  const session = useAuthStore((state) => state.session);

  if (!session) {
    return <Redirect href="/welcome" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
