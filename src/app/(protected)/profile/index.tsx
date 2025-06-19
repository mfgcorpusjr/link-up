import { View, Pressable } from "react-native";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import BackButton from "@/components/common/BackButton";
import LogoutButton from "@/components/common/LogoutButton";
import Avatar from "@/components/common/Avatar";
import Icon from "@/components/common/Icon";
import Text from "@/components/ui/Text";

import useAuthStore from "@/store/useAuthStore";

export default function ProfileScreen() {
  const session = useAuthStore((state) => state.session);
  const profile = useAuthStore((state) => state.profile);

  return (
    <ScreenWrapper>
      <View className="gap-10">
        <ScreenHeader
          title="Profile Screen"
          leftIcon={<BackButton />}
          rightIcon={<LogoutButton />}
        />

        <View className="gap-8">
          <View className="items-center">
            <View>
              <Avatar uri={profile?.avatar} size={80} />
              <Pressable className="bg-white shadow-lg rounded-full p-[3] absolute -bottom-3 -right-4">
                <Icon name="ellipsis-horizontal-outline" />
              </Pressable>
            </View>

            <Text variant="headline" className="mt-4">
              {profile?.name}
            </Text>
            <Text>{profile?.location || "N/A"}</Text>
          </View>

          <View className="gap-4">
            <View className="flex-row items-center gap-4">
              <Icon name="mail-outline" color="grey" />
              <Text>{session?.user.email}</Text>
            </View>

            <View className="flex-row items-center gap-4">
              <Icon name="call-outline" color="grey" />
              <Text>{profile?.phone_number || "N/A"}</Text>
            </View>

            <View className="flex-row items-center gap-4">
              <Icon name="megaphone-outline" color="grey" />
              <Text>{profile?.bio || "N/A"}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
