import { Stack, Redirect } from "expo-router";

import useAuthStore from "@/store/useAuthStore";

export default function AuthLayout() {
  const session = useAuthStore((state) => state.session);

  if (session) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
