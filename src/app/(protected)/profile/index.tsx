import { PropsWithChildren } from "react";
import { View, Pressable } from "react-native";
import { Link } from "expo-router";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import BackButton from "@/components/common/BackButton";
import LogoutButton from "@/components/common/LogoutButton";
import Avatar from "@/components/common/Avatar";
import Icon from "@/components/common/Icon";
import Loading from "@/components/common/Loading";
import Text from "@/components/ui/Text";

import useAuthStore from "@/store/useAuthStore";

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <ScreenWrapper>
      <View className="gap-10">
        <ScreenHeader
          title="Profile"
          leftIcon={<BackButton />}
          rightIcon={<LogoutButton />}
        />
        {children}
      </View>
    </ScreenWrapper>
  );
};

export default function ProfileScreen() {
  const session = useAuthStore((state) => state.session);
  const profile = useAuthStore((state) => state.profile);

  if (!profile || !session) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <View className="gap-8">
        <View className="items-center">
          <View>
            <Avatar uri={profile.avatar || null} size={80} />
            <Link href="/profile/edit" asChild>
              <Pressable className="bg-white shadow-lg rounded-full p-[4] absolute -bottom-2 -right-3">
                <Icon name="ellipsis-horizontal-outline" size={20} />
              </Pressable>
            </Link>
          </View>

          <Text variant="headline" className="mt-4">
            {profile.name}
          </Text>
          <Text variant="caption">{profile.location || "N/A"}</Text>
        </View>

        <View className="gap-4">
          <View className="flex-row items-center gap-4">
            <Icon name="mail-outline" color="grey" />
            <Text>{session.user.email}</Text>
          </View>

          <View className="flex-row items-center gap-4">
            <Icon name="call-outline" color="grey" />
            <Text>{profile.phone_number || "N/A"}</Text>
          </View>

          <View className="flex-row items-center gap-4">
            <Icon name="megaphone-outline" color="grey" />
            <Text>{profile.bio || "N/A"}</Text>
          </View>
        </View>
      </View>
    </Wrapper>
  );
}
