import ScreenWrapper from "@/components/common/ScreenWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import BackButton from "@/components/common/BackButton";
import LogoutButton from "@/components/common/LogoutButton";

export default function ProfileScreen() {
  return (
    <ScreenWrapper>
      <ScreenHeader
        title="Profile Screen"
        leftIcon={<BackButton />}
        rightIcon={<LogoutButton />}
      />
    </ScreenWrapper>
  );
}
