import { Stack, Redirect } from "expo-router";

import useAuthStore from "@/store/useAuthStore";

import useNotificationSubscription from "@/hooks/useNotificationSubscription";

export default function ProtectedLayout() {
  const session = useAuthStore((state) => state.session);
  const profile = useAuthStore((state) => state.profile);

  useNotificationSubscription(profile?.id);

  if (!session) {
    return <Redirect href="/welcome" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
