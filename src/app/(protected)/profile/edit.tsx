import { View, Pressable } from "react-native";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import KeyboardAvoidingScrollView from "@/components/common/KeyboardAvoidingScrollView";
import ScreenHeader from "@/components/common/ScreenHeader";
import BackButton from "@/components/common/BackButton";
import Avatar from "@/components/common/Avatar";
import Icon from "@/components/common/Icon";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";

import useProfileForm, { ProfileForm } from "@/hooks/useProfileForm";

export default function EditProfileScreen() {
  const {
    form: { Controller, control, errors, handleSubmit },
    query: { mutate, isPending },
    mediaPicker: { handlePickMedia },
    meta: { avatarUri },
  } = useProfileForm();

  return (
    <ScreenWrapper className="pb-4" edges={["top", "bottom"]}>
      <KeyboardAvoidingScrollView>
        <View className="gap-10">
          <ScreenHeader title="Edit Profile" leftIcon={<BackButton />} />

          <View className="gap-8">
            <View className="self-center">
              <Avatar uri={avatarUri} size={80} />
              <Pressable
                className="bg-white shadow-lg rounded-full p-[4] absolute -bottom-2 -right-3"
                onPress={handlePickMedia}
              >
                <Icon name="camera-outline" size={20} />
              </Pressable>
            </View>

            <View className="gap-3">
              <Text className="mb-3">Please fill your profile details</Text>

              <View>
                <Controller
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Enter your name"
                      icon={<Icon name="person-outline" color="grey" />}
                    />
                  )}
                  name="name"
                />

                <Text className="p-1" variant="error">
                  {errors?.name?.message}
                </Text>
              </View>

              <View>
                <Controller
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      value={value ?? ""}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Enter your phone number"
                      icon={<Icon name="call-outline" color="grey" />}
                      keyboardType="phone-pad"
                    />
                  )}
                  name="phone_number"
                />

                <Text className="p-1" />
              </View>

              <View>
                <Controller
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      value={value ?? ""}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Enter your location"
                      icon={<Icon name="location-outline" color="grey" />}
                    />
                  )}
                  name="location"
                />

                <Text className="p-1" />
              </View>

              <View>
                <Controller
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      value={value ?? ""}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Tell us a little about yourself..."
                      multiline
                      className="h-20"
                    />
                  )}
                  name="bio"
                />

                <Text className="p-1" />
              </View>

              <Button
                text="Update"
                isLoading={isPending}
                onPress={handleSubmit((data: ProfileForm) => {
                  mutate(data);
                })}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </ScreenWrapper>
  );
}
