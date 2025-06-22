import { View } from "react-native";
import { Link } from "expo-router";

import ScreenWrapper from "@/components/common/ScreenWrapper";
import KeyboardAvoidingScrollView from "@/components/common/KeyboardAvoidingScrollView";
import BackButton from "@/components/common/BackButton";
import Icon from "@/components/common/Icon";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";

import useSignUpForm, { SignUpForm } from "@/hooks/useSignUpForm";

export default function SignUpScreen() {
  const {
    form: { Controller, control, errors, handleSubmit },
    query: { mutate, isPending },
  } = useSignUpForm();

  return (
    <ScreenWrapper className="pb-4" edges={["top", "bottom"]}>
      <KeyboardAvoidingScrollView>
        <View className="gap-16">
          <BackButton />

          <View>
            <Text variant="title">Let's</Text>
            <Text variant="title">Get Started</Text>
          </View>

          <View className="gap-3">
            <Text variant="caption" className="mb-3">
              Please fill the details to create an account
            </Text>

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
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your email"
                    icon={<Icon name="mail-outline" color="grey" />}
                    autoCapitalize="none"
                  />
                )}
                name="email"
              />

              <Text className="p-1" variant="error">
                {errors?.email?.message}
              </Text>
            </View>

            <View>
              <Controller
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your password"
                    icon={<Icon name="lock-closed-outline" color="grey" />}
                    autoCapitalize="none"
                    secureTextEntry
                  />
                )}
                name="password"
              />

              <Text className="p-1" variant="error">
                {errors?.password?.message}
              </Text>
            </View>

            <View className="gap-4">
              <Button
                text="Sign Up"
                isLoading={isPending}
                onPress={handleSubmit((data: SignUpForm) => mutate(data))}
              />

              <View className="flex-row justify-center items-center gap-1">
                <Text>Already have an account?</Text>
                <Link href="/login" asChild dismissTo>
                  <Text variant="link">Login</Text>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </ScreenWrapper>
  );
}
